/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BloomFoliageColors from './BloomFoliageColors';
import Caliper from './Caliper';
import Categories from './Categories';
import Characterstics from './Characterstics';
import Form from './Form';
import Height from './Height';
import InventoryReasons from './InventoryReasons';
import Packaging from './Packaging';
import VolumeTiers from './VolumeTiers';
import Zones from './Zones';





 const  PlantSettings=()=>{  
    
    const [plantAttribute, setPlantAttribute]=useState({
        name:"",
        isComplete:false,

    })
    return (
        <div>
            <div className="contentHeader bg-white d-flex justify-content-between align-items-center">
            <div className="row"><img src="assets/img/PlantManagerIcon.svg" alt=""/>		<h1 className="page-header mb-0" style={{margin:"0.6em"}}>Plant Settings</h1></div> 
		
			</div>
            <div className="px-md-3 mt-3">
                <Tabs>
                    <TabList>
                        <Tab style={{bottom:"0px"}}>Categories</Tab>
                        <Tab style={{bottom:"0px"}}>Bloom &amp; Foliage Colors</Tab>
                        <Tab style={{bottom:"0px"}}>Zones</Tab>
                        <Tab style={{bottom:"0px"}}>Characteristics</Tab>
                        <Tab style={{bottom:"0px"}}>Volume Tiers</Tab>
                        <Tab style={{bottom:"0px"}}>Inventory Reasons</Tab>
                        <Tab style={{bottom:"0px"}}>Form</Tab>
                        <Tab style={{bottom:"0px"}}>Caliper</Tab>
                        <Tab style={{bottom:"0px"}}>Height</Tab>
                        <Tab style={{bottom:"0px"}}>Packaging</Tab>
                    </TabList>
                    <TabPanel>
                        <Categories/>
                    </TabPanel>

                    <TabPanel>
                        <BloomFoliageColors/>
                    </TabPanel>
                    {/* commented for future use */}
                    <TabPanel>
                        <Zones/>        
                    </TabPanel>

                    <TabPanel>
                        <Characterstics/>
                    </TabPanel>

                    <TabPanel>
                        <VolumeTiers/>
                    </TabPanel>

                    <TabPanel>
                        <InventoryReasons />
                    </TabPanel>

                    <TabPanel>
                        <Form />
                    </TabPanel>

                    <TabPanel>
                        <Caliper/>
                    </TabPanel>

                    <TabPanel>
                        <Height/>
                    </TabPanel>

                    <TabPanel>
                        <Packaging/>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

export default PlantSettings