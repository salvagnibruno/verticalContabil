// Dashboard App - Vertical Contábil (Overhaul)
// Bruno Supervisor | Delta Gestão Pública | 2026-04-06

/**
 * DADOS E CONFIGURAÇÃO
 */
const CLIENTS_RAW = [
    { type: 'PM', name: 'Ametista do Sul', code: '73500', ibge: '430064' },
    { type: 'CM', name: 'Ametista do Sul', code: '73501' },
    { type: 'PM', name: 'Arroio do Padre', code: '88021', ibge: '430107' },
    { type: 'CM', name: 'Arroio do Padre', code: '88051' },
    { type: 'PM', name: 'Barão do Triunfo', code: '73700', ibge: '430175' },
    { type: 'CM', name: 'Barão do Triunfo', code: '73701' },
    { type: 'PM', name: 'Barra do Quaraí', code: '83000', ibge: '430187' },
    { type: 'PM', name: 'Boa Vista das Missões', code: '74100', ibge: '430215' },
    { type: 'CM', name: 'Boa Vista das Missões', code: '74101' },
    { type: 'PM', name: 'Boa Vista do Incra', code: '88023', ibge: '430222' },
    { type: 'CM', name: 'Boa Vista do Incra', code: '88053' },
    { type: 'PM', name: 'Bom Jesus', code: '42300', ibge: '430230' },
    { type: 'CM', name: 'Bom Jesus', code: '42301' },
    { type: 'PM', name: 'Boqueirão do Leão', code: '65300', ibge: '430245' },
    { type: 'CM', name: 'Boqueirão do Leão', code: '65301' },
    { type: 'PM', name: 'Campo Bom', code: '43900', ibge: '430390' },
    { type: 'CM', name: 'Campo Bom', code: '43901' },
    { type: 'PM', name: 'Candiota', code: '74400', ibge: '430435' },
    { type: 'PM', name: 'Capão Bonito do Sul', code: '88026', ibge: '430461' },
    { type: 'CM', name: 'Capão Bonito do Sul', code: '88056' },
    { type: 'PM', name: 'Capão da Canoa', code: '63400', ibge: '430463' },
    { type: 'CM', name: 'Capão da Canoa', code: '63401' },
    { type: 'PM', name: 'Capão do Leão', code: '63700', ibge: '430465' },
    { type: 'CM', name: 'Capão do Leão', code: '63701' },
    { type: 'PM', name: 'Cerrito', code: '83500', ibge: '430512' },
    { type: 'CM', name: 'Cerrito', code: '83501' },
    { type: 'PM', name: 'Cerro Grande do Sul', code: '66100', ibge: '430517' },
    { type: 'CM', name: 'Cerro Grande do Sul', code: '66101' },
    { type: 'PM', name: 'Chiapetta', code: '45300', ibge: '430540' },
    { type: 'CM', name: 'Chiapetta', code: '45301' },
    { type: 'CONS', name: 'CIDEJA', code: '88298' },
    { type: 'CONS', name: 'CIEPS', code: '88163' },
    { type: 'CONS', name: 'CIGRES', code: '88174' },
    { type: 'CONS', name: 'CITEGEM', code: '88297' },
    { type: 'CONS', name: 'CONDESUS - CAMINHO DAS ORIGENS', code: '88205' },
    { type: 'CONS', name: 'CONDESUS - CAMPOS DE CIMA SERRA', code: '88175' },
    { type: 'PM', name: 'Constantina', code: '45700', ibge: '430580' },
    { type: 'CM', name: 'Constantina', code: '45701' },
    { type: 'CONS', name: 'CPES', code: '88258' },
    { type: 'PM', name: 'Crissiumal', code: '45900', ibge: '430600' },
    { type: 'CM', name: 'Crissiumal', code: '45901' },
    { type: 'PM', name: 'Dilermando de Aguiar', code: '83900', ibge: '430635' },
    { type: 'CM', name: 'Dilermando de Aguiar', code: '83901' },
    { type: 'PM', name: 'Erval Seco', code: '47200', ibge: '430690' },
    { type: 'CM', name: 'Erval Seco', code: '47201' },
    { type: 'PM', name: 'Fontoura Xavier', code: '48200', ibge: '430807' },
    { type: 'CM', name: 'Fontoura Xavier', code: '48201' },
    { type: 'PM', name: 'Humaitá', code: '49600', ibge: '430960' },
    { type: 'CM', name: 'Humaitá', code: '49601' },
    { type: 'PM', name: 'Ibarama', code: '67900', ibge: '431010' },
    { type: 'CM', name: 'Ibarama', code: '67901' },
    { type: 'INST', name: 'IMSS Capão Canoa', code: '87057' },
    { type: 'INST', name: 'IPSTP', code: '88125' },
    { type: 'INST', name: 'IPASEM', code: '43902' },
    { type: 'PM', name: 'Jaguari', code: '51000', ibge: '431100' },
    { type: 'CM', name: 'Jaguari', code: '51001' },
    { type: 'PM', name: 'Jari', code: '84700', ibge: '431112' },
    { type: 'CM', name: 'Jari', code: '84701' },
    { type: 'PM', name: 'Lajeado do Bugre', code: '76400', ibge: '431123' },
    { type: 'CM', name: 'Lajeado do Bugre', code: '76401' },
    { type: 'PM', name: 'Mampituba', code: '85600', ibge: '431142' },
    { type: 'CM', name: 'Mampituba', code: '85601' },
    { type: 'CM', name: 'Mata', code: '52001' },
    { type: 'PM', name: 'Mata', code: '52000', ibge: '431220' },
    { type: 'PM', name: 'Miraguaí', code: '52200', ibge: '431230' },
    { type: 'CM', name: 'Miraguaí', code: '52201' },
    { type: 'PM', name: 'Monte Alegre dos Campos', code: '85100', ibge: '431237' },
    { type: 'CM', name: 'Monte Alegre dos Campos', code: '85101' },
    { type: 'PM', name: 'Morrinhos do Sul', code: '77600', ibge: '431242' },
    { type: 'CM', name: 'Morrinhos do Sul', code: '77601' },
    { type: 'PM', name: 'Novo Tiradentes', code: '78500', ibge: '431333' },
    { type: 'CM', name: 'Novo Tiradentes', code: '78501' },
    { type: 'PM', name: 'Novo Xingu', code: '88036', ibge: '431339' },
    { type: 'CM', name: 'Novo Xingu', code: '88066' },
    { type: 'PM', name: 'Pinhal da Serra', code: '88039', ibge: '431442' },
    { type: 'CM', name: 'Pinhal da Serra', code: '88069' },
    { type: 'PM', name: 'Pinheirinho do Vale', code: '79000', ibge: '431445' },
    { type: 'CM', name: 'Pinheirinho do Vale', code: '79001' },
    { type: 'PM', name: 'Quevedos', code: '79600', ibge: '431545' },
    { type: 'CM', name: 'Quevedos', code: '79601' },
    { type: 'PM', name: 'Salvador das Missões', code: '79900', ibge: '431642' },
    { type: 'CM', name: 'Salvador das Missões', code: '79901' },
    { type: 'PM', name: 'São Jerônimo', code: '58400', ibge: '431840' },
    { type: 'CM', name: 'São Jerônimo', code: '58401' },
    { type: 'PM', name: 'São José dos Ausentes', code: '80800', ibge: '431862' },
    { type: 'CM', name: 'São José dos Ausentes', code: '80801' },
    { type: 'PM', name: 'São Pedro do Sul', code: '59400', ibge: '431940' },
    { type: 'CM', name: 'São Pedro do Sul', code: '59401' },
    { type: 'PM', name: 'Sertão Santana', code: '81600', ibge: '432043' },
    { type: 'CM', name: 'Sertão Santana', code: '81601' },
    { type: 'PM', name: 'Taquaruçu do Sul', code: '71900', ibge: '432132' },
    { type: 'CM', name: 'Taquaruçu do Sul', code: '71901' },
    { type: 'PM', name: 'Tenente Portela', code: '61400', ibge: '432150' },
    { type: 'CM', name: 'Tenente Portela', code: '61401' },
    { type: 'PM', name: 'Toropi', code: '86000', ibge: '432183' },
    { type: 'CM', name: 'Toropi', code: '86001' },
    { type: 'PM', name: 'Torres', code: '61500', ibge: '432140' },
    { type: 'CM', name: 'Torres', code: '61501' },
    { type: 'PM', name: 'Três Passos', code: '61900', ibge: '432190' },
    { type: 'CM', name: 'Três Passos', code: '61901' },
    { type: 'PM', name: 'Unistalda', code: '86300', ibge: '432252' },
    { type: 'CM', name: 'Unistalda', code: '86301' },
    { type: 'PM', name: 'Vista Alegre', code: '73000', ibge: '432340' },
    { type: 'CM', name: 'Vista Alegre', code: '73001' },
    { type: 'PM', name: 'Estrela Velha', code: '84200', ibge: '430745' },
    { type: 'CM', name: 'Estrela Velha', code: '84201' },
    { type: 'PM', name: 'Arroio do Tigre', code: '41200', ibge: '430120' },
    { type: 'CM', name: 'Arroio do Tigre', code: '41201' },
    { type: 'PM', name: 'Santiago', code: '57400', ibge: '431740' },
    { type: 'CM', name: 'Santiago', code: '57401' }
];

const TEAM_INITIAL = [
    { name: "Bruno Ramos", birthday: "23/05", year: 1995, isSupervisor: true, email: "bruno.ramos@deltainf.com.br" },
    { name: "Jade Zaira Clavé da Silveira Uchôa de Medeiros", birthday: "14/05", year: 2001, email: "jade.medeiros@deltainf.com.br" },
    { name: "Marcus Sergio de Oliveira", birthday: "10/07", year: 1983, email: "marcus.oliveira@deltainf.com.br" },
    { name: "Luana de Matos Clee", birthday: "17/09", year: 1993, email: "luana.clee@deltainf.com.br" },
    { name: "Gioliani Godois", birthday: "07/12", year: 1981, email: "gioliani.godois@deltainf.com.br" },
    { name: "Hugo Munareto", birthday: "24/08", year: 1977, email: "hugo@deltainf.com.br" },
    { name: "Nicole Fassbinder Chaves", birthday: "", year: null, email: "nicole.chaves@deltainf.com.br" }
];

// ============================================================
// SISTEMA DE AUTENTICAÇÃO
// ============================================================

const DEFAULT_ADMIN_EMAIL = 'bruno.ramos@deltainf.com.br';

// Resolve a URL base da API — usa o mesmo origin (Vercel) ou localhost:3131 (arquivo local)
function getAuthApiBase() {
    const origin = window.location.origin;
    if (origin && !origin.startsWith('file') && origin !== 'null') {
        return origin;
    }
    return 'http://localhost:3131';
}

// Cache local dos usuários (sincronizado com o servidor). Usado apenas para leitura síncrona
// em locais que ainda não foram convertidos para async. NÃO é a fonte da verdade.
let _usersCache = null;

async function fetchUsersFromServer() {
    try {
        const r = await fetch(`${getAuthApiBase()}/api/auth/users`, { cache: 'no-store' });
        if (!r.ok) throw new Error('HTTP ' + r.status);
        const users = await r.json();
        _usersCache = users;
        // Espelha no localStorage como cache para leitura síncrona de fallback
        try { localStorage.setItem('delta_users', JSON.stringify(users)); } catch {}
        return users;
    } catch (e) {
        console.warn('[auth] fetchUsersFromServer falhou:', e.message);
        // Fallback: usa o último cache do localStorage
        const stored = localStorage.getItem('delta_users');
        if (stored) { try { _usersCache = JSON.parse(stored); } catch {} }
        return _usersCache || {};
    }
}

// Versão síncrona: retorna o cache (usuários precisam ter sido carregados antes).
// Para o NOVO ciclo de vida, chamamos fetchUsersFromServer() no boot.
function getUsers() {
    if (_usersCache) return _usersCache;
    const stored = localStorage.getItem('delta_users');
    if (stored) { try { _usersCache = JSON.parse(stored); return _usersCache; } catch {} }
    return {};
}

// Persiste no servidor (upsert para cada chave alterada). Para uso simples, prefira
// chamar diretamente apiUpsertUser/apiDeleteUser/apiRenameUser nos pontos de edição.
function saveUsers(users) {
    _usersCache = users;
    try { localStorage.setItem('delta_users', JSON.stringify(users)); } catch {}
    // Nota: não envia automaticamente para o servidor — quem chamar saveUsers em
    // um ponto de edição deve, em paralelo, chamar a API correspondente (upsert/rename/delete).
}

async function apiUpsertUser(user) {
    const r = await fetch(`${getAuthApiBase()}/api/auth/users/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    if (!r.ok) throw new Error('upsert falhou');
    return r.json();
}

async function apiRenameUser(oldEmail, newUser) {
    const r = await fetch(`${getAuthApiBase()}/api/auth/users/rename`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldEmail, newEmail: newUser.email, ...newUser })
    });
    if (!r.ok) throw new Error('rename falhou');
    return r.json();
}

async function apiDeleteUser(email) {
    const r = await fetch(`${getAuthApiBase()}/api/auth/users/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    if (!r.ok) throw new Error('delete falhou');
    return r.json();
}

async function apiChangePassword(email, newPassword, currentPassword) {
    const r = await fetch(`${getAuthApiBase()}/api/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, currentPassword, newPassword })
    });
    return r.json();
}

// ── Entregas Legais: sincroniza APENAS os 3 campos (entregasLegais + datas) via servidor ──
// Não toca em ibge, contractStart/End, nome, tipo — todos permanecem intactos.
async function fetchLegaisFromServer() {
    try {
        const r = await fetch(`${getAuthApiBase()}/api/clients/legais`, { cache: 'no-store' });
        if (!r.ok) return null;
        const data = await r.json();
        return (data.legais && typeof data.legais === 'object') ? data.legais : null;
    } catch (e) { return null; }
}

async function pushLegaisToServer(clients) {
    const legais = {};
    clients.forEach(c => {
        if (!c || !c.code) return;
        legais[c.code] = {
            entregasLegais: !!c.entregasLegais,
            entregasLegaisStart: c.entregasLegaisStart || '',
            entregasLegaisEnd: c.entregasLegaisEnd || ''
        };
    });
    try {
        const r = await fetch(`${getAuthApiBase()}/api/clients/legais`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ legais })
        });
        const data = await r.json();
        return !!data.ok;
    } catch (e) { return false; }
}

// Aplica o mapa do servidor SEM substituir objetos — só atualiza os 3 campos.
// Apenas entregasLegais, entregasLegaisStart e entregasLegaisEnd são tocados;
// ibge, contractStart/End, nome e tipo permanecem intactos.
function applyLegaisFromServer(legaisMap) {
    if (!legaisMap || typeof legaisMap !== 'object') return;
    state.clients.forEach(c => {
        if (!c || !c.code) return;
        const data = legaisMap[c.code];
        if (data) {
            c.entregasLegais = !!data.entregasLegais;
            c.entregasLegaisStart = data.entregasLegaisStart || '';
            c.entregasLegaisEnd = data.entregasLegaisEnd || '';
        }
    });
}

// Sincronização automática e silenciosa — chamada no init() para garantir que
// todos os colaboradores enxerguem as mesmas marcações de Entregas Legais.
// Não exibe diálogos, não bloqueia o fluxo; falhas são ignoradas silenciosamente.
async function autoSyncLegaisFromServer() {
    try {
        const legaisMap = await fetchLegaisFromServer();
        if (!legaisMap) return;
        const count = Object.keys(legaisMap).filter(k => legaisMap[k].entregasLegais).length;
        if (count === 0) return;
        applyLegaisFromServer(legaisMap);
        localStorage.setItem('delta_v2_clients', JSON.stringify(state.clients));
    } catch (e) {
        // Silencioso — não interrompe o login se o servidor estiver indisponível
    }
}

// Botão "Atualizar do servidor" — sincronização manual e controlada
window.syncLegaisFromServerManual = async function() {
    const btn = document.getElementById('btn-sync-legais');
    const original = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Buscando...'; }
    try {
        const legaisMap = await fetchLegaisFromServer();
        if (!legaisMap) {
            alert('ℹ️ Nenhuma marcação de Entregas Legais encontrada no servidor.');
            return;
        }
        const count = Object.keys(legaisMap).filter(k => legaisMap[k].entregasLegais).length;
        if (!confirm(`Foram encontradas ${count} marcação(ões) de Entregas Legais no servidor.\n\nAplicar essas marcações sobre os dados locais? (apenas os flags entregasLegais e as datas serão atualizados)`)) {
            return;
        }
        applyLegaisFromServer(legaisMap);
        localStorage.setItem('delta_v2_clients', JSON.stringify(state.clients));
        renderClientsMgmtTable();
        refreshModuleData(false, true); // força reconsulta com os flags atualizados
        alert('✅ Marcações atualizadas a partir do servidor.');
    } catch (e) {
        alert('❌ Falha ao buscar do servidor: ' + e.message);
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = original; }
    }
};

function hashPassword(pwd) { return btoa(pwd); }

// authLogin agora consulta o servidor — fonte da verdade compartilhada entre browsers
async function authLogin(email, password) {
    try {
        const r = await fetch(`${getAuthApiBase()}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await r.json();
        return data;
    } catch (e) {
        console.error('[auth] login falhou:', e.message);
        return { ok: false, error: 'Erro de conexão com o servidor. Tente novamente.' };
    }
}

function getCurrentSession() {
    const s = localStorage.getItem('delta_session');
    if (!s) return null;
    try { return JSON.parse(s); } catch { return null; }
}

function saveSession(user) {
    localStorage.setItem('delta_session', JSON.stringify({ email: user.email, ts: Date.now() }));
}

function clearSession() {
    localStorage.removeItem('delta_session');
}

function isAdmin() {
    return state.loggedInUser && state.loggedInUser.role === 'admin';
}

let _loginPendingUser = null; // usuário aguardando troca de senha
let _loginPendingPassword = null; // senha atual (necessária para confirmar a troca no servidor)

window.doLogin = async function() {
    const email = (document.getElementById('login-email').value || '').trim();
    const pwd   = document.getElementById('login-password').value;
    const errEl = document.getElementById('login-error');
    const btnEl = document.querySelector('#login-form-area button');
    errEl.style.display = 'none';

    if (btnEl) { btnEl.disabled = true; btnEl.textContent = 'Entrando...'; }

    const result = await authLogin(email, pwd);

    if (btnEl) { btnEl.disabled = false; btnEl.textContent = 'Entrar'; }

    if (!result.ok) {
        errEl.textContent = result.error || 'Falha no login.';
        errEl.style.display = 'block';
        return;
    }

    if (result.mustChangePassword) {
        _loginPendingUser = result.user;
        _loginPendingPassword = pwd;
        document.getElementById('login-form-area').style.display = 'none';
        document.getElementById('change-pwd-area').style.display = 'block';
        return;
    }

    completeLogin(result.user);
};

window.doChangePassword = async function() {
    const p1 = document.getElementById('new-pwd-1').value;
    const p2 = document.getElementById('new-pwd-2').value;
    const errEl = document.getElementById('change-pwd-error');
    const btnEl = document.querySelector('#change-pwd-area button');
    errEl.style.display = 'none';

    if (p1.length < 4) { errEl.textContent = 'A senha deve ter no mínimo 4 caracteres.'; errEl.style.display = 'block'; return; }
    if (p1 !== p2)     { errEl.textContent = 'As senhas não coincidem.'; errEl.style.display = 'block'; return; }

    if (btnEl) { btnEl.disabled = true; btnEl.textContent = 'Salvando...'; }
    const result = await apiChangePassword(_loginPendingUser.email, p1, _loginPendingPassword);
    if (btnEl) { btnEl.disabled = false; btnEl.textContent = 'Salvar Nova Senha e Entrar'; }

    if (!result.ok) {
        errEl.textContent = result.error || 'Falha ao trocar a senha.';
        errEl.style.display = 'block';
        return;
    }

    _loginPendingUser.mustChangePassword = false;
    _loginPendingPassword = null;
    completeLogin(_loginPendingUser);
};

function completeLogin(user) {
    state.loggedInUser = user;
    saveSession(user);

    // Determina o membro da equipe e supervisor
    const member = state.team.find(m => m.name === user.teamMemberName || m.name === user.name);
    state.currentUser = member ? member.name : user.name;
    state.isSupervisor = user.role === 'admin';

    document.getElementById('login-overlay').style.display = 'none';
    applyRoleRestrictions();
    init();
    applyLegaisFilter();
}

window.doLogout = function() {
    if (!confirm('Deseja sair do sistema?')) return;
    clearSession();
    state.loggedInUser = null;
    document.getElementById('login-overlay').style.display = 'flex';
    document.getElementById('login-form-area').style.display = 'block';
    document.getElementById('change-pwd-area').style.display = 'none';
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('login-error').style.display = 'none';
};

function applyRoleRestrictions() {
    const admin = isAdmin();
    // Ocultar menus restritos para não-admin
    ['team','clientes'].forEach(view => {
        const btn = document.querySelector(`.side-btn[data-view="${view}"]`);
        if (btn) btn.style.display = admin ? '' : 'none';
    });
}

function applyLegaisFilter() {
    // Sincroniza os 3 checkboxes do filtro "Visualizar:" com o estado
    const f = state.filterView || { all: true, legais: false, semLegais: false };
    const cbAll = document.getElementById('filter-view-all');
    const cbLeg = document.getElementById('filter-view-legais');
    const cbSem = document.getElementById('filter-view-sem-legais');
    if (cbAll) cbAll.checked = !!f.all;
    if (cbLeg) cbLeg.checked = !!f.legais;
    if (cbSem) cbSem.checked = !!f.semLegais;
}

// Handler dos 3 checkboxes. Multi-seleção: marcar "Todos" desmarca os outros dois,
// e marcar qualquer específico desmarca o "Todos". Os 2 específicos coexistem.
window.onFilterViewChange = function(which, checked) {
    if (!state.filterView) state.filterView = { all: true, legais: false, semLegais: false };
    if (which === 'all') {
        state.filterView.all = checked;
        if (checked) { state.filterView.legais = false; state.filterView.semLegais = false; }
    } else {
        state.filterView[which] = checked;
        if (checked) state.filterView.all = false;
        // Se nada estiver marcado, volta automaticamente a "Todos"
        if (!state.filterView.all && !state.filterView.legais && !state.filterView.semLegais) {
            state.filterView.all = true;
        }
    }
    applyLegaisFilter();
    refreshModuleData();
};

const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

/**
 * Default da competência do PAD baseado na data atual:
 *   - Dia < 6  → 2 meses atrás
 *   - Dia ≥ 6  → 1 mês atrás
 * Retorna { month: 0-11, year: YYYY }
 */
function computePadDefaultCompetence() {
    const now = new Date();
    const offset = now.getDate() < 6 ? 2 : 1;
    let month = now.getMonth() - offset;
    let year = now.getFullYear();
    if (month < 0) { month += 12; year -= 1; }
    return { month, year };
}

const __padDefault = computePadDefaultCompetence();

/**
 * ESTADO DA APLICAÇÃO
 */
let state = {
    module: 'PAD',
    view: 'dashboard',
    selectedMonth: __padDefault.month, // 0-indexed; recalculado a cada carga conforme regra do dia 5
    selectedYear: __padDefault.year,
    calendarDate: new Date(),
    currentUser: localStorage.getItem(window.IS_COLABORADOR ? 'delta_currentUser_colab' : 'delta_currentUser_admin') || (window.IS_COLABORADOR ? "Jade Zaira Clavé da Silveira Uchôa de Medeiros" : "Bruno Ramos"),
    isSupervisor: false, // Will be set in init based on currentUser
    appointments: JSON.parse(localStorage.getItem('delta_v2_appointments')) || [],
    team: (JSON.parse(localStorage.getItem('delta_v2_team')) || TEAM_INITIAL).map(m => m.name === 'Bruno Ramos' ? {...m, isSupervisor: true} : m),
    tasks: JSON.parse(localStorage.getItem('delta_v2_tasks')) || [],
    unreadNotifsCount: parseInt(localStorage.getItem('delta_v2_unread')) || 0,
    systemNotifs: JSON.parse(localStorage.getItem('delta_v2_sys_notifs')) || [],
    announcements: JSON.parse(localStorage.getItem('delta_v2_announcements')) || [],
    clientStatuses: {},
    clients: JSON.parse(localStorage.getItem('delta_v2_clients')) || [...CLIENTS_RAW],
    lastRefresh: 0, // V6: Last update timestamp
    refreshInterval: 600000, // 10 minutes in ms
    dataCache: {}, // V7: { 'MODULE_MONTH_YEAR': { ts: Date, statuses: {}, counts: {} } }
    currentRequestId: 0, // V7: To prevent race conditions
    // Smooth Animation State
    currentCounts: { onTime: 0, late: 0, pending: 0 },
    targetCounts: { onTime: 0, late: 0, pending: 0 },
    loggedInUser: null, // { email, name, role: 'admin'|'colaborador', teamMemberName }
    filterView: { all: true, legais: false, semLegais: false }
};

// V4: Clean wipe of client dates as requested
if (!localStorage.getItem('delta_v4_clients_reset')) {
    state.clients.forEach(c => { c.contractStart = ""; c.contractEnd = ""; });
    localStorage.setItem('delta_v2_clients', JSON.stringify(state.clients));
    localStorage.setItem('delta_v4_clients_reset', 'true');
}

// V8: Sync IBGE codes into existing localStorage clients
if (!localStorage.getItem('delta_v9_ibge_sync')) {
    state.clients = state.clients.map(c => {
        const raw = CLIENTS_RAW.find(r => r.code === c.code);
        if (raw && raw.ibge) return { ...c, ibge: raw.ibge };
        return c;
    });
    localStorage.setItem('delta_v2_clients', JSON.stringify(state.clients));
    localStorage.setItem('delta_v9_ibge_sync', 'true');
}

// Sync across tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'delta_v2_appointments') state.appointments = JSON.parse(e.newValue) || [];
    if (e.key === 'delta_v2_tasks') state.tasks = JSON.parse(e.newValue) || [];
    if (e.key === 'delta_v2_announcements') state.announcements = JSON.parse(e.newValue) || [];
    if (e.key === 'delta_v2_sys_notifs') state.systemNotifs = JSON.parse(e.newValue) || [];
    renderCalendar();
    renderTasks();
    updatePendingBadge();
});

/**
 * ELEMENTOS DOM
 */
const el = {
    sideBtns: document.querySelectorAll('.side-btn'),
    moduleTitle: document.getElementById('current-module-title'),
    chart: document.getElementById('pad-chart'),
    chartPercent: document.getElementById('chart-percent'),
    counts: {
        onTime: document.getElementById('count-on-time'),
        late: document.getElementById('count-late'),
        pending: document.getElementById('count-pending')
    },
    filterMonth: document.getElementById('filter-month'),
    filterYear: document.getElementById('filter-year'),
    deadlineInfo: document.getElementById('deadline-info'),
    teamList: document.getElementById('team-list'),
    calendarMonthYear: document.getElementById('calendar-month-year'),
    calendarDays: document.getElementById('calendar-days'),
    birthdayAlert: document.getElementById('birthday-alert'),
    pendingBadge: document.getElementById('pending-badge-header'),
    feedList: document.getElementById('feed-list')
};

/**
 * INICIALIZAÇÃO
 */
async function init() {
    // ── Sincronizar usuários do servidor ─────────────────────
    await fetchUsersFromServer();

    // Entregas Legais são sincronizadas silenciosamente no boot (ver autoSyncLegaisFromServer).
    // O await acontece logo antes de refreshModuleData, garantindo que o filtro
    // "Entregas Legais" já tenha os dados corretos quando a consulta PAD iniciar.

    // ── Migração one-shot: enviar usuários antigos do localStorage para o servidor ──
    // (executa apenas uma vez por browser, para não perder contas criadas antes do servidor)
    if (!localStorage.getItem('delta_users_migrated_v1')) {
        const legacyStr = localStorage.getItem('delta_users');
        if (legacyStr) {
            try {
                const legacy = JSON.parse(legacyStr);
                if (legacy && Object.keys(legacy).length > 0) {
                    await fetch(`${getAuthApiBase()}/api/auth/sync`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ users: legacy })
                    }).then(r => r.json()).then(j => {
                        console.log('[auth] migração:', j);
                    }).catch(e => console.warn('[auth] migração falhou:', e.message));
                    // Refresh do cache após a migração
                    await fetchUsersFromServer();
                }
            } catch {}
        }
        localStorage.setItem('delta_users_migrated_v1', '1');
    }

    // ── Verificar sessão ──────────────────────────────────────
    if (!state.loggedInUser) {
        const session = getCurrentSession();
        if (session) {
            const users = getUsers();
            const user = users[session.email];
            if (user && !user.mustChangePassword) {
                state.loggedInUser = user;
                const member = state.team.find(m => m.name === user.teamMemberName || m.name === user.name);
                state.currentUser = member ? member.name : user.name;
                state.isSupervisor = user.role === 'admin';
                document.getElementById('login-overlay').style.display = 'none';
            } else {
                document.getElementById('login-overlay').style.display = 'flex';
                return; // Aguarda login
            }
        } else {
            document.getElementById('login-overlay').style.display = 'flex';
            return; // Aguarda login
        }
    }
    // ── Fim verificação sessão ────────────────────────────────
    applyRoleRestrictions();
    setupFilters();
    setupEventListeners();
    // Sincroniza marcações de Entregas Legais do servidor antes de consultar o PAD,
    // garantindo que colaboradores enxerguem os mesmos clientes que o admin marcou.
    await autoSyncLegaisFromServer();
    refreshModuleData();
    renderTeam();
    renderCalendar();
    renderTasks();
    renderFeed();
    checkBirthdays();
    
    // V5 Cleanup: Remove all pending requests on start (One-time reset requested)
    if (!localStorage.getItem('delta_v5_cleanup_done')) {
        state.appointments = state.appointments.filter(a => a.status !== 'pending');
        state.announcements = state.announcements.filter(a => a.status !== 'pending');
        localStorage.setItem('delta_v2_appointments', JSON.stringify(state.appointments));
        localStorage.setItem('delta_v2_announcements', JSON.stringify(state.announcements));
        localStorage.setItem('delta_v5_cleanup_done', 'true');
    }

    updatePendingBadge();
    initUserSession();
    checkNotificationPermission();
    
    // Member Creation Event
    const btnAddMember = document.getElementById('btn-add-member');
    if (btnAddMember) btnAddMember.onclick = () => {
        document.getElementById('modal-member-new').classList.remove('hidden');
        setTimeout(() => document.getElementById('new-member-name')?.focus(), 50);
    };
    const formNewMember = document.getElementById('form-new-member');
    if (formNewMember) formNewMember.onsubmit = handleNewMemberSubmit;

    // Periodic Notification Check
    setInterval(checkSystemNotifications, 5000);
    
    // Automatic Data Refresh every 10 minutes
    setInterval(() => {
        console.log("Sistema Delta: Atualização automática de 10 minutos.");
        refreshModuleData(true); 
    }, state.refreshInterval);
    
    // Global ESC Listener to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
        }
    });

    // Status message container - Centered above stats
    if (!document.getElementById('loading-status')) {
        const statsContainer = document.querySelector('.panorama-stats');
        if (statsContainer) {
            const statusSpan = document.createElement('div');
            statusSpan.id = 'loading-status';
            statusSpan.className = 'status-msg';
            statsContainer.prepend(statusSpan); // Place at the top of stats grid
        }
    }

    // Request Notification Permission logic moved to checkNotificationPermission

    // Role-based restrictions
    if (!state.isSupervisor) {
        document.querySelectorAll('.supervisor-only').forEach(el => el.style.display = 'none');

        const restricted = ['MSC', 'SIOPS', 'MGS', 'RREO', 'RGF', 'DCA'];
        el.sideBtns.forEach(btn => {
            if (restricted.includes(btn.dataset.module)) {
                btn.classList.add('disabled');
                btn.title = "Em desenvolvimento / Acesso Restrito";
                btn.disabled = true;
            }
        });
    }

    // Feed Events
    const btnAddFeed = document.getElementById('btn-add-feed');
    if (btnAddFeed) btnAddFeed.addEventListener('click', () => {
        const targetSelect = document.getElementById('feed-target');
        targetSelect.innerHTML = '<option value="all">Todos</option><option value="none">Ninguém</option>';
        state.team.filter(m => m.name !== state.currentUser).forEach(m => {
            targetSelect.innerHTML += `<option value="${m.name}">${m.name}</option>`;
        });
        
        // Auto-fill Current Date/Time
        const now = new Date();
        document.getElementById('feed-date').value = now.toISOString().split('T')[0];
        document.getElementById('feed-time').value = now.toTimeString().split(' ')[0].substring(0, 5);
        
        document.getElementById('btn-feed-submit').style.display = 'block';
        document.getElementById('feed-approval-actions').style.display = 'none';
        document.getElementById('form-feed').reset();
        document.getElementById('modal-feed').classList.remove('hidden');
    });
    const formFeed = document.getElementById('form-feed');
    if (formFeed) formFeed.addEventListener('submit', handleFeedSubmit);

    // Initial load feed and start publisher checker
    renderFeed();
    setInterval(checkAnnouncementPublishing, 60000); // Check every minute
    
    // Real-time Sync (Agressive) - Every 2 seconds
    setInterval(syncStateWithLocalStorage, 2000);
}

function setupFilters() {
    el.filterMonth.innerHTML = '';
    el.filterYear.innerHTML = '';

    if (state.module === 'SIOPE' || state.module === 'SIOPS') {
        const bimestres = ["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre", "5º Bimestre", "6º Bimestre"];
        bimestres.forEach((b, i) => {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = b;
            el.filterMonth.appendChild(opt);
        });
        const labelEl = document.querySelector('label[for="filter-month"]');
        if (labelEl) labelEl.textContent = "Bimestre";
    } else {
        MONTHS.forEach((m, i) => {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = m;
            el.filterMonth.appendChild(opt);
        });
        const labelEl = document.querySelector('label[for="filter-month"]');
        if (labelEl) labelEl.textContent = "Mês / Competência";
    }

    [2025, 2026, 2027].forEach(y => {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        el.filterYear.appendChild(opt);
    });

    // Derive default month/year ONLY if absolutely empty
    if (state.selectedMonth === undefined || state.selectedMonth === null || state.selectedMonth === -1) {
        const now = new Date();
        let defaultMonth, defaultYear = now.getFullYear();
        if (state.module === 'SIOPE' || state.module === 'SIOPS') {
            // Last completed bimester: current bimester index minus 1
            // Bimester index = Math.floor(month / 2): Jan-Feb=0, Mar-Apr=1, May-Jun=2, ...
            const currentBim = Math.floor(now.getMonth() / 2);
            defaultMonth = currentBim - 1;
            if (defaultMonth < 0) { defaultMonth += 6; defaultYear -= 1; }
        } else {
            const def = computePadDefaultCompetence();
            defaultMonth = def.month;
            defaultYear = def.year;
        }
        state.selectedMonth = defaultMonth;
        state.selectedYear = defaultYear;
    }

    el.filterMonth.value = state.selectedMonth;
    el.filterYear.value = state.selectedYear;
}



let _listenersInitialized = false;
function setupEventListeners() {
    if (_listenersInitialized) return;
    _listenersInitialized = true;
    el.sideBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.module) {
                const newIsBimester = btn.dataset.module === 'SIOPE' || btn.dataset.module === 'SIOPS';
                const prevIsBimester = state.module === 'SIOPE' || state.module === 'SIOPS';
                if (newIsBimester && !prevIsBimester) {
                    state.selectedMonth = -1; // Force correct bimester default when entering SIOPE/SIOPS
                }
                state.module = btn.dataset.module;
                state.view = 'dashboard';
                setupFilters(); // Refresh filter labels/options for SIOPE
                refreshModuleData();
            } else if (btn.dataset.view) {
                state.view = btn.dataset.view;
            }
            updateActiveNav(btn);
            updateView();
        });
    });

    el.filterMonth.addEventListener('change', (e) => { state.selectedMonth = parseInt(e.target.value); refreshModuleData(); });
    el.filterYear.addEventListener('change', (e) => { state.selectedYear = parseInt(e.target.value); refreshModuleData(); });
    document.getElementById('btn-refresh').addEventListener('click', () => refreshModuleData(false, true));

    // Form logic: Toggle time inputs
    const fullDayCheckbox = document.getElementById('req-full-day');
    const timeInputs = document.getElementById('time-inputs');
    fullDayCheckbox.addEventListener('change', () => {
        timeInputs.classList.toggle('hidden', fullDayCheckbox.checked);
    });

    // Calendar Navigation
    document.getElementById('prev-month').addEventListener('click', () => { 
        state.calendarDate.setMonth(state.calendarDate.getMonth() - 1); 
        renderCalendar(); 
    });
    document.getElementById('next-month').addEventListener('click', () => { 
        state.calendarDate.setMonth(state.calendarDate.getMonth() + 1); 
        renderCalendar(); 
    });

    // Modals
    const closeBtns = document.querySelectorAll('.close-modal');
    closeBtns.forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    }));

    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', () => openClientsModal(card.dataset.status));
    });

    document.getElementById('btn-request-agenda').addEventListener('click', () => document.getElementById('modal-request').classList.remove('hidden'));
    document.getElementById('form-request').addEventListener('submit', handleRequestSubmit);

    // Notifications Bell Click
    const bellBtn = document.getElementById('btn-header-notificacoes');
    if (bellBtn) {
        bellBtn.addEventListener('click', () => {
            state.view = 'notificacoes';
            updateView();
        });
    }

    // Pendências View Button Listener (for Supervisor button with data-view="notificacoes")
    // Note: dataset.view already handled in general side-btn listener (line 329-341)

    // Clients Mgmt Events
    const btnSaveClients = document.getElementById('btn-save-clients');
    if (btnSaveClients) btnSaveClients.addEventListener('click', saveClientsChanges);
    const btnCancelClients = document.getElementById('btn-cancel-clients');
    if (btnCancelClients) btnCancelClients.addEventListener('click', () => { renderClientsMgmtTable(); alert('Edições descartadas.'); });

    // Task Events
    const btnAddTask = document.getElementById('btn-add-task');
    if (btnAddTask) btnAddTask.addEventListener('click', openTaskModal);
    const formTask = document.getElementById('form-task');
    if (formTask) formTask.addEventListener('submit', handleTaskSubmit);

    // Notification Badge Header
    const btnNotif = document.getElementById('btn-header-notificacoes');
    if (btnNotif) {
        btnNotif.addEventListener('click', () => {
            state.view = 'notificacoes';
            state.unreadNotifsCount = 0;
            localStorage.setItem('delta_v2_unread', 0);
            updatePendingBadge();
            updateActiveNav(null);
            updateView();
        });
    }

    // Header Logo Click - Reset page state
    const btnHome = document.getElementById('header-home-btn');
    if (btnHome) {
        btnHome.addEventListener('click', returnToHome);
    }
} // <--- Fim de setupEventListeners

function returnToHome() {
    state.module = 'PAD';
    state.view = 'dashboard';
    updateActiveNav(document.querySelector('.side-btn[data-module="PAD"]'));
    
    const def = computePadDefaultCompetence();
    state.selectedMonth = def.month;
    state.selectedYear = def.year;
    
    if (el.filterMonth) el.filterMonth.value = state.selectedMonth;
    if (el.filterYear) el.filterYear.value = state.selectedYear;
    
    refreshModuleData();
    updateView();
}

/**
 * USER SESSION & MEMBER MGMT
 */
function initUserSession() {
    const dropdown = document.getElementById('profile-dropdown-menu');
    if (!dropdown) return;

    dropdown.innerHTML = '';

    // Com login ativo, o dropdown exibe apenas o próprio usuário logado
    // (não é mais permitido trocar de identidade via interface)
    const loggedEmail = state.loggedInUser ? state.loggedInUser.email : null;
    const membersToShow = loggedEmail
        ? state.team.filter(m => m.name === state.currentUser)
        : state.team; // fallback sem login (não deve acontecer)

    membersToShow.forEach(m => {
        const item = document.createElement('div');
        item.className = `profile-item active`;

        const firstName = m.name.split(' ')[0];
        const initials = m.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        const roleLabel = state.isSupervisor ? 'Admin' : 'Colaborador';

        item.innerHTML = `
            <div class="member-chip" style="width:25px; height:25px; font-size:0.6rem; flex-shrink:0; display:flex; align-items:center; justify-content:center;">${initials}</div>
            <div style="display:flex; flex-direction:column; overflow:hidden;">
                <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-weight:600;">${firstName}</span>
                <span style="font-size:0.68rem; color:var(--text-muted);">${roleLabel}</span>
            </div>
        `;
        // Sem onclick — troca de identidade não é permitida após login
        dropdown.appendChild(item);
    });

    syncUserIdentity();
}

function toggleProfileMenu(force) {
    const menu = document.getElementById('profile-dropdown-menu');
    if (!menu) return;
    if (typeof force === 'boolean') {
        if (force) menu.classList.add('active');
        else menu.classList.remove('active');
    } else {
        menu.classList.toggle('active');
    }
}

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
    const profileArea = document.querySelector('.profile-area-container');
    if (profileArea && !profileArea.contains(e.target)) {
        toggleProfileMenu(false);
    }
});

function switchUser(name) {
    // Com sistema de login ativo, não é permitido trocar de identidade
    if (state.loggedInUser && name !== state.currentUser) {
        return; // silencioso — não há mais seletor livre de usuário
    }

    state.currentUser = name;
    localStorage.setItem(window.IS_COLABORADOR ? 'delta_currentUser_colab' : 'delta_currentUser_admin', name);
    syncUserIdentity();
    
    // Re-render role-dependent UI
    renderTeam();
    renderTasks();
    renderCalendar();
    renderFeed();
    updatePendingBadge();
    
    // alert(`Perfil alterado: ${name}`); // User requested confirmation, alert might be redundant now but confirm covers the 'trying' part.
}

function syncUserIdentity() {
    const member = state.team.find(m => m.name === state.currentUser);
    state.isSupervisor = member ? !!member.isSupervisor : false;
    
    const nameDisplay = document.getElementById('header-user-name');
    const photoDisplay = document.getElementById('header-user-photo');
    
    if (nameDisplay) {
        const prefix = state.isSupervisor ? "Supervisor" : "Colaborador";
        nameDisplay.textContent = `${prefix}: ${state.currentUser}`;
    }

    if (photoDisplay && member) {
        if (member.photoData) {
            // Foto enviada pelo admin (base64)
            photoDisplay.src = member.photoData;
        } else {
            // Fallback: arquivo estático ou UI Avatars
            const firstName = state.currentUser.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/gi, '');
            const staticUrl = `team_photos/${firstName}.jpg`;
            const fallback  = `https://ui-avatars.com/api/?name=${encodeURIComponent(state.currentUser)}&background=${state.isSupervisor ? '005eb8' : 'fff'}&color=${state.isSupervisor ? 'fff' : '005eb8'}`;
            photoDisplay.onerror = () => { photoDisplay.onerror = null; photoDisplay.src = fallback; };
            photoDisplay.src = staticUrl;
        }
    }
    
    // Toggle supervisor-only elements
    document.querySelectorAll('.supervisor-only').forEach(el => {
        el.style.display = state.isSupervisor ? 'flex' : 'none';
    });
    
    // Update active state in dropdown if open
    document.querySelectorAll('.profile-item').forEach(item => {
        item.classList.toggle('active', item.textContent.includes(state.currentUser));
    });
}

/**
 * PLANNER HELPERS
 */
function toggleTaskColumn(status) {
    const col = document.getElementById(`col-${status}`);
    if (col) {
        col.classList.toggle('minimized');
    }
}

function updateView() {
    document.querySelectorAll('.view-section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(`view-${state.view}`) || document.getElementById('view-dashboard');
    if (target) target.classList.remove('hidden');

    if (state.view === 'membros') renderMembersListView();
    if (state.view === 'config') renderClientsMgmtTable();
}

function renderMembersListView() {
    const container = document.getElementById('view-membros');
    if (!container) return;
    container.innerHTML = `
        <div class="card fade-in">
            <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
                <h2>👥 Gestão de Membros da Equipe</h2>
                <button class="btn-primary supervisor-only" onclick="document.getElementById('modal-member-new').classList.remove('hidden')">＋ Novo Membro</button>
            </div>
            <div class="members-list-vertical" style="display:flex; flex-direction:column; gap:15px; margin-top:20px;">
                ${state.team.map((m, idx) => {
                    const firstName = m.name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/gi, '');
                    const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=005eb8&color=fff`;
                    const staticUrl  = `team_photos/${firstName}.jpg`;
                    const photoSrc   = m.photoData || staticUrl;
                    return `
                    <div class="member-row card" id="member-row-${idx}" style="display:flex; align-items:center; justify-content:space-between; padding:15px; background:var(--bg-light);">
                        <div style="display:flex; gap:20px; flex-grow:1; align-items:center;">

                            <!-- Foto com upload (admin) -->
                            <div style="position:relative; flex-shrink:0;">
                                <img id="member-photo-${idx}"
                                    src="${photoSrc}"
                                    onerror="this.onerror=null; this.src='${fallbackUrl}';"
                                    alt="${m.name}"
                                    style="width:60px; height:60px; border-radius:50%; object-fit:cover; border:2px solid var(--primary-light);">
                                ${state.isSupervisor ? `
                                    <label for="photo-upload-${idx}" title="Trocar foto"
                                        style="position:absolute; bottom:0; right:0; background:var(--primary); color:#fff; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:0.7rem; box-shadow:0 1px 4px rgba(0,0,0,0.3);">📷
                                    </label>
                                    <input type="file" id="photo-upload-${idx}" accept="image/*"
                                        style="display:none;"
                                        onchange="uploadMemberPhoto(${idx}, this.files[0])">
                                ` : ''}
                            </div>

                            <div style="flex-grow:1; display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                                <div class="form-group" style="margin:0;">
                                    <label style="font-size:0.7rem; color:var(--text-muted);">Nome</label>
                                    <input type="text" value="${m.name}" onchange="updateMemberData(${idx}, 'name', this.value)" ${!state.isSupervisor ? 'disabled' : ''}>
                                </div>
                                <div class="form-group" style="margin:0;">
                                    <label style="font-size:0.7rem; color:var(--text-muted);">Data Admissão (DD/MM/AAAA)</label>
                                    <input type="text" value="${m.admissionDate || '01/01/2026'}" placeholder="DD/MM/AAAA" onchange="updateMemberData(${idx}, 'admissionDate', this.value)" ${!state.isSupervisor ? 'disabled' : ''}>
                                </div>
                                <div class="form-group" style="margin:0;">
                                    <label style="font-size:0.7rem; color:var(--text-muted);">E-mail (login)</label>
                                    <input type="email" value="${m.email || ''}" placeholder="nome@deltainf.com.br" onchange="updateMemberData(${idx}, 'email', this.value)" ${!state.isSupervisor ? 'disabled' : ''}>
                                </div>
                                <div class="form-group" style="margin:0;">
                                    <label style="font-size:0.7rem; color:var(--text-muted);">Perfil de Acesso</label>
                                    <select onchange="updateMemberData(${idx}, 'role', this.value)" ${!state.isSupervisor ? 'disabled' : ''} style="width:100%; padding:8px; border:1.5px solid #ddd; border-radius:6px; font-family:inherit;">
                                        <option value="colaborador" ${(m.role||'colaborador')==='colaborador'?'selected':''}>Colaborador</option>
                                        <option value="admin" ${m.role==='admin'?'selected':''}>Admin</option>
                                    </select>
                                </div>
                                ${state.isSupervisor ? `
                                <div class="form-group" style="margin:0; grid-column: 1 / -1;">
                                    <label style="font-size:0.7rem; color:var(--text-muted);">Senha para Primeiro Acesso <span style="color:#888;">(deixe em branco para não alterar)</span></label>
                                    <div style="display:flex; gap:8px; align-items:center;">
                                        <input type="text" id="new-pwd-member-${idx}" placeholder="Ex: Delta@2026" style="flex:1;">
                                        <button onclick="setMemberInitialPassword(${idx})" class="btn-primary" style="white-space:nowrap; padding:8px 14px; font-size:0.8rem;">Definir Senha</button>
                                    </div>
                                </div>` : ''}
                            </div>
                        </div>
                        ${state.isSupervisor ? `
                            <button class="btn-remove-member" onclick="removeMemberWithFade(${idx})" style="position:static; margin-left:20px; font-size:1.2rem;" title="Remover Membro">🗑️</button>
                        ` : ''}
                    </div>
                `}).join('')}
            </div>
        </div>
    `;
}

window.updateMemberData = (idx, field, value) => {
    const member = state.team[idx];
    if (!member) return;

    if (field === 'email') {
        // Renomeia a conta em delta_users: old email → new email
        const oldEmail = (member.email || '').toLowerCase().trim();
        const newEmail = (value || '').toLowerCase().trim();
        if (newEmail && oldEmail !== newEmail) {
            const users = getUsers();
            if (oldEmail && users[oldEmail]) {
                // Move conta para o novo e-mail
                users[newEmail] = { ...users[oldEmail], email: newEmail, teamMemberName: member.name };
                delete users[oldEmail];
            } else if (users[newEmail]) {
                // Novo e-mail já tem conta: só atualiza o vínculo
                users[newEmail].teamMemberName = member.name;
            }
            // (Se não havia conta, não cria — precisa usar "Definir Senha")
            saveUsers(users);
        }
        member.email = newEmail || value;

    } else if (field === 'role') {
        // Atualiza o perfil também em delta_users
        member.role = value;
        const email = (member.email || '').toLowerCase().trim();
        if (email) {
            const users = getUsers();
            if (users[email]) {
                users[email].role = value;
                saveUsers(users);
            }
        }

    } else if (field === 'name') {
        // Atualiza o nome também em delta_users (para teamMemberName e name)
        const email = (member.email || '').toLowerCase().trim();
        if (email) {
            const users = getUsers();
            if (users[email]) {
                users[email].name = value;
                users[email].teamMemberName = value;
                saveUsers(users);
            }
        }
        member.name = value;

    } else {
        member[field] = value;
    }

    localStorage.setItem('delta_v2_team', JSON.stringify(state.team));
    renderTeam();
};

window.removeMemberWithFade = (idx) => {
    if (!confirm('Deseja remover este membro permanentemente?')) return;
    const el = document.getElementById(`member-row-${idx}`);
    if (el) {
        el.classList.add('fade-out-del');
        setTimeout(() => {
            const memberName = state.team[idx].name;
            state.team.splice(idx, 1);
            localStorage.setItem('delta_v2_team', JSON.stringify(state.team));
            renderMembersListView();
            renderTeam();
            initUserSession();
            alert(`Perfil de '${memberName}' removido.`);
        }, 500);
    }
};

function handleNewMemberSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('new-member-name').value;
    const bday = document.getElementById('new-member-bday').value;
    const year = parseInt(document.getElementById('new-member-year').value);
    const isSup = document.getElementById('new-member-is-supervisor').checked;

    if (state.team.find(m => m.name === name)) {
        alert('Este membro já existe.');
        return;
    }

    const roleNew = (document.getElementById('new-member-role') || {}).value || 'colaborador';
    const emailNew = ((document.getElementById('new-member-email') || {}).value || '').trim().toLowerCase();
    const pwdNew   = ((document.getElementById('new-member-initial-pwd') || {}).value || '').trim();
    const newMember = { name, birthday: bday, year, isSupervisor: isSup, email: emailNew, role: roleNew };
    state.team.push(newMember);
    localStorage.setItem('delta_v2_team', JSON.stringify(state.team));

    if (emailNew && pwdNew) {
        const users = getUsers();
        users[emailNew] = {
            email: emailNew, name, role: roleNew,
            passwordHash: hashPassword(pwdNew),
            mustChangePassword: true,
            teamMemberName: name
        };
        saveUsers(users);
    }

    renderTeam();
    initUserSession();
    document.getElementById('modal-member-new').classList.add('hidden');
    e.target.reset();
    alert(`Novo perfil '${name}' criado!${emailNew && pwdNew ? '\nAcesso de login criado para ' + emailNew : ''}`);
}

window.setMemberInitialPassword = function(idx) {
    const member = state.team[idx];
    if (!member) return;
    const pwdInput = document.getElementById(`new-pwd-member-${idx}`);
    const pwd = (pwdInput ? pwdInput.value : '').trim();
    if (!pwd) { alert('Informe a nova senha de acesso.'); return; }
    if (!member.email) { alert('Informe o e-mail do membro antes de definir a senha.'); return; }

    const users = getUsers();
    const email = member.email.toLowerCase().trim();
    const role  = member.role || 'colaborador';
    const jaExistia = !!users[email];

    users[email] = {
        email,
        name: member.name,
        role,
        passwordHash: hashPassword(pwd),
        mustChangePassword: true,
        teamMemberName: member.name
    };
    saveUsers(users);
    if (pwdInput) pwdInput.value = '';
    const acao = jaExistia ? 'atualizado' : 'criado';
    alert(`✅ Acesso ${acao} para ${member.name} (${email}).\nEle deverá trocar a senha no próximo login.`);
};

/**
 * Upload de foto de membro da equipe (admin only).
 * Lê o arquivo como base64 e armazena em state.team[idx].photoData.
 */
window.uploadMemberPhoto = function(idx, file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Selecione um arquivo de imagem (JPG, PNG, etc.).'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('A imagem deve ter no máximo 5 MB.'); return; }

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        state.team[idx].photoData = base64;
        localStorage.setItem('delta_v2_team', JSON.stringify(state.team));

        // Atualiza a foto na tela sem re-renderizar todo o formulário
        const imgEl = document.getElementById(`member-photo-${idx}`);
        if (imgEl) imgEl.src = base64;

        // Atualiza os cards da equipe e o header se for o usuário logado
        renderTeam();
        if (state.team[idx].name === state.currentUser) syncUserIdentity();
    };
    reader.readAsDataURL(file);
};

/**
 * SEEDED DETERMINISTIC HASH
 * Generates a stable 0-1 float based on a string key.
 * Same key = same result every time (no random on refresh).
 */
function seededHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) / 2147483647;
}

// URL dinâmica: Vercel e acesso local usam o mesmo origin; arquivo local usa localhost
// SERVER_URL: tenta localhost primeiro (Chrome permite HTTP localhost a partir de HTTPS).
// Se local não responder, usa a origem atual (Vercel) como fallback.
let SERVER_URL = 'http://localhost:3131';
let serverAvailable = null;

// Helper: fetch com timeout compatível com todos os browsers
async function fetchWithTimeout(url, options = {}, timeoutMs = 12000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const headers = { 'Bypass-Tunnel-Reminder': 'true', ...(options.headers || {}) };
        const response = await fetch(url, { ...options, signal: controller.signal, headers });
        return response;
    } finally {
        clearTimeout(timer);
    }
}

// Verifica servidores: tenta localhost primeiro, depois Vercel como fallback
async function checkServer() {
    if (serverAvailable === true) return true;

    // 1. Tenta servidor local (acessa TCE-RS sem bloqueio de IP)
    try {
        const r = await fetchWithTimeout('http://localhost:3131/api/health', { cache: 'no-store' }, 4000);
        if (r.ok) {
            SERVER_URL = 'http://localhost:3131';
            serverAvailable = true;
            console.log('Delta Server: Servidor LOCAL online ✅');
            return true;
        }
    } catch (e) {
        console.warn('Delta Server: Localhost indisponível →', e.message);
    }

    // 2. Tenta servidor Vercel como fallback
    const remoteOrigin = window.location.origin;
    if (remoteOrigin && !remoteOrigin.startsWith('file') && remoteOrigin !== 'null') {
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                const r = await fetchWithTimeout(`${remoteOrigin}/api/health`, { cache: 'no-store' }, 8000);
                if (r.ok) {
                    SERVER_URL = remoteOrigin;
                    serverAvailable = true;
                    console.log('Delta Server: Servidor VERCEL online ✅');
                    return true;
                }
            } catch (e) {
                if (attempt < 2) await new Promise(r => setTimeout(r, 1500));
            }
        }
    }

    serverAvailable = false;
    console.error('Delta Server: Nenhum servidor disponível.');
    return false;
}

/**
 * LOGICA PANORAMA
 */
async function refreshModuleData(isAuto = false, isForce = false) {
    const cacheKey = `${state.module}_${state.selectedMonth}_${state.selectedYear}`;
    const nowTs = Date.now();
    const cacheLimit = 600000; // 10 minutes

    // V8 Cache Check: If manual switch (not force) and we have fresh data, restore and return
    if (!isForce && !isAuto && state.dataCache[cacheKey]) {
        const cache = state.dataCache[cacheKey];
        if (nowTs - cache.ts < cacheLimit) {
            console.log(`Sistema Delta: Restaurando cache para ${cacheKey}`);
            state.clientStatuses = cache.statuses;
            state.targetCounts = cache.counts;
            state.currentCounts = { ...cache.counts }; 
            state.lastRefresh = cache.ts;
            el.moduleTitle.textContent = state.module;
            
            if (state.module === 'SIOPE') updateSIOPEDeadline();
            else updateDeadlineInfo();
            
            // Trigger UI update immediately
            updateCountsAndChart(state.currentCounts.onTime, state.currentCounts.late, state.currentCounts.pending, true);
            startAnimationLoop();
            return;
        }
    }

    if (isAuto && (nowTs - state.lastRefresh < state.refreshInterval)) return;
    
    // Reset visual state for clean transition if not auto-refresh
    if (!isAuto) {
        state.targetCounts = { onTime: 0, late: 0, pending: 0 };
        state.currentCounts = { onTime: 0, late: 0, pending: 0 };
        updateCountsAndChart(0, 0, 0, true);
    }
    
    state.lastRefresh = nowTs;
    if (isForce) delete state.dataCache[cacheKey]; 
    const currentReqId = ++state.currentRequestId; // Increment and capture locally

    el.moduleTitle.textContent = state.module;
    const today = new Date();

    hideLoadingStatus(); // Clear any previous status message

    if (state.module === 'SIOPE') {
        await processSIOPELogic(cacheKey);
        return;
    }

    if (state.module === 'SIOPS') {
        processSIOPSLogic(cacheKey);
        return;
    }

    updateDeadlineInfo();

    if (state.module === 'PAD') {
        await refreshPADfromServer(currentReqId); // Use local ID for strict check
    } else {
        refreshSimulated();
        state.dataCache[cacheKey] = { ts: Date.now(), statuses: {...state.clientStatuses}, counts: {...state.targetCounts} };
    }
}

function updateDeadlineInfo() {
    const lastDay = new Date(state.selectedYear, state.selectedMonth + 1, 0);
    const deadline = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + 30);
    el.deadlineInfo.innerHTML = `📅 Prazo Final ${state.module} (${MONTHS[state.selectedMonth]}): <strong>${deadline.toLocaleDateString('pt-BR')}</strong>`;
}

async function processSIOPELogic(cacheKey) {
    const today = new Date();
    const bimNum = state.selectedMonth + 1; // 1 to 6
    const endMonths = [1, 3, 5, 7, 9, 11];
    const bimEndDate = new Date(state.selectedYear, endMonths[state.selectedMonth] + 1, 0);

    updateSIOPEDeadline();

    const pmClients = state.clients.filter(c => c.type === 'PM' || c.type === 'Pref');

    // Bimestre not finished yet: all pending
    if (today <= bimEndDate) {
        const statuses = {};
        pmClients.forEach(c => { statuses[c.code] = 'pending'; });
        state.clientStatuses = statuses;
        state.targetCounts = { onTime: 0, late: 0, pending: pmClients.length };
        state.dataCache[cacheKey] = { ts: Date.now(), statuses: {...statuses}, counts: {...state.targetCounts} };
        hideLoadingStatus();
        startAnimationLoop();
        return;
    }

    // Show loading while querying FNDE
    const statusEl = document.getElementById('loading-status');
    if (statusEl) {
        statusEl.textContent = 'Consultando FNDE...';
        statusEl.style.display = 'block';
        statusEl.className = 'status-msg status-loading';
    }

    try {
        const ibges = pmClients.map(c => c.ibge).filter(Boolean);
        const response = await fetchWithTimeout(`${SERVER_URL}/api/siope-status-batch`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ibges, bimestre: bimNum, ano: state.selectedYear })
        }, 30000);

        if (!response.ok) throw new Error(`SIOPE server ${response.status}`);
        const data = await response.json();

        const statuses = {};
        pmClients.forEach(c => {
            const r = c.ibge ? data[c.ibge] : null;
            statuses[c.code] = r ? r.status : 'pending';
        });

        state.clientStatuses = statuses;
        let onTime = 0, late = 0, pending = 0;
        Object.values(statuses).forEach(s => {
            if (s === 'on-time') onTime++;
            else if (s === 'late') late++;
            else pending++;
        });

        state.targetCounts = { onTime, late, pending };
        state.dataCache[cacheKey] = { ts: Date.now(), statuses: {...statuses}, counts: {...state.targetCounts} };

    } catch (e) {
        // On failure mark all pending
        const statuses = {};
        pmClients.forEach(c => { statuses[c.code] = 'pending'; });
        state.clientStatuses = statuses;
        state.targetCounts = { onTime: 0, late: 0, pending: pmClients.length };
        if (statusEl) {
            statusEl.textContent = '⚠️ Falha ao consultar FNDE';
            statusEl.className = 'status-msg';
        }
    }

    hideLoadingStatus();
    startAnimationLoop();
}

function hideLoadingStatus() {
    const statusEl = document.getElementById('loading-status');
    if (statusEl) {
        statusEl.textContent = '';
        statusEl.style.opacity = '1';
        statusEl.className = 'status-msg';
    }
}

function updateSIOPEDeadline() {
    const bimNum = state.selectedMonth + 1;
    const endMonths = [1, 3, 5, 7, 9, 11];
    const bimEndDate = new Date(state.selectedYear, endMonths[state.selectedMonth] + 1, 0);
    const deadline = new Date(bimEndDate.getFullYear(), bimEndDate.getMonth(), bimEndDate.getDate() + 30);
    const bimLabel = `${bimNum}º Bimestre`;
    const siopeLink = "https://www.fnde.gov.br/siope/recibosTransmissao.do?tipoDeRecibo=1&cod_uf_mun=43&consultar=Consultar";
    el.deadlineInfo.innerHTML = `📅 Monitoramento SIOPE | ${bimLabel} / ${state.selectedYear} | Foco: Prefeituras (PM) <a href="${siopeLink}" target="_blank" style="color:var(--secondary-blue); text-decoration:underline; margin-left:10px;">Consulte no FNDE</a>`;
}

function processSIOPSLogic(cacheKey) {
    const today = new Date();
    const bimNum = state.selectedMonth + 1;
    const endMonths = [1, 3, 5, 7, 9, 11];
    const bimEndDate = new Date(state.selectedYear, endMonths[state.selectedMonth] + 1, 0);
    
    // SIOPS Deadline is typically 30 days after end of bimestre too
    const deadline = new Date(bimEndDate.getFullYear(), bimEndDate.getMonth(), bimEndDate.getDate() + 30);
    
    const bimLabel = `${bimNum}º Bimestre`;
    const siopsLink = "http://siops.datasus.gov.br/hist_sitentrega_mun.php";
    el.deadlineInfo.innerHTML = `📅 Monitoramento SIOPS | ${bimLabel} / ${state.selectedYear} | Foco: Prefeituras (PM) <a href="${siopsLink}" target="_blank" style="color:var(--secondary-blue); text-decoration:underline; margin-left:10px;">Consulte no DATASUS</a>`;

    const pmClients = state.clients.filter(c => c.type === 'PM' || c.type === 'Pref');
    const statuses = {};
    
    pmClients.forEach(c => {
        if (today < bimEndDate) {
            // Bimestre nem terminou ainda
            statuses[c.code] = 'pending';
        } else {
            const seed = seededHash(c.code + state.selectedMonth + state.selectedYear + "SIOPS");
            
            // Lógica para 2026: Conforme verificado nos links oficiais (Capão do Leão e Arroio do Padre),
            // os dados de 2026 ainda estão vazios no DATASUS.
            if (state.selectedYear >= 2026) {
                // Forçamos 100% como pendente para 2026 para evitar inconsistências com o portal real
                statuses[c.code] = 'pending';
            } else {
                // Para anos anteriores, a maioria já enviou (70% chance)
                if (seed > 0.3) statuses[c.code] = 'on-time';
                else statuses[c.code] = 'pending';
            }
        }
    });

    state.clientStatuses = statuses;
    let onTime = 0, late = 0, pending = 0;
    Object.values(statuses).forEach(s => {
        if (s === 'on-time') onTime++;
        else if (s === 'late') late++;
        else pending++;
    });

    state.targetCounts = { onTime, late, pending };
    state.dataCache[cacheKey] = { ts: Date.now(), statuses: {...statuses}, counts: {...state.targetCounts} };
    startAnimationLoop();
}



async function refreshPADfromServer(reqId) {
    const lastDay = new Date(state.selectedYear, state.selectedMonth + 1, 0);
    const deadline = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + 30);
    const today = new Date();

    const hasServer = await checkServer();
    if (!hasServer) {
        el.deadlineInfo.innerHTML += ` <span style="color:#e67e22; font-size:0.8rem;">⚠️ Servidor offline</span>`;
        if (reqId === state.currentRequestId) refreshSimulated();
        return;
    }

    const statusEl = document.getElementById('loading-status');
    if (statusEl) {
        statusEl.textContent = 'Aguarde...';
        statusEl.style.display = 'block'; // Ensure visibility
        statusEl.className = 'status-msg status-loading';
    }

    state.clientStatuses = {};
    
    // Filter by Contract End Date (Only if end date is set)
    const activeClients = state.clients.filter(c => isClientActive(c, state.selectedMonth, state.selectedYear) && applyLegaisClientFilter(c));
    
    // Ensure animation loop is running toward the new total
    state.targetCounts = { onTime: 0, late: 0, pending: activeClients.length };
    startAnimationLoop();

    // Uma única chamada batch — server faz fetch paralelo de todos os PMs.
    // Muito mais confiável que 100+ requisições individuais (cada uma com
    // potencial cold-start no Vercel).
    try {
        const orgaos = activeClients.map(c => c.code);
        const batchUrl = `${SERVER_URL}/api/pad-status-batch`;
        const response = await fetchWithTimeout(batchUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orgaos, ano: state.selectedYear, mes: state.selectedMonth + 1 })
        }, 58000); // dentro do budget de 60s do Vercel

        if (reqId !== state.currentRequestId) return;
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const batchResult = await response.json();

        // Aplica status para cada cliente
        for (const c of activeClients) {
            const r = batchResult[c.code];
            const status = (r && r.status) ? r.status : 'pending';
            state.clientStatuses[c.code] = status;

            if (status === 'late') {
                const notifyKey = `${c.code}_${state.selectedMonth}_${state.selectedYear}`;
                const notified = JSON.parse(localStorage.getItem('delta_v2_notified_keys') || '[]');
                if (!notified.includes(notifyKey)) {
                    state.systemNotifs.push({
                        code: c.code,
                        month: state.selectedMonth,
                        msg: `${c.type} ${c.name} enviou o PAD (Competência: ${MONTHS[state.selectedMonth]}) APÓS o prazo.`
                    });
                    state.unreadNotifsCount++;
                    localStorage.setItem('delta_v2_sys_notifs', JSON.stringify(state.systemNotifs));
                    localStorage.setItem('delta_v2_unread', state.unreadNotifsCount);
                    updatePendingBadge();
                    showBrowserNotification("Envio Atrasado", `${c.type} ${c.name} enviou o PAD de ${MONTHS[state.selectedMonth]} fora do prazo.`, "Bruno");
                    notified.push(notifyKey);
                    localStorage.setItem('delta_v2_notified_keys', JSON.stringify(notified));
                }
            }
        }
    } catch (err) {
        console.error('Erro na consulta batch PAD:', err.message);
        // Sem resposta do server: marca todos como pending (honesto)
        for (const c of activeClients) state.clientStatuses[c.code] = 'pending';
    }

    if (reqId !== state.currentRequestId) return;

    let onTime = 0, late = 0, pendingCount = 0;
    activeClients.forEach(c => {
        const s = state.clientStatuses[c.code];
        if (s === 'on-time') onTime++;
        else if (s === 'late') late++;
        else pendingCount++;
    });
    state.targetCounts = { onTime, late, pending: pendingCount };
    startAnimationLoop();

    if (statusEl) {
        statusEl.textContent = 'Sucesso ✅';
        statusEl.className = 'status-msg status-success';
        
        // Cache result
        const cacheKey = `${state.module}_${state.selectedMonth}_${state.selectedYear}`;
        state.dataCache[cacheKey] = { ts: Date.now(), statuses: {...state.clientStatuses}, counts: {...state.targetCounts} };

        setTimeout(() => { 
            if (statusEl.textContent === 'Sucesso ✅') {
                statusEl.style.transition = 'opacity 1s';
                statusEl.style.opacity = '0';
                setTimeout(() => { statusEl.textContent = ''; statusEl.style.opacity = '1'; }, 1000);
            }
        }, 3000);
    }
}

function isClientActive(client, month, year) {
    if (!client.contractEnd) return true; // Empty = Active
    const [cy, cm, cd] = client.contractEnd.split('-').map(Number);
    const endDay = new Date(cy, cm - 1, cd);
    const viewDay = new Date(year, month, 1);
    return viewDay <= endDay;
}

// Cliente está com "Entregas Legais ativas hoje"?
function isClientLegaisActive(c) {
    if (!c.entregasLegais) return false;
    const today = new Date();
    if (c.entregasLegaisStart) {
        const start = new Date(c.entregasLegaisStart);
        if (today < start) return false;
    }
    if (c.entregasLegaisEnd) {
        const end = new Date(c.entregasLegaisEnd);
        if (today > end) return false;
    }
    return true;
}

function applyLegaisClientFilter(c) {
    const f = state.filterView || { all: true, legais: false, semLegais: false };
    // "Todos" marcado → mostra tudo
    if (f.all) return true;
    // Nenhum marcado → mostra tudo (defensivo)
    if (!f.legais && !f.semLegais) return true;
    const active = isClientLegaisActive(c);
    if (f.legais   && active)   return true;
    if (f.semLegais && !active) return true;
    return false;
}

function refreshSimulated() {
    const lastDay = new Date(state.selectedYear, state.selectedMonth + 1, 0);
    const deadline = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() + 30);
    const today = new Date();

    let onTime = 0, late = 0, pending = 0;
    state.clientStatuses = {};

    const activeClients = state.clients.filter(c => isClientActive(c, state.selectedMonth, state.selectedYear) && applyLegaisClientFilter(c));

    activeClients.forEach(c => {
        const status = getSimulatedStatus(c.code, deadline, today);
        state.clientStatuses[c.code] = status;
        if (status === 'on-time') onTime++;
        else if (status === 'late') late++;
        else pending++;
    });

    state.targetCounts = { onTime, late, pending };
    startAnimationLoop();
}

function getSimulatedStatus(code, deadline, today) {
    // Sem servidor disponível ou falha individual: não temos como saber o status
    // real. Retornar 'pending' (honesto) em vez de chutar com dados defasados.
    // Os hardcoded antigos (Jan/Fev/Mar/Abr 2026) ficaram errados após as PMs
    // continuarem enviando ao longo do tempo, então foram removidos.
    return 'pending';
}

let isAnimating = false;
function startAnimationLoop() {
    if (isAnimating) return;
    isAnimating = true;
    requestAnimationFrame(animationTick);
}

function animationTick() {
    const precision = 0.5; // Smoothness vs speed
    let needsMore = false;

    ['onTime', 'late', 'pending'].forEach(key => {
        const diff = state.targetCounts[key] - state.currentCounts[key];
        if (Math.abs(diff) > 0.05) {
            state.currentCounts[key] += diff * 0.1; // Smooth easing
            needsMore = true;
        } else {
            state.currentCounts[key] = state.targetCounts[key];
        }
    });

    updateCountsAndChart(state.currentCounts.onTime, state.currentCounts.late, state.currentCounts.pending, true);

    if (needsMore) {
        requestAnimationFrame(animationTick);
    } else {
        isAnimating = false;
    }
}

function updateCountsAndChart(onTime, late, pending, skipSave = false) {
    el.counts.onTime.textContent = Math.round(onTime);
    el.counts.late.textContent = Math.round(late);
    el.counts.pending.textContent = Math.round(pending);

    // V7 Fix: Filter total based on current module
    const allActive = state.clients.filter(c => isClientActive(c, state.selectedMonth, state.selectedYear) && applyLegaisClientFilter(c));
    const relevantClients = (state.module === 'SIOPE') ? allActive.filter(c => c.type === 'PM' || c.type === 'Pref') : allActive;
    
    const total = relevantClients.length || 1;
    const pOnTime = (onTime / total) * 100;
    const pLateValue = (late / total) * 100;
    const pPendingValue = (pending / total) * 100;
    
    const pSent = ((onTime + late) / total) * 100;
    el.chartPercent.textContent = `${Math.round(pSent)}%`;
    
    updateLegendLabels(pOnTime, pLateValue, pPendingValue);

    const s2 = pOnTime + pLateValue;
    el.chart.style.background = `conic-gradient(var(--success) 0% ${pOnTime}%, var(--warning) ${pOnTime}% ${s2}%, var(--danger) ${s2}% 100%)`;
}

function updateLegendLabels(pOnTime, pLateValue, pPendingValue) {
    const legends = document.querySelectorAll('.legend-item');
    if (legends && legends.length >= 3) {
        if (state.module === 'SIOPS') {
            legends[0].innerHTML = `<span class="dot on-time"></span> Entregues - ${Math.round(pOnTime)}%`;
            legends[1].style.display = 'none'; // Hide Late
            legends[2].innerHTML = `<span class="dot pending"></span> Não Entregues - ${Math.round(pPendingValue)}%`;
        } else {
            legends[0].innerHTML = `<span class="dot on-time"></span> No Prazo - ${Math.round(pOnTime)}%`;
            legends[1].style.display = 'flex';
            legends[1].innerHTML = `<span class="dot late"></span> Envios Atrasados - ${Math.round(pLateValue)}%`;
            legends[2].innerHTML = `<span class="dot pending"></span> Não Enviados - ${Math.round(pPendingValue)}%`;
        }
    }
}

function openClientsModal(status) {
    const titleStatus = { 'on-time': 'NO PRAZO', 'late': 'ATRASADOS', 'pending': 'PENDENTES' };
    document.getElementById('modal-clients-title').textContent = `Detalhamento: ${titleStatus[status]}`;
    
    const body = document.querySelector('#modal-clients .modal-body');
    body.innerHTML = '<div id="grouped-clients-container" class="grouped-clients-grid"></div>';
    const container = document.getElementById('grouped-clients-container');
    
    const allActive = state.clients.filter(c => isClientActive(c, state.selectedMonth, state.selectedYear) && applyLegaisClientFilter(c));
    const groups = [
        { id: 'PM', label: 'PREFEITURAS (PM)', filter: c => c.type === 'PM' || c.type === 'Pref' },
        { id: 'CM', label: 'CÂMARAS (CM)', filter: c => c.type === 'CM' || c.type === 'Cam' },
        { id: 'OUTROS', label: 'OUTROS (Consórcios/Inst.)', filter: c => !['PM', 'Pref', 'CM', 'Cam'].includes(c.type) }
    ];

    // V7 SIOPE: Only show PM group
    const relevantGroups = (state.module === 'SIOPE') ? groups.filter(g => g.id === 'PM') : groups;

    relevantGroups.forEach(group => {
        const groupTotalClients = allActive.filter(group.filter);
        const groupFilteredClients = groupTotalClients.filter(c => state.clientStatuses[c.code] === status);
        
        // Calculate percentage of THIS status within THIS group
        const percent = groupTotalClients.length > 0 ? Math.round((groupFilteredClients.length / groupTotalClients.length) * 100) : 0;
        
        const groupDiv = document.createElement('div');
        groupDiv.className = 'client-group-col';
        groupDiv.innerHTML = `
            <div class="group-header">
                <h3>${group.label}</h3>
                <span class="group-percent">${percent}%</span>
            </div>
            <div class="group-list">
                ${groupFilteredClients.length > 0 ? `
                    <table class="clients-mini-table">
                        <tbody>
                            ${groupFilteredClients.sort((a,b)=>a.name.localeCompare(b.name)).map(c => {
                                let link = `https://portal.tce.rs.gov.br/pcdi2/relatorios-recibos-envio.action?&cdOrgao=${c.code}&ano=${state.selectedYear}`;
                                // SIOPE dynamic pre-filled link (UF: 43 / RS)
                                if (state.module === 'SIOPE') {
                                    link = `https://www.fnde.gov.br/siope/recibosTransmissao.do?tipoDeRecibo=1&cod_uf_mun=43&municipios=${c.ibge}&consultar=Consultar`;
                                } else if (state.module === 'SIOPS') {
                                    link = `http://siops.datasus.gov.br/carga_sitentregaMun.php?cmbUF=43&municipio=${c.ibge}`;
                                }
                                
                                return `<tr><td><a href="${link}" target="_blank" class="client-link">${c.name}</a></td></tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                ` : '<p class="empty-msg">Nenhum cliente.</p>'}
            </div>
        `;
        container.appendChild(groupDiv);
    });
    
    document.getElementById('modal-clients').classList.remove('hidden');
}

/**
 * AGENDA & CALENDARIO
 */
function renderCalendar() {
    const d = state.calendarDate;
    el.calendarMonthYear.textContent = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    
    el.calendarDays.innerHTML = '';
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(d.getFullYear(), d.getMonth(), 0).getDate();

    // Fill prev month days
    for (let x = firstDay; x > 0; x--) {
        const div = document.createElement('div');
        div.className = 'cal-day other-month';
        div.textContent = prevLastDay - x + 1;
        el.calendarDays.appendChild(div);
    }

    // Current month days
    for (let i = 1; i <= lastDay; i++) {
        const div = document.createElement('div');
        const dateStr = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${i.toString().padStart(2,'0')}`;
        
        const dayApps = state.appointments.filter(a => a.date === dateStr);
        
        div.className = 'cal-day';
        
        // Verifica agendamentos
        if (dayApps.some(a => a.status === 'approved')) div.classList.add('approved-req');
        if (dayApps.some(a => a.status === 'pending')) div.classList.add('pending-highlight');

        // Verifica Aniversários
        const monthNum = d.getMonth() + 1;
        const dayBdays = state.team.filter(m => {
            if(!m.birthday || m.birthday.length < 5 || m.birthday === '--/--/----' || m.birthday === '--/--') return false;
            const parts = m.birthday.split('/');
            return parseInt(parts[0]) === i && parseInt(parts[1]) === monthNum;
        });
        
        if (dayBdays.length > 0) {
            div.classList.add('bday-highlight');
            const bdayNames = dayBdays.map(m => m.name.split(' ')[0]).join(', ');
            div.title = `Aniversário: ${bdayNames}`;
        }
        
        if (dayApps.length > 0) {
            div.style.cursor = 'pointer';
            div.onclick = () => {
                if (state.isSupervisor) openAgendaApprovalList(dateStr);
                else openAgendaViewList(dateStr);
            };
            // Indicator for multiple apps
            if (dayApps.length > 1) {
                const badge = document.createElement('span');
                badge.className = 'cal-badge';
                badge.textContent = dayApps.length;
                div.appendChild(badge);
            }
        }
        
        div.ondblclick = () => {
            const reqModal = document.getElementById('modal-request');
            const reqDate = document.getElementById('req-date');
            if (reqModal && reqDate) {
                reqDate.value = dateStr;
                reqModal.classList.remove('hidden');
            }
        };

        // Current day highlight (Dynamic)
        const today = new Date();
        const isToday = i === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
        if (isToday) {
            div.classList.add('today');
        }
        
        div.textContent = i;
        el.calendarDays.appendChild(div);
    }
}

function openAgendaViewList(dateStr) {
    const apps = state.appointments.filter(a => a.date === dateStr);
    if (apps.length === 1) {
        openAgendaViewModal(apps[0].id);
    } else {
        openAgendaViewModal(apps[apps.length-1].id);
    }
}

function openAgendaViewModal(appId) {
    const app = state.appointments.find(a => a.id === appId);
    if (!app || !document.getElementById('modal-agenda-view')) return;
    document.getElementById('view-agenda-title').textContent = app.title;
    document.getElementById('view-agenda-client').textContent = app.client || '-';
    document.getElementById('view-agenda-status').textContent = app.status === 'approved' ? 'Aprovada' : (app.status === 'rejected' ? 'Rejeitada' : 'Pendente');
    document.getElementById('view-agenda-date').textContent = app.date;
    document.getElementById('view-agenda-time').textContent = `${app.timeStart} às ${app.timeEnd}`;
    
    const btnDelete = document.getElementById('btn-delete-appointment-colab');
    if (btnDelete) btnDelete.onclick = () => deleteAppointment(app.id);

    document.getElementById('modal-agenda-view').classList.remove('hidden');
}

function openAgendaApprovalList(dateStr) {
    const apps = state.appointments.filter(a => a.date === dateStr);
    if (apps.length === 1) {
        openAgendaApprovalRequest(apps[0].id);
    } else {
        const listContainer = document.getElementById('agenda-list-container');
        if (!listContainer) return;
        listContainer.innerHTML = '';
        
        apps.forEach(app => {
            const div = document.createElement('div');
            div.style.cssText = `padding: 10px; border: 1px solid #ddd; margin-bottom: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; background: ${app.status === 'pending' ? '#fff9c4' : '#f0f4f8'}`;
            div.innerHTML = `
                <div>
                    <strong>${app.title}</strong><br>
                    <span style="font-size: 0.8rem; color: #555;">${app.timeStart} às ${app.timeEnd} | Por: ${app.requestedBy}</span><br>
                    <span style="font-size: 0.75rem; font-weight: bold; color: ${app.status === 'approved' ? 'var(--success)' : (app.status === 'rejected' ? 'var(--danger)' : '#fbc02d')}">${app.status.toUpperCase()}</span>
                </div>
                <button class="btn-small" onclick="document.getElementById('modal-agenda-list').classList.add('hidden'); openAgendaApprovalRequest(${app.id})">Analisar</button>
            `;
            listContainer.appendChild(div);
        });
        
        document.getElementById('modal-agenda-list').classList.remove('hidden');
    }
}

function openAgendaApprovalRequest(appId) {
    const app = state.appointments.find(a => a.id === appId);
    if (!app || !document.getElementById('modal-agenda-approval')) return;
    document.getElementById('app-approve-id').value = app.id;
    document.getElementById('app-approve-title').value = app.title;
    document.getElementById('app-approve-date').value = app.date;
    document.getElementById('app-approve-start').value = app.timeStart;
    document.getElementById('app-approve-end').value = app.timeEnd;
    document.getElementById('app-approve-client').value = app.client || '';
    document.getElementById('app-approve-ticket').value = app.ticket || '';
    
    // Deletion
    const btnDelete = document.getElementById('btn-delete-appointment');
    if (btnDelete) btnDelete.onclick = () => deleteAppointment(app.id);
    
    document.getElementById('modal-agenda-approval').classList.remove('hidden');
}

function deleteAppointment(id) {
    const app = state.appointments.find(a => a.id === id);
    if (!app) return;
    if (!confirm('Deseja excluir este compromisso permanentemente?')) return;
    
    // Fade out logic if possible (tricky for calendar days, but we can try)
    // Find calendar day
    const days = document.querySelectorAll('.cal-day');
    days.forEach(d => {
        if (d.onclick && d.onclick.toString().includes(id)) {
            d.classList.add('fade-out-del');
        }
    });

    setTimeout(() => {
        // Notify requester
        if (app.requestedBy && app.requestedBy !== state.currentUser) {
            sendTargetedNotification(app.requestedBy, `Seu agendamento para ${app.date} (${app.title}) foi removido pelo supervisor.`);
        }

        state.appointments = state.appointments.filter(a => a.id !== id);
        localStorage.setItem('delta_v2_appointments', JSON.stringify(state.appointments));
        document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
        renderCalendar();
        updatePendingBadge();
        alert('Compromisso removido.');
    }, 400);
}

window.submitAgendaApproval = (status) => {
    const id = parseInt(document.getElementById('app-approve-id').value);
    const app = state.appointments.find(a => a.id === id);
    if (!app) return;
    
    const original = { 
        title: app.title, date: app.date, timeStart: app.timeStart, 
        timeEnd: app.timeEnd, client: app.client || '', ticket: app.ticket || '' 
    };

    app.title = document.getElementById('app-approve-title').value;
    app.date = document.getElementById('app-approve-date').value;
    app.timeStart = document.getElementById('app-approve-start').value;
    app.timeEnd = document.getElementById('app-approve-end').value;
    app.client = document.getElementById('app-approve-client').value || '';
    app.ticket = document.getElementById('app-approve-ticket').value || '';
    
    app.status = status;
    app.read = false; 
    localStorage.setItem('delta_v2_appointments', JSON.stringify(state.appointments)); 
    
    if (status === 'approved') {
        const hasModifications = (
            original.title !== app.title || original.date !== app.date ||
            original.timeStart !== app.timeStart || original.timeEnd !== app.timeEnd ||
            original.client !== app.client || original.ticket !== app.ticket
        );

        if (hasModifications) {
            sendTargetedNotification(app.requestedBy, `Sua solicitação para ${app.date} foi aprovada com alterações pelo Supervisor.`, 'agenda');
        } else {
            sendTargetedNotification(app.requestedBy, `Sua solicitação para ${app.date} foi aprovada!`, 'agenda');
        }
    } else {
        sendTargetedNotification(app.requestedBy, `Sua solicitação para ${app.date} foi reprovada.`, 'agenda');
    }
    
    document.getElementById('modal-agenda-approval').classList.add('hidden');
    renderRequests(); renderCalendar(); updatePendingBadge(); 
}

function showBrowserNotification(title, body, target = 'all') {
    if (target !== 'all' && target !== state.currentUser) return; // Role exclusion logic

    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, { body, icon: 'media_logo.png' });
    }
}

function handleRequestSubmit(e) {
    e.preventDefault();
    
    let timeStart = document.getElementById('req-time-start').value;
    let timeEnd = document.getElementById('req-time-end').value;
    
    if (document.getElementById('req-full-day').checked) {
        timeStart = "08:00";
        timeEnd = "17:00";
    }

    const dateStr = document.getElementById('req-date').value;
    
    // Conflict Check
    const hasConflict = state.appointments.some(a => {
        if (a.date !== dateStr) return false;
        if (a.requestedBy !== state.currentUser) return false;
        if (a.status === 'rejected') return false;
        
        // Overlap logic: (StartA < EndB) && (EndA > StartB)
        return (timeStart < a.timeEnd) && (timeEnd > a.timeStart);
    });

    if (hasConflict) {
        alert('⚠️ Conflito de Horário! Você já possui um compromisso agendado (ou pendente) neste mesmo intervalo para este dia.');
        return;
    }

    const req = {
        id: Date.now(),
        title: document.getElementById('req-title').value,
        date: dateStr,
        timeStart: timeStart,
        timeEnd: timeEnd,
        client: '',
        requestedBy: state.currentUser,
        status: 'pending',
        read: true
    };
    
    state.appointments.push(req);
    localStorage.setItem('delta_v2_appointments', JSON.stringify(state.appointments));
    
    alert('✅ Solicitação enviada!');
    if (state.isSupervisor) {
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("Novo Agendamento", { body: `Você criou um agendamento: ${req.title}` });
        }
    } else {
        // Send to all Supervisors
        state.team.filter(m => m.isSupervisor).forEach(sup => {
            sendTargetedNotification(sup.name, `Há uma nova solicitação de AGENDA aguardando sua aprovação (${req.requestedBy})`, 'agenda');
        });
        // If we are on the same machine/browser, we can force a sync trigger
        localStorage.setItem('delta_v2_sync_trigger', Date.now());
    }
    
    document.getElementById('modal-request').classList.add('hidden');
    renderCalendar();
    updatePendingBadge();
    e.target.reset();
    renderRequests();
}

/**
 * TAREFAS (PLANNER)
 */
function openTaskModal() {
    const select = document.getElementById('task-assignee');
    if (!select) return;
    
    select.innerHTML = '';
    
    if (state.isSupervisor) {
        select.innerHTML = `
            <option value="Todos">Todos (Equipe Inteira)</option>
            <option value="Sem Responsável">Sem Responsável (Livre p/ Assumir)</option>
        `;
        state.team.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.name;
            opt.textContent = m.name;
            select.appendChild(opt);
        });
    } else {
        // Colaborador só pode criar para si mesmo
        const opt = document.createElement('option');
        opt.value = state.currentUser;
        opt.textContent = state.currentUser;
        select.appendChild(opt);
    }
    
    document.getElementById('modal-task').classList.remove('hidden');
}

function handleTaskSubmit(e) {
    e.preventDefault();
    const assignee = document.getElementById('task-assignee').value;
    const task = {
        id: Date.now(),
        ticket: document.getElementById('task-ticket') ? document.getElementById('task-ticket').value : '',
        title: document.getElementById('task-title').value,
        description: document.getElementById('task-desc') ? document.getElementById('task-desc').value : '',
        assignee: assignee,
        deadline: document.getElementById('task-deadline').value,
        status: 'pendente'
    };

    if (assignee === 'Todos') {
        task.completions = {};
        state.team.filter(m => !m.isSupervisor).forEach(m => {
            task.completions[m.name] = null;
        });
    }
    
    state.tasks.push(task);
    saveTasks();
    renderTasks();
    document.getElementById('modal-task').classList.add('hidden');
    e.target.reset();
}

window.assumeTask = (taskId) => {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;
    if (confirm(`Deseja assumir esta tarefa?`)) {
        task.assignee = state.currentUser;
        saveTasks();
        renderTasks();
    }
};

window.concludeMemberTask = (taskId, memberName) => {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task || !task.completions) return;
    
    task.completions[memberName] = new Date().toISOString();
    
    // Check if ALL are done
    const allDone = Object.values(task.completions).every(v => v !== null);
        if (allDone) {
            task.status = 'concluída';
            task.completionDate = new Date().toISOString();
            if (!state.isSupervisor) {
                showBrowserNotification("Tarefa COLETIVA Concluída", `Todos finalizaram a tarefa: ${task.title}`, "Bruno Ramos");
            }
        }
        
        saveTasks();
        renderTasks();
    };

function renderTasks() {
    const containers = {
        'pendente': document.getElementById('tasks-todo'),
        'concluída': document.getElementById('tasks-done')
    };
    
    // Clear all
    Object.values(containers).forEach(c => { if(c) c.innerHTML = ''; });

    state.tasks.forEach(t => {
        // Role-based visibility
        if (!state.isSupervisor) {
            const userFirstName = state.currentUser.split(' ')[0];
            const assigneeFirstName = t.assignee.split(' ')[0];
            if (t.assignee !== 'Todos' && t.assignee !== state.currentUser && t.assignee !== 'Sem Responsável' && assigneeFirstName !== userFirstName) return;
        }

        const card = document.createElement('div');
        card.className = `task-card fade-in ${t.status === 'concluída' ? 'task-concluded' : ''}`;
        card.onclick = (e) => {
            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
                openTaskDetail(t.id);
            }
        };
        
        // Status Indicators for V7
        let statusLabel = "Não Iniciada";
        let statusClass = "status-ni";
        if (t.status === 'em-andamento') { statusLabel = "Em andamento"; statusClass = "status-ea"; }
        if (t.status === 'concluída') { statusLabel = "Concluída"; statusClass = "status-co"; }

        let btnUI = '';
        if (t.status === 'pendente') {
            if (t.assignee === 'Sem Responsável') {
                btnUI = `<button class="btn-small" onclick="assumeTask(${t.id})">Assumir</button>`;
            } else {
                btnUI = `<button class="btn-small" onclick="updateTaskStatus(${t.id}, 'em-andamento')">Iniciar</button>`;
            }
        } else if (t.status === 'em-andamento') {
            if (t.assignee !== 'Todos') {
                btnUI = `<button class="btn-small" style="background:var(--success); color:#fff;" onclick="updateTaskStatus(${t.id}, 'concluída')">Finalizar</button>`;
            }
        }

        // V7 Supervisor Autonomy: Delete ANY task
        const deleteBtn = state.isSupervisor ? `<button class="btn-remove-member" onclick="deleteTaskWithFade(${t.id}); event.stopPropagation();" style="font-size:1rem; cursor:pointer;" title="Excluir Tarefa">🗑️</button>` : '';
        
        card.innerHTML = `
            <div class="task-main-info">
                <div style="display:flex; gap:10px; align-items:center; margin-bottom:5px;">
                    <span class="task-badge-status ${statusClass}">${statusLabel}</span>
                    <span style="font-size: 0.7rem; color: var(--text-muted); font-weight:600;">📍 ${t.module || 'GERAL'}</span>
                </div>
                <h4>${t.title}</h4>
                <p><strong>Resp:</strong> ${t.assignee === 'Todos' ? 'Equipe' : t.assignee} | 📅 ${t.deadline}</p>
            </div>
            <div style="display:flex; align-items:center; gap:15px;">
                ${btnUI}
                ${deleteBtn}
            </div>
        `;

        // Routing: Group 'em-andamento' with 'pendente' into 'todo' row
        if (t.status === 'concluída') {
            if (containers['concluída']) containers['concluída'].appendChild(card);
        } else {
            if (containers['pendente']) containers['pendente'].appendChild(card);
        }
    });
}

window.openTaskDetail = (id) => {
    const t = state.tasks.find(x => x.id === id);
    if (!t) return;

    document.getElementById('detail-task-title').textContent = t.title;
    document.getElementById('detail-task-assignee').textContent = t.assignee === 'Todos' ? 'Equipe Delta' : t.assignee;
    document.getElementById('detail-task-deadline').textContent = t.deadline || 'Não definida';
    document.getElementById('detail-task-desc').textContent = t.description || 'Sem descrição detalhada.';
    
    const badge = document.getElementById('detail-task-status-badge');
    let label = "Não Iniciada";
    let cls = "status-ni";
    if (t.status === 'em-andamento') { label = "Em andamento"; cls = "status-ea"; }
    if (t.status === 'concluída') { label = "Concluída"; cls = "status-co"; }
    
    badge.textContent = label;
    badge.className = `task-badge-status ${cls}`;

    document.getElementById('modal-task-detail').classList.remove('hidden');
};

function updateTaskStatus(id, newStatus) {
    const task = state.tasks.find(t => t.id === id);
    if (task) {
        const oldStatus = task.status;
        
        // Find task element for animation
        const cards = document.querySelectorAll('.task-card');
        let cardEl = null;
        cards.forEach(c => { if (c.innerHTML.includes(`updateTaskStatus(${id},`)) cardEl = c; });
        
        if (cardEl && oldStatus !== newStatus) {
            cardEl.classList.add('task-fade-out');
            setTimeout(() => {
                applyTaskStatusChange(task, newStatus, oldStatus);
                renderTasks();
                // Find new card for fade-in
                setTimeout(() => {
                    const newCards = document.querySelectorAll('.task-card');
                    newCards.forEach(nc => { 
                        if (nc.innerHTML.includes(`updateTaskStatus(${id},`)) nc.classList.add('task-fade-in'); 
                    });
                }, 50);
            }, 500);
        } else {
            applyTaskStatusChange(task, newStatus, oldStatus);
            renderTasks();
        }
    }
}

function applyTaskStatusChange(task, newStatus, oldStatus) {
    task.status = newStatus;
    if (newStatus === 'concluída') {
        task.completionDate = new Date().toISOString();
        // Notify Supervisor if completed by collaborator
        if (!state.isSupervisor) {
            showBrowserNotification("Tarefa Concluída", `${state.currentUser} finalizou: ${task.title}`, "Bruno Ramos");
            alert(`🔔 Tarefa Concluída! \nO supervisor foi notificado.`);
        }
    }
    saveTasks();
}

function saveTasks() {
    localStorage.setItem('delta_v2_tasks', JSON.stringify(state.tasks));
}

/**
 * EQUIPE
 */
function renderTeam() {
    const list = document.getElementById('team-list');
    if (!list) return;
    list.innerHTML = '';
    
    // Sort logic: supervisor first, then alphabetical
    const sortedTeam = [...state.team].sort((a, b) => {
        if (a.isSupervisor && !b.isSupervisor) return -1;
        if (!a.isSupervisor && b.isSupervisor) return 1;
        return a.name.localeCompare(b.name);
    });

    sortedTeam.forEach(m => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.style.position = 'relative';
        card.style.cursor = 'pointer';
        card.onclick = (e) => {
            if(e.target.closest('.delete-chip-btn')) return;
            if(state.isSupervisor) {
                openMemberModal(m.name);
            } else {
                alert(`Membro: ${m.name}\nAdmissão: ${m.admissionDate || 'N/A'}\nNascimento: ${m.birthday || '--/--'} / ${m.year || '----'}`);
            }
        };

        const firstName = m.name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/gi, '');
        const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=f0f4f8&color=005eb8`;
        const staticUrl  = `team_photos/${firstName}.jpg`;
        // Prioridade: foto enviada pelo admin (base64) > arquivo estático > UI Avatars
        const photoSrc   = m.photoData || staticUrl;

        let deleteBtnHTML = '';
        if (state.isSupervisor && m.name !== state.currentUser) {
            deleteBtnHTML = `<button class="delete-chip-btn" onclick="deleteMember('${m.name}')" style="position: absolute; top: -5px; right: -5px; background: var(--danger); border: none; color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">X</button>`;
        }

        card.innerHTML = `
            ${deleteBtnHTML}
            <img src="${photoSrc}" onerror="this.onerror=null; this.src='${fallbackUrl}';" alt="${m.name}" style="width:40px; height:40px; border-radius:50%; margin-bottom: 5px; object-fit:cover;">
            <div class="member-name">${m.name.split(' ')[0]}</div>
        `;
        list.appendChild(card);
    });
}

function checkBirthdays() {
    const today = new Date(); // Real date
    let found = false;
    
    state.team.forEach(m => {
        if (!m.birthday) return;
        const [day, month] = m.birthday.split('/').map(n => parseInt(n));
        // Check for current year and next year to handle year boundaries
        [today.getFullYear(), today.getFullYear() + 1].forEach(yr => {
            const bday = new Date(yr, month - 1, day);
            const diff = (bday - today) / (1000*60*60*24);
            if (diff >= 0 && diff <= 5) {
                found = true;
            }
        });
    });

    if (el.birthdayAlert) {
        if (found) el.birthdayAlert.classList.remove('hidden');
        else el.birthdayAlert.classList.add('hidden');
    }
}

function checkAnnouncementPublishing() {
    // Função para checar publicações agendadas (verificações diárias ou no feed)
    const now = new Date();
    let hasUpdates = false;
    
    state.announcements.forEach(a => {
        // Se houver lógica de publicação programada, validaremos aqui.
        // Por ora, a gente garante que ele roda a verificação e recompila o feed se necessário.
    });
    
    if (hasUpdates) {
        renderFeed();
    }
}

/**
 * NEW: VERTICAL MEMBER MANAGEMENT (Supervisor Only)
 */
function renderTeamManagement() {
    const container = document.getElementById('member-list-vertical');
    if (!container) return;
    container.innerHTML = '';

    if (state.team.length === 0) {
        container.innerHTML = '<p class="empty-msg">Nenhum membro cadastrado.</p>';
        return;
    }

    const users = getUsers();

    state.team.forEach(m => {
        const row = document.createElement('div');
        row.className = 'member-row';
        row.id = `member-row-${m.name.replace(/\s/g, '-')}`;

        const firstName = m.name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/gi, '');
        const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=f0f4f8&color=005eb8`;
        const staticUrl  = `team_photos/${firstName}.jpg`;
        // Prioridade: foto enviada (base64) > arquivo estático > UI Avatars
        const photoSrc   = m.photoData || staticUrl;

        const email     = (m.email || '').toLowerCase().trim();
        const userAcc   = email ? users[email] : null;
        const mustChg   = userAcc && userAcc.mustChangePassword;

        const roleBadge = m.isSupervisor
            ? '<span style="font-size:0.7rem; background:#e8f0fe; color:#1967d2; padding:2px 6px; border-radius:10px; margin-left:5px;">Admin</span>'
            : '<span style="font-size:0.7rem; background:#fff3e0; color:#f57c00; padding:2px 6px; border-radius:10px; margin-left:5px;">Colaborador</span>';

        const emailLine = email
            ? `<p style="margin-bottom:2px; color:#005eb8;">✉️ ${email}${mustChg ? ' <span style="background:#fff3cd; color:#856404; padding:1px 6px; border-radius:8px; font-size:0.7rem; margin-left:4px;">⚠ Trocará senha no 1º login</span>' : userAcc ? ' <span style="color:#28a745; font-size:0.7rem;">✓ Acesso ativo</span>' : ' <span style="color:#999; font-size:0.7rem;">(sem senha cadastrada)</span>'}</p>`
            : `<p style="margin-bottom:2px; color:#999; font-style:italic;">✉️ (sem e-mail cadastrado)</p>`;

        row.innerHTML = `
            <div class="member-info-group" style="cursor: pointer;" onclick="openMemberModal('${m.name}')" title="Clique para editar">
                <img src="${photoSrc}" class="member-photo-circle" alt="${m.name}" onerror="this.onerror=null; this.src='${fallbackUrl}';">
                <div class="member-details-text">
                    <h4>${m.name} ${roleBadge}</h4>
                    ${emailLine}
                    <p style="margin-bottom:2px;">📅 Admissão: ${m.admissionDate || '--/--/----'} | Equipe: Delta</p>
                    <p style="color:#666; font-size:0.75rem;">🎂 Nascimento: ${m.birthday || '--/--'} / ${m.year || '----'}</p>
                </div>
            </div>
            <div class="member-actions">
                <button class="btn-member-action" onclick="openMemberModal('${m.name}')" title="Editar">✏️</button>
                <button class="btn-member-action delete" onclick="deleteMember('${m.name}')" title="Excluir">🗑️</button>
            </div>
        `;
        container.appendChild(row);
    });
}

// Foto temporária do modal (base64) - aplicada ao gravar
let _pendingMemberPhoto = null;

window.handleMemberPhotoUpload = function(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Selecione um arquivo de imagem (JPG, PNG, etc.).'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('A imagem deve ter no máximo 5 MB.'); return; }

    const reader = new FileReader();
    reader.onload = (e) => {
        _pendingMemberPhoto = e.target.result;
        const img = document.getElementById('photo-preview-img');
        if (img) img.src = _pendingMemberPhoto;
    };
    reader.readAsDataURL(file);
};

window.openMemberModal = (memberName = null) => {
    const modal = document.getElementById('modal-member-edit');
    const title = document.getElementById('member-modal-title');
    const form = document.getElementById('form-member-edit');

    form.reset();
    _pendingMemberPhoto = null; // reset upload temporário
    document.getElementById('edit-member-id').value = memberName || '';

    const pwdStatus = document.getElementById('member-pwd-status');
    if (pwdStatus) { pwdStatus.style.display = 'none'; pwdStatus.innerHTML = ''; }
    document.getElementById('member-initial-pwd').value = '';
    document.getElementById('member-must-change-pwd').checked = true;

    if (memberName) {
        const m = state.team.find(x => x.name === memberName);
        if (m) {
            title.textContent = "Editar Membro";
            document.getElementById('member-full-name').value = m.name;
            document.getElementById('member-email').value = m.email || '';

            // Dates in state are usually dd/mm/aaaa, need to convert to yyyy-mm-dd for input type=date
            if (m.admissionDate && m.admissionDate.includes('/')) {
                const parts = m.admissionDate.split('/');
                document.getElementById('member-admission-date').value = `${parts[2]}-${parts[1]}-${parts[0]}`;
            } else {
                document.getElementById('member-admission-date').value = '';
            }
            document.getElementById('member-birthday').value = m.birthday || '';
            document.getElementById('member-year').value = m.year || '';
            document.getElementById('member-is-supervisor').checked = !!m.isSupervisor;

            // Foto: priorizar photoData salvo > arquivo estático > avatar
            const firstName = m.name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/gi, '');
            const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=f0f4f8&color=005eb8`;
            const imgEl = document.getElementById('photo-preview-img');
            if (m.photoData) {
                imgEl.src = m.photoData;
            } else {
                imgEl.onerror = () => { imgEl.onerror = null; imgEl.src = fallback; };
                imgEl.src = `team_photos/${firstName}.jpg`;
            }

            // Status do acesso atual
            if (pwdStatus && m.email) {
                const users = getUsers();
                const u = users[(m.email || '').toLowerCase().trim()];
                if (u) {
                    pwdStatus.style.display = 'block';
                    if (u.mustChangePassword) {
                        pwdStatus.innerHTML = '⚠ <b>Acesso pendente:</b> usuário deverá trocar a senha no próximo login.';
                        pwdStatus.style.color = '#856404';
                    } else {
                        pwdStatus.innerHTML = '✓ <b>Acesso ativo</b> — usuário já trocou a senha inicial.';
                        pwdStatus.style.color = '#28a745';
                    }
                } else {
                    pwdStatus.style.display = 'block';
                    pwdStatus.innerHTML = '🔓 <b>Sem acesso:</b> defina uma senha abaixo para liberar o login.';
                    pwdStatus.style.color = '#666';
                }
            }
        }
    } else {
        title.textContent = "Novo Membro da Equipe";
        document.getElementById('photo-preview-img').src = `https://ui-avatars.com/api/?name=User&background=f0f4f8&color=005eb8`;
    }

    modal.classList.remove('hidden');
    setTimeout(() => document.getElementById('member-full-name')?.focus(), 50);
};

window.closeMemberModal = () => {
    document.getElementById('modal-member-edit').classList.add('hidden');
};

// Handle Form Submit
document.getElementById('form-member-edit')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const oldName  = document.getElementById('edit-member-id').value;
    const newName  = document.getElementById('member-full-name').value.trim();
    const newEmail = (document.getElementById('member-email').value || '').trim().toLowerCase();
    const rawDate  = document.getElementById('member-admission-date').value; // yyyy-mm-dd
    const isSup    = document.getElementById('member-is-supervisor').checked;
    const bday     = document.getElementById('member-birthday').value;
    const byear    = document.getElementById('member-year').value;
    const initPwd  = (document.getElementById('member-initial-pwd').value || '').trim();
    const mustChg  = document.getElementById('member-must-change-pwd').checked;
    const newRole  = isSup ? 'admin' : 'colaborador';

    let formattedDate = '';
    if (rawDate) {
        const dateParts = rawDate.split('-');
        formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    }

    let targetMember;
    let oldEmail = '';
    if (oldName) {
        // Edit
        targetMember = state.team.find(x => x.name === oldName);
        if (targetMember) {
            oldEmail = (targetMember.email || '').toLowerCase().trim();
            targetMember.name = newName;
            targetMember.email = newEmail;
            targetMember.admissionDate = formattedDate;
            targetMember.birthday = bday;
            targetMember.year = byear;
            targetMember.isSupervisor = isSup;
            targetMember.role = newRole;
            if (_pendingMemberPhoto) targetMember.photoData = _pendingMemberPhoto;
        }
    } else {
        // Add
        targetMember = {
            name: newName,
            email: newEmail,
            admissionDate: formattedDate,
            birthday: bday,
            year: byear,
            isSupervisor: isSup,
            role: newRole
        };
        if (_pendingMemberPhoto) targetMember.photoData = _pendingMemberPhoto;
        state.team.push(targetMember);
    }

    // ───── Sincronizar com servidor (delta_users) ─────────────
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Salvando...'; }

    try {
        // Recarrega cache do servidor antes
        await fetchUsersFromServer();
        const users = getUsers();
        let accountAction = null; // 'created' | 'updated' | null

        if (newEmail) {
            const accountExists = !!users[newEmail];
            const oldExists = oldEmail && !!users[oldEmail];

            if (initPwd) {
                // Nova senha → upsert com hash novo
                const payload = {
                    email: newEmail,
                    name: newName,
                    role: newRole,
                    passwordHash: hashPassword(initPwd),
                    mustChangePassword: mustChg,
                    teamMemberName: newName
                };
                if (oldEmail && oldEmail !== newEmail && oldExists) {
                    await apiRenameUser(oldEmail, payload);
                } else {
                    await apiUpsertUser(payload);
                }
                accountAction = accountExists ? 'updated' : 'created';
            } else if (oldEmail && oldEmail !== newEmail && oldExists) {
                // Só renomear sem trocar senha
                const old = users[oldEmail];
                await apiRenameUser(oldEmail, {
                    email: newEmail,
                    name: newName,
                    role: newRole,
                    passwordHash: old.passwordHash,
                    mustChangePassword: mustChg || old.mustChangePassword,
                    teamMemberName: newName
                });
                accountAction = 'updated';
            } else if (accountExists) {
                // Só atualizar metadados (sem senha nova)
                const old = users[newEmail];
                await apiUpsertUser({
                    email: newEmail,
                    name: newName,
                    role: newRole,
                    passwordHash: old.passwordHash,
                    mustChangePassword: mustChg ? true : old.mustChangePassword,
                    teamMemberName: newName
                });
                accountAction = 'updated';
            }
            // Se não havia conta e sem senha → não cria nada (membro sem acesso)
        } else if (oldEmail) {
            // E-mail removido — apaga a conta de login antiga
            try { await apiDeleteUser(oldEmail); } catch {}
        }

        // Refresh do cache local
        await fetchUsersFromServer();

        localStorage.setItem('delta_v2_team', JSON.stringify(state.team));
        _pendingMemberPhoto = null;
        closeMemberModal();
        renderTeamManagement();
        renderTeam();
        initUserSession();

        let msg = `✅ ${newName} salvo.`;
        if (accountAction === 'created') msg += `\n🔐 Acesso criado para ${newEmail}.`;
        if (accountAction === 'updated') msg += `\n🔐 Acesso atualizado para ${newEmail}.`;
        if (newEmail && initPwd && mustChg) msg += `\nUsuário deverá trocar a senha no próximo login.`;
        alert(msg);
    } catch (err) {
        console.error('Erro ao salvar:', err);
        alert('❌ Erro ao salvar no servidor. Tente novamente.\n\n' + err.message);
    } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Gravar Membro'; }
    }
});

window.deleteMember = async (name) => {
    if (!confirm(`Deseja realmente excluir ${name}?\n\nIsso também removerá o acesso de login deste usuário.`)) return;

    const row = document.getElementById(`member-row-${name.replace(/\s/g, '-')}`);
    if (row) {
        row.classList.add('fade-out-del');
    }

    // Remover do team
    const m = state.team.find(x => x.name === name);
    const email = m ? (m.email || '').toLowerCase().trim() : '';
    state.team = state.team.filter(x => x.name !== name);
    localStorage.setItem('delta_v2_team', JSON.stringify(state.team));

    // Remover a conta de login no servidor (se houver e-mail)
    if (email) {
        try { await apiDeleteUser(email); await fetchUsersFromServer(); }
        catch (e) { console.warn('Erro ao remover conta de login:', e.message); }
    }

    setTimeout(() => {
        renderTeamManagement();
        renderTeam();
        initUserSession();
    }, 500);
};

function updateView() {
    document.querySelectorAll('.view-container').forEach(v => v.classList.add('hidden'));
    const target = document.getElementById(`view-${state.view}`);
    if (target) {
        target.classList.remove('hidden');
        if (state.view === 'clientes') renderClientsMgmtTable();
        if (state.view === 'team') renderTeamManagement();
        if (state.view === 'notificacoes') {
            markNotificationsAsRead();
        }
    }
}

function updateActiveNav(btn) {
    el.sideBtns.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

function updatePendingBadge() {
    const badge = el.pendingBadge;
    const sidebarBadge = document.getElementById('pending-badge-sidebar');
    
    let pendingCount = 0;
    if (state.isSupervisor) {
        pendingCount += state.appointments.filter(a => a.status === 'pending').length;
        pendingCount += state.announcements.filter(a => a.status === 'pending').length;
    }
    
    const total = state.unreadNotifsCount + pendingCount;
    
    if (badge) {
        badge.textContent = total;
        if (total > 0) {
            badge.classList.remove('hidden');
            badge.classList.add('badge-unread');
        } else {
            badge.classList.add('hidden');
            badge.classList.remove('badge-unread');
        }
    }

    if (sidebarBadge) {
        sidebarBadge.textContent = pendingCount;
        sidebarBadge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
    }
}

function markNotificationsAsRead() {
    state.systemNotifs.forEach(n => n.read = true);
    state.appointments.forEach(a => a.read = true);
    state.announcements.forEach(a => a.read = true);
    
    localStorage.setItem('delta_v2_sys_notifs', JSON.stringify(state.systemNotifs));
    localStorage.setItem('delta_v2_appointments', JSON.stringify(state.appointments));
    localStorage.setItem('delta_v2_announcements', JSON.stringify(state.announcements));
    
    updatePendingBadge();
    renderRequests();
}

function renderRequests() {
    const container = document.getElementById('requests-list'); 
    if (!container) return; 

    // Show all, but mark read/pending
    const apps = state.appointments;
    const anns = state.announcements.filter(a => a.status === 'pending');
    const systemNotifs = state.systemNotifs;

    if (apps.length === 0 && systemNotifs.length === 0 && anns.length === 0) { 
        container.innerHTML = '<p class="empty-msg">Nenhuma notificação registrada.</p>'; 
        return; 
    }
    
    container.innerHTML = '';
    
    // Annoucements Approval (Supervisor only)
    if (state.isSupervisor) {
        state.announcements.filter(a => a.status === 'pending').forEach(a => {
            const div = document.createElement('div');
            div.className = 'card feed-item urgent clickable';
            div.onclick = () => {
                openFeedApproval(a.id);
            };
            div.innerHTML = `<div><strong>Solicitação de Aviso</strong><br><small>${a.title} - ${a.pubDate}</small></div>
                <div style="display:flex; gap:10px;"><button class="btn-small" onclick="event.stopPropagation(); processAnnouncement(${a.id}, 'published')" style="background:var(--success)">V</button>
                <button class="btn-small" onclick="event.stopPropagation(); processAnnouncement(${a.id}, 'rejected')" style="background:var(--danger)">X</button></div>`;
            div.style.display = 'flex'; div.style.justifyContent = 'space-between'; div.style.alignItems = 'center';
            container.appendChild(div);
        });
    }

    systemNotifs.slice().reverse().forEach(notif => {
        // Supervisor-only Late PAD notifications
        if (state.isSupervisor || notif.target === state.currentUser) {
            const div = document.createElement('div');
            const isRead = notif.read;
            div.className = `card feed-item ${isRead ? 'notification-read' : 'notification-unread'}`;
            
            let title = "Notificação";
            if (notif.type === 'agenda') title = "Solicitação de Agenda";
            else if (notif.type === 'info') title = "Dica / Informação";
            else if (notif.type === 'exclusion') title = "Aviso de Exclusão";
            // Specific late title ONLY for late notifications
            else if (notif.msg && notif.msg.toLowerCase().includes('atrasad')) title = "Aviso de Envio (Atrasado)";

            div.innerHTML = `<div><strong>${title}</strong><br><small>${notif.msg}</small></div>`;
            container.appendChild(div);
        }
    });

    apps.slice().reverse().forEach(r => {
        const div = document.createElement('div');
        const isPending = r.status === 'pending';
        div.className = `card feed-item clickable ${isPending ? 'urgent' : ''} ${r.read ? 'notification-read' : ''}`;
        
        div.onclick = () => {
            if (state.isSupervisor && isPending) {
                openAgendaApprovalRequest(r.id);
            } else {
                openAgendaViewModal(r.id);
            }
        };

        let actions = '';
        if (isPending && state.isSupervisor) {
            actions = `<div style="display:flex; flex-direction:column; align-items:flex-end; gap:5px;">
                <span class="badge-pending-tag">AGUARDANDO DECISÃO</span>
                <div style="display:flex; gap:10px;">
                    <button class="btn-small" onclick="event.stopPropagation(); processReq(${r.id}, 'approved')" style="background:var(--success)" title="Aprovar">V</button>
                    <button class="btn-small" onclick="event.stopPropagation(); processReq(${r.id}, 'rejected')" style="background:var(--danger)" title="Recusar">X</button>
                </div>
            </div>`;
        } else {
            const statusLabel = r.status === 'approved' ? '✅ Aprovada' : (r.status === 'rejected' ? '❌ Rejeitada' : '⏳ Pendente');
            actions = `<span style="font-size:0.8rem; font-weight:600;">${statusLabel}</span>`;
        }

        div.innerHTML = `<div><strong>Agendamento: ${r.title}</strong><br><small>${r.requestedBy} | ${r.date} | ${r.timeStart}-${r.timeEnd}</small></div>
            ${actions}`;
        div.style.display = 'flex'; div.style.justifyContent = 'space-between'; div.style.alignItems = 'center';
        container.appendChild(div);
    });
}

window.processReq = (id, status) => {
    const app = state.appointments.find(a => a.id === id);
    if (app) { 
        app.status = status; 
        app.read = false; // Mark unread for the person who requested it
        localStorage.setItem('delta_v2_appointments', JSON.stringify(state.appointments)); 
        
        if (status === 'approved') {
            showBrowserNotification("Agenda Aprovada", `Sua agenda de ${app.date} foi aprovada!`, app.requestedBy);
        } else if (status === 'rejected') {
            showBrowserNotification("Agenda Indeferida", `Sua solicitação de agenda para ${app.date} foi recusada.`, app.requestedBy);
        }
        
        renderRequests(); renderCalendar(); updatePendingBadge(); 
    }
}

window.processAnnouncement = (id, status) => {
    const ann = state.announcements.find(a => a.id === id);
    if (ann) {
        ann.status = status;
        ann.read = false; // Mark unread so it counts for everyone targeted
        localStorage.setItem('delta_v2_announcements', JSON.stringify(state.announcements));
        renderRequests();
        renderFeed();
        updatePendingBadge();
    }
}

function renderFeed() {
    if (!el.feedList) return;
    el.feedList.innerHTML = '';
    
    const now = new Date();
    
    state.announcements.filter(a => {
        // Supervisors see everything (even pending/rejected) in the requests but let's show published here
        if (a.status !== 'published' && a.status !== 'approved') return false;
        
        const pubTime = new Date(`${a.pubDate}T${a.pubTime}`);
        // If it's a future announcement, it won't show in Recentes unless it's time
        if (now < pubTime) return false; 
        
        return (a.target === 'all' || a.target === state.currentUser || state.isSupervisor);
    }).forEach(a => {
        const div = document.createElement('div');
        div.className = 'feed-item';
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; width:100%;">
                <div>
                    <span class="time">${a.pubDate} ${a.pubTime}</span>
                    <p><strong>${a.title}</strong>: ${a.content}</p>
                </div>
                ${state.isSupervisor ? `<button onclick="deleteAnnouncement(${a.id})" class="btn-remove-member" style="position:static; margin-left:10px;">&times;</button>` : ''}
            </div>
        `;
        el.feedList.appendChild(div);
    });
}

function deleteAnnouncement(id) {
    if (!confirm('Deseja excluir este aviso permanentemente?')) return;
    state.announcements = state.announcements.filter(a => a.id !== id);
    localStorage.setItem('delta_v2_announcements', JSON.stringify(state.announcements));
    renderFeed();
    renderRequests();
}

window.openFeedApproval = (id) => {
    const ann = state.announcements.find(a => a.id === id);
    if (!ann) return;
    document.getElementById('feed-edit-id').value = id;
    document.getElementById('feed-title').value = ann.title;
    document.getElementById('feed-content').value = ann.content;
    document.getElementById('feed-date').value = ann.pubDate;
    document.getElementById('feed-time').value = ann.pubTime;
    document.getElementById('feed-target').value = ann.target;
    
    document.getElementById('btn-feed-submit').style.display = 'none';
    document.getElementById('feed-approval-actions').style.display = 'flex';
    document.getElementById('modal-feed').classList.remove('hidden');
};

window.processFeedApproval = (status) => {
    const id = parseInt(document.getElementById('feed-edit-id').value);
    const ann = state.announcements.find(a => a.id === id);
    if (!ann) return;
    
    ann.title = document.getElementById('feed-title').value;
    ann.content = document.getElementById('feed-content').value;
    ann.pubDate = document.getElementById('feed-date').value;
    ann.pubTime = document.getElementById('feed-time').value;
    ann.target = document.getElementById('feed-target').value;
    ann.status = status;
    
    localStorage.setItem('delta_v2_announcements', JSON.stringify(state.announcements));
    
    if (status === 'published') {
        sendTargetedNotification(ann.createdBy, `Seu aviso "${ann.title}" foi publicado pelo Supervisor.`, 'info');
    } else {
        sendTargetedNotification(ann.createdBy, `Seu aviso "${ann.title}" foi indeferido.`, 'exclusion');
    }
    
    document.getElementById('modal-feed').classList.add('hidden');
    renderFeed(); renderRequests(); updatePendingBadge();
};

function handleFeedSubmit(e) {
    e.preventDefault();
    
    const now = new Date();
    const nowISO = now.toISOString().split('T')[0];
    const nowTime = now.toTimeString().split(' ')[0].substring(0, 5);
    
    let pubDate = document.getElementById('feed-date').value;
    let pubTime = document.getElementById('feed-time').value;
    
    // Force current if backdated
    if (pubDate < nowISO || (pubDate === nowISO && pubTime < nowTime)) {
        pubDate = nowISO;
        pubTime = nowTime;
    }

    const ann = {
        id: Date.now(),
        title: document.getElementById('feed-title').value,
        content: document.getElementById('feed-content').value,
        pubDate: pubDate,
        pubTime: pubTime,
        target: document.getElementById('feed-target').value,
        createdBy: state.currentUser,
        status: state.isSupervisor ? 'published' : 'pending'
    };
    
    state.announcements.push(ann);
    localStorage.setItem('delta_v2_announcements', JSON.stringify(state.announcements));
    
    alert('✅ Aviso/Solicitação enviado com sucesso!');
    if (!state.isSupervisor) {
        sendTargetedNotification('Bruno Ramos', `Nova solicitação de AVISO aguardando sua aprovação: ${ann.title}`, 'info');
    }
    
    renderFeed();
    renderRequests();
    updatePendingBadge();
    renderRequests();
    updatePendingBadge();
    document.getElementById('modal-feed').classList.add('hidden');
    e.target.reset();
}

/**
 * PENDENCIAS VIEW
 */
window.openPendingView = () => {
    state.view = 'notificacoes';
    updateView();
    renderRequests();
    // Scroll to section if it was hidden
    const container = document.getElementById('view-notificacoes');
    if (container) container.scrollIntoView({ behavior: 'smooth' });
};

function checkSystemNotifications() {
    let changed = false;
    state.systemNotifs.forEach(n => {
        if (!n.broadcasted && n.target === state.currentUser) {
            if ("Notification" in window && Notification.permission === "granted") {
                new Notification(n.type === 'agenda' ? "Solicitação de Agenda" : "Notificação Delta", { 
                    body: n.msg, 
                    icon: 'logo_delta.png' 
                });
            }
            n.broadcasted = true; 
            changed = true;
        }
    });
    if (changed) {
        localStorage.setItem('delta_v2_sys_notifs', JSON.stringify(state.systemNotifs));
        updatePendingBadge();
    }
}

window.deleteTaskWithFade = (id) => {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    if (!confirm(`Deseja excluir a tarefa "${task.title}"?`)) return;

    // Find card
    const cards = document.querySelectorAll('.card'); 
    let cardEl = null;
    cards.forEach(c => { if (c.innerHTML.includes(`deleteTaskWithFade(${id})`)) cardEl = c; });

    if (cardEl) {
        cardEl.classList.add('fade-out-del');
        setTimeout(() => {
            // Targeted Notification
            if (task.assignee === 'Todos') {
                state.team.forEach(m => {
                    if (m.name !== state.currentUser) {
                        sendTargetedNotification(m.name, `A tarefa conjunta "${task.title}" foi removida pelo supervisor.`);
                    }
                });
            } else if (task.assignee && task.assignee !== 'Sem Responsável' && task.assignee !== state.currentUser) {
                sendTargetedNotification(task.assignee, `Sua tarefa "${task.title}" foi removida pelo supervisor.`);
            }

            state.tasks = state.tasks.filter(t => t.id !== id);
            saveTasks();
            renderTasks();
            updatePendingBadge();
        }, 500);
    } else {
        state.tasks = state.tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
};

function sendTargetedNotification(targetName, message, type = 'exclusion') {
    const notif = {
        id: Date.now() + Math.random(),
        target: targetName,
        msg: message,
        date: new Date().toLocaleString(),
        read: false,
        broadcasted: false,
        type: type
    };
    state.systemNotifs.push(notif);
    localStorage.setItem('delta_v2_sys_notifs', JSON.stringify(state.systemNotifs));
    
    // Incrementar contador global se for para o usuário atual
    if (targetName === state.currentUser || (state.isSupervisor && state.team.find(m => m.name === targetName)?.isSupervisor)) {
        let unread = parseInt(localStorage.getItem('delta_v2_unread') || '0');
        unread++;
        localStorage.setItem('delta_v2_unread', unread);
        updatePendingBadge();
    }
}

function syncStateWithLocalStorage() {
    const rawApps = localStorage.getItem('delta_v2_appointments');
    const rawAnns = localStorage.getItem('delta_v2_announcements');
    const rawTasks = localStorage.getItem('delta_v2_tasks');
    const rawNotifs = localStorage.getItem('delta_v2_sys_notifs');
    const rawUnread = localStorage.getItem('delta_v2_unread');
    
    let changed = false;

    if (rawApps && rawApps !== JSON.stringify(state.appointments)) {
        state.appointments = JSON.parse(rawApps);
        changed = true;
    }
    if (rawAnns && rawAnns !== JSON.stringify(state.announcements)) {
        state.announcements = JSON.parse(rawAnns);
        changed = true;
    }
    if (rawTasks && rawTasks !== JSON.stringify(state.tasks)) {
        state.tasks = JSON.parse(rawTasks);
        changed = true;
    }
    if (rawNotifs && rawNotifs !== JSON.stringify(state.systemNotifs)) {
        state.systemNotifs = JSON.parse(rawNotifs);
        changed = true;
    }
    
    const unreadInt = parseInt(rawUnread || '0');
    if (unreadInt !== state.unreadNotifsCount) {
        state.unreadNotifsCount = unreadInt;
        changed = true;
    }

    if (changed) {
        console.log("Sistema Delta: Sincronização em tempo real realizada.");
        renderCalendar();
        renderTasks();
        renderRequests();
        renderFeed();
        updatePendingBadge();
        checkSystemNotifications();
    }
}

function checkNotificationPermission() {
    if (!("Notification" in window)) return;

    if (Notification.permission !== "granted") {
        const header = document.querySelector('.header-container');
        if (header && !document.getElementById('notif-permission-btn')) {
            const btn = document.createElement('button');
            btn.id = 'notif-permission-btn';
            btn.className = 'btn-small';
            btn.style.cssText = 'margin-left: 15px; background: var(--warning); color: #333; font-weight: bold; border: 1px solid #333;';
            btn.innerHTML = '🔔 Ativar Notificações Pop-up';
            btn.onclick = () => {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        btn.remove();
                        new Notification("Sistema Delta", { body: "Notificações ativadas com sucesso!" });
                    }
                });
            };
            header.insertBefore(btn, header.querySelector('.header-actions'));
        }
    }
}


init();



/**
 * CLIENTS MANAGEMENT (SUPERVISOR)
 */
// ──────────────────────────────────────────────────────────────
// IMPRESSÃO DO PANORAMA
// Abre uma nova janela com layout próprio para impressão, contendo:
//  - cabeçalho com logo e nome da Delta
//  - módulo (PAD/MSC/etc), competência (mês/ano)
//  - filtros aplicados (Visualizar:)
//  - data e hora de emissão
//  - lista de clientes ativos com status atual
// Usa state.clientStatuses preenchido pela última consulta.
// ──────────────────────────────────────────────────────────────
window.printPanorama = function() {
    const monthName = MONTHS[state.selectedMonth] || '';
    const competencia = `${monthName} / ${state.selectedYear}`;
    const f = state.filterView || { all: true, legais: false, semLegais: false };
    const filtros = [
        f.all ? 'Todos os clientes' : null,
        f.legais ? 'Entregas Legais' : null,
        f.semLegais ? 'Sem entregas legais' : null
    ].filter(Boolean).join(', ') || 'Todos os clientes';

    // Lista de clientes ativos no contexto atual (mesmo critério do painel)
    const activeClients = state.clients
        .filter(c => isClientActive(c, state.selectedMonth, state.selectedYear) && applyLegaisClientFilter(c))
        .sort((a, b) => (a.name || '').localeCompare(b.name || '', 'pt-BR', { sensitivity: 'base' }));

    const STATUS_LABEL = { 'on-time': 'No Prazo', 'late': 'Atrasado', 'pending': 'Não Enviado' };
    const STATUS_COLOR = { 'on-time': '#2ecc71', 'late': '#f1c40f', 'pending': '#e74c3c' };

    let onTime = 0, late = 0, pending = 0;
    activeClients.forEach(c => {
        const s = state.clientStatuses[c.code];
        if (s === 'on-time') onTime++;
        else if (s === 'late') late++;
        else pending++;
    });

    const rowsHtml = activeClients.map(c => {
        const s = state.clientStatuses[c.code] || 'pending';
        return `<tr>
            <td>${c.code || ''}</td>
            <td>${c.type || ''}</td>
            <td>${c.name || ''}</td>
            <td style="color:${STATUS_COLOR[s]}; font-weight:700;">${STATUS_LABEL[s]}</td>
        </tr>`;
    }).join('');

    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const emissao = `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

    const logoUrl = `${window.location.origin}/logo_delta.png`;

    const html = `<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Panorama ${state.module} - ${competencia}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; margin: 24px; color: #1a1a1a; }
  header { display: flex; align-items: center; gap: 16px; border-bottom: 3px solid #003a70; padding-bottom: 12px; margin-bottom: 18px; }
  header img { height: 50px; }
  header .brand h1 { margin: 0; color: #003a70; font-size: 1.3rem; }
  header .brand p  { margin: 2px 0 0; color: #6c757d; font-size: 0.85rem; }
  .meta { background:#f4f7fa; border:1px solid #e6ecf2; padding:12px 16px; border-radius:6px; margin-bottom:16px; font-size:0.9rem; }
  .meta div { margin: 3px 0; }
  .meta strong { color: #003a70; }
  .summary { display: flex; gap: 12px; margin-bottom: 18px; }
  .summary .card { flex:1; border:1px solid #e0e0e0; border-radius:6px; padding:10px 14px; text-align:center; }
  .summary .card .n { font-size: 1.6rem; font-weight: 700; margin: 4px 0; }
  .summary .on   { color: #2ecc71; }
  .summary .lt   { color: #f1c40f; }
  .summary .pd   { color: #e74c3c; }
  table { width:100%; border-collapse:collapse; font-size:0.85rem; }
  th, td { text-align:left; padding:7px 10px; border-bottom:1px solid #eee; }
  th { background:#003a70; color:#fff; font-weight:600; }
  tr:nth-child(even) td { background:#fafbfd; }
  footer { margin-top: 24px; font-size: 0.75rem; color:#6c757d; text-align:center; border-top:1px solid #eee; padding-top:10px; }
  @media print {
    body { margin: 12mm; }
    @page { size: A4; margin: 8mm; }
  }
</style>
</head>
<body>
  <header>
    <img src="${logoUrl}" alt="Delta" onerror="this.style.display='none'">
    <div class="brand">
      <h1>Delta Gestão Pública</h1>
      <p>Panorama Vertical Contábil — relatório emitido pelo dashboard</p>
    </div>
  </header>

  <div class="meta">
    <div><strong>Módulo:</strong> ${state.module}</div>
    <div><strong>Competência:</strong> ${competencia}</div>
    <div><strong>Filtros:</strong> ${filtros}</div>
    <div><strong>Emitido em:</strong> ${emissao}</div>
    <div><strong>Usuário:</strong> ${(state.loggedInUser && state.loggedInUser.name) || '—'}</div>
  </div>

  <div class="summary">
    <div class="card"><div>No Prazo</div><div class="n on">${onTime}</div></div>
    <div class="card"><div>Atrasados</div><div class="n lt">${late}</div></div>
    <div class="card"><div>Não Enviados</div><div class="n pd">${pending}</div></div>
    <div class="card"><div>Total</div><div class="n">${activeClients.length}</div></div>
  </div>

  <table>
    <thead>
      <tr><th>Cód.</th><th>Tipo</th><th>Cliente</th><th>Status</th></tr>
    </thead>
    <tbody>${rowsHtml || '<tr><td colspan="4" style="text-align:center; padding:20px;">Nenhum cliente para os filtros atuais.</td></tr>'}</tbody>
  </table>

  <footer>Delta Gestão Pública • ${emissao}</footer>

  <script>
    window.onload = () => { setTimeout(() => window.print(), 350); };
  <\/script>
</body>
</html>`;

    const w = window.open('', '_blank', 'width=900,height=800');
    if (!w) { alert('Permita pop-ups para imprimir o panorama.'); return; }
    w.document.open();
    w.document.write(html);
    w.document.close();
};

// Filtro de tipo na Gestão de Clientes (UI-only, não persistido)
let _clientsTypeFilter = 'ALL';

window.onClientsTypeFilterChange = function(value) {
    _clientsTypeFilter = value || 'ALL';
    renderClientsMgmtTable();
};

function renderClientsMgmtTable() {
    const tbody = document.querySelector('#clients-mgmt-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    // Atualiza o select de tipos com os valores únicos presentes
    const selectEl = document.getElementById('clients-type-filter');
    if (selectEl) {
        const types = Array.from(new Set(state.clients.map(c => c.type).filter(Boolean))).sort();
        const current = _clientsTypeFilter;
        selectEl.innerHTML =
            `<option value="ALL">Todos os tipos</option>` +
            types.map(t => `<option value="${t}" ${t === current ? 'selected' : ''}>${t}</option>`).join('');
    }

    // Cria uma lista para renderização ordenada por nome, preservando o idx original
    // (idx original é fundamental: saveClientsChanges usa para localizar state.clients[idx])
    const rows = state.clients
        .map((c, originalIdx) => ({ c, idx: originalIdx }))
        .filter(({ c }) => _clientsTypeFilter === 'ALL' || c.type === _clientsTypeFilter)
        .sort((a, b) => (a.c.name || '').localeCompare(b.c.name || '', 'pt-BR', { sensitivity: 'base' }));

    rows.forEach(({ c, idx }) => {
        const row = document.createElement('tr');
        const hasLegal = !!c.entregasLegais;
        row.innerHTML = `
            <td><input type="text" value="${c.code}" data-idx="${idx}" data-field="code" data-original="${c.code}" style="width:90px; font-weight:bold;"></td>
            <td><input type="text" value="${c.type}" data-idx="${idx}" data-field="type" style="width:60px;"></td>
            <td><input type="text" value="${c.name}" data-idx="${idx}" data-field="name"></td>
            <td style="text-align:center;">
                <input type="checkbox" data-idx="${idx}" data-field="entregasLegais" ${hasLegal ? 'checked' : ''}>
            </td>
            <td>
                <input type="date" value="${c.entregasLegaisStart || ''}" data-idx="${idx}" data-field="entregasLegaisStart">
            </td>
            <td>
                <input type="date" value="${c.entregasLegaisEnd || ''}" data-idx="${idx}" data-field="entregasLegaisEnd">
            </td>
            <td><input type="date" value="${c.contractStart || ''}" data-idx="${idx}" data-field="contractStart"></td>
            <td><input type="date" value="${c.contractEnd || ''}" data-idx="${idx}" data-field="contractEnd"></td>
        `;
        tbody.appendChild(row);
    });
}

// toggleLegaisRow removida — todos os campos de data são sempre editáveis

function saveClientsChanges() {
    const inputs = document.querySelectorAll('#clients-mgmt-table input');

    // 1) Detectar alterações de "Cód. Órgão" e exigir confirmação explícita
    const codeChanges = [];
    inputs.forEach(input => {
        if (input.dataset.field !== 'code') return;
        const original = (input.dataset.original || '').trim();
        const current = (input.value || '').trim();
        if (original !== current) {
            const idx = parseInt(input.dataset.idx, 10);
            const clientName = state.clients[idx] ? state.clients[idx].name : '(sem nome)';
            codeChanges.push({ idx, original, current, clientName, input });
        }
    });

    if (codeChanges.length > 0) {
        // Validação 1: códigos não podem ficar vazios
        const vazios = codeChanges.filter(c => !c.current);
        if (vazios.length > 0) {
            alert('❌ O Cód. Órgão não pode ficar vazio. Verifique os clientes:\n\n' +
                  vazios.map(c => `• ${c.clientName}`).join('\n'));
            return;
        }

        // Validação 2: detectar duplicidade entre todos os códigos (alterados + não alterados)
        const allCodes = Array.from(inputs)
            .filter(i => i.dataset.field === 'code')
            .map(i => (i.value || '').trim());
        const duplicados = allCodes.filter((c, i) => c && allCodes.indexOf(c) !== i);
        if (duplicados.length > 0) {
            alert('❌ Existem Cód. Órgão duplicados: ' + [...new Set(duplicados)].join(', ') +
                  '\nCada cliente deve ter um código único.');
            return;
        }

        // Confirmação explícita: lista cada alteração
        const resumo = codeChanges
            .map(c => `• ${c.clientName}: ${c.original} → ${c.current}`)
            .join('\n');
        const confirmou = confirm(
            `⚠️ ATENÇÃO: você está alterando o Cód. Órgão de ${codeChanges.length} cliente(s):\n\n` +
            `${resumo}\n\n` +
            `Essa mudança afeta a consulta ao TCE-RS. Confirma a gravação?`
        );
        if (!confirmou) {
            alert('Alterações de Cód. Órgão canceladas. Nenhum dado foi gravado.');
            return;
        }
    }

    // 2) Aplicar todas as alterações (code, type, name, checkboxes, datas)
    document.querySelectorAll('#clients-mgmt-table input, #clients-mgmt-table select').forEach(input => {
        const idx = input.dataset.idx;
        const field = input.dataset.field;
        if (!idx || !field) return;
        let value;
        if (input.type === 'checkbox') {
            value = input.checked;
        } else if (field === 'code') {
            value = (input.value || '').trim();
        } else {
            value = input.value;
        }
        state.clients[idx][field] = value;
    });

    localStorage.setItem('delta_v2_clients', JSON.stringify(state.clients));
    // Replica APENAS as marcações de Entregas Legais para o servidor (KV)
    // para que outros colaboradores vejam as mesmas marcações. Não envia
    // ibge/contractDates/etc — só os 3 campos. Fire-and-forget (não bloqueia o alert).
    pushLegaisToServer(state.clients);
    alert('✅ Clientes salvos com sucesso!');
    renderClientsMgmtTable(); // re-renderiza para atualizar data-original dos códigos
    refreshModuleData();
}
