import {
    // FILTER_DATA_BY_ALPHABETIC_PO,
    // FILTER_DATA_BY_SEARCH_SN_PO,
    // SET_PAGE_NUMBER_PO,
    // GET_PURCHASE_ORDER_LIST,


    FILTER_DATA_BY_ALPHABETIC_QL,
    FILTER_DATA_BY_SEARCH_SN_QL,
    SET_PAGE_NUMBER_QL,
    GET_QUOTE_ORDER_LIST,



    ADD_ITEM_TO_QUOTE,
    GET_ORDER_ITEM_LIST,
    ADD_NEW_ORDER,
    UPDATE_NEW_ORDER,
    HANDLE_INPUT_ORDER,
    UPDATE_ORDER,


    axios,
    config
    } from './types'


    export const getQuoteOrderList = () => dispatch => {
        //debugger;
        axios.get(`/api/order-list`,config).then(res=>{
            console.log(res)
            dispatch({
                type:GET_QUOTE_ORDER_LIST,
                payload:res.data.data
            })
        })
    }


    // export const getAllPlantAction = () => dispatch => {
    //     axios.get("/api/plants",config).then(res=>{ 
    //         dispatch({
    //                 type:GET_ALL_PLANT_ACTION,
    //                 payload:res.data.data
        
    //             })
    //         })
    
    // }



    


    export const handleSearchFilterByAlpha = (data, data1)=>{
        //   if()
          return{
              type:FILTER_DATA_BY_SEARCH_SN_QL,
              searchDataPO:data
          }
      }
      export const handleAplhabetFilterBySN = (data, data1)=>{
        //   if()
          return{
              type:FILTER_DATA_BY_ALPHABETIC_QL,
              alphaDataQO:data
          }
      }


      export const setPageNumberQo = (pageNumber1) => {
        return{
              type:SET_PAGE_NUMBER_QL,
              pageNumber1:pageNumber1,
          }
      
      }


//NEW ADD ORDERLIST

export const addToOrderItemAPICall =(orderId,data)=>dispatch => {
    return axios.post(`/api/add-order-item/${orderId}`,data,config).then(res=>{ 
  
        console.log(res)
        dispatch({
            type:ADD_ITEM_TO_QUOTE,
            payload:res.data
        })

        return res.data
    })
    
}

export const getOrderList =(orderId)=>dispatch => {
    debugger
    return  axios.get(`/api/order-item-list/${orderId}`,config).then(res=>{ 
        console.log(res)

    dispatch({
            type:GET_ORDER_ITEM_LIST,
            payload:res.data

        })
        return res.data
    })


    
}
export const searchPlantProductAPI =(data)=>dispatch => {
    // return axios.post("/api/quote-plantsearch",null,config).then(res=>{ 
  
    //     console.log(res)
    //     dispatch({
    //         type:SEARCH_PLANT_PRODUCT,
    //         payload:res.data
    //     })

    //     return res.data
    // })
    
}


export const addNewOrder = (data) => dispatch => {
    //debugger;
    return axios.post("/api/add-order",data,config).then(res=>{ 
  
        console.log(res)
        dispatch({
            type:ADD_NEW_ORDER,
            payload:res.data
        })
    })
}


export const addToOrderUpdate = (data) => dispatch => {
    debugger;

    return axios.post(`/api/update-order-details/${data.id}`,data,config).then(res=>{ 
  debugger
        console.log(res)
        dispatch({
            type:UPDATE_NEW_ORDER,
            payload:res.data.data
        })
    })

    
}

export const handleInputChange = (id,value) =>dispatch=>{
    dispatch({
        type:HANDLE_INPUT_ORDER,
        id:id,
        value:value
    })

}


export const updateQuoteData = (quoteData)=>dispatch=>{
    console.log(quoteData)
    dispatch({
        type:UPDATE_ORDER,
        payload:quoteData
    })

}



