import { GET_CUSTOMER_DETAILS_FAIL, GET_CUSTOMER_DETAILS_REQ, GET_CUSTOMER_DETAILS_SUCCESS, IQUEUE_UPDATE_CUSTOMER_DETAILS_FAIL, IQUEUE_UPDATE_CUSTOMER_DETAILS_REQ, IQUEUE_UPDATE_CUSTOMER_DETAILS_SUCCESS } from "../Constants/ProfileConstant";

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