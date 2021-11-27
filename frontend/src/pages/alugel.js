import React, { useState } from "react";
import api from '../services/api'
import { Link } from "react-router-dom"
import { useHistory } from "react-router";


const mostrar = ({ Login, error }) => {
  const [imoveis, setImovel] = useState([]);
  const history = useHistory();
  const submitHandler = async e => {
    e.preventDefault();
    const userData = {
      imovel: details.imovel,
    }
  }
  try {
    const { data } = await api.post('/imoveis/show', userData)
    console.log(data);
    history.push('/alugel');
  } catch (error) {
    console.log(error.message);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='App'>
        <div className="form-inner">
          <h3>Informações dos Imóveis</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>BAIRRO</th>
                <th>CIDADE</th>
                <th>LOCADOR</th>
                <th>AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {imoveis.map(imovel => (
                <tr key={String(imovel.id)}>
                  <td>{imovel.cep}</td>
                  <td>{imovel.rua}</td>
                  <td>{imovel.numero}</td>
                  <td>{imovel.bairro}</td>
                  <td>{imovel.cidade}</td>
                  <td>{imovel.estado}</td>
                  
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
