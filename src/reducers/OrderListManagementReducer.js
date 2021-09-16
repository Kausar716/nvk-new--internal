

import {
    
   
    HANDLE_INPUT,



    FILTER_DATA_BY_ALPHABETIC_QL,
    FILTER_DATA_BY_SEARCH_SN_QL,
    SET_PAGE_NUMBER_QL,
    GET_QUOTE_ORDER_LIST,
   


    FILTER_DATA_BY_ALPHABETIC_OL,
    FILTER_DATA_BY_SEARCH_SN_OL,
    SET_PAGE_NUMBER_OL,
    GET_ORDER_LIST,



    
    // ADD_CUSTOMER, 
    // SHOW_CUSTOER, 
    // UPDATE_CUSTOMER,
    // DELETE_CUSTOMER 
    } from '../actions/types'
   

const initialSatate = {
//    quoteOrderList:[],
   backupgOL:[],
   getOrderList:[],
   pageNumber1:0,
   duplicateData:[],
   //activeData:[],
   //inactiveData:[],
   //radioFilter:"active",
   searchFilter:"",
   alphabetSearch:"All",

  }

 const quoteOrderReducer = (state = initialSatate, action)=>{
    console.log(action.payload)
    console.log(state)
    // alert(action.type)x
    
    switch(action.type){
        case HANDLE_INPUT:
            return{
                ...state,
                [action.id]:action.data

            }

            case GET_ORDER_LIST:
                return{
                    ...state,
                    getOrderList:action.payload,
                    backupgOL:action.payload              
                }
            
     
            case SET_PAGE_NUMBER_OL:
                return{
                    ...state,
                    pageNumber1:action.pageNumber1
                }

            case FILTER_DATA_BY_SEARCH_SN_OL:
                let datatoShow = []
                let searchedData = []
                // if(state.radioFilter === "active") datatoShow = state.activeData
                // else if(state.radioFilter === "inactive") datatoShow = state.inactiveData
                // else datatoShow = state.duplicateData

                if(state.alphabetSearch ==="All" && action.searchDataQO !=="")searchedData = datatoShow.filter(filterData=>filterData.name.toLowerCase().includes(action.searchDataQO.toLowerCase()))
                else if(action.searchDataQO !=="" && state.alphabetSearch !=="All") searchedData = datatoShow.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0)) &&(filterData.name.toLowerCase().charAt(0)===action.searchDataQO.toLowerCase().charAt(0)))
                else if(action.searchDataQO  ==="" && state.alphabetSearch !=="All") searchedData = datatoShow.filter(filterData=>filterData.name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0))
                else if(action.searchDataQO  ==="" && state.alphabetSearch  ==="All") searchedData = datatoShow

                

                return{
                    ...state,
                    quoteOrderList:searchedData,
                    searchFilter:action.searchDataQO
                }
          
            case FILTER_DATA_BY_ALPHABETIC_OL:
                let datatoShow1 = []
                let searchedData1 = []
                if(state.radioFilter === "active") datatoShow1 = state.activeData
                else if(state.radioFilter === "inactive") datatoShow1 = state.inactiveData
                else datatoShow1 = state.duplicateData

                if(state.searchFilter ==="" && action.alphaDataQO !=="All") searchedData1 = datatoShow1.filter(filterData=>filterData.name.toLowerCase().charAt(0)===action.alphaDataQO.toLowerCase().charAt(0))
                else if(state.searchFilter !=="" && action.alphaDataQO ==="All")searchedData1 = datatoShow1.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===state.searchFilter.toLowerCase().charAt(0)))
                // else if(action.alphaDataQO ==="All" && state.searchFilter !=="")searchedData1 = datatoShow1.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===state.searchFilter.toLowerCase().charAt(0)))
                else if(state.searchFilter !=="" && action.alphaDataQO !=="All")searchedData1 = datatoShow1.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===action.alphaDataQO.toLowerCase().charAt(0)) &&(filterData.name.toLowerCase().charAt(0)===state.searchFilter.toLowerCase().charAt(0)))
                else if(state.searchFilter ==="" && action.alphaDataQO ==="All")searchedData1 = datatoShow1
               

                return{
                    ...state,
                    quoteOrderList:searchedData1,
                    alphabetSearch:action.alphaDataQO
                }
    
        default:
                return state
    }

}
export default quoteOrderReducer

