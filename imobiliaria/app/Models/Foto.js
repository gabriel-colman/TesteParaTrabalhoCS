"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Foto extends Model {
  static get table() {
    return "foto";
  }

  imovelGeral() {
    return this.belongsTo(
      "App/Models/ImovelGeral",
      "imovel_geral",
      "id_imovel_geral"
    );
  }
}

module.exports = Foto;
