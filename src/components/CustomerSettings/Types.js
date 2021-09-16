/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from 'react'
import {connect} from "react-redux";
import * as MdIcons from "react-icons/md";
// import './style.css';
import InfoModal from "../Modal/InfoModal";
import Sortable from 'sortablejs'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from '../ProductManager/Loader'
import {getAllPlantCategories,handleCategoryInputAction,handleAddCategory,handleDragDrop,handleCategoryDelete} from '../../actions/categoryAction'
import {customerTypeSort,handleCustomerTypeDelete,saveNoticationData,getNotificationData,handleExchangeData,saveCustomerType,
    getAllCustomerType,handleDragDropCustomer,updateCustomerTypeSettings, showSpecificCustomerSettingType,handleExchangeData2} from "../../actions/customerSettingAction";
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
    class Types extends Component {
    state ={
     isOpen1:false,
       message:[],
       isEditing:false,
            name:'',
            subName:'',
            subName2:'',
            selectedID:'',
            btnLabelAdd:'Add New Category Type',
            btnLabelUpdate: 'Update Category Type',
            btnLabelCancel:'Cancel',
             deleteon:false,
             loading:false,


             errorObj:{
                customer_type:0,
                short_code:0
            },
            active:[],inactive:[]

           
    }
    getCatgoryData = ()=>{
        let data = {};
        let active= this.props.customerData.customerTypeList.active
       let inactive=this.props.customerData.customerTypeList.inactive
        this.setState({active:active,inactive:inactive,loading:true})
    }
componentDidMount(){
    

    var elData = document.getElementById('categoryActive');
    var elData1 = document.getElementById('categoryInactive');
    this.props.getAllCustomerType().then(()=>{
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
            title: 'Delete Type ',
            message: 'Are you sure want to delete the Type ?',
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
        this.props.customerTypeSort(this.state.inactive[result.source.index].id,this.state.inactive[result.destination.index].id,"down")
        else  this.props.customerTypeSort(this.state.inactive[result.source.index].id,this.state.inactive[result.destination.index].id,"up")
        this.setState({inactive:items});
        }else{
          
                    //        if(evt.willInsertAfter ==true)
        if(result.destination.index> result.source.index)
        this.props.customerTypeSort(this.state.active[result.source.index].id,this.state.active[result.destination.index].id,"down")
        else  this.props.customerTypeSort(this.state.active[result.source.index].id,this.state.active[result.destination.index].id,"up")
        this.setState({active:items});
        }
        
    } else {
       
        if (source.droppableId === 'droppable2') {
        let task= this.state.inactive.filter(data=>data.id ==this.state.inactive[source.index]["id"])
        console.log(task)
                  if(task.length > 0){
                    task[0].status =parseInt(task[0].status )==1? 0:1
                                this.props.updateCustomerTypeSettings(task[0].id,task[0]).then(data=>{
                                    this.props.getAllCustomerType().then(()=>{
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
                this.props.updateCustomerTypeSettings(task[0].id,task[0]).then(data=>{
                    this.props.getAllCustomerType().then(()=>{
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
//     this.props.customerTypeSort(evt.dragged.id,evt.related.id,"down")
//     else  this.props.customerTypeSort(evt.dragged.id,evt.related.id,"up")

//    }else{
//        if(evt.from.id =="categoryActive"){
//           let task= this.state.active.filter(data=>data.id ==evt.dragged.id)
//           //console.log(task)
//           if(task.length > 0){
//               let taskData = task[0]
//               taskData.status =parseInt(taskData.status)==1? 0:1
//               this.props.updateCustomerTypeSettings(taskData.id,taskData).then(data=>{
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
//             this.props.updateCustomerTypeSettings(taskData.id,taskData).then(data=>{
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

   


        onDelete =(ev)=>{
            let id= this.state.selectedID
            confirmAlert({
                title: 'Delete Categories Type',
                message: 'Are you sure want to delete the Categories Type?',
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
            let result= this.props.handleCustomerTypeDelete(id,"delete-customer-type")
            this.setState({deleteon:true})
            result.then(res=>{
                this.props.getAllCustomerType().then(data=>{
                    this.setState({deleteon:false})

                })
               
            }).catch(data=>{
                this.setState({deleteon:false})

                   confirmAlert({
                   title: 'Alert',
                   message: 'Please note that this Type  is associated with Customer.Please reassign before deleting ',
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
            if(e.target.name === "customer_type"){
            errorObj.customer_type=0
            this.setState({errorObj})}
            this.props.handleExchangeData("customer_type", e.target.value)
        }

        handleCategoryInputAction2 = (e)=>{
            this.setState({
                subName:e.target.value
            })

            let errorObj=this.state.errorObj
            if(e.target.name === "short_code"){
                errorObj.short_code=0
                this.setState({errorObj})}
            this.props.handleExchangeData2("short_code",e.target.value)
        }


        handleAddCategoryData = (e)=>{
            // if( this.state.name.trim() ==="" ||  this.state.subName.trim() ===""){
                
            //     this.setState({isOpen1:true,message:["please add both type and shortcode"]})


            // }else{
                let obj = {}
                obj.customer_type = this.state.name
                //this.props.customerData.customerTypes.customer_type
                obj.short_code = this.state.subName
                //this.props.customerData.customerTypes.short_code
                obj.status = 1
            //   this.props.saveCustomerType(obj).result.then(data=>{
            //         this.props.getAllCustomerType().then(data=>{
            //             this.getCatgoryData()
            //             this.setState({
            //                 name: "",
            //                 subName:"",
            //                 isEditing:false,
            //                 selectedID:'',
            //             })
            //         })
            //     })
            // // }


            if(this.validate()){
                this.props.saveCustomerType(obj).then(res=>{
                    this.props.getAllCustomerType().then(data=>{
                        this.getCatgoryData()
                        this.setState({
                            name: "",
                            subName:"",
                            isEditing:false,
                            selectedID:'',
                        })

                    })
                })
        
             
            } 
        // }
            // this.props.saveCustomerType()
        
        }


          
    validate = ()=>{
        let errorObj = this.state.errorObj
        if(this.state.name.length === 0){
            errorObj.customer_type=1
            this.setState({errorObj})
            return false
        }
        if(this.state.subName.length < 8){
            errorObj.short_code=1
            this.setState({errorObj})
            return false
        }
        return true
        
    }



        handleEditClick2 =(t)=> {
            console.log("abcdefg", t  )

            this.setState({
                name: t.customer_type,
                subName:t.short_code,
                selectedID:t.id,
                isEditing:true
            })

            this.props.handleExchangeData("customer_type",...this.state.name)
            this.props.handleExchangeData("short_code",...this.state.subName)
            this.props.showSpecificCustomerSettingType(t.id)
  
       }


       handleClear=()=>{
        let errorObj = this.state.errorObj
        errorObj.customer_type=0
        errorObj.short_code=0
        this.setState({name: "", subName:"", isEditing:false, selectedID:'', errorObj})
    }

       handleAddCategoryUpdate=(e)=>{
        //debugger;
        console.log("showSpeciSubA", this.props.showSpecificCustomerSetting)
         // this.props.handleSubAttributeUpdate(e.target.id)
         let valueName = this.state.name
         let shortCode = this.state.subName
         let updateID = parseInt(this.props.showSpecificCustomerSetting.id)
         let updateObject={}
         updateObject.customer_type=valueName
         updateObject.short_code=shortCode
        //  updateObject.attribute_id=1
         //updateObject.status=1

      
            
    //   let res=   this.props.updateCustomerTypeSettings(updateID, updateObject)
    //          res.then(res=>{
    //              this.props.getAllCustomerType()
    //          })

    //          this.setState({
    //              isEditing:false,
    //              name:"",
    //              subName:""
    //          })



             if(this.validate()){
               this.props.updateCustomerTypeSettings(updateID, updateObject).then(res=>{
                        // alert("F")
                        this.props.getAllCustomerType().then(data=>{
                            this.getCatgoryData()
                            this.setState({
                                isEditing:false,
                                name:"",
                                subName:""
                            })

                        })
                    })
                    // if (this.state.isEditing) {
                    //     confirmAlert({
                    //         title: 'Updated Successfully',
                    //         message: 'Categorires Type',
                    //         buttons: [
                    //           {
                    //             label: 'Ok'
                    //           }
                    //         ]
                    //     });
                    // }
                 
            }

     }



render() {
    console.log("showSpeciSubA", this.props.showSpecificCustomerSetting)

    console.log("this.props.customerData.customerTypes.customer_type", this.props.customerData.customerTypes,)
    var tasks={
        inactive:[],
        active:[],
    }
    const {customerData} = this.props
    if(this.props.plantCategoryList){
        // tasks=this.props.plantCategoryList
         this.props.plantCategoryList.forEach((t)=>{
             console.log(t)
            if(t.status === "1"){
                tasks.active.push(t)
            }
            else if(t.status=== "0"){
                tasks.inactive.push(t)
            }
         })
    }
    console.log(this.props.customerData.customerTypeList)
    // this.props.plantCategoryList.forEach((t)=>{
    //         tasks[t.category].push(
    //             <div key={t.name} onDragStart={(e)=>this.onDragStart(e, t.name)} onDelete={(e)=>this.onDelete(e, t.name)} draggable className="draggable" style={{backgroundColor:t.bgcolor}}>
    //                     {t.name}
    //             </div>
    //         )
    // });


  
    
        return (
           
                   <div>
                       	<InfoModal status={this.state.isOpen1} message={this.state.message} modalAction={this.toggle1}/>
               <div className="bg-white">
                            <h4 className="p-15 mb-0">Categories</h4>
                            <hr className="m-0"/>
                            <div className="ContentSection p-15">
                               
                                <div className="row">
                                        <div className="col-md-6">
                                            <label style={{fontWeight:"bold"}}>Type</label>
                                            
                                            <div>
                                                <input type="text"
                                                className={this.state.isEditing===false ? "form-control" : "form-control" } style={{backgroundColor:this.state.isEditing===false?"white":"#d5ecf5"}}
                                                  placeholder="" name="customer_type" 
                                               // value={customerData.customerTypes.customer_type}  
                                               value={this.state.name} 
                                                onChange={this.handleCategoryInputAction}/>
                                                 {this.state.errorObj.customer_type!==0?<span style={{fontSize:"small",color:"red"}}>Enter Categories Types</span>:""}
                                            </div>
                                            <div className="d-flex justify-content-md-end mt-2">
                                                
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label>Short Code</label> <span style={{fontSize:"10px", marginTop:"0em"}}> (Upto 8 Char)</span>
                                            <div>
                                                <input type="text"
                                                className={this.state.isEditing===false ? "form-control" : "form-control" } style={{backgroundColor:this.state.isEditing===false?"white":"#d5ecf5"}}
                                                 placeholder="" name="short_code"
                                                 value={this.state.subName} 
                                                //  value={customerData.customerTypes.short_code} 
                                                   onChange={this.handleCategoryInputAction2} maxLength={8}/>

                                                {this.state.errorObj.short_code!==0?<span style={{fontSize:"small",color:"red"}}>Enter Short Code</span>:""}
                                            
                                            </div>





                                            {/* <div className="d-flex justify-content-md-end mt-2" onClick={this.handleAddCategoryData}>
                                                <a className="d-flex align-items-center">
                                                    <i className="fa fa-plus-circle fa-2x mr-2"></i> Add New Type
                                                </a>
                                            </div> */}
                                            {/* {this.state.isEditing ? (
                                                <div className="d-flex justify-content-md-end mt-2" style={{paddingTop:"10px"}} onClick={this.handleAddCategoryUpdate}>
                                                    <div >
                                                        <a href="javascript:" className="d-flex align-items-center">
                                                            <i className="fa fa-plus-circle fa-2x mr-2"></i> Update Type
                                                        </a>
                                                    </div>

                                                        <div className="d-flex justify-content-md-end mt-2"  onClick={()=>{this.setState({isEditing:false})}}>
                                                        <a className="d-flex align-items-center" style={{marginLeft:"2.5em", marginTop:"-6px"}}>Cancel </a>
                                                           
                                                        </div>

                                                </div>


                                                    ):
                                                    (
                                                    <div className="d-flex justify-content-md-end mt-2"  onClick={this.handleAddCategoryData}>
                                                    <a href="javascript:" className="d-flex align-items-center">
                                                    <i className="fa fa-plus-circle fa-2x mr-2"></i> Add New Type
                                                    </a>
                                                    </div>  
                                         )}    */}



                            <div className="d-flex justify-content-md-end mt-2" style={{paddingTop:"10px"}} >
                                <div >
                                    <a href="javascript:" className="d-flex align-items-center" onClick={this.state.isEditing ? this.handleAddCategoryUpdate : this.handleAddCategoryData}> 
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
                                  
                                    <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart} removeItem={this.removeItem}>
                        <div style={{display: 'flex',paddingTop:20}}>
                       
                            <div style={{flex:5}}>
                                <div class="card midCard">
                                    <div class="card-header">
                                        Inactive
                                    </div>


                                    {!this.state.loading?  <div style={{height: "300px",lineHeight: "300px",textAlign: "center",backgroundColor:"#F0F0F0"}}><Loader/></div>:<div class="card-body cardBg"
                                   >
                                   <ul class="list-unstyled" id="categoryActive">
                                    <Droppable droppableId="droppable2">
                                        {(provided, snapshot) => (
                                            <div style={{height:this.state.inactive.length>5?"auto":265}} 
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
                                                        <div className={this.state.isEditing===false  ? "a" :this.state.selectedID === item.id ? "reasonBackground a" : "a"}><span id={item.id}    >{item.customer_type} ({item.short_code})</span>
                                                        
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
                                            <div style={{maxWidth:165,height:100,width:165}}
                                                ref={provided.innerRef}
                                            >
                                              
                                                    <Draggable
                                                        key="delete"
                                                        draggableId="delete"
                                                       
                                                        index={0}>
                                                        {(provided, snapshot) => (
                                                            <div   
                                                            ref={provided.innerRef}>
                                                        
                                                                
                                                                <div className="deleteSpace"  style={{height:"70px"}}>
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
                                                        <div className={this.state.isEditing===false  ? "a" :this.state.selectedID === item.id ? "reasonBackground a" : "a"}><span id={item.id}    >{item.customer_type}  ({item.short_code})</span>
                                                        
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
    showSpecificCustomerSetting: state.customerReducer.showSpecificCustomerSettingType,
    }
    )
    export default connect(mapStateToProps,{
        handleCustomerTypeDelete,
        handleCategoryInputAction,
        handleAddCategory,
        handleDragDrop,
        handleCategoryDelete,
        handleExchangeData,
        saveCustomerType,
        getAllCustomerType,
        updateCustomerTypeSettings, 
        showSpecificCustomerSettingType,
        handleExchangeData2,
        customerTypeSort,
handleDragDropCustomer    })(Types)

