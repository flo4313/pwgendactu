'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ThemeSchema extends Schema {
  up () {
    this.create('themes', (table) => {
      table.increments()
      table.integer('themeId').notNullable().unique()
      table.string('description', 100).notNullable().unique()
    })
  }

  down () {
    this.table('themes', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ThemeSchema
