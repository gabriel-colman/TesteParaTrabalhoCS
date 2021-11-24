"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ImovelGeralSchema extends Schema {
  up() {
    this.create("imovel_geral", (table) => {
      table.increments("id_imovel_geral").unsigned();
      table.string("endereco", 20).notNullable();
      table.boolean("venda").notNullable();
      table.boolean("locacao").notNullable();
      table.string("status", 1).notNullable();
      table.string("categoria", 1).notNullable();
      table.integer("area").notNullable();
      table.time("dt_reg_compra").notNullable();
      table.time("dt_reg_aluguel").notNullable();
      table.time("dt_construcao").notNullable();
      table.decimal("valor_aluguel", 10, 2).notNullable();
      table.decimal("valor_venda", 10, 2).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("imovel_geral");
  }
}

module.exports = ImovelGeralSchema;
