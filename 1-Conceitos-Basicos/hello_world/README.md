# 🌍 Olá Mundo!

Seu primeiro programa em Java!

## O que você vai aprender

- Como criar uma classe em Java
- Como criar o método `main` (ponto de entrada)
- Como exibir mensagens com `System.out.println`

## Conceito

Todo programa Java começa com uma classe. A classe deve ter um método `main` que é executado primeiro.

## 📝 Exemplo

```java
public class OlaMundo {
    public static void main(String[] args) {
        System.out.println("Olá, Mundo!");
    }
}
```

### Explicação linha por linha:

```java
public class OlaMundo {  // Define uma classe pública chamada OlaMundo
    public static void main(String[] args) {  // Método principal (ponto de entrada)
        System.out.println("Olá, Mundo!");  // Exibe mensagem no console
    }
}
```

## 🎯 Exercício 1 - Variações

Crie um programa que exiba:
```
Bem-vindo ao Java!
Meu nome é [SEU_NOME]
Estou aprendendo programação
```

### Solução
```java
public class Exercicio1 {
    public static void main(String[] args) {
        System.out.println("Bem-vindo ao Java!");
        System.out.println("Meu nome é Samns");
        System.out.println("Estou aprendendo programação");
    }
}
```

## 🎯 Exercício 2 - Arte ASCII

Crie um programa que exiba um padrão:
```
*
**
***
****
*****
```

### Solução
```java
public class Exercicio2 {
    public static void main(String[] args) {
        System.out.println("*");
        System.out.println("**");
        System.out.println("***");
        System.out.println("****");
        System.out.println("*****");
    }
}
```

## ✨ Dicas

- `System.out.println()` exibe e pula de linha
- `System.out.print()` exibe sem pular de linha
- Use `\n` para quebra de linha: `System.out.println("Linha 1\nLinha 2")`
