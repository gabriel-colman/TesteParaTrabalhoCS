'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContratoSchema extends Schema {
  up () {
    this.alter('contrato', (table) => {
      table
        .foreign("imovel_geral")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("id_imovel_geral")
        .inTable("imovel_geral")

      table
        .foreign("cpf_proprietario")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("cpf_proprietario")
        .inTable("pessoa")

      table
        .foreign("cpf_cliente")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("cpf")
        .inTable("pessoa")

      table
        .foreign("pagamento")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("id_pagamento")
        .inTable("pagamento")
    })

  }

  down () {
    this.drop('contrato')
  }
}

module.exports = ContratoSchema
