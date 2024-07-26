import Toast from "react-native-toast-message";
import { FORGOT_CHECK_EMAIL_FAIL, FORGOT_CHECK_EMAIL_REQ, FORGOT_CHECK_EMAIL_SUCCESS, FORGOT_SEND_PASSWORD_FAIL, FORGOT_SEND_PASSWORD_REQ, FORGOT_SEND_PASSWORD_SUCCESS, GET_CUSTOMER_DETAILS_FAIL, GET_CUSTOMER_DETAILS_REQ, GET_CUSTOMER_DETAILS_SUCCESS, IQUEUE_UPDATE_CUSTOMER_DETAILS_FAIL, IQUEUE_UPDATE_CUSTOMER_DETAILS_REQ, IQUEUE_UPDATE_CUSTOMER_DETAILS_SUCCESS } from "../Constants/ProfileConstant";
import api from "../Api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const iqueueupdatecustomerdetailsAction = (iqueuedata, endpoint, router, currentUserInfo) => async (dispatch) => {
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

            // Update the object with the new password
            const updatedUserInfo = { ...currentUserInfo[0], Password: iqueuedata.password, MaketingEmails: iqueuedata.maketingemails };

            // Create a new array with the updated object
            const newCurrentUserInfo = [updatedUserInfo];

            console.log("updated async userINFO ", newCurrentUserInfo)

            await AsyncStorage.removeItem('user-logininfo');
            await AsyncStorage.setItem('user-logininfo', JSON.stringify(newCurrentUserInfo));

            router.push("/home")
            // console.log("Update Response ", data)
        }

    } catch (error) {
        console.log(error)
    }
};



export const forgotcheckemailAction = (email, salonid, endpoint, sendpassworddata) => async (dispatch) => {
    try {
        dispatch({
            type: FORGOT_CHECK_EMAIL_REQ
        });


        const { data } = await api.post(`/${endpoint}?checkEmail=${email}&salonid=${salonid}`);

        if (data.StatusCode == 201) {
            dispatch({
                type: FORGOT_CHECK_EMAIL_FAIL,
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
                type: FORGOT_CHECK_EMAIL_SUCCESS,
                payload: data.Response,
            });

            const senddata = {
                ...sendpassworddata,
                firstname: data.Response[0].FirstName,
                lastname: data.Response[0].LastName,
                email: data.Response[0].Email,
                password: data.Response[0].Password
            }

            console.log("Check Email data ", senddata)
            dispatch(forgotSendPasswordAction(senddata, "iqueuesendpassword.php"))
        }

    } catch (error) {
        console.log(error)
    }
};


const forgotSendPasswordAction = (senddata, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: FORGOT_SEND_PASSWORD_REQ
        });

        const body = senddata

        const { data, status } = await api.post(`/${endpoint}`, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (status == 200) {
            dispatch({
                type: FORGOT_SEND_PASSWORD_SUCCESS,
                payload: "An Email has been sent. Please check your inbox and allow upto 10mins",
            });

            alert("An Email has been sent. Please check your inbox and allow upto 10mins")
        }

    } catch (error) {
        console.log(error)
    }
};