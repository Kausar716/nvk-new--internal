import {
    GET_ROLES_LIST,
    SHOW_ROLE,   
    config,
    axios,
    UPDATE_ROLE,
    DELETE_ROLE,
    ADD_ROLE,
    HANDLE_USER_ACCESS_INPUT_DATA,
    GET_PERMISSION_LIST,
    SHOW_SELECTED_USER,
    UPDATE_USER_PERMISSION ,
    RESET_USERDATA,
    TAB_CHANGE_VALUE,
    DISPLAY_SELECTED_USER,
    HANDLE_USERACCESS_INPUT_EXCHANGE,
    USERACCESS_LIST,
    RESET_USER_SELECT
   } from './types';



 



   export const resetUserData=()=>dispatch=>{
    dispatch({
        type:RESET_USERDATA,
        
    })
   }

   export const resetUserSelect=()=>dispatch=>{
    dispatch({
        type:RESET_USER_SELECT,
        
    })
   }

   export const tabChangeValues=(tabChangeValue)=>dispatch=>{

    dispatch({
        type:TAB_CHANGE_VALUE,
        tabChangeValue:tabChangeValue,

        
    })
   }


   export const handleUserAccessExchnageData =(data,id,dataType)=>dispatch=>{
    dispatch({
        type:HANDLE_USERACCESS_INPUT_EXCHANGE,
        data:data,
        id:id,
        dataType:dataType

    })

}


   //displayselectedUSer
   export const displaySelectedUSERS=(displaySelectedUSER)=>dispatch=>{

    dispatch({
        type:DISPLAY_SELECTED_USER,
        displaySelectedUSER:displaySelectedUSER,

        
    })
   }


   export const userAccessList = (userAccessList) =>dispatch=>{
                console.log(userAccessList)
            dispatch({
                type:USERACCESS_LIST,
                userAccessList:userAccessList,
                
            })
    }


   
//    export const getUsersList = (dispatch) => {
    export const getRolesList = () => dispatch => {
       
       axios.get("/api/roles-list",config).then(res=>{ 
       // debugger
           console.log(res)
           dispatch({
                   type:GET_ROLES_LIST,
                   payload:res.data.data
       
               })
           })
   }



    export const showRole = (id) => dispatch => {
       axios.get(`/api/show-role/${id}`,config).then(res=>{     
           dispatch({
                   type:SHOW_ROLE,
                   payload:res.data    
               })
           })
   }

   export const addRoler = (RoleData) => dispatch => {
       console.log(RoleData)
       RoleData.role="1"
       RoleData.password="pass"
       RoleData.status="1"
       return axios.post(`/api/add-role`,RoleData,config).then(res=>{  
        console.log(res)  
      
        dispatch({
                type:ADD_ROLE,
                payload:res.data    
            })
        })
        .catch(message=>{
            console.log(message)
        })
        
    }

    export const updateRole = (userData) => dispatch => {
        console.log(userData)
        // userData.role="1"
        // userData.password="pass"
        // userData.status="1"
        return axios.post(`/api/update-role/${userData.id}`,userData,config).then(res=>{  
         console.log(res)  
       
         dispatch({
                 type:UPDATE_ROLE,
                 payload:res.data    
             })
         })
         .catch(message=>{
             console.log(message)
         })
         
   }

   export const deleteRole = (userData) => dispatch => {
    console.log(userData)
    // userData.role="1"
    // userData.password="pass"
    // userData.status="1"
    return axios.post(`/api/update-user/${userData.id}`,userData,config).then(res=>{  
     console.log(res)  
   
     dispatch({
             type:DELETE_ROLE,
             payload:res.data    
         })
     })
     .catch(message=>{
         console.log(message)
     })
     
    }
   
    export const getPermissionList = () => dispatch => {
        console.log()
        return axios.get(`/api/permission-list`,config).then(res=>{  
         console.log(res)  
       
         dispatch({
                 type:GET_PERMISSION_LIST,
                 payload:res.data.data    
             })
         })
         .catch(message=>{
             console.log(message)
         })         
        }

        export const handleUserAccessInputAction = (name, id,checked) =>dispatch=>{
            console.log(name,id)
         dispatch({
             type:HANDLE_USER_ACCESS_INPUT_DATA,
             permissionName:name,
             permissionID:id, 
             checked:checked
         })
        }

       


        export const handleUserSelect = (id) =>dispatch=>{
          
            axios.get(`/api/show-user/${id}`,config).then(res=>{ 
                // debugger;    
                dispatch({
                        type:SHOW_SELECTED_USER,
                        selectedUser:res.data    
                    })
                })
        }
        export const handleUserUpdateUserPermission = (id,currentPermission) =>dispatch=>{
            console.log(currentPermission)
            let updateObject = {}
            updateObject.user_id=id
            updateObject.permissions_ids = currentPermission
            return axios.post(`/api/add-user-permission`,updateObject,config).then(res=>{     
                dispatch({
                        type:UPDATE_USER_PERMISSION,
                        selectedUser:res.data    
                    })
                })
        }