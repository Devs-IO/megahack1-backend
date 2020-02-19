'use strict'

const Yup = require('yup')
const FieldsValidator = use('App/Lib/FieldsValidator')
const User = use('App/Models/User')
const IndexBuilder = use('App/Lib/IndexBuilder')

class UserController {
  async index ({ request, params }) {
    const data = request.only([
      'username'
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
      'username',
      'password'
    ])
    data.email = data.username

    // validate all fields
    const fields = [
      { username: Yup.string().strict().required() },
      { email: Yup.string().strict().required() },
      { password: Yup.string().strict().required() }
    ]

    const validation = await FieldsValidator.validate({ fields, data, response })
    if (validation !== true) {
      return validation
    }

    // check if already exists
    const checkIfLoginExists = await User.findBy('username', data.username)
    if (checkIfLoginExists) {
      return response.status(409).json({
        success: false,
        fields: ['username'],
        message: 'Already exists'
      })
    }

    // create and return
    const user = await User.create(data)

    // // setup to supply the MVP
    // create wallet
    const Wallet = use('App/Models/Wallet')
    Wallet.create({ user_id: user.id, money: 1500 })

    // create wallet
    const Bankslip = use('App/Models/Bankslip')
    const bankslip1 = await Bankslip.create({
      barcode: 12309852098 + user.id,
      recipient: 'Sabesp',
      expire_date: '26-02-2020',
      value: 4990
    })
    const bankslip2 = await Bankslip.create({
      barcode: 90309832098 + user.id,
      recipient: 'Tim',
      expire_date: '26-02-2020',
      value: 11299
    })
    const bankslip3 = await Bankslip.create({
      barcode: 17309832098 + user.id,
      recipient: 'Amazon',
      expire_date: '26-02-2020',
      value: 67190
    })

    // create control
    const Control = use('App/Models/Control')
    Control.create({
      bankslip_id: bankslip1.id,
      category_id: 1,
      automatic: false,
      status: 1,
      ignored: false
    })
    Control.create({
      bankslip_id: bankslip2.id,
      category_id: 2,
      automatic: false,
      status: 1,
      ignored: false
    })
    Control.create({
      bankslip_id: bankslip2.id,
      category_id: 3,
      automatic: false,
      status: 1,
      ignored: false
    })

    // create wallet
    Wallet.create({ user_id: user.id, money: 1500 })

    return user
  }
}

module.exports = UserController
