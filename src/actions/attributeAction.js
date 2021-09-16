import {
    // PRODUCT CATEGORY ACTION

    GET_ALL_ATTRIBUtTES,
    CREATE_ALL_ATTRIBUTES,
    GET_ALL_SUB_ATTRIBUtTES,
    HANDLE_DRAG_ATTRIBUTE_CATEGORY,
    HANDLE_DRAG_ATTRIBUTE_SORT,
    HANDLE_DELETE_ATTRIBUTE,
    HANDLE_ZONE_INPUT_ACTION,
    SHOW_SUB_ATTRIBUTE,
    HANDLE_POSITION_INPUT_ACTION,
    HANDLE_ADD_POSITION_ATTRIBUTE,
    HANDLE_CLEAR_SUB_ATTRIBUTE_VALUE,
    HANDLE_UPDATE_ATTRIBUTE,
    HANDLE_ZONE_INPUT_ACTION2,
    HANDLE_ZONE_INPUT_ACTION3,
    HANDLE_UPDATE_ATTRIBUTE_CHILD,
    SHOW_LOCATION_TYPE_SUB_ATTRIBUTE,
    GET_ALL_CATEGORIES,
    // axios config
    config,
    axios

} from './types';

// category data
export const getAllAttributesAction = () => dispatch => {
    axios.get("/api/attributes",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_ALL_ATTRIBUtTES,
            payload:res.data

        })
    })
}

export const createSubAttributeAction = (name,status) => dispatch => {
    axios.post(`api/add-attribute?name=${name}&status=${status}`,config).then(res=>{ 
        console.log(res.data)
        dispatch(getAllAttributesAction())
        dispatch({
            type:CREATE_ALL_ATTRIBUTES
        })
    })
}
export const getAllSubAttribute = (id) => dispatch => {
    return axios.get(`/api/show-attribute/${id}`,config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_ALL_SUB_ATTRIBUtTES,
            payload:res.data
        })
    })
}
export const getAllCategories = () => dispatch => {
    return axios.get(`/api/product-categories`,config).then(res=>{ 
        //debugger
        console.log(res.data)
    dispatch({
            type:GET_ALL_CATEGORIES,
            payload:res.data
        })
    })
}

export const showSubSubAttribute = (id) => dispatch => {
    axios.get(`/api/show-subattribute/${id}`,config).then(res=>{ 
      
        console.log(res.data)
    dispatch({
            type:SHOW_SUB_ATTRIBUTE,
            payload:res.data
        })
    })
}

export const getAllLocationTypesSubAttribute = () => dispatch => {
    axios.get(`/api/show-attribute/${17}`,config).then(res=>{ 
      
        console.log(res.data)
    dispatch({
            type:SHOW_LOCATION_TYPE_SUB_ATTRIBUTE,
            payload:res.data
        })
    })
}


export const handleAttributeDragDrop = (data) =>dispatch=>{
    console.log(data)
    let attributeObject={}
    if(data.status === 1){
        attributeObject.status=0
    }
    else {
        attributeObject.status=1
    }
    return axios.post(`/api/update-subattribute/${data.id}`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_DRAG_ATTRIBUTE_CATEGORY,
            payload:res.data
        })
    })
}
export const handleCategoryDragDrop = (data) =>dispatch=>{
    console.log(data)
    let attributeObject={}
    if(data.status === "1"){
        attributeObject.status="0"
    }
    else {
        attributeObject.status="1"
    }
    return axios.post(`/api/product-update-category/${data.id}`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_DRAG_ATTRIBUTE_CATEGORY,
            payload:res.data
        })
    })
}
export const handleAttributeDragSort = (fromId, toId,type) =>dispatch=>{
    let attributeObject={}
    attributeObject.from=fromId;
    attributeObject.to=toId;
    attributeObject.position=type
    return axios.post(`/api/drag-sort-subattribute`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_DRAG_ATTRIBUTE_SORT,
            payload:res.data
        })
    })
}
export const handleAttributeDelete = (id) =>dispatch=>{
    console.log(id)
    let attributeObject={}

    return axios.post(`/api/delete-subattribute/${id}`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_DELETE_ATTRIBUTE,
            payload:res.data
        })
    })
}
export const handCategoryDelete = (id) =>dispatch=>{
    console.log(id)
    let attributeObject={}

    return axios.post(`/api/product-delete-category/${id}`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_DELETE_ATTRIBUTE,
            payload:res.data
        })
    })
}

export const handleSubAttributeUpdate = (id, data) =>dispatch=>{
   // debugger;
    //let attributeObject={}

    return axios.post(`/api/update-subattribute/${id}`,data,config).then(res=>{ 
      // debugger;
        console.log(res)
    dispatch({
            type:HANDLE_UPDATE_ATTRIBUTE,
            payload:res.data
        })
    })
}

export const handleSubAttributeUpdateChild = (id, data) =>dispatch=>{
    // debugger;
     console.log(id, data)
     //let attributeObject={}
 
     return axios.post(`/api/update-subattribute/${id}`,data,config).then(res=>{ 
       // debugger;
         console.log(res)
     dispatch({
             type:HANDLE_UPDATE_ATTRIBUTE_CHILD,
             payload:res.data
         })
     })
 }
export const handleUpdateCategory = (id, data) =>dispatch=>{
     return axios.post(`/api/product-update-category/${id}`,data,config).then(res=>{ 
     dispatch({
             type:HANDLE_UPDATE_ATTRIBUTE,
             payload:res.data
         })
     }).catch(err=>{
         console.log(err.response)
         alert(err.response.data.message)
     })
 }
 export const handleUpdateSubCategory = (id, data) =>dispatch=>{
     return axios.post(`/api/update-subcategory/${id}`,data,config).then(res=>{ 
         console.log(res)
     dispatch({
             type:HANDLE_UPDATE_ATTRIBUTE,
             payload:res.data
         })
     })
 }





export const handleZoneInputAction = (name,value) =>dispatch=>{
    console.log(name)
 dispatch({
     type:HANDLE_ZONE_INPUT_ACTION,
     name:name,
     value:value    
 })
}

export const handleZoneInputAction2 = (name,value) =>dispatch=>{
    console.log(name)
 dispatch({
     type:HANDLE_ZONE_INPUT_ACTION2,
     name:name,
     value:value    
 })
}


export const handleZoneInputAction3 = (name,value) =>dispatch=>{
    console.log(name)
 dispatch({
     type:HANDLE_ZONE_INPUT_ACTION3,
     name:name,
     value:value    
 })
}



export const handleAddZone = (data) =>dispatch=>{
    return axios.post(`/api/add-subattribute`,data,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_CLEAR_SUB_ATTRIBUTE_VALUE
        })
    })
}
export const handleAddCategory = (data) =>dispatch=>{
    return axios.post(`/api/product-add-category`,data,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_CLEAR_SUB_ATTRIBUTE_VALUE
        })
    })
}
export const handleAddSubCategory = (data) =>dispatch=>{
    return axios.post(`/api/add-subcategory`,data,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_CLEAR_SUB_ATTRIBUTE_VALUE
        })
    })
}
export const handlePositionInputAction = (name,value) =>dispatch=>{
    
    console.log("handlePositionInputAction",name, value)
   // debugger
 dispatch({
     type:HANDLE_POSITION_INPUT_ACTION,
     name:name,
     value:value    
 })
}

export const handleAddPosition = (data) =>dispatch=>{
    return axios.post(`/api/add-subattribute`,data,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_ADD_POSITION_ATTRIBUTE,
            payload:res.data
        })
    })
}