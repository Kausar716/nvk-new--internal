import {
    GET_LOCATION_LIST,
    GET_PLANT_CATEGORY_LIST,   
    GET_MANUFACTURER_CATEGORY_LIST,
    GETSUPPLIER_LIST,
    PLANT_INVENTORY_FILTER,
    PRODUCT_INVENTORY_FILTER,
    GET_ALL_PLANT_INVENTORY_ACTION,
    GET_PRODUCT_CATEGORY_LIST,
    GET_ALL_PRODUCT_INVENTORY_ACTION,
    GET_ALL_PLANTMANAGER_INVENTORY_ACTION,
    GET_ALL_PRODUCTMANAGER_INVENTORY_ACTION,
    GET_PLANT_DATA,
    FILTER_PLANT_MANAGER_INVENTORY_ACTION,
    FILTER_PRODUCT_MANAGER_INVENTORY_ACTION,
    RESET_PRODUCT_MANAGER_INVENTORY_ACTION,
    GET_ALL_PRODUCT_INVENTORY_ACTION_SKU,
    GET_PLANT_DATA_INVENTORY,
    SET_PLANT_PAGE_NUMBER_INVENTORY,
    SET_PRODUCT_PAGE_NUMBER_INVENTORY,

    config,
    axios
    // DELETE_USER 
   } from './types';

   export const setPlantPageNumber = (pageNumber) => {
    return{
        type:SET_PLANT_PAGE_NUMBER_INVENTORY,
        pageNumber:pageNumber,
    }

  
  }
  export const setProductPageNumber = (pageNumber) => {
    return{
        type:SET_PRODUCT_PAGE_NUMBER_INVENTORY,
        pageNumber:pageNumber,
    }

  
  }
   export const resetFileds = ()=>dispatch => {
       dispatch({
           type:RESET_PRODUCT_MANAGER_INVENTORY_ACTION,
       })
   }
   export const filterPlantManagerData = (id,value)=>dispatch => {
       dispatch({
           type:FILTER_PLANT_MANAGER_INVENTORY_ACTION,
           id:id,
           value:value
       })
   }
   export const filterProductManagerData = (id,value)=>dispatch => {
    dispatch({
        type:FILTER_PRODUCT_MANAGER_INVENTORY_ACTION,
        id:id,
        value:value
    })
}
    export const getAllPlants = () => dispatch => {
       return axios.post("/api/plant-search",null,config).then(res=>{ 
           console.log(res)
           
        
           dispatch({
                   type:GET_PLANT_DATA,
                   payload:res.data
       
               })
           })
   }
   export const getAllPlantsInventory = () => dispatch => {
    // return axios.post("/api/inventories/plants",null,config).then(res=>{ 
        axios.get("/api/inventories/plants",config).then(res=>{ 
        console.log(res)
        
     
        dispatch({
                type:GET_PLANT_DATA_INVENTORY,
                payload:res.data
    
            })
        })
}
   
   export const getLocationList = () => dispatch => {
    axios.get("/api/location-list",config).then(res=>{ 
        console.log(res)
        
     
        dispatch({
                type:GET_LOCATION_LIST,
                payload:res.data.data
    
            })
        })
}
   export const getCategoryList = () => dispatch => {
    axios.get("/api/plant-categories",config).then(res=>{ 
        console.log(res)
        dispatch({
                type:GET_PLANT_CATEGORY_LIST,
                payload:res.data.data    
            })
        })
}
export const getManufacturerList = () => dispatch => {
    axios.get("/api/manufacture-list",config).then(res=>{ 
        console.log(res)
        dispatch({
                type:GET_MANUFACTURER_CATEGORY_LIST,
                payload:res.data.data    
            })
        })
}
export const getProductCategoryList = () => dispatch => {
    axios.get("/api/product-categories",config).then(res=>{ 
        console.log(res)
        dispatch({
                type:GET_PRODUCT_CATEGORY_LIST,
                payload:res.data.data    
            })
        })
    }


export const getFilterResult = (data) => dispatch => {
    console.log(data)
    let filterObj={}
    filterObj["supplier_id"]=data.selectedSupplierId !== ""?parseInt(data.selectedSupplierId):"" 
    filterObj["category"]=data.selecredCategoryID
    filterObj["plant_search"]="genus"
    filterObj["plant_search_param"]=data.plantSearchName
    filterObj["sku_search"]="sku_code"
    filterObj["sku_search_param"]=data.skuSearchName
    filterObj["location"]=""
    filterObj["batch_code"]=""   
    filterObj["plantActive"] = false
    filterObj["skuActive"] = false
    // return  axios.post("/api/plant-inventory-search",filterObj,config).then(res=>{ 
    //     console.log(res)
    // console.log(data)
    // let resultArray = []
    // if(!data.allPlantRadio)
    // resultArray= res.data.data.filter(obj=>obj.status=== "1")
    // else
    // resultArray = res.data.data
    // console.log(resultArray.length)
        dispatch({
                type:PLANT_INVENTORY_FILTER,
                // payload:resultArray
                payload:filterObj
    
            })
        // })
}
//for plant sku
export const getPlantList = () => dispatch => {
// let obj={}

    return  axios.post("/api/plant-inventory-search",null,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:GET_ALL_PLANT_INVENTORY_ACTION,
                payload:res.data.data
    
            })
        })

}

export const getInventoryPlantManagerList = () => dispatch => {
    let obj={}
    
        return  axios.post("/api/plant-inventory-search",obj,config).then(res=>{ 
            console.log(res)
            dispatch({
                    type:GET_ALL_PLANTMANAGER_INVENTORY_ACTION,
                    payload:res.data.data
        
                })
            })
    
    }
    export const getInventoryProductManagerList = () => dispatch => {
        let obj={}
        
            return  axios.post("/api/plant-inventory-search",obj,config).then(res=>{ 
                console.log(res)
                dispatch({
                        type:GET_ALL_PRODUCTMANAGER_INVENTORY_ACTION,
                        payload:res.data.data
            
                    })
                })
        
        }
export const getProductList = () => dispatch => {
    let obj={}
    
        // return  axios.post("/api/product-search",obj,config).then(res=>{ 
        //     console.log(res)
           
        //     dispatch({
        //             type:GET_ALL_PRODUCT_INVENTORY_ACTION,
        //             payload:res.data
        
        //         })
        //     })
            return axios.post("/api/product-search",null,config).then(res=>{ 
                console.log(res)
                
             
                dispatch({
                        type:GET_ALL_PRODUCT_INVENTORY_ACTION,
                        payload:res.data
            
                    })
                })
    
    }
    export const getProductListSku = () => dispatch => {
        let obj={}
        
            // return  axios.post("/api/product-search",obj,config).then(res=>{ 
            //     console.log(res)
               
            //     dispatch({
            //             type:GET_ALL_PRODUCT_INVENTORY_ACTION,
            //             payload:res.data
            
            //         })
            //     })
                return axios.post("/api/product-inventory-search",null,config).then(res=>{ 
                    console.log(res)
                    
                 
                    dispatch({
                            type:GET_ALL_PRODUCT_INVENTORY_ACTION_SKU,
                            payload:res.data
                
                        })
                    })
        
        }

    

    export const getProductFilterResult = (data) => dispatch => {
        console.log(data)
     
        let filterObj={}
        filterObj["supplier_id"]=1
        filterObj["category"]=data.selecredCategoryID!== ""?parseInt(data.selecredCategoryID):""
        filterObj["manufacturer_id"]=data.selectedManufacturerId!== ""?parseInt(data.selectedManufacturerId):""
        filterObj["product_search"]=data.productSearchName
        filterObj["product_search_param"]=""
        filterObj["sku_search"]="sku_code"
        filterObj["sku_search_param"]=data.productSkuSearchName
        filterObj["location"]=""
        filterObj["batch_code"]=""
        filterObj["prodctActive"] = data.productRadio
        filterObj["skuActive"] = data.productSkuRadio
       
        
        
    
       
        // return  axios.post("/api/product-search",filterObj,config).then(res=>{ 
        //     console.log(res)
     
            dispatch({
                    type:PRODUCT_INVENTORY_FILTER,
                    payload:filterObj
        
                })
            // })
    
    }