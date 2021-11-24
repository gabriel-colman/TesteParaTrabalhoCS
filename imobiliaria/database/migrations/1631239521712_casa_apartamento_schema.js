'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CasaApartamentoSchema extends Schema {
  up () {
    this.alter('casa_apartamento', (table) => {
      table
        .foreign("imovel_geral")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("id_imovel_geral")
        .inTable("imovel_geral")
    })
  }

  down () {
    this.drop('casa_apartamento')
  }
}

module.exports = CasaApartamentoSchema
