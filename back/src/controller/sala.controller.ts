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
        //* |-> Buscaremos si existe una sala con el mismo codigo
        const findSalaCode: any = await Sala.find({code: code})
        //* |-> Si existe uno con el mismo codigo 
        if (findSalaCode || findSalaCode.length > 1) {
            create_sala(req, res)
            return;
        }
        //* |-> Crearemos el usuario administrador
        const user = {
            name: user_admin,
            status: true
        }
        return resp(res, {status: 200, succ: true, msg: 'Listo para recibir peticiones', data: code})
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Respondemos al cliente un error 500
        return resp(res, {status: 500, succ: false, msg: 'Ups... Ocurrio un problema revisa los logs'})
    }
}
/**********/
// TODO |-> Exportar controladores
export {
    create_sala
}