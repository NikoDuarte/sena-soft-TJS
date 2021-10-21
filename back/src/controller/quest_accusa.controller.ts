/*************/
//*! Importaciones
    //* |-> Request && Response { express }
    import { Request, Response } from "express";
    //* |-> Servicio response
    import { resp } from '../service/response.service'
    //* |-> Modelo Sala
    import Sala from "../model/sala.model";
    //* |-> Modelo Players
    import Players from "../model/players.model";
/*************/
//? -_ Metodo que almacenara las preguntas realizadas por un usuario segun su id (token)
const questions_players = async(req: Request, res: Response) => {
    //* |-> Capturamos la question de la request
    const {question} = req.body
    //* |-> Capturamos la info del token
    const { gub:{sala:{code, info_sala}, id_user} }: any = req
    //* |-> Control de errores tryCatch
    try {
        //* |-> Buscamos la sala por el id de el token
        const findSalaId = await Sala.findById(info_sala._id)
        //* |-> Buscamos el index de
        const SalaId = findSalaId.players.map(
            (e: any) => e.id_users.toString()
        )
        //* |-> Mapearemos el resultado para solo obtener 
        const SalaQuestionMap = findSalaId.questions.map(
            (sqm: any) => {
                const { quien, modulo, error } = sqm.question
                return {
                    quien: quien.toString(),
                    modulo: modulo.toString(),
                    error: error.toString()
                }
            }
        )
        let SalaQuestionIncludes: boolean | any;
        //* |-> Buscamos si ya existe una pregunta similar
        SalaQuestionMap.forEach((e: any) => {
            if (e.quien === question.quien && e.modelo === question.modelo && e.error === question.error) {
                SalaQuestionIncludes = true
            }else{
                SalaQuestionIncludes = false
            }
        });
        //* |-> Si ya existe la pregunta retornaremos un eror 400
        if (SalaQuestionIncludes === true) {
            return resp(res, {status: 400, succ: false, msg: 'Parece que la pregunta que realizaste ya la realizaron, te recomendamos que utilices nuevos parametros para tu pregunta'})
        }
        //* |-> Buscaremos el index de de la posicion actual
        const index_player: number = SalaId.indexOf(id_user)
        //* |-> Actualizamos el turno del usuario actual que pregunto y se invalida el turno
        const old_shift = await Players.findByIdAndUpdate(id_user, { status: false }, {new: true})
        let info;
        //* |-> Si el index es igual a 3
        if (index_player === 3) {
            //* |-> Devolveremos el turno al usuario admin o el que se encuentre en la posicion 0
            info = SalaId.find((e: any, i: any) => i === 0)
        }else {
            //* |-> Sumaremos al index un numero para continuar con los turnos y habilitarlos segun su id
            info = SalaId.find((e: any, i: any) => i === index_player + 1)
        }
        //* |-> Actualizaremos el status del nuevo usuario
        const new_shift = await Players.findByIdAndUpdate(info, { status: true }, {new: true})
        //* |-> Añadiremos la pregunta en el arreglo para tener el historial
        const new_questions = await Sala.findByIdAndUpdate(info_sala._id, { questions: [...info_sala.questions, {id_user_quest: id_user, question}] }, {new: true})
        //* |-> Respondemos al cliente un mensaje de exito
        return resp(res, {status: 200, succ: true, msg: 'Pregunta añadida!', data: {shift:{old_shift, new_shift}, question: new_questions}})
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Respondemos al cliente que hizo la peticion un error 500
        return resp(res, { status: 500, succ: false, msg: 'Ups... Ocurrio un problema revisa los logs' })
    }
}
//? -_ Metodo que almacenara y validara la respuesta // acusacion correcta segun la info (token)
const accusation_players = async(req: Request, res: Response) => {
    //* |-> Capturamos la acusacion
    const { accusation } = req.body
    //* |-> Capturamos la info del token
    const { gub:{sala:{code, info_sala}, id_user} }: any = req
    //* |-> Control de errores tryCatch
    try {
        //* |-> Buscamos al jugador por el id
        const findPlayerId = await Players.findById(id_user)
        //* |-> Buscamos la sala por el id de el token
        const findSalaId = await Sala.findById(info_sala._id)
        //* |-> Validaremos si ya hay un ganador
        if (findSalaId.correct_accusation.id_user_win) {
            //* |-> Repsonderemos con un error 400
            return resp(res, {status: 400, succ: false, msg: `Lo Sentimos, pero ya ganaron esta partida!`})
        }
        //* |-> Buscamos el index de
        const SalaId = findSalaId.players.map(
            (e: any) => e.id_users.toString()
        )        
        let users_player;
        let win_player;
        //* |-> Validaremos si son iguales las acusaciones
        if (accusation.quien === info_sala.correct_accusation.accusation.quien.toString() && accusation.modulo === info_sala.correct_accusation.accusation.modulo.toString() && accusation.error === info_sala.correct_accusation.accusation.error.toString()) {
            //* |-> Sabremos que en la sala hay un ganador
            win_player = true
            //* |-> Actualizaremos la informacion del jugador ganador y agregaremos el acusamiento
            users_player = await Sala.findByIdAndUpdate(info_sala._id, { correct_accusation: {accusation: info_sala.correct_accusation.accusation, id_user_win: id_user}, accusations: [...info_sala.accusations, {id_user_accus: id_user, accusation}] }, {new: true})
        }else{
            //* |-> Sabemos que no hay jugadores ganados en la sala
            win_player = false
            //* |-> Solo agregamos el acusamiento sin mencionar un ganador
            users_player = await Sala.findByIdAndUpdate(info_sala._id, { accusations: [...info_sala.accusations, {id_user_accus: id_user, accusation}] }, {new: true})
        }
        //* |-> Buscaremos el index de de la posicion actual
        const index_player: number = SalaId.indexOf(id_user)
        //* |-> Actualizamos el turno del usuario actual que pregunto y se invalida el turno
        const old_shift = await Players.findByIdAndUpdate(id_user, { status: false }, {new: true})
        let info;
        //* |-> Si el index es igual a 3
        if (index_player === 3) {
            //* |-> Devolveremos el turno al usuario admin o el que se encuentre en la posicion 0
            info = SalaId.find((e: any, i: any) => i === 0)
        }else {
            //* |-> Sumaremos al index un numero para continuar con los turnos y habilitarlos segun su id
            info = SalaId.find((e: any, i: any) => i === index_player + 1)
        }
        //* |-> Actualizaremos el status del nuevo usuario
        const new_shift = await Players.findByIdAndUpdate(info, { status: true }, {new: true})
        //* |-> Respondemos un mensaje de exito al cliente
        return resp(res, {status: 200, succ: true, msg: win_player === true ? `Felicidades!! Ha ganado el jugador ${findPlayerId.name}` : `Se a agregado la acusacion en el historial`, data: {winner_or_accusation: users_player, players:{old_shift, new_shift}}})
    } catch (err) {
        //*! Imprimimos el error por consola
        console.log(err);
        //*! Retornamos al cliente que hizo la peticion un error 500
        return resp(res, {status: 500, succ: false, msg: 'Ups... Ocurrio un problema revisa los logs'})
    }
}
//? -_ Metod que respondera la pregunta realizada
const answer_questions = async() => {
    
}
/*************/
// TODO |-> Exportacion de controladores
export {
    questions_players,
    accusation_players
}