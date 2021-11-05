const PaymentService = require('../services/PaymentService')
const { Payment } = require('../models')

class PaymentController {
  static async store(req, res) {
    try {
      const { order_id } = req.params
      const { amount } = req.body
      const access_token = req.headers?.authorization?.split('Bearer ')[1]

      const paymentInstance = new PaymentService(Payment)
      const newPayment = await paymentInstance.create(
        { order_id, amount },
        access_token
      )

      if (newPayment.error) throw new Error(newPayment.message)

      res.status(201).json({ message: 'Created', data: newPayment })
    } catch (err) {
      res.status(err.errors ? 400 : 500).json({
        message: err?.message || 'Internal Server Error',
        errors: err?.errors,
      })
    }
  }
}

module.exports = PaymentController
