'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pagamento extends Model {
    static get table() {
        return "pagamento";
      }
    
      static get primaryKey() {
        return "id_pagamento";
      }
    
      contrato() {
        return this.hasMany("App/Models/Contrato", "id_pagamento", "pagamento");
      }
}

module.exports = Pagamento
