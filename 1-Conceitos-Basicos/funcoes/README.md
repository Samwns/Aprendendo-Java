# 🔧 Funções (Métodos)

Aprenda a criar e usar funções para reutilizar código.

## Declaração de Função

```java
public class MinhaFuncao {
    // Função que não retorna nada (void)
    public static void saudacao() {
        System.out.println("Olá!");
    }
    
    // Função que retorna um inteiro
    public static int soma(int a, int b) {
        return a + b;
    }
    
    // Função que retorna um double
    public static double media(double nota1, double nota2) {
        return (nota1 + nota2) / 2;
    }
    
    public static void main(String[] args) {
        saudacao();  // Chama a função
        
        int resultado = soma(5, 3);  // resultado = 8
        System.out.println("Soma: " + resultado);
        
        double med = media(8.5, 9.0);  // med = 8.75
        System.out.printf("Média: %.2f\n", med);
    }
}
```

## Escopo de Variáveis

```java
public class Escopo {
    static int globalCounter = 0;  // Acessível em toda a classe
    
    public static void incrementar() {
        int local = 10;  // Acessível apenas nesta função
        globalCounter++;
    }
    
    public static void main(String[] args) {
        // System.out.println(local);  // ERRO: local não existe aqui
        System.out.println(globalCounter);  // OK
    }
}
```

## Sobrecarga de Funções (Overloading)

```java
public class Sobrecarga {
    // Mesma função, parâmetros diferentes
    public static int somar(int a, int b) {
        return a + b;
    }
    
    public static double somar(double a, double b) {
        return a + b;
    }
    
    public static int somar(int a, int b, int c) {
        return a + b + c;
    }
    
    public static void main(String[] args) {
        System.out.println(somar(5, 3));           // 8 (int)
        System.out.println(somar(5.5, 3.2));       // 8.7 (double)
        System.out.println(somar(5, 3, 2));        // 10 (3 parâmetros)
    }
}
```

## 🎯 Exercício 1 - Função de Potência

Crie uma função que calcule a² (potência de 2).

### Solução
```java
public class Exercicio1 {
    public static int potenciaQuadrada(int numero) {
        return numero * numero;
    }
    
    public static void main(String[] args) {
        System.out.println("5² = " + potenciaQuadrada(5));   // 25
        System.out.println("10² = " + potenciaQuadrada(10)); // 100
    }
}
```

## 🎯 Exercício 2 - Verificar Primo

Crie uma função que verifica se um número é primo.

### Solução
```java
public class Exercicio2 {
    public static boolean ehPrimo(int numero) {
        if (numero <= 1) return false;
        if (numero == 2) return true;
        if (numero % 2 == 0) return false;
        
        for (int i = 3; i * i <= numero; i += 2) {
            if (numero % i == 0) return false;
        }
        return true;
    }
    
    public static void main(String[] args) {
        System.out.println("7 é primo? " + ehPrimo(7));    // true
        System.out.println("10 é primo? " + ehPrimo(10));  // false
        System.out.println("2 é primo? " + ehPrimo(2));    // true
    }
}
```

## 🎯 Exercício 3 - Média com Função

Crie uma função que calcula a média de um array.

### Solução
```java
public class Exercicio3 {
    public static double calcularMedia(double[] notas) {
        double soma = 0;
        for (double nota : notas) {
            soma += nota;
        }
        return soma / notas.length;
    }
    
    public static void main(String[] args) {
        double[] notas = {8.5, 9.0, 7.5, 8.0};
        double media = calcularMedia(notas);
        System.out.printf("Média: %.2f\n", media);
    }
}
```

## 🎯 Exercício 4 - Fibonacci

Crie uma função que retorna o n-ésimo número de Fibonacci.

### Solução
```java
public class Exercicio4 {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println("Sequência de Fibonacci:");
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
    }
}
```

## Recursão

```java
public class Recursao {
    // Calcular fatorial recursivamente
    public static int fatorial(int n) {
        if (n <= 1) return 1;
        return n * fatorial(n - 1);
    }
    
    public static void main(String[] args) {
        System.out.println("5! = " + fatorial(5));  // 120
    }
}
```
