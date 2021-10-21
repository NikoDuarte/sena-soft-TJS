/***********/
//*! Importaciones
    //* |-> Request && Response { express }
    import { NextFunction, Request, Response } from "express";
    //* |-> {jsonwebtoken}
    import jwt from 'jsonwebtoken'
    //* |-> Servicio response
    import { resp } from "../service/response.service";
    //* |-> Environments
    import { _secrect_token_ } from '../environments/environments.environments'
    //* |-> Modelo Sala
    import Sala from "../model/sala.model";
    //* |-> Modelo Players
    import Players from "../model/players.model";
/***********/
//? -_ Middleware que validara el token
const valid$token = async(req: Request | any, res: Response, next: NextFunction) => {
    //* |-> Capturaremos el token de los headers
    const token = req.header('gub-tok')
    //* |-> Si no viene el token devolveremos un error 401
    if (!token) {
        return resp(res, { status: 401, succ: false, msg: 'Peticion no autorizada' })
    }
    //* Control de errores tryCatch
    try {
        //* |-> Extraemos la informacion del token
        const { code, id_user }: any = await jwt.verify(token, _secrect_token_)
        //* |-> Buscamos si existe una sala con ese code
        const findSalaCode = await Sala.findOne({code})
        //* |-> Si no existe una sala retornaremos un 404
        if (!findSalaCode || findSalaCode === undefined) {
            return resp(res, { status: 404, succ: false, msg: 'No se encontro la sala por ese codigo' })
        }
        //* |-> Buscamos si existe un jugador con ese indicativo
        const findPlayersId = await Players.findById(id_user)
        //* |-> Si no encuentra ningun documento retornaremos un error 404
        if (!findPlayersId || findPlayersId === undefined) {
            return resp(req, { status: 404, succ: false, msg: 'Usuario no encontrado' })
        }
        //* |-> Validamos si el turno del usuario este habilitado
        if (findPlayersId.status === false) {
            //* |-> Si no es el turno retornaremos un 400
            return resp(req, { status: 400, succ: false, msg: 'Lo sentimos no es tu turno' })
        }
        //* |-> añadimos a la request la informacion del token
        req.gub = {sala:{code, info_sala: findSalaCode}, id_user}
        //* |-> Continuamos con la funcionalidad
        next()
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Retornamos al cliente un error 500
        return resp(res, { status: 500, succ: false, msg: 'Ups... Ocurrio un problema revisa los logs' })
    }
}
/***********/
// TODO |-> Exportacion de middleware
export {
    valid$token
}