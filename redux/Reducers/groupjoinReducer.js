import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const groupjoinReducer = (state = { joinid: 0, customerName:"", barberName: "", services: {} }, action) => {
    switch (action.type) {
        case "CUSTOMER_NAME": {
            return {
                ...state,
                customerName: action.payload
            }
        }
        case "SELECT_OPTION":
            return {
                ...state,
                joinid: action.payload
            }
        case "SELECT_BARBER":
            return {
                ...state,
                barberName: action.payload
            }
        case "SELECT_SERVICE":
            const service = action.payload

            return {
                ...state,
                services: service
            }
        default:
            return state;
    }
}

export const customerGroupJoinReducer = (state = { 
    customerSelectedGroupJoin: []
 }, action) => {
    switch (action.type) {
        case "CUSTOMER_SELECT_JOIN_GROUP": {
            return {
                ...state,
                customerSelectedGroupJoin: [...state.customerSelectedGroupJoin, {...action.payload, _id:uuidv4()}]
            }
        }
        case "CUSTOMER_DELETE_JOIN_GROUP": {
            const deletecustomerjoingroupid = action.payload

            const updatedcustomerjoingroup = state.customerSelectedGroupJoin.filter((grp) => grp._id !== deletecustomerjoingroupid)
            return {
                ...state,
                customerSelectedGroupJoin: updatedcustomerjoingroup
            }
        }
        default:
            return state;
    }
}