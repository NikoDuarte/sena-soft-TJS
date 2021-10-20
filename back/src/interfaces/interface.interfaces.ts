/*********/
//? -_ Definicion de interfaces
    //* |-> Interfaz de la respuesta http
    interface _resp {
        status: number,
        succ: boolean,
        msg: string,
        data?: any
    }
/*********/
// TODO |-> Exportacion de interfaces
export {
    _resp
}