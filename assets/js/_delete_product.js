import { searchProduct } from "./_hashTable.js";

// Función para borrar un producto por identificador
export function borrarProducto(event = null, identificador = null, HashTable) {
    const entradaIdentificador = identificador;
  
    if (event !== null) {
      const inputBorrar = document.getElementById('input-borrar');
      entradaIdentificador = inputBorrar.value;
    }
    event.preventDefault();
    if (entradaIdentificador) {
      searchProduct(HashTable, entradaIdentificador, 'delete');
      alert('Lote de productos borrado');
      localStorage.setItem('storageNew', JSON.stringify(storageNew));
      imprimirProductos(storageNew);
      inputBorrar.value = '';
    }
  }