'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GendarmerieSchema extends Schema {
  up () {
    this.create('gendarmeries', (table) => {
      table.increments()
      table.integer('gendarmerieId').notNullable().unique()
      table.string('gendarmerieName', 255).notNullable()
      table.string('street', 80).notNullable()
      table.string('city', 80).notNullable()
      table.integer('postalCode').notNullable()
      table.integer('phoneNumber').notNullable()
      table.string('chef').references('nigend').inTable('users').notNullable()
      table.integer('department').references('departmentId').inTable('departments').notNullable()
    })
  }

  down () {
    this.table('gendarmeries', (table) => {
      // reverse alternations
    })
  }
}

module.exports = GendarmerieSchema
