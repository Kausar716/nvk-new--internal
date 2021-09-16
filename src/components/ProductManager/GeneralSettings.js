/* eslint-disable no-unused-vars */

import React,  { useEffect,useState } from 'react';
import {connect} from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ReactTagInput from "@pathofdev/react-tag-input";

import "@pathofdev/react-tag-input/build/index.css";
import './style.css';
import {
    //product actions
    createProductAction ,
    updateProductAction ,
    deleteProductAction ,
    getAllProductAction,
    getSpecifiedProductAction,
    getAllSpecifiedSkuProductList,

    //page Redirects action
    pageReDirectAction,
    subPageReDirectAction,

    // handle input action
    handleInputAction,
    handleTagAction

} from "../../actions/productAction";
import {
    getAllCategoriesAction

} from '../../actions/categoryAction'



const GeneralSettings=(props)=> {
    let history = useHistory();
    const [count, setCount] = useState(0)
    const [submitCount, setSubmitCount] = useState(0)

    const [currentTagText, setCurrentTagText] = useState("");
    const [tags, setTags] = useState([]);
 
    const {productData,productDataById,tagsData,actionType,needAction} = props.productData
    const {categoryData,manufactureData} = props.categoryData
    const [toggleForTagInput,setToggle] = useState(true)
     console.log("abcdefg",productDataById)



    const handleInput =(e)=>{
        setSubmitCount(0)
        // if(e.target.id ==="archived") props.handleInputAction(e.target.id,e.target.value ===1?0:1)
        // else if(e.target.id ==="discontinued") props.handleInputAction(e.target.id,e.target.value ===1?0:1)
        if(e.target.id ==="archived") {
            if (parseInt(e.target.value) ===1) {
                props.handleInputAction(e.target.id,0)
                props.handleInputAction("discontinued",0)
            }
            else if (parseInt(e.target.value) ===0) {
                props.handleInputAction(e.target.id,1)
                props.handleInputAction("discontinued",0)
            }
        }
        else if(e.target.id ==="discontinued") {
            if (parseInt(e.target.value) ===1) {
                props.handleInputAction(e.target.id,0)
                props.handleInputAction("archived",0)
            }
            else if (parseInt(e.target.value) ===0) {
                props.handleInputAction(e.target.id,1)
                props.handleInputAction("archived",0)
            }
        }
        else props.handleInputAction(e.target.id,e.target.value)

    }

    useEffect(()=>{
       
    },[])




    const handleTag = (e) => {
       
        setCurrentTagText(e.target.value);
        if (e.keyCode === 13 && currentTagText) {
          setTags((prevTags) => [...prevTags, currentTagText,]);
          //setTags(()=>[...tagsData])
          setCurrentTagText("");
        } else if (e.keyCode === 32 && currentTagText) {
          setTags((prevTags) => [...prevTags, currentTagText]);
         // setTags(()=>[...tagsData])
          setCurrentTagText("");
        }

      };
      
      const removeTag = (index) => {
        const newTagArray = tagsData;
        newTagArray.splice(index, 1);
        setTags([...newTagArray]);
      };
    


      const removeTag1 = (index) => {
        const newTagArray = tagsData;
        newTagArray.splice(index, 1);
        setCount([...newTagArray]);
      };
    
    // const childAdd = (e) =>{
    //     let commonArray = tagsData
    //     if(commonArray.length === 0){
    //      commonArray[count] =e.target.value
    //      var elem = document.getElementById(count);
    //      elem.parentNode.removeChild(elem);
    //      setCount(count+1)
    //      setToggle(true)
 
    //     }else{
    //      commonArray[commonArray.length] =e.target.value
    //      var elem = document.getElementById(count);
    //      elem.parentNode.removeChild(elem);
    //      setCount(count+1)
    //         setToggle(true)
    //     }
       
    //  }


     const submitAction = (e) =>{
         let {productDataById}  = props.productData
        //  productDataById.common_name = productDataById.common_name
        e.preventDefault();
       // e.target.reset();
       //debugger;
        // console.log("TAGDATA", tagsData)
        //tagsData = [...tags,...tagsData]
        
         if(submitCount === 0){
            if(needAction){
                if(actionType ==="add")
                props.createProductAction(productDataById)
                console.log(props.productDataById)
                console.log(productDataById.product_id)
                console.log(props.productData.ae_product_id)
                console.log(actionType)
                if(actionType ==="edit"){
                    if(productDataById){
                        if(productDataById.product_id)
                        props.updateProductAction(productDataById,productDataById.product_id)
                        else if(props.productData.ae_product_id){
                            props.updateProductAction(productDataById,props.productData.ae_product_id)
                        }
                    }                   
                    else if(props.productData.ae_product_id){
                    props.updateProductAction(productDataById,props.productData.ae_product_id)
                    }
                }
                //setSubmitCount(1)

            }
        }
          
     }
    //  const addTag = (e) =>{
    //      //alert("acadcda")
    //      if(e.target.id==="tags" && toggleForTagInput){
    //          var inputTag = document.createElement('input');
    //          inputTag.id = count
    //          inputTag.className= "input_tag_edit"
    //          inputTag.placeholder = "Add tag"
    //          inputTag.onchange = childAdd
    //          document.getElementById("tags").appendChild(inputTag);  
    //          setToggle(false)       
    //      }
    //  }

//      const goToParentPage=()=>{
//         history.push("/productManager")

// }
console.log(productDataById)
let commonNameList = []
if(productDataById.common_name){
    console.log(productDataById.common_name)
    if(typeof(productDataById.common_name) === "string"){
        commonNameList = JSON.parse(productDataById.common_name)
    }    
    else{
        commonNameList = productDataById.common_name
    }
   
}
console.log(commonNameList)

let flag =0
if(productDataById){       
    if(!productDataById.name || !productDataById.category_id || !productDataById.manufacturer_id || productDataById.category_id === "0"|| productDataById.manufacturer_id === "0"){
        flag=1
        
    }
    
}
    return (
        <div>
            <div class="bg-white px-3 py-3 mt-3" style={{marginLeft:"1em", marginRight:"1em",paddingRight:"1em"}}>
                            <form>
                                <div class="row">
                                     {actionType !== "add" ?<div class="col-md-12 d-md-flex flex-wrap align-items-center">
                                        <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                            <div class="switcher ml-2 pr-2">
                                                <input type="checkbox" name="discontinued"  id="discontinued" onChange={handleInput} value={productDataById.discontinued}
                                                 checked={productDataById.discontinued===0?false:true}
                                                  />
                                                <label for="discontinued" style={{cursor:"pointer"}}></label>
                                            </div>
                                            Discountiued
                                        </div>
                                        <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                            <div class="switcher ml-2 pr-2">
                                                <input type="checkbox"    id="archived"  onChange={handleInput} value={productDataById.archived}
                                                 checked={productDataById.archived===0?false:true}
                                                 />
                                                <label for="archived" style={{cursor:"pointer"}}></label>
                                            </div>
                                            Archive
                                        </div>
                                    </div>:null}
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-3">
                                        <label>Item Name <span class="text-danger">*</span></label>
                                        <input type="text" id="name" value={productDataById.name} onChange={handleInput} class="form-control" placeholder=""/>
                                    </div>
                                    <div class="col-md-6 col-lg-6 mt-2 mt-md-0">
                                        <label>Common Name(s)</label>
                                        {/* <input type="text" class="form-control" placeholder=""/> */}
                                        {/* <div id="tags" style={{height:"2.45em",marginLeft:"-3px",marginTop:"0.5px",padding:"6px 0",border:"2px solid #cccccc",borderRadius:"5px"}} onClickCapture={addTag}>
                                            {tagsData.map(tagData=>{
                                            return (<a className="subtag">{tagData}</a>)
                                            }) }

                                        </div> */}

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
                                                    onChange={(tags) => {
                                                        props.handleInputAction("common_name",tags)
                                                       }}
                                                    id="common_name"
                                                    />

                                {/* <div className="masterStackDiv">
                                            <div
                                                className="stackTags"
                                                style={{ display: tags.length > 0 ? "flex":"none"}} 
                                            >
                                                {tags.map((tag, index) => {
                                                return (
                                                    <div className="stackTag" key={index}>
                                                    <button
                                                        onClick={() => removeTag(index)}
                                                        className="tagCloseBtn"
                                                    >
                                                        x
                                                    </button>
                                                    #{tag}
                                                    </div>
                                                );
                                                })}
                                            </div>
                                            <div className="stackInput">
                                                <input
                                                type="text"
                                                onKeyDown={handleTag}
                                                onChange={handleTag}
                                                value={currentTagText}
                                                />
                                            </div>
                                            </div> */}




                                    </div>
                          
                                </div>
                               
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-3">
                                        <label>Category <span class="text-danger">*</span></label>
                                        <select class="form-control" style={{cursor:"pointer"}} id="category_id" onChange={handleInput} value={productDataById.category_id}>
                                        <option value="0" selected>Select...</option>
                                            {categoryData.map(category=>{
                                                if(category.status === "1")
                                                return (<option value={category.id} selected={category.id===productDataById.category_id?"selected":""}>{category.name}</option>)

                                            })}
                                        </select>
                                    </div>
                                   
                                    <div class="col-md-6 col-lg-3 mt-2 mt-md-0">
                                        <label>Manufacturer <span class="text-danger">*</span></label>
                                        <select class="form-control" style={{cursor:"pointer"}} id="manufacturer_id"  onChange={handleInput} value={productDataById.manufacturer_id}>
                                        <option value="0" selected>None</option>
                                            {manufactureData.map(manufacture=>{
                                                if(manufacture.status===1)
                                                return(<option value={manufacture.id} selected={manufacture.id===productDataById.manufacturer_id?"selected":""}>{manufacture.name}</option>)
                                            })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-md-12">
                                        <label>Internal Notes <small>(Not shown to customer)</small> </label>
                                        <textarea class="form-control" rows="4" id="internal_notes" value={productDataById.internal_notes} onChange={handleInput} ></textarea>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 text-md-right">
                                        {/* <button type="button" class="btn btn-outline-secondary btn-lg"  
                                       onClick={()=>props.pageReDirectAction("product","add")}
                                        // onClick={goToParentPage}
                                        
                                        >Return To Product Manager</button> */}
                                        {/* <button type="reset" class="btn btn-primary btn-lg ml-3"  
                                        disabled={submitCount===0?needAction===true?false:true:true} onClick={submitAction} > 
                                        {actionType==="add"?"Add Product":"Update Product"}</button> */}

                                        <button className={(needAction===true && flag === 0)?"btn btn-primary btn-lg ml-3":"btn btn-primary btn-lg ml-3"} 
                                           style={{cursor:"pointer"}} disabled={submitCount===0?(needAction===true && flag === 0)?false:true:true} onClick={submitAction}>
                                            {actionType==="add"?"Add ":"Update Product"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
        </div>
    )
}

const mapStateToProps = (state)=> ({
    productData:state.productData,
    categoryData:state.categoryData
})

export default connect(mapStateToProps ,{
       //product actions
    createProductAction ,
    updateProductAction ,
    deleteProductAction ,
    getAllProductAction,
    getSpecifiedProductAction,
    getAllSpecifiedSkuProductList,

    //page Redirects action
    pageReDirectAction,
    subPageReDirectAction,
    //category Data
    getAllCategoriesAction,

    // handleinput 
    handleInputAction,
    handleTagAction

})(GeneralSettings)


