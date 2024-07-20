import Toast from "react-native-toast-message";
import { GET_CUSTOMER_DETAILS_FAIL, GET_CUSTOMER_DETAILS_REQ, GET_CUSTOMER_DETAILS_SUCCESS } from "../Constants/ProfileConstant";
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