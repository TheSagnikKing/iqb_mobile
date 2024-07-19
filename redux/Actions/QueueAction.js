import { IQUEUE_CHECKLIST_FAIL, IQUEUE_CHECKLIST_REQ, IQUEUE_CHECKLIST_SUCCESS } from "../Constants/QueueConstant";
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

        const { data, status } = await api.post(`/${endpoint}`, body , { headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        }});

        // console.log(data)

        if(status == 200){
            dispatch({
                type: IQUEUE_CHECKLIST_SUCCESS,
                payload: data,
            });
        }

        // if (data.StatusCode == 201) {
        //     dispatch({
        //         type: IQUEUE_CHECKLIST_FAIL,
        //         payload: data.StatusMessage
        //     });


        //     Toast.show({
        //         type: 'error',
        //         text1: data.StatusMessage,
        //         position: "bottom",
        //         bottomOffset: 0,
        //     });

        // } else if (data.StatusCode == 200) {
            // dispatch({
            //     type: IQUEUE_CHECKLIST_SUCCESS,
            //     payload: data,
            // });

        //     console.log(data)
        // }

    } catch (error) {
        console.log(error)
    }
};