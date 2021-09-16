import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Notification from './Notifications/NotificationIndex'
import Financial from './Finacial/FinancialIndex';
import Types from './Types';
import DeliveryMethods from './DeliveryMethods';
import StatusLevel from './StatusLevel';
import ReturnReasons from './ReturnReasons';
import AccountReasons from './AccountReasons';
import Terms from './Terms';
import EmailSettings from './Notifications/EmailSettings';



class CustomerSettings extends Component {
    handleSelect = ()=>{
        // alert("")

    }
    render() {
        return (
            <div>
                 <div class="contentHeader bg-white d-flex justify-content-between align-items-center">
                <h1 class="page-header mb-0 d-flex flex-wrap align-items-center">
                    <img src="assets/img/Tools & Settings-big-green.svg" alt="" class="mr-2" />Customer Settings
                </h1>
			</div>
                <div class="px-md-3 mt-3">
                    <Tabs onSelect={this.handleSelect}>
                        <TabList>
                            <Tab style={{bottom:"0px"}}>Notifications</Tab>
                            <Tab style={{bottom:"0px"}}>Financial</Tab> 
                            <Tab style={{bottom:"0px"}}>Types</Tab> 
                            <Tab style={{bottom:"0px"}}>Delivery Methods</Tab> 
                            <Tab style={{bottom:"0px"}}>Status Level</Tab> 
                            <Tab style={{bottom:"0px"}}>Return Reasons</Tab>    
                            <Tab style={{bottom:"0px"}}>Account Reasons</Tab> 
                            <Tab style={{bottom:"0px"}}>Terms</Tab>                        
                        </TabList>
                      
                        <TabPanel>
                             <Notification/>
                             <EmailSettings/>
                        </TabPanel>

                        <TabPanel>
                            <Financial/>
                        </TabPanel>

                        <TabPanel>
                            <Types/>
                        </TabPanel>

                        <TabPanel>
                             <DeliveryMethods/>
                        </TabPanel>

                        <TabPanel>
                            <StatusLevel/>
                        </TabPanel>

                        <TabPanel>
                            <ReturnReasons/>
                        </TabPanel>

                        <TabPanel>
                             <AccountReasons/>
                        </TabPanel>

                        <TabPanel>
                            <Terms/>
                        </TabPanel>

                      



                    </Tabs>
                </div>
            </div>
        )
    }

}

export default CustomerSettings;




