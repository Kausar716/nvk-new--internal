// import React, { useState } from 'react'
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import DatePicker from 'react-date-picker';
// import {connect} from "react-redux";
// import TablePagination from '../Pagination/index';
// import {getAllCustomer,handleRadioFilter,handleSearchFilter,handleAlphabetFilter, setPageNumberPo,handleSearchFilterByAlpha, handleAplhabetFilterBySN} from "../../actions/purchaseOrderActions";
// import initialDetails from './initialDetailsQL';
// import '../PurchaseOrderManagement/style.css';
// import { Link } from "react-router-dom";

// export class QuoteList extends React.Component {

//     constructor(){
//         super()
//         this.state={
//             addCustomerToggle:false,
//             customerListStatus:"active",
//             editCustmerToggle:false,
//             customerObject:{},
//             pageSize:5,
//             alphabets:["A", "B", "C", "D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
//             selectedAlpha:"All",
//             searchValue:"",
//             radioFilter:"active",
//             searchInput: '', 
//             checkedData:[],
//             alphabet: '',
//             button: true,
           
//             alphabetSelect:'',
//             TotalPurchaseOder:39,

//             purchaseOrderTable:[
//                 {status:"closed", poNumber:"JSMITH-012301-1", suppliearName:"John Smith landscaping", 
//         supplierOrder:"1024275", createdBy:"John Smith", orderDate:"20/05/2021", expectedDate:"20/05/12021",
//          dispatch:"Pickup", amount:"6,085.00"},

//          {status:"closed", poNumber:"WILLSMITH-012301-1", suppliearName:"WILL Smith landscaping", 
//          supplierOrder:"2024275", createdBy:"Will Smith", orderDate:"20/06/2021", expectedDate:"20/08/2021",
//           dispatch:"Pickup", amount:"6,085.00" },

//           {status:"open", poNumber:"Scena-012301-1", suppliearName:"John Scena landscaping", 
//           supplierOrder:"1024275", createdBy:"John Scena", orderDate:"20/05/12021", expectedDate:"20/05/12021",
//            dispatch:"Delivery", amount:"6,085.00" },

//            {status:"Draft", poNumber:"Jason-012301-1", suppliearName:"Jason Smith landscaping", 
//            supplierOrder:"24275", createdBy:"Jason Smith", orderDate:"20/05/2021", expectedDate:"20/09/2021",
//             dispatch:"Pickup", amount:"6,085.00" },

//             {status:"closed", poNumber:"Dweny-012301-1", suppliearName:"Dweny Smith landscaping", 
//             supplierOrder:"1024275", createdBy:"Dweny Smith", orderDate:"20/02/12021", expectedDate:"20/05/12021",
//              dispatch:"Pickup", amount:"6,085.00" },

//              {status:"closed", poNumber:"Robert Jr-012301-1", suppliearName:"Robert Jr Smith landscaping", 
//              supplierOrder:"1024275", createdBy:"Robert Jr Smith", orderDate:"20/05/12021", expectedDate:"20/05/12021",
//               dispatch:"Delivery", amount:"6,085.00" }
//             ]
//         }
//     }
//     //const [value, onChange] = useState(new Date());
//    //NEW 
//     // onSearchInputChange = (e) => {
//     //     this.setState({searchInput: e.target.value})
//     //   }

//     onSearchInputChange2 = (e) => {
//         this.setState({searchInput: e.target.value})
//       }

//       onSearchInputChange3 = (e) => {
//         this.setState({searchInput: e.target.value})
//       }


//     onSearchInputChange = (e) => {
//         this.setState({alphabet: e.target.value,alphabetSelect:''})
//         this.setState({
//           button:!this.state.button
//         })
//       }


//       handleClickCheckBox = (e)=>{

//         let newCheckedData = initialDetails.filter(newCheck => newCheck.status===e.target.name)
//         //this.setState({alphabet: newCheckedData})
//         this.setState({checkedData: newCheckedData})
//         // console.log("e1",checkedData);
//       }



//       paginationChange =(event, page)=>{
//         // alert("hg")
//         this.props.setPageNumberPo(page-1)
//     }
//  // <div class="form-group row mt-4">
//         //     <div class="col-md-12 col-lg-12">
//         //     <ul class="list-unstyled searchAlpha d-flex flex-wrap">
//         //     <li> 
//         //         <button key={i} class="active" onClick={this.onAlphabetClick} value={String.fromCharCode(i)}>{String.fromCharCode(i)}</button> 
//         //          </li>
                
//         //             </ul>
//         //         </div>
//         //     </div>


//       onAlphabetClick = (e) => {
//          // e.preventdefault();
//         // this.setState({alphabet: e.target.value})
//         this.setState({alphabet: e.target.value,alphabetSelect:e.target.value,button:false})
//       }
//       prepareAlphabets = () => {
//         let result = [];
//         for(let i=65; i<91; i++) {
//           result.push(

//             // <button type="button" key={i} onClick={this.onAlphabetClick} value={String.fromCharCode(i)} >{String.fromCharCode(i)}</button>
//             <button type="button" className={ this.state.alphabetSelect===String.fromCharCode(i)?" buttonStyles selected_alphabet":"unselected_aplphabet buttonStyles"}  key={i} onClick={this.onAlphabetClick} value={String.fromCharCode(i)}>{String.fromCharCode(i)}</button>
           
//           )
//         }
//         return result;
//       }


//      // checkOperation=(checkedData, element)=>(checkedData ? checkedData.filter(newCheck => newCheck.status==="open") : "");





//  elementContainsSearchString2 = (searchInput, element) => (searchInput ? element.supplierOrder.toLowerCase().includes(searchInput.toLowerCase()) : false);

//       elementContainsSearchString = (searchInput, element) => (searchInput ? element.suppliearName.toLowerCase().includes(searchInput.toLowerCase()) || element.poNumber.toLowerCase().includes(searchInput.toLowerCase()) || element.supplierOrder.toLowerCase().includes(searchInput.toLowerCase()) : false);


//       filterItems = (initialDetails) => {
//         let result = [];
//         const { searchInput,alphabet , checkedData} = this.state;
//         if(initialDetails &&  (searchInput || alphabet)) {
//             result = initialDetails.filter((element) => (element.suppliearName.charAt(0).toLowerCase() === alphabet.toLowerCase()) || 
//             this.elementContainsSearchString(searchInput, element) 
//             //  || this.checkOperation(checkedData,element)
//             );
//           }

//         else if( initialDetails && checkedData){

//             result = initialDetails.filter((item)=>item.status)

//         }
//         else {
//           result = initialDetails  || [];
//         }

//         result = result.map((item)=>(
//                  item
                 
        
//         ))
       

//         return result;
//       }

// //END
//      handleAlphabetFilter = (e)=>{

//         this.setState({selectedAlpha:e.target.id})
//        // this.setState({selectedAlpha:e.target.id})
//         this.props.handleSearchFilterByAlpha(e.target.id, this.state.purchaseOrderTable)

//     }

//     //console.log("purchaseOrderTable", purchaseOrderTable)
//     render(){
//         //let purchaseOrderData = [];

//         console.log("abcd", this.state.checkedData)
//         let pageCount =0;
//         let pageNumber = 0;
//         let totalLength = 0;
//         let plantPerPage =0;
//         let pagesVisited = 0;
//         let displayPOList = []


      
//       let initialDetails1 = initialDetails || this.state.checkedData
//        // console.log("pageNumber", this.props.purchaseOrderData.pageNumber)


//       if(initialDetails1){
//         // pageNumber = this.props.purchaseOrderData.pageNumber
//         // // console.log()
//         // initialDetails1 = [...initialDetails1]


//         //  totalLength = initialDetails1.length
//         //  plantPerPage = this.state.pageSize;
//         //  pagesVisited =  this.props.purchaseOrderData.pageNumber*this.state.pageSize;
//         //  displayPOList = initialDetails1.slice(pagesVisited,pagesVisited+plantPerPage)
//         //  pageCount = Math.ceil(initialDetails1.length/plantPerPage)

//     }

//             console.log("displayPOList",displayPOList)

//               const filteredList = this.filterItems(displayPOList);

//               console.log("filteredList", filteredList)
//        // console.log(this.props.purchaseOrderData)
//     return (


        
//         <div>
//             <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center">
// 				<h1 class="page-header mb-0"><img src="assets/img/quote-ic-green.svg" alt=""/> Quote & Order List</h1>
// 				<div class="topbarCtrls mt-3 mt-md-0">
                   
//                     <Link to="/Quote">
//                     <a href="#" class="btn">
//                         <span class="d-flex align-items-center text-left">
//                         <img src="assets/img/Quoteblue_small-Icon.svg" alt=""/>
//                             <span class="ml-2"><b>New Quote</b></span>
//                         </span>
//                         </a>
//                         </Link>
//                     {/* </a> */}
//                     <Link to="/QuoteAndOrdersManagement">
//                     <a href="#" class="btn ml-2">
//                         <span class="d-flex align-items-center text-left">
//                             <img src="assets/img/PurchaseOrders-sm.svg" alt=""/>
//                             <span class="ml-2"><b>New Order</b></span>
//                         </span>
//                     </a>
//                     </Link>
// 				</div>
// 			</div>
//             <div class="px-md-3 mt-3">
//             <div class="bg-white px-3 py-3 my-3 cardShadow">
//                 <div class="row align-items-center">
//                     <div class="col-md-12 col-lg-6 d-md-flex justify-content-between editCustSec">
//                         <div class="ordersCard d-flex justify-content-md-between align-item-stretch w-100">
//                             {/* <div class="cardBoxwide totalCard">
//                                 <p>Total Orders</p>
//                                 <span style={{fontSize: "32px"}}>61</span>
//                                 <div>
//                                     <a href="#">View All</a>
//                                 </div>
//                             </div> */}
//                             <div class="cardBoxwide individualCard totalCard">
//                                 <div class="stripe"></div>
//                                 <p>Total Orders</p>
//                                 <h4>8</h4>
//                                 <div>
//                                     <a href="#">View All</a>
//                                 </div>
//                             </div>
//                             <div class="equalSign">=</div>
//                             <div class="cardBox individualCard openStsCard">
//                                 <div class="stripe"></div>
//                                 <p>Open</p>
//                                 <h4>8</h4>
//                                 <div>
//                                     <a href="#">View All</a>
//                                 </div>
//                             </div>
//                             <div class="equalSign">+</div>
//                             <div class="cardBox individualCard pickingStsCard">
//                                 <div class="stripe"></div>
//                                 <p>Picking</p>
//                                 <h4>12</h4>
//                                 <div>
//                                     <a href="#">View All</a>
//                                 </div>
//                             </div>
//                             <div class="equalSign">+</div>
//                             <div class="cardBox individualCard readyStsCard">
//                                 <div class="stripe"></div>
//                                 <p>Ready</p>
//                                 <h4>18</h4>
//                                 <div>
//                                     <a href="#">View All</a>
//                                 </div>
//                             </div>
//                             <div class="equalSign">+</div>
//                             <div class="cardBox individualCard shippedStsCard">
//                                 <div class="stripe"></div>
//                                 <p>Shipped</p>
//                                 <h4>20</h4>
//                                 <div>
//                                     <a href="#">View All</a>
//                                 </div>
//                             </div>
//                             <div class="equalSign">+</div>
//                             <div class="cardBox individualCard lateStsCard">
//                                 <div class="stripe"></div>
//                                 <p>Late</p>
//                                 <h4>3</h4>
//                                 <div>
//                                     <a href="#">View All</a>
//                                 </div>
//                             </div>
//                             <div class="equalSign">&nbsp;</div>
//                             <div class="verDivider"></div>
//                             <div class="equalSign">&nbsp;</div>
//                             <div class="cardBoxwide individualCard activeQuotesCard">
//                                 <div class="stripe"></div>
//                                 <p>Active Quotes</p>
//                                 <h4>12</h4>
//                                 <div>
//                                     <a href="#">View All</a>
//                                 </div>
//                             </div>
//                             {/* <div class="cardBoxwide activeQuotesCard">
//                                 <p>Active Quotes</p>
//                                 <h4>12</h4>
//                                 <div>
//                                     <a href="#">View All</a>
//                                 </div>
//                             </div> */}
//                             <div class="equalSign">&nbsp;</div>
//                             <div class="cardBoxwide individualCard quotesFlaggedCard">
//                                 <div class="stripe"></div>
//                                 <p>Quotes Flagged</p>
//                                 <h4><font color="red">12</font></h4>
//                                 <div>
//                                     <a href="#">View All</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//                 <div class="bg-white px-3 py-3 mt-2">
//                     <form>
//                         <h2>Search Quotes & Orders</h2>
                        
//                         <div class="row mt-3 align-items-center">
//                             <div class="col-md-12">
//                                 <div class="row form-group">
//                                     <div class="col-md-12 col-lg-12">
//                                         <label><b>Orders</b></label>
//                                         <div class="d-flex flex-wrap mt-2">
//                                             <div class="custom-control custom-checkbox">
//                                                 <input type="checkbox" class="custom-control-input" id="open" checked="checked"
//                                                 name="open"
//                                                 onChange={this.handleClickCheckBox} />
//                                                 <label class="custom-control-label" for="open" >Open</label>
//                                             </div>
//                                             <div class="custom-control custom-checkbox ml-3">
//                                                 <input type="checkbox" class="custom-control-input" id="customCheck2" />
//                                                 <label class="custom-control-label" for="customCheck2">Pick</label>
//                                             </div>
//                                             <div class="custom-control custom-checkbox ml-3">
//                                                 <input type="checkbox" class="custom-control-input" id="customCheck3" />
//                                                 <label class="custom-control-label" for="customCheck3">Ready</label>
//                                             </div>
//                                             <div class="custom-control custom-checkbox ml-0 ml-md-3 mt-2 mt-md-0">
//                                                 <input type="checkbox" class="custom-control-input" id="customCheck4" />
//                                                 <label class="custom-control-label" for="customCheck4">Ship</label>
//                                             </div>
//                                             <div class="custom-control custom-checkbox ml-0 ml-md-3 mt-2 mt-md-0">
//                                                 <input type="checkbox" class="custom-control-input" id="customCheck5" />
//                                                 <label class="custom-control-label" for="customCheck5">Invoiced</label>
//                                             </div>
//                                             <div class="custom-control custom-checkbox ml-0 ml-md-3 mt-2 mt-md-0">
//                                                 <input type="checkbox" class="custom-control-input" id="customCheck6" />
//                                                 <label class="custom-control-label" for="customCheck6">Closed</label>
//                                             </div>
//                                             <div class="custom-control custom-checkbox ml-0 ml-md-3 mt-2 mt-md-0">
//                                                 <input type="checkbox" class="custom-control-input" id="customCheck7" />
//                                                 <label class="custom-control-label" for="customCheck7">Cancelled</label>
//                                             </div>
//                                             <div class="custom-control custom-checkbox ml-0 ml-md-3 mt-2 mt-md-0">
//                                                 <input type="checkbox" class="custom-control-input" id="customCheck8" />
//                                                 <label class="custom-control-label" for="customCheck8">Late</label>
//                                             </div>
//                                         </div>
//                                     </div>
                                    
//                                 </div>
//                                 <div class="row form-group">
//                                     <div class="col-md-5 col-lg-5">
//                                         <div class="d-flex flex-wrap mt-2">
//                                             <div><a href="javascript:;" style={{cursor:"pointer"}}><label>Select All</label></a></div>
//                                             <div><label>&nbsp;&nbsp;&nbsp;</label></div>
//                                             <div><a href="javascript:;" style={{cursor:"pointer"}}><label>Select None</label></a></div>
                                            
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <hr/>
//                                 <div class="row form-group">
//                                     <div class="col-md-2 col-lg-2">
//                                         <label><b>Quotes</b></label>
//                                         <div class="d-flex flex-wrap mt-2">
//                                             <div class="custom-control custom-checkbox">
//                                                 <input type="checkbox" class="custom-control-input" id="active" 
//                                                 name="active"
//                                                 onChange={this.handleClickCheckBox} />
//                                                 <label class="custom-control-label" for="active" >Active</label>
//                                             </div>
//                                             <div class="custom-control custom-checkbox ml-3">
//                                                 <input type="checkbox" class="custom-control-input" id="inactive" />
//                                                 <label class="custom-control-label" for="inactive">InActive</label>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div class="col-md-7 col-lg-7">
//                                         <label><b>Date Range</b></label>
//                                         <div class="d-flex flex-wrap align-items-center">
//                                             <div class="custom-control custom-radio">
//                                                 <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" />
//                                                 <label class="custom-control-label" for="customRadio1">Last 7 Days</label>
//                                             </div>
//                                             <div class="custom-control custom-radio ml-3">
//                                                 <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" />
//                                                 <label class="custom-control-label" for="customRadio2">Last 30 Days</label>
//                                             </div>
//                                             <div class="custom-control custom-radio ml-3">
//                                                 <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" />
//                                                 <label class="custom-control-label" for="customRadio3">Select Range</label>
//                                             </div>
//                                             <div class="ml-3">
//                                                 {/* <DatePicker 
//                                                 // onChange={onChange} value={value} 
//                                                 /> */}
//                                                 <input type="date" className="dateDesign"  />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="row form-group">
//                                     <div class="col-md-4 col-lg-4">
//                                         <label><b>Customer</b></label>
//                                         <div class="searchInput">
//                                             <button type="submit" class="btn btn-search">
//                                                 <img src="assets/img/search.svg" alt=""/>
//                                             </button>
//                                             <input type="text" class="form-control"  onChange={this.onSearchInputChange2}  placeholder="Search Customer Name/Number"/>
//                                         </div>
//                                     </div>
//                                     <div class="col-md-4 col-lg-4 ">
//                                         <label><b>Job Description</b></label>
//                                         <div class="searchInput">
//                                             <button type="submit" class="btn btn-search">
//                                                 <img src="assets/img/search.svg" alt=""/>
//                                             </button>
//                                             <input type="text" class="form-control" placeholder="Search Job Description"/>
//                                         </div>
//                                     </div>
//                                     <div class="col-md-4 col-lg-4 ">
//                                         <label><b>Order#</b></label>
//                                         <div class="searchInput">
//                                             <button type="submit" class="btn btn-search">
//                                                 <img src="assets/img/search.svg" alt=""/>
//                                             </button>
//                                             <input type="text" class="form-control" placeholder="Search Order"/>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="row form-group mb-2">
//                                     <div class="col-md-4 col-lg-4">
//                                         <label><b>Search Plants or Products</b></label>
//                                         <div class="searchInput">
//                                             <button type="submit" class="btn btn-search">
//                                                 <img src="assets/img/search.svg" alt=""/>
//                                             </button>
//                                             <input type="text" class="form-control" placeholder="Search Plants or Products"/>
//                                         </div>
//                                     </div>
//                                     <div class="col-md-4 col-lg-4 ">
//                                         <label><b>SKU</b></label>
//                                         <div class="searchInput">
//                                             <button type="submit" class="btn btn-search">
//                                                 <img src="assets/img/search.svg" alt=""/>
//                                             </button>
//                                             <input type="text" class="form-control" onChange={this.onSearchInputChange2} placeholder="Search SKU"/>
//                                         </div>
//                                     </div>
//                                     <div class="col-md-4 col-lg-4 pt-md-1 mt-2 ">
//                                         <label>&nbsp;</label>
//                                         <div class="searchInput">
//                                         <a href="javascript:;" style={{cursor:"pointer"}}>Reset</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             <div className="row_1 mt-4">
//                                         <div style={{float:"left",marginBottom:15}}>
//                                             {/* <div> */}
//                                                 <label className="greenText">{"Showing " + (pageNumber>0 ? (this.state.pageSize*((pageNumber)))+1 : ((pageNumber)+1))+  "  to  " +  (pageNumber>0 ? (((this.state.pageSize*((pageNumber)))+this.state.pageSize)>totalLength ? totalLength : ((this.state.pageSize*((pageNumber)))+this.state.pageSize)) : ((((pageNumber)+1)*this.state.pageSize)>totalLength?totalLength:(((pageNumber)+1)*this.state.pageSize)))   + "  of   "  +   totalLength }</label>
//                                             {/* </div> */}
//                                         </div>
//                                         <div style={{float:"left",marginBottom:15}}>
//                                             <label className="greenText">Show</label>
//                                                 <select 
//                                                     value={this.state.pageSize}
//                                                     onChange={e => {
//                                                         this.setState({
//                                                             pageSize:  Number(e.target.value)
//                                                         })
//                                                     }}
//                                                     >
//                                                     {[5,15, 25, 50, 100, 250].map(pageSize => (
//                                                         <option key={pageSize} value={pageSize}>
//                                                         {pageSize}
//                                                         </option>
//                                                     ))}
//                                                 </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                 <input type="checkbox" class="custom-control-input customer-checkbox" id="dispquote" />
//                                                 <label class="custom-control-label" for="dispquote"><b>Display FLAGGED Quotes only</b></label>
//                                         </div>
//                                         <div style={{float:"right",marginBottom:15}}>
//                                             <TablePagination pageChange={this.paginationChange} pageCount={pageCount} pageNumber={pageNumber+1}/>
//                                         </div>
                               
//                             </div>
//                             <div class="form-group row mt-0">
//                                 <div class="col-md-12 col-lg-12">
//                                     <ul class="list-unstyled searchAlpha d-flex flex-wrap">
//                                         {/* <li><a  class={this.state.selectedAlpha =="All"?"active":""} onClick={this.handleAlphabetFilter} id="All" style={{cursor:"pointer"}}>All</a></li> */}

//                                         <button type="button" className={this.state.button ? "selected_alphabet buttonStyles": "unselected_aplphabet buttonStyles"}  onClick={this.onSearchInputChange}>All</button>
//                                             {this.prepareAlphabets()}
//                                     </ul>
//                                 </div>
//                             </div>


//                                 <div class="form-group row" style={{marginBottom: "5px"}}>
//                                     <div class="col-md-12 table-responsive">
//                                         <table id="plantDetails" class="table table-striped w-100">
//                                             <thead>
//                                                 <tr>
//                                                     <th class="text-nowrap text-center">Status</th>
//                                                     <th class="text-nowrap text-center">Order#</th>
//                                                     <th class="text-nowrap text-center">Order Parts</th>
//                                                     <th class="text-nowrap text-left" width="20%">Customer Name</th>
//                                                     <th class="text-nowrap text-center">Type</th>
//                                                     <th class="text-nowrap text-center">PO#</th>
//                                                     <th class="text-nowrap text-center">Order Date</th>
//                                                     <th class="text-nowrap text-center">Requested Date</th>
//                                                     <th class="text-nowrap text-center">Remaining Balance</th>
//                                                     <th class="text-nowrap text-center">Actions</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {filteredList.map(pQuoteList=>{
//                                                     return <tr key={pQuoteList.suppliearName}>
//                                                     <td class="text-center"><span  class={pQuoteList.status==='CLOSED'?'stsBadge stsClosed':pQuoteList.status==='OPEN'?'stsBadge stsOpen':pQuoteList.status==='READY'?'stsBadge stsReady':pQuoteList.status==='RESERVE'?'stsBadge stsReserve':pQuoteList.status==='PICKING'?'stsBadge stsPicking':pQuoteList.status==='QUOTE'?'stsBadge stsQuote':""}>{pQuoteList.status}</span></td>
//                                                     <td><a href="">{pQuoteList.orderNumber}</a></td>
//                                                     <td class="text-nowrap text-center">4</td>
//                                                     <td>{pQuoteList.suppliearName}</td>
//                                                     <td class="text-center">LARC</td>
//                                                     <td class="text-center">8458788</td>
//                                                     <td class="text-center">{pQuoteList.orderDate}</td>
//                                                     <td class="text-center">{pQuoteList.expectedDate}</td>
//                                                     <td class="text-nowrap text-right">6,085.00 <br/>32,058.12</td>
//                                                     <td class="text-center">
//                                                         <span>
//                                                             <a href="javascript;">
//                                                                 <img src="assets/img/edit.svg" alt=""/>
//                                                             </a>
//                                                         </span>
//                                                     </td>
//                                                 </tr>
                                                


//                                             })}

//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }
// }


// const mapStateToProps = (state)=> (
//     // console.log(state.customerReducer.payload)
//     {
//         purchaseOrderData:state.PurchaseOrderReducer
//     }

// )


// export default connect(mapStateToProps,{handleSearchFilterByAlpha, setPageNumberPo})(QuoteList)


import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-date-picker';
import {connect} from "react-redux";
import TablePagination from '../Pagination/index';
import { setPageNumberOl,handleSearchFilterByAlpha,
    getOrderList,handleAplhabetFilterBySN} from "../../actions/orderListManagement";
import initialDetailsQL from './initialDetailsQL';
import '../PurchaseOrderManagement/style.css';
import { Link } from "react-router-dom";
import './styles.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
//import Autocomplete from '@material-ui/lab/Autocomplete';

let _dateFormatOptionsForCalendar = {year:"numeric",month:"2-digit",day:"2-digit"};

class OrderList extends React.Component {

    constructor(){
        super()
        this.state={

            // const [selectionRange,setSeletionRange] = useState({                       //variable to store datepicker state value
            //     startDate: new Date(),
            //     endDate: new Date(),
            //     key: 'selection',
            //     id:"dates"
            // },)
    //const [showCalendar,setShowCalendar] = useState(false)

            showCalendar:false,
            startDate:"",
            endDate:"",
            filterDate:"Select Date Range",
            selectionRange:{
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
                id:"dates"
            },

            addCustomerToggle:false,
            customerListStatus:"active",
            editCustmerToggle:false,
            customerObject:{},
            pageSize:5,
           // alphabets:["A", "B", "C", "D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            selectedAlpha:"All",
            searchValue:"",
            radioFilter:"active",
            searchInput:'', 
            checkedData:[],
            alphabet:'',
            button: true,
           
            alphabetSelect:'',
            TotalPurchaseOder:39,

            quoteOrderList:[
                {status:"OPEN", orderNumber:"JSMITH-012301-1", suppliearName:"John Smith landscaping", 
                supplierOrder:"1024275", createdBy:"John Smith", orderDate:"20/05/2021", expectedDate:"20/05/12021",
                 dispatch:"Pickup", amount:"6,085.00"},
            
                 {status:"CLOSED", orderNumber:"WILLSMITH-012301-1", suppliearName:"WILL Smith landscaping", 
                 supplierOrder:"2134386", createdBy:"Will Smith", orderDate:"20/06/2021", expectedDate:"20/08/2021",
                  dispatch:"Pickup", amount:"7,085.00" },
            
                  {status:"READY", orderNumber:"Scena-012301-1", suppliearName:"John Scena landscaping", 
                  supplierOrder:"3235386", createdBy:"John Scena", orderDate:"20/05/12021", expectedDate:"20/05/12021",
                   dispatch:"Delivery", amount:"4,685.00" },
            
                   {status:"RESERVE", orderNumber:"Jason-012301-1", suppliearName:"Jason Smith landscaping", 
                   supplierOrder:"3525", createdBy:"Jason Smith", orderDate:"20/05/2021", expectedDate:"20/09/2021",
                    dispatch:"Pickup", amount:"7,123.00" },
            
                    {status:"PICKING", orderNumber:"Dweny-012301-1", suppliearName:"Dweny Smith landscaping", 
                    supplierOrder:"1249", createdBy:"Dweny Smith", orderDate:"20/02/12021", expectedDate:"20/05/12021",
                     dispatch:"Pickup", amount:"9,089.00" },
            
                     {status:"QUOTE", orderNumber:"Robert Jr-012301-1", suppliearName:"Robert Jr Smith landscaping", 
                     supplierOrder:"57901", createdBy:"Robert Jr Smith", orderDate:"20/05/12021", expectedDate:"20/05/12021",
                      dispatch:"Delivery", amount:"12,012.00" }
            ],
            initialDetailsQL:[],
            searchString: "",
            orderSearch:"",
            suggestionsInJOBD:[],
            jobDSearch:"",
            isChecked:false,
            allChecked: false,

            list: [
                { id: 1, name: "Open",label:"Open", isChecked: false },
                { id: 2, name: "Pick", label:"Pick",isChecked: false },
                { id: 3, name: "Ready", label:"Ready",isChecked: false },
                { id: 4, name: "Ship", label:"Ship",isChecked: false },
                { id: 5, name: "Invoice", label:"Invoice",isChecked: false },
                { id: 6, name: "Closed", label:"Closed",isChecked: false },
                { id: 7, name: "Cancel", label:"Cancel",isChecked: false },
                { id: 8, name: "Late", label:"Late",isChecked: false },
              ],

              allCountList:[],

            suggestions: [],
            suggestionsInOrder: [],
            text: ""
        }
       
    }
    //const [value, onChange] = useState(new Date());
   //NEW 
    // onSearchInputChange = (e) => {
    //     this.setState({searchInput: e.target.value})
    //   }

   

    componentDidMount=()=> {

        this.props.getOrderList();
        //console.log("abcdaaasdCOmp", this.props.getQuoteOrderList())
        //this.props.getQuoteOrderList()

        this.setState({
            initialDetailsQL: this.props.getOrderListTable
            //initialDetailsQL
            //this.props.quoteOrderListTable
        });
        this.refs.search.focus();
        this.refs.ordSearch.focus();

        this.find_duplicate_in_array(this.props.getOrderListTable);

        let abc= this.state.allCountList

        let finalValue = this.state.allCountList.map(a=>a)

        console.log("abc100", finalValue, this.state.allCountList)



      }


      componentDidUpdate=()=>{

      }



      handleChange=()=> {
        this.setState({
          searchString: this.refs.search.value,
        });
      }

      onTextChange = e => {
          //debugger
        let items = this.props.getOrderListTable
        //this.state.initialDetailsQL;
        //this.props.quoteOrderListTable;
        //this.state.initialDetailsQL;
        let supName = items.map((e)=>e.customer_name)
        console.log("supName", supName)
        const val = e.target.value;
        let suggestions = [];
        if (val.length > 0) {
          const regex = new RegExp(`^${val}`, "i");
          suggestions = supName.sort().filter(v => regex.test(v));
        }
        this.setState({ suggestions, searchString: val });
      };

      suggestionSelected=(value)=> {
        this.setState({
            searchString: value,
            suggestions: [],
            
        });
      }




      renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
          return null;
        }
        return (
          <ul>
            {suggestions.map(item => (
              <li onClick={() => this.suggestionSelected(item)}>{item}</li>
            ))}
          </ul>
        );
      }


      suggestionSelectedOrder=(value)=> {
        this.setState({
            orderSearch: value,
            suggestionsInOrder: [],
            
        });
      }

      suggestionSelectedJOBD=(value)=> {
        this.setState({
            jobDSearch : value,
            suggestionsInJOBD: [],
            
        });
      }

      renderSuggestionsOrder() {
        const { suggestionsInOrder } = this.state;
        if (suggestionsInOrder.length === 0) {
          return null;
        }
        return (
          <ul>
            {suggestionsInOrder.map(item => (
              <li onClick={() => this.suggestionSelectedOrder(item)}>{item}</li>
            ))}
          </ul>
        );
      }



      handleOrdChange=()=>{
        this.setState({
            orderSearch:this.refs.ordSearch.value
          });
      }

      handleJobDChange=()=>{
        this.setState({
            jobDSearch:this.refs.jobDSearch.value
          });
      }

      onTextChangeOrder = e => {
        //debugger
      let items = this.props.getOrderListTable
      //this.state.initialDetailsQL;
      //this.props.quoteOrderListTable;
      //this.state.initialDetailsQL;
      let supName = items.map((e)=>e.order)
      console.log("supName", supName)
      const val = e.target.value;
      let suggestionsInOrder = [];
      if (val.length > 0) {
        const regex = new RegExp(`^${val}`, "i");
        suggestionsInOrder = supName.sort().filter(v => regex.test(v));
      }
      this.setState({ suggestionsInOrder, orderSearch: val });
    };

    //   handleChange=()=> {
    //     this.setState({
    //       searchString: this.refs.search.value
    //     });
    //   }



    onSearchInputChange2 = (e) => {
       // debugger;
        this.setState({searchInput: e.target.value});
      }

      onSearchInputChange3 = (e) => {
        this.setState({searchInput: e.target.value});
      }


    onSearchInputChange = (e) => {
        this.setState({alphabet: e.target.value,alphabetSelect:''})
        this.setState({
          button:!this.state.button
        })
      }


      handleClickCheckBox = (e)=>{


        if(e.target.id==="Open"){
           // debugger
            this.setState({
                isChecked: !this.state.isChecked,
              });


              if(!this.state.isChecked){
                let initialDetailsQl = this.props.getOrderListTable
                //this.state.initialDetailsQL
                let newCheckedData = initialDetailsQl.filter(newCheck => newCheck.status===e.target.name)
    
                this.setState({checkedData: newCheckedData})
              }
              
            // let checked = e.target.name
            // let initialDetailsQl = this.state.initialDetailsQL
            // let newCheckedData = initialDetailsQl.filter(newCheck => newCheck.status===e.target.name)
            //finalCMSettingsPermissions.map(user=>{return {...user, isChecked:checked}});
            //let newCheckedData = initialDetailsQl.filter(newCheck =>{return{ ...newCheck.status===e.target.name, isChecked:checked}})

           // this.setState({checkedData: newCheckedData})
        }


        else if(e.target.id==="Closed"){
            let initialDetailsQl = this.props.getOrderListTable
            //this.state.initialDetailsQL
            let newCheckedData = initialDetailsQl.filter(newCheck => newCheck.status===e.target.name)

            this.setState({checkedData: newCheckedData})

        }


        console.log("iddddddd", e.target.id, e.target.value)

       
        //this.setState({alphabet: newCheckedData})
        
        // console.log("e1",checkedData);
      }



      paginationChange =(event, page)=>{
        // alert("hg")
        this.props.setPageNumberOl(page-1)
    }
 // <div class="form-group row mt-4">
        //     <div class="col-md-12 col-lg-12">
        //     <ul class="list-unstyled searchAlpha d-flex flex-wrap">
        //     <li> 
        //         <button key={i} class="active" onClick={this.onAlphabetClick} value={String.fromCharCode(i)}>{String.fromCharCode(i)}</button> 
        //          </li>
                
        //             </ul>
        //         </div>
        //     </div>


      onAlphabetClick = (e) => {
         // debugger;
         // e.preventdefault();
        // this.setState({alphabet: e.target.value})  this.refs.buttonClik.value
        this.setState({alphabet:e.target.value, alphabetSelect:e.target.value, button:false})
        console.log("alphabet", this.state.alphabet, this.state.alphabetSelect)
      }
      prepareAlphabets = () => {
         
        let result = [];
       
        for(let i=65; i<91; i++) {
           
          result.push(
            // <button type="button" key={i} onClick={this.onAlphabetClick} value={String.fromCharCode(i)} >{String.fromCharCode(i)}</button>
            <button type="button" className={ this.state.alphabetSelect===String.fromCharCode(i)?" buttonStyles selected_alphabet":"unselected_aplphabet buttonStyles"}  key={i} onClick={this.onAlphabetClick}  ref="buttonClik" value={String.fromCharCode(i)}>{String.fromCharCode(i)}</button>
          )
        }
       

        return result;

       
      }


     // checkOperation=(checkedData, element)=>(checkedData ? checkedData.filter(newCheck => newCheck.status==="open") : "");





 elementContainsSearchString2 = (searchInput, element) => (searchInput ? element.supplierOrder.toLowerCase().includes(searchInput.toLowerCase()) : false);

      elementContainsSearchString = (searchInput, element) => (searchInput ? element.customer_name.toLowerCase().includes(searchInput.toLowerCase()) || element.poNumber.toLowerCase().includes(searchInput.toLowerCase()) || element.supplierOrder.toLowerCase().includes(searchInput.toLowerCase()) : false);


      filterItems = (initialDetailsQL) => {
         // debugger;
        let result = [];
        const { searchInput,alphabet , checkedData} = this.state;
        if(initialDetailsQL &&  (searchInput || alphabet)) {
            result = initialDetailsQL.filter((element) => ( element.customer_name.charAt(0).toLowerCase() === alphabet.toLowerCase()) || 
            this.elementContainsSearchString(searchInput, element) );
           // result = initialDetailsQL.filter((el) => (el.suppliearName.charAt(0).toLowerCase() === alphabet.toLowerCase()) || this.elementContainsSearchString(searchInput, el) );
          }

        // else if( initialDetailsQL && checkedData){

        //     result = initialDetailsQL.filter((item)=>item.status)

        // }
        else {
          result = initialDetailsQL || [];
        }

        result = result.map((item)=>(item))
       
        return result;
      }

//END
     handleAlphabetFilter = (e)=>{
        this.setState({selectedAlpha:e.target.id})
       // this.setState({selectedAlpha:e.target.id})
        this.props.handleSearchFilterByAlpha(e.target.id, this.state.quoteOrderList)

    }


    handleChangeCheckbox = e => {
            //debugger
        let itemName = e.target.name;
        let checked = e.target.checked;
        this.setState(prevState => {
          let { list, allChecked } = prevState;
          if (itemName === "checkAll") {
            allChecked = checked;
            list = list.map(item => ({ ...item, isChecked: checked }));
          } else {
            list = list.map(item =>
              item.name === itemName ? { ...item, isChecked: checked } : item
            );
            allChecked = list.every(item => item.isChecked);
          }
          return { list, allChecked };
        });
    
        console.log("items::",itemName , checked)
      }


      checkboxList = () => {

        return this.state.list.map(item => (
          

            <div class="custom-control custom-checkbox" style={{marginRight:"3em"}}>
                <input type="checkbox" class="custom-control-input" id={item.id}
                    key={item.id}
                    name={item.name}
                    value={item.name}
                    checked={item.isChecked}
                    onChange={this.handleChangeCheckbox}
                // onChange={this.handleClickCheckBox} 
                />
                <label class="custom-control-label" for={item.id} >{item.name}</label>
            </div>
        ));
      };



       find_duplicate_in_array=(array)=>{
           //debugger
        // let statusList =this.state.initialDetailsQL;
        let totalStatusList =array.map(e=>e.order_status)
        const {allCountList}=this.state

       // const count = {}
        const result = []
        
        totalStatusList.forEach(item => {
            if (allCountList[item]) {
                allCountList[item] +=1
               return
            }
            allCountList[item] = 1
        })
        
        for (let prop in allCountList){
            if (allCountList[prop] >=2){
                result.push(prop)
            }
        }

        // this.setState({
        //     allCountList:count
        // })
        
        console.log("FinalCount",this.state.allCountList)



        return result;
        
        }

         handleSelect = (ranges) => {           //event handler to handel datepicker
            let start = new Date(ranges.selection.startDate).getTime()
            let end = new Date(ranges.selection.endDate).getTime()
          if(JSON.stringify(end).substr(-4) === "0000"){
            end += 86399999         // used to fix date picker bug
          } 


          this.setState({
              selectionRange:ranges.selection
          })
               this.setState({
                   filterDate:`${new Date(ranges.selection.startDate).toLocaleString("en-us", _dateFormatOptionsForCalendar)}
                   -${new Date(ranges.selection.endDate).toLocaleString("en-us", _dateFormatOptionsForCalendar)}`
               })

               this.setState({
                   startDate: start,
                   endDate:end
               })
                //setSeletionRange(ranges.selection)
                // setFilterDate(`${new Date(ranges.selection.startDate).toLocaleString("en-us", _dateFormatOptionsForCalendar)}
                // -${new Date(ranges.selection.endDate).toLocaleString("en-us", _dateFormatOptionsForCalendar)}`)
                // setStartDate(start)
                // setEndDate(end)
               
        }

         dateClick=(e)=>{        // not used
            e.preventDefault()
            
            if(this.state.startDate>this.state.endDate){
                    // this.setState({err:true,
                    //     filterDate:"All"
                    // })
            }
            else{
                
            }

            this.setState((prevState)=>({
                showCalendar:!prevState.showCalendar
            }))
           // setShowCalendar(!showCalendar)
            // this.setState((prevState)=>({
            //     showCalendar:!prevState.showCalendar
              
            //     // filterDate:"All"
            // }))
         }


          calendarClick=()=>{   
     
            if(this.state.startDate !==0 || this.state.endDate !== 0 )
            // setSeletionRange({
            //     startDate: new Date(),
            //     endDate: new Date(),
            //     key: 'selection',
            // })

            this.setState({
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            })
        
        }
         onRangeFocusChange  = ()=>{
            alert("s")
        }



   // console.log("quoteOrderList", this.props.quoteOrderData)
    render(){
        console.log("abcdaaasd", this.props.getOrderListTable)

        let listValue = this.state.list
        let deductingFinalValues =listValue.filter(e=>e.label==="Open" || e.label==="Ready"|| e.label==="Ship"|| e.label==="Closed"|| e.label==="Pick"|| e.label==="Late");
            console.log("deductingFinalValues",deductingFinalValues)
        // let statusList =this.state.initialDetailsQL;
        // let totalStatusList =statusList.map(e=>e.status)
            //console.log("ListofCheckbox", this.state.list)
         //this.find_duplicate_in_array(totalStatusList)

         let finalCount = this.state.allCountList
         console.log("finalCount123",finalCount)

        let totalValueList = Object.values(finalCount)

        let finalTotalValue = totalValueList.reduce((a, b) => a + b, 0)


        // let sum = finalCount.map(o => o.CANCEL).reduce((a, c) => { return a + c });
        //  let totalOrders = finalCount.map(e=>e)
          console.log("finalCount1234555",finalTotalValue )



         let _checkList = this.state.list
          
               let chk = _checkList.filter(e=>e.isChecked===true)
                //  let check =chk.map(e=>e.isChecked)  
               console.log("aaaaaa", chk)
          





        console.log("allCount", this.state.list)
            let totalNumbers =this.state.allCountList
            let totalNumbersList =totalNumbers.filter(e=>e.Open);
        console.log("totalNumbersList",totalNumbers,totalNumbersList, this.state.allCountList)
        //console.log("alphabetInrender", this.state.checkedData, this.state.isChecked)
        let _users = this.props.getOrderListTable
        //this.state.initialDetailsQL;
        //this.props.quoteOrderListTable
        //this.state.initialDetailsQL;

        let search = this.state.searchString.trim().toLowerCase();
        let orderSearch = this.state.orderSearch.trim().toLowerCase();
        let jobDSearch = this.state.jobDSearch.trim().toLowerCase();
        let alphaVal = this.state.alphabetSelect.trim().toLowerCase();
        //debugger;
        if (search.length > 0 ) {
          _users = _users.filter(function(user) {
            return user.customer_name.toLowerCase().match(search);
          });
        }

        if (orderSearch.length > 0 ) {
            _users = _users.filter(function(user) {
              return user.order_id.toLowerCase().match(orderSearch);
            });
          }

        if (alphaVal.length>0 ) {
            _users = _users.filter(function(user) {
              return user.customer_name.toLowerCase().match(alphaVal);
            });
          }


          if(chk[0]){

              //debugger;
              let checkedList=chk.map(a=>a.label)
                console.log("checkedList",checkedList)
             // let labelC = chk.map(e=>e.label)

             _users = _users.filter(value => checkedList.includes(value.order_status));
              

            //   _users=_users.filter(function(user) {
            //     //  chk.map(function (student) {
            //     return user.status===  chk[0].label;
            //     //(chk[0].label && chk[1].label  || chk[2].label  || chk[3].label || chk[4].label  || chk[5].label  || chk[6].label)
            //     //chk.filter(e=>e.label)
            //     //chk[0].
            //     //  })
            //   });
          }






        console.log("_users", _users)
      //  debugger
        //let purchaseOrderData = [];
        console.log("quoteOrderList", this.props.OrderData)
        console.log("abcd", this.state.checkedData)
        let pageCount1 =0;
        let pageNumber1 = 0;
        let totalLength1 = 0;
        let plantPerPage1 =0;
        let pagesVisited1 = 0;
        let displayPOList1 = []


      
      //let initialDetails1 = initialDetailsQL || this.state.checkedData
       // console.log("pageNumber", this.props.purchaseOrderData.pageNumber)


      if(_users){

        pageNumber1 = this.props.OrderData.pageNumber1;
       let initialDetails1 = [..._users];
         totalLength1 = initialDetails1.length;
         plantPerPage1 = this.state.pageSize;
         pagesVisited1 =  this.props.OrderData.pageNumber1 * this.state.pageSize;
         displayPOList1 = initialDetails1.slice(pagesVisited1,pagesVisited1+plantPerPage1)
         pageCount1 = Math.ceil(initialDetails1.length/plantPerPage1)

    }

            console.log("displayPOList",displayPOList1)

        const filteredList = this.filterItems(displayPOList1);

              console.log("filteredList", filteredList)
       // console.log(this.props.purchaseOrderData)
    return (


        
        <div>
            <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center">
				<h1 class="page-header mb-0"><img src="assets/img/quote-ic-green.svg" alt=""/> Quote &amp; Order List</h1>
				<div class="topbarCtrls mt-3 mt-md-0">
                   
                    <Link to="/Quote">
                    <a href="#" class="btn">
                        <span class="d-flex align-items-center text-left">
                        <img src="assets/img/Quoteblue_small-Icon.svg" alt=""/>
                            <span class="ml-2"><b>New Quote</b></span>
                        </span>
                        </a>
                        </Link>
                    {/* </a> */}
                    <Link to="/QuoteAndOrdersManagement">
                    <a href="#" class="btn ml-2">
                        <span class="d-flex align-items-center text-left">
                            <img src="assets/img/PurchaseOrders-sm.svg" alt=""/>
                            <span class="ml-2"><b>New Order</b></span>
                        </span>
                    </a>
                    </Link>
				</div>
			</div>
            <div class="px-md-3 mt-3">
            <div class="bg-white px-3 py-3 my-3 cardShadow">
                <div class="row align-items-center">
                    <div class="col-md-12 col-lg-6 d-md-flex justify-content-between editCustSec">
                        <div class="ordersCard d-flex justify-content-md-between align-item-stretch w-100">
                            {/* <div class="cardBoxwide totalCard">
                                <p>Total Orders</p>
                                <span style={{fontSize: "32px"}}>61</span>
                                <div>
                                    <a href="#">View All</a>
                                </div>
                            </div> */}
                            <div class="cardBoxwide individualCard totalCard" style={{minWidth:"130px"}}>
                                <div class="stripe"></div>
                                <p>Total Orders</p>
                                <h4>{finalTotalValue}</h4>
                                <div>
                                    <a href="#">View All</a>
                                </div>
                            </div>
                            <div class="equalSign2"  >=</div>

                            {/* <input type="checkbox" class="custom-control-input" id={item.id}
                    key={item.id}
                    name={item.name}
                    value={item.name}
                    checked={item.isChecked}
                    onChange={this.handleChangeCheckbox}
                // onChange={this.handleClickCheckBox} 
                /> */}
                            
                                {deductingFinalValues.map(item=>{
                                    
                                    return <div style={{display:"flex"}}>
                                         <span class="plusSignInQuote">+</span>
                                         
                                      <div class="cardBox individualCard openStsCard" >

                                            <div class="stripe" 
                                            style={
                                                item.label==="Open" ? {backgroundColor:"#345d99"} : 
                                                item.label==="Closed" ? {backgroundColor:"#C4E9C4"} :
                                                item.label==="Ready" ? {backgroundColor:"#f28c3c", color:"#f28c3c"} :

                                                item.label==="Pick" ? {backgroundColor:"#4b9ef7"} :
                                                item.label==="Ship" ? {backgroundColor:"#e54dcd"} :
                                                item.label==="Late" ? {backgroundColor:"#ed3833"
                                            } :
                                                
                                                
                                                
                                                {backgroundColor:"none"}
                                                    // item.label==="OPEN" ? "red" :##cbf4fd
                                                    // item.label==="CLOSED" ? "blue":
                                                    // item.label==="READY" ? "green" :
                                                    // item.label==="LATE" ? "yellow" :

                                                    // item.label==="SHIPPED" ? "pink" :
                                                    // item.label==="PICKING" ? "orange" :
                                                  
                                                    // item.label==="CANCEL" ? "brown":
                                            } 
                                            ></div>
                                                <p style={{marginTop:"5px"}}>{item.name}</p>
                                            <h4>{ item.label==="Open" ? this.state.allCountList.Open :
                                                    item.label==="Closed" ? this.state.allCountList.Closed :
                                                    item.label==="Ready" ? this.state.allCountList.Ready :
                                                    item.label==="Late" ? this.state.allCountList.Late :

                                                    item.label==="Ship" ? this.state.allCountList.Ship :
                                                    item.label==="Pick" ? this.state.allCountList.Pick :
                                                    item.label==="Invoice" ? this.state.allCountList.Invoice :
                                                    item.label==="Cancel" ? this.state.allCountList.Cancel :
                                            0}</h4>
                                            <div>
                                           
                                                <input type="checkbox" name={item.name}
                                                    key={item.id}
                                                    value={item.name}
                                                    checked={item.isChecked}
                                                     onClick={this.handleChangeCheckbox}
                                                     className="checkBoxHide"
                                                     >
                                                    </input>
                                                    <label style={{marginTop:"10px"}}  for={item.id} > <span style={{color:"#5287f5", cursor:"pointer", marginLeft:"-13px"}}>View All</span></label>
                                                   
                                            </div>
                                           
                                        </div>

                                        {/* <span class="plusSignInQuote">+</span> */}
                                       
                                        
                                    </div>

                                })}
                               
                                
                           
                            {/* <div class="equalSign">+</div>
                            <div class="cardBox individualCard pickingStsCard">
                                <div class="stripe"></div>
                                <p>Picking</p>
                                <h4>{this.state.allCountList.PICKING}</h4>
                                <div>
                                    <a href="#">View All</a>
                                </div>
                            </div> */}

                            {/* <div class="equalSign">+</div>
                            <div class="cardBox individualCard readyStsCard">
                                <div class="stripe"></div>
                                <p>Ready</p>
                                <h4>{this.state.allCountList.READY}</h4>
                                <div>
                                    <a href="#">View All</a>
                                </div>
                            </div>
                            <div class="equalSign">+</div>
                            <div class="cardBox individualCard shippedStsCard">
                                <div class="stripe"></div>
                                <p>Shipped</p>
                                <h4>{this.state.allCountList.SHIPPED}</h4>
                                <div>
                                    <a href="#">View All</a>
                                </div>
                            </div> 


                            <div class="equalSign">+</div>
                            <div class="cardBox individualCard lateStsCard">
                                <div class="stripe"></div>
                                <p>Late</p>
                                <h4>{this.state.allCountList.LATE}</h4>
                                <div>
                                    <a href="#">View All</a>
                                </div>
                            </div>*/}


                            <div class="equalSign">&nbsp;</div>
                            <div class="verDivider"></div>
                            <div class="equalSign">&nbsp;</div>
                            <div class="cardBoxwide individualCard activeQuotesCard" >
                                <div class="stripe"></div>
                                <p>Active Quotes</p>
                                <h4>12</h4>
                                <div>
                                    <a href="#">View All</a>
                                </div>
                            </div>
                            {/* <div class="cardBoxwide activeQuotesCard">
                                <p>Active Quotes</p>
                                <h4>12</h4>
                                <div>
                                    <a href="#">View All</a>
                                </div>
                            </div> */}
                            <div class="equalSign">&nbsp;</div>
                            <div class="cardBoxwide individualCard quotesFlaggedCard" >
                                <div class="stripe"></div>
                                <p>Quotes Flagged</p>
                                <h4><font color="red">12</font></h4>
                                <div>
                                    <a href="#">View All</a>
                                </div>
                            </div>
                        </div>



                        
                    </div>
                </div>
            </div>
                <div class="bg-white px-3 py-3 mt-2">
                    <form>
                        <h2>Search Quotes &amp; Orders {this.state.abcdefg}</h2>
                        {/* {this.state.abcdefg} */}
                        
                        <div class="row mt-3 align-items-center">
                            <div class="col-md-12">
                                <div class="row form-group">
                                    <div class="col-md-12 col-lg-12">
                                        <label><b>Orders</b></label>
                                        <div class="d-flex flex-wrap mt-2">
                                            {/* <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="OPEN" 
                                                name="OPEN"
                                                onChange={this.handleClickCheckBox} />
                                                <label class="custom-control-label" for="OPEN" >Open</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-3">
                                                <input type="checkbox" class="custom-control-input" id="customCheck2" />
                                                <label class="custom-control-label" for="customCheck2">Pick</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-3">
                                                <input type="checkbox" class="custom-control-input" id="customCheck3" />
                                                <label class="custom-control-label" for="customCheck3">Ready</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-0 ml-md-3 mt-2 mt-md-0">
                                                <input type="checkbox" class="custom-control-input" id="customCheck4" />
                                                <label class="custom-control-label" for="customCheck4">Ship</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-0 ml-md-3 mt-2 mt-md-0">
                                                <input type="checkbox" class="custom-control-input" id="customCheck5" />
                                                <label class="custom-control-label" for="customCheck5">Invoiced</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-0 ml-md-3 mt-2 mt-md-0">
                                                <input type="checkbox"  onChange={this.handleClickCheckBox} name="CLOSED"
                                                 class="custom-control-input" id="CLOSED" />
                                                <label class="custom-control-label" for="CLOSED">Closed</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-0 ml-md-3 mt-2 mt-md-0">
                                                <input type="checkbox" class="custom-control-input" id="customCheck7" />
                                                <label class="custom-control-label" for="customCheck7">Cancelled</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-0 ml-md-3 mt-2 mt-md-0">
                                                <input type="checkbox" class="custom-control-input" id="customCheck8" />
                                                <label class="custom-control-label" for="customCheck8">Late</label>
                                            </div> */}
                                            {this.checkboxList()}
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-5 col-lg-5" style={{marginLeft:"-1em"}}>
                                        <div class="d-flex flex-wrap mt-2">
                                            <div class="custom-control custom-checkbox ml-0 ml-md-3 mt-2 mt-md-0">
                                            <input
                                                    class="custom-control-input"
                                                    type="checkbox"
                                                    name="checkAll"
                                                    id="checkAll"
                                                    checked={this.state.allChecked}
                                                    onChange={this.handleChangeCheckbox}
                                                    />
                                                     <label class="custom-control-label" for="checkAll" style={{color:"#348fe2"}}>Select All/Select None</label>
                                                {/* <a href="" style={{cursor:"pointer"}}><label>Select All/Select None</label></a> */}
                                            </div>
                                            {/* <div><label>&nbsp;&nbsp;&nbsp;</label></div>
                                            <div><a href="javascript:;" style={{cursor:"pointer"}}><label>Select None</label></a></div> */}
                                            
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div class="row form-group">
                                    <div class="col-md-2 col-lg-2">
                                        <label><b>Quotes</b></label>
                                        <div class="d-flex flex-wrap mt-2">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="active" 
                                                name="active"
                                                onChange={this.handleClickCheckBox} />
                                                <label class="custom-control-label" for="active" >Active</label>
                                            </div>
                                            <div class="custom-control custom-checkbox ml-3">
                                                <input type="checkbox" class="custom-control-input" id="inactive" />
                                                <label class="custom-control-label" for="inactive">InActive</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-7 col-lg-7">
                                        <label><b>Date Range</b></label>
                                        <div class="d-flex flex-wrap align-items-center">
                                            <div class="custom-control custom-radio">
                                                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" />
                                                <label class="custom-control-label" for="customRadio1">Last 7 Days</label>
                                            </div>
                                            <div class="custom-control custom-radio ml-3">
                                                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" />
                                                <label class="custom-control-label" for="customRadio2">Last 30 Days</label>
                                            </div>
                                            <div class="custom-control custom-radio ml-3">
                                                <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" />
                                                <label class="custom-control-label" for="customRadio3">Select Range</label>
                                            </div>


                                            <div class="ml-3">
                                                {/* <DatePicker 
                                                // onChange={onChange} value={value} 
                                                /> */}


                                
                                <label className={"imagePropDropDown"} onClick={this.dateClick}  style={{color:"#333333", textAlign: "start",margin:"0px auto",marginTop:"8px",border:"1px solid lightgray",padding:5,borderRadius:4,width:210}} id="datePickerZone">{this.state.filterDate  }</label>
                                {/* <img name="dropdown"    src={IconAssets["dropDown"]} alt={""} onClick={this.dateClick} id="drop" style = {{float:"right",border:"1px solid lightgray",borderRadius:"10px",marginTop:-43,cursor:"pointer"}}/> */}
                                <div style={{ position: "absolute", zIndex: "99",top:"80px", marginLeft:"-15em"}}>
                                 
                                    {this.state.showCalendar && <>
                                        <DateRangePicker 
                                            id="DatePickerInside"
                                            months = {2}
                                            outsideClick ={this.onRangeFocusChange}
                                            ranges={[this.state.selectionRange]}
                                            onChange={this.handleSelect}
                                            showSelectionPreview={true}
                                            moveRangeOnFirstSelection={false}
                                            className={'PreviewArea'}
                                            direction="horizontal"
                                        />
                                        <button className="date" id="date" style={{zIndex: "1000" ,position:"absolute" ,left:"19px",top:"340px",backgroundColor:"white",border:"white",fontSize:"smaller"}} onClick={this.calendarClick}>Clear</button>
                                    </>}
                                </div>
                                                {/* <input type="date" className="dateDesign"  /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-4 col-lg-4">
                                        <label><b>Customer</b></label>
                                        <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            <div>
                                            <input type="text" class="form-control" 
                                             //onChange={this.onSearchInputChange2} 
                                             ref="search"
                                             //value={this.state.text}
                                             value={this.state.searchString} 
                                             onChange={this.onTextChange}
                                             //onChange={this.handleChange}
                                             placeholder="Search Customer Name/Number"/>
                                            </div>
                                           
                                            
                                        </div>
                                        <span className="SearchBar">
                                                  {this.renderSuggestions()}
                                        </span>
                                    </div>
                                    <div class="col-md-4 col-lg-4 ">
                                        <label><b>Job Description</b></label>
                                        <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            <input type="text" class="form-control" placeholder="Search Job Description"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-lg-4 ">
                                        <label><b>Order#</b></label>
                                        <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>

                                            <input type="text" class="form-control" 
                                             ref="ordSearch"
                                             value={this.state.orderSearch} 
                                             onChange={this.onTextChangeOrder}
                                            // onChange={this.onSearchInputChange3} 
                                            placeholder="Search Order"/>


                                            {/* <Autocomplete
                                                id="custom-input-demo"
                                                options={initialDetailsQL}
                                                getOptionLabel={(option) => option.orderNumber}
                                                renderInput={(params) => (
                                                    <div ref={params.InputProps.ref}>
                                                    <input class="form-control"  style={{ width: 200 }} ref="ordSearch" type="text"
                                                     {...params.inputProps} />
                                                    </div>
                                                )}
                                            /> */}
                                            
                                        </div>
                                        <span className="SearchBar">
                                                  {this.renderSuggestionsOrder()}
                                        </span>
                                    </div>
                                </div>
                                <div class="row form-group mb-2">
                                    <div class="col-md-4 col-lg-4">
                                        <label><b>Search Plants or Products</b></label>
                                        <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            <input type="text" class="form-control" placeholder="Search Plants or Products"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-lg-4 ">
                                        <label><b>SKU</b></label>
                                        <div class="searchInput">
                                            <button type="submit" class="btn btn-search">
                                                <img src="assets/img/search.svg" alt=""/>
                                            </button>
                                            <input type="text" class="form-control" onChange={this.onSearchInputChange2} placeholder="Search SKU"/>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-lg-4 pt-md-1 mt-2 ">
                                        <label>&nbsp;</label>
                                        <div class="searchInput">
                                        <a href="javascript:;" style={{cursor:"pointer"}}>Reset</a>
                                        </div>
                                    </div>
                                </div>
                            <div className="row_1 mt-4">
                                        <div style={{float:"left",marginBottom:15}}>
                                            {/* <div> */}
                                                <label className="greenText">{"Showing " + (pageNumber1>0 ? (this.state.pageSize*((pageNumber1)))+1 : ((pageNumber1)+1))+  "  to  " +  (pageNumber1>0 ? (((this.state.pageSize*((pageNumber1)))+this.state.pageSize)>totalLength1 ? totalLength1 : ((this.state.pageSize*((pageNumber1)))+this.state.pageSize)) : ((((pageNumber1)+1)*this.state.pageSize)>totalLength1?totalLength1:(((pageNumber1)+1)*this.state.pageSize)))   + "  of   "  +   totalLength1 }</label>
                                            {/* </div> */}
                                        </div>
                                        <div style={{float:"left",marginBottom:15}}>
                                            <label className="greenText">Show</label>
                                                <select 
                                                    value={this.state.pageSize}
                                                    onChange={e => {
                                                        this.setState({
                                                            pageSize:  Number(e.target.value)
                                                        })
                                                    }}
                                                    >
                                                    {[5,15, 25, 50, 100, 250].map(pageSize => (
                                                        <option key={pageSize} value={pageSize}>
                                                        {pageSize}
                                                        </option>
                                                    ))}
                                                </select>
                                                
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <input type="checkbox" class="custom-control-input customer-checkbox" id="dispquote" />
                                                <label class="custom-control-label" for="dispquote"><b>Display FLAGGED Quotes only</b></label>
                                        </div>
                                        <div style={{float:"right",marginBottom:15}}>
                                        <TablePagination pageChange={this.paginationChange} pageCount={pageCount1} pageNumber={pageCount1+1}/>
                                            
                                        </div>
                               
                            </div>
                            <div class="form-group row mt-0">
                                <div class="col-md-12 col-lg-12">
                                    <ul class="list-unstyled searchAlpha d-flex flex-wrap">
                                        {/* <li><a  class={this.state.selectedAlpha =="All"?"active":""} onClick={this.handleAlphabetFilter} id="All" style={{cursor:"pointer"}}>All</a></li> */}

                                        <button type="button" className={this.state.button ? "selected_alphabet buttonStyles": "unselected_aplphabet buttonStyles"}  onClick={this.onSearchInputChange}>All</button>
                                            {this.prepareAlphabets()}
                                    </ul>
                                </div>
                            </div>


                                <div class="form-group row" style={{marginBottom: "5px"}}>
                                    <div class="col-md-12 table-responsive">
                                        <table id="plantDetails" class="table table-striped w-100">
                                            <thead>
                                                <tr>
                                                    <th class="text-nowrap text-center">Status</th>
                                                    <th class="text-nowrap text-center">Order#</th>
                                                    <th class="text-nowrap text-center">Order Parts</th>
                                                    <th class="text-nowrap text-left" width="20%">Customer Name</th>
                                                    <th class="text-nowrap text-center">Type</th>
                                                    <th class="text-nowrap text-center">PO#</th>
                                                    <th class="text-nowrap text-center">Order Date</th>
                                                    <th class="text-nowrap text-center">Requested Date</th>
                                                    <th class="text-nowrap text-center">Remaining Balance</th>
                                                    <th class="text-nowrap text-center">Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {displayPOList1.map(pQuoteList=>{
                                                    return <tr key={pQuoteList.orderNumber}>
                                                    <td class="text-center"><span  class={pQuoteList.order_status==='Closed'?'stsBadge stsClosed':
                                                    pQuoteList.order_status==='Open'?'stsBadge stsOpen'
                                                    :pQuoteList.order_status==='Ready'?'stsBadge stsReady'
                                                    :pQuoteList.order_status==='Reserve'?'stsBadge stsReserve'
                                                    :pQuoteList.order_status==='Pick'?'stsBadge stsPicking'
                                                    :pQuoteList.order_status==='Ship'?'stsBadge stsShip'
                                                    :pQuoteList.order_status==='Late'?'stsBadge stsLate'
                                                    :pQuoteList.order_status==='Quote'?'stsBadge stsQuote':""}>{pQuoteList.order_status}</span></td>
                                                    <td><a href="">{pQuoteList.order_id}</a></td>
                                                    <td class="text-nowrap text-center">4</td>
                                                    <td>{pQuoteList.customer_name}</td>
                                                    <td class="text-center">{pQuoteList.amount}</td>
                                                    <td class="text-center">8458788</td>
                                                    <td class="text-center">{pQuoteList.order_date}</td>
                                                    <td class="text-center">{pQuoteList.requested_date}</td>
                                                    <td class="text-center">{pQuoteList.amount}</td>
                                                    {/* <td class="text-nowrap text-right">6,085.00 <br/>32,058.12</td> */}
                                                    <td class="text-center">
                                                        <span>
                                                            <a href="javascript;">
                                                                <img src="assets/img/edit.svg" alt=""/>
                                                            </a>
                                                        </span>
                                                    </td>
                                                </tr>
                                                


                                            })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
}


const mapStateToProps = (state)=> (
    // console.log(state.customerReducer.payload)
    {
       // quoteOrderData:state.quoteOrderReducer,
       // quoteOrderListTable:state.quoteOrderReducer.quoteOrderList,
        OrderData:state.OrderListMangementReducer,
        getOrderListTable:state.OrderListMangementReducer.getOrderList
    }

)


export default connect(mapStateToProps,{
    setPageNumberOl,handleSearchFilterByAlpha,
    getOrderList,handleAplhabetFilterBySN
})(OrderList)