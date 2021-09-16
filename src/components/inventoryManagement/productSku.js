/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {connect} from "react-redux";
import {getLocationList,getProductCategoryList,getProductListSku,getManufacturerList,getProductFilterResult} from "../../actions/inventoryManagementAction";
import {getAllSupplierAction} from "../../actions/supplierManagementAction";
import ActionModal from '../Modal/ActionModal'

export class ProductInventorySku extends Component {  
    constructor(){
        super()
        this.state={
         
                selectedLocationId:"",
                selecredCategoryID:"",
                selectedManufacturerId:"",
                productSearchName:"",
                productSkuSearchName:"",
                productRadio:false,
                productSkuRadio:false
          
        }
    }
    componentDidMount(){
        this.props.getLocationList()   
        this.props.getProductCategoryList()
        this.props.getManufacturerList()
        this.props.getProductListSku()
    }

    handleFilterChange = (e)=>{
        let {name,value} = e.target
        let {selectedLocationId,selecredCategoryID,selectedManufacturerId,productSearchName,productSkuSearchName,productRadio,productSkuRadio} = this.state
        if(name==="location"){
            this.setState({selectedLocationId:value})
            this.props.getProductFilterResult({
                selectedLocationId:value,
                selecredCategoryID,
                selectedManufacturerId,
                productSearchName,
                productSkuSearchName,
                productRadio,
                productSkuRadio
            })
        }
        if(name === "category"){
            this.setState({selecredCategoryID:value})
            this.props.getProductFilterResult({
                selectedLocationId,
                selecredCategoryID:value,
                selectedManufacturerId,
                productSearchName,
                productSkuSearchName,
                productRadio,
                productSkuRadio
            })
        }
        if(name === "manufacturer"){
            this.setState({selectedManufacturerId:value})
            this.props.getProductFilterResult({
                selectedLocationId,
                selecredCategoryID,
                selectedManufacturerId:value,
                productSearchName,
                productSkuSearchName,
                productRadio,
                productSkuRadio
            })
        }
        if(name=== "productSearch"){
            this.setState({productSearchName:value})
            this.props.getProductFilterResult({
                selectedLocationId,
                selecredCategoryID,
                selectedManufacturerId,
                productSearchName:value,
                productSkuSearchName,
                productRadio,
                productSkuRadio
            })
        }
        if(name === "skuSearch"){
            this.setState({productSkuSearchName:value})
            this.props.getProductFilterResult({
                selectedLocationId,
                selecredCategoryID,
                selectedManufacturerId,
                productSearchName,
                productSkuSearchName:value,
                productRadio,
                productSkuRadio
            })
        }       
    }
    handleRadio = (e) => {
        let {name,value} = e.target
        let {selectedLocationId,selecredCategoryID,selectedManufacturerId,productSearchName,productSkuSearchName,productRadio,productSkuRadio} = this.state
        if(e.target.name.includes("productRadio" )){
            this.setState({productRadio:!productRadio})
        }
        if(e.target.name.includes("productSkuRadio" )){
            this.setState({productSkuRadio:!productSkuRadio})
        }
       
        this.props.getProductFilterResult({
            selectedLocationId,
            selecredCategoryID,
            selectedManufacturerId,
            productSearchName:value,
            productSkuSearchName,
            productRadio,
            productSkuRadio
        })
    }
  
    render() {
        let productCategoryList =[]
        let locationList = []
        let manufacturerList = []
        if(this.props.productCategoryList)
        if(this.props.productCategoryList.active){
            productCategoryList = [...this.props.productCategoryList.active,...this.props.productCategoryList.inactive]
        }
        if(this.props.locationList)
        if(this.props.locationList.active){
            locationList = [...this.props.locationList.active,...this.props.locationList.inactive]
        }
        if(this.props.manufacturerList){
            if(this.props.manufacturerList && this.props.manufacturerList.active)
            manufacturerList = this.props.manufacturerList.active
        }
        console.log(manufacturerList)
        // console.log(this.props.productInventoryData)
        let ProductListForTable = []
        ProductListForTable = this.props.productInventoryData?this.props.productInventoryData:[]

        console.log(ProductListForTable)
        let mainProductObject={}
        if(ProductListForTable){
            ProductListForTable.map(productObj=>{
                let id = productObj["product_id"]
                if(id){
                    if(!mainProductObject[`${id}`]){
                        mainProductObject[`${id}`]=[]
                    }                    
                    mainProductObject[`${id}`].push(productObj)
                }
               
            })
        }
        console.log(mainProductObject)
        let productListToDispley = Object.values(mainProductObject)
        console.log(productListToDispley)
        let currentYear = new Date().getFullYear()
    return (
        <>
        <div class="row mt-3">
            <div class="col-md-6 col-lg-4">
                <label>Location</label>
                <select class="form-control" name="location" value={this.state.selectedLocationId} onChange={this.handleFilterChange}>
                <option>All</option>
                {locationList.map(category=>{
                return  <option value={category.id}>{category.address}</option>
                })}
            </select>
            </div>
            <div class="col-md-6 col-lg-4 mt-2 mt-md-0">
                <label>Category</label>
                <select class="form-control" name="category" value={this.state.selecredCategoryID}  onChange={this.handleFilterChange}>
                <option value={0}>All</option>
                {productCategoryList.map(category=>{
                return  <option value={category.id}>{category.name}</option>
                })}
            </select>
            </div>
            <div class="col-md-6 col-lg-4 mt-2 mt-md-0">
                <label>Manufacture</label>
                <select class="form-control" name="manufacturer" value={this.state.selectedManufacturerId} onChange={this.handleFilterChange} >
                    <option value={0}>All</option>
                    {manufacturerList.map(category=>{
                        // console.log(category)
                return  <option value={category.id}>{category.name}</option>
                })}
                </select>
            </div>
        </div>
        <div class="row mt-3 align-items-center">
            <div class="col-md-6 col-lg-6">
                <label>Product Search</label>
                <div class="searchInput">
                    <button type="submit" class="btn btn-search">
                        <img src="assets/img/search.svg" alt=""/>
                    </button>
                    <input type="text" class="form-control" placeholder="Search" name="productSearch" value={this.state.productSearchName} onChange={this.handleFilterChange}/>
                </div>
                <div class="form-group row mt-2">
                    <div class="col-md-12">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="productRadio1" onChange={this.handleRadio} checked={this.state.productRadio}  handleRadioid="activePlants" value=""/>
                            <label class="form-check-label" for="productRadio1">Active Products</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="productRadio2" id="allPlants" value="" checked={!this.state.productRadio} onChange={this.handleRadio}/>
                            <label class="form-check-label" for="productRadio2">All Products</label>
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
                            <input class="form-check-input" type="radio" name="productSkuRadio1" id="activeSkus" value=""  checked={this.state.productSkuRadio} onChange={this.handleRadio}/>
                            <label class="form-check-label" for="productSkuRadio1">Active SKUs</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="productSkuRadio2" id="allSkus" value=""checked={!this.state.productSkuRadio} onChange={this.handleRadio}/>
                            <label class="form-check-label" for="productSkuRadio2">All SKUs</label>
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
                        {productListToDispley.map(product=>{
                            return<>
                            <tr class="tblLinks">
                                <td colspan="12">
                                    <a href="">{product[0].name}</a>
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
                            {product.map(skuObj=>{
                            return  <tr>
                                <td colspan="13" class="p-0">
                                    <table class="table table-striped" width="100%">
                                        <tr>
                                            <td class="text-nowrap" width="15%">
                                                <a href="">{skuObj.sku_code}</a>
                                            </td>
                                            <td width="10%">6</td>
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
                                    </tr>
                            })}
                                        

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
    {
    productCategoryList:state.inventoryManagementReducer.productCategoryList,
    locationList:state.inventoryManagementReducer.locationList,
    manufacturerList:state.inventoryManagementReducer.manufacturerList,
    productInventoryData:state.inventoryManagementReducer.productInventoryData,
    temp:state
    }
)

export default connect(mapStateToProps,{getProductCategoryList,getLocationList,getAllSupplierAction,getProductListSku,getManufacturerList,getProductFilterResult})(ProductInventorySku)
