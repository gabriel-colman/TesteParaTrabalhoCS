import React, { useState } from "react";
import api from '../services/api'
import { Link } from "react-router-dom"
import { useHistory } from "react-router";

const LoginForm = ({ Login, error }) => {
    const [details, setDetails] = useState({ name: "", email: "", password: "" })
    const history = useHistory();
    const submitHandler = async e => {
        e.preventDefault();
        const userData = {
            usuario: details.usuario,
            senha: details.senha
        }
        try {
            const { data } = await api.post('/login', userData)
            console.log(data);
            history.push('/home');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='App'>
                <div className="form-inner">
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="user">Usuario:</label>
                        <input type="text" name="user" id="user" onChange={e => setDetails({ ...details, usuario: e.target.value })} value={details.usuario} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="senha" id="senha" onChange={e => setDetails({ ...details, senha: e.target.value })} value={details.senha} />
                    </div>
                    <input type="submit" value="LOGIN" />
                    <Link to="/" >Don't have an account?</Link>
                    {(error != "") ? (<div className="error">{error}</div>) : ""}
                </div>
            </div>
        </form >
    )
}


export default LoginForm

