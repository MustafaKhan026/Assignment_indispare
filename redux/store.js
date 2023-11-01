import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {authReducer,dataReducer} from "./reducer"



const rootReducer = combineReducers({auth:authReducer,data:dataReducer})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
