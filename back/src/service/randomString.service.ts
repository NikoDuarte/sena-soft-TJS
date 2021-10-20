/***********/
//? -_ Definicion Del servicio que creara caracteres aleatoreos
const random_code = () => {
    //* |-> Caracteres que se usaran
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //* |-> Declaracion de variable que contendra el resultado
    let code= ' ';
    //* Capturamos el numero de caracteres
    const charactersLength = characters.length;
    //* |-> Barremos para crear un string de minimo 5 caracteres
    for ( let i = 0; i < 5; i++ ) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code;
}
/***********/
// TODO |-> Exportamos el servicio
export {
    random_code
}