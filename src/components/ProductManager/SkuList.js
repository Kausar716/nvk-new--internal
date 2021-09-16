/* eslint-disable array-callback-return */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState} from "react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';

import {Button,Badge,Form,Input,FormGroup,CustomInput,Label,Pagination,PaginationItem,PaginationLink,Table} from 'reactstrap'
import {connect} from "react-redux";
import {} from "../../actions/productAction";
import {getAllAttributesAction} from "../../actions/attributeAction";
import {getAllSupplierLocationMethods} from '../../actions/supplierManagementAction'
//import ReactPaginate from 'react-paginate'
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import TablePagination from '../Pagination'
import ActionModal from '../Modal/ActionModal'
// import { Field, reduxForm } from 'redux-form'
import { reduxForm ,Field} from 'redux-form/immutable';
import {
    //product actions
    deleteProductAction ,
    getSpecifiedProductAction,
    getAllSpecifiedSkuProductList,
    clearSkuFields

} from "../../actions/productAction";
import {
createSkuAction, 
updateSkuAction ,
updateSkuActionClear,
deleteSkuAction ,
getAllSkuAction ,
showSpecifiedSkuAction ,
setSkuPageNumber,
pageReDirectAction,
checkBoxSku1,
updateCheckBoxsku1,


//input handle
handleSkuInputAction
    
} from '../../actions/productAction'
import { config } from "../../actions/types";
const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue2 = minValue(2)


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    {/* <label>{label}</label> */}
    <div>
      <input {...input}  className="inputBoxDesign2" placeholder={label}  type={type}/>
      <p>
      {touched && ((error && <span style={{color:"red", marginLeft:"1em"}}>{error}</span>) || (warning && <span>{warning}</span>))}
      </p>
      
    </div>
  </div>
)


const onSubmit = (values) =>{
  console.log(values);
}


const SkuList=(props)=> {
   
    const [submitCount, setSubmitCount] = useState(0)
    const [value, onChange] = useState(new Date());
    const [pageSize, setPageSize] =useState(15)
    const [id,setId] = useState(0)
    const [open,setOpen] = useState(false)
    const [skuEdit,setSkuEdit] = useState(false)
    // const [errorObject,setErrorObject] = useState({each_cost:0,each_price:0,sales_price:0,volume_price_per_unit:0})
    const [errorObj,setErrorObj] = useState({ each_cost:0,each_price:0,sale_price:0,volume_price_per_unit:0  })
    const [errorCount,setErrorCount] = useState(0)
    const [each_costError,setEach_costError] =useState(false)
    const [each_priceError,setEach_priceError] = useState(false)
    const [sales_priceError,setSales_priceError] = useState(false)
    const [volume_priceError,setVolume_priceError] = useState(false)
    const [selectedRow,setSelectedRow] = useState(-1)
   
   
    const {skuData,skuPageNumber,skuDataById,needAction,skuValidation,productDataById, productData,actionType,productDataBySKUlist } = props.productData;
    const {subCategoryData} = props.categoryData;
    console.log(props.productData)
    //console.log("productDataFINE", props.productData)
    console.log("productDataBySKUlist", productDataBySKUlist)
    //console.log("skuDataByIdskuDataById",skuData)
    useEffect(()=>{
        props.getAllSkuAction()
        props.getAllSpecifiedSkuProductList()
        props.getAllAttributesAction()
        props.getAllSupplierLocationMethods()
    },[])


    //Finiding last ID in product list
    const product_id_List = productData.map(prId=>prId.product_id)
    let finalPrID = product_id_List.reverse()[0]
    let supCategoryIdForFilter = productDataById.category_id
    console.log(supCategoryIdForFilter)
    console.log("product_id_List", finalPrID)
    console.log(skuDataById)


    const submitAction = (e) =>{
        console.log(actionType)
        let skuFieldClear = false
        e.preventDefault();
         if(submitCount === 0 && (!each_costError&& !each_priceError&& !sales_priceError && !volume_priceError)){
            if(needAction){
                if(actionType ==="add"){
                    props.createSkuAction(product_idFromGeneral,skuDataById,skuFieldClear)               
                }
                //props.createSkuAction(skuDataById.id,skuDataById,skuValidation)  
                let skuid = skuDataById.id 
                if(actionType ==="edit"){ 
                
               
                if(e.target.id === "retain"){   
                     if(props.productData.productDataById.product_id){
                         skuid= props.productData.productDataById.product_id
                     }                     
                     else{                        
                        skuid = props.productData.ae_product_id
                     }
                    if(skuDataById.product_id){
                        skuDataById.id=skuDataById.product_id
                        delete skuDataById.product_id
                    }
                    console.log(skuDataById)
                    props.createSkuAction(skuid,skuDataById,skuFieldClear,actionType)
                                    
                    
                }
                if(e.target.id === "dontRetain"){
                    skuFieldClear = true
                    if(props.productData.productDataById.product_id){
                    
                        skuid= props.productData.productDataById.product_id
                    }                     
                    else{                        
                       skuid = props.productData.ae_product_id
                    }
                   if(skuDataById.product_id){
                       skuDataById.id=skuDataById.product_id
                       delete skuDataById.product_id
                   }
                    props.createSkuAction(skuid,skuDataById,skuFieldClear,actionType)
                    
                }
            }

                else if(actionType === "sku"){
                    if(e.target.id === "dontRetain"){
                    skuDataById.subcategory = skuDataById.sub_category_id
                    props.updateSkuActionClear(skuid,skuDataById)
                    setSelectedRow(-1)
                    }
                    if(e.target.id === "retain"){
                        props.updateSkuAction(skuid,skuDataById)
                        setSelectedRow(-1)
                    }
                    // props.pageReDirectAction("product","add")
                }
                // props.updateSkuAction(skuDataById.id,skuDataById,skuValidation)
                //setSubmitCount(1)
            }
        }
          
     }
     const handleUpdateAndClear = ()=>{
       if(!each_costError&& !each_priceError&& !sales_priceError && !volume_priceError){
        if(!skuEdit){
           let idFromGeneral = props.productData.productDataById.product_id
           console.log(idFromGeneral)
           console.log(skuDataById)
          
            props.createSkuAction(idFromGeneral,skuDataById)
        }
        else{
            props.updateSkuAction(skuDataById.id,skuDataById)
        }
    }

     }

    const paginationChange =(event, page)=>{
        props.setSkuPageNumber(page-1)
    }
    const handleInput =(e)=>{
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
        setSubmitCount(0)
        if((e.target.id === "each_cost" ||e.target.id === "each_price"||e.target.id === "sale_price") ){
          
            props.handleSkuInputAction(e.target.id,e.target.value)
        
        }
        else if(e.target.id !== "each_cost" && e.target.id !== "each_price"&&e.target.id !== "sale_price"){
         
        if(e.target.id ==="archived") props.handleSkuInputAction(e.target.id,e.target.value ==="1"?"0":"1")
        else if(e.target.id ==="status") props.handleSkuInputAction(e.target.id,parseInt(e.target.value) ===1?0:1)
        else props.handleSkuInputAction(e.target.id,e.target.value)
        }

    }
    const handleChange1 = (e) =>{
        console.log(e.target.value)
        let dateInformate = e.target.value
        props.handleSkuInputAction("sale_expiry_date",dateInformate)

    }
    
   

    const cancel = ()=>{
       setOpen(false)
       setId(0)
        
    }
    const confirm = ()=>{
       //props.deleteProductAction(id)
       props.deleteSkuAction(id)
       setOpen(false)
       setId(0)
   }
   const confirmDelete = (id)=>{
       setOpen(true)
       setId(id)
   }
   const getSpecifiedProduct = async(id,data,value) =>{

     window.scrollTo(100, -100)
     
     setSelectedRow(id)
    
     
     
      //props.getSpecifiedProductAction(id,"edit","sku")
      props.showSpecifiedSkuAction(id,"edit","sku")
   
   }
   const handleSKUEdit = (id)=>{
    setSkuEdit(true)
   getSpecifiedProduct(id, "edit","sku")

   }
   const handleBlur =(evt)=>{
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    console.log(evt.target.id)
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
   const handleCheckBox = (id,index,type)=>{
    console.log(id,index,type)
    // alert(index)
    // alert(index)
   
    let obj = {}

    // obj[type] = parseInt(displayPlantList[index][type])===1?0:1
    // if(type ==="in_production" &&  obj[type]===0)
    // obj["status"] = 0
    // else obj["status"] =1
    // if(type !=="in_production" &&  obj[type]===1)
    // obj["status"] = 0
    // else obj["status"] =1
    if(type ==="status") {
        if (parseInt(displaySkuList2[index][type])===1) {
            obj.status =0
        }
        else if (parseInt(displaySkuList2[index][type])===0) {
            obj.status =1
        }
    }
    // alert((15*plantSkuPageNumber)+index)

    // props.checkBox(id,((15*plantSkuPageNumber)+index),type,obj)
    // console.log(plantData[((15*plantPageNumber)+index)])
    props.checkBoxSku1(id,((15*skuPageNumber)+index),type,obj)
    props.updateCheckBoxsku1(id,index,"status",obj)


    // let value = parseInt(plantSkuDataById.status) == 1?0:1
    // plantSkuDataById.status = value
    // props.updatePlantSkuAction(plantSkuDataById.id,plantSkuDataById)

}

console.log("temp",props.temp.productData.ae_product_id)

const product_idFromGeneral =props.temp.productData.ae_product_id
   // validation input  data
console.log("product_idFromGeneral", product_idFromGeneral)
console.log("PRODUCT.ID", productDataById.product_id)
   console.log("actionType12345",props.temp)
//    window.addEventListener('scroll', this.listenToScroll)
   //console.log("123",props.productData)


   




    const skuPerPAge = pageSize;
    const totalLength = skuData.length;
    const pagesVisited = skuPageNumber*pageSize;

    const displaySkuList2 = productDataBySKUlist.slice(pagesVisited, pagesVisited+skuPerPAge)
    const totalLength2 = productDataBySKUlist.length;
    const pageCount2 = Math.ceil(productDataBySKUlist.length/skuPerPAge)

    const displaySkuList = skuData.slice(pagesVisited,pagesVisited+skuPerPAge)
    const pageCount = Math.ceil(skuData.length/skuPerPAge)
    const {allAttributes} = props.attributeData
    let minMonth = new Date().getMonth()
    let minDate = new Date().getDate()
    let minDateFormate = minDate.toString().length===1?"0"+minDate:minDate
    let minMonthFormate = minMonth.toString().length===1?"0"+(minMonth+1):(minMonth+1)
    console.log(new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate())

    const productIDList = productData.map(pro=>pro.product_id)
    console.log("productIDList", displaySkuList2)
    console.log("productDataByIdskuDataById", productDataById, skuDataById)
    console.log(skuDataById.volume_price_per_unit)
    console.log(skuDataById.sub_category_id)
    console.log(skuDataById.volume_quantity)
    let selectedSubCategoryId = skuDataById.sub_category_id
    console.log(actionType)
    const handleCancle = ()=> {
        setSelectedRow(-1);
        setSkuEdit(false); 
        console.log(props.productData.actionType)
        props.clearSkuFields(props.productData.actionType)
    }
    let flag =0
    if(skuDataById){       
        if(!skuDataById.each_cost||skuDataById.location_id  === "0" || !skuDataById.location_id ||skuDataById.sub_category_id  === "0" || !skuDataById.sub_category_id || !skuDataById.sale_price|| !skuDataById.each_price ||skuDataById.sku_item_name=== ""){
            flag=1
            
        }
        
    }
    console.log(actionType)
    let locationList = []
    // console.log(props.temp.attributeData.subAttribute)
    if(props.supplierLocation)
     locationList= props.supplierLocation.active

       
    return (
        <div> <ActionModal cancel={cancel} confirm={confirm} open={open} message="Are you sure you want to delete sku?"/>
                <div>
                            <div class="bg-white px-3 py-3 mt-3" style={{marginLeft:"1em", marginRight:"0.5em",paddingRight:"1em"}}>
                                <form>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h3>GENERATED SKU <span className="greenText">{skuDataById.sku_code?skuDataById.sku_code:
                                            `${props.productData.ae_product_id?props.productData.ae_product_id:props.productData.productDataById.product_id?props.productData.productDataById.product_id:""}-${skuDataById.sku_item_name?skuDataById.sku_item_name:""}`}</span></h3>
                                        </div>
                                        {/* <div class="col-md-4 ml-0">
                                            <p></p>
                                        </div> */}
                                        <div class="col-md-6 d-flex justify-content-end">
                                        
                                            <div class=" d-flex align-items-center my-md-2 mt-3 mt-md-0">
                                                Archive
                                                <div class="switcher ml-3">
                                                    <input type="checkbox" name="archived" id="archived" onChange={handleInput} value={skuDataById.archived} 
                                                    checked={skuDataById.archived==="1"?true:false}
                                                    />
                                                    <label for="archived" style={{cursor:"pointer"}}></label>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="col-md-3 d-flex justify-content-end">
                                            {/* <button type="button" class="btn btn-outline-secondary btn-lg ml-3"   
                                            onClick={()=>props.pageReDirectAction("product","add")}>Return To Product Manager</button> */}
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                    <div class="col-md-6 col-lg-3">
                                            <label>SKU Item Name <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control text-right" placeholder="" value="$1.25"
                                            id="sku_item_name" value={skuDataById.sku_item_name} onChange={handleInput} disabled={actionType==="sku"?true:false} />
                                        </div>
                                        {/* <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                        </div> */}
                                        <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                            <label>Sub-Category <span class="text-danger">*</span></label>
                                            <select class="form-control" style={{cursor:"pointer"}} id="sub_category_id" onChange={handleInput} value={skuDataById.sub_category_id?skuDataById.sub_category_id:skuDataById.subcategory}>
                                            <option value="0">None</option>
                                                {subCategoryData.map(subcategory=>{
                                                    if(parseInt(supCategoryIdForFilter) === subcategory.category_id)
                                                    return (<option value={subcategory.id} selected={subcategory.id===skuDataById.subcategory?"selected":""}>{subcategory.name}</option>)

                                                })}
                                            </select>
                                        </div>

                                        <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                            <label>Location <span class="text-danger">*</span></label>
                                            <select class="form-control" style={{cursor:"pointer"}} id="location_id" onChange={handleInput} value={skuDataById.location_id} >
                                            <option value="0">None</option>
                                                {locationList.map(location=>{
                                                    return (<option value={location.id} selected={location.id===skuDataById.location_id?"selected":""}>{location.location}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-6 col-lg-3">
                                            <label>Each Cost <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control text-right" placeholder="0.00" 
                                            // value="$1.25"
                                             id="each_cost" onChange={handleInput} 
                                              value={skuDataById.each_cost} 
                                                // min="0"
                                                onBlur={handleBlur}
                                              />
                                              {each_costError?<span style={{fontSize:"small",color:"red"}}>Enter Valid Each Cost(Fixed 2 Decimals)</span>:""}
                                        </div>
                                        <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                            <label>Each Price <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control text-right" placeholder="0.00" 
                                            // value="$1.25"
                                            id="each_price"  onChange={handleInput} 
                                             value={skuDataById.each_price} 
                                             onBlur={handleBlur}
                                            min="0"/>
                                            {each_priceError?<span style={{fontSize:"small",color:"red"}}>Enter Valid Each Price(Fixed 2 Decimals)</span>:""}
                                        </div>
                                        <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                            <label>Sale Price <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control text-right" placeholder="0.00" 
                                            //  value="$1.25"
                                             id="sale_price" onChange={handleInput}
                                             onBlur={handleBlur}
                                              value={skuDataById.sale_price}
                                               min="0"/>
                                               {sales_priceError?<span style={{fontSize:"small",color:"red"}}>Enter Valid Sales Price(Fixed 2 Decimals)</span>:""}
                                        </div>
                                        <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                            <label>Sales Expiry Date</label>

                                            <div class="row">
                                                <div class="col-md-12 col-lg-12 d-flex">
                                                    <input type="date" onChange={handleChange1} className="dateDesign"style={{cursor:"pointer"}}  disabled={skuDataById.status===0?false:true}
                                                    value={skuDataById.sale_expiry_date}  min={minDateFormate +"-"+minMonthFormate+"-"+new Date().getFullYear()} value={skuDataById.sale_expiry_date}/>
                                                   
                                                    <div class="d-flex align-items-center flex-wrap ml-2">
                                                        Active
                                                        <div class="switcher switcher-sm ml-2 pr-2">
                                                            <input type="checkbox" name="status" id="status" value="2"
                                                            onChange={handleInput} value={skuDataById.status}  
                                                             checked={skuDataById.status===0?true:false}
                                                              />
                                                            <label for="status" style={{cursor:"pointer"}}></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mt-3">
                                        <div class="col-md-6 col-lg-3">
                                            <label>Volume Quantity </label>
                                            <select class="form-control" style={{cursor:"pointer"}} id={"volume_quantity"} onChange={handleInput} value={skuDataById.volume_quantity} >
                                              
                                             {/* value={selectedVolumeQuality?selectedVolumeQuality.subattribute_id:""}> */}
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
                                            <input type="text" onBlur={handleBlur} class="form-control text-right" placeholder="0.00" disabled={skuDataById.volume_quantity === "0"} value={skuDataById.volume_price_per_unit}id="volume_price_per_unit" onChange={handleInput}/>
                                            {volume_priceError?<span style={{fontSize:"small",color:"red"}}>Enter Valid Volume Price Per Unit</span>:""}
                                            
                                            {/* <select class="form-control"><option>Select</option><option>Option 1</option><option>Option 2</option></select> */}
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-12 text-md-right">
                                            


                                            {/* <button type="button" class="btn btn-outline-secondary btn-lg ml-3" 
                                            disabled={(needAction===true && flag === 0)?false:true} onClick={handleUpdateAndClear}>{!skuEdit?"Add SKU & Retain":"Update SKU & Retain"}</button> */}
                                            {actionType !== "sku"?<button type="button" style={{cursor:"pointer"}} class="btn btn-primary btn-lg ml-3" id="retain" disabled={(needAction===true && flag===0)?false:true} onClick={submitAction}>{actionType === "edit" || actionType === "add"?"Add SKU & Retain":"Update SKU & Retain"}</button>:""}
                                            <button 
                                            // type="button" class="btn btn-primary btn-lg"
                                            className={(needAction===true && flag === 0)?"btn btn-primary btn-lg ml-3":"btn btn-primary btn-lg ml-3"} 
                                            disabled={submitCount===0?(needAction===true && flag === 0)?false:true:true} 
                                            onClick={submitAction} id="dontRetain" style={{cursor:"pointer"}}
                                             //disabled={needAction===true?false:true} 
                                             //onClick={()=>{ props.createSkuAction( finalPrID,skuDataById,skuValidation);}} 
                                            
                                             > {actionType === "edit" || actionType === "add"?"Add SKU & Clear":"Update "}
                                                 {/* Add SKU &amp; Clear */}
                                                 </button>
                                            {/* <a href="#" class=" ml-2 mt-3 mt-md-0">
                                            <img src="assets/img/close-ic.svg" alt=""  />
                                        </a> */}
                                        {props.productData.displayCancel?<button type="button" class="btn btn-outline-secondary btn-lg ml-3"  
                                       onClick={handleCancle}
                                        
                                        >Cancel</button>:""}
                                        
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="row_1" style={{marginTop:"1em", marginLeft:"1em"}}>
                            <div>
                            {/* <label className="greenText">
                                {"Showing " + (skuPageNumber>0 ? (pageSize*((skuPageNumber)))+1 : ((skuPageNumber)+1))+  "  to  " +  (skuPageNumber>0 ? 
                                (((pageSize*((skuPageNumber)))+pageSize)>totalLength ? totalLength : ((pageSize*((skuPageNumber)))+pageSize)) : 
                                ((((skuPageNumber)+1)*pageSize)>totalLength?totalLength:(((skuPageNumber)+1)*pageSize)))   + "  of   "  +   totalLength }</label> */}

                            <label className="greenText">{"Showing " + (skuPageNumber>0 ? (pageSize*((skuPageNumber)))+1 : ((skuPageNumber)+1))+  "  to  " + 
                             (skuPageNumber>0 ? (((pageSize*((skuPageNumber)))+pageSize)>totalLength2 ? totalLength2 : ((pageSize*((skuPageNumber)))+pageSize)) :
                              ((((skuPageNumber)+1)*pageSize)>totalLength2?totalLength2:(((skuPageNumber)+1)*pageSize)))   + "  of   "  +   totalLength2 }</label>
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
                    <TablePagination pageChange={paginationChange} pageCount={pageCount2} pageNumber={skuPageNumber+1}/>
                    </div>
                    </div>


                            <div className="form-group row mt-3" style={{marginLeft:"0.42em", marginRight:"0.5em"}}>
                            <div className="col-md-12">
                                <table id="plantDetails" class="table table-striped w-100 ">
                                    <thead>
                                        <tr>
                                            <th class="text-nowrap">Status</th>
                                            <th class="text-nowrap">SKU</th>
                                            <th class="text-nowrap">Sub-Category</th>
                                            <th class="text-nowrap" style={{textAlign:"right"}}>Each Cost</th>
                                            <th class="text-nowrap" style={{textAlign:"right"}}>Each Price</th>
                                            <th class="text-nowrap" style={{textAlign:"right"}}>Sale Price</th>
                                            <th class="text-nowrap"style={{textAlign:"center"}}>Sale Active</th>
                                            <th class="text-nowrap text-right">Volume Price Per Unit</th>
                                            <th class="text-nowrap text-center">Volume QTY</th>
                                            <th class="text-nowrap text-center">Actions</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>

                                    {displaySkuList2.map((sku,i)=>{

                                            // {let abc= productIDList.filter(pID =>pID.includes(sku.product_id).map(filterIDs=>
                                            //     <li>{filterIDs}</li>
                                            //     ))}
                                                
                                           // product_idFromGeneral   
                                           //productDataById.product_id
                                           //console.log(sku.product_id);
                                           // console.log("AB12345", sku.product_id, product_idFromGeneral, productDataById.product_id)
                                            //  if(sku.product_id=== (product_idFromGeneral ? product_idFromGeneral  : productDataById.product_id)){


                                     
                                       let categoryToBeDisplayed =  subCategoryData.filter(categoty=>sku.sub_category_id === categoty.id)
                                       console.log(categoryToBeDisplayed)

                                            
                        return(

                                        <tr key={sku.id} style={{background:(selectedRow === sku.id)? "#e1e3e4":""}}>
                                            <td style={{color:sku.archived==="0"?"":"red"}} >{sku.archived==="0"?"Active":"Archived"}</td>
                                            <td>{sku.sku_code}</td>
                                            <td>{categoryToBeDisplayed[0]?categoryToBeDisplayed[0].name:""}</td>
                                            <td style={{textAlign:"right"}}>{sku.each_cost}</td>
                                            <td style={{textAlign:"right"}}>{sku.each_price}</td>
                                            <td style={{textAlign:"right"}}>{sku.sale_price}</td>
                                            <td class="text-center">
                                            <div class="custom-control custom-checkbox mb-1 text-center">
                                                        <input type="checkbox" class="custom-control-input" id={sku.id+"_"+i} checked={parseInt(sku.status)==0?false:true} onChange={()=>handleCheckBox(sku.id,i,"status")}  />
                                                        <label class="custom-control-label" for={sku.id+"_"+i}></label>
                                                    </div>
                                                <i className={sku.status===1?'bx bx-check':'bx bx-x'}></i>
                                            </td>
                                            <td class="text-right"  style={{color:sku.volume_quantity==="0"?"lightgray":""}} >{sku.volume_price_per_unit}</td>
                                            <td class="text-center"  style={{color:sku.volume_quantity==="0"?"lightgray":""}} >{sku.volume_quantity==="0"?"None":sku.volume_quantity}</td>
                                            <td class="text-center">
                                                <span>
                                                   
                                                        <img src="assets/img/edit.svg" alt="" style={{cursor:"pointer"}} onClick={()=>{handleSKUEdit(sku.id)}}/>
                                                   
                                                </span>
                                                {/* <span>
                                                    <a href="javascript:;">
                                                        <img src="assets/img/duplicate.svg" alt=""  onClick={()=>confirmDelete(sku.product_id)}/>
                                                    </a>onClick={()=>confirmAction(product.product_id,"delete")}
                                                </span> */}
                                                <span>
                                                    <a href="javascript:;">
                                                        <img src="assets/img/delete.svg" alt="" onClick={()=>confirmDelete(sku.id,"delete","sku")}/>
                                                    </a>
                                                </span>
                                            </td>
                                        </tr>
                                    
                                    
                        )
                        // }
                    })}
                
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
        </div>
    )
}


const mapStateToProps = (state)=> ({
    productData:state.productData,
    temp:state,
    categoryData:state.categoryData,
    attributeData:state.attributeData,
    supplierLocation:state.supplierData.supplierLocationList
})
function validate(values) {
    const errors = {};
  
    //Validate the inputs from values
    if(!values.email) {
      errors.title = "Enter an email!";
    }
    if(!values.password) {
      errors.categories = "Enter a password!";
    }
    //If errors is empty, the form is fine to submit
    //If errors has any properties, redux form assumes form is invalid
    return errors;
  }


export default reduxForm({
    validate,
    form: 'SkuList'
  })(connect(mapStateToProps, {

    //sku actions
    createSkuAction, 
    updateSkuAction ,
    updateSkuActionClear,
    deleteSkuAction ,
    getAllSkuAction ,
    showSpecifiedSkuAction,
    setSkuPageNumber,
    getAllAttributesAction,

    // product actions
    deleteProductAction ,
    getSpecifiedProductAction,
    getAllSpecifiedSkuProductList,

    //handle sku input
    handleSkuInputAction,
    pageReDirectAction,
    clearSkuFields,
    getAllSupplierLocationMethods,
    checkBoxSku1,
updateCheckBoxsku1,

})(SkuList));



