import {
    GET_ORGANIZATION_LIST,
    ADD_ORGANIZATION,  
    SHOW_ORGANIZATION, 
    UPDATE_ORGANIZATION,
    DELETE_ORGANIZATION, 
    HANDLE_ORGANIZATION_INPUT_DATA,
    UPLOAD_ORGANIZATION_IMAGE,
    REMOVE_USER_IMAGE,
    DATA_CHANGES_ALERT,
    RESET_DATA_IN_ORG
   } from '../actions/types';

const initialSatate = {
    organizationData:{ name:"",
    sendingEmail:"",
    phone:"",
    mainTitle:"",
    secondaryTitle:"",
    mainBody:"",
    secondartBody:"",
    id:"2",
    logo:""
},

backupOrgData:[]

}
 const organizationReduser = (state = initialSatate, action)=> {
     console.log(action)
     console.log(state)
  
    switch(action.type){



        case RESET_DATA_IN_ORG:{
            return{
                ...state,
                organizationData:{
                    // name:"",
                    // sendingEmail:"",
                    // phone:"",
                    // mainTitle:"",
                    // secondaryTitle:"",
                    // mainBody:"",
                    // secondartBody:"",
                    // id:"2",
                    // logo:""
                }
                
            }

        }

        case DATA_CHANGES_ALERT:{
            return{
                ...state,
                organizationData:{...state.organizationData, }
                
                
            }

        }
        
        case GET_ORGANIZATION_LIST:
            return{
                ...state,
                organizationData:action.payload              
            }
        case SHOW_ORGANIZATION:
            //debugger;
            return{
                organizationData:action.payload,
                backupOrgData:action.payload
            }
        case UPDATE_ORGANIZATION:{
            return {
                ...state,
                organizationData:action 
            }
        }
        case ADD_ORGANIZATION:{
            return{
                ...state,
                organizationData:action              
            }
        }
        case DELETE_ORGANIZATION:{
            return{
                ...state
            }
        }
        case UPLOAD_ORGANIZATION_IMAGE:{
            return{
                ...state,
                organizationData:action
            }
        }
        case REMOVE_USER_IMAGE:{
            return{
                ...state,
                removedData:action
            }
        }
        case HANDLE_ORGANIZATION_INPUT_DATA:{
            return{
                ...state,
                organizationData:{...state.organizationData, [action.organizationId]:action.organizationValue}               
                
            }
        }
        

            default:
                return state
    }

}
export default organizationReduser