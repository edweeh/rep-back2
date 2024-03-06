const express = require('express');
const CartModel = require('../model/Cart');
const petmodel = require('../model/Pet');
const app = express.Router();


app.use(express.json());

// Route to get all items in the cart
app.get('/cart', async (req, res) => {
    try {
      // Find all documents in CartModel
      const cartItems = await CartModel.find();
  
      // Extract all Petcode values from the cartItems
      const petcodes = cartItems.map(cartItem => cartItem.Petcode);
  
      // Find all pets with the extracted Petcode values
      const petsInCart = await petmodel.find({ Petcode: { $in: petcodes } });
  
      res.status(200).json({ cartItems, petsInCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Route to add an item to the cart
app.post('/addcart', async (req, res) => {
  try {
    const { Petcode } = req.body;

    // Save the item to the MongoDB database
    const newItem = new CartModel({ Petcode });
    await newItem.save();

    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/count', async (req, res) => {
    try {
      // Get the count of items in the cart
      const itemCount = await CartModel.countDocuments();
  
      res.status(200).json({ itemCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = app;
