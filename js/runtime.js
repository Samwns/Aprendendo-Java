// ── runtime.js ───────────────────────────────────────────────────────────────
// Motor de execução Java via CheerpJ (client-side, sem servidor)
// Substitui a Piston API que virou whitelist-only em 02/2026

import { o, setPill, setMeta, addCursor, clearOut, setSbRuntime } from './terminal.js';

// ── CONFIGURAÇÃO DE RUNTIMES ──────────────────────────────────────────────────
// CheerpJ 4.2 suporta Java 8, 11 e 17 (preview).
// Java 21 está no roadmap do CheerpJ 6.0 (2026).
const RUNTIMES = [
  { id: 'java17', label: '☕ Java 17 LTS  (CheerpJ · preview)', version: 17, srcLevel: '17' },
  { id: 'java11', label: '☕ Java 11 LTS  (CheerpJ)',           version: 11, srcLevel: '11' },
  { id: 'java8',  label: '☕ Java 8       (CheerpJ)',           version:  8, srcLevel:  '8' },
];

// Caminhos no filesystem virtual do CheerpJ
const JARS_PATH    = '/app/jars/';   // serve os jars da pasta /jars/ do servidor
const SRC_PATH     = '/str/Main.java';
const CLASS_DIR    = '/files/classes/';
const OUT_FILE     = '/files/output.txt';
const ERR_FILE     = '/files/error.txt';

// URLs dos JARs no Maven Central
const ECJ_URL      = 'https://repo1.maven.org/maven2/org/eclipse/jdt/ecj/3.36.0/ecj-3.36.0.jar';
const RUNNER_URL   = '/jars/runner.jar'; // runner ainda local por enquanto

// ── ESTADO GLOBAL ─────────────────────────────────────────────────────────────
let cjInitialized  = false;
let cjInitPending  = null;   // Promise de inicialização em andamento
let cjJavaVersion  = 17;     // versão usada na inicialização
let busy           = false;
let t0             = 0;

// ── CARREGAR RUNTIMES (substitui loadRuntimes do Piston) ─────────────────────
export async function loadRuntimes() {
  const sel = document.getElementById('runtimeSelect');
  sel.innerHTML = '';

  const grp = document.createElement('optgroup');
  grp.label = '── CheerpJ WebAssembly JVM';
  RUNTIMES.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.id;
    opt.textContent = r.label;
    grp.appendChild(opt);
  });
  sel.appendChild(grp);

  // Nota sobre Java 21
  const grp21 = document.createElement('optgroup');
  grp21.label = '── Em breve';
  const opt21 = document.createElement('option');
  opt21.value    = 'java21-soon';
  opt21.disabled = true;
  opt21.textContent = '⏳ Java 21 LTS — CheerpJ 6.0 (2026)';
  grp21.appendChild(opt21);
  sel.appendChild(grp21);

  // Java 17 selecionado por padrão
  sel.value = 'java17';
  updateRuntimeBadge();

  setPill('ready', 'Pronto');
}

// ── BADGE ─────────────────────────────────────────────────────────────────────
export function updateRuntimeBadge() {
  const sel = document.getElementById('runtimeSelect');
  const rt  = RUNTIMES.find(r => r.id === sel.value) || RUNTIMES[0];
  document.querySelector('.ver-badge').textContent = 'Java ' + rt.version;
  setSbRuntime('Java ' + rt.version + ' · CheerpJ · WebAssembly');
}

// ── INICIALIZAR CHEERPJ (lazy, na primeira execução) ─────────────────────────
async function ensureCheerpJ(javaVersion) {
  // Se já foi inicializado com a mesma versão, ok
  if (cjInitialized && cjJavaVersion === javaVersion) return;

  // Se foi inicializado com versão diferente, avisa e reusa a atual
  if (cjInitialized && cjJavaVersion !== javaVersion) {
    o('ln-warn', `⚠  CheerpJ já foi iniciado com Java ${cjJavaVersion}.`);
    o('ln-warn', '   Para trocar a versão, recarregue a página (F5).');
    return;
  }

  // Se já existe uma inicialização em andamento, aguarda
  if (cjInitPending) { await cjInitPending; return; }

  cjInitPending = (async () => {
    o('ln-sys', `☕ Iniciando CheerpJ 4.2 com Java ${javaVersion}...`);
    o('ln-dim', '   (primeira execução baixa ~30 MB de runtime WebAssembly)');

    if (typeof cheerpjInit === 'undefined') {
      throw new Error('CheerpJ não carregou. Verifique sua conexão e recarregue a página.');
    }

    await cheerpjInit({
      version:  javaVersion,
      status:   'none',   // sem overlay de loading do CheerpJ
      javaProperties: [
        'file.encoding=UTF-8',
        'stdout.encoding=UTF-8',
      ],
      mountPoints: [
        // Monta a pasta /jars do servidor no filesystem virtual /app/jars/
        { type: 'httpMount', path: '/app/', url: '/' },
        // ECJ do Maven Central
        { type: 'httpMount', path: '/maven/', url: 'https://repo1.maven.org/maven2/org/eclipse/jdt/ecj/3.36.0/' },
      ],
    });

    cjInitialized  = true;
    cjJavaVersion  = javaVersion;
    cjInitPending  = null;
    o('ln-ok', `✓ CheerpJ pronto  (Java ${javaVersion})`);
    o('ln-sep', '──────────────────────────────────────────────────────');
  })();

  await cjInitPending;
}

// ── LER ARQUIVO DO FILESYSTEM VIRTUAL ────────────────────────────────────────
async function readVfsFile(path) {
  try {
    const blob = await cjFileBlob(path);
    return await blob.text();
  } catch {
    return '';   // arquivo não existe → string vazia
  }
}

// ── EXECUTAR ──────────────────────────────────────────────────────────────────
export async function execute(src, stdin) {
  if (busy) return;
  if (!src.trim()) { o('ln-warn', '⚠  Nenhum código para executar.'); return; }

  // Runtime selecionado
  const sel  = document.getElementById('runtimeSelect');
  const rt   = RUNTIMES.find(r => r.id === sel.value) || RUNTIMES[0];

  busy = true;
  const rb = document.getElementById('rb');
  rb.disabled = true;
  rb.classList.add('running');

  clearOut();
  o('ln-dim', `$ javac Main.java  [Java ${rt.version} · CheerpJ]`);
  t0 = Date.now();
  const cur = addCursor();

  try {
    // 1. Inicializa CheerpJ (lazy)
    setPill('loading', 'Iniciando JVM...');
    await ensureCheerpJ(rt.version);

    // 2. Injeta o código-fonte no filesystem virtual /str/
    await cheerpjAddStringFile(SRC_PATH, src);

    // Compilar usando javac do CheerpJ
    setPill('loading', 'Compilando...');

    // Usa timestamp para diretório único → evita conflito entre execuções
    const runId    = Date.now().toString(36);
    const classDir = `/files/cls_${runId}/`;

    const compileResult = await cheerpjRunMain(
      'javac',
      '',
      [
        '-cp', '/maven/ecj-3.36.0.jar',
        '-d', classDir,
        '-source', rt.srcLevel,
        '-target', rt.srcLevel,
        SRC_PATH
      ]
    );

    // Verificar se compilou (checando se o .class foi criado)
    try {
      await cjFileBlob(`${classDir}Main.class`);
    } catch {
      // Erro de compilação - tentar ler stderr
      const compileError = await readVfsFile('/dev/stderr');
      o('ln-dim', '');
      o('ln-err', '✗ Erro de compilação:');
      if (compileError) {
        compileError.split('\n').forEach(line => {
          const clean = line.replace('/str/', '').replace(/^-+$/, '');
          if (clean.trim()) o('ln-err', '  ' + clean);
        });
      } else {
        o('ln-err', '  Erro desconhecido na compilação');
      }
      o('ln-dim', '');
      o('ln-dim', `Process finished with exit code 1  (${ms}ms)`);
      setPill('error', 'Erro de compilação');
      setMeta(1, ms, true);
      return;
    }

    // Executar a classe compilada
    setPill('loading', 'Executando...');
    o('ln-dim', '$ java Main');

    const runResult = await cheerpjRunMain(
      'Main',
      classDir,
      []
    );

    cur.remove();
    const ms = Date.now() - t0;

    // ── Verificar erro de compilação
    if (compileError) {
      o('ln-dim', '');
      o('ln-err', '✗ Erro de compilação:');
      compileError.split('\n').forEach(line => {
        const clean = line.replace('/str/', '').replace(/^-+$/, '');
        if (clean.trim()) o('ln-err', '  ' + clean);
      });
      o('ln-dim', '');
      o('ln-dim', `Process finished with exit code 1  (${ms}ms)`);
      setPill('error', 'Erro de compilação');
      setMeta(1, ms, true);
      return;
    }

    // ── Exibir saída
    setPill('loading', 'Executando...');
    o('ln-dim', '$ java Main');
    o('ln-dim', '');

    if (runOutput.trimEnd()) {
      runOutput.trimEnd().split('\n').forEach(l => o('ln-out', l));
    }

    if (runError.trim()) {
      o('ln-dim', '');
      o('ln-err', '— stderr —');
      runError.trim().split('\n').forEach(l => o('ln-err', '  ' + l));
    }

    const isErr = runError.includes('Exception') || runError.includes('Error');
    const exit  = isErr ? 1 : 0;

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
    o('ln-warn', '  Verifique sua conexão com a internet e tente novamente.');
    setPill('error', 'Erro');
    setMeta(1, ms, true);
  } finally {
    busy = false;
    rb.disabled = false;
    rb.classList.remove('running');
  }
}

export function isBusy() { return busy; }
