"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ImovelGeral extends Model {
  static get table() {
    return "imovel_geral";
  }

  static get primaryKey() {
    return "id_imovel_geral";
  }

  apartamento() {
    return this.manyThrough(
      "App/Models/CasaApartamento",
      "apartamento",
      "id_imovel_geral",
      "imovel_geral"
    );
  }

  /*
  O Adonis prefere que a FK em um relacionamento 1:1 esteja na outra tabela.
  
  Mas como isso não acontece nessa modelagem, os relacionamentos precisam
  ser invertidos.
  */
  enderecoRel() {
    return this.belongsTo("App/Models/Endereco", "endereco", "id_endereco");
  }

  proprietario() {
    return this.belongsToMany(
      "App/Models/Pessoa",
      "imovel_geral",
      "cpf_proprietario",
      "id_imovel_geral",
      "cpf"
    ).pivotTable("imovel_proprietario");
  }

  foto() {
    return this.hasMany("App/Models/Foto", "id_imovel_geral", "imovel_geral");
  }

  salaComercial() {
    return this.hasOne(
      "App/Models/SalaComercial",
      "id_imovel_geral",
      "imovel_geral"
    );
  }

  casaApartamento() {
    return this.hasOne(
      "App/Models/CasaApartamento",
      "id_imovel_geral",
      "imovel_geral"
    );
  }

  terreno() {
    return this.hasOne("App/Models/Terreno", "id_imovel_geral", "imovel_geral");
  }

  contrato() {
    return this.hasMany(
      "App/Models/Contrato",
      "id_imovel_geral",
      "imovel_geral"
    );
  }

  historico() {
    return this.hasOne(
      "App/Models/Historico",
      "id_imovel_geral",
      "imovel_geral"
    );
  }
}

module.exports = ImovelGeral;
