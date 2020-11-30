import React, {Component} from 'react';
import { Link } from 'react-router-dom';


import "../../403.css";
import Nav from "../Navbar/nav";

export default class E403 extends Component{

    render() {
        return (
            <div className='container'>
                <Nav />
                <div className="gandalf">
                    <div className="fireball"></div>
                    <div className="skirt"></div>
                    <div className="sleeves"></div>
                    <div className="shoulders">
                        <div className="hand left"></div>
                        <div className="hand right"></div>
                    </div>
                    <div className="head">
                        <div className="hair"></div>
                        <div className="beard"></div>
                    </div>
                </div>
                <div className="message">
                    <h1>403 - You Shall Not Pass</h1>
                    <p>You need to authenticate yourself to access this ressource !</p>
                </div>
                <p><Link to='/'>Back to Home</Link></p>
            </div>
        )
    }
}
