import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Prompt,
} from 'react-router-dom';
import React, { useState } from 'react';
//import "semantic-ui-css/semantic.min.css";
import {Provider} from 'react-redux';
import store from './store.js';
import Left from "./components/Left";
import Nav from "./components/Nav";
import {connect} from "react-redux";
import Dashboard from "./components/Dashboard";
import PlantManager from "./components/PlantManager/Index.js";
import ProductManager from "./components/ProductManager/Index";
import ProductSettings from './components/ProductSettings/index'
import {createBrowserHistory} from 'history';
import {checkLogin} from "./actions/authAction";
import SignIn from './components/SignIn/SignInPage'
import UserManagement from './components/userManagement/index'
//import Sidebar from "./components/Sidebar";
import ComingSoon from './components/commingSoon'
import PlantSettings from './components/PlantSettings/PlantSettings';
import ForgotPassword from "./components/SignIn/ForgotPassword";
import RegisterNewUser from "./components/SignIn/RegisterNewUser";
import UserSettings from "./components/UserSettings/UserSettingsIndex";
import AddPlant from './components/PlantManager/AddPlant'
import AddProduct from "./components/ProductManager/AddProduct";
import OrganizationSettings from './components/toolsAndSetting/OrganizationSettings'
import StaffDirectory from './components/StaffDirectory'
import CustomerSettings from './components/CustomerSettings/CustomerSettingsIndex'
import SupplierSettingIndex from "./components/SupplierSettings/SupplierSettingIndex";
import CustomerLists from './components/CustomerSettings/CustomerLists'
import InventoryLists from "./components/inventoryManagement/InventoryLists";
import SupplierManagemnet from "./components/SupplierManagemnet";
import PurchaseOrderList from "./components/PurchaseOrderManagement/index";
import PurchaseOrder from "./components/PurchaseOrderManagement/PurchaseOrderDetails";
import InventorySettings from "./components/inventorysetting/InventorySettings";
import QuoteAndOrdersManagement from "./components/QuoteAndOrdersManagement/QuoteAndOrdersManagement";
import OrderReady from "./components/QuoteAndOrdersManagement/OrderReady";
import OrderReserve from "./components/QuoteAndOrdersManagement/OrderReserve";
import InvoiceList from "./components/QuoteAndOrdersManagement/InvoiceList";
import OrderAdjusted from "./components/QuoteAndOrdersManagement/OrderAdjusted";
import OrderList from "./components/QuoteAndOrdersManagement/OrderList";
import QuoteList from "./components/QuoteAndOrdersManagement/QuoteList";
import Quote from "./components/QuoteAndOrdersManagement/Quotes";

//import UserLeaveConfirmation from "./components/toolsAndSetting/UserLeaveConfirmation";

export const history = createBrowserHistory({forceRefresh: true})


const  App =(props)=> {
 // const [confirmOpen, setConfirmOpen]= useState(true);
  const authKey = props.authKey;
  
  
  console.log("authKey", authKey)
  console.log("loggedIn", authKey.loggedIn)
  return (
    < >
    
    <Router  
            //  getUserConfirmation={(message, callback) => {
            //   return UserLeaveConfirmation(
            //     message,
            //     callback,
            //     confirmOpen,
            //     setConfirmOpen
            //   );
            // }}
    >
    <Provider store={store}>

    <Route path="/" exact>
                    <SignIn />
                  </Route>

    <Route exact path="/forgot" >
                    <ForgotPassword />
    </Route>

    <Route exact path="/registerNewUser" >
                    <RegisterNewUser />
    </Route>

            

    
    {/* {authKey.loggedIn ? <> */}
      <div id="page-container" className={props.authKey.bdyClass}>

          <div id="content" className="content">


                <Switch>

                <Route path="/plantSettings">
                  <Nav />
                  <Left />
                    <PlantSettings/>
                  </Route>

                  <Route path="/Dashboard" exact>
                  <Nav />
                  <Left />
                    <Dashboard />
                  </Route>
                  <Route path="/plantManager">
                  <Nav />
                  <Left />
                    <PlantManager/>
                  </Route>
                  <Route path="/productsettings">
                  <Nav />
                  <Left />
                    <ProductSettings/>
                  </Route>
                  <Route path="/usermanagement">
                  <Nav />
                  <Left />
                    <UserManagement route={props.route} />
                  </Route>

                  <Route path="/customerlisting">
                  <Nav />
                  <Left />
                    <CustomerLists/>
                  </Route>

                  
                  <Route path="/productManager">
                  <Nav />
                  <Left />
                    <ProductManager/>
                  </Route>


                  <Route path="/userSetting">
                  <Nav />
                  <Left />
                    <UserSettings/>
                  </Route>


                  <Route path="/customerSettings">
                  <Nav />
                  <Left />
                    <CustomerSettings/>
                  </Route>


                  <Route path="/supplierSettings">
                  <Nav />
                  <Left />
                    <SupplierSettingIndex/>
                  </Route>
                  <Route path="/supplierManagemnet">
                  <Nav />
                  <Left />
                    <SupplierManagemnet/>
                  </Route>

              <Route path="/addPlant">
              <Nav />
                  <Left />
                <AddPlant/>
              </Route>


              <Route path="/addProduct">
              <Nav />
                  <Left />
                <AddProduct/>
              </Route>


              <Route path="/staffDirectory">
              <Nav />
                <Left />
                <StaffDirectory/>
              </Route>



              <Route  path="/organizationSettings" >
              <Nav />
              <Left />
              <OrganizationSettings />
              </Route>



              <Route  path="/inventoryLists" >
              <Nav />
              <Left />
              <InventoryLists />
              </Route>
              <Route path="/PurchaseOrderList">
                  <Nav />
                  <Left />
                <PurchaseOrderList/>
              </Route>
              <Route path="/PurchaseOrder">
                  <Nav />
                  <Left />
                <PurchaseOrder/>
              </Route>
              <Route path="/InventorySettings">
                  <Nav />
                  <Left />
                <InventorySettings/>
              </Route>
              <Route path="/QuoteAndOrdersManagement">
                  <Nav />
                  <Left />
                <QuoteAndOrdersManagement/>
              </Route>
              <Route path="/OrderReady">
                  <Nav />
                  <Left />
                <OrderReady/>
              </Route>
              <Route path="/OrderReserve">
                  <Nav />
                  <Left />
                <OrderReserve/>
              </Route>
              <Route path="/InvoiceList">
                  <Nav />
                  <Left />
                  <InvoiceList />
              </Route>
              <Route path="/OrderAdjusted">
                  <Nav />
                  <Left />
                  <OrderAdjusted />OrderList
              </Route>
              <Route path="/OrderList">
                  <Nav />
                  <Left />
                  <OrderList />
              </Route>
              <Route path="/QuoteList">
                  <Nav />
                  <Left />
                  <QuoteList />
              </Route>
              <Route path="/Quote">
                  <Nav />
                  <Left />
                  <Quote />
              </Route>
                  <Route path="/comingsoon">
                  <Nav />
                  <Left />
                <ComingSoon/>
              </Route>

                </Switch>
               
          </div>
      </div>

      {/* </>:<SignIn/>} */}
      </Provider>
    </Router>
   

    </>
  );
}



const mapStateToProps = (state)=> ({
  authKey:state.authKey,
  


})
export default connect(mapStateToProps,{checkLogin})(App)

//export default App;



// export const RootApp= ()=>{
//   return(
//     <div>
//           <Provider store={store}>
//               <Router>
//                 <App />
//               </Router>
//         </Provider>
//     </div>
//   )
// }