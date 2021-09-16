import React from 'react';
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {modalAction} from "../../actions/productAction";

 const ModalData = (props) => {
   const {status,message} = props.productData
  

  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={status} >
        <ModalHeader> </ModalHeader>
        <ModalBody >
        {/* */}
          <ol style={{ width:message.length>1?"35%":"65%",margin:" auto"}} >
          {message.map((mess,id)=>{
            return(<li>{mess}</li>)
          })}

          </ol>
         
         
        {/* <p style={{textAlign:"center"}}>{message}</p> */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.modalAction} style={{backgroundColor:"#2296f3",border:"1px solid white",width:120}}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state)=> ({
  productData:state.productData
   
})

export default connect(mapStateToProps,{modalAction})(ModalData)
