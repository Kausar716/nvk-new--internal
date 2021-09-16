 import {
 GET_CUSTOMER_LIST, 
 ADD_CUSTOMER, 
 SHOW_CUSTOER, 
 UPDATE_CUSTOMER,
 DELETE_CUSTOMER,
 SET_PAGE_NUMBER,
 FILTER_DATA_BY_RADIO,
 FILTER_DATA_BY_SEARCH,
 FILTER_DATA_BY_ALPHA,
 HANLE_DATA_CHANGE,
 UPDATE_CONTACT1,
 HANDLE_INPUT_EXCHANGE,
 UPDATE_CONTACT,
 EDIT_PRIMARY,
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
 ADD_PRIMARY,
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
GET_CUSTOMER_BY_ID1,


UPDATE_CUSTOMER_STATUS_LEVEL_SETTING,
SHOW_SPECIFIC_CUSTOMER_STATUS_LEVEL_SETTING,

UPDATE_CUSTOMER_RETURN_REASON_SETTING,
SHOW_SPECIFIC_CUSTOMER_RETURN_REASON_SETTING,

UPDATE_CUSTOMER_ACCOUNT_REASON_SETTING,
SHOW_SPECIFIC_CUSTOMER_ACCOUNT_REASON_SETTING,

UPDATE_CUSTOMER_TERMS_SETTING,
ADD_CUSTOMER_CONTACT1,
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
///start of sort////////////////////////
 export const customerTypeSort =(fromId, toId,type)=>dispatch => {
    let attributeObject={}
    attributeObject.from=fromId;
    attributeObject.to=toId;
    attributeObject.position=type;
    return axios.post(`/api/drag-sort-customer-type`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_CUSTOMER_TYPE_SORT,
            payload:res.data
        })
    })

}
export const customerDeliverySort =(fromId, toId,type)=>dispatch => {
    let attributeObject={}
    attributeObject.from=fromId;
    attributeObject.to=toId;
    attributeObject.position=type;
    return axios.post(`/api/drag-sort-customer-delivery`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_CUSTOMER_DELIVERY_SORT,
            payload:res.data
        })
    })

}
export const customerStatusSort =(fromId, toId,type)=>dispatch => {
    let attributeObject={}
    attributeObject.from=fromId;
    attributeObject.to=toId;
    attributeObject.position=type;
    return axios.post(`/api/drag-sort-customer-statuslevel`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_CUSTOMER_STATUS_SORT,
            payload:res.data
        })
    })

}
export const addPriamryContact  =(data)=>dispatch => {
    // alert(JSON.stringify(data))
    dispatch({
        type:ADD_PRIMARY,
        payload:data
    })

    


}
export const updateContacts  = (data)=>dispatch => {
    dispatch({
        type:UPDATE_CONTACT,
        payload:data
    })

}
export const updatecustomerAddressData = (data)=>dispatch => {
    dispatch({
        type:UPDATE_CONTACT1,
        payload:data
    })

}
export const editDataToContact  =(data)=>dispatch => {
    // alert(JSON.stringify(data))
    dispatch({
        type:EDIT_PRIMARY,
        payload:data
    })

    


}

// export const customerStatusSort =(fromId, toId,type)=>dispatch => {
//     let attributeObject={}
//     attributeObject.from=fromId;
//     attributeObject.to=toId;
//     attributeObject.position=type;
//     return axios.post(`/api/drag-sort-customer-statuslevel`,attributeObject,config).then(res=>{ 
//         console.log(res)
//     dispatch({
//             type:HANDLE_CUSTOMER_STATUS_SORT,
//             payload:res.data
//         })
//     })

// }
export const customerReturnSort =(fromId, toId,type)=>dispatch => {
    let attributeObject={}
    attributeObject.from=fromId;
    attributeObject.to=toId;
    attributeObject.position=type;
    return axios.post(`/api/drag-sort-customer-return-reason`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_CUSTOMER_RETURN_SORT,
            payload:res.data
        })
    })

}
export const customerAccountSort =(fromId, toId,type)=>dispatch => {
    let attributeObject={}
    attributeObject.from=fromId;
    attributeObject.to=toId;
    attributeObject.position=type;
    return axios.post(`/api/drag-sort-customer-account-reason`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_CUSTOMER_ACCOUNT_SORT,
            payload:res.data
        })
    })

}
export const customerTermSort =(fromId, toId,type)=>dispatch => {
    let attributeObject={}
    attributeObject.from=fromId;
    attributeObject.to=toId;
    attributeObject.position=type;
    return axios.post(`/api/drag-sort-customer-terms`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_CUSTOMER_TERM_SORT,
            payload:res.data
        })
    })

}


//////////////end of sort////////////////////////////





////customer details////////////////////////////////
export const typeOfActionShow = (type) =>dispatch=>{
    dispatch({
      type:TYPE_OF_ACTION,
      action:type
    })
}
export const deleteCustomerContact= (id) => dispatch => {
    // console.log(customerData)
    // return axios.post(`/api/delete-customer-contact/${id}`,null,config).then(res=>{ 
        // console.log(res)
        dispatch({
                type:DELETE_CUSTOMER_CONTACT,
                payload:id   
            })
        // }) 
     
}
export const deleteCustomerAddress= (id) => dispatch => {
    // console.log(customerData)
    // return axios.post(`/api/delete-customer-address/${id}`,null,config).then(res=>{ 
        // console.log(res)
        dispatch({
                type:DELETE_CUSTOMER_ADDRESS,
                payload:id
            })
        // }) 
     
}
export const getCustomerByIdQuote= (id) =>dispatch=>{
    return axios.get(`api/show-customer/${id}`,config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_CUSTOMER_BY_ID1,
            payload:res.data,

        })
    })
}
export const getCustomerById = (id) =>dispatch=>{
    return axios.get(`api/show-customer/${id}`,config).then(res=>{ 
        console.log(res.data.data.user)
    dispatch({
            type:GET_CUSTOMER_BY_ID,
            payload:res.data.data.user,

        })
    })
}
export const addCustomerData = (data)=>dispatch=>{
    return axios.post("/api/add-customer",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_NEW_CUSTOMER,
                payload:res.data.data.user   
            })
        }) 
}
export const resetContact = () =>dispatch=>{
    dispatch({type:RESET_CONTACT})
}
export const UpdateCustomerData = (data)=>dispatch=>{
    let id = data.id
    // delete data.id
    return axios.post(`/api/update-customer/${id}`,data,config).then(res=>{ 
        // console.log(res)
        // res.data["id"] = id
        dispatch({
                type:UPDATE_CUSTOMER,
                payload:res.data   
            })
        }) 
}



export const updateCustomerTypeSettings = (id, data) =>dispatch => {
    //debugger;
   return axios.post(`/api/update-customer-type/${id}`,data,config).then(res=>{ 
     // debugger;
      
   dispatch({
           type:UPDATE_CUSTOMER_TYPE_SETTING,
           payload:res.data.data,

       })
   })

}

export const showSpecificCustomerSettingType = (id) => dispatch => {
    axios.get(`api/show-customer-type/${id}`,config).then(res=>{ 
      
        console.log(res.data)
    dispatch({
            type:SHOW_SPECIFIC_CUSTOMER_TYPE_SETTING,
            payload:res.data
        })
    })
 }




export const updateCustomerDeliveryMethodSettings = (id, data) =>dispatch => {
   // debugger;
   return axios.post(`/api/update-customer-delivery-method/${id}`,data,config).then(res=>{ 
     //debugger;
       console.log(res.data)
   dispatch({
           type:UPDATE_CUSTOMER_DELIVERY_METHOD_SETTING,
           payload:res.data.data,

       })
   })

}

export const showSpecificCustomerDeliveryMethodSettings = (id) => dispatch => {
    axios.get(`api/show-customer-delivery-method/${id}`,config).then(res=>{ 
      
        console.log(res.data)
    dispatch({
            type:SHOW_SPECIFIC_CUSTOMER_DELIVERY_METHOD_SETTING,
            payload:res.data
        })
    })
 }


//StatusLevel
 export const updateCustomerStatusLevelSettings = (id, data) =>dispatch => {
    // debugger;
    return axios.post(`/api/update-customer-account-status/${id}`,data,config).then(res=>{ 
      //debugger;
        console.log(res.data)
    dispatch({
            type:UPDATE_CUSTOMER_STATUS_LEVEL_SETTING,
            payload:res.data.data,
 
        })
    })
 
 }
 
 export const showSpecificStatusLevelSettings = (id) => dispatch => {
     axios.get(`api/show-customer-account-status/${id}`,config).then(res=>{ 
       
         console.log(res.data)
     dispatch({
             type:SHOW_SPECIFIC_CUSTOMER_STATUS_LEVEL_SETTING,
             payload:res.data
         })
     })
  }

  //CustomerReturnReason
  export const updateCustomerReturnReasonSettings = (id, data) =>dispatch => {
    // debugger;
    return axios.post(`/api/update-customer-reason/${id}`,data,config).then(res=>{ 
      //debugger;
        console.log(res.data)
    dispatch({
            type:UPDATE_CUSTOMER_RETURN_REASON_SETTING,
            payload:res.data.data,
 
        })
    })
 
 }
 
 export const showSpecificReturnReasonSettings = (id) => dispatch => {
     axios.get(`api/show-customer-reason/${id}`,config).then(res=>{ 
       
         console.log(res.data)
     dispatch({
             type:SHOW_SPECIFIC_CUSTOMER_RETURN_REASON_SETTING,
             payload:res.data
         })
     })
  }
 
  //CustomerAccountReason

  export const updateCustomerAccountReasonlSettings = (id, data) =>dispatch => {
    // debugger;
    return axios.post(`/api/update-customer-account-reason/${id}`,data,config).then(res=>{ 
      //debugger;
        console.log(res.data)
    dispatch({
            type:UPDATE_CUSTOMER_ACCOUNT_REASON_SETTING,
            payload:res.data.data,
 
        })
    })
 
 }
 
 export const showSpecificAccountReasonSettings = (id) => dispatch => {
     axios.get(`api/show-customer-account-reason/${id}`,config).then(res=>{ 
       
         console.log(res.data)
     dispatch({
             type:SHOW_SPECIFIC_CUSTOMER_ACCOUNT_REASON_SETTING,
             payload:res.data
         })
     })
  }

  //Terms
  export const updateCustomerTermslSettings = (id, data) =>dispatch => {
    // debugger;
    return axios.post(`/api/update-customer-term/${id}`,data,config).then(res=>{ 
      //debugger;
        console.log(res.data)
    dispatch({
            type:UPDATE_CUSTOMER_TERMS_SETTING,
            payload:res.data.data,
 
        })
    })
 
 }
 
 export const showSpecificTermsSettings = (id) => dispatch => {
     axios.get(`api/show-customer-term/${id}`,config).then(res=>{ 
       
         console.log(res.data)
     dispatch({
             type:SHOW_SPECIFIC_CUSTOMER_TERMS_SETTING,
             payload:res.data
         })
     })
  }





//   export const handleExchangeData2 =(data,id,dataType)=>dispatch=>{
//     dispatch({
//         type:HANDLE_CUSTOMER_SETTIING_INPUT_DATA,
//         data:data,
//         id:id,
//         dataType:dataType

//     })
// }
export const handleExchangeData =(data,id,dataType)=>dispatch=>{
    dispatch({
        type:HANDLE_INPUT_EXCHANGE1,
        data:data,
        id:id,
        dataType:dataType

    })
}
export const handleExchangeDataNew =(data,id,dataType)=>dispatch=>{
    dispatch({
        type:HANDLE_INPUT_CUSTOMER,
        data:data,
        id:id,
        dataType:dataType

    })
}


 export const handleExchangeData2 = (data,dataType) =>dispatch=>{
    //console.log(name)
 dispatch({
     type:HANDLE_CUSTOMER_SETTIING_INPUT_DATA,
     data:data,
    //  id:id,
     dataType:dataType   
 })
}

// export const handleExchangeData = (data,dataType) =>dispatch=>{
//     dispatch({
//         type:HANDLE_INPUT_EXCHANGE,
//         data:data,
//         // id:id,
//         dataType:dataType

//     })

// }

// export const handleExchangeData2 = (data,id,dataType) =>dispatch=>{
//     dispatch({
//         type:HANDLE_INPUT_EXCHANGE,
//         data:data,
//         id:id,
//         dataType:dataType

//     })

// }
 





export const resetCustomerFilds = (data)=>dispatch => {
    dispatch({
        type:RESET_CUSTOMER_FILEDS,

    })
}


export const addCustomerContact = (data)=>dispatch => {
    return axios.post(`/api/add-customer-contact`,data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_CUSTOMER_CONTACT,
                payload:res.data   
            })
        }) 
}
export const addCustomerContact1 = (data)=>dispatch => {
    // return axios.post(`/api/add-customer-contact`,data,config).then(res=>{ 
    //     console.log(res)
    alert(JSON.stringify(data))
        dispatch({
                type:ADD_CUSTOMER_CONTACT1,
                payload:data   
            })
        // }) 
}
export const getCustomerContacts = (id) =>dispatch=>{
    // alert(id)
    if(id !==0){
        return axios.get(`api/customer-contacts?customer_id=${id}`,config).then(res=>{ 
            console.log(res.data)
        dispatch({
                type:GET_CUSTOMER_CONTACTS_LIST,
                payload:res.data,
    
            })
        })

    }else{

    }
  
}

export const getDataByContactId = (id) =>dispatch =>{
    // return axios.get(`api/customer-contact/${id}`,config).then(res=>{ 
        // console.log(res.data)
    dispatch({
            type:GET_CUSTOMER_CONTACT_BY_ID,
            payload:id,

        })
    // })

}
export const updateContactData =(data) =>dispatch => {
    // let id = data.id
    // delete data.id
    // return axios.post(`/api/update-customer-contact/${id}`,data,config).then(res=>{ 
    //     console.log(res)
        dispatch({
                type:UPDATE_CUSTOMER_CONTACT,
                payload:data   
            })
        // }) 

}

//customer addresses

export const addcustomerAddress =(data)=>dispatch => {
    // return axios.post("/api/add-customer-address",data,config).then(res=>{ 
        // console.log(res)
        dispatch({
                type:ADD_CONTACT_ADDRESS,
                payload:data   
            })
        // })
    }
    // customer-addresses?customer_id=3 
    // dispatch({
    //     type:ADD_CONTACT_ADDRESS ,

    // })


export const getcustomerAddress =(id)=>dispatch => {
    if(id !==0){
        return axios.get(`api/customer-addresses?customer_id=${id}`,config).then(res=>{ 
            console.log(res.data)
            dispatch({
                type:GET_CONTACT_ADDRESSES ,
                payload:res.data,
        
            })
        })

    }else{

    }
   

}
export const updatecustomerAddress =(data)=>dispatch => {
    // let id = data.id
    // delete data.id
    // return axios.post(`/api/update-customer-address/${id}`,data,config).then(res=>{ 
        // console.log(res)
        dispatch({
                type:UPDATE_CONTACT_ADDRESS,
                payload:data   
            })
        // }) 

}
export const getcustomerAddressByaddressId =(id)=>dispatch => {
    // return axios.get(`api/customer-address/${id}`,config).then(res=>{ 
        // console.log(data)
        dispatch({
            type:GET_CONTACT_ADDRESSES_BY_CONTACTID ,
            payload:id,
    
        })
    // })


}
export const resetAddressFileds =()=>dispatch => {
    dispatch({
        type:RE_SET_ADDRESS_FILED ,

    })

}

    














/////customer details ends /////////////////
 export const getAllCustomerExchange = (data)=>dispatch=>{
 
    return axios.get("/api/customerexchangedetail",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_EXCHANGE_DATA,
            payload:res.data,

        })
    })
}
 export const saveReturnReasonMethod = (data)=>dispatch=>{
 
    return axios.post("/api/add-customer-reason",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_CUSTOMER_RETURN_REASON,
                payload:res.data   
            })
        })  

}
 export const getAllReturnReasonMethods = () =>dispatch => {
    return axios.get("/api/customer-reason-list",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_CUSTOMER_RETURN_REASON,
            payload:res.data,

        })
    })

 }
 export const saveTermsMethod = (data)=>dispatch=>{
 
    return axios.post("/api/add-customer-term",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_CUSTOMER_TERMS,
                payload:res.data   
            })
        })  

}
 export const getAllTermsMethods = () =>dispatch => {
    return axios.get("/api/customer-term-list",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_CUSTOMER_TERMS,
            payload:res.data,

        })
    })

 }
 export const saveReasonMethod = (data)=>dispatch=>{
 
    return axios.post("/api/add-customer-account-reason",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_CUSTOMER_REASON,
                payload:res.data   
            })
        })  

}
 export const getAllReasonMethods = () =>dispatch => {
    return axios.get("/api/customer-account-reason-list",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_CUSTOMER_REASON,
            payload:res.data,

        })
    })

 }
 export const saveStatusMethod = (data)=>dispatch=>{
 
    return axios.post("/api/add-customer-account-status",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_CUSTOMER_STATUS,
                payload:res.data   
            })
        })  

}
 export const getAllStatusMethods = () =>dispatch => {
    return axios.get("/api/customer-account-status-list",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_CUSTOMER_STATUS,
            payload:res.data,

        })
    })

 }
export const saveDeliveryMethod = (data)=>dispatch=>{
 
    return axios.post("/api/add-customer-delivery-method",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_CUSTOMER_DELIVERY,
                payload:res.data   
            })
        })  

}
 export const getAllDeliveryMethods = () =>dispatch => {
    return axios.get("/api/customer-delivery-method-list",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_CUSTOMER_DELIVERY_LIST,
            payload:res.data,

        })
    })

 }
export const handleCustomerTypeDelete = (id,apiName)=>dispatch => {
    let plantCategoryObject={}
    return axios.post(`/api/${apiName}/${id}`,plantCategoryObject,config).then(res=>{ 
        console.log(res)
    // dispatch({
    //         type:HANDLE_DRAG_CUSTOMER_CATEGORY,
    //         payload:res.data

    //     })
    })
}

 export const handleDragDropCustomer = (data,type) =>dispatch=>{
    console.log(data)
    let plantCategoryObject={}
    // plantCategoryObject.name=data
  
    if(data.status == 1){
        plantCategoryObject.status=0
    }
    else {
        plantCategoryObject.status=1
    }
    // update-customer-type
    return axios.post(`/api/${type}/${data.id}`,plantCategoryObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_DRAG_CUSTOMER_CATEGORY,
            payload:res.data

        })
    })
}
export const getAllCustomerType = ()=>dispatch=>{
    return axios.get("/api/customer-type-list",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_ALL_CUSTOMER_TYPES,
            payload:res.data,

        })
    })

}
export const saveCustomerType = (data)=>dispatch=>{
    return axios.post("/api/add-customer-type",data,config).then(res=>{ 
       
        dispatch({
                type:ADD_CUSTOMER_TYPE,
                payload:res.data   
            })
        })      
    }
 export const savecustomPrintData = (data) => dispatch =>{
    axios.post("/api/add-tag",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_PRINT_DATA,
                payload:res.data   
            })
        })

 }
 export const saveFinanceExchangeData =(data)=>dispatch =>{
    console.log(data)
    axios.post("/api/add-customerexchangedetail",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_FINANCES_DATA,
                payload:res.data   
            })
        })

 }
 export const getIntrestData =(data)=>dispatch =>{
        axios.get("/api/customerorderinvoice",config).then(res=>{ 
            console.log(res.data)
        dispatch({
                type:GET_INTEREST_DATA,
                payload:res.data,
    
            })
        })

 }
 export const getPrintData =(data)=>dispatch =>{
    axios.get("/api/show-tag",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_PRINT_DATA,
            payload:res.data,

        })
    })

}
 export const saveIntrestData =(data)=>dispatch =>{
    axios.post("/api/add-customerorderinvoice",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_INTEREST_DATA,
                payload:res.data   
            })
        })

 }
 export const saveNoticationData = (data)=>dispatch=>{
    console.log(data)
    axios.post("/api/add-customernotification",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_NOTIFICATION,
                payload:res.data   
            })
        })
 }
 export const getEmailData =()=>dispatch => {
    axios.get("/api/customerquotereminders",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_EMAIL_NOTIFICATION,
            payload:res.data,

        })
    })

 }
 export const saveEmailData=(data)=>dispatch=>{
    console.log(data)
    axios.post("/api/add-customerquotereminder",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_EMAIL,
                payload:res.data   
            })
        })

 }

 export const getNotificationData = ()=>dispatch=>{
    axios.get("/api/customernotifications",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_CUSTOMER_NOTIFICATION,
            payload:res.data,

        })
    })
 }
 export const getAllCustomer = (dataType) => dispatch => {
    return axios.get("/api/customers-list",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_CUSTOMER_LIST,
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
               payload:res.data.data.user   
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
  export const handleRadioFilter = (data)=>{
    //   if()
      return{
          type: FILTER_DATA_BY_RADIO,
          actionType:data
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
//   export const dataChange = ()=>{
//       return {
//           type:"@@redux-form/BLUR",

//       }
//   }



/// cutomer