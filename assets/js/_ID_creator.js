/*
    Función creadora de Idetificadores aleatoreos para los productos 
*/
export const createID = (codeLenght) => {
    const characters ='0123456789';
    let result= '';
    for (let i = 0; i < codeLenght; i++) {
        result += characters.charAt(Math.floor(Math.random() * 10));
    }
    return +result;
}