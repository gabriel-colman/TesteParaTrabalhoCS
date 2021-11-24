'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImovelProprietarioSchema extends Schema {
  up() {
    this.alter("imovel_proprietario", (table) => {
      table.dropForeign("cpf", "imovel_proprietario_cpf_proprietario_foreign");
    });

    this.alter("imovel_proprietario", (table) => {
      table.dropForeign("imovel_geral", "imovel_proprietario_imovel_geral_foreign");
    });

    this.alter("imovel_proprietario", (table) => {
      table
        .string("cpf_proprietario", 11).nullable()
        .references("cpf")
        .inTable("pessoa")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .alter();
    });
    
    this.alter("imovel_proprietario", (table) => {
      table
        .integer("imovel_geral").nullable()
        .references("id_imovel_geral")
        .inTable("imovel_geral")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .alter();
    });
  }

  async down() {
    this.alter("imovel_proprietario", (table) => {
      table.dropForeign("cpf");
    });

    this.alter("imovel_proprietario", (table) => {
      table.dropForeign("imovel_geral");
    });

    this.alter("imovel_proprietario", (table) => {
      table
        .string("cpf_proprietario", 11).nullable()
        .references("cpf")
        .inTable("pessoa")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .alter();
    });
    
    this.alter("imovel_proprietario", (table) => {
      table
        .integer("imovel_geral").nullable()
        .references("id_imovel_geral")
        .inTable("imovel_geral")
        .onDelete("RESTRIC")
        .onUpdate("CASCADE")
        .alter();
    });
  }
}

module.exports = ImovelProprietarioSchema
