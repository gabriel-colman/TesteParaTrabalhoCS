"use strict";

const Cargo = use("App/Models/Cargo");

class CargoController {
  // Mostra todos os cargos
  async index({ auth, response }) {
    if (!auth.user.is_funcionario) {
      return response.forbidden({
        status: "error",
        message: "Você não pode visualizar estes dados.",
      });
    }

    let cargos;
    try {
      cargos = await Cargo.all();
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Um erro inesperado ocorreu.",
      });
    }

    return response.ok({
      status: "success",
      data: cargos,
    });
  }

  // Cria um cargo
  async create({ auth, request, response }) {
    if (!auth.user.is_funcionario) {
      return response.forbidden({
        status: "error",
        message: "Você não pode criar um cargo.",
      });
    }

    const cargoData = request.only(["nome", "salario"]);
    let cargo;

    try {
      cargo = await Cargo.create(cargoData);
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Um erro inesperado ocorreu.",
      });
    }

    return response.created({
      status: "success",
      data: cargo,
    });
  }

  // Mostra um cargo
  async show({ auth, params, response }) {
    if (!auth.user.is_funcionario) {
      return response.forbidden({
        status: "error",
        message: "Você não pode visualizar este cargo.",
      });
    }

    let cargo;
    try {
      cargo = await Cargo.findOrFail(params.id);
    } catch (error) {
      console.log(error);
      return response.notFound({
        status: "error",
        message: "Cargo não encontrado.",
      });
    }

    return response.ok({
      status: "success",
      data: cargo,
    });
  }

  // Atualiza um cargo
  async update({ auth, params, request, response }) {
    if (!auth.user.is_funcionario) {
      return response.forbidden({
        status: "error",
        message: "Você não pode atualizar este cargo.",
      });
    }

    let cargo;
    try {
      cargo = await Cargo.findOrFail(params.id);
    } catch (error) {
      console.log(error);
      return response.notFound({
        status: "error",
        message: "Cargo não encontrado.",
      });
    }

    cargo.nome = request.input("nome");
    cargo.salario = request.input("salario");

    try {
      await cargo.save();
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Um erro inesperado ocorreu.",
      });
    }

    return response.ok({
      status: "success",
      data: cargo,
    });
  }

  // Apaga um cargo
  async destroy({ auth, params, response }) {
    if (!auth.user.is_funcionario) {
      return response.forbidden({
        status: "error",
        message: "Você não pode apagar este cargo.",
      });
    }

    let cargo;
    try {
      cargo = await Cargo.findOrFail(params.id);
    } catch (error) {
      console.log(error);
      return response.notFound({
        status: "error",
        message: "Cargo não encontrado.",
      });
    }

    try {
      await cargo.load("pessoa");
      const pessoas = cargo.getRelated("pessoa").toJSON();

      if (pessoas.length) {
        return response.forbidden({
          status: "error",
          message: "Há pessoas cadastradas no cargo que você tentou apagar.",
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
      await cargo.delete();
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Um erro inesperado ocorreu.",
      });
    }

    return response.ok({
      status: "success",
      id: cargo.id_cargo,
    });
  }
}

module.exports = CargoController;
