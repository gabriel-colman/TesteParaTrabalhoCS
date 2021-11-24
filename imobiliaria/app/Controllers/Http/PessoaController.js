"use strict";

const Pessoa = use("App/Models/Pessoa");
const Login = use("App/Models/Login");
const Endereco = use("App/Models/Endereco");

class PessoaController {
  async index({ auth, response }) {
    const login = await auth.getUser();

    if (login.is_funcionario) {
      const users = await Pessoa.all();

      return response.ok({
        status: "success",
        data: users,
      });
    } else {
      return response.forbidden({
        status: "error",
        message: "Você não pode acessar essas informações.",
      });
    }
  }

  async login({ request, response, auth }) {
    try {
      const token = await auth.attempt(
        request.input("usuario"),
        request.input("senha")
      );

      return response.ok({
        status: "success",
        data: token,
      });
    } catch (error) {
      console.log(error);
      return response.notFound({
        status: "error",
        message: "Usuário ou senha inválidos.",
      });
    }
  }

  // para testes
  // {
  //   "usuario": "aaa",
  //   "senha": "123",
  //   "cep": "02345-123",
  //   "rua": "rua",
  //   "bairro": "bairro",
  //   "numero": "1",
  //   "cidade": "cidade",
  //   "estado": "estado",
  //   "cpf": "12345678900",
  //   "nome": "aaa",
  //   "celular": "00123451234",
  //   "telefone": "0012341234",
  //   "email": "email@example.com",
  //   "sexo": "masculino",
  //   "estado_civil": "solteiro",
  //   "profissao": "estudante"
  // }

  async signup({ request, response, auth }) {
    // verifica se o usuário não inseriu profissao e cargo
    // verifica se o usuário inseriu pelo menos um dos dois
    // prettier-ignore
    if (!(request.input("profissao") && request.input("cargo")) &&
        (request.input("profissao") || request.input("cargo"))) {
          // continue
    } else {
      return response.badRequest({
        status: 'error',
        message: 'Você deve inserir uma profissão ou um cargo.'
      })
    }

    const addressData = {
      cep: request.input("cep"),
      rua: request.input("rua"),
      bairro: request.input("bairro"),
      numero: request.input("numero"),
      cidade: request.input("cidade"),
      estado: request.input("estado"),
    };

    let userData = {
      cpf: request.input("cpf"),
      nome: request.input("nome"),
      celular: request.input("celular"),
      telefone: request.input("telefone"),
      email: request.input("email"),
      sexo: request.input("sexo"),
      estado_civil: request.input("estado_civil"),
      profissao: request.input("profissao"),
      cargo: request.input("cargo"),
    };

    const loginData = {
      cpf: request.input("cpf"),
      senha: request.input("senha"),
      usuario: request.input("usuario"),
    };

    try {
      const address = await Endereco.create(addressData);

      userData = { ...userData, endereco: address.id_endereco };

      const user = await Pessoa.create(userData);
      const login = await Login.create(loginData);

      const token = await auth.generate(login);

      return response.json({
        status: "success",
        data: token,
      });
    } catch (error) {
      // Esse log dá mais informações sobre o erro
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Ocorreu um erro inesperado!",
      });
    }
  }

  /**
   * Altera dados do próprio usuário
   */
  // TODO: fazer mais testes
  async me({ auth, request, response }) {
    const loginData = request.only(["usuario", "senha"]);

    const addressData = request.only([
      "cep",
      "rua",
      "bairro",
      "numero",
      "cidade",
      "estado",
    ]);

    const userData = request.only([
      "cpf",
      "nome",
      "celular",
      "telefone",
      "email",
      "sexo",
      "estado_civil",
      "profissao",
      "cargo",
    ]);

    try {
      const login = await auth.getUser();
      const user = await login.pessoa().fetch();
      const address = await user.enderecoRel().fetch();

      login.usuario = loginData.usuario;
      login.senha = loginData.senha;
      await login.save();

      user.cpf = userData.cpf | user.cpf;
      user.nome = userData.nome;
      user.celular = userData.celular;
      user.telefone = userData.telefone;
      user.email = userData.email;
      user.sexo = userData.sexo;
      user.estado_civil = userData.estado_civil;
      user.profissao = userData.profissao;
      user.cargo = userData.cargo;
      await user.save();

      address.cep = addressData.cep;
      address.rua = addressData.rua;
      address.bairro = addressData.bairro;
      address.numero = addressData.numero;
      address.cidade = addressData.cidade;
      address.estado = addressData.estado;
      await address.save();

      return response.ok({
        status: "Sucesso",
        message: "Dados atualizados com sucesso.",
      });
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Não foi possível atualizar os seus dados.",
      });
    }
  }

  /**
   *
   * TODO: verificar se o cliente possui contratos e/ou imóveis possuídos
   *  - permitir apenas que o funcionário vinculado ao contrato apague-o
   *  - validade no contrato
   *  - apagar contratos e imóveis primeiro
   */
  async remover({ auth, response }) {
    try {
      const usuario = await auth.getUser();
      const user = await usuario.pessoa().fetch();

      await user.delete();
      return response.ok({
        status: "success",
        data: user,
      });
    } catch (error) {
      console.log(error);
      return response.notFound({
        status: "error",
        message: "Usuário não encontrado!",
      });
    }
  }
}

module.exports = PessoaController;
