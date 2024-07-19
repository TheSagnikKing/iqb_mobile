import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { groupjoinReducer,customerGroupJoinReducer } from "./Reducers/groupjoinReducer";
import { activatedAccountReducer, activatedResendEmailReducer, iqueuesendEmailReducer, mapUserSalonReducer, signinReducer, signupCheckEmailReducer, signupReducer } from "./Reducers/AuthReducer";
import { iqbSalonsReducer, placesApiReducer, retrieveSalonListReducer } from "./Reducers/LocationReducer"
import { adminRet2Reducer } from "./Reducers/HomeReducer"
import { queueListReducer } from "./Reducers/QueueReducer";

const rootReducer = combineReducers({
    groupjoin: groupjoinReducer,
    customerGroupJoin:customerGroupJoinReducer,

    signin:signinReducer,
    activatedAccount:activatedAccountReducer,
    activatedResendEmail:activatedResendEmailReducer,
    signup: signupReducer,
    signupCheckEmail: signupCheckEmailReducer,
    iqueuesendEmail:iqueuesendEmailReducer,
    mapUserSalon: mapUserSalonReducer,

    placesApi: placesApiReducer,
    retrieveSalonList:retrieveSalonListReducer,
    iqbSalons: iqbSalonsReducer,

    adminRet2:adminRet2Reducer,
    queueList:queueListReducer,
})

const initialState = {};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,

});

export default store;