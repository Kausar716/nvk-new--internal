import React, { useState,useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Collapse ,Row,  Label} from 'reactstrap';
import {connect} from "react-redux";
import {handleExchangeData,getIntrestData,saveNoticationData,getNotificationData,saveIntrestData,saveFinanceExchangeData} from "../../../actions/customerSettingAction";
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import CustomerActionModal from '../../Modal/CustomerActionModal';
import SuccessModal from '../../Modal/SuccessModal';
// import * as BiIcons from "react-icons/bs";


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
      <input {...input}  placeholder={label}  type={type}   className="textRightIntrestRate"/><span style={{padding:"4px"}}>%</span>
      <Row>
      {touched && ((error && <span style={{color:"red", marginLeft:"1em"}}>{error}</span>) || (warning && <span>{warning}</span>))}
      </Row>
      
    </div>
  </div>
)

const taxrenderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    {/* <label>{label}</label> */}
    <div>
      <input {...input}  placeholder={label}  type={type}  className="textRightTax" />
      <Row>
      {touched && ((error && <span style={{color:"red",marginLeft:"1em"}}>{error}</span>) || (warning && <span>{warning}</span>))}
      </Row>
      
    </div>
  </div>
)


const onSubmit = (values) =>{
  console.log(values);
}




const InrestRates = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showData,setData] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [checkedData,setCheckedData] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [successMessage,setSuccessMessage] = useState([])
  const [open,setOpen] = useState(false)
  const [message,setMessage] = useState("")
  const [month,setMonth] = useState(false)
  const [year,setYear]= useState(false)
  const [tax,setTax]= useState(false)
  const [type, setType] = useState("")
  const toggle1  = ()=>setIsOpen1(!isOpen);
  const handleChangeData = (e) =>{
    // alert(e.target.value)
    if(e.target.value!==""){
      let value = e.target.value.split(".")
      // console.log(value[0],value[1])
      if(value[1]!== undefined)
      if(value[1].length>3 )
      // if(e.target.value.length>2){
        return
      }
      // alert(e.target.value)
    

    setCheckedData(true)
    if(e.target.id!=="taxrate_label" && e.target.id!=="taxrate_number" && e.target.id!==""){
      // let intValue = e.target.value*1.000
      props.handleExchangeData(e.target.value,e.target.id,"customerIntrest")

    }else {
      props.handleExchangeData(e.target.value,e.target.id,"customerIntrest")

    }


  }
  const resetData = () =>{
    setCheckedData(false)
    props.getIntrestData()
  }
  useEffect(()=>{
    // alert("jj")
    props.getIntrestData()

  },[showData])
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
  if(type=="save"){
      setType(type)
      setMessage("Are you sure you want to Save?")

  }
  setOpen(true)
  // setId(id)
}
  const saveExchangeData = ()=>{
    setCheckedData(false)
    setIsOpen1(true)
    setSuccessMessage(["Tax & Interest Rates Saved Successfully"])
    let obj={}
    obj.monthly = customerIntrest.monthly
    obj.yearly = customerIntrest.yearly
    obj.taxrate = customerIntrest.taxrate
    obj.taxrate_label = customerIntrest.taxrate_label
    obj.taxrate_number = customerIntrest.taxrate_number
    obj.status = 1
    props.saveIntrestData(obj)
  
  }
  const dataTochange =(e)=>{
   setCheckedData(true)
    // let intValue = e.target.value
    setMonth(false);
    if(e.target.value!=="" && e.target.id !== "taxrate_label" && e.target.id !=="taxrate_number"){
      if(Number.isInteger(parseFloat(e.target.value))) {
        let intValue = e.target.value*1.000
        // alert(e.target.value)
      props.handleExchangeData(intValue.toFixed(3),e.target.id,"customerIntrest")
      }
    
      else{
        // alert()
        let splitValue = e.target.value.split(".")
       if(splitValue[1].length<3){
        let intValue = e.target.value*1.0000
        props.handleExchangeData(intValue.toFixed(3),e.target.id,"customerIntrest")
       }else{
        var charCode = (e.which) ? e.which : e.keyCode;
          
        let id = e.target.id
        let characterCheck = e.target.value.match(/^[0-9]*(\.[0-9]{0,3})?$/);

        if(characterCheck === null){
  
        props.handleExchangeData(e.target.value,e.target.id,"customerIntrest")

       }

       
      }
    }
  }else{
    props.handleExchangeData("0.000",e.target.id,"customerIntrest")

  }
      return
    }

    const thirdMethod2=(event)=> {
      var charCode = (event.which) ? event.which : event.keyCode
      if (charCode == 46) {
          if (event.target.value.indexOf(".") < 0)
              return true;
          else
              return false;
      }

      if (event.target.value.indexOf(".") > 0) {
          var txtlen = event.target.value.length;
          var dotpos = event.target.value.indexOf(".");
          //Change the number here to allow more decimal points than 2
          if ((txtlen - dotpos) > 2)
              return false;
      }

      if (charCode > 31 && (charCode < 48 || charCode > 57))
          return false;

      return true;
      // alert(e.currentTarget.value)
      // console.log(e.target)
      // const re =  /^(\d+)?(?:\.\d{1,2})?$/g;
      // console.log(re)
      // if (!re.test(e.target.value)) {
      //     e.preventDefault();
      // }else{
      //   // alert(e.target.value)
        
      // }
    }
  const { handleSubmit, pristine, reset, submitting,customerIntrest} = props.customerData;
  
  return (
    <>
         <CustomerActionModal cancel={cancel} confirm={confirm} open={open} message={message}/>
      <div color="primary" onClick={toggle}  className="SubHeader" style={{marginLeft:5}}>
      <SuccessModal status={isOpen1} message={successMessage} modalAction={toggle1}/>
      {/* <Label className="subFont"></Label>  */}
      <span className="updownSymbolContainer"> 
        {isOpen ?  <img src="assets/img/arrow-icon2.svg" alt=""/> :  <img src="assets/img/arrow-icon.svg" alt=""/> } 
        </span>
      <h4 className="p-15 mb-0" className="subFont">Tax & Interest Rates</h4>
        </div>
      <Collapse isOpen={isOpen}>
       
          <div className="docDetails" style={{marginTop:"-15px"}}>
                   <p className="sub_menu_nameD"> Displayed on Customer Orders & Invoices</p>
          </div>

          <div className="containerBox"  style={{marginTop:"-15px"}}> 


            <div className="row_1_intrestRate">

                    <div className="intrestRate_label">
                          <label>Monthly</label>
                          <input type="number"  style={{borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)",textAlign:"right"}} placeholder={"0.000"}   step=".001" className="textRightIntrestRate" id="monthly" value={customerIntrest.monthly >"0"?customerIntrest.monthly:""} onChange={handleChangeData} onBlur={dataTochange} onKeyPress={thirdMethod2} /><span style={{padding:"4px"}}>%</span>
                          
                    </div>


                    <div className="intrestRate_label"  style={{marginLeft:"-19em"}}>
                          <label>Yearly</label>
                          <input type="number"     style={{borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)",textAlign:"right"}} placeholder={"0.000"} step=".001" className="textRightIntrestRate" id="yearly" value={customerIntrest.yearly>"0"?customerIntrest.yearly:""}  onChange={handleChangeData} onBlur={dataTochange} onKeyPress={thirdMethod2}/><span style={{padding:"4px"}}>%</span>
                         
                    </div>


                    <div className="intrestRate_label" style={{marginLeft:"-19em"}}>
                          <label>Tax Rate</label>
                          <input type="number" style={{borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)",textAlign:"right"}}placeholder={"0.000"}  step=".001" className="textRightIntrestRate" id="taxrate" value={customerIntrest.taxrate>"0"?customerIntrest.taxrate:""}  onChange={handleChangeData}onBlur={dataTochange} onKeyPress={thirdMethod2}/><span style={{padding:"4px"}}>%</span>
                         
                    </div>


                      <div className="intrestRate_label" style={{marginLeft:"-19em"}}>
                            <label>Tax Rate Label</label>
                            <input type="text"  style={{borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)",textAlign:"right"}} placeholder={"Sales Tax(HST) @ 13.0%"}     className="textRightTax" id="taxrate_label" value={customerIntrest.taxrate_label!==""?customerIntrest.taxrate_label:""}  onChange={handleChangeData}/>
                      </div>


                      <div className="intrestRate_label" style={{marginLeft:"-11em"}}>
                            <label>Tax Rate Number</label>
                            <input type="text"  style={{borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)",textAlign:"right"}} placeholder={"HST:1233333RT0001"}     className="textRightTax" id="taxrate_number" value={customerIntrest.taxrate_number !==""?customerIntrest.taxrate_number:""}  onChange={handleChangeData}/>
                      </div>
            </div>
            
            <div align="right" className="action_area_left"  >
                              <button  class="btn btn-outline-secondary btn-md" style={{height:40,width:75,fontSize:14}} disabled={checkedData==true?false:true} onClick={resetData}>Reset</button>
                              <button className="button_style_Tools_Setting_Save"   onClick={()=>confirmAction("save")} disabled={checkedData==true?false:true}>Save</button>
                  </div> 

                </div>


                    
      </Collapse>

      
    </>
  );
}
const mapStateToProps = (state)=>(
  {
    customerData:state.customerReducer
  }

)

const form = reduxForm({ form: 'Notification' });
export default connect(mapStateToProps, {handleExchangeData,getIntrestData,saveIntrestData,saveFinanceExchangeData})(form(InrestRates));
