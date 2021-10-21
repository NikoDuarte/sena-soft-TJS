/***********/
//*! Importaciones
    //* |-> Request y Response {express}
    import {Request, Response} from 'express'
    //* |-> Servicio Response
    import { resp } from '../service/response.service';
    //* |-> Modelo de Cards
    import Cards from '../model/cards.model';
/***********/
//? -_ Metodo que vera todas las cartas
const view_all_cards = async(req: Request, res: Response) => {
    //* |-> Control de errores tryCatch
    try {
        //* |-> Buscamos todas las cartas creadas
        const findAllCards = await Cards.find({})
        //* |-> Si no encuentra ningun documento retornara un 404
        if(!findAllCards || findAllCards.length === 0) return resp(res, {status: 404, succ: false, msg: 'Cartas no encontradas!'})
        //* |-> Respondemos un mensaje de exito al cliente junto con la data de las cartas
        return resp(res, {status: 200, succ: true, msg: 'Busqueda exitosa!', data: findAllCards})
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Retornamos al cliente que hizo la peticion un error 500
        return resp(res, {status: 500, succ: false, msg: 'Ups... Ocurrio un problema revisa los logs'})
    }
}
//? -_ Metodo que mostrara solo una carta segun su id
const view_unique_card = async(req: Request, res: Response) => {
    //* |-> Capturamos el id de la carta
    const { id } = req.params
    //* |-> Control de errores tryCatch
    try {
        //* |-> Buscamos la carta segun el id
        const findCardId = await Cards.findById(id)
        //* |-> Si no encuentra ninguna carta retornaremos un 404
        if(!findCardId || findCardId === undefined) return resp(res, { status: 404, succ: false, msg: 'Carta no encontrada' })
        //* |-> Retornaremos un mensaje de exito al cliente de la peticion
        return resp(res, { status: 200, succ: true, msg: 'Busqueda exitosa', data: findCardId })
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Respondemos al cliente que hizo la peticion un error 500
        return resp(res, {status: 500, succ: false, msg: 'Ups... Ocurrio un problema revisa los logs'})
    }
}
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
//? -_ Metodo que actualizara una carta segun su id
const update_card = async(req: Request, res: Response) => {
    //* |-> Capturamos el id de la carta por los parametros
    const { id } = req.params
    //* |-> Capturamos el cuerpo de la request
    const body = req.body
    //* |-> Control de errores tryCatch
    try {
        //* |-> Buscaremos la carta segun el id suministrado
        const findCardId = await Cards.findById(id)
        //* |-> Si no encuentra ninguna carta devolveremos un error 404
        if(!findCardId || findCardId === undefined) return resp(res, { status: 404, succ: false, msg: 'Carta no encontrada' })
        //* |-> Actualizaremos la informacion de la carta por el id suministrado
        const new_card = await Cards.findByIdAndUpdate(id, body, {new: true})
        //* |-> respondemos al cliente un mensaje de exito
        return resp(res, {status: 200, succ: true, msg: `Se actualizo correctamente la carta ${new_card.name_card}`, data: new_card})
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Respondemos al que hizo la peticion un error 500
        return resp(res, {status: 500, succ: false, msg: 'Ups... Ocurrio un problema revisa los logs'})
    }
}
//? -_ Metodo que eliminara una carta segun su id
const delete_card = async(req: Request, res: Response) => {
    //* |-> Caprutamos el id de la carta
    const { id } = req.params
    //* |-> Control de errores tryCatch
    try {
        //* |-> Buscamos la carta por el id suministrado
        const findCardId = await Cards.findById(id)
        //* |-> Si no encuentra ningun dato o documento retornamos un error 404
        if(!findCardId || findCardId === undefined) return resp(res, { status: 404, succ: false, msg: 'Carta no encontrada' })
        //* |-> Eliminaremos la carta
        await Cards.findByIdAndDelete(id)
        //* |-> Respondemos con exito al cliente
        return resp(res, { status: 200, succ: true, msg: `Se elimino correctamente la carta ${findCardId.name_card}` })
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Respondemos al cliente que hizo la peticion un error 500
        return resp(res, {status: 500, succ: false, msg: 'Ups... Ocurrio un problema revisa los logs'})
    }
}
/***********/
// TODO |-> Exportacion de controladores
export {
    create_card,
    view_all_cards,
    view_unique_card,
    update_card,
    delete_card
}