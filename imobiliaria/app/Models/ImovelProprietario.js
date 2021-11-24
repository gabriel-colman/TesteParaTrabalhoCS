"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ImovelProprietario extends Model {
  static get table() {
    return "imovel_proprietario";
  }

  static get primaryKey() {
    return "id_imovel_proprietario";
  }
}

module.exports = ImovelProprietario;
