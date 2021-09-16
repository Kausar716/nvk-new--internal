/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UserProfile from './userProfile'
import 'react-tabs/style/react-tabs.css';
import CreateUserProfile from './createprofile'
import UserAccess from './userAccess'
import {connect} from "react-redux";
import {getUsersList,showUser,displaySelectedList} from "../../actions/userAction";
import {getAllSubAttribute} from "../../actions/attributeAction"
//import {getRolesList, tabChangeValues} from "../../actions/userAccessAction";
import UserSettingsIndex from "../../components/UserSettings/UserSettingsIndex";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



import {getRolesList,showRole,addRoler,updateRole,deleteRole,getPermissionList,handleUserUpdateUserPermission,
    handleUserAccessInputAction,handleUserSelect, resetUserData, tabChangeValues, userAccessList,displaySelectedUSERS,resetUserSelect} from "../../actions/userAccessAction";
//import {showUser} from "../../actions/userAction";
//const { render } = ReactDOM;

class UserManagement extends Component {  
constructor(props){
    super(props)
    this.state={
        firstName:"",
        lastName:"",
        phone:"",
        email:"",
        tags: [],
        tabValues:0,
        locationAccess:false,
        displayDeletedRecords:false,
        visbleTrue:false,
        profileImage:"",
        displayExestingProfile:false,
        errorObj:{
            firstNameError:0,
            lastNameError:0,
            phoneError:0,
            emailError:0,                
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
        selectedProfile:"",
        displayUpdateProfile:false,
        displayCreate:false,
        selectedUser:{},
        selectedLists:[],
        displatDeletedRecord:"off"
    }

    //this.child = React.createRef();
}


// childValueHereUserAccess=()=>{
//     debugger
//     this.child.current.handleUserSelect();
// }

   
 handleProfileChange = (e) => {
    // debugger;
     console.log(e)
     console.log(e.target.value)
     let userList = this.props.users.active
     let id = e.target.value
     console.log(id)
       let selectedUser  =  userList.filter(obj=>{
         return (parseInt(obj.id) === parseInt(id))
     })

     //let listA = selectedUser
     console.log("selectedUserselectedUser", selectedUser)
     this.setState({selectedUser:selectedUser[0]})
     this.setState({displayUpdateProfile:true})
     this.setState({visbleTrue:true})
}

onTagsChange = (event, values) => {
//debugger
     let userList = this.props.users.active
     let id = values.id
     console.log(id)
       let selectedUser  =  userList.filter(obj=>{
         return (parseInt(obj.id) === parseInt(id))
     })
     //console.log(selectedUser)
     let listA = selectedUser[0].location
     this.props.displaySelectedList(listA)
     console.log("selectedUserselectedUser", listA)
     this.setState({selectedUser:selectedUser[0]})
     this.setState({displayUpdateProfile:true})
     this.setState({visbleTrue:true})


     this.props.showUser(id)
//      .then(res=>{
              
               
//         let alist = this.props.specificdUser.data.location
//             console.log("alistalistalist",alist)
//         this.props.displaySelectedList()
     
//     }).catch(data=>{
//             alert("somethingwent wrong")
//    })


     

  }






handleCreate = (e) => {
    this.setState({displayCreate:true})
}
handleSubmit = ()=> {

}
handleCancle = () => {
    this.props.getUsersList()
    this.props.getRolesList()
    this.setState({displayUpdateProfile:false,displayCreate:false})
    this.setState({visbleTrue:false})
}
componentDidMount(){
    this.props.getAllSubAttribute(18)
    this.props.getUsersList()
    this.props.getRolesList()
     

   // this.handleSelect()





    
}






 hanleCheckBox = (e) => {
if( e.target.value === "off"){
    this.setState({displatDeletedRecord:"on"})
}
else {
    this.setState({displatDeletedRecord:"off"})
}
}
handleCreateUpdateFlow = (obj)=>{
    console.log(obj)
    this.setState({selectedUser:obj,displayUpdateProfile:true,displayCreate:false})
    // displayUpdateProfile,
    // selectedProfile:
}


handleActiveUser =(e)=>{
    console.log("eeee", e.target.value)
}


chengeFunction =(e)=>{
console.log("eeeABCD", e)
}


// handleSelect(key){

//     if (key === 1){
//         this.setState({
//             tabValues:1
//         })
//     }

//     else if(key===2){
//         this.setState({
//             tabValues:2
//         })

//     }
//     else{
//         this.setState({
//             tabValues:3
//         })
//     }
//   }


//  handleChange = (event, newValue) => {
//      debugger;
//     if (newValue !== 0 && this.state.tabValues === 0) {
//       const res = window.confirm("Leaving?");
//       if (res === true) {
//           this.setState({
//             tabValues:event
//           })
//         //setValue(newValue);
//       }
//     } else {
//     //   setValue(newValue);
//     this.setState({
//         tabValues:event
//       })
//     }



//       console.log("tabValues555523", this.state.tabValues)

//   }

// handleSelect=(e)=>{
//     //debugger;

//     console.log("MJR1", e.target.value)
//     this.setState({
//         tabValues: e.target.value
//     });
//     console.log("MJR2", e.target.value, this.state.tabValues)
//   }

// handleSelect(index,e){
//    // if (newValue !== 0 && this.state.tabValues === 0) {


//     this.setState({
//         tabValues: e.target.value
//     });

//     console.log("tabValues5555", this.state.tabValues)
//   }


handleChange=(index)=>{

    // if (index !== 0 && this.props.tabChangeValueUP === 0) {
    //           const res = window.confirm("Leaving?");
    //           if (res === true) {
    //             //   this.setState({
    //             //     tabValues:index
    //             //   })
    //                 this.props.tabChangeValues(index)
    //             //setValue(newValue);
    //           }

    //           else{
    //             // this.setState({
    //             //     tabValues:index
    //             // })
    //             this.props.tabChangeValues(index)
    //           }

             
//}
    this.props.tabChangeValues(index)  
   
    this.setState({
        tabValues:this.props.tabChangeValueUP
    })

    if(this.props.tabChangeValueUP===1 || this.props.tabChangeValueUP===2 ){

        this.props.displaySelectedUSERS(false)

        this.props.getUsersList()
        this.props.getRolesList()
        this.props.getPermissionList()
        this.props.resetUserData()
        this.props.resetUserSelect()
        this.setState({visbleTrue:false, displayUpdateProfile:false})

    }


    // if(this.props.tabChangeValueUP===0){

    // }
    //this.props.tabChangeValueUP=index;
}



goToUserAccess=()=>{
    let select ="Select.."
  
    this.props.tabChangeValues(1)  
    this.props.resetUserData()
        this.props.displaySelectedUSERS(false)
        this.props.userAccessList(select)

}



    
    render() {
        //console.log("thisselectedUser",this.state.selectedUser)
        //this.props.showUser(this.state.selectedUser==='' ? '' : this.state.selectedUser.id)
        let {displayUpdateProfile,displayCreate} = this.state
           
        let userProfiles = []  
        let roleList = []
        console.log(this.props)
        console.log(this.props.users.active)
        console.log(this.props.users.inactive)
        // console.log([...this.props.users.active,...this.props.users.inactive])
        if(this.props.users.active && this.props.users.inactive){ 
        if(this.props.users && (this.state.displatDeletedRecord === "off")){
             userProfiles =  [...this.props.users.active,...this.props.users.inactive]
             let userWithOutDeletedRecords = userProfiles.filter(user=>{
                return (user.deleted_at=== null)
            
               
            })
            userProfiles = userWithOutDeletedRecords
           
            // userProfiles = this.props.users.active.concat(this.props.users.inactive)
        }  
        if(this.props.users && (this.state.displatDeletedRecord === "on")){
            userProfiles =  [...this.props.users.active,...this.props.users.inactive]
            let userWithDeletedRecords = userProfiles.filter(user=>{
                return (user.deleted_at!== null)
            
               
            })
            userProfiles = userWithDeletedRecords
            console.log(userProfiles)
     
       } 
    }
    if(this.props.roles){
        console.log(this.props.roles.payload)
        roleList = this.props.roles.payload
    }
    console.log(this.props.temp.userReduser)



 //console.log("tabValues1235", this.state.tabValues)

 console.log("tabChangeValueUP", this.props.tabChangeValueUP, userProfiles)
        
    return (
        <div clas="userManagementSection">
               <div class="contentHeader bg-white d-flex justify-content-between align-items-center">
				<h1 class="page-header mb-0 d-flex align-items-center">
                    <img src="assets/img/settings-primary.svg" class="mr-2"/>User Management
                </h1>

                {/* <button onClick={() => { this.child.handleUserSelect() }}>Click</button> */}
			</div>
            <div class="px-md-3 mt-3">
                <Tabs 
                selectedIndex={this.props.tabChangeValueUP} 
                //selectedIndex={this.state.tabValues} 
               onSelect={this.handleChange}
               // onSelect={index => this.setState({tabValues:index}) }
               // defaultIndex={1} onSelect={index => this.props.tabChangeValues(index) }
                 //value={this.state.tabValues}  onSelect={this.handleChange}
                 >
                    <TabList class="d-inline-block bg-white pl-0" style={{bottom:"0px"}}  >
                        <Tab style={{bottom:"0px"}} route={this.props.route} 
                        //value={this.state.tabValues} index={0}
                        //  value={this.state.tabValues} index={0}
                         //value={1} onSelect={this.handleSelect}
                          >User Profiles</Tab>
                        <Tab style={{bottom:"0px"}} 
                         //value={this.state.tabValues} index={1}
                        //value={2} onSelect={this.handleSelect}
                        > User Access</Tab>
                        <Tab style={{bottom:"0px"}}  
                        // value={this.state.tabValues} index={2}
                        //value={3} onSelect={this.handleSelect}
                        >User Positions</Tab>
                    </TabList>

                    <TabPanel 
                   // value={this.state.tabValues} index={0} 
                    >

                    <div class="bg-white">
                    {this.state.visbleTrue!==true  ? 
                         <div class="f-s-24 px-3 py-3 f-w-500" >User Profile&nbsp;-<span class="f-s-18 p-15 mb-0" style={{marginLeft:"-10px"}}>Add, Edit or Remove User</span>  
                                                       
                         </div>
                         :
                         <div >
                         </div>

                        }

                                                    {/* {this.state.visbleTrue!==false  ? 
                                                            <div>
                                                                <span style={{float:"right", marginRight:"3em", marginLeft:"-5em", marginTop:"-33px"}}>Active</span>
                                                                <div class="switcher switcher-sm ml-2 pr-2" style={{float:"right", marginTop:"-26px"}}>
                                                                    <input type="checkbox" name="switcher_checkbox_date" id="switcher_checkbox_date" value={userProfiles.map(a=>a.status)} checked={userProfiles.map(a=>a.status? true : false) } onChange={this.handleActiveUser}
                                                                    />
                                                                    <label for="switcher_checkbox_date"></label>
                                                                </div>
                                                            </div>

                                                    :
                                                    <div >
                                                    </div>

                                                    } */}

                         
                        <hr class="m-0"/>
            
                        <div class="ContentSection p-15" >

                        {this.state.visbleTrue!==true  ? 
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <div class="bg-grey-transparent-2 text-center px-2 py-2" >
                                        <div class="d-flex align-items-center justify-content-center"><img src="assets/img/bulp-ic.svg" alt=""/><h5 class="ml-2 mb-0">Did you know?</h5></div>
                                        <p class="m-0">Inactive users will not have access to this system. User permissions can be set via <span className="linkTag" onClick={this.goToUserAccess}>User Access</span>.</p>
                                    </div>
                                </div>
                            </div>
                                    :
                                    <div >
                                    </div>

                                    }


                            <div class="row mt-3">
                                <div class="col-md-12 col-lg-12">
                                   {(!displayUpdateProfile && !displayCreate)?<h4>Select user profile to edit or choose Create New User</h4>:null}
                                   {(!displayUpdateProfile && !displayCreate)?<div class="row d-flex align-items-center mt-4 mt-md-0">


                                        {/* <div class="col-md-4 col-lg-4">  
                                            <h5>Select User Profile</h5>
                                            <select class="form-control" onChange={this.handleProfileChange} >
                                            <option >Select...</option>
                                            {userProfiles[0]?userProfiles.map(userObj=>{
                                                return  <option value={userObj.id}> {userObj.name} {userObj.last_name}</option>
                                            }):null}
                                            </select>
                                        </div> */}



                                        <div class="col-md-3 col-lg-3 ">  
                                            <h5>Select User Profile</h5>
                                        <Autocomplete 
                                             
                                                onChange={this.onTagsChange} 
                                                options={userProfiles}
                                                id={userProfiles.map(id=>id.id)}
                                               // value={(option)=>option.id}
                                                getOptionLabel={(option) => option.name +"  "+ option.last_name}
                                                style={{ width: 300 }}
                                                autoHighlight
                                                renderInput={(params) => <TextField {...params} label="Select..." variant="outlined" />}
                                        />
                                        </div>




                                        <div class="col-md-4 col-lg-4 pt-md-4 mt-3 mt-md-0" style={{cursor:"default"}}>  
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="customCheck1" value={this.state.displatDeletedRecord} checked={(this.state.displatDeletedRecord === "on")? true:false} onChange={this.hanleCheckBox}/>
                                                <label class="custom-control-label pl-2" for="customCheck1"> Display deleted records only</label>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-lg-4 text-center mt-3 mt-md-0" >
                                            <span class="f-w-500" >Create New User</span>
                                            <p  class="d-md-block mt-md-2 ml-3 ml-md-0" >
                                               <img src="assets/img/create-new-user-ic.svg" style={{cursor:"pointer"}} onClick={this.handleCreate} />
                                            </p>
                                        </div>
                                    </div>:null}
                                    {displayUpdateProfile?<UserProfile onTagsChangeInUP={this.onTagsChange} cancle={this.handleCancle} selectedUser={this.state.selectedUser} displayDeletedRecords={this.state.displatDeletedRecord} roles={roleList}  tabValues1={this.state.tabValues} />:null}
                                    {displayCreate?<CreateUserProfile  handleSubmitData={this.handleSubmit}  cancle={this.handleCancle} handleCreateUpdateFlow={this.handleCreateUpdateFlow}/>:null}
                                </div>
                            </div>

                        </div>
                    </div>
                    </TabPanel>
                  

                    <TabPanel
                   // value={this.state.tabValues} index={1} 
                //    this.setState({selectedUser:selectedUser[0]})
                //    this.setState({displayUpdateProfile:true})
                //    this.setState({visbleTrue:true})
                    >
                    <UserAccess  cancle={this.handleCancle} onTagsChange={this.onTagsChange} visbleTrueP={this.state.visbleTrue} selectedUserP = {this.state.selectedUser} displayUpdateProfileP={this.state.displayUpdateProfile} />
                    </TabPanel>
                    <TabPanel
                    // value={this.state.tabValues} index={2}
                     >
                        <UserSettingsIndex/>

                    </TabPanel>
                </Tabs>
               
            </div>
        </div>
    )
}}


const mapStateToProps = (state)=> (
    // console.log(state)
    {
    
    users:state.userReduser.users.type==="GET_USERS_LIST"? state.userReduser.users.payload :[],
    roles:state.userAccessReduser.roles,
    temp:state,
    tabChangeValueUP: state.userAccessReduser.tabChangeValue,
    specificdUser : state.userReduser.user

}

)

export default connect(mapStateToProps,{getUsersList,displaySelectedList,getRolesList,resetUserData,userAccessList,resetUserSelect, displaySelectedUSERS,getPermissionList,tabChangeValues,getAllSubAttribute, showUser})(UserManagement)