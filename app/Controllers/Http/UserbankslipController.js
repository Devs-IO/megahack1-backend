'use strict'

// const Yup = require('yup')
// const FieldsValidator = use('App/Lib/FieldsValidator')
// const Userbankslip = use('App/Models/Userbankslip')
const IndexBuilder = use('App/Lib/IndexBuilder')

class UserbankslipController {
  async index ({ request, params }) {
    const data = request.only([
      'user_id'
    ])
    const modelName = 'Userbankslip'
    const id = params.id
    const includes = request.only([
      'bankslip'
    ])

    // check if it is the correct user

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }
}

module.exports = UserbankslipController
