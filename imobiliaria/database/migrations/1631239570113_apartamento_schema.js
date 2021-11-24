"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ApartamentoSchema extends Schema {
  up() {
    this.alter("apartamento", (table) => {
      table
        .foreign("casa_ap")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("id_casa_ap")
        .inTable("casa_apartamento");
    });
  }

  down() {
    this.drop("apartamento");
  }
}

module.exports = ApartamentoSchema;
