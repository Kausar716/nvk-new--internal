import {GET_PURCHASE_ORDER_LIST,
    PO_SET_PAGE_NUMBER,
    PO_SET_ALPHABET_SELECTED,
    HANDLE_PURCHASE_ORDER_FILTER,
    ADD_PURCHASE_ORDER,
    SET_SUPPLIER_TO_ADD_PO,
    HANDLE_ORDERDETAILS_INPUT,
    ERROR_HANDLE,
    GET_ADD_TO_ORDER_LIST,
    HANDLE_SEARCH_ORDERED_LIST,
    HANDLE_DMQTY,
    HANDLE_ADD_ALL,
    GET_CURRENT_PO_ORDER_HISTORY,
    GET_CURRENT_PO_ORDER,
    GET_PLANT_SKU,
    HANDE_CURRENT_PO_ORDER_UPDATE,
    GET_UNIT_LIST,
    GET_CURRENCY_LIST,
    GET_SUPPLIER_DELIVERY_LIST,
    GET_SPECIFIED_PO_ORDER,
    HANDLE_PO_PAGE_SELECTION,
    UPDATE_PURCHASE_ORDER,
    GET_DELIVERY_ADDRESS,
    GET_ADD_TO_CATEGORY_LIS,
    HANDLE_PO_FILTER,
    UPDATE_PURCHASE_ORDER_NOTES,
    DELETE_PO,
    DUPLICATE_PO,
    SPLIT_PO_ORDER,
    CLEAR_PO_DATA

} from '../actions/types';




const initialSatate = {
   
    purchaseOrderList:[],
    purchaseOrderListBackup:[],
    groupedOrderListDate:[],
    orderListDateForSuggession:[],
    productPageNumber   :   0,
    pageNumber          :   0,  
    needAction          :   false,
    selectedAlphabet: "All",
    openPoCount:0,
    statusLevel:{open:0,draft:0,closed:0,cancelled:0},
    selectedSupplier:null,
    pageToOpen:"add",
    poData:{
        supplier_id:"",
        order_id:"",
        discount_type:"0",
        discount:"0.00",
        job_description:"",
        royalty:"0",
        order_notes:null,
        dispatch_type:null,
        currency:"Merits",
        supplier_order:"",
        requested_date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,
        latest_date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,
        internal_notes:""

    },
    searchValuePlant:"",
    searchValueSku:"",
    currentPOHistory:[],
    currentItems:[],
    currentOrder:{
        adjustment:null,
        discount:"",
        shipping:"",
        subtotal:"",
        total:""
    },
    plantSku:[],
    unitList:[],
    path:"",
    poPageIndex:0,
    supplierDeliveryList:[],
    currencyList:[],
    deliveryAddress:[],
    orderListDateForSuggessionWithFilter:[],
    categoryList:[]
} 
const filterBasedOnAlphabet = (poList,selectedAlphabet,statusLevel)=>{
    console.log(poList)
    if(selectedAlphabet !== "All"&& selectedAlphabet !="")
    return poList.filter(po=>(po.supplier_name !== null && po.supplier_name.charAt(0).toLocaleLowerCase() === selectedAlphabet.toLocaleLowerCase()))
    else 
    return poList
}
const filterBsedOnCheckBox =(filteredData,statusLevel)=>{
    if(statusLevel.open === 0 && statusLevel.draft===0&& statusLevel.closed===0&& statusLevel.cancelled === 0) 
    return filteredData
    else{
  return filteredData.filter(po=>
        ((statusLevel.open===1?po.p_o_status==="open":false) ||(statusLevel.draft===1?po.p_o_status==="draft":false)||
        (statusLevel.closed===1?po.p_o_status==="closed":false) || (statusLevel.cancelled===1?po.p_o_status==="cancelled":false))
      )
  }
    
}
const handleFilterBasedOnTextBox = (filteredData,name,value,alphabet,statusLevel) => {
    if(name === "plantSearch"){
        filteredData.filter(data=>{
            
        })
    }

    // if()
    // state.purchaseOrderListBackup,action.name,action.value,
    // state.selectedAlphabet,state.statusLevel
}
const handledumyQty= (action,purchaseOrderListBackup)=>{
    console.log(action)
    let id =-1
    // purchaseOrderListBackup.filter((order,j)=>{
    //     if(order.sku_code === action.sku_code){
    //         id=j

    //         console.log(j)
    //       
    //     }
    // })
    const elementsIndex = purchaseOrderListBackup.findIndex(element => element.sku_code === action.sku_code )
    console.log(elementsIndex)
   
    
    let objectCopy=purchaseOrderListBackup[elementsIndex]
    console.log(objectCopy)
    objectCopy.dumyQty=action.dumyQty

    console.log(objectCopy)
    
    purchaseOrderListBackup.splice(elementsIndex, 1, objectCopy)
    console.log(purchaseOrderListBackup)

    return purchaseOrderListBackup
}
// const groupArray =(objectToBeReduced)=>{
//     let plantSearchResult={}
//     if(objectToBeReduced.length>0)
//     plantSearchResult=objectToBeReduced.reduce((acc, obj) => {
//       if(obj){
//         const key = obj["name"];        
//         if (!acc[key]) {
//            acc[key] = [];
//         }
//         // Add object to list for given key's value
//         if(typeof(acc[key])==="object"){
//             if(!obj["dumyQty"]){
//                 obj["dumyQty"]=""
//             }           
//             acc[key].push(obj);
//         }
//         return acc;}
//     })
//     let plantList=[]
//     for(let key in plantSearchResult ){
//         console.log(plantSearchResult)
//         if(plantSearchResult[key]){
//         if(plantSearchResult[key][0]){
//             if(typeof(plantSearchResult[key][0]) === "object")
//             plantList.push(plantSearchResult[key])
//         }        
//         }
//     }
//     return plantList
// }
const groupArray =(objectToBeReduced)=>{
    const key = "name"; 
    let plantSearchResult={}
    if(objectToBeReduced.length>0)
    plantSearchResult=objectToBeReduced.reduce((acc, obj) => {
        if(!obj["dumyQty"]){
                    obj["dumyQty"]=""
                } 
    //   if(obj){
               
        // if (!acc[key]) {
        //    acc[key] = [];
        // }

        (acc[obj[key]] = acc[obj[key]] || []).push(
            obj
          );
        // Add object to list for given key's value
        // if(typeof(acc[key])==="object"){
        //     if(!obj["dumyQty"]){
        //         obj["dumyQty"]=""
        //     }     
            // console.log(acc[key],obj)
            // console.log(obj.length)      
            // acc[key].push(obj);
        // }
        console.log(acc)
        return acc;
    // }
    },{})
    let plantList=[]
    for(let key in plantSearchResult ){
        console.log(plantSearchResult)
        if(plantSearchResult[key]){
        if(plantSearchResult[key][0]){
            if(typeof(plantSearchResult[key][0]) === "object")
            plantList.push(plantSearchResult[key])
        }        
        }
    }
    return plantList
}
const groupSku = (plantList) =>{
    let skuPlantList = []
    let skuObject={}
    skuObject['id']=[]
    plantList.map(plant=>{
        if(!skuObject[plant.plant_id]){
            skuObject[plant.plant_id]=[]
        }
        skuObject[plant.plant_id].push(plant.sku_code)
    })
    console.log(skuObject)
    return skuObject

}
const getOpenPoCount = (poList)=>{
    if(poList)
    return poList.filter(po=>po.p_o_status === "open").length
    else return 0
}

export default  function purchaseOrderManagement(state = initialSatate, action){
    console.log(state)
       switch(action.type){
           // page action
           case GET_PURCHASE_ORDER_LIST:
                let poList = filterBasedOnAlphabet(action.payload,state.selectedAlphabet)
               return{
                   ...state,
                   purchaseOrderList:poList,
                   purchaseOrderListBackup:action.payload,
                   openPoCount:getOpenPoCount(poList)
               }
               case PO_SET_PAGE_NUMBER:
                return{
                    ...state,
                    pageNumber:action.pageNumber
                }
                case SET_SUPPLIER_TO_ADD_PO:
                    return{
                        ...state,
                        selectedSupplier:action.supplier,
                        poData:{...state.poData,['supplier_id']:action.supplier.id},
                    }
                case HANDLE_ORDERDETAILS_INPUT:
                    return{
                            ...state,
                            poData:{...state.poData, [action.itemId]:action.itemValue},
                        
                    }
                case GET_DELIVERY_ADDRESS:
                    return{
                        ...state,
                        deliveryAddress:action.payload
                    }
                case PO_SET_ALPHABET_SELECTED:

                    let poListForAlphabetSelected = filterBasedOnAlphabet(state.purchaseOrderListBackup,action.selectedAlphabet)
                    console.log(poListForAlphabetSelected)
                    return{
                        ...state,
                        selectedAlphabet:action.selectedAlphabet,
                        purchaseOrderList:poListForAlphabetSelected,
                        openPoCount:getOpenPoCount(poListForAlphabetSelected)
                    }
                case HANDLE_PO_FILTER :
                    console.log(action)
                    let searchResult = handleFilterBasedOnTextBox(state.purchaseOrderListBackup,action.name,action.value,
                        state.selectedAlphabet,state.statusLevel)
                    return{
                        
                    }
                case HANDLE_PURCHASE_ORDER_FILTER:
                    console.log(action)
                    let poListForAlphabetFilter = filterBasedOnAlphabet(state.purchaseOrderListBackup,state.selectedAlphabet,state.statusLevel)
                    let poListForcheckBoxSelected = filterBsedOnCheckBox(poListForAlphabetFilter,state.statusLevel)

                    return{
                        ...state,
                        statusLevel:action.statusLevel,
                        purchaseOrderList:poListForcheckBoxSelected
                    }
                case ADD_PURCHASE_ORDER:
                    console.log(action)
                    return{
                        ...state,
                        poData:action.payload,
                        pageToOpen:"addToOrder"
                    }
                case UPDATE_PURCHASE_ORDER:
                    return{
                        ...state,
                        poData:action.payload
                    }
                case UPDATE_PURCHASE_ORDER_NOTES:
                    return{
                        ...state,
                        poData:action.payload
                    }
                case ERROR_HANDLE:
                    return{
                        ...state,
                        status:action.status,
                        message:action.message
                    }
                case GET_ADD_TO_ORDER_LIST:
                    let groupedArray=groupArray(action.payload)
                    return{
                        ...state,
                        groupedOrderListDate:groupedArray,
                        orderListDateForSuggession:action.payload, 
                        orderListDateForSuggessionWithFilter:action.payload                       
                    }
                case GET_ADD_TO_CATEGORY_LIS:
                    console.log(action.payload)
                    return{
                        ...state,
                        categoryList:action.payload
                    }
               
                case HANDLE_SEARCH_ORDERED_LIST:
                    console.log(action)
                    let list=[]
                    state.orderListDateForSuggession.map(order=>
                        
                         {
                            console.log(order.plant_name,"--**--",action.plant)
                            if(action.plant.length>0 && action.sku.length===0){
                             if(order.plant_name.trim().toLocaleLowerCase().includes(action.plant.trim().toLocaleLowerCase())){
                                console.log(order.plant_name,"--**--",action.plant)
                                console.log(order)
                                list.push(order)
                             }
                            }
                            else if(action.plant.length===0 && action.sku.length >0){
                                if(order.sku_code.trim().toLocaleLowerCase().includes(action.sku.trim().toLocaleLowerCase())){
                                    console.log(order.plant_name,"--**--",action.plant)
                                    console.log(order)
                                    list.push(order)
                                 }
                            }
                            else if(action.plant.length>0 && action.sku.length >0){
                                if(order.plant_name.trim().toLocaleLowerCase().includes(action.plant.trim().toLocaleLowerCase()) && order.sku_code.trim().toLocaleLowerCase().includes(action.sku.trim().toLocaleLowerCase())){
                                    console.log(order.sku_code,"--**--",action.plant)
                                    console.log(order)
                                    list.push(order)
                                 }
                            }
                        }
                    )
                    console.log(list)
                    let filteredArray=groupArray(list)
                    return{
                        ...state,
                        groupedOrderListDate:filteredArray,
                        searchValuePlant:action.plant,
                        searchValueSku:action.sku,
                        orderListDateForSuggessionWithFilter:list
                    }
                    case HANDLE_DMQTY:
                        console.log(state.orderListDateForSuggessionWithFilter)
                        let updatedOrderListDateForSuggession = handledumyQty(action,state.orderListDateForSuggessionWithFilter)
                        console.log(updatedOrderListDateForSuggession)
                        let filteredArrayForUpdatedList=groupArray(updatedOrderListDateForSuggession)
                        console.log(filteredArrayForUpdatedList)
                        return{
                            ...state,
                            groupedOrderListDate:filteredArrayForUpdatedList
                        }
                    case HANDLE_ADD_ALL:
                        return{
                            ...state,
                            groupedOrderListDate:[]
                        }
                    case GET_CURRENT_PO_ORDER_HISTORY:
                        return{
                            ...state,
                            currentPOHistory:action.payload
                        } 
                    case GET_CURRENT_PO_ORDER:
                        console.log(action)
                        return{
                            ...state,
                            currentItems:action.payload.items,
                            currentOrder:action.payload.order
                        }
                    case SPLIT_PO_ORDER:
                        console.log(action)
                        return{
                            ...state,
                            currentItems:action.payload.items,
                            currentOrder:action.payload.order
                        }
                    case GET_PLANT_SKU:
                        let groupedSku = groupSku(action.payload)
                        console.log(groupedSku)
                        return{
                            ...state,
                            plantSku:groupedSku
                        }
                    case HANDE_CURRENT_PO_ORDER_UPDATE:
                        let selectedId=-1
                        console.log(action.currentItemId)
                        console.log(state.currentItems)
                       let currentItemsForLoop=state.currentItems
                        let updateItem = {}
                        currentItemsForLoop.map((item,i)=>{
                            console.log(item.po_item_id)
                            console.log(action.currentItemId)
                            if(parseInt(item.po_item_id) === parseInt(action.currentItemId)){
                                selectedId = i
                                updateItem = item
                            }})
                            console.log(selectedId)
                            console.log(action.currentItemName === "sku_id")
                            if(selectedId>=0){
                                if(action.currentItemName === "sku_id"){
                                    console.log(action.currentItemValue)
                                    updateItem.sku_id = parseInt(action.currentItemValue)
                                }
                                else{
                                    console.log(action.currentItemValue)
                                    updateItem.currentItemName = action.currentItemValue
                                }
                            }
                            let updateList = state.currentItems
                            console.log(updateItem) 
                            updateList.splice(selectedId,1,updateItem)
                            console.log(updateList)
                            
                        return{
                            ...state,
                            currentItems:updateList,
                            // currentOrder:action.payload.order
                        }
                    case CLEAR_PO_DATA:
                        return{
  
                            purchaseOrderList:[],
                            purchaseOrderListBackup:[],
                            groupedOrderListDate:[],
                            orderListDateForSuggession:[],
                            productPageNumber   :   0,
                            pageNumber          :   0,  
                            needAction          :   false,
                            selectedAlphabet: "All",
                            openPoCount:0,
                            statusLevel:{open:0,draft:0,closed:0,cancelled:0},
                            selectedSupplier:null,
                            pageToOpen:"add",
                            poData:{
                                supplier_id:"",
                                order_id:"",
                                discount_type:"0",
                                discount:"0.00",
                                job_description:"",
                                royalty:"0",
                                order_notes:null,
                                dispatch_type:null,
                                currency:"Merits",
                                supplier_order:"",
                                requested_date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,
                                latest_date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,
                                internal_notes:""
                        
                            },
                            searchValuePlant:"",
                            searchValueSku:"",
                            currentPOHistory:[],
                            currentItems:[],
                            currentOrder:{
                                adjustment:null,
                                discount:"",
                                shipping:"",
                                subtotal:"",
                                total:""
                            },
                            plantSku:[],
                            unitList:[],
                            path:"",
                            poPageIndex:0,
                            supplierDeliveryList:[],
                            currencyList:[],
                            deliveryAddress:[],
                            orderListDateForSuggessionWithFilter:[],
                            categoryList:[]
                        }
                   case GET_UNIT_LIST:
                       return{
                        ...state,
                        unitList:action.payload
                       }
                   case  GET_CURRENCY_LIST:
                       return{
                           ...state,
                           currencyList:action.payload
                       }
                    case GET_SUPPLIER_DELIVERY_LIST:
                        return{
                            ...state,
                            supplierDeliveryList:action.payload
                        }
                    case GET_SPECIFIED_PO_ORDER:
                        return{
                            ...state,
                            pageToOpen:"editOrderDetails",
                            poData:action.payload,
                            path:"PurchaseOrder",
                            poPageIndex:0,
                            selectedSupplier:action.payload

                        }
                    case DELETE_PO:
                        return{
                            ...state,
                            pageToOpen:"add",
                            poData:{
                                supplier_id:"",
                                order_id:"",
                                discount_type:"0",
                                discount:"0.00",
                                job_description:"",
                                royalty:"0",
                                order_notes:null,
                                dispatch_type:null,
                                currency:"Merits",
                                supplier_order:"",
                                requested_date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,
                                latest_date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,
                                internal_notes:""
                            },
                            selectedSupplier:null
                        }
                    case DUPLICATE_PO:
                    console.log(action.payload)    
                    return{
                        ...state,
                        pageToOpen:"add",
                        poData:{
                            supplier_id:"",
                            order_id:"",
                            discount_type:"0",
                            discount:"0.00",
                            job_description:"",
                            royalty:"0",
                            order_notes:null,
                            dispatch_type:null,
                            currency:"Merits",
                            supplier_order:"",
                            requested_date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,
                            latest_date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,
                            internal_notes:""
                        },
                        selectedSupplier:null
                        }
                    case HANDLE_PO_PAGE_SELECTION:
                        console.log(action)
                        return{
                            ...state,
                            path:action.path,
                            poPageIndex:action.index
                        }
               default :
            return{
                ...state
            }
            }
            
        }