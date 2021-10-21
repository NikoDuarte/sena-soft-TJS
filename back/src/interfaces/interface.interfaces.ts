/*********/
//? -_ Definicion de interfaces
    //* |-> Interfaz de la respuesta http
    interface _resp {
        status: number,
        succ: boolean,
        msg: string,
        data?: any
    }
    //* |-> Interfaz payload token
    interface _token {
        code: string,
        id_user: string
    }
/*********/
// TODO |-> Exportacion de interfaces
export {
    _resp,
    _token
}