"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TerrenoSchema extends Schema {
  up() {
    this.create("terreno", (table) => {
      table.increments("id_terreno").unsigned();
      table.string("nivel_terreno", 1).notNullable();
      table.decimal("largura", 5, 2).notNullable();
      table.decimal("comprimento", 5, 2).notNullable();
      table.integer("imovel_geral").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("terreno");
  }
}

module.exports = TerrenoSchema;
