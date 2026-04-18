# ⌨️ Entrada e Saída

Aprenda a ler dados do usuário e exibir informações.

## Saída - System.out

```java
System.out.println("Texto");   // Exibe e pula de linha
System.out.print("Texto");     // Exibe sem pular de linha
System.out.printf("Número: %d\n", 10);  // Formatado
```

## Entrada - Scanner

```java
import java.util.Scanner;

public class EntradaSaida {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Digite seu nome: ");
        String nome = scanner.nextLine();  // Lê uma linha
        
        System.out.print("Digite sua idade: ");
        int idade = scanner.nextInt();  // Lê um inteiro
        
        System.out.print("Digite sua altura: ");
        double altura = scanner.nextDouble();  // Lê um double
        
        System.out.println("\n=== Dados Capturados ===");
        System.out.println("Nome: " + nome);
        System.out.println("Idade: " + idade);
        System.out.println("Altura: " + altura);
    }
}
```

## 📝 Exemplo com Formatação

```java
public class Formatacao {
    public static void main(String[] args) {
        int dia = 18;
        String mes = "Abril";
        int ano = 2026;
        
        // Usando printf
        System.out.printf("Data: %d de %s de %d\n", dia, mes, ano);
        
        // Formatadores comuns
        System.out.printf("Número inteiro: %d\n", 42);
        System.out.printf("Número decimal: %.2f\n", 3.14159);  // 2 casas decimais
        System.out.printf("Texto: %s\n", "Java");
    }
}
```

## 🎯 Exercício 1 - Cálculo de IMC

Leia peso e altura, calcule e exiba o IMC.

Fórmula: IMC = peso / (altura * altura)

### Solução
```java
import java.util.Scanner;

public class Exercicio1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Digite seu peso (kg): ");
        double peso = scanner.nextDouble();
        
        System.out.print("Digite sua altura (m): ");
        double altura = scanner.nextDouble();
        
        double imc = peso / (altura * altura);
        
        System.out.printf("Seu IMC é: %.2f\n", imc);
        
        if (imc < 18.5) {
            System.out.println("Abaixo do peso");
        } else if (imc < 25) {
            System.out.println("Peso normal");
        } else if (imc < 30) {
            System.out.println("Sobrepeso");
        } else {
            System.out.println("Obesidade");
        }
    }
}
```

## 🎯 Exercício 2 - Conversor de Moedas

Leia um valor em reais e a taxa de câmbio, converta para dólares.

### Solução
```java
import java.util.Scanner;

public class Exercicio2 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Digite o valor em reais: R$ ");
        double reais = scanner.nextDouble();
        
        System.out.print("Digite a taxa de câmbio: ");
        double taxa = scanner.nextDouble();
        
        double dolares = reais / taxa;
        
        System.out.printf("R$ %.2f = US$ %.2f\n", reais, dolares);
    }
}
```

## ⚠️ Cuidados

```java
Scanner scanner = new Scanner(System.in);

// nextInt() lê apenas o número, deixa \n
int num = scanner.nextInt();
// Depois nextLine() lê apenas \n!
String linha = scanner.nextLine();  // Vazio!

// Solução: leia um nextLine() depois de nextInt()
int numero = scanner.nextInt();
scanner.nextLine();  // "consome" a quebra de linha
String texto = scanner.nextLine();
```
