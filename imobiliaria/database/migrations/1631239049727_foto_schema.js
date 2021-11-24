"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FotoSchema extends Schema {
  up() {
    this.create("foto", (table) => {
      table.increments("id_foto").unsigned();
      table.integer("imovel_geral").notNullable();
      table.string("nome_foto", 255).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("foto");
  }
}

module.exports = FotoSchema;
