"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PagamentoSchema extends Schema {
  up() {
    this.create("pagamento", (table) => {
      table.increments("id_pagamento").unsigned();
      table.string("nome", 255).notNullable();
    });
  }

  down() {
    this.dropIfExists("pagamento");
  }
}

module.exports = PagamentoSchema;
