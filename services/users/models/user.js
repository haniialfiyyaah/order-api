const mongoose = require('mongoose')
const { isEmail } = require('validator')
const { hashPassword } = require('../helpers/bcryptjs')

const Users = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name mandatory'],
    minLength: [2, 'At least 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email mandatory'],
    validate: [isEmail, 'invalid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password mandatory'],
    minLength: [6, 'password has to be at least 6 characters'],
  },
})

Users.pre('save', function (next) {
  this.password = hashPassword(this.password)
  next()
})

module.exports = mongoose.model('Users', Users)
