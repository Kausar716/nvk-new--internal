import {React,useState,useEffect} from 'react';
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {modalAction} from "../../actions/productAction";
import { countryDetails } from '../Help/countryList';
import {handleSupplierExchnageData,getAllSuppliersContact,UpdateAddress,addSupplierAddress,getAllAddress} from "../../actions/supplierManagementAction";

 const SupplierAddressNotes = (props) => {
     const {status,type} =props
   const {supplierAddress,supplierAddressList,supplierDataById} = props.supplierData
   const [error,setError] = useState("")

   useEffect(() => {
       setError("")

   },[])
   const onSaveClicked = () => {
    // let clientDetailsData = JSON.parse(JSON.stringify(this.state.clientData));

    let errorList = "";
    let errorCount = 0;
    let validationList = {  "notes": "notes"};
    Object.keys(validationList).map((object, i) => {
        var element = document.getElementById(object);
        // if (object === "notes") {
        //     if (element.value === "") {
        //         document.getElementById("notes-validtor").innerText = "Enter  Notes"
        //         errorCount++;

        //     } else {
        //         document.getElementById("notes-validtor").innerText = ""
        //     }

        // }
        // if (object === "address2") {
        //     if (element.value === "") {
        //         document.getElementById("address2-validtor").innerText = "Enter  Address 2"
        //         errorCount++;

        //     } else {
        //         document.getElementById("address2-validtor").innerText = ""
        //     }

        // }
     
        // if (object === "contactFN") {
        //     if (element.value === "") {
        //         document.getElementById("contactFN-validtor").innerText = "First Name is not valid"
        //         errorCount++;

        //     } else {
        //         document.getElementById("contactFN-validtor").innerText = ""
        //     }


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
             
   let allCountry = Object.keys(countryDetails);
        
   let allStates ;
   // let countZipRegix
//    if(supplierData.supplierLocation){
     
       if(supplierAddress.country && supplierAddress.country !== "Select Country"){
        if(countryDetails[supplierAddress.country])
           allStates = countryDetails[supplierAddress.country][0];
        //    this.countZipRegix=countryDetails[customerAddress.country][1][0]
        //    console.log(this.countZipRegix)
           // console.log(this.state.clientData.country)
       }
//    }
   const handleInput= (e)=>{
       if(e.target.id =="billing_address"){
           let primary = parseInt(supplierAddress.billing_address) ==1?0:1
           props.handleSupplierExchnageData(primary,e.target.id,"supplierAddress")
       }else if(e.target.id =="shipping_address"){
        let all = parseInt(supplierAddress.shipping_address) ==1?0:1
        props.handleSupplierExchnageData(all,e.target.id,"supplierAddress")

       }else{
        props.handleSupplierExchnageData(e.target.value,e.target.id,"supplierAddress")
       } 
    }
    const saveData =(e)=>{
        e.preventDefault();
        let errors = onSaveClicked()
        if(errors!==0)
        return
        // //alert("saving")
       
        // if(supplierDataById.id !== undefined){
            // setError("")
            // supplierAddress.supplier_id  = supplierDataById.id
            // if(supplierAddress.id == undefined){
            //     props.addSupplierAddress(supplierAddress).then(data=>{
            //         props.modalAction()
            //      console.log(supplierDataById)
            //         // //alert(customerDataById.customer_id)
            //         props.getAllAddress(supplierDataById.id)
            //         // props.getsupplierContacts(customerDataById.customer_id)
                    
            //     })
    
            // }else{
                props.UpdateAddress(supplierAddress)
                props.modalAction()
    

        // }

        // }else{
        //     setError("Please add Supplier first")
        // }
     
      

    }

  return (
  
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={status} size="lg">
        <ModalHeader><p style={{textAlign:"center",fontSize:25}}>{type==="add"?"Add":"Edit"} Address</p> </ModalHeader>
        <form >
        <ModalBody >
        <p style={{color:"red"}}>{error}</p>
          
 
        <div class="row mt-3">
            <div class="col-md-12 col-lg-12">
                <label>Notes <span class="text-danger"></span></label>
                <textarea  class="form-control" id="notes" value={""} value={supplierAddress.notes}  onChange={handleInput}></textarea>
                {<span style={{fontSize:"small",color:"red"}} id="notes-validtor"></span>}
            </div>
        
         </div> 
  
   


        </ModalBody>
        <ModalFooter>
        <button className="btn btn-primary btn-md ml-3" onClick={saveData} style={{width:100}}>{type==="add"?"Save":"Update"}</button>
          <button onClick={props.modalAction} class="btn btn-outline-secondary btn-md" style={{width:100}}>Cancel</button>
        </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}


const mapStateToProps = (state)=>(
    {
        supplierData:state.supplierData
    }
)
export default connect(mapStateToProps,{
    handleSupplierExchnageData,getAllSuppliersContact,UpdateAddress,addSupplierAddress,getAllAddress
     





})(SupplierAddressNotes)
