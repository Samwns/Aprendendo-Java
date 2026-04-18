# 📦 Arrays

Aprenda a armazenar múltiplos valores do mesmo tipo.

## Declaração e Inicialização

```java
// Declaração
int[] numeros;

// Inicialização com tamanho
int[] numeros = new int[5];  // Array com 5 posições (índices 0-4)

// Inicialização com valores
int[] numeros = {10, 20, 30, 40, 50};

// Strings
String[] nomes = {"Ana", "Bruno", "Carlos"};
```

## Acessando Elementos

```java
public class Acessos {
    public static void main(String[] args) {
        int[] notas = {8, 9, 7, 10, 6};
        
        System.out.println("Primeira nota: " + notas[0]);  // 8
        System.out.println("Última nota: " + notas[4]);    // 6
        System.out.println("Tamanho do array: " + notas.length);  // 5
        
        // Modificar elemento
        notas[2] = 8;  // Muda o 7 para 8
    }
}
```

## Iterando sobre Array

```java
public class Iteracao {
    public static void main(String[] args) {
        int[] numeros = {1, 2, 3, 4, 5};
        
        // For tradicional
        for (int i = 0; i < numeros.length; i++) {
            System.out.println("Índice " + i + ": " + numeros[i]);
        }
        
        // For-each
        for (int num : numeros) {
            System.out.println("Número: " + num);
        }
    }
}
```

## Arrays Multidimensionais

```java
public class Array2D {
    public static void main(String[] args) {
        // Matriz 3x3
        int[][] matriz = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        System.out.println("Elemento [1][2]: " + matriz[1][2]);  // 6
        
        // Iterar sobre matriz
        for (int i = 0; i < matriz.length; i++) {
            for (int j = 0; j < matriz[i].length; j++) {
                System.out.print(matriz[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

## 🎯 Exercício 1 - Média de Notas

Crie um array com 5 notas, calcule e exiba a média.

### Solução
```java
public class Exercicio1 {
    public static void main(String[] args) {
        double[] notas = {8.5, 9.0, 7.5, 8.0, 9.5};
        
        double soma = 0;
        for (double nota : notas) {
            soma += nota;
        }
        
        double media = soma / notas.length;
        System.out.printf("Média: %.2f\n", media);
    }
}
```

## 🎯 Exercício 2 - Maior e Menor Valor

Encontre o maior e o menor valor em um array.

### Solução
```java
public class Exercicio2 {
    public static void main(String[] args) {
        int[] numeros = {45, 23, 89, 12, 67, 34, 90, 11};
        
        int maior = numeros[0];
        int menor = numeros[0];
        
        for (int num : numeros) {
            if (num > maior) {
                maior = num;
            }
            if (num < menor) {
                menor = num;
            }
        }
        
        System.out.println("Maior: " + maior);
        System.out.println("Menor: " + menor);
    }
}
```

## 🎯 Exercício 3 - Contar Pares e Ímpares

Conte quantos números pares e ímpares há em um array.

### Solução
```java
public class Exercicio3 {
    public static void main(String[] args) {
        int[] numeros = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        
        int pares = 0;
        int impares = 0;
        
        for (int num : numeros) {
            if (num % 2 == 0) {
                pares++;
            } else {
                impares++;
            }
        }
        
        System.out.println("Números pares: " + pares);
        System.out.println("Números ímpares: " + impares);
    }
}
```

## 🎯 Exercício 4 - Inverter Array

Inverta a ordem dos elementos de um array.

### Solução
```java
public class Exercicio4 {
    public static void main(String[] args) {
        int[] original = {1, 2, 3, 4, 5};
        int[] invertido = new int[original.length];
        
        for (int i = 0; i < original.length; i++) {
            invertido[i] = original[original.length - 1 - i];
        }
        
        System.out.print("Original: ");
        for (int num : original) System.out.print(num + " ");
        
        System.out.print("\nInvertido: ");
        for (int num : invertido) System.out.print(num + " ");
    }
}
```
