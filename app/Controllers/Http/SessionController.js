'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')

class SessionController {
  async store ({ request, response, auth }) {
    const data = request.only(['username', 'password'])
    data.email = data.username

    // validates all fields
    const fields = [
      { login: Yup.string().strict() },
      { email: Yup.string().strict() },
      { password: Yup.string().strict().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    const token = auth.attempt(data.email, data.password)

    return token
  }
}

module.exports = SessionController
