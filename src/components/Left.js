/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React ,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {getMenuItems,updateMenuItems} from '../actions/sideMenuAction'
import {checkLogin} from "../actions/authAction";
import {pageReDirectAction} from '../actions/productAction'
import {plantPageReDirectAction} from '../actions/plantManagerAction'
import {typeOfActionShow,resetCustomerFilds} from '../actions/customerSettingAction'
import {typeOfsupplierActionShow,resetSupplierFilds} from '../actions/supplierManagementAction'
import {clearPoData} from '../actions/purchaseOrderManagementAction'




const Left = (props)=>{
  const [selectedMainBarData,setSelectedMainBar] = useState("Dashboard")
  // const [selectedSubBar , setSelectedSubBar] = useState("")
  // const [initialSelect,setInitialSelect] = useState(true)
  const useEffect =(() =>{    
   props.getMenuItems()
  },[])
  
  console.log("karthike", props)

//  const handleMainSelection= (id) => {
//     console.log(id)
//    console.log(selectedSubBar)
//   if(!selectedSubBar.includes(id))setInitialSelect(true)
//   if(selectedSubBar.includes(id))setInitialSelect(false)

//   setSelectedMainBar(id)
//  }
const handleMainSelection= (id) => {
  let reduxObject = props.updateObject
  console.log("reduxObject",reduxObject.mainMenu)
  if(reduxObject.mainMenu =="CustomerManagement"){
    props.typeOfActionShow("")
    props.resetCustomerFilds()
  }
  if(reduxObject.mainMenu =="SupplierManagement"){
    props.typeOfsupplierActionShow("")
    props.resetSupplierFilds()
  }
  setSelectedMainBar(id)
  if(!reduxObject.submenu.includes(id)){
  }
  let updateObject={}
  
  props.getMenuItems()
  console.log(props)
  
  if(!reduxObject.submenu.includes(id)){
    updateObject.initialSelect=true
  }
  if(reduxObject.submenu.includes(id)){
    updateObject.initialSelect=false
  }
  updateObject.mainMenu=id
  props.updateMenuItems(updateObject)
  if(id.includes("inventory")){
    props.pageReDirectAction("product","add")
    props.plantPageReDirectAction("all","plant")
  }
  props.clearPoData()
}

 

 const handleSubSelection= (id) => {
  let updateObject={}
   if( id.includes("1")){
    // setInitialSelect(true)   
    updateObject.initialSelect=true
   }
   else {
    // setInitialSelect(false)
    updateObject.initialSelect=false
   }
   setSelectedMainBar(id)
   updateObject.submenu=id

  // setSelectedSubBar(id)
  props.updateMenuItems(updateObject)
  if(id.includes("inventory")){
    props.pageReDirectAction("product","add")
    props.plantPageReDirectAction("all","plant")
  }
  props.clearPoData()
 }

 const handleSideMenuEnter=() => {
  props.authKey.bdyClass=" page-sidebar-fixed page-header-fixed";
 }
 const handleSideMenuLeave=() => {
  props.authKey.bdyClass=" page-sidebar-fixed page-header-fixed page-sidebar-minified";
 }

 let reduxObject = props.updateObject
 let selectedMainBar=reduxObject.mainMenu
 let initialSelect = reduxObject.initialSelect
 let selectedSubBar = reduxObject.submenu


  return (
    <div>
      <div id="sidebar" class="sidebar" onMouseEnter={()=>{handleSideMenuEnter()}} onMouseLeave={()=>{handleSideMenuLeave()}}>
        <div data-scrollbar="true" data-height="100%">
          <ul class="nav">
            {/* <li>
              <a href="javascript:;" class="sidebar-minify-btn" data-click="sidebar-minify">
                <i class="fa fa-angle-double-left"></i>
              </a>
            </li> */}
            <li class={selectedMainBarData.includes("Dashboard")?"active":""} onClick={()=>{handleMainSelection("Dashboard")}} >
              <Link to="/Dashboard">
                <img src="assets/img/dashboard.svg" alt=""/>
                <span>Dashboard</span>
              </Link>
            </li>
            <li class={selectedMainBarData.includes("orderList")?"active":""} onClick={()=>{handleMainSelection("orderList")}} >             
              <Link to="/OrderList">
              <b class="caret"></b>
                <img src="assets/img/customer-quotes.svg" alt=""/>
                <span>Customer Quotes &amp; Orders</span>
              </Link>  
                <ul class="sub-menu">
                <li class= {(selectedSubBar === "orderList1")?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("orderList1")}}><Link to="/OrderList">Order List</Link></li>
                <li class= {(selectedSubBar === "orderList12" )?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("orderList12")}}><Link to="/QuoteList">Quote List</Link></li>
                <li class= {(selectedSubBar === "orderList2")?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("orderList2")}}><Link to="/QuoteAndOrdersManagement">New Order</Link></li>
                  <li class= {(selectedSubBar === "orderList13" )?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("orderList13")}}><Link to="/Quote">New Quote</Link></li>
                <li class= {(selectedSubBar === "orderList3")?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("orderList3")}}><Link to="/OrderReady">Quick Pick</Link></li>
                <li class= {(selectedSubBar === "orderList4")?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("orderList4")}}><Link to="/OrderReserve">Reserve</Link></li>
                <li class= {(selectedSubBar === "orderList5")?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("orderList5")}}><Link to="/InvoiceList">Invoices & Adjustments</Link></li>
                {/* <li class= {(selectedSubBar === "orderList6")?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("orderList6")}}><Link to="/OrderAdjusted">Requests</Link></li> */}
              </ul>          
            </li>
            <li class={selectedMainBarData.includes("purchaseOrder")?"active":""} onClick={()=>{handleMainSelection("purchaseOrder")}}>
              <Link to="/PurchaseOrderList">
              <b class="caret"></b>
                <img src="assets/img/purchase-orders.svg" alt=""/>
                <span>Purchase Orders</span>
              </Link>
              <ul class="sub-menu">
                <li class= {(selectedSubBar === "purchaseOrder1" || initialSelect)?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("purchaseOrder1")}}><Link to="/PurchaseOrderList">P.O.List</Link></li>
                <li class= {(selectedSubBar === "purchaseOrder2")?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("purchaseOrder2")}}><Link to="/PurchaseOrder">New P.O</Link></li>
              </ul>  
            </li>
            <li class={selectedMainBarData.includes("inventory")?"active":""}  onClick={()=>{handleMainSelection("inventory")}}>
              <Link to="/inventoryLists">
              <b class="caret"></b>
                <img src="assets/img/inventory.svg" alt=""/>
                <span>Inventory Management</span> 
              </Link>
              <ul class="sub-menu">
                <li class= {(selectedSubBar === "inventory1" || initialSelect)?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("inventory1")}}><Link to="/inventoryLists">Inventory Manager</Link></li>
                <li class= {(selectedSubBar === "inventory4")?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("inventory4")}}><Link to="/plantManager">Plant Manager</Link></li>
                <li class= {(selectedSubBar === "inventory5")?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("inventory5")}}><Link to="/productManager">Product Manager</Link></li>
                <li class= {(selectedSubBar === "inventory6")?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("inventory6")}}><Link to="/plantSettings">Plant Settings</Link></li>
                <li class= {(selectedSubBar === "inventory7")?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("inventory7")}}><Link to="/productsettings">Product Settings</Link></li>
                <li class= {(selectedSubBar === "inventory8")?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("inventory8")}}><Link to="/InventorySettings">Inventory Settings</Link></li>
                <li class= {(selectedSubBar === "inventory3")?"active":""} onClick={(e)=>{
                  e.stopPropagation()
                  handleSubSelection("inventory3")}}><Link to="/comingsoon">Task Queue</Link></li>
              </ul>
            </li>
            <li class={selectedMainBar === "CustomerManagement"?"active":""} onClick={()=>{handleMainSelection("CustomerManagement")}}>
            <Link to="/customerlisting">
                <img src="assets/img/Customer Management_grey.svg" alt=""/>
                <span>Customer Management</span>
              </Link>
            </li>
            <li class={selectedMainBar === "SupplierManagement"?"active":""} onClick={()=>{handleMainSelection("SupplierManagement")}}>
              <Link to="/SupplierManagemnet">
                <img src="assets/img/supplier.svg" alt=""/>
                <span>Supplier Management</span>
              </Link>
            </li>
            <li  class={selectedMainBarData.includes("organizationSettings")?"active":""} onClick={()=>{handleMainSelection("ToolsAndSettings")}} >
              <Link to="/organizationSettings">
              <b class="caret"></b>
                <img src="assets/img/Tools & Settings-small-grey.svg" alt=""/>
                <span>Tools &amp; Settings</span>
              </Link>
              <ul class="sub-menu">
                <li class= {(selectedSubBar === "AdminSetting1" || initialSelect)?"active":""} onClick={(e)=>{e.stopPropagation()
                  handleSubSelection("AdminSetting1")}}><Link to="/organizationSettings">Organization Settings</Link></li>
                {/* <li class= {(selectedSubBar === "AdminSetting2")?"active":""} onClick={(e)=>{e.stopPropagation();handleSubSelection("AdminSetting2")}}><Link to="/userSetting">User Settings</Link></li> */}
                <li class= {(selectedSubBar === "AdminSetting3")?"active":""} onClick={(e)=>{e.stopPropagation();handleSubSelection("AdminSetting3")}}><Link to="/customerSettings">Customer Settings</Link></li>
                <li class= {(selectedSubBar === "AdminSetting4")?"active":""} onClick={(e)=>{e.stopPropagation();handleSubSelection("AdminSetting4")}}><Link to="/supplierSettings">Supplier Settings</Link></li>
                <li class= {(selectedSubBar === "AdminSetting5")?"active":""} onClick={(e)=>{e.stopPropagation();handleSubSelection("AdminSetting5")}}><Link to="/comingsoon">Tags & Labels</Link></li>
                <li class= {(selectedSubBar === "AdminSetting6")?"active":""} onClick={(e)=>{e.stopPropagation();handleSubSelection("AdminSetting6")}}><Link to="/comingsoon">Image Management</Link></li>
                <li class= {(selectedSubBar === "AdminSetting7")?"active":""} onClick={(e)=>{e.stopPropagation();handleSubSelection("AdminSetting7")}}><Link to="/usermanagement">User Management</Link></li>
              </ul>
            </li>
            <li onClick={()=>{handleMainSelection("Reports")}} class={selectedMainBarData.includes("Reports")?"active":""}>
              <Link to="/comingsoon">
                <img src="assets/img/reports.svg" alt=""/>
                <span>Reports</span>
              </Link>
            </li>
            <li class={selectedMainBar === "StaffDirectory"?"active":""} onClick={()=>{handleMainSelection("StaffDirectory")}}>
              <Link to="/staffDirectory">
                <img src="assets/img/staff.svg" alt=""/>
                <span>Staff Directory</span>
              </Link>
            </li>
            <li onClick={()=>{handleMainSelection("MessageCenter")}} class={selectedMainBarData.includes("MessageCenter")?"active":""}>
              <Link to="/comingsoon">
              <b class="caret"></b>
                <img src="assets/img/message-center.svg" alt=""/>
                <span>Message Center</span>
              </Link>
              <ul class="sub-menu">
                <li class= {(selectedSubBar === "messageCentre1"|| initialSelect)?"active":""} onClick={(e)=>{e.stopPropagation();handleSubSelection("messageCentre1")}}><Link to="/comingsoon">Inbox</Link></li>
                <li class= {(selectedSubBar === "messageCentre2")?"active":""} onClick={(e)=>{e.stopPropagation();handleSubSelection("messageCentre2")}}><Link to="/comingsoon">Sent Items</Link></li>
                <li class= {(selectedSubBar === "messageCentre3")?"active":""} onClick={(e)=>{e.stopPropagation();handleSubSelection("messageCentre3")}}><Link to="/comingsoon">Compose Message</Link></li>
              </ul>
            </li>
            <li  onClick={()=>{handleMainSelection("MapLocator")}} class={selectedMainBarData.includes("MapLocator")?"active":""}>
              <Link to="/comingsoon">
                <img src="assets/img/location.svg" alt=""/>
                <span>Map Locator</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div class="sidebar-bg"></div>
    </div>
  );
  
}
const mapStateToProps = (state)=> (
  // console.log(state)

  {
    authKey:state.authKey,
  updateObject : state.sideMenu
}
)

export default connect(mapStateToProps,{resetCustomerFilds,typeOfsupplierActionShow,resetSupplierFilds,
  clearPoData,typeOfActionShow,getMenuItems,updateMenuItems,checkLogin,pageReDirectAction,plantPageReDirectAction})(Left)