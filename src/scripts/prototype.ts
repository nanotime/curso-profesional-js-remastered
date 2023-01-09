// Un objeto común y corriente
// const zelda = {
//   name: 'Zelda',
// };

// zelda.saludar = function() {
//   console.log(`Hola soy ${this.name}`);
// };

// zelda.saludar();

// const link = {
//   name: 'Link',
// };

// link.saludar = function() {
//   console.log(`Hola soy ${this.name}`);
// };

// link.saludar();

// Seamos un poco más eficientes
// function Hero(name) {
//   const hero = {
//     name: name,
//   };

//   hero.saludar = function() {
//     console.log(`Hola soy ${this.name}`);
//   };

//   return hero;
// }
// const zelda = Hero('Zelda');
// zelda.saludar();

// const link = Hero('Link');
// link.saludar();

// Aun podemos mejorar más y evitar tener que crear la misma función cada vez
// const heroMethods = {
//   saludar: function() {
//     console.log(`Me llamo ${this.name}`);
//   },
// };

// function Hero(name) {
//   const hero = {
//     name: name,
//   };
//   hero.saludar = heroMethods.saludar;
//   return hero;
// }

// const zelda = Hero('Zelda');
// zelda.saludar();

// const link = Hero('Link');
// link.saludar();

// Object.create
// const nuevoObjeto = Object.create(objeto)
// const heroMethods = {
//   saludar: function() {
//     console.log(`Soy superheroe! ${this.name}`);
//   },
// };

// function Hero(name) {
//   const hero = Object.create(heroMethods);
//   hero.name = name;

//   return hero;
// }

// const zelda = Hero('Zelda');
// zelda.saludar();

// const link = Hero('Link');
// link.saludar();

// Los métodos de hero dentro de Hero
// const heroMethods = {
//   saludar: function() {
//     console.log(`Soy superheroe! ${this.name}`);
//   },
// };

// function Hero(name) {
//   const hero = Object.create(Hero.prototype);
//   hero.name = name;

//   return hero;
// }

// Hero.prototype.saludar = function() {
//   console.log(`Soy superheroina! ${this.name}`);
// };

// const zelda = Hero('Zelda');
// zelda.saludar();

// const link = Hero('Link');
// link.saludar();

// new es un atajo (azucar sintactica) para llevar Hero.prototype al objeto que estamos creando
function Hero(this: any, name: string) {
  // this = Object.create(Hero.prototype);
  this.name = name;
  // return this;
}

Hero.prototype.saludar = function () {
  console.log(`New: ${this.name}`);
};

const zelda = new Hero('Zelda');
zelda.saludar();

const link = new Hero('Link');
link.saludar();
