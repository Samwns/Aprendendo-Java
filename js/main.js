// ── main.js ──────────────────────────────────────────────────────────────────
// Ponto de entrada — inicializa editor, runtime e eventos

import { initEditor, getCode }               from './editor.js';
import { printWelcome, clearOut, o, setPill } from './terminal.js';
import { loadRuntimes, execute, updateRuntimeBadge } from './runtime.js';

// ── INIT ──────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  // 1. Mensagem de boas-vindas no terminal
  printWelcome();

  // 2. Inicializa Monaco Editor
  await initEditor();

  // 3. Popula o seletor com os runtimes CheerpJ disponíveis
  await loadRuntimes();

  // 4. Evento de mudança de runtime
  document.getElementById('runtimeSelect')
    .addEventListener('change', () => {
      updateRuntimeBadge();
      // Avisa que a mudança de versão só vale antes da primeira execução
      o('ln-warn', '⚠  Versão alterada. Se o CheerpJ já foi iniciado, recarregue a página (F5).');
    });
});

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
