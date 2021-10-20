/***********/
//*! Importaciones
    //* |-> Router de express
    import { Router } from 'express'
    //* |-> Controlladores
    import { create_sala } from '../controller/sala.controller'
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
    //? $PUT
    //? $DELETE
/***********/
// TODO |-> Exportacion por defecto de las rutas
export default router