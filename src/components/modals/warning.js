import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label ,Input} from 'reactstrap';
import './userManagementModals/modal.css'
const CreateRole = (props) => {
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
          {/* <Label>{props.message2}</Label> */}
          <Input type="text" value={props.textValue} onChange={props.handleModelText}/>
          <button onClick={props.createRoleModalResult} className="removeButton">{"ok"}</button>{' '}
          {/* <button  onClick={props.createRoleModalResult} className="cancelButton">Cancel</button> */}
        </ModalBody>     
      </Modal>
    </div>
  );
}

export default CreateRole;
