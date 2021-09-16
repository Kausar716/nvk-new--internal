
import _ from 'lodash';
import {

    CREATE_SUPPLIER_ADDRESS,
    GET_ALL_SUPPLIER_ADDRESS,
    GET_SPECIFIED_SUPPLIER_ADDRESS,
    UPDATE_SUPPLIER_ADDRESS,
    DELETE_SUPPLIER_ADDRESS ,


} from '../../src/actions/types';


export default (state={}, action)=>{
    switch (action.type){

        case GET_ALL_SUPPLIER_ADDRESS:
            return {...state, ..._.mapKeys(action.payload, 'id')};

        case GET_SPECIFIED_SUPPLIER_ADDRESS:
            return {...state, [action.payload.id]: action.payload};

        case CREATE_SUPPLIER_ADDRESS:
            return {...state,[action.payload.id]: action.payload};

        case UPDATE_SUPPLIER_ADDRESS:
            return{...state, [action.payload.id]: action.payload};

        case DELETE_SUPPLIER_ADDRESS:
            return _.omit(state, action.payload)


        default:
            return state;
    }
}