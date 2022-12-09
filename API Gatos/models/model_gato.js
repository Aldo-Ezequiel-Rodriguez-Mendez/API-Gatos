const mongoose = require("mongoose"); //import mongoose

// GatoSchema esquema (schema)
const GatoSchema = new mongoose.Schema({
    id: {type:String, required:true},
    nombre: String,
    color: String,
    comentarios : [{
        comentario: String
        }]
},{
    versionKey: false // Quitamos esto que no es necesario
});

const Gato = mongoose.model('Gato', GatoSchema); //convert to model named Gato
module.exports = Gato; //export for controller use
