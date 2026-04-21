// Passo 8: Orientação a Objetos (OOP)
// Como criar seus próprios TIPOS de dados (Classes)

// Classe 1: Pessoa básica
class Pessoa {
  String nome;
  int idade;
  
  // Construtor
  Pessoa(String nome, int idade) {
    this.nome = nome;
    this.idade = idade;
  }
  
  // Método
  void apresentar() {
    System.out.println("Olá, sou " + nome + " e tenho " + idade + " anos!");
  }
  
  String getMaiorDeIdade() {
    if (idade >= 18) {
      return "Maior de idade";
    } else {
      return "Menor de idade";
    }
  }
}

// Classe 2: Animal (herança)
class Animal {
  String nome;
  int idade;
  
  Animal(String nome, int idade) {
    this.nome = nome;
    this.idade = idade;
  }
  
  void fazerSom() {
    System.out.println(nome + " faz um som...");
  }
}

// Classe 3: Cachorro HERDA de Animal
class Cachorro extends Animal {
  Cachorro(String nome, int idade) {
    super(nome, idade);  // Chama construtor da classe pai
  }
  
  // Sobrescrita (Override) - muda o método da classe pai
  void fazerSom() {
    System.out.println(nome + " faz AUF AUF!");
  }
  
  void trazer() {
    System.out.println(nome + " vai trazer a bolinha!");
  }
}

// Classe 4: Gato HERDA de Animal
class Gato extends Animal {
  Gato(String nome, int idade) {
    super(nome, idade);
  }
  
  void fazerSom() {
    System.out.println(nome + " faz MIAU!");
  }
  
  void arranhar() {
    System.out.println(nome + " está arranhando!");
  }
}

// Classe 5: Conta Bancária (encapsulamento)
class ContaBancaria {
  private String titular;  // private = só a classe pode acessar
  private double saldo;
  
  ContaBancaria(String titular, double saldoInicial) {
    this.titular = titular;
    this.saldo = saldoInicial;
  }
  
  // Getters e Setters
  String getTitular() {
    return titular;
  }
  
  double getSaldo() {
    return saldo;
  }
  
  void depositar(double valor) {
    if (valor > 0) {
      saldo = saldo + valor;
      System.out.println("Depósito de R$" + valor + " realizado!");
    }
  }
  
  void sacar(double valor) {
    if (valor > 0 && valor <= saldo) {
      saldo = saldo - valor;
      System.out.println("Saque de R$" + valor + " realizado!");
    } else {
      System.out.println("Saque não permitido!");
    }
  }
}

public class Main {
  public static void main(String[] args) {
    // EXEMPLO 1: Criar objetos (instâncias)
    System.out.println("=== Objetos da Classe Pessoa ===");
    Pessoa pessoa1 = new Pessoa("Alice", 25);
    Pessoa pessoa2 = new Pessoa("Bob", 17);
    
    pessoa1.apresentar();
    pessoa2.apresentar();
    
    // EXEMPLO 2: Acessar atributos
    System.out.println("\n=== Acessar Atributos ===");
    System.out.println("Nome da pessoa1: " + pessoa1.nome);
    System.out.println("Idade da pessoa2: " + pessoa2.idade);
    
    // EXEMPLO 3: Chamar métodos
    System.out.println("\n=== Chamar Métodos ===");
    System.out.println("Pessoa1: " + pessoa1.getMaiorDeIdade());
    System.out.println("Pessoa2: " + pessoa2.getMaiorDeIdade());
    
    // EXEMPLO 4: Herança - Cachorro
    System.out.println("\n=== Herança: Cachorro ===");
    Cachorro rex = new Cachorro("Rex", 5);
    rex.apresentar();  // Método da classe Animal? NÃO, não existe
    rex.fazerSom();    // Som do cachorro
    rex.trazer();      // Método específico do Cachorro
    
    // EXEMPLO 5: Herança - Gato
    System.out.println("\n=== Herança: Gato ===");
    Gato mimi = new Gato("Mimi", 3);
    mimi.fazerSom();   // Som do gato
    mimi.arranhar();   // Método específico do Gato
    
    // EXEMPLO 6: Polimorfismo (muitos formatos)
    System.out.println("\n=== Polimorfismo ===");
    Animal[] animais = {rex, mimi};
    for (Animal animal : animais) {
      animal.fazerSom();  // Cada um faz seu som!
    }
    
    // EXEMPLO 7: Encapsulamento - ContaBancaria
    System.out.println("\n=== Encapsulamento: Conta Bancária ===");
    ContaBancaria conta = new ContaBancaria("Carlos", 1000.00);
    System.out.println("Titular: " + conta.getTitular());
    System.out.println("Saldo: R$" + conta.getSaldo());
    
    // EXEMPLO 8: Usar métodos de ContaBancaria
    System.out.println("\n=== Operações Bancárias ===");
    conta.depositar(500.00);
    System.out.println("Saldo: R$" + conta.getSaldo());
    
    conta.sacar(200.00);
    System.out.println("Saldo: R$" + conta.getSaldo());
    
    conta.sacar(2000.00);  // Vai dar erro
    
    // EXEMPLO 9: Múltiplos objetos
    System.out.println("\n=== Múltiplos Objetos ===");
    Pessoa[] pessoas = {pessoa1, pessoa2};
    for (int i = 0; i < pessoas.length; i++) {
      System.out.print(pessoas[i].nome + " - ");
      System.out.println(pessoas[i].getMaiorDeIdade());
    }
  }
}

/*
O QUE É UMA CLASSE?
É um "molde" para criar objetos.
Exemplo: Pessoa é uma classe, Alice e Bob são objetos.

ESTRUTURA BÁSICA:
class NomeDaClasse {
  // Atributos (variáveis)
  String nome;
  int idade;
  
  // Construtor (inicializa o objeto)
  NomeDaClasse(String nome, int idade) {
    this.nome = nome;
    this.idade = idade;
  }
  
  // Métodos (funções)
  void fazerAlgo() {
    System.out.println("Fazendo algo...");
  }
}

CRIAR OBJETO:
NomeDaClasse objeto = new NomeDaClasse("valor1", valor2);

ATRIBUTOS:
- São variáveis dentro da classe
- Cada objeto tem seus próprios atributos
- Acessar: objeto.atributo

CONSTRUTOR:
- Tem o MESMO NOME da classe
- Inicializa os atributos quando cria o objeto
- SEM tipo de retorno

HERANÇA (extends):
class Animal { }
class Cachorro extends Animal { }
- Cachorro HERDA tudo de Animal
- Pode ter métodos extras
- Pode SOBRESCREVER métodos (Override)

this:
- Refere-se ao objeto atual
- this.nome = "Alice" (atributo do objeto)
- super = classe pai

ENCAPSULAMENTO:
private  → Só a classe acessa
public   → Qualquer um acessa
- Use getters/setters para controlar acesso

POLIMORFISMO:
- Animal animal = new Cachorro();
- animal.fazerSom() → Faz som de cachorro!
- Diferentes tipos, mesmo método

RESULTADO ESPERADO:
=== Objetos da Classe Pessoa ===
Olá, sou Alice e tenho 25 anos!
Olá, sou Bob e tenho 17 anos!

=== Acessar Atributos ===
Nome da pessoa1: Alice
Idade da pessoa2: 17

=== Chamar Métodos ===
Pessoa1: Maior de idade
Pessoa2: Menor de idade

=== Herança: Cachorro ===
Rex faz AUF AUF!
Rex vai trazer a bolinha!

=== Herança: Gato ===
Mimi faz MIAU!
Mimi está arranhando!

=== Polimorfismo ===
Rex faz AUF AUF!
Mimi faz MIAU!

=== Encapsulamento: Conta Bancária ===
Titular: Carlos
Saldo: 1000.0

=== Operações Bancárias ===
Depósito de R$500.0 realizado!
Saldo: 1500.0
Saque de R$200.0 realizado!
Saldo: 1300.0
Saque não permitido!

=== Múltiplos Objetos ===
Alice - Maior de idade
Bob - Menor de idade
*/

// TRY IT: Crie uma classe "Carro" com marca, modelo e velocidade!
// Adicione um método para acelerar e frear!
