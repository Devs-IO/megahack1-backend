'use strict'

const IndexBuilder = use('App/Lib/IndexBuilder')

class WalletController {
  async index ({ request, params, auth }) {
    const data = request.only(['test123902'])
    const modelName = 'Wallet'
    const id = params.id
    const includes = request.only([
      'user'
    ])

    const loggedUser = await auth.getUser()
    data.user_id = loggedUser.id

    const query = await IndexBuilder.build({ modelName, id, data, includes })

    return query
  }
}

module.exports = WalletController
