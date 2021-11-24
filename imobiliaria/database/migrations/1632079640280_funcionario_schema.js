"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FuncionarioSchema extends Schema {
  up() {
    this.alter("funcionario", (table) => {
      table.dropColumn("dt_ingresso");
      table.dropTimestamps();
    });
  }

  down() {
    this.alter("funcionario", (table) => {
      table.time("dt_ingresso").notNullable();
      table.timestamps();
    });
  }
}

module.exports = FuncionarioSchema;
