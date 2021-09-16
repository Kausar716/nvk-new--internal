// import axios from 'axios'
import {GET_PRODUCT_ITEMS,GET_CATEGORY_FILTER_PRODUCT_ITEMS,GET_PAGINATION_DATA,GET_ADD_PRODUCT_PAGE} from './typesTest';

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
// }filterDataByCategory


export const getItems = () => {
    return{
        type : GET_PRODUCT_ITEMS
    }
}

export const getProductItems = () => {
    return{
        type : GET_PRODUCT_ITEMS
    }
}

export const filterDataByCategory = filterData =>{
    console.log(filterData)
    return{
        type : GET_CATEGORY_FILTER_PRODUCT_ITEMS,
        payload:filterData
    }
}

export const getPageWiseData = pageCount =>{
    return{
        type : GET_PAGINATION_DATA,
        payload:pageCount
    }
}
export const getProductPage = pageType =>{
    console.log("hi" +pageType)
    return{
        type : GET_ADD_PRODUCT_PAGE,
        payload:pageType
    }
}



export const getSpecifiedProductAction = (id, actionType="edit",pageToOpen="Dashboard") => dispatch => {
    // axios.get(`/api/product/${id}`,config).then(res=>{ 
    //     console.log(res.data)
    //     dispatch(showSpecifiedSkuAction(id))
    //     dispatch(pageReDirectAction(pageToOpen,actionType))
    //     dispatch({
    //             type:"GET_SPECIFIED_PRODUCT_ACTION",
    //             payload:res.data,
    //             actionType:actionType
    
    //         })
    //     })
   
}




// export const addItem = item =>{
//     return{
//         type : ADD_ITEM,
//         payload : item
//     }
// }
// export const setItemsLoading = item =>{
//     return{
//         type : ITEMS_LOADING,
       
//     }
// }