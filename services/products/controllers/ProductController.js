const ProductService = require('../services/ProductService')
const { Product } = require('../models')

class ProductController {
  static async store(req, res) {
    try {
      const productInstance = new ProductService(Product)
      const newProduct = await productInstance.create(req.body)
      res.status(201).json({ message: 'Created', data: newProduct })
    } catch (err) {
      res.status(err.errors ? 400 : 500).json({
        message: err?.message || 'Internal Server Error',
        errors: err?.errors,
      })
    }
  }

  static async index(req, res) {
    try {
      const productInstance = new ProductService(Product)
      const products = await productInstance.getAll()
      res.status(200).json({ message: 'Listed.', data: products })
    } catch (err) {
      res.status(err.errors ? 400 : 500).json({
        message: err?.message || 'Internal Server Error',
        errors: err?.errors,
      })
    }
  }

  static async show(req, res) {
    try {
      const productInstance = new ProductService(Product)
      const product = await productInstance.getById(req.params.id)
      res.status(200).json({ message: 'Listed.', data: product })
    } catch (err) {
      res.status(err.errors ? 400 : 500).json({
        message: err?.message || 'Internal Server Error',
        errors: err?.errors,
      })
    }
  }

  static async update(req, res) {
    try {
      const productInstance = new ProductService(Product)
      const product = await productInstance.update(req.params.id, req.body)
      if (!product)
        return res.status(404).json({ message: 'Product not found' })
      const data = await productInstance.getById(product.id)
      res.status(200).json({ message: 'Updated.', data })
    } catch (err) {
      res.status(err.errors ? 400 : 500).json({
        message: err?.message || 'Internal Server Error',
        errors: err?.errors,
      })
    }
  }

  static async destroy(req, res) {
    try {
      const productInstance = new ProductService(Product)
      const product = await productInstance.delete(req.params.id)
      if (!product)
        return res.status(404).json({ message: 'Product not found' })
      res.status(200).json({ message: 'Deleted.', data: product })
    } catch (err) {
      res.status(err.errors ? 400 : 500).json({
        message: err?.message || 'Internal Server Error',
        errors: err?.errors,
      })
    }
  }
}

module.exports = ProductController
