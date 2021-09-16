import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';
import {connect} from "react-redux";
import TablePagination from '../Pagination/index';
import {getAllCustomer,handleRadioFilter,handleSearchFilter,handleAlphabetFilter, 
     handleAplhabetFilterBySN,getAddToPOCateries,
     handlePurchaseOrderFilert,serachOrderedList,handleAddAll,handleAddPoLineItem,
     setSupplierToAddPo,handleOrderDetailsInput,addPo,getAddToOrderList,handledumyQty,
    getPoSupplierFilter,getPoJobDescription,getPoOrderFilter,getPoPlantProductFilter,getPoSkuFilter,getSupplierOrderFilter

} from "../../actions/purchaseOrderManagementAction";
import 
    {
        getAllSubAttribute,  } 
        from '../../actions/attributeAction'
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
    const [valuePlant,setValuePlant] = useState("")
    const [valueSku,setValueSku] = useState("")
    const [suggestionsPlant,setPlantSuggestions] = useState([])
    const [suggestionsSku,setSkuSuggestions] = useState([])

    const [inputValuePlant, setInputValuePlant] = useState("");
    const [inputValueSku, setInputValueSku] = useState("");

    useEffect(()=>{
        props.getAddToOrderList()
        props.getAddToPOCateries()
        props.getAllSubAttribute(18)
    },[])

    const getSuggestionValuePlant = suggestion => suggestion.plant_name;
    const getSuggestionValueSku = suggestion => suggestion.sku_code;
    // const getSuggestionsPlant = suggestion => suggestion.plant_name;
    const getSuggestionsPlant = value => {
        const inputValuePlant = value.trim().toLowerCase();
        const inputLength = inputValuePlant.length;
          
            return inputLength === 0 ? [] : props.backupOrderListData.filter(lang =>
              lang.genus.toLowerCase().includes(inputValuePlant)
            );
        };
    const getSuggestionsSku = value => {
        const inputValueSku = value.trim().toLowerCase();
        const inputLength = inputValueSku.length;
            
            return inputLength === 0 ? [] : props.backupOrderListData.filter(lang =>
                lang.sku_code.toLowerCase().includes(inputValueSku)
            );
        };
    const onSuggestionsFetchRequestedPlant = ({ value }) => {
        setPlantSuggestions(getSuggestionsPlant(value));
    };
    const onSuggestionsFetchRequestedSku = ({ value }) => {
        setSkuSuggestions(getSuggestionsSku(value));
    };
    const onChangePlant = (event, { newValue }) => {
        setValuePlant(newValue)
        // setLoaderMessage("No Records Found.")
        // props.serachOrderedList({plant: newValue, option: props.plantData.plantRadioButton, category: categoryId})
        console.log(newValue)
        props.serachOrderedList(newValue,props.searchValueSku)
        setInputValuePlant(newValue);
    };
    const onChangeSku = (event, { newValue }) => {
        setValueSku(newValue)
        // setLoaderMessage("No Records Found.")
        // props.serachOrderedList({plant: newValue, option: props.plantData.plantRadioButton, category: categoryId})
        console.log(newValue)
        props.serachOrderedList(props.searchValuePlant,newValue)
        setInputValueSku(newValue);
    };
    const  onSuggestionsClearRequestedPlant = () => {
        setPlantSuggestions([]);
      };
      const  onSuggestionsClearRequestedSku = () => {
        setSkuSuggestions([]);
      };
      const renderSuggestionPlant = suggestion => (
        <span>
          {suggestion.plant_name.split("-")[0]}
        </span>
    );
    const renderSuggestionSku= suggestion => (
        <span>
          {suggestion.sku_code}
        </span>
    );

    const handleAddAllClick=()=>{
        if(props.poData.id)
        props.handleAddAll(props.orderedList,props.poData.id)
        else{
            props.handleAddAll(props.orderedList,22)
        }
    }
    const addSingleLineItem = (lineItemData)=>{
        console.log(lineItemData)
        props.handleAddPoLineItem(lineItemData,props.poData.id)
    }



console.log(props.categoryList )
const {orderedList}=props
const inputPropsPlant = {
    placeholder: '',
    value:valuePlant,
    
    // className:"searchInput",
    className:" form-control btn btn-search",
    id:"add-icon-search",
    style: {position:"relative",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:6,height:"41.5px",fontSize:"15px",textDecoration:"none"},
    onChange: onChangePlant
};
const inputPropsSku = {
    placeholder: '',
    value:valueSku,
    
    // className:"searchInput",
    className:" form-control btn btn-search",
    id:"add-icon-search",
    style: {position:"relative",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:6,height:"41.5px",fontSize:"15px",textDecoration:"none"},
    onChange: onChangeSku
};
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
                                                <div class="searchInput" style={{height: "40px"}}> 
                                                    <button type="submit" class="btn btn-search">
                                                        <img src="assets/img/search.svg" alt=""/>
                                                    </button>
                                                    {/* <input type="text" class="form-control" placeholder=""/> */}

                                                    <Autosuggest
                                                    suggestions={suggestionsPlant}
                                                    onSuggestionsFetchRequested={onSuggestionsFetchRequestedPlant}
                                                    onSuggestionsClearRequested={onSuggestionsClearRequestedPlant}
                                                    getSuggestionValue={getSuggestionValuePlant}
                                                    renderSuggestion={renderSuggestionPlant}
                                                    inputProps={inputPropsPlant}
                                                    theme={{suggestionsContainerOpen:suggestionsPlant.length>5?"yes":"no",suggestionsContainer:suggestionsPlant.length>5?"yes1":"no1",
                                                    suggestionsList:suggestionsPlant.length>5?"yes":"no1"}}
                                                />
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
                                            <div class="col-md-6 col-lg-6 searchInput" style={{height: "40px"}}> 
                                                <label>Search SKU</label>
                                                <div class="searchInput">
                                                    <button type="submit" class="btn btn-search">
                                                        <img src="assets/img/search.svg" alt=""/>
                                                    </button>
                                                    {/* <input type="text" class="form-control" placeholder=""/> */}
                                                    <Autosuggest
                                                    suggestions={suggestionsSku}
                                                    onSuggestionsFetchRequested={onSuggestionsFetchRequestedSku}
                                                    onSuggestionsClearRequested={onSuggestionsClearRequestedSku}
                                                    getSuggestionValue={getSuggestionValueSku}
                                                    renderSuggestion={renderSuggestionSku}
                                                    inputProps={inputPropsSku}
                                                    theme={{suggestionsContainerOpen:suggestionsSku.length>5?"yes":"no",suggestionsContainer:suggestionsSku.length>5?"yes1":"no1",
                                                    suggestionsList:suggestionsSku.length>5?"yes":"no1"}}
                                                />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="row mt-3 mb-4 align-items-center">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Location:</label>
                                                <select class="form-control">
                                                    <option>All</option>     
                                                    {props.addressList.map(address=>{
                                                        if(address.status === 1)
                                                        return<option value={address.id}>{address.value}</option> 
                                                    })}
                                                </select>
                                            </div>
                                            <div class="col-md-4 col-lg-4 mt-3 mt-md-0">
                                                <label>Category</label>
                                                <select class="form-control">
                                                    <option>All</option> 
                                                    {props.categoryList.map(category=>{
                                                        return<option value={category.id}>{category.name}</option>
                                                    })}    
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
                                                <table class="table table-striped table-td-valign-middle mb-0" width="550%">
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
                                                                            <a href="">{orderByGroup[0].name}</a>
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
                                                                        <td class="text-center" width="8%">{order.nvk_price}</td>
                                                                        <td class="text-center" width="7%">
                                                                            <div class="d-flex align-items-center">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" onChange={(e)=>{props.handledumyQty(order.sku_code,e.target.value)}} value={order.dumyQty}/>
                                                                                <a href="#" class="ml-2" onClick={()=>{addSingleLineItem(order)}}>
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
                                        <button type="button" class="btn btn-primary btn-lg ml-3" onClick={handleAddAllClick}>Add All</button>
                                    </div>
                                </div>
                            </form>
                        </div>
    )
}


const mapStateToProps = (state)=> ({ 
 
    orderedList:state.purchaseOrderManagementData.groupedOrderListDate,
    backupOrderListData:state.purchaseOrderManagementData.orderListDateForSuggession,
    searchValuePlant:state.purchaseOrderManagementData.searchValuePlant,
    searchValueSku:state.purchaseOrderManagementData.searchValueSku,
    poData:state.purchaseOrderManagementData.poData,
    categoryList:state.purchaseOrderManagementData.categoryList,
    addressList:state.attributeData.subAttribute

    

})
export default connect(mapStateToProps,{

    getAddToOrderList,
    setSupplierToAddPo,
    handleOrderDetailsInput,addPo,
    serachOrderedList,
    handledumyQty,
    handleAddAll,
    getAddToPOCateries,
    getAllSubAttribute,
    handleAddPoLineItem




})(AddToOrder)


