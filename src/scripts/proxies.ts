import levenshtein from 'fast-levenshtein';
// Proxy es parecido a getters y setters
// Usa un concepto que se llama traps: son interceptores de llamadas. A diferencia de getters, no opera sobre una propieda, si no sobre un objeto.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#Methods_of_the_handler_object

// Creemos un ejemplo donde interceptamos llamadas para leer una propiedad
// Si la propiedad existe, la regresamos
// Si no existe, entonces sugerimos una que pueda funcionar

// Para eso eso vamos a usar un algoritmo que se llama levenshtein. (window.Levenshtein.get)
// Ejemplos de levenshtein distance (usa window.Levenshtein)

type Target = {
  red: string;
  green: string;
  blue: string;
};

const target = {
  red: 'Rojo',
  green: 'Verde',
  blue: 'Azul',
};

const handler: ProxyHandler<Target> = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop as keyof Target];
    }

    const suggestion = Object.keys(obj).find(key => {
      return levenshtein.get(key, prop as string) <= 3;
    });

    if (suggestion) {
      console.log(
        `${String(prop)} no se encontró. Quisiste decir ${suggestion}?`
      );
    }

    return obj[prop as keyof Target];
  },
};

export const p = new Proxy(target, handler);
console.group('Proxies test');
console.log('Red', p.red);
console.log('Reeed', p.reeed);
console.groupEnd();
