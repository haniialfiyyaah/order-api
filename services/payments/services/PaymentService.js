const { verifyToken } = require('../helpers/jwt')
const axios = require('axios')

const PRODUCT_URL = process.env.PRODUCT_URL
const ORDER_URL = process.env.ORDER_URL

class PaymentService {
  constructor(paymentModel) {
    this.paymentModel = paymentModel
  }

  async create(data, access_token) {
    const { order_id, amount } = data
    if (!amount || !order_id)
      return {
        error: true,
        message: 'Amount or order_id mandatory',
        errors: { amount: { message: 'Amount mandatory' } },
      }
    // get order
    const { data: order } = await axios.get(`${ORDER_URL}/${order_id}`)
    const { data: product } = await axios.get(
      `${PRODUCT_URL}/${order.data?.product_id}`
    )
    const total = order.data?.amount * product.data?.price

    // check amount >= amountBuy*price
    if (amount < total) return { error: true, message: 'Less payment amount' }

    // payment
    const payment = this.paymentModel.create({ order_id, amount })
    await axios.put(`${ORDER_URL}/${order_id}`, { status: 'paid' })

    return payment
  }
}

module.exports = PaymentService
