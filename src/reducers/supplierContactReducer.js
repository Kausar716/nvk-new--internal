import {

    ADD_SUPPLIER_CONTACT_ERROR ,
    //ADD_SUPPLIER_CONTACT_LOADING,
    ADD_SUPPLIER_CONTACT_SUCCESS ,
   
    // DELETE_SUPPLIER_CONTACT_ERROR ,
    // DELETE_SUPPLIER_CONTACT_LOADING ,
    // DELETE_SUPPLIER_CONTACT_SUCCESS ,
       
    // EDIT_SUPPLIER_CONTACT_ERROR,
    // EDIT_SUPPLIER_CONTACT_LOADING ,
    EDIT_SUPPLIER_CONTACT_SUCCESS,
       
    FETCH_SUPPLIER_CONTACT_ERROR ,
    FETCH_SUPPLIER_CONTACT_LOADING,
    FETCH_SUPPLIER_CONTACT_SUCCESS, 
    //GET_ALL_PRODUCT_ACTION,

   
   }from '../actions/types';


const defaultState={
    contactsSuppliers:[],
    error:null,
    isLoading:false,
    // users:[],
};

const contactReducer=(state=defaultState, action)=>{
    switch(action.type){


        case ADD_SUPPLIER_CONTACT_SUCCESS:
            return {...state, contactsSuppliers:[...state, action.payload] };

        case ADD_SUPPLIER_CONTACT_ERROR:
            return {...state, error:action.payload};

        case EDIT_SUPPLIER_CONTACT_SUCCESS:
            // eslint-disable-next-line no-case-declarations
            const updatedContactSupplier = state.contactsSuppliers.filter(contactsSupplier=>contactsSupplier.id !== action.payload.id)
            return {...state, contactsSuppliers:[...updatedContactSupplier,action.payload]};

        case FETCH_SUPPLIER_CONTACT_SUCCESS:
            // console.log("SuplierFetchingDataa", contactSupplier)
            return {...state, contactsSuppliers: action.payload};

        case FETCH_SUPPLIER_CONTACT_LOADING:
            return {...state, isLoading: action.payload};

        case FETCH_SUPPLIER_CONTACT_ERROR:
            return{...state, error:action.payload};


        // case  ADD_SUPPLIER_CONTACT_SUCCESS:
        //         const users= state.users.concat(action.payload)
        //     return{...state, users}

        default:
            return state;
    }

}

export default contactReducer;