'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BillingSchema extends Schema {
  up () {
    this.create('billings', (table) => {
      table.increments()
      table.string('expire_date')
      table.string('payer')
      table.string('recipient')
      table.integer('value')
      table.timestamps()
    })
  }

  down () {
    this.drop('billings')
  }
}

module.exports = BillingSchema
