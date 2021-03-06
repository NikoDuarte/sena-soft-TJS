/***********/
//*! Importaciones
    //* |-> Router de express
    import { Router } from 'express'
    //* |-> Controlladores
        //? -_ Controlladores de sala
        import { create_sala, delete_sala, join_player_sala, renew_token, sala_players } from '../controller/sala.controller'
        //? -_ Controlladores de pregustas
        import { accusation_players, questions_players } from '../controller/quest_accusa.controller'
    //* |-> Middlewares
    import { valid$token } from '../middleware/JWT.middleware'
/***********/
//? -_ Configuracion de rutas
    const router: Router = Router()
//? -_ Descripcion de las rutas
    //? $GET
        //* |-> Ruta que renovara el token de acceso
        router.get(
            '/renew-token',
            [ valid$token ],
            renew_token
        )
        //* |-> Ruta que mostrara los jugadores de una sala
        router.get(
            '/:code',
            [ valid$token ],
            sala_players
        )
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
        //* |-> Ruta que enviara preguntas
        router.patch(
            '/',
            [ valid$token ],
            questions_players
        )
        //* |-> Ruta que enviara y validara la acusacion
        router.patch(
            '/accusation',
            [ valid$token ],
            accusation_players
        )
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