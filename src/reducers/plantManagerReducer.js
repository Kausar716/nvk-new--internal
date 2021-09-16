/* eslint-disable no-dupe-keys */
// import {v4 as v4} from 'uuid';
import {
        //Plant ACTION
        CREATE_PLANT_ACTION,
        UPDATE_PLANT_ACTION,
        DELETE_PLANT_ACTION,
        GET_ALL_PLANT_ACTION,
        GET_SPECIFIED_PLANT_ACTION,
        DUPLICTE_PLANT,
        UPDATE_CHECK_BOX,
        UPDATE_CHECK_BOX_SKU,
        CHECK_BOX,
    
        // Plant SKU ACTION
        CREATE_PLANT_SKU_ACTION,
        UPDATE_PLANT_SKU_ACTION,
        DELETE_PLANT_SKU_ACTION,
        GET_ALL_PLANT_SKU_ACTION,
        GET_PLANT_SPECIFIED_SKU_ACTION,
        GET_SINGLE_PLANT_SKU,
        DYNAMIC_DISPLAY_PLANT_SKU,
    
        //Plant page redirects action
    
        PAGE_PLANT_REDIRECT_ACTION,
        SUB_PLANT_PAGE_REDIRECT_ACTION,
    
        // Plant INPUT HANDLE
        HANDLE_PLANT_INPUT_DATA,
       // HANDLE_PLANT_TAG_INPUT_DATA,
        HANDLE_PLANT_SKU_INPUT_DATA,
        CLEAR_SKU_FIELDS_PLANT,
        HANDLE_PLANT_RADIO_RESET,
        // pagination
        SET_PLANT_PAGE_NUMBER,
        SET_PLANT_SKU_PAGE_NUMBER,
        CHECK_BOX_SKU,
        


        //ERROR_HANDLE
        ERROR_HANDLE,

        //search plant
        HANDLE_SEARCH_INPUT,
        // HANDLE_RADIO_TOGGLE,
        // HANDLE_CATEGORY_SEARCH,

        //GET_ALL_ATTRIBUtTES

} from '../actions/types';
// import {getAllImageAssets} from "../";
let minMonth = new Date().getMonth()
let minDate = new Date().getDate()
let minDateFormate = minDate.toString().length===1?"0"+minDate:minDate
let minMonthFormate = minMonth.toString().length===1?"0"+(minMonth+1):(minMonth+1)

const initialSatate = {
    backupData:[],
  plantData:[],
  plantSkuData:[],
  plantPageToOpen:"all",
  actionType:"add",
  plantPageNumber:0,
  plantSkuPageNumber:0,
  needAction: false,
  plantRadioButton:"active",
  plantDataById:{

    genus: "",
    alternate_genus: "",
    series: "",
    species: "",
    cultivar1: "",
    cultivar2: "",
    introduction_year: "",
    hardiness_zone: "",
    royality: "0.00",
    patent: "",
    category_id: "",
    in_production: 1,
    archived: 0,
    discontinued: 0,
    notes: "",
    common_name:""

  },
  plantSkuDataById:{
    sku_code: "",
    product_id: null,
    plant_id: "",
    each_cost: "0.00",
    each_price: "0.00",
    sale_price: "0.00",
    sale_expiry_date:new Date().getFullYear()+"-"+minMonthFormate+"-"+minDateFormate,
    volume_quantity: "0",
    volume_price_per_unit: "0.00",
    sku_item_name: null,
    subcategory: null,
    archived: "0",
    discontinued: 0,
    location: null,
    status: 1,
    attributes_subattributes:[],


  },
  tagsData: [],
  status:false,
  ae_plant_id:"",
  plantSkuDataList:[],
  plantNameWithFormat:{firstName:"",secondName:""},
  dynamicName:"",
  displayCancel:false

}
const nameFormaterFunction = (plantData) =>{
    let nameWithFormat={}
    let commonNmae =JSON.parse(plantData.common_name).join()
    nameWithFormat.firstName=plantData.genus+' '+plantData.species
    if(!plantData.cultivar2 || plantData.cultivar2.length === 0){   
        if(!plantData.cultivar1 || plantData.cultivar1.length === 0){
            nameWithFormat.secondName = ' '+commonNmae.length>0?`-${commonNmae}`:""
        }
        else     
        nameWithFormat.secondName = ' '+ ` '${plantData.cultivar1?plantData.cultivar1:""}'`+`${commonNmae.length>0?`-${commonNmae}`:""}`
    }
    else {
        nameWithFormat.firstName=plantData.genus+' '+plantData.species
        nameWithFormat.secondName = plantData.cultivar2+' '+ `('`+ `${plantData.cultivar1?plantData.cultivar1:""}`+`')`+`${commonNmae.length>0?`-${commonNmae}`:""}`
    }    
    return nameWithFormat
}
const nameFormaterFunctionForHandler = (currentAction,plantData)=>{  
    let copiedPlantData = plantData 
    copiedPlantData={...copiedPlantData, [currentAction.itemId]:currentAction.itemValue}
    let nameWithFormat={}
    let commonNmae =""
    if(copiedPlantData.common_name){
        if(typeof(copiedPlantData.common_name) === "string")
    commonNmae = JSON.parse(copiedPlantData.common_name).join(", ")
    else
    commonNmae = copiedPlantData.common_name.join(", ")    
    }
    nameWithFormat.firstName=copiedPlantData.genus+' '+copiedPlantData.species
    if(!copiedPlantData.cultivar2 || copiedPlantData.cultivar2.length === 0){
        if(!copiedPlantData.cultivar1 || copiedPlantData.cultivar1.length === 0){            
            nameWithFormat.secondName = ' '+commonNmae.length>0?`- ${commonNmae}`:""
        }
        else{
            nameWithFormat.secondName ="'"+`${copiedPlantData.cultivar1.length>0?copiedPlantData.cultivar1:""}`+"'"+` ${commonNmae.length>0?`- ${commonNmae}`:""}`
           
        }        
    }
    else {
        nameWithFormat.firstName=copiedPlantData.genus+' '+copiedPlantData.species
        if(copiedPlantData.cultivar1.length)
        nameWithFormat.secondName = copiedPlantData.cultivar2+" "+"('"+`${copiedPlantData.cultivar1.length>0?copiedPlantData.cultivar1:"" }`+"')"+` ${commonNmae.length>0?`- ${commonNmae}`:''}`        
        else {
            nameWithFormat.secondName = copiedPlantData.cultivar2+" "+`${commonNmae.length>0?`- ${commonNmae}`:''}`
        }
    }   
    return nameWithFormat
   
}

const getFilteredPlantList = (plantDataList,plantRadioButton)=>{
    let returnPlantDateList =[]
    if(plantRadioButton === "active"){                
        returnPlantDateList = plantDataList.filter(plant=>{
            return (plant.archived === 0)
        })            
    }
    else if(plantRadioButton === "archive"){
        returnPlantDateList = plantDataList.filter(plant=>{
            return (plant.archived === 1)
        })       
    }
    else{
        returnPlantDateList=plantDataList          
    }
    return returnPlantDateList
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialSatate, action){
    switch(action.type){
        // plant page redirects
        case CHECK_BOX:
            let plantData1 = state.plantData
            plantData1[action.index] = {...plantData1[action.index],...action.obj}
            let UpdatedPlantList = []
            UpdatedPlantList = getFilteredPlantList(plantData1,state.plantRadioButton)           
            return{
                ...state,
                plantData:UpdatedPlantList
            }
            case CHECK_BOX_SKU:
                let plantSku = state.plantSkuDataList
                plantSku[action.index]["status"]= action.obj["status"]
                return{
                    ...state,
                    plantSkuDataList:plantSku,
                }
        case UPDATE_CHECK_BOX:
            let plantData = state.plantData
            if(plantData.length>0){
            plantData[action.index][action.typetoshow]= action.obj[action.typetoshow]
            let UpdatedPlantListCheckBox = []
            UpdatedPlantListCheckBox = getFilteredPlantList(plantData,state.plantRadioButton)
            return{
                ...state,
                plantData:UpdatedPlantListCheckBox,
            }
            }
            else{
                return{
                    ...state,
                    plantData:[],
                }
            }
            case UPDATE_CHECK_BOX_SKU:
                let plantSkuData = state.plantSkuDataList
                plantSkuData[action.index]["status"]= action.obj["status"]
                return{
                    ...state,
                    plantSkuDataList:plantSkuData,
                }
        case PAGE_PLANT_REDIRECT_ACTION:
            return{            
                ...state,
                plantPageToOpen:action.page,
                actionType:action.actionType,
                plantRadioButton:"active",
                plantDataById     :   {
                    genus: "",
                    alternate_genus: "",
                    series: "",
                    species: "",
                    cultivar1: "",
                    cultivar2: "",
                    introduction_year: "",
                    hardiness_zone: "",
                    royality: "0.00",
                    patent: "",
                    category_id: "",
                    in_production: 1,
                    archived: 0,
                    discontinued: 0,
                    notes: "",
                    common_name:""
                },
                plantSkuDataById         :   {
                sku_code: "",
                plant_id: "",
                each_cost: "0.00",
                each_price: "0.00",
                sale_price: "0.00",
                sale_expiry_date:new Date().getFullYear()+"-"+minMonthFormate+"-"+minDateFormate,
                volume_quantity: "0",
                volume_price_per_unit: "0.00",
                sku_item_name: null,
                subcategory: null,
                archived: "0",
                discontinued: 0,
                location: null,
                status: 0,
                attributes_subattributes:[]           
            
                },
                message:"",
                needAction:false,
                tagsData:[],
                actionType:"add",
                plantSkuDataList:[],
                ae_plant_id:"",
                dynamicName:"",
                displayCancel:false,
                plantNameWithFormat:{firstName:"",secondName:""},
               


            }
            case SUB_PLANT_PAGE_REDIRECT_ACTION:
                return{
                    ...state,
                    plantPageToOpen:action.page
                    
                }




        case GET_ALL_PLANT_ACTION:
            let returnPlantList = []   
            console.log(state.plantRadioButton)
            console.log(action.payload)
            if(state.plantRadioButton === "active")            {
                returnPlantList = action.payload.filter(plant=>{
                    return (plant.archived === 0)
                })
            }
            else if(state.plantRadioButton === "archive"){
                returnPlantList = action.payload.filter(plant=>{
                    return (plant.archived !== 0)
                })
            }
            else{
                returnPlantList = action.payload
            }
                              
            return{
                ...state,
                plantData:returnPlantList,
                backupData:action.payload
            }
            case CREATE_PLANT_ACTION:
                let createdPlantNameWithFormat = {}    
                 createdPlantNameWithFormat = nameFormaterFunction(action.createdPlantData)
                return{
                    ...state,
                    needAction:false,
                    ae_plant_id:action.ae_plant_id,
                    createdPlantData:action.createdPlantData,
                    actionType:"edit",
                    plantNameWithFormat:createdPlantNameWithFormat,
    
                }
             case UPDATE_PLANT_ACTION:
                 let updatedNameWithFormat = {}    
                 updatedNameWithFormat = nameFormaterFunction(action.createdPlantData)
                 return{
                    ...state,
                    needAction:false,
                    ae_plant_id:action.ae_plant_id,
                    plantNameWithFormat:updatedNameWithFormat,
                    createdPlantData:action.createdPlantData
                 }


            //pagination action 
            case SET_PLANT_PAGE_NUMBER:
                return{
                    ...state,
                    plantPageNumber:action.pageNumber
                }
            case GET_SPECIFIED_PLANT_ACTION:{             
                let nameWithFormat = {}    
                nameWithFormat = nameFormaterFunction(action.payload.data) 
                return{
                    ...state,
                    ...state,
                    plantDataById:action.payload.data,
                    tagsData:JSON.parse(action.payload.data.common_name),
                    needAction:false,
                    actionType:action.actionType,
                    ae_plant_id:action.payload.data.plant_id,
                    plantNameWithFormat:nameWithFormat,
                }
            }
        case HANDLE_PLANT_INPUT_DATA:{
            let nameWithFormat = {}    
                nameWithFormat = nameFormaterFunctionForHandler(action,state.plantDataById) 
            return{
                ...state,
                plantDataById:{...state.plantDataById, [action.itemId]:action.itemValue},
                needAction:true,
                plantNameWithFormat:nameWithFormat,
            }
        }
        case HANDLE_PLANT_SKU_INPUT_DATA:{
            console.log(action)
            if(action.itemValue === "None"){
                let attributeValue = state.plantSkuDataById.attributes_subattributes
                let filteredAttribute = attributeValue.filter(filterData=>filterData.attribute_id !== action.itemId)
                return{
                    ...state,
                    plantSkuDataById:{...state.plantSkuDataById,attributes_subattributes:filteredAttribute},
                    needAction:true,
                    displayCancel:true
                }
            }
          
            if(!isNaN(action.itemId)){
                let plantSkuDataById = state.plantSkuDataById
                if(action.itemId === 6 || action.itemId === "6" ){
                    if(action.itemValue === "0"){
                        plantSkuDataById.volume_quantity = action.itemValue
                        plantSkuDataById.volume_price_per_unit = "0.00"
                    }
                    
                    plantSkuDataById.volume_quantity = action.itemValue
                    return{
                        ...state,
                        plantSkuDataById:plantSkuDataById,
                        needAction:true,
                        displayCancel:true
                    }
                }
                let attributeValue = state.plantSkuDataById.attributes_subattributes             
                if(action.itemId === 3 || action.itemId === "3" ){
                    let idTobeDeleted=-1
                    attributeValue.map((att,index)=>{
                        if(att.attribute_id === 5) idTobeDeleted = index
                    })
                    if(idTobeDeleted>=0)
                    attributeValue.splice(idTobeDeleted,1)
                }
                if(action.itemId === 5 || action.itemId === "5" ){
                    let idTobeDeleted=-1
                    attributeValue.map((att,index)=>{
                        if(att.attribute_id === 3)
                         idTobeDeleted = index
                    })
                    if(idTobeDeleted>=0)
                    attributeValue.splice(idTobeDeleted,1)
                  
                }
                let attibuteData = {attribute_id:parseInt(action.itemId),subattribute_id:parseInt(action.itemValue)}
                // let attributeValue = state.plantSkuDataById.attributes_subattributes
                let attributeUpdated = false
                // let filteredAttribute = attributeValue.filter(filterData=>filterData.attribute_id !== action.itemId)
                // filteredAttribute.push(attibuteData)
                if(attributeValue.length>0){
                    attributeValue.map(attributeObj =>{
                        if(attributeObj.attribute_id === parseInt(action.itemId) ){
                            attributeObj.subattribute_id = parseInt(action.itemValue)
                            attributeUpdated = true
                        }
                    })
                     if(!attributeUpdated ){
                        attributeValue.push(attibuteData)
                    }
                }
                else {
                    attributeValue.push(attibuteData)
                }                
                return{
                    ...state,
                    plantSkuDataById:{...state.plantSkuDataById,attributes_subattributes:attributeValue},
                    needAction:true,
                    displayCancel:true
                }

            }else{
                return{
                    ...state,
                    plantSkuDataById:{...state.plantSkuDataById, [action.itemId]:action.itemValue},
                    needAction:true,
                    displayCancel:true
                }
            }
        
        }
        case ERROR_HANDLE:
            return{
                ...state, 
                status:action.status,
                message:action.message
            }



            // get all plant sku data
        case GET_ALL_PLANT_SKU_ACTION:
            return{
                ...state,
                plantSkuData:action.payload,

            }
        case SET_PLANT_SKU_PAGE_NUMBER:
            return{
                ...state,
                plantSkuPageNumber:action.skuPageNumber
            
            }
        case GET_PLANT_SPECIFIED_SKU_ACTION:
            return{
                ...state,
                plantSkuDataList:action.payload.data
            }
        case DELETE_PLANT_ACTION:
            return{
                ...state,
                needAction:false,
                actionType:"add",
                plantRadioButton:"active",
                plantDataById     :   {
                    genus: "",
                    alternate_genus: "",
                    series: "",
                    species: "",
                    cultivar1: "",
                    cultivar2: "",
                    introduction_year: "",
                    hardiness_zone: "",
                    royality: "0.00",
                    patent: "",
                    category_id: "",
                    in_production: 1,
                    archived: 0,
                    discontinued: 0,
                    notes: "",
                    common_name:""
                },
                plantSkuDataById:{
                    sku_code: "",
                    product_id: null,
                    plant_id: "",
                    each_cost: "0.00",
                    each_price: "0.00",
                    sale_price: "0.00",
                    sale_expiry_date:new Date().getFullYear()+"-"+minMonthFormate+"-"+minDateFormate,
                    volume_quantity: "0",
                    volume_price_per_unit: "0.00",
                    sku_item_name: null,
                    subcategory: null,
                    archived: "0",
                    discontinued: 0,
                    location: null,
                    status: 1,
                    attributes_subattributes:[],
                  },
                  tagsData: [],
                  status:false,
                  ae_plant_id:"",
                plantSkuDataList:[],
                dynamicName:"",
                displayCancel:false,
                plantNameWithFormat:{firstName:"",secondName:""}

            }
        case DUPLICTE_PLANT:
            let plantRadioButton = state.plantRadioButton
            if(state.actionType === "add"){
            return{
                ...state,
                needAction:false,
                actionType:"add",
                plantRadioButton,
                plantDataById     :   {
                    genus: "",
                    alternate_genus: "",
                    series: "",
                    species: "",
                    cultivar1: "",
                    cultivar2: "",
                    introduction_year: "",
                    hardiness_zone: "",
                    royality: "0.00",
                    patent: "",
                    category_id: "",
                    in_production: 1,
                    archived: 0,
                    discontinued: 0,
                    notes: "",
                    common_name:""
                },
                plantSkuDataById:{
                    sku_code: "",
                    product_id: null,
                    plant_id: "",
                    each_cost: "0.00",
                    each_price: "0.00",
                    sale_price: "0.00",
                    sale_expiry_date:new Date().getFullYear()+"-"+minMonthFormate+"-"+minDateFormate,
                    volume_quantity: "0",
                    volume_price_per_unit: "0.00",
                    sku_item_name: null,
                    subcategory: null,
                    archived: "0",
                    discontinued: 0,
                    location: null,
                    status: 1,
                    attributes_subattributes:[],
                  },
                  tagsData: [],
                  status:false,
                  ae_plant_id:"",                
                plantSkuDataList:[],
                dynamicName:"",
                plantNameWithFormat:{firstName:"",secondName:""}
            }
            }
            else {
                return{
                    ...state,
                    plantDataById:action.payload.plant,
                    plantSkuDataList:action.payload.sku,
                    ae_plant_id:action.payload.plant.plant_id,
                    plantRadioButton,
                    plantSkuDataById:{
                        sku_code: "",
                        product_id: null,
                        plant_id: "",
                        each_cost: "0.00",
                        each_price: "0.00",
                        sale_price: "0.00",
                        sale_expiry_date:new Date().getFullYear()+"-"+minMonthFormate+"-"+minDateFormate,
                        volume_quantity: "0",
                        volume_price_per_unit: "0.00",
                        sku_item_name: null,
                        subcategory: null,
                        archived: "0",
                        discontinued: 0,
                        location: null,
                        status: 1,
                        attributes_subattributes:[],
                      }
                }
                
            }
            
        case DELETE_PLANT_SKU_ACTION:
            return{
                    ...state,
                    actionType:"add",
            }


            //search plant 
            case HANDLE_SEARCH_INPUT:
                var optionVal = -1;
                var categoryVal = "";
                if(action.payload.option ==="active"){
                    optionVal = 0;
                }
                if(action.payload.option ==="archive"){
                    optionVal = 1;
                }
                categoryVal = action.payload.category;
                if(action.payload.plant.trim() ==="" && optionVal === -1 && categoryVal === "0"){
                    return{
                        ...state,
                        plantRadioButton:action.payload.option,
                        plantData:state.backupData
                    }
                }
                if(action.payload.plant.trim() ==="" &&  categoryVal !== "0"){
                    return{
                        ...state,
                        plantRadioButton:action.payload.option,
                        plantData:state.backupData.filter(
                            filterData=>( action.payload.plant==="") &&
                            (filterData.archived===optionVal || optionVal===-1) &&
                            (filterData.category_id === Number(categoryVal) || Number(categoryVal) === 0)
                            )
                    }
                }
                
                else{
                    return{
                        ...state,
                        plantRadioButton:action.payload.option,
                        plantData:state.backupData.filter(
                            filterData=>((filterData.plant_name?filterData.plant_name.toLowerCase().indexOf(action.payload.plant.trim().toLowerCase()) > -1:false) || action.payload.plant==="") &&
                            (filterData.archived===optionVal || optionVal===-1) &&
                            (filterData.category_id === Number(categoryVal) || Number(categoryVal) === 0)
                            )
                    }

                }
            // case HANDLE_RADIO_TOGGLE:
            //     if(action.payload ==="active"){
            //         return{
            //             ...state,
            //             plantData:state.backupData.filter(filterData=>filterData.archived===0)
    
            //         }

            //     }
            //     if(action.payload ==="archive"){
            //         return{
            //             ...state,
            //             plantData:state.backupData.filter(filterData=>filterData.archived===1)
    
            //         }
            //     }
            //     if(action.payload ==="all"){
            //         return{
            //             ...state,
            //             plantData:state.backupData
    
            //         }
                    
                    
            //     }
            //     break;
            // case HANDLE_CATEGORY_SEARCH:
            //     return{
            //         ...state,
            //         plantData:state.backupData.filter(filterData=>filterData.category_id === Number(action.payload))
            //     }
                
           case UPDATE_PLANT_SKU_ACTION :
               return{
                ...state, 
                needAction:false,
                displayCancel:false
               }
               case HANDLE_PLANT_RADIO_RESET:
                return{
                    ...state,
                    plantRadioButton:"active"
                }
            case CREATE_PLANT_SKU_ACTION :
                return{
                    //const skuData = state.
                    ...state, 
                    needAction:false,
                    displayCancel:false
                    // skuData:[...action.payload.data]
                };
            case CLEAR_SKU_FIELDS_PLANT:
                return{
                    ...state,
                    plantSkuDataById         :   {
                        sku_code: "",
                        plant_id: "",
                        each_cost: "0.00",
                        each_price: "0.00",
                        sale_price: "0.00",
                        sale_expiry_date:new Date().getFullYear()+"-"+minMonthFormate+"-"+minDateFormate,
                        volume_quantity: "0",
                        volume_price_per_unit: "0.00",
                        sku_item_name: "",
                        subcategory: "0",
                        archived: "0",
                        discontinued: 0,
                        location: "",
                        status: 0,
                        attributes_subattributes:[]           
                    
                        },
                        actionType:action.actionType,
                        dynamicName:"",
                        displayCancel:false

                }
            case GET_SINGLE_PLANT_SKU:
                return{
                    ...state,
                    action:action,
                    actionType:action.actionType,
                    displayCancel:true,
                    plantSkuDataById:{...action.plantSkuDataById.plant[0],attributes_subattributes:action.plantSkuDataById.attributes_subattributes},
                    dynamicName:action.plantSkuDataById.plant[0].sku_code
                }
            case DYNAMIC_DISPLAY_PLANT_SKU:
                return{
                    ...state,
                    dynamicName:action.dynamicName
                }
        
  
            default:
                return state
    }

}

