'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserbankslipSchema extends Schema {
  up () {
    this.create('userbankslips', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('userbankslips')
  }
}

module.exports = UserbankslipSchema
