import {GET_PATH,UPDATE_PATH} from './types';



// export const getMenuItems = () => {
//     return{
//         type : GET_MENU_ITEMS
//     }
// }

export const getMenuItems = (data) => dispatch => {

        dispatch({
                type:GET_PATH,
                payload:data   
            })

}


export const updateMenuItems = (path) => dispatch => {

    dispatch({
            type:UPDATE_PATH,
            payload:path    
        })
    

}