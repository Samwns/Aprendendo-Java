# 🏗️ Orientação a Objetos (OOP)

Aprenda a criar classes e objetos em Java.

## Conceitos Básicos

- **Classe**: Definição/Planta de um objeto
- **Objeto**: Instância de uma classe
- **Atributo**: Variável da classe
- **Método**: Função da classe

## Criando uma Classe

```java
public class Pessoa {
    // Atributos
    public String nome;
    public int idade;
    public double altura;
    
    // Método construtor
    public Pessoa(String nome, int idade, double altura) {
        this.nome = nome;
        this.idade = idade;
        this.altura = altura;
    }
    
    // Método (ação)
    public void apresentar() {
        System.out.println("Olá, meu nome é " + nome);
        System.out.println("Tenho " + idade + " anos");
    }
    
    public void fazerAniversario() {
        idade++;
        System.out.println(nome + " fez aniversário! Agora tem " + idade + " anos");
    }
}
```

## Usando a Classe

```java
public class Main {
    public static void main(String[] args) {
        // Criar objetos
        Pessoa p1 = new Pessoa("João", 30, 1.80);
        Pessoa p2 = new Pessoa("Maria", 28, 1.65);
        
        // Usar métodos
        p1.apresentar();
        p2.apresentar();
        
        p1.fazerAniversario();
    }
}
```

## Encapsulamento (Getters e Setters)

```java
public class Conta {
    private double saldo;  // private: não acessível de fora
    private String titular;
    
    public Conta(String titular, double saldoInicial) {
        this.titular = titular;
        this.saldo = saldoInicial;
    }
    
    // Getter (leitura)
    public double getSaldo() {
        return saldo;
    }
    
    // Setter (escrita com validação)
    public void depositar(double valor) {
        if (valor > 0) {
            saldo += valor;
        }
    }
    
    public void sacar(double valor) {
        if (valor > 0 && valor <= saldo) {
            saldo -= valor;
        }
    }
}
```

## Herança

```java
// Classe base (superclasse)
public class Animal {
    public String nome;
    
    public Animal(String nome) {
        this.nome = nome;
    }
    
    public void fazer_som() {
        System.out.println("Som genérico");
    }
}

// Classe derivada (subclasse)
public class Cachorro extends Animal {
    public Cachorro(String nome) {
        super(nome);  // Chama construtor da classe pai
    }
    
    // Sobrescrever método
    @Override
    public void fazer_som() {
        System.out.println(nome + " faz: Au au!");
    }
}

public class Gato extends Animal {
    public Gato(String nome) {
        super(nome);
    }
    
    @Override
    public void fazer_som() {
        System.out.println(nome + " faz: Miau!");
    }
}

// Usando:
public class Main {
    public static void main(String[] args) {
        Animal cachorro = new Cachorro("Rex");
        Animal gato = new Gato("Whiskers");
        
        cachorro.fazer_som();  // Rex faz: Au au!
        gato.fazer_som();      // Whiskers faz: Miau!
    }
}
```

## 🎯 Exercício 1 - Classe Carro

Crie uma classe Carro com:
- Atributos: marca, modelo, ano, velocidade
- Métodos: acelerar(), frenar(), info()

### Solução
```java
public class Carro {
    private String marca;
    private String modelo;
    private int ano;
    private int velocidade;
    
    public Carro(String marca, String modelo, int ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.velocidade = 0;
    }
    
    public void acelerar(int incremento) {
        velocidade += incremento;
        System.out.println("Velocidade: " + velocidade + " km/h");
    }
    
    public void frenar(int decremento) {
        velocidade -= decremento;
        if (velocidade < 0) velocidade = 0;
        System.out.println("Velocidade: " + velocidade + " km/h");
    }
    
    public void info() {
        System.out.println(marca + " " + modelo + " (" + ano + ")");
        System.out.println("Velocidade atual: " + velocidade + " km/h");
    }
    
    public static void main(String[] args) {
        Carro carro = new Carro("Toyota", "Corolla", 2023);
        carro.info();
        carro.acelerar(50);
        carro.acelerar(30);
        carro.frenar(20);
    }
}
```

## 🎯 Exercício 2 - Classe Livro

Crie uma classe Livro com:
- Atributos: título, autor, ano, páginas
- Métodos: info(), ehAntigo(), lerPagina(n)

### Solução
```java
public class Livro {
    private String titulo;
    private String autor;
    private int ano;
    private int paginas;
    
    public Livro(String titulo, String autor, int ano, int paginas) {
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
        this.paginas = paginas;
    }
    
    public void info() {
        System.out.println("Título: " + titulo);
        System.out.println("Autor: " + autor);
        System.out.println("Ano: " + ano);
        System.out.println("Páginas: " + paginas);
    }
    
    public boolean ehAntigo() {
        return (2026 - ano) > 20;
    }
    
    public void lerPagina(int numPaginas) {
        if (numPaginas > 0 && numPaginas <= paginas) {
            System.out.println("Lendo página " + numPaginas);
        }
    }
    
    public static void main(String[] args) {
        Livro livro = new Livro("1984", "George Orwell", 1949, 328);
        livro.info();
        System.out.println("É antigo? " + livro.ehAntigo());
        livro.lerPagina(50);
    }
}
```
