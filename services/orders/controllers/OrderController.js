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

  static async show(req, res) {
    try {
      const orderInstance = new OrderService(Order)
      const order = await orderInstance.getById(req.params.id)
      res.status(200).json({ message: 'Listed.', data: order })
    } catch (err) {
      res.status(err.errors ? 400 : 500).json({
        message: err?.message || 'Internal Server Error',
        errors: err?.errors,
      })
    }
  }

  static async update(req, res) {
    try {
      const orderInstance = new OrderService(Order)
      const order = await orderInstance.updateStatus(req.params.id, req.body)
      if (!order) return res.status(404).json({ message: 'Order not found' })
      const data = await orderInstance.getById(order._id)
      res.status(200).json({ message: 'Updated.', data })
    } catch (err) {
      res.status(err.errors ? 400 : 500).json({
        message: err?.message || 'Internal Server Error',
        errors: err?.errors,
      })
    }
  }
}

module.exports = OrderController
