


import {
    //Plant ACTION
    CREATE_PLANT_ACTION,
   // UPDATE_PLANT_ACTION,
    DELETE_PLANT_ACTION,
    GET_ALL_PLANT_ACTION,
    GET_SPECIFIED_PLANT_ACTION,
   // DUPLICTE_PLANT,

    // Plant SKU ACTION
    // CREATE_PLANT_SKU_ACTION,
    // UPDATE_PLANT_SKU_ACTION,
    // DELETE_PLANT_SKU_ACTION,
    GET_ALL_PLANT_SKU_ACTION,
    //GET__PLANT_SPECIFIED_SKU_ACTION,

    //Plant page redirects action

    PAGE_PLANT_REDIRECT_ACTION,
    SUB_PLANT_PAGE_REDIRECT_ACTION,

    // Plant INPUT HANDLE
    HANDLE_PLANT_INPUT_DATA,
    // HANDLE_PLANT_TAG_INPUT_DATA,
    // HANDLE_PLANT_SKU_INPUT_DATA,

    // axios config
    config,
    axios,
    //SUB_PAGE_REDIRECT_ACTION,

    ERROR_HANDLE,

    //filter category
    // FILTER_CATEGORY_DATA

    //pagiantion
    SET_PLANT_PAGE_NUMBER,
    SET_PLANT_SKU_PAGE_NUMBER,

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
// console.log("working 2")
// let plantData = {
//     genus:"genus",
// species:"species",
// cultivar1:"cultivar1",
// //common_name[]:[name1,name2,name3]
// category_id:3,
// status:1,
// main_content_web:"main content of web",
// bullet_point_web:"bullet point",
// growing_maintenance_tips_web:"maintenance tips",
// alternate_genus:"test",
// series:"test",
// patent:"test",
// royality:"test",
// hardiness_zone:"test",
// introduction_year:2023,
// attributes:[
// {
//     id:1,
//     subattributes:[
//         {
//             id:1,
//             value:"hello"
//         }
//     ]
// }
// ]
// "attributes[0][id]":1,
// "attributes[0][subattributes][0][id]":1,
// "attributes[1][id]":2,
// "attributes[1][subattributes][1][id]":3,
// "attributes[2][id]":3,
// "attributes[2][subattributes][2][id]":4,
export const createPlantAction = (plantData,tags) => dispatch => {
    let errorArray=[];
    if(plantData.genus.trim().length ===0 ) errorArray.push("Add plant genus")
    if(plantData.species.trim().length ===0 ) errorArray.push("Add plant species")
    if(errorArray.length===0){
        plantData["common_name"] = tags.length===0?["Tag"]:tags
        axios.post(`/api/add-plant`,plantData,config).then(res=>{
            errorArray.push("Producted Added successfully")
            dispatch(getAllPlantAction())
            // dispatch(showSpecifiedSkuAction(res.data.data.product_sku))
         
            dispatch({
                type:ERROR_HANDLE,
                message:errorArray,
                status:true
            },
            dispatch(plantSubPageReDirectAction("sku")))
           
            dispatch({
                type:CREATE_PLANT_ACTION
            })
    
        })
        .catch(error=>{
            // errorArray.push("Please select mandate fileds")
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

    axios.post(`/api/add-plant`,plantData,config).then(res=>{ 
        console.log(res)
   
        })
}



export const updatePlantAction = (data,id,tag) => dispatch => {

}
export const deletePlantAction = (id) => dispatch => {
    let error = []
    axios.post(`/api/delete-plant/${id}`,null,config).then(res=>{ 
        dispatch(getAllPlantAction())
        // dispatch(getAllSkuAction())
        // dispatch(deleteSkuAction(id))
        dispatch({
            type:DELETE_PLANT_ACTION
        })
        error.push("Plant deleted successfully",)
        dispatch({
            type:ERROR_HANDLE,
            message:error,
            status:true
        })
        })


}
export const duplicatePlant = (id) =>dispatch=>{
    dispatch(getSpecifiedPlantAction(id, "add"))

}
export const getAllPlantAction = () => dispatch => {
    axios.get("/api/plants",config).then(res=>{ 
        dispatch({
                type:GET_ALL_PLANT_ACTION,
                payload:res.data.data
    
            })
        })

}

export const getSpecifiedPlantAction = (id, actionType="edit",pageToOpen="general") => dispatch => {
    axios.get(`/api/plant/${id}`,config).then(res=>{ 
        console.log(res.data)
        // dispatch(showSpecifiedSkuAction(id))
        dispatch(plantPageReDirectAction(pageToOpen,actionType))
        dispatch({
                type:GET_SPECIFIED_PLANT_ACTION,
                payload:res.data,
                actionType:actionType
    
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
export const createPlantSkuAction = (id) => dispatch => {

}
export const updatePlantSkuAction = (id, data, actionType="edit") => dispatch => {


}
export const deletePlantSkuAction = (id) => dispatch => {



}
export const getAllPlantSkuAction = (id) => dispatch => {
    axios.get("api/skus/plants",config).then(res=>{ 
        dispatch({
                type:GET_ALL_PLANT_SKU_ACTION,
                payload:res.data.data
    
            })
        })


}
export const showSpecifiedPlantSkuAction = (id) => dispatch => {

}






/**
* Page Redirects Action
* The following functions are used to redirecting product page
* Redirects to add Product page
* Redirects to edit product page

*/
export const plantPageReDirectAction = (page,actionType) => {
    return{
        type:PAGE_PLANT_REDIRECT_ACTION,
        page:page,
        actionType:actionType
    }


}
export const plantSubPageReDirectAction = (page) => {
    return{
        type:SUB_PLANT_PAGE_REDIRECT_ACTION,
        page:page,
    }


}
export const setPlantPageNumber = (pageNumber) => {
    return{
        type:SET_PLANT_PAGE_NUMBER,
        pageNumber:pageNumber,
    }

  
  }
export const setPlantSkuPageNumber = (skuPageNumber) =>{
    return{
        type:SET_PLANT_SKU_PAGE_NUMBER,
        skuPageNumber:skuPageNumber,

    }
    


}
  


/**
* Input Action
* handle input action
*/

export const handlePlantInputAction = (id, value) =>dispatch=>{
    dispatch({
        type:HANDLE_PLANT_INPUT_DATA,
        itemId:id,
        itemValue:value
    })

}
// export const handlePlantSkuInputAction =(id,value) =>dispatch=>{


// }
// export const handlePlantTagAction = (id, value) =>dispatch=>{

// }

//handle category Filter action
// export const handlePlantCategory = (category,subCategory) =>dispatch=>{

// }










