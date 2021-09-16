/* eslint-disable no-case-declarations */
import {
    ADD_SUPPLIER,
    // ADD_SUPPLIER_DELIVERY_LOCATION,
    // ADD_contacts ,
    // ADD_SUPPLIER_CATEGORY, 
    // CREATE_SUPPLIER_ADDRESS,
    // ADD_SUPPLIER_REASON, 
   
    GET_ALL_SUPPLIER ,
    UPDATE_SUPPLIER_ADDRESS_CHECK,
    // GET_ALL_SUPPLIER_ADDRESS,
    // GET_ALL_SUPPLIER_CONTACT ,
    // GET_ALL_SUPPLIER_DELIVERY_LOCATION, 
    // GET_ALL_SUPPLIER_CATEGORIES,
    // GET_ALL_SUPPLIER_REASONS, 
     GET_SPECIFIED_SUPPLIER_DELIVERY_LOCATION ,
    // GET_SPECIFIED_SUPPLIER_REASON, 
    // GET_SPECIFIED_SUPPLIER_ADDRESS,
    // GET_SPECIFIED_SUPPLIER_CONTACT,
    // GET_SPECIFIED_SUPPLIER ,
    // GET_SPECIFIED_SUPPLIER_CATEGORY, 
   
    UPDATE_SUPPLIER ,
     UPDATE_SUPPLIER_REASON ,
     RESET_SUPPLIER_FILED,
    // UPDATE_SUPPLIER_ADDRESS,
    // UPDATE_SUPPLIER_CONTACT,
     UPDATE_SUPPLIER_DELIVERY_LOCATION, 
    // UPDATE_DELIVERY_CATEGORY,
   
    DELETE_SUPPLIER ,
    // DELETE_SUPPLIER_REASON, 
    // DELETE_SUPPLIER_ADDRESS ,
    // DELETE_SUPPLIER_DELIVERY_LOCATION,
    // DELETE_SUPPLIER_CONTACT,
    // DELETE_SUPPLIER_CATEGORY,
   
    // REMOVE_SUPPLIER_REASON_FROM_ACTIVE_TO_INACTIVE ,
    // REMOVE_SUPPLIER_REASON_FROM_INACTIVE_TO_ACTIVE, 
    // ADD_ALL_SUPPLIER_REASON_FROM_INACTIVE_ACTIVE, 

    FETCH_SUPPLIER_ERROR,
    FETCH_SUPPLIER_LOADING,
    FETCH_SUPPLIER_SUCCESS,




 GET_SUPPLIER_LIST ,
 SET_SUPPLIER_PAGE_NUMBER,
 FILTER_SUPPLIER_DATA_BY_RADIO ,
 FILTER_SUPPLIER_BY_SEARCH,
FILTER_SUPPLIER_BY_ALPHA,
ADD_FINANCES_SUPPLIER_DATA,
HANDLE_SUPPLIER_INPUT_EXCHANGE,
ADD_SUPPLIER_ACCOUNTS,
UPDATE_SUPPLIER_CONTACT_CHECK,
GET_SUPPLIER_ACCOUNTS,
GET_SUPPLIER_CATEGORY,
ADD_SUPPLIER_CATEGORY,
ADD_SUPPLIER_LOCATION,
GET_SUPPLIER_LOCATION,
GET_EXCHANGE_SUPPLIER_DATA,
SHOW_SPECIFIC_SUPPLIER_REASON,
HANDLE_REASON_INPUT_ACTION,
SHOW_SPECIFIC_SUPPLIER_CATEGORY,
UPDATE_SUPPLIER_CATEGORY,
TYPE_OF_SUPPLIER_ACTION,
GET_SUPPLIER_BY_ID,

ADD_SUPPLIER_CONTACT,
GET_SUPPLIER_CONTACT,
GET_ALL_SUPPLIER_CONTACT,
DELETE_SUPPLIER_CONTACT,
UPDATE_SUPPLIER_CONTACT,
RESET_SUPPLIER_DATA,


//supplier address
ADD_SUPPLIER_ADDRESS,
GET_SUPPLIER_ADDRESS,
GET_ALL_SUPPLIER_ADDRESS,
DELETE_SUPPLIER_ADDRESS,
UPDATE_SUPPLIER_ADDRESS,

RESET_SUPPLIER_CONTACT,
GET_ALL_SUPPLIER_DELIVERY_LOCATION,

    // EDIT_SUPPLIER_ERROR,
    // EDIT_SUPPLIER_SUCCESS,

    // DELETE_SUPPLIER_ERROR,
    // DELETE_SUPPLIER_SUCCESS,



    // config,
    // axios,

} from '../actions/types';






const defaultState={
    supplierInfo:[],
    supplierContactIndex:"",
    supplierAddressIndex:"",
    specificSupplierDeliveryList:[],
    supplierUpdatedDeliveryList:[],
    specificSubAttribute:[],
    supplierCategoryList:[],
    specificCategorySubAttribute:[],
    error:null,
    subAttributeName:{},
    isLoading:false,
    supplierList:[],
    pageNumber:0,
    searchFilter:"",
    radioFilter:"active",
    alphabetSearch:"All",
    inactiveData:[],
    activeData:[],
    supplierExchange:{
        from_currency:"CAD",
        to_currency:"US",
        exchange_rate:1.000,
        exchange_date:new Date().getFullYear()+"-"+(new Date().getMonth().toString().length===1?"0"+(new Date().getMonth()+1):new Date().getMonth())+"-"
        +(new Date().getDate().toString().length===1?"0"+(new Date().getDate()):new Date().getDate())

    },
    supplierReason:{
        reason:""
    },
    supplierReasonList:{
        active:[],
        inactive:[]
    },
    supplierCategory:{
        category:""

    },
    supplierCategoryList:{
        active:[],
        inactive:[]

    },
    supplierLocation:{
        location: "",
        address: "",
        city: "",
        state: "Select State",
        country: "Select Country" ,
        zip: "",
        lat: "",
        long: "",
    },
    supplierLocationList:{
        active:[],
        inactive:[]

    },
    supplierDataById:{
    supplier_name: "",
    fax: "",
    primary_contact:"NO PRIMARY CONTACT",
    alternative_id: "",
    website: "",
    supplier_notes: "",
    dispatch_type: 0,
    discount: "0.00",
    contacts:[],
    addresses:[],
    currency: "",
    units: "",
    status: 1,
    term:"",
   
    reason:"",
    product_categories:[]
    },
    supplierContact:{
        // supplier_id: 0,
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
        status: 1
    
      },
    supplierContactList:{active:[],inactive:[]},
    supplierAddress:{
        // supplier_id: 0,
        supplier_address: "",
        address2: "",
        city: "",
        country: "Canada",
        state: "Alberta",
        zip: "",
        lat: "",
        long: "",
        billing_address: 0,
        shipping_address: 0,
        status:1

    },
    supplierAddressList:{
        active:[],inactive:[]

    },
    action:""


};
// resetSupplierContact supplierDataById
const supplierManagementReducer =(state=defaultState, action)=>{
    console.log(action.payload)
        switch(action.type){

            case DELETE_SUPPLIER:
                return{
                    ...state,
                    
                }


                case RESET_SUPPLIER_DATA:
                    return{
                        ...state,
                        supplierLocation:{
                            location: "",
                            address: "",
                            city: "",
                            state: "Select State",
                            country: "Select Country" ,
                            zip: "",
                            lat: "",
                            long: "",
                        },
                        
                    }



            case GET_SUPPLIER_ADDRESS:
                let supplierAdd =  state.supplierDataById
                let addres  = supplierAdd["addresses"][action.payload]
                return{
                    ...state,
                    supplierAddress:addres,
                    supplierAddressIndex:action.payload
                }
                case GET_SUPPLIER_CONTACT:
                    let supplierData =  state.supplierDataById
                    let contact  = supplierData["contacts"][action.payload]
                    return{
                        ...state,
                        supplierContact:contact,
                        supplierContactIndex:action.payload
                    }
            case DELETE_SUPPLIER_ADDRESS:
                let supplierAddDel = state.supplierDataById
                supplierAddDel["addresses"].splice(action.payload,1)
                return{
                    ...state,
                    supplierDataById:supplierAddDel
    
    
                }
            case ADD_SUPPLIER_ADDRESS:
                let address = action.payload
            // data.primary_contact=1
            // delete data.customer_id 
            let supplierDetails1 = state.supplierDataById
            supplierDetails1["addresses"].push(address)
            return{
                ...state,
                supplierDataById:supplierDetails1,
                primaryContact:false

            }
            case GET_ALL_SUPPLIER_ADDRESS:
                return{
                    ...state,
                    supplierAddressList:action.payload.data

                }
            case ADD_SUPPLIER_CONTACT:

                let data = action.payload
                // data.primary_contact=1
                delete data.customer_id 
                let supplierDetails = state.supplierDataById
                supplierDetails["contacts"].push(data)
                // customerDetails["contacts"][0] = data
    
               
                return{
                    ...state,
                    supplierDataById:supplierDetails,
                    primaryContact:false,
                    supplierContact:{
                        // supplier_id: 0,
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
                        status: 1
                    
                      },
    
                }
             
            case RESET_SUPPLIER_CONTACT:
                return{
                    ...state,
                    supplierContact:{
                        // supplier_id: 0,
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
                        status: 1
                    
                      },
                      supplierAddress:{
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
            
            // case GET_SUPPLIER_CONTACT:{
            //     return{
            //         ...state,
            //         supplierContact:action.payload.data
            //     }
                
            // }
            case UPDATE_SUPPLIER_ADDRESS:
                let supplier  = state.supplierDataById
                supplier["addresses"][state.supplierAddressIndex] = action.payload
            return{
                ...state,
                supplierDataById:supplier,
                supplierAddress:{
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
            case UPDATE_SUPPLIER_CONTACT:{
                let customerData1  = state.supplierDataById
                customerData1["contacts"][state.supplierContactIndex] = action.payload
                return{
                    ...state,
                    supplierDataById:customerData1,
                    // supplierContact:{
                    //     supplier_id: 0,
                    //     first_name: "",
                    //     last_name: "",
                    //     email: "",
                    //     phone1: "",
                    //     phone1_ext: "",
                    //     phone2: "",
                    //     phone2_ext: "",
                    //     notes: "",
                    //     primary_contact: 0,
                    //     all_communication: 0,
                    //     status: 1
                    
                    //   },
    
                }
                
            }
            case UPDATE_SUPPLIER_CONTACT_CHECK:
                return{
                    ...state,
                    supplierDataById:{...state.supplierDataById,contacts:action.payload}
    
                }
                case UPDATE_SUPPLIER_ADDRESS_CHECK:
                    return{
                        ...state,
                        supplierDataById:{...state.supplierDataById,addresses:action.payload}
        
                    }
            case DELETE_SUPPLIER_CONTACT:{
                let supplierContactDetail = state.supplierDataById
                supplierContactDetail["contacts"].splice(action.payload,1)
                return{
                    ...state,
                    supplierDataById:supplierContactDetail
    
    
                }
                
            }
            case GET_ALL_SUPPLIER_CONTACT:{
                return{
                    ...state,
                    supplierContactList:action.payload.data
                }
                
            }

            case RESET_SUPPLIER_FILED:
                return{
                    ...state,
                    action:"",
                    supplierDataById:{
                        supplier_name: "",
                        fax: "",
                        contacts:[],addresses:[],
                        primary_contact: 0,
                        alternative_id: "",
                        website: "",
                        supplier_notes: "",
                        dispatch_type: 0,
                        discount:"0.00",
                        currency: "",
                        units: "",
                        status: 1,
                 
                        reason:"",
                        term:"",
                        product_categories:[]
                        },
                        supplierContact:{
                            // supplier_id: 0,
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
                            status: 1
                        
                          },
                        supplierContactList:{active:[],inactive:[]},
                        supplierAddress:{
                            supplier_id: 0,
                            supplier_address: "",
                            address2: "",
                            city: "",
                            country: "Canada",
                            state: "Alberta",
                            zip: "",
                            lat: "",
                            long: "",
                            billing_address: 0,
                            shipping_address: 0,
                            status:1
                    
                        },
                        supplierAddressList:{
                            active:[],inactive:[]
                    
                        },

                }
            case UPDATE_SUPPLIER:
                return{
                    ...state,
                    supplierDataById:{...action.payload.data,product_categories:JSON.parse(action.payload.data.product_categories)}

                }
            case GET_SUPPLIER_BY_ID:
                let categories = action.payload.product_categories==undefined?[]:action.payload.product_categories
                return{
                    ...state,
                    supplierDataById:{...action.payload,product_categories:JSON.parse(action.payload.product_categories)}

                }
            case TYPE_OF_SUPPLIER_ACTION:
                return{
                    ...state,
                    action:action.action
                }
            case GET_EXCHANGE_SUPPLIER_DATA:
                return{
                    ...state,
                    supplierExchange:action.payload.data

                }

            case GET_SUPPLIER_LOCATION:
                return{
                    ...state,
                    supplierLocationList:action.payload.data

                }
                case ADD_SUPPLIER_LOCATION:
                    return{
                        ...state,
                        supplierLocation:{
                            location: "",
                            address: "",
                            city: "",
                            state: "",
                            country: "",
                            zip: "",
                            lat: "",
                            long: "",
                        }
                        
                        
                    }

            case GET_SUPPLIER_CATEGORY:
                return{
                    ...state,
                    supplierCategoryList:action.payload.data
                   


                }
            case ADD_SUPPLIER_CATEGORY:
                return{
                    ...state,
                    supplierCategory:{
                        category:""
                
                    }

                }

            case ADD_SUPPLIER_ACCOUNTS:
                return{
                    ...state,
                    supplierReason:{
                        reason:""
                    }



                }
            case GET_SUPPLIER_ACCOUNTS:
                return{
                    ...state,
                    supplierReasonList:action.payload.data
                }

                case UPDATE_SUPPLIER_REASON:
                    return{
                        ...state,
                        supplierReasonList:action.payload.data
                    }



                    case GET_SPECIFIED_SUPPLIER_DELIVERY_LOCATION:
                        return{
                            ...state,
                            specificSupplierDeliveryList:action.payload.data
                        }
        
                        case UPDATE_SUPPLIER_DELIVERY_LOCATION:
                            return{
                                ...state,
                                supplierUpdatedDeliveryList:action.payload.data
                            }





                    //

                    case UPDATE_SUPPLIER_CATEGORY:
                        return{
                            ...state,
                            supplierCategoryList:action.payload.data
                        }

                    case SHOW_SPECIFIC_SUPPLIER_REASON:{
                        // debugger;
                         //console.log(action.payload.data[0].subattributes)UPDATE_SUPPLIER_CATEGORY
                         return{
                              ...state,
                             specificSubAttribute:action.payload.data
                        }
                     }


                     case SHOW_SPECIFIC_SUPPLIER_CATEGORY:{
                        // debugger;
                         //console.log(action.payload.data[0].subattributes)
                         return{
                              ...state,
                             specificCategorySubAttribute:action.payload.data
                        }
                     }

                     case HANDLE_REASON_INPUT_ACTION:
                        return{
                            ...state,
                            subAttributeName:{...state.subAttributeName,[action.name]:action.value}
                        }
            // switch(action.type){UPDATE_SUPPLIER_REASON
      

                // plant page redirects
                case ADD_FINANCES_SUPPLIER_DATA:
                    return{
                        ...state,
                        supplierExchange:{...action.payload.data}
                    }
                    case HANDLE_SUPPLIER_INPUT_EXCHANGE:
                        return{
                            ...state,
                            [action.dataType]:{...state[action.dataType],[action.id]:action.data}
                    
                        }
                case GET_SUPPLIER_LIST :
                    return{
                        ...state,
                        supplierList:[...action.payload.data.active],
                        inactiveData:[...action.payload.data.inactive],
                        duplicateData:[...action.payload.data.active,...action.payload.data.inactive],
                        activeData:[...action.payload.data.active]         
                    }
                    case SET_SUPPLIER_PAGE_NUMBER:
                        return{
                            ...state,
                            pageNumber:action.pageNumber
                        }
                    case FILTER_SUPPLIER_BY_SEARCH:
                        // alert(action.searchData)
                        if(action.resetAction ==="reset"){
                            let datatoShow = []
                            let searchedData = []
                            datatoShow = state.activeData
                            searchedData = datatoShow
                            return{
                                ...state,
                                supplierList:searchedData,
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
        
                        if(state.alphabetSearch ==="All" && action.searchData !=="")searchedData = datatoShow.filter(filterData=>filterData.supplier_name.toLowerCase().includes(action.searchData.toLowerCase()))
                        else if(action.searchData !=="" && state.alphabetSearch !=="All") searchedData = datatoShow.filter(filterData=>(filterData.supplier_name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0)) &&(filterData.supplier_name.toLowerCase().includes(action.searchData.toLowerCase())))
                        else if(action.searchData  ==="" && state.alphabetSearch !=="All") searchedData = datatoShow.filter(filterData=>filterData.supplier_name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0))
                        else if(action.searchData  ==="" && state.alphabetSearch  ==="All") searchedData = datatoShow
        
                        
        
                        return{
                            ...state,
                            supplierList:searchedData,
                            searchFilter:action.searchData
                        }
                    case FILTER_SUPPLIER_DATA_BY_RADIO:
                        let radioData = []
                        // if(action.actionType === "active") radioData = state.activeData
                        // if(action.actionType === "inactive") radioData = state.inactiveData
                        // if(action.actionType === "all") radioData = state.duplicateData








                        if(action.actionType === "active" && state.searchFilter ==="" && state.alphabetSearch ==="All")radioData = state.activeData
                        else if(action.actionType === "active" && state.searchFilter !=="" && state.alphabetSearch ==="All")radioData =state.activeData.filter(data=>data.supplier_name.toLowerCase().includes(state.searchFilter.toLowerCase()))
                        else if(action.actionType === "active" && state.searchFilter ==="" && state.alphabetSearch !=="All")radioData =state.activeData.filter(filterData=>(filterData.supplier_name.toLowerCase().charAt(0)=== state.alphabetSearch.toLowerCase()))
        
                        else if(action.actionType === "active" && state.searchFilter !=="" && state.alphabetSearch !=="All")radioData = state.activeData.filter(filterData=>(filterData.supplier_name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0)) &&(filterData.supplier_name.toLowerCase().includes(state.searchFilter.toLowerCase())))
                            ////////////////////////////////
                            if(action.actionType === "inactive" && state.searchFilter ==="" && state.alphabetSearch ==="All") radioData = state.inactiveData
                            else if(action.actionType === "inactive" && state.searchFilter !=="" && state.alphabetSearch ==="All")radioData =state.inactiveData.filter(data=>data.supplier_name.toLowerCase().includes(state.searchFilter.toLowerCase()))
            
                            else if(action.actionType === "inactive" && state.searchFilter ==="" && state.alphabetSearch !=="All")radioData =state.inactiveData.filter(filterData=>(filterData.supplier_name.toLowerCase().charAt(0)=== state.alphabetSearch.toLowerCase()))
            
                            else if(action.actionType === "inactive" && state.searchFilter !=="" && state.alphabetSearch !=="All")radioData = state.inactiveData.filter(filterData=>(filterData.supplier_name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0)) &&(filterData.supplier_name.toLowerCase().includes(state.searchFilter.toLowerCase())))
        
                            ////////////////////////////////
                            if(action.actionType === "all" && state.searchFilter ==="" && state.alphabetSearch ==="All") radioData = state.duplicateData
                            else if(action.actionType === "all" && state.searchFilter !=="" && state.alphabetSearch ==="All")radioData =state.duplicateData.filter(data=>data.supplier_name.toLowerCase().includes(state.searchFilter.toLowerCase()))
                            else if(action.actionType === "all" && state.searchFilter ==="" && state.alphabetSearch !=="All")radioData =state.duplicateData.filter(filterData=>(filterData.supplier_name.toLowerCase().charAt(0)=== state.alphabetSearch.toLowerCase()))
                            else if(action.actionType === "all" && state.searchFilter !=="" && state.alphabetSearch !=="All")radioData = state.duplicateData.filter(filterData=>(filterData.supplier_name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0)) &&(filterData.supplier_name.toLowerCase().includes(state.searchFilter.toLowerCase())))
                    return{
                        ...state,
                        supplierList:radioData,
                        radioFilter:action.actionType
        
                    }
                    case FILTER_SUPPLIER_BY_ALPHA:
                        let datatoShow1 = []
                        let searchedData1 = []
                        if(state.radioFilter === "active") datatoShow1 = state.activeData
                        else if(state.radioFilter === "inactive") datatoShow1 = state.inactiveData
                        else datatoShow1 = state.duplicateData
        
                        if(state.searchFilter ==="" && action.alphaData !=="All") searchedData1 = datatoShow1.filter(filterData=>filterData.supplier_name.toLowerCase().charAt(0)===action.alphaData.toLowerCase().charAt(0))
                        else if(state.searchFilter !=="" && action.alphaData ==="All")searchedData1 = datatoShow1.filter(filterData=>filterData.supplier_name.toLowerCase().includes(state.searchFilter.toLowerCase()))
                        // else if(action.alphaData ==="All" && state.searchFilter !=="")searchedData1 = datatoShow1.filter(filterData=>(filterData.supplier_name.toLowerCase().charAt(0)===state.searchFilter.toLowerCase().charAt(0)))
                        else if(state.searchFilter !=="" && action.alphaData !=="All"){
                       
                            searchedData1 = datatoShow1.filter(filterData=>(filterData.supplier_name.toLowerCase().charAt(0)===action.alphaData.toLowerCase().charAt(0)) &&(filterData.supplier_name.toLowerCase().includes(state.searchFilter.toLowerCase())))
                        }
                        else if(state.searchFilter ==="" && action.alphaData ==="All")searchedData1 = datatoShow1
                       
        
                        return{
                            ...state,
                            supplierList:searchedData1,
                            alphabetSearch:action.alphaData
                        }
        
            


















            case FETCH_SUPPLIER_SUCCESS:
                return {...state, supplierInfo:action.payload}

            case FETCH_SUPPLIER_LOADING:
                return {...state, isLoading:action.payload};


            case FETCH_SUPPLIER_ERROR:
                return {...state, error:action.payload};

            case GET_ALL_SUPPLIER:
                return {...state, supplierInfo:action.payload};
                    

            case ADD_SUPPLIER:
                        return{
                            ...state,
                            supplierDataById:{...action.payload.data,product_categories:JSON.parse(action.payload.data.product_categories),contacts:[],addresses:[]}
                        }

            default:
                return state;

        }
       
}

export default supplierManagementReducer;