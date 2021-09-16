/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {getMenuItems,updateMenuItems} from '../actions/sideMenuAction'
 
    const Dashboard = (props)=>{
    const handleDashboardClick = (id)=> {  
        let updateObject={}
        updateObject.mainMenu=id
        updateObject.submenu=""
        updateObject.initialSelect=true     
       props.updateMenuItems(updateObject)
    }
 
    console.log(props)
    return (
        <div class="p-md-20 pt-3">
            <div class="row">
                
                <div class="col-md-6 col-lg-4" onClick={()=>{handleDashboardClick("orderList")}}>
                <Link to="/QuoteList" >
                    <div class="p-20 dashCards dashcardHvr cursorPointer">
                        <h3 class="text-center">Customer Quotes &amp; Orders</h3>
                        <div class="text-center my-4 dashIcon">
                            <img src="./assets/img/customer-quotes-lg.svg" alt="Customer Quotes &amp; Orders"/>
                        </div>
                        <div class="row">
                            <div class="col-6 col-md-6">
                                <p>Open</p>
                                <h4>72</h4>
                            </div>
                            <div class="col-6 col-md-6 text-right">
                                <p>Drafts</p>
                                <h4>50</h4>
                            </div>
                        </div>
                    </div>
                    </Link>
                </div>
              
                <div class="col-md-6 col-lg-4" onClick={()=>{handleDashboardClick("purchaseOrder")}}>
                <Link to="/PurchaseOrderList">
                    <div class="p-20 dashCards dashcardHvr cursorPointer">
                        <h3 class="text-center">Purchase Orders</h3>
                        <div class="text-center my-4 dashIcon">
                            <img src="./assets/img/purchase-orders-lg.svg" alt="Purchase Orders"/>
                        </div>
                        <div class="row">
                            <div class="col-6 col-md-6">
                                <p>Open</p>
                                <h4>72</h4>
                            </div>
                            <div class="col-6 col-md-6 text-right">
                                <p>Drafts</p>
                                <h4>50</h4>
                            </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div class="col-md-6 col-lg-4" onClick={()=>{handleDashboardClick("inventory")}}>
                <Link to="/inventoryLists">
                    <div class="p-20 dashCards dashcardHvr cursorPointer">
                        <h3 class="text-center">Inventory Management</h3>
                        <span class="lockIcon"><a href=""><img src="./assets/img/lock.svg" /></a></span>
                        <div class="text-center my-4 dashIcon">
                            <img src="./assets/img/inventory-lg.svg" alt="Inventory Management"/>
                        </div>
                        <div class="row">
                            <div class="col-6 col-md-6">
                                <p>Tasks Available</p>
                                <h4>72</h4>
                            </div>
                            <div class="col-6 col-md-6 text-right">
                                <p>Requests Available</p>
                                <h4>50</h4>
                            </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div class="col-md-6 col-lg-4" onClick={()=>{handleDashboardClick("ToolsAndSettings")}}>
                <Link to="/organizationSettings" >
                    <div class="p-20 dashCards dashcardHvr cursorPointer">
                        <h3 class="text-center">Tools & Settings</h3>
                        <div class="text-center my-4 dashIcon">
                            <img src="./assets/img/settings-lg.svg" alt="Settings"/>
                        </div>
                        <div class="row">
                             &nbsp;
                        </div>
                    </div>
                    </Link>
                </div>
          
                <div class="col-md-6 col-lg-4" onClick={()=>{handleDashboardClick("Reports")}}>
                <Link to="/comingsoon" >
                    <div class="p-20 dashCards dashcardHvr cursorPointer">
                        <h3 class="text-center">Reports</h3>
                        <div class="text-center my-4 dashIcon">
                            <img src="./assets/img/reports-lg.svg" alt="Reports"/>
                        </div>
                        <div class="row">
                          &nbsp;
                        </div>
                    </div>
                    </Link>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="p-20 dashCards helpCard text-center">
                       <h4>Need Help?</h4>
                       <p class="mt-4">
                           <span>Genesys Support</span>
                           contact@nvknurseries.com
                       </p>
                       <p class="mt-4">
                           <span>Human Resources</span>
                           contact@nvknurseries.com
                       </p>
                       <p class="mt-2">Staff Directory <a href="#"> Click here</a></p>
                       <span class="editIcon"><a href=""><img src="./assets/img/edit-ic.svg" /></a></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

// export default Dashboard
const mapStateToProps = (state)=> (
    {
    path : state.sideMenu.path
  }
  )
  
  export default connect(mapStateToProps,{getMenuItems,updateMenuItems})(Dashboard)