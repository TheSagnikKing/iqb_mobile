import { StyleSheet, Text, View, ScrollView, Image, Pressable, FlatList, ActivityIndicator, Alert, Platform } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getservicesbybarberIdsalonIdAction, iqueuejoinedSelectAction } from '../redux/Actions/QueueAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import api from '../redux/Api/Api';

import { IQUEUE_CHECK_POSITON_FAIL, IQUEUE_CHECK_POSITON_REQ, IQUEUE_CHECK_POSITON_SUCCESS, IQUEUE_INSERTJOINQ_FAIL, IQUEUE_INSERTJOINQ_REQ, IQUEUE_INSERTJOINQ_SUCCESS, IQUEUE_JOINED_SELECT_REQ, IQUEUE_JOINED_SELECT_SUCCESS } from '../redux/Constants/QueueConstant';

import { BackHandler, ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}


function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

const selectservices = () => {


  //Notification code =========

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(
    undefined
  );
  const notificationListener = useRef();
  const responseListener = useRef();


  console.log("EXPO PUSH TOKEN ", expoPushToken)

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  //Notification code End =========

  const [currentSalonInfo, setCurrentSalonInfo] = useState([])
  const [currentUserInfo, setCurrentUserInfo] = useState([])

  useEffect(() => {
    const getloginsalonuserdata = async () => {
      const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
      const userinfodata = await AsyncStorage.getItem('user-logininfo')
      setCurrentSalonInfo(JSON.parse(saloninfodata))
      setCurrentUserInfo(JSON.parse(userinfodata))
    }

    getloginsalonuserdata()
  }, [])

  // console.log("The currentSalonInfo ", currentSalonInfo)

  // console.log("The Current User Info ", currentUserInfo)

  const params = useLocalSearchParams();

  console.log("Params services ", params)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getservicesbybarberIdsalonIdAction(params, "GetServicesByBarberIdSalonId.php"))
  }, [])

  const getservicesbybarberIdsalonId = useSelector(state => state.getservicesbybarberIdsalonId)

  const {
    loading,
    response: serviceslist,
    StatusMessage: ServiceStatusMessage,
  } = getservicesbybarberIdsalonId

  // console.log("The Selected Services are ", serviceslist)

  const [selectedServices, setSelectedServices] = useState([])

  const addServiceClicked = (service) => {
    if (selectedServices.length < 1) {
      setSelectedServices([...selectedServices, service])
    }
  }

  const deleteServiceClicked = (service) => {
    setSelectedServices((prev) => prev.filter((ser) => ser.serviceid !== service.serviceid))
  }

  const [timejoinedq, setTimejoinedq] = useState("")
  const [rdatejoinedq, setRdatejoinedq] = useState("")

  useEffect(() => {
    const options = { hour12: false };
    const time = new Date().toLocaleTimeString([], options);
    setTimejoinedq(time)

    const date = new Date();
    const dateoptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', dateoptions).replace(/\//g, '-');
    setRdatejoinedq(formattedDate)
  }, []);

  const router = useRouter()

  const [joinqueueloading, setJoinqueueloading] = useState(false)


  const iqueueinsertjoinqAction = async (joinqdata, endpoint, router, setJoinqueueloading, dispatch) => {
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

        setJoinqueueloading(false)

      } else if (data.StatusCode == 200) {
        dispatch({
          type: IQUEUE_INSERTJOINQ_SUCCESS,
          payload: data.Response
        })

        console.log("INSERT JOIN QUEUE CALLED")

        Alert.alert('Join Queue', 'You have successfully joined the queue ?', [
          { text: 'OK', onPress: () => router.push("/home") },
        ]);
      }

    } catch (error) {
      console.error("API Request Error:", error);
    }
  };


  const iqueuecheckpositionAction = async (salonid, joinqueuedata, endpoint, router, setJoinqueueloading, dispatch) => {
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

        setJoinqueueloading(false)
      } else if (data.StatusCode == 200) {
        dispatch({
          type: IQUEUE_CHECK_POSITON_SUCCESS,
          payload: data.Response
        })

        console.log("IQUEUE CHECK POSITION CALLED")

        await iqueueinsertjoinqAction({ ...joinqueuedata, position: Number(data.Response) }, "iqueueinsertinjoinq_v2.php", router, setJoinqueueloading, dispatch)
      }

    } catch (error) {
      console.error("API Request Error:", error);
    }
  };


  const iqueuejoinedSelectAction = async (iqueuecheckdata, joinqueuedata, endpoint, router, setJoinqueueloading, newdevicetokenbody, dispatch) => {
    try {

      setJoinqueueloading(true)

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

        console.log("JOIN QUEUE SELECT CALLED")

        await iqueuecheckpositionAction(salonid, joinqueuedata, "iqueuecheckposition.php", router, setJoinqueueloading, dispatch)

        setJoinqueueloading(false)



        try {

          const { data } = await api.post(`/iqueuedevicetoken.php`, newdevicetokenbody, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          console.log("New Device Token Body ", newdevicetokenbody)
          console.log("SINGLE JOIN DATA", data)



        } catch (error) {
          console.log("Device Token", error)
        }


      } else if (data.StatusCode == 200) {
        alert("Alert!, You cannot rejoin the queue today, due to a place cancellation.")
        setJoinqueueloading(false)
      }

    } catch (error) {
      console.error("API Request Error:", error);
    }
  };




  const joinqueuepressed = async () => {
    const iqueuecheckdata = {
      checkUsername: currentUserInfo?.[0]?.UserName,
      salonid: currentUserInfo?.[0]?.SalonId
    }

    const joinqueuedata = {
      username: currentUserInfo?.[0]?.UserName,
      firstlastname: `${currentUserInfo?.[0]?.FirstName} ${currentUserInfo?.[0]?.LastName}`,
      barbername: selectedServices?.[0]?.BarberNName,
      BarberId: selectedServices?.[0]?.BarberId,
      salonid: currentUserInfo?.[0]?.SalonId,
      timejoinedq,
      rdatejoinedq,
      ServiceId: selectedServices?.[0]?.serviceid,
      is_single_join: "yes",
    }


    const newdevicetokenbody = {
      token: expoPushToken,
      type: Platform.OS,
      DateJoinedQ: `${rdatejoinedq} ${timejoinedq}`,
      salonid: currentSalonInfo?.[0]?.id,
      FirstLastName: `${currentUserInfo?.[0]?.FirstName} ${currentUserInfo?.[0]?.LastName}`,
      UserName: `${currentUserInfo?.[0]?.UserName}`,
    }

    Alert.alert('Join Queue', 'Are you sure ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: async () => await iqueuejoinedSelectAction(iqueuecheckdata, joinqueuedata, "iqueuejoinedqselect.php", router, setJoinqueueloading, newdevicetokenbody, dispatch) },
    ]);
  }

  // const joinqueuepressed = () => {
  //   const iqueuecheckdata = {
  //     checkUsername: currentUserInfo?.[0]?.UserName,
  //     salonid: currentUserInfo?.[0]?.SalonId
  //   }

  //   const joinqueuedata = {
  //     username: currentUserInfo?.[0]?.UserName,
  //     firstlastname: `${currentUserInfo?.[0]?.FirstName} ${currentUserInfo?.[0]?.LastName}`,
  //     barbername: selectedServices?.[0]?.BarberNName,
  //     BarberId: selectedServices?.[0]?.BarberId,
  //     salonid: currentUserInfo?.[0]?.SalonId,
  //     timejoinedq,
  //     rdatejoinedq,
  //     ServiceId: selectedServices?.[0]?.serviceid,
  //     is_single_join: "yes",
  //   }

  //   // console.log("Single joinqueuedata ", joinqueuedata)


  //   const newdevicetokenbody = {
  //     token: expoPushToken,
  //     type: Platform.OS,
  //     DateJoinedQ: `${rdatejoinedq} ${timejoinedq}`,
  //     salonid: currentSalonInfo?.[0]?.id,
  //     FirstLastName: `${currentUserInfo?.[0]?.FirstName} ${currentUserInfo?.[0]?.LastName}`,
  //     UserName: `${currentUserInfo?.[0]?.UserName}`,
  // }

  //   Alert.alert('Join Queue', 'Are you sure ?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     { text: 'OK', onPress: () => dispatch(iqueuejoinedSelectAction(iqueuecheckdata, joinqueuedata, "iqueuejoinedqselect.php", router, setJoinqueueloading, newdevicetokenbody)) },
  //   ]);
  // }



  return (
    <View style={{ flex: 1, backgroundColor: "#fff", position: "relative" }}>
      <Toast />
      <View style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15
      }}>

        <View style={{
          height: 80,
          flexDirection: "row",
          alignItems: "center",
          gap: 20
        }}>
          <View style={{
            alignItems: "center",
            justifyContent: "center"
          }}><Image
              source={require("../assets/images/profile.webp")}
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                borderColor: "rgba(0,0,0,0.4)",
                borderWidth: 1
              }}
            /></View>
          <View>
            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, marginBottom: 5 }}>{params.BarberName}</Text>
            <Text style={{ fontFamily: "montserrat-medium", fontSize: 14 }}>Estimated wait time: {params.EWT} mins</Text>
          </View>
        </View>

        <View style={{
          height: 70,
          backgroundColor: Colors.PRIMARY,
          marginTop: 5,
          paddingHorizontal: 10,
          justifyContent: "center",
          borderRadius: 5,
        }}>
          <Text style={{ fontFamily: "montserrat-semibold", fontSize: 18, color: Colors.PRIMARYTEXT }}>Select Service</Text>
          <Text style={{ fontFamily: "montserrat-medium", fontSize: 14, marginTop: 5, color: Colors.PRIMARYTEXT }}>{serviceslist.length} Service(s) Available</Text>
        </View>

        {
          loading ?
            <View style={{
              paddingVertical: 10
            }}><ActivityIndicator size={20} color={"#000"} /></View> :
            serviceslist.length == 0 && ServiceStatusMessage !== "" ?
              <View style={{
                paddingVertical: 10
              }}><Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }} >{ServiceStatusMessage}</Text></View> :
              serviceslist.length > 0 && ServiceStatusMessage == "Success" && <FlatList
                data={serviceslist}
                renderItem={({ item }) => <View style={{
                  height: 80,
                  backgroundColor: "#efefef",
                  marginTop: 5,
                  paddingHorizontal: 10,
                  justifyContent: "center",
                  borderRadius: 5,
                  borderColor: "rgba(0,0,0,0.4)",
                  borderWidth: 1,
                }}>
                  <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14 }}>{item.ServiceName}</Text>

                    {
                      selectedServices.find((ser) => ser.serviceid == item.serviceid) ?
                        <Pressable
                          style={{
                            width: 30,
                            height: 30,
                            backgroundColor: "red",
                            borderRadius: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.4,
                            shadowRadius: 12,
                            elevation: 12,
                          }}
                          onPress={() => deleteServiceClicked(item)}
                        ><MaterialIcons name="delete" size={20} color="#fff" /></Pressable> :
                        <Pressable
                          style={{
                            width: 30,
                            height: 30,
                            backgroundColor: Colors.PRIMARY,
                            borderRadius: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.4,
                            shadowRadius: 12,
                            elevation: 12,
                          }}
                          onPress={() => addServiceClicked(item)}
                        ><AntDesign name="plus" size={18} color="#fff" /></Pressable>

                    }
                  </View>

                  <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Text style={{ fontFamily: "montserrat-medium", fontSize: 16, borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 1, paddingRight: 10 }}>{currentUserInfo?.[0]?.Currency == "Â£" ? "£" : currentUserInfo?.[0]?.Currency}{" "}{item.ServicePrice}</Text>
                    <Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }}>{item.Estimated_wait_time}{" "}mins</Text>
                  </View>

                </View>}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.serviceid}
              />
        }

      </View>
      {
        ServiceStatusMessage == "Success" && <Pressable
          style={{
            height: 50,
            backgroundColor: Colors.PRIMARY,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={joinqueuepressed}
        >
          <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARYTEXT }}>+JOIN QUEUE</Text>
        </Pressable>
      }

      {
        joinqueueloading && <View style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.8)",
          justifyContent: "center",
          alignItems: "center"
        }}><ActivityIndicator size={32} color={`${Colors.PRIMARYTEXT}`} /></View>
      }

    </View>
  )
}

export default selectservices

const styles = StyleSheet.create({})