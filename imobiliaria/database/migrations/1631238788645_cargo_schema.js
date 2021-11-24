"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CargoSchema extends Schema {
  up() {
    this.create("cargo", (table) => {
      table.increments("id_cargo").unsigned();
      table.string("nome", 255).notNullable();
      table.decimal("salario", 10, 2).notNullable();
    });
  }

  down() {
    this.dropIfExists("cargo");
  }
}

module.exports = CargoSchema;
