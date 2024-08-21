import Toast from "react-native-toast-message";
import api from "../Api/Api";
import { ADMIN_MERGE_RET2_FAIL, ADMIN_MERGE_RET2_REQ, ADMIN_MERGE_RET2_SUCCESS, GET_SALON_DETAILSBYID_FAIL, GET_SALON_DETAILSBYID_REQ, GET_SALON_DETAILSBYID_SUCCESS, IQUEUE_DELETE_JOINQ_FAIL, IQUEUE_DELETE_JOINQ_REQ, IQUEUE_DELETE_JOINQ_SUCCESS } from "../Constants/HomeConstant";
import { Alert } from "react-native";

export const adminRet2Action = (homedata, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_MERGE_RET2_REQ
        });

        const params = {
            username: homedata.username,
            salonid: homedata.salonid,
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

            const barberNamesArry = data.Response.QStatusList.map((barber) => barber.Barber)

            // console.log("ALl BArber NAMES ", barberNamesArry)

            dispatch({
                type: "ALL_BARBER_NAMES",
                payload: barberNamesArry
            })
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


export const iqueuedeleteJoinqAction = async (checkUsername, salonid, endpoint, dispatch, gcCode, loggedinUsername) => {
    try {
        dispatch({
            type: IQUEUE_DELETE_JOINQ_REQ
        });

        if (gcCode == "N/A") {
            const body = {
                salonid,
                checkUsername
            }

            const { data } = await api.post(`/${endpoint}`, body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (data.StatusCode == 201) {
                dispatch({
                    type: IQUEUE_DELETE_JOINQ_FAIL,
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
                    type: IQUEUE_DELETE_JOINQ_SUCCESS,
                    payload: data,
                });

                Alert.alert('Success', `Booking cancelled successfully`, [
                    {
                        text: 'OK', onPress: async () => dispatch(adminRet2Action({
                            username: loggedinUsername,
                            salonid: salonid,
                            type: "ioS",
                        }, "adminMergedRet2.php"))
                    },
                ]);
            }
        } else {
            const body = {
                salonid,
                checkUsername,
                gcCode
            }

            const { data } = await api.post(`/${endpoint}`, body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (data.StatusCode == 201) {
                dispatch({
                    type: IQUEUE_DELETE_JOINQ_FAIL,
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
                    type: IQUEUE_DELETE_JOINQ_SUCCESS,
                    payload: data,
                });

                Alert.alert('Success', `Booking cancelled successfully`, [
                    {
                        text: 'OK', onPress: () => dispatch(adminRet2Action({
                            username: loggedinUsername,
                            salonid: salonid,
                            type: "ioS",
                        }, "adminMergedRet2.php"))
                    },
                ]);
            }
        }

    } catch (error) {
        console.log(error)
    }
};