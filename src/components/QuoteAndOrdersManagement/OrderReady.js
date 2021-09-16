import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';

export default function OrderReady() {
    const [value, onChange] = useState(new Date());
    return (
        <div>
            <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center">
				<h1 class="page-header mb-0"><img src="assets/img/customerQuotesAndOrders-lg-green.svg" alt="" class="mr-2"/> Order Status - Ready <span class="text-blue ml-3">#00234-2000133</span><span>-01</span></h1>
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
                            <h2 class="mb-0 tabStsTag tabstsTagReady">Ready</h2>
                            <div class="d-flex ml-3 mb-0 bdrLeft">
                                <div class="mr-3">
                                    <h5>Requested Date</h5>
                                    <label>10/05/2020 AM</label>
                                </div>
                                <div class="mr-3 bdrLeft">
                                    <h5>Posted For Ready</h5>
                                    <label>10/05/2020   13:33</label>
                                </div>
                                <div class="mr-3 bdrLeft">
                                    <h5>Ready By</h5>
                                    <label>E. Vandenbrink</label>
                                </div>
                                <div class="mr-3 bdrLeft text-center">
                                    <h5>Ready</h5>
                                    <h4 class="text-warning f-s-20">7</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 d-flex justify-content-md-end  align-items-center">
                            <a href="" class="ml-2"><img src="assets/img/copy-ic.svg" alt=""/></a>
                            <a href="" class="ml-2"><img src="assets/img/shipping-ic-green.svg" alt=""/></a>
                        </div>
                    </div>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Order Details</Tab>
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
                        <div class="bg-white px-3 py-3 mt-3">
                            <form>
                                <div class="table-responsive">
                                    <table class="table table-striped purchaseOdrTbl" width="100%">
                                        <thead>
                                            <tr>
                                                <th width="5%" class="">No</th>
                                                <th width="25%" class="">Plant Name/Original SKU</th>
                                                <th width="10%" class="text-center">Size</th>
                                                <th width="10%" class="text-center">Req'd</th>
                                                <th width="15%" class="text-center productionBg">Staged Locations</th>
                                                <th width="15%" class="text-center productionBg">Pick Total</th>
                                                <th width="10%" class="text-center">Check</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colspan="12" class="p-0">
                                                    <table class="table table-striped mb-0" width="100%">
                                                        <tr class="movePanel">
                                                            <td colspan="12">
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
                                                                    <td width="25%">485-1L</td>
                                                                    <td width="10%" class="text-center">1Litre</td>
                                                                    <td width="10%" class="text-center"><span class="f-s-20">4</span></td>
                                                                    <td width="15%">
                                                                        <select class="form-control w-240">
                                                                            <option>FARM A</option>
                                                                            <option>Option 1</option>
                                                                            <option>Option 2</option>
                                                                        </select>
                                                                    </td>
                                                                    <td width="10%" class="text-center">
                                                                        <div class="pickTotal justify-content-center">
                                                                            <h4>4</h4>
                                                                            <p>Short 1</p>
                                                                        </div>
                                                                    </td>
                                                                    <td width="10%" class="text-center" colspan="2">
                                                                        <div class="d-flex justify-content-center">
                                                                            <div class="custom-control custom-checkbox">
                                                                                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                                <label class="custom-control-label" for="customCheck1"></label>
                                                                            </div>
                                                                            <a href="#" class="ml-3">
                                                                                <img src="assets/img/copy-ic-blue.svg" alt=""/>
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
                                                                    <td width="25%">485-1L</td>
                                                                    <td width="10%" class="text-center">1Litre</td>
                                                                    <td width="10%" class="text-center"><span class="f-s-20">4</span></td>
                                                                    <td width="15%">
                                                                        <select class="form-control w-240">
                                                                            <option>FARM A</option>
                                                                            <option>Option 1</option>
                                                                            <option>Option 2</option>
                                                                        </select>
                                                                    </td>
                                                                    <td width="10%" class="text-center">
                                                                        <div class="pickTotal justify-content-center">
                                                                            <h4 class="withCircle">4</h4>
                                                                        </div>
                                                                    </td>
                                                                    <td width="10%" class="text-center" colspan="2">
                                                                        <div class="d-flex justify-content-center">
                                                                            <div class="custom-control custom-checkbox">
                                                                                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                                <label class="custom-control-label" for="customCheck1"></label>
                                                                            </div>
                                                                            <a href="#" class="ml-3">
                                                                                <img src="assets/img/copy-ic-blue.svg" alt=""/>
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
