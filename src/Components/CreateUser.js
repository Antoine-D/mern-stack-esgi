import React, { Component } from 'react';

import axios from 'axios';

import { Formik } from "formik";
import * as hash from "password-hash"; // Used to Hash password
import * as EmailValidator from "email-validator";
import Nav from "./Navbar/nav"; // used when validating with a self-implemented approach

const uri = require("../env").api_uri;
const Subscribe = () => (
    <Formik
        initialValues={{ email: "", password: "" , password_conf: "", name: "", lastname: "", birthdate: "", validated_email: false}}
        validate={ async values => {
            let errors = {};
            if (!values.email) {
                errors.email = "Required";
            } else if (!EmailValidator.validate(values.email)) {
                errors.email = "Invalid email address.";
            }
            const passwordRegex = /(?=.*[0-9])/;
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 8) {
                errors.password = "Password must be 8 characters long.";
            } else if (!passwordRegex.test(values.password)) {
                errors.password = "Invalid password. Must contain one number.";
            }
            if (!values.password_conf) {
                errors.password_conf = "Required";
            } else if( values.password !== values.password_conf){
                errors.password_conf = "Passwords doesn't match";
            }
            if (!values.name) {
                errors.name = "Required";
            }
            if (!values.lastname) {
                errors.lastname = "Required";
            }
            if (!values.birthdate) {
                errors.birthdate = "Required";
            }

            await axios.get(uri + '/users/email/'+values.email)
                .then(response => {
                    //console.log( response)
                    if( response.data !== null ){
                        errors.email = "This email is already used";
                    }
                })
                .catch(function (error){
                })
            return errors;
        }}
        onSubmit={(values, { resetForm, setErrors, setStatus }) => {

            values.validated_email = false
            values.password = hash.generate(values.password);

            try{
                axios.post(uri + '/users/new', values)
                resetForm({})
                setStatus({success: "An email has been sent to confirm your account."})
                this.props.history.push('/');
            }catch ( error ){
                //setStatus({success: false})
                setErrors({submit: error.message})
            }
        }}
    >
        {props => {
            const {
                values,
                touched,
                errors,
                status,
                handleChange,
                handleBlur,
                handleSubmit
            } = props;

            return (

                <div>
                    <Nav />
                    <h3>Register</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input  type="text"
                                    className={ "form-control " + ( errors.name && touched.name && " error" )}
                                    name="name"
                                    placeholder="Enter your name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                            />
                            {errors.name && touched.name && (
                                <div className="input-feedback">{errors.name}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Lastname: </label>
                            <input
                                type="text"
                                name="lastname"
                                className={ "form-control " + ( errors.lastname && touched.lastname && " error" )}
                                placeholder="Enter your lastname"
                                value={values.lastname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lastname && touched.lastname && (
                                <div className="input-feedback">{errors.lastname}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Birth Date: </label>
                            <input
                                type="date"
                                name="birthdate"
                                className={ "form-control " + ( errors.birthdate && touched.birthdate && " error" )}
                                value={values.birthdate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.birthdate && touched.birthdate && (
                                <div className="input-feedback">{errors.birthdate}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Email: </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className={ "form-control " + ( errors.email && touched.email && " error" )}
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email && (
                                <div className="input-feedback">{errors.email}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Password: </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className={ "form-control " + ( errors.password && touched.password && " error" )}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password && (
                                <div className="input-feedback">{errors.password}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Password Confirmation: </label>
                            <input
                                type="password"
                                name="password_conf"
                                placeholder="Confirm your password"
                                className={ "form-control " + ( errors.password_conf && touched.password_conf && " error" )}
                                value={values.password_conf}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password_conf && touched.password_conf && (
                                <div className="input-feedback">{errors.password_conf}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Register" className="btn btn-primary" />
                        </div>
                        {status !== undefined && (
                            <div className="alert-success">{status.success}</div>
                        )}
                    </form>
                </div>
            );
        }}
    </Formik>
);


export default Subscribe;