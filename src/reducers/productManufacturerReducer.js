// import {v4 as uuidv4} from 'uuid';
import {   
    ///Product Manufacture Action
    GET_ALL_PRODUCT_MANUFACTURES,
    HANDLE_PRODUCT_MANUFACTURE_INPUT_DATA,
    HANDLE_ADD_PRODUCT_MANUFACTURE,
    HANDLE_DRAG_PRODUCT_MANUFACTURE,
    HANDLE_DRAG_MANUFACTURER_SORT,
    HANDLE_PRODUCT_MANUFACTURE_DELETE,
    UPDATE_PRODUCT_SETTING_MANUFACTURES,
    SHOW_SPECIFIC_PRODUCT_SETTING_MANUFACTURES,
    

} from '../actions/types';


const initialSatate = {
    productManufacturerData:[],
    name:"",
    status:"",
    updatedProductManufatureData:[],
    showSpecificProductManufacture:[],
    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialSatate, action){
    console.log(action)
   
    switch(action.type){
        case GET_ALL_PRODUCT_MANUFACTURES:
            return{
                ...state,
                productManufacturerData:[...action.payload.data.active,...action.payload.data.inactive],
                name:""

            }


            case UPDATE_PRODUCT_SETTING_MANUFACTURES:
                return{
                    ...state,
                    updatedPlantCategoryData:action.payload.data
                }
                case SHOW_SPECIFIC_PRODUCT_SETTING_MANUFACTURES:
                    return{
                        ...state,
                        showSpecificProductManufacture:action.payload.data
                    }


           
        case HANDLE_PRODUCT_MANUFACTURE_INPUT_DATA:
            return{
                ...state,
                name:action.name,
                             
            }
        case HANDLE_ADD_PRODUCT_MANUFACTURE:
            return{
                ...state
            }

        case HANDLE_DRAG_PRODUCT_MANUFACTURE:
            return{
                ...state
            }
        case HANDLE_DRAG_MANUFACTURER_SORT:
            return{
                ...state
            }
        case HANDLE_PRODUCT_MANUFACTURE_DELETE:
            return{
                ...state
            }

            default:
                return state
    }
 
        
}