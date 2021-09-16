import React, { useState,useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';
import 'react-tabs/style/react-tabs.css';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import Autosuggest from 'react-autosuggest';
import TablePagination from '../Pagination/index';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import Loader from '../ProductManager/Loader'
import {
    //plant actions
   
     getAllPlantAction,

    

}from "../../actions/plantManagerAction";
import {getCustomerByIdQuote,getCustomerContacts,getcustomerAddress,getAllStatusMethods,deleteCustomer,getAllCustomer,handleExchangeData,getAllCustomerType,getCustomerById,setPageNumber,handleRadioFilter,handleSearchFilter,handleAplhabetFilter,typeOfActionShow} from "../../actions/customerSettingAction";
import {getQuoteList,addToquoteAPICall,filterHandleData,searchPlantProductAPI,updateQuoteData,handleInputChange,addNewQuote,addToQuoteUpdate} from "../../actions/quoteAction";
// import {resetFileds,filterInvoiceManagerData,deleteCustomer,getAllInvoice,handleExchangeData,getCustomerById,setPageNumber,handleSearchFilter,handleAplhabetFilter,typeOfActionShow} from "../../actions/invoiceAction";
import {setPlantPageNumber,resetFileds,getLocationList,getCategoryList,getPlantList,getFilterResult,getAllPlants,filterPlantManagerData} from "../../actions/inventoryManagementAction";


 function QuoteAndOrdersManagement(props) {
    const [value, onChange] = useState(new Date());
    const [plantNameValue,setPlantNameValue] =useState("")
    const [plantSKUValue,setPlantSKUValue] =useState("")
    const [loading,setLoading] = useState(true)
    const [searchPalntId,setSearchPalntId] = useState([])
    const [plantId,setPlantId] = useState([])
    const [customerSelected,setCustomerSelected] = useState(false)
    const [customerDetails,setCustomerDetails] = useState({

    })
    const [searchData,setSearchData] = useState([])
    const [searchDataDuplicate,setSearchDataduplcaite] = useState([])

    const [plantFilterIds,setPlantFilterIds] = useState({sku_code:"",genus:""})
    const[suggestions,setSuggestions] = useState([])
   
    useEffect (()=>{
        props.getAllCustomer()
        props.getAllCustomerType()
        props.getLocationList()   
        props.getCategoryList()
        // if(loading){
        props.searchPlantProductAPI().then(data=>{
            // alert("ff")
            // //console.log(data.data)
            getAllData(data.data)
            // setLoading(false)
            // alert("Dsa")
        })
    // }
// if(loading){



        // this.props.getAllSupplierAction()
   

    },[value])

const getAllData = (data)=>{
    setSearchData(data)
    setSearchDataduplcaite(data)
  
            let plantIdsAll = data.map(plantData=>plantData.plant_id)
        let plantId = plantIdsAll.filter(function( plant, index, array ) {
            // alert("FDs")
            return array.indexOf(plant) === index;
        });
        // console.log(plantId, plantId)
        setPlantId(plantId)
        setLoading(false)
    }
   
    // setSearchData(searchList)

// }

    const getFilterData = (id,value)=>{
        let filterIds = plantFilterIds
        filterIds[id] = value
        let filterData =  searchDataDuplicate.filter(product =>{
            let notFoundCount = 0 
            Object.keys(filterIds).map(id=>{
                if(filterIds[id] !=="All" && filterIds[id] !==""){
                    if((id ==="sku_code" || id ==="genus")  && product[id].toLowerCase().includes(filterIds[id].toLowerCase())){

                    }
                    else if(parseInt(product[id]) === parseInt(filterIds[id])){
                    }else notFoundCount++
                }
            })
            if(notFoundCount ===0)return product

        })
        //console.log(filterData)
        setSearchData(filterData)
        setPlantFilterIds(filterIds)
        // searchList:filterData,
        // plantFilterIds:filterIds

    }
    const handleCustomerData =(e)=>{
        // alert(e.target.value)
        if(e.target.id =="customer_id"){
            // // //console.log(customerDataById1)
            props.getCustomerByIdQuote(e.target.value).then(data=>{
                //console.log(customerDataById1)
                // props.updateQuoteData(customerDataById1)
            })
            props.getAllCustomerType()
            props.getAllStatusMethods()
            // props.getCustomerContacts(e.target.value)
            // props.getcustomerAddress(e.target.value)
            props.handleInputChange(e.target.id,e.target.value)

        }else if(e.target.id =="discount_by_line_item"){
            let val = e.target.value==0?1:0
            props.handleInputChange(e.target.id,val)

        }else if(e.target.id =="show_pricing_op"){
            let val = e.target.value==0?1:0
            props.handleInputChange(e.target.id,val)

            
        }
        else if(e.target.id =="flag_as_reminder"){
            let val = e.target.value==0?1:0
            props.handleInputChange(e.target.id,val)

            
        }
        else{
            props.handleInputChange(e.target.id,e.target.value)
        }

        // props.getAllTermsMethods()
        // props.getAllReasonMethods()
 

    }
    const handleSave = (e)=>{
        e.preventDefault();

        props.addNewQuote(quoteDetails).then(data=>{
            setCustomerSelected(true)
        })

    }
    const handleUpdate = ()=>{
        // //console.log(customerDataById1)
        // //console.log(quoteDetails)
        // let id = quoteDetails.id
        // let combineData = {...quoteDetails,...customerDataById1,id:id}
        // //console.log(combineData)

        props.addToQuoteUpdate(quoteDetails)

    }
 
  
    //console.log(searchData)
    // source:"",
    // ordered_by:"",
    // bill_to:"",
    // purchase_order:"",
    // requested_date:"",
    // requested_time:"AM",
    // currency:"",
    // email_to:"",
    // job_description:"",
    // units:"",
    // discount:"0.00",
    // discount_by_line_item:1,
    // archive_quote_timeframe:"",
    // show_pricing_op:"",
    // flag_as_reminder:"0",
    // order_notes:"",
    // status:"1",
    // customer_id: "",
    // quote_no: "",
    // quote_status: "",
    // pricing_year: "",
    // amount: null,
    //sku searchList
    const onSuggestionsFetchRequested1 = ({ value }) =>{
        // alert(value.length)
       setSuggestions(getSuggestions1(value))
        // this.setState({suggestions: this.getSuggestions(value),show:this.getSuggestions(value).length>3?1:0});
    }

    const onSuggestionsClearRequested1 = () =>  setSuggestions([])
    // const customerHandle  =(e)=>{
    //     //console.log(e.target.value,e.target.id)
    //     if(e.target.id =="discount_by_line_item"){
    //         let value = e.target.value ==0?true:false
    //         props.handleExchangeData(value,e.target.id,"customerDataById1")

    //     }else
    //     props.handleExchangeData(e.target.value,e.target.id,"customerDataById1")
        
    // }
    const getSuggestions1 = (value,type) => {
        const inputValue = value.toLowerCase().trim()
        const inputLength = inputValue.length;
        let result = searchList.reduce((unique, o) => {
            if(!unique.some(obj => obj.sku_code === o.sku_code)) {
              unique.push(o);
            }
            return unique;
        },[]);
        return inputLength === 0 ? [] :  result.filter(lang =>lang.sku_code.toLowerCase().includes(inputValue))      
    };
   const getSuggestionValue1 = suggestion =>suggestion.sku_code

   const renderSuggestion1 = suggestion => (<span>{suggestion.sku_code}</span>);

   const onChange2 = (e, { newValue }) => {
        // this.setState({plantNameValue:newValue});
        setPlantNameValue(newValue)
        getFilterData("sku_code",newValue)  
        // let plantName = {}
        // plantName.plant_search =newValue
        // props.searchPlantProductAPI(plantName)    
    };

    ///sku end

    const onSuggestionsFetchRequested = ({ value }) =>{
        // alert(value.length)
       setSuggestions(getSuggestions(value))
        // this.setState({suggestions: this.getSuggestions(value),show:this.getSuggestions(value).length>3?1:0});
    }

    const onSuggestionsClearRequested = () =>  setSuggestions([])
    const customerHandle  =(e)=>{
        //console.log(e.target.value,e.target.id)
        if(e.target.id =="discount_by_line_item"){
            let value = e.target.value ==0?true:false
            props.handleExchangeData(value,e.target.id,"customerDataById1")

        }else
        props.handleExchangeData(e.target.value,e.target.id,"customerDataById1")
        
    }
    const getSuggestions = (value,type) => {
        const inputValue = value.toLowerCase().trim()
        const inputLength = inputValue.length;
        let result = searchList.reduce((unique, o) => {
            if(!unique.some(obj => obj.genus === o.genus)) {
              unique.push(o);
            }
            return unique;
        },[]);
        return inputLength === 0 ? [] :  result.filter(lang =>lang.genus.toLowerCase().includes(inputValue))      
    };
   const getSuggestionValue = suggestion =>suggestion.genus

   const renderSuggestion = suggestion => (<span>{suggestion.genus}</span>);

   const onChange1 = (e, { newValue }) => {
        // this.setState({plantNameValue:newValue});
        setPlantNameValue(newValue)
        getFilterData("genus",newValue)  
        // let plantName = {}
        // plantName.plant_search =newValue
        // props.searchPlantProductAPI(plantName)    
    };
    const changeData = (id)=>{
        // alert(id)
        if(id ==2){
            // alert("D")
            props.getQuoteList(quoteDetails.id).then(data=>{
                // alert(JSON.stringify(data))
                let plantIdsAll = data.data.items.map(plantData=>plantData.plant_id)
                let plantId4 = plantIdsAll.filter(function( plant, index, array ) {
                    // alert("FDs")
                    return array.indexOf(plant) === index;
                });
                setSearchPalntId(plantId4)
            })
         
            // quoteList
            // alert("FDS")
     

        }

        
    }
    const addToPlant = (e)=>{
        // alert(e.target.id)
        // let search = searchData
        let filterData1 = searchData.filter(data=>data.sku_code===e.target.id)
        // console.log(filterData1.plant_id)
        let obj = {}
        let obj1 = {}
        let arr  = []
        obj.type ="plant"
        let skuSplit = filterData1[0].sku_code.split("-")
        obj1["plant_id"]=parseInt(skuSplit[0])
        obj1.name=filterData1[0].plant_name
        obj1.size=filterData1[0].plant_size
        obj1.SKU=filterData1[0].sku_code
        obj1.price=filterData1[0].sale_price
        obj1.volume_rate=filterData1[0].volume_price_per_unit
        obj1.disc_percent=filterData1[0].discount
        obj1.qty=filterData1[0].volume_quantity
        // console.log(obj1)
        arr[0] = obj1
        obj.items = arr


        console.log(filterData1)
        props.addToquoteAPICall(quoteDetails.id,obj)
        let filterData = searchData.filter(data=>data.sku_code!==e.target.id)
        setSearchData(filterData)
      
       console.log(filterData1)
    //     console.log(searchData[e.target.id])

    }
    const inputPropsPlant = {
        placeholder: 'Plant Name',
        value:plantNameValue,
        className:" form-control  btn btn-search ",
        id:"genus",
        style: {border:"1px solid gray",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:8,height:"41.5px",fontSize:"15px",textDecoration:"none",fontWeight:"380"},
        onChange: onChange1,
        dataId: 'my-data-id',
    };
    const inputPropsSKU = {
        placeholder: 'Plant Name',
        value:plantSKUValue,
        className:" form-control  btn btn-search ",
        id:"genus",
        style: {border:"1px solid gray",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:8,height:"41.5px",fontSize:"15px",textDecoration:"none",fontWeight:"380"},
        onChange: onChange2,
        dataId: 'my-data-id',
    };
    const changeDataValue  = (e)=>{
        let result = e.target.id
        // alert(result)
        let value = result.split("^")
        // alert(e.target.value)
        let searchData1 = searchData
        let data  =searchData1.map((seacrh,index)=>{
            if(seacrh.sku_code == value[0]){
                let searchObj = seacrh
                searchObj[value[1]] = e.target.value
                searchData1[index] = searchObj

            }
            return seacrh
        })
        console.log(data)
        setSearchData(data)

    }
    const {deleteCustomer,customerReasonList,customerDataById1,customerTypeList,action,customerStatusList,customerTermList,customerContact,customerContactList,customerAddress,customerAddressList} = props.customerData
    const {quoteDetails,searchList,searchListDuplicate,quoteList} = props.QuoteReducerData
    console.log(quoteList)
    // const {plantData,plantFilterIds,plantPageNumber} =props.plantData
 
    return (
        <div>
            <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center">
				<h1 class="page-header mb-0 d-flex flex-md-nowrap align-items-center"><img src="assets/img/customerQuotesAndOrders-lg-green.svg" alt="" class="mr-2"/> New Customer Quote <span class="text-green ml-3">#{quoteDetails.quote_no}</span></h1>
				<div class="topbarCtrls mt-3 mt-md-0">
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
                </div>
			</div>
          

            <div class="px-md-3 mt-3">
                <div class="px-3 py-3 mb-3 bg-white cardShadow">
                    <div class="row align-items-center purchaseOrderTabHead">
                        <div class="col-md-6 d-flex align-items-center">
                            <span className="stsBadge stsQuote" style={{fontSize:32}}>Quote</span>
                            <div class="d-flex ml-3 mb-0 bdrLeft">
                                <div class="">
                                    <img src="assets/img/date-ic-sm-green.svg" alt=""/>
                                    <span class="ml-2">{new Date().toDateString()}</span>
                                </div>
                                <div class="ml-3">
                                    <img src="assets/img/price-ic-sm-green.svg" alt=""/>
                                    <span class="ml-2">CA <b>$0</b></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 d-flex flex-wrap justify-content-md-end  align-items-center">
                            <span class="mr-2 text-grey-darker f-s-14">Last Saved on 24/05/2020  12:23</span>
                            <a href="" class="ml-2"><img src="assets/img/copy-ic.svg" alt=""/></a>
                            {/* <a href="" class="ml-2"><img src="assets/img/plant-btn-blue.svg" alt=""/></a>
                            <a href="" class="ml-2"><img src="assets/img/dig-btn-blue.svg" alt=""/></a>
                            <a href="" class="ml-2"><img src="assets/img/order-list-btn-blue.svg" alt=""/></a> 
                            <a href="" class="ml-2"><img src="assets/img/times-btn-red.svg" alt=""/></a>*/}
                            <a href="" class="ml-2"><img src="assets/img/toggle-btn.svg" alt=""/></a>
                            <div class="d-flex align-items-center flex-wrap ml-3">Active
                                
                                <div class="switcher switcher-sm ml-2 pr-2">
                                    <input type="checkbox" name="quoteactivetoggle" id="quoteactivetoggle" value="2" />
                                    <label for="quoteactivetoggle"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="">
                <Tabs onSelect={changeData} forceRenderTabPanel={true}>
                    <TabList >
                        <Tab  eventKey="0">Quote Details</Tab>
                        <Tab  eventKey="1" disabled={customerSelected?false:true} style={{backgroundColor:customerSelected?"white":"lightgray"}}>Add to Quote</Tab>
                        <Tab  eventKey="2" disabled={customerSelected?false:true} style={{backgroundColor:customerSelected?"white":"lightgray"}}>Current Quote <span class="badge badge-pill badge-success">{quoteList.items.length}</span></Tab>
                        <Tab  eventKey="3" disabled={customerSelected?false:true} style={{backgroundColor:customerSelected?"white":"lightgray"}}>Order History</Tab>
                        <Tab  eventKey="4" disabled={customerSelected?false:true} style={{backgroundColor:customerSelected?"white":"lightgray"}}>Notes</Tab>    
                    </TabList>
                    <TabPanel>
                        <div class="bg-white px-3 py-3">
                            {/* <form> */}
                                <h2>Quote Details</h2>
                                <hr/>
                                <div class="px-3 py-3 bg-grey-transparent-2">
                                    <div class="row ">
                                        <div class="col-md-12">
                                            <h3>{customerDataById1.name}</h3>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-md-4 col-lg-6">
                                            <div class="row ">
                                                <div class="col-md-1 col-lg-2 text-md-right">
                                                    <b>Type:</b>
                                                </div>
                                                <div class="col-md-10">
                                                    <span className="textGrey"><b>{
                                                        customerDataById1.type.map(type=>{
                                                            return customerTypeList.active.map(typeId=>{
                                                                if(parseInt(typeId.id)==parseInt(type)) 
                                                                return(<span>{typeId.customer_type}</span>)
                                                            })
                                                          
                                                           
                                                        })
                                                        }</b></span>
                                                </div>
                                            </div>
                                            <div class="row ">
                                                <div class="col-md-1 col-lg-2 text-md-right">
                                                    <b>Tax Exempt:</b>
                                                </div>
                                                <div class="col-md-10">
                                                    <span className="textGrey"><b>{customerDataById1.tax_exempt ==1?"Yes":"No"}</b></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-lg-2">
                                            <div>
                                                <div ><b class="mr-3">Terms:</b><span className="textGrey"><b>{customerDataById1.payment_terms}</b></span></div>
                                                <div class="mt-1"><b class="mr-3">Status:</b><span class="label bg-green f-s-14"><i class="fas fa-crown mr-2"></i>VIP</span></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 text-md-right mt-3 mt-md-0">
                                            <div>
                                                <div><b class="mr-3">Source:</b><span className="textGrey"><b>Internal</b></span></div>
                                                <div class="mt-1"><b class="mr-3">Price Year:</b><span className="textGrey"><b>2020</b></span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-3 col-lg-3">
                                                <label>Ordered By <span class="text-danger">*</span></label>
                                                <select class="form-control" onChange={handleCustomerData} disabled={customerSelected?true:false} id="customer_id">
                                                    <option value={0}>Select</option>
                                                    {
                                                        props.customerData.customerList.map(customer=>{
                                                            return(<option value={customer.id} selected={quoteDetails.ordered_by ==customer.id?"selected":""}>{customer.name}</option>)
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div class="col-md-3 col-lg-3">
                                                <label>Pricing Year <span class="text-danger">*</span></label>
                                                <select class="form-control" onChange={handleCustomerData} disabled={customerSelected?true:false} id="pricing_year">
                                                    <option selected={quoteDetails.pricing_year ==new Date().getFullYear()?"selected":""} value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                                                    <option selected={quoteDetails.pricing_year ==new Date().getFullYear()+1?"selected":""}  value={new Date().getFullYear()+1}>{new Date().getFullYear()+1}</option>
                                                </select>
                                            </div>
                                </div>
                                <div class="row mt-3">
                                    {/* <div class="col-md-12 col-lg-5 col-xl-5"> */}
                                    {/* <div class="row "> */}
                                     
                                        
                                            <div class="col-md-3 col-lg-3">
                                                <label>Bill To <span class="text-danger">*</span></label>
                                                
                                                <select class="form-control" disabled={customerSelected?false:true} id="bill_to" onChange={handleCustomerData} >
                                                <option>Select Address</option>
                                                    {quoteDetails.customeraddress.map(address=>{
                                                      
                                                        return( <option value={address.id} id={address.id} selected={quoteDetails.bill_to==address.id?"selected":""}>{address.city} {address.country} {address.zip}</option>)
                                                    })}
                                                    {/* <option>1234 Main St, Waterdown </option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option> */}
                                                </select>
                                            </div>
                                            <div class="col-md-3 col-lg-3">
                                                <label>PO #</label>
                                                <input type="text" class="form-control" placeholder="" value={quoteDetails.purchase_order} disabled={quoteDetails.p_o_req==1?false:true} onChange={handleCustomerData} ></input>
                                            </div>
                                            <div class="col-md-3 col-lg-3">
                                                <label  style={{display: "block"}}>Requested Time</label>
                                                <select class="form-control" disabled={customerSelected?false:true} id="requested_time" onChange={handleCustomerData} >
                                                    <option value="AM" value={quoteDetails.requested_time=="AM"?"selected":""}>AM</option>
                                                    <option value="PM" value={quoteDetails.requested_time=="PM"?"selected":""}>PM</option>
                                                </select>
                                            </div>
                                           
                                        {/* </div> */}
                                    {/* </div> */}
                                    {/* <div class="col-md-12 col-lg-7 col-xl-7"> */}
                                        {/* <div class="row"> */}
                                        
                                            <div class="col-md-3 col-lg-3">
                                            <label>Requsted Date</label>
                                                <input type="date" class="form-control" placeholder="" disabled={customerSelected?false:true} value={quoteDetails.requested_date} onChange={handleCustomerData} id="requested_date"></input>
                                            </div>
                                      
                                        {/* </div> */}
                                    {/* </div> */}
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-6 col-xl-6">
                                        <div class="row ">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Currency</label>
                                                <select class="form-control" disabled={customerSelected?false:true} onChange={handleCustomerData} id="currency">
                                                    <option value={"Canadian Doller"} selected={quoteDetails.currency=="Canadian Doller"?"selected":""}>Canadian Doller</option>
                                                    <option value={"U.S Doller"} selected={quoteDetails.currency=="U.S Doller"?"selected":""}>U.S Doller</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6 col-lg-6">
                                                <label>Email To</label>
                                                <input type="text" class="form-control" placeholder="" value={quoteDetails.email_to} disabled={customerSelected?false:true} id="email_to" onChange={handleCustomerData}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-lg-6 col-xl-6">
                                        <label>Job Description</label>
                                        <input type="text" class="form-control" placeholder="" disabled={customerSelected?false:true} value={quoteDetails.job_description} id="job_description" onChange={handleCustomerData}></input>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-6 col-xl-6">
                                        <div class="row ">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Units</label>
                                                <select class="form-control" disabled={customerSelected?false:true} onChange={handleCustomerData} id="units">
                                                    <option value={"Metric"} selected={ quoteDetails.units=="Metric"?"selected":""}>Metric</option>
                                                    <option value={"Imperial"} selected={quoteDetails.units =="Imperial"?"selected":""}>Imperial</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6 col-lg-6">
                                                <label>Discount</label>
                                                <input type="text" class="form-control text-right" placeholder="0.00" value={quoteDetails.discount} disabled={customerSelected?false:true} onChange={handleCustomerData} id="discount"/>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div class="col-md-12 col-lg-7 col-xl-7 pt-md-4 mt-3">
                                        <a href="">Reset</a>
                                    </div> */}
                                    <div class="col-md-12 col-lg-6 col-xl-6">
                                        <div class="row">
                                            <div class="col-md-6 col-lg-4">
                                                <label>Discount by Line item</label>
                                                <div class="d-flex align-items-center flex-wrap mt-2">Off
                                                    <div class="switcher switcher-sm ml-2 pr-2">
                                                        <input type="checkbox" name="discount_by_line_item" id="discount_by_line_item"  value={quoteDetails.discount_by_line_item} disabled={customerSelected?false:true} checked={quoteDetails.discount_by_line_item==1?true:false} onChange={handleCustomerData}/>
                                                        <label for="discount_by_line_item"></label>
                                                    </div> On
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-lg-8 mt-3 mt-md-0">
                                                <label class="mr-2 mr-md-0">Archive Quote Time Frame</label>
                                                <div class="row">
                                                    <div class="col-md-6 col-lg-4 mr-2 mr-md-0">
                                                        <input type="number" class="form-control" placeholder="30 Day" id="archive_quote_timeframe" disabled={customerSelected?false:true} value={quoteDetails.archive_quote_timeframe} onChange={handleCustomerData}></input>
                                                    </div>
                                                    <div class="col-md-6 col-lg-4 mt-3 mt-md-0">
                                                        <span class="textGrey" style={{fontSize: 16}}>23 Days Left</span>
                                                    </div>
                                                    <div class="col-md-6 col-lg-4 mt-3 mt-md-0">
                                                        <a href="">Reset</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-5 col-xl-5">
                                        <div class="row">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Show Pricing on Output</label>
                                                <div class="d-flex align-items-center flex-wrap mt-2">Off
                                                    <div class="switcher switcher-sm ml-2 pr-2">
                                                        <input type="checkbox" name="show_pricing_op" id="show_pricing_op" checked={quoteDetails.show_pricing_op==1?"checked":""} value={quoteDetails.show_pricing_op} disabled={customerSelected?false:true} onChange={handleCustomerData}/>
                                                        <label for="show_pricing_op"></label>
                                                    </div> On
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-lg-6">
                                                <label>Flag as Reminder</label>
                                                <div class="d-flex align-items-center flex-wrap mt-2">No
                                                    <div class="switcher switcher-sm ml-2 pr-2" style={{color:"#ff0000"}} >
                                                        <input type="checkbox" name="flag_as_reminder" id="flag_as_reminder" checked={quoteDetails.flag_as_reminder==1?"checked":""} style={{color:"#ff0000"}} value={quoteDetails.flag_as_reminder} disabled={customerSelected?false:true} onChange={handleCustomerData}/>
                                                        <label for="flag_as_reminder"></label>
                                                    </div> Yes
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-12 mt-2 mt-md-0">
                                        <label>Order Notes <small style={{color: "#808080"}}>(Internal Only)</small></label>
                                        <textarea class="form-control" disabled={customerSelected?false:true} id="order_notes" value={quoteDetails.order_notes} onChange={handleCustomerData}></textarea>
                                    </div>
                                    <div style={{float:"left",width:"100%",marginBottom:4,paddingRight:10}}>
                                    <button className="btn btn-primary btn-lg ml-3"  style={{width:100,float:"right",marginTop:10}} onClick={customerSelected?handleUpdate:handleSave}>{customerSelected?"Update":"Add"}</button>
                                    </div>
                                   
                                </div>
                                
                            {/* </form> */}
                          
                        </div>
                       
                    </TabPanel>
                    <TabPanel>
                        <div class="bg-white px-3 py-3 mt-2">
                            <form>
                                <h2>Add to this Quote</h2>
                                <hr/>
                                <div class="row mt-3 align-items-center">
                                    <div class="col-md-12">
                                        <div class="row form-group">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Plant and Product Search</label>
                                                <div class="searchInput">
                                                <button type="submit" className="btn btn-search" style={{marginTop:"2%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button>
                                                <Autosuggest
                                                    suggestions={suggestions}
                                                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                                                    getSuggestionValue={getSuggestionValue}
                                                    renderSuggestion={renderSuggestion}
                                                    inputProps={inputPropsPlant}
                                                  
                                                />
                                                    {/* <button type="submit" class="btn btn-search">
                                                        <img src="assets/img/search.svg" alt=""/>
                                                    </button>
                                                    <input type="text" class="form-control" placeholder=""/> */}
                                                </div>
                                                <div class="row mt-3 align-items-center" >
                                                    <div class="col-md-12 d-flex" style={{marginTop:"35px"}}>
                                                        <div class="custom-control custom-radio">
                                                            <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" />
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
                                                <button type="submit" className="btn btn-search" style={{marginTop:"2%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button>
                                                <Autosuggest
                                                    suggestions={suggestions}
                                                    onSuggestionsFetchRequested={onSuggestionsFetchRequested1}
                                                    onSuggestionsClearRequested={onSuggestionsClearRequested1}
                                                    getSuggestionValue={getSuggestionValue1}
                                                    renderSuggestion={renderSuggestion1}
                                                    inputProps={inputPropsSKU}
                                                  
                                                />
                                                    {/* <button type="submit" class="btn btn-search">
                                                        <img src="assets/img/search.svg" alt=""/>
                                                    </button>
                                                    <input type="text" class="form-control" placeholder=""/> */}
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
                                        <div class="form-group row">
                                            <div class="col-md-12 table-responsive">
                                                <table class="table table-striped mb-0" border="0" width="100%">
                                                    <thead>
                                                        <tr>
                                                            <th  width="6%">SKU</th>
                                                            <th width="6%" class="text-center">Size</th>
                                                            <th width="6%" class="text-center">On Hand</th>
                                                            <th width="6%" class="text-center">Customer Orders</th>
                                                            <th width="8%" class="text-center">Current <br/>Available</th>
                                                            <th width="6%" class="text-center">On Quotes</th>
                                                            <th width="6%" class="text-center">Open POS</th>
                                                            <th width="8%" class="text-center">Future <br/>Available</th>
                                                            <th width="6%" class="text-center">Price</th>
                                                            <th width="6%" class="text-center">Volume<br/>
Rate</th>
                                                            <th width="6%" class="text-center">Dis%</th>
                                                            <th width="6%" class="text-center">Qty</th>
                                                            <th width="4%" class="text-center"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {loading?  <div style={{height: "300px",lineHeight: "300px",textAlign: "center",backgroundColor:"white",width:"100%"}}><Loader/></div>:<tr>
                                                    {/* searchPalntId */}
                                                            <td colspan="13" class="p-0">
                                                                <table class="table table-striped mb-0" border="0" width="100%">
                                                                {plantId.map((plantId,index1)=>{
                                                        //console.log(JSON.parse(plantId))
                                                       let count =0
                                                            return searchData.map((plant,index)=>{
                                                                {/* console.log(index) */}
                                                             
                                                                if(JSON.parse(plantId)===parseInt(plant["plant_id"])){
                                                                
                                                                    let a = count++
                                                                    return(
                                                                        <div>
                                                    
                                                   { a ==0?<tr class="tblLinks" style={{backgroundColor:"gray"}}>
                                                                        <td colspan="13" style={{backgroundColor:"#f2f2f2"}}>

                                                                            <a href="">{plant.plant_name!==null?plant.plant_name:"No Name"}</a>
                                                                        </td>
                                                                    </tr>:""}
                                                                    <tr>
                                                                        <td width="6%">
                                                                            <a href="">{plant.sku_code}</a>
                                                                        </td>
                                                                       
                                                                        <td class="text-center" width="6%"><a href="" style={{width:"50px"}}>{plant.size}</a></td>
                                                                        <td class="text-center" width="6%">{plant.on_hand}</td>
                                                                        <td class="text-center" width="6%">{plant.customer_orders}</td>
                                                                        <td class="text-center" width="8%"><b class="f-s-20">{plant.current_available}</b></td>
                                                                        <td class="text-center" width="6%">{plant.on_quotes}</td>
                                                                        <td class="text-center" width="6%">{plant.open_pos}</td>
                                                                        <td class="text-center" width="8%"><b class="f-s-20">{plant.future_availability}</b></td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value={plant.sale_price} id={plant.sku_code+"^sale_price"} onChange={changeDataValue}/> 
                                                                            <div>
                                                                                <span class="text-green">3.18</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value={plant.volume_price_per_unit} id={plant.sku_code+"^volume_price_per_unit"} onChange={changeDataValue}/>
                                                                            <div>
                                                                                <span class="text-green">3.07</span>
                                                                            </div>   
                                                                            <div>
                                                                                <span class="text-red">25 Min</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder=""  value={quoteDetails.discount} id={plant.sku_code+"^discount"} onChange={changeDataValue}/>
                                                                        </td>
                                                                        <td class="text-center" width="6%" >
                                                                            <div class="d-flex align-items-center">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value={plant.volume_quantity} id={plant.sku_code+"^volume_quantity"} onChange={changeDataValue}/>
                                                                            </div>
                                                                            <div>
                                                                                <span class="text-red">Short 4</span>
                                                                            </div>
                                                                        </td>
                                                                        
                                                                        <td class="text-center" width="4%">
                                                                            <a  class="ml-2" onClick={addToPlant} id={plant.sku_code} style={{cursor: 'pointer'}}>
                                                                                <img src="assets/img/tbl-plus-ic.svg" alt=""  onClick={addToPlant} id={plant.sku_code} />
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                    {/* <tr >
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
                                                    </tr> */}
                                                    </div>

                                                    )

                                                        
                                                               
                                                            }   
                                                        })

                                                       
                                                    
                                                    })}
                                                        
                                              
                                                                </table>
                                                            </td>
                                                        </tr>}
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
                    </TabPanel>
                    <TabPanel>
                    <div class="bg-white px-3 py-3 mt-2">
                            <form>
                            <div class="row">
                                    <div class="col-md-8">
                                        <h2>Currently on this Quote</h2>
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
                                <div class="row mt-3 align-items-center">
                                    <div class="col-md-12">
                                        
                                        <div class="form-group row">
                                            <div class="col-md-12 table-responsive">
                                                <table class="table table-striped purchaseOdrTbl" width="100%">
                                                    <thead>
                                                        <tr>
                                                            <th width="3%" class="">No</th>
                                                            
                                                            <th width="33%" class="">Plant Name/Original SKU</th>
                                                            <th width="8%" class="text-center">Size</th>
                                                            <th width="8%" class="text-center">Added</th>
                                                            
                                                            <th width="8%" class="text-center">Disc %</th>
                                                            <th width="8%" class="text-center">QTY</th>
                                                            <th width="8%" class="text-center">Each Price</th>
                                                            <th width="8%" class="text-center">Total</th>
                                                            <th width="8%" class="text-center">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="12" class="p-0">
                                                                <table class="table table-striped mb-0" border="0" width="100%">
                                                                {searchPalntId.map((plantId,index1)=>{
                                                        //console.log(JSON.parse(plantId))
                                                       let count =0
                                                                 
                                                                       return quoteList.items.map((data,index)=>{
                                                                        if(JSON.parse(plantId)===parseInt(data["plant_id"])){
                                                                            let a = count++
                                                                           return(<> { a ==0?        <td colspan="12">
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <a href="" class="mr-3">
                                                                                        <i class="fas fa-expand-arrows-alt text-dark"></i>
                                                                                    </a>
                                                                                    <strong>{data.plant_name}</strong>
                                                                                </div>
                                                                                <div class="col-md-6 text-right">
                                                                                    
                                                                                    <a href="#" class="">
                                                                                        <img src="assets/img/close-ic-grey.svg" alt=""/>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </td>:""}
                                                                    <tr class="tblBgWhite">
                                                                        <table class="table table-striped table-no-border mb-0" border="0" width="100%">
                                                                            <tr class="topTitleRow">
                                                                                <td width="3%" class="pt-2">4</td>
                                                                                <td width="97%" colspan="8" class="pt-2">
                                                                                   {data.SKU}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="3%">
                                                                                    
                                                                                </td>
                                                                                
                                                                                <td width="35%">
                                                                                    <select class="form-control plantNameSel">
                                                                                        <option>43-TF-30-1G</option>
                                                                                        <option>Option 1</option>
                                                                                        <option>Option 2</option>
                                                                                    </select>
                                                                                </td>
                                                                                <td width="10%" class="text-center">{data.size}</td>
                                                                                <td width="8%" class="text-center">{new Date().toDateString()}</td>
                                                                                
                                                                                <td width="9%" class="text-right">
                                                                                    <input type="text" class="form-control  text-right mx-auto" placeholder="" value={data.disc_percent}/>
                                                                                </td>
                                                                                <td width="9%" class="text-right">
                                                                                    <input type="text" class="form-control  text-right mx-auto" placeholder="" value={data.qty}/>
                                                                                    <div class="">
                                                                                        <span class="text-green">21</span>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="9%" >
                                                                                    <input type="text" class="form-control  text-right mx-auto" placeholder="" value={data.price}/>
                                                                                    <div class="">
                                                                                        <span class="text-red">12min </span>
                                                                                        <span class="text-green text-right mx-auto">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;21</span>
                                                                                    </div>
                                                                                    
                                                                                </td>
                                                                                <td width="8%" class="text-right">
                                                                                    <span class="text-success controlLabel text-right">{data.item_total}</span>
                                                                                    <div class="">
                                                                                        <span class="text-green">8.25</span>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="" class="text-center actionTd">
                                                                                    <div class="d-flex justify-content-center">
                                                                                        <a href="#" class="">
                                                                                            <img src="assets/img/copy-ic-blue.svg" alt=""/>
                                                                                        </a>
                                                                                        <div class="dropdown actionDropdown  ml-2">
                                                                                            <a href="#" class="dropdown-toggle" id="actionDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                                <i class="fas fa-ellipsis-v"></i>
                                                                                            </a>
                                                                                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="actionDropdown">
                                                                                                <a href="#" class="dropdown-item splitBg" type="button"><span><img src="assets/img/split-ic.svg"/></span> Split</a>
                                                                                                <a href="#" class="dropdown-item substituteBg" type="button"><span><img src="assets/img/substitute-ic.svg"/></span> Substitute</a>
                                                                                                <a href="#" class="dropdown-item deleteBg" type="button"><span><img src="assets/img/delete-ic.svg"/></span> Delete</a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </tr>
                                                                   
                                           </>)}

                                                                       })
                                                                })}

                                                                    
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
                                                            <label >Item Subtotal <span>$</span></label>
                                                        </div>
                                                        <div class="col-md-2 text-right">
                                                            <label >{quoteList.order["total"]}</label>
                                                        </div>
                                                    </div>
                                                    {/* <div class="row">
                                                        <div class="col-md-8 text-right">
                                                            <label >Hang Tags and Pot Labels <span>$</span></label>
                                                        </div>
                                                        <div class="col-md-2 text-right">
                                                            <label >8.75</label>
                                                        </div>
                                                    </div> */}
                                                    <div class="row subTotLbl">
                                                        <div class="col-md-8 text-right">
                                                            <label >Discounts <span>$</span></label>
                                                        </div>
                                                        <div class="col-md-2 text-right">
                                                            <label >{quoteList.order["discount"]}</label>
                                                        </div>
                                                    </div>
                                                    <div class="row subTotLbl text-green">
                                                        <div class="col-md-8 text-right">
                                                            <label class="text-uppercase">Subtotal after Discounts <span>$</span></label>
                                                        </div>
                                                        <div class="col-md-2 text-right">
                                                            <label class="f-s-24">{quoteList.order["subtotal"]}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="bg-white px-3 py-3 mt-2">
                            <form>
                                <h2>Sales Order History</h2>
                                <hr/>
                                <div class="row">
                                    <div class="col-md-12 table-responsive">
                                        <table class="table table-striped table-td-valign-middle" width="100%">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Action</th>
                                                    <th class="text-center">Source</th>
                                                    <th class="text-center">Item</th>
                                                    <th class="text-center">Timestamp</th>
                                                </tr>
                                            </thead>
                                            {/* <tbody> */}

                                            {searchPalntId.map((plantId,index1)=>{
                                                        //console.log(JSON.parse(plantId))
                                                       let count =0
                                                                 
                                                                       return quoteList.items.map((data,index)=>{
                                                                        if(JSON.parse(plantId)===parseInt(data["plant_id"])){
                                                                            let a = count++
                                                                           return(    <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">{data.SKU} QTY:{data.qty}</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr>)
                                                                        }
                                                                       })
                                            })}
                                                                           
                                            
                                                {/* <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr> */}
                                            {/* </tbody> */}
                                        </table>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div class="bg-white px-3 py-3 mt-2">
                            <form>
                                <h2>Internal Notes <span class="f-s-14 textGrey">(Not shown to customer)</span></h2>
                                <hr/>
                                <div class="row">
                                    <div class="col-md-12">
                                        <textarea cols="10" rows="8" class="form-control"></textarea>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 text-right">
                                        <button type="button" class="btn btn-primary btn-lg ml-3">SAVE</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                </Tabs>
                </div>                
            </div>
        </div>
    )
}
const mapStateToProps = (state)=>(
    {
        customerData:state.customerReducer,
        QuoteReducerData:state.QuoteReducerData,
        // plantData:state.plantData,
        plantCategoryList:state.inventoryManagementReducer.plantCategoryList,
        locationList:state.inventoryManagementReducer.locationList,
        supplierList:state.supplierData.supplierInfo,
        plantInventoryData:state.inventoryManagementReducer.plantInventoryData,
        plantData:state.inventoryManagementReducer,
        
    }
)
export default connect(mapStateToProps,{getQuoteList,addToquoteAPICall,filterHandleData,getAllPlantAction,filterPlantManagerData,getCategoryList,getAllPlants,getLocationList,setPlantPageNumber,resetFileds,getPlantList,getFilterResult,
searchPlantProductAPI,getCustomerByIdQuote,addToQuoteUpdate,updateQuoteData,handleInputChange,addNewQuote,getCustomerContacts,getcustomerAddress,getAllStatusMethods,deleteCustomer,getAllCustomerType,getAllCustomer,handleExchangeData,getCustomerById,setPageNumber,handleRadioFilter,handleSearchFilter,handleAplhabetFilter,typeOfActionShow})(QuoteAndOrdersManagement)
