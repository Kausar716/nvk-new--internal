import React, { useState ,useEffect} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Collapse,   Row, Col, Label} from 'reactstrap';
import {connect} from "react-redux";
import CustomerActionModal from '../../Modal/CustomerActionModal';
import {handleChangeFilter,getPrintData,saveNoticationData,savecustomPrintData,handleExchangeData} from "../../../actions/customerSettingAction";
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import SuccessModal from '../../Modal/SuccessModal';
// import * as BiIcons from "react-icons/bs";

const onSubmit = (values) =>{
  console.log(values);
}



const required = value => value ? undefined : 'Required'
// const maxLength = max => value =>
// value && value.length > max ? `Must be ${max} characters or less` : undefined
// const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
// const minValue = min => value =>
// value && value < min ? `Must be at least ${min}` : undefined
// const minValue2 = minValue(2)


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    {/* <label>{label}</label> */}
    <div>
      <input style={{width:"115%"}} {...input} placeholder={label}   type={type} className="textRight"/>
      <Row>
      {touched && ((error && <span style={{color:"red", marginLeft:"1em"}}>{error}</span>) || (warning && <span>{warning}</span>))}
      </Row>
      
    </div>
  </div>
)


const CustomerPrintRates = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [checkedData,setCheckedData] = useState(false)
  const [isOpen1, setIsOpen1] = useState(false);
  const [successMessage,setSuccessMessage] = useState([])
  const [data,setData] = useState("")
  const [type,setType] = useState("")
  const [open,setOpen] = useState("")
  const [message,setMessage] = useState("")
  const toggle1  = ()=>setIsOpen1(!isOpen);
  const [price,setPrice] = useState(false)
  const [logo,setLogo] = useState(false)
  const [base, setBase] = useState(false)
  const [app, setApp] =  useState(false)
  const handleInputData =(e)=>{

    if(e.target.value!==""){
      let value = e.target.value.split(".")
      // console.log(value[0],value[1])
      if(value[1]!== undefined)
      if(value[1].length>2 )
      // if(e.target.value.length>2){
        return
      }
    setCheckedData(true)
    let intValue = e.target.value
 
    if(e.target.value !=="")
    props.handleExchangeData(intValue,e.target.id,"customerTag")
    else props.handleExchangeData(e.target.value,e.target.id,"customerTag")

  }
  useEffect(()=>{
    props.getPrintData()
  },[data])
const resetData = ()=> {
  setCheckedData(false)
  props.getPrintData()
}
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
  if(checkedData ){
if(type=="save"){
    setType(type)
    setMessage("Are you sure you want to Save?")

}
setOpen(true)
  }
// setId(id)
}
  const saveExchangeData = ()=>{
    setCheckedData(false)
    setIsOpen1(true)
    setSuccessMessage(["Customer Print Rates Saved successfully"])
    let obj={}
    obj.base_price = customerTag.base_price
    obj.custom_logo = customerTag.custom_logo
    obj.custom_pricing = customerTag.custom_pricing
    obj.custom_application = customerTag.custom_application
    obj.status = 1
    props.savecustomPrintData(obj)
  }
  const dataTochange =(e)=>{
    setCheckedData(true)
    // let intValue = e.target.value
    if(e.target.value!==""){
    
      if(Number.isInteger(parseFloat(e.target.value))) {
        setApp(false);setPrice(false); setLogo(false); setBase(false);
        let intValue = e.target.value*1.00
        // alert(e.target.value)
      props.handleExchangeData(intValue.toFixed(2),e.target.id,"customerTag")
      }
    
      else{
        setApp(false);setPrice(false); setLogo(false); setBase(false);
        // alert()
        let splitValue = e.target.value.split(".")
       if(splitValue[1].length<2){
      
        let intValue = e.target.value*1.00
        props.handleExchangeData(intValue.toFixed(2),e.target.id,"customerTag")
       }else{
        var charCode = (e.which) ? e.which : e.keyCode;
          
        let id = e.target.id
        let characterCheck = e.target.value.match(/^[0-9]*(\.[0-9]{0,2})?$/);

  
      props.handleExchangeData(e.target.value,e.target.id,"customerTag")
      

      

       }

       
      }
    }else{
      props.handleExchangeData("0.00",e.target.id,"customerTag")

    }
      return
    }
  
    const thirdMethod2=(e)=> {
    //   console.log(e.target)
    // const re = /^\d*(\.\d{0,1})?$/g;
    // console.log(re)
    // if (!re.test(e.target.value)) {
    //     e.preventDefault();
    // }else{
       
  
    // }
  
  }

  const { handleSubmit, pristine, reset, submitting,customerTag } = props.customerData;
  return (
    <>
         <CustomerActionModal cancel={cancel} confirm={confirm} open={open} message={message}/>
      <div color="primary" onClick={toggle}  className="SubHeader" style={{marginLeft:5}}>
      <SuccessModal status={isOpen1} message={successMessage} modalAction={toggle1}/>


        <span className="updownSymbolContainer"> 
        {isOpen ?  <img src="assets/img/arrow-icon2.svg" alt=""/> :  <img src="assets/img/arrow-icon.svg" alt=""/> } 
        </span>
      <h4 className="p-15 mb-0" className="subFont" >Customer Print & Tag Rates</h4>
        
        </div>
      <Collapse isOpen={isOpen}>
        
                <div className="docDetails" style={{marginTop:"-15px"}}>
                <p className="sub_menu_nameD"> Print Tag & Label Pricing</p>
                    {/* <Label className="secondHeader">
                    Print Tag & Label Pricing
                    </Label> */}
                    </div>

        <div >
        
          <Row className="containerBox"  style={{marginTop:"-12px"}}>
            <Row style={{width:"100%",paddingLeft:20}}>
              <Col className="col-2">
                    <Label className="subHeadingLabels" style={{paddingLeft:8}}>Base Price</Label>
                    <Row>
                            {/* <Col sm="0"><p className="moveRight"></p></Col> */}
                            {/* <Col sm="4"> */}

                           
                            <p  style={{display:"inline",paddingTop:"-10px",position:"relative"}}>$ <input type="number" className="textRight" placeholder={"0.00"}   step="0.01"  style={{textAlign:"left",width:"40%",marginLeft:6,borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)",textAlign:"right"}} id="base_price" value={props.customerData.customerTag.base_price}  onChange={handleInputData} onBlur={dataTochange}  onKeyPress={thirdMethod2}/>{<span style={{marginLeft:"0.3em",marginTop:"-10px",top:15,position:"absolute"}}>{""} per tag/label</span> }</p>
                          
                            {/* </Col> */}
                          
                           
                           
                        </Row>
              </Col>

              <Col className="col-2">
                    <Label className="subHeadingLabels" style={{paddingLeft:8}}>Custom Logo</Label>
                    <Row>
                            {/* <Col sm="0"><p className="moveRight"></p></Col> */}
                            {/* <Col sm="4"> */}

                           
                            <p  style={{display:"inline",paddingTop:"-10px",position:"relative"}}>$ <input type="number" className="textRight" placeholder={"0.00"}   step="0.01" style={{textAlign:"left",width:"40%",marginLeft:6,borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)",textAlign:"right"}} id="custom_logo" value={props.customerData.customerTag.custom_logo}  onChange={handleInputData} onBlur={dataTochange}  onKeyPress={thirdMethod2}/>{<span style={{marginLeft:"0.3em",marginTop:"-10px",top:15,position:"absolute"}}>{""} per tag/label</span> }</p>
                          
                            {/* </Col> */}
                          
                           
                           
                        </Row>
              </Col>


              <Col className="col-2" >
                    <Label className="subHeadingLabels" style={{paddingLeft:8}}>Custom Pricing</Label>
                        <Row>
                   
                            <p  style={{display:"inline",paddingTop:"-10px",position:"relative"}}>$ <input type="number" className="textRight" placeholder={"0.00"}  step=".001" style={{textAlign:"left",width:"40%",marginLeft:6,borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)",textAlign:"right"}} id="custom_pricing" value={props.customerData.customerTag.custom_pricing}  onChange={handleInputData}  onChange={handleInputData} onBlur={dataTochange}  onKeyPress={thirdMethod2}/>{<span style={{marginLeft:"0.3em",marginTop:"-10px",top:15,position:"absolute"}}>{""} per tag/label</span> }</p>
                           
                          
                        </Row>
              </Col>


              <Col className="col-2">
                    <Label className="subHeadingLabels" style={{paddingLeft:8}}>Custom Application</Label>
                        <Row>
                            {/* <Col sm="0"><p className="moveRight"></p></Col> */}
                            {/* <Col sm="4"> */}

                           
                            <p style={{display:"inline",paddingTop:"-10px",position:"relative"}}>$ <input type="number" className="textRight" placeholder={"0.00"}  style={{textAlign:"left"}} step="0.01" style={{textAlign:"left",width:"40%",marginLeft:6,borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)",textAlign:"right"}}  id="custom_application" value={props.customerData.customerTag.custom_application}  onChange={handleInputData} onBlur={dataTochange}  onKeyPress={thirdMethod2}/>{<span style={{marginLeft:"0.3em",marginTop:"-10px",top:15,position:"absolute"}}>{""} per tag/label</span> }</p>
                          
                            {/* </Col> */}
                          
                           
                           
                        </Row>
              </Col>
            


</Row>
<Col xs="12">
              <div align="right" className="action_area_left">
                              <button  class="btn btn-outline-secondary btn-md" style={{height:40,width:75,fontSize:14}}  disabled={checkedData==true?false:true} onClick={resetData}>Reset</button>
                              <button className="button_style_Tools_Setting_Save" disabled={checkedData==true?false:true} onClick={()=>confirmAction("save")}>Save</button>
                        </div> 
            
              </Col>
          </Row>

       

<div className="parentButtons">

{/* 
          <Row >
            <Col sm="10">
            </Col>
                    <Col sm="1">
                    <Button  className="buttonTopMargin" outline color="secondary" type="button" disabled={pristine || submitting} onClick={reset}  >Cancel</Button>
                    </Col>

                  <Col sm="1">
                  <Button  className="buttonTopMargin" color="primary" type="submit" style={{backgroundColor:"#357ebd"}} onClick={handleSubmit(onSubmit)} disabled={pristine || submitting}  >Save</Button>
                  </Col>
            </Row>
 */}





                     


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
export default connect(mapStateToProps, {handleChangeFilter,getPrintData,saveNoticationData,savecustomPrintData,handleExchangeData})(form(CustomerPrintRates));