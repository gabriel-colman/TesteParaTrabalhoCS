"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FuncionarioSchema extends Schema {
  up() {
    this.alter("funcionario", (table) => {
      table.dropForeign("cargo");
      table.renameColumn("cpf_funcionario", "cpf");
      table.unique("usuario");
    });
  }

  down() {
    this.alter("funcionario", (table) => {
      table
        .foreign("cargo")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .references("id_cargo")
        .inTable("cargo");
      table.renameColumn("cpf", "cpf_funcionario");
      table.dropUnique("usuario");
    });
  }
}

module.exports = FuncionarioSchema;
