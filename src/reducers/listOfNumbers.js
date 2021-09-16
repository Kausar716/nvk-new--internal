

export const dPageNumberList = (dData) => {
    // console.log(dData,"yes logged in data")
    // let arr=[]
    //             for(let i=plantPageNum;i<=totalLength;i++){
    //               if(i%plantPageNum === 0){
    //            arr.push(i)
    //               }
    //             }

    return{
        type :"D_PAGE_NUMBER",
        payload:dData
    }
}






const initialSatate = {
   
   
    dPageNumber:'15',
    dSetPagenumber:''

}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialSatate, action){
    switch(action.type){

            case "D_PAGE_NUMBER":
                console.log(action,"D_PAGE_NUMBER")
                return{
                    ...state,
                }


            case "D_SET_PAGE_NUMBER":
                console.log("D_SET_PAGE_NUMBER",action.payload)
                return {
                    ...state,
                }
            default:
                return state
    }

}

