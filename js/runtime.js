// ── runtime.js ───────────────────────────────────────────────────────────────
// Motor de execução Java via CheerpJ (local, sem API externa)
// Usa WebAssembly para executar Java no navegador

import { o, setPill, setMeta, addCursor, clearOut, setSbRuntime } from './terminal.js';

// ── CONFIGURAÇÃO DE RUNTIMES ──────────────────────────────────────────────────
// CheerpJ suporta Java 8 (simulado via WebAssembly)
export const RUNTIMES = [
  { id: 'java8', label: '☕ Java 8 (CheerpJ Local)', version: '8', cheerpj: true },
];

// ── ESTADO GLOBAL ─────────────────────────────────────────────────────────────
let busy           = false;
let t0             = 0;
let cheerpjReady   = false;

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

  // Java 8 selecionado por padrão
  sel.value = 'java8';
  updateRuntimeBadge();

  setPill('ready', 'Pronto');
}

// ── BADGE ─────────────────────────────────────────────────────────────────────
export function updateRuntimeBadge() {
  const sel = document.getElementById('runtimeSelect');
  const rt  = RUNTIMES.find(r => r.id === sel.value) || RUNTIMES[0];
  document.querySelector('.ver-badge').textContent = 'Java ' + rt.version;
  setSbRuntime('Java ' + rt.version + ' · CheerpJ · Local');
}

// ── INICIALIZAR CHEERPJ ───────────────────────────────────────────────────────
export async function initCheerpJ() {
  if (cheerpjReady) return;

  try {
    setPill('loading', 'Carregando CheerpJ...');

    // Carregar CheerpJ
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cjrtnc.leaningtech.com/3.0/cj3loader.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    // Aguardar CheerpJ estar pronto
    await new Promise(resolve => {
      const check = () => {
        if (typeof cheerpjRunJava === 'function' || typeof cheerpjInit === 'function') {
          resolve();
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });

    cheerpjReady = true;
    setPill('ready', 'CheerpJ carregado');

  } catch (err) {
    console.error('Erro ao inicializar CheerpJ:', err);
    setPill('error', 'Erro no CheerpJ');
    throw err;
  }
}

// ── EXECUTAR ──────────────────────────────────────────────────────────────────
export async function execute(src, stdin) {
  if (busy) return;
  if (!src.trim()) { o('ln-warn', '⚠  Nenhum código para executar.'); return; }

  // Garantir que CheerpJ está inicializado
  if (!cheerpjReady) {
    await initCheerpJ();
  }

  busy = true;
  const rb = document.getElementById('rb');
  rb.disabled = true;
  rb.classList.add('running');

  clearOut();
  o('ln-dim', `$ javac Main.java  [Java 8 · CheerpJ Local]`);
  t0 = Date.now();
  const cur = addCursor();

// ── EXECUTAR ──────────────────────────────────────────────────────────────────
export async function execute(src, stdin) {
  if (busy) return;
  if (!src.trim()) { o('ln-warn', '⚠  Nenhum código para executar.'); return; }

  // Garantir que CheerpJ está inicializado
  if (!cheerpjReady) {
    await initCheerpJ();
  }

  busy = true;
  const rb = document.getElementById('rb');
  rb.disabled = true;
  rb.classList.add('running');

  clearOut();
  o('ln-dim', `$ javac Main.java  [Java 8 · CheerpJ Local]`);
  t0 = Date.now();
  const cur = addCursor();

  try {
    setPill('loading', 'Compilando e executando...');

    // Array para capturar output
    const outputLines = [];
    
    // Interceptar console.log para capturar output do Java
    const oldLog = console.log;
    const oldWarn = console.warn;
    
    console.log = function(...args) {
      const text = args.map(a => 
        typeof a === 'object' ? JSON.stringify(a) : String(a)
      ).join(' ');
      outputLines.push(text);
      oldLog.apply(console, args); // Ainda escrever no console original
    };
    
    console.warn = console.log;

    // Criar um console customizado para CheerpJ
    const consoleHandle = {
      write: function(data) {
        const text = typeof data === 'string' ? data : String(data);
        outputLines.push(text);
        return text.length;
      }
    };

    if (window.cheerpjCreateConsole) {
      try {
        await window.cheerpjCreateConsole(consoleHandle);
      } catch (e) {
        console.log('Consle creation failed:', e);
      }
    }

    // Executar Main
    const exitCode = await window.cheerpjRunMain('Main', 'Main', [], stdin || '');

    // Restaurar console
    console.log = oldLog;
    console.warn = oldWarn;

    cur.remove();
    const ms = Date.now() - t0;

    // Exibir saída
    o('ln-dim', '$ java Main');
    o('ln-dim', '');

    // Mostrar linhas de output
    if (outputLines.length > 0) {
      outputLines.forEach(line => {
        if (line && typeof line === 'string') {
          // Dividir por quebras de linha e mostrar cada uma
          const lines = line.split(/\r?\n/);
          lines.forEach(l => {
            if (l.trim()) o('ln-out', l);
          });
        }
      });
    } else {
      // Se não capturamos output, pode ser que o Java escreveu diretamente
      o('ln-dim', '(saída capturada via CheerpJ)');
    }

    const isErr = exitCode !== 0;
    const exit  = exitCode || 0;

    o('ln-dim', '');
    o(isErr ? 'ln-err' : 'ln-ok',
      `${isErr ? '✗' : '✓'} Process finished with exit code ${exit}  (${ms}ms)`);

    setPill(isErr ? 'error' : 'ready', isErr ? 'Erro de execução' : 'Executado');
    setMeta(exit, ms, isErr);

  } catch (err) {
    cur.remove();
    const ms = Date.now() - t0;
    o('ln-dim', '');
    o('ln-err', '✗ Erro ao executar: ' + err.message);
    setPill('error', 'Erro');
    setMeta(1, ms, true);
  } finally {
    busy = false;
    rb.disabled = false;
    rb.classList.remove('running');
  }
}

  } catch (err) {
    cur.remove();
    const ms = Date.now() - t0;
    o('ln-dim', '');
    o('ln-err', '✗ Erro ao executar: ' + err.message);
    setPill('error', 'Erro');
    setMeta(1, ms, true);
  } finally {
    busy = false;
    rb.disabled = false;
    rb.classList.remove('running');
  }
}

export function isBusy() { return busy; }
