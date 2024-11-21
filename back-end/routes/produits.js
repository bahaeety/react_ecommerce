const express = require('express');
const router = express.Router();

const Product = require('../models/produit');
router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).send({ message: 'Error retrieving products', error });
    }
});
router.get('/featured', async (req, res) => {
    try {
        const featuredProducts = await Product.find().limit(4);
        res.status(200).send(featuredProducts);
    } catch (error) {
        console.error('Error retrieving featured products:', error);
        res.status(500).send({ message: 'Error retrieving featured products', error });
    }
});


module.exports = router;