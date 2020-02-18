'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const User = use('App/Models/User')
const IndexBuilder = use('App/Lib/IndexBuilder')

class UserController {
  async index ({ request, params, auth }) {
    const data = request.only([
      'login'
    ])
    const modelName = 'User'
    const id = params.id
    const includes = request.only([
      'wallet'
    ])

    // check if it is the correct user

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }

  async store ({ request, response }) {
    const data = request.only([
      'login',
      'password'
    ])
    data.email = data.login

    // validate all fields
    const fields = [
      { login: Yup.string().strict().required() },
      { email: Yup.string().strict().required() },
      { password: Yup.string().strict().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    const checkIfLoginExists = await User.findBy('login', data.login)
    if (checkIfLoginExists) {
      return response.status(409).json({
        success: false,
        fields: ['login'],
        message: 'Already exists'
      })
    }

    // create and return
    const user = await User.create(data)
    return user
  }
}

module.exports = UserController
