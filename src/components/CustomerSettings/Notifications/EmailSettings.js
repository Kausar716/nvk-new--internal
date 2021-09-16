import React, { useState,useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Collapse,  Row, Col, Label} from 'reactstrap';
import {connect} from "react-redux";
import InfoModal from "../../Modal/InfoModal"
import CustomerActionModal from '../../Modal/CustomerActionModal';
import SuccessModal from '../../Modal/SuccessModal';
import {handleChangeFilter,saveNoticationData,getNotificationData,saveEmailData,getEmailData} from "../../../actions/customerSettingAction";

import '../style.css';
// import * as BiIcons from "react-icons/bs";

const onSubmit = (values) =>{
    console.log(values);
}



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
        <input {...input} placeholder={label}  type={type} className="textRightESetting"/>
        <Row>
        {touched && ((error && <span style={{color:"red", marginLeft:"1.1em"}}>{error}</span>) || (warning && <span>{warning}</span>))}
        </Row>
        
      </div>
    </div>
  )


const EmailSetting = props => {

    const [isOpen, setIsOpen] = useState(false);
	const [isOpen1, setIsOpen1] = useState(false);
	const [message,setMessage] = useState([]);
  const [message1,setMessage1] = useState("");
  const [checkedData,setCheckedData] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
	const toggle1 = () => setIsOpen1(!isOpen1);
  const [open,setOpen] = useState(false)
  const toggle2 = () => setIsOpen2(!isOpen2);
  const [successMessage,setSuccessMessage] = useState([])
  const [isOpen2, setIsOpen2] = useState(false);
  // const [open2,setOpen2] = useState(false)
  // const [message,setMessage] = useState("")
  const [type, setType] = useState("")


	const handleDataChange = (e)=>{
    setCheckedData(true)
    props.handleChangeFilter(e.target.value,e.target.id)
		// props.getEmailData(e.target.value,e.target.id)

	}
  const resetData = ()=>{
    props.getNotificationData()

  }
  const cancel = ()=>{
    setOpen(false)
    // setId(0)
    setType("")
    setMessage1("")
     
  }
  const confirm = ()=>{
     if(type==="save"){

      handleSaveData()
      
  
     }
  
    setOpen(false)
    // setId(0)
    setType("")
    setMessage1("")
  }
  const confirmAction = (type)=>{
    let count = validation()
    if(count==0){
      if(type=="save"){
        setOpen(true)
        setType(type)
        setMessage1("Are you sure you want to Save?")
    
    }
    }

  // setId(id)
  }
  const validation = ()=>{
    let errorCount = 0
    if(first_notice=="" ||second_notice =="" || quote_set_to_inactive==""){
      setMessage(["Values can't be Empty"])
			setIsOpen1(true)
      return ++errorCount

    }
		else if(parseInt(first_notice)==0 || parseInt(second_notice) ==0 || parseInt(quote_set_to_inactive==0)){

			setMessage(["Values can't be zero"])
			setIsOpen1(true)
      return ++errorCount
		}else if(parseInt(second_notice)<parseInt(first_notice)){

			setMessage(["Second Notice should be greater than first Notice"])
			setIsOpen1(true)
      return ++errorCount

		}else if(parseInt(second_notice)>parseInt(quote_set_to_inactive)){
			// alert()

			setMessage(["Quote set to inactive should be greater than second Notice"])
			setIsOpen1(true)
      return ++errorCount
		}else{
      return errorCount
    }

  }
	const handleSaveData = (e)=>{
// else{
      setSuccessMessage(["Customer Quote Reminders Saved successfully"])
      setIsOpen2(true)

			let obj = {}
			obj.first_notice = first_notice
			obj.second_notice = second_notice
			obj.quote_set_to_inactive = quote_set_to_inactive
			obj.status =1
			props.saveEmailData(obj)

		// }

	}
	useEffect(()=>{
		props.getEmailData()

	},[isOpen])

  const { handleSubmit, pristine, reset, submitting,first_notice,second_notice,quote_set_to_inactive } = props.customerData;
  return (
    <div>
       <CustomerActionModal cancel={cancel} confirm={confirm} open={open} message={message1}/>
       <SuccessModal status={isOpen2} message={successMessage} modalAction={toggle2}/>
		<InfoModal status={isOpen1} message={message} modalAction={toggle1}/>
        <div onClick={toggle}  className="SubHeader">
        {/* <Label className="subFont">Customer Quote Reminders</Label>
        <span className="updownSymbolContainer"> 
        {isOpen ?  <img src="assets/img/arrow-icon2.svg" alt=""/> :  <img src="assets/img/arrow-icon.svg" alt=""/> } 
        </span> */}
        
        <span className="updownSymbolContainer"> 
        {isOpen ?  <img src="assets/img/arrow-icon2.svg" alt=""/> :  <img src="assets/img/arrow-icon.svg" alt=""/> } 
        </span>
      <h4 className="p-15 mb-0" className="subFont">Customer Quote Reminders</h4>
          
          </div>
        <Collapse isOpen={isOpen}>
           
                {/* <div className="docDetails" style={{marginTop:"-12px"}}> */}
                {/* <p className="sub_menu_nameD"> Quote Reminders</p> */}
                  {/* <Label className="secondHeader">
                  Quote Reemainders
                  </Label> */}
                {/* </div> */}
                    <Row className="containerBox" style={{borderTop:"1px solid rgba(0, 0, 0, .1)",marginTop:"0px",width:"100%",marginLeft:"-1px"}}>
                        <Col sm="2">
                            <Label className="subHeadingLabels" style={{marginLeft:6}}>First Notice</Label>
                        <Row className="spacebelow">
                            <Col>
                              	<div>
        							<input type="number" style={{borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)"}}  placeholder={"0"} step="0"  className="textRightESetting"  id="first_notice" value={first_notice} onChange={handleDataChange}/>
                      <span className="smallFont"> days</span>
        							<Row>
        								{<span style={{color:"red", marginLeft:"1.1em"}}>{""}</span> }
        							</Row>
        
      							</div>
                            </Col>
                           
                            {/* <Col> <p  className="moveLeftESetting">days
                              </p>
                            </Col> */}
                        </Row>
                        </Col>


                        <Col sm="2">
                            <Label className="subHeadingLabels" style={{marginLeft:6}}>Second Notice</Label>
                            <Row>
							<Col>
                              	<div>
        							<input type="number" placeholder={"0"}  step="0"  className="textRightESetting" id="second_notice"
                       value={second_notice} onChange={handleDataChange} style={{borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)"}}/>
                       <span className="smallFont"> days</span>
        							<Row>
        								{<span style={{color:"red", marginLeft:"1.1em"}}>{""}</span> }
        							</Row>
        
      							</div>
                            </Col>

                              {/* <Col>
                            <p  className="moveLeftESetting">days
                              </p>
                            </Col> */}
                            </Row>
                        </Col>


                    <Col sm="2">
                            <Label className="subHeadingLabels" style={{marginLeft:6}}>Quote Set to Inactive</Label>
                            <Row>
							<Col>
                              	<div>
        							<input type="number" placeholder={"0"}   step="0" className="textRightESetting" 
                      id="quote_set_to_inactive" style={{borderRadius:4,border:"2px solid  rgba(0, 0, 0, .1)"}}  value={quote_set_to_inactive} onChange={handleDataChange}/>
                      <span className="smallFont"> days</span>
        							<Row>
        								{<span style={{color:"red", marginLeft:"1.1em"}}>{""}</span> }
        							</Row>
        
      							</div>
                            </Col>

                              {/* <Col>
                            <p  className="moveLeftESetting">days
                              </p>
                            </Col> */}
                            </Row>
                    </Col>
                    <Col sm="6">
                    </Col>
                    <Col>
                    
                    <div align="right" className="action_area_left">
                              <button  class="btn btn-outline-secondary btn-md" style={{height:40,width:75,fontSize:14}} disabled={checkedData==true?false:true} onClick={resetData}>Reset</button>
                              <button className="button_style_Tools_Setting_Save" onClick={()=>confirmAction("save")} disabled={checkedData==true?false:true}>Save</button>
                        </div> 
                    </Col>
                    </Row>


        </Collapse>
      
   
    </div>
  );
};
const mapStateToProps = (state)=>(
	{
	  customerData:state.customerReducer
	}
  
  )

const form = reduxForm({ form: 'Notification' });
export default connect(mapStateToProps, {handleChangeFilter,saveNoticationData,getNotificationData,saveEmailData,getEmailData})(form(EmailSetting));
