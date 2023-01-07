const pages = Object.keys(import.meta.glob('./pages/*.html'));
const mainElement = document.getElementById('links');

/**
 * Función que se encarga de crear una lista de nodos <a> de HTML para inyectar en el indice
 * basandose en los ejercicios que tengas definidos dentro de pages.
 */
export function setPages() {
  pages.forEach(page => {
    // Eliminamos los dos primeros caracteres
    const newPage = page.split('').splice(2).join('');
    // Creamos el path correspondiente
    const path = `/src/${newPage}`;

    // Creación de nodo de texto basado en el path
    const textNode = document.createTextNode(path);
    // Creación de nodo <a>
    const linkNode = document.createElement('a');

    // Agregar nodo de texto al link
    linkNode.appendChild(textNode);
    // Agregar atributo href al link
    linkNode.setAttribute('href', path);

    // Inyectamos el nodo en el main element.
    mainElement?.appendChild(linkNode);
  });
}
