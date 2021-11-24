"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Pessoa extends Model {
  static get table() {
    return "pessoa";
  }

  static get primaryKey() {
    return "cpf";
  }

  proprietario() {
    return this.hasOne("App/Models/Pessoa", "cpf", "cpf_proprietario");
  }

  // Mesmo problema entre ImovelGeral e Endereco
  // https://github.com/adonisjs/lucid/issues/530
  enderecoRel() {
    return this.belongsTo("App/Models/Endereco", "endereco", "id_endereco");
  }

  imovel() {
    return this.belongsToMany(
      "App/Models/ImovelGeral",
      "cpf_proprietario",
      "imovel_geral",
      "cpf",
      "id_imovel_geral"
    ).pivotTable("imovel_proprietario");
  }

  cargo() {
    return this.belongsTo("App/Models/Cargo", "cargo", "id_cargo");
  }
}

module.exports = Pessoa;
