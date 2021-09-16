import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';
import {connect} from "react-redux";
import TablePagination from '../Pagination/index';
import {getAllCustomer,handleRadioFilter,handleSearchFilter,handleAlphabetFilter, 
     handleAplhabetFilterBySN,getplantSku,slpitPo,substitutionPo,
     handlePurchaseOrderFilert,handleCurrentPoOrderUpdate,deleteItemPo,
     setSupplierToAddPo,handleOrderDetailsInput,addPo,getAddToOrderList,getCurrentOrder,
    getPoSupplierFilter,getPoJobDescription,getPoOrderFilter,getPoPlantProductFilter,getPoSkuFilter,getSupplierOrderFilter

} from "../../actions/purchaseOrderManagementAction";

import '../PlantManager/index.css'
import { Link } from "react-router-dom";
import Autosuggest from 'react-autosuggest';
import PurchaseOrderTable from "./purchaseOrderTable"
import ActionModal from '../Modal/ActionModal';



 const CurrentPo = (props) =>{
    const [value, onChange] = useState(new Date());
    useEffect(()=>{
        // props.getAddToOrderList()
        // props.poData.id
        props.getplantSku()
        props.getCurrentOrder(props.poData.id)
    },[])
    const handleCurrentPoUpdate=(e)=>{
        let {name,value,id} = e.target
        console.log(name,value,id)
        console.log()
        props.handleCurrentPoOrderUpdate(name,value,id)
    }
    
let {currentOrder,plantSku} = props

const handleSplitClick = (item)=>{
    let result = prompt("Enter split qty")
    console.log(result)

    if(result ){
        let splitObj = {}
        splitObj.split_qty = result
        splitObj.purpose = "sales-ready"

        props.slpitPo(splitObj,item.po_item_id)
    }
    
}
const handleDeleteClick = (item)=>{
        props.deleteItemPo(item.po_item_id)
    
    
}
const handleSubistutionClick = (item)=>{
    // let result = prompt("Enter split qty")
    // console.log(result)
    // if(result ){
        console.log(item)
        console.log(item.type,item.id,item.sku_id)
        let splitObj = {}
        splitObj.type = item.type
        splitObj.id = item.item_id
        splitObj.sku_id = item.sku_id
        console.log(splitObj)
        props.substitutionPo(splitObj,item.po_item_id)
    // }
    
}




console.log(props.state.purchaseOrderManagementData)
console.log(props.currentItems)
    return (
        <div class="bg-white px-3 py-3 mt-2">
        <form>
            <div class="row">
                <div class="col-md-8">
                    <h2>Currently on this Purchase Order</h2>
                </div>
                <div class="col-md-4 text-right">
                    <a href="#" class="btn btnGrey">
                        <span class="d-flex align-items-center text-left">
                            <img src="assets/img/addSegment-ic-btn.svg" alt=""/>
                            <span class="ml-2">Add Segment</span>
                        </span>
                    </a>
                    <a href="#" class="btn btnGrey ml-2">
                        <span class="d-flex align-items-center text-left">
                            <img src="assets/img/order-ic-btn.svg" alt=""/>
                            <span class="ml-2">Order</span>
                        </span>
                    </a>
                </div>
            </div>
            <hr/>
            <div class="row mt-3 align-items-center">
                <div class="col-md-12">
                    
                    <div class="form-group row">
                        <div class="col-md-12 table-responsive">
                            <table class="table table-striped purchaseOdrTbl" border="0" width="100%">
                                <thead>
                                    <tr>
                                        <th width="4%" class="">No</th>
                                        <th width="20%" class="">Plant Name/Original SKU</th>
                                        <th width="10%" class="text-center">Size</th>
                                        <th width="10%" class="text-center">Added</th>
                                        <th width="6%" class="text-center">Disc %</th>
                                        <th width="8%" class="text-center">Allocate</th>
                                        <th width="6%" class="text-center">QTY</th>
                                        <th width="6%" class="text-center">Royalty</th>
                                        <th width="7%" class="text-center">NVk Price</th>
                                        <th width="7%" class="text-center">Each Price</th>
                                        <th width="8%" class="text-center">Total</th>
                                        <th width="8%" class="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="12" class="p-0">
                                            <table class="table table-striped mb-0" width="100%">
                                                <tr class="movePanel">
                                                    <td colspan="12">
                                                        <div class="row">
                                                            <div class="col-md-8">
                                                                <a href="" class="mr-3">
                                                                    <i class="fas fa-expand-arrows-alt text-dark"></i>
                                                                </a>
                                                                <strong>West Wing Front Gardens</strong>
                                                            </div>
                                                            <div class="col-md-4 text-right">
                                                                <a href="#" class="">
                                                                    <img src="assets/img/close-ic-grey.svg" alt=""/>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/* Main Content Row starts here */}
                                                {props.currentItems.map((item,i)=>{
                                                    {console.log(item)}
                                                    let disc_percent =parseInt(item.disc_percent)
                                                    let eactPriceDiscount = 0
                                                    let totalDiscount=0
                                                    if(disc_percent>0) {
                                                        eactPriceDiscount =  item.disc_percent *parseInt(item.each_price)*.01
                                                        totalDiscount = item.disc_percent *parseInt(item.item_total)*.01
                                                    }
                                                    let addedDateWithFormat= `${new Date(item.added).getDate()}-${new Date(item.added).getMonth()+1}-${new Date(item.added).getFullYear()}`                                                   
                                                    return<tr class={i%2===0?"tblBgWhite":"tblBgGrey"}>
                                                  
                                                  <table class="table table-striped table-no-border" width="100%">                                                        
                                                        <tr class="topTitleRow"> 
                                                            <td>{i+1}</td>
                                                            <td  colspan="11">{item.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td width="4%"></td>
                                                            <td width="20%">
                                                                <select class="form-control plantNameSel" name="sku_id" id={item.po_item_id} onChange={handleCurrentPoUpdate} value={item.sku_id}>
                                                                {/* <select class="form-control w-80" value={item.SKU} > */}
                                                                    {item.sku_list.map(sku=>{
                                                                        return<option value={sku.sku_id}>{sku.sku_code}</option>
                                                                    })}
                                                                </select>
                                                                {/* </select> */}
                                                            </td>
                                                            <td width="10%" class="text-center">{item.size}</td>
                                                            <td width="10%" class="text-center">{addedDateWithFormat}</td>
                                                            <td width="6%" class="text-center">
                                                                <input type="text" class="form-control w-60 text-right" placeholder="" id={item.po_item_id} name="disc_percent" onChange={handleCurrentPoUpdate} value={item.disc_percent}/>
                                                            </td>
                                                            <td width="8%" class="text-center">
                                                                <select class="form-control w-80">
                                                                    <option>Sales</option>
                                                                    <option>Option 1</option>
                                                                    <option>Option 2</option>
                                                                </select>
                                                            </td>
                                                            <td width="6%" class="text-center">
                                                                <input type="text" class="form-control w-60 text-right" placeholder="" id={item.po_item_id} name="qty" onChange={handleCurrentPoUpdate} value={item.qty}/>
                                                            </td>
                                                            <td width="6%" class="text-center">{item.royality}</td>
                                                            <td width="7%" class="text-center">{item.nvk_price}</td>
                                                            <td width="7%" class="text-center">
                                                                <input type="text" class="form-control w-60 text-right mx-auto text-green" placeholder="" id={item.po_item_id} name="each_price" onChange={handleCurrentPoUpdate} value={item.each_price}/>
                                                                <div class="">
                                                                    <span class="mr-2">Disc</span>
                                                                    <span>{eactPriceDiscount}</span>
                                                                </div>
                                                            </td>
                                                            <td width="8%" class="text-center">
                                                                <span class="text-green controlLabel text-right">{item.item_total}</span>
                                                                <div class="">
                                                                    <span class="mr-2">Disc</span>
                                                                    <span>{totalDiscount}</span>
                                                                </div>
                                                            </td>
                                                            <td width="8%" class="text-center actionTd">
                                                                <div class="d-flex justify-content-center">
                                                                    <a href="#" class="">
                                                                        <img src="assets/img/copy-ic-blue.svg" alt="" />
                                                                    </a>
                                                                    <div class="dropdown actionDropdown  ml-2">
                                                                        <a href="#" class="dropdown-toggle" id="actionDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            <i class="fas fa-ellipsis-v"></i>
                                                                        </a>
                                                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="actionDropdown">
                                                                            <a href="#" class="dropdown-item splitBg" type="button" onClick={()=>{handleSplitClick(item)}}><span><img src="assets/img/split-ic.svg"/></span> Split</a>
                                                                            <a href="#" class="dropdown-item substituteBg" type="button" onClick={()=>{handleSubistutionClick(item)}} ><span><img src="assets/img/substitute-ic.svg"/></span> Substitute</a>
                                                                            <a href="#" class="dropdown-item deleteBg" type="button" onClick={()=>{handleDeleteClick(item)}}><span><img src="assets/img/delete-ic.svg"/></span> Delete</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr class="trBgWhite ">
                                                            <td width="4%"></td>
                                                            <td colspan="12"> 
                                                                {item.subsitutued_ids!=null?<img src="assets/img/enter-arrow-red.svg" alt=""/>:""}
                                                                <span class="ml-2">{item.subsitutued_ids!=null?typeof(item.subsitutued_ids)==="object"?item.subsitutued_ids.join():"":""}</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </tr>})}
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-6"></div>
                        <div class="col-md-12 col-lg-6">
                            <div class="greyBox px-3 py-3 totalSec">
                                <div class="row">
                                    <div class="col-md-8 text-right">
                                        <label >Subtotal <span>$</span></label>
                                    </div>
                                    <div class="col-md-2 text-right">
                                        <label >{currentOrder.subtotal}</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-8 text-right">
                                        <label >Discounts <span>$</span></label>
                                    </div>
                                    <div class="col-md-2 text-right">
                                        <label >{`-${currentOrder.discount}`}</label>
                                    </div>
                                </div>
                                <div class="row text-green subTotLbl">
                                    <div class="col-md-8 text-right">
                                        <label >Subtotal after Discounts <span>$</span></label>
                                    </div>
                                    <div class="col-md-2 text-right">
                                        <label >{currentOrder.total}</label>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col-md-8 d-flex justify-content-end">
                                        <label class="mb-0 d-flex align-items-center">Adjustments  <input type="text" class="form-control mx-2 wid240" placeholder="Add Notes" value={currentOrder.adjustment_notes}/> <span>$</span></label>
                                    </div>
                                    <div class="col-md-2 text-right">
                                        <input type="text" class="form-control mx-2 text-right" placeholder="" value={currentOrder.adjustment}/>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col-md-8 d-flex justify-content-end">
                                        <label class="mb-0 d-flex align-items-center">Shipping  <input type="text" class="form-control mx-2 wid240" placeholder="Add Notes" value={currentOrder.shipping_notes}/> <span>$</span></label>
                                    </div>
                                    <div class="col-md-2 text-right">
                                        <input type="text" class="form-control mx-2 text-right" placeholder="" value="0.00" value={currentOrder.shipping}/>
                                    </div>
                                </div>
                                <div class="row subTotLbl">
                                    <div class="col-md-8 text-right">
                                        <label>Order Total (CAD) W/O taxes <span>$</span></label>
                                    </div>
                                    <div class="col-md-2 text-right">
                                        <label class="f-s-24">{currentOrder.total}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    )
}


const mapStateToProps = (state)=> ({ 
 
    poData:state.purchaseOrderManagementData.poData,
    currentItems:state.purchaseOrderManagementData.currentItems,
    currentOrder:state.purchaseOrderManagementData.currentOrder,
    plantSku:state.purchaseOrderManagementData.plantSku,
    state:state

})
export default connect(mapStateToProps,{

    getAddToOrderList,slpitPo,substitutionPo,deleteItemPo,
    setSupplierToAddPo,getplantSku,handleCurrentPoOrderUpdate,
    handleOrderDetailsInput,addPo,getCurrentOrder




})(CurrentPo)


