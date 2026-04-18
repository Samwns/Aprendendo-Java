// Teste simples do transpiler
const javaCode = `
public class Main {
  public static void main(String[] args) {
    for (int i = 1; i <= 5; i++) {
      System.out.println(i);
    }
  }
}
`;

// Simular o transpiler
let code = javaCode
  .replace(/import\s+[^;]+;/g, '')
  .replace(/public\s+class\s+\w+\s*\{/, '')
  .replace(/public\s+static\s+void\s+main\s*\([^)]*\)\s*\{/, '')
  .replace(/\}\s*\}\s*$/, '');

console.log('PASSO 1 - Após remoções básicas:');
console.log(code);
console.log('\n---\n');

// FOR loop - antes
console.log('PASSO 2A - Transformação FOR (ANTES):');
code = code.replace(/for\s*\(\s*(int|double|float|long|short|byte|boolean)\s+(\w+)\s*=/g, 'for (let $2 =');
console.log(code);
console.log('\n---\n');

// Tipos primitivos
console.log('PASSO 2B - Transformação tipos:');
code = code.replace(/\b(int|double|float|long|short|byte|boolean)\s+(\w+)\s*;/g, 'let $2;');
code = code.replace(/\b(int|double|float|long|short|byte|boolean)\s+(\w+)\s*=/g, 'let $2 =');
console.log(code);
console.log('\n---\n');

// System.out
console.log('PASSO 3 - Transformação System.out:');
code = code.replace(/System\.out\./g, 'console.');
console.log(code);
console.log('\n---\n');

console.log('RESULTADO FINAL:');
console.log(code);
