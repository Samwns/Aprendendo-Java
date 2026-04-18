# 🔄 Laços de Repetição (FOR, WHILE, DO-WHILE)

Aprenda a repetir blocos de código.

## FOR - Quando você sabe quantas vezes repetir

```java
public class LacoFor {
    public static void main(String[] args) {
        // Contar de 1 a 10
        for (int i = 1; i <= 10; i++) {
            System.out.println("Número: " + i);
        }
        
        // De trás para frente
        for (int i = 10; i >= 1; i--) {
            System.out.println("Contagem regressiva: " + i);
        }
        
        // Com incremento de 2
        for (int i = 0; i <= 20; i += 2) {
            System.out.println(i);
        }
    }
}
```

## FOR-EACH - Percorrer arrays/coleções

```java
public class LacoForEach {
    public static void main(String[] args) {
        int[] numeros = {10, 20, 30, 40, 50};
        
        // Sintaxe: for (tipo variavel : colecao)
        for (int num : numeros) {
            System.out.println("Número: " + num);
        }
        
        String[] nomes = {"Ana", "Bruno", "Carlos"};
        for (String nome : nomes) {
            System.out.println("Nome: " + nome);
        }
    }
}
```

## WHILE - Enquanto a condição for verdadeira

```java
public class LacoWhile {
    public static void main(String[] args) {
        int contador = 1;
        
        while (contador <= 5) {
            System.out.println("Contador: " + contador);
            contador++;  // Importante: incrementar para não ficar infinito!
        }
    }
}
```

## DO-WHILE - Executa pelo menos uma vez

```java
public class LacoDoWhile {
    public static void main(String[] args) {
        int i = 1;
        
        do {
            System.out.println("Mensagem " + i);
            i++;
        } while (i <= 3);
    }
}
```

## BREAK e CONTINUE

```java
public class BreakContinue {
    public static void main(String[] args) {
        // BREAK - Sai do laço
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                break;  // Para quando chegar em 5
            }
            System.out.println(i);  // Exibe 1, 2, 3, 4
        }
        
        // CONTINUE - Pula a iteração
        for (int i = 1; i <= 5; i++) {
            if (i == 3) {
                continue;  // Pula quando for 3
            }
            System.out.println(i);  // Exibe 1, 2, 4, 5
        }
    }
}
```

## 🎯 Exercício 1 - Tabuada

Crie um programa que exiba a tabuada do 7.

### Solução
```java
public class Exercicio1 {
    public static void main(String[] args) {
        System.out.println("=== Tabuada do 7 ===");
        for (int i = 1; i <= 10; i++) {
            System.out.printf("7 × %d = %d\n", i, 7 * i);
        }
    }
}
```

## 🎯 Exercício 2 - Soma dos Números

Some todos os números de 1 a 100.

### Solução
```java
public class Exercicio2 {
    public static void main(String[] args) {
        int soma = 0;
        
        for (int i = 1; i <= 100; i++) {
            soma += i;
        }
        
        System.out.println("Soma de 1 a 100: " + soma);
    }
}
```

## 🎯 Exercício 3 - Números Pares

Exiba todos os números pares de 1 a 50.

### Solução
```java
public class Exercicio3 {
    public static void main(String[] args) {
        System.out.println("Números pares de 1 a 50:");
        for (int i = 1; i <= 50; i++) {
            if (i % 2 == 0) {  // % é o operador módulo (resto)
                System.out.println(i);
            }
        }
    }
}
```

## 🎯 Exercício 4 - Validação com Laço

Peça a senha até o usuário acertar (senha correta: "1234").

### Solução
```java
import java.util.Scanner;

public class Exercicio4 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String senha = "";
        
        while (!senha.equals("1234")) {
            System.out.print("Digite a senha: ");
            senha = scanner.nextLine();
            
            if (!senha.equals("1234")) {
                System.out.println("Senha incorreta. Tente novamente!");
            }
        }
        
        System.out.println("Acesso concedido!");
    }
}
```
