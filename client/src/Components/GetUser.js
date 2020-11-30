import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import E403 from "./errors/E403";
import Nav from "./Navbar/nav"

const config = require("../env").config;
const uri = require("../env").api_uri;

const User = props => (
    <tr>
        <td>{props.user.name}</td>
        <td>{props.user.lastname}</td>
        <td>{props.user.birthdate}</td>
        <td>{props.user.email}</td>
        <td>
            <Link className="btn btn-warning" to={"/edit/"+props.user._id}>Edit</Link>
        </td>
        <td>
            <Link className="btn btn-danger" to={"/delete/"+props.user._id}>Delete</Link>
        </td>
    </tr>
)
export default class GetUser extends Component {

    constructor(props) {
        super(props);
        this.state = {users: [], error: '' };
    }

     componentDidMount() {

         const user = JSON.parse( localStorage.getItem('token') );
         let config = {
             headers: { Authorization: `Bearer ${ user !== null ? user.token : null }` }
         }

         axios.get( uri + '/users', config)
             .then(response => {
                this.setState({ users: response.data });
                this.setState( { error: '' } );
            })
            .catch( error => {
                this.setState({ error: error.message });
            })
    }

    userList() {
            return this.state.users.map(function(currentUser, i){
                return <User user={currentUser} key={i} />;
            })

    }

    render() {

        if( this.state.error ){

            return (
                    <E403 />

        );
        }
        else{
            return (
                <div>
                    <Nav />
                    <h3>Users List</h3>
                    <table className="table table-striped" style={{ marginTop: 20 }} >
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Lastame</th>
                            <th>Birthdate</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.userList() }
                        </tbody>
                    </table>
                </div>
            );
        }

    }
}