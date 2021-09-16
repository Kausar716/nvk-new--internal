import {React,useState,useEffect} from 'react';
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {modalAction} from "../../actions/productAction";
import InputMask from 'react-input-mask';
import {addCustomerContact,handleExchangeData,savingContactData,updateContactData,getCustomerContacts} from "../../actions/customerSettingAction";

 const CustomerNotes = (props) => {
     const {status,type} =props
   const {customerContact,customerDataById} = props.customerData
   const [error,setError] = useState("")
   
   useEffect(() => {
    setError("")

},[customerDataById])
   console.log(customerContact)
   const handleInput= (e)=>{
    setError("")
    // alert("Fdfds")
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
        let validationList = {  "first_name": "first_name", "last_name": "last_name", "phone1": "phone1", "phone2": "phone2","email":"email","notes":"notes","phone1_ext":"phone1_ext","phone2_ext":"phone2_ext" };
        Object.keys(validationList).map((object, i) => {
            var element = document.getElementById(object);
         
            // if (object === "notes") {
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
       
       if(type=="add"){
                props.addPriamryContact(customerContact)
                props.modalAction()
               
            }else{
                props.updateContactData(customerContact)
                // alert("edit")
                props.modalAction()
            }
     
      

    }

  return (
  
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={status} size="lg">
        <ModalHeader><p style={{textAlign:"center",fontSize:25}}> Notes</p> </ModalHeader>
        <form >
        <ModalBody >
            <p style={{color:"red"}}>{error}</p>
          

        <div class="row mt-3">
            <div class="col-md-12 col-lg-12">
                <label>Notes <span class="text-danger"></span></label>
                <textarea  class="form-control" id="notes" value={""}  value={customerContact.notes}  onChange={handleInput} placeholder=" Add Notes..."></textarea>
                {/* {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""} */}
                {<span style={{fontSize:"small",color:"red"}} id="text-validtor"></span>}
            </div>
        
        </div>
  
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
        <button className="btn btn-primary btn-md ml-3"  style={{width:100}}  onClick={saveData}>Save</button>
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
export default connect(mapStateToProps,{
addCustomerContact,handleExchangeData,updateContactData,getCustomerContacts
     





})(CustomerNotes)
