[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Oswald&weight=500&size=30&pause=1000&color=F89820&width=500&lines=🚀+Seja+Bem+Vindo!;☕+Bora+Aprender+Java!;💡+Do+Zero+ao+Avançado;🔥+Vamos+Codar+Juntos!)](https://git.io/typing-svg)  
[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Oswald&weight=500&size=30&pause=1000&color=F89820&center=true&vCenter=true&width=500&lines=☕+Aprendendo+Java;🏗️+Orientação+a+Objetos;⚡+Streams+e+Lambdas;🚀+GraalVM+%26+SDKMAN)](https://git.io/typing-svg)  
![java-gif](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTBtM2U4eXUyN2tpbWpoYmpzdWVyZWc1ZTE1YWlhbmRqMzY2ZWFkbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FoVzfcqCDSb7zCynOp/giphy.gif)

[![Badge Linux](https://img.shields.io/badge/OS-Linux-blue?logo=linux)](https://)  [![Badge Windows](https://img.shields.io/badge/🖥️_OS-Windows-blue?logo=windows)](https://)  [![Badge Java](https://img.shields.io/badge/Java-17%2B-orange?logo=openjdk)](https://)  [![Badge IntelliJ](https://img.shields.io/badge/IDE-IntelliJ_IDEA-purple?logo=intellijidea)](https://)

## 📌 Sobre este Repositório

📚 Este repositório contém exemplos práticos e conceitos fundamentais para quem está começando a aprender **Java**.

---

## 🌐 WebJDK — Java no Navegador

Este repositório inclui um **WebJDK** que permite executar código Java diretamente no navegador usando **CheerpJ** (JVM WebAssembly).

### 🚀 Como Usar

1. **Acesse o WebJDK**: [https://samwns.github.io/Aprendendo-Java/](https://samwns.github.io/Aprendendo-Java/)
2. **Escreva seu código** no editor Monaco
3. **Clique em "▶ Executar"** ou pressione `Ctrl+Enter`
4. **Veja a saída** no terminal integrado

### ⚠️ Problema Atual

Atualmente, o Git Pages do GitHub não suporta arquivos JAR necessários para o CheerpJ. Para fazer funcionar completamente:

#### 🔧 Solução: Deploy no Netlify

1. **Crie uma conta** no [Netlify](https://netlify.com)
2. **Conecte seu repositório** GitHub
3. **Deploy automático** será feito
4. **Acesse sua URL** personalizada

O Netlify suporta arquivos binários e CORS necessários para o WebJDK funcionar.

#### 🛠️ Deploy Manual

Se preferir testar localmente:

```bash
# Instalar http-server
npm install -g http-server

# Servir o projeto
http-server --port 8000 --cors
```

Acesse: `http://localhost:8000`

---

## 📁 Estrutura do Projeto

```
Aprendendo-Java/
├── index.html          # Página principal do WebJDK
├── css/
│   └── style.css       # Estilos da interface
├── js/
│   ├── main.js         # Ponto de entrada da aplicação
│   ├── editor.js       # Configuração do Monaco Editor
│   ├── runtime.js      # Motor de execução CheerpJ
│   └── terminal.js     # Interface do terminal
├── jars/
│   ├── ecj.jar         # Eclipse Compiler for Java
│   └── runner.jar      # Utilitário de execução
└── README.md           # Este arquivo
```

### 🎯 Funcionalidades do WebJDK

- ✅ **Editor Monaco** com syntax highlighting Java
- ✅ **Execução em tempo real** via CheerpJ WebAssembly
- ✅ **Múltiplas versões Java** (8, 11, 17)
- ✅ **Terminal integrado** com saída colorida
- ✅ **Snippets inteligentes** (sout, fori, etc.)
- ✅ **Responsivo** para mobile
- ✅ **Entrada stdin** para programas interativos

---

## 1️⃣ - 🛠️ Instalando e Configurando o Ambiente

O **SDKMAN** é um gerenciador de SDKs que permite instalar e trocar versões do JDK com facilidade:

```bash
# Instalar o SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Listar versões disponíveis do Java
sdk list java

# Instalar o Java 21 (LTS recomendado)
sdk install java 21.0.3-tem

# Instalar o GraalVM
sdk install java 21.0.3-graal

# Trocar entre versões
sdk use java 21.0.3-tem
```

---

### 🐧 Linux — Instalação Manual por Distribuição

#### 🟠 Ubuntu / Debian
```bash
sudo apt update && sudo apt install openjdk-21-jdk
```

#### 🔵 Fedora / RHEL / CentOS
```bash
sudo dnf install java-21-openjdk-devel
```

#### 🟢 Arch Linux / Manjaro
```bash
sudo pacman -S jdk21-openjdk
```
> Para listar versões disponíveis no Arch:
```bash
sudo pacman -Ss jdk
```

#### 🐍 openSUSE / Tumbleweed
```bash
sudo zypper install java-21-openjdk-devel
```

#### 🎩 Gentoo
```bash
emerge --ask dev-java/openjdk:21
```

> ✅ **Verificar a instalação:**
```bash
java -version
javac -version
```

---

### 🖥️ Windows

**Opção 1 — Instalador Oficial:**  
1️⃣ Baixe ➡️ [OpenJDK (Temurin)](https://adoptium.net/)  
2️⃣ Execute o instalador e siga os passos  
3️⃣ Confirme que `JAVA_HOME` foi configurado nas variáveis de ambiente  

**Opção 2 — Via Winget:**
```powershell
winget install EclipseAdoptium.Temurin.21.JDK
```

---

### ⚡ GraalVM — Java de Alta Performance

O **GraalVM** é uma JVM avançada que suporta compilação nativa (Native Image) e múltiplas linguagens.

#### Via SDKMAN:
```bash
sdk install java 21.0.3-graal
```

#### Ubuntu / Debian (manual):
```bash
sudo apt install gcc zlib1g-dev
# Baixe em: https://www.graalvm.org/downloads/
# Extraia e configure o JAVA_HOME
export JAVA_HOME=/caminho/para/graalvm
export PATH=$JAVA_HOME/bin:$PATH
```

#### Compilação Nativa com GraalVM:
```bash
# Instalar o Native Image
gu install native-image

# Compilar para binário nativo
native-image -jar MeuApp.jar
./meuapp  # Executa sem precisar da JVM!
```

---

## 2️⃣ - 💻 Escolhendo sua IDE

### 🟣 IntelliJ IDEA Community (Recomendada)

A IDE mais poderosa para Java — a versão **Community** é **gratuita e open-source**.

#### Linux:
```bash
# Via SDKMAN (toolbox)
# Ou via snap:
sudo snap install intellij-idea-community --classic

# Arch Linux:
sudo pacman -S intellij-idea-community-edition
```

#### Windows:
1️⃣ Baixe ➡️ [IntelliJ IDEA Community](https://www.jetbrains.com/idea/download/)  
2️⃣ Execute o instalador `.exe`  
3️⃣ Marque ✅ **Add to PATH** e ✅ **Create Desktop Shortcut**

> 💡 **Dica:** Use o **JetBrains Toolbox** para gerenciar todas as IDEs JetBrains facilmente.

---

### 🔵 VS Code (Alternativa leve)

1️⃣ Instale a extensão **Extension Pack for Java** da Microsoft  
2️⃣ Instale a extensão **Debugger for Java**  
3️⃣ Configure o `settings.json`:
```json
{
  "java.home": "/usr/lib/jvm/java-21-openjdk"
}
```

---

## 3️⃣ - 📚 Conceitos Básicos

✅ [**Olá Mundo!**](1-Conceitos-Basicos/hello_world/README.md) 🌍: Seu primeiro programa em **Java**.  
✅ [**Tipos de Dados Primitivos**](1-Conceitos-Basicos/tipos_de_dados/README.md) 🔢: `int`, `float`, `double`, `char`, `boolean`, `String`.  
✅ [**Entrada e Saída**](1-Conceitos-Basicos/entrada_saida/README.md) ⌨️🖥️: `Scanner`, `System.out.println`.  
✅ [**Condicionais**](1-Conceitos-Basicos/condicionais/README.md) 🔀: `if`, `else`, `else if`, `switch`.  
✅ [**Laços de Repetição**](1-Conceitos-Basicos/lacos/README.md) 🔄: `for`, `while`, `do-while`.  
✅ [**Orientação a Objetos**](1-Conceitos-Basicos/oop/README.md) 🏗️: Classes, objetos, herança, polimorfismo.  

🔄 O repositório será atualizado **aos poucos**! 🚧

---

## 🛠️ Como usar este repositório

👀 Explore as seções acima e clique nos links 🔗 para acessar os detalhes e exemplos de cada tópico.

## 🤝 Contribuições

💡 Contribuições são **bem-vindas**! Se você tem sugestões de melhorias ou novos exemplos, sinta-se à vontade para abrir uma **pull request**.

![thanks-gif](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDhyMTR4ZnB6NHd4MjYzaTI4d2o3a2pua2c3OW5sc3NudWp4aGdweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MT5UUV1d4CXE2A37Dg/giphy.webp)
