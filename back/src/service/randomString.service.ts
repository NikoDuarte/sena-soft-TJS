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
//? -_ Definicion del servicio que devolvera aleatoreas las cartas
const random_cards = (cards: any[]) => {
    //* |-> Variable que contendra el resultado
    var currentIndex = cards.length, temporaryValue, randomIndex;    
    // Mientras queden elementos a mezclar...
    while (0 !== currentIndex) {
        // Seleccionar un elemento sin mezclar...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // E intercambiarlo con el elemento actual
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
    return cards
}
/***********/
// TODO |-> Exportamos el servicio
export {
    random_code,
    random_cards
}