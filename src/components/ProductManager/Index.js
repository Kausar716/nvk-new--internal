/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react' ;
import {connect} from "react-redux";
import { Tab, Tabs, TabList } from 'react-tabs';
 import GeneralSettings from './GeneralSettings'
 import SkuList from './SkuList'
import ProductTable from './ProductTable'
import ActionModal from '../Modal/ActionModal'
import Loader from '../ProductManager/Loader'
import Autosuggest from 'react-autosuggest';
import { Link } from "react-router-dom";

import './style.css';
import {
    //product actions
    createProductAction ,
    updateProductAction ,
    deleteProductAction ,
    getAllProductAction,
    getSpecifiedProductAction,
    duplicateProduct,
    getAllSpecifiedSkuProductList,
    handleManufactureData,
    setPageNumber,
    resetProductRadio,

    //page Redirects action
    pageReDirectAction,
    subPageReDirectAction,
    handleSelectedCategory,

    //category Filter
    handleCategory,

    serachProduct


} from "../../actions/productAction";
import {
    getAllCategoriesAction,
    getAllSubCategoriesAction,

    //manufacture actions
    getAllManufactureAction,
    

} from '../../actions/categoryAction'

import ModalData from '../Modal'


const  ProductManagement = (props) =>{
    const [tabIndex, setTabIndex]=useState(0)
    const [category,setCategory] = useState("All")
    const [subCategory,setsubCategory] = useState(0)
    const [disable,setDisable] = useState(false)
    const [id,setId] = useState(0)
    const [categoryId,setCategoryId] = useState(0)
    const [open,setOpen] = useState(false)
    const [message,setMessage] = useState("")
    const [type, setType] = useState("")
    const [filterSubCategory, setFilterSubCategory]= useState([])
    const [inputValue, setInputValue] = useState("");
    const [selectedRadio,setRadio] =useState("all")
    const product_idFromGeneral =props.temp.productData.ae_product_id
    const [loader,setLoader] = useState(false)
    const [loaderMessage,setLoaderMessage]=useState("Loading Data...")
    //const {categoryData,subCategoryData} = props.categoryData
    const [value,setValue] = useState("")
    const [suggestions,setSuggestions] = useState([])

    const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : productData.filter(lang =>
          lang.name.toLowerCase().includes(inputValue)
        );
    };
    const getSuggestionValue = suggestion => suggestion.name;

      // Use your imagination to render suggestions.
    const renderSuggestion = suggestion => (
        <span>
          {suggestion.name}
        </span>
    );
    const onChange = (event, { newValue }) => {
        let {productRadioButton} = props.productData.productRadioButton
        setValue(newValue)
        props.setPageNumber(0)
        setLoaderMessage("No Records Found.")
        props.serachProduct({product: newValue, option: productRadioButton, category: selectedCategory,manufactureId:props.manufacturer_id})
        setInputValue(newValue);
        // setLoaderMessage("No Records Found...")
        // props.serachPlant({plant: newValue, option: selectedRadio, category: categoryId})
        // setInputValue(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };
  
    // Autosuggest will call this function every time you need to clear suggestions.
    const  onSuggestionsClearRequested = () => {
      setSuggestions([]);
    };

        useEffect(()=>{
            props.getAllProductAction()
            props.getAllCategoriesAction()
            props.getAllSubCategoriesAction()
            props.getAllManufactureAction()
            //props.getAllSpecifiedSkuProductList()

        },[])

        const handleCategoryData =(e)=>{
            let temSub =[];
            let {productRadioButton} = props.productData.productRadioButton
           setLoaderMessage("No Records Found.")
           props.setPageNumber(0)
            //console.log("propsSubCategory", props.categoryData.subCategoryData)
            if(e.target.id ==="category"){
                // props.handleCategory(e.target.value,"0")
                if(e.target.value==="All"){
                 
                    // props.serachProduct({product: inputValue, option: selectedRadio, category: e.target.value,manufactureId:props.manufacturer_id})
                    // setDisable(true)
                    
                }else{
                    // props.serachProduct({product: inputValue, option: selectedRadio, category: e.target.value,manufactureId:props.manufacturer_id})

                    // console.log("abcdfrf", e.target.value)
                    // props.handleCategory(e.target.value,"0")
                    // setDisable(false)
                }

                props.handleSelectedCategory(e.target.value)
                props.serachProduct({product: inputValue, option: productRadioButton, category: e.target.value,manufactureId:props.manufacturer_id})
                // temSub = props.categoryData.subCategoryData.filter(cat=>JSON.stringify(cat.category_id)===e.target.value)
                // console.log("temSub", temSub)
               
                //?subCategoryData.filter(sub=>sub.id===product.subcategory_id)
                setCategory(e.target.value)
                // setFilterSubCategory(temSub)

                
            }

            else if(e.target.id ==="subcategory"){
                console.log("filterSubCategory", e.target.value)
                props.handleCategory(filterSubCategory,e.target.value)
                setsubCategory(e.target.value)

            }
        }
        const handleManufactureData =(e)=>{

            console.log(e.target.value)
            setLoaderMessage("No Records Found.")
            props.setPageNumber(0)
            let selectedId = parseInt(e.target.value)
            props.handleManufactureData(selectedId)
            props.serachProduct({product: inputValue, option: productRadioButton, category: props.productData.selectedCategory,manufactureId:e.target.value === "0" ?"None":parseInt(e.target.value)})
           
        }

        const resetFilter = () =>{
            setLoaderMessage("Loading Data...")
            setLoader(true)
            setCategory("All")
            setCategoryId("0")
            setsubCategory("0")
            setInputValue("")
            // setRadio("all")
            setValue("")
            props.resetProductRadio()
            let response = props.getAllProductAction()
            response.then(res=>{
                setLoader(false)
            })
           // props.handleCategory(category,subCategory) 

        }

        const cancel = ()=>{
           setOpen(false)
           setId(0)
           setType("")
           setMessage("")
            
        }
        const confirm = ()=>{
            if(type==="delete"){
               props.deleteProductAction(id)
   
            }else{
                props.duplicateProduct(id)
            }
      
           setOpen(false)
           setId(0)
           setType("")
           setMessage("")
       }

       const confirmAction = (id,type)=>{
           if(type==="delete"){
               setType(type)
               setMessage("Are you sure you want to delete this product and its related SKUs?")
   
           }else{
               setType(type)
               setMessage("Are you sure you want to duplicate this product and all its related SKU and product information?")
   
           }
           setOpen(true)
           setId(id)
       }


       const getValue = (e)=>{
        console.log(e.target.value)
        console.log(selectedCategory)
        console.log(props.manufacture_id)
        let {productRadioButton} = props.productData.productRadioButton
        props.serachProduct({product: e.target.value, option: productRadioButton, category: selectedCategory,manufactureId:props.manufacturer_id})
        setInputValue(e.target.value);
    }
       const radioSearchAction =(e)=>{
        console.log(e.target.id)
        props.setPageNumber(0)
        //props.radioSearch(e.target.id)
        props.serachProduct({product: inputValue, option: e.target.id, category: selectedCategory,manufactureId:props.manufacturer_id})
        setRadio(e.target.id)

    }
    const searchBasedOnCategory = (e) =>{
        let {productRadioButton} = props.productData.productRadioButton
        props.serachProduct({product: inputValue, option: productRadioButton, category: e.target.value})
        setCategoryId(e.target.value)
        // searchCategoryApply()
    }

    
        // eslint-disable-next-line no-unused-vars
        const {pageToOpen,actionType,productDataById, skuDataById,productData,selectedCategory,productRadioButton} = props.productData
        const {categoryData,subCategoryData,manufactureData} = props.categoryData
        console.log(props.temp)
        console.log(selectedCategory)
        console.log(props.manufacturer_id)
        const inputProps = {
            placeholder: 'Product Name',
            value,
            className:" form-control btn btn-search",
        id:"add-icon-search",
        style: {position:"relative",border:"1px solid gray",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:6,height:"41.5px",fontSize:"15px",textDecoration:"none"},
            onChange: onChange
        };
        console.log(inputProps)
  
    return (
        <div>
            <ModalData/>
             <ActionModal cancel={cancel} confirm={confirm} open={open} message={message}/>
             {pageToOpen === "product" &&
             <div>
            <div className="contentHeader bg-white d-flex justify-content-between align-items-center">
				<h1 className="page-header mb-0">
                <img src="assets/img/product-green.svg" alt=""/>
                    Product Manager</h1>
			    <div class="topbarCtrls mt-3 mt-md-0">
                    {/* <Link to="/addProduct">  */}
                    <a href="#" class="btn active">
                        <span class="d-flex align-items-center text-left" onClick={()=>props.pageReDirectAction("general","add")}>
                            <img src="assets/img/Product_small-white.svg" alt=""/>
                            <span class="ml-2"><b>Add Product</b></span>
                        </span>
                    </a>
                    {/* </Link> */}
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
                                    <label for="Category">Category</label>

                                <select className="form-control"  id="category" style={{cursor:"pointer"}} onChange={handleCategoryData} value={parseInt(selectedCategory)}   >
                                    {/* <option value="All" selected={category==="All"?"selected":""}>All</option> */}
                                    <option value="All">All</option>
                                    {categoryData.map(categoryData=>{
                                        if(categoryData.status === "1")
                                        return(<option value={categoryData.id} key={categoryData.id} selected={category===categoryData.id?"selected":""}>{categoryData.name}</option>)
                                    })
                                    }
        
                
                                </select>
                                </div>
                                {/* <div className="col-md-5 col-lg-5 mt-2 mt-md-0">
                                    <label for="subCategory">Sub Category</label>

                                 <select className="form-control"   disabled={disable?true:false}   id="subcategory" onChange={handleCategoryData}  >
                                <option  value="0" selected={subCategory==="0"?"selected":""}>None</option>
                                    {filterSubCategory.map(subCategoryData=>{
                                        return(<option selected={subCategory===subCategoryData.id?"selected":""} value={subCategoryData.id} key={subCategoryData.id}>{subCategoryData.name}</option>)
                                    })
                                    }
                                        
                                </select>

                                </div> */}
                                 <div className="col-md-5 col-lg-5 mt-2 mt-md-0">
                                    <label for="subCategory">Manufacturer</label>

                                 <select className="form-control" style={{cursor:"pointer"}}  disabled={disable?true:false}   id="subcategory" onChange={handleManufactureData} value={parseInt(props.manufacturer_id)}   >
                                <option  value="0" selected={subCategory==="0"?"selected":""}>None</option>
                                    {manufactureData.map(manufactureObj=>{
                                        if(manufactureObj.status === 1)
                                        return(<option  value={manufactureObj.id} key={manufactureObj.id}>{manufactureObj.name}</option>)
                                    })
                                    }
                                        
                                </select>

                                </div> 
                                
                                
                                <div className="col-md-2 col-lg-2">
                                    <p onClick={resetFilter} className="d-block  resetlink">Reset</p>
                                    {/* <a href="javascript:;" onClick={handleFilter} className="d-block topSpace">Search</a> */}
                                </div>
                                
                                
                            </div>
                            <div className="form-group row">
                                    <div className="col-md-5 col-lg-5">
                                        <label for="plantSearch">Product Search</label>
                                        {/* <div className="searchInput">
                                            <button type="submit" className="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            {/* <input type="text" className="form-control" placeholder="Search"/> */}
                                            {/* <input className="form-control" 
                                                    type="text" 
                                                    autocomplete={"off"}
                                                    placeholder="Search" 
                                                    value={inputValue}
                                                    onChange={getValue} 
                                                    id="search"/> */}
                                        {/* </div>  */}
                                        <div className="searchInput" style={{height: "40px"}}>
                                           
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
                                                </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-12">
                                        <div className="form-check form-check-inline">
                                        <input className="form-check-input"  type="radio" style={{cursor:"pointer"}} checked={productRadioButton ==="active"?"checked":""} name="radio1" onClick={radioSearchAction} id="active"/>
                                            {/* <input className="form-check-input" type="radio" name="radio_default_inline" id="activePlants" value=""/> */}
                                            <label className="form-check-label" for="activePlants" >Active</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" style={{cursor:"pointer"}} name="radio1" checked={productRadioButton ==="archive"?"checked":""} onClick={radioSearchAction} id="archive"/>
                                            {/* <input className="form-check-input" type="radio" name="radio_default_inline" id="archivedPlants" value=""/> */}
                                            <label className="form-check-label" for="archivedPlants">Archived</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                        <input type="radio" name="radio1"checked={productRadioButton ==="all"?"checked":""}style={{cursor:"pointer"}}  onClick={radioSearchAction} id="all"/>
                                            {/* <input className="form-check-input" type="radio" name="radio_default_inline" id="allPlants" value=""/> */}
                                            <label className="form-check-label" for="allPlants"> &nbsp;All</label>
                                        </div>
                                    </div>
                                </div>
                             <hr/>
                             {/* <div className="centerItem">
                             {loader?  <p > {"Resetting ... " }<Loader /></p>:null}
                             </div> */}
                                    <ProductTable loaderMessage={loaderMessage} />
                            </div>
                        </div>
                    </div>
                </div> 
                </div>}


            {(pageToOpen === "general" || pageToOpen === "sku") &&
                    <div className={`show_add_product, add_product_page`}>


                            <div> 
                                <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center">
                                    <h1 class="page-header mb-0"><img src="assets/img/product-green.svg" alt=""/> {actionType === "add"?"Add":"Edit"} Product</h1>
                                    {/* <span>
                                                    <button type="button" class="btn btn-primary  btn-lg"    
                                            onClick={()=>props.pageReDirectAction("product","add")}>Return To Product Manager</button>                                                    
                                                    </span> */}
                                    <div class="topbarCtrls mt-3 mt-md-0" onClick={()=>props.pageReDirectAction("product","add")}>
                                        <a href="#" class="btn" >
                                        <span class="d-flex align-items-center text-left">
                                        <span class="ml-2"><b>Return To Product Manager</b></span>
                                        </span>
                                        </a>
                                    </div>
                                </div>
                                    <div class="px-md-3 mt-3">
                                        <div class="px-3 py-3 mb-3 bg-white">
                                            <div class="row align-items-center">
                                                <div class="col-md-6">
                                                    <h2 >Product ID 
                                                        {/* //{product_idFromGeneral||productDataById.product_id} */}
                                                        <snap className="text-green"> {props.temp.productData.ae_product_id ==="" ? productDataById.product_id?productDataById.product_id:"HG": product_idFromGeneral}</snap>
                                                    </h2>
                                                </div>
                                                
                                               <div class="col-md-6 d-flex justify-content-md-end">
                                                <span onClick={()=>props.pageReDirectAction("product","add")} 
                                                style={{textDecoration:"none",cursor:"pointer"}}  className="right_float">
                                                    <i class='bx bx-arrow-back' ></i>
                                                    {/* <label className="trashIcon" style={{marginLeft:"-49px"}}>GoBack</label> */}
                                                    </span>
                                                    {actionType !== "add" ?<a href="#" class="mx-2">
                                                        <img src="assets/img/copy-ic.svg" alt=""  onClick={()=>{confirmAction(productDataById.product_id,"duplicate"); }}/>
                                                    </a>:""}
                                                    {actionType !== "add" ? <a href="#" class="mx-2">
                                                        <img src="assets/img/trash-ic.svg" alt="" onClick={()=>confirmAction(productDataById.product_id,"delete")}/>
                                                    </a>:""}
                                                   
                                                    {/* <a href="#" class="mx-2">
                                                        <img src="assets/img/left-double-arrow.svg" alt=""/>
                                                    </a> */}
                                                </div>
                                            </div>
                                        </div>

                                        {/* className={pageToOpen === "general" ? "selected_link" : "normal_link" }
                                        className={pageToOpen === "sku" ? "selected_link" : "normal_link" } 
                                        selectedIndex={this.props.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}
                                         const [tabIndex, setTabIndex]=useState(0)
                                        */}
                                        {/* <Tabs  >
                                            <TabList >
                                                <Tab onSelect={pageToOpen === "general"} onClick={()=>props.subPageReDirectAction("general")} >General</Tab>
                                                <Tab onSelect={pageToOpen === "sku"} onClick={()=>props.subPageReDirectAction("sku")}>SKU Lists</Tab>
                                            </TabList>

                                        </Tabs> */}

                                                <div style={{clear:"both"}}></div>

                                                <div className="product_add_navigation">
                                                    <span  style={{ marginRight: "25px"}} id="general" className={pageToOpen === "general" ? "selected_link" : "normal_link" } onClick={()=>props.subPageReDirectAction("general")}>General</span>
                                                    <span  style={{ marginLeft: "-25px"}} id="skuList" className={pageToOpen === "sku" ? "selected_link" : "normal_link" } onClick={()=>{if(actionType !== "add"){props.subPageReDirectAction("sku")}}}>SKU Lists</span>
                                                    
                                                </div>
                                    </div>
                            </div>
                    </div>
                }

            {pageToOpen === "general" && <GeneralSettings />}
            {pageToOpen === "sku" && <SkuList/> }
        </div>
       
        )
    }



const mapStateToProps = (state)=> ({
    productData : state.productData,
    categoryData: state.categoryData,
    manufacturer_id:state.productData.manufacturer_id,
    temp:state,
})

export default connect(mapStateToProps,
{
//product actions
createProductAction ,
updateProductAction ,
deleteProductAction ,
getAllProductAction,
getSpecifiedProductAction,
duplicateProduct,
handleSelectedCategory,
setPageNumber,
resetProductRadio,
//page Redirects action
pageReDirectAction,
subPageReDirectAction,

//category Data
getAllCategoriesAction,

//sub category Data
getAllSubCategoriesAction,

// manufacture data
getAllManufactureAction,

//filter catgeory
handleCategory,

getAllSpecifiedSkuProductList,
handleManufactureData,
serachProduct
}
)(ProductManagement)
