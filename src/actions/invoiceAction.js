import {
    GET_INVOICE_LIST, 
    ADD_CUSTOMER, 
    SHOW_CUSTOER, 
    UPDATE_CUSTOMER,
    DELETE_CUSTOMER,
    SET_PAGE_NUMBER,
    FILTER_DATA_BY_RADIO,
    FILTER_DATA_BY_SEARCH,
    FILTER_DATA_BY_ALPHA,
    RESET_INVOICE_FILEDS,
    HANLE_DATA_CHANGE,
    HANDLE_INPUT_EXCHANGE,
    HANDLE_INPUT_EXCHANGE1,
    ADD_NOTIFICATION,
    ADD_FINANCES_DATA,
    HANDLE_INPUT_CUSTOMER,
    ADD_EMAIL,
    GET_CUSTOMER_NOTIFICATION,
    GET_EMAIL_NOTIFICATION,
    HANDLE_INPUT,
    ADD_INTEREST_DATA,
    GET_INTEREST_DATA,
    ADD_PRINT_DATA,
    GET_PRINT_DATA,
    ADD_CUSTOMER_TYPE,
    GET_ALL_CUSTOMER_TYPES,
    HANDLE_DRAG_CUSTOMER_CATEGORY,
    GET_CUSTOMER_DELIVERY_LIST,
    ADD_CUSTOMER_DELIVERY,
    GET_CUSTOMER_STATUS,
    ADD_CUSTOMER_STATUS,
    ADD_CUSTOMER_REASON,
    GET_CUSTOMER_REASON,
    GET_CUSTOMER_TERMS,
    ADD_CUSTOMER_TERMS,
    ADD_CUSTOMER_RETURN_REASON,
    GET_CUSTOMER_RETURN_REASON,
    GET_EXCHANGE_DATA,
    ADD_NEW_CUSTOMER,
    EDIT_CUSTOMER,
    TYPE_OF_ACTION,
    DELETE_CUSTOMER_ADDRESS,
    GET_CUSTOMER_BY_ID,
    RESET_CUSTOMER_FILEDS,
    ADD_CUSTOMER_CONTACT,
    GET_CUSTOMER_CONTACTS_LIST,
    ADD_CONTACT_ADDRESS ,
   GET_CONTACT_ADDRESSES ,
   UPDATE_CONTACT_ADDRESS ,
   GET_CONTACT_ADDRESSES_BY_CONTACTID,
   UPDATE_CUSTOMER_CONTACT,
   GET_CUSTOMER_CONTACT_BY_ID,
   RE_SET_ADDRESS_FILED,
   RESET_CONTACT,
   DELETE_CUSTOMER_CONTACT,
   UPDATE_CUSTOMER_TYPE_SETTING,
   SHOW_SPECIFIC_CUSTOMER_TYPE_SETTING,
   HANDLE_CUSTOMER_SETTIING_INPUT_DATA,
   SHOW_SPECIFIC_CUSTOMER_DELIVERY_METHOD_SETTING,
   UPDATE_CUSTOMER_DELIVERY_METHOD_SETTING,
   FILTER_INVOICE_INVENTORY_ACTION,
   
   
   UPDATE_CUSTOMER_STATUS_LEVEL_SETTING,
   SHOW_SPECIFIC_CUSTOMER_STATUS_LEVEL_SETTING,
   
   UPDATE_CUSTOMER_RETURN_REASON_SETTING,
   SHOW_SPECIFIC_CUSTOMER_RETURN_REASON_SETTING,
   
   UPDATE_CUSTOMER_ACCOUNT_REASON_SETTING,
   SHOW_SPECIFIC_CUSTOMER_ACCOUNT_REASON_SETTING,
   
   UPDATE_CUSTOMER_TERMS_SETTING,
   SHOW_SPECIFIC_CUSTOMER_TERMS_SETTING,
   
   HANDLE_CUSTOMER_TYPE_SORT,
   HANDLE_CUSTOMER_DELIVERY_SORT,
   HANDLE_CUSTOMER_STATUS_SORT,
   HANDLE_CUSTOMER_RETURN_SORT,
   HANDLE_CUSTOMER_ACCOUNT_SORT,
   HANDLE_CUSTOMER_TERM_SORT,
   
   
   
    axios,
    config
    } from './types'
   
   
   
   
   
   ////customer details////////////////////////////////
   export const typeOfActionShow = (type) =>dispatch=>{
       dispatch({
         type:TYPE_OF_ACTION,
         action:type
       })
   }

   
   export const getCustomerById = (id) =>dispatch=>{
       return axios.get(`api/show-customer/${id}`,config).then(res=>{ 
           console.log(res.data)
       dispatch({
               type:GET_CUSTOMER_BY_ID,
               payload:res.data,
   
           })
       })
   }
   export const addCustomerData = (data)=>dispatch=>{
       return axios.post("/api/add-customer",data,config).then(res=>{ 
           console.log(res)
           dispatch({
                   type:ADD_NEW_CUSTOMER,
                   payload:res.data   
               })
           }) 
   }
   export const resetContact = () =>dispatch=>{
       dispatch({type:RESET_CONTACT})
   }
   export const UpdateCustomerData = (data)=>dispatch=>{
       let id = data.id
       delete data.id
       return axios.post(`/api/update-customer/${id}`,data,config).then(res=>{ 
           console.log(res)
           dispatch({
                   type:UPDATE_CUSTOMER,
                   payload:res.data   
               })
           }) 
   }
   
   

   

    
   
   export const handleExchangeData =(data,id,dataType)=>dispatch=>{
       dispatch({
           type:HANDLE_INPUT_EXCHANGE1,
           data:data,
           id:id,
           dataType:dataType
   
       })
   }
 
   
   export const resetFileds = (data)=>dispatch => {
       dispatch({
           type:RESET_INVOICE_FILEDS,
   
       })
   }

    export const getAllInvoice = (dataType) => dispatch => {
       return axios.get("/api/customers-list",config).then(res=>{ 
           console.log(res.data)
       dispatch({
               type:GET_INVOICE_LIST,
               payload:res.data,
               dataType:dataType
   
           })
       })
   }
   
   export const handleChangeFilter = (data,id) =>dispatch =>{
       dispatch({
           type:HANDLE_INPUT,
           data:data,
           id:id
   
       })
   }
   
   
   
   export const addCustomer = (data) => dispatch => {
       console.log(data)
      axios.post("/api/add-customer",data,config).then(res=>{ 
          console.log(res)
          dispatch({
                  type:ADD_CUSTOMER,
                  payload:res.data.data   
              })
          })
   }
   
   export const showCustomer = (id) => dispatch => {
       axios.get(`/api/show-customer/${id}`,config).then(res=>{     
           dispatch({
                   type:SHOW_CUSTOER,
                   payload:res.data    
               })
           })
   }
   
   // export const updateCustomer = (customerData) => dispatch => {
   //     console.log(customerData)  
   //     return axios.post(`/api/update-customer/${customerData.id}`,customerData,config).then(res=>{  
   //      console.log(res)     
   //      dispatch({
   //              type:UPDATE_CUSTOMER,
   //              payload:res.data    
   //          })
   //      })
   //      .catch(message=>{
   //          console.log(message)
   //      })     
   // }
   
   export const deleteCustomer= (id) => dispatch => {
       // console.log(customerData)
       return axios.post(`/api/delete-customer/${id}`,null,config).then(res=>{ 
           console.log(res)
           dispatch({
                   type:DELETE_CUSTOMER,
                   payload:res.data   
               })
           }) 
        
   }
   
   export const setPageNumber = (pageNumber) => {
       return{
             type:SET_PAGE_NUMBER,
             pageNumber:pageNumber,
         }
     
     }
     export const handleSearchFilter = (data,resetAction)=>{
       //   if()
         return{
             type:FILTER_DATA_BY_SEARCH,
             searchData:data,
             resetAction:resetAction
         }
     }
     export const handleAplhabetFilter = (data)=>{
       //   if()
         return{
             type:FILTER_DATA_BY_ALPHA,
             alphaData:data
         }
     }
     export const filterInvoiceManagerData = (id,value)=>dispatch => {
        dispatch({
            type:FILTER_INVOICE_INVENTORY_ACTION,
            id:id,
            value:value
        })
    }
   //   export const dataChange = ()=>{
   //       return {
   //           type:"@@redux-form/BLUR",
   
   //       }
   //   }
   
   
   
   /// cutomer