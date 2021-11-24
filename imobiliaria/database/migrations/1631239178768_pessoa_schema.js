'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PessoaSchema extends Schema {
  up () {
   this.alter("pessoa", (table) => {
    table
      .foreign("cpf_proprietario")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE")
      .references("cpf")
      .inTable("pessoa")

    table
      .foreign("cpf_indicacao")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE")
      .references("cpf")
      .inTable("pessoa")

    table
      .foreign("cpf_fiador")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE")
      .references("cpf")
      .inTable("pessoa")

    table
      .foreign("endereco")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE")
      .references("cep")
      .inTable("endereco")
   });
  }

  down () {
    this.drop('pessoa')
  }
}

module.exports = PessoaSchema
