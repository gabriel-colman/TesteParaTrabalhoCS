"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class CasaApartamento extends Model {
  static get table() {
    return "casa_apartamento";
  }

  static get primaryKey() {
    return "id_casa_ap";
  }

  imovelGeral() {
    return this.belongsTo(
      "App/Models/ImovelGeral",
      "imovel_geral",
      "id_imovel_geral"
    );
  }

  apartamento() {
    return this.hasOne("App/Models/Apartamento", "id_casa_ap", "casa_ap");
  }
}

module.exports = CasaApartamento;
