const mongoose = require('mongoose')

const Products = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name mandatory'],
    minLength: [2, 'At least 2 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Price mandatory'],
  },
  qty: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('Products', Products)
