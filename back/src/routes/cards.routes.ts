/***********/
//*! Importaciones
    //* |-> Router de express
    import { Router } from 'express'
    //* |-> Controlladores
    import { create_card } from '../controller/cards.controller'
/***********/
//? -_ Configuracion de rutas
    const router: Router = Router()
//? -_ Descripcion de las rutas
    //? $GET
    //? $POST
        //* |-> Ruta que creara los jugadores
        router.post(
            '/',
            [],
            create_card
        )
    //? $PUT
    //? $DELETE
/***********/
// TODO |-> Exportacion por defecto de las rutas
export default router