// Passo 6: Arrays (Vetores)
// Como guardar VÁRIOS valores do mesmo tipo

public class Main {
  public static void main(String[] args) {
    // EXEMPLO 1: Criar um array de inteiros
    System.out.println("=== Array de Inteiros ===");
    int[] numeros = {10, 20, 30, 40, 50};
    System.out.println("Primeiro elemento: " + numeros[0]);
    System.out.println("Terceiro elemento: " + numeros[2]);
    System.out.println("Último elemento: " + numeros[4]);
    
    // EXEMPLO 2: Tamanho do array com .length
    System.out.println("\n=== Tamanho do Array ===");
    System.out.println("Quantidade de elementos: " + numeros.length);
    
    // EXEMPLO 3: Loop com array
    System.out.println("\n=== FOR com Array ===");
    for (int i = 0; i < numeros.length; i++) {
      System.out.println("numeros[" + i + "] = " + numeros[i]);
    }
    
    // EXEMPLO 4: Array vazio (definir tamanho depois)
    System.out.println("\n=== Array Vazio (tamanho 3) ===");
    String[] nomes = new String[3];
    nomes[0] = "Alice";
    nomes[1] = "Bob";
    nomes[2] = "Carlos";
    for (String nome : nomes) {
      System.out.println(nome);
    }
    
    // EXEMPLO 5: Array de Strings
    System.out.println("\n=== Array de Strings ===");
    String[] frutas = {"Maçã", "Banana", "Laranja"};
    for (int i = 0; i < frutas.length; i++) {
      System.out.println((i+1) + ". " + frutas[i]);
    }
    
    // EXEMPLO 6: Modificar valores do array
    System.out.println("\n=== Modificar Array ===");
    int[] valores = {1, 2, 3};
    System.out.println("Antes: " + valores[1]);
    valores[1] = 20;  // Muda o valor da posição 1
    System.out.println("Depois: " + valores[1]);
    
    // EXEMPLO 7: Array de double (decimais)
    System.out.println("\n=== Array de Double ===");
    double[] precos = {10.50, 20.30, 15.99};
    double total = 0;
    for (double preco : precos) {
      total = total + preco;
      System.out.println(preco);
    }
    System.out.println("Total: " + total);
    
    // EXEMPLO 8: Array de boolean
    System.out.println("\n=== Array de Boolean ===");
    boolean[] ligadas = {true, false, true, true};
    for (int i = 0; i < ligadas.length; i++) {
      if (ligadas[i]) {
        System.out.println("Posição " + i + ": LIGADA");
      } else {
        System.out.println("Posição " + i + ": DESLIGADA");
      }
    }
  }
}

/*
SINTAXE BÁSICA:

1. Criar array COM valores:
   int[] numeros = {10, 20, 30};
   String[] nomes = {"Alice", "Bob"};

2. Criar array VAZIO (depois preenche):
   int[] numeros = new int[5];
   numeros[0] = 10;
   numeros[1] = 20;

3. ACESSAR elemento:
   System.out.println(numeros[0]);  // Primeiro
   System.out.println(numeros[2]);  // Terceiro

4. TAMANHO:
   numeros.length  // Quantidade total

5. LOOPS com Array:
   - FOR tradicional:
     for (int i = 0; i < numeros.length; i++)
   
   - FOR-EACH (mais simples):
     for (int numero : numeros)

TIPOS DE ARRAYS:
- int[]       → Inteiros
- double[]    → Decimais
- String[]    → Textos
- boolean[]   → Verdadeiro/Falso

ÍNDICES:
- Começam em 0!
- {10, 20, 30}
  índice: 0   1   2
- numeros[0] = 10
- numeros[1] = 20
- numeros[2] = 30

RESULTADO ESPERADO:
=== Array de Inteiros ===
Primeiro elemento: 10
Terceiro elemento: 30
Último elemento: 50

=== Tamanho do Array ===
Quantidade de elementos: 5

=== FOR com Array ===
numeros[0] = 10
numeros[1] = 20
numeros[2] = 30
numeros[3] = 40
numeros[4] = 50

=== Array Vazio (tamanho 3) ===
Alice
Bob
Carlos

=== Array de Strings ===
1. Maçã
2. Banana
3. Laranja

=== Modificar Array ===
Antes: 2
Depois: 20

=== Array de Double ===
10.5
20.3
15.99
Total: 46.79

=== Array de Boolean ===
Posição 0: LIGADA
Posição 1: DESLIGADA
Posição 2: LIGADA
Posição 3: LIGADA
*/

// TRY IT: Crie um array com 5 notas e calcule a MÉDIA!
