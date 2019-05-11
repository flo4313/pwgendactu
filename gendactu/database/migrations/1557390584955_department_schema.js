'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartmentSchema extends Schema {
  up () {
    this.create('departments', (table) => {
      table.increments()
      table.integer('departmentId').notNullable().unique()
      table.string('departmentName', 80).notNullable().unique()
    })
  }

  down () {
    this.table('departments', (table) => {
      // reverse alternations
    })
  }
}

module.exports = DepartmentSchema
