"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ApartamentoSchema extends Schema {
  up() {
    this.alter("apartamento", (table) => {
      table.dropPrimary();
      table.dropColumn("numero_ap");
      // table.increments("id_apartamento");
    });
  }

  down() {
    this.alter("apartamento", (table) => {
      table.string("numero_ap", 50).primary();
    });
  }
}

module.exports = ApartamentoSchema;
