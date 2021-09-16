import React, { useState,useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {connect} from "react-redux";
import Autosuggest from 'react-autosuggest';
import DatePicker from 'react-date-picker';
import Loader from '../ProductManager/Loader'

import {
    updateQuoteData,handleInputChange,addToOrderUpdate,addNewOrder,getOrderList,addToOrderItemAPICall
} from "../../actions/quoteOrderManagementAction"

// import {getQuoteList,addToquoteAPICall,filterHandleData,searchPlantProductAPI,
//     updateQuoteData,handleInputChange,addNewQuote,addToQuoteUpdate} from "../../actions/quoteAction";
import {searchPlantProductAPI,addToquoteAPICall} from "../../actions/quoteAction";

import {getCustomerByIdQuote,getCustomerContacts,getcustomerAddress,getAllStatusMethods,deleteCustomer,
    getAllCustomer,handleExchangeData,getAllCustomerType,getCustomerById,setPageNumber,handleRadioFilter,
    handleSearchFilter,handleAplhabetFilter,typeOfActionShow} from "../../actions/customerSettingAction";


import {setPlantPageNumber,resetFileds,getLocationList,getCategoryList,getPlantList,getFilterResult,
    getAllPlants,filterPlantManagerData} from "../../actions/inventoryManagementAction";




import {
    //plant actions
    getAllPlantAction}from "../../actions/plantManagerAction";




 function QuoteAndOrdersManagement(props) {
   

    const [value, onChange] = useState(new Date());
    const [plantNameValue,setPlantNameValue] =useState("")
    const [plantSKUValue,setPlantSKUValue] =useState("")
    const [loading,setLoading] = useState(true)
    const [searchPalntId,setSearchPalntId] = useState([])
    const [plantId,setPlantId] = useState([])
    const [customerSelected,setCustomerSelected] = useState(false)

    const [searchData,setSearchData] = useState([])
    const [searchDataDuplicate,setSearchDataduplcaite] = useState([])
    const [plantFilterIds,setPlantFilterIds] = useState({sku_code:"",genus:""})
    const[suggestions,setSuggestions] = useState([])

   

    useEffect (()=>{
        props.getAllCustomer()
        props.getAllCustomerType()
        props.getLocationList()   
        props.getCategoryList()
       
        props.searchPlantProductAPI().then(data=>{
           
            getAllData(data.data)
        
        })

        

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


        const handleSave = (e)=>{
           // debugger
            e.preventDefault();
    
            props.addNewOrder(orderDetails).then(data=>{
                setCustomerSelected(true)
            })
    
        }


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





        const onChange2 = (e, { newValue }) => {
            // this.setState({plantNameValue:newValue});
            setPlantSKUValue(newValue)
            getFilterData("sku_code",newValue)  
            // let plantName = {}
            // plantName.plant_search =newValue
            // props.searchPlantProductAPI(plantName)    
        };


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
            if(id ===2){
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
            id:"sku_code",
            style: {border:"1px solid gray",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:8,height:"41.5px",fontSize:"15px",textDecoration:"none",fontWeight:"380"},
            onChange: onChange2,
            dataId: 'my-data-id',
        };

        const handleUpdate = (e)=>{
            e.preventDefault();
            // //console.log(customerDataById1)
            // //console.log(quoteDetails)
            // let id = quoteDetails.id
            // let combineData = {...quoteDetails,...customerDataById1,id:id}
            // //console.log(combineData)
    
            props.addToOrderUpdate(orderDetails)
    
        }

        const handleCustomerData =(e)=>{
           // debugger;
            let idNum = parseInt(e.target.value) 
            let updateObject={}
            updateObject.customer_id=idNum

            // alert(e.target.value)
            if(e.target.id ==="customer_id"){
                // // //console.log(customerDataById1)
                props.getCustomerByIdQuote(idNum).then(data=>{

                    console.log(data)
                    //console.log(customerDataById1)
                    // props.updateQuoteData(customerDataById1)
                })

                props.addNewOrder(updateObject).then(data=>{

                    console.log("123456789",data)
                })

                props.getAllCustomerType()
                props.getAllStatusMethods()
                // props.getCustomerContacts(e.target.value)
                // props.getcustomerAddress(e.target.value)
                props.handleInputChange(e.target.id,e.target.value)
    
            }else if(e.target.id ==="discount_by_line_item"){
                let val = e.target.value===0?1:0
                props.handleInputChange(e.target.id,val)
    
            }else if(e.target.id ==="show_pricing_op"){
                let val = e.target.value===0?1:0
                props.handleInputChange(e.target.id,val)
    
                
            }
            else if(e.target.id ==="flag_as_reminder"){
                let val = e.target.value===0?1:0
                props.handleInputChange(e.target.id,val)
    
                
            }
            else{
                props.handleInputChange(e.target.id,e.target.value)
            }
    
            // props.getAllTermsMethods()
            // props.getAllReasonMethods()
     
    
        }



        const onSuggestionsFetchRequested = ({ value }) =>{
            // alert(value.length)
           setSuggestions(getSuggestions(value))
            // this.setState({suggestions: this.getSuggestions(value),show:this.getSuggestions(value).length>3?1:0});
        }
    
        const onSuggestionsClearRequested = () =>  setSuggestions([])

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
        }


       const getSuggestionValue = suggestion =>suggestion.genus
    
       const renderSuggestion = suggestion => (<span>{suggestion.genus}</span>);
    
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
       // debugger
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





        const {quoteDetails,searchList,searchListDuplicate,quoteList} = props.QuoteReducerData
        const {orderList, orderDetails } =props.quoteOrderReducer
        const {deleteCustomer,customerDataByIdForOrder,customerTypeListForOrder,customerReasonList,customerDataById1,customerTypeList,action,customerStatusList,customerTermList,customerContact,customerContactList,customerAddress,customerAddressList} = props.customerData
        console.log("customerData",props.quoteOrderReducer, props.quoteOrderReducer)

    return (
        <div>
            <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center">
				<h1 class="page-header mb-0 d-flex flex-md-nowrap align-items-center"><img src="assets/img/customerQuotesAndOrders-lg-green.svg" alt="" class="mr-2"/> New Customer Order <span class="text-green ml-3">#00234-2000132</span></h1>
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
                            <h2 class="mb-0 stsOpen">Open</h2>
                            <div class="d-flex ml-3 mb-0 bdrLeft">
                                <div class="">
                                    <img src="assets/img/date-ic-sm-green.svg" alt=""/>
                                    <span class="ml-2">March 25, 2020</span>
                                </div>
                                <div class="ml-3">
                                    <img src="assets/img/price-ic-sm-green.svg" alt=""/>
                                    <span class="ml-2">CA <b>$429.85</b></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 d-flex flex-wrap justify-content-md-end  align-items-center">
                            <span class="mr-2 text-grey-darker f-s-14">Last Saved on 24/05/2020  12:23</span>
                            <a href="" class="ml-2"><img src="assets/img/copy-ic.svg" alt=""/></a>
                            <a href="" class="ml-2"><img src="assets/img/plant-btn-blue.svg" alt=""/></a>
                            <a href="" class="ml-2"><img src="assets/img/dig-btn-blue.svg" alt=""/></a>
                            <a href="" class="ml-2"><img src="assets/img/order-list-btn-blue.svg" alt=""/></a>
                            <a href="" class="ml-2"><img src="assets/img/times-btn-red.svg" alt=""/></a>
                            {/* <a href="" class="ml-2"><img src="assets/img/toggle-btn.svg" alt=""/></a>
                            <div class="d-flex align-items-center flex-wrap ml-3">Active
                                <div class="switcher switcher-sm ml-2 pr-2">
                                    <input type="checkbox" name="switcher_checkboxActive" id="switcher_checkboxActive" checked="checked" value="2" />
                                    <label for="switcher_checkboxActive"></label>
                                </div> 
                            </div> */}
                        </div>
                    </div>
                </div>

                <div class="">
                <Tabs>
                    <TabList>
                        <Tab  eventKey="0">Order Details</Tab>
                        {/* <Tab>Add to Order</Tab>
                        <Tab>Current Order <span class="badge badge-pill badge-success">02</span></Tab>
                        <Tab>Order History</Tab>
                        <Tab>Notes</Tab>     */}

                        <Tab  eventKey="1" disabled={customerSelected?false:true} style={{backgroundColor:customerSelected?"white":"lightgray"}}>Add to Order</Tab>
                        <Tab  eventKey="2" disabled={customerSelected?false:true} style={{backgroundColor:customerSelected?"white":"lightgray"}}>Current Order<span class="badge badge-pill badge-success">{orderList.items.length}</span></Tab>
                        <Tab  eventKey="3" disabled={customerSelected?false:true} style={{backgroundColor:customerSelected?"white":"lightgray"}}>Order History</Tab>
                        <Tab  eventKey="4" disabled={customerSelected?false:true} style={{backgroundColor:customerSelected?"white":"lightgray"}}>Notes</Tab>    
                    </TabList>
                    <TabPanel>
                        <div class="bg-white px-3 py-3">
                            <form>
                                <h2>Current Order</h2>
                                <hr/>
                                <div class="px-3 py-3 bg-grey-transparent-2">
                                    <div class="row ">
                                        <div class="col-md-12">
                                            <h3>{customerDataByIdForOrder.name}</h3>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-md-4 col-lg-6">
                                            <div class="row ">
                                                <div class="col-md-1 col-lg-2 text-md-right">
                                                    <b>Type:
                                                    </b>
                                                </div>
                                                <div class="col-md-10">
                                                    <span className="textGrey"><b>
                                                        {/* Finished Plants, Liners */}
                                                        <b>{
                                                        customerDataByIdForOrder.type.map(type=>{
                                                            return customerTypeListForOrder.active.map(typeId=>{
                                                                if(parseInt(typeId.id)===parseInt(type)) 
                                                                return(<span>{typeId.customer_type}</span>)
                                                            })
                                                          
                                                           
                                                        })
                                                        }
                                                        </b>
                                                        </b></span>
                                                </div>
                                            </div>
                                            <div class="row ">
                                                <div class="col-md-1 col-lg-2 text-md-right">
                                                    <b>Tax Exempt:</b>
                                                </div>
                                                <div class="col-md-10">
                                                    <span className="textGrey"><b>{customerDataByIdForOrder.tax_exempt ===1?"Yes":"No"}</b></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-lg-2">
                                            <div>
                                                <div ><b class="mr-3">Terms:</b><span className="textGrey"><b>{customerDataByIdForOrder.payment_terms}</b></span></div>
                                                <div class="mt-1"><b class="mr-3">Status:</b><span class="label bg-green f-s-14"><i class="fas fa-crown mr-2"></i>VIP</span></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 text-md-right mt-3 mt-md-0">
                                            <div>
                                                <div><b class="mr-3">Source:</b><span className="textGrey"><b>Internal</b></span></div>
                                                <div class="mt-1"><b class="mr-3">Price Year:</b><span className="textGrey"><b>2020</b></span>
                                                
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-5 col-xl-5">
                                    <div class="row ">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Ordered By<span class="text-danger">*</span></label>
                                                {/* <select class="form-control">
                                                    <option>John Smith</option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select> */}
                                                    <select class="form-control" onChange={handleCustomerData} disabled={customerSelected?true:false} id="customer_id">
                                                    <option value={0}>Select</option>
                                                    {
                                                        props.customerData.customerList.map(customer=>{
                                                            return(<option value={customer.id} selected={orderDetails.ordered_by === customer.id?"selected":""}>{customer.name}</option>)
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div class="col-md-6 col-lg-6 mt-2 mt-md-0">
                                                <label>Bill To<span class="text-danger">*</span></label>
                                                <select class="form-control" disabled={customerSelected?false:true} id="bill_to" onChange={handleCustomerData} >
                                                <option>Select Address</option>
                                                    {orderDetails.customeraddress.map(address=>{
                                                      
                                                        return( <option value={address.id} id={address.id} selected={orderDetails.bill_to===address.id?"selected":""}>{address.city} {address.country} {address.zip}</option>)
                                                    })}
                                                    {/* <option>1234 Main St, Waterdown </option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option> */}
                                                </select>
                                            </div>
                                           
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-lg-7 col-xl-7">
                                        <div class="row">
                                            <div class="col-md-6 col-lg-4">
                                                <label>PO #</label>
                                                {/* <input type="text" class="form-control" placeholder=""></input> */}
                                                <input type="text" class="form-control" placeholder="" value={orderDetails.purchase_order} disabled={orderDetails.p_o_req===1?false:true} onChange={handleCustomerData} ></input>
                                            </div>
                                            <div class="col-md-6 col-lg-4 mt-3 mt-md-0">
                                                <label class="mr-2 mr-md-0">Requested Date</label>
                                                {/* <DatePicker onChange={onChange} value={value} /> */}
                                                {/* <input type="date" className="dateDesign"  /> */}
                                                <input type="date" class="form-control" placeholder="" disabled={customerSelected?false:true} value={orderDetails.requested_date} onChange={handleCustomerData} id="requested_date"></input>
                                            </div>
                                            <div class="col-md-6 col-lg-4 mt-3 mt-md-0">
                                                <label class="mr-2 mr-md-0">Requested Time</label>
                                                {/* <select class="form-control">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select> */}
                                                 <select class="form-control" disabled={customerSelected?false:true} id="requested_time" onChange={handleCustomerData} >
                                                    <option value="AM" value={orderDetails.requested_time==="AM"?"selected":""}>AM</option>
                                                    <option value="PM" value={orderDetails.requested_time==="PM"?"selected":""}>PM</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-5 col-xl-5">
                                        <div class="row ">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Currency</label>
                                                {/* <select class="form-control">
                                                    <option>CAD</option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select> */}
                                                 <select class="form-control" disabled={customerSelected?false:true} onChange={handleCustomerData} id="currency">
                                                    <option value={"Canadian Doller"} selected={orderDetails.currency==="Canadian Doller"?"selected":""}>Canadian Doller</option>
                                                    <option value={"U.S Doller"} selected={orderDetails.currency==="U.S Doller"?"selected":""}>U.S Doller</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6 col-lg-6">
                                                <label>Email To</label>
                                                <input type="text" class="form-control" placeholder="" value={orderDetails.email_to} disabled={customerSelected?false:true} id="email_to" onChange={handleCustomerData}></input>
                                                {/* <select class="form-control">
                                                    <option>Select </option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-lg-7 col-xl-7">
                                        <label>Job Description</label>
                                        <input type="text" class="form-control" placeholder="" disabled={customerSelected?false:true} value={orderDetails.job_description} id="job_description" onChange={handleCustomerData}></input>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-5 col-xl-5">
                                        <div class="row ">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Units</label>
                                                <select class="form-control" disabled={customerSelected?false:true} onChange={handleCustomerData} id="units">
                                                    <option value={"Metric"} selected={ orderDetails.units==="Metric"?"selected":""}>Metric</option>
                                                    <option value={"Imperial"} selected={orderDetails.units ==="Imperial"?"selected":""}>Imperial</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6 col-lg-6">
                                                <label>Discount</label>
                                                <input type="text" class="form-control text-right" placeholder="0.00" value={orderDetails.discount} disabled={customerSelected?false:true} onChange={handleCustomerData} id="discount"/>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div class="col-md-12 col-lg-7 col-xl-7 pt-md-4 mt-3">
                                        <a href="">Reset</a>
                                    </div> */}
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-5 col-xl-5">
                                        <div class="row">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Discount by Line Item</label>
                                                <div class="d-flex align-items-center flex-wrap mt-2">Off
                                                    <div class="switcher switcher-sm ml-2 pr-2">
                                                    <input type="checkbox" name="discount_by_line_item" id="discount_by_line_item" 
                                                     value={orderDetails.discount_by_line_item} disabled={customerSelected?false:true} 
                                                     checked={orderDetails.discount_by_line_item===1?true:false} onChange={handleCustomerData}/>
                                                        {/* <input type="checkbox" name="dislineitem" id="dislineitem" value="2" /> */}
                                                        <label for="dislineitem"></label>
                                                    </div> On
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-lg-6">
                                                <label>Display Discount Column</label>
                                                <div class="d-flex align-items-center flex-wrap mt-2">Off
                                                    <div class="switcher switcher-sm ml-2 pr-2">
                                                        {/* <input type="checkbox" name="dispdisccol" id="dispdisccol" value="2" /> */}
                                                        <input type="checkbox" name="display_discount_column" id="display_discount_column" 
                                                     value={orderDetails.display_discount_column} disabled={customerSelected?false:true} 
                                                     checked={orderDetails.display_discount_column===1?true:false} onChange={handleCustomerData}/>
                                                        <label for="display_discount_column"></label>
                                                    </div> On
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-lg-7 col-xl-7">
                                        <div class="row">
                                            <div class="col-md-6 col-lg-4">
                                                <label>Display Substitution Line</label>
                                                <div class="d-flex align-items-center flex-wrap mt-2">Off
                                                    <div class="switcher switcher-sm ml-2 pr-2">
                                                    <input type="checkbox" name="display_substitution_line" id="display_substitution_line" 
                                                     value={orderDetails.display_substitution_line} disabled={customerSelected?false:true} 
                                                     checked={orderDetails.display_substitution_line===1?true:false} onChange={handleCustomerData}/>
                                                        <label for="display_substitution_line"></label>
                                                    </div> On
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-lg-6">
                                                <label>Show Pricing on Output</label>
                                                <div class="d-flex align-items-center flex-wrap mt-2">Off
                                                    <div class="switcher switcher-sm ml-2 pr-2">
                                                    <input type="checkbox" name="show_pricing_op" id="show_pricing_op" 
                                                     value={orderDetails.show_pricing_op} disabled={customerSelected?false:true} 
                                                     checked={orderDetails.show_pricing_op===1?true:false} onChange={handleCustomerData}/>
                                                        <label for="show_pricing_op"></label>
                                                    </div> On
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-12 mt-2 mt-md-0">
                                        <label>Order Notes <small class="textGrey">(Internal Only)</small></label>
                                        <textarea class="form-control" disabled={customerSelected?false:true} id="order_notes" 
                                        value={orderDetails.order_notes} onChange={handleCustomerData}></textarea>
                                        {/* <textarea class="form-control"></textarea> */}
                                    </div>

                                    <div style={{float:"left",width:"100%",marginBottom:4,paddingRight:10}}>
                                    <button className="btn btn-primary btn-lg ml-3"  style={{width:100,float:"right",marginTop:10}} onClick={customerSelected?handleUpdate:handleSave}>{customerSelected?"Update":"Add"}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="bg-white px-3 py-3 mt-2">
                            <form>
                                <h2>Add to Order</h2>
                                <hr/>
                                <div class="row mt-3 align-items-center">
                                    <div class="col-md-12">
                                        <div class="row form-group">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Plant and Product Search</label>
                                                <div class="searchInput">
                                                    <button type="submit" class="btn btn-search"  style={{marginTop:"2%",marginLeft:"2%"}}>
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
                                                    {/* <input type="text" class="form-control" placeholder="Search Plants or Products"/> */}
                                                </div>
                                                <div class="row mt-3 align-items-center">
                                                    <div class="col-md-12 d-flex" style={{marginTop:"35px"}}>
                                                        {/* <div class="custom-control custom-radio">
                                                            <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" />
                                                            <label class="custom-control-label" for="customRadio1">Active Only</label>
                                                        </div> */}
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="active" id="activePlants" value="" />
                                                            <label class="form-check-label" for="active">Active Only</label>
                                                        </div>
                                                        {/* <div class="custom-control custom-radio ml-3">
                                                            <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" />
                                                            <label class="custom-control-label" for="customRadio2">Both Active and Inactive</label>
                                                        </div> */}
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="bothactive" id="bothactive" value="" />
                                                            <label class="form-check-label" for="bothactive">Both Active and Inactive</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-lg-6">
                                                <label>Search SKU</label>
                                                <div class="searchInput">
                                                    <button type="submit" class="btn btn-search" style={{marginTop:"2%",marginLeft:"2%"}}>
                                                        <img src="assets/img/search.svg" alt=""/>
                                                    </button>
                                                    <Autosuggest
                                                    suggestions={suggestions}
                                                    onSuggestionsFetchRequested={onSuggestionsFetchRequested1}
                                                    //onSuggestionsClearRequested={onSuggestionsClearRequested1}
                                                    getSuggestionValue={getSuggestionValue1}
                                                    renderSuggestion={renderSuggestion1}
                                                    inputProps={inputPropsSKU}
                                                  
                                                />
                                                    {/* <input type="text" class="form-control" placeholder="Search SKU"/> */}
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
                                                            <th width="15%" class="">SKU</th>
                                                            <th width="15%" class="text-center">Size</th>
                                                            <th width="6%" class="text-center">On Hand</th>
                                                            <th width="6%" class="text-center">Customer Orders</th>
                                                            <th width="8%" class="text-center">Current <br/>Available</th>
                                                            <th width="6%" class="text-center">On Quotes</th>
                                                            <th width="6%" class="text-center">Open POS</th>
                                                            <th width="8%" class="text-center">Future <br/>Available</th>
                                                            <th width="6%" class="text-center">Price</th>
                                                            <th width="6%" class="text-center">Volume<br/>Rate</th>
                                                            <th width="6%" class="text-center">Dis%</th>
                                                            <th width="6%" class="text-center">Qty</th>
                                                            <th width="4%" class="text-center"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>





                                                    {loading?  <div style={{height: "300px",lineHeight: "300px",textAlign: "center",backgroundColor:"white",width:"100%"}}><Loader/></div>:<tr>
                                                  
                                                            <td colspan="13" class="p-0">
                                                                <table class="table table-striped mb-0" border="0" width="100%">
                                                                {plantId.map((plantId,index1)=>{
                                                       
                                                       let count =0
                                                            return searchData.map((plant,index)=>{
                                                                
                                                             
                                                                if(JSON.parse(plantId)===parseInt(plant["plant_id"])){
                                                                
                                                                    let a = count++
                                                                    return(
                                                                        <div>
                                                    
                                                   { a ===0?<tr class="tblLinks" style={{backgroundColor:"gray"}}>
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
                                                   
                                                    </div>

                                                    )

                                                        
                                                               
                                                            }   
                                                        })

                                                       
                                                    
                                                    })}
                                                        
                                              
                                                                </table>
                                                            </td>
                                                        </tr>}


















{/* 
                                                        <tr>
                                                            <td colspan="13" class="p-0">
                                                                <table class="table table-striped mb-0" border="0" width="100%">
                                                                    <tr class="tblLinks">
                                                                        <td colspan="13">
                                                                            <a href="">Abeliophyllum (White Forsythia)</a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td width="15%">
                                                                            <a href="">393-TF-1259-1G</a>
                                                                        </td>
                                                                        <td class="text-center" width="15%">150CM 15 gal</td>
                                                                        <td class="text-center" width="6%">50</td>
                                                                        <td class="text-center" width="6%">23</td>
                                                                        <td class="text-center" width="8%"><b class="f-s-20">27</b></td>
                                                                        <td class="text-center" width="6%">13</td>
                                                                        <td class="text-center" width="6%">50</td>
                                                                        <td class="text-center" width="8%"><b class="f-s-20">125</b></td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/> 
                                                                            <div>
                                                                                <span class="text-green">3.18</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/>
                                                                            <div>
                                                                                <span class="text-green">3.07</span>
                                                                            </div>   
                                                                            <div>
                                                                                <span class="text-red">25 Min</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="2.75"/>
                                                                        </td>
                                                                        <td class="text-center" width="6%" >
                                                                            <div class="d-flex align-items-center">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="4"/>
                                                                            </div>
                                                                            <div>
                                                                                <span class="text-red">Short 4</span>
                                                                            </div>
                                                                        </td>
                                                                        <td class="text-center" width="4%">
                                                                            <a href="" class="ml-2">
                                                                                <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td width="15%">
                                                                            <a href="">393-TF-1259-1G</a>
                                                                        </td>
                                                                        <td class="text-center">150CM 15 gal</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center">23</td>
                                                                        <td class="text-center"><b class="f-s-20">27</b></td>
                                                                        <td class="text-center">13</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center"><b class="f-s-20">125</b></td>
                                                                        <td class="text-center">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/> 
                                                                            <div>
                                                                                <span class="text-green">3.18</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/>
                                                                            <div>
                                                                                <span class="text-green">3.07</span>
                                                                            </div>   
                                                                            <div>
                                                                                <span class="text-red">25 Min</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="2.75"/>
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <div class="">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="4"/>
                                                                                 <div>
                                                                                <span class="text-red">Short 4</span>
                                                                            </div>   
                                                                            </div>
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <a href="" class="ml-2">
                                                                                <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="13" class="p-0">
                                                                <table class="table table-striped mb-0" border="0" width="100%">
                                                                    <tr class="tblLinks">
                                                                        <td colspan="13">
                                                                            <a href="">Abeliophyllum (White Forsythia)</a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td width="15%">
                                                                            <a href="">393-TF-1259-1G</a>
                                                                        </td>
                                                                        <td class="text-center" width="15%">150CM 15 gal</td>
                                                                        <td class="text-center" width="6%">50</td>
                                                                        <td class="text-center" width="6%">23</td>
                                                                        <td class="text-center" width="8%"><b class="f-s-20">27</b></td>
                                                                        <td class="text-center" width="6%">13</td>
                                                                        <td class="text-center" width="6%">50</td>
                                                                        <td class="text-center" width="8%"><b class="f-s-20">125</b></td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/> 
                                                                            <div>
                                                                                <span class="text-green">3.18</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/>
                                                                            <div>
                                                                                <span class="text-green">3.07</span>
                                                                            </div>   
                                                                            <div>
                                                                                <span class="text-red">25 Min</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="2.75"/>
                                                                        </td>
                                                                        <td class="text-center" width="6%" >
                                                                            <div class="d-flex align-items-center">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="4"/>
                                                                            </div>
                                                                            <div>
                                                                                <span class="text-red">Short 4</span>
                                                                            </div>
                                                                        </td>
                                                                        <td class="text-center" width="4%">
                                                                            <a href="" class="ml-2">
                                                                                <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
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
                                                                        <td class="text-center">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/> 
                                                                            <div>
                                                                                <span class="text-green">3.18</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/>
                                                                            <div>
                                                                                <span class="text-green">3.07</span>
                                                                            </div>   
                                                                            <div>
                                                                                <span class="text-red">25 Min</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="2.75"/>
                                                                        </td>
                                                                        <td class="text-center" >
                                                                            <div class="">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="4"/>
                                                                                 <div>
                                                                                <span class="text-red">Short 4</span>
                                                                            </div>   
                                                                            </div>
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <a href="" class="ml-2">
                                                                                <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                            </a>
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
                                        <button type="button" class="btn active btn-lg ml-3">Add All</button>
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
                                        <h2>Current Order</h2>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-10">
                                        <a href="#" class="btn btnGrey">
                                            <span class="">
                                                <img src="assets/img/price-tag-ic-blue.svg" alt=""/>
                                                <span class="ml-2"><b>Print Tags</b></span>
                                            </span>
                                        </a>
                                        <a href="#" class="btn btnGrey ml-2">
                                            <span class="">
                                                <img src="assets/img/add-segment-ic-blue.svg" alt=""/>
                                                <span class="ml-2"><b>Add Segment</b></span>
                                            </span>
                                        </a>
                                        <a href="#" class="btn btnGrey ml-2">
                                            <span class="">
                                                <img src="assets/img/add-selected-ic-blue.svg" alt=""/>
                                                <span class="ml-2"><b>Add Selected</b></span>
                                            </span>
                                        </a>
                                        <a href="#" class="btn btnGrey ml-2">
                                            <span class="">
                                                <img src="assets/img/add-all-ic-blue.svg" alt=""/>
                                                <span class="ml-2"><b>Add ALL</b></span>
                                            </span>
                                        </a>
                                        <a href="#" class="btn btnGrey ml-2">
                                            <span class="">
                                                <img src="assets/img/cart-ic-blue.svg" alt=""/>
                                                <span class="ml-2"><b>Pick Cart</b></span>
                                            </span>
                                        </a>
                                    </div>
                                    <div class="col-md-2 text-right">
                                        <div class="cartValue">
                                            <span><i class="fas fa-shopping-cart"></i></span>
                                            25
                                        </div>
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
                                                            <th width="6%" class="">Status</th>
                                                            <th width="27%" class="">Plant Name/Original SKU</th>
                                                            <th width="8%" class="text-center">Size</th>
                                                            <th width="8%" class="text-center">Added</th>
                                                            <th width="8%" class="text-center">Tags/Labels</th>
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
                                                                    <tr class="movePanel">
                                                                        <td colspan="12">
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <a href="" class="mr-3">
                                                                                        <i class="fas fa-expand-arrows-alt text-dark"></i>
                                                                                    </a>
                                                                                    <strong>West Wing Front Gardens</strong>
                                                                                </div>
                                                                                <div class="col-md-6 text-right">
                                                                                    <a href="#" class="mr-5">Select Segment</a>
                                                                                    <span class="mr-5">$96.90</span>
                                                                                    <a href="#" class="">
                                                                                        <img src="assets/img/close-ic-grey.svg" alt=""/>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    {/* Main Content Row starts here */}
                                                                    <tr class="tblBgWhite">
                                                                        <table class="table table-striped table-no-border mb-0" border="0" width="100%">
                                                                            <tr class="topTitleRow">
                                                                                <td width="3%" class="pt-2">1</td>
                                                                                <td width="6%" class="pt-2">
                                                                                    <span class="stsTag stsTagOpen">Open</span>
                                                                                </td>
                                                                                <td width="91%" colspan="11">
                                                                                    <input type="text" class="form-control" placeholder="" value="Diervilla x Kodiak® Orange ('G2X88544') - Kodiak® Orange Honeysuckle"/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="3%">
                                                                                    <div class="custom-control custom-checkbox">
                                                                                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                                        <label class="custom-control-label" for="customCheck1"></label>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="6%"></td>
                                                                                <td width="27%">
                                                                                    <select class="form-control plantNameSel">
                                                                                        <option>43-TF-30-1G</option>
                                                                                        <option>Option 1</option>
                                                                                        <option>Option 2</option>
                                                                                    </select>
                                                                                </td>
                                                                                <td width="8%" class="text-center">150CM 15 gal</td>
                                                                                <td width="8%" class="text-center">19/05/2020</td>
                                                                                <td width="8%" class="text-center">
                                                                                    <div class="custom-control custom-checkbox">
                                                                                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                                        <label class="custom-control-label" for="customCheck1"></label>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="8%" class="text-center">
                                                                                    <input type="text" class="form-control w-60 text-right mx-auto" placeholder="" value="2.5"/>
                                                                                </td>
                                                                                <td width="8%" class="text-center">
                                                                                    <input type="text" class="form-control w-60 text-right mx-auto" placeholder="" value="-10"/>
                                                                                </td>
                                                                                <td width="8%"  class="text-center">
                                                                                    <input type="text" class="form-control w-60 text-right mx-auto" placeholder="" value="8.25"/>
                                                                                    <div class="">
                                                                                        <span class="text-green">21</span>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="8%" class="text-center">
                                                                                    <span class="text-success controlLabel text-right">90</span>
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
                                                                    <tr class="tblBgGrey">
                                                                        <table class="table table-striped table-no-border" width="100%">
                                                                            <tr class="topTitleRow">
                                                                                <td width="3%" class="pt-2">2</td>
                                                                                <td width="6%" class="pt-2">
                                                                                    <span class="stsTag stsTagPicking">Picking</span>
                                                                                    <div>
                                                                                        <a href="">(View)</a>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="91%"  colspan="11">
                                                                                    <input type="text" class="form-control" placeholder="" value="Diervilla x Kodiak® Orange ('G2X88544') - Kodiak® Orange Honeysuckle"/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="3%">
                                                                                    <div class="custom-control custom-checkbox">
                                                                                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                                        <label class="custom-control-label" for="customCheck1"></label>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="6%"></td>
                                                                                <td width="27%">
                                                                                    <select class="form-control plantNameSel">
                                                                                        <option>43-TF-30-1G</option>
                                                                                        <option>Option 1</option>
                                                                                        <option>Option 2</option>
                                                                                    </select>
                                                                                </td>
                                                                                <td width="8%" class="text-center">150CM 15 gal</td>
                                                                                <td width="8%" class="text-center">19/05/2020</td>
                                                                                <td class="text-center">
                                                                                    <div class="custom-control custom-checkbox">
                                                                                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                                        <label class="custom-control-label" for="customCheck1"></label>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="8%" class="text-center">
                                                                                    <input type="text" class="form-control w-60 text-right mx-auto" placeholder="" value="2.5"/>
                                                                                </td>
                                                                                <td width="8%" class="text-center">
                                                                                    <div class="plainText">1</div>
                                                                                    <div class="">
                                                                                        <span class="mr-2"><i class="fas fa-lock"></i></span>
                                                                                        <span class="text-green">21</span>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="8%" class="text-center">
                                                                                    <input type="text" class="form-control w-60 text-right mx-auto" placeholder="" value="8.25"/>
                                                                                    <div class="">
                                                                                        <span class="text-green">21</span>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="8%" class="text-center">
                                                                                    <span class="text-success controlLabel text-right ">90</span>
                                                                                </td>
                                                                                <td width="8%" class="text-center actionTd">
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
                                                                            <tr class="trBgWhite ">
                                                                                <td width="3%"></td>
                                                                                <td width="6%"></td>
                                                                                <td width="91%" class="" colspan="12">
                                                                                    <img src="assets/img/enter-arrow-red.svg" alt=""/>
                                                                                    <span class="ml-2">Substitution for Buxus microphla Peergold (Golden Dream Boxwood): 645-1G</span>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </tr>
                                                                    <tr class="tblBgWhite">
                                                                        <table class="table table-striped table-no-border" width="100%">
                                                                            <tr class="topTitleRow">
                                                                                <td width="3%" class="pt-2">3</td>
                                                                                <td width="6%" class="pt-2">
                                                                                    <span class="stsTag stsTagPicking">Picking</span>
                                                                                    <div>
                                                                                        <a href="">(View)</a>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="91%"  colspan="11">
                                                                                    <input type="text" class="form-control" placeholder="" value="Diervilla x Kodiak® Orange ('G2X88544') - Kodiak® Orange Honeysuckle"/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="3%">
                                                                                    <div class="custom-control custom-checkbox">
                                                                                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                                        <label class="custom-control-label" for="customCheck1"></label>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="6%"></td>
                                                                                <td width="27%">
                                                                                    <select class="form-control plantNameSel">
                                                                                        <option>43-TF-30-1G</option>
                                                                                        <option>Option 1</option>
                                                                                        <option>Option 2</option>
                                                                                    </select>
                                                                                </td>
                                                                                <td width="8%" class="text-center">150CM 15 gal</td>
                                                                                <td width="8%" class="text-center">19/05/2020</td>
                                                                                <td class="text-center">
                                                                                    <div class="custom-control custom-checkbox">
                                                                                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                                        <label class="custom-control-label" for="customCheck1"></label>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="8%" class="text-center">
                                                                                    <input type="text" class="form-control w-60 text-right mx-auto" placeholder="" value="2.5"/>
                                                                                </td>
                                                                                <td width="8%" class="text-center">
                                                                                    <div class="plainText">1</div>
                                                                                    <div class="">
                                                                                        <span class="mr-2"><i class="fas fa-lock"></i></span>
                                                                                        <span class="text-green">21</span>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="8%" class="text-center">
                                                                                    <input type="text" class="form-control w-60 text-right mx-auto" placeholder="" value="8.25"/>
                                                                                    <div class="">
                                                                                        <span class="text-green">21</span>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="8%" class="text-center">
                                                                                    <span class="text-success controlLabel text-right ">90</span>
                                                                                </td>
                                                                                <td width="8%" class="text-center actionTd">
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
                                                                            <tr class="trBgWhite ">
                                                                                <td width="3%"></td>
                                                                                <td width="6%"></td>
                                                                                <td width="91%" class="" colspan="12">
                                                                                    <img src="assets/img/enter-arrow-red.svg" alt=""/>
                                                                                    <span class="ml-2">Substitution for Buxus microphla Peergold (Golden Dream Boxwood): 645-1G</span>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </tr>
                                                                    
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="12" class="p-0">
                                                                <table class="table table-striped mb-0" width="100%">
                                                                    <tr class="movePanel">
                                                                        <td colspan="12">
                                                                            <div class="row">
                                                                                <div class="col-md-6">
                                                                                    <a href="" class="mr-3">
                                                                                        <i class="fas fa-expand-arrows-alt text-dark"></i>
                                                                                    </a>
                                                                                    <strong>West Wing Rear Entrance</strong>
                                                                                </div>
                                                                                <div class="col-md-6 text-right">
                                                                                    <a href="#" class="mr-5">Select Segment</a>
                                                                                    <span class="mr-5">$96.90</span>
                                                                                    <a href="#" class="">
                                                                                        <img src="assets/img/close-ic-grey.svg" alt=""/>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    {/* Main Content Row starts here */}
                                                                    <tr class="tblBgWhite">
                                                                        <table class="table table-striped mb-0" width="100%">
                                                                            <tr class="topTitleRow">
                                                                                <td class="pt-2">4</td>
                                                                                <td class="pt-2">
                                                                                    <span class="stsTag stsTagOpen">Open</span>
                                                                                </td>
                                                                                <td  colspan="11">
                                                                                    <input type="text" class="form-control" placeholder="" value="Diervilla x Kodiak® Orange ('G2X88544') - Kodiak® Orange Honeysuckle"/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <div class="custom-control custom-checkbox">
                                                                                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                                        <label class="custom-control-label" for="customCheck1"></label>
                                                                                    </div>
                                                                                </td>
                                                                                <td></td>
                                                                                <td>
                                                                                    <select class="form-control plantNameSel">
                                                                                        <option>43-TF-30-1G</option>
                                                                                        <option>Option 1</option>
                                                                                        <option>Option 2</option>
                                                                                    </select>
                                                                                </td>
                                                                                <td class="text-center">150CM 15 gal</td>
                                                                                <td class="text-center">19/05/2020</td>
                                                                                <td class="text-center">
                                                                                    <div class="custom-control custom-checkbox">
                                                                                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                                        <label class="custom-control-label" for="customCheck1"></label>
                                                                                    </div>
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    <input type="text" class="form-control w-60 text-right" placeholder="" value="2.5"/>
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    <input type="text" class="form-control w-60 text-right" placeholder="" value="-10"/>
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    <input type="text" class="form-control w-60 text-right mx-auto" placeholder="" value="8.25"/>
                                                                                    <div class="">
                                                                                        <span class="text-green">21</span>
                                                                                    </div>
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    <span class="text-success controlLabel text-right">90</span>
                                                                                </td>
                                                                                <td class="text-center actionTd">
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
                                                                    
                                                                    <tr class="tblBgGrey">
                                                                        <table class="table table-striped table-no-border mb-0" width="100%">
                                                                            <tr class="topTitleRow">
                                                                                <td class="pt-2">5</td>
                                                                                <td class="pt-2">
                                                                                    <span class="stsTag stsTagOpen">Open</span>
                                                                                </td>
                                                                                <td  colspan="11">
                                                                                    <input type="text" class="form-control" placeholder="" value="Diervilla x Kodiak® Orange ('G2X88544') - Kodiak® Orange Honeysuckle"/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <div class="custom-control custom-checkbox">
                                                                                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                                        <label class="custom-control-label" for="customCheck1"></label>
                                                                                    </div>
                                                                                </td>
                                                                                <td></td>
                                                                                <td>
                                                                                    <select class="form-control plantNameSel">
                                                                                        <option>43-TF-30-1G</option>
                                                                                        <option>Option 1</option>
                                                                                        <option>Option 2</option>
                                                                                    </select>
                                                                                </td>
                                                                                <td class="text-center">150CM 15 gal</td>
                                                                                <td class="text-center">19/05/2020</td>
                                                                                <td class="text-center">
                                                                                    <div class="custom-control custom-checkbox">
                                                                                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                                        <label class="custom-control-label" for="customCheck1"></label>
                                                                                    </div>
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    <input type="text" class="form-control w-60 text-right" placeholder="" value="2.5"/>
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    <input type="text" class="form-control w-60 text-right" placeholder="" value="-10"/>
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    <input type="text" class="form-control w-60 text-right mx-auto" placeholder="" value="8.25"/>
                                                                                    <div class="">
                                                                                        <span class="text-green">21</span>
                                                                                    </div>
                                                                                </td>
                                                                                <td class="text-center">
                                                                                    <span class="text-success controlLabel text-right">90</span>
                                                                                </td>
                                                                                <td class="text-center actionTd">
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
                                                            <label >175.60</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-8 text-right">
                                                            <label >Hang Tags and Pot Labels <span>$</span></label>
                                                        </div>
                                                        <div class="col-md-2 text-right">
                                                            <label >8.75</label>
                                                        </div>
                                                    </div>
                                                    <div class="row subTotLbl">
                                                        <div class="col-md-8 text-right">
                                                            <label >Discounts <span>$</span></label>
                                                        </div>
                                                        <div class="col-md-2 text-right">
                                                            <label >-27.10</label>
                                                        </div>
                                                    </div>
                                                    <div class="row subTotLbl text-green">
                                                        <div class="col-md-8 text-right">
                                                            <label class="text-uppercase">Subtotal after Discounts <span>$</span></label>
                                                        </div>
                                                        <div class="col-md-2 text-right">
                                                            <label class="f-s-24">544.50</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-8 text-right">
                                                            <label >Sales Tax Rate @ 13.0% <span>$</span></label>
                                                        </div>
                                                        <div class="col-md-2 text-right">
                                                            <label >60.00</label>
                                                        </div>
                                                    </div>
                                                    <div class="row subTotLbl">
                                                        <div class="col-md-8 text-right">
                                                            <label >Order Total <span>$</span></label>
                                                        </div>
                                                        <div class="col-md-2 text-right">
                                                            <label >544.50</label>
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
                                            <tbody>
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
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div class="bg-white px-3 py-3 mt-2">
                            <form>
                                <h2>Internal Notes <span class="f-s-14">(Not shown to customer)</span></h2>
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


//export default QuoteAndOrdersManagement
const mapStateToProps = (state)=>(
    {
        customerData:state.customerReducer,
        QuoteReducerData:state.QuoteReducerData,
        quoteOrderReducer:state.quoteOrderReducer,
        // plantData:state.plantData,
        plantCategoryList:state.inventoryManagementReducer.plantCategoryList,
        locationList:state.inventoryManagementReducer.locationList,
        supplierList:state.supplierData.supplierInfo,
        plantInventoryData:state.inventoryManagementReducer.plantInventoryData,
        plantData:state.inventoryManagementReducer,
        
    }
)

export default connect(mapStateToProps,{
    updateQuoteData,handleInputChange,addToOrderUpdate,addNewOrder,getOrderList,addToOrderItemAPICall,
    searchPlantProductAPI,addToquoteAPICall,
    getAllPlantAction,
    filterPlantManagerData,getCategoryList,getAllPlants,getLocationList,setPlantPageNumber,
    resetFileds,getPlantList,getFilterResult,getCustomerByIdQuote,
    getCustomerContacts,getcustomerAddress,getAllStatusMethods,
    deleteCustomer,getAllCustomerType,getAllCustomer,handleExchangeData,getCustomerById,setPageNumber,
    handleRadioFilter,handleSearchFilter,handleAplhabetFilter,typeOfActionShow})(QuoteAndOrdersManagement)