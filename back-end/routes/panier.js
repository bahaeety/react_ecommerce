const express = require('express');
const Panier = require('../models/panier');
const Product = require('../models/produit');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let panier = await Panier.findOne({ username: userId });
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        if (!panier) {
            panier = new Panier({
                username: userId,
                items: [],
                total_cost: 0,
            });
        }

        const existingItem = panier.items.find((item) => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            panier.items.push({ product: productId, quantity });
        }

        panier.total_cost = panier.items.reduce((total, item) => {
            const itemProduct = item.product.equals(productId) ? product : item.product;
            return total + item.quantity * (itemProduct.price || 0);
        }, 0);

        await panier.save();
        res.status(200).send({ message: 'Product added to cart', panier });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send({ message: 'Error adding to cart', error });
    }
});

module.exports = router;
