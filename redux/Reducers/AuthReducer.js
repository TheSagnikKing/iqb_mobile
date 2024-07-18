import { ACTIVATED_ACCOUNT_FAIL, ACTIVATED_ACCOUNT_REQ, ACTIVATED_ACCOUNT_SUCCESS, ACTIVATED_RESENDEMAIL_FAIL, ACTIVATED_RESENDEMAIL_REQ, ACTIVATED_RESENDEMAIL_SUCCESS, IQUEUE_SENDEMAIL_FAIL, IQUEUE_SENDEMAIL_REQ, IQUEUE_SENDEMAIL_SUCCESS, MAP_USERSALON_FAIL, MAP_USERSALON_REQ, MAP_USERSALON_SUCCESS, SIGNIN_FAIL, SIGNIN_REQ, SIGNIN_SUCCESS, SIGNUP_CHECKEMAIL_FAIL, SIGNUP_CHECKEMAIL_REQ, SIGNUP_CHECKEMAIL_SUCCESS, SIGNUP_FAIL, SIGNUP_REQ, SIGNUP_SUCCESS } from "../Constants/AuthConstant";

export const signinReducer = (state = {}, action) => {
    switch (action.type) {
        case SIGNIN_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case SIGNIN_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case SIGNIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const activatedAccountReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIVATED_ACCOUNT_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case ACTIVATED_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case ACTIVATED_ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const signupReducer = (state = {}, action) => {
    switch (action.type) {
        case SIGNUP_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const signupCheckEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case SIGNUP_CHECKEMAIL_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case SIGNUP_CHECKEMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case SIGNUP_CHECKEMAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const iqueuesendEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case IQUEUE_SENDEMAIL_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case IQUEUE_SENDEMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case IQUEUE_SENDEMAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const activatedResendEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIVATED_RESENDEMAIL_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case ACTIVATED_RESENDEMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case ACTIVATED_RESENDEMAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const mapUserSalonReducer = (state = {}, action) => {
    switch (action.type) {
        case MAP_USERSALON_REQ: {
            return {
                ...state,
                loading: true,
            }
        }
        case MAP_USERSALON_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case MAP_USERSALON_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}