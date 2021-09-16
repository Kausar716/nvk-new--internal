// import { BsFileBreak } from 'react-icons/bs';
// import {v4 as uuidv4} from 'uuid';

import {    
    //PRODUCT ACTION

    CREATE_PRODUCT_ACTION,
    UPDATE_PRODUCT_ACTION,
    DELETE_PRODUCT_ACTION,
    GET_ALL_PRODUCT_ACTION,
    GET_SPECIFIED_PRODUCT_ACTION,

    // SKU ACTION

    //CREATE_SKU_ACTION,
    UPDATE_SKU_ACTION,
    //DELETE_SKU_ACTION,
    GET_ALL_SKU_ACTION,
    GET_SPECIFIED_SKU_ACTION,
    UPDATE_SKU_ACTION_CLEAR,

    //PAGE REDIRECTS ACTION

    PAGE_REDIRECT_ACTION,
    SUB_PAGE_REDIRECT_ACTION,
    SET_PAGE_NUMBER,
    SET_SKU_PAGE_NUMBER,
    
    // INPUT HANDLE
    HANDLE_INPUT_DATA,
   // HANDLE_TAG_INPUT_DATA,
    HANDLE_SKU_INPUT_DATA,
    ERROR_HANDLE,

    // filter category Data
    FILTER_CATEGORY_DATA,
    FILTER_GET_ALL_CATEGORY_DATA,
    FILTER_GET_SLECTED_CATEGORY_DATA,
    FILTER_GET_SLECTED_CATEGORY_SUB_DATA


} from '../actions/types';
let minMonth = new Date().getMonth()
let minDate = new Date().getDate()
let minDateFormate = minDate.toString().length===1?"0"+minDate:minDate
let minMonthFormate = minMonth.toString().length===1?"0"+(minMonth+1):(minMonth+1)



const initialSatate = {
    productData         :   [],
    skuData             :   [],
    productDataById     :   {
        name:"",
        category_id:null,
        subcategory_id:null,
        manufacturer_id:null,
        archived:0,
        internal_notes:"",
        discontinued:0
    },
    skuDataById         :   {
        each_cost:0,
        each_price:0,
        sale_price:0,
        sale_expiry_date:new Date().getFullYear()+"-"+minMonthFormate+"-"+minDateFormate,
        sku_item_name:"",
        subcategory:null,
        discontinued:0,
        status:1,
        archived:0


    },
    pageToOpen          :   "product",  // pageToOpen can be general, sku and product
    actionType          :   "add",      //action type can be add, edit, delete, and update
    status              :   false,      //status is used for modal if false close modal if true open modal,
    message             :   [],         // message is used for success and error messages
    productPageNumber   :   0,
    skuPageNumber       :   0,
    pageNumber          :   0,
    tagsData            :   [],
    needAction          :   false,
    backupData          :[]

}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialSatate, action){

   
    switch(action.type){
        // page action
        case PAGE_REDIRECT_ACTION:
            return{
                ...state,
                pageToOpen:action.page,
                actionType:action.actionType,
                productDataById     :   {
                    name:"",
                    category_id:null,
                    subcategory_id:null,
                    manufacturer_id:null,
                    archived:0,
                    internal_notes:"",
                    discontinued:0
                },
                skuDataById         :   {
                    each_cost:0,
                    each_price:0,
                    sale_price:0,
                    sale_expiry_date:new Date().getFullYear()+"-"+minMonthFormate+"-"+minDateFormate,
                    sku_item_name:"",
                    subcategory:0,
                    discontinued:0,
                    status:1,
                    archived:0
            
            
                },
                message:[],
                needAction:false,
                tagsData:[],
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
            }

        //product action
        case GET_ALL_PRODUCT_ACTION:
            return{
                 ...state,
                productData:action.payload.data,
                backupData:action.payload.data,
            }
        case GET_SPECIFIED_PRODUCT_ACTION:
            console.log(action.payload.data)
            return{
                ...state,
                productDataById:action.payload.data,
                tagsData:JSON.parse(action.payload.data.common_name),
                needAction:false,
                actionType:action.actionType
            }
        case CREATE_PRODUCT_ACTION:
            return{
                ...state,
                needAction:false
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
                    discontinued:0
                },
                skuDataById         :   {
                    each_cost:null,
                    each_price:null,
                    sale_price:null,
                    sale_expiry_date:null,
                    sku_item_name:null,
                    subcategory:null,
                    discontinued:0,
                    status:1,
                    archived:0
            
            
                },
                needAction:false,
                tagsData:[]
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
            needAction:false
            
        }
    case UPDATE_SKU_ACTION_CLEAR:
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
                discontinued:0
            },
            skuDataById         :   {
                each_cost:"",
                each_price:"",
                sale_price:"",
                sale_expiry_date:new Date(),
                sku_item_name:"",
                subcategory:null,
                discontinued:0,
                status:1,
                archived:0
        
        
            },
            // eslint-disable-next-line no-dupe-keys
            actionType:"add",
            needAction:false,
            tagsData:[]
        }
    case GET_SPECIFIED_SKU_ACTION:
        return{
            ...state,
            skuDataById:{...action.payload.data}
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
            return{
                ...state,
                productDataById:{...state.productDataById, [action.itemId]:action.itemValue},
                needAction:true

            }
        case HANDLE_SKU_INPUT_DATA:
            return{
                ...state,
                skuDataById:{...state.skuDataById,[action.itemId]:action.itemValue},
                needAction:true
            }
        //filter handle
        case FILTER_CATEGORY_DATA:
            return{
                ...state,
                productData:state.productData.filter(product=>
                    (product.category_id ===action.categoryId) &&  
                    (product.subcategory_id ===  action.subCategoryId))
            
                }
        case FILTER_GET_ALL_CATEGORY_DATA:
            console.log("all cat")
            return{
                ...state,

            }

        case FILTER_GET_SLECTED_CATEGORY_DATA:
            return{
                ...state,
                productData:state.backupData.filter(product=>product.category_id ===action.categoryId)
            }
        case FILTER_GET_SLECTED_CATEGORY_SUB_DATA:
            console.log("cat sub cat")
            return{
                ...state,
                productData:state.productData.filter(product=>(product.category_id===action.categoryId&&product.subcategory_id ===  action.subCategoryId))
            }
        case ERROR_HANDLE:
            return{
                ...state,
                status:action.status,
                message:action.message
            }
        default:
            return state
     

        
    }

}