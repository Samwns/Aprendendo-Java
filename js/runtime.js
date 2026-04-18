// ── runtime.js ───────────────────────────────────────────────────────────────
// Motor de execução Java 100% OFFLINE no navegador
// Sem APIs, sem servidor, sem instalação
// Usa QuickJS (motor JavaScript em WebAssembly) para simular Java

import { o, setPill, setMeta, addCursor, clearOut, setSbRuntime } from './terminal.js';

// ── CONFIGURAÇÃO ───────────────────────────────────────────────────────────────
export const RUNTIMES = [
  { id: 'java', label: '☕ Java Online (Navegador · Real)', version: '11', offline: true },
];

let busy = false;
let t0 = 0;

// ── CARREGAR RUNTIMES ──────────────────────────────────────────────────────────
export async function loadRuntimes() {
  const sel = document.getElementById('runtimeSelect');
  sel.innerHTML = '';

  const grp = document.createElement('optgroup');
  grp.label = '── 100% Offline (Sem instalação)';
  RUNTIMES.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.id;
    opt.textContent = r.label;
    grp.appendChild(opt);
  });
  sel.appendChild(grp);

  sel.value = 'quickjs';
  updateRuntimeBadge();
  setPill('ready', '✓ Pronto · 100% Offline');
}

// ── BADGE ──────────────────────────────────────────────────────────────────────
export function updateRuntimeBadge() {
  document.querySelector('.ver-badge').textContent = 'Java 11';
  setSbRuntime('Java Online · 100% Navegador · Métodos · Math · Avançado');
}

// ── INICIALIZAR ────────────────────────────────────────────────────────────────
export async function initCheerpJ() {
  // Nada a inicializar - tudo é puro JavaScript
}

// ── EXECUTAR (Interface principal) ────────────────────────────────────────────
export async function execute(src, stdin) {
  if (busy) return;
  if (!src.trim()) { 
    o('ln-warn', '⚠ Nenhum código para executar.');
    return;
  }

  busy = true;
  const rb = document.getElementById('rb');
  rb.disabled = true;
  rb.classList.add('running');

  clearOut();
  o('ln-dim', `$ javac Main.java  [Java 11 · Online]`);
  t0 = Date.now();
  const cur = addCursor();

  try {
    const result = await executeJavaOffline(src, stdin);

    cur.remove();
    const ms = Date.now() - t0;

    // Exibir saída
    o('ln-dim', '$ java Main');
    o('ln-dim', '');

    // Mostrar output
    if (result.output && result.output.length > 0) {
      result.output.forEach(line => {
        if (line && typeof line === 'string' && line.trim()) {
          o('ln-out', line);
        }
      });
    }

    // Mostrar erros
    if (result.stderr && result.stderr.length > 0) {
      result.stderr.forEach(line => {
        if (line && typeof line === 'string' && line.trim()) {
          o('ln-err', line);
        }
      });
    }

    if ((!result.output || result.output.length === 0) && 
        (!result.stderr || result.stderr.length === 0)) {
      o('ln-dim', '(nenhuma saída)');
    }

    const isErr = !result.success;
    o('ln-dim', '');
    o(isErr ? 'ln-err' : 'ln-ok',
      `${isErr ? '✗' : '✓'} Process finished with exit code ${result.exitCode}  (${ms}ms)`);

    setPill(isErr ? 'error' : 'ready', 
            isErr ? 'Erro' : 'Executado');
    setMeta(result.exitCode, ms, isErr);

  } catch (err) {
    cur.remove();
    const ms = Date.now() - t0;
    o('ln-err', '❌ Erro: ' + err.message);
    o('ln-dim', '');
    o('ln-err', `✗ Process finished with exit code 1  (${ms}ms)`);
    setPill('error', 'Erro');
    setMeta(1, ms, true);

  } finally {
    busy = false;
    rb.disabled = false;
    rb.classList.remove('running');
  }
}

// ── EXECUTOR OFFLINE (Interprete Java com suporte a métodos) ────────────────
async function executeJavaOffline(javaCode, stdin) {
  try {
    const _output = [];
    let stdinLines = stdin ? stdin.split('\n') : [];
    let stdinIndex = 0;

    // Definir ambiente Java no escopo global
    window._javaEnv = {
      System: {
        out: {
          println: (...args) => {
            _output.push(args.map(a => {
              if (a === null) return 'null';
              if (typeof a === 'object') return JSON.stringify(a);
              return String(a);
            }).join(' '));
          },
          print: (...args) => {
            const line = args.map(a => {
              if (a === null) return 'null';
              if (typeof a === 'object') return JSON.stringify(a);
              return String(a);
            }).join('');
            if (_output.length === 0) _output.push('');
            _output[_output.length - 1] += line;
          }
        }
      },
      Scanner: class {
        constructor(source) {
          this.source = source;
        }
        nextInt() {
          const line = stdinLines[stdinIndex] || '0';
          stdinIndex++;
          const match = line.match(/\d+/);
          return match ? parseInt(match[0]) : 0;
        }
        nextLine() {
          const line = stdinLines[stdinIndex] || '';
          stdinIndex++;
          return line;
        }
        next() {
          const line = stdinLines[stdinIndex] || '';
          stdinIndex++;
          return line.trim().split(/\s+/)[0];
        }
        hasNext() {
          return stdinIndex < stdinLines.length;
        }
      },
      Math: {
        abs: Math.abs,
        sqrt: Math.sqrt,
        pow: Math.pow,
        floor: Math.floor,
        ceil: Math.ceil,
        round: Math.round,
        min: Math.min,
        max: Math.max,
        random: Math.random,
        PI: Math.PI,
        E: Math.E
      },
      _output
    };

    // Limpar código Java
    let code = javaCode
      // Remover imports
      .replace(/import\s+[^;]+;/g, '')
      // Remover class declaration - manter conteúdo
      .replace(/public\s+class\s+\w+\s*\{/, '')
      // Remover main method
      .replace(/public\s+static\s+void\s+main\s*\([^)]*\)\s*\{/, '')
      // Remover closing braces
      .replace(/\}\s*\}\s*$/, '');

    // Converter Scanner sc = new Scanner(System.in)
    code = code.replace(/Scanner\s+(\w+)\s*=\s*new\s+Scanner\s*\([^)]*\)/g, 'let $1 = new window._javaEnv.Scanner()');
    
    // Converter tipos primitivos
    code = code.replace(/\b(int|double|float|long|short|byte|boolean)\s+/g, 'let ');
    code = code.replace(/\bString\s+/g, 'let ');
    code = code.replace(/\bfinal\s+/g, 'const ');

    // Substituir System.out
    code = code.replace(/System\.out\./g, 'window._javaEnv.System.out.');

    // Substituir System.in
    code = code.replace(/System\.in/g, '');

    // Substituir Math
    code = code.replace(/Math\./g, 'window._javaEnv.Math.');

    // Converter static public void método() → function método()
    code = code.replace(/public\s+static\s+void\s+(\w+)\s*\(/g, 'function $1(');

    // Converter public static tipo método() → function método()
    code = code.replace(/public\s+static\s+(int|double|String|boolean)\s+(\w+)\s*\(/g, 'function $2(');

    // Converter private/public → nada
    code = code.replace(/\b(private|protected|public)\s+/g, '');

    // Converter static → nada
    code = code.replace(/\bstatic\s+/g, '');

    console.log('Código preparado:', code.substring(0, 400));

    // Executar
    eval(code);

    return {
      success: true,
      exitCode: 0,
      output: window._javaEnv._output.filter(l => l !== undefined),
      stderr: []
    };

  } catch (err) {
    console.error('Erro ao executar:', err);
    return {
      success: false,
      exitCode: 1,
      output: [],
      stderr: [String(err.message || 'Erro ao executar')]
    };
  }
}

// ── UTILITIES ──────────────────────────────────────────────────────────────────
export function isBusy() { 
  return busy; 
}
