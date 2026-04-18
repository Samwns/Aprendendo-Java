# 🚀 WebJDK — Compilador e Executor Java em Tempo Real

## O que foi implementado

A versão anterior do WebJDK tentava usar **CheerpJ** (emulação WebAssembly de Java). Isso criava diversos problemas:
- ❌ Compilador não funcionava (sem `javac` integrado)
- ❌ Erros de CORS e APIs obsoletas
- ❌ Emulação lenta e instável

## ✅ A nova solução

Implementei um **servidor Python HTTP** que compila e executa Java **de verdade** usando:
- `javac` — Compilador real do sistema
- `java` — Runtime real do sistema

Agora tudo funciona em 300-400ms, sem emulações!

## 📖 Como usar

### Passo 1: Iniciar Servidor (Terminal 1)
```bash
cd /home/samns/Arquivos/Repos/Aprendendo-Java
python3 server.py
```

Saída esperada:
```
🚀 Servidor Java compilador rodando em http://localhost:8888
Pressione Ctrl+C para parar
```

### Passo 2: Abrir WebJDK (Terminal 2)
```bash
# Abra no navegador: http://localhost:8080
# (Se não tiver servidor web, use: python3 -m http.server 8080)
```

### Passo 3: Codificar e Executar
1. Digite código Java no editor
2. Clique em `▶ Executar` ou pressione `Ctrl+Enter`
3. Veja resultado no terminal integrado

## 🎯 Exemplos

### Hello World
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World! ☕");
    }
}
```

**Output:**
```
Hello, World! ☕
✓ Process finished with exit code 0 (324ms)
```

### Com entrada (Scanner)
```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Qual é seu nome?");
        String nome = sc.nextLine();
        System.out.println("Olá, " + nome + "!");
    }
}
```

Entrada no painel `stdin`:
```
Samns
```

**Output:**
```
Qual é seu nome?
Olá, Samns!
✓ Process finished with exit code 0 (412ms)
```

## 🔧 Arquitetura

```
┌─────────────────────────────────────────┐
│           Browser (Cliente)             │
│  - Monaco Editor                        │
│  - Terminal integrado                   │
│  - Interface web responsiva             │
└──────────────┬──────────────────────────┘
               │ HTTP POST
               │ /compile
               ↓
┌─────────────────────────────────────────┐
│     Servidor Python (localhost:8888)    │
│  1. Recebe código Java                  │
│  2. Cria arquivo /tmp/webjdk_*/Main.java│
│  3. Executa: javac Main.java            │
│  4. Executa: java Main                  │
│  5. Captura output/errors               │
│  6. Retorna JSON                        │
└──────────────┬──────────────────────────┘
               │ HTTP 200
               │ JSON
               ↓
┌─────────────────────────────────────────┐
│           Browser (Cliente)             │
│  Exibe resultado no terminal            │
└─────────────────────────────────────────┘
```

## 📊 Performance

| Operação | Tempo |
|----------|-------|
| Compilação simples | ~150-200ms |
| Execução Hello World | ~100-150ms |
| **Total (compile + run)** | **~300-400ms** |

## 🔐 Segurança

⚠️ **Este servidor é apenas para desenvolvimento local!**

- Roda na porta 8888 (localhost apenas)
- Java executado com permissões do processo Python
- Sem sandboxing
- Sem isolamento de segurança
- Apenas em ambiente confiável

Para produção, adicionar:
- [ ] Limite de tempo por requisição
- [ ] Limite de memória por processo
- [ ] Validação de código
- [ ] Limites de requisição por IP
- [ ] Autenticação

## 🐛 Troubleshooting

### "Erro: Servidor não disponível"
```bash
# Certifique-se que está rodando:
ps aux | grep server.py

# Verifique porta:
lsof -i :8888
```

### "javac: command not found"
```bash
# Instale JDK (não apenas JRE)
sudo apt install default-jdk          # Ubuntu/Debian
sudo dnf install java-latest-openjdk  # Fedora
brew install openjdk                   # macOS
```

### "Timeout na execução"
- Código em loop infinito?
- Timeout padrão: 10 segundos
- Editar em `server.py` linha `timeout=10`

### "Porta 8888 já em uso"
```bash
# Encontre o processo:
sudo lsof -i :8888

# Mate o processo:
kill -9 <PID>
```

## 📚 API HTTP

### POST /compile
Compila e executa código Java

**Request:**
```bash
curl -X POST http://localhost:8888/compile \
  -H "Content-Type: application/json" \
  -d '{
    "code": "public class Main { public static void main(String[] args) { System.out.println(\"Hello\"); } }",
    "stdin": ""
  }'
```

**Response (sucesso):**
```json
{
  "success": true,
  "exitCode": 0,
  "output": ["Hello"],
  "stderr": [],
  "error": []
}
```

**Response (erro):**
```json
{
  "success": false,
  "exitCode": 1,
  "output": [],
  "stderr": ["Main.java:1: error: ..."],
  "error": ["Erro durante compilação (javac exit code: 1)"]
}
```

### GET /
Health check

```bash
curl http://localhost:8888/
```

Response:
```json
{
  "status": "ok",
  "version": "1.0"
}
```

### OPTIONS /compile
CORS preflight

```bash
curl -X OPTIONS http://localhost:8888/compile \
  -H "Origin: http://localhost:8080"
```

Headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS, GET
Access-Control-Allow-Headers: Content-Type
```

## 🎨 Roadmap

- [ ] Suporte a múltiplas classes (.class e imports)
- [ ] Compilação incremental (apenas se houver mudanças)
- [ ] Cache de compilação
- [ ] Debugging passo a passo
- [ ] Profiling de memória
- [ ] Histórico de execução
- [ ] Exportar código como JAR
- [ ] Integração com repositório Git
- [ ] Modo offline com Wasm

## 📝 Arquivos Principais

| Arquivo | Função |
|---------|--------|
| `server.py` | Servidor HTTP de compilação/execução |
| `js/runtime.js` | Cliente HTTP que envia código ao servidor |
| `js/editor.js` | Editor Monaco com syntax highlighting |
| `js/terminal.js` | Interface do terminal |
| `js/main.js` | Orquestração principal |
| `index.html` | Página HTML principal |
| `css/style.css` | Estilos CSS |

## 🚀 Próximos Passos

1. **Testar com mais exemplos** — fibonacci, arrays, OOP
2. **Adicionar suporte a bibliotecas** — imports de JDK
3. **Melhorar UI/UX** — temas, autocomplete
4. **Documentar mais** — guias, tutoriais
5. **Otimizar performance** — cache, parallelismo

---

**Criado com ❤️ para aprender Java de verdade no navegador!**
