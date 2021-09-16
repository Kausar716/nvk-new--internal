import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';
import {connect} from "react-redux";
import TablePagination from '../Pagination/index';
import {getAllCustomer,handleRadioFilter,handleSearchFilter,handleAlphabetFilter, 
     handleAplhabetFilterBySN,
     handlePurchaseOrderFilert,
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



 const OrderHistory = (props) =>{
    const [value, onChange] = useState(new Date());
    useEffect(()=>{
        console.log(props.poData)
        props.getOrderHistory(props.poData.id)
    },[])






console.log(props.currentPOHistory)
    return (
        <div class="bg-white px-3 py-3 mt-2">
                            <form>
                                <h2>Sales Order History</h2>
                                <hr/>
                                <div class="row">
                                    <div class="col-md-12 table-responsive">
                                        <table class="table table-striped table-td-valign-middle" width="100%">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Action</th>
                                                    <th class="text-center">Source</th>
                                                    <th class="text-center">Item</th>
                                                    <th class="text-center">Timestamp</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.currentPOHistory.length>1?props.currentPOHistory.map(po=>{
                                                    let timestamp=new Date(po.updated_at)
                                                    let time = `${timestamp.getDate()}-${timestamp.getMonth()}-${timestamp.getFullYear()}-${timestamp.getMinutes().length>1?"0"+timestamp.getMinutes():timestamp.getMinutes()}`
                                                    return <tr>
                                                    <td class="text-center">{po.action}</td>
                                                    <td class="text-center">{po.source}</td>
                                                    <td class="text-center">{po.item}</td>
                                                    <td class="text-center">{po.updated_at}</td>
                                                </tr>
                                                }):
                                                // let timestamp=new Date(po.updated_at)
                                                //     let time = `${timestamp.getDate()}-${timestamp.getMonth()}-${timestamp.getFullYear()}-${timestamp.getMinutes().length>1?"0"+timestamp.getMinutes():timestamp.getMinutes()}`
                                                     <tr>
                                                    <td class="text-center">{props.currentPOHistory.action}</td>
                                                    <td class="text-center">{props.currentPOHistory.source}</td>
                                                    <td class="text-center">{props.currentPOHistory.item}</td>
                                                    <td class="text-center">{"-"}</td>
                                                </tr>
                                                }
                                                {/* <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr> */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </form>
                        </div>
    )
}


const mapStateToProps = (state)=> ({ 
 
    currentPOHistory:state.purchaseOrderManagementData.currentPOHistory,
    poData:state.purchaseOrderManagementData.poData,
    

})
export default connect(mapStateToProps,{

    getAddToOrderList,
    setSupplierToAddPo,
    handleOrderDetailsInput,addPo,getCurrentOrder,getOrderHistory




})(OrderHistory)


