import {
    GET_USERS_LIST,
    ADD_USER,   
    SHOW_USER, 
    UPDATE_USER,
    UPLOAD_USER_IMAGE,
    REMOVE_USER_IMAGE,
    DELETE_USER ,
    DISPLAY_SELECTED_LISTS
   } from '../actions/types';

   
const initialSatate = {
    users:[],
    userBackup:[],
    displaySelectedList:[],
    showUserSpecific:[]

}
 const userReduser = (state = initialSatate, action)=> {
     console.log(action)
    
    switch(action.type){
        
        case GET_USERS_LIST:
            return{
                ...state,
                users:action,
                userBackup:action              
            }
        case SHOW_USER:
           
            return{
                
                ...state,
                user:action.payload,
                showUserSpecific:action.payload

            }


            case DISPLAY_SELECTED_LISTS:{
                return{
                    ...state,
                    displaySelectedList:action.displaySelectedList
                    
                }
            }


        case UPDATE_USER:{
            return {
                ...state,
                users:state.userBackup,
                userupdated:action 
            }
        }
        case ADD_USER:{
            return{
                ...state,
                user:action,
                users:state.userBackup,
            }
        }
        case UPLOAD_USER_IMAGE:{
            return{
                ...state,
                user:action
            }
        }
        case REMOVE_USER_IMAGE:{
            return{
                ...state,
                removedData:action
            }
        }

        case DELETE_USER:{
            return{
                ...state,
                removedData:action
            }
        }

            default:
                return state
    }

}
export default userReduser