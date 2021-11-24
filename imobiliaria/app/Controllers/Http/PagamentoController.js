"use strict";

const Pagamento = use("App/Models/Pagamento");

class PagamentoController {
  // Mostra todos os pagamentos feitos
  async index({ auth, response }) {
    if (!auth.user.is_funcionario) {
      return response.forbidden({
        status: "error",
        message: "Você não pode visualizar estes dados.",
      });
    }

    let pagamentos;
    try {
      pagamentos = await Pagamento.all();
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Um erro inesperado ocorreu.",
      });
    }

    return response.ok({
      status: "success",
      data: pagamentos,
    });
  }

  // Cria um pagamento
  async create({ auth, request, response }) {
    if (!auth.user.is_funcionario) {
      return response.forbidden({
        status: "error",
        message: "Você não pode visualizar estes dados.",
      });
    }

    const pagamentoData = request.only(["nome"]);

    let pagamento;
    try {
      pagamento = await Pagamento.create(pagamentoData);
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Um erro inesperado ocorreu.",
      });
    }

    return response.created({
      status: "success",
      data: pagamento,
    });
  }

  // Mostra um pagamento
  async show({ auth, params, response }) {
    if (!auth.user.is_funcionario) {
      return response.forbidden({
        status: "error",
        message: "Você não pode visualizar estes dados.",
      });
    }

    let pagamento;
    try {
      pagamento = await Pagamento.findOrFail(params.id);
    } catch (error) {
      console.log(error);
      return response.notFound({
        status: "error",
        message: "Pagamento não encontrado.",
      });
    }

    return response.ok({
      status: "success",
      data: pagamento,
    });
  }

  // Atualiza o pagamento
  async update({ auth, params, request, response }) {
    if (!auth.user.is_funcionario) {
      return response.forbidden({
        status: "error",
        message: "Você não pode visualizar estes dados.",
      });
    }

    let pagamento;
    try {
      pagamento = await Pagamento.findOrFail(params.id);
    } catch (error) {
      console.log(error);
      return response.notFound({
        status: "error",
        message: "Pagamento não encontrado.",
      });
    }

    pagamento.nome = request.input("nome");

    try {
      await pagamento.save();
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Um erro inesperado ocorreu.",
      });
    }

    return response.ok({
      status: "success",
      data: pagamento,
    });
  }

  // Apaga o pagamento
  async destroy({ auth, params, response }) {
    if (!auth.user.is_funcionario) {
      return response.forbidden({
        status: "error",
        message: "Você não pode apagar esta forma de pagamento.",
      });
    }

    let pagamento;
    try {
      pagamento = await Pagamento.findOrFail(params.id);
    } catch (error) {
      console.log(error);
      return response.notFound({
        status: "error",
        message: "Pagamento não encontrado.",
      });
    }

    try {
      await pagamento.load("contrato");
      const pessoas = pagamento.getRelated("contrato").toJSON();

      if (pessoas.length) {
        return response.forbidden({
          status: "error",
          message:
            "Há contratos cadastrados com o tipo de pagamento que você tentou apagar.",
        });
      }
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Um erro inesperado ocorreu.",
      });
    }

    try {
      await pagamento.delete();
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Um erro inesperado ocorreu.",
      });
    }

    return response.ok({
      status: "success",
      id: pagamento.id_pagamento,
    });
  }
}

module.exports = PagamentoController;
