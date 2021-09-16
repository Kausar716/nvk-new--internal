import {React,useState,useEffect} from 'react';
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {modalAction} from "../../actions/productAction";
import { countryDetails } from '../Help/countryList';
import {addCustomerContact,handleExchangeData,getcustomerAddress,addcustomerAddress,updateContactData,getCustomerContacts,updatecustomerAddress} from "../../actions/customerSettingAction";

 const CustomerAddressNotes = (props) => {
     const {status,type} =props
   const {customerAddress,customerDataById} = props.customerData
   const [error,setError] = useState("")
   const [validErrorList,setValidErrorList] = useState([])
   const [validationError,setvalidationError] = useState("")

   useEffect(() => {
       setError("")

   },[customerDataById])


  
             
   let allCountry = Object.keys(countryDetails);
        
   let allStates ;
   // let countZipRegix
//    if(supplierData.supplierLocation){
     
       if(customerAddress.country && customerAddress.country !== "Select Country"){
        if(countryDetails[customerAddress.country])
           allStates = countryDetails[customerAddress.country][0];
        //    this.countZipRegix=countryDetails[customerAddress.country][1][0]
        //    console.log(this.countZipRegix)
           // console.log(this.state.clientData.country)
       }
//    }
   const handleInput= (e)=>{
    //    alert("ggg")
    //    if(e.target.id =="billing_address"){
    //        let primary = parseInt(customerAddress.primary_contact) ==1?0:1
    //        props.handleExchangeData(primary,e.target.id,"customerAddress")
    //    }else if(e.target.id =="delivery_address"){
    //     let all = parseInt(customerAddress.delivery_address) ==1?0:1
    //     props.handleExchangeData(all,e.target.id,"customerAddress")

    //    }else{
        console.log(e.target.value,e.target.id,"customerAddress")
        props.handleExchangeData(e.target.value,e.target.id,"customerAddress")
    //    } 
    }
    const onSaveClicked = () => {
        // let clientDetailsData = JSON.parse(JSON.stringify(this.state.clientData));

        let errorList = "";
        let errorCount = 0;
        let validationList = {  "country": "country", "state": "state", "city": "city", "zip": "zip","address1":"address1","address2":"address2","notes":"notes" };
        Object.keys(validationList).map((object, i) => {
            var element = document.getElementById(object);
 
          
            if (object === "notes") {
                if (element.value === "") {
                    document.getElementById("notes-validtor").innerText = "Enter  Notes"
                    errorCount++;

                } else {
                    document.getElementById("notes-validtor").innerText = ""
                }

            }
         
            

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
        if(errors !== 0)
        return
        if(type=="add"){
            props.addcustomerAddress(customerAddress)
                props.modalAction()
                // alert(customerDataById.customer_id)
                // props.getcustomerAddress(customerDataById.id)
                // props.getCustomerContacts(customerDataById.customer_id)
                
        }else{
            props.updatecustomerAddress(customerAddress)
                props.modalAction()
                console.log(customerDataById)
                // props.getcustomerAddress(customerDataById.id)
                
            

        }
     
      

    }
console.log(validErrorList)
  return (
    //   console.log()
  
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}

      <Modal isOpen={status} size="lg">
        <ModalHeader><p style={{textAlign:"center",fontSize:25}}>Notes</p> </ModalHeader>
        <form onSubmit={saveData}>
        <ModalBody>
    
        <div class="row mt-3">
            <div class="col-md-12 col-lg-12">
                <label>Notes <span class="text-danger"></span></label>
                <textarea  class="form-control" id="notes" value={""} value={customerAddress.notes}  onChange={handleInput} placeholder="Add Notes..."></textarea>
                {<span style={{fontSize:"small",color:"red"}} id="notes-validtor"></span>}
            </div>
        
        </div>
  


        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary btn-md ml-3" type="submit" style={{width:100}}>{"Save"}</button>
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
addCustomerContact,handleExchangeData,updateContactData,getCustomerContacts,getcustomerAddress,addcustomerAddress,updatecustomerAddress
     





})(CustomerAddressNotes)
