/*********/
//*! Importaciones
    //* |-> Dotenv
    import dotenv from 'dotenv'
/*********/
//* |-> Configuracion del dotenv
dotenv.config()
/*********/
//? -_ Variables no exportables
    //* |-> Usuario Mongo
    const _user_mongo_: string = String(process.env.USER_MONGO)
    //* |-> Password Mongo
    const _pass_mongo_: string = String(process.env.PASS_MONGO)
//? -_ Variables exportables
    //* |-> Puerto
    const _port_: number = Number(process.env.PORT)
    //* |-> URL conexion
    const _url_connect_: string = `mongodb+srv://${_user_mongo_}:${_pass_mongo_}@gub.dccrb.mongodb.net/gub`
    //* |-> URL de las rutas endpoints
    const _url_concat_: string = String(process.env.URL_CONCAT)
// TODO -> Exportacion de modulos
export {
    _port_,
    _url_connect_,
    _url_concat_
}