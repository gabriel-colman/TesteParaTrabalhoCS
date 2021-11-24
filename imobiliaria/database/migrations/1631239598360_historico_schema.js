'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistoricoSchema extends Schema {
  up () {
    this.alter('historico', (table) => {
      table
        .foreign("imovel_geral")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("id_imovel_geral")
        .inTable("imovel_geral")
    })
  }

  down () {
    this.drop('historico')
  }
}

module.exports = HistoricoSchema
