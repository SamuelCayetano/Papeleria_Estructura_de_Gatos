'use strict';

import { HashTable, ingressProducts, searchProduct } from "./_hashTable.js";
import { createID } from "./_id_creator.js";
import { productosCoincidentes } from "./_search_bar.js";
import { bubbleSort } from "./_sorting.js";


// Variables control 
let storageNew = JSON.parse(localStorage.getItem('storageNew')) ?? new HashTable();
// autoFiller(storageNew, 45);
const identificadorLength = 5;
const viewId = document.getElementById('mostrar_identificador');
const formProductos = document.getElementById("form-productos");
const mostrarProductos = document.getElementById('tabla-productos');
const ordenarAlpha = document.getElementById('ordenar_alpha');
const ordenarFecha = document.getElementById('ordenar_fecha');
const ordenarStock = document.getElementById('ordenar_stock'); 
const activarZonaBorrar = document.getElementById('activar-zona-borrar');
const desactivarZonaBorrar = document.getElementById('desactivar-zona-borrar');
const buscador = document.getElementById('input-producto');
const mostrarCoincidentes = document.getElementById('show-coincidences');
const formModify =  document.getElementById('modify-products-content');

let identificator = 0;
let flagID = JSON.parse(localStorage.getItem('flagID')) ?? null;
let flagDelete = JSON.parse(localStorage.getItem('flagDelete')) ?? false;
let flagChangeProduct = JSON.parse(localStorage.getItem('flagChangeProduct')) ?? false;

/* 
    Verificar funciones principales dependiendo del documento HTML disponible
    **Algunos elementos y funciones no estan disponibles en todo el documento.
*/
if (viewId) {
  // Asignar el primer valor para el identificador de la captura
  identificator = createAndShowID();
}
if (formProductos) {
  // Obtener el formulario de captura de productos y agregar un listener para el evento submit
  formProductos.addEventListener("submit", agregarProducto);
}
if (mostrarProductos) {
  // Renderizar los productos disponibles en el almacenamiento local
  imprimirProductos(storageNew);
//  ----------------------------
const agregarZona = document.getElementById('adding-area');
  activarZonaBorrar.addEventListener('click', () => {
    zonaFlotante(agregarZona);
  });
  desactivarZonaBorrar.addEventListener('click', () => {
    desactivarFlotante(agregarZona);
  });

  // -----------------------------------------
  // Activiador de la funcion de borrar producto
  const formBorrarProducto = document.getElementById('borrar-producto');
  formBorrarProducto.addEventListener('submit', (event) => {
    borrarProducto(event);
  });
}
if (ordenarAlpha) {
  // Estos son los metodos de ordenamiento para los botones 
  ordenarAlpha.addEventListener('click', () => {
    metodoOrdenamiento(storageNew, 1);
  });
  ordenarFecha.addEventListener('click', () => {
    metodoOrdenamiento(storageNew, 2);
  });
  ordenarStock.addEventListener('click', () => {
    metodoOrdenamiento(storageNew, 3);
  });
}

if (buscador) {
  buscador.addEventListener('keyup', (event) => {
    productosCoincidentes(event, storageNew, mostrarCoincidentes);
  });
  

  if (flagDelete) {
    borrarProducto(null, flagID);
  }
}

if (formModify) {
  if(flagID !== 0) { initChangeForm(flagID); }
  formModify.addEventListener('submit', (event) => {
    modifyProducts(event, flagID);
  });
}

// Funcion para asignar y mostrar el identificador en pantalla
function createAndShowID() {
  const generator = createID(identificadorLength);
  viewId.textContent = generator;
  return generator;
}

// Fuencion para determinar el espacio actual del array
function determinateStorage(Object) {
  const arrayOnly = Object.table.flat().filter(item => item !== null);
  const usageStore = arrayOnly.length;
  return usageStore;
}

// Función para capturar productos desde el formulario
function agregarProducto(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value.toUpperCase();
  const modelo = document.getElementById("modelo").value.toUpperCase();
  const precio = parseFloat(document.getElementById("precio").value);
  const cantidad_producto = parseInt(document.getElementById("cantidad_producto").value);
  const proveedor = document.getElementById("proveedor").value.toUpperCase();
  const fechaActual = new Date();
  const fecha_ingreso = obtenerFechaHora(fechaActual, 1);
  const hora_ingreso = obtenerFechaHora(fechaActual, 0);

  const producto = { nombre, modelo, precio, cantidad_producto, proveedor, fecha_ingreso, hora_ingreso, identificator };
  console.log(determinateStorage(storageNew));
  if (determinateStorage(storageNew) < 50) {
  ingressProducts(storageNew, producto);
    localStorage.setItem('storageNew', JSON.stringify(storageNew));
    alert("Producto agregado exitosamente.");
    document.getElementById("nombre").value = '';
    document.getElementById("modelo").value = '';
    document.getElementById("precio").value = '';
    document.getElementById("cantidad_producto").value = '';
    document.getElementById("proveedor").value = '';
    identificator = createAndShowID();
  } else {
    alert('Ha sobrepasado el limite de lotes disponible');
  }
}

// Funcion para obtener la fecha actual y congelarla
// @toma una objeto fecha
// @toma un parametro numerico de eleccion 1=fecha y 0=hora
function obtenerFechaHora(currentDate, select) {
  let fechaCompleta = '';
  let horaCompleta = '';
  switch (select) {
    case 1:
      const anio = currentDate.getFullYear();
      const mes = currentDate.getMonth().toString().padStart(2, '0');
      const dia = currentDate.getDate().toString().padStart(2, '0');
      fechaCompleta = `${anio}-${mes}-${dia}`;
      return fechaCompleta;
    case 0:
      const hora = currentDate.getHours().toString().padStart(2, '0');
      const minutos = currentDate.getMinutes().toString().padStart(2, '0');
      horaCompleta = `${hora}:${minutos}`;
      return horaCompleta;
    default: 
      console.error('Parametro no aceptado');
      break;
  }
}

// Función para imprimir la lista de productos
function imprimirProductos(HashTable) {
  const currentArray = (HashTable.table) ? convertArray(HashTable) : HashTable;
  const tableTemplate = currentArray.map(item => 
    `<tr>
      <td>${item.nombre}</td>
      <td>${item.modelo}</td>
      <td>${item.precio}</td>
      <td>${item.cantidad_producto}</td>
      <td>${item.proveedor}</td>
      <td>${item.fecha_ingreso}</td>
      <td>${item.hora_ingreso}</td>
      <td>${item.identificator}</td>
    </tr>`
  ).join('');
  mostrarProductos.innerHTML = tableTemplate;
}

// Funcion para convertir la Hash table en un array de elementos validos
function convertArray(HashTable) {
  const newArray = HashTable.table.flat().filter(item => item !== null);
  return newArray;
}

// Funciones para ordenar las lista de productos
function metodoOrdenamiento(HashTable, typeConversion) {
  let currentArray = convertArray(HashTable);
  switch (typeConversion) {
    case 1:
      currentArray = bubbleSort(currentArray, 'nombre');
      break;
    case 2:
      currentArray = bubbleSort(currentArray, 'fecha_ingreso');
      break;
    case 3:
      currentArray = bubbleSort(currentArray, 'cantidad_producto');
      break;
    default:
      console.error('Parametro no aceptado');
      break;
  }
  imprimirProductos(currentArray);
}

//Funcion para activar el area del formulario para borrar
function zonaFlotante(agregarZona) {
  agregarZona.style.display = 'block';
}

// Funcion para desactivar el area de formulario
function desactivarFlotante(agregarZona) {
  agregarZona.style.display = 'none';
}

// Función para borrar un producto por identificador
function borrarProducto(event = null, identificador = null) {
  debugger
  const inputBorrar = document.getElementById('input-borrar');
  let entradaIdentificador = identificador;

  if (event) {
    event.preventDefault();
    entradaIdentificador = inputBorrar.value;
  }
  if (entradaIdentificador) {
    searchProduct(storageNew, entradaIdentificador, 'delete');
    alert('Lote de productos actualizado');
    localStorage.setItem('storageNew', JSON.stringify(storageNew));
    imprimirProductos(storageNew);
    if (event) {inputBorrar.value = '';}
  }

  // Reiniciar las banderas de operacion
  flagDelete = false;
  localStorage.setItem('flagDelete', JSON.stringify(flagDelete));
  flagID = 0;
  localStorage.setItem('flagID', JSON.stringify(flagID));
}

function initChangeForm (identificador) {
  const currentProduct = searchProduct(storageNew, identificador);
  const nombre = document.getElementById("nombre-change");
  const modelo = document.getElementById("modelo-change");
  const precio = document.getElementById("precio-change");
  const cantidad_producto = document.getElementById("cantidad_producto-change");
  const proveedor = document.getElementById("proveedor-change");
  const ide = document.getElementById('mostrar_identificador-change');

  // Rellenar los campos con la info del producto por defecto
  nombre.value = currentProduct.nombre;
  modelo.value = currentProduct.modelo;
  precio.value = parseFloat(currentProduct.precio);
  cantidad_producto.value = currentProduct.cantidad_producto;
  proveedor.value = currentProduct.proveedor;
  ide.textContent = currentProduct.identificator;
}

function modifyProducts (event, identificador) {
  event.preventDefault;
  const currentProduct = searchProduct(storageNew, identificador);
  const nombre = document.getElementById("nombre-change").value.toUpperCase();;
  const modelo = document.getElementById("modelo-change").value.toUpperCase();;
  const precio = parseFloat(document.getElementById("precio-change").value);
  const cantidad_producto = parseInt(document.getElementById("cantidad_producto-change").value);
  const proveedor = document.getElementById("proveedor-change").value;
  const fecha_ingreso = currentProduct.fecha_ingreso;
  const hora_ingreso = currentProduct.hora_ingreso;
  const identificator = parseInt(document.getElementById('mostrar_identificador-change').textContent);

  const producto = { 
    nombre, 
    modelo, 
    precio, 
    cantidad_producto, 
    proveedor, 
    fecha_ingreso, 
    hora_ingreso, 
    identificator 
  };

  //Borrar producto anterior

  borrarProducto(null, flagID);

  //Reemplazar con el nuevo producto
  
  ingressProducts(storageNew, producto);

  // Rellenar nuevamente los campos con la info actual
  initChangeForm(identificador);

  // Reiniciar las banderas de operacion
  flagChangeProduct = false;
  localStorage.setItem('flagChangeProduct', JSON.stringify(flagChangeProduct));
}
