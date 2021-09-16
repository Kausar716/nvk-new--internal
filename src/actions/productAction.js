
import {
    //PRODUCT ACTION
    CREATE_PRODUCT_ACTION,
    UPDATE_PRODUCT_ACTION,
    DELETE_PRODUCT_ACTION,
    GET_ALL_PRODUCT_ACTION,
    GET_SPECIFIED_PRODUCT_ACTION,
    GET_ALL_PRODUCT_CATEGORIES_ACTION,
    DUPLICTE_PRODUCT,
    GET_SKU_SPECIFIED_PRODUCT,
    UPDATE_CHECK_BOX_SKU1,


    // SKU ACTION
    CREATE_SKU_ACTION,
    UPDATE_SKU_ACTION,
    DELETE_SKU_ACTION,
    GET_ALL_SKU_ACTION,
    GET_SPECIFIED_SKU_ACTION,
    UPDATE_SKU_ACTION_CLEAR,
    CREATE_SKU_ACTION_AND_CLEAR,

    //page redirects action

    PAGE_REDIRECT_ACTION,
    SUB_PAGE_REDIRECT_ACTION,
    SET_PAGE_NUMBER,
    SET_SKU_PAGE_NUMBER,

    //INPUT HANDLE
    HANDLE_INPUT_DATA,
    HANDLE_TAG_INPUT_DATA,
    HANDLE_SKU_INPUT_DATA,
    ERROR_HANDLE,
    HANDLE_MANUFACTURE_DATA,
    HANDLE_SELECTED_CATEGORY,
    CHECK_BOX_SKU1,
    HANDLE_PRODUCT_RADIO_RESET,

    // axios config
    config,
    axios,

    //filter category
    FILTER_GET_ALL_CATEGORY_DATA,
    FILTER_GET_SLECTED_CATEGORY_DATA,
    FILTER_GET_SLECTED_CATEGORY_SUB_DATA,
    HANDLE_PRODUCT_SEARCH_INPUT,
    HANDLE_PRODUCT_RADIO_TOGGLE,
    CLEAR_SKU_FIELDS_PRODUCT

    
    
    


} from './types';

/**
* Product Action
* The following functions are used to perform actions on Product using API's
    1. create product API
    2. update product API
    3. delete product API
    4. get all product  API
    5.get specified product API
*/

export const createProductAction = (product) => dispatch => {
    let errorArray=[];
    if(product.manufacturer_id===0||product.manufacturer_id ==null) errorArray.push("Select Manufacturer") 
    if(product.category_id ===0||product.category_id == null) errorArray.push(" Select Category")
    if(product.name.trim().length ===0 ) errorArray.push("Add Product Name")
    if(errorArray.length===0){
        axios.post(`/api/create-product`,product
        , config).then(res=>{
            errorArray.push("Product Added successfully")
            dispatch(getAllProductAction())
            //dispatch(createSkuAction(res.data.data.product.product_id,product,"add"))
           //dispatch(getAllSpecifiedSkuProductList(res.data.data.product.product_id))
           
        
        //disppath(updateProductAction(product,res.data.data.product.product_id,))
            dispatch({
                type:ERROR_HANDLE,
                message:errorArray,
                status:true
            },
            dispatch(subPageReDirectAction("sku")))
            dispatch(getAllSpecifiedSkuProductList(res.data.data.product.product_id))
            dispatch({
                type:CREATE_PRODUCT_ACTION,
                ae_product_id:res.data.data.product.product_id
            })

            //dispatch(getSpecifiedProductAction(res.data.data.product.product_id,"edit","general"))
        })

        .catch(error=>{
            errorArray.push(error.response.data.message)
            dispatch({
                type:ERROR_HANDLE,
                message:errorArray,
                status:true
            })
            
        })         
    }else{
        dispatch({
            type:ERROR_HANDLE,
            message:errorArray,
            status:true
        })

    }
  
 
}

export const updateCheckBoxsku1 = (id,index,type1,obj)=>dispatch=>{
    obj.type = "product"
    return axios.post(`/api/update-sku/${id}`, obj, config).then(res=>{

        dispatch({
            type:UPDATE_CHECK_BOX_SKU1,
            id:id,
            typetoshow:type1,
            index:index,
            obj:obj

        })
    })
}

export const checkBoxSku1 =(id,index,type1,obj) =>dispatch=>{
    // alert("kausar")
    dispatch({
        type:CHECK_BOX_SKU1,
        id:id,
        typetoshow:type1,
        index:index,
        obj:obj

    })
    
}
export const updateProductAction = (data,id,tag) => dispatch => {
    let updateObj= data
    if(typeof(data.common_name) === "string"){
        if(data.common_name.length>0)
        updateObj.common_name = JSON.parse(data.common_name)
        else 
        updateObj.common_name = []
    }
    let error = []
    axios.post(`/api/update-product/${id}`,data,config).then(res=>{ 
        dispatch(getAllProductAction())
        //dispatch(createSkuAction(res.data.data.product.product_id,data,"add"))
        
        error.push("Product Updated successfully")
        dispatch({
            type:UPDATE_PRODUCT_ACTION
        })
        dispatch({
            type:ERROR_HANDLE,
            message:error,
            status:true
        },
        dispatch(getAllSpecifiedSkuProductList(id)),
        dispatch(subPageReDirectAction("sku"))
        )
    })
    .catch(error1=>{
        error.push(error1.response.data.message)
        dispatch({
            type:ERROR_HANDLE,
            message:error,
            status:true
        })
        
    })
    

}
export const deleteProductAction = (id) => dispatch => {
    //debugger
    let error = []
    axios.post(`/api/delete-product/${id}?type=product`,null,config).then(res=>{ 
        dispatch(getAllProductAction())
        //dispatch(getAllSkuAction())
         dispatch(getAllSpecifiedSkuProductList(id))
        dispatch({
            type:DELETE_PRODUCT_ACTION
        })
        error.push("Product deleted successfully",)
        dispatch({
            type:ERROR_HANDLE,
            message:error,
            status:true
        })
        })
        .catch(error1=>{
            error.push(error1.response.data.message)
            dispatch({
                type:ERROR_HANDLE,
                message:error,
                status:true
            })
            
        })


}

export const getAllProductAction = () => dispatch => {
  return  axios.get("/api/products",config).then(res=>{ 
    dispatch({
            type:GET_ALL_PRODUCT_ACTION,
            payload:res.data

        })
    })
}


export const getAllSpecifiedSkuProductList =(id)=>dispatch=>{
    axios.get(`/api/skus/products/${id}`,config).then(res=>{ 
        dispatch({
                type:GET_SKU_SPECIFIED_PRODUCT,
                payload:res.data,    
            })
        })
}



export const getSpecifiedProductAction = (id, actionType="edit",pageToOpen="general") => dispatch => {
    axios.get(`/api/product/${id}`,config).then(res=>{ 
        dispatch(pageReDirectAction(pageToOpen,actionType))
        dispatch({
                type:GET_SPECIFIED_PRODUCT_ACTION,
                payload:res.data,
                actionType:actionType    
            },
            dispatch(getAllSpecifiedSkuProductList(id)),
            )
        })   
}

export const duplicateProduct = (id) =>dispatch=>{
    let error = []
    let filteredID = id.match(/\d+/g).map(Number);
    axios.get(`/api/duplicate-product/${filteredID[0]}`,config).then(res=>{ 
        console.log(res)
        dispatch(getAllProductAction())
        dispatch(getAllSkuAction())
        dispatch({
            type:DUPLICTE_PRODUCT,
            payload:res.data.data
        })
        error.push("Product duplicated successfully",)
        dispatch({
                        type:ERROR_HANDLE,
                        message:error,
                        status:true
                    })
        })
}


/**
* Product SKU Action
* The following functions are used to perform actions on product SKU  using API's
    1. add SKU API
    2. get all SKU API
    3. show specified SKU API
    4. update sku API
    5. delete SKU API
*/


export const createSkuAction = (id, skuData,skuFieldClear, actionType="add") =>async dispatch => {
    const data1={
                type:"product",
                supplier_id:1,
            };
            const FinalData = {...data1, id, ...skuData}
    let error = []
    if(skuData.each_cost===0||skuData.each_cost ==="" ||skuData.each_cost==null) error.push("Add Each Cost") 
    if(skuData.each_price ===0||skuData.each_price ===""||skuData.each_price==null) error.push(" Add Each Price")
    if(skuData.sale_price ===0||skuData.sale_price === ""||skuData.sale_price==null) error.push("Add Sale Price") 
    if(skuData.sub_category_id ===0||skuData.sub_category_id == null||skuData.sub_category_id==null) error.push("Select Sub Category")
    if(skuData.sku_item_name==null ||skuData.sku_item_name.length ===0 ) error.push("Add Sku Item Name")
    if(error.length===0){
        delete skuData["id"]
     
        // FinalData.subcategory_id =FinalData.subcategory
        delete FinalData.subcategory
       
        axios.post(`/api/add-sku`,FinalData,config).then(res=>{ 
            //dispatch(getAllProductAction())
                            // dispatch(showSpecifiedSkuAction(id))
            //dispatch(getSpecifiedProductAction(id,"edit","sku"))
            // dispatch(pageReDirectAction("sku",actionType))
            //dispatch(showSpecifiedSkuAction())

            //dispatch(updateSkuAction(res.data.data.id, skuData))
            dispatch(getAllSkuAction(res.data.data.id))
            dispatch(getAllSpecifiedSkuProductList(res.data.data.product_id))
           
            if(skuFieldClear){
                dispatch({
                    type:CREATE_SKU_ACTION_AND_CLEAR,
                    actionType:actionType
                })
            }
            else{
                dispatch(showSpecifiedSkuAction(res.data.data.id, "edit"))
                dispatch({
                    type:CREATE_SKU_ACTION
                })
            }
           
            error.push("SKU Created successfully")
            dispatch({
                type:ERROR_HANDLE,
                message:error,
                status:true
            })
            
            }).catch(error1=>{
                error.push(error1.response.data.message)
                dispatch({
                    type:ERROR_HANDLE,
                    message:error,
                    status:true
                })
    
            })
    }else{
        dispatch({
            type:ERROR_HANDLE,
            message:error,
            status:true
        })

    }

}





export const updateSkuAction = (id, data) =>async dispatch => {
 let error  = []
 if(data.each_cost===0||data.each_cost ==="" ||data.each_cost==null) error.push("Add Each Cost") 
 if(data.each_price ===0||data.each_price ===""||data.each_price==null) error.push(" Add Each Price")
 if(data.sale_price ===0||data.sale_price === ""||data.sale_price==null) error.push("Add Sale Price") 
 if(data.sub_category_id ===0||data.sub_category_id == null||data.sub_category_id==null) error.push("Select Sub Category")
 if(data.sku_item_name==null ||data.sku_item_name.trim().length ===0 ) error.push("Add Sku Item Name")
   

 if(error.length===0){
    const data1={
        type:"product",
        supplier_id:1,
    };
    const FinalData = {...data1, id, ...data}
        axios.post(`/api/update-sku/${id}`,FinalData,config).then(res=>{ 
            //debugger;
            dispatch(getAllSkuAction(id))
            dispatch(getAllSpecifiedSkuProductList(res.data.data.product_id))
            
            dispatch({
                type:UPDATE_SKU_ACTION
            })
            error.push("SKU Updated Successfully")
            dispatch({
                type:ERROR_HANDLE,
                message:error,
                status:true
            })

            }).catch(error1=>{
                error.push(error1.response.data.message)
                dispatch({
                    type:ERROR_HANDLE,
                    message:error,
                    status:true
                })
    
            })

        }else{
            dispatch({
                type:ERROR_HANDLE,
                message:error,
                status:true
            })
        }
}



export const updateSkuActionClear = (id,data) => async dispatch=>{
    let error  = []
    if(data.each_cost===0||data.each_cost ==="" ||data.each_cost==null) error.push("Add Each Cost") 
    if(data.each_price ===0||data.each_price ===""||data.each_price==null) error.push(" Add Each Price")
    if(data.sale_price ===0||data.sale_price === ""||data.sale_price==null) error.push("Add Sale Price") 
    if(data.subcategory ===0||data.subcategory == null||data.subcategory==null) error.push("Select Sub Category")
    if(data.sku_item_name==null ||data.sku_item_name.trim().length ===0 ) error.push("Add Sku Item Name")
    if(error.length===0){
       
        const data1={
            type:"product",
            supplier_id:1,
        };
        const FinalData = {...data1, id, ...data}
        axios.post(`/api/update-sku/${id}`,FinalData,config).then(res=>{
           // error.push("Product Updated Successfully")
        dispatch({
            type:UPDATE_SKU_ACTION_CLEAR
        })
        error.push("SKU successfully and cleared Data")
        dispatch(getAllSkuAction(id))
        dispatch(getAllSpecifiedSkuProductList(res.data.data.product_id))
        dispatch({
            type:ERROR_HANDLE,
            message:error,
            status:true
        })
        })

       
        .catch(error1=>{
            error.push(error1.response.data.message)
            dispatch({
                type:ERROR_HANDLE,
                message:error,
                status:true
            })

        })
    }
    else{
        dispatch({
            type:ERROR_HANDLE,
            message:error,
            status:true
        })

    }

}


export const deleteSkuAction = (id) => dispatch => {
    let error = []
    axios.post(`/api/delete-sku/${id}?type=product`,null,config).then(res=>{ 
        dispatch(getAllProductAction())
        dispatch(getAllSkuAction())
        dispatch(getAllSpecifiedSkuProductList(res.data.data.product_id))
        dispatch({
            type:DELETE_SKU_ACTION
        })
        error.push("Product deleted successfully",)
        dispatch({
                        type:ERROR_HANDLE,
                        message:error,
                        status:true
                    })
        })


}
export const getAllSkuAction = (id) => dispatch => {
    axios.get("/api/skus/products",config).then(res=>{ 
        dispatch({
                type:GET_ALL_SKU_ACTION,
                payload:res.data
    
            })
        })

}




export const showSpecifiedSkuAction = (id,data, actionType="edit") => dispatch => {
  
     axios.get(`/api/sku/${id}?type=product`,config).then(res=>{ 
        //axios.get(`/api/skus/products/${id}`,config).then(res=>{ 
        dispatch({
                type:GET_SPECIFIED_SKU_ACTION,
                payload:res.data.data[0],
                actionType:actionType
    
            })
        })

}

export const serachProduct = (data) =>dispatch=>{
    dispatch({
        type:HANDLE_PRODUCT_SEARCH_INPUT,
        payload:data,
    })

}
export const resetProductRadio = () =>dispatch=>{
    dispatch({
        type:HANDLE_PRODUCT_RADIO_RESET,
        // payload:data,
    })

}

 export const radioSearch = (data) =>dispatch=>{
     dispatch({
         type:HANDLE_PRODUCT_RADIO_TOGGLE,
         payload:data
     })
 }

// export const getSpecifiedProductAction = (id, actionType="edit",pageToOpen="general") => dispatch => {
//     axios.get(`/api/product/${id}`,config).then(res=>{ 

//         //debugger;
//         console.log("abcd",res.data)
//         //dispatch(showSpecifiedSkuAction(id))
//         dispatch(pageReDirectAction(pageToOpen,actionType))
//         dispatch({
//                 type:GET_SPECIFIED_PRODUCT_ACTION,
//                 payload:res.data,
//                 actionType:actionType
    
//             })
//         })
   
// }




/**
* Page Redirects Action
* The following functions are used to redirecting product page
* Redirects to add Product page
* Redirects to edit product page

*/
export const pageReDirectAction = (page,actionType) => {
    return{
        type:PAGE_REDIRECT_ACTION,
        page:page,
        actionType:actionType
    }

}
export const subPageReDirectAction = (page, productID) => {
  return{
        type:SUB_PAGE_REDIRECT_ACTION,
        page:page,
       // productID:productID
    }

}
export const setPageNumber = (pageNumber) => {
    return{
          type:SET_PAGE_NUMBER,
          pageNumber:pageNumber,
      }
  
  }
export const setSkuPageNumber = (skuPageNumber) =>{
    return{
        type:SET_SKU_PAGE_NUMBER,
        skuPageNumber:skuPageNumber,
    }

}
  


/**
* Input Action
* handle input action
*/

export const handleInputAction = (id, value) =>dispatch=>{
   

    dispatch({
        type:HANDLE_INPUT_DATA,
        itemId:id,
        itemValue:value
    })

}
export const handleSkuInputAction =(id,value) =>dispatch=>{
 
      dispatch({
        type:HANDLE_SKU_INPUT_DATA,
        itemId:id,
        itemValue:value
    })

}
export const clearSkuFields = (actionType)=>dispatch=>{
    if(actionType === "sku")
    actionType="edit"
    dispatch({
        type:CLEAR_SKU_FIELDS_PRODUCT,
        actionType:actionType
    })
    
}
export const handleTagAction = (id, value) =>dispatch=>{

    dispatch({
        type:HANDLE_TAG_INPUT_DATA,
        itemId:id,
        itemValue:value
    })

}
export const modalAction =() =>dispatch=>{
    dispatch({
        type:ERROR_HANDLE,
        status:false,
        message:[]
    })
}

//handle category Filter action
export const handleCategory = (category,subCategory) =>dispatch=>{
    if(category ==="All"){
        dispatch({
            type:FILTER_GET_ALL_CATEGORY_DATA,
            categoryId:category,
            subCategoryId:subCategory
        })

    }else if(category!=="All" && subCategory ==="0"){
        dispatch({
            type:FILTER_GET_SLECTED_CATEGORY_DATA,
            categoryId:category,
            subCategoryId:subCategory
        })

    }else if(category!=="All" && subCategory !=="0"){
        dispatch({
            type:FILTER_GET_SLECTED_CATEGORY_SUB_DATA,
            categoryId:category,
            subCategoryId:subCategory
        })

    }
 

}
export const handleSelectedCategory = (categoryId) =>dispatch=> {
    dispatch({
        type:HANDLE_SELECTED_CATEGORY,
        categoryId:categoryId
    })
}

export const handleManufactureData = (manufacture) =>dispatch=> {
    dispatch({
        type:HANDLE_MANUFACTURE_DATA,
        manufacturer_id:manufacture
    })
}










