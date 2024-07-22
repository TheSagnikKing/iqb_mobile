import { FORGOT_CHECK_EMAIL_FAIL, FORGOT_CHECK_EMAIL_REQ, FORGOT_CHECK_EMAIL_SUCCESS, FORGOT_SEND_PASSWORD_FAIL, FORGOT_SEND_PASSWORD_REQ, FORGOT_SEND_PASSWORD_SUCCESS, GET_CUSTOMER_DETAILS_FAIL, GET_CUSTOMER_DETAILS_REQ, GET_CUSTOMER_DETAILS_SUCCESS, IQUEUE_UPDATE_CUSTOMER_DETAILS_FAIL, IQUEUE_UPDATE_CUSTOMER_DETAILS_REQ, IQUEUE_UPDATE_CUSTOMER_DETAILS_SUCCESS } from "../Constants/ProfileConstant";

export const getCustomerDetailsByCustomeridReducer = (state = {
    response: {}
}, action) => {
    switch (action.type) {
        case GET_CUSTOMER_DETAILS_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_CUSTOMER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case GET_CUSTOMER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const iqueueupdatecustomerdetailsReducer = (state = {
    response: {}
}, action) => {
    switch (action.type) {
        case IQUEUE_UPDATE_CUSTOMER_DETAILS_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case IQUEUE_UPDATE_CUSTOMER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case IQUEUE_UPDATE_CUSTOMER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export const forgotcheckemailReducer = (state = {
    response: {}
}, action) => {
    switch (action.type) {
        case FORGOT_CHECK_EMAIL_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case FORGOT_CHECK_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case FORGOT_CHECK_EMAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export const forgotSendPasswordReducer = (state = {
    response: {}
}, action) => {
    switch (action.type) {
        case FORGOT_SEND_PASSWORD_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case FORGOT_SEND_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case FORGOT_SEND_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}