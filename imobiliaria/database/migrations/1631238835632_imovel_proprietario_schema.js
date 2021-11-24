"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ImovelProprietarioSchema extends Schema {
  up() {
    this.create("imovel_proprietario", (table) => {
      table.string("cpf_proprietario", 11).notNullable();
      table.integer("imovel_geral").unsigned();
    });
  }

  down() {
    this.dropIfExists("imovel_proprietario");
  }
}

module.exports = ImovelProprietarioSchema;
