import {

    ///Product Manufacture Action
    GET_ALL_PRODUCT_MANUFACTURES,
    HANDLE_PRODUCT_MANUFACTURE_INPUT_DATA,
    HANDLE_ADD_PRODUCT_MANUFACTURE,
    HANDLE_DRAG_PRODUCT_MANUFACTURE,
    HANDLE_DRAG_MANUFACTURER_SORT,
    HANDLE_PRODUCT_MANUFACTURE_DELETE,
    SHOW_SPECIFIC_PRODUCT_SETTING_MANUFACTURES,
    UPDATE_PRODUCT_SETTING_MANUFACTURES,

    // axios config
    config,
    axios

} from './types';

// Product Manufacture data
export const getAllProductManufacturers = ()=> dispatch =>{
    return axios.get("/api/manufacture-list",config).then(res=>{ 
        console.log(res)
    dispatch({
            type:GET_ALL_PRODUCT_MANUFACTURES,
            payload:res.data

        })
    })

}


export const updateProductSettingManufacture = (id, data) =>dispatch => {
    //debugger;
   return axios.post(`/api/update-manufacture/${id}`,data,config).then(res=>{ 
      // debugger;
       console.log(res.data)
   dispatch({
           type:UPDATE_PRODUCT_SETTING_MANUFACTURES,
           payload:res.data.data,

       })
   })

}


export const showSpecificProductSettingManufacture = (id) => dispatch => {
   axios.get(`api/show-manufacture/${id}`,config).then(res=>{ 
     
       console.log(res.data)
   dispatch({
           type:SHOW_SPECIFIC_PRODUCT_SETTING_MANUFACTURES,
           payload:res.data
       })
   })
}





export const handleProductManufacturerInputAction = (name) =>dispatch=>{
    console.log(name)
 dispatch({
     type:HANDLE_PRODUCT_MANUFACTURE_INPUT_DATA,
     name:name
    
 })
}


export const handleAddProductManufacturer = (data) =>dispatch=>{
    console.log(data)
    let productManufactureObject={}
    productManufactureObject.name=data
    productManufactureObject.status="1"
    return axios.post("/api/add-manufacture",productManufactureObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_ADD_PRODUCT_MANUFACTURE,
            payload:res.data

        })
    })
}
export const handleDragDrop = (data) =>dispatch=>{
    let productManufactureObject={}
  
    if(data.status === 1){
        productManufactureObject.status="0"
    }
    else {
        productManufactureObject.status="1"
    }
    return axios.post(`/api/update-manufacture/${data.id}`,productManufactureObject,config).then(res=>{ 
        console.log("updatekkm",res)
    dispatch({
            type:HANDLE_DRAG_PRODUCT_MANUFACTURE,
            payload:res.data

        })
    })
}
export const handleManufacturerDragSort = (fromId, toId,type) =>dispatch=>{
    let attributeObject={}
    attributeObject.from=fromId;
    attributeObject.to=toId;
    attributeObject.position=type
    return axios.post(`/api/drag-sort-manufacturer`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_DRAG_MANUFACTURER_SORT,
            payload:res.data
        })
    })
}
export const handleProductManufacturerDelete = (id) =>dispatch=>{
    let deleteId = parseInt(id)

    let productManufactureObject={}
    return axios.post(`/api/delete-manufacture/${deleteId}`,productManufactureObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_PRODUCT_MANUFACTURE_DELETE,
            payload:res.data

        })
    })
}
