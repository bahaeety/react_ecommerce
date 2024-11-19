const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var panier = Schema({
    username: {type: Schema.Types.ObjectId, ref: 'User'},
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true, min: 1 }
      }],  
    total_cost: {type: Number}
});
module.exports = mongoose.model('Panier', panier);