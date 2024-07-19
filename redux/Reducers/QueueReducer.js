import { IQUEUE_CHECKLIST_FAIL, IQUEUE_CHECKLIST_REQ, IQUEUE_CHECKLIST_SUCCESS } from "../Constants/QueueConstant";

export const queueListReducer = (state = {
    response:[]
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