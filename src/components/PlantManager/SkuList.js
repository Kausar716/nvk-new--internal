/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState,useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';
import {Button,Badge,Form,Input,FormGroup,CustomInput,Label,Pagination,PaginationItem,PaginationLink,Table,Select} from 'reactstrap'
import {connect} from "react-redux";
import {getAllAttributesAction} from "../../actions/attributeAction";
import TablePagination from '../Pagination'
import ActionModal from '../Modal/ActionModal'
import {
createPlantSkuAction ,
updatePlantSkuAction ,
deletePlantSkuAction ,
getAllPlantSkuAction ,
showSpecifiedPlantSkuAction ,
setPlantSkuPageNumber,
handlePlantSkuInputAction,
deletePlantAction,
deleteSkuAction,
getSpecifiedPlantAction,
showSinglePlantSkuAction,
plantPageReDirectAction,
clearSkuFieldsPLant,
updateCheckBoxsku,
checkBoxSku,
dynamidDisplay
   
} from "../../actions/plantManagerAction";
import {
    deleteProductAction
} from "../../actions/plantManagerAction"
// import ReactPaginate from 'react-paginate'


const SkuList = (props)=>{
    const [pageNumber,setPageNumber] = useState(0)
    const [startDate,setStartDate] = useState(new Date())
    const [message,setMessage] = useState("")
    const [type, setType] = useState("")
    const [pageSize, setPageSize] =useState(15)
    const [errorObj,setErrorObj] = useState({ each_cost:0,each_price:0,sale_price:0,volume_price_per_unit:0  })
    const [errorCount,setErrorCount] = useState(0)
    const [each_costError,setEach_costError] =useState(false)
    const [each_priceError,setEach_priceError] = useState(false)
    const [sales_priceError,setSales_priceError] = useState(false)
    const [volume_priceError, setVolume_priceError] = useState(false)   
    const [selectedRow,setSelectedRow] = useState(-1)
    const handleChange=(date)=> {
        setStartDate(date)
      }
      useEffect(()=>{
          props.getAllAttributesAction()
          props.getAllPlantSkuAction()
      },[])
    
      const onFormSubmit=(e)=> {
        e.preventDefault();
      }
      const paginationChange =(event, page)=>{
        props.setPlantSkuPageNumber(page-1)
    }
    const handleChange1 = (e) =>{
        let dateInformate = e.target.value
        props.handlePlantSkuInputAction("sale_expiry_date",dateInformate)

    }
    const handleInput =(e)=>{
        console.log(e.target.id)
        console.group(e.target.value)
        let errorcount =errorCount
        let errorobj =errorObj
        if(e.target.id  === "each_cost" ){
            errorobj.each_cost=0
            errorcount--
            setEach_costError(false)
        }
        if(e.target.id  === "each_price" ){
            errorobj.each_price=0
            errorcount--
            setEach_priceError(false)
        }
        if(e.target.id  === "sale_price" ){
            errorobj.sale_price=0
            errorcount--
            setSales_priceError(false)
        }
        if(e.target.id === "volume_price_per_unit"){
            errorobj.volume_price_per_unit=0
            errorcount--
            setVolume_priceError(false)
        }
        setErrorObj(errorobj)
       setErrorCount(errorcount)
       if(props.plantData.ae_plant_id){
           if(props.plantData.plantSkuDataById) 
        props.dynamidDisplay({id:e.target.id,value:e.target.value},props.plantData.ae_plant_id,props.plantData.plantSkuDataById.attributes_subattributes)
        else 
        props.dynamidDisplay({id:e.target.id,value:e.target.value},props.plantData.ae_plant_id,[])
       }
        if(e.target.id =="archived") props.handlePlantSkuInputAction(e.target.id,e.target.value ==1?0:1)
        else if(e.target.id =="status") props.handlePlantSkuInputAction(e.target.id,e.target.value ==1?0:1)
        else props.handlePlantSkuInputAction(e.target.id,e.target.value)

    }
    const handleValidation = () => {
//         let returnValue=true
//         let errorcount =errorCount
//         let errorobj =errorObj
//       if(plantDataById.genus.length === 0){
//        returnValue= false
//        errorobj.genus=1
//        errorcount++
//       }
//       if(plantDataById.species.length === 0){
//        returnValue= false
//        errorobj.species=1
//        errorcount++
//       }
//    //    if(plantDataById.categoryData.length === 0){
//    //     returnValue= false
//    //     errorobj.categoryData=1
//    //     errorcount++
//    //    }
//       setErrorObj(errorobj)
//       setErrorCount(errorcount)

   }
   const handleSubmit = ()=>{
    // let validate = handleValidation()  
    // if(validate)
    // props.updateSkuAction(skuDataById.product_id,skuDataById,skuValidation)
   }
    const [id,setId] = useState(0)
    const [open,setOpen] = useState(false)

    const cancel = ()=>{
       setOpen(false)
       setId(0)
        
    }
    const confirm = ()=>{
       props.deleteSkuAction(id)
       setOpen(false)
       setId(0)
   }
 
   const confirmAction = (id,type)=>{
    if(type=="delete"){
        setType(type)
        setMessage("Are you sure you want to delete this SKU?")

    }else{
        setType(type)
        setMessage("Are you sure you want to duplicate this product and all its related SKU and plant information?")

    }
    setOpen(true)
    setId(id)
}
   const getSpecifiedplant = (skudata,data,value) =>{
      window.scrollTo(100, -100)
      setSelectedRow(skudata.id)
      props.showSinglePlantSkuAction(skudata.id,"edit","sku")
   
   }
   const submitAction = (e) => {
    if(!each_costError&& !each_priceError&& !sales_priceError && !volume_priceError){
    if(e.target.id === "dontRetain"){
    if(actionType ==="add" || actionType === "edit"){
    props.createPlantSkuAction(props.plantData.ae_plant_id,plantSkuDataById)
    // props.plantPageReDirectAction("all","plant")
  
    props.clearSkuFieldsPLant(actionType)
    }
    else if(actionType ==="sku"){ 
        props.updatePlantSkuAction(plantSkuDataById.id,plantSkuDataById)
        // props.plantPageReDirectAction("all","plant")
        props.clearSkuFieldsPLant(actionType)
        setSelectedRow(-1)
    }
    }
    else if(e.target.id === "retain"){
        if(actionType ==="add" || actionType === "edit"){
            props.createPlantSkuAction(props.plantData.ae_plant_id,plantSkuDataById)
             
        }
        else if(actionType ==="sku"){ 
            props.updatePlantSkuAction(plantSkuDataById.id,plantSkuDataById);
            setSelectedRow(-1)
        }
       
    }
    }
   }
   const handleCancel = ()=>{
    props.plantPageReDirectAction("all","plant")
   }

      const {plantData,plantSkuData,plantSkuPageNumber,needAction,plantSkuDataById,plantSkuDataList,actionType,displayCancel} = props.plantData
      const plantPerPage = pageSize;
      const totalLength = plantSkuDataList.length;
      const pagesVisited = plantSkuPageNumber*pageSize;
      const displayPlantSkuList = plantSkuDataList.slice(pagesVisited,pagesVisited+plantPerPage)
      const pageCount = Math.ceil(plantSkuDataList.length/plantPerPage)
        const {allAttributes} = props.attributeData
        let minMonth = new Date().getMonth()
        let minDate = new Date().getDate()
        let minDateFormate = minDate.toString().length==1?"0"+minDate:minDate
        let minMonthFormate = minMonth.toString().length==1?"0"+(minMonth+1):(minMonth+1)
        
        let selectedForm =plantSkuDataById.attributes_subattributes.filter(attributeObj=>{
            if(attributeObj.attribute_id === 1){
               return attributeObj.subattribute_id
           }
       })[0]
       let selectedCaliper =plantSkuDataById.attributes_subattributes.filter(attributeObj=>{
        if(attributeObj.attribute_id === 5){
           return attributeObj.subattribute_id
       }
       })[0] 
        let selectedHeight =plantSkuDataById.attributes_subattributes.filter(attributeObj=>{
            console.log(attributeObj)
        if(attributeObj.attribute_id === 3){
        return attributeObj.subattribute_id
        }
        })[0]  
        let selectedPackaging =plantSkuDataById.attributes_subattributes.filter(attributeObj=>{
            if(attributeObj.attribute_id === 4){
            return attributeObj.subattribute_id
        }
        })[0]
        let flag=0
        if(plantSkuDataById){       
            if(!plantSkuDataById.each_cost || !plantSkuDataById.each_price || !plantSkuDataById.sale_price){
                flag=1               
            }
            if(plantSkuDataById.attributes_subattributes.length === 0){
                flag=1
            }
            else if(plantSkuDataById.attributes_subattributes.length === 3){
               let toggleDropdown =  plantSkuDataById.attributes_subattributes.filter(attributeData=>{
                    return(attributeData.attribute_id === 4 || attributeData.attribute_id === 5 || attributeData.attribute_id === 3 )
                })
                toggleDropdown.map(obj=>{
                    if(isNaN(obj.subattribute_id )){
                        flag=1
                    }
                })
            }
            else if(plantSkuDataById.attributes_subattributes.length>0){
                let checkForData
                let checkForFormData
                let checkForCaliperData
                let checkForHeightData
                checkForData= plantSkuDataById.attributes_subattributes.filter(attributeData=>{
                    return(attributeData.attribute_id === 3)
                })
                if(checkForData.length === 0){
                    flag=1
                }
                checkForFormData= plantSkuDataById.attributes_subattributes.filter(attributeData=>{
                    return(attributeData.attribute_id === 1)
                })
                if(checkForFormData.length === 0){
                    flag=1
                } else {
                    if (isNaN(checkForFormData[0].subattribute_id)){
                        flag=1
                    }
                }
                checkForCaliperData= plantSkuDataById.attributes_subattributes.filter(attributeData=>{
                    return(attributeData.attribute_id === 5)
                })
                checkForHeightData= plantSkuDataById.attributes_subattributes.filter(attributeData=>{
                    return(attributeData.attribute_id === 4)
                })
                if(checkForCaliperData.length === 0 && checkForHeightData.length === 0){
                    flag=1
                }
                if(checkForCaliperData.length === 1 && checkForHeightData.length === 1){
                    if(!isNaN(checkForCaliperData[0].subattribute_id) && !isNaN(checkForHeightData[0].subattribute_id)){
                        flag=1
                    }
                    if(isNaN(checkForCaliperData[0].subattribute_id) && isNaN(checkForHeightData[0].subattribute_id)){
                        flag=1
                    }
                }                
            }
            
        }
        const handleBlur =(evt)=>{

            var charCode = (evt.which) ? evt.which : evt.keyCode;
          
            let id = evt.target.id
            let characterCheck = evt.target.value.match(/^[0-9]*(\.[0-9]{0,2})?$/);
           if(characterCheck === null){
               if(id === "each_cost"){
                setEach_costError(true)
               }
               if(id === "each_price"){
                setEach_priceError(true)
               }
               if(id=== "sale_price"){
                setSales_priceError(true)
               }
               if(id=== "volume_price_per_unit"){
                setVolume_priceError(true)
               }
           
            
           }
           
           }
           let volumeQualityList=[]
           if(allAttributes.length>0)
           volumeQualityList= allAttributes.filter(formData=>formData.id === 6)
        //   .map(filterData=>{
        //     return (filterData.sub_attributes.map(subData=>{
        //         return(<option value={subData.id}>{subData.value}</option>)
        //     }))
        // })   
  
        const handleCheckBox = (id,index,type)=>{           
            let obj = {}    
            // obj[type] = parseInt(displayPlantList[index][type])===1?0:1
            // if(type ==="in_production" &&  obj[type]===0)
            // obj["status"] = 0
            // else obj["status"] =1
            // if(type !=="in_production" &&  obj[type]===1)
            // obj["status"] = 0
            // else obj["status"] =1
            if(type ==="status") {
                if (parseInt(displayPlantSkuList[index][type])===1) {
                    obj.status =0
                }
                else if (parseInt(displayPlantSkuList[index][type])===0) {
                    obj.status =1
                }
            }
            // alert((15*plantSkuPageNumber)+index)
        
            // props.checkBox(id,((15*plantSkuPageNumber)+index),type,obj)
          
            props.checkBoxSku(id,((15*plantSkuPageNumber)+index),type,obj)
            props.updateCheckBoxsku(id,index,"status",obj)
        

            // let value = parseInt(plantSkuDataById.status) == 1?0:1
            // plantSkuDataById.status = value
            // props.updatePlantSkuAction(plantSkuDataById.id,plantSkuDataById)

        }
       
//  
        let count =0;
        return(
        <div>
            <ActionModal cancel={cancel} confirm={confirm} open={open} message={message}/>
                <div>
                            <div class="bg-white px-3 py-3 mt-3" style={{marginLeft:"1em", marginRight:"0.5em",paddingRight:"1em"}}>
                                <form>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h3>GENERATED SKU <span className="text-green">{props.plantData.dynamicName?props.plantData.dynamicName:props.plantData.ae_plant_id}</span> </h3>
                                        </div>
                                        <div class="col-md-6 d-flex justify-content-end">
                                            <div class=" d-flex align-items-center my-md-2 mt-3 mt-md-0">
                                                Archive
                                                <div class="switcher ml-2">
                                                    <input type="checkbox" name="archived" 
                                                     id="archived" onChange={handleInput} value={plantSkuDataById.archived} checked={plantSkuDataById.archived==="0"|| plantSkuDataById.archived===0?false:true}/>
                                                    <label for="archived" style={{cursor:"pointer"}}></label>
                                                </div>
                                            </div>
                                            {/* <button type="button" class="btn btn-outline-secondary btn-lg ml-3"   
                                            onClick={()=>props.plantPageReDirectAction("all","plant")}>Return To Plant Manager</button> */}
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-6 col-lg-3">
                                            <label>Form</label>
                                            <select class="form-control" style={{cursor:"pointer"}}  id={allAttributes.length>0?allAttributes.filter(formData=>formData.id ==1)[0]["id"]:"form"} onChange={handleInput} 
                                            value={selectedForm?selectedForm.subattribute_id:""} disabled={(actionType === "sku")}>
                                                 <option value="">None</option>
                                                {allAttributes.length>0?allAttributes.filter(formData=>formData.name ==="Form").map(filterData=>{
                                                    return (filterData.sub_attributes.map(subData=>{
                                                        if(subData.status === 1)
                                                        return(<option value={subData.id}>{subData.value}</option>)
                                                    }))
                                                })                          
                                                :""}
                                            </select>
                                        </div>
                                        <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                            <label>Caliper</label>
                                            <select class="form-control" style={{cursor:"pointer"}} id={allAttributes.length>0?allAttributes.filter(formData=>formData.name ==="Caliper")[0]["id"]:"caliper"} onChange={handleInput}
                                            value={selectedCaliper?selectedCaliper.subattribute_id:""} disabled={(actionType === "sku")}>
                                            <option value="">None</option>
                                            {allAttributes.length>0?allAttributes.filter(formData=>formData.name =="Caliper").map(filterData=>{
                                                    return (filterData.sub_attributes.map(subData=>{
                                                        if(subData.status === 1)
                                                        return(<option value={subData.id}>{subData.value}</option>)
                                                    }))
                                                })                          
                                                :""}
                                            </select>
                                        </div>
                                        <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                            <label>Height</label>
                                            <select class="form-control" style={{cursor:"pointer"}} id="height" id={allAttributes.length>0?allAttributes.filter(formData=>formData.name =="Height")[0]["id"]:"height"} onChange={handleInput}
                                            value={selectedHeight?selectedHeight.subattribute_id:""} disabled={( actionType === "sku")}>
                                            <option value="">None</option>
                                            {allAttributes.length>0?allAttributes.filter(formData=>formData.name ==="Height").map(filterData=>{
                                                    return (filterData.sub_attributes.map(subData=>{
                                                        if(subData.status === 1)
                                                        return(<option value={subData.id}>{subData.value}</option>)
                                                    }))
                                                })                          
                                                :""}
                                            </select>
                                        </div>
                                        <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                            <label>Packaging <span class="text-danger">*</span></label>
                                            <select class="form-control" style={{cursor:"pointer"}} id="packaging" id={allAttributes.length>0?allAttributes.filter(formData=>formData.name === "Packaging")[0]["id"]:"packaging"} onChange={handleInput}
                                            value={selectedPackaging?selectedPackaging.subattribute_id:""} disabled={(actionType === "sku")}>
                                            <option value="">None</option>
                                            {allAttributes.length>0?allAttributes.filter(formData=>formData.name ==="Packaging").map(filterData=>{
                                                    return (filterData.sub_attributes.map(subData=>{
                                                        if(subData.status === 1)
                                                        return(<option value={subData.id}>{subData.value}</option>)
                                                    }))
                                                })                          
                                                :""}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-6 col-lg-3">
                                            <label>Each Cost <span class="text-danger">*</span></label>
                                            <input type="text" onBlur={handleBlur} class="form-control text-right" placeholder="0.00" id="each_cost" value={plantSkuDataById.each_cost} onChange={handleInput}/>
                                            {each_costError?<span style={{fontSize:"small",color:"red"}}>Enter Valid Each Cost(Fixed 2 Decimals)</span>:""}
                                        </div>
                                        <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                            <label>Each Price <span class="text-danger">*</span></label>
                                            <input type="text" onBlur={handleBlur} class="form-control text-right" placeholder="0.00" id="each_price" value={plantSkuDataById.each_price} onChange={handleInput}/>
                                            {each_priceError?<span style={{fontSize:"small",color:"red"}}>Enter Valid Each Price(Fixed 2 Decimals)</span>:""}
                                        </div>
                                        <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                            <label>Sale Price <span class="text-danger">*</span></label>
                                            <input type="text" onBlur={handleBlur} class="form-control text-right" placeholder="0.00" id="sale_price" value={plantSkuDataById.sale_price} onChange={handleInput}/>
                                            {sales_priceError?<span style={{fontSize:"small",color:"red"}}>Enter Valid Sale Price(Fixed 2 Decimals)</span>:""}
                                        </div>
                                        <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                            <label>Sales Expiry Date</label>
                                            <div class="row">
                                                <div class="col-md-12 col-lg-12 d-flex">
                                                    <div>
                                                        {/* <DatePicker value={plantSkuDataById.sale_expiry_date} min={new Date().getFullYear()+"-"+minMonthFormate+"-"+minDateFormate}
                                                         onChange={handleChange1}/> */}
                                                    <input type="date" onChange={handleChange1}  className="dateDesign" disabled={plantSkuDataById.status==0?true:false}
                                                     value={plantSkuDataById.sale_expiry_date} min={minDateFormate +"-"+minMonthFormate+"-"+new Date().getFullYear()}  />

                                                    </div>
                                                    <div class="d-flex align-items-center flex-wrap ml-2">
                                                        Active
                                                        <div class="switcher switcher-sm ml-2 pr-2">
                                                            <input type="checkbox" id="status" onChange={handleInput} value={plantSkuDataById.status} checked={plantSkuDataById.status==0?false:true}/>
                                                            <label for="status" style={{cursor:"pointer"}}></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-6 col-lg-3">
                                            <label>Volume Quantity</label>
                                            <select class="form-control" id={allAttributes.length>0?allAttributes.filter(formData=>formData.name =="Volume_Quality")[0]["id"]:"Volume_Quality"} style={{cursor:"pointer"}} onChange={handleInput} 
                                            value={plantSkuDataById.volume_quantity}>
                                            <option value="0">None</option>
                                            {allAttributes.length>0?allAttributes.filter(formData=>formData.name ==="Volume_Quality").map(filterData=>{
                                                    return (filterData.sub_attributes.map(subData=>{
                                                        return(<option value={subData.id}>{subData.value}</option>)
                                                    }))
                                                })                          
                                                :""}
                                            </select>
                                        </div>
                                        <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                            <label>Volume Price per unit</label> 
                                            {/* <input type="checkbox"  /> */}
                                            <input type="text" onBlur={handleBlur} disabled={plantSkuDataById.volume_quantity === "0"} class="form-control text-right" placeholder="0.00" value={plantSkuDataById.volume_price_per_unit}id="volume_price_per_unit" onChange={handleInput}/>
                                            {volume_priceError?<span style={{fontSize:"small",color:"red"}}>Enter Valid Volume Price Per Unit</span>:""}
                                            
                                            {/* <select class="form-control"><option>Select</option><option>Option 1</option><option>Option 2</option></select> */}
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-12 text-md-right">
                                            
                                        {/* <button type="button" class="btn btn-outline-secondary btn-lg ml-3" id="retain" onClick={handleCancel}>Return to Plant Manager</button> */}
                                           {actionType !=="sku"? <button type="button" style={{cursor:"pointer"}} class="btn btn-primary btn-lg ml-3" id="retain" disabled={(needAction===true && flag===0)?false:true} onClick={submitAction}>{(actionType ==="add" || actionType === "edit")?"Add SKU & Retain":"Update SKU & Retain"}</button>:""}
                                            <button type="button" style={{cursor:"pointer"}} class="btn btn-primary btn-lg ml-3" disabled={(needAction===true && flag===0)?false:true} id="dontRetain" onClick={submitAction}
                                                 >{(actionType ==="add" || actionType === "edit")?"Add SKU & Clear":"Update "}</button>
                                        {/* <a href="#" class=" ml-2 mt-3 mt-md-0">
                                            <img src="assets/img/close-ic.svg" alt="" onClick={()=>{ setSelectedRow(-1);props.clearSkuFieldsPLant()}} />
                                        </a> */}
                                        {displayCancel?<button type="button" class="btn btn-outline-secondary btn-lg ml-3"  
                                       onClick={()=>{ setSelectedRow(-1);props.clearSkuFieldsPLant(actionType)}}
                                        
                                        >Cancel</button>:""}

                                        </div>
                                    </div>
                                </form>
                            </div>
                               <div className="row_1" style={{marginTop:"1em", marginLeft:"1em"}}>
                            <div>
                            <label className="greenText">{"Showing " + (plantSkuPageNumber>0 ? (pageSize*((plantSkuPageNumber)))+1 : ((plantSkuPageNumber)+1))+  "  to  " +  (plantSkuPageNumber>0 ? (((pageSize*((plantSkuPageNumber)))+pageSize)>totalLength ? totalLength : ((pageSize*((plantSkuPageNumber)))+pageSize)) : ((((plantSkuPageNumber)+1)*pageSize)>totalLength?totalLength:(((plantSkuPageNumber)+1)*pageSize)))   + "  of   "  +   totalLength }</label>
                            </div>


                    <div >

                    <label className="greenText">Show</label>
                            <select 
                                value={pageSize}
                                onChange={e => {
                                    setPageSize(Number(e.target.value))
                                }}
                                style={{cursor:"pointer"}}
                                >

                                {[15, 25, 50, 100, 250,500].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                    </option>
                                ))}
                            </select>
                    </div>



                    <div className="skuPagination">
                    <TablePagination pageChange={paginationChange} pageCount={pageCount} pageNumber={plantSkuPageNumber+1}/>
                    </div>
                    </div>
                            <div className="form-group row mt-3" style={{marginLeft:"0.42em", marginRight:"0.5em"}}>
                                <div className="col-md-12">
                                    <table id="plantDetails" class="table table-striped w-100">
                                        <thead>
                                            <tr>
                                                <th class="text-nowrap">Status</th>
                                                <th class="text-nowrap">SKU</th>
                                                <th class="text-nowrap text-right">Each Cost</th>
                                                <th class="text-nowrap text-right">Each Price</th>
                                                <th class="text-nowrap text-right">Sale Price</th>
                                                <th class="text-center">Sale Active</th>
                                                <th class="text-nowrap text-right">Volume Price Per Unit</th>
                                                <th class="text-nowrap text-center">Volume QTY</th>
                                                <th class="text-nowrap text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        {
                        displayPlantSkuList.map((skuData,i)=>{
                            return(
                                            <tr style={{background:(selectedRow === skuData.id)? "#e1e3e4":""}}>
                                                <td style={{color:skuData.archived ==="0"?"":"red"}}>{skuData.archived ==="0"?"Active":"Archived"}</td>
                                                <td>{skuData.sku_code}</td>
                                                <td class="text-right">{skuData.each_cost}</td>
                                                <td class="text-right">{skuData.each_price}</td>
                                                <td class="text-right">{skuData.sale_price}</td>
                                                <td class="text-center">
                                                    <div class="custom-control custom-checkbox mb-1 text-center">
                                                        <input type="checkbox" class="custom-control-input" id={skuData.id+"_"+i} checked={parseInt(skuData.status)==0?false:true} onChange={()=>handleCheckBox(skuData.id,i,"status")}  />
                                                        <label class="custom-control-label" for={skuData.id+"_"+i}></label>
                                                    </div>
                                                </td>

                                                <td class="text-right" style={{color:skuData.volume_price_per_unit==="0.00" ||skuData.volume_price_per_unit === null?"lightgray":""}} >{skuData.volume_price_per_unit===null?"0.00":skuData.volume_price_per_unit}</td>
                                                <td class="text-center" style={{color:skuData.volume_price_per_unit==="0.00"||skuData.volume_price_per_unit === null?"lightgray":""}} >{skuData.volume_price_per_unit===null || skuData.volume_price_per_unit === "0.00"?"None":skuData.volume_quantity_name}</td>
                                                <td class="text-center" >
                                                    <span>
                                                        {/* <a href="javascript:;"> */}
                                                            <img src="assets/img/edit.svg" alt="" style={{cursor:"pointer"}} onClick={()=>getSpecifiedplant(skuData,"edit","sku")}/>
                                                        {/* </a> */}
                                                    </span>
                                                    {/* duplicate doesnt exeist for sku */}
                                                    {/* <span>
                                                        {/* <a href="javascript:;"> 
                                                            {/* <img src="assets/img/duplicate.svg" alt=""/> */}
                                                        {/* </a> */}
                                                    {/* </span>  */}
                                                    <span>
                                                        {/* <a href="javascript:;"> */}
                                                            <img src="assets/img/delete.svg" alt="" style={{cursor:"pointer"}} onClick={()=>confirmAction(skuData.id,"delete")}/>
                                                        {/* </a> */}
                                                    </span>
                                                </td>
                                            </tr> 
                                                                                  
                                        )
                                       
                                        })
                                    }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
        </div>
     )
    }
    // )=>props.plantPageReDirectAction("plant","add")
const mapStateToProps = (state)=> ({
    plantData:state.plantData,
    attributeData:state.attributeData
})
export default connect(mapStateToProps,{
    createPlantSkuAction ,
    updatePlantSkuAction ,
    deletePlantSkuAction ,
    getAllPlantSkuAction ,
    showSpecifiedPlantSkuAction ,
    getAllAttributesAction,
    setPlantSkuPageNumber,
    handlePlantSkuInputAction,
    deletePlantAction,
    deleteSkuAction,
    getSpecifiedPlantAction,
    showSinglePlantSkuAction,
    plantPageReDirectAction,
    clearSkuFieldsPLant,
    updateCheckBoxsku,
    checkBoxSku,
    dynamidDisplay
})(SkuList)