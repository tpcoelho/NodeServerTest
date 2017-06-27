var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EventoSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    local: {
        type: String,
        required: true
    },
    dt_inicio: {
        type: Date,
        required: true
    },
    dt_fim: {
        type: Date
    },
    preco: {
        masc: Number, 
        fem: Number
    },
    terminado: Boolean

});

module.exports = mongoose.model('Evento', EventoSchema);