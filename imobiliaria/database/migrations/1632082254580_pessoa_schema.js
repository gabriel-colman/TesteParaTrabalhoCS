"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PessoaSchema extends Schema {
  up() {
    this.alter("pessoa", (table) => {
      table.string("cpf_proprietario", 11).nullable().alter();
    });
  }

  down() {
    this.alter("pessoa", (table) => {
      table.string("cpf_proprietario", 11).notNullable().alter();
    });
  }
}

module.exports = PessoaSchema;
