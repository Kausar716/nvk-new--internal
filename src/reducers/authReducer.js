// import {v4 as v4} from '';
import {SIGN_IN_AUTH,CHECK_LOGIN} from '../actions/types';
// import {getAllImageAssets} from "../";

const initialSatate = {
   
        emailId:"richard@nvknurseries.com",
        password:"zvky123",
        loading:false,
        loggedIn:false,
        error:false,
        bdyClass: " page-sidebar-fixed page-header-fixed page-sidebar-minified"
    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialSatate, action){
    switch(action.type){

            case SIGN_IN_AUTH:
                console.log(action,"yes logged in data1")
                return{
                    ...state,
                    // loggedIn:true

                }
            case CHECK_LOGIN:
                console.log(action.payload)
                return {
                    ...state,
                    loggedIn:(action.payload.emailId === state.emailId && action.payload.password === state.password),
                    error:(action.payload.emailId !== state.emailId && !action.payload.password !== state.password)
                   
                   
                }
            default:
                return state
    }

}