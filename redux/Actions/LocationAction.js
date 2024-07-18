import { IQB_SALONS_FAIL, IQB_SALONS_REQ, IQB_SALONS_SUCCESS, PLACES_API_FAIL, PLACES_API_REQ, PLACES_API_SUCCESS, RETRIEVE_SALONLIST_FAIL, RETRIEVE_SALONLIST_REQ, RETRIEVE_SALONLIST_SUCCESS } from "../Constants/LocationConstant";
import axios from "axios";
import api from '../Api/Api';
import Toast from "react-native-toast-message";

export const placesApiAction = (search) => async (dispatch) => {
    try {
        dispatch({
            type: PLACES_API_REQ
        });


        const { data, status } = await axios.post(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&types&key=AIzaSyCc0rrgXw7WkdvKOqS5YeD6IWHKvl1OJa0`);
        
        dispatch({
            type: PLACES_API_SUCCESS,
            payload: data.predictions,
        });

    } catch (error) {
        dispatch({
            type: PLACES_API_FAIL,
            payload: error
        });
    }
};

export const retrieveSalonListAction = (city, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: RETRIEVE_SALONLIST_REQ
        });


        const { data, status } = await api.post(`${endpoint}?city=${city}`);
        
        if (data.StatusCode == 201) {
            dispatch({
                type: RETRIEVE_SALONLIST_FAIL,
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
                type: RETRIEVE_SALONLIST_SUCCESS,
                payload: data.Response,
            });
        }

    } catch (error) {
        dispatch({
            type: RETRIEVE_SALONLIST_FAIL,
            payload: error
        });
    }
};


export const iqbSalonsAction = (SalonCode, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: IQB_SALONS_REQ
        });


        const { data, status } = await api.post(`${endpoint}?SalonCode=${SalonCode}`);
        
        if (data.StatusCode == 201) {
            dispatch({
                type: IQB_SALONS_FAIL,
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
                type: IQB_SALONS_SUCCESS,
                payload: data.Response,
            });
        }

    } catch (error) {
        dispatch({
            type: IQB_SALONS_FAIL,
            payload: error
        });
    }
};