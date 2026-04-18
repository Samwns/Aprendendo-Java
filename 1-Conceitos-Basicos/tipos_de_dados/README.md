# 🔢 Tipos de Dados Primitivos

Aprenda sobre os diferentes tipos de dados em Java.

## Tipos Primitivos

| Tipo | Tamanho | Exemplos | Intervalo |
|------|---------|----------|-----------|
| `byte` | 1 byte | -128 a 127 | Números pequenos |
| `short` | 2 bytes | -32768 a 32767 | Números pequenos |
| `int` | 4 bytes | -2^31 a 2^31-1 | Números inteiros comuns |
| `long` | 8 bytes | -2^63 a 2^63-1 | Números muito grandes |
| `float` | 4 bytes | Decimais em ponto flutuante | 6-7 dígitos |
| `double` | 8 bytes | Decimais em ponto flutuante | 15-17 dígitos |
| `char` | 2 bytes | 'A', '1', '!' | Um caractere |
| `boolean` | 1 bit | true, false | Verdadeiro ou Falso |

## 📝 Exemplo Completo

```java
public class TiposDados {
    public static void main(String[] args) {
        // Inteiros
        int idade = 25;
        long populacao = 8000000000L;  // L indica long
        
        // Decimais
        double altura = 1.75;
        float peso = 75.5f;  // f indica float
        
        // Caractere
        char inicial = 'S';
        
        // Booleano
        boolean ehMaiorIdade = true;
        
        System.out.println("Idade: " + idade);
        System.out.println("Altura: " + altura);
        System.out.println("Inicial: " + inicial);
        System.out.println("Maior de idade: " + ehMaiorIdade);
    }
}
```

## 🎯 Exercício 1 - Informações Pessoais

Crie um programa que armazene:
- Nome (String)
- Idade (int)
- Altura (double)
- CPF (long)
- E exiba tudo formatado

### Solução
```java
public class Exercicio1 {
    public static void main(String[] args) {
        String nome = "João Silva";
        int idade = 30;
        double altura = 1.80;
        long cpf = 12345678900L;
        
        System.out.println("=== INFORMAÇÕES PESSOAIS ===");
        System.out.println("Nome: " + nome);
        System.out.println("Idade: " + idade + " anos");
        System.out.println("Altura: " + altura + " m");
        System.out.println("CPF: " + cpf);
    }
}
```

## 🎯 Exercício 2 - Conversão de Unidades

Crie um programa que converta:
- 10 metros para centímetros
- 5 quilos para gramas
- 100 reais para centavos

### Solução
```java
public class Exercicio2 {
    public static void main(String[] args) {
        // Metros para centímetros
        double metros = 10;
        double centimetros = metros * 100;
        
        // Quilos para gramas
        double quilos = 5;
        double gramas = quilos * 1000;
        
        // Reais para centavos
        double reais = 100;
        int centavos = (int)(reais * 100);
        
        System.out.println(metros + " m = " + centimetros + " cm");
        System.out.println(quilos + " kg = " + gramas + " g");
        System.out.println("R$ " + reais + " = " + centavos + " centavos");
    }
}
```

## ⚡ Conversão de Tipos (Casting)

```java
// Implícito (automático)
int numero = 10;
double decimal = numero;  // OK, int cabe em double

// Explícito (precisa conversão)
double valor = 10.5;
int inteiro = (int)valor;  // Resultado: 10 (parte decimal é perdida)
```
