// ── main.js ──────────────────────────────────────────────────────────────────
// Ponto de entrada — inicializa editor, runtime e eventos

import { initEditor, getCode }               from './editor.js';
import { printWelcome, clearOut, o, setPill } from './terminal.js';
import { loadRuntimes, execute, updateRuntimeBadge, RUNTIMES } from './runtime.js';

// ── INIT ──────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  // 1. Mensagem de boas-vindas no terminal
  printWelcome();

  // 2. Inicializa Monaco Editor
  await initEditor();

  // 3. Popula o seletor com os runtimes JDoodle API disponíveis
  await loadRuntimes();

  // 4. Evento de mudança de runtime
  document.getElementById('runtimeSelect')
    .addEventListener('change', () => {
      updateRuntimeBadge();
      // A mudança de versão vale imediatamente com JDoodle API
      o('ln-info', '✓ Runtime alterado para ' + getSelectedRuntime().label);
    });
});

// ── GET SELECTED RUNTIME ──────────────────────────────────────────────────────
function getSelectedRuntime() {
  const sel = document.getElementById('runtimeSelect');
  return RUNTIMES.find(r => r.id === sel.value) || RUNTIMES[0];
}

// ── EXECUTAR ──────────────────────────────────────────────────────────────────
window.run = async function () {
  const src   = getCode();
  const stdin = document.getElementById('stdin').value;
  await execute(src, stdin);
};

// ── LIMPAR ────────────────────────────────────────────────────────────────────
window.doClear = function () {
  clearOut();
  o('ln-dim', '$ terminal limpo');
  document.getElementById('mExit').textContent  = '—';
  document.getElementById('mTime').textContent  = '—';
  document.getElementById('mBadge').textContent = '';
  document.getElementById('mBadge').className   = 'bdg';
  setPill('ready', 'Pronto');
};
