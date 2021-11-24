'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoginSchema extends Schema {
  up() {
    this.alter("login", (table) => {
      table.dropForeign("cpf", "funcionario_cpf_funcionario_foreign");
    });

    this.alter("login", (table) => {
      table.dropPrimary("funcionario_pkey");
    });

    this.alter("login", (table) => {
      table
        .string("cpf", 11).nullable()
        .references("cpf")
        .inTable("pessoa").primary()
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .alter();
    });
  }

  async down() {
    this.alter("login", (table) => {
      table.dropForeign("cpf");
    });

    this.alter("login", (table) => {
      table.dropPrimary("cpf");
    });

    this.alter("login", (table) => {
      table
        .string("cpf", 11).nullable()
        .references("cpf")
        .inTable("pessoa").primary()
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .alter();
    });
  }
}

module.exports = LoginSchema
