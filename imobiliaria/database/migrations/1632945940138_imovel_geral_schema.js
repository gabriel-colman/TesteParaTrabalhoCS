"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ImovelGeralSchema extends Schema {
  up() {
    this.alter("imovel_geral", (table) => {
      table.dropColumn("dt_reg_compra");
      table.dropColumn("dt_reg_aluguel");
      table.dropColumn("dt_construcao");
    });
  }

  down() {
    this.alter("imovel_geral", (table) => {
      table.time("dt_reg_compra").notNullable();
      table.time("dt_reg_aluguel").notNullable();
      table.time("dt_construcao").notNullable();
    });
  }
}

module.exports = ImovelGeralSchema;
