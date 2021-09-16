import {
    // FILTER_DATA_BY_ALPHABETIC_PO,
    // FILTER_DATA_BY_SEARCH_SN_PO,
    // SET_PAGE_NUMBER_PO,
    // GET_PURCHASE_ORDER_LIST,


    FILTER_DATA_BY_ALPHABETIC_OL,
    FILTER_DATA_BY_SEARCH_SN_OL,
    SET_PAGE_NUMBER_OL,
    GET_ORDER_LIST,


    axios,
    config
    } from './types'


    export const getOrderList = () => dispatch => {
        //debugger;
        axios.get(`/api/order-list`,config).then(res=>{
            console.log(res)
            dispatch({
                type:GET_ORDER_LIST,
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
              type:FILTER_DATA_BY_SEARCH_SN_OL,
              searchDataPO:data
          }
      }
      export const handleAplhabetFilterBySN = (data, data1)=>{
        //   if()
          return{
              type:FILTER_DATA_BY_ALPHABETIC_OL,
              alphaDataQO:data
          }
      }


      export const setPageNumberOl = (pageNumber1) => {
        return{
              type:SET_PAGE_NUMBER_OL,
              pageNumber1:pageNumber1,
          }
      
      }
