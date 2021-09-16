import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label ,Input} from 'reactstrap';
import './userManagementModals/modal.css'
const DeleteRole = (props) => {
  const {
    buttonLabel,
    
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(props.modelToggle);

  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>{"label"}</Button> */}
      <Modal  isOpen={props.modelToggle} toggle={toggle} className={"dualLineModal"}>
      
        <ModalBody>
          <Label style={{marginBottom:"10%"}}>{props.message1}</Label> <br/>  
          {/* <Label>{props.message2}</Label> */}
          <button onClick={props.deleteRoleModalResult} className="removeButton">{props.buttonLabel}</button>{' '}
          <button  onClick={props.deleteRoleModalResult} className="cancelButton">Cancel</button>
        </ModalBody>     
      </Modal>
    </div>
  );
}

export default DeleteRole;
