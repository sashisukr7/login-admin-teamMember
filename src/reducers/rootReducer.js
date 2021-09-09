import authReducer from './authReducer';
import registedReducer from './registedReducer';
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    authReducer:authReducer,
    registedReducer:registedReducer,
})

export default rootReducer