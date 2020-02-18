'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ControlSchema extends Schema {
  up () {
    this.create('controls', (table) => {
      table.increments()
      table
        .integer('bankslip_id')
        .unsigned()
        .references('id')
        .inTable('bankslips')
        .notNullable()
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .notNullable()
      table.boolean('automatic')
      table.integer('status')
      table.boolean('ignored')
      table.timestamps()
    })
  }

  down () {
    this.drop('controls')
  }
}

module.exports = ControlSchema
