"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FuncionarioSchema extends Schema {
  up() {
    this.alter("funcionario", (table) => {
      table.timestamps(false, true);
    });
  }

  down() {
    this.alter("funcionario", (table) => {
      table.dropTimestamps();
    });
  }
}

module.exports = FuncionarioSchema;
