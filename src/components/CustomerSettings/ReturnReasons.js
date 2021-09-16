
import React, { Component } from 'react'
import {connect} from "react-redux";
import * as MdIcons from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert';
// import './style.css';
import Sortable from 'sortablejs'
import InfoModal from "../Modal/InfoModal"
import Loader from '../ProductManager/Loader'

import {customerReturnSort,getAllReturnReasonMethods,saveReturnReasonMethod,getAllReasonMethods,handleCustomerTypeDelete,
    handleDragDropCustomer,saveDeliveryMethod,saveNoticationData,getNotificationData,handleExchangeData,
    getAllDeliveryMethods,  updateCustomerReturnReasonSettings,handleExchangeData2,
    showSpecificReturnReasonSettings,} from "../../actions/customerSettingAction";
import { is } from 'immutable';

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
    class ReturnReasons extends Component {
    state ={
     isOpen1:false,
       message:[],
       isEditing:false,
       name:'',
       return_to_inventoryNo:2,
      
       selectedOption:false,
       selectedID:'',
       deleteon:false,
       loading:false,

      
       subName:'',
       subName2:'',
      
       btnLabelAdd:'Add New Return Reason',
       btnLabelUpdate: 'Update Return Reason',
       btnLabelCancel:'Cancel',

        errorObj:{
            return_reason :0,
           short_code:0
       },
       active:[],inactive:[]
       //return_to_inventoryNumber:0,
    }

        getCatgoryData = ()=>{
            let data = {};
            let active= this.props.customerData.customerReturnReasonList.active
           let inactive=this.props.customerData.customerReturnReasonList.inactive
            this.setState({active:active,inactive:inactive,loading:true})
            console.log(active,inactive)
        }
    componentDidMount(){
        
    
        this.props.getAllReturnReasonMethods().then(()=>{
            // alert("ji")
            this.getCatgoryData()
        })
   
    
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
                title: 'Delete Return Status ',
                message: 'Are you sure want to delete the Return Status ?',
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
            this.props.customerReturnSort(this.state.inactive[result.source.index].id,this.state.inactive[result.destination.index].id,"down")
            else  this.props.customerReturnSort(this.state.inactive[result.source.index].id,this.state.inactive[result.destination.index].id,"up")
            this.setState({inactive:items});
            }else{
              
                        //        if(evt.willInsertAfter ==true)
            if(result.destination.index> result.source.index)
            this.props.customerReturnSort(this.state.active[result.source.index].id,this.state.active[result.destination.index].id,"down")
            else  this.props.customerReturnSort(this.state.active[result.source.index].id,this.state.active[result.destination.index].id,"up")
            this.setState({active:items});
            }
            
        } else {
           
            if (source.droppableId === 'droppable2') {
            let task= this.state.inactive.filter(data=>data.id ==this.state.inactive[source.index]["id"])
            console.log(task)
                      if(task.length > 0){
                        task[0].status =parseInt(task[0].status )==1? 0:1
                                    this.props.updateCustomerReturnReasonSettings(task[0].id,task[0]).then(data=>{
                                        this.props.getAllReturnReasonMethods().then(()=>{
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
                    task[0].status =parseInt(task[0].status )==1? 0:1
                    this.props.updateCustomerReturnReasonSettings(task[0].id,task[0]).then(data=>{
                        this.props.getAllReturnReasonMethods().then(()=>{
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
    // onDragOver = (ev)=>{
    //     ev.preventDefault();
    // }
    // startIDData  =(e)=>{
    //     this.setState({selectedID:e.item.id})
    // }
    // onAddData = (evt)=>{
    //     console.log(evt)
    //     evt.preventDefault()
    
    // //     const referenceNode = (evt.nextSibling && evt.nextSibling.parentNode !== null) ? evt.nextSibling : null; 
    // //  evt.from.insertBefore(evt.item, null); 
    
    // }
    // onMoveData = (evt,ui)=>{
    
    //    if(evt.from.id == evt.to.id){
    //        if(evt.willInsertAfter ==true)
    //     this.props.customerReturnSort(evt.dragged.id,evt.related.id,"down")
    //     else  this.props.customerReturnSort(evt.dragged.id,evt.related.id,"up")
    
    //    }else{
    //        if(evt.from.id =="categoryActive"){
    //           let task= this.state.active.filter(data=>data.id ==evt.dragged.id)
    //           //console.log(task)
    //           if(task.length > 0){
    //               let taskData = task[0]
    //               taskData.status =parseInt(taskData.status)==1? 0:1
    //               this.props.updateCustomerReturnReasonSettings(taskData.id,taskData).then(data=>{
    //             //     this.props.getAllPlantCategories().then(()=>{
    //             //     confirmAlert({
    //             //     title: 'Action',
    //             //     message: 'Successfully Moved from Active to InActive',
    //             //     buttons: [
    //             //         {
    //             //         label: 'Ok'
    //             //         }
    //             //     ]
    //             // });
    //             // this.getCatgoryData()
          
    //             // })
    //         })
    
    //         }
    
    //        }else if(evt.from.id =="categoryInactive"){
    //            //console.log(evt.dragged.id,evt.related.id)
    //         let task= this.state.inactive.filter(data=>data.id ==evt.dragged.id)
    //         //console.log(task)
    //         if(task.length > 0){
    //             let taskData = task[0]
    //             taskData.status =parseInt(taskData.status)==1? 0:1
    //             this.props.updateCustomerReturnReasonSettings(taskData.id,taskData).then(data=>{
    //         //         this.props.getAllPlantCategories().then(()=>{
    //         //             this.props.getAllPlantCategories().then(()=>{
    //                         // confirmAlert({
    //                         //     title: 'Action',
    //                         //     message: 'Successfully Moved from InActive to Active',
    //                         //     buttons: [
    //                         //         {
    //                         //         label: 'Ok'
    //                         //         }
    //                         //     ]
    //                         // });
    //         //                 this.getCatgoryData()
    //         //             })
    //         //             // this.getCatgoryData() 
    //         //         })
    //         //     })
    
    //         // }
            
    //        })
    //     }
    
    //    }
    // }
    // }




        // onDelete =(ev)=>{
        //     let id= ev.dataTransfer.getData("id");
        //     console.log(id)
        //     this.setState({deleteon:true})
        //    let result= this.props.handleCustomerTypeDelete(id,"delete-customer-reason")
        //    result.then(res=>{
        //     this.props.getAllReturnReasonMethods()
        //     this.setState({deleteon:false})
        //    })
        // }



        onDelete =(ev)=>{
            let id= this.state.selectedID
            confirmAlert({
                title: 'Delete Return Reason',
                message: 'Are you sure want to delete the Return Reason ?',
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
            let result= this.props.handleCustomerTypeDelete(id,"delete-customer-reason")
            this.setState({deleteon:true})
            result.then(res=>{
                this.props.getAllReturnReasonMethods().then(()=>{
                    // alert("ji")
                    this.getCatgoryData()
                })
                this.setState({deleteon:false})
            
            }).catch(data=>{
                this.setState({deleteon:false})

                   confirmAlert({
                   title: 'Alert',
                   message: 'Please note that this Reason  is associated with Customer.Please reassign before deleting ',
                   buttons: [
                     {
                       label: 'Ok'
                     }
                   ]
                 });
           })
        }


        handleCategoryInputAction = (e)=>{
            this.setState({
                name:e.target.value
            })

            let errorObj=this.state.errorObj
            if(e.target.name === "customerReturnReason"){
            errorObj.return_reason=0
            this.setState({errorObj})}
            this.props.handleExchangeData("customerReturnReason", e.target.value)

            //this.props.handleExchangeData(e.target.value,e.target.id,"customerReturnReason")
        }

        handleCategoryInputAction2 = (e)=>{

            this.setState({
                selectedOption:e.currentTarget.value
            })
            // if(e.target.id ==="return_to_inventoryYes")this.props.handleExchangeData2("return_to_inventoryNo", e.target.value)
            // else if(e.target.id ==="return_to_inventoryNo")this.props.handleExchangeData2("return_to_inventoryNo", e.target.value)

            
           // this.props.handleExchangeData2("return_to_inventory",e.currentTarget.value)
            

            //this.props.handleExchangeData(e.target.value,e.target.id,"customerReturnReason")
        }




        handleAddCategoryData = (e)=>{
            // if(this.state.name.trim() ==="" || this.props.customerData.customerReturnReason.return_to_inventory ==="2"){
                
            //     this.setState({isOpen1:true,message:["Please add Reason "]})


            // }else{
                let obj = {}
                obj.reason = this.state.name
                obj.return_to_inventory = this.state.selectedOption
                //this.props.customerData.customerReturnReason.return_to_inventory
                obj.status = 1
                // let result = this.props.saveReturnReasonMethod(obj)
                // result.then(data=>{
                //     this.props.getAllReturnReasonMethods().then(()=>{
                //         // alert("ji")
                //         this.getCatgoryData()
                //     })
                // })
            // }

            // this.setState({
            //     name:"",
            // })


            if(this.validate()){
                let result = this.props.saveReturnReasonMethod(obj)
                result.then(res=>{
                    this.props.getAllReturnReasonMethods().then(()=>{
                        // alert("ji")
                        this.getCatgoryData()
                    })
                })
          
                this.setState({
                    name: "",
                    subName:"",
                    isEditing:false,
                    selectedID:'',
                })
            } 
            // this.props.saveCustomerType()
        
        }


        validate = ()=>{
            let errorObj = this.state.errorObj
            if(this.state.name.length === 0){
                errorObj.return_reason=1
                this.setState({errorObj})
                return false
            }
           
            return true
            
        }


        handleClear=()=>{
            let errorObj = this.state.errorObj
            errorObj.return_reason=0
            this.setState({name: "", subName:"", isEditing:false, selectedID:'', errorObj})
        }

        handleEditClick2 =(t)=> {
            console.log("abcdefg", t  )

            this.setState({
                name: t.reason,
                selectedOption:t.return_to_inventory,
                isEditing:true,
                selectedID:t.id
            })

            this.props.handleExchangeData("customerReturnReason",...this.state.name)
            this.props.handleExchangeData2("return_to_inventory",this.state.selectedOption)
            this.props.showSpecificReturnReasonSettings(t.id)
  
       }



       handleAddCategoryUpdate=(e)=>{
        //debugger;
        console.log("showSpeciSubA", this.props.showSpecificCustomerReturnReason)
         // this.props.handleSubAttributeUpdate(e.target.id)
         let valueName = this.state.name
        
         let updateID = parseInt(this.props.showSpecificCustomerReturnReason.id)
         let updateObject={}
         updateObject.return_to_inventory=this.state.selectedOption
       
            
    //   let res=   this.props.updateCustomerReturnReasonSettings(updateID, updateObject)
    //          res.then(res=>{
    //              this.props.getAllReturnReasonMethods()
    //          })

            //  this.setState({
            //      isEditing:false,
            //      name:"",
                
            //  })
            let obj = {}
            obj.reason = this.state.name
            obj.return_to_inventory = this.state.selectedOption

            if(this.validate()){
                let res=   this.props.updateCustomerReturnReasonSettings(updateID,obj).then(res=>{
                    
                        this.props.getAllReturnReasonMethods().then(()=>{
                            
                            this.getCatgoryData()
                        })
                    })
                    if (this.state.isEditing) {
                  
                    }
                    this.setState({
                        isEditing:false,
                        name:"",
                        subName:""
                    })
            }

     }







render() {
 
    const {customerData} = this.props

    console.log("Aforapple",this.props.customerData.customerReturnReason)


    // customerReturnReason:{reason: "",return_to_inventory: ""},
    // customerReturnReasonList:{active:[],inactive:[]}

        return (
           
                   <div>
                       	{/* <InfoModal status={this.state.isOpen1} message={this.state.message} modalAction={this.toggle1}/> */}
               <div className="bg-white">
 <h4 className="p-15 mb-0">Return Reasons For Adjustments</h4>
                
                            <hr className="m-0"/>
                            <div className="ContentSection p-15">
                           
                                <div className="row">
                                       
                                    </div>
                                    
                                <div className="row">
                                    <div className="col-md-6">
                                        {/* <p>Reason</p> */}
                                        <h5 className="p-15 mb-0"  style={{marginLeft:"-10px"}}> Reason</h5>
                                        <div>
                                            <input type="text"
                                            className={this.state.isEditing===false ? "form-control" : "form-control" } style={{backgroundColor:this.state.isEditing===false?"white":"#d5ecf5"}}
                                            placeholder="" id="reason" name="customerReturnReason"
                                            value={this.state.name} 
                                            // value={customerData.customerReturnReason.reason}
                                                onChange={this.handleCategoryInputAction}/>
                                                 {this.state.errorObj.return_reason!==0?<span style={{fontSize:"small",color:"red"}}>Enter delivery method</span>:""}
                                        </div>
                                        {/* <div className="d-flex justify-content-md-end mt-2">
                                            <a href="javascript;" className="d-flex align-items-center">
                                                <i className="fa fa-plus-circle fa-2x mr-2"></i> Add New Section
                                            </a>
                                        </div> */}
                                    </div>
                                    <div className="col-md-2" style={{marginTop:"1em"}}>
                                        <p>Return to Inventory</p>
                                        <div style={{marginTop:"16px"}}>
                                        <label class="containerC">Yes
                                                        <input type="radio"  name="return_to_inventory" id={"return_to_inventoryYes"}
                                                         value={1} onChange={this.handleCategoryInputAction2} 
                                                         checked = {parseInt(this.state.selectedOption)===1?true:false}
                                                         //checked={this.props.customerData.customerReturnReason.return_to_inventory ==1?true:false}
                                                         />
                                                         
                                                        <span class="checkmark"></span>
                                                        </label>
                                                        <label class="containerC">No
                                                        <input type="radio" name="return_to_inventory"  id={"return_to_inventoryNo"}  value={0} 
                                                        onChange={this.handleCategoryInputAction2}
                                                        checked = {parseInt(this.state.selectedOption)===0?true:false} 
                                                        //checked={this.props.customerData.customerReturnReason.return_to_inventory ==0?true:false}
                                                        //  checked={customerData.customerReturnReason.return_to_inventory ==0?true:false}
                                                        />
                                                        <span class="checkmark"></span>
                                                </label>
                                        </div>
                                        {/* <div className="d-flex justify-content-md-end mt-2">
                                            <a href="javascript;" className="d-flex align-items-center">
                                                <i className="fa fa-plus-circle fa-2x mr-2"></i> Add New Feature
                                            </a>
                                        </div> */}
                                    </div>

                                    
                                  


                                                {/* {this.state.isEditing ? (
                                                    <div className="d-flex justify-content-md-end mt-2" onClick={this.handleAddCategoryUpdate}>
                                                        <div style={{marginTop:"2.5em"}}>
                                                            <a href="javascript:" className="d-flex align-items-center">
                                                                <i className="fa fa-plus-circle fa-2x mr-2"></i> Update Reason
                                                            </a>
                                                        </div>

                                                            <div className="d-flex justify-content-md-end mt-2"  onClick={()=>{this.setState({isEditing:false})}}>
                                                                <a href="javascript:" className="d-flex align-items-center cancel_signlebox" style={{marginLeft:"4em", marginTop:"1.5em"}}>
                                                                    Cancel 
                                                                </a>
                                                            </div>
                                                    </div>

                                                        ):
                                                        (
                                                            <div className="col-md-2" style={{marginTop:"3.3em"}} onClick={this.handleAddCategoryData}>
                                                            <a  className="d-flex align-items-center">
                                                                <i className="fa fa-plus-circle fa-2x mr-2"></i> Add New Reason
                                                            </a>
                                                        </div>
                                                  )}  */}



                                        <div className="d-flex justify-content-md-end mt-2"  >
                                            <div style={{marginTop:"43px"}}>
                                                <a href="javascript:" className="d-flex align-items-center" onClick={this.state.isEditing ? this.handleAddCategoryUpdate : this.handleAddCategoryData}> 
                                                    <i className="fa fa-plus-circle fa-2x mr-2"></i> {this.state.isEditing ? this.state.btnLabelUpdate : this.state.btnLabelAdd }
                                                </a>
                                            </div>
                                            <div className="d-flex justify-content-md-end mt-2"  onClick={this.handleClear}>
                                                <a href="javascript:" className="d-flex align-items-center" style={{marginLeft:"2.5em", marginTop:"22px"}}>
                                                    <i className="fa fa-times-circle fa-2x mr-2"></i> {this.state.btnLabelCancel} 
                                                </a>
                                            </div>
                                        </div>

                                   


                                </div>
                                    {/* <div className="row">
                                    <div className="col-md-12 col-lg-12">
                                        <p>Term</p>
                                        <div className="row d-flex align-items-center">
                                            <div className="col-md-6 col-lg-6">  
                                            <input type="text" className="form-control" placeholder="Term" id="term" value={customerData.customerTerm.term}    onChange={this.handleCategoryInputAction}/>
                                              
                                            </div>
                                            <div className="col-md-6 col-lg-3" onClick={this.handleAddCategoryData}>
                                                <a  className="d-flex align-items-center">
                                                    <i className="fa fa-plus-circle fa-2x mr-2"></i>Add New Term
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart} removeItem={this.removeItem}>
                        <div style={{display: 'flex',paddingTop:20}}>
                       
                            <div style={{flex:5}}>
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
                                                                <li id={item.id.toString()}>
                                                        <div class="showElipse">
                                                        <div className={this.state.isEditing===false  ? "a" :this.state.selectedID === item.id ? "reasonBackground a" : "a"}><span id={item.id}    >{item.reason}</span>
                                                        
                                                        </div>
                                                        <span style={{float:"right",fontSize:20, cursor:"pointer", color:"#629c44",marginTop:"-28px"}}  id={item.id}><MdIcons.MdEdit  
                                                                onClick={() =>this.handleEditClick2(item)}
                                                                /></span>
                                                        </div>
                                                   
                                                                 {/* <a className="d-flex justify-content-between align-items-center"  id={t.id}>
                                                                      <span id={t.id}   className={this.state.isEditing===false  ? "" :this.state.selectedID === t.id ? "reasonBackground eplisData " : "eplisData"} >{t.name}</span>

                                                                      <span style={{float:"right",fontSize:20, cursor:"pointer", color:"#629c44"}}  id={t.id}><MdIcons.MdEdit  
                                                                onClick={() =>this.handleEditClick2(t)}
                                                                /></span>
                                                                 </a> */}
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
                            <div style={{flex:1,paddingLeft:5,paddingRight:5}}>
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
                                            <div  style={{maxWidth:165,height:100,width:165}}
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
                            <div style={{flex:5}}>
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
                                                                <li id={item.id.toString()}>
                                                        <div class="showElipse">
                                                        <div className={this.state.isEditing===false  ? "a" :this.state.selectedID === item.id ? "reasonBackground a" : "a"}><span id={item.id}    >{item.reason}</span>
                                                        
                                                        </div>
                                                        <span style={{float:"right",fontSize:20, cursor:"pointer", color:"#629c44",marginTop:"-28px"}}  id={item.id}><MdIcons.MdEdit  
                                                                onClick={() =>this.handleEditClick2(item)}
                                                                /></span>
                                                        </div>
                                                   
                                                                 {/* <a className="d-flex justify-content-between align-items-center"  id={t.id}>
                                                                      <span id={t.id}   className={this.state.isEditing===false  ? "" :this.state.selectedID === t.id ? "reasonBackground eplisData " : "eplisData"} >{t.name}</span>

                                                                      <span style={{float:"right",fontSize:20, cursor:"pointer", color:"#629c44"}}  id={t.id}><MdIcons.MdEdit  
                                                                onClick={() =>this.handleEditClick2(t)}
                                                                /></span>
                                                                 </a> */}
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
                        </div>
        </div>
       
        )
    }
}

     const mapStateToProps = (state)=> (
        // console.log(state)
         {
        
    plantCategoryList:state.categoryData.plantCategoryData,
    temp:state,
    name:state.categoryData.name,
    customerData:state.customerReducer,
    showSpecificCustomerReturnReason:state.customerReducer.showSpecificCustomerSettingReturnReason

    }
    )
    export default connect(mapStateToProps,{
        handleExchangeData,
        saveDeliveryMethod,
        getAllDeliveryMethods,
        handleCustomerTypeDelete,
        getAllReasonMethods,
        getAllReturnReasonMethods,
        saveReturnReasonMethod,
        updateCustomerReturnReasonSettings,
        showSpecificReturnReasonSettings,
        handleExchangeData2,
        customerReturnSort,


        
handleDragDropCustomer    })(ReturnReasons)
