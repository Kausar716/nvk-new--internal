import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import './modal.css'
const ModalExample = (props) => {
  const {
    buttonLabel,
    
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(props.modelToggle);

  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>{"label"}</Button> */}
      <Modal isOpen={props.modelToggle} toggle={toggle} className={"dualLineModal"}>
      
        <ModalBody>
          <Label>{props.message1}</Label> <br/>  
          <Label>{props.message2}</Label><br/>
          <button onClick={props.dualLineModalResult} id="success" className="removeButton">{props.buttonLabel}</button>{' '}
          <button  onClick={props.dualLineModalResult} id="cancel" className="cancelButton">Cancel</button>
        </ModalBody>     
      </Modal>
    </div>
  );
}

export default ModalExample;
