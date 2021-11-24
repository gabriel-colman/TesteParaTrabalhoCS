'use strict';

const Contrato = use("App/Models/Contrato");

// para testes
// {
// 	"imovel_geral": 1,
// 	"cpf_proprietario": "12345678910",
// 	"cpf_cliente": "45698712344",
// 	"pagamento": 1,
// 	"valor_final_aluguel": 1100,
// 	"valor_final_venda": 0,
// 	"valor_condominio": 300,
// 	"dt_venda": null,
// 	"dt_aluguel": "04/10/2021",
// 	"procentagem": 0,
// 	"cpf_indicacao": "45678912321",
// 	"cpf_fiador": "32165498778"
// }

class ContratoController {

	// Mostra todos os contratos
	async index ({ auth, response }) {
		if(!auth.user.is_funcionario) {
				return response.forbidden ({
					status: "error",
					menssage: "Você não tem permissão para visualizar este contrato."
			});
		}

		try {
			const contratos = await Contrato.all();
			if(contratos != null){
				return response.ok ({
					status: "successs",
					data: contratos,
				});
			}
		} catch (error) {
			return response.internalServerError ({
				status: "error",
				message: "Ocorreu um erro inesperado."
			});
		}
	}
//-----------------------------------------------------------------

// Cria um contrato
	async create({ auth, request, response }) {
		if(!auth.user.is_cliente) {
			return response.forbidden ({
				status: "error",
				message: "Você não tem permissões para criar um contato."
			});
		}

		try {
			const contratoData = request.only([
				'imovel_geral',
				'cpf_proprietario',
				'cpf_cliente',
				'pagamento',
				'valor_final_alugel',
				'valor_final_venda',
				'valor_condominio',
				'dt_venda',
				'dt_aluguel',
				'porcentagem',
				'cpf_indicacao',
				'cpf_fiador'
			]);
			const contratos = await Contrato.create(contratoData);

		} catch (error) {
			console.log(error);
			return response.internalServerError ({
				status: "error",
				message: "Ocorreu um erro inesperado."
			});
		}

		return response.json({
			status: "success",
			data: contratos
		});
	}
//-----------------------------------------------------------------

// Mostra um contrato
	async show({ auth, params, response }) {
		const id = await Contrato.findOrFail(params.id);

		if(auth.user.cpf != id.cpf_proprietario || auth.user.cpf != id.cpf_cliente
			|| !auth.user.is_funcionario) {
			return response.forbidden({
				status: "error",
				message: "Você não tem permissão para visualizar este contrato."
			});
		}

		try {
			const contratos = await Contrato.findOrFail(params.id);
		} catch (error) {
			return response.notFound ({
				status: "error",
				message: "Contrato não encontrado."
			});
		}

		return response.ok({
			status: "success",
			data: contratos
		})
	}
//-----------------------------------------------------------------

// Atualiza um contrato
	async update({ auth, params, request, response }) {
		if(!auth.user.is_funcionario) {
			return response.forbidden({
				status: "error",
				message: "Você não tem permissões para atualizar esse contrato."
			});
		}

		try {
			const contratos = await Contrato.findOrFail(params.id);
			if(contratos == null){
				return response.notFound({
					status: "error",
					message: "Contrato não encontrado."
				});
			} 
			const contratoData = request.only([
				'cpf_cliente',
				'valor_final_alugel',
				'valor_final_venda',
				'valor_condominio',
				'dt_venda',
				'dt_aluguel',
				'porcentagem',
				'cpf_indicacao',
				'cpf_fiador'
			]);
			contratos.merge(contratoData);
			await contratos.save();

		} catch (error) {
			return response.internalServerError({
				status: "error",
				message: "Ocorreu um erro inesperado."
			});
		}

		return response.ok({
			status: "success",
			data: contratos
		})

	}
//-----------------------------------------------------------------

// Apaga um contrato
	async destroy({ auth, params, response }){
		if(!auth.user.is_funcionario) {
			return response.forbidden({
				status: "error",
				message: "Você não tem permissões para apagar este contrato."
			});
		}

		try {
			const contratos = await Contrato.findOrFail(params.id);
			if(contratos == null){
				return response.notFound({
					status: "error",
					message: "Contrato não encontrado."
				});
			}
			await contratos.delete();
		} catch (error) {
			return response.internalServerError({
				status: "error",
				message: "Ocorreu um erro inesperado."
			});
		}

		return response.ok({
			status: "success",
			id: contratos.id_contrato
		});
	}
//-----------------------------------------------------------------

}

module.exports = ContratoController
