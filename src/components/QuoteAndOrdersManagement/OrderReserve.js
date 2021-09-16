import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';

export default function OrderReserve() {
    const [value, onChange] = useState(new Date());
    return (
        <div>
            <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center">
				<h1 class="page-header mb-0"><img src="assets/img/customerQuotesAndOrders-lg-green.svg" alt="" class="mr-2"/> Order Status - Reserve <span class="text-green ml-3">#00234-2000133</span></h1>
				<div class="topbarCtrls mt-3 mt-md-0">
                    <a href="#" class="btn ml-2">
                        <span class="d-flex align-items-center text-left">
                            <img src="assets/img/email-ic-btn.svg" alt=""/>
                            <span class="ml-2"><b>Email</b></span>
                        </span>
                    </a>
                    <a href="#" class="btn ml-2">
                        <span class="d-flex align-items-center text-left">
                            <img src="assets/img/search-ic-btn.svg" alt=""/>
                            <span class="ml-2"><b>Preview</b></span>
                        </span>
                    </a>
                    <a href="#" class="btn ml-2 ">
                        <span class="d-flex align-items-center text-left">
                            <img src="assets/img/print-ic-btn.svg" alt=""/>
                            <span class="ml-2"><b>Print</b></span>
                        </span>
                    </a>
				</div>
			</div>
            <div class="px-md-3 mt-3">
                <div class="px-3 py-3 mb-3 bg-white cardShadow">
                    <div class="row align-items-center purchaseOrderTabHead">
                        <div class="col-md-6 d-flex align-items-center">
                            <h2 class="mb-0 tabStsTag tabstsTagReserve">RESERVE</h2>
                            <div class="d-flex text-nowrap ml-3 mb-0 bdrLeft">
                                <div class="mr-3">
                                    <h5>Elapsed Time</h5>
                                    <label>12 Days Remain</label>
                                </div>
                                <div class="mr-3 bdrLeft">
                                    <h5>Reserved By</h5>
                                    <label>J. Wanders</label>
                                </div>
                                {/* <div class="mr-3 bdrLeft">
                                    <h5>Ready By</h5>
                                    <label>E. Vandenbrink</label>
                                </div> */}
                                <div class="mr-3 bdrLeft text-center">
                                    <h5>Reserved</h5>
                                    <h3 class="text-indigo f-s-20">6</h3>
                                </div>
                                <div class="mr-3 bdrLeft">
                                    <h5>Picking with</h5>
                                    <div>
                                        <select class="form-control w-240">
                                            <option>John Smith</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 d-flex justify-content-md-end  align-items-center">
                            <a href="" class="ml-4 mr-4"><img src="assets/img/reserve-ic-purple.svg" alt=""/></a>
                            <a href="" class="ml-2"><img src="assets/img/Add Segment.svg" alt=""/></a>
                            <a href="" class="ml-2"><img src="assets/img/delete2.svg" alt=""/></a>
                        </div>
                    </div>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Order Details</Tab>
                        <Tab>Add to Order</Tab>
                        <Tab>Current Order <span class="badge badge-pill badge-success">2</span></Tab>
                        <Tab>Order History</Tab>
                        <Tab>Notes</Tab>
                    </TabList>
                    <TabPanel>
                        <div class="bg-white px-3 py-3">
                            <form>
                                <h2>Current Order</h2>
                                <hr/>
                                <div class="px-3 py-3 bg-grey-transparent-2">
                                    <div class="row ">
                                        <div class="col-md-12">
                                            <h4>John Smith Landscaping</h4>
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-md-4 col-lg-4">
                                            <div>
                                                <div><b class="mr-3">Type:</b>Finished Plants, Liners</div>
                                                <div class="mt-1"><b class="mr-3">Tax Exempt:</b>No</div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-lg-4">
                                            <div>
                                                <div><b class="mr-3">Terms:</b>Net 20</div>
                                                <div class="mt-1"><b class="mr-3">Status:</b><span class="label bg-green f-s-14"><i class="fas fa-crown mr-2"></i>VIP</span></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 text-md-right mt-3 mt-md-0">
                                            <div>
                                                <div><b class="mr-3">Source:</b>Internal</div>
                                                <div class="mt-1"><b class="mr-3">Price Year:</b>2020</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                <div class="col-md-12 col-lg-5 col-xl-5">
                                    <div class="row ">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Ordered By <span class="text-danger">*</span></label>
                                                <select class="form-control">
                                                    <option>John Smith</option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6 col-lg-6 mt-2 mt-md-0">
                                                <label>Bill To <span class="text-danger">*</span></label>
                                                <select class="form-control">
                                                    <option>1234 Main St, Waterdown </option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select>
                                            </div>
                                           
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-lg-7 col-xl-7">
                                        <div class="row">
                                            <div class="col-md-6 col-lg-4">
                                                <label>PO #</label>
                                                <input type="text" class="form-control" placeholder=""></input>
                                            </div>
                                            <div class="col-md-6 col-lg-4 mt-3 mt-md-0">
                                                <label class="mr-2 mr-md-0">Requested Date</label>
                                                <DatePicker onChange={onChange} value={value} />
                                            </div>
                                            <div class="col-md-6 col-lg-4 mt-3 mt-md-0">
                                                <label class="mr-2 mr-md-0">Requested Time</label>
                                                <select class="form-control">
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-5 col-xl-5">
                                        <div class="row ">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Currency</label>
                                                <select class="form-control">
                                                    <option>CAD</option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6 col-lg-6">
                                                <label>Email To</label>
                                                <select class="form-control">
                                                    <option>Select </option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-lg-7 col-xl-7">
                                        <label>Job Description</label>
                                        <input type="text" class="form-control" placeholder=""></input>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-5 col-xl-5">
                                        <div class="row ">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Units</label>
                                                <select class="form-control">
                                                    <option>Metric</option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6 col-lg-6">
                                                <label>Discount</label>
                                                <input type="text" class="form-control" placeholder="" value="0.00" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-lg-7 col-xl-7 pt-md-4 mt-3">
                                        <a href="">Reset</a>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-3">
                                        <label>Include Royalty</label>
                                        <div class="d-flex align-items-center flex-wrap mt-2">Off
                                            <div class="switcher switcher-sm ml-2 pr-2">
                                                <input type="checkbox" name="switcher_checkbox_date" id="switcher_checkbox_date" value="2" />
                                                <label for="switcher_checkbox_date"></label>
                                            </div> On
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-3">
                                        <label>Display Discount Column</label>
                                        <div class="d-flex align-items-center flex-wrap mt-2">Off
                                            <div class="switcher switcher-sm ml-2 pr-2">
                                                <input type="checkbox" name="switcher_checkbox_date" id="switcher_checkbox_date" value="2" />
                                                <label for="switcher_checkbox_date"></label>
                                            </div> On
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-3">
                                        <label>Display Substitution Line</label>
                                        <div class="d-flex align-items-center flex-wrap mt-2">Off
                                            <div class="switcher switcher-sm ml-2 pr-2">
                                                <input type="checkbox" name="switcher_checkbox_date" id="switcher_checkbox_date" value="2" />
                                                <label for="switcher_checkbox_date"></label>
                                            </div> On
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-3">
                                        <label>Show Pricing on Output</label>
                                        <div class="d-flex align-items-center flex-wrap mt-2">Off
                                            <div class="switcher switcher-sm ml-2 pr-2">
                                                <input type="checkbox" name="switcher_checkbox_date" id="switcher_checkbox_date" value="2" />
                                                <label for="switcher_checkbox_date"></label>
                                            </div> On
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-12 mt-2 mt-md-0">
                                        <label>Customer Notes <small>(Internal Only)</small></label>
                                        <textarea class="form-control"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div class="bg-white px-3 py-3 mt-2">
                            <form>
                                <h2>Add to Order</h2>
                                <hr/>
                                <div class="row mt-3 align-items-center">
                                    <div class="col-md-12">
                                        <div class="row form-group">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Search</label>
                                                <div class="searchInput">
                                                    <button type="submit" class="btn btn-search">
                                                        <img src="assets/img/search.svg" alt=""/>
                                                    </button>
                                                    <input type="text" class="form-control" placeholder=""/>
                                                </div>
                                                <div class="row mt-3 align-items-center">
                                                    <div class="col-md-12 d-flex">
                                                        <div class="custom-control custom-radio">
                                                            <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" />
                                                            <label class="custom-control-label" for="customRadio1">Active Only</label>
                                                        </div>
                                                        <div class="custom-control custom-radio ml-3">
                                                            <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" />
                                                            <label class="custom-control-label" for="customRadio2">Both Active and Inactive</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-lg-6">
                                                <label>Search SKU</label>
                                                <div class="searchInput">
                                                    <button type="submit" class="btn btn-search">
                                                        <img src="assets/img/search.svg" alt=""/>
                                                    </button>
                                                    <input type="text" class="form-control" placeholder=""/>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="row mt-3 mb-4 align-items-center">
                                            <div class="col-md-6 col-lg-6">
                                                <label>Location:</label>
                                                <select class="form-control">
                                                    <option>All</option>     
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select>
                                            </div>
                                            <div class="col-md-4 col-lg-4 mt-3 mt-md-0">
                                                <label>Category</label>
                                                <select class="form-control">
                                                    <option>All</option>     
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select>
                                            </div>
                                            <div class="col-md-2 col-lg-2 pt-md-4">
                                                <a href="javascript:;">Reset</a>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-md-12 table-responsive">
                                                <table class="table table-striped mb-0" width="100%">
                                                    <thead>
                                                        <tr>
                                                            <th width="15%" class="">SKU</th>
                                                            <th width="15%" class="text-center">Size</th>
                                                            <th width="6%" class="text-center">On Hand</th>
                                                            <th width="6%" class="text-center">Customer Orders</th>
                                                            <th width="8%" class="text-center">Current <br/>Available</th>
                                                            <th width="6%" class="text-center">On Quotes</th>
                                                            <th width="6%" class="text-center">Open POS</th>
                                                            <th width="8%" class="text-center">Future <br/>Available</th>
                                                            <th width="6%" class="text-center">Price</th>
                                                            <th width="6%" class="text-center">Volume<br/>
Rate</th>
                                                            <th width="6%" class="text-center">Dis%</th>
                                                            <th width="6%" class="text-center">Qty</th>
                                                            <th width="4%" class="text-center"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="13" class="p-0">
                                                                <table class="table table-striped mb-0" width="100%">
                                                                    <tr class="tblLinks">
                                                                        <td colspan="13">
                                                                            <a href="">Abeliophyllum (White Forsythia)</a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td width="15%">
                                                                            <a href="">393-TF-1259-1G</a>
                                                                        </td>
                                                                        <td class="text-center" width="15%">150CM 15 gal</td>
                                                                        <td class="text-center" width="6%">50</td>
                                                                        <td class="text-center" width="6%">23</td>
                                                                        <td class="text-center" width="8%"><b class="f-s-20">27</b></td>
                                                                        <td class="text-center" width="6%">13</td>
                                                                        <td class="text-center" width="6%">50</td>
                                                                        <td class="text-center" width="8%"><b class="f-s-20">125</b></td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/> 
                                                                            <div>
                                                                                <span class="text-green">3.18</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/>
                                                                            <div>
                                                                                <span class="text-green">3.07</span>
                                                                            </div>   
                                                                            <div>
                                                                                <span class="text-red">25 Min</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="2.75"/>
                                                                        </td>
                                                                        <td class="text-center" width="6%" >
                                                                            <div class="d-flex align-items-center">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="4"/>
                                                                            </div>
                                                                            <div>
                                                                                <span class="text-red">Short 4</span>
                                                                            </div>
                                                                        </td>
                                                                        <td class="text-center" width="4%">
                                                                            <a href="" class="ml-2">
                                                                                <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td width="15%">
                                                                            <a href="">393-TF-1259-1G</a>
                                                                        </td>
                                                                        <td class="text-center">150CM 15 gal</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center">23</td>
                                                                        <td class="text-center"><b class="f-s-20">27</b></td>
                                                                        <td class="text-center">13</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center"><b class="f-s-20">125</b></td>
                                                                        <td class="text-center">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/> 
                                                                            <div>
                                                                                <span class="text-green">3.18</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/>
                                                                            <div>
                                                                                <span class="text-green">3.07</span>
                                                                            </div>   
                                                                            <div>
                                                                                <span class="text-red">25 Min</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="2.75"/>
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <div class="">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="4"/>
                                                                                 <div>
                                                                                <span class="text-red">Short 4</span>
                                                                            </div>   
                                                                            </div>
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <a href="" class="ml-2">
                                                                                <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="13" class="p-0">
                                                                <table class="table table-striped mb-0" width="100%">
                                                                    <tr class="tblLinks">
                                                                        <td colspan="13">
                                                                            <a href="">Abeliophyllum (White Forsythia)</a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td width="15%">
                                                                            <a href="">393-TF-1259-1G</a>
                                                                        </td>
                                                                        <td class="text-center" width="15%">150CM 15 gal</td>
                                                                        <td class="text-center" width="6%">50</td>
                                                                        <td class="text-center" width="6%">23</td>
                                                                        <td class="text-center" width="8%"><b class="f-s-20">27</b></td>
                                                                        <td class="text-center" width="6%">13</td>
                                                                        <td class="text-center" width="6%">50</td>
                                                                        <td class="text-center" width="8%"><b class="f-s-20">125</b></td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/> 
                                                                            <div>
                                                                                <span class="text-green">3.18</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/>
                                                                            <div>
                                                                                <span class="text-green">3.07</span>
                                                                            </div>   
                                                                            <div>
                                                                                <span class="text-red">25 Min</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center" width="6%">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="2.75"/>
                                                                        </td>
                                                                        <td class="text-center" width="6%" >
                                                                            <div class="d-flex align-items-center">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="4"/>
                                                                            </div>
                                                                            <div>
                                                                                <span class="text-red">Short 4</span>
                                                                            </div>
                                                                        </td>
                                                                        <td class="text-center" width="4%">
                                                                            <a href="" class="ml-2">
                                                                                <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <a href="">393-TF-1259-1G</a>
                                                                        </td>
                                                                        <td class="text-center">150CM 15 gal</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center">23</td>
                                                                        <td class="text-center"><b class="f-s-20">27</b></td>
                                                                        <td class="text-center">13</td>
                                                                        <td class="text-center">50</td>
                                                                        <td class="text-center"><b class="f-s-20">125</b></td>
                                                                        <td class="text-center">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/> 
                                                                            <div>
                                                                                <span class="text-green">3.18</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="3.12"/>
                                                                            <div>
                                                                                <span class="text-green">3.07</span>
                                                                            </div>   
                                                                            <div>
                                                                                <span class="text-red">25 Min</span>
                                                                            </div>   
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <input type="text" class="form-control textQtySm" placeholder="" value="2.75"/>
                                                                        </td>
                                                                        <td class="text-center" >
                                                                            <div class="">
                                                                                <input type="text" class="form-control textQtySm" placeholder="" value="4"/>
                                                                                 <div>
                                                                                <span class="text-red">Short 4</span>
                                                                            </div>   
                                                                            </div>
                                                                        </td>
                                                                        <td class="text-center">
                                                                            <a href="" class="ml-2">
                                                                                <img src="assets/img/tbl-plus-ic.svg" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 text-right">
                                        <button type="button" class="btn btn-primary btn-lg ml-3">Add All</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    
                    </TabPanel>
                    <TabPanel>
                        <div class="bg-white px-3 py-3 mt-3">
                            <form>
                                <div class="table-responsive">
                                    <table class="table table-striped purchaseOdrTbl" width="100%">
                                        <thead>
                                            <tr>
                                                <th width="5%" class="">No</th>
                                                <th width="25%" class="">Plant Name/Original SKU</th>
                                                <th width="10%" class="text-center">Size</th>
                                                <th width="15%" class="text-center productionBg">Picked Locations</th>
                                                <th width="15%" class="text-center productionBg">Total</th>
                                                <th width="10%" class="text-right">Each price</th>
                                                <th width="10%" class="text-right">Total</th>
                                                <th width="10%" class="text-center">Check</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colspan="12" class="p-0">
                                                    <table class="table table-striped mb-0" width="100%">
                                                        <tr class="movePanel">
                                                            <td colspan="8">
                                                                <div class="">
                                                                    <div class="col-md-6">
                                                                        <strong>West Wing Front Gardens</strong>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        {/* Main Content Row starts here */}
                                                        <tr class="tblBgWhite">
                                                            <table class="table table-striped table-no-border mb-0" width="100%">
                                                                <tr class="topTitleRow">
                                                                    <td class="pt-2">1</td>
                                                                    <td  colspan="6">
                                                                        <label>Diervilla x Kodiak® Orange ('G2X88544') - Kodiak® Orange Honeysuckle</label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="5%"></td>
                                                                    <td width="25%">
                                                                        <select class="form-control w-240">
                                                                            <option>393-30-1G</option>
                                                                            <option>Option 1</option>
                                                                            <option>Option 2</option>
                                                                        </select>
                                                                    </td>
                                                                    <td width="10%" class="text-center">3cm 1 gal</td>
                                                                    <td width="15%">
                                                                        <select class="form-control w-200">
                                                                            <option>FARM A</option>
                                                                            <option>Option 1</option>
                                                                            <option>Option 2</option>
                                                                        </select>
                                                                    </td>
                                                                    <td width="15%" class="text-center">
                                                                        <div class="pickTotal purpleBg justify-content-center">
                                                                            <input type="text" value="3" class="form-control w-60 txtReserveTot"/>
                                                                            <div class="">
                                                                                <span class="mr-2"><i class="fas fa-lock"></i></span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="text-right">
                                                                        <div class="plainText">90.00</div>
                                                                        <div class="">
                                                                            <span class="text-green">8.25</span>
                                                                        </div>
                                                                    </td>
                                                                    <td class="text-right">
                                                                        <div class="plainText">90.00</div>
                                                                        <div class="">
                                                                            <span class="text-green">8.25</span>
                                                                        </div>
                                                                    </td>
                                                                    <td width="10%" class="text-center" colspan="2">
                                                                        <div class="d-flex justify-content-center">
                                                                            <a href="#" class="ml-3">
                                                                                <img src="assets/img/copy-ic-blue.svg" alt=""/>
                                                                            </a>
                                                                            <a href="#" class="ml-3">
                                                                                <img src="assets/img/delete.svg" alt=""/>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </tr>
                                                        <tr class="tblBgGrey">
                                                            <table class="table table-striped table-no-border mb-0" width="100%">
                                                                <tr class="topTitleRow">
                                                                    <td class="pt-2">1</td>
                                                                    <td  colspan="6">
                                                                        <label>Diervilla x Kodiak® Orange ('G2X88544') - Kodiak® Orange Honeysuckle</label>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="5%"></td>
                                                                    <td width="25%">
                                                                        <select class="form-control w-240">
                                                                            <option>393-30-1G</option>
                                                                            <option>Option 1</option>
                                                                            <option>Option 2</option>
                                                                        </select>
                                                                    </td>
                                                                    <td width="10%" class="text-center">3cm 1 gal</td>
                                                                    <td width="15%">
                                                                        <select class="form-control w-200">
                                                                            <option>FARM A</option>
                                                                            <option>Option 1</option>
                                                                            <option>Option 2</option>
                                                                        </select>
                                                                    </td>
                                                                    <td width="15%" class="text-center">
                                                                        <div class="pickTotal purpleBg justify-content-center">
                                                                            <input type="text" value="3" class="form-control w-60 txtReserveTot"/>
                                                                            <div class="">
                                                                                <span class="mr-2"><i class="fas fa-lock"></i></span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="text-right">
                                                                        <div class="plainText">90.00</div>
                                                                        <div class="">
                                                                            <span class="text-green">8.25</span>
                                                                        </div>
                                                                    </td>
                                                                    <td class="text-right">
                                                                        <div class="plainText">90.00</div>
                                                                        <div class="">
                                                                            <span class="text-green">8.25</span>
                                                                        </div>
                                                                    </td>
                                                                    <td width="10%" class="text-center" colspan="2">
                                                                        <div class="d-flex justify-content-center">
                                                                            <a href="#" class="ml-3">
                                                                                <img src="assets/img/copy-ic-blue.svg" alt=""/>
                                                                            </a>
                                                                            <a href="#" class="ml-3">
                                                                                <img src="assets/img/delete.svg" alt=""/>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                            <div class="form-group row">
                                <div class="col-md-6"></div>
                                <div class="col-md-12 col-lg-6">
                                    <div class="greyBox px-3 py-3 totalSec">
                                        <div class="row">
                                            <div class="col-md-8 text-right">
                                                <label >Subtotal <span>$</span></label>
                                            </div>
                                            <div class="col-md-2 text-right">
                                                <label >175.60</label>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-8 text-right">
                                                <label >Discounts <span>$</span></label>
                                            </div>
                                            <div class="col-md-2 text-right">
                                                <label >-9.80</label>
                                            </div>
                                        </div>
                                        <div class="row subTotLbl text-green">
                                            <div class="col-md-8 text-right">
                                                <label class="text-uppercase">Subtotal after Discounts <span>$</span></label>
                                            </div>
                                            <div class="col-md-2 text-right">
                                                <label class="f-s-24">544.50</label>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-8 text-right">
                                                <label >Sales Tax Rate @ 13.0% <span>$</span></label>
                                            </div>
                                            <div class="col-md-2 text-right">
                                                <label >60.00</label>
                                            </div>
                                        </div>
                                        <div class="row subTotLbl">
                                            <div class="col-md-8 text-right">
                                                <label >Order Total <span>$</span></label>
                                            </div>
                                            <div class="col-md-2 text-right">
                                                <label >544.50</label>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="bg-white px-3 py-3 mt-2">
                            <form>
                                <h2>Sales Order History</h2>
                                <hr/>
                                <div class="row">
                                    <div class="col-md-12 table-responsive">
                                        <table class="table table-striped table-td-valign-middle" width="100%">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Action</th>
                                                    <th class="text-center">Source</th>
                                                    <th class="text-center">Item</th>
                                                    <th class="text-center">Timestamp</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">New</td>
                                                    <td class="text-center">B.Vanderkruk</td>
                                                    <td class="text-center">SKU GG063000000LT added with QTY:4</td>
                                                    <td class="text-center">16/05/2020   15:32</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div class="bg-white px-3 py-3 mt-2">
                            <form>
                                <h2>Internal Notes <span class="f-s-14">(Not shown to customer)</span></h2>
                                <hr/>
                                <div class="row">
                                    <div class="col-md-12">
                                        <textarea cols="10" rows="8" class="form-control"></textarea>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 text-right">
                                        <button type="button" class="btn btn-primary btn-lg ml-3">SAVE</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
