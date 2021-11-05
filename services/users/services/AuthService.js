const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')

class AuthService {
  constructor(userModel) {
    this.userModel = userModel
  }

  register(data) {
    const { name, email, password } = data
    return this.userModel.create({ name, email, password })
  }

  login(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, password } = data
        const user = await this.userModel.findOne({ email })

        if (user && comparePassword(password, user.password)) {
          const { _id, name, email } = user
          const access_token = generateToken({
            _id,
            name,
            email,
          })
          resolve({ _id, name, email, access_token })
        } else {
          throw new Error('Email or Password wrong')
        }
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = AuthService
