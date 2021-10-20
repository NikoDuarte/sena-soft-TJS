/**********/
//*! Importaciones
    //* |-> environments
    import {} from '../environments/environments.environments'
    //* |-> Request y response {express}
    import { Request, Response } from 'express'
    //* |-> Servicio response
    import { resp } from '../service/response.service'
    //* |-> Servicio RandomString
    import { random_code } from '../service/randomString.service'
    //* |-> Modelo SALA
    import Sala from '../model/sala.model'
    //* |-> Modelo Players
    import Players from '../model/players.model'
/**********/
//? -_ Controlador que creara la sala
const create_sala = async(req: Request, res: Response) => {
    //* |-> Capturamos la informacion entrate de la request
    const { name_sala, user_admin } = req.body
    //* |-> Control de errores tryCatch
    try {
        //* |-> Crearemos un codigo de 5 caracteres
        let code = random_code()
        //* |-> Cortamos los espacios
        const new_code = code.split(' ')
        //* |-> Buscaremos si existe una sala con el mismo codigo
        const findSalaCode: any = await Sala.find({code: new_code[1]})
        //* |-> Si existe uno con el mismo codigo 
        if (findSalaCode.length > 1) {
            return resp(res, {status: 400, succ: false, msg: 'El codigo ya existe vuelve a generar una nueva sala'})
        }
        //* |-> Crearemos la informacio del usuario administrador
        const user = {
            name: user_admin,
            status: true,
            code: new_code[1]
        }
        //* |-> Almacenamos el documento de players
        const new_player = new Players(user)
        const id_admin: string = new_player._id.toString()
        await new_player.save(user)
        //* |-> Creamos la informacion de la sala
        const sala = {
            name_sala: name_sala,
            user_admin: id_admin,
            code: new_code[1],
            players: [{id_users: id_admin}]
        }
        //* |-> Almacenamos el documento de sala
        const new_sala = new Sala(sala)        
        await new_sala.save()
        //* |-> Respondemos un mensaje de exito cuando se cree la partida
        return resp(res, {status: 200, succ: true, msg: 'Se creo la sala! Estaremos esperando 3 jugadores mas', data: new_code[1]})
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Respondemos al cliente un error 500
        return resp(res, {status: 500, succ: false, msg: 'Ups... Ocurrio un problema revisa los logs'})
    }
}
//? -_ Controlador que unira jugadores a una sala
const join_player_sala = async(req: Request, res: Response) => {
    //* |-> Capturamos el nombre y el codigo
    const { code, name_player } = req.body    
    //* |-> Control de errores tryCatch
    try {
        //* |-> Buscaremos si existe una sala con ese codigo
        const findSalaCode = await Sala.find({ code: code })
        //* |-> Si no existe una clase con ese codigo devolveremos un error 404
        if(!findSalaCode || findSalaCode.length === 0) return resp(res, {status: 404, succ: false, msg: 'No se encontro ninguna sala con ese codigo'})
        //* |-> Validaremos la cantidad de usuarios en la sala
        if (findSalaCode[0].players.length === 4) {
            //* |-> Si ya estan los 4 usuarios retornaremos un error 400
            return resp(res, {status: 400, succ: false, msg: 'El cupo de la sala esta completado'})
        }
        //* |-> Crearemos el nuevo jugador
        const user = {
            name: name_player,
            status: false,
            code: code
        }        
        //* |-> Almacenaremos el nuevo jugador
        const new_player = new Players(user)
        await new_player.save()
        //* |-> Actualizaremos el documento de la sala segun su id
        const join_player = await Sala.findByIdAndUpdate(findSalaCode[0]._id, {players: [...findSalaCode[0].players, {id_users: new_player._id.toString() }]}, {new: true})
        //* |-> Respondemos un mensaje de exito al cliente
        return resp(res, {status: 200, succ: true, msg: 'Se a unido correctamente a la sala', data: join_player})
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Retornamos al cliente que hizo la peticion un error 500
        return resp(res, { status: 500, succ: false, msg: 'Ups... Ocurrio un problema revisa los logs' })
    }
}
//? -_ Metodo que el eliminara la sala
const delete_sala = async(req: Request, res: Response) => {
    //* |-> Capturamos el id de la sala
    const { id } = req.params
    //* |-> Control de errores tryCatch
    try {
        //* |-> Buscaremos la sala por ese id
        const findSalaId = await Sala.findById(id)
        //* |-> Si no encuentra ningun documento retornaremos un error 404
        if (!findSalaId || findSalaId === undefined) {
            return resp(res, { status: 404, succ: false, msg: 'No se encontro la sala a eliminar' })
        }
        //* |-> Eliminaremos la sala junto con los participantes
        await Sala.findByIdAndDelete(id)
        //* |-> Eliminaremos los usuarios de la partida
        await findSalaId.players.forEach(async(e: any) => {
            const {id_users} = e
            await Players.findByIdAndDelete(id_users)
        });
        //* |-> Retornamos un mensaje de exito
        return resp(res, { status: 200, succ: true, msg: `Se elimino correctamente la sala ${findSalaId.name_sala}`})
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Retornamos al cliente quie hizo la peticion un error 500
        return resp(res, {status: 500, succ: false, msg: 'Ups... Ocurrio un problema revisa los logs'})
    }
}
/**********/
// TODO |-> Exportar controladores
export {
    create_sala,
    join_player_sala,
    delete_sala
}