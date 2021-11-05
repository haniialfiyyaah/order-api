require('dotenv').config()

const jwt = require('jsonwebtoken')

const generateToken = (obj) => {
  return jwt.sign(obj, process.env.SECRET)
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET)
}

module.exports = { generateToken, verifyToken }
