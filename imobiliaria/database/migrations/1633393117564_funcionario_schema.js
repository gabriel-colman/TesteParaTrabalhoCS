"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FuncionarioSchema extends Schema {
  up() {
    this.alter("funcionario", (table) => {
      table.dropColumn("cargo");
    });
    this.renameTable("funcionario", "login");
  }

  down() {
    this.alter("login", (table) => {
      table.integer("cargo").nullable();
    });
    this.renameTable("login", "funcionario");
  }
}

module.exports = FuncionarioSchema;
