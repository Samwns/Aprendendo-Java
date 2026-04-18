// Passo 3: Entrada e Saída (Input/Output)
// Como LER dados do usuário e ESCREVER resultados

import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    // Criar Scanner para ler dados
    Scanner sc = new Scanner(System.in);
    
    // LER TEXTO
    System.out.print("Digite seu nome: ");
    String nome = sc.nextLine();
    
    // LER NÚMERO INTEIRO
    System.out.print("Digite sua idade: ");
    int idade = sc.nextInt();
    
    // LER NÚMERO DECIMAL
    System.out.print("Digite sua altura (em metros): ");
    double altura = sc.nextDouble();
    
    // PROCESSAR E EXIBIR
    System.out.println("\n=== Seus Dados ===");
    System.out.println("Nome: " + nome);
    System.out.println("Idade: " + idade + " anos");
    System.out.println("Altura: " + altura + "m");
    System.out.println("Categoria: " + (idade >= 18 ? "Adulto" : "Menor"));
  }
}

/*
EXPLICAÇÃO:

Scanner sc = new Scanner(System.in);
- Scanner = classe para ler dados
- System.in = entrada do teclado
- sc = nome da variável

MÉTODOS DO SCANNER:
✓ nextLine()    → Lê uma linha inteira (texto com espaços)
✓ next()        → Lê uma palavra (sem espaços)
✓ nextInt()     → Lê um número inteiro
✓ nextDouble()  → Lê um número decimal
✓ nextBoolean() → Lê true/false

DIFERENÇAS:
nextLine():  "João Silva" → lê tudo
next():      "João Silva" → lê só "João"

COMO USAR:
1. Crie um Scanner: Scanner sc = new Scanner(System.in);
2. Use um método: int x = sc.nextInt();
3. O programa aguarda o usuário digitar
4. O valor é armazenado na variável

TESTE (copie na caixa de entrada):
João
25
1.80

RESULTADO ESPERADO:
=== Seus Dados ===
Nome: João
Idade: 25 anos
Altura: 1.8m
Categoria: Adulto
*/

// TRY IT: Leia mais dados e crie um programa de cadastro!
