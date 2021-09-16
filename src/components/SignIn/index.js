/* eslint-disable jsx-a11y/anchor-is-valid */
import React,  { Component } from 'react' ;
// import {v4 as uuidv4} from 'uuid';
import {Button,Form,Input,FormGroup,Label} from 'reactstrap'
import {authEmailPassword,checkLogin} from "../../actions/authAction";
import {connect} from "react-redux";
//import {getAllImageAssets} from "../Utility/Utility";
// import { Left } from 'react-bootstrap/lib/Media';
//const IconAssets =  getAllImageAssets();
// import { Left } from 'react-bootstrap/lib/Media';
import { Link } from "react-router-dom";
import './index.css'

class SignIn extends Component{
 
    constructor(props){
        super(props)
        this.state = {
            emailId:'',
            password:''
        }
  
    }

    onChange =(e)=>{
        this.setState({[e.target.id]:e.target.value})

    }
    onSubmitForm = async(e) =>{
        e.preventDefault();
        const userObject = {
            emailId : this.state.emailId,
            password : this.state.password
        }
        this.props.authEmailPassword(userObject)
        this.props.checkLogin(userObject)
            
        
    }
    render(){
        //const authKey = this.props.authKey
        // alert(authKey.loggedIn)
        return(
            <div style={{backgroundColor:"white"}}>
                <header>
                <div>
                    <a href="#" style={{float:"left"}}><img  src={process.env.PUBLIC_URL + "/images/logo.png"} alt="no iamge" id="logo1"/></a>
                </div>
                <div style={{clear:"both"}}></div>

                </header>
                <div >
                    <a href="#" ><img src={process.env.PUBLIC_URL + "/images/signin.png"} alt="no iamge" id="logo" style={{display: "block",marginLeft:"34.8%", marginRight:"auto",marginTop:10,width:"28%",height:"25%"}}/></a>
                    <div className="signin">
           
             <Form className="signin_form" id="submit" onSubmit={this.onSubmitForm}>
             <p style={{color:"#787d82",fontWeight:"bold",padding:0,margin:0}}>Returning User</p>
                 <p style={{color:"#787d82",fontSize:12}}>Please enter your username and passowrd to sign in.</p>
                 <hr style={{borderTop:"1px dotted #787d82"}}></hr>
             <p style={{textAlign:"center",display:this.props.authKey.error?"block":"none",color:"red"}}>Wrong email and password</p>
                    <div class="input-icons1">
                    <i class="fa fa-user icon1">
                </i>
                    <input class="input-field1" 
                       type="email" name="emailId" id="emailId" placeholder="Enter Email" onChange={this.onChange}/>
                </div>
   	            <div class="input-icons1">
                    <i class="fa fa-lock icon1">
                </i>
                    <input class="input-field1"  type="password"
                     name="password" id="password" placeholder="Enter Password" onChange={this.onChange}/>
                </div>
                {/* <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                    <Label for="Password" className="me-sm-2">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Enter Password" onChange={this.onChange}/>
                </FormGroup> */}
                <br/>
                <div style={{float:"left"}}>
                <FormGroup check >
                        <Label check>
                            <Input type="checkbox" style={{top:"5px"}}/>{' '}
                            <span className="infostyle" style={{top:"8px",color:"gray"}}>Keep me signed in</span>
                        </Label>
                        
                    </FormGroup>
                    <p className="infostyle" style={{marginTop:25}}><span style={{color:"#FF8C00"}}>Not yet registered? </span> <span className="infostyle" style={{color:"#4f91f7"}}>click here</span></p>
                </div>
                <div style={{float:"right",marginTop:7}}>
                <FormGroup >
                    <Label>
                    <p className="infostyle" style={{color:"gray"}}>I forgot my password?</p>
                    <Link to="/Dashboard" >   <Button className="loginbutton" style={{backgroundColor:"#d07510",border:"1px solid white",marginLeft:22,position:"relative",paddingRight:25, borderBottom:"4px solid #ad4902"}} ><span >SIGN IN</span> <span class='bx bxs-right-arrow-circle' style={{fontSize:"15px",verticalAlign:"middle",position:"absolute",top:11,left:75}}></span></Button>
                    </Link>
                    </Label>
                </FormGroup>
                    
                </div>
                <hr style={{marginTop:90}}/>
                <div className="infostyle" style={{textAlign:"center"}}>
                    {/* <p className="logincontactInfo" style={{color:"gray"}}>Trouble accessing your account or registering ?</p>
                    <p className="logincontactInfo" style={{color:"gray"}}>Contact <span  style={{color:"#4f91f7"}}>support@nvkgenesys.com</span></p> */}
                </div>
            </Form>
            <p>version:0.0.0.2</p>
            </div>
                </div>
                <footer>
                    <p>Terms of Use | Privacy Policy <br></br>&copy; © 2021 NVK Holdings Inc. All rights reserved.</p>
                   
                    {/* <p>&copy; Nurseries. All Rights Reserved</p> */}
                   

                </footer>
            </div>
            
        )
    }

}
const mapStateToProps = (state)=> ({
    authKey:state.authKey
  })
  export default connect(mapStateToProps,{authEmailPassword,checkLogin})(SignIn)

