# 🔀 Condicionais (IF, ELSE, SWITCH)

Aprenda a tomar decisões no seu código.

## IF / ELSE IF / ELSE

```java
public class Condicionais {
    public static void main(String[] args) {
        int nota = 7;
        
        if (nota >= 9) {
            System.out.println("Conceito A");
        } else if (nota >= 7) {
            System.out.println("Conceito B");
        } else if (nota >= 5) {
            System.out.println("Conceito C");
        } else {
            System.out.println("Reprovado");
        }
    }
}
```

## Operadores de Comparação

| Operador | Significado |
|----------|------------|
| `==` | Igual a |
| `!=` | Diferente de |
| `>` | Maior que |
| `<` | Menor que |
| `>=` | Maior ou igual |
| `<=` | Menor ou igual |

## Operadores Lógicos

```java
// AND (&&) - Todas as condições devem ser true
if (idade >= 18 && carteira == true) {
    System.out.println("Pode dirigir");
}

// OR (||) - Pelo menos uma deve ser true
if (dia == "sábado" || dia == "domingo") {
    System.out.println("Fim de semana!");
}

// NOT (!) - Inverte o valor
if (!chovendo) {
    System.out.println("Sair para jogar!");
}
```

## SWITCH

```java
public class Switch {
    public static void main(String[] args) {
        int opcao = 2;
        
        switch (opcao) {
            case 1:
                System.out.println("Opção 1 selecionada");
                break;
            case 2:
                System.out.println("Opção 2 selecionada");
                break;
            case 3:
                System.out.println("Opção 3 selecionada");
                break;
            default:
                System.out.println("Opção inválida");
        }
    }
}
```

## 🎯 Exercício 1 - Calculadora Simples

Peça dois números e uma operação (+, -, *, /), execute e exiba resultado.

### Solução
```java
import java.util.Scanner;

public class Exercicio1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Primeiro número: ");
        double num1 = scanner.nextDouble();
        
        System.out.print("Segundo número: ");
        double num2 = scanner.nextDouble();
        
        System.out.print("Operação (+, -, *, /): ");
        char operacao = scanner.next().charAt(0);
        
        double resultado = 0;
        boolean valido = true;
        
        switch (operacao) {
            case '+':
                resultado = num1 + num2;
                break;
            case '-':
                resultado = num1 - num2;
                break;
            case '*':
                resultado = num1 * num2;
                break;
            case '/':
                if (num2 != 0) {
                    resultado = num1 / num2;
                } else {
                    System.out.println("Erro: Divisão por zero!");
                    valido = false;
                }
                break;
            default:
                System.out.println("Operação inválida!");
                valido = false;
        }
        
        if (valido) {
            System.out.printf("Resultado: %.2f\n", resultado);
        }
    }
}
```

## 🎯 Exercício 2 - Classificação de Idade

Leia a idade e classifique como:
- Menor: < 13
- Adolescente: 13-17
- Adulto: 18-59
- Idoso: >= 60

### Solução
```java
import java.util.Scanner;

public class Exercicio2 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Digite sua idade: ");
        int idade = scanner.nextInt();
        
        String classificacao;
        
        if (idade < 13) {
            classificacao = "Menor";
        } else if (idade < 18) {
            classificacao = "Adolescente";
        } else if (idade < 60) {
            classificacao = "Adulto";
        } else {
            classificacao = "Idoso";
        }
        
        System.out.println("Classificação: " + classificacao);
    }
}
```

## Operador Ternário

```java
// Sintaxe: condição ? valor_se_verdadeiro : valor_se_falso
int idade = 25;
String status = (idade >= 18) ? "Maior de idade" : "Menor de idade";
System.out.println(status);
```
