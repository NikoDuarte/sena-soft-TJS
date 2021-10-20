/************/
//*! Importaciones
    //* |-> Schema y models mongoose
    import { Schema, model } from 'mongoose'
/************/
//? -_ Descripcion del schema players
    const playerSchema: Schema = new Schema({
        //* |-> Nombre del jugador (Requerido)
        name: {
            type: String,
            required: true
        },
        //* |-> Status del jugador { turno } (requerido)
        status: {
            type: Boolean,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        //* |-> Cartas que contendra el jugador (Requerido)
        cards: {
            //* |-> Sera un a matriz de objetos
            type: [
                {
                    //* |-> Identificador de las cartas
                    id_cards: {
                        type: Schema.Types.ObjectId,
                        ref: 'Cards',
                    }
                }
            ]
        },
        //* |-> Lista de cartas completas para el descarte del jugador (requerido)
        list: {
            //* |-> Sera una matriz de objetos que contendran matrices
            type: [
                {
                    //* |-> Id de las cartas que le corresponde
                    id_card: {
                        type: Schema.Types.ObjectId,
                        ref: 'Cards'
                    },
                    //* |-> El estado de si la carta existe
                    status: {
                        type: Boolean
                    },
                    //* |-> Id del usuario que la tiene
                    id_user_have: {
                        type: Schema.Types.ObjectId,
                        ref: 'Players'
                    }
                }
            ]
        }
    })
/************/
// TODO |-> Exportacion del modulo
export default model('Players', playerSchema)