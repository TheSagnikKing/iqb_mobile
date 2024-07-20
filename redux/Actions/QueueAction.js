import { GETSERVICES_BY_BARBERID_SALONID_FAIL, GETSERVICES_BY_BARBERID_SALONID_REQ, GETSERVICES_BY_BARBERID_SALONID_SUCCESS, IQUEUE_BARBER_SELECT_FAIL, IQUEUE_BARBER_SELECT_REQ, IQUEUE_BARBER_SELECT_SUCCESS, IQUEUE_CHECK_POSITON_FAIL, IQUEUE_CHECK_POSITON_REQ, IQUEUE_CHECK_POSITON_SUCCESS, IQUEUE_CHECKLIST_FAIL, IQUEUE_CHECKLIST_REQ, IQUEUE_CHECKLIST_SUCCESS, IQUEUE_JOINED_SELECT_REQ, IQUEUE_JOINED_SELECT_SUCCESS } from "../Constants/QueueConstant";
import api from "../Api/Api";
import Toast from "react-native-toast-message";

export const queueListAction = (queuelistdata, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: IQUEUE_CHECKLIST_REQ
        });

        const body = {
            salonid: queuelistdata.salonid,
            page_no: queuelistdata.page_no
        }

        const { data, status } = await api.post(`/${endpoint}`, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (status == 200) {
            dispatch({
                type: IQUEUE_CHECKLIST_SUCCESS,
                payload: data,
            });
        }

    } catch (error) {
        console.log(error)
    }
};

export const iqueuebarberSelectAction = (salonid, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: IQUEUE_BARBER_SELECT_REQ
        });

        const params = {
            salonid: salonid,
        }

        const url = `/${endpoint}?${new URLSearchParams(params).toString()}`;

        const { data } = await api.post(url);

        if (data.StatusCode == 201) {
            dispatch({
                type: IQUEUE_BARBER_SELECT_FAIL,
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
                type: IQUEUE_BARBER_SELECT_SUCCESS,
                payload: data.Response,
            });
        }

    } catch (error) {
        console.log(error)
    }
};


export const getservicesbybarberIdsalonIdAction = (params, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: GETSERVICES_BY_BARBERID_SALONID_REQ
        });

        const body = {
            BarberId: 441,
            SalonId: 127
        }

        const url = `/${endpoint}`;

        const { data } = await api.post(url, body);

        if (data.StatusCode == 201) {
            dispatch({
                type: GETSERVICES_BY_BARBERID_SALONID_FAIL,
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
                type: GETSERVICES_BY_BARBERID_SALONID_SUCCESS,
                payload: data.Response,
            });

            console.log("servicessss ", data)
        }

    } catch (error) {
        console.log(error)
    }
};

export const iqueuejoinedSelectAction = (joinqueuedata, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: IQUEUE_JOINED_SELECT_REQ
        });

        const { checkUsername, salonid } = joinqueuedata;

        const body = {
            checkUsername: "34736",
            salonid: "127"
        };

        const url = `/${endpoint}`;

        const { data, status } = await api.post(url, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // if(data.StatusCode == 201){
        //     dispatch({
        //         type: IQUEUE_JOINED_SELECT_SUCCESS,
        //         payload: data.Response
        //     })
        // }

        console.log("Api Response ", data);

    } catch (error) {
        console.error("API Request Error:", error);
    }
};

export const iqueuecheckpositionAction = (salonid, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: IQUEUE_CHECK_POSITON_REQ
        });

        const body = {
            salonid
        };

        const url = `/${endpoint}`;

        const { data, status } = await api.post(url, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (data.StatusCode == 201) {
            dispatch({
                type: IQUEUE_CHECK_POSITON_FAIL,
                payload: data.Response
            })
        } else if (data.StatusCode == 200) {
            dispatch({
                type: IQUEUE_CHECK_POSITON_SUCCESS,
                payload: data.Response
            })

            console.log("Api Response ", data);
        }

    } catch (error) {
        console.error("API Request Error:", error);
    }
};