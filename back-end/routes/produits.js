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

// Add a new product
router.post('/', async (req, res) => {
    const produit = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category,
    });
    try {
        const newProduit = await produit.save();
        res.status(201).json(newProduit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a product
router.put('/:id', async (req, res) => {
    try {
        const updatedProduit = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedProduit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;