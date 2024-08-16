import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const groupjoinReducer = (state = { joinid: 0, customerName: "", barberName: "", services: {}, ServiceStatusMessage: "" }, action) => {
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
        case "SET_SERVICE_STATUS_MESSAGE": {
            const ServiceStatusMessage = action.payload
            return {
                ...state,
                ServiceStatusMessage: ServiceStatusMessage
            }
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

            const { groupjointemplate, _id } = action.payload;

            return {
                ...state,
                customerSelectedGroupJoin: [
                    ...state.customerSelectedGroupJoin,
                    { ...groupjointemplate, _id }
                ]
            };
        }
        case "CUSTOMER_DELETE_JOIN_GROUP": {
            const deletecustomerjoingroupid = action.payload

            const updatedcustomerjoingroup = state.customerSelectedGroupJoin.filter((grp) => grp._id !== deletecustomerjoingroupid)
            return {
                ...state,
                customerSelectedGroupJoin: updatedcustomerjoingroup
            }
        }
        case "RESET_CUSTOMER_GROUP": {
            return  {
                customerSelectedGroupJoin: []
            }
        }
        default:
            return state;
    }
}


export const groupjoinqueueReducer = (state = {
    username: "",
    firstlastname: "",
    barbername: "",
    BarberId: 0,
    salonid: 0,
    timejoinedq: "",
    rdatejoinedq: "",
    ServiceId: 0,
    qgcode: "",
    _id: ""
}, action) => {
    switch (action.type) {
        case "BARBER_DETAILS":
            return {
                ...state,
                barbername: action.payload.barbername,
                BarberId: action.payload.BarberId,
                salonid: action.payload.salonid,
                // _id: uuidv4(),
                _id: ""
            };
        case "SERVICES_DETAILS":
            return {
                ...state,
                ServiceId: action.payload.ServiceId,
                timejoinedq: action.payload.timejoinedq,
                rdatejoinedq: action.payload.rdatejoinedq,
            };
        case "REST_DETAILS":
            return {
                ...state,
                firstlastname: action.payload.firstlastname,
            };
        case "USERNAME_DETAIL":
            return {
                ...state,
                username: action.payload.username
            }
        case "QGCODE_DETAIL":
            return {
                ...state,
                qgcode: action.payload.qgcode
            }
        case "RESET": {
            return {
                ...state,
                username: "",
                firstlastname: "",
                barbername: "",
                BarberId: 0,
                salonid: 0,
                timejoinedq: "",
                rdatejoinedq: "",
                ServiceId: 0,
                _id: ""
            }
        }
        default:
            return state;
    }
}

export const groupjoinsendReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_JOINDATA":

            const { groupjoinqueue, _id } = action.payload
            return [
                ...state,
                { ...groupjoinqueue, _id }
            ];
        case "DELETE_JOINDATA": {
            const deletecustomerjoingroupid = action.payload;

            const updatedcustomerjoingroup = state.filter((grp) => grp._id !== deletecustomerjoingroupid);
            return updatedcustomerjoingroup; 
        }
        case "RESET_SEND_GROUP": {
            return []
        }
        default:
            return state;
    }
}