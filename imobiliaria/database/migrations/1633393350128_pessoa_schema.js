"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PessoaSchema extends Schema {
  up() {
    this.alter("pessoa", (table) => {
      table
        .integer("cargo")
        .nullable()
        .references("id_cargo")
        .inTable("cargo")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("profissao", 255).nullable().alter();
      table.unique("email");
    });
  }

  down() {
    this.alter("pessoa", (table) => {
      table.dropForeign("cargo");
      table.dropColumn("cargo");
      table.string("profissao", 255).notNullable().alter();
      table.dropUnique("email");
    });
  }
}

module.exports = PessoaSchema;
