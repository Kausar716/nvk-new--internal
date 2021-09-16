import React,  { useState , useEffect} from 'react' ;
//import {Button,Badge,Form,Input,FormGroup,CustomInput,Label,Pagination,PaginationItem,PaginationLink,Table} from 'reactstrap'
import {connect} from "react-redux";
// import ReactPaginate from 'react-paginate'
import ActionModal from '../Modal/ActionModal'
import Loader from '../ProductManager/Loader'
//import { useTable, usePagination } from 'react-table'
import {
    //plant actions
    createPlantAction ,
    updatePlantAction, 
    deletePlantAction ,
     getAllPlantAction,
     getSpecifiedPlantAction,
     duplicatePlant,
     setPlantPageNumber,
     plantPageReDirectAction,
    plantSubPageReDirectAction,
    updateCheckBox,
    checkBox,


    

}from "../../actions/plantManagerAction";

import {dPageNumberList} from '../../reducers/listOfNumbers'
import TablePagination from '../Pagination';
import './index.css';
//import GeneralSettings from './GeneralSettings';

const PlantTable=(props)=> {
    const [id,setId] = useState(0)
    const [open,setOpen] = useState(false)
    const [message,setMessage] = useState("")
    const [type, setType] = useState("")
    const [edit,setEditData] = useState("")

    const [pageSize, setPageSize] =useState(15)
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
   

    
    const paginationChange =(event, page)=>{
        props.setPlantPageNumber(page-1)
    }


    const {plantData,plantPageNumber} = props.plantData
    const totalLength = plantData.length
    const plantPerPage = pageSize;
    const pagesVisited = plantPageNumber*pageSize;
    const displayPlantList = plantData.slice(pagesVisited,pagesVisited+plantPerPage)
    const pageCount = Math.ceil(plantData.length/plantPerPage)
    console.log("plantData.length",plantData.length)
    console.log("pageCountpageCount", pageCount)
    const {plantCategoryData} =  props.categoryData
    useEffect(()=>{
        // alert("kk")
        props.getAllPlantAction()

    },[edit])

   const abcd = props.dPageNumberList
   console.log("abcd", abcd)
   const confirmAction = (id,type)=>{
    if(type==="delete"){
        setType(type)
        setMessage("Are you sure you want to delete this plant and its related SKUs?")

    }else{
        setType(type)
        setMessage("Are you sure you want to duplicate this plant and all its related SKU and plant information?")

    }
    setOpen(true)
    setId(id)
}
const handleSkuClick = (plantId)=>{
    let actionType="edit"
    let pageToOpen = "sku"
    props.getSpecifiedPlantAction(plantId,actionType,pageToOpen) 
}
const handleCheckBox =(id,index,type)=>{
    let obj = {}
    // obj[type] = parseInt(displayPlantList[index][type])===1?0:1
    // if(type ==="in_production" &&  obj[type]===0)
    // obj["status"] = 0
    // else obj["status"] =1
    // if(type !=="in_production" &&  obj[type]===1)
    // obj["status"] = 0
    // else obj["status"] =1
    if(type ==="in_production") {
        if (parseInt(displayPlantList[index][type])===1) {
            obj.in_production = 0
            obj.status =0
        }
        else if (parseInt(displayPlantList[index][type])===0) {
            obj.in_production = 1
            obj.status =1
        }
    }
    else if(type ==="archived") {
        if (parseInt(displayPlantList[index][type]) ===1) {
            obj.archived = 0
            obj.status =1
        }
        else if (parseInt(displayPlantList[index][type]) ===0) {
            obj.archived = 1
            obj.status =0
        }
    }
    else if(type ==="discontinued") {
        if (parseInt(displayPlantList[index][type]) ===1) {
            obj.discontinued = 0
            obj.status =1
        }
        else if (parseInt(displayPlantList[index][type]) ===0) {
            obj.discontinued = 1
            obj.status =0
         
        }
    }

    props.checkBox(id,((15*plantPageNumber)+index),type,obj)
    // console.log(plantData[((15*plantPageNumber)+index)])
    props.updateCheckBox(id,index,type,obj)

}
const handleShowPage = (e)=>{
    if(props.plantData.plantPageNumber*Number(e.target.value)>props.plantData.plantPageNumber){
        props.setPlantPageNumber(0)
    }   
        setPageSize(Number(e.target.value))
}

    return (

        <div>
            
              <ActionModal cancel={cancel} confirm={confirm} open={open} message={message}/>


              <div className="row_1">

                    <div>
                    <label className="greenText">{"Showing " + (plantPageNumber>0 ? (pageSize*((plantPageNumber)))+1 : ((plantPageNumber)+1))+  "  to  " +  (plantPageNumber>0 ? (((pageSize*((plantPageNumber)))+pageSize)>totalLength ? totalLength : ((pageSize*((plantPageNumber)))+pageSize)) : ((((plantPageNumber)+1)*pageSize)>totalLength?totalLength:(((plantPageNumber)+1)*pageSize)))   + "  of   "  +   totalLength }</label>
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
                    <TablePagination pageChange={paginationChange} pageCount={pageCount} pageNumber={plantPageNumber+1}/>
                    </div>

                </div>
                            <div className="form-group row mt-3">
                                <div className="col-md-12">
                                    <table id="plantDetails" className="table table-striped w-100">
                                        <thead>
                                            <tr>
                                                <th className="text-nowrap">Status</th>
                                                <th className="text-nowrap text-center">Plant ID</th>
                                                <th className="text-nowrap">Plant Name</th>
                                                <th className="text-nowrap">Category</th>
                                                <th className="text-nowrap">SKU Count</th>
                                                <th className="text-nowrap text-center">In Production</th>
                                                <th className="text-nowrap text-center">Discontinued</th>
                                                <th className="text-nowrap text-center">Archived</th>
                                                <th className="text-nowrap text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        {displayPlantList.map(({id,status, plantName, location, category,sku_count, onWebsite, PrintCatalog,plant_name, in_production, discontinued, archived, patent,category_id,plant_id,genus},index)=>{
                                             let id2 ="discontinued"
                                             let id3 ="archived"
                                             let id4 ="in_production"
                                             console.log(status)
                                             return(     
                                            <tr>
                                                <td style={{color:parseInt(archived)===0 ? "black" :"red"}}>{parseInt(archived) === 0 ?"Active":"Archived"}</td>
                                                <td className="text-nowrap text-center">{plant_id}</td>
                                                <td>{plant_name.split("-")[0]}</td>
                                                <td>
                                                    {/* backgroundColor:product.archived == 0?"#ffffff":"#cccccc"{plantCategoryData.length>0?plantCategoryData.filter(cat=>cat.id===category_id)[0]["name"]:""} */}
                                                    {plantCategoryData.length>0?plantCategoryData.filter(cat=>cat.id===category_id)[0]?plantCategoryData.filter(cat=>cat.id===category_id)[0]["name"]:"":""}
                                                </td>
                                                <td className="text-center"><a href="#" onClick={()=>{handleSkuClick(plant_id)}}>{sku_count}</a></td>
                                                <td className="text-center">
                                                <div className="custom-control custom-checkbox mb-1">
                                                        <input type="checkbox"  className="custom-control-input" checked={parseInt(in_production)===1?"checked":""} id={id4+"_"+plant_id} onChange={()=>handleCheckBox(plant_id,index,id4)}/>
                                                        <label className="custom-control-label" style={{cursor:"pointer"}} for={id4+"_"+plant_id}></label>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <div className="custom-control custom-checkbox mb-1">
                                                        <input type="checkbox"  className="custom-control-input" checked={parseInt(discontinued)===1?"checked":""} id={id2+"_"+plant_id} onChange={()=>handleCheckBox(plant_id,index,id2)}/>
                                                        <label className="custom-control-label" style={{cursor:"pointer"}} for={id2+"_"+plant_id}></label>
                                                    </div>
                                                </td>


                                                <td className="text-center">
                                                    <div className="custom-control custom-checkbox mb-1">
                                                            <input type="checkbox"  className="custom-control-input" checked={parseInt(archived)===1?"checked":""} id={id3+"_"+plant_id} onChange={()=>handleCheckBox(plant_id,index,id3)}/>
                                                            <label className="custom-control-label" style={{cursor:"pointer"}} for={id3+"_"+plant_id}></label>
                                                    </div>
                                                </td>


                                                <td className="text-center">
                                                    <span>
                                                        {/* <a href="javascript;"> */}
                                                            <img src="assets/img/edit.svg" alt="" onClick={()=>props.getSpecifiedPlantAction(plant_id)} style={{cursor:"pointer"}}/>
                                                        {/* </a> */}
                                                    </span>
                                                    <span>
                                                        {/* <a href="javascript;"> */}
                                                            <img src="assets/img/duplicate.svg" alt="" onClick={()=>{confirmAction(plant_id,"duplicate"); }} style={{cursor:"pointer"}} />
                                                        {/* </a> */}
                                                    </span>
                                                    <span>
                                                        {/* <a href="javascript;"> */}
                                                            <img src="assets/img/delete.svg" alt="" onClick={()=>confirmAction(plant_id,"delete")} style={{cursor:"pointer"}}/>
                                                        {/* </a> */}
                                                    </span>
                                                </td>
                                            </tr>)
                                        })}
                                

                                        </tbody>
                                    </table>
                                    <div className="centerItem">
                                    <p >{plantData.length===0?props.loaderMessage:""}
                                    {(plantData.length===0 && props.loaderMessage === "Loading Data...")?<Loader />:""}
                                    {(plantData.length===0 && props.loaderMessage === "No Records Found.")?<Loader />:""}</p>
                                    </div>
                                   
                                   
                                </div>
                            </div>
        </div>
    )
}

const mapStateToProps = (state)=> ({
    plantData:state.plantData,
    categoryData: state.categoryData

})
export default connect(mapStateToProps,{  //plant actions
    createPlantAction ,
    updatePlantAction, 
    deletePlantAction ,
     getAllPlantAction,
     getSpecifiedPlantAction,
     duplicatePlant,
     setPlantPageNumber,
     dPageNumberList,
     updateCheckBox,
     plantPageReDirectAction,
     checkBox,
     plantSubPageReDirectAction
    })(PlantTable)
