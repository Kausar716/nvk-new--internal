/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import InventoryLocationTypes from './inventoryLocationType';
import InventoryLocation from './inventoryLocation';

export default function PlantSettings() {
    return (
        <div>
            <div class="contentHeader bg-white d-flex justify-content-between align-items-center">
                <h1 class="page-header mb-0 d-flex flex-wrap align-items-center">
                    <img src="assets/img/plant-ic-large-green.svg" alt="" class="mr-2" />Inventory Settings
                </h1>
			</div>
            <div class="px-md-3 mt-3">
                <Tabs>
                    <TabList>
                        <Tab>Inventory Locations</Tab>
                        <Tab>Inventory Location Types</Tab>
                    </TabList>
                    <TabPanel>
                        <InventoryLocation />
                    </TabPanel>
                    <TabPanel>
                        <InventoryLocationTypes />
                    </TabPanel>
                    
                    {/* <TabPanel>
                    <div class="bg-white">
                        <h4 class="p-15 mb-0">Inventory Location</h4>
                        <hr class="m-0"/>
                        <div class="ContentSection p-15">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <div class="row d-flex align-items-center mb-3">
                                        <div class="col-md-6 col-lg-4">  
                                            <label>Location Name</label>
                                            <input type="text" class="form-control" placeholder="" value="user"/>
                                        </div>
                                        <div class="col-md-6 col-lg-4 mt-3 mt-md-0">  
                                            <label>Short Code <small>(6 Char)</small></label>
                                            <input type="text" class="form-control" placeholder="" value="FLEET"/>
                                        </div>
                                        <div class="col-md-6 col-lg-4 mt-3 mt-md-0">  
                                            <label>Location Type</label>
                                            <select class="form-control">
                                                <option>Farm</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row d-flex align-items-center mb-3">
                                        <div class="col-md-6 col-lg-4">  
                                            <label>Address</label>
                                            <input type="text" class="form-control" placeholder="" value="Dundas"/>
                                        </div>
                                        <div class="col-md-6 col-lg-4 mt-3 mt-md-0">  
                                            <label>City</label>
                                            <input type="text" class="form-control" placeholder="" value="FLEET"/>
                                        </div>
                                        <div class="col-md-6 col-lg-4 mt-3 mt-md-0">  
                                            <div class="row d-flex align-items-center">
                                                <div class="col-md-6 col-lg-6">
                                                    <label>Prov/State</label>
                                                    <select class="form-control">
                                                        <option>Dundas</option>
                                                        <option>Option 1</option>
                                                        <option>Option 2</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6 col-lg-6 mt-3 mt-md-0">
                                                    <label>Country</label>
                                                    <select class="form-control">
                                                        <option>Canada</option>
                                                        <option>Option 1</option>
                                                        <option>Option 2</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row d-flex align-items-center mb-3">
                                        <div class="col-md-6 col-lg-4">  
                                            <label>Postal/Zip</label>
                                            <input type="text" class="form-control" placeholder="" value="N0B1L0"/>
                                        </div>
                                        <div class="col-md-6 col-lg-4 mt-3 mt-md-0">  
                                            <label>Lat/Long <span><img src="assets/img/map-marker-blue.svg"/></span></label>
                                            <input type="text" class="form-control" placeholder="" value="43.2862033,-80. 0523766"/>
                                        </div>
                                        <div class="col-col-md-6 col-lg-3 pt-3 mt-3">
                                            <a href="javascript:;" class="d-flex align-items-center">
                                                <i class="fa fa-plus-circle fa-2x mr-2"></i> Add New Location
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-5 mb-4">
                                <div class="col-md-8">
                                    <div class="row">
                                        <div class="col">
                                            <div class="card zoneCard">
                                                <div class="card-header">
                                                    Inactive
                                                </div>
                                                <div class="card-body bg-white p-0">
                                                    <ul class="list-unstyled formAddressList mb-0">
                                                        <li class="">
                                                            <img class="arrowIc" src="assets/img/arrow-right-ic.svg"/>
                                                            <div>
                                                                <label>Farm C</label>
                                                                    <h5>FARM-C</h5>
                                                                <label>1011 Dundas St. W. <br/>Waterdown, ON, CAN</label>
                                                            </div>
                                                            <img class="mapMarkerIc" src="assets/img/map-marker-blue.svg"/>
                                                        </li>
                                                        <li class="">
                                                            <img class="arrowIc" src="assets/img/arrow-right-ic.svg"/>
                                                            <div>
                                                                <label>Farm C</label>
                                                                    <h5>FARM-C</h5>
                                                                <label>1011 Dundas St. W. <br/>Waterdown, ON, CAN</label>
                                                            </div>
                                                            <img class="mapMarkerIc" src="assets/img/map-marker-blue.svg"/>
                                                        </li>
                                                        <li class="">
                                                            <img class="arrowIc" src="assets/img/arrow-right-ic.svg"/>
                                                            <div>
                                                                <label>Farm C</label>
                                                                    <h5>FARM-C</h5>
                                                                <label>1011 Dundas St. W. <br/>Waterdown, ON, CAN</label>
                                                            </div>
                                                            <img class="mapMarkerIc" src="assets/img/map-marker-blue.svg"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-1">
                                            <div class="midControls d-flex flex-md-column justify-content-around my-2 my-md-0">
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
                                            <div class="card zoneCard">
                                                <div class="card-header">
                                                    Active
                                                </div>
                                                <div class="card-body p-0">
                                                    <ul class="list-unstyled formAddressList mb-0">
                                                        <li class="">
                                                            <img class="arrowIc" src="assets/img/arrow-right-ic.svg"/>
                                                            <div>
                                                                <label>Farm C</label>
                                                                    <h5>FARM-C</h5>
                                                                <label>1011 Dundas St. W. <br/>Waterdown, ON, CAN</label>
                                                            </div>
                                                            <img class="mapMarkerIc" src="assets/img/map-marker-blue.svg"/>
                                                        </li>
                                                        <li class="">
                                                            <img class="arrowIc" src="assets/img/arrow-right-ic.svg"/>
                                                            <div>
                                                                <label>Farm C</label>
                                                                    <h5>FARM-C</h5>
                                                                <label>1011 Dundas St. W. <br/>Waterdown, ON, CAN</label>
                                                            </div>
                                                            <img class="mapMarkerIc" src="assets/img/map-marker-blue.svg"/>
                                                        </li>
                                                        <li class="selected">
                                                            <div>
                                                                <img class="arrowIc" src="assets/img/arrow-right-ic.svg"/>
                                                                <div>
                                                                    <label>Farm C</label>
                                                                        <h5>FARM-C</h5>
                                                                    <label>1011 Dundas St. W. <br/>Waterdown, ON, CAN</label>
                                                                </div>
                                                                <img class="mapMarkerIc" src="assets/img/map-marker-blue.svg"/>
                                                            </div>
                                                            <div class="subChild">
                                                                <div class="d-flex">
                                                                    <img class="mr-2" src="assets/img/arrow-right-ic.svg"/>
                                                                    <div>
                                                                        <label>Area A</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="subChild">
                                                                <div class="d-flex">
                                                                    <img class="mr-2" src="assets/img/arrow-right-ic.svg"/>
                                                                    <div>
                                                                        <label>Area B</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="subChild">
                                                                <div class="d-flex">
                                                                    <img class="mr-2" src="assets/img/arrow-down-ic.svg"/>
                                                                    <div>
                                                                        <label>Area C</label>
                                                                    </div>
                                                                </div>
                                                                <div class="subChild grandChild d-flex">
                                                                       <img class="mr-2" src="assets/img/arrow-right-ic.svg"/>
                                                                    <div>
                                                                        <label>Row Daisy</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="row mb-3">
                                        <div class="col-md-12">  
                                            <label>Current Location</label>
                                            <input class="form-control" placeholder="" disabled="disabled" value="Farm-E > Area A "/>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-12 col-lg-12">  
                                            <label>Location Type</label>
                                            <select class="form-control">
                                                <option>Farm</option>
                                                <option>Option 1</option>
                                                <option>Option 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-12">  
                                            <label>Describe your Row (8 Char)</label>
                                            <input class="form-control" placeholder="" value="Daisy "/>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-12">  
                                            <label>Preview</label>
                                            <input class="form-control" placeholder="" disabled="disabled" value="Row Daisy "/>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-12">  
                                             <a href="javascript:;" class="d-flex align-items-center">
                                                <i class="fa fa-plus-circle fa-2x mr-2"></i> Add Child Location
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </TabPanel> */}
                </Tabs>
            </div>
        </div>
    )
}
