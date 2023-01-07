# Curso pofesional de Javascript Platzi

¡Hola! Me alegra que estés viendo este repositorio, eso significa que estás tomando el curso de javascript profesional 
de platzi.

Este repositorio es un proyecto personal, tomé el curso y me pareció realmente útil, pero desactualizado en su setup tomando en 
cuenta que está enfocado a un ámbito profesional. Dicho eso, decidí dar un paso adelante y aquí te ofrezco el mismo curso,
con los mismos ejercicios solo que sobre una base de herramientas actualizadas que te permitirán comprender como funciona hoy
por hoy la construcción de proyectos Front End. Aquí encontrarás:

- Un proyecto construido sobre Vite, lo cual implica módulos.
- Reglas de ESLint y Prettier.
- TypeScript.
- Una estructura de git basada en tags para poder navegar entre clases y ejercicios.
- Documentación de código y buenas prácticas.

Todo esto viene de mi propia experiencia (algo así de 10 años mas o menos).

## Ponlo todo a correr

Para correr el proyecto no necesitas más que correr las siguientes lineas de comandos:

```
npm install
npm run dev
```
Y listo.

## Estructura del proyecto.

La estructura es bastante simple y directa, todo se maneja desde la carpeta `./src`, y las referencias y links se encuentran
en el root de `./index.html`.

Ésta es la estructura de archivos:

```
src/
├─ pages/
│  ├─ *.html
├─ scripts/
│  ├─ *.ts
├─ setup.ts
├─ main.ts
├─ styles.css
```

**pages/** es donde se guardará el markup de los ejercicios
**scrips/** contendrá directamente tu codigo JS ligado a su pagina correspondiente.
**setup.ts** se encarga de preparar el indice del proyecto.
**main.ts** es el entrypoint.

## Recomendaciones para trabajar con este proyecto.

Cuando entres al proyecto vas a notar que todos los ejercicios están resueltos en la rama Main, esta no es una carcaza 
vacía para empezar, así que te recomendo que uses el sistema de tags que te permitirá navegar entre clases, solo necesitas
saber un poco de git y ejecutar los siguientes comandos:

> Nota: Los tags de las clases suelen tener anotaciones, asegurate de revisar esas anotaciones para tener algún hint interesante
> o ver algún reto extra que me haya encontrado.

```
# Listar las tags
git tag
```

```
# Revisar las notas del tag
git show clase-1
```

```
# Moverte a la tag que quieras
git checkout clase-1
```