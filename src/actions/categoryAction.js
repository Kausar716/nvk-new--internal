import {
    // PRODUCT CATEGORY ACTION

    GET_ALL_PRODUCT_CATEGORIES_ACTION,

    // PRODUCT SUB CATEGORY ACTION
    GET_ALL_PRODUCT_SUB_CATEGORIES_ACTION,

    //MANUFACTURE action
    GET_ALL_MANUFACTURE_ACTON,


    ///GET_ALL_PLANT_CATEGORIES
    GET_ALL_PLANT_CATEGORIES,
    HANDLE_CATEGORY_INPUT_DATA,
    HANDLE_ADD_PLANT_CATEGORY,
    HANDLE_DRAG_PLANT_CATEGORY,
    HANDLE_DRAG_CATEGORY_SORT,
    HANDLE_CATEGORY_DELETE,

    UPDATE_PLANT_SETTING_CATEGORY,
    SHOW_SPECIFIC_PLANT_SETTING_ATTRIBUTE,


    // axios config
    config,
    axios

} from './types';

// category data
export const getAllCategoriesAction = () => dispatch => {
    axios.get("/api/product-categories",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_ALL_PRODUCT_CATEGORIES_ACTION,
            payload:res.data

        })
    })
}
//sub category data
export const getAllSubCategoriesAction = () => dispatch => {
    axios.get("/api/subcategories",config).then(res=>{ 
        console.log(res)
    dispatch({
            type:GET_ALL_PRODUCT_SUB_CATEGORIES_ACTION,
            payload:res.data

        })
    })
}
//manufacture data
export const getAllManufactureAction = () => dispatch =>{
    axios.get("/api/manufacture-list",config).then(res=>{ 
        console.log(res)
    dispatch({
            type:GET_ALL_MANUFACTURE_ACTON,
            payload:res.data

        })
    })
}

//PLANTCATEGORY
export const getAllPlantCategories = ()=> dispatch =>{
    return  axios.get("/api/plant-categories",config).then(res=>{ 
        console.log(res)
    dispatch({
            type:GET_ALL_PLANT_CATEGORIES,
            payload:res.data

        })
    })

}


export const updatePlantSettingCategory = (id, data) =>dispatch => {
    //debugger;
   return axios.post(`/api/plant-update-category/${id}`,data,config).then(res=>{ 
      // debugger;
       console.log(res.data)
   dispatch({
           type:UPDATE_PLANT_SETTING_CATEGORY,
           payload:res.data.data,

       })
   })

}


export const showSpecificPlantSettingAttribute = (id) => dispatch => {
   axios.get(`api/plant-category/${id}`,config).then(res=>{ 
     
       console.log(res.data)
   dispatch({
           type:SHOW_SPECIFIC_PLANT_SETTING_ATTRIBUTE,
           payload:res.data
       })
   })
}





export const handleCategoryInputAction = (name) =>dispatch=>{
    console.log(name)
 dispatch({
     type:HANDLE_CATEGORY_INPUT_DATA,
     name:name    
 })
}
export const handleAddCategory = (data) =>dispatch=>{
    console.log(data)
    let plantCategoryObject={}
    plantCategoryObject.name=data
    plantCategoryObject.status="1"
    // console.log(name)plant-add-category
    return axios.post("/api/plant-add-category",plantCategoryObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_ADD_PLANT_CATEGORY,
            payload:res.data

        })
    })
}
export const handleDragDrop = (data) =>dispatch=>{
    console.log(data)
    let plantCategoryObject={}
    // plantCategoryObject.name=data
  
    if(data.status === "1"){
        plantCategoryObject.status="0"
    }
    else {
        plantCategoryObject.status="1"
    }
    return axios.post(`/api/plant-update-category/${data.id}`,plantCategoryObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_DRAG_PLANT_CATEGORY,
            payload:res.data

        })
    })
    .catch(err=>{
        console.log(err.response.data.message)
        alert(err.response.data.message)
    })
}
export const handleCategoryDragSort = (fromId, toId,type) =>dispatch=>{
    let attributeObject={}
    attributeObject.from=fromId;
    attributeObject.to=toId;
    attributeObject.position=type;
    return axios.post(`/api/drag-sort-category`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_DRAG_CATEGORY_SORT,
            payload:res.data
        })
    })
}
export const handleCategoryDelete = (id) =>dispatch=>{
    let deleteId = parseInt(id)
    // let plantCategoryObject={}

 
    return axios.post(`/api/plant-delete-category/${deleteId}`,null,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_CATEGORY_DELETE,
            payload:res.data

        })
    })
}
