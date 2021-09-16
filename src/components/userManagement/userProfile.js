/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loader from '../Modal/LoaderModal';
import 'react-tabs/style/react-tabs.css';
//import { confirmAlert } from 'react-confirm-alert'; // Import
//import 'react-confirm-alert/src/react-confirm-alert.css';
import {connect} from "react-redux";
import {showUser,updateUser,uploadImage,removeImage,deleteUser,getUsersList, displaySelectedList} from "../../actions/userAction";

import {getAllSubAttribute} from "../../actions/attributeAction"

//import getRolesList from "../../actions/userAccessAction";
import {tabChangeValues, displaySelectedUSERS,handleUserSelect,handleUserAccessExchnageData, userAccessList,getRolesList,getPermissionList} from "../../actions/userAccessAction";
import ActionModal from '../Modal/ActionModal'
//import SuccessModal from '../Modal/SuccessModal';
import CheckBox from "./Checkbox";
import InputMask from 'react-input-mask';
//import * as BsIcons from "react-icons/io";
import { Prompt , BrowserRouter, withRouter, Lifecycle} from 'react-router';
import './style.css';


// export const Component = withRouter(({ history, location }) =>{

// })




class UserProfile extends React.Component { 
    
    constructor(props){
        super(props);
      
        this.state={
            checkList:[],
            unsaved: true,
            isWindowInFocus: true,
            disableImageRemove:true,
            disableImageUpload:false,
            imgLoader:false,
            allChecked:false,
            specificUser:[],
        
            shouldBlockNavigation:true,
        
            disabled:true,
            disableButton:true,
            firstName:"",
            phoneNumberInOrganization:" ",
            lastName:"",
            phone:"",
            email:"",
            position:"Select..",
            actionType:"",
            fileInput : null,
            locationAccess:false,
            checked:{},
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
            isUpdated:{
                firstName:false,
                lastName:false,
                phone:false,
                email:false,
                position:false
            },

            hadModified:{
                firstName:false,
                lastName:false,
                phone:false,
                email:false,
                position:false
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
            status:"",
            setSuccessPop:false,
            message:"",
            open:false,
            cancel:false,
            logo:"",
            checkedActive:false,
            deleted_at:null,
            locations: [
                // { id: 1, name: "Form A",address:"1105 HWY5, Dundas, CN", isChecked: false },
                // { id: 2, name: "Form B", address:"1105 HWY5, Dundas, UN", isChecked: false },
                // { id: 3, name: "Form C", address:"11 HWY5, Dundas, Uk",isChecked: false },
                // { id: 4, name: "Form D", address:"1105 HWY5, Hustain, HU",isChecked: false }
              ]
        }

   
        // let alist = this.props.showUserSpecificList;
        // var blist = alist.map(e=>e.id)
        // this.setState({
        //     checkList:blist
        // })
        // console.log("alistalistalist", blist)
       
    }

  


    componentDidMount(){
        this.props.showUser()
        this.props.getAllSubAttribute(18)
        this.props.getUsersList()
        this.props.getRolesList()
        this.props.getPermissionList()
       
         
        // let blist = alist.map(e=>e.id)
       // let aList = (this.props.showUserSpecificList) && (this.props.showUserSpecificList.data.user===undefined ?this.props.showUserSpecificList:this.props.showUserSpecificList.data.user || this.props.showUserSpecificList.data.user.location.map(e=>e.id))

        this.setState({
            locations: this.props.locationAddress,
            specificUser:this.props.selectedUser.location ,
            checkList:this.props.displaySelectedListOnly
            //this.props.selectedUser.location
            //this.props.selectedUser.location
        })

        
console.log("locationAddress",this.props.specificdUser, this.props.locationAddress, this.props.selectedUser.location, this.state.checkList )
        //this.props.tabChangeValues();

        // if(this.props.tabChangeValues(1)){
        //     this.props.resetUserData()
        // }

           let selectedUser = this.props.selectedUser 
          console.log("1234567890",selectedUser)
           this.setState({
               firstName:selectedUser.name,
               lastName:selectedUser.last_name,
               phone:selectedUser.phone,
               email:selectedUser.email,
               position:selectedUser.position,
               status:selectedUser.status,
               id:selectedUser.id,
               logo:selectedUser.avatar?selectedUser.avatar:"",
               deleted_at:selectedUser.deleted_at
            });


           

            // window.addEventListener("focus", this.onFocus)
    }


    

    componentWillUnmount=()=>{
      
        if (this.state.isWindowInFocus===false && this.state.hadModified && this.state.firstName && this.state.lastName && this.state.phone && this.state.email) {
            window.onbeforeunload = () => true
            this.handleSubmit();
          } else {
            window.onbeforeunload = undefined
          }

          //window.addEventListener("focus", this.onFocus)

    }


    handleAllChecked = event => {
        let locations = this.state.locations;
        locations.forEach(loc => (loc.isChecked = event.target.checked));
        this.setState({ locations: locations });
      };
    
      handleCheckChieldElement = event => {
        let locations = this.state.locations;
        locations.forEach(loc => {
          if (loc.value === event.target.value)
            loc.isChecked = event.target.checked;
        });
        this.setState({ locations: locations });
      };



    handleInput = (e) => {
       // debugger;
        const {target:{name,value}} =e
        let {errorObj,errorCount,hadModified} = this.state
        console.log(name)
        console.log(value)
        this.setState({[name]:value})
        if(name === "firstName" ){
            hadModified.firstName=true
            if(errorObj.firstNameError>0){
                errorObj.firstNameError=0
                errorCount--
            }           
        }
        else if(name === "lastName" ){
            hadModified.lastName=true
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
            hadModified.email=true
            if(errorObj.emailError>0){
                errorObj.emailError=0
                errorCount-- 
            }            
        }
        else if(name === "postiton"){
            hadModified.position=true
            if(errorObj.positionError>0){
                errorObj.positionError=0
                errorCount--
            }   
        }  
        this.setState({errorObj,errorCount, hadModified})


        this.setState({
            disableButton:false,
            shouldBlockNavigation:false
        })


        this.setState({
            imgLoader: false
        })
              
        
    }

    validate = () =>{
        //debugger;
        let {errorObj,errorCount}=this.state
        let phoneReg=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        // let phoneReg = new RegExp('^[0-9]+$');
        let nameReg = /^[a-zA-Z]+$/;
        let emailReg =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //let emailReg =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        //let emailReg =/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;
        console.log(emailReg.test(this.state.email))
        let enteredNumber2 = JSON.stringify(this.state.phone)
        //let enteredNumber = enteredNumber2
        let enteredNumber = enteredNumber2.trim().match(/\d/g)
       // let errorObj = this.state.errorObj
        if(this.state.firstName.length === 0){
            errorObj.firstNameError=1
            this.setState({errorObj})
            errorCount++
            //return false
        }
       
       
      
        else if(this.state.lastName.length === 0){
            // errorObj.lastNameError=1
           
            errorObj.lastNameError=1
            this.setState({errorObj})
            errorCount++
        }
      

        else if(this.state.position === "Select.."){
            //debugger
            errorObj.positionError=1
            this.setState({errorObj})
            errorCount++
            //return false
        }

       

        else if(!emailReg.test(this.state.email)){
            errorObj.emailError=1
            this.setState({errorObj})
            errorCount++
        }

            // else{
            //     errorObj.emailError=0
            //     errorCount--
            // }

           
       else if(!enteredNumber ||  enteredNumber.join("").length<10 || enteredNumber.value === "") {
            document.getElementById("contactPhone-validtor").innerText = "Phone Number is not valid"
            errorObj.phoneError=1
            this.setState({errorObj})
            errorCount++;
        }
        else {
            document.getElementById("contactPhone-validtor").innerText = ""
            errorObj.phoneError=0
            //errorCount--;

        }

        this.setState({errorObj,errorCount})
        return errorCount


        
    }



      stringHasTheWhiteSpaceOrNot=(value)=>{
        return value.indexOf(' ') >= 0;
     }

    handleSubmit = (e) => {

        //debugger;
  
        this.setState({
            disableButton:true
        })
        let finalNumber = this.state.phone

        let whiteSpace = this.stringHasTheWhiteSpaceOrNot(JSON.stringify(finalNumber));

        if(whiteSpace===true){
            finalNumber=  finalNumber.replace(/[^\w\s]/g, "")
            var removedNumber = finalNumber.split(" ").join("");
            removedNumber = parseInt(removedNumber)
        }

        else{
            removedNumber = finalNumber;
         
        }


        let count= this.validate()
        console.log(count)
         if(count === 0){
             console.log(this.state)
             console.log("success")
             if(count === 0){
                
                console.log(this.state)
                let userStateObject = this.state
                let userObject={}
                userObject.id= this.props.selectedUser.id;
                userObject['phone'] = removedNumber;
                userObject['location']= this.state.checkList
                console.log(this.props.selectedUser)
                if(this.props.selectedUser.name !== userStateObject.firstName)userObject['name'] = userStateObject.firstName
                if(this.props.selectedUser.last_name !== userStateObject.lastName)userObject['last_name'] = userStateObject.lastName
                if(this.props.selectedUser.email !== userStateObject.email)userObject['email'] = userStateObject.email
                // if(this.props.selectedUser.phone !== userStateObject.phone)userObject['phone'] = userStateObject.phone
                if(this.props.selectedUser.position !== userStateObject.position)userObject['position'] = userStateObject.position
               console.log(userObject)
                let res = this.props.updateUser(userObject)
                res.then(result=>{
                  alert("updated")
                  //this.props.cancle() 
                    console.log(this.props.users)
                    if(this.props.users.payload.status === "Success"){
                        this.setState({open:true,message:this.props.users.payload.message})
                    }
                

                })
                // console.log(res)
            }
         }
      
         if (!this.state.disableButton) {
            this.setState({
                disableButton:true,
            })
           }
 

           this.setState({
            hadModified:{
             firstName:false,
             lastName:false,
             phone:false,
             position:false,
             email:false,
            
            }
        })
 
     }




     handlImageUpload = (e) => {
        console.log(e)
        console.log(e.target.files[0])
        let imageData = e.target.files[0]

        
       let data =  this.props.uploadImage(imageData,JSON.stringify(this.props.selectedUser.id))
       data.then(res=>{
           console.log(res)
           console.log(this.props)
           let updatedData = this.props.data.user.payload
           this.setState({
            firstName:updatedData.name,
            lastName:updatedData.last_name,
            phone:updatedData.phone,
            email:updatedData.email,
            position:updatedData.position,
            status:updatedData.status,
            id:updatedData.id,
            logo:updatedData.avatar?updatedData.avatar:"",
            deleted_at:updatedData.deleted_at
            
         })
        
       })

    //    this.setState({
    //     //disableImageRemove: false,
    //     disableImageUpload: true
    // })
 
        this.setState({logo: URL.createObjectURL(e.target.files[0])})

        if( e.target.files[0]){
            this.fileInput.value = ""
        }


        this.setState({
            imgLoader: true
        })
        
        // setTimeout(function() {
        //     window.location.reload();
        //  }, 1000);

       

    }

    
    handleRemoveImage = (e) =>{
        // this.setState({logo:""})
        let data = this.props.removeImage(this.props.selectedUser.id)
        console.log(data)
        data.then(res=>{
            console.log(res)
            console.log(this.props)
            let updatedData = this.props.data.removedData.payload
            this.setState({
             firstName:updatedData.name,
             lastName:updatedData.last_name,
             phone:updatedData.phone,
             email:updatedData.email,
             position:updatedData.position,
             status:updatedData.status,
             id:updatedData.id,
             logo:updatedData.avatar?updatedData.avatar:"",
             deleted_at:updatedData.deleted_at
          })
        })

        this.setState({
            disableImageUpload: false,
            disableImageRemove:true
        })

        this.setState({
            imgLoader: true
        })

        
    }
    handleDelete =()=> {
       let id = this.props.selectedUser.id
      
        var person = window.confirm("are you sure you want to delete?");
        if(person){
              let deleted = this.props.deleteUser(id)
              deleted.then(res=>{
                console.log(res)
               
                let updatedData = this.props.data.removedData.payload
                this.setState({
                 firstName:updatedData.name,
                 lastName:updatedData.last_name,
                 phone:updatedData.phone,
                 email:updatedData.email,
                 position:updatedData.position,
                 status:updatedData.status,
                 id:updatedData.id,
                 logo:updatedData.avatar?updatedData.avatar:"",
                 deleted_at:updatedData.deleted_at
                 
              })
              alert("deleted")
            })
        }
    }
    handleRestore =()=>{
        let userStateObject = this.state
        let userObject={}
        userObject.id= this.props.selectedUser.id
        userObject.deleted_at=null
      
        var person = window.confirm("are you sure you want to Restore?");
        if(person){
              let deleted = this.props.deleteUser(userStateObject.id)
              deleted.then(res=>{
                console.log(res)
               
                let updatedData = this.props.data.removedData.payload
                this.setState({
                 firstName:updatedData.name,
                 lastName:updatedData.last_name,
                 phone:updatedData.phone,
                 email:updatedData.email,
                 position:updatedData.position,
                 status:updatedData.status,
                 id:updatedData.id,
                 logo:updatedData.avatar?updatedData.avatar:"",
                 deleted_at:updatedData.deleted_at
                 
              })
              alert("restored successfully")
            })
        }
    }
    cancel = ()=>{
        this.setState({open:false})
    }
    confirm = ()=>{
        this.setState({open:false})
    }


    //  onFocus = () => {
    //     console.log('Tab is in focus');
    //     this.setState({
    //         isWindowInFocus:false
    //     })

    //     console.log("isWindowInFocus222", this.state.isWindowInFocus)
    //   }


    // handleChange = (event, newValue) => {
    //     debugger;
    //    if (newValue !== 0 && this.state.tabValues === 0) {
    //      const res = window.confirm("Leaving?");
    //      if (res === true) {
    //          this.setState({
    //            tabValues:newValue
    //          })
    //        //setValue(newValue);
    //      }
    //    } else {
    //    //   setValue(newValue);
    //    this.setState({
    //        tabValues:newValue
    //      })
    //    }
    //  }

   

    goToUserAccess=(e,name)=>{
        //this.props.tabChangeValues(1)  

        //debugger

        this.props.tabChangeValues(1)


        let selID = JSON.stringify(e)
        this.props.handleUserSelect(e)
        this.props.userAccessList(name)
        //this.props.handleUserAccessExchnageData(selID,"userList","userList")
        this.props.displaySelectedUSERS(true)


        // this.props.getUsersList()
        // this.props.getRolesList()
        // //this.props.getPermissionList()
        // this.props.resetUserData()

        // console.log("abcdefghijk", e)
        // let userList = this.props.users.active
        // let id = e
        // console.log(id)
        //   let selectedUser  =  userList.filter(obj=>{
        //     return (parseInt(obj.id) === parseInt(id))
        // })

        // this.props.onTagsChange(e, selectedUser[0])

    }

       handleChangeCheckbox = e => {
        //debugger
        //let checkList=[];
                    let itemName = e.target.name;
                    let itemId = e.target.id;
                    let checked = e.target.checked;

                    if(checked){
                        
                        this.setState({
                            checkList: e.target.id
                        })
                        // checkList = checkList.push(...itemId)
                        console.log("checkList",this.state.checkList)
                    }



                    this.setState(prevState => {
                    let { locations, allChecked } = prevState;
                    if (itemName === "checkAll") {
                        allChecked = checked;
                        locations = locations.map(item => ({ ...item, isChecked: checked }));
                    } else {
                        locations = locations.map(item =>
                        item.itemId === itemId ? { ...item, isChecked: checked } : item
                        );
                        allChecked = locations.every(item => item.isChecked);
                    }
                    return { locations, allChecked };
                    });

    console.log("items::",itemName , checked, this.state.allChecked)
  }

    //    checkboxList2 = () => {

    //     return this.state.locations.map(item => (
          
    //                 <div>
    //                 <ul class="list-unstyled" style={{marginTop:"1em"}}>
    //                             <li>
    //                             <div class="custom-control custom-checkbox" style={{marginTop:"-17px"}}>
    //                             <input
                                
    //                                 type="checkbox"
    //                                 key={item.id}
    //                                         name={item.value}
    //                                         value={item.value}
                                          
    //                                         checked={item.isChecked}
    //                                         onChange={this.handleChangeCheckbox}
    //                             />{" "}
    //                             {item.value}
    //                             {/* <span>{item.address}</span> */}
    //                             {/* <label class="custom-control-label pl-2" for="customCheck1">Farm E <span>1105 HWY5, Dundas, CN</span></label> */}
    //                             </div>
    //                             </li>
    //                             </ul>
    //                 </div>
    //     ));
    //   }
    
      goBackToMain=()=>{
        this.props.cancle();
        this.props.displaySelectedUSERS(false)
        this.props.userAccessList("Select..")
      }


       handleToggle = (c) => () => {
        //debugger;
      
        // return the first index or -1
        const clickedCategory =this.state.checkList.indexOf(c)
        const all =[...this.state.checkList]
        // [...this.state.checkList];
    
        if (clickedCategory === -1) {
          all.push(c);
        } else {
          all.splice(clickedCategory, 1);
        }
        console.log(all);
        this.setState({
            checkList:all
        })
        this.props.displaySelectedList(all)
        console.log("all1313131", all,this.state.checkList,clickedCategory,  this.props.displaySelectedListOnly)
       // setChecked(all);
        //formData.set("categories", all);

        
      };
      

    render() {

        
        console.log("checkListcheckList", this.state.checkList, this.props.displaySelectedListOnly, this.props.showUserSpecificList)
        console.log("specificdUser", this.props.specificdUser, this.state.specificUser,this.props.selectedUser,)
        console.log("getAllSubAttribute",this.state.locations,this.state.checkList, this.state.locations.sub_attributeschild)

        console.log("ABCD123", this.props.tabChangeValueUP22, this.props.tabValues1)
        console.log("roles123", this.props.roles)
        console.log("usersUSER", this.props.data,  this.props.users.payload.active)
        const { actionType } = this.state;
        let roles=[]
        console.log(this.props.roles)
        if(this.props.roles)roles = this.props.roles
       // console.log(this.props.selectedUser.deleted_at !== null)
        console.log(this.state.position)
        let noImageURL="./images/profile.png";
        //noPerson.png";
       // let noImageURL ="./images/user-circle-solid.svg";
        // "./images/noPerson.png";




        const confirm = ()=>{
            const { history } = this.props;
            if(actionType==="goBack"){
               history.push("/Dashboard")

                // setTimeout(function() {
                //     history.push("/")
                //  }, 4000);
            //    props.deleteProductAction(id)
    
            }

            else if(actionType==="save"){
              // debugger;
                let count= this.validate()
                if(count===0){
                    this.handleSubmit();
                    this.props.cancle();
                }
                else{
                   // alert("You have entered wrong details")
                }
               
            }

            else if(actionType==="upload"){

                this.handlImageUpload();
            }
            else if(actionType==="deleteImage"){

                this.handleRemoveImage();
                this.setState({
                    disableImageRemove: true
                })
            }
          

            this.setState({
                actionOpen:false,
                actionId:0,
                actionType:"",
                actionMessage:""
            })
      
         
       }

    


       const confirmAction = (actionType)=>{
       
        //let history = useHistory();

        if(actionType==="goBack"){
            this.setState({actionType})
            this.setState({actionMessage:"Are you sure you want to go back ?"})

        }
        else if(actionType==="save"){
            this.setState({actionType})
            this.setState({actionMessage:"Are you sure you want to save this Changes ?"})
            
        }

        else if(actionType==="upload"){
            this.setState({actionType})
            this.setState({actionMessage:"Are you sure you want to Upload Image ?"})
        }

        else if(actionType==="deleteImage"){
            this.setState({actionType})
            this.setState({actionMessage:"Are you sure you want to delete this image ?"})

        }
        
        
        
        else{
            this.setState({actionType})
            this.setState({actionMessage:"Are you sure you want to duplicate this product and all its related SKU and plant information ?"})
       
        }
        this.setState({
            actionOpen:true,
            // actionId:id
        })

        // setOpen(true)
        // setId(id)
    }

    const cancel = ()=>{
        this.setState({
            actionOpen:false,
            actionId:0,
            actionType:"",
            actionMessage:""
        })
       
         
     }


     const { checked } = this.state;
     const checkedCount = Object.keys(checked).filter(key => checked[key]).length;
     const disabled = checkedCount > 1;

     //let selectedUser = this.props.selectedUser 
     
     let selectedUser = this.props.selectedUser 
     console.log("thislogolength ", this.state.logo.length )
    return (
        <>

        
         {  this.state.hadModified.firstName ===true || this.state.hadModified.lastName ===true ||this.state.hadModified.phone ||this.state.hadModified.email===true ? 
         <Prompt
         //when={shouldBlockNavigation}
         //key='block-nav'
        //when={this.state.shouldBlockNavigation}
       // when={this.saveChanges()}
        when={this.state.disableButton===true ? this.state.firstName:" " && this.props.tabValues !==1}
        message={this.state.hadModified.firstName || this.state.hadModified.lastName || this.state.hadModified.phone 
            || this.state.hadModified.email  ? "You have unsaved changes. Are you sure you want save and leave ?" : "Are you sure you want to leave ?" } 
      // message={ this.state.hadModified.name || this.state.hadModified.lastName || this.state.hadModified.sending_email_address || this.state.hadModified.phone ? 'Are you sure you want to save and leave?' : ' Are you sure you want to leave ?'}
       //onCancel="ignore &amp; Proced"
       //cancelText ="1123"
    />: false}

            {/* <Prompt
                when={this.state.hadModified}
                message='You have unsaved changes, are you sure you want to leave?'
                /> */}
                 {/* <ActionModal  confirm={confirm} open={this.state.actionOpen} message={this.state.actionMessage}/> */}
                 <ActionModal cancel={cancel} confirm={confirm} open={this.state.actionOpen} message={this.state.actionMessage}/>
                    <Tabs>
              
                        <TabPanel>
                            
                        <div>

                            <div class="row" style={{display:"flex", justifyContent:"space-between", marginTop:"-2em", marginBottom:"-1.5em"}}> 
                                <div class="f-s-24 px-3 py-3 f-w-500" style={{marginTop:"3px"}} >User Profile -<span class="f-s-18 p-15 mb-0" style={{marginLeft:"-10px"}}>Add, Edit or Remove User</span> 
                                {/* <div style={{marginTop:"1.3em", float:"right"}}>
                                                                <span style={{float:"right", marginRight:"3em", marginLeft:"-5em", marginTop:"-33px"}}>Active</span>
                                                                <div class="switcher switcher-sm ml-2 pr-2" style={{float:"right", marginTop:"-26px"}}>
                                                                    <input type="checkbox" name="switcher_checkbox_date" id="switcher_checkbox_date" 
                                                                    checked={true}
                                                                   
                                                                    />
                                                                    <label for="switcher_checkbox_date"></label>
                                                                </div>
                                                            </div>             */}
                                </div>

                                                            <div  class="f-s-24 px-3 py-3 f-w-500" style={{flexGrow:"1"}}>
                                                            <div class="topbarCtrls mt-3 mt-md-0 d-flex flex-wrap justify-content-md-end" style={{marginTop:"1.3em", float:"right"}}>
                                                                <span style={{float:"right",  marginTop:"5px"}}>Active</span>
                                                                <div class="switcher switcher-sm ml-2 pr-2" style={{float:"right", marginTop:"12px"}}>
                                                                    <input type="checkbox" name="switcher_checkbox_date" id="switcher_checkbox_date" 
                                                                    checked={true}
                                                                   
                                                                    />
                                                                    <label for="switcher_checkbox_date"></label>
                                                                </div>
                                                            </div>  
                                </div>
                                        {/* <div class="d-flex align-items-center flex-wrap ml-2"> */}
                                                
                                        <div 
                                        class="f-s-24 px-3 py-3 f-w-500"
                                        //class="col-md-12 col-lg-6 mt-3 mt-lg-0 text-lg-right"
                                        >             
                                                    {/* <div class="col-md-12 col-lg-6 mt-3 mt-lg-0 text-lg-right"> */}
                                                    <div class="topbarCtrls mt-3 mt-md-0 d-flex flex-wrap justify-content-md-end" style={{marginBottom:"1em", marginRight:"1em"}}>

                                                            {/* <a class="btn ml-2" onClick={this.handleSubmit}>
                                                                    <span class="d-flex align-items-center text-left">
                                                                        <img src="assets/img/save-ic.svg" alt=""/>
                                                                        <span class="ml-2"><b>Save  </b></span>
                                                                    </span>
                                                                </a> */}


                                                                <div className="hoverINOrg">
                                                                        <a  class="btn ml-2 mt-3 mt-md-0" >

                                                                        <button type="button" class="btn ml-2 mt-3 mt-md-0" style={{padding:"0em"}}
                                                                        disabled={this.state.disableButton} 
                                                                       
                                                                        onClick={this.handleSubmit}>
                                                                        <img src="assets/img/save-ic.svg" alt="" style={{marginLeft:"-8px", marginTop:"-6px"}}/> 
                                                                                            <span class="ml-2" style={{fontSize:"16px", }}>Save</span>
                                                                        </button>
                                                                        </a>
                                                                </div>


                                                                <div className="hoverINOrg">
                                                                        <a  class="btn ml-2 mt-3 mt-md-0" >

                                                                        <button type="button" class="btn ml-2 mt-3 mt-md-0" style={{padding:"0em"}}
                                                                        disabled={this.state.disableButton}
                                                                        onClick={()=>{confirmAction("save")}}>
                                                                        <img src="assets/img/save-ic.svg" alt="" style={{marginLeft:"-8px", marginTop:"-6px"}}/> 
                                                                                            <span class="ml-2" style={{fontSize:"16px", }}>Save &amp; Done</span>
                                                                        </button>
                                                                        </a>
                                                                </div>

                                                                {/* <a  class="btn ml-2 mt-3 mt-md-0" 
                                                                onClick={()=>{confirmAction("save"); }}
                                                                    //  onClick={()=>checkedData==true?saveCustomerData1("done"):""}
                                                                >
                                                                    <span class="d-flex align-items-center text-left">
                                                                        <img src="assets/img/saveDone-ic.svg" alt=""/>
                                                                        <span class="ml-2"><b>Save &amp; Done</b></span>
                                                                    </span>
                                                                </a> */}

                                                                <a href="#" class=" ml-2 mt-3 mt-md-0">
                                                                    <img src="assets/img/close-ic.svg" alt="" onClick={this.goBackToMain}/>
                                                                </a>
                                                </div>
                                            </div>

                                </div>

                                
                            <hr class="m-0"/>  
                            <br/>

                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <div class="bg-grey-transparent-2 text-center px-2 py-2" style={{marginTop:"-0.5em"}}>
                                        <div class="d-flex align-items-center justify-content-center"><img src="assets/img/bulp-ic.svg" alt=""/><h5 class="ml-2 mb-0">Did you know?</h5></div>
                                        <p class="m-0">Inactive users will not have access to this system. User permissions can be set via  <span className="linkTag" 
                                        onClick={()=>this.goToUserAccess(this.props.selectedUser.id, this.props.selectedUser.name)}
                                        >User Access</span>.</p>
                                    </div>
                                </div>
                            </div>

                        
                        </div>

                        <div class="pb-4">
                            <div class="bg-white">
                             

                                    <div class="row mt-3">
                                        <div class="col-md-4 col-lg-3">
                                            <div class="bg-grey-transparent-2 text-center px-3 py-3">
                                                <div class="logCircle mb-3" key={new Date().getTime()}>
                                                <div className="backgroundImageCover" style={{margin:'auto'}}>
                                                    <img src={this.state.logo.length>0?"https://zvky.flamingotech.ml/"+this.state.logo:noImageURL} 
                                                    alt="" 
                                                    style={{objectFit:"contain"}}
                                                    class="resposiveImageParent"
                                                      />



                                        <div className="loaderCenter">
                                                {this.state.imgLoader===true ? 
                                                    <p >
                                                         <Loader /> 
                                                         </p> 
                                                    :
                                                    <p > </p> 
                                            }
                                           
                                            </div>
                                       




                                                      
                                                    </div>
                                                
                                                    {/* <img src={this.state.logo.length>0?"https://zvky.flamingotech.ml/"+this.state.logo:""} alt="" /> */}
                                                </div>

                                                <p><small>Image should be print quality PNG or JPG</small></p>
                                                <a href="#" class="btn btn-primary btn-block btnGroup" style={{position:"relative",cursor:"pointer"}}>
                                                <button class="btn btn-primary btn-block btnGroup" style={{backgroundColor:"transparent", border:"none", cursor:"pointer"}}
                                                //disabled={this.state.logo.length >0 || null ? this.state.disableImageUpload===false : this.state.disableImageUpload===true }
                                                 >
                                                    <span class="d-flex align-items-center justify-content-around" style={{cursor:"pointer"}}>
                                                    <input  type="file"  id={new Date().getTime()}  ref={fileInput => (this.fileInput = fileInput)}
                                                    onChange={this.handlImageUpload} style={{zIndex:1,opacity:0, cursor:"pointer"}} accept="image/png, image/jpeg" 
                                                    //disabled={this.state.logo.length >0 || null ? this.state.disableImageUpload===false : this.state.disableImageUpload===true }
                                                      />
                                                        <span class="f-s-20" style={{position:"absolute", cursor:"pointer"}}>Upload</span>                                                        
                                                    </span>
                                                    <img src="assets/img/upload-ic-white.svg"  alt="" style={{borderRadius:"7em", cursor:"pointer"}}/>
                                                    </button>
                                                </a>


                                                <div>
                                                <button className="btn bg-red-transparent-3 btn-block btnGroup mt-3" style={{cursor:"pointer"}}
                                                    disabled={this.state.logo.length >0 ? this.state.disableImageRemove ===false : this.state.disableImageRemove===true}
                                                    // style={{marginTop:"-3px", paddingRight:"5.1em", border:"none"}}
                                                    onClick={()=>{confirmAction("deleteImage")}}>
                                                    <span class="f-s-20 text-danger" style={{marginTop:"-3px", fontWeight:"bold", backgroundColor:"transparent"}}>Remove</span>
                                                    <img src="assets/img/bin-ic-red.svg" alt=""  style={{marginRight:"15px"}}/>
                                                    </button>
                                                </div>
                                         


                                                <div class="text-left mt-2">
                                                    <span><small>Last signed in 23/05/2021</small></span>
                                                    <span class="ml-2"><a href="#">History</a></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-8 col-lg-9 mt-3 mt-md-0">
                                            <div class="row form-group">
                                                <div class="col-md-6">
                                                    <label>First Name<span class="text-danger">*</span></label>
                                                    <input type="text" placeholder="First Name" class="form-control" name="firstName" value={this.state.firstName} onChange={this.handleInput} />
                                                    {this.state.errorObj.firstNameError!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid First Name</span>:""}
                                                    {/* {this.state.errorObj.firstNameError!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid First Name</span>:""} */}
                                                </div>
                                                <div class="col-md-6 mt-3 mt-md-0">
                                                    <label>Last Name<span class="text-danger">*</span></label>
                                                    <input type="text" placeholder="Last Name" class="form-control" name="lastName" value={this.state.lastName} onChange={this.handleInput} />
                                                    {this.state.errorObj.lastNameError!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Last Name</span>:""}
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col-md-6">
                                                    <label>Position<span class="text-danger">*</span></label>
                                                   
                                                    <select class="form-control" name="position" id="position" onChange={this.handleInput} 
                                                                 value={this.state.position} 
                                                     >
                                                    <option>Select..</option>
                                                    {roles ? roles.map((userObj,i)=>{
                                                            //console.log(userObj)
                                                            return  <option  
                                                           
                                                            id={userObj.id}
                                                             value={userObj.id}
                                                             >{userObj.name} </option>
                                                        }) : null} 


                                                    </select>




                                                    {this.state.errorObj.positionError!==0 ? <span style={{fontSize:"small",color:"red"}}>Select Position</span>:" "}
                                                </div>
                                                <div class="col-md-6 mt-3 mt-md-0">
                                                    <label>Phone<span class="text-danger">*</span></label>

                                                    <InputMask
                                                    class="form-control"  
                                                    type="text"
                                                    name="phone"
                                                    placeholder="(xxx) xxx-xxxx"
                                                    value={this.state.phone}
                                                    id={"phone1"}
                                                    mask="(999) 999-9999"
                                                     maskChar={" "} 
                                                     onChange={this.handleInput}
                                                      /> 
                                              
                                              <span style={{fontSize:"small",color:"red"}} id="contactPhone-validtor"></span>

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
              
                                                    <label>Location Assigned</label>
                                                    <div class="locAssignBox2">

                                                            {/* {this.checkboxList2()} */}

                                                            {/* {
                                                                this.state.locations.map(item => (
          
                                                                    <div>
                                                                    <ul class="list-unstyled" style={{marginTop:"1em"}}>
                                                                                <li>
                                                                                <div class="custom-control custom-checkbox" style={{marginTop:"-17px"}}>
                                                                                <input
                                                                                
                                                                                    type="checkbox"
                                                                                    key={item.id}
                                                                                            name={item.value}
                                                                                            value={item.value}
                                                                                            id={item.id}
                                                                                            checked={item.isChecked}
                                                                                            onChange={this.handleChangeCheckbox}
                                                                                />{" "}
                                                                                {item.value}
                                                                                
                                                                                </div>
                                                                                </li>
                                                                                </ul>
                                                                    </div>
                                                        ))
                                                            } */}

                                                    {
                                                                this.state.locations.map((item,i) => (
          
                                                                    <div key={i}>
                                                                    <ul class="list-unstyled" style={{marginTop:"-23px"}}>
                                                                                <li key={i} style={{marginTop:"15px"}}>
                                                                                <div class="custom-control custom-checkbox" style={{marginTop:"0px"}}>
                                                                                <input
                                                                                class="custom-control-input"
                                                                                    type="checkbox"
                                                                                    key={item.id}
                                                                                            name={item.id}
                                                                                            value={item.value}
                                                                                            id={item.id}
                                                                                            checked={this.state.checkList.includes(item.id) ? true : false }
                                                                                            
                                                                                            onChange={this.handleToggle(item.id)}
                                                                                            //onChange={this.handleChangeCheckbox}
                                                                                />
                                                                                <label class="custom-control-label pl-2" style={{fontWeight:"500"}} for={item.id}> {item.value}
                                                                            
                                                                                 <span style={{fontWeight:"300"}} >{item.sub_attributeschild[0].value}  
                                                                                  {item.sub_attributeschild[1].value}</span> 
                                                                                 <span style={{fontWeight:"300"}} >{item.sub_attributeschild[2].value}</span>
                                                                                 </label>
                                                                                </div>
                                                                                </li>
                                                                                </ul>
                                                                    </div>
                                                                ))
                                                            }


                                                            

                                                    
                                                    {/* {this.state.locations.map(loc=>{
                                                        return(
                                                            <CheckBox
                                                                            handleCheckChieldElement={this.handleCheckChieldElement}
                                                                            {...loc}
                                                                        />
                                                        )
                                                    })} */}

                                                   
                                                   
                                                    </div>

                            







                                                            {/* <div class="mt-3">
                                                                <div class="custom-control custom-checkbox">
                                                        <input
                                                         class="custom-control-input"
                                                            type="checkbox"
                                                            name="checkAll"
                                                            id="checkAll"
                                                           
                                                            checked={this.state.allChecked}
                                                            //onChange={this.handleToggle()}
                                                            onChange={this.handleChangeCheckbox}
                                                            />
                                                            <label  class="custom-control-label pl-2" style={{marginLeft:"10px"}} for="checkAll"> User has access to all locations</label>
                                                                </div> 
                                                            </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {/* </div> */}
                            </div>
                            <div class="row mt-3">
                                {this.state.deleted_at!== null?
                                <div class="col-md-4 col-lg-4 d-flex align-items-center">
                                    Restore User
                                    <div class="switcher ml-2 pr-md-3">
                                        <input type="checkbox" name="switcher_checkbox_2" id="switcher_checkbox_2" autocomplete="off" checked value="2"  onChange={this.handleRestore}/>
                                        <label for="switcher_checkbox_2"></label>
                                    </div>
                                </div>:
                                <div class="col-md-4 col-lg-4 d-flex align-items-center">
                                    Delete User
                                <div class="switcher ml-2 pr-md-3" onClick={this.handleDelete}>
                                    {/* <input type="checkbox" name="switcher_checkbox_2" id="switcher_checkbox_2" value="2" onChange={this.props.handleRestore}/> */}
                                    <img src="assets/img/bin-ic-red.svg" alt=""/>
                                    {/* <label for="switcher_checkbox_2"></label> */}
                                </div>
                            </div>
                                }
                            </div>





                        </div>
                        </TabPanel>
                        <TabPanel>
                            <div class="bg-white">
                                <h4 class="p-15 mb-0">User Access</h4>
                            </div>
                        </TabPanel>
                </Tabs>
            {/* </div> */}
        {/* </div> */}
        </>
    )
}}


const mapStateToProps = (state)=> (
    // console.log(state.userAccessReduser)
    {
    users:state.userReduser.users,
    data:state.userReduser,
    roles:state.userAccessReduser.roles,
   // tabChangeValueUP2: state.userAccessReduser.tabChangeValue,
    tabChangeValueUP22: state.userAccessReduser.tabChangeValue,
    locationAddress:state.attributeData.subAttribute,
    specificdUser : state.userReduser.user, 
    displaySelectedListOnly:state.userReduser.displaySelectedList,
    showUserSpecificList:state.userReduser.showUserSpecific

    }

)

export default withRouter(connect(mapStateToProps,{updateUser,displaySelectedList,removeImage,userAccessList,getUsersList,getRolesList,getPermissionList,getAllSubAttribute,
    showUser,uploadImage,deleteUser,tabChangeValues,displaySelectedUSERS,handleUserSelect,handleUserAccessExchnageData}) (UserProfile));
