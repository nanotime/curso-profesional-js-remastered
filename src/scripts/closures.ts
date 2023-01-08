/**
 * Closure
 *
 * Fuinción definida internamente dentro de otra con acceso al scope del padre,
 * incluso después de que este ejecute un return.
 */

/**
 * IIFE (Inmediatly Invoked Function Expression)
 *
 * Es un tipo de función que sirve para encapsular los scopes, se utilizaba para crear módulos
 * aislados. A partir de ES6 los IIFFE entraron en desuso gracias a los block scopes.
 */

// (function() {
//   let color = 'green';
//   function printColor() {
//     console.log(color);
//   }
//   printColor();
// })();

/**
 * Funciones que regresan funciones
 *
 * En este caso el ejemplo comentado demuestra como una función puede recordar los valores
 * en memoria guardados por su padre al crear una referencia.
 */

export function makeColorPrinter(color: string) {
  const colorMessage = `The color is ${color}`;

  return function () {
    console.log(colorMessage);
  };
}

const greenColorPrinter = makeColorPrinter('green');
console.log(greenColorPrinter());

/**
 * Variables "privadas"
 *
 * Nota: hace tiempo en JS no existía forma real de crear variables privadas,
 * pero desde hace algunas versiones si (solo en clases):
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
 *
 * En normalmente no puedes crear variables privadas de forma nativa con alguna palabra reservada
 * pero puedes aprovecharte de los closures para crear este tipo de comportamiento.
 *
 * Observa el ejemplo #1 y fijate como puedes modificar el valor interno de un objeto siempre que esté al alcance.
 *
 * En el ejemplo #2 se hace uso de los closures para "privatizar" una variable haciendo que ésta no esté
 * expuesta en el valor de retorno, sino que solo pueda ser accedida vía funciones internas.
 */

// Ejemplo #1
// const counter = {
//   count: 3,
// };
// console.log(counter.count); -> 3
// counter.count = 99;
// console.log(counter.count); -> 99

// Ejemplo #2, ejecutado en DOM
type makeCounterShape = {
  increase: () => void;
  decrease: () => void;
  getCount: () => number;
};
export function makeCounter(n: number): makeCounterShape {
  let count = n;

  return {
    increase() {
      count = count + 1;
    },
    decrease() {
      count = count - 1;
    },
    getCount() {
      return count;
    },
  };
}

const counter = makeCounter(0);
// Nota: en las siguientes constantes se está usando "as" como operador de TS
// para determinar directamente el elemento retornado en el query selector, prueba
// con quitar el operador de alguno de ellos y observa que tipo de error te envía.
const countNode = document.querySelector('#count') as HTMLSpanElement;
const increaseBtn = document.querySelector('#increase') as HTMLButtonElement;
const decreaseBtn = document.querySelector('#decrease') as HTMLButtonElement;

countNode.innerText = counter.getCount().toString();

increaseBtn.addEventListener('click', () => increaseOrDecrease(true));
decreaseBtn.addEventListener('click', () => increaseOrDecrease(false));

function increaseOrDecrease(condition: boolean) {
  if (condition) {
    counter.increase();
    return (countNode.innerText = counter.getCount().toString());
  }

  counter.decrease();
  return (countNode.innerText = counter.getCount().toString());
}
