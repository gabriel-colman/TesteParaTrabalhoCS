"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ApartamentoSchema extends Schema {
  up() {
    this.alter("apartamento", (table) => {
      table.increments("id_apartamento");
    });
  }

  down() {
    this.alter("apartamento", (table) => {
      table.dropPrimary();
      table.dropColumn("id_apartamento");
    });
  }
}

module.exports = ApartamentoSchema;
