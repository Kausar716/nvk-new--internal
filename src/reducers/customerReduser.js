
import {
    GET_CUSTOMER_LIST,
    SET_PAGE_NUMBER,
    HANDLE_ALL_FILTER,
    ADD_PRIMARY,
    HANDLE_INPUT_EXCHANGE,
    FILTER_DATA_BY_RADIO,
    FILTER_DATA_BY_SEARCH,
    FILTER_DATA_BY_ALPHA,
    HANDLE_INPUT,
    GET_CUSTOMER_BY_ID1,
    ADD_NOTIFICATION,
    UPDATE_CONTACT,
    UPDATE_CONTACT1,
    ADD_EMAIL,
    GET_CUSTOMER_NOTIFICATION,
    GET_EMAIL_NOTIFICATION,
    ADD_FINANCES_DATA,
    ADD_INTEREST_DATA,
    ADD_PRINT_DATA,
    ADD_CUSTOMER_TYPE,
    GET_ALL_CUSTOMER_TYPES,
    HANDLE_DRAG_CUSTOMER_CATEGORY,
    GET_CUSTOMER_DELIVERY_LIST,
    ADD_CUSTOMER_DELIVERY,
    GET_CUSTOMER_STATUS,
    ADD_CUSTOMER_STATUS,
    ADD_CUSTOMER_REASON,
    GET_CUSTOMER_REASON,
    GET_CUSTOMER_TERMS,
    ADD_CUSTOMER_TERMS,
    ADD_CUSTOMER_RETURN_REASON,
    GET_CUSTOMER_RETURN_REASON,
    GET_EXCHANGE_DATA,
    ADD_NEW_CUSTOMER,
    EDIT_CUSTOMER,
    DELETE_CUSTOMER,
    TYPE_OF_ACTION,
    EDIT_PRIMARY,
    GET_CUSTOMER_BY_ID,
    RESET_CUSTOMER_FILEDS,
    UPDATE_CUSTOMER,
    GET_INTEREST_DATA,
    GET_PRINT_DATA,
    ADD_CUSTOMER_CONTACT,
    ADD_CUSTOMER_CONTACT1,
    GET_CUSTOMER_CONTACTS_LIST,
    GET_CUSTOMER_CONTACT_BY_ID,
    UPDATE_CUSTOMER_CONTACT,
    ADD_CONTACT_ADDRESS ,
    GET_CONTACT_ADDRESSES ,
    UPDATE_CONTACT_ADDRESS ,
    GET_CONTACT_ADDRESSES_BY_CONTACTID,
    RE_SET_ADDRESS_FILED,
    RESET_CONTACT,
    ADD_SUPPLIER_ADDRESS,
    DELETE_CUSTOMER_ADDRESS,
GET_SUPPLIER_ADDRESS,
DELETE_CUSTOMER_CONTACT,
GET_ALL_SUPPLIER_ADDRESS,
DELETE_SUPPLIER_ADDRESS,
UPDATE_SUPPLIER_ADDRESS,
UPDATE_CUSTOMER_TYPE_SETTING,
SHOW_SPECIFIC_CUSTOMER_TYPE_SETTING,
HANDLE_CUSTOMER_SETTIING_INPUT_DATA,
SHOW_SPECIFIC_CUSTOMER_DELIVERY_METHOD_SETTING,
UPDATE_CUSTOMER_DELIVERY_METHOD_SETTING,


UPDATE_CUSTOMER_STATUS_LEVEL_SETTING,
SHOW_SPECIFIC_CUSTOMER_STATUS_LEVEL_SETTING,

UPDATE_CUSTOMER_RETURN_REASON_SETTING,
SHOW_SPECIFIC_CUSTOMER_RETURN_REASON_SETTING,

UPDATE_CUSTOMER_ACCOUNT_REASON_SETTING,
SHOW_SPECIFIC_CUSTOMER_ACCOUNT_REASON_SETTING,

UPDATE_CUSTOMER_TERMS_SETTING,
SHOW_SPECIFIC_CUSTOMER_TERMS_SETTING,
HANDLE_INPUT_CUSTOMER,
HANDLE_INPUT_EXCHANGE1,
DELETE_SUPPLIER_CONTACT


    


    
    // ADD_CUSTOMER, 
    // SHOW_CUSTOER, 
    // UPDATE_CUSTOMER,
    // DELETE_CUSTOMER 
    } from '../actions/types'
   

const initialSatate = {
    primaryContact:false,
    updatedCustomerSettingStatusLevel:[],
    showSpecificCustomerSettingSatausLevel:[],

    updatedCustomerSettingReturnReason:[],
    showSpecificCustomerSettingReturnReason:[],

    updatedCustomerSettingAccountReason:[],
    showSpecificCustomerSettingAccountReason:[],

    updatedCustomerSettingTerms:[],
    showSpecificCustomerSettingTerms:[],

//
    updatedCustomerSettingType:[],
    showSpecificCustomerSettingType:[],

    updatedCustomerSettingDeliveryMethod:[],
    showSpecificCustomerDeliveryMethod:[],

    customerContactIndex:"",
    customerAddressIndex:"",
    CustomerSettingName1:{},
    CustomerSettingName2:{},
    name:"",
   customerList:[],
   pageNumber:0,
   duplicateData:[],
   activeData:[],
   inactiveData:[],
   radioFilter:"active",
   
   searchFilter:"",
   alphabetSearch:"All",
   ready_to_late_notice:0,
   reserve_expiry_notice:2,
   first_notice:0,
   second_notice:0,
   quote_set_to_inactive:0,
   customerExchange:{
    from_currency:"CAD",
    to_currency:"US",
    exchange_rate:1.000,
    exchange_date:new Date().getFullYear()+"-"+(new Date().getMonth().toString().length===1?"0"+(new Date().getMonth()+1):new Date().getMonth())+"-"
    +(new Date().getDate().toString().length===1?"0"+(new Date().getDate()):new Date().getDate())

   },
   customerIntrest:{

    monthly: 0,
    yearly: 0,
    taxrate: 0,
    taxrate_label: "",
    taxrate_number: ""
   },
   customerTag:{
    base_price: 0,
    custom_logo: 0,
    custom_pricing: 0,
    custom_application: 0,
   }
   ,customerTypes:{
    customer_type:"",
    short_code:""
   },

   customerDelivery:{delivery_method:""},
   customerDeliveryList:{active:[],inactive:[]},
   customerTypeList:{active:[],inactive:[]},
   customerTypeListForOrder:{active:[],inactive:[]},
   customerStatus:{status_level:""},
   customerStatusList:{active:[],inactive:[]},
   customerReason:{reason:""},
   customerReasonList:{active:[],inactive:[]},
   customerTerm : {term:""},
   customerTermList:{active:[],inactive:[]},
   customerReturnReason:{reason: "",return_to_inventory: 2},
   customerReturnReasonList:{active:[],inactive:[]},

   customerDataById:{addresses:[],contacts:[],name:"",customer_details:"",type:[],address_id:0,contact_id:0,alternative_id:"",alert:"",reason:"",prospect:0,level:0,status:1,dispatch_type:"Delivery" ,
   tax_exempt: 0,fax:"",website_url:"",print:0,quantity:"0",
   tax_exempt_no: "",currency:"Canadian Dollar",p_o_req:0,unit_of_measurement:"Metric",payment_terms:0,discount:"0.00",discount_by_line_item:1,restock_fee:1,fee_percent:"0.00"},
   customerDataById1:{addresses:[],contacts:[],name:"",customer_details:"",type:[],address_id:0,contact_id:0,alternative_id:"",alert:"",reason:"",prospect:0,level:0,status:1,dispatch_type:"Delivery" ,
   tax_exempt: 0,fax:"",website_url:"",print:0,quantity:"0",
   tax_exempt_no: "",currency:"Canadian Dollar",p_o_req:0,unit_of_measurement:"Metric",payment_terms:0,discount:"0.00",discount_by_line_item:1,restock_fee:1,fee_percent:"0.00"},

   customerDataByIdForOrder:{customercontact:[],name:"",customer_details:"",type:[],address_id:0,contact_id:0,alternative_id:"",alert:"",reason:"",prospect:0,level:0,status:1,dispatch_type:"Delivery" ,
   tax_exempt: 0,fax:"",website_url:"",print:0,quantity:"0",
   tax_exempt_no: "",currency:"Canadian Dollar",p_o_req:0,unit_of_measurement:"Metric",payment_terms:0,discount:"0.00",discount_by_line_item:1,restock_fee:1,fee_percent:"0.00"},

    action:"",
    customerContact:{
        customer_id: 0,
        first_name: "",
        last_name: "",
        email: "",
        phone1: "",
        phone1_ext: "",
        phone2: "",
        phone2_ext: "",
        notes: "",
        primary_contact: 0,
        all_communication: 0,
        status: 1,
    
      },
      customerContactList:{active:[],inactive:[]},
      customerAddress:{
        customer_id: 0,
        address1: "",
        address2: "",
        city: "",
        country: "Canada",
        state: "Alberta",
        zip: "",
        lat: "",
        long: "",
        status:1,
        notes: "",
        billing_address: 0,
        delivery_address: 0,
      },
      customerAddressList:{active:[],inactive:[]},
   
  }



 const customerReducer = (state = initialSatate, action)=>{
    console.log(action.payload)
    console.log(state)
    // alert(action.type)x
    
    switch(action.type){
        case DELETE_CUSTOMER_CONTACT:
            let customerContactDetail = state.customerDataById
            customerContactDetail["contacts"].splice(action.payload,1)
            return{
                ...state,
                customerDataById:customerContactDetail


            }
        case DELETE_CUSTOMER_ADDRESS:
            let customerAddressDetail = state.customerDataById
            customerAddressDetail["addresses"].splice(action.payload,1)
            return{
                ...state,
                customerDataById:customerContactDetail


            }
        case UPDATE_CONTACT:
            
            return{
                ...state,
                customerDataById:{...state.customerDataById,contacts:action.payload}

            }
            case UPDATE_CONTACT1:
            
                return{
                    ...state,
                    customerDataById:{...state.customerDataById,addresses:action.payload}
    
                }
        case HANDLE_INPUT_CUSTOMER:
            return{
                ...state,
                [action.dataType]:{...state[action.dataType],[action.id]:action.data}

            }
        case DELETE_SUPPLIER_CONTACT:
            return{
                ...state,
            }
        case ADD_PRIMARY:
            // alert(JSON.stringify(action.payload))
            let data = action.payload
            // data.primary_contact=1
            delete data.customer_id 
            let customerDetails = state.customerDataById
            customerDetails["contacts"].push(data)
            // customerDetails["contacts"][0] = data

           
            return{
                ...state,
                customerDataById:customerDetails,
                primaryContact:false

            }
        case  ADD_CONTACT_ADDRESS:
            let address = action.payload
            // data.primary_contact=1
            // delete data.customer_id 
            let customerDetails1 = state.customerDataById
            customerDetails1["addresses"].push(address)
            return{
                ...state,
                customerDataById:customerDetails1,
                primaryContact:false

            }
        case EDIT_PRIMARY:
            let data1 = action.payload
            // data.primary_contact=1
            // delete data.customer_id 
            // let customerDetails = state.customerDataById
            // customerDetails["contacts"][0] = data
                
            return{
                ...state,
                customerContact:data1,
                primaryContact:true

            }

        case RESET_CONTACT:
            return{
                ...state,
                customerContact:{
                 
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone1: "",
                    phone1_ext: "",
                    phone2: "",
                    phone2_ext: "",
                    notes: "",
                    primary_contact: 0,
                    all_communication: 0,
                    status: 1,
                
                  },

            }
        case RE_SET_ADDRESS_FILED:
            return{
                ...state,
                customerAddress:{
                    customer_id: 0,
                    address1: "",
                    address2: "",
                    city: "",
                    country: "Canada",
                    state: "Alberta",
                    zip: "",
                    status:1,
                    lat: "",
                    long: "",
                    notes: "",
                    billing_address: 0,
                    delivery_address: 0,
                  },
            }
        case GET_CONTACT_ADDRESSES_BY_CONTACTID:

            let customerDataNew =  state.customerDataById
            let addes  = customerDataNew["addresses"][action.payload]
            return{
                ...state,
                customerAddress:addes,
                customerAddressIndex:action.payload
            }
          
        case GET_CONTACT_ADDRESSES:
            return{
                ...state,
                customerAddressList:action.payload.data
            }
        case GET_CUSTOMER_CONTACT_BY_ID:
            let customerData =  state.customerDataById
            let contact  = customerData["contacts"][action.payload]
            return{
                ...state,
                customerContact:contact,
                customerContactIndex:action.payload
            }
        case GET_CUSTOMER_CONTACTS_LIST:
            return{
                ...state,
                customerContactList:action.payload.data

            }

            case ADD_CUSTOMER_CONTACT1:
                return{
                    ...state,
                    customerContactList:{active:[action.payload]}
                }     
        case ADD_CUSTOMER_CONTACT:
            return{
                ...state,
                customerContact:{
                    customer_id: 0,
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone1: "",
                    phone1_ext: "",
                    phone2: "",
                    phone2_ext: "",
                    notes: "",
                    primary_contact: 0,
                    all_communication: 0,
                    status: 1,
                
                  },
            }
        case UPDATE_CONTACT_ADDRESS:
            let customer  = state.customerDataById
            customer["addresses"][state.customerAddressIndex] = action.payload
            return{
                ...state,
                customerDataById:customer,
                customerAddress:{
                    customer_id: 0,
                    address1: "",
                    address2: "",
                    city: "",
                    status:1,
                    country: "Canada",
                    state: "Alberta",
                    zip: "",
                    lat: "",
                    long: "",
                    notes: "",
                    billing_address: 0,
                    delivery_address: 0,
                  },

            }
        case UPDATE_CUSTOMER_CONTACT:
            let customerData1  = state.customerDataById
            customerData1["contacts"][state.customerContactIndex] = action.payload
            return{
                ...state,
                customerDataById:customerData1,
                customerContact:{
                    customer_id: 0,
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone1: "",
                    phone1_ext: "",
                    phone2: "",
                    phone2_ext: "",
                    notes: "",
                    primary_contact: 0,
                    all_communication: 0,
                    status: 1,
                
                  },

            }
        case GET_PRINT_DATA:
            return{
                ...state,
                customerTag:action.payload.data

            }
        case GET_INTEREST_DATA:
            return{
                ...state,
                customerIntrest:action.payload.data

            }
/////////////customer management add edit delete and show actions/////////////////////////
case ADD_NEW_CUSTOMER:
    console.log(action.payload)
    return{
        ...state,
        customerDataById:{...action.payload,type:JSON.parse(action.payload.type),customeraddress:[],print:0,quantity:0,addresses:[]},
        customerContact:{
            customer_id: 0,
            first_name: "",
            last_name: "",
            email: "",
            phone1: "",
            phone1_ext: "",
            phone2: "",
            phone2_ext: "",
            notes: "",
            primary_contact: 0,
            all_communication: 0,
            status: 1,
        
          },
        
    }
    case EDIT_CUSTOMER:
        return{
            ...state,
            
        }
    case DELETE_CUSTOMER:
        return{
            ...state,

        }
    case TYPE_OF_ACTION:
        return{
            ...state,
            action:action.action
        }
    case GET_CUSTOMER_BY_ID:
        return{
            ...state,
            customerDataById:{...action.payload,type:JSON.parse(action.payload.type),print:0,quantity:0}

        }
        case GET_CUSTOMER_BY_ID1:
            return{
                ...state,
                customerDataById1:{...action.payload,type:JSON.parse(action.payload.type),print:0,quantity:0},
                customerDataByIdForOrder:{...action.payload,type:JSON.parse(action.payload.type)}
    
            }
    case RESET_CUSTOMER_FILEDS:
        return{
            ...state,
            customerContact:{
                customer_id: 0,
                first_name: "",
                last_name: "",
                email: "",
                phone1: "",
                phone1_ext: "",
                phone2: "",
                phone2_ext: "",
                notes: "",
                primary_contact: 0,
                all_communication: 0,
                status: 1,
            
              },
              customerContactList:{active:[],inactive:[]},
              customerAddress:{
                customer_id: 0,
                address1: "",
                address2: "",
                city: "",
                country: "Canada",
                state: "Alberta",
                zip: "",
                lat: "",
                long: "",
                notes: "",
                status:1,
                billing_address: 0,
                delivery_address: 0,
              },
              customerAddressNew:{
                customer_id: 0,
                address1: "",
                address2: "",
                city: "",
                country: "Canada",
                state: "Alberta",
                zip: "",
                lat: "",
                long: "",
                notes: "",
                status:1,
                billing_address: 0,
                delivery_address: 0,
              },
              customerAddressList:{active:[],inactive:[]},

              customerDataById:{addresses:[],contacts:[],name:"",customer_details:"",type:[],address_id:0,contact_id:0,alternative_id:"",alert:"",reason:"",status:1,prospect:0,level:0,dispatch_type:"Delivery" ,
              tax_exempt: 0,fax:"",website_url:"",print:0,quantity:0,
              tax_exempt_no: "",p_o_req:0,unit_of_measurement:"Metric",payment_terms:0,discount:"0.00",discount_by_line_item:1,restock_fee:1,fee_percent:"0.00"},
        }
    case UPDATE_CUSTOMER:
        return {
            ...state,

        }




// UPDATE_CUSTOMER_ACCOUNT_REASON_SETTING,
// SHOW_SPECIFIC_CUSTOMER_ACCOUNT_REASON_SETTING,

// UPDATE_CUSTOMER_TERMS_SETTING,
// SHOW_SPECIFIC_CUSTOMER_TERMS_SETTING,





            case UPDATE_CUSTOMER_TERMS_SETTING:
                return{
                    ...state,
                    updatedCustomerSettingTerms:action.payload.data
                }
            case SHOW_SPECIFIC_CUSTOMER_TERMS_SETTING:
                
                return{
                    ...state,
                    showSpecificCustomerSettingTerms:action.payload.data
                }

            case UPDATE_CUSTOMER_ACCOUNT_REASON_SETTING:
                return{
                    ...state,
                    updatedCustomerSettingAccountReason:action.payload.data
                }
            case SHOW_SPECIFIC_CUSTOMER_ACCOUNT_REASON_SETTING:
                
                return{
                    ...state,
                    showSpecificCustomerSettingAccountReason:action.payload.data
                }




            case UPDATE_CUSTOMER_RETURN_REASON_SETTING:
                return{
                    ...state,
                    updatedCustomerSettingReturnReason:action.payload.data
                }
            case SHOW_SPECIFIC_CUSTOMER_RETURN_REASON_SETTING:
                
                return{
                    ...state,
                    showSpecificCustomerSettingReturnReason:action.payload.data
                }




        case UPDATE_CUSTOMER_STATUS_LEVEL_SETTING:
            return{
                ...state,
                updatedCustomerSettingStatusLevel:action.payload.data
            }
        case SHOW_SPECIFIC_CUSTOMER_STATUS_LEVEL_SETTING:
            
            return{
                ...state,
                showSpecificCustomerSettingSatausLevel:action.payload.data
            }




        case UPDATE_CUSTOMER_TYPE_SETTING:
            return{
                ...state,
                updatedCustomerSettingType:action.payload.data
            }
        case SHOW_SPECIFIC_CUSTOMER_TYPE_SETTING:
            
            return{
                ...state,
                showSpecificCustomerSettingType:action.payload.data
            }








            case UPDATE_CUSTOMER_DELIVERY_METHOD_SETTING:
                return{
                    ...state,
                    updatedCustomerSettingDeliveryMethod:action.payload.data
                }
            case SHOW_SPECIFIC_CUSTOMER_DELIVERY_METHOD_SETTING:
                
                return{
                    ...state,
                    showSpecificCustomerDeliveryMethod:action.payload.data
                }

            //SHOW_SPECIFIC_CUSTOMER_DELIVERY_METHOD_SETTING,
//UPDATE_CUSTOMER_DELIVERY_METHOD_SETTING,

                case HANDLE_CUSTOMER_SETTIING_INPUT_DATA:
                    return{
                        ...state,
                        CustomerSettingName1:{...state.CustomerSettingName1,[action.name]:action.value}
                    }


                    case HANDLE_INPUT_EXCHANGE:
                        return{
                            ...state,
                            CustomerSettingName2:{...state.CustomerSettingName2,[action.name]:action.value}
                           // [action.dataType]:{...state[action.dataType],[action.id]:action.data}
            
                        }
                    // return{
                    //     ...state,
                    //     [action.dataType]:{...state[action.dataType],[action.id]:action.data}
                                     
                    // }












////////////////////////////ends here////////////////////////












        case GET_EXCHANGE_DATA:
            return{
                ...state,
                customerExchange:action.payload.data

            }
        case ADD_CUSTOMER_RETURN_REASON:
            return{
                ...state,
                customerReturnReason:{reason: "",return_to_inventory:"2"}
                
            }
        case GET_CUSTOMER_RETURN_REASON:
            return{
                ...state,
                customerReturnReasonList:action.payload.data

            }
        case  GET_CUSTOMER_TERMS:
            return{
                ...state,
                customerTermList:action.payload.data


            }
       

        case ADD_CUSTOMER_TERMS:
            return{
                ...state,
                customerTerm : {term:""},


            }
        case GET_CUSTOMER_REASON:
            return{
                ...state,
                customerReasonList:action.payload.data

            }
        case ADD_CUSTOMER_REASON:
            return{
                ...state,
                customerReason:{reason:""}

            }
        case ADD_CUSTOMER_STATUS:
            return{
                ...state,
                customerStatus:{status_level:""},

            }
        case GET_CUSTOMER_STATUS:
            return{
                ...state,
                customerStatusList:action.payload.data


            }
        case ADD_CUSTOMER_DELIVERY:
            return{
                ...state,
                customerDelivery:{delivery_method:""}

            }
        case GET_CUSTOMER_DELIVERY_LIST:
        return{
            ...state,
            customerDeliveryList:action.payload.data

        }
        case HANDLE_DRAG_CUSTOMER_CATEGORY:
            return{
                ...state
            }
        case GET_ALL_CUSTOMER_TYPES:
            return{
                ...state,
                customerTypeList:action.payload.data,
                customerTypeListForOrder:action.payload.data,

            }
        case ADD_CUSTOMER_TYPE :
            return{
                ...state,
                customerTypes:{customer_type:"",
                short_code:""}
                
            }
        case ADD_PRINT_DATA:
            return{
                ...state,
                customerTag:{...action.payload.data}

            }
        case ADD_INTEREST_DATA:
            return{
                ...state,
                customerIntrest:{...action.payload.data}

            }
      
        case ADD_FINANCES_DATA:
            // let date = action.payload.data.exchange_date.split("-")
            // let dateInformate = new Date(date[0],date[1]-1,date[2])
            return{
                ...state,
                customerExchange:{...action.payload.data}

            }
        case HANDLE_INPUT_EXCHANGE1:
            return{
                ...state,
                [action.dataType]:{...state[action.dataType],[action.id]:action.data}

            }
        case ADD_EMAIL:
            return{
                ...state,
                first_notice:action.payload.data.first_notice,
                second_notice:action.payload.data.second_notice,
                quote_set_to_inactive:action.payload.data.quote_set_to_inactive
               

            }
            case GET_EMAIL_NOTIFICATION:
            return{
                ...state,
                first_notice:action.payload.data.active[0].first_notice,
                second_notice:action.payload.data.active[0].second_notice,
                quote_set_to_inactive:action.payload.data.active[0].quote_set_to_inactive
               

            }
        case GET_CUSTOMER_NOTIFICATION:
            return{
                ...state,
                ready_to_late_notice:action.payload.data.active[0].ready_to_late_notice,
                reserve_expiry_notice:action.payload.data.active[0].reserve_expiry_notice

            }
        case ADD_NOTIFICATION:
            return{
                ...state,
                ready_to_late_notice:action.payload.data.ready_to_late_notice,
                reserve_expiry_notice:action.payload.data.reserve_expiry_notice

            }

        // plant page redirects
        case HANDLE_INPUT:
            return{
                ...state,
                [action.id]:action.data

            }
     

        case GET_CUSTOMER_LIST :
            return{
                ...state,
                customerList:[...action.payload.data.active],
                inactiveData:[...action.payload.data.inactive],
                duplicateData:[...action.payload.data.active,...action.payload.data.inactive],
                activeData:[...action.payload.data.active]         
            }
            case SET_PAGE_NUMBER:
                return{
                    ...state,
                    pageNumber:action.pageNumber
                }
            case FILTER_DATA_BY_SEARCH:
                if(action.resetAction ==="reset"){
                    let datatoShow = []
                    let searchedData = []
                    datatoShow = state.activeData
                    searchedData = datatoShow
                    return{
                        ...state,
                        customerList:searchedData,
                        searchFilter:action.searchData,
                        radioFilter:"active",
                        alphabetSearch:"All"

                    }
                    

                }
                let datatoShow = []
                let searchedData = []
                if(state.radioFilter === "active") datatoShow = state.activeData
                else if(state.radioFilter === "inactive") datatoShow = state.inactiveData
                else datatoShow = state.duplicateData

                if(state.alphabetSearch ==="All" && action.searchData !=="")searchedData = datatoShow.filter(filterData=>filterData.name.toLowerCase().includes(action.searchData.toLowerCase()))
                else if(action.searchData !=="" && state.alphabetSearch !=="All") searchedData = datatoShow.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0)) &&(filterData.name.toLowerCase().includes(action.searchData.toLowerCase())))
                else if(action.searchData  ==="" && state.alphabetSearch !=="All") searchedData = datatoShow.filter(filterData=>filterData.name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0))
                else if(action.searchData  ==="" && state.alphabetSearch  ==="All") searchedData = datatoShow

                

                return{
                    ...state,
                    customerList:searchedData,
                    searchFilter:action.searchData
                }
            case FILTER_DATA_BY_RADIO:
                let radioData = []
                // alert(action.actionType)
                if(action.actionType === "active" && state.searchFilter ==="" && state.alphabetSearch ==="All")radioData = state.activeData
                else if(action.actionType === "active" && state.searchFilter !=="" && state.alphabetSearch ==="All")radioData =state.activeData.filter(data=>data.name.toLowerCase().includes(state.searchFilter.toLowerCase()))
                else if(action.actionType === "active" && state.searchFilter ==="" && state.alphabetSearch !=="All")radioData =state.activeData.filter(filterData=>(filterData.name.toLowerCase().charAt(0)=== state.alphabetSearch.toLowerCase()))

                else if(action.actionType === "active" && state.searchFilter !=="" && state.alphabetSearch !=="All")radioData = state.activeData.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0)) &&(filterData.name.toLowerCase().includes(state.searchFilter.toLowerCase())))
                    ////////////////////////////////
                    if(action.actionType === "inactive" && state.searchFilter ==="" && state.alphabetSearch ==="All") radioData = state.inactiveData
                    else if(action.actionType === "inactive" && state.searchFilter !=="" && state.alphabetSearch ==="All")radioData =state.inactiveData.filter(data=>data.name.toLowerCase().includes(state.searchFilter.toLowerCase()))
    
                    else if(action.actionType === "inactive" && state.searchFilter ==="" && state.alphabetSearch !=="All")radioData =state.inactiveData.filter(filterData=>(filterData.name.toLowerCase().charAt(0)=== state.alphabetSearch.toLowerCase()))
    
                    else if(action.actionType === "inactive" && state.searchFilter !=="" && state.alphabetSearch !=="All")radioData = state.inactiveData.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0)) &&(filterData.name.toLowerCase().includes(state.searchFilter.toLowerCase())))

                    ////////////////////////////////
                    if(action.actionType === "all" && state.searchFilter ==="" && state.alphabetSearch ==="All") radioData = state.duplicateData
                    else if(action.actionType === "all" && state.searchFilter !=="" && state.alphabetSearch ==="All")radioData =state.duplicateData.filter(data=>data.name.toLowerCase().includes(state.searchFilter.toLowerCase()))
                    else if(action.actionType === "all" && state.searchFilter ==="" && state.alphabetSearch !=="All")radioData =state.duplicateData.filter(filterData=>(filterData.name.toLowerCase().charAt(0)=== state.alphabetSearch.toLowerCase()))
                    else if(action.actionType === "all" && state.searchFilter !=="" && state.alphabetSearch !=="All")radioData = state.duplicateData.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0)) &&(filterData.name.toLowerCase().includes(state.searchFilter.toLowerCase())))
            return{
                ...state,
                customerList:radioData,
                radioFilter:action.actionType

            }
            case FILTER_DATA_BY_ALPHA:
                let datatoShow1 = []
                let searchedData1 = []
                if(state.radioFilter === "active") datatoShow1 = state.activeData
                else if(state.radioFilter === "inactive") datatoShow1 = state.inactiveData
                else datatoShow1 = state.duplicateData

                if(state.searchFilter ==="" && action.alphaData !=="All") searchedData1 = datatoShow1.filter(filterData=>filterData.name.toLowerCase().charAt(0)===action.alphaData.toLowerCase().charAt(0))
                else if(state.searchFilter !=="" && action.alphaData ==="All")searchedData1 = datatoShow1.filter(filterData=>filterData.name.toLowerCase().includes(state.searchFilter.toLowerCase()))
                // else if(action.alphaData ==="All" && state.searchFilter !=="")searchedData1 = datatoShow1.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===state.searchFilter.toLowerCase().charAt(0)))
                else if(state.searchFilter !=="" && action.alphaData !=="All")searchedData1 = datatoShow1.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===action.alphaData.toLowerCase().charAt(0)) &&(filterData.name.toLowerCase().includes(state.searchFilter.toLowerCase())))
                else if(state.searchFilter ==="" && action.alphaData ==="All")searchedData1 = datatoShow1
               

                return{
                    ...state,
                    customerList:searchedData1,
                    alphabetSearch:action.alphaData
                }


                
    
        default:
                return state
    }

}
export default customerReducer