// ── runtime.js ───────────────────────────────────────────────────────────────
// Motor de execução Java via servidor Python (compilação real)
// Usa compilação e execução real de Java no servidor local

import { o, setPill, setMeta, addCursor, clearOut, setSbRuntime } from './terminal.js';

// ── CONFIGURAÇÃO DE RUNTIMES ──────────────────────────────────────────────────
export const RUNTIMES = [
  { id: 'java8', label: '☕ Java 21 (Servidor Local)', version: '8', cheerpj: false },
];

// ── ESTADO GLOBAL ─────────────────────────────────────────────────────────────
let busy           = false;
let t0             = 0;
let cheerpjReady   = false;
let outputCapture  = [];
let errorCapture   = [];

// ── CARREGAR RUNTIMES ─────────────────────────────────────────────────────────
export async function loadRuntimes() {
  const sel = document.getElementById('runtimeSelect');
  sel.innerHTML = '';

  const grp = document.createElement('optgroup');
  grp.label = '── CheerpJ (Local)';
  RUNTIMES.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.id;
    opt.textContent = r.label;
    grp.appendChild(opt);
  });
  sel.appendChild(grp);

  sel.value = 'java8';
  updateRuntimeBadge();
  setPill('ready', 'Pronto');
}

// ── BADGE ─────────────────────────────────────────────────────────────────────
export function updateRuntimeBadge() {
  const sel = document.getElementById('runtimeSelect');
  const rt  = RUNTIMES.find(r => r.id === sel.value) || RUNTIMES[0];
  document.querySelector('.ver-badge').textContent = 'Java ' + rt.version;
  setSbRuntime('Java ' + rt.version + ' · Servidor Local · Real');
}

// ── INICIALIZAR CONSOLE WRAPPER ────────────────────────────────────────────────
// Cria um console robusto que captura todo output do Java
function initConsoleWrapper() {
  outputCapture = [];
  errorCapture = [];

  // Interceptar console.log e console.error
  const originalLog = console.log;
  const originalErr = console.error;
  const originalWarn = console.warn;

  window._javaConsoleProxy = {
    log: (...args) => {
      const msg = args.map(a => 
        typeof a === 'object' ? JSON.stringify(a) : String(a)
      ).join(' ');
      outputCapture.push(msg);
    },
    error: (...args) => {
      const msg = args.map(a =>
        typeof a === 'object' ? JSON.stringify(a) : String(a)
      ).join(' ');
      errorCapture.push(msg);
    },
    warn: (...args) => {
      const msg = args.map(a =>
        typeof a === 'object' ? JSON.stringify(a) : String(a)
      ).join(' ');
      outputCapture.push('[WARN] ' + msg);
    }
  };

  // Buffer para linhas de output do Java
  window._lineBuffer = '';
  return window._javaConsoleProxy;
}

// ── INICIALIZAR CHEERPJ 4.2 ───────────────────────────────────────────────────
export async function initCheerpJ() {
  if (cheerpjReady) return;

  try {
    setPill('loading', 'Conectando ao servidor...');

    // Verificar se servidor de compilação está disponível
    try {
      const response = await fetch('http://localhost:8888/', {
        method: 'GET'
      });
      
      if (response.ok) {
        console.log('✓ Servidor de compilação disponível');
        setPill('ready', 'Pronto');
      } else {
        throw new Error('Status: ' + response.status);
      }
      
    } catch (e) {
      console.warn('⚠ Servidor de compilação não respondeu');
      setPill('warning', 'Servidor não disponível');
    }

    // Inicializar console wrapper para captura
    initConsoleWrapper();

    cheerpjReady = true;

  } catch (err) {
    console.error('Erro ao inicializar:', err);
    setPill('error', 'Erro de conexão');
    throw err;
  }
}

// ── COMPILAR E EXECUTAR ────────────────────────────────────────────────────────
// ── COMPILAR E EXECUTAR ────────────────────────────────────────────────────────
async function compileAndRun(javaCode, stdin) {
  // Reinicializar captura
  outputCapture = [];
  errorCapture = [];
  window._lineBuffer = '';

  try {
    // Usar servidor Python para compilar/executar
    const response = await fetch('http://localhost:8888/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: javaCode,
        stdin: stdin || ''
      })
    });

    if (!response.ok) {
      throw new Error('Erro HTTP: ' + response.status);
    }

    const result = await response.json();

    // Processar resultado
    if (result.success) {
      return {
        success: true,
        exitCode: 0,
        output: result.output || [],
        error: [],
        stderr: result.stderr || []
      };
    } else {
      return {
        success: false,
        exitCode: result.exitCode || 1,
        output: result.output || [],
        error: result.error || ['Erro na execução'],
        stderr: result.stderr || []
      };
    }

  } catch (err) {
    console.error('Erro na execução:', err);
    errorCapture.push('Erro de execução: ' + err.message);
    return {
      success: false,
      exitCode: 1,
      output: [],
      error: ['Erro: ' + err.message],
      stderr: errorCapture
    };
  }
}

// ── EXECUTAR (Interface principal) ────────────────────────────────────────────
export async function execute(src, stdin) {
  if (busy) return;
  if (!src.trim()) { 
    o('ln-warn', '⚠  Nenhum código para executar.');
    return;
  }

  busy = true;
  const rb = document.getElementById('rb');
  rb.disabled = true;
  rb.classList.add('running');

  clearOut();
  o('ln-dim', `$ javac Main.java  [Java 8 · CheerpJ 4.2 Local]`);
  t0 = Date.now();
  const cur = addCursor();

  try {
    setPill('loading', 'Compilando e executando...');

    // Garantir que CheerpJ está inicializado
    if (!cheerpjReady) {
      await initCheerpJ();
    }

    // Compilar e executar
    const result = await compileAndRun(src, stdin);

    cur.remove();
    const ms = Date.now() - t0;

    // Exibir saída
    o('ln-dim', '$ java Main');
    o('ln-dim', '');

    // Mostrar output capturado
    if (result.output && result.output.length > 0) {
      result.output.forEach(line => {
        if (line && typeof line === 'string') {
          const lines = line.split(/\r?\n/);
          lines.forEach(l => {
            if (l.trim()) o('ln-out', l);
          });
        }
      });
    }

    // Mostrar erros se houver
    if (result.error && result.error.length > 0) {
      result.error.forEach(line => {
        if (line && typeof line === 'string') {
          const lines = line.split(/\r?\n/);
          lines.forEach(l => {
            if (l.trim()) o('ln-err', l);
          });
        }
      });
    }

    // Se nenhum output, informar
    if ((!result.output || result.output.length === 0) && 
        (!result.error || result.error.length === 0)) {
      o('ln-dim', '(nenhuma saída)');
    }

    // Status final
    const isErr = !result.success;
    const exitCode = result.exitCode;

    o('ln-dim', '');
    o(isErr ? 'ln-err' : 'ln-ok',
      `${isErr ? '✗' : '✓'} Process finished with exit code ${exitCode}  (${ms}ms)`);

    setPill(isErr ? 'error' : 'ready', 
            isErr ? 'Erro de execução' : 'Executado');
    setMeta(exitCode, ms, isErr);

  } catch (err) {
    cur.remove();
    const ms = Date.now() - t0;
    o('ln-dim', '');
    o('ln-err', '✗ Erro ao executar: ' + err.message);
    setPill('error', 'Erro fatal');
    setMeta(1, ms, true);

  } finally {
    busy = false;
    rb.disabled = false;
    rb.classList.remove('running');
  }
}

// ── UTILITIES ──────────────────────────────────────────────────────────────────
export function isBusy() { 
  return busy; 
}

// Expor para debugging
window._runtimeState = {
  get isBusy() { return busy; },
  get cheerpjReady() { return cheerpjReady; },
  get outputCapture() { return outputCapture; },
  get errorCapture() { return errorCapture; }
};
