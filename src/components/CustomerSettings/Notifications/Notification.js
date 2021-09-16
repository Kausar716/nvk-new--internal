import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Collapse,Label } from 'reactstrap';
import ActionModal from '../../Modal/ActionModal';
// import * as BiIcons from "react-icons/bs";
import * as FaIcon from 'react-icons/fi';
import './style.css';


const required = value => value ? undefined : 'Required';

const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  
    <div>
      <input {...input} placeholder={label}  type={type} className="textRight_OrderSettings"/><span className="smallFont">days remaining</span>
      <div className="row_1">
      {touched && ((error && <span style={{color:"red"}} id="field">{error}</span>) || (warning && <span>{warning}</span>))}
        </div> 
     
    </div>
  
)

const renderField2 = ({ input, label, type, meta: { touched, error, warning } }) => (
  
  <div>
    <input {...input} placeholder={label}  type={type} className="textRight_OrderSettings"/><span className="smallFont">days (Setting not used if set to 0)</span>
    <div className="row_1">
    {touched && ((error && <span style={{color:"red"}} id="field1">{error}</span>) || (warning && <span>{warning}</span>))}
      </div> 
   
  </div>

)



const onSubmit = (values) =>{
  console.log(values);
}


const Notification = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  console.log(number,required)
  const [val,setVal] = useState(3)

  const handleDataChange = (e)=>{
    // alert(e.target.value)
  }


  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <>

      <div color="primary" onClick={toggle} className="SubHeader">
      
      <Label className="subFont">Notifications</Label>
      <span className="updownSymbolContainer"> 
      {isOpen ?  <img src="assets/img/arrow-icon.svg" alt=""/> :  <img src="assets/img/arrow-icon.svg" alt=""/> } 
        </span>
        
        </div>
      <Collapse isOpen={isOpen}>
  
         <div className="docDetails" style={{marginTop:"-12px"}}>
         <p className="sub_menu_nameD"> Customer Notifications</p>
                  {/* <Label className="secondHeader">
                  Customer Notification
                  </Label> */}
          </div>
           
          <div className="containerBox">

                    <div className="row_1_Notification">

                      <div className="notification_label">
                            <label>READY to LATE Notice<span> <FaIcon.FiAlertCircle className="alertIcon" />days (Setting not used if set to 0)</span></label>
                            <Field
                                            name="ReserveExpiryNotice1"
                                            component={renderField2}
                                            type="text"
                                           
                                            validate={[ required, number]}
                                            onChange={handleDataChange}
                                           
                                            value={val}
                                          
                                        />
                      </div>

                      <div className="notification_label">
                            <label>Reserve Expiry Notice <span><FaIcon.FiAlertCircle className="alertIcon" />days remaining</span></label>
                            <Field
                                            name="ReserveExpiryNotice2"
                                            component={renderField}
                                            type="text"
                                       
                                            validate={[ required, number]}
                                            onChange={handleDataChange}
                                            value={val}
                                        
                                        />
                      </div>

                      <div className="notification_label"></div>

                    </div>

                        
                         


            </div> 
                  <div align="right" className="action_area_left">
                        <button class="btn btn-outline-secondary btn-md" style={{height:40,width:75,fontSize:14}}  disabled={pristine || submitting} onClick={reset} >Cancel</button>
                        <button className="button_style_Tools_Setting_Save" onClick={handleSubmit(onSubmit)} disabled={pristine || submitting}  >Save</button>
                  </div> 


       
      </Collapse>
    </>
  );
}

export default reduxForm({
  form: 'Notification1',

  // error:errors.
  enableReinitialize: true,
})(Notification);



