/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */
'use strict'
const User = use('App/Models/User')
const Wallet = use('App/Models/Wallet')
const Bankslip = use('App/Models/Bankslip')
const Appbankslip = use('App/Models/Appbankslip')
const Billing = use('App/Models/Billing')
const Category = use('App/Models/Category')
const Control = use('App/Models/Control')
const Invoice = use('App/Models/Invoice')

class IndexBuilder {
  async build ({ modelName, id, data, includes }) {
    let query = eval(modelName).query()
    if (id) {
      query = query.where('id', id)
    }

    for (const modelToInclude of Object.keys(includes)) {
      query = query.with(modelToInclude)
    }

    query = query.where(data)

    return query.fetch()
  }
}

module.exports = new IndexBuilder()
