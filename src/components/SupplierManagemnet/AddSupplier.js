import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {UpdateAddressData,updateSupplierContactData,UpdateAddress,getAllSuppliersContact,updateSupplierContact,getAllSupplierReasonMethods,getAllSupplierCategoryMethods,deleteSupplier,deleteSupplierAddress,deleteContact,getAddressById,resetSupplierFilds,getAllAddress,getSupplierContact,resetSupplierContact,updateSupplierData,handleSupplierExchnageData,addSupplierDetails,getAllSuppliers,setPageNumber,handleRadioFilter,handleSearchFilter,handleAplhabetFilter,typeOfsupplierActionShow} from "../../actions/supplierManagementAction";
import {getAllCategoriesAction} from "../../actions/categoryAction";

import SupplierAddressNotes from "../../components/Modal/SupplierAddressNotes"
// import {getAllSupplierCategoryMethods}
import { confirmAlert } from 'react-confirm-alert'; 

import {getAllTermsMethods} from "../../actions/customerSettingAction";
import {connect} from "react-redux";
import 'react-tabs/style/react-tabs.css';
import InfoModal from "../../components/Modal/InfoModal"
import SuccessModal from "../../components/Modal/SuccessModal"
import SupplierNotes from "../../components/Modal/SupplierNotes"
import ContactsModal from "../../components/Modal/ContactsModal"
import AddressModal from "../../components/Modal/AddressModal"
import SupplierAddressModal from "../../components/Modal/SupplierAddressModal"
import SupplierContactModal from "../../components/Modal/SupplierContactModal"
import DatePicker from 'react-date-picker';
import InputMask from 'react-input-mask';

function AddSupplier(props) {
    const [value, onChange] = useState(new Date());
    const [addCustomertoggle,setAddCustomertoggle] = useState(false)
    const [customerObject,setCustomerObject] = useState({})
    const [customer_name,setCustomer_name] = useState("")
    const [type,setType] = useState([])
    const [primaryContact,setPrimaryContact] = useState("")
    const [fax,setFax] = useState("")
    const [website_url,setWebsiteUrl] = useState("")
    const [notes,setNotes] = useState("")
    const [ alternativeId,setAlternativeId] =  useState("")
    const [checkedData,setCheckedData] = useState(false)
    const [customer_id,setCustomer_id] = useState("")
    const [errorObj,setErrorObject] = useState({customer_name:0,fax:0,taxExemptNumber:0})
    const [errorCount, setErrorCount] = useState(0)
    const [taxExemptNumber,setTaxExemptNumber] = useState("")
    const [taxExemp,setTaxExemp] = useState(false)
    const [dispatchType,setDispatchType] = useState(false)
    const [poRequired,setPoRequired] = useState(false)
    const [reStock,setReStock] = useState(false)
    const [isOpen1, setIsOpen1] = useState(false);
	const [message2,setMessage2] = useState([]);
    const [message,setMessage] = useState([]);
	const toggle2 = () => setIsOpen2(!isOpen2);
    const [enableUrl,setEnableUrl] = useState(false)
    const {supplierDataById,supplierContactList,supplierAddressList} = props.supplierData
    const {categoryData} = props.categoryData
    const [isOpen2, setIsOpen2] = useState(false);
    console.log(props.customerData)
    const toggle1 = () => setIsOpen1(!isOpen1);
    useEffect (()=>{
        // if(props.selectedId !=0)
        // alert(props.selectedId)
        props.getAllCategoriesAction()
        // alert(supplierDataById.id)
        // if(supplierDataById.id!==""){
            // alert("ds")
            if(props.selectedId !=0){
                props.getAllSuppliersContact(props.selectedId)
                props.getAllAddress(props.selectedId)

            }
          
        // }
     
        // props.getAllSupplierCategoryMethods()
        // props.getAllSupplierReasonMethods()
        // props.getAllTermsMethods()
 

    },[website_url])
    const[actionType,setactionType] = useState("add")
    const[actionTypeAddress,setactionTypeAddress] = useState("add")
	// const toggle1 = () => setIsOpen1(!isOpen1);

    // const [isOpen2, setIsOpen2] = useState(false);
	// const [message2,setMessage2] = useState([]);
	// const toggle2 = () => setIsOpen2(!isOpen2);

    const [isOpenContacs, setisOpenContacs] = useState(false);
    const [isOpenContacsNotes, setisOpenContacsNotes] = useState(false);
    const [isOpenAddressNotes, setisOpenAddressNotes] = useState(false);
	// const [message2,setMessage2] = useState([]);
	const toggleForContact = () => {
        setactionType("add")
        props.resetSupplierContact()
        setisOpenContacs(!isOpenContacs)
    }
    const toggleForContactNotes = () => {
        // setactionType("add")
        props.resetSupplierContact()
        setisOpenContacsNotes(!isOpenContacsNotes)
    }
    const toggleForAddressNotes  = ()=>{
        props.resetSupplierContact()
        setisOpenAddressNotes(!isOpenAddressNotes)

    }

    const [isOpenAddress, setisOpenAddress] = useState(false);
	// const [message2,setMessage2] = useState([]);
	const toggleForAddress = () => {
        setactionTypeAddress("add")
        props.resetSupplierContact()
        setisOpenAddress(!isOpenAddress)
        // ////alert("hi")
    }

    const validate = () =>{
        let errorObjforValidation=errorObj
        let errorCountForValidation = 0
        let phoneReg=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let nameReg = /^[a-zA-Z]+$/
    
        let message = []
        // let phoneReg = new RegExp('^[0-9]+$');
        let emailReg =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    
        if(supplierDataById.supplier_name.trim().length === 0){
          
           errorCountForValidation++
           message.push("Add Supplier Name")
        }
        if(supplierDataById.status==0 && (supplierDataById.reason ===null || supplierDataById.reason ==="")){
            errorCountForValidation++
            message.push("Add Reason")
        }
        // if(taxExemptNumber.length===0 && taxExemp){
        //     errorObj.taxExemptNumber=1
        //     errorCountForValidation++
        // }
      
        // if(supplierDataById.fax.trim().length == 0){
          
        //     // errorObjforValidation.fax=1
        //     errorCountForValidation++
        //     message.push("Add Supplier Fax Number")
        // }
        // if(supplierDataById.alternative_id.trim().length ==0){
        //     message.push("Add Supplier Alternative Id")
        //     errorCountForValidation++

        // }
        // var res = supplierDataById.website.match( /^(http[s]?:\/\/){0,1}(w{3,3}\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/);
        // if(res == null)
        //    {
        //     message.push("Add Valid url and should contain https")
        //     errorCountForValidation++
               
        //    }
        // if(supplierDataById.alternative_id
        var patt = new RegExp(/^(https?|ftp):\/\/(\S+(:\S*)?@)?(([1-9]|[1-9]\d|1\d\d|2[0-1]\d|22[0-3])(\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){2}(\.([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-4]))|(([a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(\.([a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(\.([a-z\u00a1-\uffff]{2,})))(:\d{2,5})?(\/[^\s]*)?$/);
        var res = patt.test(supplierDataById.website);
        // console.log(res)
        if(res === false){
            message.push("Website formate sould be https://www.example.com formate")
            errorCountForValidation++
        
        }
        setMessage(message)
        // setErrorCount(errorCountForValidation)
        // setErrorObject(errorObjforValidation)
        return errorCountForValidation
    }

    const handleInput= (e)=>{
        // var charCode = (e.which) ? e.which : e.keyCode
        // if (charCode > 31 && (charCode != 46 &&(charCode < 48 || charCode > 57))){
        //     alert("yoo")
        // }
        // //alert("hi")
        //alert(e.target.id+"   "+e.target.value)
        setCheckedData(true)
        
        // ////alert(e.target.id)
        // let errorCountForValidation = errorCount
        // console.log(e.target.name,e.target.value)
        let indexValue = null
        if(e.target.id =="delivery")  props.handleSupplierExchnageData(e.target.value,"dispatch_type","supplierDataById")
        else if(e.target.id =="pickup")props.handleSupplierExchnageData(e.target.value,"dispatch_type","supplierDataById")
        else if(e.target.id =="both")props.handleSupplierExchnageData(e.target.value,"dispatch_type","supplierDataById")
        else if(e.target.value=="product"){
            // //alert("gg")
            let product_categories = supplierDataById.product_categories
            console.log(product_categories)
            product_categories.map((value,index)=>{
                if(value === e.target.id) indexValue = index
            })
            // //alert(indexValue)
            if(indexValue !== null) product_categories.splice(indexValue,1)
            else product_categories.push(e.target.id)
            console.log(product_categories)
            props.handleSupplierExchnageData(product_categories,"product_categories","supplierDataById")
            
        } 
        else if(e.target.id ==="status"){
            let prospect = parseInt(supplierDataById.status)==1?0:1
            props.handleSupplierExchnageData(prospect,e.target.id,"supplierDataById")
        }else if(e.target.id ==="website"){
            let validate = e.target.value
            let val = e.target.value.includes("https://") ||e.target.value.trim()==""?e.target.value:"https://"+e.target.value
            var patt = new RegExp(/^(https?|ftp):\/\/(\S+(:\S*)?@)?(([1-9]|[1-9]\d|1\d\d|2[0-1]\d|22[0-3])(\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){2}(\.([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-4]))|(([a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(\.([a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(\.([a-z\u00a1-\uffff]{2,})))(:\d{2,5})?(\/[^\s]*)?$/);
            var res = patt.test(val);
            // console.log(res)
            if(res === false){
                setEnableUrl(false)
                props.handleSupplierExchnageData(val,e.target.id,"supplierDataById")

            }else{
                setEnableUrl(true)
                props.handleSupplierExchnageData(val,e.target.id,"supplierDataById")
            }

        }
        else props.handleSupplierExchnageData(e.target.value,e.target.id,"supplierDataById")
        // if(e.target.name === "customer_name"){
        //     setCustomer_name(e.target.value)
        //     if(errorObj.customer_name>0){
        //         errorObj.customer_name=0
        //         errorCountForValidation--
        //     }       
        // }
        // if(e.target.name === "type"){
        //     setType(e.target.value)
        // }
        // if(e.target.name === "primaryContact"){
        //     setPrimaryContact(e.target.value)
        // }
        // if(e.target.name === "fax"){
           
        //     setFax(e.target.value)
        //     if(errorObj.fax>0){
        //         errorObj.fax=0
        //         errorCountForValidation--
        //     }       
        // }
        // if(e.target.name === "dispatchTypeDelivery" || e.target.name === "dispatchTypePickup"  ){
        //     setDispatchType(!dispatchType)
        // }
        // if(e.target.name === "poRequiredNo" || e.target.name === "poRequiredYes"){
        //     setPoRequired(!poRequired)
        // }
        // if(e.target.name === "restockNo" || e.target.name === "restockYes"){
        //     setPoRequired(!reStock)
        // }
        // if(e.target.name === "taxExemptNumber"){
        //     setTaxExemptNumber(e.target.value)
        //     if(errorObj.taxExemptNumber>0){
        //         errorObj.taxExemptNumber=0
        //         errorCountForValidation--
        //     }  
        // }
        // if(e.target.name === "website_url"){
        //     setWebsiteUrl(e.target.value)
        // }
        // if(e.target.name === "notes"){
        //     setNotes(e.target.value)
        // }
        // if(e.target.name === "alternativeId"){
        //     setAlternativeId(e.target.value)
        // }
        // setErrorCount(errorCountForValidation)
        // setErrorObject(errorObj)
    }
    const handleSubmit=()=>{
        let count= validate()
        console.log(count)
         if(count === 0){
         }
    }
    const handleTabClick=()=>{
        // ////alert("in")
    }
    const closeAddSupplier = ()=>{
        props.resetSupplierFilds()
        props.getAllSuppliers()
        // props.typeOfActionShow("")
        props.typeOfsupplierActionShow("")
    }
    const saveCustomerData1 = (type)=>{
        // e.preventDefault()
        let errorCount = validate()
        if(errorCount>0){
            setIsOpen1(true)
            // setMessage(errorCount)
            return

        }
        // if(errorCount.length>0){
        //     setIsOpen1(true)
        //     setMessage(errorCount)
        //     return


        // }
        // ////alert("ds")
        setCheckedData(false)
        // ////alert(supplierDataById.id)
        // // delete customerDataById.id
        // // ////alert("hello")
        console.log(supplierDataById)
        if(supplierDataById.id== undefined){
            props.addSupplierDetails(supplierDataById).then(data=>{
           
          
                if(type =="done"){
                    props.resetSupplierFilds()
                   
                    setMessage2(["Supplier Saved successfully"])
                    setIsOpen2(true)
                    // props.resetCustomerFilds()
                    props.getAllSuppliers().then(data=>{
                        
    
    
                        setTimeout(
                            function() {
                                props.typeOfsupplierActionShow("")
                            }
                            .bind(this),
                            1000
                        );
    
                    })
                   
                    // props.typeOfActionShow("")
                    // setTimeout(cancelData()(), 100000);
                    
    
                }else{
                    setIsOpen2(true)
                    setMessage2(["Supplier Saved successfully"])
                    props.getAllSuppliers()
                    // props.resetCustomerFilds()
                    // props.typeOfActionShow("")
    
                }
              
    
                // else 
    
    
            })

        }else{
            props.updateSupplierData(supplierDataById).then(data=>{
               
           
          
                if(type =="done"){
                    // alert(type+"DSA")
                    // 
                   
                    setMessage2(["Supplier Data Updated Successfully"])
                    setIsOpen2(true)
                    // props.resetSupplierFilds()
                    
                    props.getAllSuppliers().then(data=>{
                        
                        
                        
    
    
                        setTimeout(
                            function() {
                                props.typeOfsupplierActionShow("")
                                props.resetSupplierFilds()
                            }
                            .bind(this),
                            1000
                        );
    
                    })
                   
                    // props.typeOfActionShow("")
                    // setTimeout(cancelData()(), 100000);
                    
    
                }else{
                    setIsOpen2(true)
                    setMessage2(["Supplier Data Updated Successfully"])
                    props.getAllSuppliers()
                    // props.resetCustomerFilds()
                    // props.typeOfActionShow("")
    
                }
              
    
                // else 
    
    
            })
            
        }
   
    }
    const editContact=(id)=>{
        setisOpenContacs(true)
        props.getSupplierContact(id)
        setactionType("edit")
    }
    const editContactNotes=(id)=>{
        setisOpenContacsNotes(true)
        props.getSupplierContact(id)
        setactionType("edit")
    }
    const editAddress =(id)=>{
        setisOpenAddress(true)
        props.getAddressById(id)
        setactionTypeAddress("edit")
    }
    const deleteAddress =(id)=>{
        // setisOpenAddress(true)
        // props.deleteSupplierAddress(id)
        confirmAlert({
            title: 'Delete Supplier Address',
            message: 'Are you sure want to delete the Supplier Address?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {props.deleteSupplierAddress(id)}
              },
              {
                label: 'No'
              }
            ]
          });
        // setactionTypeAddress("edit")
    }
    const addAdrress=()=>{
        // props.resetAddressFileds()
        setisOpenAddress(true)

    }
    const deleteContactData =(id)=>{
      

        confirmAlert({
            title: 'Delete Supplier Contact',
            message: 'Are you sure want to delete the Supplier Contact?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {props.deleteContact(id)}
              },
              {
                label: 'No'
              }
            ]
          });
    }
    // const getSupplierAddressById = (id)=>{
        const deleteCustomerData =(id)=>{
            // alert(id)
           props.deleteSupplier(id).then(data=>{
            props.typeOfsupplierActionShow("")
            props.getAllSuppliers()
           })
    
        }
    // }
console.log("categoryData", categoryData)
const {action } = props.supplierData
// const {supplierData} = this.props
const dataTochange =(e)=>{
    setCheckedData(true)
    // let intValue = e.target.value
    if(e.target.value!==""){
      if(Number.isInteger(parseFloat(e.target.value))) {
        let intValue = e.target.value*1.0
        // alert(e.target.value)
        // props.handleExchangeData(val,e.target.id,"customerDataById")
    //   props.handleExchangeData(intValue.toFixed(2),e.target.id,"supplierDataById")
      props.handleSupplierExchnageData(intValue.toFixed(2),e.target.id,"supplierDataById")
      }
    
      else{
        // alert()
        let splitValue = e.target.value.split(".")
       if(splitValue[1].length<3){
        let intValue = e.target.value*1.0
        props.handleSupplierExchnageData(intValue.toFixed(2),e.target.id,"supplierDataById")
       }else{
        props.handleSupplierExchnageData(e.target.value,e.target.id,"supplierDataById")

       }

       
      }
    }
      return
    }
    const changeCheckBox =(e)=>{
        // let value = e.target.id.split("^")
        // let data =supplierContactList.active.filter(data=>data.id == value[1])
        
        // // console.log( data[type])
        // data[0][value[0]] =  data[0][value[0]]==0?1:0
        // console.log( data[0][value[0]])
        // props.updateSupplierContact(data[0]).then(data=>{
        //     props.getAllSuppliersContact(supplierDataById.id)
        //     console.log(supplierDataById)
        // })

        let contacts  = supplierDataById.contacts
        let value = e.target.id.split("^")
        // alert(value[1])
        let primaryData = supplierDataById.contacts
        if(supplierDataById.contacts.length>1 && value[0]== "primary_contact"){
            primaryData = supplierDataById.contacts.map((data,i)=>{
                if(parseInt(data[value[0]]) ==1 && i !==value[1]){
                    data[value[0]] = 0
                    return data
                }else{
                    return data
                }
            })
        }
     
        // alert(index)
        // console.log(customerContactList,index)
        // let data  = customerContactList.active[index]
        let data = primaryData[value[1]]
        // alert(JSON.stringify(data))
        
        // console.log( data[type])
        data[value[0]] =  parseInt(data[value[0]])==0?1:0
        // alert( data[value[0]])
        primaryData[value[1]] = data
        // alert(JSON.stringify(primaryData))
        // console.log(primaryData)
        props.updateSupplierContactData(primaryData)

        // }
        // console.log( data[type])

        // console.log(supplierContactList,index)
        // let data  = supplierContactList.active[index]
        // console.log( data[type])
        // data[type] =  data[type]==0?1:0
        // // console.log( data[type])
        // props.updateSupplierContact(data).then(data=>{
        //     props.getAllSuppliersContact(supplierDataById.id)
        // //     console.log(supplierContactList)
        // })


        // props.updateSupplierContact(supplierContact).then(data=>{
        //     props.modalAction()
        //     console.log(supplierDataById)
        //     props.getAllSuppliersContact(supplierDataById.id)

    }
    const changeCheckBoxAddress =(e)=>{
        // let value = e.target.id.split("^")
        // let data =supplierAddressList.active.filter(data=>data.id == value[1])
        
        // // console.log( data[type])
        // data[0][value[0]] =  data[0][value[0]]==0?1:0
        // console.log( data[0][value[0]])
        // props.UpdateAddress(data[0]).then(data=>{
        //     props.getAllAddress(supplierDataById.id)
        //     console.log(supplierDataById)
        // })
        let addresses  = supplierDataById.addresses
        let value = e.target.id.split("^")
        // alert(value[1])
        let primaryData = supplierDataById.addresses
        if(supplierDataById.addresses.length>1){
            primaryData = supplierDataById.addresses.map((data,i)=>{
                if(parseInt(data[value[0]]) ==1 && i !==value[1]){
                    data[value[0]] = 0
                    return data
                }else{
                    return data
                }
            })
        }
     
        // alert(index)
        // console.log(customerContactList,index)
        // let data  = customerContactList.active[index]
        let data = primaryData[value[1]]
        // alert(JSON.stringify(data))
        
        // console.log( data[type])
        data[value[0]] =  parseInt(data[value[0]])==0?1:0
        // alert( data[value[0]])
        primaryData[value[1]] = data
        // alert(JSON.stringify(primaryData))
        // console.log(primaryData)
        props.UpdateAddressData(primaryData)









        

    }
    const editAddressNotes=(id)=>{
       
        // alert("Gg")
        setisOpenAddressNotes(true)
        props.getAddressById(id)
        // setisOpenAddress(true)
        // props.getAddressById(id)
        // setactionTypeAddress("edit")
        // setisOpenAddress(true)
        // props.getAllAddress(supplierDataById.id)
        // setactionTypeAddress("edit")
        // setactionType("edit")
    }
    const addPrimaryContact  = ()=>{
        setactionType("add")
        props.resetContact()
        setisOpenContacs(!isOpenContacs)
    }
    const editPrimaryContact  = ()=>{
        setactionType("add")
        props.resetContact()
        setisOpenContacs(!isOpenContacs)
        // alert(JSON.stringify(customerDataById.contacts[0]))
        // props.editDataToContact(supplierDataById.contacts[0])
  
    }
console.log(props.supplierData.supplierCategoryList)
console.log(props.supplierData.supplierReasonList)
    return (
        <div>
             	<InfoModal status={isOpen1} message={message} modalAction={toggle1}/>
                <SuccessModal status={isOpen2} message={message2} modalAction={toggle2}/>
                <SupplierContactModal status={isOpenContacs}  modalAction={toggleForContact} type={actionType}/>
                <SupplierNotes status={isOpenContacsNotes}  modalAction={toggleForContactNotes} type={"edit"}/>
                <SupplierAddressNotes  status={isOpenAddressNotes}  modalAction={toggleForAddressNotes} type={"edit"}/>
                <SupplierAddressModal status={isOpenAddress} modalAction={toggleForAddress} type={actionTypeAddress}/>
                {/* <ContactsModal status={isOpenContacs}  modalAction={toggleForContact} type={actionType}/>
                <AddressModal status={isOpenAddress} modalAction={toggleForAddress} type={actionTypeAddress}/> */}
            <div class="contentHeader bg-white d-md-flex justify-content-between align-items-center">
            <h1 class="page-header mb-0"><img src="assets/img/Supplier Management-big-green.svg" class="mr-2"/>{action=="add"?"Add Supplier":"Edit Supplier"}  <span>{supplierDataById.id?"#"+supplierDataById.id:""}</span></h1>
				<div class="topbarCtrls mt-3 mt-md-0">
                    <a href="#" class="btn ml-2 mt-3 mt-md-0">
                        <span class="d-flex align-items-center text-left">
                            <img src="assets/img/print-ic-btn.svg" alt=""/>
                            <span class="ml-2"><b>Print</b></span>
                        </span>
                    </a>
				</div>
			</div>
            <div class="px-md-3 mt-3 pb-4">
                <div class="bg-white px-3 py-3 my-3 cardShadow">
                    <div class="row align-items-center">
                     <div class="col-md-12 col-lg-6 d-md-flex justify-content-between editCustSec">
                     {/* <div class="col-md-12 col-lg-6 d-md-flex justify-content-between editCustSec"> */}
                     {addCustomertoggle?"": <div>
                                <label>Complete P.O's</label>
                                <h1>0</h1>
                                <div><a href="">View Archive</a></div>
                            </div>}
                            {addCustomertoggle?"":<div style={{marginLeft:"-10%"}}>
                                <label>Active P.O's</label>
                                <h1>0</h1>
                                <div><a href="">View P.O's</a></div>
                            </div>}
                            {addCustomertoggle?"":<div>
                                {/* <label>Active P.O's</label>
                                <h1>0</h1>
                                <div><a href="">View P.O's</a></div> */}
                            </div>}
                         
                            {addCustomertoggle?"":<div class="lastOdrDate">
                                <label>Last P.O</label>
                                <h4>Not Available</h4>
                            </div>}
                        </div>
                        <div class="col-md-12 col-lg-6 mt-3 mt-lg-0 text-lg-right">
                            <div class="topbarCtrls mt-3 mt-md-0 d-flex flex-wrap justify-content-md-end">
                        
                            {/* {addCustomertoggle?"":  <a href="#" class="btn active">
                                    <span class="d-flex align-items-center text-left">
                                        <img src="assets/img/pdf-ic.svg" alt=""/>
                                        <span class="ml-2"><b>Contact PDF</b></span>
                                    </span>
                                </a>}
                                <a href="#" class="btn ml-2" onClick={()=>checkedData==true?saveCustomerData1("save"):""}>
                                    <span class="d-flex align-items-center text-left">
                                        <img src="assets/img/save-ic.svg" alt=""/>
                                        <span class="ml-2"><b>Save  </b></span>
                                    </span>
                                </a>
                                <a href="#" class="btn ml-2 mt-3 mt-md-0"  onClick={()=>checkedData==true?saveCustomerData1("done"):""}>
                                    <span class="d-flex align-items-center text-left">
                                        <img src="assets/img/saveDone-ic.svg" alt=""/>
                                        <span class="ml-2"><b>Save &amp; Done</b></span>
                                    </span>
                                </a> */}
                                <a  class="btn ml-2">
                                    <span class="d-flex align-items-center text-left">
                                        <img src="assets/img/pdf-ic.svg" alt=""/>
                                        <span class="ml-2"><b>Contact PDF</b></span>
                                    </span>
                                </a>
                                {/* "btn btn-primary btn-lg ml-3":"btn btn-primary btn-lg ml-3" */}
                                {/* <button   onClick={()=>checkedData==true?saveCustomerData1("save"):""}  className={checkedData==true? "btn btn-primary btn-md ml-3":"btn btn-secondary btn-md ml-3"} disabled={checkedData==true?false:true}>
                                    <span class="d-flex align-items-center text-left" onClick={handleSubmit}> */}
                                        {/* <img src="assets/img/save-ic.svg" alt=""/> */}
                                        {/* <i className="fa fa-save" style={{fontSize:"20px"}}></i>
                                        <span class="ml-2"  style={{fontSize:"17px"}}>Save</span>
                                    </span>
                                </button> */}
                                {/* <button   onClick={()=>checkedData==true?saveCustomerData1("done"):""}  className={checkedData==true? "btn btn-primary btn-md ml-3":"btn btn-secondary btn-md ml-3"} disabled={checkedData==true?false:true}>
                                    <span class="d-flex align-items-center text-left"> */}
                                        {/* <img src="assets/img/saveDone-ic.svg" alt="" /> */}
                                        {/* <i className="fa fa-save" style={{fontSize:"20px"}}></i>
                                        <span class="ml-2"  style={{fontSize:"17px"}}>Save &amp; Done</span>
                                    </span>
                                </button> */}
                                <a class="btn ml-2"
                                onClick={()=>checkedData==true?saveCustomerData1("save"):""}
                                            //onClick={this.handleSubmit}
                                        
                                            >
                                                    <span class="d-flex align-items-center text-left">
                                                        <img src="assets/img/save-ic.svg" alt=""/>
                                                        <span class="ml-2"><b>Save  </b></span>
                                                    </span>
                                                </a>
                                {/* <button type="button"   className={"btn  btn-md ml-3"} disabled={checkedData==true?false:true}> */}
                                <a  class="btn ml-2 mt-3 mt-md-0" onClick={()=>checkedData==true?saveCustomerData1("done"):""}>
                                                    <span class="d-flex align-items-center text-left">
                                                        <img src="assets/img/saveDone-ic.svg" alt=""/>
                                                        <span class="ml-2"><b>Save &amp; Done</b></span>
                                                    </span>
                                </a>
                                <a href="#" class=" ml-2 mt-3 mt-md-0">
                                    <img src="assets/img/close-ic.svg" alt="" onClick={closeAddSupplier}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white px-3 py-3 my-3 cardShadow">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h2>Supplier Details</h2>
                            <div class="col-md-8 text-md-left">
                            {/* <div class="d-flex flex-wrap align-items-center justify-content-md-start"> */}
                         
                        
                                {/* <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                   
                                </div> */}
                                {/* <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                    <span class="mr-2 f-s-18"><strong>Level</strong></span>
                                    <select class="form-control" onChange={handleInput} id="level">
                                        <option value={0}>Normal</option>
                                            {customerStatusList.active.map(type=>{
                                                return(<option value={parseInt(type.id)} selected={parseInt(type.id) == parseInt(customerDataById.level)?"selected":""}>{type.status_level}</option>)
                                            })}
                                        </select>
                                </div> */}

                            {/* </div> */}
                        </div>
                            {/* <div class="d-flex align-items-center">
                                <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                    <div class="switcher ml-2 pr-2">
                                        <input type="checkbox" name="switcher_checkbox_////alert" id="switcher_checkbox_////alert" value="2"/>
                                        <label for="switcher_checkbox_////alert"></label>
                                    </div>
                                Alert
                                </div>
                                <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                    <div class="switcher ml-2 pr-2">
                                        <input type="checkbox" name="switcher_checkbox_Prospect" id="switcher_checkbox_Prospect" value="2"/>
                                        <label for="switcher_checkbox_Prospect"></label>
                                    </div>
                                    Prospect
                                </div>
                            </div> */}
                        </div>
                        <div class="col-md-6 text-md-right">
                            <div class="d-flex flex-wrap align-items-center justify-content-md-end">
                            {action=="edit"?
                                    <p   style={{paddingRight:"10%",color:"red",fontSize:"18px",paddingTop:"2%",cursor:"pointer"}} onClick={()=>deleteCustomerData(supplierDataById.id)}> Delete Supplier</p>
                           :""}
                                <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                                    <p style={{marginLeft:"14%",marginTop:"16px"}}>Active</p>
                                    <div class="switcher ml-2 pr-2">
                                                <input type="checkbox" id="status"  onChange={handleInput}  name="status"  checked={parseInt(supplierDataById.status) ===1?true:false}/>
                                                <label for="status"></label>
                                            </div>

                                   
                                </div>
                                <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                <span class="mr-2 f-s-18"><strong>Reason</strong></span>
           <select class="form-control" onChange={handleInput} id="reason" disabled={supplierDataById.status==0?false:true}>
               <option value={0}>Normal</option>
                   {props.supplierData.supplierReasonList.active.map(type=>{
                       return(<option value={parseInt(type.id)} selected={parseInt(type.id) == parseInt(supplierDataById.reason)?"selected":""}>{type.reason}</option>)
                   })}
               </select>
               </div>
                                {/* <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                    <span class="mr-2 f-s-18"><strong>Level</strong></span>
                                    <select class="form-control" onChange={handleInput} id="level">
                                        <option value={0}>Normal</option>
                                            {customerStatusList.active.map(type=>{
                                                return(<option value={parseInt(type.id)} selected={parseInt(type.id) == parseInt(customerDataById.level)?"selected":""}>{type.status_level}</option>)
                                            })}
                                        </select>
                                </div> */}

                            </div>
                            {/* <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0"> */}
                           
                           {/* <p style={{marginLeft:"2%",marginTop:"16px"}}>Active</p>
           <div class="switcher ml-2 pr-2">
                       <input type="checkbox" id="status"  onChange={handleInput}  name="status"  checked={parseInt(supplierDataById.status) ===1?true:false}/>
                       <label for="status"></label>
                   </div> */}
       
          
       {/* </div> */}
      
                        </div>
                        {/* <div class="col-md-6 text-md-right">
                            <div class="d-flex flex-wrap align-items-center justify-content-md-end">
                            {addCustomertoggle?"": <div class="mt-3 mt-md-0">
                                    <a href="" class="text-danger f-s-18 f-w-600">Delete Supplier</a>
                                </div>}
                                <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                    <div class="switcher ml-2 pr-2">
                                        <input type="checkbox" name="customerStatus" id="customerStatus" value="2"/>
                                        <label for="customerStatus"></label>
                                    </div>
                                    Active
                                </div>
                                <div class=" d-flex align-items-center mr-4 my-md-2 mt-3 mt-md-0">
                                    <span class="mr-2 f-s-18"><strong>Level</strong></span>
                                    <select class="form-control">
                                        <option>Landscape Architect</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Supplier Information</Tab>
                        <Tab>Settings</Tab>
                        <Tab>Contacts</Tab>
                        {/* <Tab>Tags &amp; Labels</Tab> */}
                        <Tab>Addresses</Tab>
                        {/* <Tab>Print Catalog</Tab> */}
                    </TabList>
                    <TabPanel>
                        <div class="bg-white cardShadow px-3 py-3 mt-3">
                            <form>
                                <h2>Supplier Information</h2>
                                <hr/>
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-6">
                                        <label>Supplier Name<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" name="supplier_name" value={supplierDataById.supplier_name} onChange={handleInput} id="supplier_name" placeholder={"Supplier Name"}/>
                                        {errorObj.customer_name!==0?<span style={{fontSize:"small",color:"red"}}>Enter Valid Name</span>:""}
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                    <label>Fax</label>
                                    <InputMask className={"form-control"} mask="(999) 999-9999" maskChar={""} id={"fax"} value={supplierDataById.fax} onChange={handleInput} placeholder={"(xxx) xxx-xxxx"}/>
                                        {/* <input type="number" class="form-control" name="fax" value={supplierDataById.fax} onChange={handleInput} id="fax"/> */}
                                        {errorObj.fax!==0?<span style={{fontSize:"small",color:"red"}}>Entered Number is invalid</span>:""}
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-6">
                                        <label>Primary Contact</label>
                                       
                                        {supplierDataById.contacts?supplierDataById.contacts.length>0?supplierDataById.contacts.map(contactData=>{
                                            if(contactData.primary_contact==1){
                                                return(<div style={{position:"relative"}}>
                                                    {/* <div class="col-md-6 col-lg-4"> */}
                                                    <div class="contactCard"  style={{border:"1px solid lightgray"}}>
                                                    <p class="mb-0 f-w-600">{contactData.first_name+" "+contactData.last_name}</p>
                                            <label class="text-muted f-w-400">{contactData.email}</label>
                                            <table>
                                                <tr>
                                                    <td><strong>Phone 1:</strong> {contactData.phone1==null?" Not Available":contactData.phone1}</td>
                                                     <td style={{paddingLeft:8}}><strong> Xt:</strong>  {contactData.phone1_ext==null?" Not Available":contactData.phone1_ext}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Phone 1:</strong> {contactData.phone2==null?" Not Available":contactData.phone2}</td>
                                                     <td  style={{paddingLeft:8}}> <strong> Xt:</strong> {contactData.phone2_ext==null?" Not Available":contactData.phone2_ext}</td>
                                                </tr>
                                            </table>
                                            {/* <div>
                                                <div class="custom-control custom-checkbox mt-2">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck1" checked={parseInt(contactData.primary_contact)==1?true:false} onChange={()=>changeCheckBox(contactData.id,index,"primary_contact")}/>
                                                    <label class="custom-control-label f-w-400" for="customCheck1">This person is the primary contact</label>
                                                </div>
                                                <div class="custom-control custom-checkbox mt-2">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck2"  checked={parseInt(contactData.all_communication)==1?true:false} onChange={()=>changeCheckBox(contactData.id,index,"all_communication")}/>
                                                    <label class="custom-control-label f-w-400" for="customCheck2">This person receives all communication</label>
                                                </div>
                                            </div> */}
                                   
                                                        </div>
                                                       
                                                        {/* </div> */}
                                                    </div>);
                                                   
                                            }
                                          
                                        })
                                           


                                        :<div  style={{border:"1px solid lightgray",height:"150px",borderRadius:5,position:"relative"}}>
                                           
                                            
                                            
                                        </div>:""}
                                        {/* <input type="text" class="form-control" id="name" value={customerDataById.fax!==null?customerDataById.name+" "+customerDataById.fax:""} onChange={handleInput}  disabled placeholder="Primary Contact"/> */}
 
                                           {/* </div> */}
                                     {/* <input type="text" class="form-control" name = "primaryContact" value={supplierDataById.fax !== null?supplierDataById.supplier_name+" "+supplierDataById.fax:""}  disabled placeholder="Primary Contact"/>  */}
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                    <label>Alternative ID <small>(Up tp 5 Char..)</small></label>
                                        <input type="text" class="form-control" name="alternative_id" value={supplierDataById.alternative_id} onChange={handleInput} id="alternative_id" maxlength={5} placeholder={"Alternative Id"}/>
                                     
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6 col-lg-6">
                                    <label>Website</label>
                                    {/* <div class="d-flex">
                                    <input type="url" placeholder={"https://www.Example.com"} class="form-control" name="website" id="website" value={supplierDataById.website}  onChange={handleInput} pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"/>
                                        {enableUrl== true?
                                      
                                          
                                            <a href={supplierDataById.website} target="_blank" class="btn btn-outline-secondary btn-lg ml-2" style={{display:"inline",border:"2px solid #629C44",color:"#629C44"}}>Visit</a>
                                       
                                        :
                                       
                                            <button class="btn btn-outline-secondary btn-lg ml-2" disabled={true} style={{border:"2px solid #629C44"}}>
                                         
                                            Visit
                                            </button>
                                       }
                                        </div> */}
                                        <div class="d-flex">
                                    <input type="url" placeholder={"https://www.Example.com"} class="form-control" name="website" id="website" value={supplierDataById.website}  onChange={handleInput} pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"/>
                                        {enableUrl== true || (supplierDataById.website&&action=="edit")?
                                      
                                          
                                            <a href={supplierDataById.website} target="_blank" class="btn  btn-lg ml-2" style={{display:"inline",border:"2px solid #629C44",color:"white",backgroundColor:"#629C44"}}>Visit</a>
                                       
                                        :
                                       
                                            <button class="btn btn-outline-secondary btn-lg ml-2 hoverVisit" disabled={true} style={{display:"inline",border:"3px solid #629C44",color:"#629C44"}}>
                                         
                                            Visit
                                            </button>
                                       }
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-12 mt-2 mt-md-0">
                                        <label>Supplier Notes <small>(Internal Only)</small></label>
                                        <textarea rows="" cols=""  class="form-control" name="supplier_notes" value={supplierDataById.supplier_notes} onChange={handleInput} id="supplier_notes" placeholder="Add Notes..."/>
                                    </div>
                                </div>
                                {/* <div class="row mt-3" style={{display:supplierDataById.status==0?"block":"none"}}>
                                    <div class="col-md-12 col-lg-12 mt-2 mt-md-0">
                                        <label>Reason <small></small></label>
                                        <textarea rows="" cols=""  class="form-control" name="reason" value={supplierDataById.reason} onChange={handleInput} id="reason" placeholder="Add Reason..."/>
                                    </div>
                                </div> */}



                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel >
                        <div class="bg-white cardShadow px-3 py-3 mt-3">
                            <form>
                                <h2>Settings</h2>
                                <hr/>
                                <div class="row mt-3">
                                    <div class="col-md-8 col-lg-8">
                                        <label>Shipping Type</label>
                                        <div class="d-flex">
                                            <div class="custom-control custom-radio">
                                                <input type="radio" id="delivery" value={0} name="delivery" class="custom-control-input" checked = {parseInt(supplierDataById.dispatch_type)==0?true:false} onClick={handleInput}/>
                                                <label class="custom-control-label" for="delivery">Delivery</label>
                                            </div>
                                            <div class="custom-control custom-radio ml-4">
                                                <input type="radio" id="pickup"  value={1} name="pickup" class="custom-control-input" checked = {parseInt(supplierDataById.dispatch_type)==1?true:false} onClick={handleInput} />
                                                <label class="custom-control-label" for="pickup">Pickup</label>
                                            </div>
                                            <div class="custom-control custom-radio ml-4">
                                                <input type="radio" id="both"  value={2} name="both" class="custom-control-input" checked = {parseInt(supplierDataById.dispatch_type)==2?true:false} onClick={handleInput}/>
                                                <label class="custom-control-label" for="both">Delivery & Pickup</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="row mt-3">
                                    <div class="col-md-3 col-lg-3">
                                        <label>Discount</label>
                                      <input type="number" class="form-control" onChange={handleInput}  id="discount" value={supplierDataById.discount} step="0.00" placeholder={"0.00"} style={{textAlign:"right"}}/>
                                       
                                    </div>
                                
                                </div> */}
                                <div class="row mt-3">
                        
                        <div class="col-md-9 col-lg-10 mt-3 mt-md-0">
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Payment Terms</label>
                                    <select class="form-control" onChange={handleInput} id="term">
                                        <option value={0}>None</option>
                                            {props.customerData.customerTermList.active.map(type=>{
                                                return(<option value={parseInt(type.id)} selected={parseInt(type.id) == parseInt(supplierDataById.term)?"selected":""}>{type.term}</option>)
                                            })}
                                        </select>
                                    {/* <select class="form-control" onChange={handleInput} id="units">
                                        <option selected={supplierDataById.units ==="Metric"?"selected":""} value="Metric">Metric</option>
                                        <option selected={supplierDataById.units ==="Imperial"?"selected":""} value="Imperial">Imperial</option>

                                    </select> */}
                                </div>
                                <div class="col-md-4 mt-3 mt-md-0">
                                    <label>Discount</label>
                                    <input type="number" class="form-control" onChange={handleInput}  id="discount" value={supplierDataById.discount} step="0.00" placeholder={"0.00"} style={{textAlign:"right"}} onBlur={dataTochange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                                <div class="row mt-3">
                        
                                    <div class="col-md-9 col-lg-10 mt-3 mt-md-0">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Units</label>
                                                <select class="form-control" onChange={handleInput} id="units">
                                                    <option selected={supplierDataById.units ==="Metric"?"selected":""} value="Metric">Metric</option>
                                                    <option selected={supplierDataById.units ==="Imperial"?"selected":""} value="Imperial">Imperial</option>
        
                                                </select>
                                            </div>
                                            <div class="col-md-4 mt-3 mt-md-0">
                                                <label>Currency</label>
                                                <select class="form-control" onChange={handleInput} id="currency">
                                                    <option value={"Canadian Dollar"} selected={supplierDataById.currency==="Canadian Dollar"?"selected":""}>Canadian Dollar</option>
                                                    <option  value={"U.S. Dollar"} selected={supplierDataById.currency==="U.S. Dollar"?"selected":""}>U.S. Dollar</option>
                                                   
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 col-lg-12">
                                        <div class="row">
                                         
                                            <div class="col-md-12 mt-12" style={{width:"20%"}}>
                                                <label>Categories</label>
                                                <div></div>
                                                {props.supplierData.supplierCategoryList.active.map(data=>{
                                                    return(
                                                        <div class="col-md-6 col-lg-6" style={{display:"inline-block",width:"15%"}}>
                                                    <div className="custom-control custom-checkbox mb-1" >
                                                        <input type="checkbox" className="custom-control-input" id={data.id} onChange={handleInput} value="product" checked={supplierDataById.product_categories.filter(id=>parseInt(id) ===parseInt(data.id)).length}/>
                                                        <label className="custom-control-label" for={data.id}>{data.category}</label>
                                                    </div>
                                                </div>
                                                    )
                                                })}
                                                {/* <div style={{display:"flex"}}>
                                                <div class="col-md-2 col-lg-2">
                                                    <div className="custom-control custom-checkbox mb-1" >
                                                        <input type="checkbox" className="custom-control-input" id={"all_communication"} onChange={handleInput} />
                                                        <label className="custom-control-label" for={"all_communication"}>Finished Plants</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 col-lg-2">
                                                    <div className="custom-control custom-checkbox mb-1">
                                                        <input type="checkbox" className="custom-control-input" id={"Liners"} onChange={handleInput} />
                                                        <label className="custom-control-label" for={"Liners"}>Liners</label>
                                                    </div>
                                                </div>

                                                </div>
                                                <div style={{display:"flex"}}>
                                        
                                                <div class="col-md-2 col-lg-2">
                                                    <div className="custom-control custom-checkbox mb-1" >
                                                        <input type="checkbox" className="custom-control-input" id={"all_communication"} onChange={handleInput} />
                                                        <label className="custom-control-label" for={"all_communication"}>Office Supplies</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-2 col-lg-2">
                                                    <div className="custom-control custom-checkbox mb-1">
                                                        <input type="checkbox" className="custom-control-input" id={"all_communication"} onChange={handleInput} />
                                                        <label className="custom-control-label" for={"all_communication"}>Services</label>
                                                    </div>
                                                </div>
                                                </div> */}
                                                <div style={{display:"flex"}}>
                                        
                                        {/* <div class="col-md-2 col-lg-2">
                                            <div className="custom-control custom-checkbox mb-1" >
                                                <input type="checkbox" className="custom-control-input" id={"all_communication"} onChange={handleInput} />
                                                <label className="custom-control-label" for={"all_communication"}>Growing Supplies</label>
                                            </div>
                                        </div> */}
                                        </div>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="bg-white cardShadow px-3 py-3 mt-3">
                            <form>
                                <h2>Contacts</h2>
                                <hr/>
                                <div class="row mt-3">
                                    {supplierDataById.contacts.map((contact,index)=>{
                                        return(
                                            <div class="col-md-6 col-lg-4">
                                        <div class="contactCard">
                                            <p class="mb-0 f-w-600">{contact.first_name} {contact.last_name}</p>
                                            <label class="text-muted f-w-400">{contact.email}</label>
                                            {/* <div class="row">
                                                <div class="col-md-6">
                                                    <label class="text-muted f-w-400 mb-0"><strong>Phone 1:</strong>{contact.phone1}</label>
                                                    <label class="text-muted f-w-400 mb-0"><strong>Phone 2:</strong>{contact.phone2}</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="text-muted f-w-400 mb-0"><strong>Xt: </strong> 123</label>
                                                </div>
                                            </div> */}
                                            <table>
                                                    <tr>
                                                        <td>  <label class="text-muted f-w-400 mb-0"><strong>Phone 1:</strong> {contact.phone1}</label></td>
                                                        {contact.phone1_ext!==null?<td>  <label class="text-muted f-w-400 mb-0"><strong style={{paddingLeft:10}}>Xt: </strong> <span >{contact.phone1_ext}</span></label></td>:<td></td>}
                                                    </tr>
                                                    <tr>
                                                        <td>  <label class="text-muted f-w-400 mb-0"><strong>Phone 2:</strong> {contact.phone2!==null?contact.phone2:"Not Available"}</label></td>
                                                        {contact.phone2_ext!==null?<td>  <label class="text-muted f-w-400 mb-0"><strong style={{paddingLeft:10}}>Xt: </strong> <span >{contact.phone2_ext}</span></label></td>:<td></td>}
                                                    </tr>
                                                </table>
                                            <div>
                                                <div class="custom-control custom-checkbox mt-2" style={{cursor:"pointer"}}>
                                                    <input type="checkbox" className="custom-control-input" style={{cursor:"pointer"}} id={`primary_contact^${index}`} checked={parseInt(contact.primary_contact)==1?true:false} onChange={changeCheckBox}/>
                                                    <label class="custom-control-label f-w-400" for={`primary_contact^${index}`} style={{cursor:"pointer"}}>This person is the primary contact</label>
                                                </div>
                                                <div class="custom-control custom-checkbox mt-2" style={{cursor:"pointer"}}>
                                                    <input type="checkbox" className="custom-control-input" style={{cursor:"pointer"}} id={`receives_all^${index}`} checked={parseInt(contact.receives_all)==1?true:false} onChange={changeCheckBox}/>
                                                    <label class="custom-control-label f-w-400" for={`receives_all^${index}`} style={{cursor:"pointer"}}>This person receives all communication</label>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-6">
                                                <a  class=""   onClick={()=>editContactNotes(index)} style={{cursor:"pointer"}}>
                                                    {contact.notes==null||contact.notes==""? <img src="assets/img/Notes-grey.png" alt=""/>:<img src="assets/img/Notes-Blue.png" alt=""/> }
                                                        {/* <img src="assets/img/moreDetails-ic.svg" alt="" onClick={()=>editContactNotes(index)}/> */}
                                                    </a>
                                                    <a  class=" ml-2" style={{cursor:"pointer"}}>
                                                        <img src="assets/img/edit.svg" alt="" onClick={()=>editContact(index)}/>
                                                    </a>
                                                </div>
                                                <div class="col-md-6 text-right" onClick={()=>deleteContactData(index)}>
                                                    <a  class=" ml-2" style={{cursor:"pointer"}}>
                                                        <img src="assets/img/delete.svg" alt="" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        )
                                    })}
                                   
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 text-right">
                                        <span>Minimum 1 Contact required</span>
                                        <button type="button" class="btn btn-primary btn-lg ml-3" disabled={supplierDataById.id==""?true:false} onClick={toggleForContact}>Add</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                
                    <TabPanel>
                        <div class="bg-white cardShadow px-3 py-3 mt-3">
                            <form>
                                <h2>Addresses</h2>
                                <hr/>
                                <div class="row mt-3">
                                    {supplierDataById.addresses.map((address,index)=>{
                                        return(<div class="col-md-6 col-lg-4">
                                        <div class="contactCard">
                                            <p class="mb-0 f-s-16 f-w-600">{address.city}<br/></p>
                                            <p class="mb-0 f-s-16 f-w-600">{address.state}, {address.country} -{address.zip}<br/></p>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="custom-control custom-checkbox mt-2">
                                                        <input type="checkbox" class="custom-control-input" style={{cursor:"pointer"}} id={`billing_address^${index}`} checked={parseInt(address.billing_address)==1?true:false} onChange={changeCheckBoxAddress}/>
                                                        <label class="custom-control-label f-w-400" for={`billing_address^${index}`} style={{cursor:"pointer"}}>Billing Address</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="custom-control custom-checkbox mt-2">
                                                        <input type="checkbox" class="custom-control-input" style={{cursor:"pointer"}} id={`shipping_address^${index}`} checked={parseInt(address.shipping_address)==1?true:false} onChange={changeCheckBoxAddress}/>
                                                        <label class="custom-control-label f-w-400" for={`shipping_address^${index}`} style={{cursor:"pointer"}}>Delivery Address</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-12">
                                                    <a href="#" class="" style={{cursor:"pointer"}}>
                                                        <img src="assets/img/location-pin.svg" alt="" /> Show on Google Maps
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-6">
                                                    <a  class=""  onClick={()=>editAddressNotes(index)} style={{cursor:"pointer"}}>
                                                    {address.notes==null||address.notes==""? <img src="assets/img/Notes-grey.png" alt=""/>:<img src="assets/img/Notes-Blue.png" alt=""/> }
                                                    </a>
                                                    <a  class=" ml-2"  onClick={()=>editAddress(index)} style={{cursor:"pointer"}}>
                                                        <img src="assets/img/edit.svg" alt=""/>
                                                    </a>
                                                </div>
                                                <div class="col-md-6 text-right" >
                                                    <a  class=" ml-2" onClick={()=>deleteAddress(index)} style={{cursor:"pointer"}}>
                                                        <img src="assets/img/delete.svg" alt=""/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                    })}
                               

                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12 text-right">
                                        <span>Minimum 1 Address required</span>
                                        <button type="button" class="btn btn-primary btn-lg ml-3" onClick={addAdrress} disabled={supplierDataById.id==""?true:false}>Add</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div class="bg-white cardShadow px-3 py-3 mt-3">
                            <form>
                                <h2>Print Catalog</h2>
                                <hr/>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <label>Requires Print Catalog</label>
                                        <input type="text" class="form-control" value="Yes" />
                                    </div>
                                    <div class="col-md-4 mt-3 mt-md-0">
                                        <label>Quantity</label>
                                        <select class="form-control">
                                            <option>5</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                        </select>
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
const mapStateToProps = (state)=> (
    // console.log(state.customerReducer.payload)
    {
        supplierData:state.supplierData,
        categoryData:state.categoryData,
        customerData:state.customerReducer,
        // supplierData:state.supplierData,
    }

)

export default connect(mapStateToProps,{UpdateAddressData,updateSupplierContactData,UpdateAddress,updateSupplierContact,getAllSuppliersContact,getAllTermsMethods,getAllSupplierReasonMethods,getAllSupplierCategoryMethods,deleteSupplier,deleteSupplierAddress,deleteContact,getAllAddress,getAddressById,getSupplierContact,resetSupplierFilds,resetSupplierContact,getAllSuppliersContact,updateSupplierData,addSupplierDetails,handleSupplierExchnageData,getAllCategoriesAction,getAllSuppliers,setPageNumber,handleRadioFilter,handleSearchFilter,handleAplhabetFilter,typeOfsupplierActionShow})(AddSupplier)
