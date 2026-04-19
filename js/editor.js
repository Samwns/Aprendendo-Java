// ── editor.js ────────────────────────────────────────────────────────────────
// Configura Monaco Editor com tema, syntax highlighting e autocomplete Java

import { setSbLines } from './terminal.js';

export let monacoEditor = null;

// ── TEMA PERSONALIZADO ────────────────────────────────────────────────────────
function defineTheme(monaco) {
  monaco.editor.defineTheme('webjdk-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword',          foreground: 'ff7b72', fontStyle: 'bold' },
      { token: 'keyword.control',  foreground: 'ff7b72', fontStyle: 'bold' },
      { token: 'type',             foreground: 'ffa657' },
      { token: 'type.identifier',  foreground: 'ffa657' },
      { token: 'string',           foreground: 'a5d6ff' },
      { token: 'string.escape',    foreground: '79c0ff' },
      { token: 'number',           foreground: '79c0ff' },
      { token: 'comment',          foreground: '5a6a80', fontStyle: 'italic' },
      { token: 'delimiter',        foreground: 'c9d1d9' },
      { token: 'annotation',       foreground: 'd2a8ff' },
      { token: 'identifier',       foreground: 'e6edf3' },
    ],
    colors: {
      'editor.background':          '#0d1117',
      'editor.foreground':          '#e6edf3',
      'editor.lineHighlightBackground': '#1c2230',
      'editor.selectionBackground': 'rgba(248,152,32,0.2)',
      'editorLineNumber.foreground': '#4a5568',
      'editorLineNumber.activeForeground': '#f89820',
      'editorCursor.foreground':    '#f89820',
      'editorGutter.background':    '#0d1117',
      'editorIndentGuide.background': '#1e2530',
      'editorIndentGuide.activeBackground': '#2a3545',
      'editorWidget.background':    '#161b22',
      'editorWidget.border':        '#30363d',
      'editorSuggestWidget.background': '#161b22',
      'editorSuggestWidget.border': '#30363d',
      'editorSuggestWidget.selectedBackground': '#1c2e45',
      'editorSuggestWidget.highlightForeground': '#f89820',
      'list.hoverBackground':       '#1c2230',
      'scrollbar.shadow':           '#00000000',
      'scrollbarSlider.background': '#252d3a',
      'scrollbarSlider.hoverBackground': '#3a4558',
    }
  });
}

// ── SNIPPETS / COMPLETIONS ────────────────────────────────────────────────────
const JAVA_SNIPPETS = [
  {
    label: 'psvm', detail: 'public static void main',
    insert: 'public static void main(String[] args) {\n\t$0\n}'
  },
  {
    label: 'sout', detail: 'System.out.println',
    insert: 'System.out.println($0);'
  },
  {
    label: 'soutp', detail: 'System.out.print (sem newline)',
    insert: 'System.out.print($0);'
  },
  {
    label: 'soutf', detail: 'System.out.printf',
    insert: 'System.out.printf("$1%n", $0);'
  },
  {
    label: 'fori', detail: 'for i loop',
    insert: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t$0\n}'
  },
  {
    label: 'foreach', detail: 'for-each loop',
    insert: 'for (${1:var} ${2:item} : ${3:collection}) {\n\t$0\n}'
  },
  {
    label: 'while', detail: 'while loop',
    insert: 'while (${1:condition}) {\n\t$0\n}'
  },
  {
    label: 'ife', detail: 'if / else',
    insert: 'if (${1:condition}) {\n\t$2\n} else {\n\t$0\n}'
  },
  {
    label: 'sw', detail: 'switch expression (Java 14+)',
    insert: 'switch (${1:value}) {\n\tcase ${2:A} -> $3;\n\tdefault -> $0;\n}'
  },
  {
    label: 'try', detail: 'try / catch',
    insert: 'try {\n\t$1\n} catch (${2:Exception} e) {\n\te.printStackTrace();\n\t$0\n}'
  },
  {
    label: 'trycr', detail: 'try-with-resources',
    insert: 'try (${1:Resource} ${2:r} = new ${1:Resource}()) {\n\t$0\n} catch (Exception e) {\n\te.printStackTrace();\n}'
  },
  {
    label: 'class', detail: 'class declaration',
    insert: 'public class ${1:NomeDaClasse} {\n\n\tpublic ${1:NomeDaClasse}() {\n\t\t$0\n\t}\n}'
  },
  {
    label: 'interface', detail: 'interface declaration',
    insert: 'public interface ${1:NomeDaInterface} {\n\t$0\n}'
  },
  {
    label: 'record', detail: 'record (Java 16+)',
    insert: 'record ${1:Nome}(${2:String campo}) {$0}'
  },
  {
    label: 'lambda', detail: 'lambda expression',
    insert: '(${1:param}) -> ${0:expr}'
  },
  {
    label: 'stream', detail: 'stream pipeline',
    insert: '${1:list}.stream()\n\t.filter(${2:e} -> ${3:condition})\n\t.map(${2:e} -> ${4:transform})\n\t.collect(Collectors.toList())'
  },
  {
    label: 'scanner', detail: 'Scanner de System.in',
    insert: 'Scanner ${1:sc} = new Scanner(System.in);\n${0}'
  },
  {
    label: 'arraylist', detail: 'new ArrayList',
    insert: 'List<${1:String}> ${2:lista} = new ArrayList<>();'
  },
  {
    label: 'hashmap', detail: 'new HashMap',
    insert: 'Map<${1:String}, ${2:Integer}> ${3:mapa} = new HashMap<>();'
  },
  {
    label: 'override', detail: '@Override annotation',
    insert: '@Override\n'
  },
  {
    label: 'getter', detail: 'getter method',
    insert: 'public ${1:String} get${2:Campo}() {\n\treturn ${3:campo};\n}'
  },
  {
    label: 'setter', detail: 'setter method',
    insert: 'public void set${1:Campo}(${2:String} ${3:valor}) {\n\tthis.${3:valor} = ${3:valor};\n}'
  },
];

// Palavras-chave e tipos Java para completions rápidas
const JAVA_KEYWORDS = [
  'abstract','assert','boolean','break','byte','case','catch','char',
  'class','const','continue','default','do','double','else','enum',
  'extends','final','finally','float','for','goto','if','implements',
  'import','instanceof','int','interface','long','native','new',
  'package','private','protected','public','return','short','static',
  'strictfp','super','switch','synchronized','this','throw','throws',
  'transient','try','var','void','volatile','while','record','sealed',
  'permits','yield',
];

const JAVA_TYPES = [
  'String','Integer','Double','Float','Long','Boolean','Character','Byte',
  'Short','Object','Number','Math','System','Arrays','ArrayList','LinkedList',
  'HashMap','HashSet','TreeMap','TreeSet','List','Map','Set','Queue',
  'Deque','Stack','Optional','Stream','Collectors','Collections',
  'StringBuilder','StringBuffer','Scanner','Random','BigInteger','BigDecimal',
  'LocalDate','LocalTime','LocalDateTime','Duration','Period',
  'Thread','Runnable','Callable','Future','CompletableFuture',
  'Exception','RuntimeException','IOException','NullPointerException',
  'IllegalArgumentException','IllegalStateException','UnsupportedOperationException',
];

function registerJavaCompletions(monaco) {
  monaco.languages.registerCompletionItemProvider('java', {
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber, endLineNumber: position.lineNumber,
        startColumn: word.startColumn, endColumn: word.endColumn,
      };

      const suggestions = [];

      // Snippets
      JAVA_SNIPPETS.forEach(s => {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          detail: s.detail,
          insertText: s.insert,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          sortText: '0' + s.label, // snippets primeiro
        });
      });

      // Keywords
      JAVA_KEYWORDS.forEach(kw => {
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          range,
          sortText: '1' + kw,
        });
      });

      // Types
      JAVA_TYPES.forEach(t => {
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: t,
          detail: 'java.lang / java.util',
          range,
          sortText: '2' + t,
        });
      });

      // Variáveis e métodos comuns
      const commonVars = [
        { label: 'args', kind: monaco.languages.CompletionItemKind.Variable, detail: 'String[]' },
        { label: 'i', kind: monaco.languages.CompletionItemKind.Variable, detail: 'int' },
        { label: 'j', kind: monaco.languages.CompletionItemKind.Variable, detail: 'int' },
        { label: 'x', kind: monaco.languages.CompletionItemKind.Variable, detail: 'int' },
        { label: 'y', kind: monaco.languages.CompletionItemKind.Variable, detail: 'int' },
        { label: 'name', kind: monaco.languages.CompletionItemKind.Variable, detail: 'String' },
        { label: 'age', kind: monaco.languages.CompletionItemKind.Variable, detail: 'int' },
        { label: 'idade', kind: monaco.languages.CompletionItemKind.Variable, detail: 'int' },
        { label: 'nome', kind: monaco.languages.CompletionItemKind.Variable, detail: 'String' },
        { label: 'result', kind: monaco.languages.CompletionItemKind.Variable, detail: 'any' },
        { label: 'count', kind: monaco.languages.CompletionItemKind.Variable, detail: 'int' },
        { label: 'total', kind: monaco.languages.CompletionItemKind.Variable, detail: 'int' },
        { label: 'sum', kind: monaco.languages.CompletionItemKind.Variable, detail: 'int' },
        { label: 'media', kind: monaco.languages.CompletionItemKind.Variable, detail: 'double' },
        { label: 'valor', kind: monaco.languages.CompletionItemKind.Variable, detail: 'any' },
        { label: 'dados', kind: monaco.languages.CompletionItemKind.Variable, detail: 'String[]' },
        { label: 'lista', kind: monaco.languages.CompletionItemKind.Variable, detail: 'List' },
        { label: 'mapa', kind: monaco.languages.CompletionItemKind.Variable, detail: 'Map' },
      ];

      commonVars.forEach(v => {
        suggestions.push({
          label: v.label,
          kind: v.kind,
          insertText: v.label,
          detail: v.detail,
          range,
          sortText: '3' + v.label,
        });
      });

      return { suggestions };
    },
  });

  // Trigger autocomplete ao digitar . e (
  monaco.languages.registerCompletionItemProvider('java', {
    triggerCharacters: ['.'],
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber, endLineNumber: position.lineNumber,
        startColumn: word.startColumn, endColumn: word.endColumn,
      };

      // Métodos comuns de System.out
      const systemOut = [
        { label: 'println', detail: 'System.out.println()', insert: 'println($0);' },
        { label: 'print',   detail: 'System.out.print()',   insert: 'print($0);' },
        { label: 'printf',  detail: 'System.out.printf()',  insert: 'printf("$1%n", $0);' },
        { label: 'flush',   detail: 'System.out.flush()',   insert: 'flush()' },
        { label: 'close',   detail: 'System.out.close()',   insert: 'close()' },
      ];

      // Métodos Math comuns
      const mathMethods = [
        { label: 'abs', detail: 'Math.abs()', insert: 'abs($0)' },
        { label: 'sqrt', detail: 'Math.sqrt()', insert: 'sqrt($0)' },
        { label: 'pow', detail: 'Math.pow()', insert: 'pow($1, $0)' },
        { label: 'floor', detail: 'Math.floor()', insert: 'floor($0)' },
        { label: 'ceil', detail: 'Math.ceil()', insert: 'ceil($0)' },
        { label: 'round', detail: 'Math.round()', insert: 'round($0)' },
        { label: 'min', detail: 'Math.min()', insert: 'min($1, $0)' },
        { label: 'max', detail: 'Math.max()', insert: 'max($1, $0)' },
        { label: 'random', detail: 'Math.random()', insert: 'random()' },
        { label: 'sin', detail: 'Math.sin()', insert: 'sin($0)' },
        { label: 'cos', detail: 'Math.cos()', insert: 'cos($0)' },
        { label: 'tan', detail: 'Math.tan()', insert: 'tan($0)' },
        { label: 'log', detail: 'Math.log()', insert: 'log($0)' },
        { label: 'exp', detail: 'Math.exp()', insert: 'exp($0)' },
        { label: 'PI', detail: 'Math.PI', insert: 'PI' },
        { label: 'E', detail: 'Math.E', insert: 'E' },
      ];

      // Métodos String comuns
      const strMethods = [
        { label: 'length()',       insert: 'length()' },
        { label: 'toUpperCase()',  insert: 'toUpperCase()' },
        { label: 'toLowerCase()',  insert: 'toLowerCase()' },
        { label: 'trim()',         insert: 'trim()' },
        { label: 'strip()',        insert: 'strip()' },
        { label: 'contains()',     insert: 'contains($0)' },
        { label: 'startsWith()',   insert: 'startsWith($0)' },
        { label: 'endsWith()',     insert: 'endsWith($0)' },
        { label: 'replace()',      insert: 'replace($1, $0)' },
        { label: 'split()',        insert: 'split("$0")' },
        { label: 'substring()',    insert: 'substring($1, $0)' },
        { label: 'charAt()',       insert: 'charAt($0)' },
        { label: 'indexOf()',      insert: 'indexOf($0)' },
        { label: 'isEmpty()',      insert: 'isEmpty()' },
        { label: 'isBlank()',      insert: 'isBlank()' },
        { label: 'equals()',       insert: 'equals($0)' },
        { label: 'equalsIgnoreCase()', insert: 'equalsIgnoreCase($0)' },
        { label: 'format()',       insert: 'format("$1", $0)' },
        { label: 'valueOf()',      insert: 'valueOf($0)' },
      ];

      const all = [...systemOut, ...mathMethods, ...strMethods];
      return {
        suggestions: all.map(m => ({
          label: m.label,
          kind: monaco.languages.CompletionItemKind.Method,
          insertText: m.insert || m.label,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: m.detail || '',
          range,
        }))
      };
    },
  });
}

// ── INICIALIZAR MONACO ────────────────────────────────────────────────────────
export function initEditor(onChangeCallback) {
  return new Promise(resolve => {
    require.config({
      paths: {
        vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs'
      }
    });

    require(['vs/editor/editor.main'], function (monaco) {
      // Registrar tema
      defineTheme(monaco);

      // Registrar completions Java
      registerJavaCompletions(monaco);

      // Criar editor
      monacoEditor = monaco.editor.create(
        document.getElementById('monacoContainer'),
        {
          value: getDefaultCode(),
          language: 'java',
          theme: 'webjdk-dark',
          fontSize: 13,
          lineHeight: 22,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'off',
          tabSize: 4,
          insertSpaces: true,
          autoIndent: 'full',
          formatOnType: true,
          formatOnPaste: true,
          suggestOnTriggerCharacters: true,
          quickSuggestions: { other: true, comments: false, strings: false },
          parameterHints: { enabled: true },
          inlayHints: { enabled: 'on' },
          bracketPairColorization: { enabled: true },
          guides: { bracketPairs: true, indentation: true },
          renderLineHighlight: 'line',
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          padding: { top: 14, bottom: 14 },
          scrollbar: { verticalScrollbarSize: 5, horizontalScrollbarSize: 5 },
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          renderWhitespace: 'none',
          colorDecorators: true,
        }
      );

      // Atualiza contador de linhas
      monacoEditor.onDidChangeModelContent(() => {
        const n = monacoEditor.getModel().getLineCount();
        setSbLines(n);
        if (onChangeCallback) onChangeCallback();
      });

      // Atalho Ctrl+Enter → executar
      monacoEditor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        () => { document.getElementById('rb').click(); }
      );

      // Resize observer
      const ro = new ResizeObserver(() => monacoEditor.layout());
      ro.observe(document.getElementById('monacoContainer'));

      setSbLines(monacoEditor.getModel().getLineCount());
      resolve(monacoEditor);
    });
  });
}

// ── GET CODE ──────────────────────────────────────────────────────────────────
export function getCode() {
  return monacoEditor ? monacoEditor.getValue() : '';
}

// ── DEFAULT CODE ──────────────────────────────────────────────────────────────
function getDefaultCode() {
  return `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World! ☕");
        System.out.println("WebJDK — Java");
        
        // Tente os snippets: sout, psvm, fori, foreach...
        // Ctrl+Space para sugestões, Ctrl+Enter para executar
    }
}`;
}
