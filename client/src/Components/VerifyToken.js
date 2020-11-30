import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router";
import Nav from "./Navbar/nav";

import "../200.css";

const config = require("../env").config;
const uri = require("../env").api_uri;


export default class verifyToken extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: '',
            success: '',
            redirect: false,
        }
    }

    componentDidMount(){
        axios.get( uri + '/users/token/' + this.props.match.params.token , config )
            .then((res) => {
                const obj = {
                    validated_email: true,
                };
                axios.post(uri + '/users/update_activ/'+ res.data._id, obj, config)
                    .then(
                        res => {
                            this.setState( { success: "Your account have been activated."})
                            setTimeout(() => {
                                this.setState({ redirect: true });
                            }, 5000);
                        }

                    );

            }).catch((error) => {
            this.setState( { error: "Token invalid"})
        })
    }
    render() {

        if( this.state.error !== "" ){
            return (
                <div>
                    <p className="alert-danger">{this.state.error}</p>
                </div>
            )
        }
        else{
            return (
                <div>
                    <Nav />

                    <div className="card">
                        <div className="div-container">
                            <i className="checkmark">✓</i>
                        </div>
                        <h1 className="title-success">Success</h1>
                        <p className="text-success-act">{this.state.success}<br/> we'll be in touch shortly!</p>

                        {this.state.redirect && (

                            <Redirect to="/" />
                        )
                        }

                    </div>

                </div>

            );
        }

    }
}