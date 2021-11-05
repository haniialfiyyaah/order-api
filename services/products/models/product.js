const mongoose = require('mongoose')

const Products = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
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

Products.method('toJSON', function () {
  const { _v, _id, ...object } = this.toObject()
  return object // hide _id
})

Products.pre('save', function () {
  this.id = mongoose.Types.ObjectId(this._id)
})

module.exports = mongoose.model('Products', Products)
