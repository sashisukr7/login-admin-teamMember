import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { useHistory } from 'react-router-dom';

function LoginForm(props) {
    const history = useHistory();
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        let without_backend_support = true
        e.preventDefault();
        //without backend support
        if (without_backend_support) {
            props.updateTitle('Home')
            let h = localStorage.setItem("sessionTimeoutHour", 0);
            let m = localStorage.setItem("sessionTimeoutMinute", 15);
            let s = localStorage.setItem("sessionTimeoutSecond", 0);
            localStorage.setItem(ACCESS_TOKEN_NAME, "gfagf154757hguh768kjbh6");
            props.setTimer(0, 15, 0);
            history.push('/admin');
        }
        else {
            const payload = {
                "email": state.email,
                "password": state.password,
            }
            axios.post(API_BASE_URL + '/user/login', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Login successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        redirectToHome();
                       // props.showError(null)
                    }
                    else if (response.code === 204) {
                      //  props.showError("Username and password do not match");
                    }
                    else {
                       // props.showError("Username does not exists");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/admin');
    }
    const redirectToRegister = () => {
         history.push('/register'); 
         props.updateTitle('Register');
    }
    return (
        <div className="card col-12 col-lg-4 login-card  mt-2 hv-center">
            <form >
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">UserName</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
               
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
            </div>
        </div>
    )
}

export default LoginForm;