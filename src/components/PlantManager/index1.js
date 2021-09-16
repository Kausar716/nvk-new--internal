import React,  { Component, useEffect,useState } from 'react' ;
import {connect} from "react-redux";
import {Button,Badge,Form,Input,FormGroup,CustomInput,Label,Pagination,PaginationItem,PaginationLink,Table, Row,Col} from 'reactstrap'
import {getAllImageAssets} from "../Utility/Utility";
//import '../ProductManagement/index.css'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import PlantTable from './PlantTable'
import GeneralSettings from './GeneralSettings'
import ImageSetting from './ImageSetting'
import Description from './Description'
import ActionModal from '../Modal/ActionModal'
import SkuList from './SkuList'
import ModalData from '../Modal'
import {
    //plant actions
    createPlantAction ,
    updatePlantAction, 
    deletePlantAction ,
     getAllPlantAction,
     duplicatePlant,

    //page Redirects action
    plantPageReDirectAction,
    plantSubPageReDirectAction,
    serachPlant,
    radioSearch,
    searchCategoryApplyAction



    

}from "../../actions/plantManagerAction";
import {
    getAllPlantCategories

}from "../../actions/categoryAction";
import ReactPaginate from 'react-paginate'
import ReactToPrint from 'react-to-print';
//import Printer, { print } from 'react-pdf-print'

import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";

// import Printer, { print } from 'react-pdf-print'


import ComponentToPrint  from './ComponentToPrint';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Substitution from './Substitution';
import Complementry from './Complementry';
import Characterstics from './Characterstics';
import './index.css';


const IconAssets =  getAllImageAssets();
console.log(IconAssets)



const PlantManger =(props)=>{
    const [disable,setDisable] = useState(false)
    const [id,setId] = useState(0)
    const [selectedRadio,setRadio] =useState("all")
    const [open,setOpen] = useState(false)
    const [message,setMessage] = useState("")
    const [type, setType] = useState("")
    const [categoryId,setCategoryId] = useState(0)

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
         if(type=="delete"){
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
            console.log(e.target.value)
            props.serachPlant(e.target.value)

        }
        const radioSearchAction =(e)=>{
            console.log(e.target.id)
            props.radioSearch(e.target.id)
            setRadio(e.target.id)

        }
        const searchBasedOnCategory = (e) =>{
            // console.log(e.target.value)
            setCategoryId(e.target.value)

        }
        const searchCategoryApply = () =>{
            if(categoryId == 0)
            return
            // console.log(categoryId)
            props.searchCategoryApplyAction(categoryId)

        }
        const resetData = () =>{
            props.getAllPlantAction()
            setRadio("all")
            setCategoryId(0)
            

        }
    


    const {plantPageToOpen,plantData,actionType,plantDataById} = props.plantData
    const {plantCategoryData} =  props.categoryData
    console.log(plantData)
		return (
            <>
            <ModalData/>
             
             <ActionModal cancel={cancel} confirm={confirm} open={open} message={message}/>
                {plantPageToOpen=="all"&&<div>
                    <p className="headerbar heading" style={{backgroundColor:"#357ebd"}}> Plant Manager</p>

                    <div className="action_buttons_area">
                        
                               
                        <i class='bx bxs-printer' onClick={addPlant}/> <label className="below" >Print</label>
                        <i class='bx bx-search'> </i><label className="below">Preview</label>

                        <a href="#" className="right_float"  onClick={()=>props.plantPageReDirectAction("general","add")}>
                            {/* <i class='bx bxs-plus-circle' ></i> */}
                            <BsIcons.BsFillPlusCircleFill className="circleB" />
                            <label className="below2">Add Plant</label> </a>           

                    </div>
                    <br />
                   
                    <div className="selection_area">
                        <div className="input-form-group">
                            <label className="textBoldP" style={{color:"#444444"}} >Plant Search</label>
                            {/* <input 
                            placeholder = "Search"  
                            className="searchingDesigns"
                            /> */}

                            <div className="input-icons">
                              <i className="icon">  <BiIcons.BiSearch className="seachIcon"/></i>
                            <input className="input-field3" 
                                type="text" 
                                autocomplete={"off"}
                                placeholder="Search" onChange={getValue} id="search"/>
                            </div>

                        </div>
                        <div className="input-form-groupP">
                            <label className="textBoldP" style={{color:"#444444"}}>Category</label>
                            <div class="selectdiv">
                                <label>
                                    <select className="classic"  id="sub_category" onChange={searchBasedOnCategory}>
                                        <option value={0}>None</option>
                                    {plantCategoryData.map(plantCategory=>{
                                        return(
                                            <option value={plantCategory.id}  selected={categoryId ==plantCategory.id?"selected":""} >{plantCategory.name} </option>
                                        )
                                    })
                                        
                                    }
                                    </select>
                                </label>
                            </div>
                        </div>

                    
                    </div>

                        <div className="spaceLeft">
                        <label class="containerC">Active Plants
                        <input type="radio" checked={selectedRadio =="active"?"checked":""} name="radio1" onClick={radioSearchAction} id="active"/>
                        <span class="checkmark"></span>
                        </label>
                        <label class="containerC">Archived Plants
                        <input type="radio" name="radio1" checked={selectedRadio =="archive"?"checked":""} onClick={radioSearchAction} id="archive"/>
                        <span class="checkmark"></span>
                        </label>
                        <label class="containerC">All Plants
                        <input type="radio" name="radio1"checked={selectedRadio =="all"?"checked":""}  onClick={radioSearchAction} id="all"/>
                        <span class="checkmark"></span>
                        </label>
                      
                        </div>



                    <div className="action_area">
                    <button className="button_style" onClick={searchCategoryApply}>Search</button>
                    <button className="button_style1" onClick={resetData}>Reset</button>
                    </div>



                    <div style={{clear:"both"}}></div>
                
                    <div style={{clear:"both"}}></div>
                    <PlantTable/>
                    {/* <ComponentToPrint ref={(el) => (this.componentRef = el)}/> */}
                </div>
  }
                  {( plantPageToOpen=="general"||plantPageToOpen=="sku") &&<div >
                
                  

              <p className="headerbar heading" style={{backgroundColor:"#357ebd"}} > Add Plant</p>
                   

                    <div className="action_buttons_area">
                           
                              {/* <p >PLANT ID: <span > 393</span> </p> 
                              */}
                         <a style={{textDecoration:"none"}} className="left_float" ><p className="textNumberBold" style={{marginLeft:"1em"}}>PLANT  ID: <span className="textNumberBold2"></span> </p> </a>
                         <span  className="right_float icons_small"  style={{display:actionType=="add"?"none":"block",cursor:"pointer"}} onClick={()=>confirmAction(plantDataById.plant_id,"delete")}><i class='bx bxs-trash-alt'></i> <label className="deleteIcon">Delete</label></span>
                            <span  className="right_float icons_small" style={{display:actionType=="add"?"none":"block",cursor:"pointer"}} onClick={()=>confirmAction(plantDataById.plant_id,"duplicate")}><i class='bx bx-copy' ></i><label className="trashIcon" style={{marginLeft:"-59px"}}>Duplicate</label></span>
                        <a href="#" style={{textDecoration:"none"}} className="right_float" onClick={()=>props.plantPageReDirectAction("all","add")}><i class='bx bx-arrow-back'></i><label className="trashIcon" style={{marginLeft:"-49px"}}>Back</label></a>
                       
                    </div>
  
                    <div style={{clear:"both"}}></div>
                    
                    <div className="product_add_navigation">
                        <span  id="general" className={plantPageToOpen == "general" ? "selected_link" : "normal_link" }  onClick={()=>props.plantSubPageReDirectAction("general")}>GENERAL</span>
                     
                        <span   id="sku"  className={plantPageToOpen == "sku" ? "selected_link" : "normal_link" }  onClick={()=>props.plantSubPageReDirectAction("sku")}>SKU LISTS</span>
                      
                    </div>
                    </div>}
                    
                    { plantPageToOpen=="general"&&<GeneralSettings/>}
              
                    { plantPageToOpen=="sku"&&<SkuList/>}
            
          
                  

      
                
            </>
	
		
		
		);
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

         //plant page redirect
         plantPageReDirectAction,
         plantSubPageReDirectAction,

         //plant category
         getAllPlantCategories,

         radioSearch,
            serachPlant,
            searchCategoryApplyAction
})(PlantManger)

// export default Sidebar
