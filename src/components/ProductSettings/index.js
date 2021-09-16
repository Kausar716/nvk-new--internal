/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Category from './category'
import Manufacturer from './manufacturer'

export class ProductSettings extends Component {  
    render() {
    return (
        <div>
            <div class="contentHeader bg-white d-flex justify-content-between align-items-center">
				<h1 class="page-header mb-0"> <img src="assets/img/product-green.svg" alt=""/> Product Settings</h1>
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
			</div>
            <div class="px-md-3 mt-3">
                <Tabs>
                    <TabList>
                        <Tab style={{bottom:"0px"}}>Categories</Tab>
                        <Tab style={{bottom:"0px"}}>Manufacturer</Tab>                        
                    </TabList>
                  
                    <TabPanel>
                        {/* category component call */}
                    <Category/>
                    </TabPanel>
                    <TabPanel>
                   {/* manufacturer component call */}
                   <Manufacturer/>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}}

export default ProductSettings