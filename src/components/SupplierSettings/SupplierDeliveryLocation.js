  /* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from 'react'
import {connect} from "react-redux";
import * as MdIcons from "react-icons/md";
// import './style.css';
import InfoModal from "../Modal/InfoModal"
import { countryDetails } from '../Help/countryList';
import Sortable from 'sortablejs'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from '../ProductManager/Loader'
import {saveReasonMethod,getAllReasonMethods,handleCustomerTypeDelete,handleDragDropCustomer,saveDeliveryMethod,saveNoticationData,getNotificationData,handleExchangeData,getAllDeliveryMethods} from "../../actions/customerSettingAction";
import { is } from 'immutable';
import {supplierLocationSort,getAllSupplierReasonMethods,saveSupplierReasonMethod,handleSupplierExchnageData,
    saveSupplierCategoryMethod,getAllSupplierCategoryMethods,getAllSupplierLocationMethods,
    saveSupplierLocationMethod,  updateSupplierLocation, showSpecificDeliveryLocation,resetSupplierData}   from "../../actions/supplierManagementAction"
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

    class SupplierDeliveryLocation extends Component {
    state ={
     isOpen1:false,
       message:[],
       countZipRegix:null,
       isEditing:false,
       selectedID:'',
       deleteon:false,

       btnLabelAdd:'Add New Location',
       btnLabelUpdate: 'Update Location',
       btnLabelCancel:'Cancel',

                address:"",
                city:"",
                country:"",
                lat:"",
                location:"",
                state:"",
                zip:"",
                loading:false,

                errorObj:{
                    address:0,
                    city:0,
                    country:0,
                    lat:0,
                    location:0,
                    state:0,
                    zip:0,
                },
                active:[],inactive:[]




    }


    handleClear=()=>{
        let errorObj = this.state.errorObj
        errorObj.address=0
        errorObj.city=0
        errorObj.customer_type=0
        errorObj.country=0
        errorObj.lat=0
        errorObj.location=0
        errorObj.state=0
        errorObj.zip=0
        this.setState({name: "", subName:"", address:"",
        city:"",
        country:"",
        lat:"",
        location:"",
        state:"",
        zip:"",
        isEditing:false, selectedID:'', errorObj})

        this.props.resetSupplierData();
    }
        // componentDidMount(){
        //     this.props.getAllSupplierLocationMethods().then()
          
        // }
           
    getCatgoryData = ()=>{
        let data = {};
        let active= this.props.supplierData.supplierLocationList.active
       let inactive=this.props.supplierData.supplierLocationList.inactive
        this.setState({active:active,inactive:inactive,loading:true})
    }
componentDidMount(){
    
    this.props.resetSupplierData()
    this.props.getAllSupplierLocationMethods().then(()=>{
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
            title: 'Delete Delivery Location ',
            message: 'Are you sure want to delete the Delivery Location ?',
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
        this.props.supplierLocationSort(this.state.inactive[result.source.index].id,this.state.inactive[result.destination.index].id,"down")
        else  this.props.supplierLocationSort(this.state.inactive[result.source.index].id,this.state.inactive[result.destination.index].id,"up")
        this.setState({inactive:items});
        }else{
          
                    //        if(evt.willInsertAfter ==true)
        if(result.destination.index> result.source.index)
        this.props.supplierLocationSort(this.state.active[result.source.index].id,this.state.active[result.destination.index].id,"down")
        else  this.props.supplierLocationSort(this.state.active[result.source.index].id,this.state.active[result.destination.index].id,"up")
        this.setState({active:items});
        }
        
    } else {
       
        if (source.droppableId === 'droppable2') {
        let task= this.state.inactive.filter(data=>data.id ==this.state.inactive[source.index]["id"])
                  if(task.length > 0){
                    task[0].status =parseInt(task[0].status )==1? 0:1
                    this.props.updateSupplierLocation(task[0].id,task[0]).then(data=>{
                        this.props.getAllSupplierLocationMethods().then(()=>{
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
                this.props.updateSupplierLocation(task[0].id,task[0]).then(data=>{
                    this.props.getAllSupplierLocationMethods().then(()=>{
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
//     this.props.supplierLocationSort(evt.dragged.id,evt.related.id,"down")
//     else  this.props.supplierLocationSort(evt.dragged.id,evt.related.id,"up")

//    }else{
//        if(evt.from.id =="categoryActive"){
//           let task= this.state.active.filter(data=>data.id ==evt.dragged.id)
//           //console.log(task)
//           if(task.length > 0){
//               let taskData = task[0]
//               taskData.status =parseInt(taskData.status)==1? 0:1
//               this.props.updateSupplierLocation(taskData.id,taskData).then(data=>{
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
//             this.props.updateSupplierLocation(taskData.id,taskData).then(data=>{
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
        //    let result= this.props.handleCustomerTypeDelete(id,"delete-delivery-supplier")
        //    result.then(res=>{
        //        this.setState({deleteon:false})
        //     this.props.getAllSupplierLocationMethods()
        //    })


        // }


        onDelete =(ev)=>{
            let id= this.state.selectedID
            confirmAlert({
                title: 'Delete Supplier Location ',
                message: 'Are you sure want to delete the Delivery Location?',
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
            let result= this.props.handleCustomerTypeDelete(id,"delete-delivery-supplier")
            this.setState({deleteon:true})
            result.then(res=>{
                this.props.getAllSupplierLocationMethods().then(()=>{
                    // alert("ji")
                    this.getCatgoryData()
                })
                this.setState({deleteon:false})
        
            }).catch(data=>{
                this.setState({deleteon:false})

                   confirmAlert({
                   title: 'Alert',
                   message: 'Please note that this Delivery Location is associated with Customer.Please reassign before deleting ',
                   buttons: [
                     {
                       label: 'Ok'
                     }
                   ]
                 });
           })
        }







        handleCategoryInputAction = (e)=>{

            let errorObj=this.state.errorObj
            if(e.target.name === "location"){
                errorObj.location=0
                this.setState({errorObj})}

            if(e.target.name === "address"){
                errorObj.address=0
                this.setState({errorObj})}
            
            if(e.target.name === "city"){
                errorObj.city=0
                this.setState({errorObj})}


            if(e.target.name === "state"){
                errorObj.state=0
                this.setState({errorObj})}

            if(e.target.name === "country"){
                this.props.handleSupplierExchnageData("Select State","state","supplierLocation")
                errorObj.country=0
                this.setState({errorObj})}
            
            if(e.target.name === "zip"){
                errorObj.zip=0
                this.setState({errorObj})}

            if(e.target.name === "lat"){
                errorObj.lat=0
                this.setState({errorObj})}

            this.props.handleSupplierExchnageData(e.target.value,e.target.id,"supplierLocation")
        }


        validate = ()=>{
            let {location,address,city,country,state,zip,lat} = this.props.supplierData.supplierLocation
            let errorObj = this.state.errorObj
            if(location.length === 0){
                errorObj.location=1
                this.setState({errorObj})
                return false
            }
            if(address.length ===0){
                errorObj.address=1
                this.setState({errorObj})
                return false
            }

            if(city.length === 0){
                errorObj.city=1
                this.setState({errorObj})
                return false
            }


            if(country === "Select Country"){
                errorObj.country=1
                this.setState({errorObj})
                return false
            }


            if(state === "Select State"){
                errorObj.state=1
                this.setState({errorObj})
                return false
            }
            if(zip.length ===0){
                errorObj.zip=1
                this.setState({errorObj})
                return false
            }

            if(lat.length ===0){
                errorObj.lat=1
                this.setState({errorObj})
                return false
            }



            return true
            
        }


        validation = () =>{
            let {location,address,city,country,state,zip,lat} = this.props.supplierData.supplierLocation




            // if(location ==="" || address ==="" || city===""|| country===""||state===""||zip===""||lat ==="")
            // return 1
            // if (zip === "zipcode") {
                // if(zip ==""){
                //      this.setState({message:["Postal/ZIP not valid"]})
                //     // alert("DSaf")
                //     return 1

                // }
                // if(zip !== "" ){
                // if ( !zip.trim().match(this.countZipRegix)) {
                    // this.setState({message:["Postal/ZIP not valid"]})
                    // alert("DSaf")
                    // return 1
                    // document.getElementById("zipcode-validtor").innerText = "Postal/ZIP not valid"
                    // errorCount++;

                // } else {
                    // document.getElementById("zipcode-validtor").innerText = ""
                // }
            // }

            // }
        }


        handleAddCategoryData = (e)=>{
            // let errorLength =  this.validation()
            // if(errorLength ===1){
                
            //     this.setState({isOpen1:true,message:["Please fill all fileds"]})


            // }else{
                let obj = {}
                obj.location = this.props.supplierData.supplierLocation.location
                obj.address = this.props.supplierData.supplierLocation.address
                obj.city = this.props.supplierData.supplierLocation.city
                obj.country = this.props.supplierData.supplierLocation.country
                obj.state = this.props.supplierData.supplierLocation.state
                obj.zip = this.props.supplierData.supplierLocation.zip
                obj.lat = this.props.supplierData.supplierLocation.lat
                obj.long = 2
                obj.status = 1
                // let result = this.props.saveSupplierLocationMethod(obj)
                // result.then(data=>{
                //     this.props.getAllSupplierLocationMethods()
                // })
            // }
            // this.props.saveCustomerType()
        
        // }


        if(this.validate()){
            let result = this.props.saveSupplierLocationMethod(obj)
            result.then(res=>{
                this.props.getAllSupplierLocationMethods().then(()=>{
                    // alert("ji")
                    this.getCatgoryData()
                })
            })
    
            this.setState({
                name: "",
                subName:"",
                isEditing:false,
                selectedID:'',

                address:"",
                city:"",
                country:"",
                lat:"",
                location:"",
                state:"",
                zip:"",
            })

            this.props.resetSupplierData();
        } 




    }


    handleAddCategoryUpdate=()=>{
         //debugger;
      // this.props.handleSubAttributeUpdate(e.target.id)
      
      let updateID = parseInt(this.props.specificSupplierDelivery.id)
      let updateObject={}
      updateObject.location = this.props.supplierData.supplierLocation.location
      updateObject.address = this.props.supplierData.supplierLocation.address
        updateObject.city = this.props.supplierData.supplierLocation.city
        updateObject.country = this.props.supplierData.supplierLocation.country
        updateObject.state = this.props.supplierData.supplierLocation.state
        updateObject.zip = this.props.supplierData.supplierLocation.zip
        updateObject.lat = this.props.supplierData.supplierLocation.lat
   
     // updateObject.id=this.props.showSpeciSubA.id
         
        //   let res1=   this.props.updateSupplierLocation(updateID, updateObject)
        //   res1.then(res=>{
        //       this.props.getAllSupplierLocationMethods()
        //   })

        //   this.setState({
        //       isEditing:false,
              
        //   })





          if(this.validate()){
            let res=   this.props.updateSupplierLocation(updateID, updateObject)
                res.then(res=>{
                    this.props.getAllSupplierLocationMethods().then(()=>{
                        // alert("ji")
                        this.getCatgoryData()
                    })
                })
                if (this.state.isEditing) {
                    // confirmAlert({
                    //     title: 'Updated Successfully',
                    //     message: 'Supplier Location ',
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
                    subName:"",
                    address:"",
                    city:"",
                    country:"",
                    lat:"",
                    location:"",
                    state:"",
                    zip:"",
                })

                this.props.resetSupplierData()
        }
  }


    handleEditClick2 =(t)=> {
        //debugger;
        console.log("tttt", t)
           this.setState({
         isEditing:true,
         selectedID:t.id,
     })

     this.props.handleSupplierExchnageData(t.location,"location","supplierLocation")
     this.props.handleSupplierExchnageData(t.address,"address","supplierLocation")
     this.props.handleSupplierExchnageData(t.city,"city","supplierLocation")
     this.props.handleSupplierExchnageData(t.country,"country","supplierLocation")
     this.props.handleSupplierExchnageData(t.lat,"lat","supplierLocation")
     this.props.handleSupplierExchnageData(t.state,"state","supplierLocation")
     this.props.handleSupplierExchnageData(t.zip,"zip","supplierLocation")
    //  this.props.handleSupplierExchnageData(...this.state.name,"reason","supplierReason")
        //this.props.handleReasonInputAction("supplierReason", ...this.state.name)zip
        this.props.showSpecificDeliveryLocation(t.id)

       // console.log("ttttttt", t,  this.props.handleReasonInputAction())
        // debugger;  
    //  this.setState({
    //      name: t.value,
    //      isEditing:true
    //  })

   }



render() {


    console.log("supplierLocationDataOnly", this.props.supplierLocationDataOnly)
 
    const {supplierData} = this.props
    console.log("supplierData", supplierData)

    console.log("showSpeciSubA",this.props.specificSupplierDelivery)
    let allCountry = Object.keys(countryDetails);
        
    let allStates ;
    // let countZipRegix
    if(supplierData.supplierLocation.country && supplierData.supplierLocation.country !== "Select Country"){
        console.log(countryDetails)
        console.log(supplierData.supplierLocation.country)
        console.log(countryDetails[supplierData.supplierLocation.country])
        allStates = countryDetails[supplierData.supplierLocation.country][0];
        this.countZipRegix=countryDetails[supplierData.supplierLocation.country][1][0]
        console.log(this.countZipRegix)
        // console.log(this.state.clientData.country)
    }
// }

    console.log(this.props.supplierData.supplierCategoryList)
        return (
           
                   <div>
                       	<InfoModal status={this.state.isOpen1} message={this.state.message} modalAction={this.toggle1}/>
               <div className="bg-white">
 <h4 className="p-15 mb-0"> Supplier Delivery Location</h4>
                
                            <hr className="m-0"/>
                            <div className="ContentSection p-15">
                               
                                <div className="row">
                                        <div className="col-md-4">
                                            {/* <p>Location</p> */}
                                            <label for="Category">Location</label>
                                            <div>
                                                <input type="text"   id="location" name="location"
                                                 value={supplierData.supplierLocation.location}  
                                                 className={this.state.isEditing===false ? "form-control" : "form-control" } style={{backgroundColor:this.state.isEditing===false?"white":"#d5ecf5"}}
                                                  placeholder="Location" onChange={this.handleCategoryInputAction}/>
                                                  {this.state.errorObj.location!==0?<span style={{fontSize:"small",color:"red"}}>Enter location</span>:""}
                                            </div>
                                            <div className="d-flex justify-content-md-end mt-2">
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label for="Category">Address</label>
                                            <div>
                                            <input type="text"   id="address" name="address"
                                            value={supplierData.supplierLocation.address} className={this.state.isEditing===false ? "form-control" : "form-control" } style={{backgroundColor:this.state.isEditing===false?"white":"#d5ecf5"}} 
                                             placeholder="Address" onChange={this.handleCategoryInputAction}/>
                                             {this.state.errorObj.address!==0?<span style={{fontSize:"small",color:"red"}}>Enter Address</span>:""}

                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            {/* <p>City</p> */}
                                            <label for="Category">City</label>
                                            <div>
                                                <input type="text"  name="city"
                                                 id="city" value={supplierData.supplierLocation.city}  className={this.state.isEditing===false ? "form-control" : "form-control" } style={{backgroundColor:this.state.isEditing===false?"white":"#d5ecf5"}}
                                                  placeholder="City" onChange={this.handleCategoryInputAction}/>
                                                  {this.state.errorObj.city!==0?<span style={{fontSize:"small",color:"red"}}>Enter City</span>:""}
                                            </div>
                                           
                                        </div>
                                    </div>


                                    <div className="row" style={{marginTop:"0.7em"}}>
                                            <div className="col-md-3">
                                                        <label for="Category">Prov/State</label>
                                                            <select className={this.state.isEditing===false ? "form-control" : "form-control" } style={{backgroundColor:this.state.isEditing===false?"white":"#d5ecf5"}} id="state"  name="state" value={supplierData.supplierLocation.state}  onChange={this.handleCategoryInputAction}>
                                                            <option>{supplierData.supplierLocation.state}</option>
                                                            {allStates && allStates.map((c, i)=>{
                                                                    return <option id={allStates[i]}>{allStates[i]}</option>
                                                            })}
                                                               
                                                            </select>
                                                            {this.state.errorObj.state!==0?<span style={{fontSize:"small",color:"red"}}>Enter state</span>:""}
                                            </div>

                                            <div className="col-md-3">
                                                        <label for="Category">Country</label>
                                                            <select className={this.state.isEditing===false ? "form-control" : "form-control" } style={{backgroundColor:this.state.isEditing===false?"white":"#d5ecf5"}}  id="country" name="country" value={supplierData.supplierLocation.country}   placeholder="Country" onChange={this.handleCategoryInputAction}>
                                                                <option>Select Country</option>
                                                                {allCountry.map((country, i)=>{
                                                                    return <option id={allCountry[i]} selected={supplierData.supplierLocation.country ==allCountry[i]?"selected":""}>{allCountry[i]}</option>
                                                                })}
                                                                
                                                            </select>

                                                            {this.state.errorObj.country!==0?<span style={{fontSize:"small",color:"red"}}>Enter country </span>:""}
                                            </div>
                                            <div className="col-md-3">
                                            {/* <p></p> */}
                                            <label for="Category">Postal/ZIP</label>
                                            <div>
                                                <input type="text"  id="zip"  name="zip"
                                                value={supplierData.supplierLocation.zip} className={this.state.isEditing===false ? "form-control" : "form-control" } style={{backgroundColor:this.state.isEditing===false?"white":"#d5ecf5"}}
                                                 placeholder="Postal/ZIP" 
                                                 onChange={this.handleCategoryInputAction}/>
                                                 {this.state.errorObj.zip!==0?<span style={{fontSize:"small",color:"red"}}>Enter zip</span>:""}
                                            </div>
                                            <div className="d-flex justify-content-md-end mt-2">
                                            </div>
                                        </div>
                                        

                                        <div className="col-md-3">
                                            {/* <p></p> */}
                                            <label for="Category">Lat/Long</label>
                                            <div>
                                                <input type="text"   id="lat"  name="lat"
                                                value={supplierData.supplierLocation.lat}   placeholder="Lat/Long"  className={this.state.isEditing===false ? "form-control" : "form-control" } style={{backgroundColor:this.state.isEditing===false?"white":"#d5ecf5"}}
                                                onChange={this.handleCategoryInputAction}/>
                                                {this.state.errorObj.lat!==0?<span style={{fontSize:"small",color:"red"}}>Enter lat</span>:""}
                                            </div>


                                         {/* <div className="d-flex justify-content-md-end mt-2" onClick={this.handleAddCategoryData}>
                                                <a  className="d-flex align-items-center">
                                                    <i className="fa fa-plus-circle fa-2x mr-2"></i> Add New Location
                                                </a>
                                               
                                            </div>  */}


                                            {/* {this.state.isEditing ? (
                                                    <div className="d-flex justify-content-md-end mt-2" style={{paddingTop:"10px"}} onClick={this.handleAddCategoryUpdate}>
                                                    <div >
                                                    <a href="javascript:" className="d-flex align-items-center">
                                                        <i className="fa fa-plus-circle fa-2x mr-2"></i> Update Location
                                                    </a>
                                                    </div>


                                                        <div className="d-flex justify-content-md-end mt-2"  onClick={()=>{this.setState({isEditing:false});  this.props.resetSupplierData()}}>
                                                        <a className="d-flex align-items-center" style={{marginLeft:"2.5em", marginTop:"-6px",cursor:"pointer"}}>Cancel </a>
                                                           
                                                        </div>
                                                    </div>


                                                    ):
                                                    (
                                                    <div className="d-flex justify-content-md-end mt-2"  onClick={this.handleAddCategoryData}>
                                                    <a href="javascript:" className="d-flex align-items-center">
                                                    <i className="fa fa-plus-circle fa-2x mr-2"></i> Add New Location
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

                                    <div className="row" style={{marginTop:"1.2em"}}>
                                
                                    </div>
                               
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
                                                                <li id={item.id} >
                                                                 <a className="d-flex justify-content-between align-items-left" style={{paddingBottom:1,paddingTop:2}}>
                                                                      <div id="Wheathers" className={this.state.isEditing===false  ? "" :this.state.selectedID === item.id ? "reasonBackground1" : ""}>
                                                                      <div style={{display:"block",float:"left"}}>
                                                                      <p style={{padding:0,margin:0,color:"#348fe2",fontWeight:"bold"}}>{item.location}</p>
                                                                      <p style={{color:"gray",display:"block",width:"100%",padding:0,margin:0,fontSize:"14px"}}>{item.address}</p>
                                                                      <p style={{color:"gray",padding:0,margin:0,fontSize:"14px"}}>{item.city}, {item.state},  {item.country}</p>
                                                                      </div>
                                                                      </div>
                                                                   
                                                                      <p style={{color:"gray",padding:2,margin:2}}><span style={{float:"right",fontSize:20, cursor:"pointer", color:"#629c44",marginTop:"-8px"}}><MdIcons.MdEdit  
                                                                            onClick={() =>this.handleEditClick2(item)}
                                                                /></span><p style={{marginTop:"32px",cursor:"pointer"}}><img class="mapMarkerIc" src="assets/img/map-marker-blue.svg"/></p></p>
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
                                                            <div   
                                                            ref={provided.innerRef}>
                                                        
                                                                
                                                                <div className="deleteSpace"  style={{height:"70px"}} >
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
                                                                <li id={item.id} >
                                                                 <a className="d-flex justify-content-between align-items-left" style={{paddingBottom:1,paddingTop:2}}>
                                                                      <div id="Wheathers" className={this.state.isEditing===false  ? "" :this.state.selectedID === item.id ? "reasonBackground1" : ""}>
                                                                      <div style={{display:"block",float:"left"}}>
                                                                      <p style={{padding:0,margin:0,color:"#348fe2",fontWeight:"bold"}}>{item.location}</p>
                                                                      <p style={{color:"gray",display:"block",width:"100%",padding:0,margin:0,fontSize:"14px"}}>{item.address}</p>
                                                                      <p style={{color:"gray",padding:0,margin:0,fontSize:"14px"}}>{item.city}, {item.state},  {item.country}</p>
                                                                      </div>
                                                                      </div>
                                                                   
                                                                      <p style={{color:"gray",padding:2,margin:2}}><span style={{float:"right",fontSize:20, cursor:"pointer", color:"#629c44",marginTop:"-8px"}}><MdIcons.MdEdit  
                                                                            onClick={() =>this.handleEditClick2(item)}
                                                                /></span><p style={{marginTop:"32px",cursor:"pointer"}}><img class="mapMarkerIc" src="assets/img/map-marker-blue.svg"/></p></p>
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
                        </div>
        </div>
       
        )
    }
}

     const mapStateToProps = (state)=> (
        // console.log(state)
         {
            supplierData:state.supplierData,
            specificSupplierDelivery:state.supplierData.specificSupplierDeliveryList,
            supplierLocationDataOnly: state.supplierData.supplierLocation
        
    }
    )
    export default connect(mapStateToProps,{
        handleExchangeData,
        saveDeliveryMethod,
        getAllDeliveryMethods,
        handleCustomerTypeDelete,
        getAllReasonMethods,
        getAllSupplierReasonMethods,
        saveSupplierReasonMethod,
        handleSupplierExchnageData,
        getAllSupplierCategoryMethods,
        saveSupplierCategoryMethod,
        getAllSupplierLocationMethods,
        saveSupplierLocationMethod,
        updateSupplierLocation,
        showSpecificDeliveryLocation,
        handleDragDropCustomer,
        supplierLocationSort,
        resetSupplierData, })((SupplierDeliveryLocation))





   




