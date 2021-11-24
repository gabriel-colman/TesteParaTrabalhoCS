"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PessoaSchema extends Schema {
  up() {
    this.create("pessoa", (table) => {
      table.string("cpf", 11).primary().unique().notNullable();
      table.string("endereco", 20).notNullable();
      table.string("nome", 255).notNullable();
      table.string("celular", 11).notNullable();
      table.string("telefone", 11).notNullable();
      table.string("email", 100).notNullable();
      table.string("sexo", 14).notNullable();
      table.string("estado_civil", 14).notNullable();
      table.string("profissao", 255).notNullable();
      table.string("cpf_indicacao", 11).notNullable();
      table.string("cpf_fiador", 11).notNullable();
      table.string("cpf_proprietario", 11).unique().notNullable();
    });
  }

  down() {
    this.dropIfExists("pessoa");
  }
}

module.exports = PessoaSchema;
