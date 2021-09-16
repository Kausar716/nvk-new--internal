import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';
import {connect} from "react-redux";
import TablePagination from '../Pagination/index';
import {getAllCustomer,handleRadioFilter,handleSearchFilter,handleAlphabetFilter, 
     handleAplhabetFilterBySN,
     handlePurchaseOrderFilert,
     setSupplierToAddPo,handleOrderDetailsInput,addPo,getAddToOrderList,
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



 const AddToOrder = (props) =>{
    const [value, onChange] = useState(new Date());
    useEffect(()=>{
        props.getAddToOrderList()
    },[])







console.log(props.orderedList)
const {orderedList}=props
    return (
<div class="bg-white px-3 py-3 mt-2">
                            <form>
                                <h2>Add to this  Order</h2>
                                <hr/>
                                <div class="row mt-3 align-items-center">
                                    <div class="col-md-12">
                                        <div class="row form-group">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Search</label>
                                                <div class="searchInput">
                                                    <button type="submit" class="btn btn-search">
                                                        <img src="assets/img/search.svg" alt=""/>
                                                    </button>
                                                    <input type="text" class="form-control" placeholder=""/>
                                                </div>
                                                <div class="row mt-3 align-items-center">
                                                    <div class="col-md-12 d-flex">
                                                        <div class="custom-control custom-radio">
                                                            <input type="radio" id="customRadio1" name="customRadio" checked="checked" class="custom-control-input" />
                                                            <label class="custom-control-label" for="customRadio1">Active Only</label>
                                                        </div>
                                                        <div class="custom-control custom-radio ml-3">
                                                            <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" />
                                                            <label class="custom-control-label" for="customRadio2">Both Active and Inactive</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-lg-6">
                                                <label>Search SKU</label>
                                                <div class="searchInput">
                                                    <button type="submit" class="btn btn-search">
                                                        <img src="assets/img/search.svg" alt=""/>
                                                    </button>
                                                    <input type="text" class="form-control" placeholder=""/>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="row mt-3 mb-4 align-items-center">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Location:</label>
                                                <select class="form-control">
                                                    <option>All</option>     
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select>
                                            </div>
                                            <div class="col-md-4 col-lg-4 mt-3 mt-md-0">
                                                <label>Category</label>
                                                <select class="form-control">
                                                    <option>All</option>     
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select>
                                            </div>
                                            <div class="col-md-2 col-lg-2 pt-md-4">
                                                <a href="javascript:;">Reset</a>
                                            </div>
                                        </div>
                                        <div class="row mt-3 mb-4">
                                            <div class="col-md-12 col-lg-12 text-center">
                                                <button type="button" class="btn btn-primary btnLarge">View top 10 Ordered from this Supplier</button>
                                            </div>
                                        </div>
                                        <div class="row mt-4 mb-4">
                                            <div class="col-md-12 col-lg-12 sortingCtrls d-flex flex-wrap align-items-center">
                                            <span class="mr-3">Show Future Values:</span>
                                                <a href="" class="active">No End Date</a>
                                                <a href="">Next 30 Days</a>
                                                <a href="">Next 90 Days</a>
                                                <a href="">Next 180 Days</a>
                                            </div>
                                        </div>
                                        
                                        <div class="form-group row">
                                            <div class="col-md-12 table-responsive">
                                                <table class="table table-striped table-td-valign-middle mb-0" width="100%">
                                                    <thead>
                                                        <tr>
                                                            <th width="15%" class="">SKU</th>
                                                            <th width="16%" class="text-center">Size</th>
                                                            <th width="8%" class="text-center">On Hand</th>
                                                            <th width="8%" class="text-center">Customer Orders</th>
                                                            <th width="7%" class="text-center">Current Available</th>
                                                            <th width="8%" class="text-center">On Quotes</th>
                                                            <th width="8%" class="text-center">Open P.O.s</th>
                                                            <th width="7%" class="text-center">Future Available</th>
                                                            <th width="8%" class="text-center">Royalty</th>
                                                            <th width="8%" class="text-center">NVK Price</th>
                                                            <th width="7%" class="text-center">Qty</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                       { orderedList.map(orderByGroup=>{
                                                           
                                                        return<tr>
                                                            <td colspan="11" class="p-0">
                                                                <table class="table table-striped tableOuterBdr" width="100%">
                                                                    <tr class="tblLinks">
                                                                        <td colspan="11">
                                                                            <a href="">{orderByGroup[0].genus}</a>
                                                                        </td>
                                                                    </tr>
                                                                    {orderByGroup.map((order,i)=>{
                                                                    return<tr class={i%2===0?"even":"odd"}>
                                                                        <td >
                                                                            <a href="">{order.sku_code}</a>
                                                                        </td>
                                                                        <td class="text-center" width="16%">{order.size}</td>
                                                                        <td class="text-center" width="8%">{order.on_hand}</td>
                                                                        <td class="text-center" width="8%">{order.customer_orders}</td>
                                                                        <td class="text-center" width="7%"><b class="f-s-20">{order.current_available}</b></td>
                                                                        <td class="text-center" width="8%">{order.on_quotes}</td>
                                                                        <td class="text-center" width="8%">{order.open_pos}</td>
                                                                        <td class="text-center" width="7%"><b class="f-s-20">{order.future_available}</b></td>
                                                                        <td class="text-center" width="8%">{order.royality}</td>
                                                                        <td class="text-center" width="8%">{order.each_price}</td>
                                                                        <td class="text-center" width="7%">
                                                                            <div class="d-flex align-items-center">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="20"/>
                                                                                <a href="" class="ml-2">
                                                                                    <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>})}
                                                                    {/* <tr class="even">
                                                                        <td>
                                                                            <a href="">393-TF-1259-1G</a>
                                                                        </td>
                                                                        <td class="text-center">150CM 15 gal</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center">23</td>
                                                                        <td class="text-center"><b class="f-s-20">27</b></td>
                                                                        <td class="text-center">13</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center"><b class="f-s-20">125</b></td>
                                                                        <td class="text-center">0.25</td>
                                                                        <td class="text-center">2.75</td>
                                                                        <td class="text-center">
                                                                            <div class="d-flex align-items-center">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="20"/>
                                                                                <a href="" class="ml-2">
                                                                                    <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr> */}
                                                                    {/* <tr class="odd">
                                                                        <td>
                                                                            <a href="">393-TF-1259-1G</a>
                                                                        </td>
                                                                        <td class="text-center">150CM 15 gal</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center">23</td>
                                                                        <td class="text-center"><b class="f-s-20">27</b></td>
                                                                        <td class="text-center">13</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center"><b class="f-s-20">125</b></td>
                                                                        <td class="text-center">0.25</td>
                                                                        <td class="text-center">2.75</td>
                                                                        <td class="text-center">
                                                                            <div class="d-flex align-items-center">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="20"/>
                                                                                <a href="" class="ml-2">
                                                                                    <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr> */}
                                                                </table>
                                                            </td>
                                                        </tr>
                                                       })
                                                        }
                                                        {/* <tr class="border-0">
                                                            <td colspan="11" class="p-0">
                                                                <table class="table table-striped tableOuterBdr mb-0" width="100%">
                                                                    <tr class="tblLinks">
                                                                        <td colspan="11">
                                                                            <a href="">Abeliophyllum (White Forsythia)</a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr class="odd">
                                                                        <td width="15%">
                                                                            <a href="">393-TF-1259-1G</a>
                                                                        </td>
                                                                        <td class="text-center" width="16%">150CM 15 gal</td>
                                                                        <td class="text-center" width="8%">50</td>
                                                                        <td class="text-center" width="8%">23</td>
                                                                        <td class="text-center" width="7%"><b class="f-s-20">27</b></td>
                                                                        <td class="text-center" width="8%">13</td>
                                                                        <td class="text-center" width="8%">50</td>
                                                                        <td class="text-center" width="7%"><b class="f-s-20">125</b></td>
                                                                        <td class="text-center" width="8%">0.25</td>
                                                                        <td class="text-center" width="8%">2.75</td>
                                                                        <td class="text-center" width="7%">
                                                                            <div class="d-flex align-items-center">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="20"/>
                                                                                <a href="" class="ml-2">
                                                                                    <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr class="even">
                                                                        <td>
                                                                            <a href="">393-TF-1259-1G</a>
                                                                        </td>
                                                                        <td class="text-center">150CM 15 gal</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center">23</td>
                                                                        <td class="text-center"><b class="f-s-20">27</b></td>
                                                                        <td class="text-center">13</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center"><b class="f-s-20">125</b></td>
                                                                        <td class="text-center">0.25</td>
                                                                        <td class="text-center">2.75</td>
                                                                        <td class="text-center">
                                                                            <div class="d-flex align-items-center">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="20"/>
                                                                                <a href="" class="ml-2">
                                                                                    <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr class="odd">
                                                                        <td>
                                                                            <a href="">393-TF-1259-1G</a>
                                                                        </td>
                                                                        <td class="text-center">150CM 15 gal</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center">23</td>
                                                                        <td class="text-center"><b class="f-s-20">27</b></td>
                                                                        <td class="text-center">13</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center"><b class="f-s-20">125</b></td>
                                                                        <td class="text-center">0.25</td>
                                                                        <td class="text-center">2.75</td>
                                                                        <td class="text-center">
                                                                            <div class="d-flex align-items-center">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="20"/>
                                                                                <a href="" class="ml-2">
                                                                                    <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr> */}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 text-right">
                                        <button type="button" class="btn btn-primary btn-lg ml-3">Add All</button>
                                    </div>
                                </div>
                            </form>
                        </div>
    )
}


const mapStateToProps = (state)=> ({ 
 
    orderedList:state.purchaseOrderManagementData.groupedOrderListDate
    

})
export default connect(mapStateToProps,{

    getAddToOrderList,
    setSupplierToAddPo,
    handleOrderDetailsInput,addPo




})(AddToOrder)


