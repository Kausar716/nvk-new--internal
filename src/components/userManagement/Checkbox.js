import React from "react";

export const CheckBox = props => {
  return (
   <div>

  
   <ul class="list-unstyled" style={{pointerEvents:"none", marginTop:"1em"}}>
   <li>
    <div class="custom-control custom-checkbox" style={{marginTop:"-17px", pointerEvents:"none"}}>
      <input
        key={props.id}
        onClick={props.handleCheckChieldElement}
        type="checkbox"
        checked={props.isChecked}
        value={props.value}
      />{" "}
      {props.value}
      <span>{props.address}</span>
      {/* <label class="custom-control-label pl-2" for="customCheck1">Farm E <span>1105 HWY5, Dundas, CN</span></label> */}
    </div>
    </li>
    </ul>
    </div>
  );
};

export default CheckBox;
