import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import {
    GET_ROLES_LIST,
    SHOW_ROLE,   
    UPDATE_ROLE,
    DELETE_ROLE,
    ADD_ROLE ,
    GET_PERMISSION_LIST,
    HANDLE_USER_ACCESS_INPUT_DATA,
    SHOW_SELECTED_USER,
    UPDATE_USER_PERMISSION,
    RESET_USERDATA,
    TAB_CHANGE_VALUE,
    DISPLAY_SELECTED_USER,
    HANDLE_USERACCESS_INPUT_EXCHANGE,
    USERACCESS_LIST,
    RESET_USER_SELECT
   } from '../actions/types';

const initialSatate = {
    users:[],
    currentPermission:[],
    currentPermissionNames:[],
    permissionListBackup:[],
    finalPermissionLists:[],
    userData:{},
    permissionList:[],
    quotes:[],
    tools:[],
    customer:[],
    user:[],
    selectedUser:{},
    tabChangeValue:0,
    displaySelectedUSER:false,
    // userAccessList:{
       
    //     userProfileSelect: "Select User",
       
    // },

    userAccessList:"Select ..."

}


 const userAccessReduser = (state = initialSatate, action)=> {
     console.log("permissionListBackup",state.permissionListBackup)
     console.log(action)
    switch(action.type){
        
        case GET_ROLES_LIST:
            return{
                ...state,
                roles:action.payload              
            }
        case SHOW_ROLE:
            return{
                ...state,
                role:state.roles.filter(user=>user.id === action.payload)
            }
        case UPDATE_ROLE:{
            return {
                ...state,
                users:action 
            }
        }
        case ADD_ROLE:{
            return{
                ...state,
                users:action              
            }
        }


        case RESET_USERDATA:{
            return{
                ...state,
                selectedUser:{},
               // userAccessList:"Select ..."

                
            }
        }



        case RESET_USER_SELECT:{
            return{
                ...state,
                //selectedUser:{},
                userAccessList:"Select ..."

                
            }
        }


        

        case TAB_CHANGE_VALUE:{
            return{
                ...state,
                tabChangeValue:action.tabChangeValue
                
            }
        }

        case HANDLE_USERACCESS_INPUT_EXCHANGE:
            return{
                ...state,
                [action.dataType]:{...state[action.dataType],[action.id]:action.data}
        
            }


        case DISPLAY_SELECTED_USER:{
            return{
                ...state,
                displaySelectedUSER:action.displaySelectedUSER
                
            }
        }

        case USERACCESS_LIST:{
            return{
                ...state,
                userAccessList:action.userAccessList
                
            }
        }
        

        case GET_PERMISSION_LIST:{
            console.log(action)          
            return{
                ...state,
                permissionList:action,
                permissionListBackup:action.payload,
                finalPermissionLists:action.payload
               
            }
        }
        case SHOW_SELECTED_USER:{
            let selectedUser= action
            let selectedPermissionId = []
            let selectedPermissionName = []
            console.log(action)
            console.log(action.selectedUser.data.permissions )
            action.selectedUser.data.permissions.map(permission=>{
                selectedPermissionId.push(permission.id)
                selectedPermissionName.push(permission.name)
            })
            console.log(selectedPermissionId)
            console.log(selectedPermissionName)
            return{
                ...state,
                selectedUser:action,              
                currentPermission:selectedPermissionId,
                currentPermissionNames:selectedPermissionName,
               
            }
        }
        case UPDATE_USER_PERMISSION:{
            console.log(action)
            // let selectedPermissionId = []
            // let selectedPermissionName = []
            // action.selectedUser.data.permissions.map(permission=>{
            //     selectedPermissionId.push(permission.id)
            //     selectedPermissionName.push(permission.name)
            // })
            return{
                ...state,
                selectedUser:action 
            }
        }
        case HANDLE_USER_ACCESS_INPUT_DATA:{
           // debugger;
            let permissionArray = state.currentPermission
            let currentPermissionNames = state.currentPermissionNames
            console.log("ABCD5",currentPermissionNames)
            console.log(state.permissionListBackup)
            // console.log(action.permissionName === "quotesAll" && action.cheked)
            if(action.permissionName === "quotesAll"){
               
                const quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="quotesAndOrders")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)
                let quotesIndex = currentPermissionNames.indexOf("quotesNone")
                console.log(quotesIndex)
                if(quotesIndex>=0){
                currentPermissionNames.splice(quotesIndex,1)
                
                }
                else if(quotesIndex === -1){
                    currentPermissionNames.push(action.permissionName)
                }

                
            } 



          else if(action.permissionName === "QuoteOrderPermissionsAll"){
               
                const quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="QuoteOrderPermissions")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)
                let quotesIndex = currentPermissionNames.indexOf("QuoteOrderPermissionsNone")
                console.log(quotesIndex)
                if(quotesIndex>=0){
                currentPermissionNames.splice(quotesIndex,1)
                
                }
                else if(quotesIndex === -1){
                    currentPermissionNames.push(action.permissionName)
                }
            } 





            else if(action.permissionName === "QuoteOrderPermissionsNone" ){
                let quotesIndex = currentPermissionNames.indexOf("QuoteOrderPermissionsNone")
                currentPermissionNames.splice(quotesIndex,1)
                currentPermissionNames.push(action.permissionName)
                let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="QuoteOrderPermissions")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(permissionArray.includes(premission.id)){
                        // currentPermissionNames.push(premission.name)
                        let index = permissionArray.indexOf(premission.id)
                        permissionArray.splice(index,1)
                        currentPermissionNames.splice(index,1)
                        
                    }
                }
                
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            }

            // if(action.permissionName === "quotesAll"){
            //     let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="quotesAndOrders")
            //     console.log(quotesArray)
            //     quotesArray.map(premission=>{
            //         if(permissionArray.length>0){
            //         if(!permissionArray.includes(premission.id)){
            //             permissionArray.push(premission.id)
            //             currentPermissionNames.push(premission.name)
            //         }
            //     }
            //     else  {
            //         permissionArray.push(premission.id)
            //         currentPermissionNames.push(premission.name)
            //     }
            //     })
            //     console.log(currentPermissionNames)
            //     console.log(permissionArray)
            //     let quotesIndex = currentPermissionNames.indexOf("quotesNone")
            //     console.log(quotesIndex)
            //     if(quotesIndex>=0){
            //     currentPermissionNames.splice(quotesIndex,1)
                
            //     }
            //     else if(quotesIndex === -1){
            //         currentPermissionNames.push(action.permissionName)
            //     }

            // } 



         


            else if(action.permissionName === "quotesNone" ){
                let quotesIndex = currentPermissionNames.indexOf("quotesNone")
                currentPermissionNames.splice(quotesIndex,1)
                currentPermissionNames.push(action.permissionName)
                let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="quotesAndOrders")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(permissionArray.includes(premission.id)){
                        // currentPermissionNames.push(premission.name)
                        let index = permissionArray.indexOf(premission.id)
                        permissionArray.splice(index,1)
                        currentPermissionNames.splice(index,1)
                        
                    }
                }
                
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            }


            


            else 
            if(action.permissionName === "poNone"){
                let quotesIndex = currentPermissionNames.indexOf("poNone")
                if(quotesIndex>=0){
                    currentPermissionNames.splice(quotesIndex,1)                
                }
                else if(quotesIndex === -1){
                    currentPermissionNames.push(action.permissionName)
                }
                let quotesArray = state.permissionListBackup.filter(permission=>
                    ((permission.group_name==="purchaseOrders")))
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                        if(permissionArray.includes(premission.id)){
                            // currentPermissionNames.push(premission.name)
                            let index = permissionArray.indexOf(premission.id)
                            permissionArray.splice(index,1)
                            currentPermissionNames.splice(index,1)
                            
                        }
                }
                
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            }

            // else if(action.permissionName === "poNone" ){
            //     let quotesIndex = currentPermissionNames.indexOf("poAll")



            //     currentPermissionNames.splice(quotesIndex,1)
            //     currentPermissionNames.push(action.permissionName)
            //     let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="purchaseOrders")
            //     console.log(quotesArray)
            //     quotesArray.map(premission=>{
            //         if(permissionArray.length>0){
            //         if(permissionArray.includes(premission.id)){
            //             // currentPermissionNames.push(premission.name)
            //             let index = permissionArray.indexOf(premission.id)
            //             permissionArray.splice(index,1)
            //             currentPermissionNames.splice(index,1)
                        
            //         }
            //     }
                
            //     })
            //     console.log(currentPermissionNames)
            //     console.log(permissionArray)

                
            // }

            if(action.permissionName === "poAll"){
               
                let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="purchaseOrders")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)
                let quotesIndex = currentPermissionNames.indexOf("poNone")
                console.log(quotesIndex)
                if(quotesIndex>=0){
                currentPermissionNames.splice(quotesIndex,1)
                
                }
                else if(quotesIndex === -1){
                    currentPermissionNames.push(action.permissionName)
                }

                
            } 
//INVENTORY
            else if(action.permissionName === "SupervisorInINV"){
                let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="SupervisorInINV")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            } 

            else if(action.permissionName === "plantManager"){
                let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="plantManager")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            } 


            else if(action.permissionName === "productManager"){
                let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="productManager")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            } 


            else if(action.permissionName === "InventoryManagement"){
                let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="InventoryManagement")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            } 



            else if(action.permissionName === "toolsAndSettings"){
                let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="toolsAndSettings")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            } 
            else if(action.permissionName === "customerManagement"){
                console.log(action)                
                let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="customerManagement")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            }
            else
            if(action.permissionName === "userManagement"){
                let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="userManagement")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            }

            else
            if(action.permissionName === "InventoryManagaement"){
                let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="InventoryManagement")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            }





            else
            if(action.permissionName === "purchaseOrders"){
                let quotesArray = state.permissionListBackup.filter(permission=>permission.group_name==="purchaseOrders")
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            }
//additionalPermissionInventory

            else 
            if(action.permissionName === "additionalPermissionInventory"){
                let quotesIndex = currentPermissionNames.indexOf("additionalPermissionInventoryNo")
                if(quotesIndex>=0){
                    currentPermissionNames.splice(quotesIndex,1)                
                }
                else if(quotesIndex === -1){
                    currentPermissionNames.push(action.permissionName)
                }
                let quotesArray = state.permissionListBackup.filter(permission=>
                    ((permission.group_name==="InventoryManagement") || (permission.group_name==="productManager")||(permission.group_name==="plantManager")||(permission.group_name==="SupervisorInINV")))
                console.log(quotesArray)
            
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            }

            else 
            if(action.permissionName === "additionalPermissionInventoryNo"){
                let quotesIndex = currentPermissionNames.indexOf("additionalPermissionInventory")
                if(quotesIndex>=0){
                    currentPermissionNames.splice(quotesIndex,1)                
                }
                else if(quotesIndex === -1){
                    currentPermissionNames.push(action.permissionName)
                }
                let quotesArray = state.permissionListBackup.filter(permission=>
                    ((permission.group_name==="InventoryManagement") || (permission.group_name==="productManager")||(permission.group_name==="plantManager")||(permission.group_name==="SupervisorInINV")))
                console.log(quotesArray)
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                        if(permissionArray.includes(premission.id)){
                            // currentPermissionNames.push(premission.name)
                            let index = permissionArray.indexOf(premission.id)
                            permissionArray.splice(index,1)
                            currentPermissionNames.splice(index,1)
                            
                        }
                }
                
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            }


            else 
            if(action.permissionName === "additionalPermissionYes"){
                let quotesIndex = currentPermissionNames.indexOf("additionalPermissionNo")
                if(quotesIndex>=0){
                    currentPermissionNames.splice(quotesIndex,1)                
                }
                else if(quotesIndex === -1){
                    currentPermissionNames.push(action.permissionName)
                }
                let quotesArray = state.permissionListBackup.filter(permission=>
                    ((permission.group_name==="userManagement") || (permission.group_name==="customerManagement")||(permission.group_name==="toolsAndSettings")))
                console.log(quotesArray)
            
                quotesArray.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            }
            // else 
            // if(action.permissionName === "additionalPermissionNo"){
            //     let quotesIndex = currentPermissionNames.indexOf("additionalPermissionYes")
            //     if(quotesIndex>=0){
            //         currentPermissionNames.splice(quotesIndex,1)                
            //     }
            //     else if(quotesIndex === -1){
            //         currentPermissionNames.push(action.permissionName)
            //     }
            //     let quotesArray = state.permissionListBackup.filter(permission=>
            //         ((permission.group_name==="userManagement") || (permission.group_name==="customerManagement")||(permission.group_name==="toolsAndSettings")))
            //     console.log(quotesArray)
            //     quotesArray.map(premission=>{
            //         if(permissionArray.length>0){
            //             if(permissionArray.includes(premission.id)){
            //                 // currentPermissionNames.push(premission.name)
            //                 let index = permissionArray.indexOf(premission.id)
            //                 permissionArray.splice(index,1)
            //                 currentPermissionNames.splice(index,1)
                            
            //             }
            //     }
                
            //     })
            //     console.log(currentPermissionNames)
            //     console.log(permissionArray)

                
            // }
           
           

   



        

            else  if(action.permissionName === "turnOn"){  
                //debugger;      
                // let quotesArray2 = state.permissionListBackup.filter(permission=>
                // //     ((permission.group_name==="userManagement") || (permission.group_name==="customerManagement")||(permission.group_name==="toolsAndSettings")|| (permission.group_name==="quotesAndOrders")|| (permission.group_name==="purchaseOrders") 
                // //    || (permission.group_name==="InventoryManagement") || (permission.group_name==="productManager")||(permission.group_name==="plantManager")||(permission.group_name==="SupervisorInINV")
                // //    )
                // )

                let quotesArray2 = state.permissionListBackup;
        
                quotesArray2.map(premission=>{
                    if(permissionArray.length>0){
                    if(!permissionArray.includes(premission.id)){
                        permissionArray.push(premission.id)
                        currentPermissionNames.push(premission.name)
                    }
                }
                else  {
                    permissionArray.push(premission.id)
                    currentPermissionNames.push(premission.name)
                }
                })
                console.log(currentPermissionNames)
                console.log(permissionArray)

                
            }


            else  if(action.permissionName === "turnOff"){ 
                currentPermissionNames=[]
                permissionArray=[]

             }
            else {
                //debugger;
            let permissionSelectedObject = state.permissionListBackup.filter(permission=>permission.name===action.permissionName)
            console.log("permissionSelectedObject",permissionSelectedObject, permissionArray)
            
            // if(permissionArray.includes(permissionSelectedObject.lenth) < 0 ){
            //     return 
            // }


            if(!permissionArray.includes(permissionSelectedObject[0].id) && action.permissionName ==="QuoteOrderPermissionsNone"){

                permissionArray.push(permissionSelectedObject[0].id)
                currentPermissionNames.push(permissionSelectedObject[0].name)
            }
           
            else {
               let index = permissionArray.indexOf(permissionSelectedObject[0].id)
               permissionArray.splice(index,1)
               currentPermissionNames.splice(index,1)
            }
        }
            console.log(permissionArray)
            console.log(currentPermissionNames)
            return{
                ...state,
                currentPermission:permissionArray,
                currentPermissionNames:currentPermissionNames
            }
        }

            default:
                return state
    }

}
export default userAccessReduser