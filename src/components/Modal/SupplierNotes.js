import {React,useState,useEffect} from 'react';
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {modalAction} from "../../actions/productAction";
import InputMask from 'react-input-mask';
import {handleSupplierExchnageData,getAllSuppliersContact,updateSupplierContact,addSuppplierContact} from "../../actions/supplierManagementAction";

 const SupplierNotes = (props) => {
     const {status,type} =props
   const {supplierContact,supplierDataById} = props.supplierData
   const [error,setError] = useState("")
   
   useEffect(() => {
    setError("")

},[supplierDataById])
   console.log(supplierContact)
   const handleInput= (e)=>{
    setError("")
    //    if(e.target.id =="primary_contact"){
    //        let primary = supplierContact.primary_contact ==1?0:1
    //        props.handleSupplierExchnageData(primary,e.target.id,"supplierContact")
    //    }else if(e.target.id =="receives_all"){
    //     let all = supplierContact.receives_all ==1?0:1
    //     props.handleSupplierExchnageData(all,e.target.id,"supplierContact")

    //    }else{
        props.handleSupplierExchnageData(e.target.value,e.target.id,"supplierContact")
    //    } 
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
        let validationList = {  "notes": "notes"};
        Object.keys(validationList).map((object, i) => {
            var element = document.getElementById(object);

            // if (object === "notes") {
            //     if (element.value === "") {
            //         document.getElementById("notes-validtor").innerText = "Enter Notes"
            //         errorCount++;

            //     } else {
            //         document.getElementById("notes-validtor").innerText = ""
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
        <ModalHeader><p style={{textAlign:"center",fontSize:25}}>Notes</p> </ModalHeader>
        <form>
        <ModalBody >
            <p style={{color:"red"}}>{error}</p>
          
            <p style={{color:"red"}}>{error}</p>
            <div class="row mt-3">
            <div class="col-md-12 col-lg-12">
                <label>Notes <span class="text-danger"></span></label>
                <textarea  class="form-control" id="notes" value={""} value={supplierContact.notes}  onChange={handleInput} placeholder="Add Notes..."></textarea>
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
        supplierData:state.supplierData,
    }
)
export default connect(mapStateToProps,{
    handleSupplierExchnageData,getAllSuppliersContact,updateSupplierContact,addSuppplierContact

     





})(SupplierNotes)
