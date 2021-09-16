import React from 'react';
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {modalAction} from "../../actions/productAction";

 const SuccessInUM = (props) => {
   const {status,message} = props
  
   console.log(message)
  return (
  
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={status} >
        <ModalHeader><p style={{fontSize:25,color:"#629C44"}}>Success</p></ModalHeader>
        <ModalBody >
        {/* */}
        <p style={{textAlign:"justify",marginTop:"10px",marginLeft:"1em"}}>{props.message}</p>
         
         
        {/* <p style={{textAlign:"center"}}>{message}</p> */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.modalAction} style={{backgroundColor:"#2296f3",border:"1px solid white",width:120}}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


export default SuccessInUM
