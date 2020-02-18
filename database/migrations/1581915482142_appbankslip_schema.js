'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppbankslipSchema extends Schema {
  up () {
    this.create('appbankslips', (table) => {
      table.increments()
      table.bigInteger('barcode')
      table.string('recipient')
      table.string('expire_date')
      table.integer('value')
      table.timestamps()
    })
  }

  down () {
    this.drop('appbankslips')
  }
}

module.exports = AppbankslipSchema
