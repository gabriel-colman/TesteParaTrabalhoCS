"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CasaApartamentoSchema extends Schema {
  up() {
    this.create("casa_apartamento", (table) => {
      table.increments("id_casa_ap").unsigned();
      table.integer("imovel_geral").notNullable();
      table.string("descricao", 255).notNullable();
      table.integer("qtd_quartos").notNullable();
      table.integer("qtd_suites").notNullable();
      table.integer("qtd_salas_estar").notNullable();
      table.integer("qtd_salas_jantar").notNullable();
      table.integer("qtd_vagas_garagem").notNullable();
      table.boolean("possui_armario").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("casa_apartamento");
  }
}

module.exports = CasaApartamentoSchema;
