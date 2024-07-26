import { GETSERVICES_BY_BARBERID_SALONID_FAIL, GETSERVICES_BY_BARBERID_SALONID_REQ, GETSERVICES_BY_BARBERID_SALONID_SUCCESS, GROUP_IQUEUE_CHECK_POSITON_FAIL, GROUP_IQUEUE_CHECK_POSITON_REQ, GROUP_IQUEUE_CHECK_POSITON_SUCCESS, GROUP_IQUEUE_JOINED_SELECT_REQ, GROUP_IQUEUE_JOINED_SELECT_SUCCESS, IQUEUE_BARBER_SELECT_FAIL, IQUEUE_BARBER_SELECT_REQ, IQUEUE_BARBER_SELECT_SUCCESS, IQUEUE_CHECK_POSITON_FAIL, IQUEUE_CHECK_POSITON_REQ, IQUEUE_CHECK_POSITON_SUCCESS, IQUEUE_CHECKLIST_FAIL, IQUEUE_CHECKLIST_REQ, IQUEUE_CHECKLIST_SUCCESS, IQUEUE_INSERTJOINQ_FAIL, IQUEUE_INSERTJOINQ_REQ, IQUEUE_INSERTJOINQ_SUCCESS, IQUEUE_JOINED_SELECT_REQ, IQUEUE_JOINED_SELECT_SUCCESS } from "../Constants/QueueConstant";
import api from "../Api/Api";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";

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
            BarberId: params.BarberId,
            SalonId: params.SalonId
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

            // console.log("servicessss ", data)
        }

    } catch (error) {
        console.log(error)
    }
};

const iqueueinsertjoinqAction = (joinqdata, endpoint, router) => async (dispatch) => {
    try {
        dispatch({
            type: IQUEUE_INSERTJOINQ_REQ
        });

        const url = `/${endpoint}`;

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        const { data, status } = await api.post(url, joinqdata, { headers });

        if (data.StatusCode == 201) {
            dispatch({
                type: IQUEUE_INSERTJOINQ_FAIL,
                payload: data.Response
            })

            Toast.show({
                type: 'error',
                text1: data.StatusMessage,
                position: "bottom",
                bottomOffset: 0,
            });

        } else if (data.StatusCode == 200) {
            dispatch({
                type: IQUEUE_INSERTJOINQ_SUCCESS,
                payload: data.Response
            })

            // console.log("Finally iqueue insert joinq ", data);
            // router.push("/home")


            // This is for group join data
            // dispatch({
            //     type: "RESET_SEND_GROUP"
            // })

            // dispatch({
            //     type: "RESET_CUSTOMER_GROUP",
            // })

            console.log("DONE")
        }

    } catch (error) {
        console.error("API Request Error:", error);
    }
};

const iqueuecheckpositionAction = (salonid, joinqueuedata, endpoint, router) => async (dispatch) => {
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

            dispatch(iqueueinsertjoinqAction({ ...joinqueuedata, position: data.Response }, "iqueueinsertinjoinq_v2.php", router))
        }

    } catch (error) {
        console.error("API Request Error:", error);
    }
};

export const iqueuejoinedSelectAction = (iqueuecheckdata, joinqueuedata, endpoint, router) => async (dispatch) => {
    try {
        dispatch({
            type: IQUEUE_JOINED_SELECT_REQ
        });

        const { checkUsername, salonid } = iqueuecheckdata;

        const body = {
            checkUsername,
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
                type: IQUEUE_JOINED_SELECT_SUCCESS,
                payload: data.Response
            })

            dispatch(iqueuecheckpositionAction(salonid, joinqueuedata, "iqueuecheckposition.php", router))
        } else if (data.StatusCode == 200) {
            // Toast.show({
            //     type: 'error',
            //     text1: "User already in the queue",
            //     position: "bottom",
            //     bottomOffset: 0,
            // });
            alert("User already in the queue")
        }

    } catch (error) {
        console.error("API Request Error:", error);
    }
};

// FOR GROUP JOIN 

export const groupiqueuejoinedSelectAction = (iqueuecheckdata, joinqueuedata, endpoint, router) => async (dispatch) => {
    try {
        dispatch({
            type: GROUP_IQUEUE_JOINED_SELECT_REQ
        });

        const { checkUsername, salonid } = iqueuecheckdata;

        const body = {
            checkUsername,
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
                type: GROUP_IQUEUE_JOINED_SELECT_SUCCESS,
                payload: data.Response
            })

            // await Promise.all(joinqueuedata.map((queue) => (
            //     dispatch(iqueuecheckpositionAction(salonid, queue, "iqueuecheckposition.php", router))
            // )));

            for (const queue of joinqueuedata) {
                await dispatch(iqueuecheckpositionAction(salonid, queue, "iqueuecheckposition.php", router));
            }

        } else if (data.StatusCode == 200) {

            alert("User already in the queue")
        }

    } catch (error) {
        console.error("API Request Error:", error);
    }
};


