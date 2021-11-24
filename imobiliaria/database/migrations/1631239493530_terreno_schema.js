'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TerrenoSchema extends Schema {
  up () {
    this.alter('terreno', (table) => {
      table
        .foreign("imovel_geral")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("id_imovel_geral")
        .inTable("imovel_geral")
    })
  }

  down () {
    this.drop('terreno')
  }
}

module.exports = TerrenoSchema
