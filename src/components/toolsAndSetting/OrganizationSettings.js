/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import {showorganization,updateorganization,handleOrganizationSettingsInputAction,uploadImage,removeImage, resetUserDataInOrg} from "../../actions/organizationSettingAction";
import {connect} from "react-redux";
import ActionModal from '../Modal/ActionModal';
import InfoModal from "../Modal/InfoModal";
import { Link ,withRouter} from "react-router-dom";
import Loader from '../Modal/LoaderModal';
import InputMask from 'react-input-mask';
import { Prompt , BrowserRouter} from 'react-router';
import Immutable from 'immutable';
import { Button, Confirm } from 'semantic-ui-react'
import './style.css';



export const Component = withRouter(({ history, location }) =>{

})

const normalizeInput = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;
    
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
  };
  
  const validateInput22 = value => {
    let error1 = ""
    if (!value) error1 = "Required!"
    else if (value.length !== 14 && value.length > 10) error1 = "Invalid phone format. ex: (555) 555-5555";
    
    return error1;
  };

  


class OrganizationSettings extends React.Component {  
   
    constructor(){
        super()
        this.state={
            disabled:true,
            disabledCancel:true,
            showPropmt:false,
            disableImageRemove:true,
            disableImageUpload:false,
            isOpen1:false,
            message:[],
            actionId:0,
            actionOpen:false,
            actionMessage:"",
            actionType:"",
            submitCount:0,

            backupArrayOrg:[],
            imgLoader:false,
            reload: false,
            phoneNumberInOrganization:" ",
            phoneError:"",

            fileInput : null,


            mobile:"",
            isError:false,
            name:"",
            sending_email_address:"",
            //phone:"",
            value1: '',
            error:"",
            main_title:"",
            secondary_title:"",
            main_body:"",
            secondary_body:"",
            errorObj:{               
                sendingEmailError:0,
                phoneError:0,
                firstNameError:0
            },
            hadModified:{
            name:false,
            sending_email_address:false,
            phone:false,
            main_title:false,
            secondary_title:false,
            main_body:false,
            secondary_body:false,
            },

            errorCount:0,
            logo:"",
            imageUploaded:false,
            initilaImages :false,
            imagePreviewURL:"assets/img/noImage.png",
            isDisable:false,
        }
    }
  
    handlImageUpload = (e1)=>{
       // debugger;
   
        console.log("e1Firstfile", e1.target.files[0])
        let imageData = e1.target.files[0]
        let id="2"
        let data =  this.props.uploadImage(imageData,id)
        data.then(res=>{
            console.log(res)
           
           // console.log(this.props.organizationData.organizationData.payload.logo)
        })

        if( e1.target.files[0]){
            this.fileInput.value = ""
        }
        this.setState({
            imgLoader: true
        })


        this.setState({
            //disableImageRemove: false,
            disableImageUpload: true
        })

        window.location.reload();
        
         
    }



    // componentDidUpdate = () => {
    //     let dataOrganizationDetails =  this.props.organizationData.organizationData;
    //     if (!dataOrganizationDetails) {
    //       window.onbeforeunload = () => true
    //       this.handleSubmit();
    //     } else {
    //       window.onbeforeunload = undefined
    //     }
    //   }

    toggle1 =()=>{
        this.setState({isOpen1:false})
    }


    validation = () =>{
        let {errorObj,errorCount}=this.state
         let {name,phone,sending_email_address, main_body, main_title, secondary_body,secondary_title} = this.props.organizationData.organizationData

        if(phone ==="" || name==="" || sending_email_address==="" || main_body ==="" || main_title ==="" || secondary_body ==="" || secondary_title ===""  ){
            

        return 1
        }
        else{
            return 0
        }
    }
   

  

    handleInput = (e) => {

        // this.setState({
        //     disabled:true
        // })
     // debugger
       // this.setState({value1: e.target.value})
        const {target:{name,value}} =e
        let {errorObj,errorCount,hadModified} = this.state  
        
        


        // this.setState({[name]:value})    
        //this.setState({value1: event.target.value} 
           // this.setState({[name]:value})     
        //  if(name === "phone" ){
        //      //debugger;
        //     hadModified.phone = true
        //     // this.setState({value1: e.target.value})
        //    // value.replace(phoneReg, '($1) $2-$3')handleInput2
        //     if(errorObj.phoneError>0){
        //     errorObj.phoneError=0
        //     errorCount--
        //     }
        // }
         if(name === "sending_email_address" ){
            hadModified.sending_email_address=true
            if(errorObj.sendingEmailError>0){
                errorObj.sendingEmailError=0
                errorCount--
            }           
        }
        else if(name === "name" ){
            hadModified.name=true
            if(errorObj.firstNameError>0){
                errorObj.firstNameError=0
                errorCount--
            }           
        }

        else if(name === "phone"){
            hadModified.phone=true
        }

        else if(name === "main_body"){
            hadModified.main_body=true
        }

        else if(name === "main_title"){
            hadModified.main_title=true
        }

        else if(name === "secondary_body"){
            hadModified.secondary_body=true
        }

        else if(name === "secondary_title"){
            hadModified.secondary_title=true
        }

        this.setState({
            imgLoader: false
        })
                    //console.log(hadModified[name],name)
                    // if(hadModified[name]  === name){
                        //hadModified[name] = true
                    // }
       // this.setState(prevState=> ({ phone: normalizeInput(value, prevState.phone) }));
        this.setState({errorObj,errorCount,hadModified})
       // let allValue =[...value, this.state.value1]
        this.props.handleOrganizationSettingsInputAction(name,value)


        if(name === "sending_email_address" || name === "name" ){
            hadModified.sending_email_address=true
            hadModified.name=true
                 
        }


        this.setState({
            disabled:false,
            disabledCancel:false
        })

    }


    // handleInput2=(e)=>{
    //     this.setState({name:e.target.value})
    //     this.props.handleOrganizationSettingsInputAction("name",e.target.value)   
    // }

    validate2 = ()=>{
        let errorObj = this.state.errorObj
        if(this.state.subName.length === 0){
            errorObj.caliperImperial=1
            this.setState({errorObj})
            return false
        }
        if(this.state.subName2.length === 0){
            errorObj.caliperSku=1
            this.setState({errorObj})
            return false
        }
        return true
        
    }



    validate = () =>{
        let {errorObj,errorCount}=this.state
        //var phoneNumber = 8660039954;
        //let phoneReg=/^[0-9\b]+$/;
        let phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
       
       // let phoneReg=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let nameReg = /^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$/;
        let emailReg =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //let emailReg = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
       // let emailReg =/\S+@\S+\.\S+/
        let organizationData = this.props.organizationData.organizationData
        console.log("eMAIL123",emailReg.test(organizationData.sending_email_address))
        console.log(organizationData.sending_email_address)

        //organizationData.phone.replace(phoneReg, '($1) $2-$3')
        // if(! phoneReg.test(organizationData.phone)){
        //     //debugger;
        //     if(organizationData.phone.length > 10){
        //     errorObj.phoneError=1
        //     errorCount++
        //     }
        //     // else{
              
        //     //     errorObj.phoneError=0
        //     //     errorCount--
        //     // }

        // }   

      

         if(! emailReg.test(organizationData.sending_email_address)){
            errorObj.sendingEmailError=1
            errorCount++
        }
       
        if(organizationData.name ===""){
            errorObj.firstNameError=1
            errorCount++

        }
    


        // if(!nameReg.test(organizationData.name)){
        //     debugger;
        //     errorObj.firstNameError=1
        //    errorCount++
        // }
        this.setState({errorObj,errorCount})
        return errorCount
    }


    handleChange=({ target: { value, name } })=> {  
        //debugger;
       // const {target:{name,value}} =e
        let {errorObj,errorCount,hadModified} = this.state  

        //debugger;
        console.log("enteredVALUES", this.state.phoneNumberInOrganization)
        this.setState(prevState=> ({ phoneNumberInOrganization: normalizeInput(value, prevState.phoneNumberInOrganization) }));
        this.setState({
            imgLoader: false
        })


        if(name === "phone"){
            hadModified.phone=true;
        }

        
        this.setState({
            disabled:false,
            disabledCancel:false
        })
      }



saveDisable =()=>{

    this.setState({
        hadModified:true
    })
    if(this.state.hadModified.name===true || this.state.hadModified.phone===true || this.state.hadModified.sending_email_address===true){
        this.handleSubmit();
    }

    else{
        alert("change to save")
    }

  
    // this.setState({
    //     hadModified:false
    // })
   

}

stringHasTheWhiteSpaceOrNot=(value)=>{
    return value.indexOf(' ') >= 0;
 }



    handleSubmit = (e) => {
        //debugger;
        // if (!this.state.hadModified.name) {
        //    this.setState({
        //        hadModified:true
        //    })
        //   }

        this.setState({
            disabled:true,
            disabledCancel:true
        })

        let phoneNUMBER = this.state.phoneNumberInOrganization === " " ? this.props.organizationData.organizationData.phone : this.state.phoneNumberInOrganization;
        if(this.state.phoneNumberInOrganization === undefined){
            window.location.reload();
    }

    
     const phoneError = validateInput22(phoneNUMBER);
    
    this.setState({ phoneError }, () => {
       if(!phoneError) {
        //  setTimeout(() => {
        //    alert(JSON.stringify(this.state, null, 4));
        //  }, 300)
       }
    })   

    //debugger;

    // let finalNumber = this.state.phone

    // let whiteSpace = this.stringHasTheWhiteSpaceOrNot(JSON.stringify(finalNumber));

    // if(whiteSpace===true){
    //     finalNumber=  finalNumber.replace(/[^\w\s]/g, "")
    //     var removedNumber = finalNumber.split(" ").join("");
    //     removedNumber = parseInt(removedNumber)
    // }

    // else{
    //     removedNumber = finalNumber;
     
    // }



    let finalNumber= phoneNUMBER;

    let whiteSpace = this.stringHasTheWhiteSpaceOrNot(JSON.stringify(finalNumber));


        if(whiteSpace===true){
                finalNumber=  finalNumber.replace(/[^\w\s]/g, "")
                var removedNumber = finalNumber.split(" ").join("");
                removedNumber = parseInt(removedNumber)
            }

            else{
                removedNumber = finalNumber;
            
            }





    //  finalNumber=  finalNumber.replace(/[^\w\s]/g, "")
    // let removedNumber = finalNumber.split(" ").join("");
    // removedNumber = parseInt(removedNumber)
    //     console.log("removedNumber",removedNumber)


        let count= this.validate()
        console.log(count)
        console.log(this.state.errorObj)

        let errorLength =  this.validation()
        if(errorLength ===1){
            this.setState({isOpen1:true,message:["Please fill all fields with valid inputs"]})
        }

       
      else  if(count === 0 && phoneError===""){
             console.log(this.state)
             console.log("success")
             let updateObject={}
             updateObject.phone = removedNumber
             updateObject.id=this.props.organizationData.organizationData.id
             console.log("hadModified",this.state.hadModified.name)
            
            //  if(this.state.hadModified.name === true){
                updateObject.name = this.props.organizationData.organizationData.name
            //  }

             if(this.state.hadModified.sending_email_address === true){
                updateObject.sending_email_address = this.props.organizationData.organizationData.sending_email_address
             }

            //  if(this.state.hadModified.main_title === true){
                updateObject.main_title = this.props.organizationData.organizationData.main_title
            //  } if(this.state.hadModified.secondary_title === true){
                updateObject.secondary_title = this.props.organizationData.organizationData.secondary_title
            //  } if(this.state.hadModified.main_body === true){
                updateObject.main_body = this.props.organizationData.organizationData.main_body
            //  }
            //  if(this.state.hadModified.secondartBody === true){
                updateObject.secondary_body = this.props.organizationData.organizationData.secondary_body
            //  }

             if(this.state.imageUploaded)
             updateObject.log=this.props.organizationData.organizationData.logo
                console.log(updateObject)
   
            let res=  this.props.updateorganization(updateObject)
            res.then(r=>{
                let id = "2"
                this.props.showorganization(id)
                console.log(JSON.stringify(r))
                //alert("Successfully Added")
            }).catch(c=>{
                alert(JSON.stringify(c))
            })
         }


         if (!this.state.disabled) {
            this.setState({
                disabled:true,
            })
           }

           if (!this.state.disabledCancel) {
            this.setState({
                disabledCancel:true,
            })
           }



           

           this.setState({
               hadModified:{
                name:false,
                sending_email_address:false,
                phone:false,
                main_title:false,
                secondary_title:false,
                main_body:false,
                secondary_body:false,
               }
           })
         

    
     }



     saveAndGo =()=>{
        const { history } = this.props;
            this.handleSubmit();
            history.push("/Dashboard")
     }


     handleRemoveImage = (e) =>{
        let id="2"
        let data = this.props.removeImage(id)
        data.then(res=>{
            console.log(res)
            this.props.showorganization(id)
        })


        alert("Image Removed Successfully")
        this.setState({
            imgLoader: true
        })


        this.setState({
            disableImageUpload: false
        })
     }


     componentDidMount(){
        this.setState({
            backupArrayOrg: this.props.backupOrgDataFinal
        })
        this.props.resetUserDataInOrg();
         let id = "2"
         //const { history } = this.props;
       this.props.showorganization(id)
       //&& dataOrganizationDetails.main_body && dataOrganizationDetails.secondary_body  && dataOrganizationDetails.main_title && dataOrganizationDetails.secondary_title
     let dataOrganizationDetails= this.props.organizationData.organizationData

       if ( dataOrganizationDetails.name && dataOrganizationDetails.phone && dataOrganizationDetails.sending_email_address && dataOrganizationDetails.secondary_body  && dataOrganizationDetails.main_title && dataOrganizationDetails.secondary_title) {
        window.onbeforeunload = () => true
        this.handleSubmit();
      } else {
        window.onbeforeunload = undefined
       
      }
     }


      goDashboard =()=>{

      
        //this.forceUpdate();
        console.log("fixedArray", this.state.backupArrayOrg.name)
    
      let updateObject={}
            updateObject.id="2"

            updateObject.name = this.props.backupOrgDataFinal.name

            updateObject.sending_email_address = this.props.backupOrgDataFinal.sending_email_address

            updateObject.phone = parseInt(this.props.backupOrgDataFinal.phone)
       
            updateObject.main_title = this.props.backupOrgDataFinal.main_title
   
            updateObject.secondary_title = this.props.backupOrgDataFinal.secondary_title
       
            updateObject.main_body = this.props.backupOrgDataFinal.main_body
       
            updateObject.secondary_body = this.props.backupOrgDataFinal.secondary_body
            updateObject.logo=this.props.backupOrgDataFinal.logo


            let res=  this.props.updateorganization(updateObject)
            //this.render();
            res.then(r=>{
                let id = "2"
                this.props.showorganization(id)
                console.log(JSON.stringify(r))
               // this.forceUpdate();
                // alert("Successfully Added")
            }).catch(c=>{
                alert(JSON.stringify(c))
            })
            this.setState({
                phoneNumberInOrganization:parseInt(this.props.backupOrgDataFinal.phone)
            })
           
            this.setState({
                hadModified:{
                 name:false,
                 sending_email_address:false,
                 phone:false,
                 main_title:false,
                 secondary_title:false,
                 main_body:false,
                 secondary_body:false,
                },

            })

            if (!this.state.disabledCancel) {
                this.setState({
                    disabledCancel:true,
                })
               }
          
            //window.location.reload();
       
    }



     //const {name,sending_email_address,phone,main_title,secondary_title,main_body,secondary_body} = this.state;

    //  let history = useHistory();
    render(){
        //const { when, onOK, onCancel, title, okText, cancelText } = this.props;
       //console.log("propmpt", this.props)
        
        console.log("backupOrgDataFinal", this.props.backupOrgDataFinal);

        const {name,sending_email_address,phone,main_title,secondary_title,main_body,secondary_body} = this.state;
        const enabled =
            name.length > 0 ||
            sending_email_address.length > 0 ||
            // phone.length > 0 ||
            main_title.length > 0 ||
            secondary_title.length > 0 ||
            main_body.length > 0 ||
            secondary_body.length > 0 ; 


       console.log("organizationData",this.props.organizationData.organizationData, this.props.organizationData.organizationData.name)
        const { actionType } = this.state;
        console.log(this.state)
        console.log(this.props.organizationData)
        console.log(this.props)
        let TempUrl = "./images/logo_noimage.png"
       // "./images/user-circle-solid.svg"
        //"./images/logo_noimage.png";
        // var TempUrl="assets/img/noImage.png";
        let url= "https://zvky.flamingotech.ml/";
       // var iImage="assets/img/noImage.png";
        
        let organizationDataById 
        if(this.props.organizationData.organizationData){

             organizationDataById = this.props.organizationData.organizationData
            console.log(organizationDataById)
            if(this.props.organizationData.organizationData.payload){
              // debugger
              if(organizationDataById.payload.logo==null){
                  url=TempUrl;
              }
              else{
                    url="https://zvky.flamingotech.ml/"+organizationDataById.payload.logo 
              }
            }
            else{


                if(organizationDataById.logo==null){
                    url=TempUrl;
                }
                else{
                    url="https://zvky.flamingotech.ml/"+organizationDataById.logo
                }
          
            }
        }
        else{
            organizationDataById = this.props.organizationData
            if(this.state.imageUploaded){
                url = URL.createObjectURL(organizationDataById.logo)
                console.log(url)

            }
            else{
                //debugger
                url="https://zvky.flamingotech.ml/"+organizationDataById.logo
                
            }
            
        }
        console.log(url)


        const confirm = ()=>{
            const { history } = this.props;
            if(actionType==="goBack"){

                
                history.push("/Dashboard")
                //this.handleSubmit();
                // setTimeout(function() {
                //     history.push("/")
                //  }, 4000);
            //    props.deleteProductAction(id)
    
            }

            else if(actionType==="save"){


                this.handleSubmit();
                // if((this.validate()) ){
                //     this.handleSubmit();
                //     // setTimeout(function() {
                //     //     window.location.reload();
                //     //  }, 200);
                // }
               
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
            
            
            
            else{
                //
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
            this.setState({actionMessage:" Do you want to go home page ?"})

        }
        else if(actionType==="save"){
            this.setState({actionType})
            this.setState({actionMessage:"Are you sure you want to save Changes ?"})
            
        }

        else if(actionType==="upload"){
            this.setState({actionType})
            this.setState({actionMessage:"Are you sure you want to Upload this Image ?"})
        }

        else if(actionType==="deleteImage"){
            this.setState({actionType})
            this.setState({actionMessage:"Are you sure you want to delete this image ?"})

        }
        
        
        
        else{
            this.setState({actionType})
            this.setState({actionMessage:"Are you sure you want to duplicate this product and all its related SKU and plant information?"})
       
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


     let phno = organizationDataById.phone;

    //  const phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    //  let phno = organizationDataById.phone ||'';organizationDataById.name
    //     let finalPhno= phno.replace(phoneReg,'($1) $2-$3')
  //&& organizationDataById.main_title || organizationDataById.secondary_title  || organizationDataById.main_body || organizationDataById.secondary_body
    
  
     console.log("phoneNumber", this.state.value)
      
        const { value1} = this.state;


        console.log("thisorganizationData", this.props.organizationData.organizationData.logo)
    return (
        <div clas="userManagementSection">



           
{/* //|| this.state.hadModified.main_title===true || this.state.hadModified.main_body===true || this.state.hadModified.secondary_title===true || this.state.hadModified.secondary_body===true || this.state.hadModified.phone===true || this.state.hadModified.sending_email_address ===true  */}
    {/* {this.state.hadModified.name===true ?  */}
    
    {this.state.hadModified.name ===true || this.state.hadModified.sending_email_address ===true ||this.state.hadModified.phone ===true ? 
    <Prompt
      when={this.state.disabled===false ? organizationDataById.name && organizationDataById.phone && organizationDataById.name && organizationDataById.sending_email_address :" " }
       message={this.state.hadModified.main_body || this.state.hadModified.main_title ||this.state.hadModified.secondary_title || this.state.hadModified.secondary_body
         || this.state.hadModified.name || this.state.hadModified.sending_email_address 
         || this.state.hadModified.phone ? 'You have unsaved changes. Are you sure you want save and leave ?' : ' Are you sure you want to leave ?'}
       //onCancel="ignore &amp; Proced"
       //cancelText ="1123"
    /> : false}



    {/* <Prompt
     //when={organizationDataById}
     // when={this.state.disabled===false ? organizationDataById.name && organizationDataById.phone && organizationDataById.name && organizationDataById.sending_email_address :" " }
    //   message={JSON.stringify({
    //     header: "Confirm",
    //     content: "You have unsaved changes, Are you sure you want to leave?",
    //   })}
      // message={this.state.hadModified.main_body || this.state.hadModified.main_title ||this.state.hadModified.secondary_title || this.state.hadModified.secondary_body || this.state.hadModified.name || this.state.hadModified.sending_email_address || this.state.hadModified.phone ? 'Are you sure you want to save and leave?' : ' Are you sure you want to leave ?'}
       //onCancel="ignore &amp; Proced"
       //cancelText ="1123"
    />  */}
    {/* // : false }   */}
   
            	<InfoModal status={this.state.isOpen1} message={this.state.message} modalAction={this.toggle1}/>
             <ActionModal cancel={cancel} confirm={confirm} open={this.state.actionOpen} message={this.state.actionMessage}/>
               <div class="contentHeader bg-white d-flex justify-content-between align-items-center">
                    {/* <h1 class="page-header mb-0 d-flex align-items-center">
                        <img src="assets/img/tools-ic-lg.svg" class="mr-2"/>
                    </h1> */}
                    <h1 class="page-header mb-0 d-flex flex-wrap align-items-center" >
                    <img src="assets/img/Tools &amp; Settings-big-green.svg" alt="" class="mr-2" />Organization Settings
                </h1>
                </div>
                <div class="px-md-3 mt-3">
                <div class="pb-4">
                    <div class="bg-white">
                        <div class="row mb-6 mb-md-0">
                            <div class="col-md-10 col-lg-10" >
                                <h2 class="p-15 mb-0" style={{marginTop:"11px"}}>Document Details</h2>
                               
                            </div>
                            <div class="row mt-4 mb-6" >
                        {/* <div class="col-md-12 col-lg-6 mt-3 mt-lg-0 text-lg-right"> */}
                            <div class="topbarCtrls mt-3 mt-md-0 d-flex flex-wrap justify-content-md-end" >
                                    
                                  
                                            {/* <div >
                                            <a  class="btn ml-2" onClick={this.handleSubmit}>
                                                    <span class="d-flex align-items-center text-left">
                                                        <img src="assets/img/save-ic.svg" alt=""/>
                                                        <span class="ml-2"><b>Save  </b></span>
                                                    </span>
                                                </a>
                                            </div> */}
                                            
                                 

                                    <div className="hoverINOrg">
                                    <a  class="btn ml-2 mt-3 mt-md-0" >

                                    <button type="button" class="btn ml-2 mt-3 mt-md-0" style={{padding:"0em",cursor:"pointer"}}
                                    disabled={this.state.disabled}
                                    onClick={this.handleSubmit}>
                                    <img src="assets/img/save-ic.svg" alt="" style={{marginLeft:"-8px", marginTop:"-6px",cursor:"pointer"}}/> 
                                                        <span class="ml-2" style={{fontSize:"16px", cursor:"pointer"}}>Save</span>
                                    </button>
                                    
                                    </a>
                                    </div>


                                    <div className="hoverINOrg">
                                    <a  class="btn ml-2 mt-3 mt-md-0" >

                                    <button type="button" class="btn ml-2 mt-3 mt-md-0" style={{padding:"0em", cursor:"pointer"}}
                                    disabled={this.state.disabledCancel}
                                    onClick={this.goDashboard}>
                                        <span class="d-flex align-items-center text-left" style={{marginLeft:"-16px", cursor:"pointer"}}>
                                            <span class="ml-2" style={{fontSize:"16px", cursor:"pointer"}}>Cancel</span>
                                        </span>
                                    </button>
                                    
                                    </a>
                                    </div>
                                   



                                        {/* <a  class="btn ml-2 mt-3 mt-md-0" 
                                        
                                         disabled={this.state.disabled}
                                         onClick={this.goDashboard}>
                                            <span class="d-flex align-items-center text-left">
                                                <span class="ml-2" style={{marginTop:"2px"}}><b style={{marginLeft:"-4px",marginRight:"4px"}}>Cancel</b></span>
                                            </span>
                                        </a> */}
                                        
                                        {/* <a  class=" ml-2 mt-3 mt-md-0" style={{cursor:"pointer"}}>
                                            <img src="assets/img/close-ic.svg" alt="" 
                                            onClick={this.goDashboard}
                                            //onClick={()=>{confirmAction("goBack"); }}
                                            />
                                        </a> */}

                                        {/* <a  class="btn ml-2 mt-3 mt-md-0" 
                                         onClick={this.goDashboard}
                                       
                                        >
                                            <span class="d-flex align-items-center text-left">
                                               
                                                <span class="ml-2"><b>Cancel</b></span>
                                            </span>
                                        </a> */}
                        </div>
                        </div>
                        </div>
                        <div class="ContentSection p-15">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <div class="bg-grey-transparent-2 text-center px-2 py-2">
                                        <p class="m-0">The following details will appear on all printed items including invoices, orders, bills of lading, etc.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4 col-lg-3">
                                <label style={{fontWeight:"bold"}}>Logo</label>
                                    <div class="bg-grey-transparent-2 text-center px-3 py-3">


                                        <div 
                                        //class="logCircle mb-3"
                                         key={new Date().getTime()}>
                                             <div className="backgroundImageCover" style={{margin:'auto'}}>
                                        <img 
                                              src={url}
                                              id="imageid"
                                              style={{objectFit:"contain"}}
                                              class="resposiveImageParent"
                                              //className="imageCircle"
                                               //style={{display:"block", maxWidth:"230px", maxHeight:"95px", width:"auto", height:"auto"}} 
                                                             // style={{height:"250px",width:"255px", borderRadius:"50%"}}
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

                                       
                                            {/* <img src="assets/img/nvk-circle-logo.png" /> */}
                                            


                                    {/* <div style={{border:"1px solid lightgray",
                                        width:151,borderRadius:"12px",height:150,padding:2,backgroundColor:"white",marginBottom:4}}>
                                        <input  type="file" id = "imageid"   onChange={this.handlImageUpload} 
                                        style={{position:"relative",width:"18%",height:"18%"}} />
                                        <div class={"resposiveImageParent"} style={{  width: "140px", height: "100px" }}>
                                        <img 
                                              src={url}
                                              id="imageid"
                                              //className="imageCircle"
                                                // style={{height:"250px",width:"255px", borderRadius:"50%"}}
                                            />
                                        </div>
                                    </div> */}


                                            
                                            {/* <div className="loaderCenter">
                                                {this.state.imgLoader===true ? 
                                                    <p >
                                                         <Loader /> 
                                                         </p> 
                                                    :
                                                    <p > </p> 
                                            }
                                           
                                            </div> */}
                                        </div>


                                        <p><small>Image should be print quality (PNG or JPG)</small></p>
                                        <a href="#" class="btn btn-primary btn-block btnGroup">
                                        <button class="btn btn-primary btn-block btnGroup" style={{backgroundColor:"transparent", border:"none", cursor:"pointer"}} 
                                        //disabled={this.props.organizationData.organizationData.logo===null || this.props.organizationData.organizationData.logo===undefined ? this.state.disableImageUpload ===true : this.state.disableImageUpload===false}
                                        >
                                            <span class="d-flex align-items-center justify-content-around">
                                            <input  type="file"  id="imageid" name="logo" accept="image/png, image/jpeg" 
                                              onChange={this.handlImageUpload}  
                                              //disabled={ this.props.organizationData.organizationData.logo===null ||  this.props.organizationData.organizationData.logo===undefined? this.state.disableImageUpload ===true : this.state.disableImageUpload===false }
                                              ref={fileInput => (this.fileInput = fileInput)}
                                            // onClick={()=>{confirmAction("upload"); }}
                                             style={{zIndex:1,opacity:0,  cursor:"pointer"}}  />


                                                <span class="f-s-20" style={{position:"absolute",fontWeight:"bold", cursor:"pointer"}} >Upload</span>
                                            </span>
                                            <img src="assets/img/upload-ic-white.svg" alt=""  style={{cursor:"pointer"}} />
                                            </button>
                                        </a>


                                   




                                        <div >



                            


                                            {/* <span class="d-flex align-items-center justify-content-around"
                                                    //onClick={()=>{confirmAction("deleteImage"); }}
                                                    //onClick={this.handleRemoveImage}
                                             >
                                                <span class="f-s-20 text-danger" style={{marginTop:"-3px", fontWeight:"bold"}}>Remove</span>
                                            </span> */}


                                    {/* <a  class="btn ml-2 mt-3 mt-md-0" >
                                            <button type="button" class="btn ml-2 mt-3 mt-md-0" style={{padding:"0em"}}
                                            disabled={this.state.disabled}
                                            onClick={this.handleSubmit}>

                                            <img src="assets/img/save-ic.svg" alt="" style={{marginLeft:"-8px", marginTop:"-6px"}}/> 
                                                                <span class="ml-2" style={{fontSize:"16px", }}>Save</span>
                                                
                                            </button>
                                    </a> */}
                                            
                                             <button className="btn bg-red-transparent-3 btn-block btnGroup mt-3" style={{cursor:"pointer"}}
                                             disabled={this.props.organizationData.organizationData.logo===null ? this.state.disableImageRemove ===true : this.state.disableImageRemove===false}
                                            // style={{marginTop:"-3px", paddingRight:"5.1em", border:"none"}}
                                             onClick={()=>{confirmAction("deleteImage")}}>
                                             <span class="f-s-20 text-danger" style={{marginTop:"-3px", fontWeight:"bold", backgroundColor:"transparent"}}>Remove</span>
                                            <img src="assets/img/bin-ic-red.svg" alt=""  style={{marginRight:"15px"}}/>
                                            </button>
                                        </div>




                                    </div>
                                </div>



{/* 
                                <div class="row mt-3 mt-lg-0">
                                <div class="col-md-12 col-lg-12">
                                    <div class="row form-group">
                                        <div class="col-md-6">
                                            <label style={{fontWeight:"bold"}}>Main Title (Body)</label>
                                            <input type="text" placeholder="Name" class="form-control" name="main_title" value={organizationDataById.main_title} onChange={this.handleInput}  />
                                        </div>
                                        <div class="col-md-6">
                                            <label style={{fontWeight:"bold"}}>Secondary Title (Body)</label>
                                            <input type="text" placeholder="Address 01" class="form-control" name="secondary_title" value={organizationDataById.secondary_title} onChange={this.handleInput}  />
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-md-6">
                                            <label style={{fontWeight:"bold"}}>Main Body</label>
                                            <textarea class="form-control" rows="5"  name="main_body" value={organizationDataById.main_body} onChange={this.handleInput}>Address 01</textarea>
                                        </div>
                                        <div class="col-md-6">
                                            <label style={{fontWeight:"bold"}}>Secondary Body</label>
                                            <textarea class="form-control" rows="5" name="secondary_body" value={organizationDataById.secondary_body} onChange={this.handleInput}>Address 02</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                                <div class="col-md-8 col-lg-9 mt-3 mt-md-0">
                                    <div class="row form-group">
                                        <div class="col-md-12">
                                            <label style={{fontWeight:"bold"}}>Name</label>
                                            <input type="text" placeholder="Name" class="form-control" name="name" 
                                             value={organizationDataById.name} 
                                           // value={this.state.name}
                                             onChange={this.handleInput}  />
                                            {this.state.errorObj.firstNameError!==0?<span style={{fontSize:"small",color:"red"}}>Required</span>:""}
                                        </div>
                                    </div>


                                    <div class="row form-group">
                                        <div class="col-md-12">
                                            <label style={{fontWeight:"bold"}}>Sending Email Address</label>
                                            {/* <input refs="email" type="text" size="30" placeholder="Email"  value={organizationDataById.sending_email_address} onChange={this.handleInput}/> */}

                                            <input type="text" placeholder="Dispatch Email Address" class="form-control"
                                             name="sending_email_address" value={organizationDataById.sending_email_address} onChange={this.handleInput} />
                                            {/* <div className="text-danger">{this.state.errors.email}</div> */}
                                            {this.state.errorObj.sendingEmailError!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Email</span>:""}
                                        </div>
                                    </div>

                                 

                                    {/* <div class="row form-group">
                                        <div class="col-md-6">
                                            <label style={{fontWeight:"bold"}}>Phone</label>
                                            <input type="text" placeholder="(XXX)XXX-XXXX" class="form-control"  
                                            //  error={this.state.isError}
                                            name="phone" value={organizationDataById.phone} 
                                            onChange={this.handleInput} 
  
                                            />
                                           
                                            {this.state.errorObj.phoneError!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Phone Number</span>:""}
                                        </div>
                                    </div>  */}


                                    <div class="row form-group">
                                        <div class="col-md-6">
                                            <label style={{fontWeight:"bold"}}>Phone</label>
                                            <InputMask  class="form-control"  mask="(999) 999-9999" maskChar={""} 
                                             id={"phone1"} name="phone"
                                            value={this.state.phoneNumberInOrganization===" " ? phno : this.state.phoneNumberInOrganization} 
                                             onChange={this.handleChange} />
                                            {/* <input
                                                    class="form-control"  
                                                    type="text"
                                                    name="phone"
                                                    placeholder="(xxx) xxx-xxxx"
                                                    value={this.state.phoneNumberInOrganization===" " ? phno : this.state.phoneNumberInOrganization}
                                                   // pattern="[0-9]*"
                                                    //value={organizationDataById.phone}
                                                    // value={this.state.phone}
                                                    //onChange={this.handleInput} 
                                                     onChange={this.handleChange}
                                                     //maxLength="10"
                                                   
                                                /> */}
                                                {this.state.phoneError && <span style={{fontSize:"small",color:"red"}} >{this.state.phoneError}</span>}
                                        </div>
                                    </div>



                                </div>
                            </div>
                            <div class="row mt-3 mt-lg-0" style={{paddingTop:"1.1em"}}>
                                <div class="col-md-12 col-lg-12">
                                    <div class="row form-group">
                                        <div class="col-md-6">
                                            <label style={{fontWeight:"bold"}}>Main Title (Bold)</label>
                                            <input type="text" placeholder="Name" class="form-control" name="main_title" value={organizationDataById.main_title} onChange={this.handleInput}  />
                                        </div>
                                        <div class="col-md-6">
                                            <label style={{fontWeight:"bold"}}>Secondary Title (Bold)</label>
                                            <input type="text" placeholder="Address 01" class="form-control" name="secondary_title" value={organizationDataById.secondary_title} onChange={this.handleInput}  />
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-md-6">
                                            <label style={{fontWeight:"bold"}}>Main Body</label>
                                            <textarea class="form-control" rows="5"  name="main_body" value={organizationDataById.main_body} onChange={this.handleInput}>Address 01</textarea>
                                        </div>
                                        <div class="col-md-6">
                                            <label style={{fontWeight:"bold"}}>Secondary Body</label>
                                            <textarea class="form-control" rows="5" name="secondary_body" value={organizationDataById.secondary_body} onChange={this.handleInput}>Address 02</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div class="row mt-3">
                        <div class="col-md-12 col-lg-12 text-md-right mt-3 mt-md-0">
                            <button type="button" class="btn btn-outline-secondary btn-lg"  onClick={()=>{confirmAction("goBack"); }}  >Cancel</button>
                            <button type="button" class="btn btn-primary btn-lg ml-3" 
                            //  disabled={!enabled}
                            onClick={this.handleSubmit}
                            >Save</button>
                        </div>
                    </div> */}


                    {/* <div class="row mt-3" style={{float:"right"}}>
                        
                            <div class="topbarCtrls mt-3 mt-md-0 d-flex flex-wrap justify-content-md-end" style={{marginBottom:"1em", marginRight:"1em"}}>

                                    <a class="btn ml-2"
                                    onClick={this.handleSubmit}
                                   
                                    >
                                            <span class="d-flex align-items-center text-left">
                                                <img src="assets/img/save-ic.svg" alt=""/>
                                                <span class="ml-2"><b>Save  </b></span>
                                            </span>
                                        </a>
                                        <a  class="btn ml-2 mt-3 mt-md-0" 
                                         onClick={this.saveAndGo}
                                       
                                        >
                                            <span class="d-flex align-items-center text-left">
                                                <img src="assets/img/saveDone-ic.svg" alt=""/>
                                                <span class="ml-2"><b>Save &amp; Done</b></span>
                                            </span>
                                        </a>
                                        <a href="#" class=" ml-2 mt-3 mt-md-0">
                                            <img src="assets/img/close-ic.svg" alt="" 
                                            />
                                        </a>
                        </div>
                        </div> */}
                        {/* </div> */}




                </div>
            </div>
        </div>


            // <DemoForm/>
    )
    }
    }

    const mapStateToProps = (state)=> (
        {
            organizationData:state.organizationReduser,
            backupOrgDataFinal : state.organizationReduser.backupOrgData
        }
    
    )
    
    export default withRouter(connect(mapStateToProps,{showorganization,updateorganization,removeImage
        ,handleOrganizationSettingsInputAction,resetUserDataInOrg,
        uploadImage}) (OrganizationSettings));



