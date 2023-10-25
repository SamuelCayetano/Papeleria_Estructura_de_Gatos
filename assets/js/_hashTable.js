/*
    Clase dedicada a la creación de una emulación de una tabla hash. 
    El atributo principal consta de un array con un meximo establecido predeterminado por
    @MAX_DEFAULT_CAPACITY el uso de MAX_AVERAGE_CAPACITY nos sirve para 
    mantener a raya el limite promedio establecido por la actividad de "50" espacios.

    ///ACTUALIZACIÓN 
    **Los métodos fueron cambiados por funciones que funcionan por fuera del Objeto y solo lo manipulan**
    FUNCIÓN: "ingressProducts" el cual es capaz de asignar a determinado indice
    un producto, incluye igualmente un condicional para manejar colisiones.
    FUNCIÓN: "searchProduct" es una función que apunta directamente al índice del producto existente en la tabla.
*/
export class HashTable {
    constructor() {
        this.MAX_DEFAULT_CAPACITY = 100;
        this.MAX_AVERAGE_CAPACITY = 50;
        this.table = new Array(this.MAX_DEFAULT_CAPACITY);
    }
}

export const ingressProducts = (HashTable, Object) => {
    const indexAssignament = Object.identificator % HashTable.MAX_AVERAGE_CAPACITY;
    if (HashTable.table[indexAssignament] === undefined || HashTable.table[indexAssignament] === null) {
        HashTable.table[indexAssignament] = [];
        HashTable.table[indexAssignament].push(Object);
    } else {
        console.info(`caught collision, in ${indexAssignament} index`);
        HashTable.table[indexAssignament].push(Object);
    }
}

export const searchProduct = (HashTable, key, deleteOption = null) => {
    const indexAssignament = key % HashTable.MAX_AVERAGE_CAPACITY;
    if (HashTable.table[indexAssignament] === undefined) {
        console.error('item no encontrado');
        return undefined;
    }
    return inCollide(HashTable.table[indexAssignament], key, deleteOption);
}

// Método de subbusqueda simple; ACTUALIZAR!!!
const inCollide = (Object, key, deleteOption = null) => {
    for (let item of Object) {
        if (item.identificator === +key) {
            console.trace('Item Found');
            while(deleteOption) {
                const index = Object.indexOf(item);
                Object.splice(index, 1);
                return;
            }
            return item;
        }
    }
    console.error('non-existent');
    return undefined;
}

const deleteProduct = (HashTable, key) => {
   searchProduct(HashTable, key, 'delete');
}