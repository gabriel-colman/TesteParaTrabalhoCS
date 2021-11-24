"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ApartamentoSchema extends Schema {
  up() {
    this.create("apartamento", (table) => {
      table.string("numero_ap", 50).primary();
      table.integer("casa_ap").notNullable();
      table.integer("andar").notNullable();
      table.decimal("valor_condominio", 10, 2).notNullable();
      table.boolean("possui_portaria").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("apartamento");
  }
}

module.exports = ApartamentoSchema;
