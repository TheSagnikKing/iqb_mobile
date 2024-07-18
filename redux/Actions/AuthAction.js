import axios from 'axios'
import { ACTIVATED_ACCOUNT_FAIL, ACTIVATED_ACCOUNT_REQ, ACTIVATED_ACCOUNT_SUCCESS, ACTIVATED_RESENDEMAIL_REQ, ACTIVATED_RESENDEMAIL_SUCCESS, IQUEUE_SENDEMAIL_FAIL, IQUEUE_SENDEMAIL_REQ, IQUEUE_SENDEMAIL_SUCCESS, MAP_USERSALON_FAIL, MAP_USERSALON_REQ, MAP_USERSALON_SUCCESS, SIGNIN_FAIL, SIGNIN_REQ, SIGNIN_SUCCESS, SIGNUP_CHECKEMAIL_FAIL, SIGNUP_CHECKEMAIL_REQ, SIGNUP_CHECKEMAIL_SUCCESS, SIGNUP_FAIL, SIGNUP_REQ, SIGNUP_SUCCESS } from "../Constants/AuthConstant";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import api from '../Api/Api';
import { Alert } from 'react-native';

export const signinAction = (email, password, salonid, router, endpoint) => async (dispatch) => {
    try {
        dispatch({
            type: SIGNIN_REQ
        });

        const params = {
            email,
            password,
            salonid: 127,
            devicetoken: "",
            deviceType: "iOs"
        }

        const { data } = await api.post(`/${endpoint}?${new URLSearchParams(params).toString()}`);

        if (data.StatusCode == 201) {
            dispatch({
                type: SIGNIN_FAIL,
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
                type: SIGNIN_SUCCESS,
                payload: {
                    ...data
                },
            });

            if(data?.Response[0]?.Activated == "N"){
                router.push({ pathname: "/activationcode", params: data?.Response[0] })
            }else if(data?.Response[0]?.Activated == "Y"){
                router.push("/home")
            }

            // await AsyncStorage.setItem('user-login', JSON.stringify(data));
            

            // router.push("/activationcode")
        }

    } catch (error) {
        console.log(error)
    }
};

export const activatedAccountAction = (Email, SalonId, endpoint, router) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIVATED_ACCOUNT_REQ
        });

        const body = {
            "query":`UPDATE CustomersRegisteredTable set Activated='Y' WHERE Email='${Email}' AND SalonId=${SalonId}`
        }

        const { data } = await api.post(`/${endpoint}`, body);

        if (data.StatusCode == 201) {
            dispatch({
                type: ACTIVATED_ACCOUNT_FAIL,
                payload: data.StatusMessage
            });

            console.log("Activation Code Error")

            Toast.show({
                type: 'error',
                text1: "Activation Code Failed",
                position: "bottom",
                bottomOffset: 0,
            });

        } else if (data.StatusCode == 200) {
            dispatch({
                type: ACTIVATED_ACCOUNT_SUCCESS,
                payload: {
                    ...data
                },
            });

            console.log("Activaiton code success")
            router.push("/home")
        }

    } catch (error) {
        console.log(error)
    }
};

const iqueuesendEmailAction = (signupdata, endpoint, router) => async (dispatch) => {
    try {
        dispatch({
            type: IQUEUE_SENDEMAIL_REQ
        });

        const params = {
            firstname: signupdata.firstname,
            lastname: signupdata.lastname,
            password: signupdata.password,
            email: signupdata.email,
            activationcode: signupdata.activationcode,
            salonid: signupdata.salonid,
            username: signupdata.username,
            vSalonname: "IQBDev",
            vSalonTel: "01473233111",
            vSalonWeb: "www.iqueuebarbers.com"

        };

        const url = `/${endpoint}`

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            // Add any other headers as needed
        };

        const  { data, status }  = await api.post(url, params, {
            headers
        });

        console.log("email ",  data)
        console.log("email", typeof(data))
        console.log("status ", status)

        if( status == 200){
            dispatch({
                type: IQUEUE_SENDEMAIL_SUCCESS,
                payload: {
                    ...data
                },
            });

            Alert.alert(
                'Success',
                `An email has been sent to ${signupdata.email} with the verification code.Please check your inbox or junk box`,
                [
                    {
                        text: 'OK',
                        onPress: () => router.push("/signin")
                    },
                ],
                { cancelable: false },
            );

        }

    } catch (error) {
        console.log(error)
    }
};

export const activatedResendEmailAction = (resenddata, endpoint, router) => async (dispatch) => {
    try {
        dispatch({
            type: ACTIVATED_RESENDEMAIL_REQ
        });

        const body = {
            firstname: resenddata.firstname,
            lastname: resenddata.lastname,
            password: resenddata.password,
            email: resenddata.email,
            activationcode: resenddata.activationcode,
            salonid: resenddata.salonid,
            username: resenddata.username,
            vSalonname: "IQBDev",
            vSalonTel: "01473233111",
            vSalonWeb: "www.iqueuebarbers.com"

        };

        const url = `/${endpoint}`

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const  { data, status }  = await api.post(url, body, {
            headers
        });

        if( status == 200){
            dispatch({
                type: ACTIVATED_RESENDEMAIL_SUCCESS,
                payload: {
                    ...data
                },
            });

            alert("Activation code sent to your email")
        }

    } catch (error) {
        console.log(error)
    }
};

const mapUserSalonAction = (signupdata, endpoint, router) => async (dispatch) => {
    try {
        dispatch({
            type: MAP_USERSALON_REQ
        });

        const params = JSON.stringify({
            "UserId": Number(signupdata.username),
            "SalonId": Number(signupdata.salonid),
            "CreatedBy": Number(signupdata.username)
        });

        const url = `/${endpoint}`;

        const headers = {
            'Content-Type': 'application/json',
            // Add any other headers as needed
        };

        const { data } = await api.post(url, params, { headers });

        if (data.StatusCode == 201) {
            dispatch({
                type: MAP_USERSALON_FAIL,
                payload: data.StatusMessage
            });


            Toast.show({
                type: 'error',
                text1: data.StatusMessage,
                position: "bottom",
                bottomOffset: 0,
            });

            console.log("Map User salon error ")

        } else if (data.StatusCode == 200) {
            dispatch({
                type: MAP_USERSALON_SUCCESS,
                payload: {
                    ...data
                },
            });

            dispatch(iqueuesendEmailAction(signupdata, "iqueuesendemail.php",router))

            console.log("Map User salon success ")
        }


    } catch (error) {
        console.log(error)
    }
};

export const signupAction = (signupdata, endpoint, router) => async (dispatch) => {
    try {
        dispatch({
            type: SIGNUP_REQ
        });

        const params = {
            firstname: signupdata.firstname,
            lastname: signupdata.lastname,
            password: signupdata.password,
            email: signupdata.email,
            activationcode: signupdata.activationcode,
            activated: signupdata.activated,
            loggedin: signupdata.loggedin,
            registerdate: signupdata.registerdate,
            salonid: signupdata.salonid,
            maketingemails: signupdata.maketingemails,
            UserLevel: signupdata.UserLevel,
            IsBarber: signupdata.IsBarber
        };

        const url = `/${endpoint}?${new URLSearchParams(params).toString()}`;

        const { data } = await api.post(url);

        if (data.StatusCode == 201) {
            dispatch({
                type: SIGNUP_FAIL,
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
                type: SIGNUP_SUCCESS,
                payload: {
                    ...data
                },
            });

            Alert.alert(
                'Success',
                'New acount successfully created',
                [
                    {
                        text: 'OK',
                        onPress: () => (
                            dispatch(mapUserSalonAction({...signupdata, username: data.Response.USerName}, "MapUserSalon.php", router))
                        )
                    },
                ],
                { cancelable: false },
            );

        }

    } catch (error) {
        console.log(error)
    }
};


export const signupCheckEmailAction = (signupdata, endpoint, router) => async (dispatch) => {
    try {
        dispatch({
            type: SIGNUP_CHECKEMAIL_REQ
        });

        const params = {
            checkEmail: signupdata.email,
            salonid: signupdata.salonid,
        };

        const url = `/${endpoint}?${new URLSearchParams(params).toString()}`;

        const { data } = await api.post(url);

        if (data.StatusCode == 201 && data.StatusMessage == "No matching record found") {
            dispatch({
                type: SIGNUP_CHECKEMAIL_SUCCESS,
                payload: {
                    ...data
                },
            });

            router.push({ pathname: "/agree", params: signupdata })
        }else if(data.StatusCode == 200){
            dispatch({
                type: SIGNUP_CHECKEMAIL_FAIL,
                payload: "User already exist"
            });
            
            Toast.show({
                type: 'error',
                text1: "User already exist",
                position: "bottom",
                bottomOffset: 0,
            });
        }

    } catch (error) {
        console.log(error)
    }
};