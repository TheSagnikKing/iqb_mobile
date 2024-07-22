import Toast from "react-native-toast-message";
import { GET_CUSTOMER_DETAILS_FAIL, GET_CUSTOMER_DETAILS_REQ, GET_CUSTOMER_DETAILS_SUCCESS, IQUEUE_UPDATE_CUSTOMER_DETAILS_FAIL, IQUEUE_UPDATE_CUSTOMER_DETAILS_REQ, IQUEUE_UPDATE_CUSTOMER_DETAILS_SUCCESS } from "../Constants/ProfileConstant";
import api from "../Api/Api";

export const getCustomerDetailsByCustomeridAction = (SalonId, CustomerId, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: GET_CUSTOMER_DETAILS_REQ
        });

        const body = {
            SalonId,
            CustomerId
        }

        const { data } = await api.post(`/${endpoint}`, body);

        if (data.StatusCode == 201) {
            dispatch({
                type: GET_CUSTOMER_DETAILS_FAIL,
                payload: data.StatusMessage
            });


            Toast.show({
                type: 'error',
                text1: data.StatusMessage,
                position: "bottom",
                bottomOffset: 0,
            });

        } else if (data.StatusCode == 200) {
            dispatch({
                type: GET_CUSTOMER_DETAILS_SUCCESS,
                payload: data.Response,
            });
        }

    } catch (error) {
        console.log(error)
    }
};

export const iqueueupdatecustomerdetailsAction = (iqueuedata, endpoint, router) => async (dispatch) => {
    try {
        dispatch({
            type: IQUEUE_UPDATE_CUSTOMER_DETAILS_REQ
        });

        const body = {
            firstname: iqueuedata.firstname,
            lastname: iqueuedata.lastname,
            email: iqueuedata.email,
            password: iqueuedata.password,
            mobile: iqueuedata.mobile,
            dob: iqueuedata.dob,
            salonid: iqueuedata.salonid,
            maketingemails: iqueuedata.maketingemails
        }

        const { data } = await api.post(`/${endpoint}`, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (data.StatusCode == 201) {
            dispatch({
                type: IQUEUE_UPDATE_CUSTOMER_DETAILS_FAIL,
                payload: data.StatusMessage
            });


            Toast.show({
                type: 'error',
                text1: data.StatusMessage,
                position: "bottom",
                bottomOffset: 0,
            });

        } else if (data.StatusCode == 200) {
            dispatch({
                type: IQUEUE_UPDATE_CUSTOMER_DETAILS_SUCCESS,
                payload: data.Response,
            });

            router.push("/home")
            console.log("Update Response ", data)
        }

    } catch (error) {
        console.log(error)
    }
};