/**********/
//*! Importaciones
    //* |-> Schema y model {mongoose}
    import { Schema, model } from 'mongoose'
/**********/
//? -_ Definicion del schema de cartas
const cardsSchema: Schema = new Schema({
    name_card: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    type: {
        type: String,
        required: true
    }
})
/**********/
// TODO |-> Exportacion por defecto del schema
export default model('Cards', cardsSchema)