'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImovelGeralSchema extends Schema {
  up () {
    this.alter('imovel_geral', (table) => {
      table
        .foreign("endereco")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("cep")
        .inTable("endereco")
    })
  }

  down () {
    this.drop('imovel_geral')
  }
}

module.exports = ImovelGeralSchema
