import {React,useState,useEffect} from 'react';
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {modalAction} from "../../actions/productAction";
import { countryDetails } from '../Help/countryList';
import {addCustomerContact,handleExchangeData,getcustomerAddress,addcustomerAddress,updateContactData,getCustomerContacts,updatecustomerAddress} from "../../actions/customerSettingAction";

 const AddressModal = (props) => {
     const {status,type} =props
   const {customerAddress,customerDataById} = props.customerData
   const [error,setError] = useState("")
   const [validErrorList,setValidErrorList] = useState([])
   const [validationError,setvalidationError] = useState("")

   useEffect(() => {
       setError("")

   },[customerDataById])


  
             
   let allCountry = Object.keys(countryDetails);
   console.log(countryDetails["USA"])
        
   let allStates ;
   // let countZipRegix
//    if(supplierData.supplierLocation){
     
       if(customerAddress.country && customerAddress.country !== "Select Country"){
        if(countryDetails[customerAddress.country])
           allStates = countryDetails[customerAddress.country][0];
        //    this.countZipRegix=countryDetails[customerAddress.country][1][0]
        //    console.log(this.countZipRegix)
           // console.log(this.state.clientData.country)
       }else{
        allStates = countryDetails["Canada"][0];

       }
//    }
   const handleInput= (e)=>{
       if(e.target.id =="billing_address"){
           let primary = parseInt(customerAddress.primary_contact) ==1?0:1
           props.handleExchangeData(primary,e.target.id,"customerAddress")
       }else if(e.target.id =="delivery_address"){
        let all = parseInt(customerAddress.delivery_address) ==1?0:1
        props.handleExchangeData(all,e.target.id,"customerAddress")

       }else if(e.target.id=="zip"){
        //    alert(customerAddress.zip)
        //    if(customerAddress.zip.length<=5){
            // if(e.target.value!==""){
                let value = e.target.value.split(".")
                // console.log(value[0],value[1])
                // alert(value[0].length)
                // if(value[1]!== undefined)
                if(value[0].length>=7 )
                // if(e.target.value.length>2){
                  return
                else{
                    props.handleExchangeData(e.target.value,e.target.id,"customerAddress")

                }
           

        //    }
        
           
        // props.handleExchangeData(e.target.value,e.target.id,"customerAddress")
       } 
       else{
           
        props.handleExchangeData(e.target.value,e.target.id,"customerAddress")
       } 
    }
    const onSaveClicked = () => {
        // let clientDetailsData = JSON.parse(JSON.stringify(this.state.clientData));

        let errorList = "";
        let errorCount = 0;
        let validationList = {  "country": "country", "state": "state", "city": "city", "zip": "zip","address1":"address1","address2":"address2","notes":"notes" };
        Object.keys(validationList).map((object, i) => {
            var element = document.getElementById(object);
            if (object === "city") {
                if (element.value === "") {
                    document.getElementById("city-validtor").innerText = "Enter City"
                    errorCount++;

                } else {
                    document.getElementById("city-validtor").innerText = ""
                }

            }
            if (object === "address1") {
                if (element.value === "") {
                    document.getElementById("address1-validtor").innerText = "Enter Address"
                    errorCount++;

                } else {
                    document.getElementById("address1-validtor").innerText = ""
                }

            }
          
            // if (object === "notes") {
            //     if (element.value === "") {
            //         document.getElementById("notes-validtor").innerText = "Enter  Notes"
            //         errorCount++;

            //     } else {
            //         document.getElementById("notes-validtor").innerText = ""
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
            if (object === "country") {
                // alert(element.value)
                if (element.value === "") {
                    // clientDetailsData.country="Canada"
                    document.getElementById("country-validtor").innerText = "Select Country"
                    errorCount++;

                } else {
                    document.getElementById("country-validtor").innerText = ""
                }


            }
            if (object === "state") {
                if (element.value === "") {
                    document.getElementById("state-validtor").innerText = "Select State"
                    errorCount++;


                } else {
                    document.getElementById("state-validtor").innerText = ""
                }


            }
            if (object === "zip") {
                // alert(element.value.length>6)
                if(element.value == "" ||isNaN(element.value) ||element.value.length <6 || element.value.length>6){
                // if ( !element.value.trim().match(this.countZipRegix)) {
                    document.getElementById("zip-validtor").innerText = "Enter Valid Postal/ZIP  "
                    errorCount++;

                }else {
                    document.getElementById("zip-validtor").innerText = ""
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
    //     if(customerDataById.id !== undefined){
    //         customerAddress.customer_id  = customerDataById.id
    //         customerAddress.status  = 1
    //         if(type=="add"){
    //         props.addcustomerAddress(customerAddress).then(data=>{
    //             props.modalAction()
    //             // alert(customerDataById.customer_id)
    //             props.getcustomerAddress(customerDataById.id)
    //             // props.getCustomerContacts(customerDataById.customer_id)
                
    //         })

    //     }else{
    //         props.updatecustomerAddress(customerAddress).then(data=>{
    //             props.modalAction()
    //             console.log(customerDataById)
    //             props.getcustomerAddress(customerDataById.id)
                
    //         })

    //     }
    // }else{
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
        // setError("Please add customer first")
    // }
     
      

    }
console.log(validErrorList)
  return (
    //   console.log()
  
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}

      <Modal isOpen={status} size="lg">
        <ModalHeader><p style={{textAlign:"center",fontSize:25}}>{type==="add"?"Add":"Edit"} Address</p> </ModalHeader>
        <form onSubmit={saveData}>
        <ModalBody>
    
          
        <div class="row mt-3">
            <div class="col-md-3 col-lg-3">
                <label>City<span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="city" value={customerAddress.city} onChange={handleInput} placeholder="City"/>
                {<span style={{fontSize:"small",color:"red"}} id="city-validtor"></span>}
            </div>
            <div class="col-md-3 col-lg-3">
                <label>Country<span class="text-danger">*</span></label>
                <select className="form-control"  id="country"  value={customerAddress.country}   placeholder="country" onChange={handleInput} >
                    {/* <option selected>Select Country</option> */}
                    {/* <option>{customerAddress.country}</option> */}
                    {allCountry.map((country, i)=>{
                        return <option id={allCountry[i]} selected={customerAddress.country ==allCountry[i]?"selected":""}>{allCountry[i]}</option>
                    })}
                    {/* <option value="Canada" selected={supplierData.supplierLocation.country =="Canada"?"selected":""}>Canada</option>
                    <option value="India" selected={supplierData.supplierLocation.country =="India"?"selected":""}>India</option>
                    <option value="Africa" selected={supplierData.supplierLocation.country =="Africa"?"selected":""}>Africa</option> */}
                </select>
                {<span style={{fontSize:"small",color:"red"}} id="country-validtor"></span>}
            </div>
            <div class="col-md-3 col-lg-3">
                <label>Province/State<span class="text-danger">*</span></label>
                <select className="form-control"  id="state"  value={customerAddress.state}  onChange={handleInput}>
                {/* <option selected>Select State</option> */}
                {/* <option>{customerAddress.state}</option> */}
                {allStates && allStates.map((c, i)=>{
                        return <option id={allStates[i]} selected={customerAddress.state ==allStates[i]?"selected":""}>{allStates[i]}</option>
                })}
                    {/* <option value="Ontario" selected={supplierData.supplierLocation.state =="Ontario"?"selected":""}>Ontario</option>
                    <option value="Alberta" selected={supplierData.supplierLocation.state =="Alberta"?"selected":""}>Alberta</option>
                    <option value="Quebec" selected={supplierData.supplierLocation.state =="Quebec"?"selected":""}>Quebec</option> */}
                </select>
                {<span style={{fontSize:"small",color:"red"}} id="state-validtor"></span>}
            </div>
            <div class="col-md-3 col-lg-3">
                <label>Postal/Zip<span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="zip" value={""}  value={customerAddress.zip}  onChange={handleInput} placeholder="Postal/Zip"/>
                {<span style={{fontSize:"small",color:"red"}} id="zip-validtor"></span>}
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12 col-lg-12">
                <label>Address<span class="text-danger">*</span></label>
                <textarea  class="form-control" id="address1" value={""} value={customerAddress.address1}  onChange={handleInput} placeholder="Address1"></textarea>
                {<span style={{fontSize:"small",color:"red"}} id="address1-validtor"></span>}
            </div>
            {/* <div class="col-md-6 col-lg-6">
                <label>Address 2<span class="text-danger">*</span></label>
                <textarea  class="form-control" id="address2" value={""} value={customerAddress.address2}  onChange={handleInput} placeholder="Address2"></textarea>
                {<span style={{fontSize:"small",color:"red"}} id="address2-validtor"></span>}
            </div> */}
        </div>
   
        <div class="row mt-3">
            <div class="col-md-6 col-lg-6">
                <label>Lat<span class="text-danger"></span></label>
                <input type="number" class="form-control" id="lat" value={""} value={customerAddress.lat}  onChange={handleInput} placeholder="Lat"/>
                {<span style={{fontSize:"small",color:"red"}} id="lat-validtor"></span>}
            </div>
            <div class="col-md-6 col-lg-6">
                <label>Long<span class="text-danger"></span></label>
                <input type="number" class="form-control" id="long" value={""}  value={customerAddress.long}  onChange={handleInput} placeholder="Long"/>
                {<span style={{fontSize:"small",color:"red"}} id="lang-validtor"></span>}
            </div>
        </div>
        {/* <div class="row mt-3">
            <div class="col-md-12 col-lg-12">
                <label>Notes <span class="text-danger">*</span></label>
                <textarea  class="form-control" id="notes" value={""} value={customerAddress.notes}  onChange={handleInput} placeholder="Add Notes..."></textarea>
                {<span style={{fontSize:"small",color:"red"}} id="notes-validtor"></span>}
            </div>
        
        </div> */}
  {/*  */}
        {/* <div class="row mt-3"> */}
        {/* <div class="d-flex"> */}
        {/* <div class="col-md-6 col-lg-6">
            <div className="custom-control custom-checkbox mb-1">
                <input type="checkbox" className="custom-control-input" id={"billing_address"} name="billing_address" onChange={handleInput} checked={parseInt(customerAddress.billing_address)==1?true:false}/>
                <label className="custom-control-label" for={"billing_address"}>billing_address</label>
            </div>
            </div>
            <div class="col-md-6 col-lg-6">
            <div className="custom-control custom-checkbox mb-1">
                <input type="checkbox" className="custom-control-input" id={"delivery_address"} name="delivery_address" onChange={handleInput}  checked={parseInt(customerAddress.delivery_address)==1?true:false}/>
                <label className="custom-control-label" for={"delivery_address"}>delivery_address</label>
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
        {/* </div>
        </div> */}


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
export default connect(mapStateToProps,{
addCustomerContact,handleExchangeData,updateContactData,getCustomerContacts,getcustomerAddress,addcustomerAddress,updatecustomerAddress
     





})(AddressModal)
