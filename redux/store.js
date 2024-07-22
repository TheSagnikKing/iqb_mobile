import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { groupjoinReducer,customerGroupJoinReducer, groupjoinqueueReducer, groupjoinsendReducer } from "./Reducers/groupjoinReducer";
import { activatedAccountReducer, activatedResendEmailReducer, iqueuesendEmailReducer, mapUserSalonReducer, signinReducer, signupCheckEmailReducer, signupReducer } from "./Reducers/AuthReducer";
import { iqbSalonsReducer, placesApiReducer, retrieveSalonListReducer } from "./Reducers/LocationReducer"
import { adminRet2Reducer, getsalonsdetailsbyIdReducer } from "./Reducers/HomeReducer"
import { getservicesbybarberIdsalonIdReducer, groupiqueuejoinedSelectReducer, iqueuebarberSelectReducer, iqueuecheckpositionReducer, iqueueinsertjoinqReducer, iqueuejoinedSelectReducer, queueListReducer } from "./Reducers/QueueReducer";
import { forgotcheckemailReducer, forgotSendPasswordReducer, getCustomerDetailsByCustomeridReducer, iqueueupdatecustomerdetailsReducer } from "./Reducers/ProfileReducer";

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
    iqueuebarberSelect:iqueuebarberSelectReducer,
    getservicesbybarberIdsalonId: getservicesbybarberIdsalonIdReducer,
    iqueuejoinedSelect: iqueuejoinedSelectReducer,
    getsalonsdetailsbyId:getsalonsdetailsbyIdReducer,
    iqueuecheckposition: iqueuecheckpositionReducer,
    iqueueinsertjoinq:iqueueinsertjoinqReducer,
    getCustomerDetailsByCustomerid: getCustomerDetailsByCustomeridReducer,
    iqueueupdatecustomerdetails:iqueueupdatecustomerdetailsReducer,

    groupjoinqueue: groupjoinqueueReducer,
    groupjoinsend: groupjoinsendReducer,
    
    groupiqueuejoinedSelect: groupiqueuejoinedSelectReducer,

    forgotcheckemail: forgotcheckemailReducer,
    forgotSendPassword: forgotSendPasswordReducer,
})

const initialState = {};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,

});

export default store;