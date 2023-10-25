import { createID } from "./_id_creator.js";
import { ingressProducts } from "./_hashTable.js";

const identificadorLength = 5; 

export const autoFiller = (HashTable, numberProducts) => {
    const nombres = [
        "Bolígrafo",
        "Cuaderno",
        "Lápiz",
        "Goma de borrar",
        "Marcador",
        "Cinta adhesiva",
        "Tijeras",
        "Pegamento",
        "Regla",
        "Calculadora",
        "Libro",
        "Papel",
        "Carpetas",
        "Borrador",
        "Rotulador",
        "Notas adhesivas",
        "Perforadora",
        "Archivador",
        "Tinta",
        "Cajas de lápices"
      ];
      
      const modelos = [
        "M1",
        "M2",
        "M3",
        "M4",
        "M5",
        "M6",
        "M7",
        "M8",
        "M9",
        "M10",
        "M11",
        "M12",
        "M13",
        "M14",
        "M15",
        "M16",
        "M17",
        "M18",
        "M19",
        "M20"
      ];
      
      const precios = [
        1.99,
        2.99,
        3.99,
        4.99,
        5.99,
        6.99,
        7.99,
        8.99,
        9.99,
        10.99,
        11.99,
        12.99,
        13.99,
        14.99,
        15.99,
        16.99,
        17.99,
        18.99,
        19.99,
        20.99
      ];
      
      const cantidades = [
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        100,
        110,
        120,
        130,
        140,
        150,
        160,
        170,
        180,
        190,
        200
      ];
      
      const proveedores = [
        "Proveedor A",
        "Proveedor B",
        "Proveedor C",
        "Proveedor D",
        "Proveedor E",
        "Proveedor F",
        "Proveedor G",
        "Proveedor H",
        "Proveedor I",
        "Proveedor J",
        "Proveedor K",
        "Proveedor L",
        "Proveedor M",
        "Proveedor N",
        "Proveedor O",
        "Proveedor P",
        "Proveedor Q",
        "Proveedor R",
        "Proveedor S",
        "Proveedor T"
      ];

      const fechasISO8601 = [
        "2022-01-01",
        "2022-02-15",
        "2022-03-10",
        "2022-04-20",
        "2022-05-05",
        "2022-06-30",
        "2022-07-12",
        "2022-08-25",
        "2022-09-03",
        "2022-10-18",
        "2022-11-21",
        "2022-12-08",
        "2023-01-10",
        "2023-02-22",
        "2023-03-15",
        "2023-04-25",
        "2023-05-08",
        "2023-06-22",
        "2023-07-05",
        "2023-08-16",
        "2023-09-27",
        "2023-10-31",
        "2023-11-16",
        "2023-12-24",
        "2024-01-05"
      ];
      
      const horasMinutos = [
        "09:30",
        "10:15",
        "11:45",
        "12:20",
        "13:55",
        "14:40",
        "15:10",
        "16:25",
        "17:35",
        "18:50",
        "19:15",
        "20:40",
        "21:05",
        "22:30",
        "23:10",
        "00:45",
        "01:20",
        "02:35",
        "03:55",
        "04:25",
        "05:50",
        "06:15",
        "07:30",
        "08:55",
        "09:40"
      ];
      
  
    for (let i = 0; i < numberProducts; i++) {
      const producto = {
        nombre: nombres[Math.floor(Math.random() * nombres.length)].toUpperCase(),
        modelo: modelos[Math.floor(Math.random() * modelos.length)].toUpperCase(),
        precio: precios[Math.floor(Math.random() * precios.length)],
        cantidad_producto: cantidades[Math.floor(Math.random() * cantidades.length)],
        proveedor: proveedores[Math.floor(Math.random() * proveedores.length)].toUpperCase(),
        fecha_ingreso: fechasISO8601[Math.floor(Math.random() * fechasISO8601.length)],
        hora_ingreso: horasMinutos[Math.floor(Math.random() * horasMinutos.length)],
        identificator: createID(identificadorLength)
      };
  
      ingressProducts(HashTable, producto);
    }

    localStorage.setItem('storageNew', JSON.stringify(HashTable));
  }