// Passo 7: Funções/Métodos
// Como REUTILIZAR código criando seus próprios comandos

public class Funcoes {
  // Função 1: Sem parâmetros, sem retorno
  static void saudacao() {
    System.out.println("Olá, bem-vindo!");
  }
  
  // Função 2: Com parâmetros
  static void saudacaoPersonalizada(String nome) {
    System.out.println("Olá, " + nome + "!");
  }
  
  // Função 3: Com RETORNO
  static int somar(int a, int b) {
    int resultado = a + b;
    return resultado;
  }
  
  // Função 4: Com múltiplos parâmetros e retorno
  static double calcularMedia(double nota1, double nota2, double nota3) {
    double media = (nota1 + nota2 + nota3) / 3.0;
    return media;
  }
  
  // Função 5: Verificar se é maior de idade
  static boolean ehMaiorDeIdade(int idade) {
    if (idade >= 18) {
      return true;
    } else {
      return false;
    }
  }
  
  // Função 6: Com loop interno
  static void imprimirTabuada(int numero) {
    System.out.println("Tabuada do " + numero + ":");
    for (int i = 1; i <= 10; i++) {
      int resultado = numero * i;
      System.out.println(numero + " x " + i + " = " + resultado);
    }
  }
  
  // Função 7: OVERLOADING (mesmo nome, parâmetros diferentes)
  static int multiplicar(int a, int b) {
    return a * b;
  }
  
  static double multiplicar(double a, double b) {
    return a * b;
  }
  
  static String multiplicar(String texto, int vezes) {
    String resultado = "";
    for (int i = 0; i < vezes; i++) {
      resultado = resultado + texto;
    }
    return resultado;
  }
  
  // MAIN - Função principal (sempre executada)
  public static void main(String[] args) {
    // EXEMPLO 1: Chamar função simples
    System.out.println("=== Função Simples ===");
    saudacao();
    
    // EXEMPLO 2: Função com parâmetro
    System.out.println("\n=== Função com Parâmetro ===");
    saudacaoPersonalizada("Maria");
    saudacaoPersonalizada("João");
    
    // EXEMPLO 3: Função com retorno
    System.out.println("\n=== Função com Retorno ===");
    int resultado = somar(5, 3);
    System.out.println("5 + 3 = " + resultado);
    
    // EXEMPLO 4: Usar retorno diretamente
    System.out.println("\n=== Retorno Direto ===");
    System.out.println("10 + 20 = " + somar(10, 20));
    
    // EXEMPLO 5: Múltiplos parâmetros
    System.out.println("\n=== Calcular Média ===");
    double media = calcularMedia(8.0, 9.5, 7.5);
    System.out.println("Média: " + media);
    
    // EXEMPLO 6: Retorno boolean
    System.out.println("\n=== Verificar Idade ===");
    if (ehMaiorDeIdade(20)) {
      System.out.println("Você é maior de idade!");
    }
    if (!ehMaiorDeIdade(15)) {
      System.out.println("Você é menor de idade!");
    }
    
    // EXEMPLO 7: Função com loop
    System.out.println("\n=== Tabuada ===");
    imprimirTabuada(7);
    
    // EXEMPLO 8: OVERLOADING (sobrecarga)
    System.out.println("\n=== Overloading (Multiplicar) ===");
    System.out.println("3 x 4 = " + multiplicar(3, 4));  // int
    System.out.println("2.5 x 3.0 = " + multiplicar(2.5, 3.0));  // double
    System.out.println("Repetir: " + multiplicar("Ha", 3));  // String
  }
}

/*
ESTRUTURA DE FUNÇÃO:

static TIPO_RETORNO nomeFuncao(PARÂMETRO1, PARÂMETRO2) {
  // código da função
  return VALOR;  // se não for void
}

EXEMPLOS:

1. Sem parâmetros, sem retorno:
   static void saudacao() {
     System.out.println("Olá!");
   }
   Uso: saudacao();

2. Com parâmetros, sem retorno:
   static void cumprimento(String nome) {
     System.out.println("Olá, " + nome);
   }
   Uso: cumprimento("Alice");

3. Sem parâmetros, COM retorno:
   static int numeroAleatorio() {
     return 42;
   }
   Uso: int x = numeroAleatorio();

4. COM parâmetros E retorno:
   static int somar(int a, int b) {
     return a + b;
   }
   Uso: int total = somar(5, 3);

5. Múltiplos parâmetros:
   static double calcularMedia(double a, double b, double c) {
     return (a + b + c) / 3.0;
   }
   Uso: calcularMedia(8, 9, 10);

TIPOS DE RETORNO:
- void      → Não retorna nada
- int       → Retorna inteiro
- double    → Retorna decimal
- String    → Retorna texto
- boolean   → Retorna true/false

OVERLOADING (Sobrecarga):
Mesma função, parâmetros diferentes:
  static int somar(int a, int b) { return a + b; }
  static double somar(double a, double b) { return a + b; }

Resultado: 
- somar(5, 3) usa a primeira
- somar(5.5, 2.2) usa a segunda

RESULTADO ESPERADO:
=== Função Simples ===
Olá, bem-vindo!

=== Função com Parâmetro ===
Olá, Maria!
Olá, João!

=== Função com Retorno ===
5 + 3 = 8

=== Retorno Direto ===
10 + 20 = 30

=== Calcular Média ===
Média: 8.333333333333334

=== Verificar Idade ===
Você é maior de idade!
Você é menor de idade!

=== Tabuada ===
Tabuada do 7:
7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70

=== Overloading (Multiplicar) ===
3 x 4 = 12
2.5 x 3.0 = 7.5
Repetir: HaHaHa
*/

// TRY IT: Crie uma função que calcula o FATORIAL de um número!
// Exemplo: fatorial(5) = 5 x 4 x 3 x 2 x 1 = 120
