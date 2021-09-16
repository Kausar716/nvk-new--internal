import {GET_DASHBOARD_PAGE,SET_DASHBOARD_PAGE} from '../actions/types'

const initialSatate = {
   selectedPage:"",
   selectedSubmenu:""
  }

 const dashboardReducer = (state = initialSatate, action)=>{
    console.log(action)
    console.log(state)
    // alert(action.type)
    
    switch(action.type){
        // plant page redirects
        case GET_DASHBOARD_PAGE : 
            return{
                ...state,
                payload:state.selectedPage
            }
        case SET_DASHBOARD_PAGE :
            return{
                ...state,
                selectedPage:action.payload
            }  
        default:
                return state
    }

}
export default dashboardReducer