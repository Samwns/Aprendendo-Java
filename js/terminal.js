// ── terminal.js ─────────────────────────────────────────────────────────────
// Gerencia o painel de saída (terminal)

export function outEl() {
  return document.getElementById('out');
}

export function o(cls, text) {
  const el = outEl();
  const span = document.createElement('span');
  span.className = 'ln ' + cls;
  span.textContent = text;
  el.appendChild(span);
  el.scrollTop = el.scrollHeight;
  return span;
}

export function clearOut() {
  outEl().innerHTML = '';
}

export function addCursor() {
  const c = document.createElement('span');
  c.className = 'cblink';
  outEl().appendChild(c);
  return c;
}

// ── STATUS PILL ──────────────────────────────────────────────────────────────
export function setPill(state, text) {
  const dot  = document.getElementById('pd');
  const span = document.getElementById('ps');
  dot.className = 'pill-dot' +
    (state === 'loading' ? ' loading' : state === 'error' ? ' error' : '');
  span.textContent = text;
}

// ── META ROW ─────────────────────────────────────────────────────────────────
export function setMeta(exit, ms, err) {
  document.getElementById('mExit').textContent = exit === null ? '—' : 'exit ' + exit;
  document.getElementById('mTime').textContent = ms   === null ? '—' : ms + 'ms';
  const b = document.getElementById('mBadge');
  if (err === null) { b.textContent = ''; b.className = 'bdg'; return; }
  b.textContent = err ? '● ERRO' : '● OK';
  b.className   = 'bdg ' + (err ? 'bdg-err' : 'bdg-ok');
}

// ── STATUS BAR ────────────────────────────────────────────────────────────────
export function setSbRuntime(name) {
  const el = document.getElementById('sbRuntime');
  if (el) el.textContent = name;
}

export function setSbLines(n) {
  const el = document.getElementById('sbL');
  if (el) el.textContent = n + (n === 1 ? ' linha' : ' linhas');
}

// ── INIT MESSAGE ──────────────────────────────────────────────────────────────
export function printWelcome() {
  o('ln-sys',  '☕ WebJDK — Java real via CheerpJ WebAssembly JVM');
  o('ln-sys',  '   Sem servidor · Sem instalação · Roda no navegador');
  o('ln-sep',  '──────────────────────────────────────────────────────');
  o('ln-dim',  '$ Selecione o runtime e clique em ▶ Executar');
  o('ln-dim',  '  (primeira execução baixa ~30 MB de runtime — fica em cache)');
  o('ln-sep',  '──────────────────────────────────────────────────────');
}
