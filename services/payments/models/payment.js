const mongoose = require('mongoose')

const Payment = new mongoose.Schema({
  order_id: { type: mongoose.Schema.ObjectId, ref: 'Payment', unique: true },
  // status: { type: String, default: 'paid' },
  amount: { type: Number, required: [true, 'Amount mandatory'] }, // jumlah bayar
})

module.exports = mongoose.model('Payment', Payment)
