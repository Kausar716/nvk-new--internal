import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';
import SkuList from './SkuList';
import GeneralSettings from './GeneralSettings';

export default function AddPlant() {
    const [value, onChange] = useState(new Date());
    return (
        <div>
            <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center">
				<h1 class="page-header mb-0"><img src="assets/img/plant-ic-lg-green.svg" alt=""/>
                <img src="assets/img/PlantManagerIcon.svg" alt=""/> Add Plant</h1>
				{/* <div class="topbarCtrls mt-3 mt-md-0">
                    <a href="#" class="btn active">
                        <span class="d-flex align-items-center text-left">
                            <img src="assets/img/plant-ic-btn.svg" alt=""/>
                            <span class="ml-2"><b>Add Plant</b></span>
                        </span>
                    </a>
                    <a href="#" class="btn ml-2">
                        <span class="d-flex align-items-center text-left">
                            <img src="assets/img/search-ic-btn.svg" alt=""/>
                            <span class="ml-2"><b>Preview</b></span>
                        </span>
                    </a>
                    <a href="#" class="btn ml-2 mt-3 mt-md-0">
                        <span class="d-flex align-items-center text-left">
                            <img src="assets/img/print-ic-btn.svg" alt=""/>
                            <span class="ml-2"><b>Print</b></span>
                        </span>
                    </a>
				</div> */}
			</div>
            <div class="px-md-3 mt-3">
                <div class="px-3 py-3 mb-3 bg-white">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h2>Plant ID</h2>
                        </div>
                        <div class="col-md-6 d-flex justify-content-md-end">
                            <a href="" class="mx-2">
                                <img src="assets/img/copy-ic.svg" alt=""/>
                            </a>
                            <a href="" class="mx-2">
                                <img src="assets/img/trash-ic.svg" alt=""/>
                            </a>
                            <a href="" class="mx-2">
                                <img src="assets/img/left-double-arrow.svg" alt=""/>
                            </a>
                        </div>
                    </div>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>General</Tab>
                        <Tab>SKU Lists</Tab>
                    </TabList>

                    <TabPanel>
                        <GeneralSettings/>
                    </TabPanel>

                    <TabPanel>
                        <SkuList/>
                    </TabPanel>
                    
                </Tabs>
            </div>
        </div>
    )
}
