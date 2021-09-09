
const initState = {
    userList: [
        {
            id: 1,
            email: 'sashisukumar@gmail.com',
            accessToken:"123",
            name:"Sashisu Kumar",
            role:"admin",
            password:"123456789*"

        }
    ]
}

const registedReducer = (state = initState, action) => {
    console.log("sssStateR",action.payload)
    switch (action.type) {
        case 'ADD_REGISTERED_USER':
            return {
                ...state,
                userList: [
                    ...state.userList,
                    action.payload.user
                ]
            }
        default:
            return state
    }
}

export default registedReducer;