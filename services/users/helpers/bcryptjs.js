require('dotenv').config()

const bcrypt = require('bcryptjs')
const SALT = +process.env.SALT || 10

const hashPassword = (password) => {
  return bcrypt.hashSync(password, SALT)
}

const comparePassword = (password, hashed) => {
  return bcrypt.compareSync(password, hashed) //true or false
}

module.exports = { hashPassword, comparePassword }
