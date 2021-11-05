const OrderService = require('../services/OrderService')
const { Order } = require('../models')

class OrderController {
  static async store(req, res) {
    try {
      const access_token = req.headers.authorization.split('Bearer ')[1]

      const orderInstance = new OrderService(Order)
      const newOrder = await orderInstance.create(req.body, access_token)

      if (newOrder.error) throw new Error(newOrder.message)

      res.status(201).json({ message: 'Created', data: newOrder })
    } catch (err) {
      res.status(err.errors ? 400 : 500).json({
        message: err?.message || 'Internal Server Error',
        errors: err?.errors,
      })
    }
  }
}

module.exports = OrderController
