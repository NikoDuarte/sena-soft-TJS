/***********/
//*! Importaciones
    //* |-> Router de express
    import { Router } from 'express'
    //* |-> Controlladores
    import { create_card, delete_card, update_card, view_all_cards, view_unique_card } from '../controller/cards.controller'
/***********/
//? -_ Configuracion de rutas
    const router: Router = Router()
//? -_ Descripcion de las rutas
    //? $GET
        //* |-> Ruta que mostrara todas las cartas
        router.get(
            '/',
            [],
            view_all_cards
        )
        //* |-> Ruta que mostrara una carta segun su id
        router.get(
            '/:id',
            [],
            view_unique_card
        )
    //? $POST
        //* |-> Ruta que creara los jugadores
        router.post(
            '/',
            [],
            create_card
        )
    //? $PUT
        //* |-> Ruta que actualizar una carta segun su id
        router.put(
            '/:id',
            [],
            update_card
        )
    //? $DELETE
        //* |-> Ruta que eliminara una carta segun su id
        router.delete(
            '/:id',
            [],
            delete_card
        )
/***********/
// TODO |-> Exportacion por defecto de las rutas
export default router