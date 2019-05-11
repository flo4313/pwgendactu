'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TopicSchema extends Schema {
  up () {
    this.create('topics', (table) => {
      table.increments()
      table.integer('topicId').notNullable().unique()
      table.string('title', 255).notNullable()
      table.string('image', 255)
      table.string('description', 1024).notNullable()
      table.integer('author').references('gendarmerieId').inTable('gendarmeries').notNullable()
      table.integer('theme').references('themeId').inTable('themes').notNullable()
    })
  }

  down () {
    this.table('topics', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TopicSchema
