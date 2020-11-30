import React, {Component} from "react";
import axios from 'axios';
import {Redirect} from "react-router";


const config = require("../env").config;
const uri = require("../env").api_uri;

export default class DeleteUser extends Component {

    componentDidMount(){
        axios.delete( uri + '/users/delete/' + this.props.match.params.id , config )
            .then((res) => {

                this.props.history.push('/all');
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return <Redirect to="/all" />;
    }
}