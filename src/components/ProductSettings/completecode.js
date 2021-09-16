/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export class ProductSettings extends Component {  
    render() {
    return (
        <div>
            <div class="contentHeader bg-white d-flex justify-content-between align-items-center">
				<h1 class="page-header mb-0">Plant Settings</h1>
				<div class="">
					<a href="javascript:;">
						<img src="assets/img/add.svg" alt=""/>
					</a>
					<a href="javascript:;" class="ml-2">
						<img src="assets/img/preview.svg" alt=""/>
					</a>
					<a href="javascript:;" class="ml-2">
						<img src="assets/img/print.svg" alt=""/>
					</a>
				</div>
			</div>
            <div class="px-md-3 mt-3">
                <Tabs>
                    <TabList>
                        <Tab>Categories</Tab>
                        <Tab>Bloom &amp; Foliage Colors</Tab>
                        <Tab>Zones</Tab>
                        <Tab>Characteristics</Tab>
                        <Tab>Volume Tiers</Tab>
                        <Tab>Inventory Reasons</Tab>
                        <Tab>Form</Tab>
                        <Tab>Caliper</Tab>
                        <Tab>Height</Tab>
                        <Tab>Packaging</Tab>
                    </TabList>
                  
                    <TabPanel>
                        <div class="bg-white">
                            <h4 class="p-15 mb-0">Bloom &amp; Foliage Colors</h4>
                        </div>
                    </TabPanel>
                    <TabPanel>
                   
                    </TabPanel>
                    <TabPanel>
                    <div class="bg-white">
                            <h4 class="p-15 mb-0">Hardiness Zones</h4>
                            <hr class="m-0"/>
                            <div class="ContentSection p-15">
                                <div class="row">
                                    <div class="col-md-6">
                                        <p>Characteristics</p>
                                        <div>
                                            <input type="text" class="form-control" placeholder=""/>
                                        </div>
                                        <div class="d-flex justify-content-md-end mt-2">
                                            <a href="javascript:;" class="d-flex align-items-center">
                                                <i class="fa fa-plus-circle fa-2x mr-2"></i> Add New Section
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <p>Feature Name</p>
                                        <div>
                                            <input type="text" class="form-control" placeholder=""/>
                                        </div>
                                        <div class="d-flex justify-content-md-end mt-2">
                                            <a href="javascript:;" class="d-flex align-items-center">
                                                <i class="fa fa-plus-circle fa-2x mr-2"></i> Add New Feature
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-5">
                                    <div class="col">
                                        <div class="card midCard">
                                            <div class="card-header">
                                                Inactive
                                            </div>
                                            <div class="card-body cardBg">
                                               <ul class="list-unstyled">
                                                   <li>
                                                        <a href="javascript:;" class="d-flex justify-content-between align-items-center">
                                                            <span>Attracts Birds 01</span>
                                                            <i class="fa fa-th"></i>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="javascript:;" class="d-flex justify-content-between align-items-center">
                                                            <span>Attracts Birds 02</span>
                                                            <i class="fa fa-th"></i>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="javascript:;" class="d-flex justify-content-between align-items-center">
                                                            <span>Attracts Birds 03</span>
                                                            <i class="fa fa-th"></i>
                                                        </a>
                                                   </li>
                                               </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-1">
                                        <div class="midControls d-flex flex-column justify-content-around">
                                            <div>
                                                <a href="javascript:;">
                                                    <i class="fas fa-angle-double-right"></i>
                                                </a>
                                            </div>
                                            <div>
                                                <a href="javascript:;">
                                                    <i class="fas fa-arrows-alt"></i>
                                                </a>
                                            </div>
                                            <div>
                                                <a href="javascript:;" class="icDelete">
                                                    <i class="fas fa-trash"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card midCard">
                                            <div class="card-header">
                                                Active
                                            </div>
                                            <div class="card-body cardBg">
                                               <ul class="list-unstyled">
                                                   <li class="hasChild">
                                                        <a href="javascript:;" class="d-flex justify-content-between align-items-center">
                                                            <span>Attracts Birds 01</span>
                                                            <i class="fa fa-th"></i>
                                                        </a>
                                                        <ul class="list-unstyled childUl">
                                                            <li>
                                                                <a href="javascript:;" class="d-flex justify-content-between align-items-center">
                                                                    <span>Attracts Birds 01</span>
                                                                    <i class="fa fa-th"></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:;" class="d-flex justify-content-between align-items-center">
                                                                    <span>Attracts Birds 01</span>
                                                                    <i class="fa fa-th"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                   </li>
                                                   <li>
                                                        <a href="javascript:;" class="d-flex justify-content-between align-items-center">
                                                            <span>Attracts Birds 02</span>
                                                            <i class="fa fa-th"></i>
                                                        </a>
                                                   </li>
                                                   <li>
                                                        <a href="javascript:;" class="d-flex justify-content-between align-items-center">
                                                            <span>Attracts Birds 03</span>
                                                            <i class="fa fa-th"></i>
                                                        </a>
                                                   </li>
                                               </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        
                    </TabPanel>
                    <TabPanel>
                        
                    </TabPanel>
                    <TabPanel>
                        
                    </TabPanel>
                    <TabPanel>
                        
                    </TabPanel>
                    <TabPanel>
                        
                    </TabPanel>
                    <TabPanel>
                        
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}}

export default ProductSettings