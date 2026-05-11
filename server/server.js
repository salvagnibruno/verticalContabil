/**
 * Delta Gestão Pública - Servidor Local PAD
 * Consulta o portal TCE-RS e retorna o status de envio de cada cliente.
 * 
 * Iniciar: node server.js
 * Porta: 3131
 */

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3131;

app.use(cors());

// Prioridade Máxima: servir o Portal do Colaborador no root (/)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index_colaborador.html'));
});

app.use(express.static(path.join(__dirname, '..')));

// Cache em memória para evitar requisições repetidas
const cache = {};

/**
 * GET /api/pad-status?orgao=88023&ano=2026&mes=1
 *  - orgao: código numérico da entidade
 *  - ano: ano de referência
 *  - mes: mês (1-12, 0 = "qualquer mês no ano")
 * 
 * Retorna JSON:
 *   { orgao, ano, mes, status: 'on-time'|'pending', sentReceipts: [...] }
 */
app.get('/api/pad-status', async (req, res) => {
    const { orgao, ano, mes } = req.query;

    if (!orgao || !ano) {
        return res.status(400).json({ error: 'Parâmetros orgao e ano são obrigatórios.' });
    }

    const cacheKey = `${orgao}_${ano}_${mes || 'all'}`;
    /* if (cache[cacheKey]) {
        return res.json(cache[cacheKey]);
    } */

    try {
        const url = `https://portal.tce.rs.gov.br/pcdi2/relatorios-recibos-envio.action?&cdOrgao=${orgao}&ano=${ano}`;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html,application/xhtml+xml'
            },
            timeout: 10000
        });

        if (!response.ok) {
            return res.status(502).json({ error: 'Falha ao consultar TCE-RS', code: response.status });
        }

        const html = await response.text();
        const result = parsePadStatus(html, orgao, ano, mes ? parseInt(mes) : null);

        // Cache por 30 minutos
        cache[cacheKey] = result;
        setTimeout(() => delete cache[cacheKey], 30 * 60 * 1000);

        res.json(result);
    } catch (err) {
        console.error(`Erro ao consultar orgao ${orgao}:`, err.message);
        res.status(503).json({ error: 'Timeout ou erro de conexão com TCE-RS', message: err.message });
    }
});

/**
 * POST /api/pad-status-batch
 * Body: { orgaos: ["88023","45700",...], ano: "2026", mes: 1 }
 * Retorna status de múltiplas entidades de uma vez.
 */
app.use(express.json());
app.post('/api/pad-status-batch', async (req, res) => {
    const { orgaos, ano, mes } = req.body;
    if (!orgaos || !ano) {
        return res.status(400).json({ error: 'Parâmetros orgaos[] e ano são obrigatórios.' });
    }

    const results = {};

    // Processar em paralelo com limite de concorrência (máx 40 simultâneos)
    const concurrency = 40;
    const chunks = [];
    for (let i = 0; i < orgaos.length; i += concurrency) {
        chunks.push(orgaos.slice(i, i + concurrency));
    }

    for (const chunk of chunks) {
        await Promise.all(chunk.map(async (orgao) => {
            const cacheKey = `${orgao}_${ano}_${mes || 'all'}`;
            if (cache[cacheKey]) {
                results[orgao] = cache[cacheKey];
                return;
            }

            try {
                const url = `https://portal.tce.rs.gov.br/pcdi2/relatorios-recibos-envio.action?&cdOrgao=${orgao}&ano=${ano}`;
                const response = await fetch(url, {
                    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                    timeout: 8000 // Reduzido para falhar rápido e não segurar o resto
                });

                if (!response.ok) {
                    results[orgao] = { orgao, status: 'pending' }; // Assume pending on fetch error for resilience
                    return;
                }

                const html = await response.text();
                const parsed = parsePadStatus(html, orgao, ano, mes ? parseInt(mes) : null);
                
                cache[cacheKey] = parsed;
                setTimeout(() => delete cache[cacheKey], 30 * 60 * 1000);
                
                results[orgao] = parsed;
            } catch (err) {
                results[orgao] = { orgao, status: 'pending' };
            }
        }));
    }

    res.json(results);
});

/**
 * Interpreta o HTML do TCE-RS e determina o status de envio do PAD.
 * 
 * A página contém seções como:
 *   "Sistema Informatizado de Auditoria e Prestação de Contas"
 *     -> Sem recibos = NÃO enviou PAD
 *     -> Com recibos = Enviou PAD
 * 
 * Os recibos contêm o período no link ou texto. Verificamos se o mês/ano
 * corresponde ao solicitado.
 */
function parsePadStatus(html, orgao, ano, mes) {
    // Definitive Isolation of the first PAD section only
    const startIdx = html.indexOf('Sistema Informatizado de Auditoria e Prestação de Contas');
    const endIdx = html.indexOf('Informações Complementares');
    
    let padSection = '';
    if (startIdx !== -1) {
        if (endIdx !== -1 && endIdx > startIdx) {
            padSection = html.substring(startIdx, endIdx);
        } else {
            padSection = html.substring(startIdx);
        }
    }

    const receiptLinks = [];
    const reReceipt = /imprimir-recibo\/(\d+)/g;
    let sentDateStr = null;
    
    if (!mes) {
        let match;
        while ((match = reReceipt.exec(padSection)) !== null) {
            receiptLinks.push(match[1]);
        }
    } else {
        const rows = padSection.split(/<tr[^>]*>/i);
        const monthStrEncoded = `${mes}&ordm; m&ecirc;s/${ano}`;
        const monthStrPlain = `${mes}º mês/${ano}`;
        
        rows.forEach(row => {
            if (row.includes(monthStrEncoded) || row.includes(monthStrPlain)) {
                const subMatch = row.match(/imprimir-recibo\/(\d+)/);
                if (subMatch) {
                    receiptLinks.push(subMatch[1]);
                    // Extract Date: typically the 3rd <td>
                    const cols = row.split(/<td[^>]*>/i);
                    if (cols.length >= 4) {
                        const dateText = cols[3].split('</td>')[0].trim();
                        if (dateText.match(/\d{2}\/\d{2}\/\d{4}/)) {
                            sentDateStr = dateText;
                        }
                    }
                }
            }
        });
    }

    let status = receiptLinks.length > 0 ? 'on-time' : 'pending';

    // If sent, check if it was late
    if (status === 'on-time' && sentDateStr && mes) {
        const lastDayOfMonth = new Date(parseInt(ano), parseInt(mes), 0);
        const deadline = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), lastDayOfMonth.getDate() + 30);
        
        const [day, month, rest] = sentDateStr.split('/');
        const year = rest.split(' ')[0];
        const sentDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        
        if (sentDate > deadline) {
            status = 'late';
        }
    }

    return {
        orgao,
        ano,
        mes,
        status,
        sentDate: sentDateStr,
        sentReceipts: receiptLinks,
        consultedAt: new Date().toISOString(),
        hasAnySent: !mes && receiptLinks.length > 0
    };
}

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', port: PORT, cacheSize: Object.keys(cache).length });
});

app.listen(PORT, () => {
    console.log(`\n✅ Servidor Delta PAD rodando em http://localhost:${PORT}`);
    console.log(`📊 Dashboard disponível em http://localhost:${PORT}/index_dashboard.html`);
    console.log(`🔍 API disponível em http://localhost:${PORT}/api/pad-status?orgao=88023&ano=2026&mes=1`);
    console.log(`\nPressione Ctrl+C para parar.\n`);
});
