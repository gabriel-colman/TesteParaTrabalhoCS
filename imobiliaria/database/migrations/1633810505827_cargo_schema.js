"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CargoSchema extends Schema {
  up() {
    this.alter("cargo", (table) => {
      table.timestamps();
    });
  }

  down() {
    this.alter("cargo", (table) => {
      table.dropTimestamps();
    });
  }
}

module.exports = CargoSchema;
