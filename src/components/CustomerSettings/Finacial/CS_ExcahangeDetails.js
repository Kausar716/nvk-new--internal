import React, { useState,useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Collapse, Row, Col, Label} from 'reactstrap';
import {connect} from "react-redux";
import CustomerActionModal from '../../Modal/CustomerActionModal';
import {handleChangeFilter,getAllCustomerExchange,saveNoticationData,getNotificationData,handleExchangeData,saveFinanceExchangeData} from "../../../actions/customerSettingAction";
import {saveSupplierData,handleSupplierExchnageData,getAllSupplierExchange} from "../../../actions/supplierManagementAction";
import DatePicker from "react-datepicker";
import SuccessModal from '../../Modal/SuccessModal';
import "react-datepicker/dist/react-datepicker.css";

import * as BiIcons from "react-icons/bs";


  const required = value => value ? undefined : 'Required'
  // const maxLength = max => value =>
  //   value && value.length > max ? `Must be ${max} characters or less` : undefined
  // const maxLength15 = maxLength(15)
  const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
  const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
  const minValue2 = minValue(2)
  
  
  const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      {/* <label>{label}</label> */}
      <div>
        <input {...input}   className="inputBoxDesign2" placeholder={label}  type={type}/>
        <Row>
        {touched && ((error && <span style={{color:"red", marginLeft:"1em"}}>{error}</span>) || (warning && <span>{warning}</span>))}
        </Row>
        
      </div>
    </div>
  )


  const onSubmit = (values) =>{
    console.log(values);
  }
 
  
  
    



const CS_ExcahangeDetails = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [checkedData,setCheckedData] =useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [successMessage,setSuccessMessage] = useState([])
  const toggle1  = ()=>setIsOpen1(!isOpen);
  const [open,setOpen] = useState(false)
  const [message,setMessage] = useState("")
  const [type, setType] = useState("")
  const [exchange_customer,setexchangeCustomer] = useState(false)
  const [exchange_supplier, setexchangeSupplier] = useState(false)   
  // const [customerExchange,setCustomerExchange] = useState({from_currency:"CAD",to_currency:"US",exchange_rate:"",exchange_date:""})
  // const [supplierExchange,setSupplierExchange] = useState({from_currency:"CAD",to_currency:"US",exchange_rate:"",exchange_date:""})

  const { handleSubmit, pristine, reset, submitting,customerExchange } = props.customerData;
  const {supplierExchange} = props.supplierData


  const handleInputData =(e)=>{
    setCheckedData(true)
    if(e.target.value!==""){
    // let intValue = e.target.value*1.000
    props.handleExchangeData(e.target.value,e.target.id,"customerExchange")
    }else   props.handleExchangeData(e.target.value,e.target.id,"customerExchange")

  }
  const handleInputData1 =(e)=>{
    setCheckedData(true)
    if(e.target.value!==""){
     props.handleSupplierExchnageData(e.target.value,"exchange_rate","supplierExchange")
 
    }else props.handleSupplierExchnageData(e.target.value,"exchange_rate","supplierExchange")
  }
  const datePickerData =(e)=>{
    setCheckedData(true)
    props.handleExchangeData(e.target.value,"exchange_date","customerExchange")
}
const datePickerData1 =(e)=>{
  console.log(e.target.value)
  setCheckedData(true)
  props.handleSupplierExchnageData(e.target.value,"exchange_date","supplierExchange")

}
const thirdMethod2=(e)=> {
  console.log(e.target)
  const re =  /^(\d+)?(?:\.\d{1,2})?$/g;
  console.log(re)
  if (!re.test(e.target.value)) {
      e.preventDefault();
  }else{
    
  }
}
const saveExchangeData = ()=>{
  if(checkedData){
    setCheckedData(false)
    setSuccessMessage(["Customer Exchange Rates Saved successfully"])
    // toggle1(true)
    setIsOpen1(true)
    props.saveFinanceExchangeData(customerExchange)
    props.saveSupplierData(supplierExchange)

  }


}
const resetData = ()=>{
  props.getAllCustomerExchange()
  props.getAllSupplierExchange()
  setexchangeCustomer(false)
  setexchangeSupplier(false)

}
useEffect(()=>{
  props.getAllCustomerExchange()
  props.getAllSupplierExchange()

},[handleSubmit])

  const [startDate, setStartDate] = useState(new Date());
  console.log(customerExchange)

  let dateInformate = customerExchange.exchange_date
  let split1 = dateInformate.split("-")
  let month = split1[1]
  let date = split1[2]
  let month1
  let date1
  if(month.toString().length ==1) {
    month1 = "0"+month
  }else{
    month1 = month

  }
  if(month.toString().length ==1) {
    date1 = "0"+date
  }else{
    date1 = date

  }
  let dateToShow = split1[0]+"-"+month1+"-"+date1

  let dateInformate1 = supplierExchange.exchange_date
  let split2 = dateInformate1.split("-")
  let month2 = split2[1]
  let date2 = split2[2]
  let month3
  let date3
  if(month2.toString().length ==1) {
    month3 = "0"+month2
  }else{
    month3 = month2

  }
  if(date2.toString().length ==1) {
    date3 = "0"+date2
  }else{
    date3 = date2

  }
  let dateToShow2 = split2[0]+"-"+month3+"-"+date3
  const cancel = ()=>{
    setOpen(false)
    // setId(0)
    setType("")
    setMessage("")
     
 }
 const confirm = ()=>{
     if(type==="save"){
      saveExchangeData()
      

     }

    setOpen(false)
    // setId(0)
    setType("")
    setMessage("")
}
const confirmAction = (type)=>{
  if(exchange_customer==false && exchange_supplier==false ){
  if(type=="save"){
      setType(type)
      setMessage("Are you sure you want to Save?")

  }
  setOpen(true)
}
  // setId(id)
}
const dataTochange = (e)=>{
  setCheckedData(true)
 
  if(e.target.value!=="" && e.target.id =="exchange_rate"){
    setexchangeCustomer(false)
    if(Number.isInteger(parseFloat(e.target.value))){
      let intValue = e.target.value*1.000
      props.handleExchangeData(intValue.toFixed(3),e.target.id,"customerExchange")
    }else{
      let splitValue = e.target.value.split(".")
     if(splitValue[1].length<3){
      let intValue = e.target.value*1.000
      props.handleExchangeData(intValue.toFixed(3),e.target.id,"customerExchange")

     }else{
      var charCode = (e.which) ? e.which : e.keyCode;
          
      let id = e.target.id
      let characterCheck = e.target.value.match(/^[0-9]*(\.[0-9]{0,2})?$/);
     if(characterCheck === null){
         if(id === "exchange_rate"){
          // setexchangeCustomer(true)
         }
         else setexchangeCustomer(false)
      
     }
      props.handleExchangeData(e.target.value,e.target.id,"customerExchange")
     }
    }
    return
  }else{
    props.handleExchangeData("1.000",e.target.id,"customerExchange")

  }
}
const dataTochange1 =(e)=>{
  setCheckedData(true)
  if(e.target.value!=="" && e.target.id =="exchange_rate1"){
    setexchangeSupplier(false)
    if(Number.isInteger(parseFloat(e.target.value))){
      let intValue = e.target.value*1.000
      props.handleSupplierExchnageData(intValue.toFixed(3),"exchange_rate","supplierExchange")
    }else{
      let splitValue = e.target.value.split(".")
     if(splitValue[1].length<3){
      let intValue = e.target.value*1.000
      props.handleSupplierExchnageData(intValue.toFixed(3),"exchange_rate","supplierExchange")

     }else{
      var charCode = (e.which) ? e.which : e.keyCode;
          
      let id = e.target.id
      let characterCheck = e.target.value.match(/^[0-9]*(\.[0-9]{0,2})?$/);
     if(characterCheck === null){
         if(id === "exchange_rate1"){
          // setexchangeSupplier(true)
         }
  
      
     }else  
      props.handleSupplierExchnageData(e.target.value,"exchange_rate","supplierExchange")
     }
    }
    return
  }else{
    props.handleSupplierExchnageData("1.000","exchange_rate","supplierExchange")

  }

}
  return (
    <>
     <CustomerActionModal cancel={cancel} confirm={confirm} open={open} message={message}/>
      <div color="primary" onClick={toggle}  className="SubHeader" style={{marginLeft:5}}>
      <SuccessModal status={isOpen1} message={successMessage} modalAction={toggle1}/>
      {/* <h4 className="p-15 mb-0">Categories</h4> */}
      <span className="updownSymbolContainer"> 
        {isOpen ?  <img src="assets/img/arrow-icon2.svg" alt=""/> :  <img src="assets/img/arrow-icon.svg" alt=""/> } 
        </span>
      <h4 className="p-15 mb-0" className="subFont">Customer and Supplier Exchange Rates</h4>
      
       
        </div>
      <Collapse isOpen={isOpen}>
       
          
          <div className="docDetails" style={{marginTop:"-15px"}}>
                  {/* <Label className="secondHeader">
                  Customer Exchange Details
                  </Label> */}
                  <p className="sub_menu_nameD" style={{fontWeight:"bold"}}>Customer Exchange Rate</p>
                   {/* <p className="sub_menu_nameD" style={{paddingTop:"10px",paddingLeft:10}}> </p> */}
          </div>


<div >


 


          <Row className="containerBox">
              <Col className="col-2">
                    <Label className="subHeadingLabels">From Currency</Label>
                        <Row>
                            <Col><p className="topSpace">{customerExchange.from_currency}</p>
                            </Col>
                        </Row>
              </Col>


              <Col className="col-2">
                  <Label className="subHeadingLabels">To Currency</Label>
                        <Row>
                            <Col><p className="topSpace">{customerExchange.to_currency}</p>
                            </Col>
                        </Row>
              </Col>

              <Col className="col-3">
                  <Label className="subHeadingLabels" style={{marginLeft:6}}>Exchange Rate</Label>
                        <Row>
                            <Col> 
                          
                            <div>
                                <input type="number" placeholder={"1.000"} className="inputBoxDesign2"  style={{borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)",textAlign:"right"}} value={customerExchange.exchange_rate} onChange={handleInputData} id="exchange_rate"  onBlur={dataTochange} onKeyPress={thirdMethod2}/> 
                            </div>
                           
                            
                            </Col>
                        </Row>
              </Col>

              <Col className="col-2">
                  <Label className="subHeadingLabels" style={{marginLeft:6}}>Exchange Date</Label>
                        <Row>
                            <Col>
                            {/* <DatePicker  className="inputBoxDesign2" selected={customerExchange.exchange_date} onChange={datePickerData} id="exchange_date_customer"/> */}
                            <input type="date" onChange={datePickerData} className="dateDesign"  
                                                    value={dateToShow} style={{borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)",textAlign:"right"}}/>
                            </Col>
                        </Row>
              </Col>

          </Row>

  
          <div className="docDetails" style={{marginTop:"-16px"}}>
          <p className="sub_menu_nameD" style={{fontWeight:"bold"}}> Supplier Exchange Rate</p>
          {/* <p className="sub_menu_nameD" style={{paddingTop:"10px",paddingLeft:10}}> </p> */}
                  {/* <Label className="secondHeader">
                  Suppliear Exchange Details
                  </Label> */}
          </div>
          <Row className="containerBox">
              <Col className="col-2">
                    <Label className="subHeadingLabels">From Currency</Label>
                        <Row>
                            <Col><p className="topSpace">CAD</p>
                            </Col>
                        </Row>
              </Col>


              <Col className="col-2">
                  <Label className="subHeadingLabels">To Currency</Label>
                        <Row>
                            <Col><p className="topSpace">US</p>
                            </Col>
                        </Row>
              </Col>

              <Col className="col-3">
                  <Label className="subHeadingLabels" style={{marginLeft:10}}>Exchange Rate</Label>
                        <Row>
                            <Col> 
                                
                            <div>
                    
                                <input type="number" placeholder={"1.000"} className="inputBoxDesign2"  style={{marginLeft:6,borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)",textAlign:"right"}}value={supplierExchange.exchange_rate} onChange={handleInputData1} id="exchange_rate1"  onBlur={dataTochange1} onKeyPress={thirdMethod2}/> 
                            </div>
                           
                           
                          
                            </Col>
                        </Row>
              </Col>

              <Col className="col-2">
                  <Label className="subHeadingLabels" style={{marginLeft:10}}>Exchange Date</Label>
                        <Row>
                            <Col>
                            {/* <DatePicker className="inputBoxDesign2" selected={supplierExchange.exchange_date} onChange={datePickerData1} /> */}
                            {/* dateDesign */}
                            <input type="date" onChange={datePickerData1} className="dateDesign"  
                                                    value={dateToShow2} style={{marginLeft:6,borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)",textAlign:"right"}}/>
                            </Col>
                        </Row>
              </Col>
              <Col xs="12">
              
          <div align="right" className="action_area_left">
                        <button  class="btn btn-outline-secondary btn-md" style={{height:40,width:75,fontSize:14}} disabled={checkedData==true?false:true} onClick={resetData}>Reset</button>
                        <button className="button_style_Tools_Setting_Save" onClick={()=>confirmAction("save")}  disabled={checkedData==true?false:true}>Save</button>
                  </div>
                  </Col> 

          </Row>
          
          
          
          </div>
   


          

      </Collapse>


    </>
  );
}
const mapStateToProps = (state)=>(
  {
    customerData:state.customerReducer,
    supplierData:state.supplierData
  }

)
// export default reduxForm({
//   form: 'CS_ExcahangeDetails',
// })(CS_ExcahangeDetails);
const form = reduxForm({ form: 'Notification' });
export default connect(mapStateToProps, {getAllSupplierExchange,getAllCustomerExchange,handleChangeFilter,saveNoticationData,getNotificationData,handleExchangeData,saveFinanceExchangeData,handleSupplierExchnageData,saveSupplierData})(form(CS_ExcahangeDetails));