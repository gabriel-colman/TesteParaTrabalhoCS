'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImovelProprietarioSchema extends Schema {
  up () {
    this.alter('imovel_proprietario', (table) => {
      table
        .foreign("cpf_proprietario")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("cpf_proprietario")
        .inTable("pessoa")
      table
        .foreign("imovel_geral")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("id_imovel_geral")
        .inTable("imovel_geral")
    })
  }

  down () {
    this.drop('imovel_proprietario')
  }
}

module.exports = ImovelProprietarioSchema
