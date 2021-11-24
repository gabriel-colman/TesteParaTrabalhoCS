"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SalaComercialSchema extends Schema {
  up() {
    this.create("sala_comercial", (table) => {
      table.increments("id_sala_comercial").unsigned();
      table.integer("qtd_comodos").notNullable();
      table.integer("qtd_banheiros").notNullable();
      table.integer("imovel_geral").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("sala_comercial");
  }
}

module.exports = SalaComercialSchema;
