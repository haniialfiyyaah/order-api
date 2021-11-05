class ProductService {
  constructor(productModel) {
    this.productModel = productModel
  }

  create(data) {
    const { name, price, qty } = data
    return this.productModel.create({ name, price, qty })
  }

  getAll() {
    return this.productModel.find()
  }

  getById(id) {
    return this.productModel.findById(id)
  }

  update(id, data) {
    const { name, price, qty } = data
    return this.productModel.findByIdAndUpdate(id, { name, price, qty })
  }

  delete(id) {
    return this.productModel.findByIdAndDelete(id)
  }
}

module.exports = ProductService
