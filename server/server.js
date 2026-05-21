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
const fs   = require('fs');
const app = express();
const PORT = process.env.PORT || 3131;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// =============================================================
// VERCEL KV (REST API) — banco de dados persistente
// Sem dependências extras: usa node-fetch que já está no projeto.
// Quando KV_REST_API_URL e KV_REST_API_TOKEN existem como env vars,
// todo o armazenamento de usuários vai para o KV (persiste pra sempre).
// Sem KV: cai pro arquivo /tmp (Vercel efêmero) ou bundled (local).
// =============================================================

// Aceita tanto KV_REST_API_* (Vercel KV legado) quanto UPSTASH_REDIS_REST_*
// (Upstash via Marketplace — atual padrão do Vercel). O conteúdo da REST API é idêntico.
const KV_URL   = process.env.KV_REST_API_URL   || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KV_ENABLED = !!(KV_URL && KV_TOKEN);

async function kvGet(key) {
    if (!KV_ENABLED) return null;
    try {
        const r = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
            headers: { Authorization: `Bearer ${KV_TOKEN}` },
            timeout: 5000
        });
        if (!r.ok) return null;
        const j = await r.json();
        if (j.result === null || j.result === undefined) return null;
        if (typeof j.result === 'string') {
            try { return JSON.parse(j.result); } catch { return j.result; }
        }
        return j.result;
    } catch (e) {
        console.error('[KV] get falhou:', e.message);
        return null;
    }
}

async function kvSet(key, value) {
    if (!KV_ENABLED) return false;
    try {
        const r = await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'text/plain' },
            body: JSON.stringify(value),
            timeout: 5000
        });
        return r.ok;
    } catch (e) {
        console.error('[KV] set falhou:', e.message);
        return false;
    }
}

// =============================================================
// AUTENTICAÇÃO — KV-first, fallback para arquivo (dev local)
// =============================================================

const USERS_FILE_BUNDLED  = path.join(__dirname, 'users.json'); // bundled (seed)
const USERS_FILE_WRITABLE = process.env.VERCEL ? '/tmp/users.json' : path.join(__dirname, 'users.json');

function defaultSeed() {
    return {
        'bruno.ramos@deltainf.com.br': {
            email: 'bruno.ramos@deltainf.com.br',
            name: 'Bruno Ramos',
            role: 'admin',
            passwordHash: Buffer.from('123').toString('base64'),
            mustChangePassword: true,
            teamMemberName: 'Bruno Ramos'
        }
    };
}

// Lê do KV se ativo; se vazio na primeira vez, semeia a partir do bundled.
// Sem KV: cai pro modelo legado de arquivo.
async function loadUsers() {
    if (KV_ENABLED) {
        const kvUsers = await kvGet('delta:users');
        if (kvUsers && typeof kvUsers === 'object' && Object.keys(kvUsers).length > 0) return kvUsers;
        // Primeira leitura: semeia a partir do arquivo bundled
        try {
            if (fs.existsSync(USERS_FILE_BUNDLED)) {
                const seed = JSON.parse(fs.readFileSync(USERS_FILE_BUNDLED, 'utf8'));
                await kvSet('delta:users', seed);
                return seed;
            }
        } catch (e) { console.error('Erro semeando KV:', e.message); }
        const seed = defaultSeed();
        await kvSet('delta:users', seed);
        return seed;
    }
    // Fallback modo arquivo (dev local ou Vercel sem KV)
    try { if (fs.existsSync(USERS_FILE_WRITABLE)) return JSON.parse(fs.readFileSync(USERS_FILE_WRITABLE, 'utf8')); } catch {}
    try { if (fs.existsSync(USERS_FILE_BUNDLED))  return JSON.parse(fs.readFileSync(USERS_FILE_BUNDLED, 'utf8')); } catch {}
    return defaultSeed();
}

async function saveUsers(users) {
    if (KV_ENABLED) return await kvSet('delta:users', users);
    try {
        fs.writeFileSync(USERS_FILE_WRITABLE, JSON.stringify(users, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error('Erro ao salvar users.json:', e.message);
        return false;
    }
}

function stripPassword(user) {
    if (!user) return user;
    const { passwordHash, ...rest } = user;
    return rest;
}

// GET /api/auth/users → lista todos os usuários (sem passwordHash)
app.get('/api/auth/users', async (req, res) => {
    const users = await loadUsers();
    const safe = {};
    for (const k of Object.keys(users)) safe[k] = stripPassword(users[k]);
    res.json(safe);
});

// POST /api/auth/login → valida credenciais
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ ok: false, error: 'E-mail e senha são obrigatórios.' });

    const users = await loadUsers();
    const user = users[String(email).toLowerCase().trim()];
    if (!user) return res.json({ ok: false, error: 'E-mail não encontrado.' });

    const inputHash = Buffer.from(password).toString('base64');
    if (user.passwordHash !== inputHash) return res.json({ ok: false, error: 'Senha incorreta.' });

    res.json({ ok: true, user: stripPassword(user), mustChangePassword: !!user.mustChangePassword });
});

// POST /api/auth/users/upsert → cria ou atualiza usuário
app.post('/api/auth/users/upsert', async (req, res) => {
    const { email, name, role, passwordHash, mustChangePassword, teamMemberName } = req.body || {};
    if (!email) return res.status(400).json({ ok: false, error: 'email obrigatório.' });

    const users = await loadUsers();
    const key = String(email).toLowerCase().trim();
    const existing = users[key] || {};
    users[key] = {
        email: key,
        name: name || existing.name || key,
        role: role || existing.role || 'colaborador',
        passwordHash: passwordHash || existing.passwordHash || '',
        mustChangePassword: typeof mustChangePassword === 'boolean' ? mustChangePassword : (existing.mustChangePassword || false),
        teamMemberName: teamMemberName || existing.teamMemberName || name || key
    };
    if (await saveUsers(users)) res.json({ ok: true, user: stripPassword(users[key]) });
    else res.status(500).json({ ok: false, error: 'Falha ao gravar.' });
});

// POST /api/auth/users/rename → renomeia chave (e-mail mudou)
app.post('/api/auth/users/rename', async (req, res) => {
    const { oldEmail, newEmail } = req.body || {};
    if (!oldEmail || !newEmail) return res.status(400).json({ ok: false });

    const users = await loadUsers();
    const oldKey = String(oldEmail).toLowerCase().trim();
    const newKey = String(newEmail).toLowerCase().trim();
    const old = users[oldKey];
    if (!old) return res.json({ ok: false, error: 'Usuário antigo não encontrado.' });

    delete users[oldKey];
    users[newKey] = {
        ...old,
        email: newKey,
        name: req.body.name || old.name,
        role: req.body.role || old.role,
        passwordHash: req.body.passwordHash || old.passwordHash,
        mustChangePassword: typeof req.body.mustChangePassword === 'boolean' ? req.body.mustChangePassword : old.mustChangePassword,
        teamMemberName: req.body.teamMemberName || old.teamMemberName
    };
    if (await saveUsers(users)) res.json({ ok: true, user: stripPassword(users[newKey]) });
    else res.status(500).json({ ok: false });
});

// POST /api/auth/users/delete → remove usuário
app.post('/api/auth/users/delete', async (req, res) => {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ ok: false });

    const users = await loadUsers();
    const key = String(email).toLowerCase().trim();
    delete users[key];
    if (await saveUsers(users)) res.json({ ok: true });
    else res.status(500).json({ ok: false });
});

// POST /api/auth/change-password → troca de senha
app.post('/api/auth/change-password', async (req, res) => {
    const { email, currentPassword, newPassword } = req.body || {};
    if (!email || !newPassword) return res.status(400).json({ ok: false, error: 'Campos obrigatórios faltando.' });

    const users = await loadUsers();
    const key = String(email).toLowerCase().trim();
    const user = users[key];
    if (!user) return res.status(404).json({ ok: false, error: 'Usuário não encontrado.' });

    if (currentPassword !== undefined && currentPassword !== null) {
        const inputHash = Buffer.from(currentPassword).toString('base64');
        if (user.passwordHash !== inputHash) return res.json({ ok: false, error: 'Senha atual incorreta.' });
    }

    user.passwordHash = Buffer.from(newPassword).toString('base64');
    user.mustChangePassword = false;
    users[key] = user;
    if (await saveUsers(users)) res.json({ ok: true });
    else res.status(500).json({ ok: false });
});

// POST /api/auth/sync → migração one-shot do localStorage do cliente
// =============================================================
// ENTREGAS LEGAIS — flags compartilhadas entre browsers via KV
// Armazena APENAS { code → { entregasLegais, entregasLegaisStart, entregasLegaisEnd } }
// NÃO afeta ibge, contractStart/End, nome, tipo etc. — esses continuam
// vindo do CLIENTS_RAW/localStorage, intactos.
// =============================================================

// GET /api/clients/legais → mapa { code → { entregasLegais, entregasLegaisStart, entregasLegaisEnd } }
app.get('/api/clients/legais', async (req, res) => {
    if (!KV_ENABLED) return res.json({ legais: null });
    const legais = await kvGet('delta:clients:legais');
    res.json({ legais: legais && typeof legais === 'object' ? legais : null });
});

// POST /api/clients/legais → admin envia o mapa
// Body: { legais: { "73500": { entregasLegais, entregasLegaisStart, entregasLegaisEnd }, ... } }
app.post('/api/clients/legais', async (req, res) => {
    const { legais } = req.body || {};
    if (!legais || typeof legais !== 'object') return res.status(400).json({ ok: false, error: 'legais deve ser objeto.' });
    if (!KV_ENABLED) return res.status(500).json({ ok: false, error: 'KV não configurado.' });
    // Sanitiza: só guarda os 3 campos relevantes por código
    const clean = {};
    for (const [code, data] of Object.entries(legais)) {
        if (!data) continue;
        clean[code] = {
            entregasLegais: !!data.entregasLegais,
            entregasLegaisStart: data.entregasLegaisStart || '',
            entregasLegaisEnd: data.entregasLegaisEnd || ''
        };
    }
    const ok = await kvSet('delta:clients:legais', clean);
    res.json({ ok, count: Object.keys(clean).length });
});

app.post('/api/auth/sync', async (req, res) => {
    const { users: clientUsers } = req.body || {};
    if (!clientUsers || typeof clientUsers !== 'object') return res.status(400).json({ ok: false });

    const users = await loadUsers();
    let added = 0, updated = 0;
    for (const [email, u] of Object.entries(clientUsers)) {
        const key = String(email).toLowerCase().trim();
        if (!u || !u.passwordHash) continue; // ignora entradas sem senha
        if (!users[key]) {
            users[key] = u;
            added++;
        } else {
            // Se o servidor já tem, só atualiza se o do cliente é mais recente (heurística simples: mantém o do servidor)
            // Aqui optamos por NÃO sobrescrever — admin pode editar via /upsert se precisar.
        }
    }
    if (added + updated > 0) await saveUsers(users);
    res.json({ ok: true, added, updated, total: Object.keys(users).length });
});

// Força no-cache em HTML, JS e CSS para evitar versões desatualizadas no browser
const noCacheHeaders = (res, filePath) => {
    if (/\.(html|js|css)$/.test(filePath)) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
    }
};

app.get('/', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.use(express.static(path.join(__dirname, '..'), { setHeaders: noCacheHeaders }));

const cache = {};

const TCE_BASE = 'https://portal.tce.rs.gov.br';

// Busca HTML do TCE-RS — sem sessão (portal público, não requer autenticação).
// O portal pode ser lento ou intermitente sob carga; usamos 3 tentativas com
// timeouts crescentes (15s, 25s, 35s) e headers de browser real para evitar
// filtros agressivos do balanceador.
const TCERS_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
};

async function fetchTCERS(orgao, ano) {
    const url = `${TCE_BASE}/pcdi2/relatorios-recibos-envio.action?cdOrgao=${orgao}&ano=${ano}`;
    // 2 tentativas (cabem no budget de 60s do Vercel mesmo no pior caso)
    const timeouts = [15000, 28000];
    let lastErr = null;
    for (let i = 0; i < timeouts.length; i++) {
        try {
            const response = await fetch(url, { headers: TCERS_HEADERS, timeout: timeouts[i] });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.text();
        } catch (err) {
            lastErr = err;
            if (i < timeouts.length - 1) await new Promise(r => setTimeout(r, 600));
        }
    }
    throw lastErr || new Error('TCE-RS unreachable');
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
    if (cache[cacheKey]) {
        return res.json(cache[cacheKey]);
    }

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
// express.json já configurado no topo (10mb)
app.post('/api/pad-status-batch', async (req, res) => {
    const { orgaos, ano, mes } = req.body;
    if (!orgaos || !ano) {
        return res.status(400).json({ error: 'Parâmetros orgaos[] e ano são obrigatórios.' });
    }

    const results = {};

    // Alta concorrência para caber no budget de 60s do Vercel:
    // 110 orgãos / 30 paralelos = 4 ondas; cada fetchTCERS típico = 1-3s.
    // Cache hits são instantâneos. Worst case com retry: ~25s.
    const concurrency = 30;
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
                console.error(`[batch] falha ${orgao}:`, err.message);
                results[orgao] = { orgao, status: 'pending', sentDate: null };
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

    // Regex ancorada em ">" antes do número evita falso positivo com "11"/"12";
    // aceita zero à esquerda ("01º") e diferentes encodings do ordinal/ê.
    const reMes = new RegExp(
        `>\\s*0?${mes}(?:&ordm;|&amp;ordm;|[º°]|&#(?:186|xba|ord);?)\\s*m(?:&ecirc;|ê)s\\s*\\/\\s*${ano}\\s*<`,
        'i'
    );
    const rows = padSection.split(/<tr[^>]*>/i);

    let rowFound = false;
    let sentDateStr = null;

    for (const row of rows) {
        if (!reMes.test(row)) continue;
        rowFound = true;
        // Extrai "Data de Conclusão" (3ª coluna <td>, índice 3 após split)
        const cols = row.split(/<td[^>]*>/i);
        if (cols.length >= 4) {
            const dateText = cols[3].split('</td>')[0].trim();
            if (dateText.match(/\d{2}\/\d{2}\/\d{4}/)) {
                sentDateStr = dateText;
            }
        }
        break; // uma linha por mês é suficiente
    }

    // Nova regra: só conta como enviado se a linha do mês existe E tem Data de
    // Conclusão preenchida. Linha sem Data de Conclusão = entrega em andamento → pending.
    if (!rowFound || !sentDateStr) {
        return { orgao, ano, mes, status: 'pending', sentDate: sentDateStr,
                 consultedAt: new Date().toISOString(), hasAnySent: false };
    }

    // Compara Data de Conclusão com o prazo (formula +30 dias do fim da competência)
    const lastDayOfMonth = new Date(parseInt(ano), parseInt(mes), 0);
    const deadline = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), lastDayOfMonth.getDate() + 30);
    const [day, month, rest] = sentDateStr.split('/');
    const sentDate = new Date(parseInt(rest.split(' ')[0]), parseInt(month) - 1, parseInt(day));
    const status = sentDate > deadline ? 'late' : 'on-time';

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
