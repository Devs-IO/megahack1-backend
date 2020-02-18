'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BankslipSchema extends Schema {
  up () {
    this.create('bankslips', (table) => {
      table.increments()
      table.bigInteger('barcode')
      table.string('recipient')
      table.string('expire_date')
      table.integer('value')
      table.timestamps()
    })
  }

  down () {
    this.drop('bankslips')
  }
}

module.exports = BankslipSchema
