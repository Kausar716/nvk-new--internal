// import {v4 as uuidv4} from 'uuid';
import {} from '../actions/types';
// import {getAllImageAssets} from "../";

// const initialSatate = {
//     items:[
//         {
//             id:uuidv4(),
//             names:"kausar",
//             emailId:"kausarbanu716@gmail.com"
//         },
//         {
//             id:uuidv4(),
//             names:"zubear",
//             emailId:"zubear@gmail.com"
//         }
      
//     ],
//     loading:false
// }
// export default function(state = initialSatate, action){
//     switch(action.type){
//         case GET_ITEMS:
//             return{
//                 ...state
//             } 
//             // case GET_ITEMS:
//             //     return{
//             //         ...state,
//             //         items:action.payload,
//             //         loading:false
//             //     }
//             case DELETE_ITEM:
//                 return{
//                     ...state,
//                     items:state.items.filter(item=>item.id != action.payload)

//                 }
//                 case ADD_ITEM:
//                 return{
//                     ...state,
//                     items:[action.payload, ...state.items]

//                 }
//                 case ITEMS_LOADING:
//                     return{
//                         ...state,
//                         loading:true
    
//                     }
//             default:
//                 return state
//     }

// }