import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';
import {connect} from "react-redux";
import TablePagination from '../Pagination/index';
import {getAllCustomer,handleRadioFilter,handleSearchFilter,handleAlphabetFilter, 
     handleAplhabetFilterBySN,
     handlePurchaseOrderFilert,updatePoNotes,
     setSupplierToAddPo,handleOrderDetailsInput,addPo,getAddToOrderList,getCurrentOrder,getOrderHistory,
    getPoSupplierFilter,getPoJobDescription,getPoOrderFilter,getPoPlantProductFilter,getPoSkuFilter,getSupplierOrderFilter

} from "../../actions/purchaseOrderManagementAction";
// import {getAddToOrderList} from "../../actions/supplierManagementAction"
// import initialDetails from './initialDetails';
// import './style.css'
import '../PlantManager/index.css'
import { Link } from "react-router-dom";
import Autosuggest from 'react-autosuggest';
import PurchaseOrderTable from "./purchaseOrderTable"
import ActionModal from '../Modal/ActionModal';



 const Notes = (props) =>{
    const [value, onChange] = useState(new Date());
    useEffect(()=>{
        // props.getOrderHistory(props.poData.poData)
    },[])

    const handleNotesChange = (e)=>{
        props.handleOrderDetailsInput("internal_notes",e.target.value)
    }
    const updateNotes = () =>{
        let obj = {}
        obj.id = props.poData.id
        obj.internal_notes = props.poData.internal_notes
        props.updatePoNotes(obj)
    }




// console.log(props.currentPOHistory)
    return (
        <div class="bg-white px-3 py-3 mt-2">
        <form>
            <h2>Internal Notes <span class="f-s-14">(Not shown to customer)</span></h2>
            <hr/>
            <div class="row">
                <div class="col-md-12">
                    <textarea cols="10" rows="8" class="form-control" onChange={handleNotesChange}>{props.poData.internal_notes}</textarea>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12 text-right">
                    <button type="button" class="btn btn-primary btn-lg ml-3" onClick={updateNotes}>SAVE</button>
                </div>
            </div>
        </form>
    </div>
    )
}


const mapStateToProps = (state)=> ({ 
 
    // currentPOHistory:state.purchaseOrderManagementData.currentPOHistory,
    poData:state.purchaseOrderManagementData.poData,
    

})
export default connect(mapStateToProps,{
    getAddToOrderList,
    setSupplierToAddPo,updatePoNotes,
    handleOrderDetailsInput,addPo,getCurrentOrder,getOrderHistory
})(Notes)


