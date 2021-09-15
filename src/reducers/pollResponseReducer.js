
const initState = {
    pollResponseList: [
        {
            userId:"uitiui",
            requestId: "gghb54",
            responseId:"ufhffyfygf22",
           

        },
        {   
            userId:"t1uhuhohol",
            requestId: "gghb54",
            responseId:"ggyfnygf22",
           
        },

        {   
            userId:"t1uhuhohfgol",
            requestId: "gghb54",
            responseId:"ufhffyfygf22",
           
        },


        {   
            userId:"t1uhuhohol",
            requestId: "yghgghb54",
            responseId:"ggyfnygf22",
           
        },
      
    ],
}

const pollResponseReducer = (state = initState, action) => {
    console.log("sssStateR",action.payload)
    switch (action.type) {
        case 'ADD_POLLLIST_RESPONSE':
            return {
                ...state,
                pollResponseList: [
                    ...state.pollResponseList,
                    action.payload.pollResponseListItem
                ]
            }
       
        
        default:
            return state
    }
}

export default pollResponseReducer;

