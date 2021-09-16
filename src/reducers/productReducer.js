/* eslint-disable no-unused-vars */
// import {v4 as uuidv4} from 'uuid';

import actions from 'redux-form/lib/actions';
import {    
    //PRODUCT ACTION

    CREATE_PRODUCT_ACTION,
    UPDATE_PRODUCT_ACTION,
    DELETE_PRODUCT_ACTION,
    GET_ALL_PRODUCT_ACTION,
    GET_SPECIFIED_PRODUCT_ACTION,
    GET_SKU_SPECIFIED_PRODUCT,
    DUPLICTE_PRODUCT,
    CHECK_BOX_SKU1,
    UPDATE_CHECK_BOX_SKU1,

    // SKU ACTION

    CREATE_SKU_ACTION,
    UPDATE_SKU_ACTION,
    DELETE_SKU_ACTION,
    GET_ALL_SKU_ACTION,
    GET_SPECIFIED_SKU_ACTION,
    UPDATE_SKU_ACTION_CLEAR,
    UPDATE_PLANT_SKU_ACTION,
    CLEAR_SKU_FIELDS_PRODUCT,
    CREATE_SKU_ACTION_AND_CLEAR,

    //PAGE REDIRECTS ACTION

    PAGE_REDIRECT_ACTION,
    SUB_PAGE_REDIRECT_ACTION,
    SET_PAGE_NUMBER,
    SET_SKU_PAGE_NUMBER,
    
    // INPUT HANDLE
    HANDLE_INPUT_DATA,
    HANDLE_TAG_INPUT_DATA,
    HANDLE_SKU_INPUT_DATA,
    ERROR_HANDLE,
    HANDLE_MANUFACTURE_DATA,
    HANDLE_SELECTED_CATEGORY,
    HANDLE_PRODUCT_RADIO_RESET,

    // filter category Data
    FILTER_CATEGORY_DATA,
    FILTER_GET_ALL_CATEGORY_DATA,
    FILTER_GET_SLECTED_CATEGORY_DATA,
    FILTER_GET_SLECTED_CATEGORY_SUB_DATA,
    HANDLE_PRODUCT_SEARCH_INPUT,
    HANDLE_PRODUCT_RADIO_TOGGLE
    


} from '../actions/types';
let minMonth = new Date().getMonth()
let minDate = new Date().getDate()
let minDateFormate = minDate.toString().length===1?"0"+minDate:minDate
let minMonthFormate = minMonth.toString().length===1?"0"+(minMonth+1):(minMonth+1)



const initialSatate = {
   
    productData         :   [],
    skuData             :   [],
    poduct_idStoring:'',
    productRadioButton:"active",
   
    productDataById     :   {
        name:"",
        category_id:null,
        subcategory_id:null,
        manufacturer_id:null,
        archived:0,
        internal_notes:"",
        discontinued:0,
        status:1,
        common_name:""
    },
    skuDataById         :   {
        each_cost:0.00,
        each_price:0.00,
        sale_price:0.00,
        sale_expiry_date:new Date().getFullYear()+"-"+minMonthFormate+"-"+minDateFormate,
        sku_item_name:"",
        subcategory:null,
        discontinued:null,
        archived:"0",
        status:1,
        supplier_id:1,
        volume_price_per_unit:0.00,
        volume_quantity:"0",
        location_id:"0"
       


    },
    pageToOpen          :   "product",  // pageToOpen can be general, sku and product
    actionType          :   "add",      //action type can be add, edit, delete, and update
    status              :   false,      //status is used for modal if false close modal if true open modal,
    message             :   [],         // message is used for success and error messages
    productPageNumber   :   0,
    skuPageNumber       :   0,
    pageNumber          :   0,
    needAction          :   false,
    backupData          :[],
    ae_product_id:"",
    productDataBySKUlist:[],
    manufacturer_id:"None",
    selectedCategory:"All",
    displayCancel:false

}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialSatate, action){
 //console.log("actions", action)
   
    switch(action.type){
        // page action
        case PAGE_REDIRECT_ACTION:
            return{
                ...state,
                pageToOpen:action.page,
                actionType:action.actionType,
                ae_product_id:"",
                productDataById     :   {
                    name:"",
                    category_id:null,
                    subcategory_id:null,
                    manufacturer_id:null,
                    archived:0,
                    internal_notes:"",
                    discontinued:0,
                    status:1,
                    common_name:""
                },
                skuDataById         :   {
                    each_cost:"0.00",
                    each_price:"0.00",
                    sale_price:"0.00",
                    sale_expiry_date:new Date().getFullYear()+"-"+minMonthFormate+"-"+minDateFormate,
                    sku_item_name:"",
                    subcategory:0,
                    discontinued:0,
                    status:1,
                    supplier_id:1,
                    archived:"0",
                    volume_price_per_unit:"0.00",
                    volume_quantity:"0",
                    location_id:"0"
                    //id:null
            
            
                },
                productDataBySKUlist:[],
                message:[],
                displayCancel:false,
                needAction:false,
                skuValidation:{
                    each_cost:{
                        errorMessage:"",
                      
                    },
                    each_price:{
                        errorMessage:"",
                      
                    
                    },
                    sale_price:{
                        errorMessage:""
                       
                    },
                    sku_item_name:{
                        errorMessage:""
                    },
                    sub_category:{
                        errorMessage:""
                    }
                
                }

            }
            
         

        case SUB_PAGE_REDIRECT_ACTION:
            return{
                 ...state,
                 
                pageToOpen:action.page,
                productID:action.productID
            }
            case CHECK_BOX_SKU1:
                let skuData = state.productDataBySKUlist
                skuData[action.index]["status"]= action.obj["status"]
                return{
                    ...state,
                    productDataBySKUlist:skuData,
                }
            case UPDATE_CHECK_BOX_SKU1:
                let skuData1 = state.productDataBySKUlist
                skuData1[action.index]["status"]= action.obj["status"]
                return{
                    ...state,
                    productDataBySKUlist:skuData1,
                }
        //product action
        case GET_ALL_PRODUCT_ACTION:
            console.log("actions", action.payload.data)
            let returnProductList = []   
            if(state.productRadioButton === "active")            {
                returnProductList = action.payload.data.filter(product=>{
                    return (product.archived === 0)
                })
            } 
            else if(state.productRadioButton === "archive"){
                returnProductList = action.payload.data.filter(product=>{
                    return (product.archived !== 0)
                })
            }
            else{
                returnProductList = action.payload.data
            }
               
            return{
                 ...state,
                productData:returnProductList,
                backupData:action.payload.data,
                manufacturer_id:"None",
                selectedCategory:"All",
            }

        case GET_SKU_SPECIFIED_PRODUCT:
            //debugger;
           return {
                ...state,
                productDataBySKUlist:action.payload.data,
                //backupData:action.payload.data, 

            }
            
        case GET_SPECIFIED_PRODUCT_ACTION:
           
            //console.log("GET_SPECIFIED_PRODUCT_ACTION",action.payload.data)
            console.log(action)
            return{
                ...state,
                productDataById:action.payload.data,
                needAction:false,
                actionType:action.actionType
            }
        case CREATE_PRODUCT_ACTION:
            console.log(action)
            console.log(state)
            return{
                ...state,
                needAction:false,
                ae_product_id:action.ae_product_id,
                actionType:"edit"

            }
        case UPDATE_PRODUCT_ACTION:
            return{
                ...state,
                needAction:false
            }
        case DELETE_PRODUCT_ACTION:
            return{
                ...state,
                actionType:"add",
                productDataById     :   {
                    name:"",
                    category_id:null,
                    subcategory_id:null,
                    manufacturer_id:null,
                    archived:0,
                    internal_notes:"",
                    discontinued:0,
                    common_name:""
                },
                skuDataById         :   {
                    each_cost:"0.00",
                    each_price:"0.00",
                    sale_price:"0.00",
                    sale_expiry_date:null,
                    sku_item_name:null,
                    subcategory:null,
                    discontinued:0,
                    status:1,
                    archived:"0",
                    supplier_id:1,
                    volume_price_per_unit:"0.00",
                    volume_quantity:"0",
                    location_id:"0"
                    //id:null
                },
                needAction:false,
                displayCancel:false,
                productDataBySKUlist:[]
            }
        case HANDLE_PRODUCT_RADIO_RESET:
        return{
            ...state,
            productRadioButton:"active"
        }
        case DUPLICTE_PRODUCT:
            let productRadioButton = state.productRadioButton
            if(state.actionType === "add"){
            return{
                ...state,
                actionType:"add",
                productRadioButton,
                productDataById     :   {
                    name:"",
                    category_id:null,
                    subcategory_id:null,
                    manufacturer_id:null,
                    archived:0,
                    internal_notes:"",
                    discontinued:0,
                    common_name:""
                },
                skuDataById         :   {
                    each_cost:"0.00",
                    each_price:"0.00",
                    sale_price:"0.00",
                    sale_expiry_date:null,
                    sku_item_name:null,
                    subcategory:"0",
                    discontinued:0,
                    status:1,
                    archived:0,
                    supplier_id:1,
                    volume_price_per_unit:"0.00",
                    volume_quantity:"0",
                    location_id:"0"
                    //id:null
                },
                needAction:false,
                productDataBySKUlist:[]
            }
            }
            else{
                return{
                    ...state,
                    productDataById:action.payload.product,
                    productDataBySKUlist:action.payload.sku,
                    productRadioButton,
                    skuDataById         :   {
                        each_cost:"0.00",
                        each_price:"0.00",
                        sale_price:"0.00",
                        sale_expiry_date:null,
                        sku_item_name:null,
                        subcategory:"0",
                        discontinued:0,
                        status:1,
                        archived:0,
                        supplier_id:1,
                        volume_price_per_unit:"0.00",
                        volume_quantity:"0",
                        location_id:"0"
                        //id:null
                    }
                }
            }

            case DELETE_SKU_ACTION:
                return{
                    ...state,
                    // actionType:"add",
                   
                    skuDataById         :   {
                        each_cost:"0.00",
                        each_price:"0.00",
                        sale_price:"0.00",
                        sale_expiry_date:null,
                        sku_item_name:null,
                        subcategory:"0",
                        discontinued:0,
                        archived:0,
                        status:1,
                        supplier_id:1,
                        volume_price_per_unit:"0.00",
                        volume_quantity:"0",
                        location_id:"0"
                        //id:null
                    },
                    needAction:false,
                }
    //sku action
    case GET_ALL_SKU_ACTION:
       
        return{
            ...state,
            skuData:[...action.payload.data]
        
        }
    case UPDATE_SKU_ACTION:
        return{
        
            ...state,
            needAction:false,
            displayCancel:false
            
        }


    case CREATE_SKU_ACTION:
        return{
            //const skuData = state.
            ...state, 
            needAction:false,
            displayCancel:false
            // skuData:[...action.payload.data]
        };
    case CREATE_SKU_ACTION_AND_CLEAR:
        console.log(action)
        console.log(state)
        return{
            ...state,
            skuDataById         :   {
                each_cost:"0.00",
                each_price:"0.00",
                sale_price:"0.00",
                sale_expiry_date: new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear(),
                sku_item_name:"",
                subcategory:"0",
                sub_category_id:"0",
                discontinued:0,
                status:1,
                archived:"0",
                supplier_id:1,
                volume_price_per_unit:"0.00",
                volume_quantity:"0",
                location_id:"0"
                // id:null
            },
            actionType:action.actionType,
            needAction:false,
            displayCancel:false
        }
    case UPDATE_PLANT_SKU_ACTION:{
        return{
            ...state, 
            needAction:false,
            displayCancel:false
        }
    }


    case UPDATE_SKU_ACTION_CLEAR:
        return{
            ...state,
            actionType:"edit",            
            skuDataById         :   {
                each_cost:"0.00",
                each_price:"0.00",
                sale_price:"0.00",
                sale_expiry_date:new Date(),
                sku_item_name:"",
                subcategory:"0",
                discontinued:0,
                status:1,
                archived:"0",
                supplier_id:1,
                volume_price_per_unit:"0.00",
                volume_quantity:"0",
                location_id:"0"
                //id:null
        
        
            },
            // eslint-disable-next-line no-dupe-keys
            needAction:false,
            displayCancel:false
        }
    case GET_SPECIFIED_SKU_ACTION:
        return{
            
           ...state,
            skuDataById:action.payload,
            // productDataById:action.payload.data,
            //     tagsData:JSON.parse(action.payload.data.common_name),
                needAction:false,
                actionType:action.actionType
        }

            
        // pagination action
        case SET_PAGE_NUMBER:
            return{
                ...state,
                pageNumber:action.pageNumber
            }
        case SET_SKU_PAGE_NUMBER:
            return{
                ...state,
                skuPageNumber:action.skuPageNumber
            }
        //input handle action
        case HANDLE_INPUT_DATA:
            console.log(action.itemValue)
            return{
                ...state,
                productDataById:{...state.productDataById, [action.itemId]:action.itemValue},
                needAction:true                

            }
        case HANDLE_SKU_INPUT_DATA:
            console.log(action)
            console.log(action.itemId)
            console.log(action.itemValue)
            if(action.itemId === "volume_quantity" && action.itemValue === "0" ){
                return{
                    ...state,
                    skuDataById:{...state.skuDataById,[action.itemId]:action.itemValue,volume_price_per_unit:"0.00"},
                    needAction:true,
                    displayCancel:true
                }
            }
            else{
            return{
                ...state,
                skuDataById:{...state.skuDataById,[action.itemId]:action.itemValue},
                needAction:true,
                displayCancel:true
            }
        }
        //filter handle
        case FILTER_CATEGORY_DATA:
            return{
                ...state,
                productData:state.productData.filter(product=>
                    (product.category_id === action.categoryId) &&  
                    (product.subcategory_id ===  action.subCategoryId))
            
                }
        case FILTER_GET_ALL_CATEGORY_DATA:
            console.log("all cat")
            console.log(action)
            return{
                ...state,

            }

        case FILTER_GET_SLECTED_CATEGORY_DATA:
            // JSON.stringify(product.category_id )===action.categoryId
            console.log(action)
          
            return{
                ...state,
                // productData:state.backupData.filter(product=>JSON.stringify(product.category_id )===action.categoryId),
                selectedCategory:action.categoryId
            }
        case FILTER_GET_SLECTED_CATEGORY_SUB_DATA:
            //debugger;
            console.log("action123456", action)
            console.log("cat sub cat",state.productData)
            console.log(action.subCategoryId)
            let selectedSubCategory = action.categoryId.filter(data=>JSON.stringify(data.id) === action.subCategoryId )[0]
            console.log(selectedSubCategory)
            return{
                ...state,
                //productData:state.productData.filter(product=>(JSON.stringify(product.category_id)===action.categoryId && JSON.stringify(product.subcategory_id) ===  action.subCategoryId))
                productData:state.backupData.filter(product=>( JSON.stringify(product.subcategory_id).includes(selectedSubCategory.name)))
            }
        case ERROR_HANDLE:
            return{
                ...state,
                status:action.status,
                message:action.message
            }


            case HANDLE_PRODUCT_SEARCH_INPUT: 
                var optionVal = -1;
                var categoryVal = "";
                let filterManufactur=0
                let filterCategory = 0
                console.log(state.backupData)
                console.log(action)
                if(action.payload.option ==="active"){
                    optionVal = 0;
                }
                if(action.payload.option ==="archive"){
                    optionVal = 1;
                }
                if(action.payload.manufactureId === "None" || action.payload.manufactureId === 0 ){
                    filterManufactur=1
                }
                if(action.payload.category === "All"){
                    filterCategory =1
                }         
              
                if(action.payload.category !== "All"){
                    categoryVal = action.payload.category;
                }
                if(action.payload.product.trim() ==="" && optionVal === -1 && categoryVal === "0"){
                    return{
                        ...state,
                        productData:state.backupData,
                        productRadioButton:action.payload.option
                    }
                }else{
                    console.log("in",action)
                    console.log(parseInt(categoryVal),"sadfd")
                    return{
                        ...state,
                        productRadioButton:action.payload.option,
                        productData:state.backupData.filter(
                            filterData=>(filterData.name.trim().toLowerCase().includes(action.payload.product.trim().toLowerCase()) || action.payload.product==="") &&
                            (filterData.archived===optionVal || optionVal===-1) &&
                            (filterCategory===0?filterData.category_id === parseInt(categoryVal):true) 
                            &&(filterManufactur===0?(filterData.manufacturer_id === action.payload.manufactureId):true) 
                            // ((filterData.manufacturer_id === action.payload.manufactureId)||(action.payload.manufactureId ==="None") )
                                
                            
                            )
                    }

                }

        case HANDLE_MANUFACTURE_DATA:{
            console.log(action)
            return{
                ...state,
                manufacturer_id:action.manufacturer_id
            }
        }
        case HANDLE_SELECTED_CATEGORY:{
            return{
                ...state,
                selectedCategory:action.categoryId
            }
        }
        case CLEAR_SKU_FIELDS_PRODUCT:{
      
            return{
                ...state,
                skuDataById         :   {
                    each_cost:"0.00",
                    each_price:"0.00",
                    sale_price:"0.00",
                    sale_expiry_date:new Date(),
                    sku_item_name:"",
                    sub_category_id:"0",
                    discontinued:0,
                    status:1,
                    archived:"0",
                    supplier_id:1,
                    volume_price_per_unit:"0.00",
                    volume_quantity:"0",
                    location_id:"0"
                   
                    //id:null
            
            
                },
                actionType:action.actionType,
                displayCancel:false
            }
        }
        default:
            return state
     

        
    }

} 