/***********/
//*! Importaciones
    //* |-> Express
    import express from 'express'
    //* |-> Cors
    import cors from 'cors'
    //* |-> DBMS
    import { connection } from './database/config.database'
    //* |-> environments
    import { _port_ } from './environments/environments.environments'
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
    /**
     * 
     */
//? -_ Inicio del servidor
    app.listen(_port_, () => console.log(`Server online in port: ${_port_}`))
/**
 ▐ ▄ ▄ •▄     
•█▌▐██▌▄▌▪    
▐█▐▐▌▐▀▀▄·    
██▐█▌▐█.█▌    
▀▀ █▪·▀  ▀
 */