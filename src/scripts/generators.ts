// Los generadores son funciones de las que se puede salir y volver a entrar.
// Su contexto (asociación de variables) será conservado entre las reentradas.
// Cada vez que llamamos next, la ejecución del generador va a continuar hasta el proximo yield
function* simpleGenerator() {
  console.log('GENERATOR START');
  yield 1;
  yield 2;
  yield 3;
  console.log('GENERATOR END');
}

const gen = simpleGenerator();
console.group('Ejercicio 1');
gen.next();
gen.next();
gen.next();
console.groupEnd();

// Podemos hacer generadores infinitos.
function* idMaker() {
  let id = 1;
  while (true) {
    yield id;
    id = id + 1;
  }
}
const maker = idMaker();
console.group('idMaker');
for (let index = 0; index < 10; index++) {
  console.log(maker.next());
}
console.groupEnd();

// Cuando llamamos next también podemos pasar valores que la función recibe.
function* idMakerWithReset() {
  let id = 1;
  let reset: boolean;
  while (true) {
    reset = yield id;
    if (reset) {
      id = 1;
    } else {
      id = id + 1;
    }
  }
}
const makerReset = idMakerWithReset();
console.group('idMakerReset');
for (let index = 0; index < 10; index++) {
  const current = makerReset.next();
  console.log(current);
  if (current.value === 8) makerReset.next(true);
}
console.groupEnd();

// Ahora hagamos un ejemplo un poco más complejo: la secuencia fibonacci
function* fibonacci() {
  let a = 1;
  let b = 1;
  while (true) {
    const nextNumber = a + b;
    a = b;
    b = nextNumber;
    yield nextNumber;
  }
}

const fibb = fibonacci();

console.group('fibonacci');
for (let index = 0; index < 10; index++) {
  console.log(fibb.next());
}
console.groupEnd();

export {};

// Ejercicio:
// Crea una función generator que pagine una lista dependiendo de los parámetros
// guardados. Cada llamada a Next devolverá un chunk de esta misma. Ejm:
// list = [1,2,3,4,5]
// page = paginate(list, 3)
// page.next() ---> [1,2,3]
