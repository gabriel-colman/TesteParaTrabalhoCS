"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ImovelGeralSchema extends Schema {
  up() {
    this.alter("imovel_geral", (table) => {
      table.date("dt_reg_compra").notNullable();
      table.date("dt_reg_aluguel").notNullable();
      table.date("dt_construcao").notNullable();
    });
  }

  down() {
    this.alter("imovel_geral", (table) => {
      table.dropColumn("dt_reg_compra");
      table.dropColumn("dt_reg_aluguel");
      table.dropColumn("dt_construcao");
    });
  }
}

module.exports = ImovelGeralSchema;
