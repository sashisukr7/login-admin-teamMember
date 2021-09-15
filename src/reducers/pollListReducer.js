
const initState = {
    pollList: [
        {
            id: "gghb54",
            question:"what is your opinion in the strategy of ...?",
            status:"open",
            options:[
                {  
                    id:"ufhffyfygf22",
                    option:"it should be like this",

                },
                {  
                    id:"ggyfnygf22",
                    option:"it should be like that",
                },
                {  
                    id:"ggyfnkgygf22",
                    option:"it should be like that not",
                },
           ],

        },
        {
            id: "hghb54",
            question:"which season you like most?",
            status:"open",
            options:[
                {  
                    id:"fhyfygf22",
                    option:"summer",
                },
                {  
                    id:"gyfnygf22",
                    option:"winter",
                },
           ],

        },
        {
            id: "yghgghb54",
            question:"which one?",
            status:"open",
            options:[
                {  
                    id:"fhyhjvhfygf22",
                    option:"first one",
                },
                {  
                    id:"jkgyfnygf22",
                    option:"2nd one",
                },
           ],

        },
      
    ],
    openPollList: []
}

const pollListReducer = (state = initState, action) => {
    console.log("sssStateR",action.payload)
    switch (action.type) {
        case 'ADD_POLLLIST_REQUEST':
            return {
                ...state,
                pollList: [
                    ...state.pollList,
                    action.payload.pollListItem
                ]
            }
        case 'TEAM_MEMBER_POLLLIST_REQUEST':
                return {
                    ...state,
                    openPollList: state.pollList.filter((item)=>item.status!="close")
                }
        case 'CLOSE_POLLLIST_REQUEST':
            return {
                ...state,
                pollList:state.pollList.map((item)=>
                {
                    console.log("item.idr",state.pollList)
                    if (item.id==action.payload.id)
                    {
                    let item1={...item,status:"close"};
                    return item1
                    }
                    else{
                        return item
                    }

                })
            }
        default:
            return state
    }
}

export default pollListReducer;

