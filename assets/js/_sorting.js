/*
Funcion que ejecuta la funcion de ordenamiento
pera impresion del producto, la siguiente funcion acepta
@parameter = variable del tipo de dato que se ordenara
*/
export const bubbleSort = (inputArray, parameter) => {
    let auxiliarVar = '';

    for(let i = 0; i < inputArray.length; i++) {
        for (let j = 0; j < inputArray.length - 1; j++) {
            if (inputArray[j][parameter] > inputArray[j + 1][parameter]) {
                auxiliarVar = inputArray[j];
                inputArray[j] = inputArray[j + 1];
                inputArray[j + 1] = auxiliarVar;
            }
        }
    }
    return inputArray
}

// bubbleSort();
