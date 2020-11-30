import React, {Component} from "react";
import axios from 'axios';
import Nav from "./Navbar/nav";
import {Redirect} from "react-router";


const config = require("../env").config;
const uri = require("../env").api_uri;

export default class DeleteUser extends Component {

    constructor(props) {
        super(props);

        //this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount(){
        axios.delete( uri + '/users/delete/' + this.props.match.params.id , config )
            .then((res) => {
                console.log( "User deleted" )
                this.props.history.push('/all');
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return <Redirect to="/all" />;
    }
}