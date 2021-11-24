"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Login extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeCreate", "HashPassword.hashPassword");
    this.addHook("beforeUpdate", "HashPassword.hashPassword");
  }

  static get table() {
    return "login";
  }

  static get primaryKey() {
    return "cpf";
  }

  pessoa() {
    return this.hasOne("App/Models/Pessoa", "cpf", "cpf");
  }
}

module.exports = Login;
