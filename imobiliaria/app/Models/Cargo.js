"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Cargo extends Model {
  static get table() {
    return "cargo";
  }

  static get primaryKey() {
    return "id_cargo";
  }

  pessoa() {
    return this.hasMany("App/Models/Pessoa", "id_cargo", "cargo");
  }
}

module.exports = Cargo;
