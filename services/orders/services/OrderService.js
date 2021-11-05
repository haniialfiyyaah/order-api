const { verifyToken } = require('../helpers/jwt')
const axios = require('axios')

const PRODUCT_URL = process.env.PRODUCT_URL

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel
  }

  async create(data, access_token) {
    const { _id: user_id } = verifyToken(access_token)
    const { product_id, amount, status } = data

    // check qty
    const { data: product } = await axios.get(`${PRODUCT_URL}/${product_id}`)
    if (product.data?.qty < amount) return { error: true, message: 'Low stock' }

    // order
    const order = this.orderModel.create({
      user_id,
      product_id,
      amount,
      status,
    })

    // update qty
    try {
      const { data: updateQty } = await axios.put(
        `${PRODUCT_URL}/${product_id}`,
        { qty: product.data?.qty - amount }
      )
    } catch (err) {
      return { error: true, ...err }
    }

    return order
  }

  getById(id) {
    return this.orderModel.findById(id)
  }

  updateStatus(id, data) {
    const { status } = data
    return this.orderModel.findByIdAndUpdate(id, { status })
  }
}

module.exports = OrderService
