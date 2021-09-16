import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';
import OrderDetails from './newPo'
import {connect} from "react-redux";
import CurrentPo from "./currentPO"
import AddToOrder from "./addToOrder"
import OrderHistory from './orderHistory'
import Notes from './internalNotes'
import{deletePo,duplicatePo
} from "../../actions/purchaseOrderManagementAction";



 const PurchaseOrderDetails =(props)=> {
    const [value, onChange] = useState(new Date());
    console.log(props.pageToOpen)
    let index=0
    const handlePoDelete = ()=>{
        console.log(props.poData)
        let poToBeDeleted = props.poData.id
        props.deletePo(poToBeDeleted)
    }
    const handlePoDuplicate = ()=>{
        let poToBeDuplicated = props.poData.id
        props.duplicatePo(poToBeDuplicated)
    }
    
    return (
        <div>
            <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center">
				<h1 class="page-header mb-0 d-flex flex-wrap align-items-center">
                    <img src="assets/img/PurchaseOrders-ic-lg-green.svg" alt="" class="mr-2"/>{props.pageToOpen ==="add"?"Add":"Edit"} Purchase Orders
                    {props.poData.po_number?<span class="text-green ml-3">{props.poData.po_number}</span>:""}</h1>
				{props.pageToOpen !=="add"?<div class="topbarCtrls mt-3 mt-md-0">
                    <a href="#" class="btn"> 
                        <span class="d-flex align-items-center text-left">
                            <img src="assets/img/email-ic-btn.svg" alt=""/>
                            <span class="ml-2"><b>Email</b></span>
                        </span>
                    </a>
                    <a href="#" class="btn ml-2">
                        <span class="d-flex align-items-center text-left">
                            <img src="assets/img/search-ic-btn.svg" alt=""/>
                            <span class="ml-2"><b>Preview</b></span>
                        </span>
                    </a>
                    <a href="#" class="btn ml-2 mt-3 mt-md-0">
                        <span class="d-flex align-items-center text-left"><img src="assets/img/print-ic-btn.svg" alt=""/><span class="ml-2"><b>Print</b></span></span>
                    </a>
                </div>:""}
			</div>
          

            <div class="px-md-3 mt-3">
                <div class="px-3 py-3 mb-3 bg-white cardShadow">
                    <div class="row align-items-center editPurchaseHead">
                        <div class="col-md-6 d-flex align-items-center">
                            <h2 class="mb-0">Draft</h2>
                            <div class="d-flex align-items-center ml-3 mb-0 bdrLeft">
                                <div class="d-flex align-items-center ml-3">
                                    <img src="assets/img/date-ic-sm-green.svg" alt=""/>
                                    <span class="ml-2">{`${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getDate()}, ${new Date().getFullYear()}`}</span>
                                    
                                </div>
                                <div class="ml-5 d-flex align-items-center">
                                    <img src="assets/img/price-ic-sm-green.svg" alt=""/>
                                    <span class="ml-2">CA <b class="f-s-22 lh22">$0.00</b></span>
                                </div>
                            </div>
                        </div>
                        {props.pageToOpen !=="add"? <div class="col-md-6 d-flex justify-content-md-end">
                            <a href="#" class="mx-2"><img src="assets/img/copy-ic.svg" alt="" onClick={handlePoDuplicate}/></a>
                            <a href="#" class="mx-2"><img src="assets/img/trash-ic.svg" alt="" onClick={handlePoDelete}/></a>
                        </div>:""}
                    </div>
                </div>

                <div class="">
                <Tabs >
                    <TabList>
                        <Tab in>Order Details</Tab>
                        <Tab disabled={props.pageToOpen === "add"} >Add to Order</Tab>
                        <Tab disabled={props.pageToOpen === "add"}>Current P.O
                             {/* <span class="badge badge-pill badge-success">25</span> */}
                             </Tab>
                        <Tab disabled={props.pageToOpen === "add"}>Order History</Tab>
                        <Tab disabled={props.pageToOpen === "add"}>Notes</Tab>    
                    </TabList>
                    <TabPanel >
                        <OrderDetails/>
                    </TabPanel>
                    <TabPanel >
                        <AddToOrder/>
                    </TabPanel>
                    <TabPanel>
                     <CurrentPo/>
                    </TabPanel>
                    <TabPanel>
                        <OrderHistory/>
                        
                    </TabPanel>
                    <TabPanel>
                   <Notes/>
                    </TabPanel>
                </Tabs>
                </div>                
            </div>
        </div>
    )
}
const mapStateToProps = (state)=> ({ 
    selectedSupplier:state.purchaseOrderManagementData.selectedSupplier,
    pageToOpen:state.purchaseOrderManagementData.pageToOpen,
    poData:state.purchaseOrderManagementData.poData,
    

})
export default connect(mapStateToProps,{
    deletePo,
    duplicatePo




})(PurchaseOrderDetails)