// Passo 5: Loops (FOR, WHILE, DO-WHILE)
// Como REPETIR instruções várias vezes

public class laços {
  public static void main(String[] args) {
    // EXEMPLO 1: FOR - quando sabe QUANTAS vezes
    System.out.println("=== FOR (1 a 5) ===");
    for (int i = 1; i <= 5; i++) {
      System.out.println(i);
    }
    
    // EXEMPLO 2: FOR com passo diferente
    System.out.println("\n=== FOR (números pares de 0 a 10) ===");
    for (int i = 0; i <= 10; i = i + 2) {
      System.out.println(i);
    }
    
    // EXEMPLO 3: WHILE - quando não sabe QUANTAS vezes
    System.out.println("\n=== WHILE (1 a 3) ===");
    int contador = 1;
    while (contador <= 3) {
      System.out.println(contador);
      contador++;
    }
    
    // EXEMPLO 4: DO-WHILE - executa PELO MENOS 1 vez
    System.out.println("\n=== DO-WHILE ===");
    int x = 1;
    do {
      System.out.println("Iteração " + x);
      x++;
    } while (x <= 3);
    
    // EXEMPLO 5: BREAK (sair do loop)
    System.out.println("\n=== FOR com BREAK ===");
    for (int i = 1; i <= 10; i++) {
      if (i == 5) break;  // Sai quando chegar em 5
      System.out.println(i);
    }
    
    // EXEMPLO 6: CONTINUE (pular iteração)
    System.out.println("\n=== FOR com CONTINUE ===");
    for (int i = 1; i <= 5; i++) {
      if (i == 3) continue;  // Pula o 3
      System.out.println(i);
    }
  }
}

/*
ESTRUTURA DO FOR:
for (inicialização; condição; incremento) {
  // código que se repete
}

EXEMPLO:
for (int i = 1; i <= 5; i++) {
  System.out.println(i);
}

- int i = 1     → Começa em 1
- i <= 5        → Enquanto for menor ou igual a 5
- i++           → Incrementa i em 1 a cada volta
- i += 2        → Incrementa 2 em 2
- i--           → Decrementa

DIFERENÇAS:
FOR         → Use quando sabe quantas vezes
WHILE       → Use quando não sabe quantas vezes
DO-WHILE    → Use quando precisa executar PELO MENOS 1 vez

BREAK vs CONTINUE:
break       → SAIR do loop completamente
continue    → PULAR para próxima iteração

RESULTADO ESPERADO:
=== FOR (1 a 5) ===
1
2
3
4
5

=== FOR (números pares de 0 a 10) ===
0
2
4
6
8
10

=== WHILE (1 a 3) ===
1
2
3

=== DO-WHILE ===
Iteração 1
Iteração 2
Iteração 3

=== FOR com BREAK ===
1
2
3
4

=== FOR com CONTINUE ===
1
2
4
5
*/

// TRY IT: Crie um loop que imprime uma tabuada!
