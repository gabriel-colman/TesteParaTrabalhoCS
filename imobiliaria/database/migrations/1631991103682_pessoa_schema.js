"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PessoaSchema extends Schema {
  up() {
    this.alter("pessoa", (table) => {
      table.dropForeign("cpf_indicacao");
      table.dropForeign("cpf_fiador");
      table.dropColumn("cpf_indicacao");
      table.dropColumn("cpf_fiador");
    });
  }

  down() {
    this.alter("contrato", (table) => {
      table.string("cpf_indicacao", 11).notNullable();
      table
        .foreign("cpf_indicacao")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("cpf")
        .inTable("pessoa");

      table.string("cpf_fiador", 11).notNullable();
      table
        .foreign("cpf_fiador")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("cpf")
        .inTable("pessoa");
    });
  }
}

module.exports = PessoaSchema;
