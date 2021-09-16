import {SIGN_IN_AUTH,CHECK_LOGIN} from './types';

// export const getItems = () => dispatch => {
//     dispatch(setItemsLoading());
//     axios
//     .get("/api/items")
//     .then(res=>
//         dispatch({
//             type:GET_ITEMS,
//             payload:res.data

//         })
        
//     )
// }
export const authEmailPassword = (loginData) => {
    console.log(loginData,"yes logged in data")
    return{
        type :SIGN_IN_AUTH,
        payload:loginData
    }
}
export const checkLogin = (loginData) => {
    console.log("yes logged in data")
    return{
        type :CHECK_LOGIN,
        payload:loginData
    }
}
