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
        type: Schema.Types.ObjectId,
        ref: 'Players',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    correct_accusation: {
        type: {
            accusation: {
                type: {
                    quien: {
                        type: Schema.Types.ObjectId,
                        ref: 'Cards'
                    },
                    modulo: {
                        type: Schema.Types.ObjectId,
                        ref: 'Cards'
                    },
                    error: {
                        type: Schema.Types.ObjectId,
                        ref: 'Cards'
                    },
                },
            },
            id_user_win: {
                type: Schema.Types.ObjectId,
                ref: 'Players'
            }
        },
    },
    players: {
        type: [
            {
                id_users: {
                    type: Schema.Types.ObjectId,
                    ref: 'Players',
                    required: true
                }
            }
        ]
    },
    questions: {
        type: [
            {
                id_user_quest: {
                    type: Schema.Types.ObjectId,
                    ref: 'Players'
                },
                question: {
                    type: {
                        quien: {
                            type: Schema.Types.ObjectId,
                            ref: 'Cards'
                        },
                        modulo: {
                            type: Schema.Types.ObjectId,
                            ref: 'Cards'
                        },
                        error: {
                            type: Schema.Types.ObjectId,
                            ref: 'Cards'
                        },
                    }
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
                    type: {
                        quien: {
                            type: Schema.Types.ObjectId,
                            ref: 'Cards'
                        },
                        modulo: {
                            type: Schema.Types.ObjectId,
                            ref: 'Cards'
                        },
                        error: {
                            type: Schema.Types.ObjectId,
                            ref: 'Cards'
                        },
                    }
                }
            }
        ]
    }
})
/************/
// TODO |-> Exportacion del schema
export default model('Sala', salaSchema)