import { keys } from '@material-ui/core/styles/createBreakpoints';
import { formValues } from 'redux-form';

// import smAddress from '../components/apis/smAddress'


// import {contactsSuppliers} from '../components/SupplierManagement/Supplier_Contacts/data';
import {


    GET_SUPPLIER_LIST, 
    SET_SUPPLIER_PAGE_NUMBER,
    FILTER_SUPPLIER_DATA_BY_RADIO,
    FILTER_SUPPLIER_BY_SEARCH,
    FILTER_SUPPLIER_BY_ALPHA, 
    UPDATE_SUPPLIER_CONTACT_CHECK,
    UPDATE_SUPPLIER_ADDRESS_CHECK,
    GET_CUSTOMER_LIST, 
    ADD_CUSTOMER, 
    SHOW_CUSTOER, 
    UPDATE_CUSTOMER,
    DELETE_CUSTOMER,
    SET_PAGE_NUMBER,
    FILTER_DATA_BY_RADIO,
    FILTER_DATA_BY_SEARCH,
    FILTER_DATA_BY_ALPHA,

    ADD_SUPPLIER_CONTACT_ERROR ,
    ADD_SUPPLIER_CONTACT_LOADING,
    ADD_SUPPLIER_CONTACT_SUCCESS ,
   
    DELETE_SUPPLIER_CONTACT_ERROR ,
    DELETE_SUPPLIER_CONTACT_LOADING ,
    DELETE_SUPPLIER_CONTACT_SUCESS ,
       
    EDIT_SUPPLIER_CONTACT_ERROR,
    EDIT_SUPPLIER_CONTACT_LOADING ,
    EDIT_SUPPLIER_CONTACT_SUCCESS,
       
    FETCH_SUPPLIER_CONTACT_ERROR ,
    FETCH_SUPPLIER_CONTACT_LOADING,
    FETCH_SUPPLIER_CONTACT_SUCCESS ,



    ADD_SUPPLIER,
    ADD_SUPPLIER_DELIVERY_LOCATION,
    // ADD_SUPPLIER_CONTACT ,
    ADD_SUPPLIER_CATEGORY, 
    GET_SUPPLIER_CATEGORY,
    CREATE_SUPPLIER_ADDRESS,
    ADD_SUPPLIER_REASON, 
   
    GET_ALL_SUPPLIER ,
    // GET_ALL_SUPPLIER_ADDRESS,
    // GET_ALL_SUPPLIER_CONTACT ,
    GET_ALL_SUPPLIER_DELIVERY_LOCATION, 
    GET_ALL_SUPPLIER_CATEGORIES,
    GET_ALL_SUPPLIER_REASONS, 
    GET_SPECIFIED_SUPPLIER_DELIVERY_LOCATION ,
    GET_SPECIFIED_SUPPLIER_REASON, 
    GET_SPECIFIED_SUPPLIER_ADDRESS,
    GET_SPECIFIED_SUPPLIER_CONTACT,
    GET_SPECIFIED_SUPPLIER ,
    GET_SPECIFIED_SUPPLIER_CATEGORY, 
   
    UPDATE_SUPPLIER ,
    UPDATE_SUPPLIER_REASON ,
    // UPDATE_SUPPLIER_ADDRESS,
    // UPDATE_SUPPLIER_CONTACT,
    UPDATE_SUPPLIER_DELIVERY_LOCATION, 
    UPDATE_DELIVERY_CATEGORY,
   
    DELETE_SUPPLIER ,
    DELETE_SUPPLIER_REASON, 
    DELETE_SUPPLIER_ADDRESS ,
    DELETE_SUPPLIER_DELIVERY_LOCATION,
    // DELETE_SUPPLIER_CONTACT,
    DELETE_SUPPLIER_CATEGORY,
   
    REMOVE_SUPPLIER_REASON_FROM_ACTIVE_TO_INACTIVE ,
    REMOVE_SUPPLIER_REASON_FROM_INACTIVE_TO_ACTIVE, 
    ADD_ALL_SUPPLIER_REASON_FROM_INACTIVE_ACTIVE, 

    FETCH_SUPPLIER_ERROR,
    FETCH_SUPPLIER_LOADING,
    FETCH_SUPPLIER_SUCCESS,
    ADD_FINANCES_SUPPLIER_DATA,
    HANDLE_SUPPLIER_INPUT_EXCHANGE,

    EDIT_SUPPLIER_ERROR,
    EDIT_SUPPLIER_SUCCESS,

    DELETE_SUPPLIER_ERROR,
    DELETE_SUPPLIER_SUCCESS,
    ADD_SUPPLIER_ACCOUNTS,
    GET_SUPPLIER_ACCOUNTS,
 ADD_SUPPLIER_LOCATION ,
GET_SUPPLIER_LOCATION ,
GET_EXCHANGE_SUPPLIER_DATA,
SHOW_SPECIFIC_SUPPLIER_REASON,
HANDLE_REASON_INPUT_ACTION,
SHOW_SPECIFIC_SUPPLIER_CATEGORY,
UPDATE_SUPPLIER_CATEGORY,
TYPE_OF_SUPPLIER_ACTION,
GET_SUPPLIER_BY_ID,
RESET_SUPPLIER_FILED,
RESET_SUPPLIER_CONTACT,



//supplier contacts

ADD_SUPPLIER_CONTACT,
GET_SUPPLIER_CONTACT,
GET_ALL_SUPPLIER_CONTACT,
DELETE_SUPPLIER_CONTACT,
UPDATE_SUPPLIER_CONTACT,
HANDLE_SUPPLIER_CATEGORY_SORT,
HANDLE_SUPPLIER_REASON_SORT,
HANDLE_SUPPLIER_LOCATION_SORT,


//supplier address
ADD_SUPPLIER_ADDRESS,
GET_SUPPLIER_ADDRESS,
GET_ALL_SUPPLIER_ADDRESS,
// DELETE_SUPPLIER_ADDRESS,
UPDATE_SUPPLIER_ADDRESS,
RESET_SUPPLIER_DATA,
    config,
    axios,

} from './types';

//supplier contact information
// export const deleteSupplier= (id) => dispatch => {
//     // console.log(customerData)
//     return axios.post(`/api/delete-customer/${id}`,null,config).then(res=>{ 
//         console.log(res)
//         dispatch({
//                 type:DELETE_SUPPLIER,
//                 payload:res.data   
//             })
//         }) 
     
// }


export const supplierCategorySort =(fromId, toId,type)=>dispatch => {
    let attributeObject={}
    attributeObject.from=fromId;
    attributeObject.to=toId;
    attributeObject.position=type;
    return axios.post(`/api/drag-sort-supplier-category`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_SUPPLIER_CATEGORY_SORT,
            payload:res.data
        })
    })

}
export const supplierReasonSort =(fromId, toId,type)=>dispatch => {
    let attributeObject={}
    attributeObject.from=fromId;
    attributeObject.to=toId;
    attributeObject.position=type;
    return axios.post(`/api/drag-sort-supplier-reason`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_SUPPLIER_REASON_SORT,
            payload:res.data
        })
    })

}
export const supplierLocationSort =(fromId, toId,type)=>dispatch => {
    let attributeObject={}
    attributeObject.from=fromId;
    attributeObject.to=toId;
    attributeObject.position=type;
    return axios.post(`/api/drag-sort-supplier-delivery`,attributeObject,config).then(res=>{ 
        console.log(res)
    dispatch({
            type:HANDLE_SUPPLIER_LOCATION_SORT,
            payload:res.data
        })
    })

}
export const resetSupplierData=()=>dispatch=>{
    dispatch({
        type:RESET_SUPPLIER_DATA,
        
    })
   }






export const deleteSupplier= (id)=>dispatch => {
    return axios.post(`/api/delete-supplier/${id}`,null,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:DELETE_SUPPLIER,
                payload:res.data   
            })
        }) 


}
export const getAllAddress =(id)=>dispatch => {
    if(id !==0){
        return axios.get(`api/supplier-addresses?supplier_id=${id}`,config).then(res=>{ 
            console.log(res.data)
        dispatch({
                type:GET_ALL_SUPPLIER_ADDRESS,
                payload:res.data,
    
            })
        })

    }else{

    }


}

export const deleteContact= (id)=>dispatch => {
    // return axios.post(`/api/delete-supplier-contact/${id}`,null,config).then(res=>{ 
    //     console.log(res)
        dispatch({
                type:DELETE_SUPPLIER_CONTACT,
                payload:id   
            })
        // }) 


}
export const deleteSupplierAddress= (id)=>dispatch => {
    // return axios.post(`/api/delete-supplier-address/${id}`,null,config).then(res=>{ 
    //     console.log(res)
        dispatch({
                type:DELETE_SUPPLIER_ADDRESS,
                payload:id   
            })
        // }) 


}
export const addSupplierAddress= (data)=>dispatch => {
    // return axios.post(`/api/add-supplier-address`,data,config).then(res=>{ 
        // console.log(res)
        dispatch({
                type:ADD_SUPPLIER_ADDRESS,
                payload:data   
            })
        // }) 

}
export const getAddressById =(id)=>dispatch => {
    // return axios.get(`/api/supplier-address/${id}`,config).then(res=>{ 
    //     console.log(res.data)
    dispatch({
            type:GET_SUPPLIER_ADDRESS,
            payload:id,

        })
    // })
    
}
export const UpdateAddress =(data)=>dispatch => {
    // let id = data.id
    // delete data.id
    // return axios.post(`/api/update-supplier-address/${id}`,data,config).then(res=>{ 
    //     console.log(res)
        dispatch({
                type:UPDATE_SUPPLIER_ADDRESS,
                payload:data   
            })
        // }) 
    
}
export const UpdateAddressData =(data)=>dispatch => {
    // let id = data.id
    // delete data.id
    // return axios.post(`/api/update-supplier-address/${id}`,data,config).then(res=>{ 
    //     console.log(res)
        dispatch({
                type:UPDATE_SUPPLIER_ADDRESS_CHECK,
                payload:data   
            })
        // }) 
    
}
export const getAddressBysupplierId =(id)=>dispatch => {
  
    
}
export const resetSupplierContact=()=>dispatch => {
    dispatch({
        type:RESET_SUPPLIER_CONTACT
    })

}
export const getSupplierContact=(id)=>dispatch => {
    // return axios.get(`api/supplier-contact/${id}`,config).then(res=>{ 
        // console.log(res.data)
    dispatch({
            type:GET_SUPPLIER_CONTACT,
            payload:id,

        })
    // })


}
export const getAllSuppliersContact=(id)=>dispatch => {
    if(id !==0){
        return axios.get(`api/suppliers-contacts?supplier_id=${id}`,config).then(res=>{ 
            console.log(res.data)
        dispatch({
                type:GET_ALL_SUPPLIER_CONTACT,
                payload:res.data,
    
            })
        })

    }else{

    }

}
export const updateSupplierContactData =(data)=>dispatch => {
    dispatch({
        type:UPDATE_SUPPLIER_CONTACT_CHECK,
        payload:data   
    })

}
export const updateSupplierContact=(data)=>dispatch => {
    // let id = data.id
    // delete data.id
    // return axios.post(`/api/update-supplier-contact/${id}`,data,config).then(res=>{ 
        // console.log(res)
        dispatch({
                type:UPDATE_SUPPLIER_CONTACT,
                payload:data   
            })
        // }) 

}

// export const deleteSuppluerContact=()=>dispatch => {

// }

export const addSuppplierContact=(data)=>dispatch => {
    // return axios.post(`/api/add-supplier-contact`,data,config).then(res=>{ 
        // console.log(res)
        dispatch({
                type:ADD_SUPPLIER_CONTACT,
                payload:data   
            })
        // }) 

}


export const resetSupplierFilds = ()=>dispatch=>{
    dispatch({
        type:RESET_SUPPLIER_FILED,
        // payload:res.data,

    })

}
export const getsupplierById = (id) =>dispatch => {
    return axios.get(`/api/supplier/${id}`,config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_SUPPLIER_BY_ID,
            payload:res.data.data.supplier,

        })
    })

}
export const updateSupplierData = (data) =>dispatch => {
    let id = data.id
    delete data.id
    console.log(data)
    return axios.post(`/api/update-supplier/${id}`,data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:UPDATE_SUPPLIER,
                payload:res.data   
            })
        }) 

}
export const typeOfsupplierActionShow = (type) =>dispatch=>{
    dispatch({
      type:TYPE_OF_SUPPLIER_ACTION,
      action:type
    })
}
//CREATE
export const getAllSupplierExchange = ()=>dispatch=>{
    
 
    return axios.get("/api/supplierexchangedetail",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_EXCHANGE_SUPPLIER_DATA,
            payload:res.data,

        })
    })
}
export const saveSupplierLocationMethod = (data)=>dispatch=>{
 
    return axios.post("/api/add-delivery-supplier",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_SUPPLIER_LOCATION,
                payload:res.data   
            })
        })  

}
 export const getAllSupplierLocationMethods = () =>dispatch => {
    return axios.get("/api/delivery-suppliers",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_SUPPLIER_LOCATION,
            payload:res.data,

        })
    })

 }
export const saveSupplierReasonMethod = (data)=>dispatch=>{
 
    return axios.post("/api/add-supplier-reasons",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_SUPPLIER_ACCOUNTS,
                payload:res.data   
            })
        })  

}
 export const getAllSupplierReasonMethods = () =>dispatch => {
    return axios.get("/api/supplier-reasonses",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_SUPPLIER_ACCOUNTS,
            payload:res.data,

        })
    })

 }


// export const handleSubAttributeUpdate = (id, data) =>dispatch=>{
//     //debugger;
//     console.log(id)
//     let attributeObject={}

//     return axios.post(`/api/update-subattribute/${id}`,data,config).then(res=>{ 
//        // debugger;
//         console.log(res)
//     dispatch({
//             type:HANDLE_UPDATE_ATTRIBUTE,
//             payload:res.data
//         })
//     })
// }


 export const updateSupplierReasonMethods = (id, data) =>dispatch => {
    return axios.post(`/api/update-supplier-reasons/${id}`,data,config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:UPDATE_SUPPLIER_REASON,
            payload:res.data,

        })
    })

 }


//
export const updateSupplierLocation = (id, data) =>dispatch => {
    //debugger;
   return axios.post(`/api/update-delivery-supplier/${id}`,data,config).then(res=>{ 
      // debugger;
       console.log(res.data)
   dispatch({
           type:UPDATE_SUPPLIER_DELIVERY_LOCATION,
           payload:res.data,

       })
   })

}


export const showSpecificDeliveryLocation = (id) => dispatch => {
   axios.get(`api/delivery-supplier/${id}`,config).then(res=>{ 
     
       console.log(res.data)
   dispatch({
           type:GET_SPECIFIED_SUPPLIER_DELIVERY_LOCATION,
           payload:res.data
       })
   })
}
//









 export const updateSupplierCategory = (id, data) =>dispatch => {
     //debugger;
    return axios.post(`/api/update-supplier-category/${id}`,data,config).then(res=>{ 
        // debugger;
        console.log(res.data)
    dispatch({
            type:UPDATE_SUPPLIER_CATEGORY,
            payload:res.data.data,

        })
    })

 }


export const showSpecificSubAttribute = (id) => dispatch => {
    axios.get(`api/supplier-reasons/${id}`,config).then(res=>{ 
      
        console.log(res.data)
    dispatch({
            type:SHOW_SPECIFIC_SUPPLIER_REASON,
            payload:res.data
        })
    })
}

export const showSpecificCategorySubAttribute = (id) => dispatch => {
    axios.get(`api/supplier-category/${id}`,config).then(res=>{ 
      
        console.log(res.data)
    dispatch({
            type:SHOW_SPECIFIC_SUPPLIER_CATEGORY,
            payload:res.data
        })
    })
}



 export const saveSupplierCategoryMethod = (data)=>dispatch=>{
 
    return axios.post("/api/add-supplier-category",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_SUPPLIER_CATEGORY,
                payload:res.data   
            })
        })  

}
 export const getAllSupplierCategoryMethods = () =>dispatch => {
    return axios.get("/api/supplier-categories",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_SUPPLIER_CATEGORY,
            payload:res.data,

        })
    })

 }



 export const handleReasonInputAction = (name,value) =>dispatch=>{
    
    console.log("handleReasonInputAction",name, value)
   // debugger
 dispatch({
     type:HANDLE_REASON_INPUT_ACTION,
     name:name,
     value:value    
 })
}



export const handleSupplierExchnageData =(data,id,dataType)=>dispatch=>{
    dispatch({
        type:HANDLE_SUPPLIER_INPUT_EXCHANGE,
        data:data,
        id:id,
        dataType:dataType

    })

}


export const saveSupplierData = (data)=>dispatch =>{
    console.log(data)
    axios.post("/api/add-supplierexchangedetail",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_FINANCES_SUPPLIER_DATA,
                payload:res.data   
            })
        })

}
export const getAllSuppliers = () => dispatch => {
    return axios.get("/api/suppliers",config).then(res=>{ 
        console.log(res.data)
    dispatch({
            type:GET_SUPPLIER_LIST,
            payload:res.data,
            dataType:"dataType"

        })
    })
}
export const setPageNumber = (pageNumber) => {
    return{
          type:SET_SUPPLIER_PAGE_NUMBER,
          pageNumber:pageNumber,
      }
  
  }
  export const handleRadioFilter = (data)=>{
    //   if()
      return{
          type: FILTER_SUPPLIER_DATA_BY_RADIO,
          actionType:data
      }
  }
  export const handleSearchFilter = (data,resetAction)=>{
    //   if()
      return{
          type:FILTER_SUPPLIER_BY_SEARCH,
          searchData:data,
          resetAction:resetAction
      }
  }
  export const handleAplhabetFilter = (data)=>{
    //   if()
      return{
          type:FILTER_SUPPLIER_BY_ALPHA,
          alphaData:data
      }
  }

//   export const getAllSupplierAction = ()=>{
//     return{
//         type:FILTER_SUPPLIER_BY_ALPHA,
//         alphaData:"data"
//     }

//   }

export const createSupplierInfo =(supplierInfo)=>{
    const data ={
        supplierName:supplierInfo.supplier_name,
        fax:supplierInfo.fax,
        alternative_ID: supplierInfo.alternative_id,
        wesite:supplierInfo.website,
        SupplierNotes:supplierInfo.supplier_notes,
    }

    return (dispatch)=>{
        return  axios.post("/api/add-supplier",config, data)
            .then(response =>{
                
                   // debugger;
            }).catch(error =>{

            });

    }

}




export const fetchSupplierSuccess = (data)=>{
    return{
        type:"FETCH_SUPPLIER_SUCCESS",
        payload:data,
    }
}



export const fetchSupplierLoading =(data) =>{
    return{
        type:FETCH_SUPPLIER_LOADING,
        payload:data,
    }
}


export const fetchSupplierError =(data) =>{

    // debugger;
    return{
        type:FETCH_SUPPLIER_ERROR,
        payload:data,
    }
}



export const getAllSupplierAction = () => dispatch => {
    axios.get("/api/suppliers",config).then(res=>{ 
    dispatch({
            type:GET_ALL_SUPPLIER,
            payload:res.data

        })

        // .catch(error =>{
        //     const errorMsg = error.message
        // })
    })
}


const normalizeResponse=(data)=>{
    const arr = data.map(item=>{
        const key = Object.keys(item);

        keys.forEach(k=>{
            item[k.toLocaleLowerCase()] =item[k];
            delete item[k];
        })

        return item;
    })

    return arr;
}


export const getSupplierData =()=>{
    let isLoading = true;

    return(dispatch)=>{
        dispatch(fetchSupplierLoading(isLoading));

        return axios.get("/api/suppliers",config)
            .then(response =>{
                const data = normalizeResponse(response.data.data.active);

        // dispatch({
        //     type: 'GET_ALL_SUPPLIER',
        //     payload:response.data
        // })

                    dispatch(fetchSupplierSuccess(data));
                    isLoading = false;
                    dispatch(fetchSupplierLoading(isLoading));
        
    })

    .catch(error =>{

        const errorPayload={};
        errorPayload['statusText'] =error.response.statusText;
        errorPayload['status'] =error.response.status;

        dispatch(fetchSupplierError(errorPayload));

        console.log("getSupplierData ERROR", error);
        isLoading=false;
        dispatch(fetchSupplierLoading(isLoading));
     });
    
    };
    
}


export const addSupplierDetails = (data)=>dispatch=>{
    return axios.post("/api/add-supplier",data,config).then(res=>{ 
        console.log(res)
        dispatch({
                type:ADD_SUPPLIER,
                payload:res.data   
            })
        }) 




}



//CONTACT DETAILS HERE


export const fetchContactSupplierSuccess =(data)=>{
//   debugger;

    return{
        type: FETCH_SUPPLIER_CONTACT_SUCCESS,
        payload: data,
    }
} 

export const ferchSupplierContactsLoading = (data)=>{
        // debugger
    return{
        type: FETCH_SUPPLIER_CONTACT_LOADING,
        payload:data,
    };
};


export const fetchSupplierContactError=(data)=>{
    // debugger
    return {
        type:FETCH_SUPPLIER_CONTACT_ERROR,
        payload:data,
    }
}


const normalizeResponse_contact=(data)=>{
    const arr = data.map(item=>{
        const key = Object.keys(item);

        keys.forEach(k=>{
            item[k.toLocaleLowerCase()] =item[k];
            delete item[k];
        })

        return item;
    })

    return arr;
}


export const fetchContactSupplier=()=>{
       


    let isLoading = true;

    return (dispatch)=>{
        // dispatch(ferchSupplierContactsLoading(isLoading));
       return axios.get("api/suppliers-contacts",config)
                .then(response=>{
                    //debugger;
                     console.log("RESPONSEHERE",response )
                    
                            const data =normalizeResponse_contact(response.data.data.active);
                            dispatch(fetchContactSupplierSuccess(data));
                            isLoading=false;
                            dispatch(ferchSupplierContactsLoading(isLoading));
                }).catch(error=>{
                            const errorPayload = {};
                            errorPayload['statusText'] =error.response.statusText;
                            errorPayload['status'] =error.response.status;
                            dispatch(fetchSupplierContactError(errorPayload))

                        isLoading=false;
                        dispatch(ferchSupplierContactsLoading(isLoading));

                });
    }
}



//CREATE
export const createSupplierContactInfoSuccess =(data)=>{

    return{
        type:ADD_SUPPLIER_CONTACT_SUCCESS,
        payload:data,
    }
}


export const createSupplierContactInfoError =(data)=>{
    return {
        type:ADD_SUPPLIER_CONTACT_ERROR,
        payload:data,

    }
}



export const createSupplierContactInfo =(contact)=>{
      //debugger;
        if(contact.id){
            const data = {
                id:contact.id,
                supplier_id:1,
                contact_name: contact.contact_name,
                contact_email:contact.contact_email,
                phone1:contact.phone1,
                phone2:contact.phone2,
                status:contact.status,
            };


            // return(dispatch)=>{
            //     dispatch(editSupplierContactInfo(data))
            // }

        }

        else{

            const data={
                supplier_id:1,
                contact_name: contact.contact_name,
                contact_email:contact.contact_email,
                phone1:contact.phone1,
                phone2:contact.phone2,
                status:contact.status,
        
            };
                return(dispatch)=>{
                    console.log("postapi", data)
                        return axios.post(`api/add-supplier-contact`,data, config)
                            .then(response=>{
                                
                                console.log("addcontactSupplier Response", response)
                                const id = response.data.data.id;
                                console.log("id of created supplier here", id);
                                
                                axios.get(`api/supplier-contact/${id}`,config)
                                
                                    .then(response=>{
                                     
                                            dispatch(createSupplierContactInfoSuccess(response.data.data));
        
                                    }).catch(error=>{
                                        const errorPayload ={}
                                        errorPayload['statusText'] =error.response.statusText;
                                        errorPayload['status'] =error.response.status;
                                        dispatch(createSupplierContactInfoError(error));
                                    })
        
                            }).catch(error=>{
                                const errorPayload ={}
                                errorPayload['statusText'] =error.response.statusText;
                                errorPayload['status'] =error.response.status;
                                dispatch(createSupplierContactInfoError(error));
                            });
                            
                        
                }

        }

  

}



//EDIT

// export const editSupplierContactInfoError =(data)=>{
//     return{
//         type:EDIT_SUPPLIER_CONTACT_ERROR,
//         payload:data
//     }

// }

// export const editSupplierContactInfoSuccess =(data)=>{
//     return{
//         type:EDIT_SUPPLIER_CONTACT_SUCCESS,
//         payload:data,
//     }
// }


// export const  editSupplierContactInfo =(data)=>{

//     console.log("editSupplierContactInfo", data)
//     const id=data.id;


//     return(dispatch)=>{
//         return axios.post(`api/update-supplier-contact/${id}`,data, config)
                   
//             .then(()=>{
//                     return axios.get(`api/supplier-contact/${id}`,data, config)
//                         .then(response=>{
//                            dispatch(editSupplierContactInfo(response.data.data));
//                         }).catch(error=>{
//                             const errorPayload ={};
//                             errorPayload['statusText'] =error.response.statusText;
//                             errorPayload['status'] =error.response.status;
//                             dispatch(editSupplierContactInfoError(errorPayload));
//                         })
//             }).catch((error)=>{

                // const errorPayload ={};
                // errorPayload['statusText'] =error.response.statusText;
                // errorPayload['status'] =error.response.status;
                // dispatch(editSupplierContactInfoError(errorPayload));

//             })
//     }
// }


//DELETE



//FETCH



//ADDRESS SUPPLIER STARTS FROM HERE


// export const createAddress =formValues => async (dispatch) =>{
//     const data={
//         supplier_id:1,
//         contact_name:'Bangalore',
//         shipping_address:'Bangalore',
//         billing_address:'bangalore',
//         status:1,
//     };
//     const FinalValue = {...data, ...formValues}
//         const response = await smAddress.post('/api/add-supplier-address', FinalValue, config);
// console.log("CETEADDRESS",response )
//         dispatch({type:CREATE_SUPPLIER_ADDRESS, payload:response.data.data});  
    
// };
// export const getAddress =() =>async dispatch=>{
//     const response = await smAddress.get('/api/supplier-addresses', config);
//     // debugger;
//         console.log("responeforGETALL", response)
//     dispatch({type:GET_ALL_SUPPLIER_ADDRESS, payload:response.data.data.active}); 
// };


// export const getSpecifiedAddress=(id)=> async dispatch =>{
//     const response = await smAddress.get(`/api/supplier-address/${id}`, config);
//     dispatch({type:GET_SPECIFIED_SUPPLIER_ADDRESS, payload:response.data.data});
// };

// export const updateAddress=(id, formValues)=>async dispatch=>{
//     const data={
//         supplier_id:1,
//         contact_name:'Bangalore',
//         shipping_address:'Bangalore',
//         billing_address:'bangalore',
//         status:1,
//     };
//     const FinalValue = {...data, ...formValues}
//     const response = await smAddress.put(`/api/update-supplier-address/${id}`,FinalValue , config);
//     dispatch({type:UPDATE_SUPPLIER_ADDRESS, payload:response.data.data});
// };



// export const deleteAddress=(id)=>async dispatch=>{
//     await smAddress.delete(`/api/delete-supplier-address/${id}`);
//     dispatch({type:DELETE_SUPPLIER_ADDRESS,payload:id});
// };



// export const onClickValueID =(id)=>{



// }





// export const createContact = (formValues) => dispatch => {

//     const data={
//         supplier_id:1,
//         contact_name: '',
//         contact_email:'',
//         phone1:'',
//         status:1,
//     };
//     let error = []
//     axios.post(`/api/add-supplier-contact/${id}?type=product`,null,config).then(res=>{ 
//         dispatch(getAllProductAction())
//         dispatch(getAllSkuAction())
//         // dispatch(deleteSkuAction(id))
//         dispatch({
//             type:DELETE_PRODUCT_ACTION
//         })
//         error.push("Product deleted successfully",)
//         dispatch({
//             type:ERROR_HANDLE,
//             message:error,
//             status:true
//         })
//         })
