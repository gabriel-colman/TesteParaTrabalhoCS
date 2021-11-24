"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Apartamento extends Model {
  static get table() {
    return "apartamento";
  }

  // TODO: alterar isso
  static get primaryKey() {
    return "id_apartamento";
  }

  casaApartamento() {
    return this.belongsTo(
      "App/Models/CasaApartamento",
      "casa_ap",
      "id_casa_ap"
    );
  }
}

module.exports = Apartamento;
