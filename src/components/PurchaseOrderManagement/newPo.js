import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';
import {connect} from "react-redux";
import TablePagination from '../Pagination/index';
import {getAllCustomer,handleRadioFilter,handleSearchFilter,handleAlphabetFilter, 
     handleAplhabetFilterBySN,updatePo,
     handlePurchaseOrderFilert,getUnitList,getDeliveryAddress,
     setSupplierToAddPo,handleOrderDetailsInput,addPo,getCurrencyList,getSupplierDeliveryList,
    getPoSupplierFilter,getPoJobDescription,getPoOrderFilter,getPoPlantProductFilter,getPoSkuFilter,getSupplierOrderFilter

} from "../../actions/purchaseOrderManagementAction";
import {getAllPlantAction,serachPlant} from '../../actions/plantManagerAction'
import {getAllSuppliers} from "../../actions/supplierManagementAction"
// import initialDetails from './initialDetails';
// import './style.css'
import '../PlantManager/index.css'
import { Link } from "react-router-dom";
import Autosuggest from 'react-autosuggest';
import PurchaseOrderTable from "./purchaseOrderTable"
import ActionModal from '../Modal/ActionModal';



 const OrderDetails = (props) =>{
    const [value, onChange] = useState(new Date());
    useEffect(()=>{
        props.getAllSuppliers()
        props.getUnitList()
        props.getCurrencyList()
        props.getDeliveryAddress()
    },[])

    const handleCalendarChangeLastDate=(timestamp)=>{
        console.log(timestamp)
        console.log(new Date(timestamp))
        let latest_date = `${new Date(timestamp).getDate()}-${new Date(timestamp).getMonth()+1}-${new Date(timestamp).getFullYear()}`
        console.log(latest_date)
        console.log(new Date(latest_date))
        props.handleOrderDetailsInput("latest_date",latest_date)
    }
    const handleCalendarChangeRequestDate=(timestamp)=>{
        console.log(timestamp)
        console.log(new Date(timestamp))
        let requested_date = `${new Date(timestamp).getDate()}-${new Date(timestamp).getMonth()+1}-${new Date(timestamp).getFullYear()}`
        console.log(requested_date)
        console.log(new Date(requested_date))
        props.handleOrderDetailsInput("requested_date",requested_date)
    }
    const handleSupplierDropDown = (e)=>{
        console.log(e.target.value)
        let selectedSupplier = supplierList.filter(supplier=>supplier.id===JSON.parse(e.target.value))
        console.log(selectedSupplier)
        props.getSupplierDeliveryList(selectedSupplier[0].id)
        props.setSupplierToAddPo(selectedSupplier[0])
    }
    const handleInputData = (e) => {
        console.log(e.target.id)
        console.log(e.target.value)
        let {id,value}=e.target
        if(id=== "overall"|| id === "individual"){
            props.handleOrderDetailsInput("discount_type",id==="overall"?"0":"1" )
        }
        else if(id==="royalty"){
            let val=0
            val =(poData.royalty === "0"||poData.royalty===null)?"1":"0"
            console.log(poData)
            console.log(val)
            props.handleOrderDetailsInput("royalty",val)
        }
        else if(id==="dispatch_type"){
            props.handleOrderDetailsInput("dispatch_type",e.target.value)
        }
        else
        props.handleOrderDetailsInput(id,value)
    }
    const handleButtonClick = ()=>{
        console.log(props.poData)
        if(props.pageToOpen === "add"){
            props.addPo(props.poData)
        }
        else {
            props.updatePo(props.poData)
        }
       
    }
    const supplierList = props.supplierData
    const{poData,unitList,currencyList,supplierDeliveryList,deliveryAddress}= props
    const dispatchTypeList =["Incoming Delivery","Pickup","Delivery & Pickup"]
    // const latest_date_format = new Date(props.poData.latest_date)





let lastDateForCalendar = new Date()
let requestDateForCalendar = new Date()
if(poData.latest_date)
lastDateForCalendar = new Date(`${poData.latest_date.split("-")[1]}-${poData.latest_date.split("-")[0]}-${poData.latest_date.split("-")[2]}`)
if(poData.requested_date)
requestDateForCalendar = new Date(`${poData.requested_date.split("-")[1]}-${poData.requested_date.split("-")[0]}-${poData.requested_date.split("-")[2]}`)

console.log(new Date(poData.latest_date))
console.log(new Date(poData.requested_date))
console.log(poData)
    console.log(props.selectedSupplier)
    return (
        <div class="bg-white px-3 py-3">
             {/* <ActionModal cancel={cancel} confirm={confirm} open={open} message={message}/> */}
        <form>
            <h2>Purchase Order Details</h2>
            <hr/>
           {props.selectedSupplier? <div class="px-3 py-3 bg-grey-transparent-2">
                <div class="row ">
                    <div class="col-md-6 col-lg-6">
                        <h4>{props.selectedSupplier.supplier_name?props.selectedSupplier.supplier_name:props.selectedSupplier}</h4>
                        <div>
                            <div>
                                <b class="mr-3">Type:</b>
                                <span class="textGrey">Finished Plants, Liners</span>
                            </div>
                            <div>
                                <b class="mr-3">Tax Exempt:</b>
                                <span class="textGrey">No</span>
                            </div>
                            <div>
                                <b class="mr-3">Terms:</b>
                                <span class="textGrey">Net 30</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 text-md-right mt-3 mt-md-0">
                        <h4>Ordered By</h4>
                        <div>
                            <div><span class="textGrey">B. Vanderkruk</span></div>
                            <div><span class="textGrey">brent@nvknuseries.com</span></div>
                        </div>
                    </div>
                </div>
                
            </div>:<div class="col-md-6 col-lg-4 mt-2 mt-md-0">
                            <label>Supplier</label>
                            <select class="form-control" value={props.selectedSupplier} onChange={handleSupplierDropDown}>
                                <option value={null}>Select</option>
                                {supplierList.map(supplier=>{
                                    return <option value={supplier.id}>{supplier.supplier_name}</option>
                                })}
                            </select>
                        </div>}

                        {props.selectedSupplier?<>                    
            <div class="row mt-3">
                <div class="col-md-12 col-lg-6 col-xl-8">
                    <div class="row mt-3">
                        <div class="col-md-12 col-lg-12">
                            <label>Discount</label>
                            <div class="row align-items-center">
                                <div class="col-md-4 col-lg-2">
                                    <input type="text" class="form-control text-right" placeholder="" id="discount" value={poData.discount} onChange={handleInputData}></input>
                                </div>
                                <div class="col-md-6 col-lg-4 d-flex mt-3 mt-md-0">
                                    <div class="custom-control custom-radio">
                                        <input type="radio" id="overall" name="overall" class="custom-control-input" onClick={handleInputData} checked={(poData.discount_type==="0"||poData.discount_type===0)?true:false} />
                                        <label class="custom-control-label" for="overall">Overall</label>
                                    </div>
                                    <div class="custom-control custom-radio ml-3">
                                        <input type="radio" id="individual" name="individual" class="custom-control-input" onClick={handleInputData} checked={(poData.discount_type==="1"||poData.discount_type===1)?true:false} />
                                        <label class="custom-control-label" for="individual">Individual</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-lg-6  col-xl-4">
                    <div class="row mt-3">
                        <div class="col-md-6 col-lg-6">
                            <label class="mr-2 mr-md-0">Requested Date</label>
                            <DatePicker onChange={handleCalendarChangeRequestDate} format='dd/MM/yyyy' id={"requested_date"} value={requestDateForCalendar}  />
                        </div>
                        <div class="col-md-6 col-lg-6 mt-3 mt-md-0">
                            <label class="mr-2 mr-md-0">Latest Date</label>
                            <DatePicker onChange={handleCalendarChangeLastDate} value={lastDateForCalendar} format='dd/MM/yyyy' id={"latest_date"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12 col-lg-8">
                    <div class="row mt-3">
                        <div class="col-md-6 col-lg-4">
                            <label>Dispatch Type</label>
                            {/* <input type="text" class="form-control" placeholder="Pickup" id="dispatch_type" value={poData.dispatch_type} onChange={handleInputData}></input> */}
                            
                            <select class="form-control" value={props.dispatch_type} id="dispatch_type" onChange={handleInputData} value={poData.dispatch_type}>
                                <option value={null}>Select</option>
                                {dispatchTypeList.map(dispatchType=>{
                                    return <option value={dispatchType}>{dispatchType}</option>
                                })}
                            </select>
                        </div>
                        <div class="col-md-6 col-lg-4 mt-2 mt-md-0">
                            <label>Currency</label>
                            <select class="form-control" id="currency" value={poData.currency} onChange={handleInputData}>
                            <option value={null}>Select</option>
                                {currencyList.map(currency=>{
                                    console.log(currency)
                                    return <option value={currency.currency_code}>{currency.currency_name}</option>
                                })}
                            </select>
                        </div>
                        <div class="col-md-6 col-lg-4 mt-2 mt-md-0">
                            <label>Units</label>
                            <select class="form-control" id="units" value={poData.units} onChange={handleInputData}>
                                <option value={null} >Select</option>
                                {unitList.map(unit=>{
                                    return <option value={unit.unit_name}>{unit.unit_name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-lg-4">
                    <div class="row mt-3">
                        <div class="col-md-6 col-lg-6">
                            <label>Supplier Order# </label>
                            <input type="text" class="form-control" placeholder="" id="supplier_order" value={poData.supplier_order} onChange={handleInputData}></input>
                        </div>
                        <div class="col-md-6 col-lg-6 mt-3 mt-md-0">
                            <label>Include Royalty</label>
                            <div class="d-flex align-items-center flex-wrap ml-2 mt-2">Off
                                <div class="switcher switcher-sm ml-2 pr-2">
                                    <input type="checkbox" name="switcher_checkbox_date"  checked={(props.poData.royalty==="1"||props.poData.royalty===1)?true:false} id="royalty" onClick={handleInputData}/>
                                    <label for="royalty"></label>
                                </div> On
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3 align-items-center">
                <div class="col-md-6 col-lg-6">
                    <label>Deliver To:</label>
                    <select class="form-control" id="deliver_to" onChange={handleInputData} value={poData.deliver_to} >
                        <option value={null}>Select</option>
                        {deliveryAddress.map(deliveryLocation=>{
                                    return <option value={deliveryLocation.id}>{deliveryLocation.delivery_to}</option>
                                })}
                    </select>
                </div>
                <div class="col-md-6 col-lg-6 mt-3 mt-md-0">
                    <label>Job Description</label>
                    <input type="text" class="form-control" placeholder="" id="job_description" value={poData.job_description} onChange={handleInputData}></input>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12 col-lg-12 mt-2 mt-md-0">
                    <label>Customer Notes <small class="textGrey">(Internal Only)</small></label>
                    <textarea cols="4" rows="3" class="form-control" id="order_notes" value={poData.order_notes} onChange={handleInputData}></textarea>
                </div>
            </div>
            <div class="row mt-3">
                                    <div class="col-md-12 text-md-right">
            <button type="button" class="btn btn-primary btn-lg ml-3" style={{cursor:"pointer"}} onClick={handleButtonClick}>{props.pageToOpen=== "add"?"Add":"Update"} </button>
                                </div>
                                </div>
                                </>:""}
        </form>
    </div>
    )
}


const mapStateToProps = (state)=> ({ 
    selectedSupplier:state.purchaseOrderManagementData.selectedSupplier,
    pageToOpen:state.purchaseOrderManagementData.pageToOpen,
    supplierData:state.supplierData.supplierList,
    poData:state.purchaseOrderManagementData.poData,
    unitList:state.purchaseOrderManagementData.unitList,
    currencyList:state.purchaseOrderManagementData.currencyList,    
    deliveryAddress:state.purchaseOrderManagementData.deliveryAddress

    
    

})
export default connect(mapStateToProps,{

    getAllSuppliers,getDeliveryAddress,
    setSupplierToAddPo,getUnitList,getSupplierDeliveryList,
    handleOrderDetailsInput,addPo,getCurrencyList,updatePo




})(OrderDetails)


