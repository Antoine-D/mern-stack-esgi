import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

export default class Logout extends Component{

    state = {
        navigate: false
    }

    logout = () => {
        localStorage.clear("token");
        this.setState( { navigate: true } )
    }


    render() {

        const { navigate } = this.state;

        if ( navigate ){
            return <Redirect to="/" push={true}/>
        }


        return <button onClick={this.logout()} type="button" className="btn btn-primary">Log out</button>;
    }
}


