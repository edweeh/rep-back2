const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  Petcode: {
    type: String,
    unique: true, // Set the unique option to true
  },
});

const CartModel = mongoose.model("Carts", CartItemSchema);
module.exports = CartModel;
