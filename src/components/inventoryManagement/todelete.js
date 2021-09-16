/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {connect} from "react-redux";
import {getLocationList,getCategoryList,getPlantList,getFilterResult} from "../../actions/inventoryManagementAction";
import {getAllSupplierAction} from "../../actions/supplierManagementAction";

import ActionModal from '../Modal/ActionModal' 

export class PlantInventory extends Component {  
    constructor(){
        super()
        this.state={
            selectedLocationId:"",
            selecredCategoryID:"",
            selectedSupplierId:"",
            plantSearchName:"",
            skuSearchName:"",
            plantRadio:"All",
            skuRadio:"All"
        }
    }
    componentDidMount(){
        this.props.getLocationList()   
        this.props.getCategoryList()
        this.props.getAllSupplierAction()
        this.props.getPlantList()
        
    }
     handleCategoryChange = () => {

    }
    handlePlantSearch = (e) =>{
        this.props.handleInput(e.target.name,e.target.value)
    }
    handleFilterChange = (e)=>{
        let {name,value} = e.target
        let {selectedLocationId,selecredCategoryID,selectedSupplierId,plantSearchName,skuSearchName,plantRadio,skuRadio} = this.state
        if(name==="location"){
            this.setState({selectedLocationId:value})
            this.props.getFilterResult({
                selectedLocationId:value,
                selecredCategoryID,
                selectedSupplierId,
                plantSearchName,
                skuSearchName,
                plantRadio,
                skuRadio
            })
        }
        if(name === "category"){
            this.setState({selecredCategoryID:value})
            this.props.getFilterResult({
                selectedLocationId,
                selecredCategoryID:value,
                selectedSupplierId,
                plantSearchName,
                skuSearchName,
                plantRadio,
                skuRadio
            })
        }
        if(name === "supplier"){
            this.setState({selectedSupplierId:value})
            this.props.getFilterResult({
                selectedLocationId,
                selecredCategoryID,
                selectedSupplierId:value,
                plantSearchName,
                skuSearchName,
                plantRadio,
                skuRadio
            })
        }
        if(name=== "plantSearch"){
            this.setState({plantSearchName:value})
            this.props.getFilterResult({
                selectedLocationId,
                selecredCategoryID,
                selectedSupplierId,
                plantSearchName:value,
                skuSearchName,
                plantRadio,
                skuRadio
            })
        }
        if(name === "skuSearch"){
            this.setState({skuSearchName:value})
            this.props.getFilterResult({
                selectedLocationId,
                selecredCategoryID,
                selectedSupplierId,
                plantSearchName,
                skuSearchName:value,
                plantRadio,
                skuRadio
            })
        }       
    }
         
  
    render() {
        let plantCategoryList =[]
        let locationList = []
        let supplierList = []
        if(this.props.plantCategoryList)
        if(this.props.plantCategoryList.active){
            plantCategoryList = [...this.props.plantCategoryList.active,...this.props.plantCategoryList.inactive]
        }
        if(this.props.locationList)
        if(this.props.locationList.active){
            locationList = [...this.props.locationList.active,...this.props.locationList.inactive]
        }
        if(this.props.supplierList){
            if(this.props.supplierList && this.props.supplierList.data)
            supplierList = this.props.supplierList.data.active
        }
        console.log(this.props.plantInventoryData)
        let PlantListForTable = this.props.plantInventoryData
    
    return (
        <>
        <div class="row mt-3">
    <div class="col-md-6 col-lg-4">
        <label>Location</label>
        <select class="form-control" name="location" onChange={this.handleFilterChange}>
            <option>All</option>
            {locationList.map(category=>{
            return  <option value={category.id}>{category.address}</option>
            })}
        </select>
    </div>
    <div class="col-md-6 col-lg-4 mt-2 mt-md-0">
        <label>Category</label>
        <select class="form-control" name="category" onChange={this.handleFilterChange}>
            <option>All</option>
            {plantCategoryList.map(category=>{
            return  <option value={category.id}>{category.name}</option>
            })}
        </select>
    </div>
    <div class="col-md-6 col-lg-4 mt-2 mt-md-0">
        <label>Supplier</label>
        <select class="form-control" name="supplier" onChange={this.handleFilterChange}>
            <option>All</option>
            {supplierList.map(category=>{
            return  <option value={category.id}>{category.supplier_name}</option>
            })}
        </select>
    </div>
</div>
<div class="row mt-3 align-items-center">
    <div class="col-md-6 col-lg-6">
        <label>Plant Search</label>
        <div class="searchInput">
            <button type="submit" class="btn btn-search">
                <img src="assets/img/search.svg" alt=""/>
            </button>
            <input type="text" class="form-control" placeholder="Search" name="plantSearch" onChange={this.handleFilterChange}/>
        </div>
        <div class="form-group row mt-2">
            <div class="col-md-12">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="radio_default_inline" id="activePlants" value=""/>
                    <label class="form-check-label" for="activePlants">Active Plants</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="radio_default_inline" id="allPlants" value=""/>
                    <label class="form-check-label" for="allPlants">All Plants</label>
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
            <input type="text" class="form-control" placeholder="Search" name="skuSearch" onChange={this.handleFilterChange}/>
        </div>
        <div class="form-group row mt-2">
            <div class="col-md-12">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="radio_default_inline" id="activeSkus" value=""/>
                    <label class="form-check-label" for="activeSkus">Active SKUs</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="radio_default_inline" id="allSkus" value=""/>
                    <label class="form-check-label" for="allSkus">All SKUs</label>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mt-4">
    <div class="col-md-12 col-lg-12">
        <div class="table-responsive">
            <table class="table table-striped invtDashPlantTbl" width="100%">
                <thead>
                    <tr>
                        <th rowspan="2" class="text-nowrap" width="15%">SKU</th>
                        <th rowspan="2" class="text-center" width="10%">Volume<br/>QTY</th>
                        <th rowspan="2" class="text-nowrap text-center" width="10%">Current<br/>Available</th>
                        <th rowspan="2" class="text-nowrap text-center" width="10%">Future<br/>Available</th>
                        <th colspan="3" class="text-center prevYear" width="15%">2019</th>
                        <th colspan="3" class="text-center currentYear" width="15%">Current Year 2020</th>
                        <th colspan="2" class="text-center nextYear" width="14%">Next Year 2021</th>
                        <th rowspan="2" class="text-nowrap text-center" width="11%">In<br/>Production</th>
                    </tr>
                    <tr>
                        <th class="prevYear" width="5%">LY Sales</th>
                        <th class="prevYear" width="5%">Each<br/>Price</th>
                        <th class="prevYear" width="5%">Volume Price</th>
                        <th class="currentYear" width="5%">LTD Sales</th>
                        <th class="currentYear" width="5%">Each<br/>Price</th>
                        <th class="currentYear" width="5%">Volume Price</th>
                        <th class="nextYear" width="5%">Each Price</th>
                        <th class="nextYear">Volume Price</th>
                    </tr>
                </thead>
                <tbody>
                {PlantListForTable.map(plant=>{
                    // console.log(plant)
                   return <>
                     <tr class="tblLinks">
                        <td colspan="12">
                        <a href="">{plant[0].genus}</a>
                        </td>
                        <td class="text-center">
                           <span class="mx-2">
                                <img src="assets/img/check-ic.svg" alt=""/>
                           </span>
                           <span class="ml-4">
                               <a href="">
                                    <img src="assets/img/up-arrow-ic.svg" alt=""/>
                                </a>
                           </span>
                        </td>
                    </tr>                   
                    <tr>
                    {plant.map(skuObj=>{
                       return <td colspan="13" class="p-0">
                        <table class="table table-striped" width="100%">
                        <tr>
                                    <td class="text-nowrap" width="15%">
                                        <a href="">{skuObj.sku_code}</a>
                                    </td>
                                    <td width="10%">{skuObj.volume_quantity}</td>
                                    <td width="10%" class="text-nowrap"><strong>125</strong></td>
                                    <td width="10%" class="text-nowrap"><strong>125</strong></td>
                                    <td width="6%">25.478</td>
                                    <td width="5%">5.75</td>
                                    <td width="5%">5.00</td>
                                    <td width="6%">18.569 
                                        <small class="text-green d-block">-23.0%</small></td>
                                    <td width="6%" class="text-nowrap">
                                        <span class="border">5.95</span>
                                        <small class="text-green d-block">+1.74%</small>
                                    </td>
                                    <td width="5%"> 
                                        <span class="border">5.95</span>
                                        <small class="text-green d-block">+1.74%</small>
                                    </td>
                                    <td width="6%"> 
                                        <span class="border">5.95</span>
                                        <small class="text-green d-block">-</small>
                                    </td>
                                    <td width="6%"> 
                                        <span class="border">5.95</span>
                                        <small class="text-green d-block">-</small>
                                    </td>
                                    <td width="10%"></td>
                                </tr>
                        </table>
                        </td>
                        
                    })}
                    </tr>                   
                    </>
                })}                                  
                   
                </tbody>
            </table>
        </div>
    </div>
</div>
        
        </>
    )
}}


const mapStateToProps = (state)=> (
    // console.log(state)
    {
        plantCategoryList:state.inventoryManagementReducer.plantCategoryList,
        locationList:state.inventoryManagementReducer.locationList,
        supplierList:state.supplierData.supplierInfo,
        plantInventoryData:state.inventoryManagementReducer.plantInventoryData,
        temp:state
}

)

export default connect(mapStateToProps,{getCategoryList,getLocationList,getAllSupplierAction,getPlantList,getFilterResult})(PlantInventory)
