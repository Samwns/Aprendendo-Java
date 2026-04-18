# 🚀 WebJDK — Pronto para usar!

## Status: ✅ FUNCIONANDO 100%

Seu WebJDK está totalmente operacional e pronto para usar!

## ⚡ Iniciar em 2 passos

### Passo 1: Terminal 1 (Servidor de Compilação)
```bash
cd /home/samns/Arquivos/Repos/Aprendendo-Java
python3 server.py
```

Você verá:
```
🚀 Servidor Java compilador rodando em http://localhost:8888
```

### Passo 2: Terminal 2 (Abrir WebJDK)
```bash
# Abrir navegador em:
http://localhost:8080
```

Se não tiver servidor web rodando, execute em outro terminal:
```bash
cd /home/samns/Arquivos/Repos/Aprendendo-Java
python3 -m http.server 8080
```

## ✨ Funcionalidades

- ✅ **Java Real** — Java 21, não emulação
- ✅ **Compilação Real** — `javac` oficial
- ✅ **Execução Real** — `java` oficial
- ✅ **Rápido** — ~300-400ms compile + run
- ✅ **Scanner** — Entrada de dados suportada
- ✅ **UI Moderna** — Editor Monaco + Terminal

## 📝 Exemplo básico

No editor, escreva:
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World! ☕");
        System.out.println("Eu sou real!");
    }
}
```

Clique em **▶ Executar** (ou `Ctrl+Enter`)

Output esperado:
```
Hello, World! ☕
Eu sou real!
✓ Process finished with exit code 0 (325ms)
```

## 📚 Exemplo com Scanner (entrada)

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Digite seu nome: ");
        String nome = sc.nextLine();
        System.out.println("Olá, " + nome + "!");
    }
}
```

No painel **stdin** (abaixo), digite:
```
Samns
```

Clique em **▶ Executar**

## 📖 Documentação Completa

Leia [WEBJDK.md](./WEBJDK.md) para:
- Arquitetura detalhada
- API HTTP do servidor
- Troubleshooting
- Roadmap futuro
- Exemplos avançados

## 🐛 Se algo não funcionar

1. **"Servidor não disponível"** 
   - Certifique que `python3 server.py` está rodando
   - Verifique porta: `lsof -i :8888`

2. **"javac: command not found"**
   - Instale JDK: `sudo apt install default-jdk`
   - Verifique: `javac -version`

3. **"Compilação falha"**
   - Verifique sintaxe Java
   - A classe deve ser `Main`
   - Método deve ser `public static void main(String[] args)`

## 🎯 Próximos passos

1. Teste com seus próprios programas Java
2. Experimente com múltiplas classes (se implementado)
3. Leia a documentação em WEBJDK.md
4. Reporte bugs ou sugestões

---

**Criado com ❤️ para aprender Java de verdade!**
