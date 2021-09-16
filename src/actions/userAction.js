import {
    GET_USERS_LIST,
    ADD_USER,   
    config,
    axios,
    SHOW_USER, 
    UPDATE_USER,
    UPLOAD_USER_IMAGE,
    REMOVE_USER_IMAGE,
    DELETE_USER ,
    DISPLAY_SELECTED_LISTS,
    //HANDLE_USERACCESS_INPUT_EXCHANGE
   } from './types';
   
//    export const getUsersList = (dispatch) => {
    export const getUsersList = () => dispatch => {
       axios.get("/api/users-list",config).then(res=>{ 
           console.log(res)
           
        
           dispatch({
                   type:GET_USERS_LIST,
                   payload:res.data.data
       
               })
           })
   }
//    export const showUser = id =>{

    // export const handleUserAccessExchnageData =(data,id,dataType)=>dispatch=>{
    //     dispatch({
    //         type:HANDLE_USERACCESS_INPUT_EXCHANGE,
    //         data:data,
    //         id:id,
    //         dataType:dataType
    
    //     })
    
    // }
    export const showUser = (id) => dispatch => {
       axios.get(`/api/show-user/${id}`,config).then(res=>{     
           dispatch({
                   type:SHOW_USER,
                   payload:res.data    
               })
           })
   }

   export const displaySelectedList=(displaySelectedList)=>dispatch=>{

    dispatch({
        type:DISPLAY_SELECTED_LISTS,
        displaySelectedList:displaySelectedList,

        
    })
   }

   export const addUser = (userData) => dispatch => {
      
       console.log(userData)
    //    userData.role="1"
       userData.password="pass"
       userData.status="1"
       return axios.post(`/api/add-user`,userData,config).then(res=>{  
        console.log(res)  
      
        dispatch({
                type:ADD_USER,
                payload:res.data    
            })
        })
        .catch(message=>{
            console.log(message)
        })
        
    }

    export const updateUser = (userData) => dispatch => {
     
        console.log(userData)
        // userData.role="1"
        // userData.password="pass"
        // userData.status="1"
        return axios.post(`/api/update-user/${userData.id}`,userData,config).then(res=>{  
         console.log(res)  
       
         dispatch({
                 type:UPDATE_USER,
                 payload:res.data    
             })
         })
         .catch(message=>{
             console.log(message)
         })
         
   }
   
   export const uploadImage = (imageFile,userId) => dispatch => {
       console.log(imageFile)
    //    let imageObject = {}
    //    imageObject.user_id = userId
    //    imageObject.avatar = imageFile
       const imageObject = new FormData()
       imageObject.append("user_id", userId);
       imageObject.append("avatar", imageFile);
       
       
       console.log(imageObject)
   return axios.post("/api/upload-image",imageObject,config).then(res=>{ 
        dispatch({
                type:UPLOAD_USER_IMAGE,
                payload:res.data.data
    
            })
        }).catch(err=>{
            console.log(err)
        })
}
export const removeImage = (userId) => dispatch => {
    console.log(userId)
   
    let userObj={}
    userObj.user_id = userId
    return axios.post("/api/remove-image",userObj,config).then(res=>{ 
 
     
     dispatch({
             type:REMOVE_USER_IMAGE,
             payload:res.data.data
 
         })
     }).catch(err=>{
         console.log(err)
     })
}
export const deleteUser = (userId) => dispatch => {
    console.log(userId)
   
    let userObj={}
    userObj.user_id = userId
    return axios.post(`/api/delete-user/${userId}`,userObj,config).then(res=>{  
     
     dispatch({
             type:DELETE_USER,
             payload:res.data.data
 
         })
     }).catch(err=>{
         console.log(err)
     })
}