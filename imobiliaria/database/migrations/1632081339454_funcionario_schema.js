"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FuncionarioSchema extends Schema {
  up() {
    this.alter("funcionario", (table) => {
      table.integer("cargo").nullable().alter();
    });
  }

  down() {
    this.alter("funcionario", (table) => {
      table.integer("cargo").notNullable().alter();
    });
  }
}

module.exports = FuncionarioSchema;
