/***********/
//*! Importaciones
    //* Request y Response de {express}
    import { Request, Response } from 'express'
    //* |-> Path
    import path from 'path'
    //* |-> FileSystem
    import fs from 'fs'
    //* |-> Modelo de Cards
    import Cards from '../model/cards.model'
    //* |-> Servicio de respuesta
    import { resp } from '../service/response.service'
/***********/
//? -_ Metodo que mostrara un archivo guardado
const view_img_cards = async(req: Request, res: Response) => {
    //* |-> Capturaremos el id de la card a actualizar
    const { id } = req.query
    //* |-> Control de errores tryCatch
    try {
        //* |-> Buscamos la carta por el id suministrado
        let findCardId;
        let pathAttach;
        if (id === undefined) {
            //* |-> Contruimos el path de la ruta no encontrada
            const pathNoAttach: string = path.join(__dirname, '../uploads/no_attach_card.svg')
            //* |-> enviaremos esa img como respuesta al cliente
            return res.sendFile(pathNoAttach)
        }else{
            findCardId = await Cards.findById(id)
            //* |-> Si no existe ninguno con el id suministrado retornamos un error 404
            if(!findCardId || findCardId === undefined) return resp(res, { status: 404, succ: false, msg: 'Carta no encontrada' })
            //* |-> Armamos el path de la ruta
            pathAttach = path.join(__dirname, findCardId.img)
            //* |-> Si la img no es ubicada retornaremos una img por defecto
            if (fs.existsSync(pathAttach)) {
                //* |-> Si si existe la img la devolveremos al cliente
                return res.sendFile(pathAttach)
            }else {
                //* |-> Contruimos el path de la ruta no encontrada
                const pathNoAttach: string = path.join(__dirname, '../uploads/no_attach_card.svg')
                //* |-> enviaremos esa img como respuesta al cliente
                return res.sendFile(pathNoAttach)
            }
        }
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Retornamos un error 500 al cliente que hizo la peticion
        return resp(res, { status: 500, succ: false, msg: 'Ups... Ocurrio un problema revisa los logs' })
    }
}
//? -_ Metodo que subira un archivo y actualizara el documento de cards
const upload_img_cards = async(req: Request | any, res: Response) => {
    //* |-> Capturamos el id de la carta a la cual le actualizaremos la img
    const { id } = req.params
    //* |-> Control de errores tryCatch
    try {        
        //* |-> Buscaremos el modelo por el id suministrado
        const findCardsId = await Cards.findById(id)
        //* |-> Si no lo encuentra retornaremos un error 404
        if(!findCardsId || findCardsId === undefined) return resp(res, {status: 404, succ: false, msg: 'Carta no encontrada'})
        //* |-> Validaremos si hay algun archivo en la request
        if (!req.files || Object.keys(req.files).length === 0) {
            //* |-> Si no hay ningun archivo que procesar retornaremos un 400
            return resp(res, {status: 400, succ: false, msg: 'No se encuentra ninguna archivo en el sistema, por ende no lo podemos almacenar'})
        }
        //* |-> Almacenaremos la img en una variable
        const attach = req.files.files
        //* |-> Validamos que solo sea un solo archivo
        if (attach.length > 1) {
            //* |-> Si hay mas de uno retornaeremo un error 400
            return resp(res, { status: 400, succ: false, msg: 'Solo puedes cargar un solo archivo por carta' })
        }
        //* |-> Extenciones permitidas
        const extValidas: string[] = ['png', 'jpg', 'jpge', 'svg']
        //* |-> Cortaremos el nombre de la img por el punto
        const nom_attach: string[] = attach.name.split('.')
        //* |-> Capturamos la extencion del archivo
        const extAttach: string = nom_attach[ nom_attach.length -1 ]
        //* |-> Validamos que la extencion se encuentre en las extenciones validas
        if (!extValidas.includes(extAttach)) {
            return resp(res, {status: 401, succ: false, msg: 'Extencion de archivo no valida'})
        }
        //* |-> Cambiaremos el nombre del archivo
        const new_name_attach: string = `${findCardsId._id}.${extAttach}`
        //* |-> Ruta en la que se guardara el archivo
        const pathAttach: string = `../uploads/${new_name_attach}`
        //* |-> Moveremos el archivo a la carpeta del servidor
        attach.mv(pathAttach, (err: any) => {
            //* Si existe un error retornaremos un error 400
            if(err) return resp(res, {status: 400, succ: false, msg: 'Error al guardar el archivo en el sistema'})
        })
        //* |-> Actualizaremos el path de la img en las Cards
        await Cards.findByIdAndUpdate(id, { img: pathAttach })
        //* |-> retornaremos un mensaje de exito
        return resp(res, { status: 200, succ: true, msg: `Se a subido correctamente la imagen a la carta ${findCardsId.name_card}` })
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Respondemos un error 500 al cliente que hizo la peticion
        return resp(res, {status: 500, succ: false, msg: 'Ups... Ocurrio un problema verifica los logs'})
    }
}
/***********/
// TODO |-> Exportacion del modulo
export {
    upload_img_cards,
    view_img_cards
}