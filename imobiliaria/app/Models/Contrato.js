'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contrato extends Model {
    static table () {
        return 'contrato';
    }
    
    static get primaryKey() {
        return "id_contrato";
    }
    

    imovelGeral() {
        return this.belongsTo("App/Models/ImovelGeral", "imovel_geral", "id_imovel_geral");
    }

    proprietario() {
        return this.belongsTo("App/Model/Pessoa", "cpf_proprietario", "cpf");
    }

    cliente() {
        return this.hasOne("App/Model/Pessoa", "cpf_cliente", "cpf");
    }
    
    pagamento() {
        return this.hasOne("App/Model/Pagamento", "pagamento", "id_pagamento")
    }
}

module.exports = Contrato
