function convertArray(HashTable) {
    const newArray = HashTable.table.flat().filter(item => item !== null);
    return newArray;
  }

export function productosCoincidentes (event, HashTable, container) {
    const currentArray = convertArray(HashTable);
    let indexFounded = 0;
    container.innerHTML = '';
    let input = event.target.value.trim();
    
    if (input === "") {
        container.innerHTML = "";
        return; // Salir de la función
      }
    
    const cleanedInput = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let regularExpresion = new RegExp(cleanedInput, "i");
      const matchArray = currentArray.filter(product => regularExpresion.test(product.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
      const templateMatchPorducts = matchArray.map(item => `
      <li>
        <span>${item.nombre}</span>
        <span>${item.proveedor}</span>
        <span>${item.identificator}</span>
        <span>
          <button class="modify">Modificar</button>
          <button class="borrar">Borrar</button>
        </span>
      </li>`).join('');
      container.innerHTML = templateMatchPorducts;
    
      // Escucha de eventos que permite discernir entre el boton de borrar y el boton de modificar
      container.addEventListener('click', event => {
        event.stopPropagation();
        const liElement = event.target.closest('li');
        const buttonElement = event.target.closest('button');

        if (buttonElement.classList.contains('borrar')) {
          const activeDelete = true;
          localStorage.setItem('flagDelete', JSON.stringify(activeDelete));
          location.reload();
        } else if (buttonElement.classList.contains('modify')) {
          const activeChange =  true;
          localStorage.setItem('flagChangeProduct', JSON.stringify(activeChange));
          location.href = 'Cambio.html';
        }
        indexFounded = liElement.querySelectorAll('span')[2].textContent;
        localStorage.setItem('flagID', JSON.stringify(+indexFounded));
      });

}