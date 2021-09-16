import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';
import {connect} from "react-redux";
import TablePagination from '../Pagination/index';
import {getAllCustomer,handleRadioFilter,handleSearchFilter,handleAlphabetFilter, 
     handleAplhabetFilterBySN,handlePOFilter,
     handlePurchaseOrderFilert,handlePoPageSelection,
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
export class PurchaseOrders extends React.Component {

    constructor(){
        super()
        this.state={
            addCustomerToggle:false,
            customerListStatus:"active",
            editCustmerToggle:false,
            customerObject:{},
            pageSize:5,
            alphabets:["A", "B", "C", "D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            selectedAlpha:"All",
            searchValue:"",
            radioFilter:"active",
            searchInput: '', 
            checkedData:[],
            alphabet: '',
            button: true,           
            alphabetSelect:'',
            TotalPurchaseOder:39,
            plantSuggestions:[],
            supplierSuggestions:[],
            jobSuggestions:[],
            inputValue:"",
            plantValue:"",
            supplierValue:"",
            jobValue:"",
            orderSuggestions:[],
            supplierOrder:[],
            orderValue:'',
            supplierOrderValue:'',
            newValue:""

        }
    }
    componentDidMount(){
        this.props.getAllPlantAction()
        this.props.getAllSuppliers()
    }
    handleFilter = (e) => {
        let {statusLevel}=this.props.completeStateData
        console.log(e.target)
        let id = e.target.id
        let value = e.target.value
        if(id ==="supplierFilter"){
            this.props.getPoSupplierFilter()
        }
        else if(id === "jobDescription"){
            this.props.getPoJobDescription()
        }
        else if(id === "plantProduct"){
            this.props.getPoPlantProductFilter()
        }
        else if(id === "sku"){
            this.props.getPoSkuFilter()
        }
        else if(id === "order"){
            this.props.getPoOrderFilter()
        }
        else if(id === "supplierOrder"){
            this.props.getSupplierOrderFilter()
        }
        if(id === "open" || id === "draft"|| id === "cancelled" || id==="closed"){
            console.log(this.props.completeStateData.statusLevel )
            console.log(e.target.value)
            console.log(e.target.id)
             statusLevel[`${id}`] = statusLevel[`${id}`]===0?1:0
            this.props.handlePurchaseOrderFilert(statusLevel)
        }
        
    } 
    handleChange = (event, { newValue }) => {
        // console.log(newValue)
        // if(event.target.name==="plantSearch"){
        //     this.setState({plantValue:newValue})
        // // setLoaderMessage("No Records Found.")
        // this.props.handlePOFilter("plantSearch",newValue)
        // // this.setState({newValue});
        // }
        // if(event.target.name==="supplierSearch"){
        //     this.setState({supplierValue:newValue})
        // // setLoaderMessage("No Records Found.")
        // this.props.handlePOFilter("supplierSearch",newValue)
        // // this.setState({newValue});
        // }
        // if(event.target.name==="jobSearch"){
        //     this.setState({jobValue:newValue})
        // // setLoaderMessage("No Records Found.")
        // this.props.handlePOFilter("jobSearch",newValue)
        // // this.setState({newValue});
        // }
        // if(event.target.name==="orderSearch"){
        //     this.setState({orderValue:newValue})
        // // setLoaderMessage("No Records Found.")
        // this.props.handlePOFilter("orderSearch",newValue)
        // // this.setState({newValue});
        // }
        // if(event.target.name==="supplierOrderSearch"){
        //     this.setState({supplierOrderValue:newValue})
        // // setLoaderMessage("No Records Found.")
        // this.props.handlePOFilter("supplierOrderSearch",newValue)
        // // this.setState({newValue});
        // }
        
       
        
    };
    getOrderSuggestions = value => {
        console.log(value)
        let orderData = this.props.poBackup
       const inputValue = value.trim().toLowerCase();
       const inputLength = inputValue.length;
         console.log(orderData)
           return inputLength === 0 ? [] : orderData.filter(lang =>
            
            (lang.order_date && lang.order_date.toLowerCase().includes(inputValue))
           );
           
       };
    onOrderSuggestionsFetchRequested = ({value}) => {  
          
       let orderSuggestions = this.getOrderSuggestions(value)
       console.log(orderSuggestions)   
       this.setState({orderSuggestions})
   };
   onOrderSuggestionsClearRequested = () => {
       this.setState({orderSuggestions:[]});
     };
      renderOrderSuggestion = (orderSuggestions) => (
       <span>
         {orderSuggestions.genus}
       </span>
   );
   getSupplierOrderSuggestions = value => {
    console.log(value)
    let supplierOrderData = this.props.plantData.plantData
   const inputValue = value.trim().toLowerCase();
   const inputLength = inputValue.length;
     console.log(supplierOrderData)
       return inputLength === 0 ? [] : supplierOrderData.filter(lang =>
         lang.genus.toLowerCase().includes(inputValue)
       );
   };
onSupplierOrderSuggestionsFetchRequested = ({value}) => {  
      
   let supplierOrderSuggestions = this.getSupplierOrderSuggestions(value)
   console.log(supplierOrderSuggestions)   
   this.setState({supplierOrderSuggestions})
};
onSupplierOrderSuggestionsClearRequested = () => {
   this.setState({supplierOrderSuggestions:[]});
 };
  renderSupplierOrderSuggestion = (supplierOrderSuggestions) => (
   <span>
     {supplierOrderSuggestions.genus}
   </span>
);



   
     getPlantSuggestions = value => {
         console.log(value)
         let plantData = this.props.plantData.plantData
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
          console.log(plantData)
            return inputLength === 0 ? [] : plantData.filter(lang =>
              lang.genus.toLowerCase().includes(inputValue)
            );
        };
     onPlantSuggestionsFetchRequested = ({value}) => {  
           
        let plantSuggestions = this.getPlantSuggestions(value)

        console.log(plantSuggestions)   
        this.setState({plantSuggestions})
    };
    onPlantSuggestionsClearRequested = () => {
        this.setState({plantSuggestions:[]});
      };
       renderPlantSuggestion = (plantSuggestions) => (
        <span>
          {plantSuggestions.genus}
        </span>
    );
    getSupplierSuggestions = value => {
        console.log(value)
        let supplierData = this.props.supplierData
       const inputValue = value.trim().toLowerCase();
       const inputLength = inputValue.length;
           return inputLength === 0 ? [] : supplierData.filter(lang =>
             lang.supplier_name.toLowerCase().includes(inputValue)
           );
       };
    onSupplierSuggestionsFetchRequested = ({value}) => {  
           
        let supplierSuggestions = this.getSupplierSuggestions(value)
        console.log(supplierSuggestions)   
        this.setState({supplierSuggestions})
    };
    onSupplierSuggestionsClearRequested = () => {
        this.setState({supplierSuggestions:[]});
      };
    
    renderSupplierSuggestion = (supplierSuggestions) => (
        <span>
            {supplierSuggestions.supplier_name}
        </span>
        );

    getJobSuggestions = value => {
        console.log(value)
        let jobData = this.props.poBackup
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
            return inputLength === 0 ? [] : jobData.filter(lang =>
                lang.job_description?lang.job_description.toLowerCase().includes(inputValue):null
            );
        };
    onJobSuggestionsFetchRequested = ({value}) => {  
            
        let jobSuggestions = this.getJobSuggestions(value)
        console.log(jobSuggestions)   
        this.setState({jobSuggestions})
    };
    onJobSuggestionsClearRequested = () => {
        this.setState({jobSuggestions:[]});
        };
    
    renderJobSuggestion = (jobSuggestions) => (
        <span>
            {jobSuggestions.supplier_name}
        </span>
        );
    handlePOClick =(path,index)=>{
        this.props.handlePoPageSelection(path,index)
    }
      

    render(){
        let pageCount =0;
        let pageNumber = 0;
        let totalLength = 0;
        let plantPerPage =0;
        let pagesVisited = 0;
        let displayPOList = []
        // const getPlantSuggestionValue = ""
        // const getSupplierSuggestionValue = ""
        // const getJobSuggestionValue = ""
        // const getOrderSuggestionValue = ""
        // const getSupplierOrderSuggestionValue = ""
        const getSupplierSuggestionValue = supplierSuggestions => supplierSuggestions.supplier_name
        const getPlantSuggestionValue = plantSuggestions => plantSuggestions.genus
        const getJobSuggestionValue = jobSuggestions => jobSuggestions
        const getOrderSuggestionValue = orderSuggestions => orderSuggestions
        const getSupplierOrderSuggestionValue = supplierOrderSuggestions => supplierOrderSuggestions
        console.log(this.props.path,this.props.poPageIndex)
        console.log(this.props.completeStateData.statusLevel)
        let {plantValue,supplierValue,jobValue,orderValue,supplierOrderValue} = this.state
        console.log(plantValue)
        let {open,closed,draft,cancelled} = this.props.completeStateData.statusLevel
        // suggestion => suggestion.genus;
        let {openPoCount}= this.props.purchaseOrderListData
        const inputOrderProps = {
            placeholder: 'Order',
            value:orderValue,
            name:"orderSearch",
            // className:"searchInput",
            className:" form-control btn btn-search",
            id:"add-icon-search",
            style: {position:"relative",border:"1px solid #d5dbe0",borderRadius:3,textAlign:"left",paddingLeft:"10%",paddingTop:6,height:"41.5px",fontSize:"15px",textDecoration:"none"},
            onChange: this.handleChange
        };
        const inputSupplierOrderProps = {
            placeholder: 'Supplier Order',
            value:supplierOrderValue,
            name:"supplierOrderSearch",
            // className:"searchInput",
            className:" form-control btn btn-search",
            id:"add-icon-search",
            style: {position:"relative",border:"1px solid #d5dbe0",borderRadius:3,textAlign:"left",paddingLeft:"10%",paddingTop:6,height:"41.5px",fontSize:"15px",textDecoration:"none"},
            onChange: this.handleChange
        };
        const inputPlantProps = {
            placeholder: 'Plant Name',
            value:plantValue,
            name:"plantSearch",
            // className:"searchInput",
            className:" form-control btn btn-search",
            id:"add-icon-search",
            style: {position:"relative",border:"1px solid #d5dbe0",borderRadius:3,textAlign:"left",paddingLeft:"10%",paddingTop:6,height:"41.5px",fontSize:"15px",textDecoration:"none"},
            onChange: this.handleChange
        };
        const inputSupplierProps = {
            placeholder: 'Supplier Name',
            value:supplierValue,
            name:"supplierSearch",
            // className:"searchInput",
            className:" form-control btn btn-search",
            id:"add-icon-search",
            style: {position:"relative",border:"1px solid #d5dbe0",borderRadius:3,textAlign:"left",paddingLeft:"10%",paddingTop:6,height:"41.5px",fontSize:"15px",textDecoration:"none"},
            onChange: this.handleChange
        };
        const inputJobProps = {
            placeholder: 'Job Description',
            value:jobValue,
            name:"jobSearch",
            // className:"searchInput",
            className:" form-control btn btn-search",
            id:"add-icon-search",
            style: {position:"relative",border:"1px solid #d5dbe0",borderRadius:3,textAlign:"left",paddingLeft:"10%",paddingTop:6,height:"41.5px",fontSize:"15px",textDecoration:"none"},
            onChange: this.handleChange
        };
        console.log(open)
        
    return (        
        <div>
            <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center">
				<h1 class="page-header mb-0"><img src="assets/img/PurchaseOrders-ic-lg-green.svg" alt=""/> Purchase Orders</h1>
				<div class="topbarCtrls mt-3 mt-md-0">
                <Link to={`/PurchaseOrder`}>
                    <a href="#" class="btn ml-2" onClick={()=>{this.handlePOClick("PurchaseOrder",0)}}>
                        <span class="d-flex align-items-center text-left">
                            <img src="assets/img/PurchaseOrders-sm.svg" alt=""/>
                            <span class="ml-2"><b>New P.O.</b></span>
                        </span>
                    </a>
                    </Link>
				</div>
			</div>
            <div class="px-md-3 mt-3">
            <div class="bg-white px-3 py-3 my-3 cardShadow">
                <div class="row align-items-center">
                    <div class="col-md-12 col-lg-6 d-md-flex justify-content-between editCustSec">
                        <div>
                            <label>Open P.O.'s</label>
                            <h1>{openPoCount}</h1>
                            <div><a href="">View All</a></div>
                        </div>
                    </div>
                </div>
            </div>
                <div class="bg-white px-3 py-3 mt-2">
                    <form>
                        <h2>Select Purchase Order</h2>
                        <hr/>
                        <div class="row mt-3 align-items-center">
                            <div class="col-md-12">
                                <div class="row form-group">
                                    <div class="col-md-5 col-lg-5">
                                        <label><b>Status Levels</b></label>
                                        <div class="d-flex flex-wrap mt-2">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="open" 
                                                name="open" value={open} checked ={open===1?true:false}
                                                onChange={this.handleFilter}  />
                                                <label class="custom-control-label" for="open" >Open</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-3">
                                                <input type="checkbox" class="custom-control-input" id="draft"
                                                 onChange={this.handleFilter} value={draft} checked ={draft===1?true:false} />
                                                <label class="custom-control-label" for="draft">Draft</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-3">
                                                <input type="checkbox" class="custom-control-input" id="closed"
                                                 onChange={this.handleFilter} value={closed} checked ={closed===1?true:false} />
                                                <label class="custom-control-label" for="closed">Closed</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-0 ml-md-3 mt-2 mt-md-0">
                                                <input type="checkbox" class="custom-control-input" id="cancelled"
                                                 onChange={this.handleFilter} value={cancelled} checked ={cancelled===1?true:false} />
                                                <label class="custom-control-label" for="cancelled">Cancelled</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-7 col-lg-7">
                                        <label><b>Date Range</b></label>
                                        <div class="d-flex flex-wrap align-items-center">
                                            <div class="custom-control custom-radio">
                                                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" />
                                                <label class="custom-control-label" for="customRadio1">Last 7 Days</label>
                                            </div>
                                            <div class="custom-control custom-radio ml-3">
                                                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" />
                                                <label class="custom-control-label" for="customRadio2">Last 30 Days</label>
                                            </div>
                                            <div class="ml-3">
                                                {/* <DatePicker 
                                                // onChange={onChange} value={value} 
                                                /> */}
                                                <input type="date" className="dateDesign"  />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-4 col-lg-4">
                                        <label><b>Supplier</b></label>
                                        <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            <div className="searchInput" style={{height: "40px"}}>
                                            <Autosuggest
                                                    suggestions={this.state.supplierSuggestions}
                                                    onSuggestionsFetchRequested={this.onSupplierSuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={this.onSupplierSuggestionsClearRequested}
                                                    getSuggestionValue={getSupplierSuggestionValue}
                                                    renderSuggestion={this.renderSupplierSuggestion}
                                                    inputProps={inputSupplierProps}
                                                    theme={{suggestionsContainerOpen:this.state.supplierSuggestions.length>5?"yes":"no",suggestionsContainer:this.state.supplierSuggestions.length>5?"yes1":"no1",
                                                    suggestionsList:this.state.supplierSuggestions.length>5?"yes":"no1"}}
                                                    className="form-control"
                                                    style={{border:"1px solid #d5dbe0"}}    
                                                />
                                                </div>
                                            {/* <input type="text" class="form-control" id="supplierFilter"  onChange={this.handleFilert}  placeholder="Search Supplier Name/Number"/> */}
                                        </div>
                                    </div>
                                  
                                    <div class="col-md-4 col-lg-4 ">
                                        <label><b>Job Description</b></label>
                                        <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            <div className="searchInput" style={{height: "40px"}}>
                                            <Autosuggest
                                                    suggestions={this.state.jobSuggestions}
                                                    onSuggestionsFetchRequested={this.onJobSuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={this.onJobSuggestionsClearRequested}
                                                    getSuggestionValue={getJobSuggestionValue}
                                                    renderSuggestion={this.renderJobSuggestion}
                                                    inputProps={inputJobProps}
                                                    theme={{suggestionsContainerOpen:this.state.jobSuggestions.length>5?"yes":"no",suggestionsContainer:this.state.jobSuggestions.length>5?"yes1":"no1",
                                                    suggestionsList:this.state.jobSuggestions.length>5?"yes":"no1"}}
                                                    className="form-control"
                                                />
                                                
                                                </div>
                                            {/* <input type="text" class="form-control" id="jobDescription" onChange={this.handleFilert}  placeholder="Search Job Description"/> */}
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-lg-4 ">
                                        <label><b>Order#</b></label>
                                        <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            <div className="searchInput" style={{height: "40px"}}>
                                            <Autosuggest
                                                    suggestions={this.state.orderSuggestions}
                                                    onSuggestionsFetchRequested={this.onOrderSuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={this.onOrderSuggestionsClearRequested}
                                                    getSuggestionValue={getOrderSuggestionValue}
                                                    renderSuggestion={this.renderOrderSuggestion}
                                                    inputProps={inputOrderProps}
                                                    theme={{suggestionsContainerOpen:this.state.orderSuggestions.length>5?"yes":"no",suggestionsContainer:this.state.orderSuggestions.length>5?"yes1":"no1",
                                                    suggestionsList:this.state.orderSuggestions.length>5?"yes":"no1"}}
                                                    className="form-control"
                                                />
                                                </div>
                                            {/* <input type="text" class="form-control" id="order" onChange={this.handleFilert}  placeholder="Search Order"/> */}
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group mb-2">
                                    <div class="col-md-4 col-lg-4">
                                        <label><b>Search Plants or Products</b></label>
                                        <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            <div className="searchInput" style={{height: "40px"}}>
                                            <Autosuggest
                                                    suggestions={this.state.plantSuggestions}
                                                    onSuggestionsFetchRequested={this.onPlantSuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={this.onPlantSuggestionsClearRequested}
                                                    getSuggestionValue={getPlantSuggestionValue}
                                                    renderSuggestion={this.renderPlantSuggestion}
                                                    inputProps={inputPlantProps}
                                                    theme={{suggestionsContainerOpen:this.state.plantSuggestions.length>5?"yes":"no",suggestionsContainer:this.state.plantSuggestions.length>5?"yes1":"no1",
                                                    suggestionsList:this.state.plantSuggestions.length>5?"yes":"no1"}}
                                                    className="form-control"
                                                />
                                            </div>
                                            {/* <input type="text" class="form-control" placeholder="Search Plants or Products" id="plantProduct" onChange={this.handleFilert} /> */}
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-lg-4 ">
                                        <label><b>SKU</b></label>
                                        <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            <input type="text" class="form-control" id="sku" onChange={this.handleFilert}  placeholder="Search Plants or Products"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-lg-4 ">
                                        <label><b>Supplier Order#</b></label>
                                        <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            {/* <Autosuggest
                                                    suggestions={this.state.supplierOrderSuggestions}
                                                    onSuggestionsFetchRequested={this.onSupplierOrderSuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={this.onSupplierOrderSuggestionsClearRequested}
                                                    getSuggestionValue={getSupplierOrderSuggestionValue}
                                                    renderSuggestion={this.renderSupplierOrderSuggestion}
                                                    inputProps={inputSupplierOrderProps}
                                                    theme={{suggestionsContainerOpen:this.state.supplierOrderSuggestions.length>5?"yes":"no",suggestionsContainer:this.state.supplierOrderSuggestions.length>5?"yes1":"no1",
                                                    suggestionsList:this.state.supplierOrderSuggestions.length>5?"yes":"no1"}}
                                                    className="form-control"
                                                /> */}
                                            <input type="text" class="form-control" id="supplierOrder"  onChange={this.handleFilert}  placeholder="Search SKU"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-12 col-lg-12 text-right">
                                        <a href="#">Reset</a>
                                    </div>
                                </div>

                                
                                       <PurchaseOrderTable/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
}


const mapStateToProps = (state)=> (
    {
        purchaseOrderListData:state.purchaseOrderManagementData,
        path:state.purchaseOrderManagementData.path,
        poPageIndex:state.purchaseOrderManagementData.poPageIndex,
        plantData:state.plantData,
        supplierData:state.supplierData.supplierList,
        poBackup:state.purchaseOrderManagementData.purchaseOrderListBackup,
        completeStateData:state.purchaseOrderManagementData,
        selectedSupplier:state.purchaseOrderManagementData.selectedSupplier
    }
)


export default connect(mapStateToProps,{
    getAllPlantAction,getAllSuppliers,
    handlePurchaseOrderFilert,handlePoPageSelection,handlePOFilter,
    getPoSupplierFilter,getPoJobDescription,getPoOrderFilter,getPoPlantProductFilter,getPoSkuFilter,getSupplierOrderFilter
})(PurchaseOrders)