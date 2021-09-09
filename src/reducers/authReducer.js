
 const initState = {
        isAuthenticated: false,
        user: null
      };


      const authReducer = (state = initState, action) => { 
        switch (action.type) {
            case 'LOGIN': {
              const { user } = action.payload;
              return {
                ...state,
                isAuthenticated: true,
                user
              };
            }
            case 'LOGOUT': {
              return {
                ...state,
                isAuthenticated: false,
                user: null
              };
            }
            default: {
              return { ...state };
            }
          }
    }

    export default authReducer;