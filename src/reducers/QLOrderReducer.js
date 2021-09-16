
import {
    FILTER_DATA_BY_ALPHABETIC_PO,
    FILTER_DATA_BY_SEARCH_SN_PO,
    SET_PAGE_NUMBER_PO,
    
    // FILTER_DATA_BY_SEARCH,
    // FILTER_DATA_BY_ALPHA,
    HANDLE_INPUT,
    GET_QUOTE_ORDER_LIST
   

    
    // ADD_CUSTOMER, 
    // SHOW_CUSTOER, 
    // UPDATE_CUSTOMER,
    // DELETE_CUSTOMER 
    } from '../actions/types'
   

const initialSatate = {
//    purchaseOrderList:[
//     {status:"closed", poNumber:"JSMITH-012301-1", suppliearName:"John Smith landscaping", 
//     supplierOrder:"1024275", createdBy:"John Smith", orderDate:"20/05/2021", expectedDate:"20/05/12021",
//      dispatch:"Pickup", amount:"6,085.00"},

//      {status:"closed", poNumber:"WILLSMITH-012301-1", suppliearName:"WILL Smith landscaping", 
//      supplierOrder:"2024275", createdBy:"Will Smith", orderDate:"20/06/2021", expectedDate:"20/08/2021",
//       dispatch:"Pickup", amount:"6,085.00" },

//       {status:"open", poNumber:"Scena-012301-1", suppliearName:"John Scena landscaping", 
//       supplierOrder:"1024275", createdBy:"John Scena", orderDate:"20/05/12021", expectedDate:"20/05/12021",
//        dispatch:"Delivery", amount:"6,085.00" },

//        {status:"Draft", poNumber:"Jason-012301-1", suppliearName:"Jason Smith landscaping", 
//        supplierOrder:"24275", createdBy:"Jason Smith", orderDate:"20/05/2021", expectedDate:"20/09/2021",
//         dispatch:"Pickup", amount:"6,085.00" },

//         {status:"closed", poNumber:"Dweny-012301-1", suppliearName:"Dweny Smith landscaping", 
//         supplierOrder:"1024275", createdBy:"Dweny Smith", orderDate:"20/02/12021", expectedDate:"20/05/12021",
//          dispatch:"Pickup", amount:"6,085.00" },

//          {status:"closed", poNumber:"Robert Jr-012301-1", suppliearName:"Robert Jr Smith landscaping", 
//          supplierOrder:"1024275", createdBy:"Robert Jr Smith", orderDate:"20/05/12021", expectedDate:"20/05/12021",
//           dispatch:"Delivery", amount:"6,085.00" }
//    ],
   pageNumber:0,
   duplicateData:[],
   quoteOrderList:[],
   backupQOL:[],
   //activeData:[],
   //inactiveData:[],
   //radioFilter:"active",
   searchFilter:"",
   alphabetSearch:"All",

  }

 const customerReducer2 = (state = initialSatate, action)=>{
    console.log(action.payload)
    console.log(state)
    // alert(action.type)x
    
    switch(action.type){
        case HANDLE_INPUT:
            return{
                ...state,
                [action.id]:action.data

            }


            // case GET_QUOTE_ORDER_LIST:
            //     return{
            //         ...state,
            //         quoteOrderList:action.payload,
            //         backupQOL:action.payload              
            //     }
     
            case SET_PAGE_NUMBER_PO:
                return{
                    ...state,
                    pageNumber:action.pageNumber
                }

            case FILTER_DATA_BY_SEARCH_SN_PO:
                let datatoShow = []
                let searchedData = []
                // if(state.radioFilter === "active") datatoShow = state.activeData
                // else if(state.radioFilter === "inactive") datatoShow = state.inactiveData
                // else datatoShow = state.duplicateData

                if(state.alphabetSearch ==="All" && action.searchDataPO !=="")searchedData = datatoShow.filter(filterData=>filterData.name.toLowerCase().includes(action.searchDataPO.toLowerCase()))
                else if(action.searchDataPO !=="" && state.alphabetSearch !=="All") searchedData = datatoShow.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0)) &&(filterData.name.toLowerCase().charAt(0)===action.searchDataPO.toLowerCase().charAt(0)))
                else if(action.searchDataPO  ==="" && state.alphabetSearch !=="All") searchedData = datatoShow.filter(filterData=>filterData.name.toLowerCase().charAt(0)===state.alphabetSearch.toLowerCase().charAt(0))
                else if(action.searchDataPO  ==="" && state.alphabetSearch  ==="All") searchedData = datatoShow

                

                return{
                    ...state,
                    purchaseOrderList:searchedData,
                    searchFilter:action.searchDataPO
                }
          
            case FILTER_DATA_BY_ALPHABETIC_PO:
                let datatoShow1 = []
                let searchedData1 = []
                if(state.radioFilter === "active") datatoShow1 = state.activeData
                else if(state.radioFilter === "inactive") datatoShow1 = state.inactiveData
                else datatoShow1 = state.duplicateData

                if(state.searchFilter ==="" && action.alphaDataPO !=="All") searchedData1 = datatoShow1.filter(filterData=>filterData.name.toLowerCase().charAt(0)===action.alphaDataPO.toLowerCase().charAt(0))
                else if(state.searchFilter !=="" && action.alphaDataPO ==="All")searchedData1 = datatoShow1.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===state.searchFilter.toLowerCase().charAt(0)))
                // else if(action.alphaDataPO ==="All" && state.searchFilter !=="")searchedData1 = datatoShow1.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===state.searchFilter.toLowerCase().charAt(0)))
                else if(state.searchFilter !=="" && action.alphaDataPO !=="All")searchedData1 = datatoShow1.filter(filterData=>(filterData.name.toLowerCase().charAt(0)===action.alphaDataPO.toLowerCase().charAt(0)) &&(filterData.name.toLowerCase().charAt(0)===state.searchFilter.toLowerCase().charAt(0)))
                else if(state.searchFilter ==="" && action.alphaDataPO ==="All")searchedData1 = datatoShow1
               

                return{
                    ...state,
                    purchaseOrderList:searchedData1,
                    alphabetSearch:action.alphaDataPO
                }
    
        default:
                return state
    }

}
export default customerReducer2