import { ADMIN_MERGE_RET2_FAIL, ADMIN_MERGE_RET2_REQ, ADMIN_MERGE_RET2_SUCCESS, GET_SALON_DETAILSBYID_FAIL, GET_SALON_DETAILSBYID_REQ, GET_SALON_DETAILSBYID_SUCCESS, IQUEUE_DELETE_JOINQ_FAIL, IQUEUE_DELETE_JOINQ_REQ, IQUEUE_DELETE_JOINQ_SUCCESS } from "../Constants/HomeConstant";

export const adminRet2Reducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_MERGE_RET2_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case ADMIN_MERGE_RET2_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case ADMIN_MERGE_RET2_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getsalonsdetailsbyIdReducer = (state = {
    response: {}
}, action) => {
    switch (action.type) {
        case GET_SALON_DETAILSBYID_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case GET_SALON_DETAILSBYID_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case GET_SALON_DETAILSBYID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export const iqueuedeleteJoinqReducer = (state = {}, action) => {
    switch (action.type) {
        case IQUEUE_DELETE_JOINQ_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case IQUEUE_DELETE_JOINQ_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case IQUEUE_DELETE_JOINQ_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}