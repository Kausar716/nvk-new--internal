import React, { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker';
import 'react-tabs/style/react-tabs.css';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import TablePagination from '../Pagination/index';
import Autosuggest from 'react-autosuggest';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import {resetFileds,filterInvoiceManagerData,deleteCustomer,getAllInvoice,handleExchangeData,getCustomerById,setPageNumber,handleSearchFilter,handleAplhabetFilter,typeOfActionShow} from "../../actions/invoiceAction";

 function InvoiceList(props) {
    const [reStock, setReStock] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [value1, setValue1] = useState("");
    const [searchValue1, setSearchValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [startDate,setStartDate] = useState("");
    const [showCalendar,setShowCalendar] = useState(false)
    const [endDate, setEndDate] = useState("");
    const [filterDate,setFilterDate] = useState("Select Date Range")
    const [searchValue2, setSearchValue2] = useState("");
    const [pageSize,setPageSize] = useState(15)
    const [selectionRange,setSeletionRange] = useState({                       //variable to store datepicker state value
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
        id:"dates"
    },)
    let _dateFormatOptions = {year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"};
    let _dateFormatOptionsForCalendar = {year:"numeric",month:"2-digit",day:"2-digit"};
    const [selectedAlpha,setSelectedAlphabets] = useState("All")
    const[alphabets,setAlphabetSelected]=useState(["A", "B", "C", "D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]);
    useEffect (()=>{
        props.getAllInvoice()

    },[reStock])

    const onSuggestionsFetchRequested = ({ value }) => {
        // this.setState({suggestions:getSuggestions(value)});
        setSuggestions(getSuggestions(value))
       // setSuggestions(getSuggestions(value));
   };
   const renderSuggestion = suggestion => (
    <span>
      {suggestion.name}
    </span>
    );
   const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : props.invoiceData.customerList.filter(lang =>
          lang.name.toLowerCase().includes(inputValue)
        );
    };
   const onChange = (event, { newValue }) => {
        setValue(newValue)
        setSearchValue1(newValue)
        props.filterInvoiceManagerData("name", newValue)
    };
    const onChange1 = (event, { newValue }) => {
        setValue1(newValue)
        setSearchValue2(newValue)
        props.filterInvoiceManagerData("order_id",newValue)
    };
    const onChange2 = (event, { newValue }) => {
        setValue2(newValue)
        setSearchValue(newValue)
        props.filterInvoiceManagerData("invoice",newValue)
    };
   const getSuggestionValue = suggestion =>suggestion.name;
   // Autosuggest will call this function every time you need to clear suggestions.
   const onSuggestionsClearRequested = () => {
   //   setSuggestions([]);
   setSuggestions([])
   };
   const inputProps = {
    placeholder: 'Customer Name',
//    [this.state.value],
    id:"name",
    value:value,
    // className:"searchInput",
    className:" form-control btn btn-search",
    style: {border:"1px solid gray",fontWeight:"2px",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:8,height:"41.5px",fontSize:"15px",textDecoration:"none"},
    onChange: onChange,
    dataId: 'my-data-id',
};
const inputProps1 = {
    placeholder: 'Search Order',
//    [this.state.value],
    value:value1,
    id:"order_id",
    // className:"searchInput",
    className:" form-control btn btn-search",
    style: {border:"1px solid gray",fontWeight:"2px",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:8,height:"41.5px",fontSize:"15px",textDecoration:"none"},
    onChange: onChange1,
    dataId: 'my-data-id',
};
const inputProps2 = {
    placeholder: 'Search Invoice',
//    [this.state.value],
    value:value2,
    id:"invoice",
    // className:"searchInput",
    className:" form-control btn btn-search",
    style: {border:"1px solid gray",fontWeight:"2px",borderRadius:3,textAlign:"left",paddingLeft:"10%",border:"1px solid lightgray",paddingTop:8,height:"41.5px",fontSize:"15px",textDecoration:"none"},
    onChange: onChange2,
    dataId: 'my-data-id',
};
const paginationChange =(event, page)=>{
    props.setPageNumber(page-1)
}
const handleAlphabetFilter = (e)=>{
    // this.setState({selectedAlpha:e.target.id})
    setSelectedAlphabets(e.target.id)
    console.log("alpha",e.target.id)
    props.filterInvoiceManagerData("alpha",e.target.id)

}
const resetFiledsData = ()=>{
    // this.setState({   value:"",value1:"",value2:"",selectedAlpha:"All"})
    setValue("")
    setValue1("")
    setValue2("")
    setFilterDate("Select Date Range")
    setSelectedAlphabets("All")
    props.resetFileds()
}
// if(props.customerData.customerList){
    console.log(props.invoiceData)
    const pageNumber = props.invoiceData.pageNumber
    // console.log()
    const customerData = [props.invoiceData.customerList.sort((a, b) => parseInt(b.id) - parseInt(a.id))]
    const totalLength = props.invoiceData.customerList.length
    const plantPerPage = pageSize;
    const pagesVisited =  props.invoiceData.pageNumber*pageSize;
    const displayCustomerList = props.invoiceData.customerList.slice(pagesVisited,pagesVisited+plantPerPage)
    const pageCount = Math.ceil(props.invoiceData.customerList.length/plantPerPage)
    console.log(pageCount)

// }


  const handleSelect = (ranges) => {           //event handler to handel datepicker
    let start = new Date(ranges.selection.startDate).getTime()
    let end = new Date(ranges.selection.endDate).getTime()
  if(JSON.stringify(end).substr(-4) === "0000"){
    end += 86399999         // used to fix date picker bug
  }
        // window.sessionStorage.setItem("auditLogDateRange",JSON.stringify(ranges))
        // console.log(ranges.selection)
        setSeletionRange(ranges.selection)
        setFilterDate(`${new Date(ranges.selection.startDate).toLocaleString("en-us", _dateFormatOptionsForCalendar)}
        -${new Date(ranges.selection.endDate).toLocaleString("en-us", _dateFormatOptionsForCalendar)}`)
        setStartDate(start)
        setEndDate(end)
        // this.setState({selectionRange:ranges.selection,
        //     filterDate:`${new Date(ranges.selection.startDate).toLocaleString("en-us", this._dateFormatOptionsForCalendar)}
        //     -${new Date(ranges.selection.endDate).toLocaleString("en-us", this._dateFormatOptionsForCalendar)}`,
        //     endDate:end,startDate:start,
        //     filterCanBeApplied:true,tickFilter:true,crossFilter:true})
}
const dateClick=(e)=>{        // not used
    e.preventDefault()
    
    if(startDate>endDate){
            // this.setState({err:true,
            //     filterDate:"All"
            // })
    }
    else{
        
    }
    setShowCalendar(!showCalendar)
    // this.setState((prevState)=>({
    //     showCalendar:!prevState.showCalendar
      
    //     // filterDate:"All"
    // }))
 }
 const calendarClick=()=>{   
     
    if(startDate !=0 || endDate != 0 )
    setSeletionRange({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })

}
const onRangeFocusChange  = ()=>{
    // alert("s")
}
// const {plantData,plantPageNumber} = props.plantData
// const totalLength = plantData.length
// const plantPerPage = pageSize;
// const pagesVisited = plantPageNumber*pageSize;
// const displayPlantList = plantData.slice(pagesVisited,pagesVisited+plantPerPage)
// const pageCount = Math.ceil(plantData.length/plantPerPage)
// console.log("plantData.length",plantData.length)
// console.log("pageCountpageCount", pageCount)
// const {plantCategoryDa ta} =  props.categoryData

    return (
        <div >
        <div >
            <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center" id="s">
				<h1 class="page-header mb-0"><img src="assets/img/customerQuotesAndOrders-lg-green.svg" alt="" class="mr-2"/>Invoice List</h1>
			</div>
            <div class="px-md-3 mt-3" id="s">
                <div class="px-3 py-3 mb-3 bg-white cardShadow" id="s">
                    <div class="row align-items-center purchaseOrderTabHead" id="s">
                        <div class="col-md-6 d-flex align-items-center" id="s">
                            <div>
                                <div class=" d-lg-flex align-items-center">Auto Export Emails
                                    <div class="switcher ml-lg-2 d-block d-lg-inlline-block mt-2 mt-md-0">
                                        <input type="checkbox" name="switcher_checkbox_2" checked="checked" id="switcher_checkbox_2" value="2"/>
                                        <label for="switcher_checkbox_2"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex text-nowrap ml-3 mb-0 bdrLeft" id="s">
                                <div class="mr-3 text-center">
                                    <h5 class="mb-0">Next Export Batch Count</h5>
                                    <h3 class="batchCountLbl">7</h3>
                                    <div><a href="" class="f-s-14">View All</a></div>
                                </div>
                                <div class="mr-3 bdrLeft">
                                    <h5>Last Export #</h5>
                                    <label class="text-blue">002961</label>
                                </div>  
                            </div>
                        </div>
                        <div class="col-md-6 d-flex justify-content-md-end  align-items-center">
                            <a href="" class="ml-4"><img src="assets/img/csv-export.svg" alt=""/></a>
                            <a href="" class="ml-2"><img src="assets/img/pdf-export.svg" alt=""/></a>
                        </div>
                    </div>
                </div>
                <div class="row" id="s">
					<div class="col-xl-12 col-md-12" id="s">
						<div class="bg-white p-15" id="s">
                            <div class="form-group row align-items-end q" id="s">
                                <div class="col-md-7 col-lg-7" id="s">
                                    <label>Date Range</label>
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
                                   
                                        <div class="ml-3 ">
                                    
                                    <label className={"imagePropDropDown"} onClick={dateClick}  style={{color:"#333333", textAlign: "start",margin:"0px auto",marginTop:"8px",border:"1px solid lightgray",padding:5,borderRadius:4,width:210}} id="datePickerZone">{filterDate  }</label>
                                    {/* <img name="dropdown"    src={IconAssets["dropDown"]} alt={""} onClick={this.dateClick} id="drop" style = {{float:"right",border:"1px solid lightgray",borderRadius:"10px",marginTop:-43,cursor:"pointer"}}/> */}
                                    <div style={{ position: "absolute", zIndex: "99",top:"80px"}}>
                                     
                                        {showCalendar && <>
                                            <DateRangePicker 
                                            id="DatePickerInside"
                                                months = {2}
                                                outsideClick ={onRangeFocusChange}
                                                ranges={[selectionRange]}
                                                onChange={handleSelect}
                                                showSelectionPreview={true}
                                                moveRangeOnFirstSelection={false}
                                                className={'PreviewArea'}
                                                direction="horizontal"
                                            />
                                            <button className="date" id="date" style={{zIndex: "1000" ,position:"absolute" ,left:"19px",top:"340px",backgroundColor:"white",border:"white",fontSize:"smaller"}} onClick={calendarClick}>Clear</button>
                                        </>}
                                    </div>
                                </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                    <div class="col-md-4 col-lg-4">
                                    <label for="plantSearch">Search Customer</label>
                                    <div className="searchInput" style={{height: "40px",paddingTop:5}}>
                                            <button className="btn btn-search" style={{marginTop:"3.5%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button>
                                    <Autosuggest
                                            suggestions={suggestions}
                                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                                            getSuggestionValue={getSuggestionValue}
                                            renderSuggestion={renderSuggestion}
                                            inputProps={inputProps}
                                            
                                        

                                            />
                                        </div>

                                    </div>
                                    <div class="col-md-4 col-lg-4">
                                    <label for="plantSearch">Search Order</label>
                                    {/* <div className="searchInput" > */}
                                    <div className="searchInput" style={{height: "40px",paddingTop:5}}>
                                            <button  className="btn btn-search" style={{marginTop:"3.5%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button>
                                    <Autosuggest
                                            suggestions={suggestions}
                                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                                            getSuggestionValue={getSuggestionValue}
                                            renderSuggestion={renderSuggestion}
                                            inputProps={inputProps1}
                                            

                                            />
                                        </div>

                                    {/* </div> */}
                                    </div>
                                    <div class="col-md-4 col-lg-4">
                                    <label for="plantSearch">Search Invoice</label>
                                    {/* <div className="searchInput" > */}
                                    <div className="searchInput" style={{height: "40px",paddingTop:5}}>
                                            <button  className="btn btn-search" style={{marginTop:"3.5%",marginLeft:"2%"}}>
                                                    <img src="assets/img/search.svg" alt=""/>
                                                </button>
                                    <Autosuggest
                                            suggestions={suggestions}
                                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                                            getSuggestionValue={getSuggestionValue}
                                            renderSuggestion={renderSuggestion}
                                            inputProps={inputProps2}
                                            

                                            />
                                        </div>

                                    {/* </div> */}
                            </div>
                            </div>
                            <div style={{clear: 'both'}}></div>
                            {/* <div class="form-group row align-items-end q">
                                <div class="col-md-4 col-lg-4" style={{display:"inline-block"}}>
                                    <label for="plantSearch">Search Customer</label>
                                    <div className="searchInput" >
                                           
                                       
                                               {/* <img src="assets/img/search.svg" alt="" style={{position:"absolute", left:"14px",top:"12px"}}/> */}
                                               {/* </div> */}
                                {/* </div>
                                <div class="col-md-4 col-lg-4" style={{display:"inline-block"}}>
                                    <label for="plantSearch">Search Order</label>
                                    <div class="searchInput">
                                        <button type="submit" class="btn btn-search">
                                            <img src="assets/img/search.svg" alt=""/>
                                        </button>
                                        <input type="text" class="form-control" placeholder="Search Order"/>
                                    </div>
                                </div>
                                <div class="col-md-4 col-lg-4" style={{display:"inline-block"}}>
                                    <label for="plantSearch">Search Invoice</label>
                                    <div class="searchInput">
                                        <button type="submit" class="btn btn-search">
                                            <img src="assets/img/search.svg" alt=""/>
                                        </button>
                                        <input type="text" class="form-control" placeholder="Search Invoice Number"/>
                                    </div>
                                </div>
                            </div> */} 
                            <div class="form-group row align-items-end">
                                <div class="col-md-12 text-right" style={{marginTop:10}}>
                                    <a onClick={resetFiledsData}  style={{cursor:"pointer",color:"#5287F5"}}>Reset</a>
                                </div>
                            </div>
                            <div className="row_1 mt-4">
                                        <div style={{float:"left",marginBottom:15}}>
                                            {/* <div> */}
                                            <label className="greenText">{"Showing " + (pageNumber>0 ? (pageSize*((pageNumber)))+1 : ((pageNumber)+1))+  "  to  " +  (pageNumber>0 ? (((pageSize*((pageNumber)))+pageSize)>totalLength ? totalLength : ((pageSize*((pageNumber)))+pageSize)) : ((((pageNumber)+1)*pageSize)>totalLength?totalLength:(((pageNumber)+1)*pageSize)))   + "  of   "  +   totalLength  }</label>
                                            {/* </div> */}
                                        </div>
                                        <div style={{float:"left",marginBottom:"-15px",marginLeft:30}}>
                                <label className="greenText" style={{color:"black",fontWeight:"normal",paddingTop:"-10px"}}>Rows per page</label>
                                <div className="select_box" style={{display:"inline"}}>
                                <select 
                                        value={pageSize}
                                        onChange={e => {
                                            setPageSize(e.target.value)
                                            {/* this.setState({pageSize:}) */}
                                        }}
                                        >
                                        {[15, 25, 50, 100, 250,500].map(pageSize => (
                                            (<option key={pageSize} value={pageSize}>
                                            {pageSize} 
                                            </option>)
                                        ))}
                                    </select>

                                </div>
                           
                                </div>
                                        <div style={{float:"right",marginBottom:15}}>
                                        <TablePagination pageChange={paginationChange} pageCount={pageCount} pageNumber={pageNumber+1}/>
                                        </div>
                               
                            </div>
                            <div class="form-group row mt-4">
                                <div class="col-md-12 col-lg-12"  style={{marginTop:"-2%",marginBottom:"-23px"}}>
                                    <ul class="list-unstyled searchAlpha d-flex flex-wrap">
                                        <li><a style={{cursor:"pointer"}}  class={selectedAlpha =="All"?"active":""} onClick={handleAlphabetFilter} id="All">All</a></li>
                                        {
                                            alphabets.map(alphabet=>{
                                                return(<li><a  style={{cursor:"pointer"}} class={selectedAlpha ==alphabet?"active":""} onClick={handleAlphabetFilter} id={alphabet} >{alphabet}</a></li>)

                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-12 table-responsive">
                                    <table id="plantDetails" class="table table-striped w-100">
                                        <thead>
                                            <tr>
                                                <th class="text-nowrap">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="selectAll" />
                                                        <label class="custom-control-label" for="selectAll"></label>
                                                    </div>
                                                </th>
                                                <th class="text-nowrap">Invoice #</th>
                                                <th class="text-nowrap">Adjusted #</th>
                                                <th class="text-nowrap">Order #</th>
                                                <th class="text-nowrap">Customer Name</th>
                                                <th class="text-nowrap">Invoice Date</th>
                                                <th class="text-nowrap">Dispatch</th>
                                                <th class="text-nowrap text-right">Amount</th>
                                                <th class="text-nowrap text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                              
                                            
                                            {displayCustomerList.map(customerData=>{
                                            return <tr>
                                            <td>
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" id="chk1" />
                                                        <label class="custom-control-label" for="chk1"></label>
                                                    </div>
                                                </td>
                                                <td><a href="#">0023555</a></td>
                                                <td>-</td>
                                                <td>00234-2000485</td>
                                                <td>{customerData.name}</td>
                                                <td>20/08/2020</td>
                                                <td>Delivery</td>
                                                <td class="text-right">85.00</td>
                                                <td class="text-center">
                                                    <span class="mx-1">
                                                        <Link to="/OrderAdjusted">
                                                            <a href="javascript:;">
                                                                <img src="assets/img/setting-ic-sm-green.svg" alt=""/>
                                                            </a>
                                                        </Link>
                                                    </span>
                                                    <span class="mx-1">
                                                        <a href="javascript:;">
                                                            <img src="assets/img/csv-ic-sm-blue.svg" alt=""/>
                                                        </a>
                                                    </span>
                                                    <span class="mx-1">
                                                        <a href="javascript:;">
                                                            <img src="assets/img/copy-ic-sm-blue.svg" alt=""/>
                                                        </a>
                                                    </span>
                                                    <span class="mx-1">
                                                        <a href="javascript:;">
                                                            <img src="assets/img/search-ic-sm-blue.svg" alt=""/>
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
				</div>
            </div>
        </div>
        </div>
    )
}
const mapStateToProps = (state)=>(
    {
        invoiceData:state.invoiceData
    }
)

export default connect(mapStateToProps,{resetFileds,  //plant actions
    filterInvoiceManagerData,deleteCustomer,getAllInvoice,handleExchangeData,getCustomerById,setPageNumber,handleSearchFilter,handleAplhabetFilter,typeOfActionShow
    })(InvoiceList)