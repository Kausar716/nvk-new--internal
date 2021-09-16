/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState , useEffect} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, useHistory } from "react-router-dom";
import './index.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import {Button,Form,Input,FormGroup,Label,Row} from 'reactstrap'
import submit from './submit'
//   const required = value => value ? undefined : 'Required'
//   const maxLength = max => value =>
//     value && value.length > max ? `Must be ${max} characters or less` : undefined
//   const maxLength15 = maxLength(15)
//   const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
// 
  const required = value => value ? undefined : 'Please enter a valid password'
  const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
  const minValue2 = minValue(4)
  const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined
//   const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
//     <div>
//       {/* <label>{label}</label> */}
//       <div>
//         <input {...input}  className="inputBoxDesign2" placeholder={label}  type={type}/>
//         <Row>
//         {touched && ((error && <span style={{color:"red", marginLeft:"1em"}}>{error}</span>) || (warning && <span>{warning}</span>))}
//         </Row>
        
//       </div>
//     </div>
//   )

const validate = values => {
    const errors = {}
    if (!values.password || values.password === 'undefined') {
        errors.password = 'Please enter a valid password'
    }
    if (!values.username) {
      errors.username = 'Please enter a valid email address'
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
  


  const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    console.log("input123",input) 
   return(
    <div>
      {/* <label>{label}</label> */}
      <div>
        <input {...input} class="form-control" placeholder={label} 
          type={type} onchange={changingValue}/>
        <Row>
        {touched && ((error && <span style={{color:"red", marginLeft:"1em"}}>{error}</span>) || (warning && <span>{warning}</span>))}
        </Row>
        
      </div>
    </div>
  
   )}


   const onFocus = event => {

    if(event.target.autocomplete)
    {
      event.target.autocomplete = "whatever";
    }
 
 };

const changingValue=()=>{
    alert("abcd")
}


const SignInPage = (props) => {
    let history = useHistory();

  //const { handleSubmit, pristine, reset, submitting } = props;
  //const [renderPage , setRenderPage] = useState()
  const { error, handleSubmit, pristine, reset,invalid, submitting } = props


  console.log("error", error);
  const successFullLogin=()=>{
            history.push("/Dashboard")
   
    }


    useEffect (()=>{


    },[]);



  return (
    <>
      
      <div>
            <div id="header" style={{backgroundColor:"none", background:"none" ,borderBottom:"2px solid #757575", boxShadow: "0 2px 5px 0 #757575"}} class="header navbar-default align-items-center">
                <div class="navbar-header">
                    {/* <a href="#" class="navbar-brand" style={{float:"left"}}> */}
                    <div className="imgSizeHeader">
                    <img src="./images/GENESYS_logov3.png" alt="" class="navbar-brand" style={{height:"4.5em"}} />
                    </div>
                       
                  
                    <button type="button" class="navbar-toggle" data-click="sidebar-toggled">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
            </div>
            <div class="container" >
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"3em"}}>
                        {/* <img src="./images/GENESYS_logov2.png" style={{width:"35%"}} alt="" class="img-fluid" /> */}
                        </div>
                <div class="row justify-content-center mt-md-8">
                        
                    

                    <div class="col-md-6" style={{marginTop:"-2em"}}>
                        <div class="bg-white px-3 py-3 signInContent" style={{borderRadius:"5px", lineHeight:"21px"}}>
                            <form action="/" method="POST">
                                <div class="form-group row my-4">
                                    <div class="col-md-12 text-center">
                                        <div class="">
                                            {/* <img src="./images/logo.png" alt="" class="img-fluid" /> */}
                                           
                                            <img src="./assets/img/nvk-logo.png" alt="" class="img-fluid" />
                                        </div>
                                        <h1 class="f-w-400 mt-8">Sign in to continue</h1>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <label for="plantSearch">Email <span class="text-danger">*</span></label>
                                        {/* <input type="text" class="form-control" placeholder="Email" /> */}
                                        <Field name="email" type="email" component={renderField} label="Email"  autoComplete="off"/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <label for="plantSearch">Password <span class="text-danger">*</span></label>
                                        <div class="passwordInput">
                                            {/* <input type="text" class="form-control" placeholder="Password" /> */}
                                            <Field
                                            name="password"
                                            type="password"
                                            component={renderField}
                                            label="Password"
                                            validate={[ required, minValue2]}
                                            />
                                            {error && <strong>{error}</strong>}
                                            {/* <button type="submit" class="btn btn-pwd"><i class="fas fa-eye-slash"></i></button> */}
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-6 col-md-6">
                                        <div class="custom-control custom-checkbox mb-1">
                                            <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                            <label class="custom-control-label" for="customCheck1">Remember me</label>
                                        </div>
                                    </div>
                                    <div class="col-6 col-md-6 text-right">
                                    <Link to="/forgot" >Forgot Password?</Link>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-12">       
                                        <button type="submit" style={{backgroundColor:"#5287f2"}} className="btn btn-block btnSignIn" disabled={ pristine || submitting}  onClick={successFullLogin}>
                                        {/* pristine || */}
                                            Sign In <img src="./assets/img/signin-ic.svg" />
                                        </button>
                                    </div>
                                </div>
                                <div class="form-group row mb-0">
                                    <div class="col-md-12 text-center">
                                    <label class="textGrey">Contact your administrator for account inquiries.</label> 
                                    {/* <Link to="/registerNewUser" >Request Now</Link> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center mt-1">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-12 text-center" style={{marginBottom:"5em"}}>
                            {/* <p class="textGrey">Trouble accessing your account or registering?<br/></p> */}
                                {/* Contact <a href="#">support@nvkgenesys.com</a>  */}
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
                                    <a href=""> &nbsp; TERMS OF USE</a>
                                </li>
                                <li class="list-inline-item"> | 
                                    <a href=""> &nbsp; PRIVACY</a>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                        <p>Terms of Use | Privacy Policy | Version Number: 0.0.11.4 <br></br>&copy; 2021 NVK Holdings Inc. All rights reserved.</p>
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
  form: 'SignInPage',
  validate,
  warn
})(SignInPage);
