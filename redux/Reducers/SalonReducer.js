import { GET_BARBER_BY_SALONID_FAIL, GET_BARBER_BY_SALONID_REQ, GET_BARBER_BY_SALONID_SUCCESS, GET_SALON_IMAGE_LIST_FAIL, GET_SALON_IMAGE_LIST_REQ, GET_SALON_IMAGE_LIST_SUCCESS, GET_SERVICES_BY_BARBERID_SALONID_FAIL, GET_SERVICES_BY_BARBERID_SALONID_REQ, GET_SERVICES_BY_BARBERID_SALONID_SUCCESS, IQBUSER_RATE_FAIL, IQBUSER_RATE_REQ, IQBUSER_RATE_SUCCESS } from "../Constants/SalonConstant";

export const getbarberbysalonidReducer = (state = {
    response: []
}, action) => {
    switch (action.type) {
        case GET_BARBER_BY_SALONID_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_BARBER_BY_SALONID_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case GET_BARBER_BY_SALONID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getservicesbybarberidsalonidReducer = (state = {
    response: []
}, action) => {
    switch (action.type) {
        case GET_SERVICES_BY_BARBERID_SALONID_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_SERVICES_BY_BARBERID_SALONID_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case GET_SERVICES_BY_BARBERID_SALONID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export const getsalonimagelistReducer = (state = {
    response: []
}, action) => {
    switch (action.type) {
        case GET_SALON_IMAGE_LIST_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_SALON_IMAGE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case GET_SALON_IMAGE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export const iqbuserrateReducer = (state = {
    response: {}
}, action) => {
    switch (action.type) {
        case IQBUSER_RATE_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case IQBUSER_RATE_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case IQBUSER_RATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}