"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoginSchema extends Schema {
  up() {
    this.alter("login", (table) => {
      table.boolean("is_funcionario").nullable();
    });
  }

  down() {
    this.alter("login", (table) => {
      table.dropColumn("is_funcionario");
    });
  }
}

module.exports = LoginSchema;
