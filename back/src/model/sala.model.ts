/************/
//*! Importaciones
    //* |-> Schema y model de mongoose
    import { Schema, model } from 'mongoose'
/************/
//? -_ Descripcion del schema Sala
const salaSchema: Schema = new Schema({
    //* |-> Nombre de la sala
    name_sala: {
        type: String,
        required: true
    },
    user_admin: {
        type: {
            id_user: Schema.Types.ObjectId,
            ref: 'Players',
            required: true
        }
    },
    code: {
        type: String,
        required: true
    },
    correct_accusation: {
        type: String,
        required: true
    },
    players: {
        type: Schema.Types.ObjectId,
        ref: 'Players',
        required: true
    },
    questions: {
        type: [
            {
                id_user_quest: {
                    type: Schema.Types.ObjectId,
                    ref: 'Players'
                },
                question: {
                    type: String
                }
            }
        ]
    },
    accusations: {
        type: [
            {
                id_user_accus: {
                    type: Schema.Types.ObjectId,
                    ref: 'Players'
                },
                accusation: {
                    type: String
                }
            }
        ]
    }
})
/************/
// TODO |-> Exportacion del schema
export default model('Sala', salaSchema)