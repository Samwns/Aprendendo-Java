// Passo 4: Condicionais (IF / ELSE / SWITCH)
// Como fazer o programa tomar DECISÕES

public class Main {
  public static void main(String[] args) {
    // EXEMPLO 1: IF SIMPLES
    int idade = 20;
    
    if (idade >= 18) {
      System.out.println("Você é maior de idade");
    }
    
    // EXEMPLO 2: IF / ELSE
    if (idade >= 18) {
      System.out.println("Pode dirigir");
    } else {
      System.out.println("Muito novo para dirigir");
    }
    
    // EXEMPLO 3: IF / ELSE IF / ELSE
    int nota = 7;
    
    if (nota >= 9) {
      System.out.println("Conceito: A");
    } else if (nota >= 7) {
      System.out.println("Conceito: B");
    } else if (nota >= 5) {
      System.out.println("Conceito: C");
    } else {
      System.out.println("Conceito: F (Reprovado)");
    }
    
    // EXEMPLO 4: SWITCH (múltiplas opções)
    int diaSemana = 3;
    
    switch (diaSemana) {
      case 1:
        System.out.println("Segunda-feira");
        break;
      case 2:
        System.out.println("Terça-feira");
        break;
      case 3:
        System.out.println("Quarta-feira");
        break;
      case 4:
        System.out.println("Quinta-feira");
        break;
      case 5:
        System.out.println("Sexta-feira");
        break;
      case 6:
      case 7:
        System.out.println("Fim de semana!");
        break;
      default:
        System.out.println("Dia inválido");
    }
  }
}

/*
OPERADORES DE COMPARAÇÃO:
==  → igual
!=  → diferente
<   → menor que
>   → maior que
<=  → menor ou igual
>=  → maior ou igual

OPERADORES LÓGICOS:
&&  → E (AND)     - AMBAS verdadeiras
||  → OU (OR)     - PELO MENOS uma verdadeira
!   → NÃO (NOT)   - inverte o valor

EXEMPLOS:
if (idade >= 18 && tem_carteira) { }      // Precisa AMBAS condições
if (sabado || domingo) { }                 // Precisa DE UMA condição
if (!chovendo) { }                         // Inverte: se NÃO está chovendo

SWITCH vs IF:
- Use IF para: comparações complexas (>, <, &&, ||)
- Use SWITCH para: verificar UM valor contra VÁRIOS

RESULTADO ESPERADO:
Você é maior de idade
Pode dirigir
Conceito: B
Quarta-feira
*/

// TRY IT: Crie um programa que leia a nota e mostre o conceito!
