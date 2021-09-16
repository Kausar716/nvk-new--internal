import {UPDATE_PATH,GET_PATH} from '../actions/types';
// import {v4 as uuidv4} from 'uuid';
// // import getAllImageAssets from '../components/Utility/Utility'



const initialSatate = {
    mainMenu:"Dashboard",
    submenu:"",
    initialSelect:true
}

const sideReducer =(state=initialSatate, action)=>{
    console.log(action)
    switch(action.type){
        case GET_PATH:
            return {...state}
        case UPDATE_PATH:
             return {...state, ...action.payload}
        default:return state

    }
}


export default sideReducer