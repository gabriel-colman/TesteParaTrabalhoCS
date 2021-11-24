"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Historico extends Model {
  static get table() {
    return "historico";
  }

  imovelGeral() {
    return this.belongsTo(
      "App/Models/ImovelGeral",
      "imovel_geral",
      "id_imovel_geral"
    );
  }
}

module.exports = Historico;
