/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
//import DatePicker from 'react-date-picker';
import SkuList from './SkuList';
import GeneralSettings from './GeneralSettings';

function AddProduct() {
    //const [value, onChange] = useState(new Date());
    return (
        <div>
            <div> 
            <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center">
				<h1 class="page-header mb-0"><img src="assets/img/product-green.svg" alt=""/> Add Product</h1>
	
			</div>
            <div class="px-md-3 mt-3">
                <div class="px-3 py-3 mb-3 bg-white">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h2>Product ID</h2>
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
        </div>
    )
}

export default AddProduct
