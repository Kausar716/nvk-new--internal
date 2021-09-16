/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React,  {  useEffect,useState } from 'react' ;
import {connect} from "react-redux";
import { Tab, Tabs, TabList } from 'react-tabs';
// import React from 'react';
import Autosuggest from 'react-autosuggest';
import { Link } from "react-router-dom";

//import {Button,Badge,Form,Input,FormGroup,CustomInput,Label,Pagination,PaginationItem,PaginationLink,Table, Row,Col} from 'reactstrap'
//import {getAllImageAssets} from "../Utility/Utility";
//import '../ProductManagement/index.css'

import PlantTable from './PlantTable'
import GeneralSettings from './GeneralSettings'
import Loader from '../ProductManager/Loader'

import ActionModal from '../Modal/ActionModal';
import SkuList from './SkuList'
import ModalData from '../Modal'
import {
    //plant actions
    createPlantAction ,
    updatePlantAction, 
    deletePlantAction ,
     getAllPlantAction,
     duplicatePlant,
     setPlantPageNumber,
    //page Redirects action
    plantPageReDirectAction,
    plantSubPageReDirectAction,
    serachPlant,
    radioSearch,
    resetPlantRadio,
    searchCategoryApplyAction
    

}from "../../actions/plantManagerAction";
import {
    getAllPlantCategories

}from "../../actions/categoryAction";


const  PlantManger=(props)=> {

    const [disable,setDisable] = useState(false)
    const [id,setId] = useState(0)
    const [selectedRadio,setRadio] =useState("all")
    const [open,setOpen] = useState(false)
    const [message,setMessage] = useState("")
    const [type, setType] = useState("")
    const [categoryId,setCategoryId] = useState(0)
    const [inputValue, setInputValue] = useState("");
    const [loader,setLoader] = useState(false)
    const [loaderMessage,setLoaderMessage]=useState("Loading Data...")
    const [errorObj,setErrorObj] = useState({ genusError:0,lastNameError:0,phoneError:0,emailError:0,positionError:0})
    //search suggestion implementation
    const [value,setValue] = useState("")
    const [suggestions,setSuggestions] = useState([])

    const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : plantData.filter(lang =>
          lang.genus.toLowerCase().includes(inputValue)
        );
    };
    const getSuggestionValue = suggestion => suggestion.plant_name;

      // Use your imagination to render suggestions.
    const renderSuggestion = suggestion => (
        <span>
          {suggestion.plant_name.split("-")[0]}
        </span>
    );
    const onChange = (event, { newValue }) => {
        setValue(newValue)
        setLoaderMessage("No Records Found.")
        props.setPlantPageNumber(0)
        props.serachPlant({plant: newValue, option: props.plantData.plantRadioButton, category: categoryId})
        setInputValue(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };
  
    // Autosuggest will call this function every time you need to clear suggestions.
    const  onSuggestionsClearRequested = () => {
      setSuggestions([]);
    };
//search suggeestion implemention code

const productFormAction = ()=>{
        this.props.getProductPage("general")
        this.setState({plantPageToOpen:"general"})
        
    }
    const pageRenderAction = (pageType) =>{
        props.getProductPage(pageType)
    }
    useEffect(()=>{
        props.getAllPlantAction()
        props.getAllPlantCategories()
    },[])
    
    const addPlant =()=>{
        console.log("working")
        props.createPlantAction()
    }
    const cancel = ()=>{
        setOpen(false)
        setId(0)
        setType("")
        setMessage("")
         
     }
     const confirm = ()=>{
         if(type==="delete"){
            props.deletePlantAction(id)

         }else{
             props.duplicatePlant(id)
         }
   
        setOpen(false)
        setId(0)
        setType("")
        setMessage("")
    }

    const confirmAction = (id,type)=>{
        if(type=="delete"){
            setType(type)
            setMessage("Are you sure you want to delete this plant and its related SKUs?")

        }else{
            setType(type)
            setMessage("Are you sure you want to duplicate this plant and all its related SKU and plant information?")

        }
        setOpen(true)
        setId(id)
    }
        const getValue = (e)=>{
            setLoaderMessage("No Records Found.")
            console.log(e.target.value)
            props.serachPlant({plant: e.target.value, option: props.plantData.plantRadioButton, category: categoryId})
            setInputValue(e.target.value);
        }
        const radioSearchAction =(e)=>{
            props.setPlantPageNumber(0)
            setLoaderMessage("No Records Found.")
            console.log(e.target.id)
            //props.radioSearch(e.target.id)
            props.serachPlant({plant: inputValue, option: e.target.id, category: categoryId})
            // setRadio(e.target.id)

        }
        const searchBasedOnCategory = (e) =>{
            setLoaderMessage("No Records Found.")
            props.setPlantPageNumber(0)
            //console.log(e.target.value)
            //props.searchCategoryApplyAction(e.target.value)
            
            props.serachPlant({plant: inputValue, option: props.plantData.plantRadioButton, category: e.target.value})
            setCategoryId(e.target.value)
            // searchCategoryApply()
        }
        // const searchCategoryApply = () =>{
        //     if(categoryId === 0)
        //     return
        //      console.log(categoryId)
        //     props.searchCategoryApplyAction(categoryId)

        // }
        const resetData = () =>{
            setLoaderMessage("Loading Data...")
            setLoader(true)
            props.resetPlantRadio()
            let result = props.getAllPlantAction()
            result.then(res=>{
                setLoader(false)
            })
            // setRadio("all")
            setCategoryId(0);
            setInputValue("");
            setValue("")
        }
    

        // const onChange = (event, { newValue }) => {
        //     this.setState({
        //       value: newValue
        //     });
        //   };
        
          // Autosuggest will call this function every time you need to update suggestions.
          // You already implemented this logic above, so just use it.
       
    const {plantPageToOpen,plantData,actionType,plantDataById,ae_plant_id,plantNameWithFormat,plantRadioButton} = props.plantData
    const {plantCategoryData} =  props.categoryData
    console.log(plantRadioButton)
    const inputProps = {
        placeholder: 'Plant Name',
        value:value.split("-")[0],
        
        // className:"searchInput",
        className:" form-control btn btn-search",
        id:"add-icon-search",
        style: {position:"relative",border:"1px solid gray",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:6,height:"41.5px",fontSize:"15px",textDecoration:"none"},
        onChange: onChange
    };
 

    return (
        <div>
          
 

            <ModalData/>
             
             <ActionModal cancel={cancel} confirm={confirm} open={open} message={message}/>
             {plantPageToOpen==="all" &&
             <div>
                    <div className="contentHeader bg-white d-flex justify-content-between align-items-center">
                        <div className="row"><img src="assets/img/PlantManagerIcon.svg" alt=""/>	
                            <h1 className="page-header mb-0" style={{margin:"0.6em"}}>Plant Manager</h1>
                        </div> 
                
                            <div class="topbarCtrls mt-3 mt-md-0">
                            <a href="#" class="btn active">
                              
                                <span class="d-flex align-items-center text-left"  onClick={()=>props.plantPageReDirectAction("general","add")}>
                                    <img src="assets/img/plant-ic-btn.svg" alt=""/>
                                    <span class="ml-2"><b>Add Plant</b></span>
                                </span>
                             
                            </a>
                            <a href="#" class="btn ml-2">
                                <span class="d-flex align-items-center text-left">
                                    <img src="assets/img/search-ic-btn.svg" alt=""/>
                                    <span class="ml-2"><b>Preview</b></span>
                                </span>
                            </a>
                            <a href="#" class="btn ml-2 mt-3 mt-md-0">
                                <span class="d-flex align-items-center text-left">
                                    <img src="assets/img/print-ic-btn.svg" alt=""/>
                                    <span class="ml-2"><b>Print</b></span>
                                </span>
                            </a>
                        </div>


                    </div>
                    <div className="contentWrapper">
                        <div className="row">
                            <div className="col-xl-12 col-md-12">
                                <div className="bg-white p-15">
                                    <div className="form-group row">
                                        <div className="col-md-5 col-lg-5 mt-2 mt-md-0">
                                            <label for="plantSearch">Plant Search</label>
                                            {/* <div className="searchInput">
                                            
                                                {/* <input type="text" className="form-control" placeholder="Search"/> */}
                                                {/* <input className="form-control" 
                                                        type="text" 
                                                        autocomplete={"off"}
                                                        placeholder="Search" 
                                                        value={inputValue}
                                                        onChange={getValue} id="search"/>
                                            {/* </div> */} 
                                            <div className="searchInput" style={{height: "40px"}}>
                                            {/* <button type="submit" className="btn btn-search" style={{marginTop:"-13.4%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button> */}
                                            <Autosuggest
                                                    suggestions={suggestions}
                                                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                                                    getSuggestionValue={getSuggestionValue}
                                                    renderSuggestion={renderSuggestion}
                                                    inputProps={inputProps}
                                                    theme={{suggestionsContainerOpen:suggestions.length>5?"yes":"no",suggestionsContainer:suggestions.length>5?"yes1":"no1",
                                                    suggestionsList:suggestions.length>5?"yes":"no1"}}
                                                />
                                                <img src="assets/img/search.svg" alt="" style={{position:"absolute", left:"14px",top:"12px"}}/>
                                                {/* <span  class="fa fa-search "></span> */}
                                                </div>
                                        </div>
                                        <div className="col-md-5 col-lg-5 mt-2 mt-md-0">
                                            <label for="Category">Category</label>
                                            {/* <select className="form-control">
                                                <option>None</option>
                                            </select> */}

                                            <select className="form-control"  id="sub_category" onChange={searchBasedOnCategory} style={{cursor:"pointer"}}>
                                                <option value={0}>None</option>
                                            {plantCategoryData.map(plantCategory=>{
                                                if(plantCategory.status === "1")
                                                return(
                                                    <option value={plantCategory.id}  selected={Number(categoryId) ===plantCategory.id?"selected":""} >{plantCategory.name} </option>
                                                )
                                            })
                                                
                                            }
                                            </select>


                                        </div>
                                        <div className="col-md-2 col-lg-2">
                                            <a href="javascript:;" onClick={resetData} className="d-block topSpace" style={{marginTop:"2.5em"}}>Reset</a>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <div className="form-check form-check-inline">
                                            <input className="form-check-input"  type="radio" checked={plantRadioButton ==="active"?"checked":""} style={{cursor:"pointer"}} name="radio1" onClick={radioSearchAction} id="active"/>
                                                {/* <input className="form-check-input" type="radio" name="radio_default_inline" id="activePlants" value=""/> */}
                                                <label className="form-check-label" for="activePlants" >Active</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="radio1" style={{cursor:"pointer"}} checked={plantRadioButton ==="archive"?"checked":""} onClick={radioSearchAction} id="archive"/>
                                                {/* <input className="form-check-input" type="radio" name="radio_default_inline" id="archivedPlants" value=""/> */}
                                                <label className="form-check-label" for="archivedPlants" >Archived</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                            <input type="radio" name="radio1"checked={plantRadioButton ==="all"?"checked":""}  style={{cursor:"pointer"}} onClick={radioSearchAction} id="all"/>
                                                {/* <input className="form-check-input" type="radio" name="radio_default_inline" id="allPlants" value=""/> */}
                                                <label className="form-check-label" for="allPlants" > &nbsp;All</label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                  
                                    <PlantTable loaderMessage={loaderMessage}/>
                                      {/* <div className="centerItem">
                                    {loader?  <p > {"Resetting ... " }<Loader /></p>:null}
                                    </div> */}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
            </div>}


            {(plantPageToOpen === "general" || plantPageToOpen === "sku") &&
                            <div> 
                                <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center">
                                    <h1 class="page-header mb-0"><img src="assets/img/product-green.svg" alt=""/>{actionType==="add"?"Add":"Edit"} Plant</h1>
                                    {/* <span>
                                                    <button type="button" class="btn btn-primary  btn-lg" 
                                                    onClick={()=>props.plantPageReDirectAction("all","plant")}
                                                    >Return to Plant Manager</button>
                                                    </span> */}
                                <div class="topbarCtrls mt-3 mt-md-0"onClick={()=>props.plantPageReDirectAction("all","plant")} >
                                    <a href="#" class="btn" >
                                    <span class="d-flex align-items-center text-left">
                                    {/* <img src="assets/img/Quoteblue_small-Icon.svg" alt=""/> */}
                                        <span class="ml-2"><b>Return to Plant Manager</b></span>
                                    </span>
                                    </a>                        
                                </div>
                        
                                </div>
                                    <div class="px-md-3 mt-3">
                                        <div class="px-3 py-3 mb-3 bg-white">
                                            <div class="row align-items-center">
                                                <div class = "col-md-1"> <h2>Plant ID</h2></div>
                                                <div class="col-md-5">
                                                    <h2>
                                                    <span className="text-green" > {ae_plant_id}</span> 
                                                    <span className="text-green" style={{fontStyle:"italic"}}>{' '+plantNameWithFormat.firstName}</span>
                                                    <span className="text-green">{' '+plantNameWithFormat.secondName}</span> </h2>
                                                    
                                                </div>
                                             
                                             <div class="col-md-6 d-flex justify-content-md-end">
                                                {/* <span onClick={()=>props.plantPageReDirectAction("all","add")} 
                                                style={{textDecoration:"none",cursor:"pointer"}}  className="right_float">
                                                    <i class='bx bx-arrow-back' ></i>
                                                    <label className="trashIcon" style={{marginLeft:"-49px"}}>GoBack</label>
                                                    </span> */}
                                                    { actionType !== "add"? <a href="#" class="mx-2">
                                                        <img src="assets/img/copy-ic.svg" alt="" onClick={()=>{confirmAction(ae_plant_id,"duplicate"); }} />
                                                    </a>:""}
                                                    { actionType !== "add"?<a href="#" class="mx-2">
                                                        <img src="assets/img/trash-ic.svg" alt=""  onClick={()=>confirmAction(ae_plant_id,"delete")} />
                                                    </a>:""}
                                                    
                                                    {/* <a href="" class="mx-2">
                                                        <img src="assets/img/left-double-arrow.svg" alt=""/>
                                                    </a> */}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <Tabs>
                                            <TabList>
                                                <Tab onClick={()=>props.plantSubPageReDirectAction("general")}>General</Tab>
                                                <Tab onClick={()=>props.plantSubPageReDirectAction("sku")}>SKU Lists</Tab>
                                            </TabList>
                                        </Tabs> */}


                                    <div className="product_add_navigation">
                                        <span style={{ marginRight: "25px"}} id="general" className={plantPageToOpen === "general" ? "selected_link" : "normal_link" }  onClick={()=>props.plantSubPageReDirectAction("general")}>General</span>
                                        <span  style={{ marginLeft: "-25px"}} id="sku"  className={plantPageToOpen === "sku" ? "selected_link" : "normal_link" }  onClick={()=>{if(actionType !== "add"){props.plantSubPageReDirectAction("sku")}}}>SKU Lists</span>
                                    </div>
                                </div>
                        </div>
                   
                }

                    { plantPageToOpen==="general"&&<GeneralSettings/>}
                    { plantPageToOpen==="sku"&&<SkuList/>}

        </div>
    )
}


const mapStateToProps = (state)=> ({
    plantData:state.plantData,
    categoryData: state.categoryData
})
export default connect(mapStateToProps,{
        //plant actions
        createPlantAction ,
        updatePlantAction, 
        deletePlantAction ,
         getAllPlantAction,
         duplicatePlant,
         resetPlantRadio,
         //plant page redirect
         plantPageReDirectAction,
         plantSubPageReDirectAction,

         //plant category
         getAllPlantCategories,

         radioSearch,
            serachPlant,
            searchCategoryApplyAction,
            setPlantPageNumber
})(PlantManger)

