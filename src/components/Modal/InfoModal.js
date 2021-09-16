import React from 'react';
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {modalAction} from "../../actions/productAction";

 const InfoModal = (props) => {
   const {status,message} = props
  
   console.log(message)
  return (
  
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={status} >
        <ModalHeader><p style={{fontSize:25,color:"red"}}>Errors</p> </ModalHeader>
        <ModalBody >
        {/* */}
          <div style={{textAlign:"center"}}>
          {message.map((mess,id)=>{
            return(<p>{mess}</p>)
          })}

          </div>
         
         
        {/* <p style={{textAlign:"center"}}>{message}</p> */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.modalAction} style={{backgroundColor:"#2296f3",border:"1px solid white",width:120}}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


export default InfoModal
