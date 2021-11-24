"use strict";

const ImovelGeral = use("App/Models/ImovelGeral");
const ImovelProprietario = use("App/Models/ImovelProprietario");
const Endereco = use("App/Models/Endereco");
const CasaApartamento = use("App/Models/CasaApartamento");
const Apartamento = use("App/Models/Apartamento");
const SalaComercial = use("App/Models/SalaComercial");
const Terreno = use("App/Models/Terreno");

class ImovelController {
  async index({ request, response }) {
    const imoveis;
    try {
      /* todos = {
        endereco: await ImovelGeral.query().with("endereco").fetch(),
        proprietario: await ImovelGeral.query().with("proprietario").fetch(),
        foto: await ImovelGeral.query().with("foto").fetch(),
        salacomercial: await ImovelGeral.query().with("salacomercial").fetch(),
        casaApartamento: await ImovelGeral.query()
          .with("casaApartamento")
          .fetch(),
        contrato: await ImovelGeral.query().with("contrato").fetch(),
        terreno: await ImovelGeral.query().with("terreno").fetch(),
        historico: await ImovelGeral.query().with("historico").fetch(),
      }; */


      const subquery = Database
      .select('id_imovel_geral')
      .from('imovel_geral');

    imoveis = await ImovelGeral
      .query()
      .with('casaApartamento', (builder) => {
        builder.whereIn('imovel_geral', subquery)
      })
      .with('terreno', (builder) => {
        builder.whereIn('imovel_geral', subquery)
      })
      .with('proprietario', (builder) => {
        builder.whereIn('imovel_geral', subquery)
      })
      .with('foto', (builder) => {
        builder.whereIn('imovel_geral', subquery)
      })
      .with('salaComercial', (builder) => {
        builder.whereIn('imovel_geral', subquery)
      })
      .with('contrato', (builder) => {
        builder.whereIn('imovel_geral', subquery)
      })
      .with('historico', (builder) => {
        builder.whereIn('imovel_geral', subquery)
      })
      .with('apartamento', (builder) => {
        builder.whereIn(['id_casa_ap'], subquery.select('casa_ap').from('apartamento'))
      })


      .fetch();

   
      for (var propName in imoveis) {
        if (imoveis[propName] === null || imoveis[propName] === undefined) {
          delete imoveis[propName];
        }
      }
      
  } catch (error) {
    console.log(error);
    return response.internalServerError({
      status: "error",
      message: "Um erro inesperado ocorreu.",
    });

  }

  return response.ok({
    status: "success",
    data: imoveis,
  });

}

  /**
  Este método cria, na seguinte ordem:
  - Endereço
  - ImovelGeral
  - alguma das categorias (Casa, Apartamento, SalaComercial ou Terreno)

  Certos campos utilizam apenas um caracter como valor:
  - status: V (vendido), A (alugado), D (disponivel), I (indisponível)
  - categoria: C (casa), A (apartamento), S (sala cormercial), T (terreno)
  - nivel_terreno: P (plano), A (aclive), D (declive)

  OBS.: Para criar um Apartamento também são necessários os campos de Casa
  - https://github.com/mapsiva/csbeg4/blob/master/db/diagrama_v3.jpeg
 
  Para criar algum imóvel, os seguintes campos são necessários:
  {
    // Endereco
    "cep": "12345-023",
    "rua": "rua",
    "bairro": "bairro",
    "numero": "1",
    "cidade": "cidade",
    "estado": "estado",
    
    // ImovelGeral
    "venda": true,
    "locacao": true,
    "status": "D",
    "categoria": "A",
    "area": 1000,
    "dt_reg_compra": "01/01/2001",
    "dt_reg_aluguel": "01/01/2001",
    "dt_construcao": "01/01/2001",
    "valor_aluguel": 1000,
    "valor_venda": 100000,
    
    // Casa
    "descricao": "descricao",
    "qtd_quartos": 3,
    "qtd_suites": 0,
    "qtd_salas_estar": 1,
    "qtd_salas_jantar": 1,
    "qtd_vagas_garagem": 1,
    "possui_armario": true,
    
    // Apartamento
    "andar": 1,
    "valor_condominio": 800,
    "possui_portaria": true,
    
    // SalaComercial
    "qtd_comodos": 3,
    "qtd_banheiros": 2,
    
    // Terreno
    "nivel_terreno": "P",
    "largura": 100,
    "comprimento": 100
  }
 */
  async create({ auth, request, response }) {
    // checa se `categoria` é null ou undefined
    if (!request.input("categoria")) {
      return response.badRequest({
        status: "error",
        message: "Campo categoria não pode ser nulo ou vazio.",
      });
    }

    // pede dados e cria o endereco
    let endereco;
    const enderecoData = request.only([
      "cep",
      "rua",
      "bairro",
      "numero",
      "cidade",
      "estado",
    ]);

    try {
      endereco = await Endereco.create(enderecoData);
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Um erro inesperado ocorreu.",
      });
    }

    // pede dados e cria imovel_geral
    let imovel_geral;
    let imovelData = request.only([
      "venda",
      "locacao",
      "status",
      "categoria",
      "area",
      "dt_reg_compra",
      "dt_reg_aluguel",
      "dt_construcao",
      "valor_aluguel",
      "valor_venda",
    ]);

    // let endereco;
    // try {
    //   endereco = await Endereco.findOrFail(imovelData.endereco);
    // } catch (error) {
    //   console.log(error);
    //   return response.notFound({
    //     status: "erro",
    //     message: "CEP não encontrado.",
    //   });
    // }

    try {
      imovelData = { ...imovelData, endereco: endereco.id_endereco };
      imovel_geral = await ImovelGeral.create(imovelData);
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Um erro inesperado ocorreu.",
      });
    }

    // cria imovel_proprietario
    try {
      await ImovelProprietario.create({
        cpf_proprietario: auth.user.cpf,
        imovel_geral: imovel_geral.id_imovel_geral,
      });
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "error",
        message: "Um erro inesperado ocorreu.",
      });
    }

    // Cria imóveis por categoria
    if (imovelData.categoria === "C" || imovelData.categoria === "A") {
      let casa;
      let apartamento;

      const casaData = request.only([
        "descricao",
        "qtd_quartos",
        "qtd_suites",
        "qtd_salas_estar",
        "qtd_salas_jantar",
        "qtd_vagas_garagem",
        "possui_armario",
      ]);

      // casa_apartamento está criado
      try {
        casa = await CasaApartamento.create({
          imovel_geral: imovel_geral.id_imovel_geral,
          ...casaData,
        });
      } catch (error) {
        console.log(error);
        return response.internalServerError({
          status: "erro",
          message: "Um erro inesperado ocorreu.",
        });
      }

      // retorna imovel_geral e casa_apartamento
      if (imovelData.categoria !== "A") {
        try {
          await imovel_geral.load(["casaApartamento"]);
        } catch (error) {
          console.log(error);
          return response.internalServerError({
            status: "erro",
            message: "Um erro inesperado ocorreu.",
          });
        }
      } else {
        // cria apartamento
        const apartamentoData = request.only([
          "andar",
          "valor_condominio",
          "possui_portaria",
        ]);

        try {
          apartamento = await Apartamento.create({
            casa_ap: casa.id_casa_ap,
            ...apartamentoData,
          });
        } catch (error) {
          console.log(error);
          return response.internalServerError({
            status: "erro",
            message: "Um erro inesperado ocorreu.",
          });
        }

        // retorna imovel_geral, casa_apartamento e apartamento
        try {
          await imovel_geral.loadMany(["casaApartamento", "apartamento"]);
        } catch (error) {
          console.log(error);
          return response.internalServerError({
            status: "erro",
            message: "Um erro inesperado ocorreu.",
          });
        }
      }
    } else if (imovelData.categoria === "S") {
      // cria sala_comercial
      const salaComercialData = request.only(["qtd_comodos", "qtd_banheiros"]);
      let salaComercial;

      try {
        salaComercial = await SalaComercial.create({
          imovel_geral: imovel_geral.id_imovel_geral,
          ...salaComercialData,
        });
      } catch (error) {
        console.log(error);
        return response.internalServerError({
          status: "erro",
          message: "Um erro inesperado ocorreu.",
        });
      }

      // retorna imovel_geral e sala_comercial
      try {
        await imovel_geral.load("salaComercial");
      } catch (error) {
        console.log(error);
        return response.internalServerError({
          status: "erro",
          message: "Um erro inesperado ocorreu.",
        });
      }
    } else if (imovelData.categoria === "T") {
      // cria terreno
      const terrenoData = request.only([
        "nivel_terreno", // P (plano), A (aclive), D (declive)
        "largura",
        "comprimento",
      ]);

      let terreno;
      try {
        terreno = await Terreno.create({
          imovel_geral: imovel_geral.id_imovel_geral,
          ...terrenoData,
        });
      } catch (error) {
        console.log(error);
        return response.internalServerError({
          status: "erro",
          message: "Um erro inesperado ocorreu.",
        });
      }

      // retorna imovel_geral e terreno
      try {
        await imovel_geral.load("terreno");
      } catch (error) {
        console.log(error);
        return response.internalServerError({
          status: "erro",
          message: "Um erro inesperado ocorreu.",
        });
      }
    } else {
      // categoria inválida
      return response.notFound({
        status: "error",
        message: "Categoria não encontrada.",
      });
    }

    return response.created({
      status: "success",
      data: imovel_geral,
    });
  }


  async show({ auth, params, request, response, view }) {

    /*   if (!imovel) {
        return response.forbidden({
          status: "error",
          message: "Você não pode visualizar estes dados.",
        });
      } */
      const imovel = await ImovelGeral.findOrFail(params.id_imovel_geral);
      
      if (auth.user.ImovelGeral != imovel.id_imovel_geral || 
        auth.user.ImovelGeral != imovel.id_endereco ||
        auth.user.ImovelGeral != imovel.id_casa_ap) {
          return response.forbidden({
            status: "error",
            message: "Você não pode visualizar estes dados.",
          });
      }
  
  
      const imobiliaria,
      try {
        imobiliaria = await ImovelGeral.findOrFail(params.id_imovel_geral);
        
      } catch (error) {
        return response.notFound({
          status: "error",
          message: "Imovel não encontrado."
        });
      }
  
      return response.ok({
        status: "success",
        data: imobiliaria
      });
    }
  
 // Cria um apartamento, terreno, sala comercia e/ou uma casa
 async store({ auth, request, response }) {
  // checa se `categoria` é null ou undefined
  if (!request.input("categoria")) {
    return response.badRequest({
      status: "error",
      message: "Campo categoria não pode ser nulo ou vazio.",
    });
  }

  // pede dados e cria o endereco
  let endereco;
  const enderecoData = request.only([
    "cep",
    "rua",
    "bairro",
    "numero",
    "cidade",
    "estado",
  ]);

  try {
    endereco = await Endereco.create(enderecoData);
  } catch (error) {
    console.log(error);
    return response.internalServerError({
      status: "error",
      message: "Um erro inesperado ocorreu.",
    });
  }

  // pede dados e cria imovel_geral
  let imovel_geral;
  let imovelData = request.only([
    "venda",
    "locacao",
    "status",
    "categoria",
    "area",
    "dt_reg_compra",
    "dt_reg_aluguel",
    "dt_construcao",
    "valor_aluguel",
    "valor_venda",
  ]);

  try {
    imovelData = { ...imovelData, endereco: endereco.id_endereco };
    imovel_geral = await ImovelGeral.create(imovelData);
  } catch (error) {
    console.log(error);
    return response.internalServerError({
      status: "error",
      message: "Um erro inesperado ocorreu.",
    });
  }

  // cria imovel_proprietario
  try {
    await ImovelProprietario.create({
      cpf_proprietario: auth.user.cpf,
      imovel_geral: imovel_geral.id_imovel_geral,
    });
  } catch (error) {
    console.log(error);
    return response.internalServerError({
      status: "error",
      message: "Um erro inesperado ocorreu.",
    });
  }

  // Cria imóveis por categoria
  if (imovelData.categoria === "C" || imovelData.categoria === "A") {
    let casa;
    let apartamento;

    const casaData = request.only([
      "descricao",
      "qtd_quartos",
      "qtd_suites",
      "qtd_salas_estar",
      "qtd_salas_jantar",
      "qtd_vagas_garagem",
      "possui_armario",
    ]);

    // casa_apartamento está criado
    try {
      casa = await CasaApartamento.create({
        imovel_geral: imovel_geral.id_imovel_geral,
        ...casaData,
      });
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "erro",
        message: "Um erro inesperado ocorreu.",
      });
    }

    // retorna imovel_geral e casa_apartamento
    if (imovelData.categoria !== "A") {
      try {
        await imovel_geral.load(["casaApartamento"]);
      } catch (error) {
        console.log(error);
        return response.internalServerError({
          status: "erro",
          message: "Um erro inesperado ocorreu.",
        });
      }
    } else {
      // cria apartamento
      const apartamentoData = request.only([
        "andar",
        "valor_condominio",
        "possui_portaria",
      ]);

      try {
        apartamento = await Apartamento.create({
          casa_ap: casa.id_casa_ap,
          ...apartamentoData,
        });
      } catch (error) {
        console.log(error);
        return response.internalServerError({
          status: "erro",
          message: "Um erro inesperado ocorreu.",
        });
      }

      // retorna imovel_geral, casa_apartamento e apartamento
      try {
        await imovel_geral.loadMany(["casaApartamento", "apartamento"]);
      } catch (error) {
        console.log(error);
        return response.internalServerError({
          status: "erro",
          message: "Um erro inesperado ocorreu.",
        });
      }
    }
  } else if (imovelData.categoria === "S") {
    // cria sala_comercial
    const salaComercialData = request.only(["qtd_comodos", "qtd_banheiros"]);
    let salaComercial;

    try {
      salaComercial = await SalaComercial.create({
        imovel_geral: imovel_geral.id_imovel_geral,
        ...salaComercialData,
      });
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "erro",
        message: "Um erro inesperado ocorreu.",
      });
    }

    // retorna imovel_geral e sala_comercial
    try {
      await imovel_geral.load("salaComercial");
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "erro",
        message: "Um erro inesperado ocorreu.",
      });
    }
  } else if (imovelData.categoria === "T") {
    // cria terreno
    const terrenoData = request.only([
      "nivel_terreno", // P (plano), A (aclive), D (declive)
      "largura",
      "comprimento",
    ]);

    let terreno;
    try {
      terreno = await Terreno.create({
        imovel_geral: imovel_geral.id_imovel_geral,
        ...terrenoData,
      });
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "erro",
        message: "Um erro inesperado ocorreu.",
      });
    }

    // retorna imovel_geral e terreno
    try {
      await imovel_geral.load("terreno");
    } catch (error) {
      console.log(error);
      return response.internalServerError({
        status: "erro",
        message: "Um erro inesperado ocorreu.",
      });
    }
  } else {
    // categoria inválida
    return response.notFound({
      status: "error",
      message: "Categoria não encontrada.",
    });
  }

  return response.created({
    status: "success",
    data: imovel_geral,
  });
}


async update({ auth, params, response, request }) {
  try {
    // if(!auth.user.is_funcionario){
    //   return response.notFound({
    //     status: "error",
    //     message: "Você não tem permissão para realizar essa operação."
    //   })
    // }
    const imoveisGerais = await ImovelGeral.findOrFail(params.id);
    const endereco = await imoveisGerais.enderecoRel().fetch();

    const enderecoData = request.only([
      'cep',
      'rua',
      'bairro',
      'numero',
      'cidade',
      'estado'
    ]);

    const imovelData = request.only([
      'venda',
      'locacao',
      'status',
      'area',
      'dt_reg_compra',
      'dt_reg_aluguel',
      'dt_construcao',
      'valor_aluguel',
      'valor_venda'
    ]);

    endereco.merge(enderecoData);
    await endereco.save()

    imoveisGerais.merge(imovelData);
    await imoveisGerais.save();

    if(imoveisGerais.categoria == 'C' || imoveisGerais.categoria == 'c'){
      const casas = await imoveisGerais.casaApartamento().fetch();
      const casaData = request.only([
        'descricao',
        'qtd_quartos',
        'qtd_suites',
        'qtd_salas_estar',
        'qtd_salas_jantar',
        'qtd_vagas_garagem',
        'possui_armario'
      ]);

      casas.merge(casaData);
      await casas.save();  
    }
    
    if(imoveisGerais.categoria == 'A' || imoveisGerais.categoria == 'a'){
      const apartamentos = await imoveisGerais.casaApartamento().fetch();
      const apartamentoData = request.only([
        'andar',
        'valor_condominio',
        'possui_portaria'
      ]);
      
    
      apartamentos.merge(apartamentoData);
      await apartamentos.save();
    }
    
    if(imoveisGerais.categoria == 'S' || imoveisGerais.categoria == 's'){
      const salas = await imoveisGerais.salaComercial().fetch();
      const salaData = request.only([
        'qtd_comodos',
        'qtd_banheiros'
      ]);

      salas.merge(salaData);
      await salas.save();
    }
    
    if(imoveisGerais.categoria == 'T' || imoveisGerais.categoria == 't'){
      const terrenos = await imoveisGerais.terreno().fetch();
      const terrenoData = request.only([
        'nivel_terreno',
        'largura',
        'comprimento'
      ]);

      terrenos.merge(terrenoData);
      await terrenos.save();
    }

    return response.ok({
      status: "Sucesso",
      message: "Dados atualizados com sucesso.",
    });
  } catch (error) {
    console.log(error)
    return response.internalServerError({
      status: "error",
      message: "Não foi possível atualizar os seus dados.",
    });
  }

}
//-----------------------------------------------------------------

// Apaga um apartamento, terreno, sala comercia e/ou uma casa
async destroy({ auth, params, response }) {
 
  try{
    const imovel = await ImovelGeral.findOrFail(params.id);

    if (imovel.user_id != auth.user.id) {
      return response.status(401).send({ error: "Você não tem autorização!" });
    }

    if(imovel.categoria == 'C' || imovel.categoria == 'c'){
      const casa = await imovel.casaApartamento().fetch();
      if(imovel.id_imovel_geral == casa.imovel_geral){
        await casa.delete();
      }  
    } 
    
    if(imovel.categoria == 'A' || imovel.categoria == 'a'){
      const casa = await imovel.casaApartamento().fetch();
      const apartamento = await casa.apartamento().fetch();
      if(apartamento.casa_ap == casa.id_casa_ap 
        && casa.imovel_geral == imovel.id_imovel_geral){
        await apartamento.delete() && casa.delete();
      }
    }

    if(imovel.categoria == 'T' || imovel.categoria == 't'){
      const terreno = await imovel.terreno().fetch();
      if(imovel.id_imovel_geral == terreno.imovel_geral){
        await terreno.delete();
      }
    }

    if(imovel.categoria == 'S' || imovel.categoria == 's'){
      const sala = await imovel.salaComercial().fetch();
      if(imovel.id_imovel_geral == sala.imovel_geral){
        await sala.delete();
      }
    }
    await imovel.delete();

    return response.ok({
      status: "success",
      data: imovel,
    });
  } catch (error) {
    console.log(error);
    return response.notFound({
      status: "error",
      message: "Imóvel não encontrado!",
    });
  }
}
}


module.exports = ImovelController;
