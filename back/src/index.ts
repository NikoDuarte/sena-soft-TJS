/***********/
//*! Importaciones
    //* |-> Express
    import express from 'express'
    //* |-> Cors
    import cors from 'cors'
    //* |-> DBMS
    import { connection } from './database/config.database'
    //* |-> environments
    import { _port_, _url_concat_ } from './environments/environments.environments'
    //* |-> Rutas de las salas
    import routes_sala from './routes/sala.routes'
    //* |-> Rutas de los archivos
    import routes_files from './routes/files.routes'
    //* |-> Ruta de las cards
    import routes_cards from './routes/cards.routes'
/***********/
//? -_ Configuracion nesesaria para avilitar el servidor de express
const app = express()
    //* |-> Configuracion del cors
    app.use(cors())
    //* |-> Inicializar la conexion de la base de datos
    connection()
    //* |-> Inicializacion del parseo
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
//? -_ Inicializacion de rutas
    //* |-> Ruta que manejara todos los procesos del modelo Sala
    app.use(`${_url_concat_}/sala`, routes_sala)
    //* |-> Ruta que manejara todos los procesos de subida y vista de img
    app.use(`${_url_concat_}/files`, routes_files)
    //* |-> Ruta que manejara todos las cards
    app.use(`${_url_concat_}/cards`, routes_cards)
//? -_ Inicio del servidor
    app.listen(_port_, () => console.log(`Server online in port: ${_port_}`))
/**
 ▐ ▄ ▄ •▄     
•█▌▐██▌▄▌▪    
▐█▐▐▌▐▀▀▄·    
██▐█▌▐█.█▌    
▀▀ █▪·▀  ▀
 */