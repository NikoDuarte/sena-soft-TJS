/***********/
//*! Importaciones
    //* |-> Mongoose
    import mongoose from 'mongoose'
    //* |-> URL de conexion
    import { _url_connect_ } from '../environments/environments.environments'
/***********/
//? -_ Metodo asincrono que conectara al dbms (mongo)
export const connection = async() => {
    //* |-> Control de errores tryCatch
    try {
        //* |-> Realizamos la conexion con mongoose
        await mongoose.connect(_url_connect_)
        //* |-> Respondemos por consola un mensaje de exito a la conexion
        console.log('Success conecction DBMS');
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Retornamos un error de conexion
        throw new Error("Error when staring dbms");
    }
}
/***********/