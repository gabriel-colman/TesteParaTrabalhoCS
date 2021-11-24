"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PessoaSchema extends Schema {
  up() {
    this.alter("pessoa", (table) => {
      table.timestamps();
    });
  }

  down() {
    this.alter("pessoa", (table) => {
      table.dropTimestamps();
    });
  }
}

module.exports = PessoaSchema;
