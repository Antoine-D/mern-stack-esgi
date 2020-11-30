import React, { Component } from 'react';
import axios from 'axios';
import Nav from "./Navbar/nav";
import E403 from "./errors/E403";


const config = require("../env").config;
const uri = require("../env").api_uri;

export default class EditUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserLastname = this.onChangeUserLastname.bind(this);
        this.onchangeUserBirthdate = this.onchangeUserBirthdate.bind(this);
        this.onchangeUserActivate = this.onchangeUserActivate.bind(this);
        //this.onchangeUserEmail = this.onchangeUserEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            lastname: '',
            birthdate: '',
            validated_email: '',
            error: ''
        }
    }

    componentDidMount() {

        if ( this.props.match.params ) {
            axios.get(uri + '/users/' + this.props.match.params.id, config)
                .then(response => {
                    this.setState({
                        name: response.data.name,
                        lastname: response.data.lastname,
                        birthdate: response.data.birthdate,
                        validated_email: response.data.validated_email,
                        email: response.data.email
                    })
                })
                .catch(function (error) {
                    console.log( error )
                })
        }
        else{
            this.setState({error: "Unauthorized"});
        }
    }

    onChangeUserName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeUserLastname(e) {
        this.setState({
            lastname: e.target.value
        });
    }
    onchangeUserBirthdate(e) {
        this.setState({
            birthdate: e.target.value
        });
    }
    onchangeUserActivate(e) {

        if( e.target.value === true){
            this.setState({
                validated_email: false
            });
        }
        else{
            this.setState({
                validated_email: true
            });
        }


    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            lastname: this.state.lastname,
            birthdate: this.state.birthdate,
            validated_email: this.state.validated_email,
            email: this.state.email,
        };

        axios.post(uri + '/users/update/'+this.props.match.params.id, obj, config)
            .then(res => console.log(res.data));

        this.props.history.push('/all');
    }

    render() {
        if( this.state.error ){

            return (
                <E403 />

            );
        }
        else {
            console.log( this.state )
            return (
                <div>
                    <Nav/>
                    <h3 align="center">Update my profile</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.name}
                                   onChange={this.onChangeUserName}
                            />
                        </div>
                        <div className="form-group">
                            <label>Lastname: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.lastname}
                                onChange={this.onChangeUserLastname}
                            />
                        </div>

                        <div className="form-group">
                            <label>Birthdate: </label>
                            <input
                                type="date"
                                className="form-control"
                                value={this.state.birthdate}
                                onChange={this.onchangeUserBirthdate}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email: </label>
                            <input
                                type="email"
                                disabled="disabled"
                                className="form-control"
                                value={this.state.email}
                                //onChange={this.onchangeUserEmail}
                            />
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="activate_acc"
                                className="form-check-input"
                                value={this.state.validated_email}
                                onChange={this.onchangeUserActivate}
                                checked={ this.state.validated_email && "checked"}
                            />
                            <label className="form-check-label"
                                   htmlFor="activate_acc"
                                   style={{ 'font-size': '1rem'}}> Activate </label>
                        </div>

                        <br/>

                        <div className="form-group">
                            <input type="submit" value="Update" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            )
        }
    }


}