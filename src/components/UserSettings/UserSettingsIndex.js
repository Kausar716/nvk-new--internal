import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UserSettings from './UserSettings';

class UserSettingsIndex extends Component {
    render() {
        return (
            <div>
                {/* <div class="contentHeader bg-white d-flex justify-content-between align-items-center"> */}
                    {/* <h1 class="page-header mb-0">  */}
                    {/* <img src="assets/img/product-green.svg" alt=""/> */}
                    {/* User Settings </h1> */}
                    {/* <div class="">
                        <a href="javascript:;">
                            <img src="assets/img/add.svg" alt=""/>
                        </a>
                        <a href="javascript:;" class="ml-2">
                            <img src="assets/img/preview.svg" alt=""/>
                        </a>
                        <a href="javascript:;" class="ml-2">
                            <img src="assets/img/print.svg" alt=""/>
                        </a>
                    </div> */}
                {/* </div> */}
                <div class="px-md-3 mt-3">
                    <Tabs>
                        {/* <TabList>
                            <Tab style={{bottom:"0px"}}>Positions</Tab>
                        </TabList> */}
                      
                        <TabPanel>
                             <UserSettings/>
                        </TabPanel>

                       

                    </Tabs>
                </div>

            </div>
        )
    }

}

export default UserSettingsIndex;