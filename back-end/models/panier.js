const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const panierSchema = new Schema({
  username: { type: Schema.Types.ObjectId, ref: 'User' }, // Ensure this matches the User schema
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Produit' }, // Ensure this matches the Product schema
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  total_cost: { type: Number }
});

module.exports = mongoose.model('Panier', panierSchema);
