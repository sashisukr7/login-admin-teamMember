import authReducer from './authReducer';
import registedReducer from './registedReducer';
import pollListReducer from './pollListReducer';
import pollResponseReducer from './pollResponseReducer';

import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    authReducer:authReducer,
    registedReducer:registedReducer,
    pollListReducer:pollListReducer,
    pollResponseReducer:pollResponseReducer,
})

export default rootReducer