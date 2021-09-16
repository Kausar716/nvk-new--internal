import {React,useState,useEffect} from 'react';
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {modalAction} from "../../actions/productAction";
import InputMask from 'react-input-mask';
import {getsupplierById,handleSupplierExchnageData,getAllSuppliersContact,updateSupplierContact,addSuppplierContact} from "../../actions/supplierManagementAction";

 const SupplierContactModal = (props) => {
     const {status,type} =props
   const {supplierContact,supplierDataById} = props.supplierData
   const [error,setError] = useState("")
   
   useEffect(() => {
    setError("")

},[supplierDataById])
   console.log(supplierContact)
   const handleInput= (e)=>{
    setError("")
       if(e.target.id =="primary_contact"){
           let primary = supplierContact.primary_contact ==1?0:1
           props.handleSupplierExchnageData(primary,e.target.id,"supplierContact")
       }else if(e.target.id =="receives_all"){
        let all = supplierContact.receives_all ==1?0:1
        props.handleSupplierExchnageData(all,e.target.id,"supplierContact")

       }else{
        props.handleSupplierExchnageData(e.target.value,e.target.id,"supplierContact")
       } 
    }
    const saveData =(e)=>{
        e.preventDefault();
        let errors = onSaveClicked()
        if(errors!==0)
        return
        // //alert("saving")
       
       
       
            if(type=="add"){
                // alert(type)
                props.addSuppplierContact(supplierContact)
                // .then(data=>{
                //     //alert("data")
                    props.modalAction()
                //  console.log(supplierDataById)
                //     // //alert(customerDataById.customer_id)
                //     props.getAllSuppliersContact(supplierDataById.id)
                //     props.getsupplierById(supplierDataById.id)
                //     // props.getsupplierContacts(customerDataById.customer_id)
                    
                // })
    
            }else{
                // alert(type)
                props.updateSupplierContact(supplierContact)
                // props.updateSupplierContact(supplierContact).then(data=>{
                    props.modalAction()
                //     console.log(supplierDataById)
                //     props.getsupplierById(supplierDataById.id)
                //     props.getAllSuppliersContact(supplierDataById.id)
                    
                // })
    

        }

      
     
      

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
                <input type="text" class="form-control" id="first_name" value={supplierContact.first_name} onChange={handleInput} placeholder="First Name"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="first_name-validtor"></span>}
            </div>
            <div class="col-md-6 col-lg-6">
                <label>Last Name<span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="last_name" value={""}  value={supplierContact.last_name}  onChange={handleInput} placeholder="Last Name"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="last_name-validtor"></span>}
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-6 col-lg-6">
                <label>Phone 1<span class="text-danger">*</span></label>
                <InputMask className={"form-control"} mask="(999) 999-9999" maskChar={""} id={"phone1"} value={supplierContact.phone1} onChange={handleInput} placeholder="(xxx) xxx xxxx"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="phone1-validtor"></span>}
            </div>
            <div class="col-md-6 col-lg-6">
                <label>Phone1 Ext</label>
                <input type="number" class="form-control" id="phone1_ext" value={""}  value={supplierContact.phone1_ext}  onChange={handleInput} placeholder="Phone1 Ext"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="phone1_ext-validtor"></span>}
            </div>
        </div>
   
        <div class="row mt-3">
            <div class="col-md-6 col-lg-6">
                <label>Phone 2<span class="text-danger"></span></label>
                {/* <input type="number" class="form-control" id="phone2" value={""} value={customerContact.phone2}  onChange={handleInput}/> */}
                <InputMask className={"form-control"} mask="(999) 999-9999" maskChar={""} id={"phone2"} value={supplierContact.phone2} onChange={handleInput} placeholder="Phone 2"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="phone2-validtor"></span>}
            </div>
            <div class="col-md-6 col-lg-6">
                <label>Phone 2 Ext<span class="text-danger"></span></label>
                <input type="number" class="form-control" id="phone2_ext" value={""}  value={supplierContact.phone2_ext}  onChange={handleInput} placeholder="Phone 2 Ext"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="phone2_ext-validtor"></span>}
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12 col-lg-12">
                <label>Email <span class="text-danger">*</span></label>
                <input type="email" class="form-control" id="email" value={""} value={supplierContact.email}  onChange={handleInput} placeholder="Example@gamil.com"/>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="email-validtor"></span>}
            </div>
        
        </div>
  
  
        {/* <div class="row mt-3"> */}
        {/* <div class="d-flex"> */}
        {/* <div class="col-md-6 col-lg-6"> */}
            {/* <div className="custom-control custom-checkbox mb-1">
                <input type="checkbox" className="custom-control-input" id={"primary_contact"} onChange={handleInput} checked={parseInt(supplierContact.primary_contact)==1?true:false}/>
                <label className="custom-control-label" for={"primary_contact"}>This person is the primary contact</label>
            </div>
            </div>
            <div class="col-md-6 col-lg-6">
            <div className="custom-control custom-checkbox mb-1">
                <input type="checkbox" className="custom-control-input" id={"receives_all"} onChange={handleInput}  checked={parseInt(supplierContact.receives_all)==1?true:false}/>
                <label className="custom-control-label" for={"receives_all"}>This person receives all communication</label>
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
        supplierData:state.supplierData,
    }
)
export default connect(mapStateToProps,{getsupplierById,
    handleSupplierExchnageData,getAllSuppliersContact,updateSupplierContact,addSuppplierContact

     





})(SupplierContactModal)
