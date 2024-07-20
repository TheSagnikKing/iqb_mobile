import Toast from "react-native-toast-message";
import api from "../Api/Api";
import { ADMIN_MERGE_RET2_FAIL, ADMIN_MERGE_RET2_REQ, ADMIN_MERGE_RET2_SUCCESS, GET_SALON_DETAILSBYID_FAIL, GET_SALON_DETAILSBYID_REQ, GET_SALON_DETAILSBYID_SUCCESS } from "../Constants/HomeConstant";

export const adminRet2Action = (homedata, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_MERGE_RET2_REQ
        });

        const params = {
            username:homedata.username,
            salonid:homedata.salonid,
            type: "ioS",
            gcCode: "",
            token: "",
            barberId: "",
            serviceId: ""
        }

        const { data } = await api.post(`/${endpoint}?${new URLSearchParams(params).toString()}`);

        if (data.StatusCode == 201) {
            dispatch({
                type: ADMIN_MERGE_RET2_FAIL,
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
                type: ADMIN_MERGE_RET2_SUCCESS,
                payload: {
                    ...data.Response
                },
            });
        }

    } catch (error) {
        console.log(error)
    }
};

export const getsalonsdetailsbyIdAction = (SalonId, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SALON_DETAILSBYID_REQ
        });

        const body = {
            SalonId,
        }

        const { data } = await api.post(`/${endpoint}`, body);

        if (data.StatusCode == 201) {
            dispatch({
                type: GET_SALON_DETAILSBYID_FAIL,
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
                type: GET_SALON_DETAILSBYID_SUCCESS,
                payload: data,
            });
        }

    } catch (error) {
        console.log(error)
    }
};