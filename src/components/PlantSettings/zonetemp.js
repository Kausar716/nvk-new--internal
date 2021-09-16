import React, {useState} from 'react' ;
// import { Field, reduxForm } from 'redux-form';
// import {  Row} from 'reactstrap';


function Zones() {
   // const [name,setName] = useState("")
    const [selectedItem,setSelectedItem] = useState("")

    // const handleName = (e) => {
    //     setName(e.target.value)
    // }

    // const handleAddManufacturer = (e) => {
    //     e.preventDefault()
    //     console.log(name)
    // }
    const handleitemSelect= (e)=> {
        setSelectedItem(e.target.id)
    }
    return (
        <>
            <div className="bg-white">
                            <h4 className="p-15 mb-0">Zones</h4>
                            <hr className="m-0"/>
                            <div className="ContentSection p-15">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12">
                                        <p>Hardiness Zone</p>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-md-6 col-lg-9">  
                                                <input type="text" className="form-control" placeholder=""/>
                                            </div>
                                            <div className="col-md-6 col-lg-3">
                                                <a href="javascript;" className="d-flex align-items-center">
                                                    <i className="fa fa-plus-circle fa-2x mr-2"></i> Add New Section
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-5 mb-4">
                                    <div class="col">
                                        <div class="card zoneCard">
                                            <div class="card-header">
                                                Inactive
                                            </div>
                                            <div class="card-body cardBg">
                                               <ul class="list-unstyled">
                                                   <li class={selectedItem === "Christmas Trees"?"active":""} id="Christmas Trees" name="Christmas Trees" onClick={handleitemSelect} >
                                                        <a href="/" class="" id="Christmas Trees">
                                                            <span>Christmas Trees</span>
                                                        </a>
                                                   </li>
                                                   <li class={selectedItem === "Wheathers"?"active":""} id="Wheathers" onClick={handleitemSelect} >
                                                        <a href="/" id="Wheathers"  class="">
                                                            <span id="Wheathers">Wheathers</span>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="/" class="">
                                                            <span>Attracts Birds</span>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="/" class="">
                                                            <span>Wheathers</span>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="javascript;" class="">
                                                            <span>Attracts Birds</span>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="javascript;" class="">
                                                            <span>Wheathers</span>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="javascript;" class="">
                                                            <span>Attracts Birds</span>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="javascript;" class="">
                                                            <span>Wheathers</span>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="javascript;" class="">
                                                            <span>Attracts Birds</span>
                                                        </a>
                                                   </li>
                                               </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-1">
                                        <div className="midControls d-flex flex-column justify-content-around">
                                            <div>
                                                <a href="javascript;">
                                                    {/* <i className="fas fa-angle-double-right"></i> */}
                                                    <img style={{width:"5em"}} src="./assets/img/Genral_Icons/DragDragtoplace-move.svg" alt="Settings"/>
                                                </a>
                                            </div>
                                            <div>
                                                <a href="javascript;">
                                                    {/* <i className="fas fa-arrows-alt"></i> */}
                                                    <img style={{width:"5em"}} src="./assets/img/Genral_Icons/DragDragto_place.svg" alt="Settings"/>
                                                </a>
                                            </div>
                                            <div>
                                                <a href="javascript;" className="icDelete">
                                                <img style={{width:"5em"}} src="./assets/img/Genral_Icons/Drag _Drop_remove_red.svg" alt="Settings"/>
                                                    {/* <i className="fas fa-trash"></i> */}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card zoneCard">
                                            <div class="card-header">
                                                Active
                                            </div>
                                            <div class="card-body cardBg">
                                            <ul class="list-unstyled">
                                                   <li class="active">
                                                        <a href="javascript;" class="">
                                                            <span>Broadleaf Evergrens</span>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="javascript;" class="">
                                                            <span>Bulbs</span>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="javascript;" class="">
                                                            <span>Evergreens</span>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="javascript;" class="">
                                                            <span>Frems</span>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="javascript;" class="">
                                                            <span>Fruits</span>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="javascript;" class="">
                                                            <span>Grasses</span>
                                                        </a>
                                                   </li>
                                               </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
        </>
    )
}

export default Zones
