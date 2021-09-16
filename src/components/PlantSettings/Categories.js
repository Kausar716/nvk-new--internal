/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component ,useEffect} from 'react'
import * as MdIcons from "react-icons/md";
import {connect} from "react-redux";
import Sortable from 'sortablejs'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert'; 
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Loader from '../ProductManager/Loader'
// import './style.css';
//import {getAllSubAttribute,handleAttributeDragDrop,handleAttributeDragSort,handleAttributeDelete,handlePositionInputAction,handleAddPosition,handleSubAttributeUpdate, showSubSubAttribute} from '../../actions/attributeAction'
import {getAllPlantCategories,handleCategoryInputAction,handleCategoryDragSort,handleAddCategory,
    updatePlantSettingCategory, showSpecificPlantSettingAttribute, handleDragDrop,handleCategoryDelete} from '../../actions/categoryAction'

import {showSubSubAttribute} from '../../actions/attributeAction'
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
    class Categories extends Component {
        constructor(props){
            super()
                this.state={
                    errorObj:{
                        formSku:0,
                        Category:0
                    },
                    sortId: 0,
                    activeId: 0,
                    isEditing:false,
                    name:'',
                    subName:'',
                    subName2:'',
                    selectedID:'',
                    loading:false,

                    btnLabelAdd:'Add New Category Type',
                    btnLabelUpdate: 'Update Category Type',
                    btnLabelCancel:'Cancel',
                    deleteon:false,
                    startID:0,
                        inactive:[],
                        active:[],
                    
                }
            
        }

    getCatgoryData = ()=>{
        let data = {};
        let active= this.props.plantCategoryList.filter(data=>data.status ==1)
       let inactive=this.props.plantCategoryList.filter(data=>data.status ==0)
        this.setState({active:active,inactive:inactive,loading:true})
    }
componentDidMount(){
    
    this.props.getAllPlantCategories().then(()=>{
        // alert("ji")
        this.getCatgoryData()
    })


}

// onDragOver = (ev)=>{
//     ev.preventDefault();
// }
// startIDData  =(e)=>{
//     this.setState({selectedID:e.item.id})
// }
// onAddData = (evt)=>{
//     console.log(evt)
//     // evt.preventDefault()

//     const referenceNode = (evt.nextSibling && evt.nextSibling.parentNode !== null) ? evt.nextSibling : null; 
//  evt.from.insertBefore(evt.item, null); 

// }
// onMoveData = (evt,ui)=>{

//    if(evt.from.id == evt.to.id){
//        if(evt.willInsertAfter ==true)
//     this.props.handleCategoryDragSort(evt.dragged.id,evt.related.id,"down")
//     else  this.props.handleCategoryDragSort(evt.dragged.id,evt.related.id,"up")

//    }else{
//        if(evt.from.id =="categoryActive"){
//           let task= this.state.active.filter(data=>data.id ==evt.dragged.id)
//           //console.log(task)
//           if(task.length > 0){
//             this.props.handleDragDrop(task[0]).then(data=>{
//                 this.props.getAllPlantCategories().then(()=>{
//                     // alert("ji")
//                     this.getCatgoryData()
//                 })
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
//             this.props.handleDragDrop(task[0]).then(data=>{
//                 this.props.getAllPlantCategories().then(()=>{
//                     // alert("ji")
//                     this.getCatgoryData()
//                 })
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
    
//         onDrop=(evt)=>{
//             if(evt.newIndex !==evt.oldIndex)
//             return
//             // alert("dropping")
  
//             //console.log(evt)
//             let id= evt.item.id


//             let oldIndex  = this.state.tasks.active[evt.oldIndex]
//             let newIndex  = this.state.tasks.active[evt.newIndex]
//            let doProcess = false;
//            let alertmsg = 0;
        
//                 let result= this.props.handleCategoryDragSort(oldIndex.id,newIndex.id)
//                 result.then(res=>{
//                     // this.props.getAllPlantCategories()
//                 }) 
//                 alertmsg = 3;
  

//         }
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
            title: 'Delete Category ',
            message: 'Are you sure want to delete the Category ?',
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
        this.props.handleCategoryDragSort(this.state.inactive[result.source.index].id,this.state.inactive[result.destination.index].id,"down")
        else  this.props.handleCategoryDragSort(this.state.inactive[result.source.index].id,this.state.inactive[result.destination.index].id,"up")
        this.setState({inactive:items});
        }else{
          
                    //        if(evt.willInsertAfter ==true)
        if(result.destination.index> result.source.index)
        this.props.handleCategoryDragSort(this.state.active[result.source.index].id,this.state.active[result.destination.index].id,"down")
        else  this.props.handleCategoryDragSort(this.state.active[result.source.index].id,this.state.active[result.destination.index].id,"up")
        this.setState({active:items});
        }
        
    } else {
       
        if (source.droppableId === 'droppable2') {
        let task= this.state.inactive.filter(data=>data.id ==this.state.inactive[source.index]["id"])
                  if(task.length > 0){
                    this.props.handleDragDrop(task[0]).then(data=>{
                        this.props.getAllPlantCategories().then(()=>{
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
              this.props.handleDragDrop(task[0]).then(data=>{
                this.props.getAllPlantCategories().then(()=>{
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
            // alert(id)
            confirmAlert({
                title: 'Delete Category Type',
                message: 'Are you sure want to delete the Category Type?',
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
            // alert(id)
            let result= this.props.handleCategoryDelete(id)
            this.setState({deleteon:true})
            result.then(res=>{
              
               
                this.props.getAllPlantCategories().then(()=>{
                    // alert("ji")
                    this.setState({deleteon:false})
                    this.getCatgoryData()
                })
             
            }).catch(data=>{
                 this.setState({deleteon:false})

                    confirmAlert({
                    title: 'Alert',
                    message: 'Please note that this item is associated with Plants.Please reassign before deleting ',
                    buttons: [
                      {
                        label: 'Ok'
                      }
                    ]
                  });
            })
        }






        handleCategoryInputAction = (e)=>{


            this.props.handleCategoryInputAction(e.target.value)
        }





        handleAddCategory = (e)=>{
        if(this.validate()){
            let result = this.props.handleAddCategory(this.props.name)
            result.then(res=>{
                this.props.getAllPlantCategories().then(()=>{
                    // alert("ji")
                    this.getCatgoryData()
                })
            })
            // confirmAlert({
            //     title: 'Added Successfully',
            //     message: 'Category Type',
            //     buttons: [
            //       {
            //         label: 'Ok'
            //       }
            //     ]
            // });
            this.setState({
                name: "",
                subName:"",
                isEditing:false,
                selectedID:'',
            })
        }  

        }


        validate = ()=>{
            let errorObj = this.state.errorObj
            if(this.state.name.length === 0){
                errorObj.Category=1
                this.setState({errorObj})
                return false
            }

            return true
            
        }



        handlePositionInputAction = (e)=>{
            this.setState({
                name:e.target.value
            })

            let errorObj=this.state.errorObj
        if(e.target.name === "Category"){
            errorObj.Category=0
            this.setState({errorObj})}

            this.props.handleCategoryInputAction(e.target.value)

        }


        handleClear=()=>{
            let errorObj = this.state.errorObj
            errorObj.Category=0
            //errorObj.locationTypeShortCode=0
            this.setState({name: "", subName:"", isEditing:false, selectedID:'', errorObj})
        }


        handleAddCategoryUpdate=()=>{
            // debugger;
          // this.props.handleSubAttributeUpdate(e.target.id)
          
          let updateID = parseInt(this.props.showSpecificPlantCategory.id)
          let updateObject={}
          updateObject.name=this.state.name
         // updateObject.id=this.props.showSpeciSubA.id
             
            //   let res1=   this.props.updatePlantSettingCategory(updateID, updateObject)
            //   res1.then(res=>{
            //       this.props.getAllPlantCategories()
            //   })
  
            //   this.setState({
            //       isEditing:false,
            //       name:""
            //   })

              if(this.validate()){
                let res=   this.props.updatePlantSettingCategory(updateID, updateObject)
                    res.then(res=>{
                        this.props.getAllPlantCategories().then(()=>{
                            // alert("ji")
                            this.getCatgoryData()
                        })
                    })
                    if (this.state.isEditing) {
                        // confirmAlert({
                        //     title: 'Updated Successfully',
                        //     message: 'Category Type',
                        //     buttons: [
                        //       {
                        //         label: 'Ok'
                        //       }
                        //     ]
                        // });
                    }
                    this.setState({
                        isEditing:false,
                        name:"",
                        subName:""
                    })
            }
      }




        handleEditClick2 =(t)=> {

            //console.log("ttt", t)
            // debugger;
             
         this.setState({
             name: t.name,
             isEditing:true,
             selectedID:t.id,
         })
         this.props.handleCategoryInputAction(...this.state.name)
         // this.props.handleCategoryInputAction("Category",...this.state.name)
          this.props.showSpecificPlantSettingAttribute(t.id)
       }

    getId =(e)=>{
       this.setState({startID:e.target.id})

    }
    
render() {

    //console.log("plantCategoryList",this.props.plantCategoryList)

    //console.log("showSpecificPlantCategory", this.props.showSpecificPlantCategory)
    // this.props.plantCategoryList.forEach((t)=>{
    //         tasks[t.category].push(
    //             <div key={t.name} onDragStart={(e)=>this.onDragStart(e, t.name)} onDelete={(e)=>this.onDelete(e, t.name)} draggable className="draggable" style={{backgroundColor:t.bgcolor}}>
    //                     {t.name}
    //             </div>
    //         )
    // });


//   alert("nice")
    
        return (
           
                   <div>
               <div className="bg-white">
                            <h4 className="p-15 mb-0">Categories</h4>
                            <hr className="m-0"/>
                            <div className="ContentSection p-15">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12">
                                        <p>Category Name</p>

                                        {/* <div className="row d-flex align-items-center">
                                            <div className="col-md-6 col-lg-6">  
                                                <input type="text" className="form-control" name="name" value={this.props.name}   placeholder="Category" onChange={this.handleCategoryInputAction}/>
                                            </div>
                                            <div className="col-md-6 col-lg-3" onClick={this.handleAddCategory}>
                                                <a href="javascript:" className="d-flex align-items-center" >
                                                    <i className="fa fa-plus-circle fa-2x mr-2"></i> Add New Category
                                                </a>
                                            </div>
                                        </div> */}
                                        <div className="row d-flex align-items-center">
                                        <div className="col-md-6 col-lg-6">  
                                                <input type="text" 
                                                className={this.state.isEditing===false ? "form-control" : "form-control" } style={{backgroundColor:this.state.isEditing===false?"white":"#d5ecf5"}}
                                                name="Category" 
                                                value={this.state.name}
                                                 placeholder="Category" onChange={this.handlePositionInputAction}/>
                                                  {this.state.errorObj.Category!==0?<span style={{fontSize:"small",color:"red"}}>Enter Category Type</span>:""}
                                            </div>


                                            {/* {this.state.isEditing ? (
                                                <div className="col-md-6 col-lg-3" onClick={this.handleAddCategoryUpdate}>
                                                    <div >
                                                    <a href="javascript:" className="d-flex align-items-center">
                                                        <i className="fa fa-plus-circle fa-2x mr-2"></i> Update Category
                                                    </a>
                                                    </div>

                                                    <div className="col-md-6 col-lg-3"  onClick={()=>{this.setState({isEditing:false})}}>
                                                    <a href="javascript:" className="d-flex align-items-center cancel_signlebox" style={{marginLeft:"12em"}}>
                                                        Cancel 
                                                    </a>
                                                    </div>
                                                </div>  
                                            ):
                                            (
                                                <div className="col-md-6 col-lg-3" onClick={this.handleAddCategory}>
                                                <a href="javascript:" className="d-flex align-items-center">
                                                    <i className="fa fa-plus-circle fa-2x mr-2"></i> Add New Category
                                                </a>
                                                </div>  
                                                )}  */}


                                        <div className="d-flex justify-content-md-end mt-2"  >
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
                                <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart} removeItem={this.removeItem}>
                        <div style={{display: 'flex',paddingTop:20, flexDirection: "row"}}>
                       
                            <div style={{flex:5}}>
                                <div class="card midCard">
                                    <div class="card-header">
                                        Inactive
                                    </div>


                                    {!this.state.loading?  <div style={{height: "300px",lineHeight: "300px",textAlign: "center",backgroundColor:"#F0F0F0"}}><Loader/></div>:<div class="card-body cardBg" >
                                   <ul class="list-unstyled" id="categoryActive">
                                    <Droppable droppableId="droppable2">
                                        {(provided, snapshot) => (
                                            <div
                                            style={{height:this.state.inactive.length>5?"auto":265}} 
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
                                                        <div className={this.state.isEditing===false  ? "a" :this.state.selectedID === item.id ? "reasonBackground a" : "a"}><span id={item.id}    >{item.name}</span>
                                                        
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
                                            <div    style={{maxWidth:165,height:100,width:165}}
                                                ref={provided.innerRef}
                                            >
                                              
                                                    <Draggable
                                                        key="delete"
                                                        draggableId="delete"
                                                       
                                                        index={0}>
                                                        {(provided, snapshot) => (
                                                           
                                                        
                                                                
                                                                <div className="deleteSpace"  ref={provided.innerRef}  style={{height:"70px"}}>
                                                <i className ={`fa fa-trash ${this.state.deleteon===true?"trashShake":""}`}style={{fontSize:35,color:"red"}} ></i>
                                                <p style={{fontSize:"14px",fontWeight:"bold",color:"gray",textAlign:"center"}}>Drag & Drop Here to Remove</p>
                                                {/* <img style={{width:"5em"}} src="./assets/img/Genral_Icons/Drag _Drop_remove_red.png" alt="Settings" className="trashShake"/> */}
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
                                            <div   style={{height:this.state.active.length>5?"auto":265}} 
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
                                                        <div className={this.state.isEditing===false  ? "a" :this.state.selectedID === item.id ? "reasonBackground a" : "a"}><span id={item.id}    >{item.name}</span>
                                                        
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
        // //console.log(state)
         {
        
    plantCategoryList:state.categoryData.plantCategoryData,
    temp:state,
    name:state.categoryData.name,
    showSpecificPlantCategory:state.categoryData.showSpecificPlantCategory
    }
    )
    export default connect(mapStateToProps,{
        getAllPlantCategories,
        handleCategoryInputAction,
        handleAddCategory,
        handleDragDrop,
        handleCategoryDragSort,
        handleCategoryDelete,
        showSpecificPlantSettingAttribute,
        updatePlantSettingCategory,
        showSubSubAttribute
    })(Categories)

