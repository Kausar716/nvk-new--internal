import {React,useState,useEffect} from 'react';
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {modalAction} from "../../actions/productAction";
import InputMask from 'react-input-mask';
import {addCustomerContact1,addPriamryContact,getCustomerById,addCustomerContact,handleExchangeData,savingContactData,updateContactData,getCustomerContacts} from "../../actions/customerSettingAction";

 const QuickTransfer = (props) => {
     const {status,type} =props
   const {customerContact,customerDataById,primaryContact} = props.customerData
   const [error,setError] = useState("")
   
   useEffect(() => {
    setError("")

},[customerDataById])
   console.log(customerContact)
   const handleInput= (e)=>{
    setError("")
    //    if(e.target.id =="primary_contact"){
    //        let primary = customerContact.primary_contact ==1?0:1
    //        props.handleExchangeData(primary,e.target.id,"customerContact")
    //    }else if(e.target.id =="all_communication"){
    //     let all = customerContact.all_communication ==1?0:1
    //     props.handleExchangeData(all,e.target.id,"customerContact")

    //    }else{
        props.handleExchangeData(e.target.value,e.target.id,"customerContact")
    //    } 

    }
    const onSaveClicked = () => {
        // let clientDetailsData = JSON.parse(JSON.stringify(this.state.clientData));

        let errorList = "";
        let errorCount = 0;
        let validationList = {  "first_name": "first_name", "last_name": "last_name", "phone1": "phone1", "phone2": "phone2","email":"email","text":"text","phone1_ext":"phone1_ext","phone2_ext":"phone2_ext" };
        Object.keys(validationList).map((object, i) => {
            var element = document.getElementById(object);
            if (object === "first_name") {
                if (element.value === "") {
                    document.getElementById("first_name-validtor").innerText = "Enter  First Name"
                    errorCount++;

                } else {
                    document.getElementById("first_name-validtor").innerText = ""
                }

            }
            if (object === "last_name") {
                if (element.value === "") {
                    document.getElementById("last_name-validtor").innerText = "Enter Last Name"
                    errorCount++;

                } else {
                    document.getElementById("last_name-validtor").innerText = ""
                }

            }
            if (object === "phone1") {
             
                if(element.value !== ""){
                    let enteredNumber = element.value.trim().match(/\d/g)
                    
                    if (enteredNumber.join("").length<10 || enteredNumber.value === "") {
                        document.getElementById("phone1-validtor").innerText = "Phone Number is not valid"
                        errorCount++;
                    } else {
                        // alert("ff")
                        document.getElementById("phone1-validtor").innerText = ""
                    }
    
                }
                else if(element.value === ""){
                    document.getElementById("phone1-validtor").innerText = "Phone Number is not valid"
                    errorCount++;
                }

            }
            if (object === "phone2") {
                if(element.value !== ""){
                    let enteredNumber = element.value.trim().match(/\d/g)
                    if (!enteredNumber ||  enteredNumber.join("").length<10 || enteredNumber.value === "") {
                        document.getElementById("phone2-validtor").innerText = "Phone Number is not valid"
                        errorCount++;
                    } else {
                        document.getElementById("phone2-validtor").innerText = ""
                    }
    
                }
                // else if(element.value === ""){
                //     document.getElementById("phone2-validtor").innerText = "Phone Number is not valid"
                //     errorCount++;
                // }

            }
   

            // if (object === "phone2_ext") {
            //     if (element.value === "") {
            //         document.getElementById("phone2_ext-validtor").innerText = "Enter  Phone 2"
            //         errorCount++;

            //     } else {
            //         document.getElementById("phone2_ext-validtor").innerText = ""
            //     }

            // }
            // if (object === "phone1_ext") {
            //     if (element.value === "") {
            //         document.getElementById("phone1_ext-validtor").innerText = "Enter  Phone 2"
            //         errorCount++;

            //     } else {
            //         document.getElementById("phone1_ext-validtor").innerText = ""
            //     }

            // }
            if (object === "email") {
                if (element.value === "") {
                    document.getElementById("email-validtor").innerText = "Enter Email"
                    errorCount++;

                } else {
                    document.getElementById("email-validtor").innerText = ""
                }
            }
            // if (object === "text") {
            //     if (element.value === "") {
            //         document.getElementById("text-validtor").innerText = "Enter Notes"
            //         errorCount++;

            //     } else {
            //         document.getElementById("text-validtor").innerText = ""
            //     }
            // }


            // }
            // if (object === "contactLN") {
            //     if (element.value === "") {
            //         document.getElementById("contactLN-validtor").innerText = "Last Name is not valid"
            //         errorCount++;

            //     } else {
            //         document.getElementById("contactLN-validtor").innerText = ""
            //     }


            // }

            // if (object === "contactAddress") {
            //     if (element.value === "") {
            //         document.getElementById("contactAddress-validtor").innerText = "Address is not valid"
            //         errorCount++;

            //     } else {
            //         document.getElementById("contactAddress-validtor").innerText = ""
            //     }


            // }


            // }

        });
        return errorCount
        // if (errorCount > 0) {
        //     this.setState((state) => { state.validationError = this.state.errorArrayList + " is not valid"; state.validErrorList = this.state.errorArrayList; return state; });
        //     errorList = false;
        // } else {
        //     this.props.onSaveClicked(clientDetailsData,this.props.clientData);
        // }
    }
    const saveData =(e)=>{
        e.preventDefault();
        // alert("saving")
        let errors = onSaveClicked()
        if(errors!==0)
        return
       
        if(customerDataById.id !== undefined && primaryContact==false){
            setError("")
            customerContact.customer_id  = customerDataById.id
            if(type=="add"){
                props.addCustomerContact(customerContact).then(data=>{
                    props.modalAction()
                 console.log(customerDataById)
                    // alert(customerDataById.customer_id)
                    props.getCustomerContacts(customerDataById.id)
                    props.getCustomerById(customerDataById.id)
                    // props.getCustomerContacts(customerDataById.customer_id)
                    
                })
    
            }else{
                props.updateContactData(customerContact).then(data=>{
                    props.modalAction()
                    console.log(customerDataById)
                    props.getCustomerContacts(customerDataById.id)
                    props.getCustomerById(customerDataById.id)
                    
                })
    

        }

        }else{
            props.addCustomerContact1(customerContact).then(data=>{
                props.modalAction()
             console.log(customerDataById)
                // alert(customerDataById.customer_id)
                props.getCustomerContacts(customerDataById.id)
                props.getCustomerById(customerDataById.id)
                // props.getCustomerContacts(customerDataById.customer_id)
                
            })
            // alert(primaryContact)
            // alert("gg")
            props.addPriamryContact(customerContact)
            // props.modalAction()
           
        }
     
      

    }

  return (
  
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={status} size="lg">
        <ModalHeader><p style={{textAlign:"center",fontSize:25}}>{type==="add"?"Add":"Edit"} Contact</p> </ModalHeader>
        <form onSubmit={saveData}>
        <ModalBody >
            <p style={{color:"red"}}>{error}</p>
          
        <div class="row mt-3">
            <div class="col-md-6 col-lg-6">
                <label>First Name<span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="first_name" value={customerContact.first_name} onChange={handleInput} placeholder="First Name"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="first_name-validtor"></span>}
            </div>
            <div class="col-md-6 col-lg-6">
                <label>Last Name<span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="last_name" value={""}  value={customerContact.last_name}  onChange={handleInput} placeholder="Last Name"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="last_name-validtor"></span>}
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-6 col-lg-6">
                <label>Phone 1<span class="text-danger">*</span></label>
                <InputMask className={"form-control"} mask="(999) 999-9999" maskChar={""} id={"phone1"} value={customerContact.phone1} onChange={handleInput} placeholder="(xxx) xxx xxxx"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="phone1-validtor"></span>}
            </div>
            <div class="col-md-6 col-lg-6">
                <label>Phone1 Ext</label>
                <input type="number" class="form-control" id="phone1_ext" value={""}  value={customerContact.phone1_ext}  onChange={handleInput} placeholder="Phone1 Ext"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="phone1_ext-validtor"></span>}
            </div>
        </div>
   
        <div class="row mt-3">
            <div class="col-md-6 col-lg-6">
                <label>Phone 2<span class="text-danger"></span></label>
                {/* <input type="number" class="form-control" id="phone2" value={""} value={customerContact.phone2}  onChange={handleInput}/> */}
                <InputMask className={"form-control"} mask="(999) 999-9999" maskChar={""} id={"phone2"} value={customerContact.phone2} onChange={handleInput} placeholder="Phone 2"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="phone2-validtor"></span>}
            </div>
            <div class="col-md-6 col-lg-6">
                <label>Phone 2 Ext<span class="text-danger"></span></label>
                <input type="number" class="form-control" id="phone2_ext" value={""}  value={customerContact.phone2_ext}  onChange={handleInput} placeholder="Phone 2 Ext"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="phone2_ext-validtor"></span>}
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12 col-lg-12">
                <label>Email <span class="text-danger">*</span></label>
                <input type="email" class="form-control" id="email" value={""} value={customerContact.email}  onChange={handleInput} placeholder="Example@gamil.com"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="email-validtor"></span>}
            </div>
        
        </div>
        {/* <div class="row mt-3">
            <div class="col-md-12 col-lg-12">
                <label>Notes <span class="text-danger">*</span></label>
                <textarea  class="form-control" id="text" value={""}  value={customerContact.Notes}  onChange={handleInput} placeholder=" Add Notes..."></textarea> */}
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {/* {<span style={{fontSize:"small",color:"red"}} id="text-validtor"></span>}
            </div>
        
        </div> */}
  
        {/* <div class="row mt-3"> */}
        {/* <div class="d-flex"> */}
        {/* <div class="col-md-6 col-lg-6">
            <div className="custom-control custom-checkbox mb-1">
                <input type="checkbox" className="custom-control-input" id={"primary_contact"} onChange={handleInput} checked={parseInt(customerContact.primary_contact)==1?true:false}/>
                <label className="custom-control-label" for={"primary_contact"}>This person is the primary contact</label>
            </div>
            </div> */}
            {/* <div class="col-md-6 col-lg-6">
            <div className="custom-control custom-checkbox mb-1">
                <input type="checkbox" className="custom-control-input" id={"all_communication"} onChange={handleInput}  checked={parseInt(customerContact.all_communication)==1?true:false}/>
                <label className="custom-control-label" for={"all_communication"}>This person receives all communication</label>
            </div> */}
            {/* </div> */}
            {/* <div class="custom-control custom-radio">
                <input type="checkbox" id="delivery" name="delivery" value={"Delivery"}  class="custom-control-input" onClick={""} />
                
                <label class="custom-control-label" for="delivery">Discount</label>
            </div>
            <div class="custom-control custom-radio ml-4">
                <input type="checkbox" id="pickup" name="delivery" value={"Pickup"}  onClick={""} class="custom-control-input" />
                <label class="custom-control-label" for="delivery">Pick up</label>
            </div> */}
        {/* </div> */}
        {/* </div> */}


        </ModalBody>
        <ModalFooter>
        <button className="btn btn-primary btn-md ml-3" type="submit" style={{width:100}}>{type==="add"?"Save":"Update"}</button>
          <button onClick={props.modalAction} class="btn btn-outline-secondary btn-md" style={{width:100}}>Cancel</button>
        </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}


const mapStateToProps = (state)=>(
    {
        customerData:state.customerReducer
    }
)
export default connect(mapStateToProps,{getCustomerById,addPriamryContact,
addCustomerContact,handleExchangeData,updateContactData,getCustomerContacts
     





})(QuickTransfer)
