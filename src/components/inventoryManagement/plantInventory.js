/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {connect} from "react-redux";
import {setPlantPageNumber,resetFileds,getLocationList,getCategoryList,getPlantList,getFilterResult,getAllPlants,filterPlantManagerData} from "../../actions/inventoryManagementAction";
import {getAllSupplierAction} from "../../actions/supplierManagementAction";

import ActionModal from '../Modal/ActionModal' 
import Autosuggest from 'react-autosuggest';
import TablePagination from '../Pagination';
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
            skuRadio:"All",
            purchaseOrder:"",
            pageSize:15,
            batchId:"",
            plantNameValue:"",
            plantSkuValue:"",
            plantbatchValue:"",
            radioFilter:"All",
            radioFilterPlant:"All",
            show:0,
            suggestions:[]
        }
    }
    componentDidMount(){
        this.props.getLocationList()   
        this.props.getCategoryList()
        this.props.getAllSupplierAction()
        this.props.getAllPlants()
        
    }
    //common suggestion function
    onSuggestionsFetchRequested = ({ value }) =>{
        // alert(value.length)
       
        this.setState({suggestions: this.getSuggestions(value),show:this.getSuggestions(value).length>3?1:0});
    }

    onSuggestionsClearRequested = () => this.setState({suggestions:[],show:0})

    onSuggestionsFetchRequestedbatch = ({ value }) =>this.setState({suggestions: this.getSuggestions(value)});

    onSuggestionsClearRequestedbatch = () => this.setState({suggestions:[]})

    onSuggestionsFetchRequestedsku = ({ value }) =>this.setState({suggestions: this.getSuggestions(value)});

    onSuggestionsClearRequestedsku = () => this.setState({suggestions:[]})



    /*************Dynamic Search For Plant**********/
    getSuggestions = (value,type) => {
        const inputValue = value.toLowerCase().trim()
        const inputLength = inputValue.length;
        let result = this.props.plantData.plantBackup.reduce((unique, o) => {
            if(!unique.some(obj => obj.genus === o.genus)) {
              unique.push(o);
            }
            return unique;
        },[]);
        return inputLength === 0 ? [] :  result.filter(lang =>lang.genus.toLowerCase().includes(inputValue))      
    };
    getSuggestionValue = suggestion =>suggestion.genus

    renderSuggestion = suggestion => (<span>{suggestion.genus}</span>);

    onChange = (e, { newValue }) => {
        this.setState({plantNameValue:newValue});
        this.props.filterPlantManagerData("genus",newValue)    
    };      
    /***************Dynamic Search End************/
    

    /*************Dynamic Search For Plant SKU**********/
    getSuggestionssku = (value,type) => {
        const inputValue = value.toLowerCase().trim()
        const inputLength = inputValue.length;
        let result = this.props.plantData.plantBackup.reduce((unique, o) => {
            if(!unique.some(obj => obj.sku_code === o.sku_code)) {
              unique.push(o);
            }
            return unique;
        },[]);
        return inputLength === 0 ? [] : result.filter(lang =>lang.sku_code.toLowerCase().includes(inputValue))      
    };
    getSuggestionValuesku = suggestion =>suggestion.sku_code

    renderSuggestionsku = suggestion => (<span>{suggestion.sku_code}</span>);

    onChangesku = (e, { newValue }) => {
        this.setState({plantSkuValue:newValue});
        this.props.filterPlantManagerData("sku_code",newValue)    
    };

        
    /***************Dynamic Search End************/

    /*************Dynamic Search For Plant SKU**********/
    getSuggestionsbatchcode = (value,type) => {
        const inputValue = value.toLowerCase().trim()
        const inputLength = inputValue.length;
        let result = this.props.plantData.plantBackup.reduce((unique, o) => {
            if(!unique.some(obj => obj.batch_code === o.batch_code)) {
              unique.push(o);
            }
            return unique;
        },[]);
        return inputLength === 0 ? [] : result.filter(lang =>lang.batch_code.toLowerCase().includes(inputValue))      
    };
    getSuggestionValuebatchcode = suggestion =>suggestion.batch_code

    renderSuggestionbatchcode = suggestion => (<span>{suggestion.batch_code}</span>);

    onChangebatchcode = (e, { newValue }) => {
        this.setState({plantbatchValue:newValue});
        this.props.filterPlantManagerData("batch_code",newValue)    
    };    
    /***************Dynamic Search End************/

    handleFilterChange = (e)=>{
        if(e.target.id=="archivedAll"|| e.target.id =="archived" || e.target.id=="archivedActive"){
            this.setState({radioFilter:[e.target.value]})

        }
        if(e.target.id=="status"|| e.target.id =="statusAll"){
            this.setState({radioFilterPlant:[e.target.value]})

        }
        console.log(e.target.id,e.target.value)
        this.props.filterPlantManagerData(e.target.id,e.target.value)

    }
    resetFiledsData = ()=>{
        
        this.setState({plantNameValue:"",plantSkuValue:"",plantbatchValue:"",radioFilter:"All",radioFilterPlant:"All"})
        this.props.resetFileds()
    }
    paginationChange =(event, page)=>{
        this.props.setPlantPageNumber(page-1)
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
        console.log(this.props.temp)
        let PlantListForTable = []
        PlantListForTable = this.props.plantInventoryData?this.props.plantInventoryData:[]

        // console.log()
        const {plantData,plantFilterIds,plantPageNumber} = this.props.plantData
        let plantIdsAll = plantData.map(plantData=>plantData.plant_id)
        let plantId = plantIdsAll.filter(function( plant, index, array ) {
            console.log(array.indexOf(plant) +""+index)
            return array.indexOf(plant) === index;
        });
        const totalLength = plantId.length
        const plantPerPage = this.state.pageSize;
        const pagesVisited = plantPageNumber*this.state.pageSize;
        const displayPlantList = plantId.slice(pagesVisited,pagesVisited+plantPerPage)
        const pageCount = Math.ceil(plantId.length/plantPerPage)
        console.log("plantData.length",plantId.length)
        console.log("pageCountpageCount", pageCount)
        console.log(plantId)

    
        const inputPropsPlant = {
            placeholder: 'Plant Name',
            value:this.state.plantNameValue,
            className:" form-control  btn btn-search ",
            id:"genus",
            style: {border:"1px solid gray",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:8,height:"41.5px",fontSize:"15px",textDecoration:"none",fontWeight:"380"},
            onChange: this.onChange,
            dataId: 'my-data-id',
        };
        const inputPropsPlantsku = {
            placeholder: 'Plant SKU',
            value:this.state.plantSkuValue,
            className:" form-control  btn btn-search ",
            id:"sku_code",
            style: {border:"1px solid gray",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:8,height:"41.5px",fontSize:"15px",textDecoration:"none",fontWeight:"380"},
            onChange: this.onChangesku,
            dataId: 'my-data-id',
        };
        const inputPropsBatchbatch = {
            placeholder: 'Batch Code',
            value:this.state.plantbatchValue,
            className:" form-control  btn btn-search ",
            id:"batch_code",
            style: {border:"1px solid gray",borderRadius:3,textAlign:"left",paddingLeft:"17%",border:"1px solid lightgray",marginTop:"-5%",paddingTop:8,height:"41.5px",fontSize:"15px",textDecoration:"none",fontWeight:"380"},
            onChange: this.onChangebatchcode,
            dataId: 'my-data-id',
        };
    return (
         <div class="bg-white px-3 py-3 mt-3">
                            <form>
                                <h2>Plant inventory</h2>
                                <hr/>
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-4">
                                        <label>Location</label>
                                        <select class="form-control" onChange={this.handleFilterChange}  id="location_id">
                                                <option>All</option>
                                                {locationList.map(category=>{
                                                return  <option value={category.id} selected={parseInt(plantFilterIds.location_id)==parseInt(category.id)?"selected":""}>{category.address}</option>
                                                })}
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-lg-4 mt-2 mt-md-0">
                                        <label>Category</label>
                                        <select class="form-control" onChange={this.handleFilterChange} id="category_id">
                                                <option>All</option>
                                                {plantCategoryList.map(category=>{
                                                return  <option value={category.id} selected={parseInt(plantFilterIds.category_id)==parseInt(category.id)?"selected":""}>{category.name}</option>
                                                })}
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-lg-4 mt-2 mt-md-0">
                                        <label>Supplier</label>
                                        <select class="form-control" onChange={this.handleFilterChange} id="supplier_id">
                                        <option>All</option>
                                        {supplierList.map(category=>{
                                        return  <option value={category.id} selected={parseInt(plantFilterIds.supplier_id)==parseInt(category.id)?"selected":""}>{category.supplier_name}</option>
                                        })}
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-3 align-items-center">
                                    <div class="col-md-6 col-lg-6">
                                        <label>Plant Search</label>
                                        <div className="searchInput" style={{height: "40px",paddingTop:5}}>
                                            <button type="submit" className="btn btn-search" style={{marginTop:"2%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button>
                                            <Autosuggest
                                                    suggestions={this.state.suggestions}
                                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                    getSuggestionValue={this.getSuggestionValue}
                                                    renderSuggestion={this.renderSuggestion}
                                                    inputProps={inputPropsPlant}
                                                  
                                                />
                                                </div>
                                                <div class="form-group row mt-2">
                                            <div class="col-md-12">
                                                {/* <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="radio_default_inline" id="activePlants" value="" onChange={this.handleFilterChange}/>
                                                    <label class="form-check-label" for="activePlants">Active Plants</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="radio_default_inline" id="allPlants" value="" onChange={this.handleFilterChange}/>
                                                    <label class="form-check-label" for="allPlants">All Plants</label>
                                                </div> */}

                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" style={{cursor:"pointer"}} name="radio_default_inline1" id="status" value={1} onChange={this.handleFilterChange} checked={parseInt(this.state.radioFilterPlant) ==1?true:false}/>
                                                    <label class="form-check-label" for="activeSkus1">Active Plants</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio"   style={{cursor:"pointer"}} name="radio_default_inline1" id="statusAll" value={"All"} onChange={this.handleFilterChange} checked={this.state.radioFilterPlant =="All"?true:false}/>
                                                    <label class="form-check-label" for="archievedSkus1">All Plants</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <label>Search SKU</label>
                                        <div className="searchInput" style={{height: "40px",paddingTop:5}}>
                                            <button type="submit" className="btn btn-search" style={{marginTop:"2%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button>
                                            <Autosuggest
                                                    suggestions={this.state.suggestions}
                                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequestedsku}
                                                    onSuggestionsClearRequested={this.onSuggestionsClearRequestedsku}
                                                    getSuggestionValue={this.getSuggestionValuesku}
                                                    renderSuggestion={this.renderSuggestionsku}
                                                    inputProps={inputPropsPlantsku}
                                                  
                                                />
                                                </div>
                                                
                                                <div class="form-group row mt-2">
                                            <div class="col-md-12">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio"  style={{cursor:"pointer"}} name="radio_default_inline" id="archivedActive" value={0} onChange={this.handleFilterChange} checked={parseInt(this.state.radioFilter) ==0?true:false}/>
                                                    <label class="form-check-label" for="activeSkus">Active SKUs</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio"  style={{cursor:"pointer"}} name="radio_default_inline" id="archived" value={1} onChange={this.handleFilterChange} checked={parseInt(this.state.radioFilter) ==1?true:false}/>
                                                    <label class="form-check-label" for="archievedSkus">Archived SKUs</label>
                                                </div>
                                                {/* <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="radio_default_inline" id="emptySkus" value="" onChange={this.handleFilterChange}/>
                                                    <label class="form-check-label" for="emptySkus">Empty SKUs</label>
                                                </div> */}
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio"  style={{cursor:"pointer"}} name="radio_default_inline" id="archivedAll" value={"All"} onChange={this.handleFilterChange} checked={this.state.radioFilter =="All"?true:false}/>
                                                    <label class="form-check-label" for="allSkus">All SKUs</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-3" style={{visibility: this.state.show==1?'hidden':""}}>
                                        <label><p style={{marginBottom:"10px"}}>Purchase Order #</p></label>
                                        <div className="searchInput" style={{height: "40px",paddingTop:5}}>
                                            <button type="submit" className="btn btn-search" style={{marginTop:"-6%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button>
                                            <Autosuggest
                                                    suggestions={this.state.suggestions}
                                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequestedbatch}
                                                    onSuggestionsClearRequested={this.onSuggestionsClearRequestedbatch}
                                                    getSuggestionValue={this.getSuggestionValuebatchcode}
                                                    renderSuggestion={this.renderSuggestionbatchcode}
                                                    inputProps={inputPropsBatchbatch}
                                                  
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
                                    <div class="col-md-6 col-lg-3" style={{visibility: this.state.show==1?'hidden':""}}>
                                        <label ><p style={{marginBottom:"10px"}}>Batch ID</p></label>
                                        <div className="searchInput" style={{height: "40px",paddingTop:5}}>
                                            <button type="submit" className="btn btn-search" style={{marginTop:"-6%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button>
                                            <Autosuggest
                                                    suggestions={this.state.suggestions}
                                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequestedbatch}
                                                    onSuggestionsClearRequested={this.onSuggestionsClearRequestedbatch}
                                                    getSuggestionValue={this.getSuggestionValuebatchcode}
                                                    renderSuggestion={this.renderSuggestionbatchcode}
                                                    inputProps={inputPropsBatchbatch}
                                                  
                                                />
                                        </div>
                                   
                                    </div>
                                    <div class="col-md-6 col-lg-3 pt-md-4 mt-3">
                                      <a onClick={this.resetFiledsData}  style={{cursor:"pointer",color:"#5287F5"}}>Reset</a>
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
                                    <label className="greenText">{"Showing " + (plantPageNumber>0 ? (this.state.pageSize*((plantPageNumber)))+1 : ((plantPageNumber)+1))+  "  to  " +  (plantPageNumber>0 ? (((this.state.pageSize*((plantPageNumber)))+this.state.pageSize)>totalLength ? totalLength : ((this.state.pageSize*((plantPageNumber)))+this.state.pageSize)) : ((((plantPageNumber)+1)*this.state.pageSize)>totalLength?totalLength:(((plantPageNumber)+1)*this.state.pageSize)))   + "  of   "  +   totalLength }</label>
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
                                    <TablePagination pageChange={this.paginationChange} pageCount={pageCount} pageNumber={plantPageNumber+1}/>
                                    </div>

                                    </div>
                                <div class="row mt-4">
                                    <div class="col-md-12 col-lg-12">
                                        <div class="table-responsive">
                                            <table class="table table-striped invtTbl" width="100%">
                                                <thead>
                                                    <tr >
                                                        <th rowspan="2" class="text-center">
                                                            <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                <label class="custom-control-label" for="customCheck1"></label>
                                                            </div>
                                                        </th>
                                                        <th rowspan="2" class="text-nowrap">SKU</th>
                                                        <th rowspan="2"><p style={{marginLeft:"-70px",marginTop:"17px"}}>Supllier</p></th>
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
                                                        <th class="productionBg f-s-10 text-center">Not Ready</th>
                                                    </tr>
                                                    {/* className="text-nowrap text-center" */}
                                                </thead>
                                                {/* <tbody> */}
                                                {console.log("kkm",plantData)}
                                                    {displayPlantList.map(plantId=>{
                                                        console.log(JSON.parse(plantId))
                                                       let count =0
                                                            return plantData.map((plant,index)=>{
                                                             
                                                                if(JSON.parse(plantId)===parseInt(plant["plant_id"])){
                                                                if(count===0){
                                                                    count++
                                                                    return(
                                                                        <><tr style={{backgroundColor:"#EFEFEF"}}>
                                                        <td colspan="5">
                                                            <a href="">{plant.plant_name}</a>
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
                                                        <td><p style={{marginLeft:"-50px",marginTop:"17px"}}>{plant.supplier_id}</p></td>
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
                                                        <span   style={{display:"inline-block",width: "150px",whiteSpace: "nowrap",overflow:"hidden",textOverflow: "ellipsis"}}>{plant.sku_code}</span>
                                                        </td>
                                                        <td><p style={{marginLeft:"-50px",marginTop:"17px"}}>{plant.supplier_id}</p></td>
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
                                                    
                                                {/* </tbody> */}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
        
        
    )
}}


const mapStateToProps = (state)=> (
    // console.log(state)
    {
        plantCategoryList:state.inventoryManagementReducer.plantCategoryList,
        locationList:state.inventoryManagementReducer.locationList,
        supplierList:state.supplierData.supplierInfo,
        plantInventoryData:state.inventoryManagementReducer.plantInventoryData,
        plantData:state.inventoryManagementReducer,
        temp:state
}

)

export default connect(mapStateToProps,{setPlantPageNumber,resetFileds,filterPlantManagerData,getAllPlants,getCategoryList,getLocationList,getAllSupplierAction,getPlantList,getFilterResult})(PlantInventory)
