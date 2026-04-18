// Simular ambiente Java
window = {
  _javaEnv: {
    System: {
      out: {
        println: function(...args) {
          console.log(args.join(' '));
        }
      }
    },
    _output: []
  }
};

const javaCode = `
for (int i = 1; i <= 5; i++) {
  System.out.println(i);
}
`;

// Transpiler
let code = javaCode
  .replace(/for\s*\(\s*(int|double|float|long|short|byte|boolean)\s+(\w+)\s*=/g, 'for (let $2 =')
  .replace(/System\.out\./g, 'window._javaEnv.System.out.');

console.log('Código transpilado:');
console.log(code);
console.log('\nExecutando:');

try {
  eval(code);
} catch(e) {
  console.error('ERRO:', e.message);
}
