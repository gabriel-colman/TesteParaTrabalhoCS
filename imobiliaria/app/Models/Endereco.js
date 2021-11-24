"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Endereco extends Model {
  static get table() {
    return "endereco";
  }

  static get primaryKey() {
    return "id_endereco";
  }

  // Veja ImovelGeral para saber o motivo de se usar hasOne ao invés de belongsTo.
  imovelGeral() {
    return this.hasOne("App/Models/ImovelGeral", "id_endereco", "endereco");
  }
}

module.exports = Endereco;
