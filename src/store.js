import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const initialSatate = {}

const middleware = [thunk]


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const rootReducer = combineReducers({
//     form: formReducer, // mounted under "form"
//   });


const store = createStore(rootReducer, initialSatate,composeEnhancers(
    applyMiddleware(...middleware),
    
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store;