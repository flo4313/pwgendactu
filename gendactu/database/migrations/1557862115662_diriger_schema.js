'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DirigerSchema extends Schema {
  up () {
    this.create('dirigers', (table) => {
      table.increments()
      table.string('chef').references('nigend').inTable('users').notNullable().unique()
      table.integer('gendarmerie').references('gendarmerieId').inTable('gendarmeries').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('dirigers')
  }
}

module.exports = DirigerSchema
