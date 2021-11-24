"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FuncionarioSchema extends Schema {
  up() {
    this.alter("funcionario", (table) => {
      table.dropColumn("salario");
    });
  }

  down() {
    this.alter("funcionario", (table) => {
      table.decimal("salario", 10, 2).notNullable();
    });
  }
}

module.exports = FuncionarioSchema;
