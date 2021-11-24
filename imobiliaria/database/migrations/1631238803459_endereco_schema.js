"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EnderecoSchema extends Schema {
  up() {
    this.create("endereco", (table) => {
      table.string("cep", 20).primary();
      table.string("rua", 255).notNullable();
      table.string("bairro", 255).notNullable();
      table.string("numero", 255).notNullable();
      table.string("cidade", 255).notNullable();
      table.string("estado", 255).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("endereco");
  }
}

module.exports = EnderecoSchema;
