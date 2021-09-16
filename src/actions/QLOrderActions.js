import {
    FILTER_DATA_BY_ALPHABETIC_PO,
    FILTER_DATA_BY_SEARCH_SN_PO,
    SET_PAGE_NUMBER_PO,
    axios,
    config
    } from './types'


    export const handleSearchFilterByAlpha = (data, data1)=>{
        //   if()
          return{
              type:FILTER_DATA_BY_SEARCH_SN_PO,
              searchDataPO:data
          }
      }
      export const handleAplhabetFilterBySN = (data, data1)=>{
        //   if()
          return{
              type:FILTER_DATA_BY_ALPHABETIC_PO,
              alphaDataPO:data
          }
      }


      export const setPageNumberPo = (pageNumber) => {
        return{
              type:SET_PAGE_NUMBER_PO,
              pageNumber:pageNumber,
          }
      
      }