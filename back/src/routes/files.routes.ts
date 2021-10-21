/***********/
//*! Importaciones
    //* |-> Router de express
    import { Router } from 'express'
    //* |-> Controlladores
    import { upload_img_cards, view_img_cards } from '../controller/files.controller'
/***********/
//? -_ Configuracion de rutas
    const router: Router = Router()
//? -_ Descripcion de las rutas
    //? $GET
        //* |-> Ruta que mostrara la img segun el id de la card
        router.get(
            '/',
            view_img_cards
        )
    //? $POST        
    //? $PUT
        //* |-> Ruta que subira y actualizara un card
        router.put(
            '/:id',
            [],
            upload_img_cards
        )
    //? $DELETE
/***********/
// TODO |-> Exportacion por defecto de las rutas
export default router