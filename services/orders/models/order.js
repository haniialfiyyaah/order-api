const mongoose = require('mongoose')

const Orders = new mongoose.Schema({
  order_id: { type: String, unique: true },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users',
    required: [true, 'Login first'],
  },
  product_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Products',
    required: [true, 'Product ID mandatory'],
  },
  amount: { type: Number, required: [true, 'Amount mandatory'] },
  status: { type: String, default: 'pending' },
})

Orders.method('toJSON', function () {
  const { _v, _id, ...object } = this.toObject()
  return object // hide _id
})

Orders.pre('save', function () {
  this.order_id = mongoose.Types.ObjectId(this._id)
})

module.exports = mongoose.model('Orders', Orders)
