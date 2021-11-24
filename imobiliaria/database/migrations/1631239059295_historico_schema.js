"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class HistoricoSchema extends Schema {
  up() {
    this.create("historico", (table) => {
      table.increments("id_historico").unsigned();
      table.string("status", 1).notNullable();
      table.string("categoria", 1).notNullable();
      table.decimal("valor_aluguel", 10, 2).notNullable();
      table.decimal("valor_venda", 10, 2).notNullable();
      table.decimal("valor_final_venda", 10, 2).notNullable();
      table.decimal("valor_final_aluguel", 10, 2).notNullable();
      table.decimal("valor_condominio", 10, 2).notNullable();
      table.time("dt_reg_compra").notNullable();
      table.time("dt_reg_aluguel").notNullable();
      table.time("dt_venda").notNullable();
      table.time("dt_aluguel").notNullable();
      table.integer("qtd_quartos").notNullable();
      table.integer("qtd_suites").notNullable();
      table.integer("qtd_salas_estar").notNullable();
      table.integer("qtd_salas_jantar").notNullable();
      table.integer("qtd_vagas_garagem").notNullable();
      table.boolean("possui_armario").notNullable();
      table.integer("qtd_comodos").notNullable();
      table.integer("qtd_banheiros").notNullable();
      table.integer("imovel_geral").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("historico");
  }
}

module.exports = HistoricoSchema;
