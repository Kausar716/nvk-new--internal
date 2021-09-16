/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from 'react'
import {connect} from "react-redux";
import * as MdIcons from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from '../ProductManager/Loader'
import Sortable from 'sortablejs';

import 
    {
        getAllSubAttribute, 
        handleAttributeDragDrop,
        handleAttributeDragSort,
        handleAttributeDelete,
        handleZoneInputAction,
        handleAddZone, 
        showSubSubAttribute, 
        handleSubAttributeUpdate, 
        handleZoneInputAction2,
        getAllLocationTypesSubAttribute
    } 
from '../../actions/attributeAction'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
class InventoryLocation extends Component {
    constructor(props){
        super()
        this.state={
            errorObj:{
                locationName:0,
                locationShortCode:0
            },
            sortId: 0,
            activeId: 0,
            isEditing:false,
            locationName: '',
            locationShortCode: "",
            locationTypevalue: 0,
            locationAddress: "",
            locationCity: "",
            locationState: 0,
            locationCountry: 0,
            locationzip: "",
            locationlatlong: "",
            loading:false,
            allStates:{},
            btnLabelAdd:'Add New Location Type',
            btnLabelUpdate: 'Update Location Type',
            btnLabelCancel:'Cancel',
            locationTypevaluechild:0,
            deleteon:false,
            active:[],inactive:[]
        }
                
    }
    getCatgoryData = ()=>{
        let data = {};
        let active= this.props.zoneCategoryList.filter(data=>data.status ==1)
       let inactive=this.props.zoneCategoryList.filter(data=>data.status ==0)
        this.setState({active:active,inactive:inactive,loading:true})
    }
    onDragOver = (ev)=>{
        ev.preventDefault();
    }
    startIDData  =(e)=>{
        this.setState({selectedID:e.item.id})
    }
    onAddData = (evt)=>{
        console.log(evt)
        evt.preventDefault()
    
    //     const referenceNode = (evt.nextSibling && evt.nextSibling.parentNode !== null) ? evt.nextSibling : null; 
    //  evt.from.insertBefore(evt.item, null); 
    
    }

    componentDidMount(){
        // this.props.getAllSubAttribute(5)
        this.props.getAllLocationTypesSubAttribute()
        this.props.getAllSubAttribute(18).then(()=>{
            // alert("ji")
            this.getCatgoryData()
        })
        // this.props.getAllSubAttribute(14)

    }
    id2List = {
        droppable: 'active',
        droppable2: 'inactive'
    };
    getList = id => {
        console.log(this.state[this.id2List[id]])
        return this.state[this.id2List[id]]
    }
    onDragEnd = result => {
        // alert(result)
       
        const { source, destination } = result;
        console.log(destination)
        // dropped outside the list
        console.log(result)
        if(destination == null)
        return
        if (destination.droppableId=="delete") {
            this.setState({deleteon:true})
            confirmAlert({
                title: 'Delete Inventory Location ',
                message: 'Are you sure want to delete the Inventory Location ?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => {this.onDeleteConfirm(this.state.selectedID)}
                  },
                  {
                    label: 'No',
                    onClick: () => { this.setState({deleteon:false})}
                  }
                ]
              });
            return;
        }
    
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );
    
            let state = { items };
    
            if (source.droppableId === 'droppable2') {
              
                if(result.destination.index> result.source.index)
            this.props.handleAttributeDragSort(this.state.inactive[result.source.index].id,this.state.inactive[result.destination.index].id,"down")
            else  this.props.handleAttributeDragSort(this.state.inactive[result.source.index].id,this.state.inactive[result.destination.index].id,"up")
            this.setState({inactive:items});
            }else{
              
                        //        if(evt.willInsertAfter ==true)
            if(result.destination.index> result.source.index)
            this.props.handleAttributeDragSort(this.state.active[result.source.index].id,this.state.active[result.destination.index].id,"down")
            else  this.props.handleAttributeDragSort(this.state.active[result.source.index].id,this.state.active[result.destination.index].id,"up")
            this.setState({active:items});
            }
            
        } else {
           
            if (source.droppableId === 'droppable2') {
            let task= this.state.inactive.filter(data=>data.id ==this.state.inactive[source.index]["id"])
                      if(task.length > 0){
                        this.props.handleAttributeDragDrop(task[0]).then(data=>{
                                            this.props.getAllSubAttribute(18).then(()=>{
                                // alert("ji")
                                this.getCatgoryData()
                            })
                    })
                }
            }else{
                console.log(source.droppableId)
                let task= this.state.active.filter(data=>data.id ==this.state.active[source.index]["id"])
                console.log(task)
                if(task.length > 0){
                    this.props.handleAttributeDragDrop(task[0]).then(data=>{
                        this.props.getAllSubAttribute(18).then(()=>{
                        // alert("ji")
                        this.getCatgoryData()
                    })
              })
          }
    
            }
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
    
            this.setState({
                active: result.droppable,
                inactive: result.droppable2
            });
        }
    };
    onDragStart =(e)=>{
        // alert("hi")
        this.setState({selectedID:e.draggableId})
        console.log(e)
    }
    onDelete =(ev)=>{
        let id= this.state.selectedID
        confirmAlert({
            title: 'Delete Location Type',
            message: 'Are you sure want to delete the Location Type?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {this.onDeleteConfirm(id)}
              },
              {
                label: 'No'
              }
            ]
          });
    }
    onDeleteConfirm=(id)=>{
        let result= this.props.handleAttributeDelete(id)
        this.setState({deleteon:true})
        result.then(res=>{
            this.props.getAllSubAttribute(18).then(()=>{
                // alert("ji")
                this.getCatgoryData()
            })
            this.setState({deleteon:false})
         
        })
    }
    handleZoneInputAction = (e)=>{
        // debugger;
        this.setState({
            locationShortCode:e.target.value
        })
        
        let errorObj=this.state.errorObj
        if(e.target.name === "locationShortCode"){
        errorObj.locationShortCode=0
        this.setState({errorObj})}

        this.props.handleZoneInputAction("locationShortCode",e.target.value)
    }

    handleZoneInputAction2 = (e)=>{
        this.setState({
            locationName:e.target.value
        })
        let errorObj=this.state.errorObj
        if(e.target.name === "locationName"){
            errorObj.locationName=0
            this.setState({errorObj})}


        this.props.handleZoneInputAction2("locationName",e.target.value)

    }
    handleInputlocationTypevalue = (e)=>{
        this.setState({locationTypevalue :e.target.value})
        this.props.handleZoneInputAction2("locationTypevalue",e.target.value)
    }
    handleInputlocationTypevalueChild = (e)=>{
        this.setState({locationTypevalueChild :e.target.value})
        this.props.handleZoneInputAction2("locationTypevalueChild",e.target.value)
    }
    handleInputlocationAddress = (e)=>{
        this.setState({locationAddress :e.target.value})
        this.props.handleZoneInputAction2("locationAddress",e.target.value)
    }
    handleInputlocationCity = (e)=>{
        this.setState({locationCity :e.target.value})
        this.props.handleZoneInputAction2("locationCity",e.target.value)
    }
    handleInput = (e)=>{
        this.setState({locationAddress :e.target.value})
        this.props.handleZoneInputAction2("locationAddress",e.target.value)
    }
    handleInputlocationState = (e)=>{
        this.setState({locationState :e.target.value})
        this.props.handleZoneInputAction2("locationState",e.target.value)
    }
    handleInputlocationCountry = (e)=>{
        this.setState({locationCountry :e.target.value})
        this.props.handleZoneInputAction2("locationCountry",e.target.value)
    }
    handleInputloationzip = (e)=>{
        this.setState({locationzip :e.target.value})
        this.props.handleZoneInputAction2("locationzip",e.target.value)
    }
    handleInputlocationlatlong = (e)=>{
        this.setState({locationlatlong :e.target.value})
        this.props.handleZoneInputAction2("locationlatlong",e.target.value)
    }

    handleAddCategory = (e)=>{
    
        let zoneObj={}
        zoneObj.attribute_id=18   
        zoneObj.value = this.state.locationName    
        zoneObj["childrens"] =[{
                'children_name':'Short Code',
                'children_value':this.state.locationShortCode
            },
            {
                'children_name':'Location Type',
                'children_value':this.state.locationTypevalue
            },
            {
                'children_name':'Address',
                'children_value':this.state.locationAddress
            },
            {
                'children_name':'City',
                'children_value':this.state.locationCity
            },
            {
                'children_name':'State',
                'children_value':this.state.locationState
            },
            {
                'children_name':'Country',
                'children_value':this.state.locationCountry
            },
            {
                'children_name':'Zip',
                'children_value':this.state.locationzip
            },
            {
                'children_name':'Lat/Long',
                'children_value':this.state.locationlatlong
            },
            ]
        zoneObj.status=1
        if(this.validate()){
            let result = this.props.handleAddZone(zoneObj)
            result.then(res=>{
                this.props.getAllSubAttribute(18).then(()=>{
                    // alert("ji")
                    this.getCatgoryData()
                })
            })
    
            this.setState({
                locationName: '',
                locationShortCode: "",
                locationTypevalue: 0,
                locationAddress: "",
                locationCity: "",
                locationState: 0,
                locationCountry: 0,
                locationzip: "",
                locationlatlong: "",
                isEditing:false,
                selectedID:'',
            })
        }        
    }
    validate = ()=>{
        let errorObj = this.state.errorObj
        if(this.state.locationName.length === 0){
            errorObj.locationName=1
            this.setState({errorObj})
            return false
        }
        if(this.state.locationShortCode.length < 6){
            errorObj.locationShortCode=1
            this.setState({errorObj})
            return false
        }
        return true
        
    }


    handleEditClick2 =(t)=> {
        // debugger;  
        this.setState({
            locationName: t.value,
            locationShortCode:t.sub_attributeschild[7].value,
            locationTypevalue:t.sub_attributeschild[6].value,
            locationAddress:t.sub_attributeschild[5].value,
            locationCity:t.sub_attributeschild[4].value,
            locationState:t.sub_attributeschild[3].value,
            locationCountry:t.sub_attributeschild[2].value,
            locationzip:t.sub_attributeschild[1].value,
            locationlatlong:t.sub_attributeschild[0].value,
            isEditing:true,
            selectedID:t.id,
        })
        this.props.handleZoneInputAction2("locationName",this.state.locationName)
        this.props.handleZoneInputAction("locationShortCode",this.state.locationShortCode)
        this.props.handleZoneInputAction("locationTypevalue",this.state.locationTypevalue)
        this.props.handleZoneInputAction("locationAddress",this.state.locationAddress)
        this.props.handleZoneInputAction("locationCity",this.state.locationCity)
        this.props.handleZoneInputAction("locationState",this.state.locationState)
        this.props.handleZoneInputAction("locationCountry",this.state.locationCountry)
        this.props.handleZoneInputAction("locationzip",this.state.locationzip)
        this.props.handleZoneInputAction("locationlatlong",this.state.locationlatlong)
        this.props.showSubSubAttribute(t.id)

    }

    handleClear=()=>{
        let errorObj = this.state.errorObj
        errorObj.locationName=0
        errorObj.locationShortCode=0
        this.setState({locationName: '',
            locationShortCode: "",
            locationTypevalue: 0,
            locationAddress: "",
            locationCity: "",
            locationState: 0,
            locationCountry: 0,
            locationzip: "",
            locationlatlong: "", isEditing:false, selectedID:'', errorObj})
    }

    handleAddCategoryUpdate=(e)=>{
        // debugger;
         // this.props.handleSubAttributeUpdate(e.target.id)
         let valueName = this.state.locationName
         let vlocationShortCode = this.state.locationShortCode
         let vlocationTypevalue = this.state.locationTypevalue
         let vlocationAddress = this.state.locationAddress
         let vlocationCity = this.state.locationCity
         let vlocationState = this.state.locationState
         let vlocationCountry = this.state.locationCountry
         let vlocationzip = this.state.locationzip
         let vlocationlatlong = this.state.locationlatlong

         let updateID = parseInt(this.props.showSpeciSubA.id)
         let updateObject={}
         updateObject.value=valueName
        //  updateObject.attribute_id=1
        //  updateObject.status=1

         updateObject["childrens"] =[{
                children_value:vlocationShortCode,
                children_id:this.props.showSpeciSubA.sub_attributeschild[7].id,
                children_name:'Short Code'
                },
                {
                    children_value:vlocationTypevalue,
                    children_id:this.props.showSpeciSubA.sub_attributeschild[6].id,
                    children_name:'Location Type'
                },
                {
                    children_value:vlocationAddress,
                    children_id:this.props.showSpeciSubA.sub_attributeschild[5].id,
                    children_name:'Address'
                },
                {
                    children_value:vlocationCity,
                    children_id:this.props.showSpeciSubA.sub_attributeschild[4].id,
                    children_name:'City'
                },
                {
                    children_value:vlocationState,
                    children_id:this.props.showSpeciSubA.sub_attributeschild[3].id,
                    children_name:'State'
                },
                {
                    children_value:vlocationCountry,
                    children_id:this.props.showSpeciSubA.sub_attributeschild[2].id,
                    children_name:'Country'
                },
                {
                    children_value:vlocationzip,
                    children_id:this.props.showSpeciSubA.sub_attributeschild[1].id,
                    children_name:'Zip'
                },
                {
                    children_value:vlocationlatlong,
                    children_id:this.props.showSpeciSubA.sub_attributeschild[0].id,
                    children_name:'Lat/Long'
                }
            ]
            
        if(this.validate()){
            let res=   this.props.handleSubAttributeUpdate(updateID, updateObject)
                res.then(res=>{
                    this.props.getAllSubAttribute(18).then(()=>{
                        // alert("ji")
                        this.getCatgoryData()
                    })
                })
                if (this.state.isEditing) {
                    confirmAlert({
                        title: 'Updated Successfully',
                        message: 'Location Type',
                        buttons: [
                          {
                            label: 'Ok'
                          }
                        ]
                    });
                }
                this.setState({
                    isEditing:false,
                    locationName: '',
                    locationShortCode: "",
                    locationTypevalue: 0,
                    locationAddress: "",
                    locationCity: "",
                    locationState: 0,
                    locationCountry: 0,
                    locationzip: "",
                    locationlatlong: ""
                })
        }
    }

    render() {
  
        return (
        <>
            <div className="bg-white">
                <h4 className="p-15 mb-0">Inventory Locations</h4>
                <hr className="m-0"/>
                <div className="ContentSection p-15">
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <div className="row d-flex align-items-center mb-3">
                                <div class="col-md-6 col-lg-4">  
                                    <label>Location Name</label>
                                    <div>
                                        <input type="text"
                                        className={this.state.isEditing===false ? "form-control" : "form-control" } style={{backgroundColor:this.state.isEditing===false?"white":"#d5ecf5"}}
                                            name="locationName"
                                        value={this.state.locationName}
                                            placeholder="Name" onChange={this.handleZoneInputAction2}/>
                                        {this.state.errorObj.locationName!==0?<span style={{fontSize:"small",color:"red"}}>Enter Location Name</span>:""}
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 mt-3 mt-md-0">  
                                    <label>Short Code (6 Char)</label>
                                    <div>
                                        <input type="text" 
                                        className={this.state.isEditing===false ? "form-control" : "form-control" } style={{backgroundColor:this.state.isEditing===false?"white":"#d5ecf5"}}
                                            placeholder="Code"
                                            maxLength="6"
                                            name="locationShortCode" 
                                            value={this.state.locationShortCode}  
                                            onChange={this.handleZoneInputAction}/>
                                        {this.state.errorObj.locationShortCode!==0?<span style={{fontSize:"small",color:"red"}}>Enter Short Code</span>:""}
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 mt-3 mt-md-0">  
                                    <label>Location Type</label>
                                    <select class="form-control" style={{cursor:"pointer"}}  id="locationTypevalue" onChange={this.handleInputlocationTypevalue}
                                    value={this.state.locationTypevalue}>
                                            <option value="0" >None</option>
                                            
                                            {this.props.locationTypesList !== undefined?this.props.locationTypesList.filter(attributeData=>attributeData.id ===17).map(filterData=>{
                                                    return (filterData.subattributes.map(subData=>{
                                                        return(<option value={subData.id}>{subData.value}</option>)
                                                    }))
                                                })                          
                                            :""}
                                    </select>
                                </div>
                            </div>
                            <div class="row d-flex align-items-center mb-3">
                                <div class="col-md-6 col-lg-4">  
                                    <label>Address</label>
                                    <div>
                                        <input type="text"
                                        className={this.state.isEditing===false ? "form-control" : "formControl2 abcd" }
                                            name="locationAddress"
                                        value={this.state.locationAddress}
                                            placeholder="Address" onChange={this.handleInputlocationAddress}/>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 mt-3 mt-md-0">  
                                    <label>City</label>
                                    <div>
                                        <input type="text"
                                        className={this.state.isEditing===false ? "form-control" : "formControl2 abcd" }
                                            name="locationCity"
                                        value={this.state.locationCity}
                                            placeholder="City" onChange={this.handleInputlocationCity}/>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 mt-3 mt-md-0">  
                                    <div class="row d-flex align-items-center">
                                        <div class="col-md-6 col-lg-6">
                                            <label>Prov/State</label>
                                            <select className="form-control" style={{cursor:"pointer"}} id="state"  value={this.state.locationState}  onChange={this.handleInputlocationState}>
                                                <option value="" selected>Select State</option>
                                                <option value="Dundas">Dundas</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6 col-lg-6 mt-3 mt-md-0">
                                            <label>Country</label>
                                            <select className="form-control" style={{cursor:"pointer"}} id="locationCountry"  value={this.state.locationCountry}   placeholder="Country" onChange={this.handleInputlocationCountry} >
                                                <option value="" selected>Select Country</option>
                                                <option alue="Canada">Canada</option>
                                                <option alue="USA">USA</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row d-flex align-items-center mb-3">
                                <div class="col-md-6 col-lg-4">  
                                    <label>Postal/Zip</label>
                                    <div>
                                        <input type="text"
                                        className={this.state.isEditing===false ? "form-control" : "formControl2 abcd" }
                                            name="locationzip"
                                        value={this.state.locationzip}
                                            placeholder="Postal/Zip" onChange={this.handleInputloationzip}/>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 mt-3 mt-md-0">  
                                    <label>Lat/Long <span><img src="assets/img/map-marker-blue.svg"/></span></label>
                                    <div>
                                        <input type="text"
                                        className={this.state.isEditing===false ? "form-control" : "formControl2 abcd" }
                                            name="locationlatlong"
                                        value={this.state.locationlatlong}
                                            placeholder="Lat/Long" onChange={this.handleInputlocationlatlong}/>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-md-end mt-2" style={{paddingTop:"10px"}} >
                                    <div >
                                        <a href="javascript:" className="d-flex align-items-center" onClick={this.state.isEditing ? this.handleAddCategoryUpdate : this.handleAddCategory}> 
                                            <i className="fa fa-plus-circle fa-2x mr-2"></i> {this.state.isEditing ? this.state.btnLabelUpdate : this.state.btnLabelAdd }
                                        </a>
                                    </div>
                                    <div className="d-flex justify-content-md-end mt-2"  onClick={this.handleClear}>
                                        <a href="javascript:" className="d-flex align-items-center" style={{marginLeft:"2.5em", marginTop:"-6px"}}>
                                            <i className="fa fa-times-circle fa-2x mr-2"></i> {this.state.btnLabelCancel} 
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5 mb-4">
                        <div class="col-md-8">
                        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart} removeItem={this.removeItem}>
                        <div style={{display: 'flex',paddingTop:20}}>
                       
                            <div style={{flex:2}}>
                                <div class="card midCard">
                                    <div class="card-header">
                                        Inactive
                                    </div>


                                    {!this.state.loading?  <div style={{height: "300px",lineHeight: "300px",textAlign: "center",backgroundColor:"#F0F0F0"}}><Loader/></div>:<div class="card-body cardBg" >
                                   <ul class="list-unstyled" id="categoryActive">
                                    <Droppable droppableId="droppable2">
                                        {(provided, snapshot) => (
                                            <div  style={{height:this.state.inactive.length>5?"auto":265}} 
                                                ref={provided.innerRef}
                                            >
                                                {this.state.inactive.map((item, index) => (
                                                    <Draggable
                                                        key={item.id.toString()}
                                                        draggableId={item.id.toString()}
                                                        index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                            style={{position:"relative"}}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                >
                                                                <li id={item.id} name={item.id} >
                                                <p style={{float:"left",paddingRight:4,paddingLeft:0}}><img class="arrowIc" src="assets/img/arrow-right-ic.svg" style={{width:21,height:21}}/></p>
                                               <a className="d-flex justify-content-between align-items-center" style={{paddingBottom:0}}> 

                                                            {/* <a className="d-flex justify-content-between align-items-left" style={{paddingBottom:0}}> */}
                                                                      <p id="Wheathers" className={this.state.isEditing===false  ? "" :this.state.selectedID === item.id ? "reasonBackground" : " "}>
                                                                      <div style={{display:"block",float:"left"}}>
                                                                      <p style={{padding:0,margin:0,color:"black"}}>{item.value}</p>
                                                                      {/* <p style={{color:"gray",display:"block",width:"100%",padding:0,margin:0,fontSize:"14px"}}>{t.value}</p> */}
                                                                      <p style={{color:"gray",padding:0,margin:0,fontSize:"14px"}}>{(item.sub_attributeschild[5]!==undefined?item.sub_attributeschild[5].value:"")} {(item.sub_attributeschild[4]!==undefined?item.sub_attributeschild[4].value:"")} {(item.sub_attributeschild[3]!==undefined?item.sub_attributeschild[3].value:"")}  {(item.sub_attributeschild[2]!==undefined?item.sub_attributeschild[2].value:"")}</p>
                                                                      </div>
                                                                      </p>
                                                                   
                                                                      <p style={{color:"gray",padding:5,margin:5}}><span style={{float:"right",fontSize:20, cursor:"pointer", color:"#629c44",marginTop:"-20px"}}><p style={{marginTop:"2px"}}><img class="mapMarkerIc" src="assets/img/map-marker-blue.svg"/></p><MdIcons.MdEdit  
                                                                            onClick={() =>this.handleEditClick2(item)}
                                                                /></span></p>
                                                                {/* <img class="arrowIc" src="assets/img/arrow-right-ic.svg"/>
                                                                <div className="inventory_loc"> */}
                                                                    {/* <label><span id="Wheathers" className={this.state.isEditing===false  ? "" :this.state.selectedID === t.id ? "reasonBackground" : " "}>{t.value}</span></label> */}
                                                                        {/* <h5><span>{t.value}</span></h5> */}
                                                                    {/* <label> */}
                                                                        {/* <p>{(t.sub_attributeschild[5]!==undefined?t.sub_attributeschild[5].value:"")} */}
                                                                            {/* <p>{(t.sub_attributeschild[4]!==undefined?t.sub_attributeschild[4].value:"")}</p> 
                                                                            <p>{(t.sub_attributeschild[3]!==undefined?t.sub_attributeschild[3].value:"")}</p>
                                                                            <p>{(t.sub_attributeschild[2]!==undefined?t.sub_attributeschild[2].value:"")}</p> */}
                                                                        {/* </p>     */}
                                                                    {/* </label> */}
                                                                {/* </div> */}
                                                                {/* <img class="mapMarkerIc" src="assets/img/map-marker-blue.svg"/>
                                                            
                                                                <span style={{float:"right",fontSize:20, cursor:"pointer", color:"#629c44",paddingLeft:40,marginLeft:30}}><MdIcons.MdEdit  
                                                                    onClick={() =>this.handleEditClick2(t)}
                                                                /></span>
                                                            {/* </a> */} 
                                                            </a>
                                                        </li>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                            {/* {this.state.active.map(t=>{
                                            return (<li></li>)
                                            })} */}
                                    </ul>
                                        


                                    </div>}
                                </div>
                            </div>
                            <div style={{flex:0,paddingLeft:5,paddingRight:5}}>
                            <div className="midControls d-flex flex-column justify-content-around">
                                            <div>
                                            <i class="fas fa-angle-double-right" style={{fontSize:40,color:"gray"}}></i>
                                                <p style={{fontSize:"14px",fontWeight:"bold",color:"gray",textAlign:"center"}}>Drag & Drop to Place</p>
                                               
                                            </div>
                                            <div>
                                            <i class="fas fa-arrows-alt" style={{fontSize:40,color:"gray"}}></i>
                                                <p style={{fontSize:"14px",fontWeight:"bold",color:"gray",textAlign:"center"}}>Drag To Sort</p>
                                                
                                            </div> 
                                            <Droppable
                                                       
                                            droppableId="delete">
                                                     
                                               
                                             {(provided, snapshot) => (
                                            <div    style={{maxWidth:165,height:100,width:165}}
                                                ref={provided.innerRef}
                                            >
                                              
                                                    <Draggable
                                                        key="delete"
                                                        draggableId="delete"
                                                       
                                                        index={0}>
                                                        {(provided, snapshot) => (
                                                            <div   
                                                            ref={provided.innerRef}>
                                                        
                                                                
                                                                <div className="deleteSpace"   style={{height:"70px"}}>
                                                <i className ={`fa fa-trash ${this.state.deleteon===true?"trashShake":""}`}style={{fontSize:35,color:"red"}} ></i>
                                                <p style={{fontSize:"14px",fontWeight:"bold",color:"gray",textAlign:"center"}}>Drag & Drop Here to Remove</p>
                                                {/* <img style={{width:"5em"}} src="./assets/img/Genral_Icons/Drag _Drop_remove_red.png" alt="Settings" className="trashShake"/> */}
                                            </div>
                                                                
                                                 
                                                            </div>
                                                        )}
                                                    </Draggable>
                                             
                                                {provided.placeholder}
                                            </div>
                                        )}
                                            </Droppable>

                                            
                                        </div>
                            </div>
                           
                                    
                                    {/* </div> */}
                            <div style={{flex:2}}>
                                <div class="card midCard">
                                    <div class="card-header">
                                        Active
                                    </div>
                                    {!this.state.loading?  <div style={{height: "300px",lineHeight: "300px",textAlign: "center",backgroundColor:"#F0F0F0"}}><Loader/></div>:<div class="card-body cardBg" >
                                    <ul class="list-unstyled" id="categoryActive">
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <div    style={{height:this.state.active.length>5?"auto":265}} 
                                                ref={provided.innerRef}
                                            >
                                                {this.state.active.map((item, index) => (
                                                    <Draggable
                                                        key={item.id.toString()}
                                                        draggableId={item.id.toString()}
                                                        index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                            style={{height:100,border:"1px solid red"}}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                >
                                                                <li id={item.id} name={item.id} >
                                                <p style={{float:"left",paddingRight:4,paddingLeft:0}}><img class="arrowIc" src="assets/img/arrow-right-ic.svg" style={{width:21,height:21}}/></p>
                                               <a className="d-flex justify-content-between align-items-center" style={{paddingBottom:0}}> 

                                                            {/* <a className="d-flex justify-content-between align-items-left" style={{paddingBottom:0}}> */}
                                                                      <p id="Wheathers" className={this.state.isEditing===false  ? "" :this.state.selectedID === item.id ? "reasonBackground" : " "}>
                                                                      <div style={{display:"block",float:"left"}}>
                                                                      <p style={{padding:0,margin:0,color:"black"}}>{item.value}</p>
                                                                      {/* <p style={{color:"gray",display:"block",width:"100%",padding:0,margin:0,fontSize:"14px"}}>{t.value}</p> */}
                                                                      <p style={{color:"gray",padding:0,margin:0,fontSize:"14px"}}>{(item.sub_attributeschild[5]!==undefined?item.sub_attributeschild[5].value:"")} {(item.sub_attributeschild[4]!==undefined?item.sub_attributeschild[4].value:"")} {(item.sub_attributeschild[3]!==undefined?item.sub_attributeschild[3].value:"")}  {(item.sub_attributeschild[2]!==undefined?item.sub_attributeschild[2].value:"")}</p>
                                                                      </div>
                                                                      </p>
                                                                   
                                                                      <p style={{color:"gray",padding:5,margin:5}}><span style={{float:"right",fontSize:20, cursor:"pointer", color:"#629c44",marginTop:"-20px"}}><p style={{marginTop:"2px"}}><img class="mapMarkerIc" src="assets/img/map-marker-blue.svg"/></p><MdIcons.MdEdit  
                                                                            onClick={() =>this.handleEditClick2(item)}
                                                                /></span></p>
                                                                {/* <img class="arrowIc" src="assets/img/arrow-right-ic.svg"/>
                                                                <div className="inventory_loc"> */}
                                                                    {/* <label><span id="Wheathers" className={this.state.isEditing===false  ? "" :this.state.selectedID === t.id ? "reasonBackground" : " "}>{t.value}</span></label> */}
                                                                        {/* <h5><span>{t.value}</span></h5> */}
                                                                    {/* <label> */}
                                                                        {/* <p>{(t.sub_attributeschild[5]!==undefined?t.sub_attributeschild[5].value:"")} */}
                                                                            {/* <p>{(t.sub_attributeschild[4]!==undefined?t.sub_attributeschild[4].value:"")}</p> 
                                                                            <p>{(t.sub_attributeschild[3]!==undefined?t.sub_attributeschild[3].value:"")}</p>
                                                                            <p>{(t.sub_attributeschild[2]!==undefined?t.sub_attributeschild[2].value:"")}</p> */}
                                                                        {/* </p>     */}
                                                                    {/* </label> */}
                                                                {/* </div> */}
                                                                {/* <img class="mapMarkerIc" src="assets/img/map-marker-blue.svg"/>
                                                            
                                                                <span style={{float:"right",fontSize:20, cursor:"pointer", color:"#629c44",paddingLeft:40,marginLeft:30}}><MdIcons.MdEdit  
                                                                    onClick={() =>this.handleEditClick2(t)}
                                                                /></span>
                                                            {/* </a> */} 
                                                            </a>
                                                        </li>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                            {/* {this.state.active.map(t=>{
                                            return (<li></li>)
                                            })} */}
                                    </ul>
                                    </div>}
                                </div>
                            </div>
                        </div>
                        
                    
                    </DragDropContext>                             
                        </div>
                        <div class="col-md-4">
                            <div class="row mb-3">
                                <div class="col-md-12">  
                                    <label>Current Location</label>
                                    <input class="form-control" placeholder="" disabled="disabled" value="Farm-E > Area A "/>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-12 col-lg-12">  
                                    <label>Location Type</label>
                                    <select class="form-control" style={{cursor:"pointer"}}  id="locationTypevaluechild" onChange={this.handleInputlocationTypevalueChild}
                                    value={this.state.locationTypevaluechild}>
                                            <option value="0" >None</option>
                                            
                                            {this.props.locationTypesList !== undefined?this.props.locationTypesList.filter(attributeData=>attributeData.id ===17).map(filterData=>{
                                                    return (filterData.subattributes.map(subData=>{
                                                        return(<option value={subData.id}>{subData.value}</option>)
                                                    }))
                                                })                          
                                            :""}
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-12">  
                                    <label>Describe your Row (8 Char)</label>
                                    <input class="form-control" placeholder="" value="Daisy "/>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-12">  
                                    <label>Preview</label>
                                    <input class="form-control" placeholder="" disabled="disabled" value="Row Daisy "/>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-12">  
                                        <a href="javascript:;" class="d-flex align-items-center">
                                        <i class="fa fa-plus-circle fa-2x mr-2"></i> Add Child Location
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

const mapStateToProps = (state)=> ({
        zoneCategoryList:state.attributeData.subAttribute,
        temp:state,
        locationName:state.attributeData.subAttributeName.locationName,
        locationShortCode:state.attributeData.subAttributeName.locationShortCode,
        locationAddress:state.attributeData.subAttributeName.locationAddress,
        locationCity:state.attributeData.subAttributeName.locationCity,
        locationState:state.attributeData.subAttributeName.locationState,
        locationCountry:state.attributeData.subAttributeName.locationCountry,
        locationzip:state.attributeData.subAttributeName.locationzip,
        locationlatlong:state.attributeData.subAttributeName.locationlatlong,
        locationTypevalue:state.attributeData.subAttributeName.locationTypevalue,
        showSpeciSubA: state.attributeData.specificSubAttribute,
        locationTypesList: state.attributeData.locationTypesSubAttributeList
    })

export default connect(mapStateToProps,{
    getAllSubAttribute,
    handleAttributeDragDrop,
    handleAttributeDragSort,
    handleAttributeDelete,
    handleZoneInputAction,
    handleAddZone,
    showSubSubAttribute,
    handleSubAttributeUpdate, 
    handleZoneInputAction2,
    getAllLocationTypesSubAttribute,    
})(InventoryLocation)