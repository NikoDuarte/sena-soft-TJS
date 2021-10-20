/***********/
//*! Importaciones
    //* |-> Request y Response {express}
    import {Request, Response} from 'express'
    //* |-> Servicio Response
    import { resp } from '../service/response.service';
    //* |-> Modelo de Cards
    import Cards from '../model/cards.model';
/***********/
//? -_ Metodo que creara una carta
const create_card = async(req: Request, res: Response) => {
    //* |-> Capturamos el cuerpo de la request
    const body = req.body
    //* |-> Control de errores tryCatch
    try {
        //* |-> Armamos el contenido de la carta
        const new_card = new Cards(body)
        //* |-> Almacenaremos el modelo en el documento
        await new_card.save()
        //* |-> Respondemos al cliente un mensaje de exito
        return resp(res, { status: 200, succ: true, msg: `Se creo correctamente la carta ${body.name_card}` })
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Retornamos un error 500 al cliente que realizo la peticion
        return resp(res, {status: 500, succ: false, msg: 'Ups... Ocurrio un problema revisa los logs'})
    }
}
/***********/
// TODO |-> Exportacion de controladores
export {
    create_card
}