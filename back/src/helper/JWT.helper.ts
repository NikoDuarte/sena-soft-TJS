/***********/
//*! Importaciones
    //* |-> jsonwebtoken
    import jwt from 'jsonwebtoken'
    //* |-> Environments
    import { _secrect_token_ } from '../environments/environments.environments'
    //* |-> Interfaces
    import { _token } from '../interfaces/interface.interfaces'
/***********/
//? -_ Helper que generara el JWT
const generateJWT = (pay : _token) => {
    //* |-> Retornaremos una promesa que resolvera un token
    return new Promise((resolve, reject) => {
        //* |-> Generaremos el token
        jwt.sign(pay, _secrect_token_, {
            expiresIn: '3h'
        }, (err, token) => {
            if(err) reject('No se pudo generar el TOKEN')
            resolve(token)
        })
    })
}
/***********/
// TODO |-> Exportacion de helpers
export {
    generateJWT
}