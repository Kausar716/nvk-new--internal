/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {connect} from "react-redux";
import {getUsersList,showUser,updateUser,addUser,uploadImage} from "../../actions/userAction";
import {handleOrganizationSettingsInputAction} from "../../actions/organizationSettingAction"
import {getRolesList} from "../../actions/userAccessAction";
import ActionModal from '../Modal/ActionModal';
import SuccessInUM from '../Modal/SuccessInUserProfile';
import InputMask from 'react-input-mask';


const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

const handleInput2 = (value) => {
  return (
    value.replace(phoneRegex, '($1) $2-$3')
  )
}

export class CreateUserProfile extends Component {  
    constructor(){
        super()
        this.state={
            firstName:"",
            lastName:"",
            phone:"",
            value: '',
            email:"",
            position:"",
            createButton:true,
            locationAccess:false,
            displayDeletedRecords:false,
            profileImage:"",
            displayExestingProfile:false,
            errorObj:{
                firstNameError:0,
                lastNameError:0,
                phoneError:0,
                emailError:0,     
                positionError:0           
            },

            hadModified:{
                name:false,
                last_name:false,
                phone:false,
                email:false,     
                position:false,   
                },

            errorCount:0,
            display:false,
            deleteProfile:false,
            dualLineModalToggle:false,
            modalMessage1:"",
            modalMessage2:"",
            userList:[],
            dropdownList:[],
            clickedCreate:false,
            message:"",
            open:false,
            cancel:false,
            logo:"",
            createdUser:{},
            selected: null,
            hasError: false
        }
    }



    componentDidMount(){
        this.props.getRolesList()   
    }

    handleChange2(value) {
        this.setState({ selected: value });
      }



      handleClick2() {
        this.setState({ hasError: false });
        if (!this.state.selected) {
          this.setState({ hasError: true });
        }
      }

    handleInput = (e) => {
       //debugger;
        console.log(e.target.value)
        const {target:{name,value}} =e
        let {errorObj,errorCount,hadModified} = this.state
        //this.setState({phone: e.target.value})
        this.setState({[name]:value})

        // if(errorObj.firstNameError>0){
        //     errorObj.firstNameError=0
        //     errorCount--
        // }          

        if(name === "firstName" ){
            // if(this.state.firstName.length<1){
            //     hadModified.name=false
            // }
            // else{
                hadModified.name=true
                // this.setState({
                //     createButton:true
                // })
            // }
           
            if(errorObj.firstNameError>0){
                errorObj.firstNameError=0
                errorCount--
            }           
        }
        else if(name === "lastName" ){
            hadModified.last_name=true

            // if(this.state.lastName.length<1){
            //     hadModified.last_name=false
            // }

            // else{
            //     hadModified.last_name=true
            //     // this.setState({
            //     //     createButton:true
            //     // })
            // }
           
           // hadModified.last_name=true
            if(errorObj.lastNameError>0){
                errorObj.lastNameError=0
                errorCount--
            }            
        }
        else if(name === "phone" ){
            hadModified.phone=true
            document.getElementById("contactPhone-validtor").innerText = ""
            if(errorObj.phoneError>0){
                errorObj.phoneError=0
                errorCount--
            }            
        }

        
        else if(name === "email" ){

            // if(this.state.email.length<1){
            //     hadModified.email=false
            // }
            // else{
            //     hadModified.email=true
            //     // this.setState({
            //     //     createButton:true
            //     // })
            // }
            
            
            hadModified.email=true
            if(errorObj.emailError>0){
                errorObj.emailError=0
                errorCount-- 
            }            
        }
        else if(name === "position"){
            hadModified.position=true
  
            if(errorObj.positionError>0){
                errorObj.positionError=0
                errorCount--
            }            
        }


        this.setState({errorObj,errorCount,hadModified})
        this.props.handleOrganizationSettingsInputAction(name,value)


        if(hadModified.name===true && hadModified.last_name===true && hadModified.position===true && hadModified.email===true )
                this.setState({
                    createButton:false
                })

    }





    handlImageUpload = (e) => {
        console.log(e)
        console.log(e.target.files[0])
        let imageData = e.target.files[0]
        // this.props.uploadImage(imageData)
        // this.setState({log:e.target.files[0]})
        this.setState({logo: URL.createObjectURL(e.target.files[0])})

    }
    validate = () =>{
         //debugger;
        let {errorObj,errorCount}=this.state
        //let phoneReg=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
         // let phoneReg=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let nameReg = /^[a-zA-Z]+$/
        // let phoneReg = new RegExp('^[0-9]+$');/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        let emailReg =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        console.log(emailReg.test(this.state.email))
        if(this.state.firstName.length === 0){
           errorObj.firstNameError=1
           errorCount++
        }
        if(!nameReg.test(this.state.firstName)){
            errorObj.firstNameError=1
           errorCount++
        }
        else{
            errorObj.firstNameError=0
        }


         if(this.state.lastName.length === 0){
             //debugger;
            errorObj.lastNameError=1
            errorCount++
        }
        else{
            errorObj.lastNameError=0
        }

      

        let enteredNumber = this.state.phone.trim().match(/\d/g)
        if (!enteredNumber ||  enteredNumber.join("").length<10 || enteredNumber.value === "") {
            document.getElementById("contactPhone-validtor").innerText = "Phone Number is not valid"
            errorObj.phoneError=1
            errorCount++
        }
        else {
            document.getElementById("contactPhone-validtor").innerText = ""
            errorObj.phoneError=0
            //errorCount--;
        }

       

        if(this.state.position.length === 0){
            console.log(this.state.position)
            errorObj.positionError=1
            errorCount++
        }


        // if(this.state.position.length === 0){
        //     //debugger;
        //     errorObj.positionError=1
        //     errorCount++
        // }
        // else{
        //     errorObj.positionError=0
        // }


         if(! emailReg.test(this.state.email)){
            errorObj.emailError=1
            errorCount++
        }


        this.setState({errorObj,errorCount})
        return errorCount
    }



    handleSubmit = (e) => {

        
       // debugger;
    //    this.setState({
    //     errorObj:{
    //         firstNameError:0,
    //         lastNameError:0,
    //         phoneError:0,
    //         emailError:0,     
    //         positionError:0           
    //     },
    //     errorCount:0
    //    })

         console.log("email already there", this.state.email)

       let count= this.validate()

       this.setState({ hasError: false });
       if (!this.state.selected) {
         this.setState({ hasError: true });
       }


       let finalNumber= this.state.phone;
     finalNumber=  finalNumber.replace(/[^\w\s]/g, "")
    let removedNumber = finalNumber.split(" ").join("");
    removedNumber = parseInt(removedNumber)
        console.log("removedNumber",removedNumber)


       let activeRecords = this.props.userListBackup.payload.active;
            // let existingEmail   = activeRecords.map(em=>e.email === this.state.email ? alert("email already exist") : "" )
            // if( activeRecords.map(em=>em.email === this.state.email)){
               
            //     // alert("email already exist")
            //     return;
            // }


    // else {
       console.log(count)
        if(count === 0){

           // debugger;

            console.log(this.state)
            let userStateObject = this.state
            let userObject={}  
            userObject['name'] = userStateObject.firstName
            userObject['last_name'] = userStateObject.lastName
           // userObject['role'] = userStateObject.position
            userObject['email'] = userStateObject.email
            userObject['phone'] = removedNumber
            userObject['role'] = userStateObject.position
            // userObject['password']
            // userObject['status'] = 

            console.log("success")
            console.log(userObject)
            let res = this.props.addUser(userObject)
            res.then(result=>{
                console.log(result)
                  
                console.log(this.props)
                if(this.props.user.payload.status === "Success"){
                    this.setState({createdUser:this.props.user.payload.data.user})
                    this.setState({open:true,message:this.props.user.payload.message})
                }
            })
            console.log(res)
        }

    // }
    }




    
    handleConfirm=()=>{
        this.setState({open:false})
        let userStateObject = this.state.createdUser
        console.log()
        this.props.handleCreateUpdateFlow(userStateObject)
    }
    handleCancel=()=>{
        this.setState({open:false})
    }
    render() {

        const { phone} = this.state;
        // const { classes } = this.props;
        const { selected, hasError } = this.state;



    //  const phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    //  let phno = phone ||'';
    //     let finalPhno= phno.replace(phoneReg,'($1) $2-$3')
  
           

        console.log("this.state.errorObj.positionError",this.state.errorObj.positionError, this.state.errorObj.lastNameError)
     console.log(this.props.roles)
     let roles=[]
     if(this.props.roles)roles = this.props.roles

     console.log("userListBackup", this.props.userListBackup.payload.active)


    //  let flag =0
    //  if(productDataById){       
    //      if(!productDataById.name || !productDataById.category_id || !productDataById.manufacturer_id || productDataById.category_id === "0"|| productDataById.manufacturer_id === "0"){
    //          flag=1
             
    //      }
         
    //  }

    console.log("this123456", this.state.firstName)

    // if(this.state.createButton===true){
    //     if(this.state.firstName.length<1 && this.state.lastName.length<1){

    //         this.setState({
    //           hadModified:{firstName:false}
    //         })
    //     }
    // }


    return (
        <>
         <SuccessInUM cancel={this.handleCancel} confirm={this.handleConfirm} open={this.state.open} message={this.state.message} />

                    <Tabs>
                      
                        <TabPanel>

    
                        <div class="pb-4">

                            <div class="bg-white">
                      
                                    <div class="row mt-3">
                                  
                                        <div class="col-md-8 col-lg-9 mt-3 mt-md-0">
                                            <div class="row form-group">
                                                <div class="col-md-6">
                                                    <label>First Name<span class="text-danger">*</span></label>
                                                    <input type="text" placeholder="First Name" class="form-control" name="firstName" value={this.state.firstName} onChange={this.handleInput} />
                                                    {this.state.errorObj.firstNameError!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid First Name</span>:""}
                                                </div>
                                                <div class="col-md-6 mt-3 mt-md-0">
                                                    <label>Last Name<span class="text-danger">*</span></label>
                                                    <input type="text" placeholder="Last Name" class="form-control" name="lastName" value={this.state.lastName} onChange={this.handleInput} />
                                                    {this.state.errorObj.lastNameError!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Last Name</span>:""}
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col-md-6">
                                                    <label>Position<span class="text-danger" >*</span></label>
                                                    <select class="form-control" name="position"  onChange={this.handleInput} value={this.state.position}>
                                                    <option>Select...</option>
                                                        {roles?roles.map(userObj=>{
                                                            console.log(userObj)
                                                            return  <option value={userObj.id}>{userObj.name}</option>
                                                        }):null}                                                        
                                                    </select>
                                                    {this.state.errorObj.positionError!==0 ? <span style={{fontSize:"small",color:"red"}}>Select Position</span>:" "}
                                                </div>


                                                
                                                {/* <div class="col-md-6" error={hasError}>
                                                    <label>Position<span class="text-danger" >*</span></label>
                                                    <select class="form-control" name="position"   onChange={event => this.handleChange2(event.target.value)} value={selected}>
                                                    <option> </option>
                                                        {roles?roles.map(userObj=>{
                                                            console.log(userObj)
                                                            return  <option value={userObj.id}>{userObj.name}</option>
                                                        }):null}                                                        
                                                    </select>
                                                    {hasError && <p style={{fontSize:"small",color:"red"}}>Select Position</p>}
                                                   
                                                </div> */}

                                                {/* <div class="col-md-6 mt-3 mt-md-0">
                                                    <label>Phone<span class="text-danger">*</span></label>
                                                    <input type="text" placeholder="(XXX)XXX-XXXX" class="form-control"  value={this.state.phone} onChange={this.handleInput} name="phone"/>
                                                    {this.state.errorObj.phoneError!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Phone Number</span>:""}
                                                </div> */}

                                                <div class="col-md-6 mt-3 mt-md-0">
                                                    <label>Phone<span class="text-danger">*</span></label>
                                                    {/* <input type="text" placeholder="(XXX)XXX-XXXX" class="form-control" 
                                                    value={finalPhno}

                                                    //  value={this.state.phone} 
                                                    // onChange={this.handleInput}
                                                     onChange={
                                                        (event) => this.setState({value: event.target.value})
                                                       } 
                                                     pattern="[0-9]*"
                                                     maxLength="10"
                                                     name="phone"/> */}
                                            {/* 
                                                <input
                                                    class="form-control"  
                                                    type="text"
                                                    name="phone"
                                                    placeholder="(xxx) xxx-xxxx"
                                                    value={finalPhno}
                                                    pattern="[0-9]*"
                                                   // value={organizationDataById.phone}
                                                    // value={this.state.phone}
                                                   // onChange={this.handleInput} 
                                                     //onChange={this.handleChange}
                                                     maxLength="10"
                                                     onChange={
                                                        (event) => this.setState({phone: event.target.value})
                                                       } 
                                                   
                                                /> */}
                                                    <InputMask
                                                    class="form-control"  
                                                    type="text"
                                                    name="phone"
                                                    placeholder="(xxx) xxx-xxxx"
                                                    value={this.state.phone}
                                                    id={"phone1"}
                                                   
                                                    mask="(999) 999-9999" maskChar={" "} 
                                                     onChange={this.handleInput}
                                                      /> 
                                              

                                                        {/* <InputMask type="text" placeholder="(XXX)XXX-XXXX" class="form-control"
                                                     mask="(999) 999-9999" maskChar={" "} 
                                                     value={this.state.phone} onChange={this.handleInput} name="phone"
                                                     /> */}

                                                    <span style={{fontSize:"small",color:"red"}} id="contactPhone-validtor"></span>


                                                    {/* {this.state.errorObj.phoneError!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Phone Number</span>:""} */}
                                                </div>



                                            </div>
                                            <div class="row form-group">
                                                <div class="col-md-6">
                                                    <label>Email<span class="text-danger">*</span></label>
                                                    <input type="text" placeholder="Email" class="form-control" value={this.state.email} onChange={this.handleInput} name="email" />
                                                    {this.state.errorObj.emailError!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Email</span>:""}
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col-md-12">
                                                    {/* <label>Location Assigned</label> */}
                                                    {/* <div class="locAssignBox">
                                                        <ul class="list-unstyled"> */}
                                                            {/* <li>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                                                                    <label class="custom-control-label pl-2" for="customCheck1">Farm A <span>1105 HWY5, Dundas, CN</span></label>
                                                                </div> 
                                                            </li>
                                                            <li class="active">
                                                                <div class="custom-control custom-checkbox">
                                                                    <input type="checkbox" class="custom-control-input" id="customCheck2"/>
                                                                    <label class="custom-control-label pl-2" for="customCheck2">Farm B <span>1105 HWY5, Dundas, CN</span></label>
                                                                </div> 
                                                            </li>
                                                            <li>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input type="checkbox" class="custom-control-input" id="customCheck3"/>
                                                                    <label class="custom-control-label pl-2" for="customCheck3">Farm C <span>1105 HWY5, Dundas, CN</span></label>
                                                                </div> 
                                                            </li>
                                                            <li>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input type="checkbox" class="custom-control-input" id="customCheck4"/>
                                                                    <label class="custom-control-label pl-2" for="customCheck4">Farm D <span>1105 HWY5, Dundas, CN</span></label>
                                                                </div> 
                                                            </li>
                                                            <li>
                                                                <div class="custom-control custom-checkbox">
                                                                    <input type="checkbox" class="custom-control-input" id="customCheck5"/>
                                                                    <label class="custom-control-label pl-2" for="customCheck5">Farm E <span>1105 HWY5, Dundas, CN</span></label>
                                                                </div> 
                                                            </li> */}
                                                        {/* </ul>
                                                    </div> */}
                                                    <div class="mt-3">
                                                        {/* <div class="custom-control custom-checkbox">
                                                            <input type="checkbox" class="custom-control-input" id="customCheck6"/>
                                                            <label class="custom-control-label pl-2" for="customCheck6">User has access to all locations </label>
                                                        </div>  */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {/* </div> */}
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4 col-lg-4 d-flex align-items-center">
                                    {/* Restore User */}
                                    {/* <div class="switcher ml-2 pr-md-3">
                                        <input type="checkbox" name="switcher_checkbox_2" id="switcher_checkbox_2" value="2"/>
                                        <label for="switcher_checkbox_2"></label>
                                    </div> */}
                                </div>
                                <div class="col-md-8 col-lg-8 text-md-right mt-3 mt-md-0">
                                    <button type="button" class="btn btn-outline-secondary btn-lg" onClick={this.props.cancle}>Cancel</button>
                                    <button type="button" class="btn btn-primary btn-lg ml-3" disabled={!(this.state.firstName && this.state.lastName && this.state.email && this.state.phone && this.state.position>0) } onClick={this.handleSubmit}>Create</button>
                                </div>
                            </div>
                        </div>
                        </TabPanel>
                        {/* <TabPanel>
                            <div class="bg-white">
                                <h4 class="p-15 mb-0">User Access</h4>
                            </div>
                        </TabPanel> */}
                </Tabs>
            {/* </div> */}
        {/* </div> */}
        {/* {this.state.errorObj.emailError!=0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Email</span>:""} */}
        </>
    )
}}


const mapStateToProps = (state)=> (
    // console.log(state)
    {
        users:state.userReduser.users,
        userListBackup:state.userReduser.userBackup,
        roles:state.userAccessReduser.roles,
        user:state.userReduser.user
}

)

export default connect(mapStateToProps,{getRolesList,addUser,uploadImage, handleOrganizationSettingsInputAction})(CreateUserProfile)