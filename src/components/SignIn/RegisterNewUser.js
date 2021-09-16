/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";
import './index.css'
import {Button,Form,Input,FormGroup,Label,Row} from 'reactstrap'
import submit from './submit'
//   const required = value => value ? undefined : 'Required'
//   const maxLength = max => value =>
//     value && value.length > max ? `Must be ${max} characters or less` : undefined
//   const maxLength15 = maxLength(15)
//   const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
// 
  const required = value => value ? undefined : 'Required'
  const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
  const minValue2 = minValue(4)


const validate = values => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Required'
    } else if (values.username.length > 15) {
      errors.username = 'Must be 15 characters or less'
    }
    if (!values.email) {
      errors.email = 'Please enter a valid email address'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Please enter a valid email address'
    }
 
    return errors
  }
  
  const warn = values => {
    const warnings = {}
    if (values.age < 19) {
      warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
  }
  
  const onSubmit = (values) =>{
    console.log(values);
  }
  
  const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      {/* <label>{label}</label> */}
      <div>
        <input {...input} class="form-control" placeholder={label}  type={type}/>
        <Row>
        {touched && ((error && <span style={{color:"red", marginLeft:"1em"}}>{error}</span>) || (warning && <span>{warning}</span>))}
        </Row>
        
      </div>
    </div>
  )

    const successFullLogin=()=>{
        alert("Login Success full")
    }



const RegisterNewUser = (props) => {

  //const { handleSubmit, pristine, reset, submitting } = props;
  const { error, handleSubmit, pristine, reset, submitting } = props

  return (
    <>
      
      <div>
            <div id="header" style={{backgroundColor:"none", background:"none" ,borderBottom:"2px solid #757575", boxShadow: "0 2px 5px 0 #757575"}} class="header navbar-default align-items-center">
                <div class="navbar-header">

                <div className="imgSizeHeader">
                    <img src="./images/GENESYS_logov2.png" alt="" class="navbar-brand" style={{ height:"4.5em"}} />
                    </div>

                {/* <div className="imgSizeHeader">
                    <img src="./images/GENESYS_logov2.png" alt="" class="navbar-brand" style={{width:"15em", height:"4.5em"}} />
                    </div> */}
                 
                    <button type="button" class="navbar-toggle" data-click="sidebar-toggled">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
            </div>
            <div class="container">
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"3em"}}>
                        {/* <img src="./images/GENESYS_logov2.png" style={{width:"35%"}} alt="" class="img-fluid" /> */}
                        </div>
                <div class="row justify-content-center mt-md-8">
                    <div class="col-md-6" style={{marginTop:"2em"}}>
                        <div class="bg-white px-3 py-3 signInContent" style={{borderRadius:"5px"}}>
                            <form action="/" method="POST">
                                <div class="form-group row my-4">
                                    <div class="col-md-12 text-center">
                                        <div class="">
                                            <img src="./assets/img/nvk-logo.png" alt="" class="img-fluid" />
                                        </div>
                                        <h1 class="f-w-400 mt-4">Forgot Password</h1>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <label for="plantSearch">Email <span class="text-danger">*</span></label>
                                        {/* <input type="text" class="form-control" placeholder="Email" /> */}
                                        <Field name="email" type="email" component={renderField} label="Email" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <button type="submit" className="btn btn-block btnSignIn"  style={{backgroundColor:"#5287f2"}} disabled={pristine || submitting}  onClick={handleSubmit(onSubmit)}>
                                            Click Here <img src="./assets/img/signin-ic.svg" />
                                        </button>
                                        <Link to="/">
                                        <p className="infostyle" style={{marginTop:25}}> <span className="infostyle" style={{color:"#4f91f7"}}>Return to Sign In</span></p>
                                            {/* <p className="infostyle" style={{marginTop:25}}><span style={{color:"#FF8C00"}}>Click here to </span> <span className="infostyle" style={{color:"#4f91f7"}}>Go Back</span></p> */}
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center mt-1">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-12 text-center"  style={{marginBottom:"6em"}}>
                            {/* <p class="textGrey">Trouble accessing your account or registering?<br/>
                                Contact <a href="#">support@nvkgenesys.com</a> </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footerBar py-3 mt-md-8" style={{position:"fixed", bottom:"0", height:"5em", width:"100%"}}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            {/* <ul class="list-unstyled list-inline mb-0">
                                <li class="list-inline-item">
                                    NVKGENESYS.COM
                                </li>
                                <li class="list-inline-item"> | 
                                    <a href="">TERMS OF USE</a>
                                </li>
                                <li class="list-inline-item"> | 
                                    <a href="">PRIVACY</a>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                        <p>Terms of Use | Privacy Policy <br></br>&copy; 2021 NVK Holdings Inc. All rights reserved.</p>
                            {/* <label class="mb-0"><small>© NVK Nurseries Inc. All Rights Reserved</small></label> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </>
  );
}

export default reduxForm({
  form: 'RegisterNewUser',
  validate,
  warn
})(RegisterNewUser);


