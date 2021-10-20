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
        //* |-> Cartas que contendra el jugador (Requerido)
        cards: {
            //* |-> Sera un a matriz de objetos
            type: [
                {
                    //* |-> Nombre de la carta que posee
                    nom_card: {
                        type: String,
                        required: true
                    },
                    //* |-> Img de la carta que posee
                    img: {
                        type: String,
                        required: true
                    }
                }
            ]
        },
        //* |-> Lista de cartas completas para el descarte del jugador (requerido)
        list: {
            //* |-> Sera una matriz de objetos que contendran matrices
            type: [
                {
                    //* |-> quien o el programador
                    quien: {
                        //* |-> Sera una matriz de objetos
                        type: [
                            {
                                //* |-> Nombre de la carta quien
                                nom_quien: {
                                    type: String,
                                    required: true
                                },
                                //* |-> Img de la carta quien
                                img: {
                                    type: String,
                                    required: true
                                },
                                //* |-> Status { encontrada o no } de  la carta quien
                                status: {
                                    type: Boolean,
                                    default: false,
                                    required: true
                                },
                                //* |-> Indicativo del usuario que la posee
                                id_user_have: {
                                    type: Schema.Types.ObjectId,
                                    ref: 'Players'
                                }
                            }
                        ]
                    },
                    //* |-> Modulo donde se encontrara el error
                    modulo: {
                        //* |-> Sera una matriz de objetos
                        type: [
                            {
                                //* |-> nombre del modelo de la carta
                                nom_modelo: {
                                    type: String,
                                    required: true
                                },
                                //* |-> Img del modelo de la carta
                                img: {
                                    type: String,
                                    required: true
                                },
                                //* |-> Status { encontrado o no } de la carta
                                status: {
                                    type: Boolean,
                                    default: false,
                                    required: true
                                },
                                //* |-> Indicativo del usuario que posee el modulo
                                id_user_have: {
                                    type: Schema.Types.ObjectId,
                                    ref: 'Players'
                                }
                            }
                        ]
                    },
                    //* |-> Error de el modulo
                    error: {
                        //* |-> Sera una matriz de objetos
                        type: [
                            {
                                //* |-> Nombre del error
                                nom_error: {
                                    type: String,
                                    required: true
                                },
                                //* |-> Imagen del error
                                img: {
                                    type: String,
                                    required: true
                                },
                                //* |-> Status { encontrado o no } del error
                                status: {
                                    type: Boolean,
                                    default: false,
                                    required: true
                                },
                                //* |-> Indicativo del usuario que posee la carta
                                id_user_have: {
                                    type: Schema.Types.ObjectId,
                                    ref: 'Players'
                                }
                            }
                        ]
                    }
                }
            ]
        }
    })
/************/
// TODO |-> Exportacion del modulo
export default model('Players', playerSchema)