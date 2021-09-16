import {
    GET_ORGANIZATION_LIST,
    ADD_ORGANIZATION,   
    config,
    axios,
    SHOW_ORGANIZATION, 
    UPDATE_ORGANIZATION,
    DELETE_ORGANIZATION,
    HANDLE_ORGANIZATION_INPUT_DATA,
    UPLOAD_ORGANIZATION_IMAGE,
    REMOVE_ORGANIZATION_IMAGE ,
    DATA_CHANGES_ALERT,
    RESET_DATA_IN_ORG
   } from './types';




   export const dataChangingAlert =()=>dispatch=>{
    dispatch({
        type:DATA_CHANGES_ALERT,
    })
   }

   export const resetUserDataInOrg=()=>dispatch=>{
    dispatch({
        type:RESET_DATA_IN_ORG,
        
    })
   }
   
   
   
//    export const getUsersList = (dispatch) => {
    export const addorganization = (data) => dispatch => {
        console.log(data)
       axios.get("/api/add-organization",config).then(res=>{ 
           console.log(res)
           
        
           dispatch({
                   type:ADD_ORGANIZATION,
                   payload:res.data.data
       
               })
           })
   }

    export const showorganization = (id) => dispatch => {
        console.log(id)
       axios.get(`/api/organization/${id}`,config).then(res=>{   
           console.log(res)  
           dispatch({
                   type:SHOW_ORGANIZATION,
                   payload:res.data.data    
               })
           })
   }

   export const updateorganization = (organizationData) => dispatch => {
 
       console.log(organizationData)

    return axios.post(`/api/update-organization/${organizationData.id}`,organizationData,config).then(res=>{  
        dispatch({
                type:UPDATE_ORGANIZATION,
                payload:res.data    
            })
        }).catch(err=>{
            console.log(err)
        })
}
   export const organizationList = (userData) => dispatch => {
       
       return axios.post(`/api/add-user`,userData,config).then(res=>{  
      
      
        dispatch({
                type:GET_ORGANIZATION_LIST,
                payload:res.data    
            })
        })
        .catch(message=>{
            console.log(message)
        })
        
    }

    export const deleteOrganization = (userData) => dispatch => {
        return axios.post(`/api/delete-organization/${userData.id}`,userData,config).then(res=>{  
         console.log(res)  
       
         dispatch({
                 type:DELETE_ORGANIZATION,
                 payload:res.data    
             })
         })
         .catch(message=>{
             console.log(message)
         })
         
   }
   
   export const handleOrganizationSettingsInputAction = (name, value) =>dispatch=>{
       console.log(name,value)
    dispatch({
        type:HANDLE_ORGANIZATION_INPUT_DATA,
        organizationId:name,
        organizationValue:value
    })
   

}
export const uploadImage = (imageFile,organizationId) => dispatch => {
    console.log(imageFile)
    console.log(organizationId)
 //    let imageObject = {}
 //    imageObject.user_id = userId
 //    imageObject.avatar = imageFile
    const imageObject = new FormData()
    imageObject.append("organization_id", organizationId);
    imageObject.append("logo", imageFile);
    
    
    console.log(imageObject)
return axios.post("/api/upload-logo-organization",imageObject,config).then(res=>{
    console.log(res)   
     dispatch({
             type:UPLOAD_ORGANIZATION_IMAGE,
             payload:res.data.data
 
         })
     }).catch(err=>{
         console.log(err)
     })
}
export const removeImage = (organizationId) => dispatch => {
    console.log(organizationId)
   
    let organizationObj={}
    organizationObj.organization_id = organizationId
    return axios.post("/api/remove-logo-organization",organizationObj,config).then(res=>{ 
 
     
     dispatch({
             type:REMOVE_ORGANIZATION_IMAGE,
             payload:res.data.data
 
         })
     }).catch(err=>{
         console.log(err)
     })
}


