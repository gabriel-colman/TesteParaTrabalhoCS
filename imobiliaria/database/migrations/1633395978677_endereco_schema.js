"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EnderecoSchema extends Schema {
  up() {
    this.alter("pessoa", (table) => {
      table.dropForeign("endereco");
    });

    this.alter("imovel_geral", (table) => {
      table.dropForeign("endereco");
    });

    this.alter("endereco", (table) => {
      table.dropPrimary();
    });

    this.alter("endereco", (table) => {
      table.increments("id_endereco");
    });

    this.alter("pessoa", (table) => {
      table
        .integer("endereco")
        .notNullable()
        .references("id_endereco")
        .inTable("endereco")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .alter();
    });

    this.alter("imovel_geral", (table) => {
      table
        .integer("endereco")
        .notNullable()
        .references("id_endereco")
        .inTable("endereco")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .alter();
    });
  }

  async down() {
    this.alter("pessoa", (table) => {
      table.dropForeign("endereco");
    });

    this.alter("imovel_geral", (table) => {
      table.dropForeign("endereco");
    });

    this.alter("endereco", (table) => {
      table.dropPrimary();
    });

    this.alter("endereco", (table) => {
      table.primary("cep");
    });

    this.alter("pessoa", (table) => {
      table
        .string("endereco", 20)
        .notNullable()
        .references("cep")
        .inTable("endereco")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .alter();
    });

    this.alter("imovel_geral", (table) => {
      table
        .string("endereco", 20)
        .notNullable()
        .references("cep")
        .inTable("endereco")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .alter();
    });
  }
}

module.exports = EnderecoSchema;
