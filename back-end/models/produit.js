const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const produit = Schema({
    name: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('Produit', produit);