
import React,  { Component,useEffect,useState,Link } from 'react';
import {connect} from "react-redux";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import {getAllSubAttribute} from '../../actions/attributeAction'
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

    //input handle
    handlePlantInputAction

}from "../../actions/plantManagerAction";
import {
    getAllPlantCategories

}from "../../actions/categoryAction";



 const GeneralSettings = (props) =>{
    const [submitCount, setSubmitCount] = useState(0)
    const [count, setCount] = useState(0)
    // const [tags, setTags] = useState([]);
    const [toggleForTagInput,setToggle] = useState(true)
    const [errorObj,setErrorObj] = useState({ genus:0,species:0  })
    const [errorCount,setErrorCount] = useState(0)
    let hardinessZoneList =props.attributeData.subAttribute

    useEffect(()=>{
        props.getAllSubAttribute(10)
    },[])
 
    const handleInput =(e)=>{
        setSubmitCount(0)
        let errorcount =errorCount
        let errorobj =errorObj
        if(e.target.id  === "genus" ){
            errorobj.genus=0
            errorcount--
        }
        if(e.target.id  === "species" ){
            errorobj.species=0
            errorcount--
        }
        setErrorObj(errorobj)
       setErrorCount(errorcount)
        if(e.target.id ==="in_production") {
            if (parseInt(e.target.value) ===1) {
                props.handlePlantInputAction(e.target.id,0)
                // props.handlePlantInputAction("archived",0)
                // props.handlePlantInputAction("discontinued",1)
            }
            else if (parseInt(e.target.value) ===0) {
                props.handlePlantInputAction(e.target.id,1)
                // props.handlePlantInputAction("archived",0)
                // props.handlePlantInputAction("discontinued",0)
            }
        }
        else if(e.target.id ==="archived") {
            if (parseInt(e.target.value) ===1) {
                props.handlePlantInputAction(e.target.id,0)
                // props.handlePlantInputAction("in_production","1")
                // props.handlePlantInputAction("discontinued",0)
            }
            else if (parseInt(e.target.value) ===0) {
                props.handlePlantInputAction(e.target.id,1)
                // props.handlePlantInputAction("in_production","0")
                // props.handlePlantInputAction("discontinued",0)
            }
        }
        else if(e.target.id ==="discontinued") {
            if (parseInt(e.target.value) ===1) {
                props.handlePlantInputAction(e.target.id,0)
                // props.handlePlantInputAction("in_production","1")
                // props.handlePlantInputAction("archived",0)
            }
            else if (parseInt(e.target.value) ===0) {
                props.handlePlantInputAction(e.target.id,1)
                // props.handlePlantInputAction("in_production","0")
                // props.handlePlantInputAction("archived",0)
            }
        }
        else props.handlePlantInputAction(e.target.id,e.target.value)

    }



    // const childAdd = (e) =>{
    //     // let commonArray = tagsData
    //     if(commonArray.length === 0){
    //      commonArray[count] =e.target.value
    //      var elem = document.getElementById(count);
    //      elem.parentNode.removeChild(elem);
    //      setCount(count+1)
    //      setToggle(true)
 
    //     }else{
    //      commonArray[commonArray.length] =e.target.value
    //      elem = document.getElementById(count);
    //      elem.parentNode.removeChild(elem);
    //      setCount(count+1)
    //         setToggle(true)
    //     }
    //  }
    //  const handleValidation =()=>{
    //      let returnValue=true
    //      let errorcount =errorCount
    //      let errorobj =errorObj
    //    if(plantDataById.genus.length === 0){
    //     returnValue= false
    //     errorobj.genus=1
    //     errorcount++
    //    }
    //    if(plantDataById.species.length === 0){
    //     returnValue= false
    //     errorobj.species=1
    //     errorcount++
    //    }
    //    setErrorObj(errorobj)
    //    setErrorCount(errorcount)

    //  }


     const submitAction = (e) =>{
         
         //let validate = handleValidation()  
        //  if(validate)
        console.log(actionType)
        if(submitCount === 0){
           if(needAction){
               if(actionType ==="add"){
                props.createPlantAction(plantDataById)
               }
              
  
               if(actionType ==="edit"){
                   let plantID = plantDataById.plant_id
                   if(!plantDataById.plant_id)plantID = props.plantData.ae_plant_id
                   props.updatePlantAction(plantDataById,plantID)}

               setSubmitCount(1)
           }
       }
         
    }


    // const removeTag1 = (index) => {
    //     const newTagArray = tagsData;
    //     newTagArray.splice(index, 1);
    //     setCount([...newTagArray]);
    //   };

    // const addTag = (e) =>{
    //     if(e.target.id==="tags" && toggleForTagInput){
    //         var inputTag = document.createElement('input');
    //         inputTag.id = count
    //         inputTag.className= "input_tag_edit"
    //         inputTag.placeholder = "add tag"
    //         inputTag.onchange = childAdd
    //         document.getElementById("tags").appendChild(inputTag);  
    //         setToggle(false)       
    //     }
    // }



    let currentYear =  new Date().getFullYear()
    let initialYear = 1900
    let countOfYear = 20;
    var indents = [];
    for (var i = 1900; i <= currentYear; i++) {
        indents.push(i);
    }
    const {plantData,plantDataById, actionType,needAction} = props.plantData
    const {plantCategoryData} =  props.categoryData
    let flag=0
    if(plantDataById){       
        if(!plantDataById.genus || !plantDataById.species || !plantDataById.category_id){
            flag=1
        }
        
    }
    let commonNameList = []
    if(plantDataById.common_name){
        console.log(plantDataById.common_name)
        if(typeof(plantDataById.common_name) === "string"){
            commonNameList = JSON.parse(plantDataById.common_name)
        }    
        else{
            commonNameList = plantDataById.common_name
        }
       
    }
    // if(props.attributeData)
    console.log(props.attributeData.subAttribute)

    return (
        <div>
            <div class="bg-white px-3 py-3 mt-3" style={{marginLeft:"1em", marginRight:"0.5em",paddingRight:"1em"}}>
                            <form>
                                <div class="row">
                                {actionType!=="add"?<div class="col-md-12 d-md-flex flex-wrap align-items-center">
                                        <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                            <div class="switcher ml-2 pr-2">
                                                <input type="checkbox" id="in_production"  onChange={handleInput} value={plantDataById.in_production} checked={parseInt(plantDataById.in_production)===0?false:true}/>
                                                <label for="in_production" style={{cursor:"pointer"}}></label>
                                            </div>
                                            In Production
                                        </div>
                                        <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                            <div class="switcher ml-2 pr-2">
                                                <input type="checkbox" id="discontinued"   onChange={handleInput} value={plantDataById.discontinued} checked={plantDataById.discontinued===0?false:true}/>
                                                <label for="discontinued" style={{cursor:"pointer"}}></label>
                                            </div>
                                            Discontinued
                                        </div>
                                        <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                            <div class="switcher ml-2 pr-2">
                                                <input type="checkbox" id="archived"  onChange={handleInput} value={plantDataById.archived} checked={plantDataById.archived===0?false:true}/>
                                                <label for="archived" style={{cursor:"pointer"}}></label>
                                            </div>
                                            Archive
                                        </div>
                                    </div>:""}
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-3">
                                        <label>Genus <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" placeholder="" id="genus" value={plantDataById.genus} onChange={handleInput}/>
                                        {errorObj.genus!==0?<span style={{fontSize:"small",color:"red"}}>Required</span>:""}
                                        
                                    </div>
                                    <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                        <label>Species <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" placeholder="" id="species" value={plantDataById.species} onChange={handleInput}/>
                                        {errorObj.species!==0?<span style={{fontSize:"small",color:"red"}}>Required</span>:""}
                                    </div>
                                    <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                        <label>Cultivar</label>
                                        <input type="text" class="form-control" placeholder="" id="cultivar1" value={plantDataById.cultivar1} onChange={handleInput}/>
                                    </div>
                                    <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                        <label>Cultivar 2</label>
                                        <input type="text" class="form-control" placeholder="" id="cultivar2" value={plantDataById.cultivar2} onChange={handleInput}/>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-3">
                                        <label>Alternate Genus</label>
                                        <input type="text" class="form-control" placeholder="" id="alternate_genus" value={plantDataById.alternate_genus} onChange={handleInput}/>
                                    </div>
                                    <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                        <label>Series</label>
                                        <input type="text" class="form-control" placeholder=""  id="series" value={plantDataById.series} onChange={handleInput}/>
                                    </div>



                                    <div class="col-md-6 col-lg-6 mt-2 mt-md-0">
                                        <label>Common Name(s)</label>
                                        {/* <div id="tags" style={{height:"2.45em",marginLeft:"-3px",marginTop:"0.5px",padding:"6px 0",
                                        border:"2px solid #cccccc",borderRadius:"5px"}} onClick={addTag}>
                                            {tagsData.map((tagData, index)=>{
                                            return (<a className="subtag" key={index}>
                                                <button
                                                                    onClick={() => removeTag1(index)}
                                                                    className="tagCloseBtn"
                                                                    style={{paddingTop:"0px"}}
                                                                >
                                                                    
                                                              <p>{tagData}  &nbsp;&nbsp;&nbsp;x </p> </button></a>)
                                            }) }
                                        </div> */}




                                        <ReactTagInput 
                                                    tags={commonNameList} 
                                                    onChange={(tags) =>{
                                                        props.handlePlantInputAction("common_name",tags)
                                                         }}
                                                         id="common_name"
                                                    />
                                    </div>

                                    




                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-3">
                                        <label>Category <span class="text-danger">*</span></label>
                                        <select class="form-control"  onChange={handleInput} id="category_id" value={plantDataById.category_id} style={{cursor:"pointer"}} >
                                        <option>None</option>
                                        {plantCategoryData.map(plantCategory=>{
                                                if(plantCategory.status === "1")
                                                    return(
                                                        <option value={plantCategory.id}>{plantCategory.name} </option>
                                                    )
                                                })                                       
                                        }
                                        </select>

                                    </div>
                 
                                </div>
                               
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-3">
                                        <label>Patent</label>
                                        <input type="text" class="form-control" placeholder="" id="patent" value={plantDataById.patent} onChange={handleInput}/>
                                    </div>
                                    <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                        <label>Royalty</label>
                                        <input type="text" class="form-control text-right" placeholder="" id="royality" value={plantDataById.royality} onChange={handleInput}/>
                                    </div>
                                    {/* future requirement  10 id */}
                                    <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                        <label>Hardiness Zone</label>
                                      
                                            <select class="form-control" style={{cursor:"pointer"}} id={"hardiness_zone"} onChange={handleInput} value={plantDataById.hardiness_zone} >
                                            <option>None</option>
                                            {hardinessZoneList.map(zone=>{
                                                if(zone.status === 1)
                                                return<option value = {zone.id}>{zone.value}</option>
                                            })}
                                            </select>

                                            
                                   
                                        {/* <input type="text" class="form-control" placeholder="" id="hardiness_zone" value={plantDataById.hardiness_zone} onChange={handleInput}/> */}
                                        
                                    </div>
                                    <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                        <label>Introduction Year</label>
                                        <select class="form-control" id="introduction_year" onChange={handleInput} style={{cursor:"pointer"}} value={plantDataById.introduction_year}>
                                        {
                                        indents.map(year=>{
                                            return(<option value={year} selected={plantDataById.introduction_year===year?"selected":""}>{year}</option>)
                                        })
                                        }
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12">
                                        <label>Internal Notes <small>(Not shown to customer)</small> </label>
                                        <textarea class="form-control" rows="4" value={plantDataById.notes} id="notes" onChange={handleInput}></textarea>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 text-md-right">
                                        {/* <a href='/plantManager'> */}
                                        {/* <button type="button" class="btn btn-outline-secondary btn-lg"
                                         onClick={()=>props.plantPageReDirectAction("all","plant")}
                                        >Return to Plant Manager</button> */}
                                        {/* </a> */}
                                        <button type="button" class="btn btn-primary btn-lg ml-3" style={{cursor:"pointer"}} disabled={submitCount===0?(needAction===true && flag ===0)?false:true:true} onClick={submitAction} >{actionType==="add"?"Add":"Update Plant"}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
        </div>
    )
}


const mapStateToProps = (state)=> ({ 
    plantData:state.plantData,
    categoryData: state.categoryData,
    attributeData:state.attributeData
    

})
export default connect(mapStateToProps,{
        //plant actions
        createPlantAction ,
        updatePlantAction, 
        deletePlantAction ,
         getAllPlantAction,
         duplicatePlant,
    
        //page Redirects action
        plantPageReDirectAction,
        plantSubPageReDirectAction,

        //hande input
        handlePlantInputAction,
        getAllPlantCategories,
        getAllSubAttribute





})(GeneralSettings)


