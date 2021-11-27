import React, { useState, useMemo } from "react";
import api from '../services/api'
import { Link } from "react-router-dom"
import { useHistory } from "react-router";


const mostrar = ({  error }) => {
  const [imoveis, contrato] = useState([]);
  const history = useHistory();
  const submitHandler = async e => {
    e.preventDefault();
    const userData = {
      imovel: details.imovel
    }
  }
  try {
    const { data } = await api.post('/imoveis/index', userData)
    console.log(data);
    history.push('/transacao');
  } catch (error) {
    console.log(error.message);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='App'>
        <div className="form-inner">
          <h3>Informações das Locações</h3>
          <table>
            <thead>
              <tr>

                <th>cep</th>
                <th>rua</th>
                <th>bairro</th>
                <th>numero</th>
                <th>cidade</th>
                <th>estado</th>

                <th>venda</th>
                <th>locacao</th>
                <th>status</th>
                <th>area</th>
                <th>dt_reg_compra</th>
                <th>dt_reg_aluguel</th>
                <th>dt_construcao</th>
                <th>valor_aluguel</th>
                <th>valor_venda</th>

                <th>andar</th>
                <th>valor_condominio</th>
                <th>possui_portaria</th>

                <th>qtd_comodos</th>
                <th>qtd_banheiros</th>

                <th>nivel_terreno</th>
                <th>largura</th>
                <th>comprimento</th>



              </tr>
            </thead>
            <tbody>
              {contratos.map(contrato => (
                <tr key={String(contrato.id)}>
                  <td>{contrato.cep}</td>
                  <td>{contrato.rua}</td>
                  <td>{contrato.bairro}</td>
                  <td>{contrato.numero}</td>
                  <td>{contrato.cidade}</td>
                  <td>{contrato.estado}</td>

                  <td>{contrato.venda}</td>
                  <td>{contrato.locacao}</td>
                  <td>{contrato.status}</td>
                  <td>{contrato.categoria}</td>
                  <td>{contrato.area}</td>
                  <td>{contrato.dt_reg_compra}</td>
                  <td>{contrato.dt_reg_aluguel}</td>
                  <td>{contrato.dt_construcao}</td>
                  <td>{contrato.valor_aluguel}</td>
                  <td>{contrato.valor_venda}</td>

                  <td>{contrato.andar}</td>
                  <td>{contrato.valor_condominio}</td>
                  <td>{contrato.possui_portaria}</td>

                  <td>{contrato.qtd_comodos}</td>
                  <td>{contrato.qtd_banheiros}</td>

                  <td>{contrato.nivel_terreno}</td>
                  <td>{contrato.largura}</td>
                  <td>{contrato.comprimento}</td>



                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </form >
  )

}


export default mostrar;

/* export default function ProductsList () {
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function loadProducts () {
      const res = await api.get('/imoveis/show')
      setProducts(res.data)
      setLoadingProducts(false)
    }

    loadProducts()
  }, [])

  return loadingProducts ? (
    <>loading...</>
  ) : (
    <>
      <div className='products'>
        {products.map(product => (
          <ImovelController product={product} key={product.id_imovel_geral} />
        ))}
      </div>
    </>
  )
}
 */