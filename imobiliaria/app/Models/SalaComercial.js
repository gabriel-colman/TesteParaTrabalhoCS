"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class SalaComercial extends Model {
  static get table() {
    return "sala_comercial";
  }

  static get primaryKey() {
    return "id_sala_comercial";
  }

  imovelGeral() {
    return this.belongsTo(
      "App/Models/ImovelGeral",
      "imovel_geral",
      "id_imovel_geral"
    );
  }
}

module.exports = SalaComercial;
