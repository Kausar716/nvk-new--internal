import React,  { useState , useEffect} from 'react' ;
//import {Button,Badge,Form,Input,FormGroup,CustomInput,Label,Pagination,PaginationItem,PaginationLink,Table} from 'reactstrap'
import {connect} from "react-redux";
// import ReactPaginate from 'react-paginate'
import ActionModal from '../Modal/ActionModal'
import TablePagination from '../Pagination/index';
import initialDetailsQL from './initialDetailsQL';
import {setPageNumberQo,handleSearchFilterByAlpha,getQuoteOrderList, 
    handleAplhabetFilterBySN} from "../../actions/quoteOrderManagementAction";
//import {getPurchaseOrderList,poSetPageNumber,setAlphabetSelected} from '../../actions/purchaseOrderManagementAction'

// const PurchaseOrderTable=(props)=> {
    export class QuoteListTable extends React.Component {

        constructor(props){
            super(props)
            this.state={  

     addCustomerToggle:false,
    customerListStatus:"active",
    editCustmerToggle:false,
    customerObject:{},
    pageSize:15,
    alphabets:["A", "B", "C", "D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    selectedAlpha:"All",
    searchValue:"",
    radioFilter:"active",
    searchInput: '', 
    checkedData:[],
    alphabet: '',
    button: true,
   
    alphabetSelect:'',
    TotalPurchaseOder:39,
            }
        }

    componentDidMount(){
        this.props.getPurchaseOrderList()
    }
    onSearchInputChange2 = (e) => {
        this.setState({searchInput: e.target.value})
      }
      
      onSearchInputChange3 = (e) => {
        this.setState({searchInput: e.target.value})
      }


    onSearchInputChange = (e) => {
        this.setState({alphabet: e.target.value,alphabetSelect:''})
        this.setState({
          button:!this.state.button
        })
      }
      onAlphabetClick = (e) => {
       // this.setState({alphabet: e.target.value})
       this.setState({alphabet: e.target.value,alphabetSelect:e.target.value,button:false})
       this.props.setAlphabetSelected(e.target.value)
     }
     prepareAlphabets = () => {
       let result = [];
       let selectedAlphabet= this.props.purchaseOrderListData.selectedAlphabet
      
       for(let i=65; i<91; i++) {
         result.push(

           // <button type="button" key={i} onClick={this.onAlphabetClick} value={String.fromCharCode(i)} >{String.fromCharCode(i)}</button>
           <button type="button" className={ selectedAlphabet===String.fromCharCode(i)?" buttonStyles selected_alphabet":"unselected_aplphabet buttonStyles"}  key={i} onClick={this.onAlphabetClick} value={String.fromCharCode(i)}>{String.fromCharCode(i)}</button>
          
         )
       }
       return result;
    
     }

      handleClickCheckBox = (e)=>{

        // let newCheckedData = initialDetails.filter(newCheck => newCheck.status===e.target.name)
        // //this.setState({alphabet: newCheckedData})
        // this.setState({checkedData: newCheckedData})
        // console.log("e1",checkedData);
      }
       handleShowPage = (e)=>{
           let {pageNumber} =this.props.purchaseOrderListData
        if(pageNumber*Number(e.target.value)>pageNumber){
            this.props.poSetPageNumber(0)
        }   
            // setPageSize(Number(e.target.value))
            this.setState({
                pageSize:  Number(e.target.value)
            })
    }



      paginationChange =(event, page)=>{
        this.props.poSetPageNumber(page-1)
    }
    render(){
    let {purchaseOrderList,pageNumber}= this.props.purchaseOrderListData
    console.log(this.props.purchaseOrderListData.selectedAlphabet)
    let pageSize = this.state.pageSize
    // this.props.purchaseOrderList
    console.log(purchaseOrderList)
    let totalLength = purchaseOrderList.length
    
    const productPerPage = pageSize;
    const pagesVisited = pageNumber*pageSize;
    let pageCount = Math.ceil(totalLength/productPerPage)
    console.log(pageCount)
    console.log(pageSize)
    console.log(totalLength.length)
    console.log(pagesVisited,pagesVisited+productPerPage)
    const displayProductList = purchaseOrderList.slice(pagesVisited,pagesVisited+productPerPage)
    console.log(displayProductList)
    console.log(displayProductList.length)
    
    return (
        <>
         <div className="row_1">
                                <div style={{float:"left",marginBottom:15}}>
                                {/* <div> */}
                                    <label className="greenText">{"Showing " + (pageNumber>0 ? (this.state.pageSize*((pageNumber)))+1 : ((pageNumber)+1))+  "  to  " +  (pageNumber>0 ? (((this.state.pageSize*((pageNumber)))+this.state.pageSize)>totalLength ? totalLength : ((this.state.pageSize*((pageNumber)))+this.state.pageSize)) : ((((pageNumber)+1)*this.state.pageSize)>totalLength?totalLength:(((pageNumber)+1)*this.state.pageSize)))   + "  of   "  +   totalLength }</label>
                                {/* </div> */}
                                </div>


                                    <div >
                                    <label className="greenText">Purchase Orders&nbsp;</label>
                                    <label className="greenText"> Show</label>
                                                <select 
                                                    value={this.state.pageSize}
                                                    onChange={this.handleShowPage}
                                                    >
                                                    {[15, 25, 50, 100, 500].map(pageSize => (
                                                        <option key={pageSize} value={pageSize}>
                                                        {pageSize}
                                                        </option>
                                                    ))}
                                                </select>
                                        </div>

                



                                <div style={{float:"right",marginBottom:15}}>
                                    <TablePagination pageChange={this.paginationChange} pageCount={pageCount} pageNumber={pageNumber+1}/>
                                </div>
                               
                            </div>
                            <div class="form-group row mt-0">
                                <div class="col-md-12 col-lg-12">
                                    <ul class="list-unstyled searchAlpha d-flex flex-wrap">
                                        {/* <li><a  class={this.state.selectedAlpha =="All"?"active":""} onClick={this.handleAlphabetFilter} id="All" style={{cursor:"pointer"}}>All</a></li> */}

                                        <button type="button"  className={this.props.purchaseOrderListData.selectedAlphabet === "All"?"selected_alphabet buttonStyles": "unselected_aplphabet buttonStyles"} value="All"  onClick={this.onAlphabetClick}>All</button>
                                            {this.prepareAlphabets()}
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group row">
        <div class="col-md-12 table-responsive">
            <table id="plantDetails" class="table table-striped w-100">
                        <thead>
                            <tr>
                                <th class="text-nowrap">Status</th>
                                <th class="text-nowrap">PO#</th>
                                <th class="text-nowrap">Supplier Name</th>
                                <th class="text-nowrap">Supplier Order</th>
                                <th class="text-nowrap">Created By</th>
                                <th class="text-nowrap">Order Date</th>
                                <th class="text-nowrap">Expected Date</th>
                                <th class="text-nowrap">Dispatch</th>
                                <th class="text-nowrap text-right">Amount</th>
                                <th class="text-nowrap text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayProductList.map(purchaseOrder=>{
                                return <tr >
                                <td><span  class={purchaseOrder.p_o_status==='closed'?'stsBadge stsClosed':purchaseOrder.p_o_status==='draft'?'stsBadge stsDraft':purchaseOrder.p_o_status==='open'?'stsBadge stsOpen':""}>{purchaseOrder.p_o_status}</span></td>
                                <td><a href="">{purchaseOrder.PO}</a></td>
                                <td><a href="">{purchaseOrder.supplier_name}</a></td>
                                <td>{purchaseOrder.supplier_order}</td>
                                <td>{purchaseOrder.created_by}</td>
                                <td>{purchaseOrder.order_date}</td>
                                <td>{purchaseOrder.expected_date}</td>
                                <td>{purchaseOrder.dispatch_type}</td>
                                <td className="text-right">{purchaseOrder.amount}</td>
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
                {/* <div className="centerItem">
                <p >{plantData.length===0?props.loaderMessage:""}
                {(plantData.length===0 && props.loaderMessage === "Loading Data...")?<Loader />:""}
                {(plantData.length===0 && props.loaderMessage === "No Records Found.")?<Loader />:""}</p>
                </div> */}
                
                
            </div>
            </div>
            </>
                           
    )
            }
            }


const mapStateToProps = (state)=> ({
   // purchaseOrderListData:state.purchaseOrderManagementData,
    // categoryData: state.categoryData
    quoteOrderData:state.quoteOrderReducer

})
export default connect(mapStateToProps,{  

    handleSearchFilterByAlpha, getQuoteOrderList,setPageNumberQo,handleAplhabetFilterBySN,
    // getPurchaseOrderList,
    // poSetPageNumber,
    // setAlphabetSelected
    })(QuoteListTable)
