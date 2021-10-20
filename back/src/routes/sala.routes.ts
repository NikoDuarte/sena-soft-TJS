/***********/
//*! Importaciones
    //* |-> Router de express
    import { Router } from 'express'
    //* |-> Controlladores
    import { create_sala, delete_sala, join_player_sala } from '../controller/sala.controller'
/***********/
//? -_ Configuracion de rutas
    const router: Router = Router()
//? -_ Descripcion de las rutas
    //? $GET
    //? $POST
        //* |-> Ruta que creara la sala
        router.post(
            '/',
            [],
            create_sala
        )
        //* |-> Ruta que unira a una sala
        router.post(
            '/join',
            [],
            join_player_sala
        )
    //? $PUT
    //? $DELETE
        //* |-> Ruta que eliminara la sala segun el id
        router.delete(
            '/:id',
            [],
            delete_sala
        )
/***********/
// TODO |-> Exportacion por defecto de las rutas
export default router