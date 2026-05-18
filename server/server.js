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
const PORT = process.env.PORT || 3131;

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.use(express.static(path.join(__dirname, '..')));

const cache = {};

const TCE_BASE = 'https://portal.tce.rs.gov.br';

// Busca HTML do TCE-RS — sem sessão (portal público, não requer autenticação)
async function fetchTCERS(orgao, ano) {
    const url = `${TCE_BASE}/pcdi2/relatorios-recibos-envio.action?cdOrgao=${orgao}&ano=${ano}`;
    const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        timeout: 18000
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.text();
}

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
        const html = await fetchTCERS(orgao, ano);
        const result = parsePadStatus(html, orgao, ano, mes ? parseInt(mes) : null);

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
                const html = await fetchTCERS(orgao, ano);
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
 * Regras de classificação do PAD:
 *  - Linha do mês NÃO existe → pending
 *  - Linha do mês existe + sem "Data de Conclusão" → on-time (enviado, processando)
 *  - Linha do mês existe + data ≤ prazo → on-time
 *  - Linha do mês existe + data > prazo → late
 *
 * Prazo = último dia do mês de referência + 30 dias.
 */
function parsePadStatus(html, orgao, ano, mes) {
    const startIdx = html.indexOf('Sistema Informatizado de Auditoria e Prestação de Contas');
    const endIdx = html.indexOf('Informações Complementares');
    const padSection = startIdx !== -1
        ? html.substring(startIdx, endIdx > startIdx ? endIdx : undefined)
        : '';

    // Sem mês específico: verifica se há algum envio no ano
    if (!mes) {
        const hasAny = /imprimir-recibo\/\d+/.test(padSection);
        return { orgao, ano, mes, status: hasAny ? 'on-time' : 'pending',
                 sentDate: null, consultedAt: new Date().toISOString(), hasAnySent: hasAny };
    }

    // Ancora no ">" antes do número para evitar que mes=1 case com "11" ou "12"
    // Ex: ">1&ordm; m&ecirc;s/2026<" NÃO ocorre dentro de ">11&ordm; m&ecirc;s/2026<"
    const patEncoded = `>${mes}&ordm; m&ecirc;s/${ano}<`;
    const patPlain   = `>${mes}º mês/${ano}<`;
    const rows = padSection.split(/<tr[^>]*>/i);

    let rowFound = false;
    let sentDateStr = null;

    for (const row of rows) {
        if (!row.includes(patEncoded) && !row.includes(patPlain)) continue;
        rowFound = true;
        // Extrai "Data de Conclusão" (3ª coluna <td>, índice 3 após split)
        const cols = row.split(/<td[^>]*>/i);
        if (cols.length >= 4) {
            const dateText = cols[3].split('</td>')[0].trim();
            if (dateText.match(/\d{2}\/\d{2}\/\d{4}/)) {
                sentDateStr = dateText; // mantém a última data encontrada
            }
        }
        break; // uma linha por mês é suficiente
    }

    if (!rowFound) {
        return { orgao, ano, mes, status: 'pending', sentDate: null,
                 consultedAt: new Date().toISOString(), hasAnySent: false };
    }

    // Linha encontrada: determinar se está no prazo ou atrasado
    let status = 'on-time';
    if (sentDateStr) {
        // Prazo = último dia do mês + 30 dias
        const lastDayOfMonth = new Date(parseInt(ano), parseInt(mes), 0);
        const deadline = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), lastDayOfMonth.getDate() + 30);
        const [day, month, rest] = sentDateStr.split('/');
        const sentDate = new Date(parseInt(rest.split(' ')[0]), parseInt(month) - 1, parseInt(day));
        if (sentDate > deadline) status = 'late';
    }

    return { orgao, ano, mes, status, sentDate: sentDateStr,
             consultedAt: new Date().toISOString(), hasAnySent: true };
}

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', port: PORT, cacheSize: Object.keys(cache).length });
});

// Debug: mostra o IP externo do servidor e testa acesso ao TCE-RS
app.get('/api/debug', async (req, res) => {
    try {
        const ipResp = await fetch('https://api64.ipify.org?format=json', { timeout: 5000 });
        const { ip } = await ipResp.json();
        const tceUrl = 'https://portal.tce.rs.gov.br/pcdi2/relatorios-recibos-envio.action?cdOrgao=83000&ano=2026';
        const tceResp = await fetch(tceUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            timeout: 15000
        });
        res.json({ serverIp: ip, tceStatus: tceResp.status, tceOk: tceResp.ok });
    } catch (err) {
        res.json({ error: err.message });
    }
});

// Localmente: sobe o servidor normalmente. No Vercel: exporta o app sem escutar porta.
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`\n✅ Servidor Delta PAD rodando em http://localhost:${PORT}`);
        console.log(`📊 Dashboard disponível em http://localhost:${PORT}/index.html`);
        console.log(`🔍 API disponível em http://localhost:${PORT}/api/pad-status?orgao=88023&ano=2026&mes=1`);
        console.log(`\nPressione Ctrl+C para parar.\n`);
    });
}

module.exports = app;
