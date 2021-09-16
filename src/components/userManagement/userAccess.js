/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import {  Tabs,  TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {connect} from "react-redux";
import Autocomplete from '@material-ui/lab/Autocomplete';
import QuoteOrderPermission from './QuoteOrderPermission';
import TextField from '@material-ui/core/TextField';
import {getRolesList,showRole,addRoler,updateRole,deleteRole,getPermissionList,handleUserUpdateUserPermission,
    handleUserAccessInputAction,handleUserSelect, resetUserData, tabChangeValues, displaySelectedUSERS, handleUserAccessExchnageData,userAccessList,resetUserSelect} from "../../actions/userAccessAction";
import {getUsersList,showUser} from "../../actions/userAction";
//import {getRolesList, tabChangeValues} from "../../actions/userAccessAction";
import { Link ,withRouter} from "react-router-dom";

export const Component = withRouter(({ history, location }) =>{

})


 class UserAccess extends React.Component{
    constructor(props){
        super(props)
        this.state={    
            displayselectedUSer:false,
            selectedUser:{}
        }
    }
        
     
    handleCheckBox = (e) => {
        console.log(e.target)
        const {target:{name,checked,id}} =e
        // this.setState({[name]:checked})
        console.log(name.id)
        this.props.handleUserAccessInputAction(name,id,checked)

    }

    componentDidMount(){
        this.props.getUsersList()
        this.props.getRolesList()
        this.props.getPermissionList()
        this.props.resetUserData()

        
        //this.props.displaySelectedUSERS()
       
    }
   
    
    handleUpdate = (e) => {
        // let createRoleToggle = ! this.state.createRoleToggle
        // this.setState({createRoleToggle})
        console.log("123",this.props.temp.currentPermission,this.state.selectedUser )
        if(this.state.selectedUser){
        let result=this.props.handleUserUpdateUserPermission(this.state.selectedUser,this.props.temp.currentPermission)
        result.then(res=>{
            alert("updated")
        })
        }
    }

    // handleUpdateUserAccess = (id,userObjectList) => {
    //     // let createRoleToggle = ! this.state.createRoleToggle
    //     // this.setState({createRoleToggle})
    //     //console.log("123",this.props.temp.currentPermission,this.state.selectedUser )
    //     if(this.state.selectedUser){
    //     let result=this.props.handleUserUpdateUserPermission(this.state.selectedUser,userObjectList)
    //     result.then(res=>{
    //         alert("updated")
    //     })
    //     }
    // }


    handleUpdateUserAccess = (userObject) => {
       // debugger
        // let createRoleToggle = ! this.state.createRoleToggle
        // this.setState({createRoleToggle})
        //console.log("123",this.props.temp.currentPermission,this.state.selectedUser )
        // if(this.state.selectedUser){
        // let result=this.props.handleUserUpdateUserPermission(this.state.selectedUser, userObject)
        // result.then(res=>{
        //     alert("updated")
        // })
        // }
    }
    
    handlecreateRoleModalResult = (e) => {
        console.log(e.target.id)
        let createRole
        if(e.target.id=== "success"){
            createRole=true
        }
        else{
            createRole=false
        }
        this.setState({createRole,createRoleToggle:false})
    }
    handleDelete = () => {
        this.setState({deleteRoleToggle:true})
    }
    handleDeleteRoleModalResult = (e) => {
        console.log(e.target.id)
        let deleteRole
        if(e.target.id=== "success"){
            deleteRole=true
        }
        else{
            deleteRole=false
        }
        this.setState({deleteRole,deleteRoleToggle:false})
    } 
    handleRoleSelect = (e) => {
        
    }


    saveAndGo =()=>{
        const { history } = this.props;


            this.handleUpdate();
            // history.push("/usermanagement")
            this.goBackFunction();

     }
   

    handleUserSelect = (e) =>{
       //debugger;
        console.log(e.target.value)
        let selectedId = e.target.value
        console.log(this.props.users)
        let userProfiles  =  [...this.props.users.active]
        console.log("dcscd", userProfiles)

        let finalValue = userProfiles.filter(itemInArray => itemInArray.id === parseInt(selectedId));
        // let result = this.props.showUser(selectedId)
        console.log("finalValue",finalValue)

        this.props.handleUserSelect(parseInt(selectedId))
        this.props.userAccessList(finalValue[0].name)
        this.props.handleUserAccessExchnageData(e.target.value,e.target.id,e.target.name)
       // this.props.handleSupplierExchnageData(e.target.value,e.target.id,"supplierLocation")
        //handleUserAccessExchnageData

        this.setState({
            selectedUser:e.target.value,
            //displayselectedUSer:true
        })
        this.props.displaySelectedUSERS(true)
           // this.props.parentCallback(this.handleUserSelect)
    }




    toggleChecked=(e)=>{
        this.setState({displayselectedUSer: !this.state.displayselectedUSer})
    }

    goBackFunction =(e)=>{
        this.props.cancle();
        // const { history } = this.props;
        // setTimeout(function() {
        //     history.push("/usermanagement")
        //     window.location.reload();
        //  }, 1000);
       // let id= "Select..."
        this.props.getUsersList()
        this.props.getRolesList()
        this.props.getPermissionList()
        this.props.resetUserData()
        this.props.resetUserSelect()
        this.props.displaySelectedUSERS(false)
     //   this.props.cancel()
       let selectedId = "Select..."
      //  this.props.handleUserSelect(selectedId)

        // this.setState({
        //     displayselectedUSer:false,
        //    // selectedUser:selectedId,
        // })

      
       
    }


    goToUserProfile=(e)=>{
        //debugger
       // alert("going user access ?")
        // this.setState({
        //     tabValues:1
        // })
        this.props.tabChangeValues(0) 
       console.log(this.props.reduxSelectedUser )
       //this.props.reduxSelectedUser.selectedUser.data.id.toString().length
        if(this.props.reduxSelectedUser.selectedUser){
            this.props.tabChangeValues(0) 

            let userList = this.props.users.active
            let id = this.props.reduxSelectedUser.selectedUser.data.id
            console.log(id)
              let selectedUser  =  userList.filter(obj=>{
                return (parseInt(obj.id) === parseInt(id))
            })

            this.props.onTagsChange(e, selectedUser[0])


        }
        

    
    }

    userProfileOpen=(e)=>{

        //debugger


        this.props.tabChangeValues(0)  
        console.log("abcdefghijk", e)
        let userList = this.props.users.active
        let id = e
        console.log(id)
          let selectedUser  =  userList.filter(obj=>{
            return (parseInt(obj.id) === parseInt(id))
        })

        this.props.onTagsChange(e, selectedUser[0])
        // this.props.selectedUserP=selectedUser[0];
        // this.props.displayUpdateProfileP=true;
       // this.setState({this.props.selectedUserP:selectedUser[0]})
        // this.setState({displayUpdateProfile:true})
        
    }





    render(){

        

        console.log("swithchigTAB",this.props.userAccessSelectList )
        console.log("getRolesList", this.props.roles)
        let userProfiles = []  
        let selectedUser = this.props.user.data
        let exestingRoles = []
        let exestingPermission = []
        let currentPermissionNames= this.props.temp.currentPermissionNames

        console.log("currentPermissionNamess",this.props.temp)
        let userData = {}
        // if(this.props.user)
        // {
        //     console.log(this.props.user)
        //     if(this.props.user.user){
        //     userData=this.props.user.user.data
        //     if(this.props.user.user.data.roles)
        //     exestingRoles = this.props.user.user.data.roles
        //     console.log(userData)
        //     }
        // }
        if(this.props.permissionList){
            exestingPermission = this.props.permissionList.payload
        }
        console.log(this.props.users)
        if(this.props.users !== undefined){
            console.log(this.props.user)
            userProfiles =  [...this.props.users.active,...this.props.users.inactive]

        }
        console.log(this.props.reduxSelectedUser)
       console.log("exestingPermission", exestingPermission)
       let tempImage = "./images/profile.png";
       //noPerson.png";


       console.log("exestingRoles",exestingRoles )
       
   
     console.log("prospsssHERE", this.props)
       
    return (
        <>

                <Tabs>
                   
                    <TabPanel>
                        <div>

                    <div class="pb-4">
                        <div class="bg-white">
                            <div class="row mb-3 mb-md-0">
                                <div class="col-md-6 col-lg-6">
                                    <div class="f-s-24 px-3 py-3 f-w-500">User Access&nbsp;-<span class="f-s-18 p-15 mb-0" style={{marginLeft:"-11px"}}>Add, Edit or Remove Permissions</span></div>
                                </div>

                                <div class="col-md-6 col-lg-6" style={{marginTop:"1em"}}>
                                {this.props.displaySelectedUSER1 ?
                                //this.state.displayselectedUSer? 
                                    <div class="topbarCtrls mt-3 mt-md-0 d-flex flex-wrap justify-content-md-end" style={{marginBottom:"1em", marginRight:"1em"}}>

                                            <a class="btn ml-2"
                                           //onClick={this.handleUpdate}
                                            onClick={this.handleUpdateUserAccess}
                                        
                                            >
                                                    <span class="d-flex align-items-center text-left">
                                                        <img src="assets/img/save-ic.svg" alt=""/>
                                                        <span class="ml-2"><b>Save  </b></span>
                                                    </span>
                                                </a>

                                                <a  class="btn ml-2 mt-3 mt-md-0" 
                                                onClick={this.saveAndGo}
                                                //  onClick={()=>checkedData==true?saveCustomerData1("done"):""}
                                                >
                                                    <span class="d-flex align-items-center text-left">
                                                        <img src="assets/img/saveDone-ic.svg" alt=""/>
                                                        <span class="ml-2"><b>Save &amp; Done</b></span>
                                                    </span>
                                                </a>

                                                <a href="#" class=" ml-2 mt-3 mt-md-0">
                                                    <img src="assets/img/close-ic.svg" alt=""  onClick={this.goBackFunction}/>
                                                </a>
                                    </div>:null}
                             </div>
                            </div>
                            <hr class="m-0"/>
                            <div class="ContentSection p-15">
                                <div class="row">
                                    <div class="col-md-12 col-lg-12">
                                        <div class="bg-grey-transparent-2 text-center px-2 py-2">
                                            <div class="d-flex align-items-center justify-content-center"><img src="assets/img/bulp-ic.svg" alt=""/><h5 class="ml-2 mb-0">Did you know?</h5></div>
                                            <p class="m-0">Only active users will are visible to set permissions. User profile can be set or modified via<span className="linkTag" 
                                            //onClick={this.props.reduxSelectedUser.selectedUser.data.id.length>1 ? ()=>this.userProfileOpen(this.props.reduxSelectedUser.selectedUser.data.id) : this.goToUserProfile} 
                                             onClick={this.goToUserProfile}
                                            >&nbsp;User Profiles</span>.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4">
                            <h3>Select user name to edit permissions</h3>
                            <div class="bg-white mt-2">
                                <div class="ContentSection p-15">
                                    <div class="row">
                                        <div class="col-md-6 col-lg-5">
                                            <div class="bg-grey-transparent-2 px-3 py-3" style={{marginTop:"12px"}}>
                                                <div class="row align-items-center">
                                                    <div class="col-md-3 col-lg-3">
                                                        {/* <div className="profImg" style={{width:"60%", height:"60%"}}> */}
                                                        <div className="backgroundImageCoverSmall" style={{margin:'auto'}}>
                                                        <img src=
                                                         {
                                                        this.props.reduxSelectedUser?this.props.reduxSelectedUser.selectedUser?this.props.reduxSelectedUser.selectedUser.data.avatar===null?tempImage:"https://zvky.flamingotech.ml/"+this.props.reduxSelectedUser.selectedUser.data.avatar :tempImage:tempImage}
                                                         className="resposiveImageParentsmall"
                                                        //   style={{ width:"auto", height:"7em", borderRadius:"50%"}}  class="img-fluid" 
                                                          />
                                                            </div>
                                                   
                                                        {/* <img src="assets/img/profile-img.png" class="img-fluid" /> */}
                                                        {/* </div> */}
                                                       
                                                    </div>
                                                    {this.props.displaySelectedUSER1 ?
                                                    //this.state.displayselectedUSer?
                                                    <div class="col-md-9 col-lg-9">
                                                        <p class="mb-0" style={{fontWeight:"bold"}}>{this.props.reduxSelectedUser?this.props.reduxSelectedUser.selectedUser?this.props.reduxSelectedUser.selectedUser.data.name:"":""}</p>
                                                        <div>{this.props.reduxSelectedUser?this.props.reduxSelectedUser.selectedUser?this.props.reduxSelectedUser.selectedUser.data.email:"":""}</div>
                                                        <a href="#"  onClick={()=>this.userProfileOpen(this.props.reduxSelectedUser.selectedUser.data.id)} class="mt-3 d-block">View Profile <img src="assets/img/edit-blue-ic.svg"  /></a>
                                                    </div>:null}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-5 mt-3 mt-md-0">
                                            <div class="row align-items-end">
                                                <div class="col-md-8">
                                                    <div>
                                                        <h5>Select User Profile</h5>


                                                        <select class="form-control" name="userList" id="userList" value={this.props.userAccessSelectList} onChange={this.handleUserSelect}>
                                                        <option>{this.props.userAccessSelectList}</option>
                                                        {userProfiles[0]?userProfiles.map(userObj=>{
                                                           
                                                            return  <option id={userObj.name} value={userObj.id}>{userObj.name}</option>
                                                        }):""}
                                                        </select>

                                                        {/* <Autocomplete 
                                             
                                                                //onChange={this.onTagsChange} 
                                                                onChange={this.handleUserSelect}
                                                                options={userProfiles}
                                                                id={userProfiles.map(id=>id.id)}
                                                                // value={(option)=>option.id}
                                                                getOptionLabel={(option) => option.name +"  "+ option.last_name}
                                                                style={{ width: 300 }}
                                                                autoHighlight
                                                                renderInput={(params) => <TextField {...params} label="Select..." variant="outlined" />}
                                                         /> */}


                                                    </div>
                                                    <div class="mt-2">
                                                        <h5>Load Existing Role</h5>
                                                        {/* <select class="form-control">
                                                            <option>User</option>
                                                            <option>Option 1</option>
                                                            <option>Option 2</option>
                                                        </select>this.props.roles */}
                                                        <select class="form-control"  onChange={this.handleRoleSelect}>
                                                        <option >None</option>

                                                        {exestingRoles?exestingRoles.map(role=>{
                                                                    return(
                                                                        <option value={role.id}>{role.name} </option>
                                                                    )
                                                                }):null                                       
                                                        }
                                                        {/* {exestingRoles?exestingRoles.map(role=>{
                                                                    return(
                                                                        <option value={role.id}>{role.name} </option>
                                                                    )
                                                                }):null                                       
                                                        } */}
                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-4 mt-2 mt-md-0">
                                                    <a href="#" class="deleteRoleLink">
                                                        <img src="assets/img/delete.svg" class="mr-2" />
                                                        Delete Role
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     {
                    // this.state.displayselectedUSer? 
                     this.props.displaySelectedUSER1 ?
                       <div class="mt-4">
                            {/* <div class="row">
                                <div class="col-md-12 d-flex justify-content-md-end">
                                <span style={{float:"right"}}>Turn All Permissions On</span>
                                                <div class="switcher switcher-sm ml-2 pr-2" style={{marginRight:"5em"}}>
                                                            <input type="checkbox" name="turnOn" id="turnOn"
                                                            onChange={this.handleCheckBox} 
                                                              />
                                                            <label for="turnOn"></label>
                                                </div>



                                    <span style={{float:"right", marginRight:"0em", marginLeft:"-5em"}}>Turn All Permissions Off</span>
                                    <div class="switcher switcher-sm ml-2 pr-2">
                                                            <input type="checkbox" name="turnOff" id="turnOff"
                                                            onChange={this.handleCheckBox} 
                                                              />
                                                            <label for="turnOff"></label>
                                    </div>
                                </div>
                            </div> */}








                            {/* <div  class="bg-white mt-2">
                                <div class="ContentSection p-15">
                                    <h4>Quote &amp; Order PermissionsTESTING</h4>
                                    <div > */}
                                        <div >
                                            <QuoteOrderPermission  handleUpdateUserAccess={this.handleUpdateUserAccess}  cancelSelectUser={this.state.displayselectedUSer}/>
                                        </div>
                                    {/* </div>
                                </div>
                            </div> */}



                            {/* <div class="bg-white mt-2">
                                <div class="ContentSection p-15">
                                    <h4>Quote &amp; Order Permissions</h4>
                                    <div class="row mt-3">
                                     
                                        <div class="col-md-4 col-lg-4">

                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="supervisorRoleInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox">
                                           <input type="checkbox" class="custom-control-input"  name="supervisorRoleInQuoteOrderPermissions"  checked={currentPermissionNames.includes("supervisorRoleInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}>Supervisor Role (all access)</label>
                                           </div>
                                       )):null}


                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="QuoteInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input"  name="QuoteInQuoteOrderPermissions" checked={currentPermissionNames.includes("QuoteInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}>Quotes (create, modify &amp; convert)</label>
                                       </div>
                                       )):null}


                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="QuoteInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input"  name="QuoteInQuoteOrderPermissions" checked={currentPermissionNames.includes("QuoteInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}>Open Orders (create  &amp; modify )</label>
                                       </div>
                                       )):null}

                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="actionDeleteOrderInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="actionDeleteOrderInQuoteOrderPermissions" checked={currentPermissionNames.includes("actionDeleteOrderInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Action: Delete Orders</label>
                                            </div>
                                       )):null}
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="actionCreateQuotesInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input" name="actionCreateQuotesInQuoteOrderPermissions" checked={currentPermissionNames.includes("actionCreateQuotesInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}>Action: Create Quotes/Order on alert</label>
                                       </div>
                                       )):null}                                       
                                           
                                        </div>

                                        <div class="col-md-4 col-lg-4">
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="closedCancelledQuotesInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                           
                                            <div class="custom-control custom-checkbox mt-2">

                                                <input type="checkbox" class="custom-control-input"  name="closedCancelledQuotesInQuoteOrderPermissions" checked={currentPermissionNames.includes("closedCancelledQuotesInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}> Closed &amp; Cancelled Orders</label>
                                            </div>
                                       )):null}  

                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="pickingOrdersInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="pickingOrdersInQuoteOrderPermissions" checked={currentPermissionNames.includes("pickingOrdersInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Picking Orders</label>
                                            </div>
                                       )):null} 
                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="readyOrdersInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input" name="readyOrdersInQuoteOrderPermissions" checked={currentPermissionNames.includes("readyOrdersInQuoteOrderPermissions")}  onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}> Ready Orders (includes Late)</label>
                                       </div>
                                       )):null} 
                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="actionReturnToOrdersInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input" name="actionReturnToOrdersInQuoteOrderPermissions" checked={currentPermissionNames.includes("actionReturnToOrdersInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}> Action: Return to Order</label>
                                       </div>
                                       )):null}
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="reservationsInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                          <div class="custom-control custom-checkbox mt-2">
                                          <input type="checkbox" class="custom-control-input" name="reservationsInQuoteOrderPermissions" checked={currentPermissionNames.includes("reservationsInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                          <label class="custom-control-label pl-2" for={filteredPermission.id}>Reservations (create &amp; cancel)</label>
                                      </div>
                                       )):null}
                                            
                                        </div>



                                        <div class="col-md-4 col-lg-4">
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="shippedInvoicesInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                          <div class="custom-control custom-checkbox">
                                          <input type="checkbox" class="custom-control-input" name="shippedInvoicesInQuoteOrderPermissions" checked={currentPermissionNames.includes("shippedInvoicesInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                          <label class="custom-control-label pl-2" for={filteredPermission.id}>  Shipped, Invoices &amp; Adjustments</label>
                                      </div>
                                       )):null}
                                       {exestingPermission?exestingPermission.filter(premission => premission.name==="receiveInvoiceInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input" name="receiveInvoiceInQuoteOrderPermissions" checked={currentPermissionNames.includes("receiveInvoiceInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}> Receive Invoice Exports </label>
                                       </div>
                                       )):null}
                                       {exestingPermission?exestingPermission.filter(premission => premission.name==="quickPicksInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                            <div class="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" class="custom-control-input" name="quickPicksInQuoteOrderPermissions" checked={currentPermissionNames.includes("quickPicksInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                            <label class="custom-control-label pl-2" for={filteredPermission.id}>  Quick Picks</label>
                                        </div>
                                       )):null}
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="overrideDiscountsInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                            <div class="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" class="custom-control-input" name="overrideDiscountsInQuoteOrderPermissions" checked={currentPermissionNames.includes("overrideDiscountsInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                            <label class="custom-control-label pl-2" for={filteredPermission.id}>  Action: Override Discounts</label>
                                        </div>
                                       )):null}
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="quickPicksInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                            <div class="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" class="custom-control-input" name="quickPicksInQuoteOrderPermissions" checked={currentPermissionNames.includes("quickPicksInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                            <label class="custom-control-label pl-2" for={filteredPermission.id}> Dig &amp; Plant Request</label>
                                        </div>
                                       )):null} 
                                       {exestingPermission?exestingPermission.filter(premission => premission.name==="quickPicksInQuoteOrderPermissions"  && premission.group_name === "QuoteOrderPermissions").map(filteredPermission => (
                                            <div class="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" class="custom-control-input" name="quickPicksInQuoteOrderPermissions" checked={currentPermissionNames.includes("quickPicksInQuoteOrderPermissions")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                            <label class="custom-control-label pl-2" for={filteredPermission.id}> Receiving Plant/Dig Requests</label>
                                        </div>
                                       )):null} 
                                        </div>




                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-md-12 d-flex justify-content-md-end">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="QuoteOrderPermissionsAll" checked={currentPermissionNames.includes("QuoteOrderPermissionsAll") } onClick={this.handleCheckBox} name="QuoteOrderPermissionsAll"/>
                                                <label class="custom-control-label pl-2" for="QuoteOrderPermissionsAll"> Select All</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-2">
                                                <input type="checkbox" class="custom-control-input" id="QuoteOrderPermissionsNone" checked={currentPermissionNames.includes("QuoteOrderPermissionsNone") } onClick={this.handleCheckBox} name="QuoteOrderPermissionsNone" />
                                                <label class="custom-control-label pl-2" for="QuoteOrderPermissionsNone"> Select None</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
 */}


































                            {/* <div class="bg-white mt-2">
                                <div class="ContentSection p-15">
                                    <h4>Quote &amp; Order Permissions</h4>
                                    <div class="row mt-3">
                                     
                                        <div class="col-md-4 col-lg-4">

                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="SupervisorRoleInquotesAndOrders"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox">
                                           <input type="checkbox" class="custom-control-input"  name="SupervisorRoleInquotesAndOrders"  checked={currentPermissionNames.includes("SupervisorRoleInquotesAndOrders")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}>Supervisor Role (all access)</label>
                                           </div>
                                       )):null}


                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Quote"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input"  name="Quote" checked={currentPermissionNames.includes("Quote")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}>Quote (create &amp; modify)</label>
                                       </div>
                                       )):null}
                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Action Delete Order"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="Action Delete Order" checked={currentPermissionNames.includes("Action Delete Order")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Action: Delete Order</label>
                                            </div>
                                       )):null}
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Action Create Quotes"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input" name="Action Create Quotes" checked={currentPermissionNames.includes("Action Create Quotes")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}>Action Create Quotes/Order on alert</label>
                                       </div>
                                       )):null}                                       
                                           
                                        </div>

                                        <div class="col-md-4 col-lg-4">
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Closed & Cancelled Orders"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                           
                                            <div class="custom-control custom-checkbox mt-2">

                                                <input type="checkbox" class="custom-control-input"  name="Closed & Cancelled Orders" checked={currentPermissionNames.includes("Closed & Cancelled Orders")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}> Closed &amp; Cancelled Orders</label>
                                            </div>
                                       )):null}  

                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Picking Order"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="Picking Order" checked={currentPermissionNames.includes("Picking Order")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Picking Orders</label>
                                            </div>
                                       )):null} 
                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Ready Order"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input" name="Ready Order" checked={currentPermissionNames.includes("Ready Order")}  onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}> Ready Orders (includes Late)</label>
                                       </div>
                                       )):null} 
                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Action Return to Order"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input" name="Action Return to Order" checked={currentPermissionNames.includes("Action Return to Order")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}> Action: Return to Orders</label>
                                       </div>
                                       )):null}
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Reservations"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                          <div class="custom-control custom-checkbox mt-2">
                                          <input type="checkbox" class="custom-control-input" name="Reservations" checked={currentPermissionNames.includes("Reservations")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                          <label class="custom-control-label pl-2" for={filteredPermission.id}>Reservations (create & cancel)</label>
                                      </div>
                                       )):null}
                                            
                                        </div>



                                        <div class="col-md-4 col-lg-4">
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Shipped Invoices Adjustment"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                          <div class="custom-control custom-checkbox">
                                          <input type="checkbox" class="custom-control-input" name="Shipped Invoices Adjustment" checked={currentPermissionNames.includes("Shipped Invoices Adjustment")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                          <label class="custom-control-label pl-2" for={filteredPermission.id}>  Shipped, Invoices &amp; Adjustments</label>
                                      </div>
                                       )):null}
                                       {exestingPermission?exestingPermission.filter(premission => premission.name==="Receive Invoices"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input" name="Receive Invoices" checked={currentPermissionNames.includes("Receive Invoices")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}> Receive Invoice Exports </label>
                                       </div>
                                       )):null}
                                       {exestingPermission?exestingPermission.filter(premission => premission.name==="Quick Picks"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                            <div class="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" class="custom-control-input" name="Quick Picks" checked={currentPermissionNames.includes("Quick Picks")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                            <label class="custom-control-label pl-2" for={filteredPermission.id}>  Quick Picks</label>
                                        </div>
                                       )):null}
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Action Override"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                            <div class="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" class="custom-control-input" name="Action Override" checked={currentPermissionNames.includes("Action Override")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                            <label class="custom-control-label pl-2" for={filteredPermission.id}>  Action: Override Discounts</label>
                                        </div>
                                       )):null}
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="DigAndPlantRequestInquotesAndOrders"  && premission.group_name === "quotesAndOrders").map(filteredPermission => (
                                            <div class="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" class="custom-control-input" name="DigAndPlantRequestInquotesAndOrders" checked={currentPermissionNames.includes("DigAndPlantRequestInquotesAndOrders")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                            <label class="custom-control-label pl-2" for={filteredPermission.id}> Dig And Plant Requests</label>
                                        </div>
                                       )):null} 
                                        </div>




                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-md-12 d-flex justify-content-md-end">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="quotesAll" checked={currentPermissionNames.includes("quotesAll") } onClick={this.handleCheckBox} name="quotesAll"/>
                                                <label class="custom-control-label pl-2" for="quotesAll"> Select All</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-2">
                                                <input type="checkbox" class="custom-control-input" id="quotesNone" checked={currentPermissionNames.includes("quotesNone") } onClick={this.handleCheckBox} name="quotesNone" />
                                                <label class="custom-control-label pl-2" for="quotesNone"> Select None</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div> */}
                            {/* <label class="text-muted mt-2">Note: Actions required related main order status access to function</label> */}
                           
                            {/* <div class="bg-white mt-3">
                                <div class="ContentSection p-15">
                                    <h4>Additional Permissions</h4>
                                    <div class="row mt-3">
                                        <div class="col-md-4 col-lg-4">
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Tools & Settings"  && premission.group_name === "toolsAndSettings").map(filteredPermission => (
                                             <div class="custom-control custom-checkbox">
                                             <input type="checkbox" class="custom-control-input" name="toolsAndSettings" checked={currentPermissionNames.includes("Tools & Settings") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                             <label class="custom-control-label pl-2" for={filteredPermission.id}>Tools &amp; Settings </label>
                                         </div>
                                       )):null} 
                                      
                                           
                                            <div class="pl-4">
                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Tags And Labels"  && premission.group_name === "toolsAndSettings").map(filteredPermission => (
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input" name="Tags And Labels" checked={currentPermissionNames.includes("Tags And Labels") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}>Tags &amp; Labels</label>
                                       </div>
                                       )):null} 
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Organization Setting"  && premission.group_name === "toolsAndSettings").map(filteredPermission => (
                                            <div class="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" class="custom-control-input" name="Organization Setting" checked={currentPermissionNames.includes("Organization Setting") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                            <label class="custom-control-label pl-2" for={filteredPermission.id}>Organization Settings</label>
                                        </div>
                                       )):null} 
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Map Locator"  && premission.group_name === "toolsAndSettings").map(filteredPermission => (
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input" name="Map Locator" checked={currentPermissionNames.includes("Map Locator") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}>Map Locator</label>
                                       </div>
                                       )):null}
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Map Locator (Edit map)"  && premission.group_name === "toolsAndSettings").map(filteredPermission => (
                                          <div class="custom-control custom-checkbox mt-2">
                                          <input type="checkbox" class="custom-control-input" name="Map Locator (Edit map)" checked={currentPermissionNames.includes("Map Locator (Edit map)") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                          <label class="custom-control-label pl-2" for={filteredPermission.id}>Map Locator (Edit Maps)</label>
                                      </div>
                                       )):null} 
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-lg-4">
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Customer Management"  && premission.group_name === "customerManagement").map(filteredPermission => (
                                         <div class="custom-control custom-checkbox">
                                         <input type="checkbox" class="custom-control-input" name="Customer Management" checked={currentPermissionNames.includes("Customer Management") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                         <label class="custom-control-label pl-2" for={filteredPermission.id}>  Customer Management</label>
                                     </div>
                                       )):null}
                                            
                                            <div class="pl-4">
                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Customer List (Add/Edit)"  && premission.group_name === "customerManagement").map(filteredPermission => (
                                            <div class="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" class="custom-control-input" name="Customer List (Add/Edit)" checked={currentPermissionNames.includes("Customer List (Add/Edit)") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                            <label class="custom-control-label pl-2" for={filteredPermission.id}>Customer Lists (Add/Edit)</label>
                                        </div>
                                        )):null}
                                                
                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Customer List (View/Print)"  && premission.group_name === "customerManagement").map(filteredPermission => (
                                             <div class="custom-control custom-checkbox mt-2">
                                             <input type="checkbox" class="custom-control-input" name="Customer List (View/Print)" checked={currentPermissionNames.includes("Customer List (View/Print)") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                             <label class="custom-control-label pl-2" for={filteredPermission.id}>Customer Lists (View/Print)</label>
                                         </div>
                                        )):null}
                                                
                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="Settings"  && premission.group_name === "customerManagement").map(filteredPermission => (
                                            <div class="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" class="custom-control-input"  name="Settings" checked={currentPermissionNames.includes("Settings") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                            <label class="custom-control-label pl-2" for={filteredPermission.id}> Settings</label>
                                        </div>
                                        )):null}
                                                
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-lg-4">
                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="UserManagementInA"  && premission.group_name === "userManagement").map(filteredPermission => (
                                                    <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" name="UserManagementInA" checked={currentPermissionNames.includes("UserManagementInA") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                    <label class="custom-control-label pl-2" for={filteredPermission.id}>User Management</label>
                                                </div>
                                                )):null}
                                                
                                                    <div class="pl-4">
                                                    {exestingPermission?exestingPermission.filter(premission => premission.name==="User Profile"  && premission.group_name === "userManagement").map(filteredPermission => (
                                                <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="User Profile" checked={currentPermissionNames.includes("User Profile") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>User Profiles</label>
                                            </div>
                                                )):null}
                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="User Access(this screen)"  && premission.group_name === "userManagement").map(filteredPermission => (
                                                <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="User Access(this screen)" checked={currentPermissionNames.includes("User Access(this screen)") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>User Access (this screen)</label>
                                            </div>
                                                )):null}
                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="Staff Directory"  && premission.group_name === "userManagement").map(filteredPermission => (
                                                <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="Staff Directory"checked={currentPermissionNames.includes("Staff Directory") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Staff Directory</label>
                                            </div>
                                                )):null}
                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="Settings user"  && premission.group_name === "userManagement").map(filteredPermission => (
                                                <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="Settings user" checked={currentPermissionNames.includes("Settings user") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>  Settings  </label>
                                            </div>
                                                )):null}
                                            </div>


                                        </div>

                                                       
                                                       

                                                             <div class="col-md-4 col-lg-4" style={{marginTop:"1em"}}>
                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="UserManagementInA"  && premission.group_name === "userManagement").map(filteredPermission => (
                                                    <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" name="UserManagementInA" checked={currentPermissionNames.includes("UserManagementInA") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                    <label class="custom-control-label pl-2" for={filteredPermission.id}>Inventoy Management</label>
                                                </div>
                                                )):null}
                                                
                                                    <div class="pl-4">
                                                    {exestingPermission?exestingPermission.filter(premission => premission.name==="User Profile"  && premission.group_name === "userManagement").map(filteredPermission => (
                                                <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="User Profile" checked={currentPermissionNames.includes("User Profile") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Plant Settings</label>
                                            </div>
                                                )):null}
                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="User Access(this screen)"  && premission.group_name === "userManagement").map(filteredPermission => (
                                                <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="User Access(this screen)" checked={currentPermissionNames.includes("User Access(this screen)") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Product Settings</label>
                                            </div>
                                                )):null}
                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="Staff Directory"  && premission.group_name === "userManagement").map(filteredPermission => (
                                                <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="Staff Directory"checked={currentPermissionNames.includes("Staff Directory") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Location Settings</label>
                                            </div>
                                                )):null}
                                            </div>


                                        </div>
  
                                                       

                                                            <div class="col-md-4 col-lg-4" style={{marginTop:"1em"}}>
                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="UserManagementInA"  && premission.group_name === "userManagement").map(filteredPermission => (
                                                    <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" name="UserManagementInA" checked={currentPermissionNames.includes("UserManagementInA") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                    <label class="custom-control-label pl-2" for={filteredPermission.id}>Supplier Management</label>
                                                </div>
                                                )):null}
                                                
                                                    <div class="pl-4">
                                                    {exestingPermission?exestingPermission.filter(premission => premission.name==="User Profile"  && premission.group_name === "userManagement").map(filteredPermission => (
                                                <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="User Profile" checked={currentPermissionNames.includes("User Profile") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Supplier Lists(Add/Edit)</label>
                                            </div>
                                                )):null}
                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="User Access(this screen)"  && premission.group_name === "userManagement").map(filteredPermission => (
                                                <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="User Access(this screen)" checked={currentPermissionNames.includes("User Access(this screen)") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Supplier Lists(View/Print)</label>
                                            </div>
                                                )):null}
                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="Staff Directory"  && premission.group_name === "userManagement").map(filteredPermission => (
                                                <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="Staff Directory"checked={currentPermissionNames.includes("Staff Directory") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Settings</label>
                                            </div>
                                                )):null}
                                            </div>


                                        </div>
  




                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-md-12 d-flex justify-content-md-end">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="additionalPermissionYes" checked={currentPermissionNames.includes("additionalPermissionYes") } onChange={this.handleCheckBox} name="additionalPermissionYes"/>
                                                <label class="custom-control-label pl-2" for="additionalPermissionYes" > Select All</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-2">
                                                <input type="checkbox" class="custom-control-input" id="additionalPermissionNo"  checked={currentPermissionNames.includes("additionalPermissionNO") }  onChange={this.handleCheckBox} name="additionalPermissionNo"/>
                                                <label class="custom-control-label pl-2" for="additionalPermissionNo" name=""> Select None</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}















                            {/* <div class="bg-white mt-2">
                                <div class="ContentSection p-15">
                                    <h4>Purchase &amp; Order Permissions</h4>
                                    <div class="row mt-3">
                                     
                                        <div class="col-md-4 col-lg-4">
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Supervisor Roles"  && premission.group_name === "purchaseOrders").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox">
                                           <input type="checkbox" class="custom-control-input"  id={filteredPermission.id} name="Supervisor Roles"  checked={currentPermissionNames.includes("Supervisor Roles")} onChange={this.handleCheckBox}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}>Supervisor Role (all access)</label>
                                           </div>
                                       )):null}
                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Create and Modify Drafts"  && premission.group_name === "purchaseOrders").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input" name="Create and Modify Drafts" checked={currentPermissionNames.includes("Create and Modify Drafts")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}>Create & Modify Drafts</label>
                                       </div>
                                       )):null}
                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Create Modify and Delete Open Orders"  && premission.group_name === "purchaseOrders").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="Create Modify and Delete Open Orders"  checked={currentPermissionNames.includes("Create Modify and Delete Open Orders")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Create, Modify &amp; Delete Open Orders</label>
                                            </div>
                                       )):null}
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Recive and Check in Open Orders"  && premission.group_name === "purchaseOrders").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox mt-2">
                                           <input type="checkbox" class="custom-control-input" name="Recive and Check in Open Orders" checked={currentPermissionNames.includes("Recive and Check in Open Orders")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                           <label class="custom-control-label pl-2" for={filteredPermission.id}>Receive &amp; Check-In Open Orders</label>
                                       </div>
                                       )):null}                                       
                                           
                                        </div>

                                        <div class="col-md-4 col-lg-4">
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="View Closed and Cancelled Orders"  && premission.group_name === "purchaseOrders").map(filteredPermission => (
                                           
                                            <div class="custom-control custom-checkbox mt-2">

                                                <input type="checkbox" class="custom-control-input"  name="View Closed and Cancelled Orders" checked={currentPermissionNames.includes("View Closed and Cancelled Orders")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}> View Closed &amp; Cancelled Orders</label>
                                            </div>
                                       )):null}  

                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="ActionsCloseOpenOrders"  && premission.group_name === "purchaseOrders").map(filteredPermission => (
                                           
                                           <div class="custom-control custom-checkbox mt-2">
                                                <input type="checkbox" class="custom-control-input" name="ActionsCloseOpenOrders" checked={currentPermissionNames.includes("ActionsCloseOpenOrders")} onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Action: Close Open Orders</label>
                                            </div>
                                       )):null} 
                                            
                                        </div>


                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-md-12 d-flex justify-content-md-end">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="poAll" checked={currentPermissionNames.includes("poAll") } onClick={this.handleCheckBox} name="poAll"/>
                                                <label class="custom-control-label pl-2" for="poAll"> Select All</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-2">
                                                <input type="checkbox" class="custom-control-input" id="poNone" checked={currentPermissionNames.includes("poNone") } onClick={this.handleCheckBox} name="poNone" />
                                                <label class="custom-control-label pl-2" for="poNone"> Select None</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div> */}

{/* 
                            <div class="bg-white mt-3">
                                <div class="ContentSection p-15">
                                    <h4>Inventory Management Permissions</h4>

                                    <div class="row mt-3">
                                        <div class="col-md-4 col-lg-4">
                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="1SupervisorRoleInInventory"  && premission.group_name ==="SupervisorInINV").map(filteredPermission => (
                                                    <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" name="1SupervisorRoleInInventory" checked={currentPermissionNames.includes("1SupervisorRoleInInventory") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                    <label class="custom-control-label pl-2" for={filteredPermission.id}>Supervisor Role (all access)</label>
                                                </div>
                                            )):null} 
                                            

                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="Plant Manager"  && premission.group_name === "plantManager").map(filteredPermission => (
                                                    <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" name="Plant Manager" checked={currentPermissionNames.includes("Plant Manager") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                    <label class="custom-control-label pl-2" for={filteredPermission.id}>Plant Manager</label>
                                                </div>
                                            )):null} 
                                            
                                                
                                                    <div class="pl-4">
                                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="Add or Edit"  && premission.group_name === "plantManager").map(filteredPermission => (
                                                            <div class="custom-control custom-checkbox mt-2">
                                                            <input type="checkbox" class="custom-control-input" name="Add or Edit" checked={currentPermissionNames.includes("Add or Edit") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                            <label class="custom-control-label pl-2" for={filteredPermission.id}>Add / Edit</label>
                                                        </div>
                                                        )):null} 

                                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Print"  && premission.group_name === "plantManager").map(filteredPermission => (
                                                                <div class="custom-control custom-checkbox mt-2">
                                                                <input type="checkbox" class="custom-control-input" name="Print"checked={currentPermissionNames.includes("Print") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Print</label>
                                                            </div>
                                                        )):null} 
                                                    </div>


                                                    {exestingPermission?exestingPermission.filter(premission => premission.name==="Product Manager"  && premission.group_name === "productManager").map(filteredPermission => (
                                                    <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" name="Product Manager" checked={currentPermissionNames.includes("Product Manager") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                    <label class="custom-control-label pl-2" for={filteredPermission.id}>Product Manager</label>
                                                </div>
                                            )):null} 
                                            
                                                
                                                    <div class="pl-4">
                                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="AddorEdit"  && premission.group_name === "productManager").map(filteredPermission => (
                                                            <div class="custom-control custom-checkbox mt-2">
                                                            <input type="checkbox" class="custom-control-input" name="AddorEdit" checked={currentPermissionNames.includes("AddorEdit") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                            <label class="custom-control-label pl-2" for={filteredPermission.id}>Add / Edit</label>
                                                        </div>
                                                        )):null} 

                                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Print in Product"  && premission.group_name === "productManager").map(filteredPermission => (
                                                                <div class="custom-control custom-checkbox mt-2">
                                                                <input type="checkbox" class="custom-control-input" name="Print in Product"checked={currentPermissionNames.includes("Print in Product") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                                <label class="custom-control-label pl-2" for={filteredPermission.id}>Print</label>
                                                            </div>
                                                        )):null} 
                                                    </div>


                                        </div>


                                        <div class="col-md-4 col-lg-4">
                                        {exestingPermission?exestingPermission.filter(premission => premission.name==="Inventory Managaement"  && premission.group_name === "InventoryManagement").map(filteredPermission => (
                                         <div class="custom-control custom-checkbox">
                                         <input type="checkbox" class="custom-control-input" name="Inventory Managaement"checked={currentPermissionNames.includes("Inventory Managaement") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                         <label class="custom-control-label pl-2" for={filteredPermission.id}> Inventory Management</label>
                                     </div>
                                       )):null}
                                            
                                            <div class="pl-4">
                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Dashboard View"  && premission.group_name === "InventoryManagement").map(filteredPermission => (
                                            <div class="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" class="custom-control-input" name="Dashboard View"checked={currentPermissionNames.includes("Dashboard View") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                            <label class="custom-control-label pl-2" for={filteredPermission.id}>Dashboard (View)</label>
                                        </div>
                                        )):null}


                                                 <div class="pl-3">
                                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Dashboard Modify"  && premission.group_name === "InventoryManagement").map(filteredPermission => (
                                                            <div class="custom-control custom-checkbox mt-2">
                                                            <input type="checkbox" class="custom-control-input" name="Dashboard Modify"checked={currentPermissionNames.includes("Dashboard Modify") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                            <label class="custom-control-label pl-2" for={filteredPermission.id}>Dashboard (Modify)</label>
                                                        </div>
                                                        )):null}
                                                </div>
                                                
                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="Master Inventory View"  && premission.group_name === "InventoryManagement").map(filteredPermission => (
                                            <div class="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" class="custom-control-input"  name="Master Inventory View" checked={currentPermissionNames.includes("Master Inventory View") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                            <label class="custom-control-label pl-2" for={filteredPermission.id}> Master Inventory (View)</label>
                                        </div>
                                        )):null}



                                                <div class="pl-3">
                                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="Master Inventory Modify"  && premission.group_name === "InventoryManagement").map(filteredPermission => (
                                                            <div class="custom-control custom-checkbox mt-2">
                                                            <input type="checkbox" class="custom-control-input" name="Master Inventory Modify"checked={currentPermissionNames.includes("Master Inventory Modify") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                            <label class="custom-control-label pl-2" for={filteredPermission.id}>Master Inventory (Modify)</label>
                                                        </div>
                                                        )):null}
                                                </div>


                                                {exestingPermission?exestingPermission.filter(premission => premission.name==="Task Queue View"  && premission.group_name === "InventoryManagement").map(filteredPermission => (
                                            <div class="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" class="custom-control-input"  name="Task Queue View" checked={currentPermissionNames.includes("Task Queue View") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                            <label class="custom-control-label pl-2" for={filteredPermission.id}> Task Queue (View)</label>



                                            <div class="pl-3">
                                                            {exestingPermission?exestingPermission.filter(premission => premission.name==="taskQueueModify"  && premission.group_name === "InventoryManagement").map(filteredPermission => (
                                                            <div class="custom-control custom-checkbox mt-2">
                                                            <input type="checkbox" class="custom-control-input" name="taskQueueModify" checked={currentPermissionNames.includes("taskQueueModify") } onChange={this.handleCheckBox} id={filteredPermission.id}/>
                                                            <label class="custom-control-label pl-2" for={filteredPermission.id}>Task Queue (Modify)</label>
                                                        </div>
                                                        )):null}
                                            </div>



                                        </div>
                                        )):null}


                                                
                                            </div>
                                        </div>
                                        


                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-md-12 d-flex justify-content-md-end">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="additionalPermissionInventory" checked={currentPermissionNames.includes("additionalPermissionInventory") } onChange={this.handleCheckBox} name="additionalPermissionInventory"/>
                                                <label class="custom-control-label pl-2" for="additionalPermissionInventory" > Select All</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-2">
                                                <input type="checkbox" class="custom-control-input" id="additionalPermissionInventoryNo"  checked={currentPermissionNames.includes("additionalPermissionInventoryNo") }  onChange={this.handleCheckBox} name="additionalPermissionInventoryNo"/>
                                                <label class="custom-control-label pl-2" for="additionalPermissionInventoryNo" name=""> Select None</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

 */}










                        </div> :null}




                                






                        <div class="row mt-3" style={{position:"absolute", paddingTop:"2em"}}>
                            {
                                this.props.displaySelectedUSER1 ?
                            //this.state.displayselectedUSer? 
                                <div class="col-md-12">
                                    <a href="#">Update Current Role</a>
                                    <a href="#" class="ml-4">Create Role From Current Values</a>
                                </div>:null}
                        </div>
                        {/* <div class="row mt-2">
                            {this.state.displayselectedUSer? 
                                <div class="col-md-12 text-md-right">
                                    <button type="button" class="btn btn-outline-secondary btn-lg" onClick={this.goBackFunction} >Cancel</button>
                                    <button type="button" class="btn btn-primary btn-lg ml-3" onClick={this.handleUpdate}>Update</button>
                                </div>:null}
                        </div> */}

                                {/* <div class="col-md-12 col-lg-6 mt-3 mt-lg-0 text-lg-right" style={{marginLeft:"51%", paddingTop:"36px"}}>
                                {this.state.displayselectedUSer? 
                                    <div class="topbarCtrls mt-3 mt-md-0 d-flex flex-wrap justify-content-md-end" style={{marginBottom:"1em", marginRight:"1em"}}>

                                            <a class="btn ml-2"
                                           onClick={this.handleUpdate}
                                            //onClick={this.handleSubmit}
                                        
                                            >
                                                    <span class="d-flex align-items-center text-left">
                                                        <img src="assets/img/save-ic.svg" alt=""/>
                                                        <span class="ml-2"><b>Save  </b></span>
                                                    </span>
                                                </a>

                                                <a  class="btn ml-2 mt-3 mt-md-0" 
                                                onClick={this.saveAndGo}
                                                //  onClick={()=>checkedData==true?saveCustomerData1("done"):""}
                                                >
                                                    <span class="d-flex align-items-center text-left">
                                                        <img src="assets/img/saveDone-ic.svg" alt=""/>
                                                        <span class="ml-2"><b>Save &amp; Done</b></span>
                                                    </span>
                                                </a>

                                                <a href="#" class=" ml-2 mt-3 mt-md-0">
                                                    <img src="assets/img/close-ic.svg" alt=""  onClick={this.goBackFunction}/>
                                                </a>
                                    </div>:null}
                             </div> */}








                    </div>

                    </div>
                    </TabPanel>
                </Tabs>
            {/* </div> */}
        {/* </div> */}
        </>
   )
}


}
const mapStateToProps = (state)=> (
    // console.log(state)
    {
    roles:state.userAccessReduser.roles,
    users:state.userReduser.users.payload,
    user:state.userReduser,
    permissionList:state.userAccessReduser.permissionList,
    temp:state.userAccessReduser,
    reduxSelectedUser:state.userAccessReduser.selectedUser,
    displaySelectedUSER1 : state.userAccessReduser.displaySelectedUSER,
    userAccessSelectList : state.userAccessReduser.userAccessList
    // permissionList:state.permissionList
}

)

export default withRouter(connect(mapStateToProps,{getRolesList,showRole,showUser,addRoler,updateRole
    ,deleteRole,getUsersList
    ,getPermissionList,
    handleUserSelect,
    handleUserUpdateUserPermission
,handleUserAccessInputAction,userAccessList, resetUserData,displaySelectedUSERS,handleUserAccessExchnageData, tabChangeValues, resetUserSelect})(UserAccess));