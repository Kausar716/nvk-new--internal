/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {connect} from "react-redux";
import {setProductPageNumber,getLocationList,getProductCategoryList,getProductList,getFilterResult,getManufacturerList,filterProductManagerData,resetFileds} from "../../actions/inventoryManagementAction";
import {getAllSupplierAction} from "../../actions/supplierManagementAction";

import ActionModal from '../Modal/ActionModal' 
import Autosuggest from 'react-autosuggest';
import TablePagination from '../Pagination';

export class ProductInventory extends Component {
    constructor(){
        super()
        this.state={
            selectedLocationId:"",
            selecredCategoryID:"",
            selectedSupplierId:"",
            plantSearchName:"",
            skuSearchName:"",
            plantRadio:"All",
            skuRadio:"All",
            radioFilter:"All",
            radioFilterProduct:"All",
            value:"",
            pageSize:15,
            value1:"",
            value2:"",
            show:0,
            suggestions:[]
        }
    }
    componentDidMount(){
        this.props.getLocationList()   
        this.props.getProductCategoryList()
        this.props.getManufacturerList()
        this.props.getProductList()
        
    }

    handleFilterChange = (e)=>{
        if(e.target.id=="archivedAll"|| e.target.id =="archived" || e.target.id=="archivedActive"){
            this.setState({radioFilter:[e.target.value]})

        }
        if(e.target.id=="status"|| e.target.id =="statusActive")
        this.setState({radioFilterProduct:[e.target.value]})
        // this.setState({})
        this.props.filterProductManagerData(e.target.id,e.target.value)
      
    }
        getSuggestions = value => {
        const inputValue = value.toLowerCase().trim()
        const inputLength = inputValue.length;
        let result = this.props.productData.productBackup.reduce((unique, o) => {
            if(!unique.some(obj => obj.name === o.name)) {
              unique.push(o);
            }
            return unique;
        },[]);

        return inputLength === 0 ? [] : result.filter(lang =>
            lang.name.trim().toLowerCase().includes(inputValue)
          );
          
 
        };
         getSuggestionValue = suggestion =>suggestion.name;
    
          // Use your imagination to render suggestions.
         renderSuggestion = suggestion => (
            <span>
              {suggestion.name}
            </span>
        );
        onChange1 = (event, { newValue }) => {
            // if(event.target.id =="name"){
                this.setState({value:newValue});
                this.props.filterProductManagerData("name",newValue)

            // }else if(event.target.id =="sku_code"){
            //     this.setState({value1:newValue});
            //     this.props.filterProductManagerData("sku_code",newValue)

            // }
           
        };
         onSuggestionsFetchRequested = ({ value }) => {
             this.setState({suggestions: this.getSuggestions(value),show:this.getSuggestions(value).length>3?1:0});
        };
      
        // Autosuggest will call this function every time you need to clear suggestions.
          onSuggestionsClearRequested = () => {
            this.setState({suggestions:[],show:0})
        }; 
        
        ///
        getSuggestions1 = value => {
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length;
        let result = this.props.productData.productBackup.reduce((unique, o) => {
            if(!unique.some(obj => obj.sku_code === o.sku_code)) {
              unique.push(o);
            }
            return unique;
        },[]);
          
            return inputLength === 0 ? [] :  result.filter(lang =>
              lang.sku_code.toLowerCase().includes(inputValue)
            );
        };
         getSuggestionValue1 = suggestion =>suggestion.sku_code;
    
          // Use your imagination to render suggestions.
         renderSuggestion1 = suggestion => (
            <span>
              {suggestion.sku_code}
            </span>
        );
        onChange2 = (event, { newValue }) => {
            this.setState({value1:newValue});
            this.props.filterProductManagerData("sku_code",newValue)
        };
         onSuggestionsFetchRequested1 = ({ value }) => {
             this.setState({suggestions: this.getSuggestions1(value)});
        };
      
        // Autosuggest will call this function every time you need to clear suggestions.
          onSuggestionsClearRequested1 = () => {
            this.setState({suggestions:[]})
        }; 

        getSuggestions2= value => {
            const inputValue = value.trim().toLowerCase()
            const inputLength = inputValue.length;
            let result = this.props.productData.productBackup.reduce((unique, o) => {
                if(!unique.some(obj => obj.batch_code === o.batch_code)) {
                  unique.push(o);
                }
                return unique;
            },[]);
              
                return inputLength === 0 ? [] :  result.filter(lang =>
                  lang.batch_code.trim().toLowerCase().includes(inputValue)
                );
            };
             getSuggestionValue2 = suggestion =>suggestion.batch_code;
        
              // Use your imagination to render suggestions.
             renderSuggestion2 = suggestion => (
                <span>
                  {suggestion.batch_code}
                </span>
            );
            onChange3 = (event, { newValue }) => {
                this.setState({value2:newValue});
                this.props.filterProductManagerData("batch_code",newValue)
            };
             onSuggestionsFetchRequested2 = ({ value }) => {
                 this.setState({suggestions: this.getSuggestions2(value)});
            };
          
            // Autosuggest will call this function every time you need to clear suggestions.
              onSuggestionsClearRequested2 = () => {
                this.setState({suggestions:[]})
            }; 
            resetFiledsData = ()=>{
                this.setState({   value:"",value1:"",value2:"",radioFilter:"All",radioFilterProduct:"All"})
                this.props.resetFileds()
            }
         
        paginationChange =(event, page)=>{
                this.props.setProductPageNumber(page-1)
            }
    render() {
        let productCategoryList =[]
        let locationList = []
        let manufacturerList = []
        console.log(this.props.productCategoryList)
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
        console.log(this.props.temp)
        let PlantListForTable = []
        PlantListForTable = this.props.plantInventoryData?this.props.plantInventoryData:[]

        const {productData,productFilterIds,productPageNumber} = this.props.productData
        let productIdsAll = productData.map(productData=>productData.product_id)
        let productId = productIdsAll.filter(function( product, index, array ) {
            return array.indexOf(product) === index;
        });

        const totalLength = productId.length
        const plantPerPage = this.state.pageSize;
        const pagesVisited = productPageNumber*this.state.pageSize;
        const displayPlantList = productId.slice(pagesVisited,pagesVisited+plantPerPage)
        const pageCount = Math.ceil(productId.length/plantPerPage)
        console.log("plantData.length",productId.length)
        console.log("pageCountpageCount", pageCount)
        // console.log(productId)
        console.log(productId)
        const inputProps = {
            placeholder: 'Product Name',
        //    [this.state.value],
        value:this.state.value,
            // className:"searchInput",
            className:" form-control  btn btn-search ",
            id:"name",
            style: {border:"1px solid gray",fontWeight:"2px",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:8,height:"41.5px",fontSize:"15px",textDecoration:"none"},
            onChange: this.onChange1
        };
        const inputProps1 = {
            placeholder: 'SKU Code',
        //    [this.state.value],
        value:this.state.value1,
            // className:"searchInput",
            className:" form-control  btn btn-search ",
            id:"sku_code",
            style: {border:"1px solid gray",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:8,height:"41.5px",fontSize:"15px",textDecoration:"none"},
            onChange: this.onChange2
        };
        const inputProps2 = {
            placeholder: 'Batch Code',
        //    [this.state.value],
        value:this.state.value2,
            // className:"searchInput",
            className:" form-control  btn btn-search ",
            id:"batch_code",
            style: {border:"1px solid gray",borderRadius:3,textAlign:"left",paddingLeft:"17%",border:"1px solid lightgray",marginTop:"-5%",paddingTop:8,height:"41.5px",fontSize:"15px",textDecoration:"none",fontWeight:"380"},
            onChange: this.onChange3
        };
        // const inputProps1 = {
        //     placeholder: 'Customer Name',
        // //    [this.state.value],
        // value1:this.state.value1,
        //     // className:"searchInput",
        //     className:" form-control  btn btn-search ",
        //     id:"sku_code",
        //     style: {border:"1px solid gray",borderRadius:3,textAlign:"left",paddingLeft:"13%",border:"1px solid lightgray",marginTop:"-8%",paddingTop:8,height:"41.5px",fontSize:"15px",textDecoration:"none"},
        //     onChange: this.onChange2
        // };
    
    return (
        <>
        <div class="bg-white px-3 py-3 mt-3">
                            <form>
                                <h2>Product inventory</h2>
                                <hr/>
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-4">
                                        <label>Location</label>
                                        <select class="form-control" name="location" onChange={this.handleFilterChange} id="location_id">
                                        <option value={0}>All</option>
                                        {locationList.map(category=>{
                                        return  <option value={category.id} selected={parseInt(productFilterIds.location_id)==parseInt(category.id)?"selected":""}>{category.address}</option>
                                        })}
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-lg-4 mt-2 mt-md-0">
                                        <label>Category</label>
                                        <select class="form-control" name="category"   onChange={this.handleFilterChange} id="category_id">
                                        <option>All</option>

                                                {productCategoryList.map(category=>{
                                                return  <option value={category.id} selected={parseInt(productFilterIds.category_id)==parseInt(category.id)?"selected":""}>{category.name}</option>
                                                })}
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-lg-4 mt-2 mt-md-0">
                                        <label>Manufacturer</label>
                                        <select class="form-control" name="manufacturer"  id="manufacturer_id" onChange={this.handleFilterChange}>
                                            <option>All</option>
                                            {manufacturerList.map(category=>{
                                                        console.log(category)
                                                return  <option value={category.id} selected={parseInt(productFilterIds.manufacturer_id)==parseInt(category.id)?"selected":""}>{category.name}</option>
                                                })}
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-3 align-items-center">
                                    <div class="col-md-6 col-lg-6">
                                        <label>Product Search</label>
                                        <div className="searchInput" style={{height: "40px",paddingTop:5}}>
                                            <button type="submit" className="btn btn-search" style={{marginTop:"0.3%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button>
                                            <Autosuggest
                                                    suggestions={this.state.suggestions}
                                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                    getSuggestionValue={this.getSuggestionValue}
                                                    renderSuggestion={this.renderSuggestion}
                                                    inputProps={inputProps}
                                                  
                                                />
                                                </div>
                                        {/* <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            <input type="text" class="form-control" placeholder="Search" id="name" value={productFilterIds.name} onChange={this.handleFilterChange}/>
                                        </div> */}
                                        <div class="form-group row mt-2">
            
                                            <div class="col-md-12">
                                        <div class="form-check form-check-inline">
                                                    <input class="form-check-input"  style={{cursor:"pointer"}} type="radio" name="radio_default_inline1" id="statusActive" value={1} onChange={this.handleFilterChange} checked={parseInt(this.state.radioFilterProduct) ==1?true:false}/>
                                                    <label class="form-check-label" for="activeSkus1">Active Products</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input"  style={{cursor:"pointer"}} type="radio" name="radio_default_inline1" id="status" value={"All"} onChange={this.handleFilterChange} checked={this.state.radioFilterProduct =="All"?true:false}/>
                                                    <label class="form-check-label" for="archievedSkus1">All Products</label>
                                                </div>
                                                </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <label>Search SKU</label>
                                        <div className="searchInput" style={{height: "40px",paddingTop:5}}>
                                            <button type="submit" className="btn btn-search" style={{marginTop:"0.3%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button>
                                            <Autosuggest
                                                    suggestions={this.state.suggestions}
                                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested1}
                                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested1}
                                                    getSuggestionValue={this.getSuggestionValue1}
                                                    renderSuggestion={this.renderSuggestion1}
                                                    inputProps={inputProps1}
                                                  
                                                />
                                                </div>
                                        {/* <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            <input type="text" class="form-control" placeholder="Search" name=""  value={productFilterIds.sku_code} onChange={this.handleFilterChange} id="sku_code"/>
                                        </div> */}
                                        <div class="form-group row mt-2">
                                            <div class="col-md-12">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input"  style={{cursor:"pointer"}} type="radio" name="radio_default_inline" id="archivedActive" value={0} onChange={this.handleFilterChange} checked={parseInt(this.state.radioFilter) ==0?true:false}/>
                                                    <label class="form-check-label" for="activeSkus">Active SKUs</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input"  style={{cursor:"pointer"}} type="radio" name="radio_default_inline" id="archived" value={1} onChange={this.handleFilterChange} checked={parseInt(this.state.radioFilter) ==1?true:false}/>
                                                    <label class="form-check-label" for="archievedSkus">Archived SKUs</label>
                                                </div>
                                                {/* <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="radio_default_inline" id="emptySkus" value="" onChange={this.handleFilterChange}/>
                                                    <label class="form-check-label" for="emptySkus">Empty SKUs</label>
                                                </div> */}
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input"  style={{cursor:"pointer"}} type="radio" name="radio_default_inline" id="archivedAll" value={"All"} onChange={this.handleFilterChange} checked={this.state.radioFilter =="All"?true:false}/>
                                                    <label class="form-check-label" for="allSkus">All SKUs</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-3" style={{visibility:this.state.show==1?"hidden":""}}>
                                        {/* <label>Purchase Order #</label> */}
                                        <label><p style={{marginBottom:"10px"}}>Purchase Order #</p></label>
                                        <div className="searchInput" style={{height: "40px",paddingTop:5}}>
                                            <button type="submit" className="btn btn-search" style={{marginTop:"-6%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button>
                                            <Autosuggest
                                                    suggestions={this.state.suggestions}
                                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested2}
                                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested2}
                                                    getSuggestionValue={this.getSuggestionValue2}
                                                    renderSuggestion={this.renderSuggestion2}
                                                    inputProps={inputProps2}
                                                  
                                                />
                                        </div>
                                        <div class="form-group row mt-2">
                                            <div class="col-md-12">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="radio_default_inline" id="activePlants" value="" onChange={this.handleFilterChange}/>
                                                    <label class="form-check-label" for="activePlants">Display Archives</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-3"  style={{visibility:this.state.show==1?"hidden":""}}>
                                        <label><p style={{marginBottom:"10px"}}>Batch ID</p></label>
                                        <div className="searchInput" style={{height: "40px",paddingTop:5}}>
                                            <button type="submit" className="btn btn-search" style={{marginTop:"-6%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button>
                                            <Autosuggest
                                                    suggestions={this.state.suggestions}
                                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested2}
                                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested2}
                                                    getSuggestionValue={this.getSuggestionValue2}
                                                    renderSuggestion={this.renderSuggestion2}
                                                    inputProps={inputProps2}
                                                  
                                                />
                                        </div>
                                        {/* <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            <input type="text" class="form-control" placeholder="Search" onChange={this.handleFilterChange} id="batch_code" value={productFilterIds.batch_code}/>
                                        </div> */}
                                    </div>
                                    <div class="col-md-6 col-lg-3 pt-md-4 mt-3">
                                      <a  onClick={this.resetFiledsData}  style={{cursor:"pointer",color:"#5287F5"}}>Reset</a>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-12 text-right inventoryBtns d-flex flex-wrap justify-content-end">
                                        <a href="">
                                            <img src="assets/img/quick-transfer.svg" alt=""/> Quick Transfer
                                        </a>
                                        <a href="">
                                            <img src="assets/img/merge-batch.svg" alt=""/> Merge Batch
                                        </a>
                                        <a href="">
                                            <img src="assets/img/quick-move.svg" alt=""/> Quick Move
                                        </a>
                                        <a href="" class="ml-3">
                                            <img src="assets/img/add-move-task.svg" alt=""/> Add Move Task
                                        </a>
                                        <a href="">
                                            <img src="assets/img/add-plant-task.svg" alt=""/> Add Plant Task
                                        </a>
                                        <a href="">
                                            <img src="assets/img/add-dig-task.svg" alt=""/> Add Dig Task
                                        </a>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-md-12 col-lg-12 sortingCtrls d-flex flex-wrap align-items-center">
                                       <span class="mr-3">Sort</span>
                                        <a href="" class="active">Default</a>
                                        <a href="">Ready Alert</a>
                                        <a href="">Sales</a>
                                        <a href="">Sales NR</a>
                                        <a href="">Production</a>
                                        <a href="">Production NR</a>
                                    </div>
                                </div>
                                <div className="row_1">

<div style={{marginTop:8}}>
<label className="greenText">{"Showing " + (productPageNumber>0 ? (this.state.pageSize*((productPageNumber)))+1 : ((productPageNumber)+1))+  "  to  " +  (productPageNumber>0 ? (((this.state.pageSize*((productPageNumber)))+this.state.pageSize)>totalLength ? totalLength : ((this.state.pageSize*((productPageNumber)))+this.state.pageSize)) : ((((productPageNumber)+1)*this.state.pageSize)>totalLength?totalLength:(((productPageNumber)+1)*this.state.pageSize)))   + "  of   "  +   totalLength }</label>
</div>
            <div  style={{marginTop:8}}>
            <label className="greenText">Show</label>
            <select
                    value={this.state.pageSize}
                    onChange={e => {
                        this.setState({pageSize:Number(e.target.value)})
                        {/* setPageSize(Number(e.target.value)) */}
                    }}
                    style={{cursor:"pointer"}}
                    >
                    {[15, 25, 50, 100, 250,500].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                        {pageSize} 
                        </option>
                    ))}
                </select>
            </div>
<div >
<TablePagination pageChange={this.paginationChange} pageCount={pageCount} pageNumber={productPageNumber+1}/>
</div>

</div>
                                <div class="row mt-4">
                                    <div class="col-md-12 col-lg-12">
                                        <div class="table-responsive">
                                            <table class="table table-striped invtTbl" width="100%">
                                                <thead>
                                                    <tr>
                                                        <th rowspan="2" class="text-center">
                                                            <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                <label class="custom-control-label" for="customCheck1"></label>
                                                            </div>
                                                        </th>
                                                        <th rowspan="2" class="text-nowrap">SKU</th>
                                                        <th rowspan="2" class="text-nowrap"><p style={{marginLeft:"-80px",marginTop:"17px"}}>Manufacture</p></th>
                                                        <th rowspan="2" class="text-nowrap">Batch ID</th>
                                                        <th rowspan="2" class="text-nowrap">Batch Date</th>
                                                        <th rowspan="2">Purchase Order</th>
                                                        <th rowspan="2">Current Location</th>
                                                        <th colspan="2" class="salesBg">Sales</th>
                                                        <th rowspan="2" class="salesBg text-nowrap">Ready Date</th>
                                                        <th colspan="2" class="productionBg">Production</th>
                                                        <th rowspan="2" class="productionBg text-nowrap">Ready Date</th>
                                                        <th rowspan="2" class="text-center">Task</th>
                                                    </tr>
                                                    <tr>
                                                        <th class="salesBg f-s-10">Ready</th>
                                                        <th class="salesBg f-s-10">Not Ready</th>
                                                        <th class="productionBg f-s-10">Ready</th>
                                                        <th class="productionBg f-s-10">Not Ready</th>
                                                    </tr>
                                                </thead>
                                                {displayPlantList.map(productId=>{
                                                        {/* console.log(JSON.parse(productId)) */}
                                                       let count =0
                                                            return productData.map((plant,index)=>{
                                                             
                                                                if(productId==plant["product_id"]){
                                                                if(count===0){
                                                                    count++
                                                                    return(
                                                                        <><tr style={{backgroundColor:"#EFEFEF"}}>
                                                        <td colspan="5">
                                                            <a href="">{plant.name}</a>
                                                        </td>
                                                        <td colspan="8">
                                                            <a href="">View Sales Orders</a>
                                                        </td>
                                                        <td>
                                                            <a href=""> New Batch ID</a>
                                                        </td>
                                                    </tr>
                                                    <tr >
                                                        <td class="text-center">
                                                            <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" id="customCheck2" />
                                                                <label class="custom-control-label" for="customCheck2"></label>
                                                            </div>
                                                        </td>
                                                        <td class="text-nowrap">
                                                        <span style={{display:"inline-block",width: "150px",whiteSpace: "nowrap",overflow:"hidden",textOverflow: "ellipsis"}}>{plant.sku_code}</span>
                                                        </td>
                                                        <td><p style={{marginLeft:"-80px"}}>{plant.manufacturer_id}</p></td>
                                                        <td class="text-nowrap">{plant.batch_code}</td>
                                                        <td class="text-nowrap">{plant.batch_date}</td>
                                                        <td>-</td>
                                                        <td><a href="">{plant.location_id}</a></td>
                                                        <td>{plant.sales_ready_state}</td>
                                                        <td><strong class="text-nowrap text-center" style={{marginLeft:"9px"}}>{plant.sales_not_ready_state}</strong></td>
                                                        <td class="text-nowrap">25-02-2020</td>
                                                        <td>{plant.production_ready_state}</td>
                                                        <td><strong class="text-nowrap text-center" style={{marginLeft:"9px"}}>{plant.production_not_ready_state}</strong></td>
                                                        <td class="text-nowrap">{plant.production_ready_date}</td>
                                                        <td class="invTblAction">
                                                            <a href="">
                                                                <img src="assets/img/tbl-task-ic.svg" alt=""/>
                                                            </a>
                                                            <a href="">
                                                                <img src="assets/img/tbl-more-ic.svg" alt=""/>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    </>

                                                    )

                                                        }else{
                                                            count++
                                                        return(
                                                        <>
                                                    <tr>
                                                    <td class="text-center">
                                                            <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" id="customCheck2" />
                                                                <label class="custom-control-label" for="customCheck2"></label>
                                                            </div>
                                                        </td>
                                                        <td class="text-nowrap">
                                                        <span style={{display:"inline-block",width: "150px",whiteSpace: "nowrap",overflow:"hidden",textOverflow: "ellipsis"}}>{plant.sku_code}</span>
                                                        </td>
                                                        <td><p style={{marginLeft:"-80px"}}>{plant.manufacturer_id}</p></td>
                                                        <td class="text-nowrap">{plant.batch_code}</td>
                                                        <td class="text-nowrap">{plant.batch_date}</td>
                                                        <td>-</td>
                                                        <td><a href="">{plant.location_id}</a></td>
                                                        <td>{plant.sales_ready_state}</td>
                                                        <td><strong class="text-nowrap text-center" style={{marginLeft:"9px"}}>{plant.sales_not_ready_state}</strong></td>
                                                        <td class="text-nowrap">25-02-2020</td>
                                                        <td>{plant.production_ready_state}</td>
                                                        <td><strong class="text-nowrap text-center" style={{marginLeft:"9px"}}>{plant.production_not_ready_state}</strong></td>
                                                        <td class="text-nowrap">{plant.production_ready_date}</td>
                                                        <td class="invTblAction">
                                                            <a href="">
                                                                <img src="assets/img/tbl-task-ic.svg" alt=""/>
                                                            </a>
                                                            <a href="">
                                                                <img src="assets/img/tbl-more-ic.svg" alt=""/>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    </>
                                                                    )
                                                                }
                                                               
                                                            }   
                                                        })

                                                       
                                                    
                                                    })}
                                                
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
        </>
        
    )
}}


const mapStateToProps = (state)=> (
    // console.log(state)
    {
        productCategoryList:state.inventoryManagementReducer.productCategoryList,
        locationList:state.inventoryManagementReducer.locationList,
        manufacturerList:state.inventoryManagementReducer.manufacturerList,
        plantInventoryData:state.inventoryManagementReducer.plantInventoryData,
        temp:state,
        productData:state.inventoryManagementReducer
}

)

export default connect(mapStateToProps,{setProductPageNumber,resetFileds,filterProductManagerData,getProductCategoryList,getLocationList,getAllSupplierAction,getProductList,getFilterResult,getManufacturerList})(ProductInventory)
