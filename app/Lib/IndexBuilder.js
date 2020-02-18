/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */
'use strict'
const User = use('App/Models/User')

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
