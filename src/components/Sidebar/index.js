import React, { Component } from 'react'
import {connect} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  import Dashboard from "../Dashboard";
import PlantManager from "../PlantManager/Index";
import ProductManager from "../ProductManager/Index.js";
import ProductSettings from '../ProductSettings/index'
import SignIn from '../SignIn/index'
import {checkLogin} from "../../actions/authAction";


class Sidebar extends Component {

    render() {
        const authKey = this.props.authKey
        return (
            <>
            {authKey.loggedIn? <>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Dashboard />
                        </Route>
                        <Route path="/plantManager">
                            <PlantManager/>
                        </Route>
                        <Route path="/productManager">
                            <ProductManager/>
                        </Route>
                        <Route path="/productsettings">
                            <ProductSettings/>
                        </Route>


                    </Switch>
                </Router>

                </>:<SignIn/>}
            </>
        )
    }
}


const mapStateToProps = (state)=> ({
    authKey:state.authKey,
    // selectedPage:state.dashboardData.selectedPage
    // item:state.item,
  
  })

  export default connect(mapStateToProps,{checkLogin})(Sidebar)
