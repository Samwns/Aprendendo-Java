// Passo 2: Tipos de Dados
// Java tem diferentes tipos para armazenar informações

public class Main {
  public static void main(String[] args) {
    // Tipos INTEIROS (números sem decimal)
    int idade = 25;
    long populacao = 7000000000L;
    
    // Tipos DECIMAIS
    double preco = 19.99;
    float peso = 75.5f;
    
    // Tipo TEXTO
    String nome = "João";
    
    // Tipo BOOLEANO (verdadeiro/falso)
    boolean ativo = true;
    
    // Tipo CHARACTER (um único caractere)
    char letra = 'A';
    
    // Imprimindo os valores
    System.out.println("Nome: " + nome);
    System.out.println("Idade: " + idade + " anos");
    System.out.println("Preço: R$ " + preco);
    System.out.println("Peso: " + peso + " kg");
    System.out.println("Ativo: " + ativo);
    System.out.println("Primeira letra: " + letra);
  }
}

/*
EXPLICAÇÃO DOS TIPOS:

┌─────────────────────────────────────────────────────┐
│ TIPO         │ TAMANHO │ EXEMPLO      │ DESCRIÇÃO   │
├─────────────────────────────────────────────────────┤
│ byte         │ 1 byte  │ 127          │ Muito pequeno│
│ short        │ 2 bytes │ 32767        │ Pequeno     │
│ int          │ 4 bytes │ 2147483647   │ Comum       │
│ long         │ 8 bytes │ 9223372036L  │ Muito grande│
├─────────────────────────────────────────────────────┤
│ float        │ 4 bytes │ 3.14f        │ Com "f"     │
│ double       │ 8 bytes │ 3.14159      │ Mais preciso│
├─────────────────────────────────────────────────────┤
│ String       │ -       │ "Olá"        │ Texto       │
│ char         │ 2 bytes │ 'A'          │ 1 caractere │
│ boolean      │ 1 bit   │ true/false   │ Verdadeiro/F│
└─────────────────────────────────────────────────────┘

REGRAS:
✓ int x = 10;           // Correto
✓ long x = 10000000L;   // L = long
✓ float x = 3.14f;      // f = float
✗ float x = 3.14;       // ERRO (é double por padrão)

RESULTADO ESPERADO:
Nome: João
Idade: 25 anos
Preço: R$ 19.99
Peso: 75.5 kg
Ativo: true
Primeira letra: A
*/

// TRY IT: Crie variáveis com seus dados pessoais!
