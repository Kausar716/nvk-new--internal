/* eslint-disable no-unused-vars */
import React,  {useState } from 'react' ;
// import {Table} from 'reactstrap'
import {connect} from "react-redux";
import ActionModal from '../Modal/ActionModal'
import {useHistory} from "react-router-dom"
import Loader from './Loader'
import {
    //product actions
    createProductAction ,
    updateProductAction ,
    deleteProductAction ,
    getAllProductAction,
    getSpecifiedProductAction,
    duplicateProduct,

    //page Redirects action
    pageReDirectAction,
    subPageReDirectAction,
    setPageNumber

} from "../../actions/productAction";
import {
    getAllCategoriesAction

} from '../../actions/categoryAction'
//import ReactPaginate from 'react-paginate'
import TablePagination from '../Pagination'

const ProductTable  = (props) => {

    let history = useHistory();
    const [pageSize, setPageSize] =useState(15)


   
    
   
    const [id,setId] = useState(0)
    const [open,setOpen] = useState(false)
    const [message,setMessage] = useState("")
    const [type, setType] = useState("")


    const paginationChange =(event, page)=>{
        props.setPageNumber(page-1)
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
            // history.push({
            //     pathname:`/addProduct/${id}`,
    
            // })
        }
  
       setOpen(false)
       setId(0)
       setType("")
       setMessage("")
   }
   const confirmAction = (id,type,product)=>{
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

   const getSpecifiedProduct =(id,data,value) =>{
   // debugger
     window.scrollTo(100, -100)
        props.showSpecifiedSkuAction(id,"edit","sku")
  
  }
  const handleSkuClick = (productId)=>{
    let actionType="edit"
    let pageToOpen = "sku"
    props.getSpecifiedProductAction(productId,actionType,pageToOpen) 
}

const handleShowPage = (e)=>{
    if(props.productData.pageNumber*Number(e.target.value)>props.productData.pageNumber){
        props.setPageNumber(0)
    }   
        setPageSize(Number(e.target.value))
}
  const getSpecifiedProduct1 =async(id) =>{
    // debugger
      window.scrollTo(100, -100)
      props.showSpecifiedSkuAction(id,"edit","sku")
    //   setTimeout(()=>{
    //     props.showSpecifiedSkuAction(id,"edit","sku")
    //   }, 10000)
        
   
   }
//    const handleEdit=(product)=>{
//         history.push({
//             pathname:`/addProduct/${product.product_id}`,

//         })
//    }

//    const handleDuplicate=(product)=>{
//     history.push({
//         pathname:`/addProduct/${product.product_id}`,


//     })

//    }
   
   const {productData,pageNumber,productDataById,skuData} = props.productData
  // const {productData,pageNumber} = props.productData
    const productPerPage = pageSize;
    const totalLength = productData.length
    const pagesVisited = pageNumber*pageSize;

    //const reverseData = productData.reverse();
    const displayProductList = productData.slice(pagesVisited,pagesVisited+productPerPage)
    const pageCount = Math.ceil(productData.length/productPerPage)
    const {categoryData,subCategoryData,manufactureData} = props.categoryData
    //const {categoryData} = props.categoryData
    console.log("subCategoryData", subCategoryData)
    console.log("manufactureData", manufactureData)
        console.log("displayProductList", displayProductList)
     
    return (
        <>
         <ActionModal cancel={cancel} confirm={confirm} open={open} message={message}/>
         <div className="row_1">

                            <div>
                            <label className="greenText">{"Showing " + (pageNumber>0 ? (pageSize*((pageNumber)))+1 : ((pageNumber)+1))+  "  to  " +  (pageNumber>0 ? (((pageSize*((pageNumber)))+pageSize)>totalLength ? totalLength : ((pageSize*((pageNumber)))+pageSize)) : ((((pageNumber)+1)*pageSize)>totalLength?totalLength:(((pageNumber)+1)*pageSize)))   + "  of   "  +   totalLength }</label>
                            </div>
                    <div >
                        <label className="greenText">Show</label>
                                    <select 
                                        value={pageSize}
                                       
                                        onChange={handleShowPage}
                                        style={{cursor:"pointer"}}
                                        >
                                        {[15, 25, 50, 100, 250,500].map(pageSize => (
                                            <option key={pageSize} value={pageSize}>
                                             {pageSize}
                                            </option>
                                        ))}
                                    </select>
                            </div>

                
                          
                <div >
                    <TablePagination pageChange={paginationChange} pageCount={pageCount} pageNumber={pageNumber+1}/>
                </div>
         </div>
                
      
                      <div className="form-group row mt-3">
                                <div className="col-md-12">
                                    <table id="plantDetails" className="table table-striped w-100">
                                        <thead>
                                            <tr>
                                                <th className="text-nowrap">Status</th>
                                                <th className="text-nowrap">Product ID</th>
                                                <th className="text-nowrap">Product Name</th>

                                                {/* <th className="text-nowrap">Location</th> */}
                                                <th className="text-nowrap">Category</th>
                                                <th className="text-nowrap text-center">SKU Count</th>
                                                {/* <th className="text-nowrap">Sub Category</th> */}
                                                <th className="text-nowrap">Manufacturer</th>

                                                <th className="text-nowrap text-center">On Website</th>
                                                <th className="text-nowrap text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        {
                                        displayProductList.map(product=>{
                                            // console.log(product.manufacturer_id)
                                            // skuData.map(sku=>{
                                            //console.log("cacategoryData",categoryData)
                                            //console.log("categoryDatacategoryDataLENGTH", categoryData.length)
                                            let id2 ="onwebsite1"
                                            
                                            // var categryFData = categoryData.filter(function(categoryData) {
                                            //     return cat=>cat.id===product.category_id
                                            // })

                                            // var abcd =categoryData.filter(cat=>cat.id===product.category_id)
                                            // console.log("abcd,", abcd);


                                             return(
                                            <tr  key={product.product_id}>
                                                <td style={{color: (product.archived===0)?"":"red"}}>{product.archived===0?"Active":"Archived"}</td>
                                                <td>{product.product_id}</td>
                                                <td>{product.name}</td>
                                                {/* <td>--</td>  */}
                                                <td>
                                              
                                                    {/* {categoryData.length>0 ? categoryData.filter(cat=>cat.id===product.category_id)[0]["name"]:""} */}
                                                    {/* {categoryData.length>0 ? categoryData.filter(cat=>cat.id===product.category_id)[0]["name"]:""} */}
                                                    {categoryData.length>0?categoryData.filter(cat=>cat.id===product.category_id)[0]?categoryData.filter(cat=>cat.id===product.category_id)[0]["name"]:"":""}
                                                    {/* {abcd[0].name} */}
                                                    </td>
                                                <td className="text-center"><a href="#" onClick={()=>{handleSkuClick(product.product_id)}}>{product.sku_count}</a></td>
                                               
                                                {/* <td>{product.subcategory_id}</td> */}
                                                <td>
                                              {manufactureData.length>0?manufactureData.filter(manufacturerObj=>(manufacturerObj.id===product.manufacturer_id))[0]?manufactureData.filter(manufacturerObj=>(manufacturerObj.id===product.manufacturer_id))[0].name:"":"" }
                                             
                                              </td>
                                                <td  className="text-center">
                                                    <div className="custom-control custom-checkbox mb-1">
                                                        <input type="checkbox" className="custom-control-input" id={id2.concat(product.product_id)}/>
                                                        <label className="custom-control-label" style={{cursor:"pointer"}} for={id2.concat(product.product_id)}></label>
                                                    </div>
                                                </td>
                                                <td className="text-center">

                                                    <span>
                                                                                                                                                        {/* Add here for path handleEdit(product); */}
                                                            <img src="assets/img/edit.svg" style={{cursor:"pointer"}} alt="" onClick={()=>{ props.getSpecifiedProductAction(product.product_id);
                                                                                                                       // getSpecifiedProduct1(product.product_id);
                                                                                                                    //getSpecifiedProduct(skuData.map(sku=>sku.id), "edit","sku")
                                                                                                                   // props.getAllSpecifiedSkuProductList(product.product_id);
                                                                                                                     }}/>
                                                       
                                                    </span>
                                                    <span>
                                                        {/* <a href="javascript;"> */}
                                                            <img src="assets/img/duplicate.svg" style={{cursor:"pointer"}} alt="" onClick={()=>{confirmAction(product.product_id,"duplicate"); }}/>
                                                        {/* </a> */}
                                                    </span>
                                                    <span>
                                                       
                                                            <img src="assets/img/delete.svg" style={{cursor:"pointer"}} alt="" onClick={()=>confirmAction(product.product_id,"delete")} />
                                                       
                                                    </span>
                                                </td>
                                            </tr>
                                       
                                            )
                                       
                                    })
                                    }
                                            
                                        </tbody>
                                    </table>
                                    <div className="centerItem">
                                    <p >{productData.length===0?props.loaderMessage:""}
                                    {(productData.length===0 && props.loaderMessage === "Loading Data...")?<Loader />:""}
                                    {(productData.length===0 && props.loaderMessage === "No Records Found.")?<Loader />:""}</p>
                                    </div>

                                    {/* <p style={{textAlign:"center",color:"red", display:"flex", marginLeft:"20em"}}>
                                        {productData.length===0?"Product data loading ... " :""}  <Loader /></p> */}
                                </div>
                            </div>
        </>
    )
}


const mapStateToProps = (state)=> ({
    productData:state.productData,
    categoryData:state.categoryData
})
export default connect(mapStateToProps,{
    //product actions
    createProductAction ,
    updateProductAction ,
    deleteProductAction ,
    getAllProductAction,
    getSpecifiedProductAction,
    getAllCategoriesAction,
    duplicateProduct,

    //page Redirects action
    pageReDirectAction,
    subPageReDirectAction,
    setPageNumber

})(ProductTable)
