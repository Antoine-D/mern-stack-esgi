import {Link} from "react-router-dom";
import React, { Component } from "react";

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: props.auth
        }
    }
    islogged(){
        let token = localStorage.getItem("token");

        return !!token;
    }

    getUser(){
        let user = JSON.parse( localStorage.getItem('token') );

        if( user !== null ){
            return user._id
        }

        return null;
    }

    componentDidMount(){
        this.setState( { auth: this.islogged() } );
    }

    render() {

        let check = this.state;
        //cons

        if( check.auth ){
            return(

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/home" className="navbar-brand">Accueil</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/all" className="nav-link">User List</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to={{ pathname:"/me", state: { user_id: this.getUser()} }} className="nav-link">My profile</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/logout" className="nav-link">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
        else{
            return(

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">Accueil</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Register</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }

    }
}
