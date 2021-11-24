"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Terreno extends Model {
  static get table() {
    return "terreno";
  }

  static get primaryKey() {
    return "id_terreno";
  }

  imovelGeral() {
    return this.belongsTo(
      "App/Models/ImovelGeral",
      "imovel_geral",
      "id_imovel_geral"
    );
  }
}

module.exports = Terreno;
