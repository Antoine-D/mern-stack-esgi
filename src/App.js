import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GetUser from "./Components/GetUser";
import CreateUser from "./Components/CreateUser";
import EditUser from "./Components/EditUser";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Profile from "./Components/Profile";
import Landing from "./Components/Landing";
import DeleteUser from "./Components/DeleteUser";
import VerifyToken from "./Components/VerifyToken";
// check token to see if the user is still logged in


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: ''
        }
    }

    islogged(){
        let token = localStorage.getItem("token");

        return !!token;
    }

    componentDidMount() {
        this.setState({ auth: this.islogged() })
    }

    componentDidUpdate( prevProps, prevState) {
        let auth = this.islogged();
        //console.log( prevProps )
        if( auth !== prevState.auth ){
            this.setState({ auth: auth })
        }
    }

    render() {

        return (
                <Router>
                    <div className="container">
                        <Route exact path="/home" component={Landing}/>
                        <Route exact path="/" component={Login} auth={this.state.auth} />
                        <Route exact path="/all" component={GetUser} />
                        <Route exact path="/edit/:id" component={EditUser} />
                        <Route exact path="/delete/:id" component={DeleteUser} />
                        <Route exact path="/me" component={Profile} />
                        <Route path="/create" component={CreateUser} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/token/:token" component={VerifyToken} />
                    </div>
                </Router>




        );
    }
}

/*
 <Route exact path="/all" component={GetUser} />
<Route exact path="/edit/:id" component={EditUser} />
<Route path="/create" component={CreateUser} />
 */
export default App;