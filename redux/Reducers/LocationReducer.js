import { IQB_SALONS_FAIL, IQB_SALONS_REQ, IQB_SALONS_SUCCESS, PLACES_API_FAIL, PLACES_API_REQ, PLACES_API_SUCCESS, RETRIEVE_SALONLIST_FAIL, RETRIEVE_SALONLIST_REQ, RETRIEVE_SALONLIST_SUCCESS } from "../Constants/LocationConstant";

export const placesApiReducer = (state = { response: [] }, action) => {
    switch (action.type) {
        case PLACES_API_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case PLACES_API_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case PLACES_API_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case "RESET_PLACE":
            return {
                ...state,
                response: []
            }
        default:
            return state;
    }
}

export const retrieveSalonListReducer = (state = { response: [] }, action) => {
    switch (action.type) {
        case RETRIEVE_SALONLIST_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case RETRIEVE_SALONLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                response: action.payload
            }
        case RETRIEVE_SALONLIST_FAIL:
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

export const iqbSalonsReducer = (state = { response: [] }, action) => {
    switch (action.type) {
        case IQB_SALONS_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case IQB_SALONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                response: action.payload
            }
        case IQB_SALONS_FAIL:
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
