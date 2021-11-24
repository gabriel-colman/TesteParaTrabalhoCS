"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ContratoSchema extends Schema {
  up() {
    this.create("contrato", (table) => {
      table.increments("id_contrato").unsigned();
      table.integer("imovel_geral").notNullable();
      table.string("cpf_proprietario", 11).notNullable();
      table.string("cpf_cliente", 11).notNullable();
      table.integer("pagamento").notNullable();
      table.decimal("valor_final_aluguel", 10, 2).notNullable();
      table.decimal("valor_final_venda", 10, 2).notNullable();
      table.decimal("valor_condominio", 10, 2).notNullable();
      table.time("dt_venda").notNullable();
      table.time("dt_aluguel").notNullable();
      table.decimal("porcentagem", 5, 2).notNullable();
    });
  }

  down() {
    this.dropIfExists("contrato");
  }
}

module.exports = ContratoSchema;
