import React, { Component } from 'react';
import axios from "axios";

import { Redirect } from 'react-router';

import '../App.css';
import Nav from "./Navbar/nav";

const uri = require("../env").api_uri;

export default class Login extends Component{

    constructor(props) {
        super(props);

        this.state = {
            data:{
                email: '',
                password: ''
            },
            redirect: false,
            error: null
        }
    }

    handleInputChange = ({ target: { name, value } }) => {
        this.setState(prev => ({
            ...prev,
            data: {
                ...prev.data,
                [name]: value,
            },
        }));
    };

    handleSubmit = async e => {
        e.preventDefault();

        try{
            const response = await axios.post(uri + '/users/login', this.state.data)

            localStorage.setItem('token', JSON.stringify( response.data.token ) );

            this.setState({ redirect: true });
            //await RedirectAfterLogin();
        }catch ( error ){
            this.setState( {error: error.response.data } );
        }
    }


    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/all" />;
        }
        else{
            return (
                <div>
                    <Nav />
                    <h3>Login</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Email: </label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={this.state.data.email}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password: </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={this.state.data.password}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            { this.state.error &&
                            <div className="alert alert-danger error-message" role="alert">
                                { this.state.error.message }
                            </div>
                            }
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            );
        }

    }
}

