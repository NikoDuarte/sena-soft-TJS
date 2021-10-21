/**********/
//*! Importaciones
    //* |-> Response { express }
    import { Response } from 'express'
    //* |-> Interfaces
    import { _resp } from '../interfaces/interface.interfaces'
/**********/
//? -_ Definicion del servicio para las respuestas
const resp = (res: Response, info: _resp) => {
    res.status(info.status).json({
        success: info.succ,
        msg: info.msg,
        data: info.data
    })
}
/**********/
// TODO |-> Exportacion del servicios
export {
    resp
}