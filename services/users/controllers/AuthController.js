const AuthService = require('../services/AuthService')
const { User } = require('../models')

class AuthController {
  static async register(req, res) {
    try {
      const authInstance = new AuthService(User)
      const newUser = await authInstance.register(req.body)
      res.status(201).json({
        message: 'Register success',
        data: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      })
    } catch (err) {
      res.status(err.errors ? 400 : 500).json({
        message: err?.message || 'Internal Server Error',
        errors: err?.errors,
      })
    }
  }

  static async login(req, res) {
    try {
      const authInstance = new AuthService(User)
      const user = await authInstance.login(req.body)
      res.status(200).json({
        message: 'Login success',
        data: user,
      })
    } catch (err) {
      res.status(err.errors ? 400 : 500).json({
        message: err?.message || 'Internal Server Error',
        errors: err?.errors,
      })
    }
  }
}

module.exports = AuthController
