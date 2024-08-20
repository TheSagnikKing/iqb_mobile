import { GETSERVICES_BY_BARBERID_SALONID_FAIL, GETSERVICES_BY_BARBERID_SALONID_REQ, GETSERVICES_BY_BARBERID_SALONID_SUCCESS, GROUP_IQUEUE_CHECK_POSITON_FAIL, GROUP_IQUEUE_CHECK_POSITON_REQ, GROUP_IQUEUE_CHECK_POSITON_SUCCESS, GROUP_IQUEUE_JOINED_SELECT_FAIL, GROUP_IQUEUE_JOINED_SELECT_REQ, GROUP_IQUEUE_JOINED_SELECT_SUCCESS, IQUEUE_BARBER_SELECT_FAIL, IQUEUE_BARBER_SELECT_REQ, IQUEUE_BARBER_SELECT_SUCCESS, IQUEUE_CHECK_POSITON_FAIL, IQUEUE_CHECK_POSITON_REQ, IQUEUE_CHECK_POSITON_SUCCESS, IQUEUE_CHECKLIST_FAIL, IQUEUE_CHECKLIST_REQ, IQUEUE_CHECKLIST_SUCCESS, IQUEUE_INSERTJOINQ_FAIL, IQUEUE_INSERTJOINQ_REQ, IQUEUE_INSERTJOINQ_SUCCESS, IQUEUE_JOINED_SELECT_FAIL, IQUEUE_JOINED_SELECT_REQ, IQUEUE_JOINED_SELECT_SUCCESS } from "../Constants/QueueConstant";

export const queueListReducer = (state = {
    response: []
}, action) => {
    switch (action.type) {
        case IQUEUE_CHECKLIST_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case IQUEUE_CHECKLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case IQUEUE_CHECKLIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const iqueuebarberSelectReducer = (state = {
    response: [],
    error: ""
}, action) => {
    switch (action.type) {
        case IQUEUE_BARBER_SELECT_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case IQUEUE_BARBER_SELECT_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload,
                error: "",
            }
        case IQUEUE_BARBER_SELECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                response: []
            }
        default:
            return state;
    }
}

export const getservicesbybarberIdsalonIdReducer = (state = {
    response: [],
    StatusMessage: ""
}, action) => {
    switch (action.type) {
        case GETSERVICES_BY_BARBERID_SALONID_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case GETSERVICES_BY_BARBERID_SALONID_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload,
                StatusMessage: action.StatusMessage
            }
        case GETSERVICES_BY_BARBERID_SALONID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const iqueuejoinedSelectReducer = (state = {
    response: {}
}, action) => {
    switch (action.type) {
        case IQUEUE_JOINED_SELECT_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case IQUEUE_JOINED_SELECT_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case IQUEUE_JOINED_SELECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const iqueuecheckpositionReducer = (state = {
    response: {}
}, action) => {
    switch (action.type) {
        case IQUEUE_CHECK_POSITON_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case IQUEUE_CHECK_POSITON_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case IQUEUE_CHECK_POSITON_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const iqueueinsertjoinqReducer = (state = {
    response: {}
}, action) => {
    switch (action.type) {
        case IQUEUE_INSERTJOINQ_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case IQUEUE_INSERTJOINQ_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case IQUEUE_INSERTJOINQ_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


// FOR GROUP JOIN 


export const groupiqueuejoinedSelectReducer = (state = {
    response: {}
}, action) => {
    switch (action.type) {
        case GROUP_IQUEUE_JOINED_SELECT_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case GROUP_IQUEUE_JOINED_SELECT_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case GROUP_IQUEUE_JOINED_SELECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}





export const queuebarberNamesReducer = (state = {
    response: []
}, action) => {
    switch (action.type) {
        case "ALL_BARBER_NAMES":
            return {
                response: action.payload
            }
        default:
            return state;
    }
}