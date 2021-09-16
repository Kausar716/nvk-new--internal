

import {
    ADD_NEW_QUOTE,
    HANDLE_INPUT_QUOTE,
    UPDATE_QUOTE,
    UPDATE_NEW_QUOTE,
    SEARCH_PLANT_PRODUCT,
    FILTER_PLANT_MANAGER_QUOTE_ACTION,
    QUOTE_LIST,
   

    
    // ADD_CUSTOMER, 
    // SHOW_CUSTOER, 
    // UPDATE_CUSTOMER,
    // DELETE_CUSTOMER 
    } from '../actions/types'
   

const initialSatate = {
//    quoteOrderList:[],
searchList:[],
quoteList:{items:[],order:[]},
searchListDuplicate:[],
plantFilterIds:{sku_code:"",name:""},
    quoteDetails:{
        source:"",
        ordered_by:"",
        bill_to:"",
        purchase_order:"",
        requested_date:"",
        requested_time:"AM",
        currency:"",
        email_to:"",
        job_description:"",
     
        units:"",
        discount:"0.00",
        customeraddress:[],
        discount_by_line_item:1,
        archive_quote_timeframe:"",
        show_pricing_op:0,
        flag_as_reminder:0,
        order_notes:"",
        status:"1",
        customer_id: "",
        quote_no: "",
        quote_status: "",
        pricing_year: "",
        amount: null,
        
    }

}

 const QuoteReducer = (state = initialSatate, action)=>{
    console.log(action.payload)
    console.log(action.payload)
    // alert(action.type)x
    
    switch(action.type){
        case QUOTE_LIST:
            return{
                ...state,
                quoteList:action.payload.data
            }
        case ADD_NEW_QUOTE:
            let customerData = action.payload.data.customer
            customerData.units = customerData.unit_of_measurement
            delete customerData.id
            delete customerData.customer_id
            delete action.payload.data.customer

            return{

                ...state,
                quoteDetails:{...state.quoteDetails,...action.payload.data,...customerData}

            }
        case SEARCH_PLANT_PRODUCT:
            return{
                ...state,
                searchListDuplicate:action.payload.data,
                searchList:action.payload.data

            }
        case UPDATE_QUOTE:
            return{
                ...state,
                quoteDetails:{...state.quoteDetails,...action.payload}

            }
        case HANDLE_INPUT_QUOTE:
            return{
                ...state,
                quoteDetails:{...state.quoteDetails, [action.id]:action.value}

            }
            case FILTER_PLANT_MANAGER_QUOTE_ACTION:
                let filterIds = state.plantFilterIds
               
                if(action.id ==="status" ||action.id ==="statusAll" ) filterIds["status"] =action.value
                else filterIds[action.id] = action.value
    
                let filterData = state.searchListDuplicate.filter(product =>{
                    let notFoundCount = 0 
                    Object.keys(filterIds).map(id=>{
                        if(filterIds[id] !=="All" && filterIds[id] !==""){
                            // if((id==="archivedAll" || id ==="archived" || id ==="archivedActive")){
                            //     // let value = parseInt(filterIds1[id])
                            //     if(parseInt(product["archived"]) ===parseInt(filterIds[id])){
    
                            //     }     
                            // }
                            if((id==="status" || id ==="statusAll")){
                                // let value = parseInt(filterIds1[id])
                                if(parseInt(product["status"]) ===parseInt(filterIds[id])){
    
                                }
                                
                            }
                            // alert("s")
                            if((id ==="sku_code" || id ==="genus")  && product[id].toLowerCase().includes(filterIds[id].toLowerCase())){
    
                            }
                            else if(parseInt(product[id]) === parseInt(filterIds[id])){
                            }else notFoundCount++
                        }
                    })
                    if(notFoundCount ===0)return product
    
                })
             console.log(filterData)
                // ids.location_id
                return{
                    ...state,
                    searchList:filterData,
                    plantFilterIds:filterIds
                }
        case UPDATE_NEW_QUOTE:
            return{
                ...state,
                quoteDetails:{...state.quoteDetails, [action.id]:action.value}

            }
            default:
                return state
        }
     
    }
    export default QuoteReducer