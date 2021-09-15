
const initState = {
    userList: [
        {
            id: "uitiui",
            email: 'sashisukumar@gmail.com',
            accessToken:"123",
            name:"Sashisu Kumar",
            role:"admin",
            password:"123456789*"

        },
        {
            id: "uhuhohol",
            email: 'sashisukumart@gmail.com',
            accessToken:"1263",
            name:"Sashisut Kumar",
            role:"teamMember",
            password:"123456789*"

        },
        {
            id: "t1uhuhohol",
            email: 'sashisukumart1@gmail.com',
            accessToken:"g12jh163",
            name:"Sashisut1 Kumar",
            role:"teamMember",
            password:"123456789*"

        },
        {
            id: "uyghuhohol",
            email: 'sashisukumart2@gmail.com',
            accessToken:"12ff63",
            name:"Sashisut2 Kumar",
            role:"teamMember",
            password:"123456789*"

        },
        {
            id: "uhughggohol",
            email: 'sashisukumart3@gmail.com',
            accessToken:"1g26fvj3",
            name:"Sashisut3 Kumar",
            role:"teamMember",
            password:"123456789*"

        },
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