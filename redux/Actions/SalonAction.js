import Toast from "react-native-toast-message";
import { GET_BARBER_BY_SALONID_FAIL, GET_BARBER_BY_SALONID_REQ, GET_BARBER_BY_SALONID_SUCCESS, GET_SALON_IMAGE_LIST_FAIL, GET_SALON_IMAGE_LIST_REQ, GET_SALON_IMAGE_LIST_SUCCESS, GET_SERVICES_BY_BARBERID_SALONID_FAIL, GET_SERVICES_BY_BARBERID_SALONID_REQ, GET_SERVICES_BY_BARBERID_SALONID_SUCCESS, IQBUSER_RATE_REQ, IQBUSER_RATE_SUCCESS } from "../Constants/SalonConstant";
import api from "../Api/Api";

export const getbarberbysalonidAction = (SalonId, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: GET_BARBER_BY_SALONID_REQ
        });

        const body = {
            SalonId
        }

        const { data } = await api.post(`/${endpoint}`, body);

        if (data.StatusCode == 201) {
            dispatch({
                type: GET_BARBER_BY_SALONID_FAIL,
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
                type: GET_BARBER_BY_SALONID_SUCCESS,
                payload: data.Response,
            });
        }

    } catch (error) {
        console.log(error)
    }
};



export const getservicesbybarberidsalonidAction = (servicesdata, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SERVICES_BY_BARBERID_SALONID_REQ
        });

        const { data } = await api.post(`/${endpoint}`, servicesdata);

        if (data.StatusCode == 201) {
            dispatch({
                type: GET_SERVICES_BY_BARBERID_SALONID_FAIL,
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
                type: GET_SERVICES_BY_BARBERID_SALONID_SUCCESS,
                payload: data.Response,
                StatusMessage: data.StatusMessage
            });
        }

    } catch (error) {
        console.log(error)
    }
};



export const getsalonimagelistAction = (SalonId, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SALON_IMAGE_LIST_REQ
        });

        const { data } = await api.post(`/${endpoint}?SalonId=${SalonId}`);

        if (data.StatusCode == 201) {
            dispatch({
                type: GET_SALON_IMAGE_LIST_FAIL,
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
                type: GET_SALON_IMAGE_LIST_SUCCESS,
                payload: data.Response,
            });
        }

    } catch (error) {
        console.log(error)
    }
};

export const iqbuserrateAction = async (ratedata, dispatch, endpoint, daterated, personname, endpoint2) => {
    try {
        dispatch({
            type: IQBUSER_RATE_REQ
        });

        const { data } = await api.post(`/${endpoint}`, ratedata, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (data.StatusCode == 200) {
            dispatch({
                type: IQBUSER_RATE_SUCCESS,
                payload: data
            })

            const newrate = {
                salonid: ratedata.salonid,
                personname,
                rate: ratedata.ratingscore,
                daterated
            }

            await api.post(`/${endpoint2}`, newrate, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            alert("Thank you for your feedback!")
        }
    } catch (error) {
        console.log(error)
    }
}