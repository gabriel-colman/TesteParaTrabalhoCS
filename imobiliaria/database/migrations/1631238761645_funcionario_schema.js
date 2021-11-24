"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FuncionarioSchema extends Schema {
  up() {
    this.create("funcionario", (table) => {
      table.string("cpf_funcionario", 11).primary().notNullable();
      table.integer("cargo").notNullable();
      table.time("dt_ingresso").notNullable();
      table.decimal("salario", 10, 2).notNullable();
      table.string("senha", 255).notNullable();
      table.string("usuario", 255).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.dropIfExists("funcionario");
  }
}

module.exports = FuncionarioSchema;
