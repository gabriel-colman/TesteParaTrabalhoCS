import React, { useState } from "react";
import api from '../services/api'
import { Link } from "react-router-dom"


const RegisterForm = ({ error }) => {
    const [details, setDetails] = useState({ name: "", email: "", password: "" })
    const submitHandler = async e => {
        e.preventDefault();
        const userData = {
            name: details.name,
            email: details.email,
            password: details.password
        }
        try {
            console.log(userData);
            const { data } = await api.post('/signup', userData)
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <form onSubmit={submitHandler}>
            <div className='App'>
                <div className="form-inner">
                    <h2>Register</h2>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" id="name" onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                    </div>
                    <input type="submit" value="SIGNUP" />
                    <Link to="/login" >Already have an account?</Link>
                    {/* <a >Already have an account?</a> */}
                    {(error != "") ? (<div className="error">{error}</div>) : ""}
                </div>
            </div>
        </form >
    )
}

export default RegisterForm