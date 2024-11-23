const express = require('express');
const Panier = require('../models/panier');
const Produit = require('../models/produit');
const router = express.Router();

router.post('/add-to-cart', async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      if (!userId || !productId || !quantity) {
        return res.status(400).send({ message: 'Missing required fields' });
      }
  
      let panier = await Panier.findOne({ username: userId });
  
      if (!panier) {
        panier = new Panier({ username: userId, items: [], total_cost: 0 });
      }
  
      const product = await Produit.findById(productId);
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }
  
      const itemIndex = panier.items.findIndex(item => item.product.toString() === productId);
  
      if (itemIndex > -1) {
        panier.items[itemIndex].quantity += quantity;
      } else {
        panier.items.push({ product: productId, quantity });
      }
  
      panier.total_cost = panier.items.reduce(
        (sum, item) => sum + item.quantity * product.price,
        0
      );
  
      await panier.save();
      res.status(200).send(panier);
    } catch (error) {
      console.error('Error in add-to-cart:', error.message);
      res.status(500).send({ message: 'Internal server error' });
    }
  });
  
  router.get('/get-cart/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      console.log('Fetching cart for userId:', userId); // Debugging
  
      const cart = await Panier.findOne({ username: userId }).populate('items.product');
  
      if (!cart) {
        console.warn('No cart found for userId:', userId); // Debugging
        return res.status(404).send({ message: 'Cart not found' });
      }
  
      res.status(200).send(cart);
    } catch (error) {
      console.error('Error in /get-cart:', error.message); // Log the error
      res.status(500).send({ message: 'Internal server error', error: error.message });
    }
  });
  
  router.delete('/remove-from-cart', async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      // Validate input
      if (!userId || !productId) {
        return res.status(400).send({ message: 'Invalid input data' });
      }
  
      // Fetch the user's cart
      const cart = await Panier.findOne({ username: userId });
      if (!cart) {
        return res.status(404).send({ message: 'Cart not found' });
      }
  
      // Remove the product from the cart
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
  
      // Recalculate the total cost
      cart.total_cost = cart.items.reduce((sum, item) => {
        const quantity = item.quantity || 0;
        const price = item.product?.price || 0;
        return sum + quantity * price;
      }, 0);
  
      await cart.save();
  
      // Return the updated cart
      const updatedCart = await Panier.findOne({ username: userId }).populate('items.product');
      res.status(200).send(updatedCart);
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
      res.status(500).send({ message: 'Internal server error', error: error.message });
    }
  });
  
  router.put('/update-cart', async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      // Validate input
      if (!userId || !productId || quantity < 1) {
        return res.status(400).send({ message: 'Invalid input data' });
      }
  
      // Fetch the user's cart and populate product details
      const cart = await Panier.findOne({ username: userId }).populate('items.product');
      if (!cart) {
        return res.status(404).send({ message: 'Cart not found' });
      }
  
      // Find the product in the cart
      const itemIndex = cart.items.findIndex((item) => item.product._id.toString() === productId);
      if (itemIndex === -1) {
        return res.status(404).send({ message: 'Product not found in cart' });
      }
  
      // Update the quantity
      cart.items[itemIndex].quantity = quantity;
  
      // Recalculate total cost
      cart.total_cost = cart.items.reduce((sum, item) => {
        const itemQuantity = item.quantity || 0;
        const itemPrice = item.product?.price || 0; // Default to 0 if price is missing
        return sum + itemQuantity * itemPrice;
      }, 0);
  
      // Save the updated cart
      await cart.save();
  
      // Return updated cart
      const updatedCart = await Panier.findOne({ username: userId }).populate('items.product');
      res.status(200).send(updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error.message);
      res.status(500).send({ message: 'Internal server error', error: error.message });
    }
  });
  
  
  
module.exports = router;
