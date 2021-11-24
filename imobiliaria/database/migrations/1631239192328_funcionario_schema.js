'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuncionarioSchema extends Schema {
  up () {
    this.alter('funcionario', (table) => {
      table
        .foreign("cpf_funcionario")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("cpf")
        .inTable("pessoa")

      table
        .foreign("cargo")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("id_cargo")
        .inTable("cargo")
    });
  }

  down () {
    this.drop('funcionario')
  }
}

module.exports = FuncionarioSchema
