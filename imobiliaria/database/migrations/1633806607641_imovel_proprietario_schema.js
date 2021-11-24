"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ImovelProprietarioSchema extends Schema {
  up() {
    this.alter("imovel_proprietario", (table) => {
      table.increments("id_imovel_proprietario");
      table.timestamps();
    });
  }

  down() {
    this.alter("imovel_proprietario", (table) => {
      table.dropTimestamps();
      table.dropPrimary();
    });

    this.alter("imovel_proprietario", (table) => {
      table.dropColumn("id_imovel_proprietario");
    });
  }
}

module.exports = ImovelProprietarioSchema;
