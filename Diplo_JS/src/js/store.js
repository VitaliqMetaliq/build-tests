import { combineReducers, createStore, applyMiddleware } from "redux";
import photoReducer from "../reducers/photoReducer";
import thunk from "redux-thunk";
import authReducer from "../reducers/authReducer";
// import viewerReducer from "../reducers/viewerReducer";

let reducers = combineReducers({
    photos: photoReducer, 
    auth: authReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store.getState();

export default store;