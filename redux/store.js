import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { demoReducer } from "./Reducers/demoReducer";

const rootReducer = combineReducers({
    demo: demoReducer
})

const initialState = {};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,

});

export default store;