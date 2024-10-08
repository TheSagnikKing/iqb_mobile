import { StyleSheet, Text, View, ScrollView, Pressable, FlatList, Alert, Platform } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from '../../components/Header/Header'
import { Fontisto, MaterialIcons, Entypo, Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { adminRet2Action, iqueuedeleteJoinqAction } from '../../redux/Actions/HomeAction';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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

const Home = () => {

   //Notification code =========

   const [expoPushToken, setExpoPushToken] = useState('');
   const [notification, setNotification] = useState(
     undefined
   );
   const notificationListener = useRef();
   const responseListener = useRef();
 
 
   console.log("EXPO PUSH TOKEN HOME SCREEN", expoPushToken)
 
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

  const [backPressCount, setBackPressCount] = useState(0);

  const handleBackPress = useCallback(() => {
    if (backPressCount === 0) {
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
      setBackPressCount(1);

      const timer = setTimeout(() => setBackPressCount(0), 2000);
      return true;
    } else if (backPressCount === 1) {
      BackHandler.exitApp();
    }
    return true;
  }, [backPressCount]);

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        backHandler.remove();
      };
    }, [handleBackPress])
  );

  const [currentUserInfo, setCurrentUserInfo] = useState([])
  const [currentSalonInfo, setCurrentSalonInfo] = useState([])

  useEffect(() => {
    const getloginsalonuserdata = async () => {
      const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
      const userinfodata = await AsyncStorage.getItem('user-logininfo')
      setCurrentSalonInfo(JSON.parse(saloninfodata))
      setCurrentUserInfo(JSON.parse(userinfodata))
    }

    getloginsalonuserdata()
  }, [])


  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUserInfo.length > 0 && expoPushToken.length > 0) {
      dispatch(adminRet2Action({ username: currentUserInfo?.[0]?.UserName, salonid: currentUserInfo?.[0]?.SalonId, type: currentUserInfo?.[0]?.serviceDeviceType, token: expoPushToken }, "adminMergedRet2.php"))
    }
  }, [dispatch, currentUserInfo, expoPushToken])

  useFocusEffect(
    useCallback(() => {
      if (currentUserInfo.length > 0 && expoPushToken.length > 0) {
        const interval = setInterval(() => {
          dispatch(adminRet2Action(
            {
              username: currentUserInfo?.[0]?.UserName,
              salonid: currentUserInfo?.[0]?.SalonId,
              type: currentUserInfo?.[0]?.serviceDeviceType,
              token: expoPushToken
            },
            "adminMergedRet2.php"
          ));
        }, 30000);

        return () => clearInterval(interval);
      }
    }, [dispatch, currentUserInfo, expoPushToken])
  );

  // console.log("THE CURRENT USERNAME ", currentUserInfo?.[0]?.UserName)

  const admiMergeRet2 = useSelector(state => state.adminRet2)

  const {
    loading,
    response
  } = admiMergeRet2

  // console.log("Admin Merge Ret 2 Response ", response)

  const router = useRouter()
  const [join, setJoin] = useState(false)

  const menulistdata = [
    {
      _id: 1,
      name: "Select Barber",
      icon: <Fontisto name="person" size={18} color={"#000"} />,
      url: "/selectbarber",
      animationdelay: 300
    },
    {
      _id: 2,
      name: "Auto Join",
      icon: <Fontisto name="persons" size={18} color={"#000"} />,
      url: "/autojoin",
      animationdelay: 400
    },
    {
      _id: 3,
      name: "Join Group",
      icon: <FontAwesome6 name="person-walking-arrow-right" size={18} color={"#000"} />,
      url: "/joingroup",
      animationdelay: 500
    }
  ]

  const cancelQueue = (UserName, salonid, endpoint, dispatch, loggedinUsername, Name) => {
    Alert.alert('Delete', `Are you sure you want to cancel booking of ${Name} ?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: async () => await iqueuedeleteJoinqAction(UserName, salonid, endpoint, dispatch, "N/A", loggedinUsername) },
    ]);
  }


  const cancelAllqueue = (UserName, salonid, endpoint, dispatch, loggedinUsername) => {
    Alert.alert('Delete', `Are you sure you want to cancel booking of all queues ?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: async () => await iqueuedeleteJoinqAction(UserName, salonid, endpoint, dispatch, response?.gcCode, loggedinUsername) },
    ]);
  }
  return (
    <SafeAreaView style={{ flex: 1, position: "relative", backgroundColor: "#fff" }}>
      <Header />
      <ScrollView style={styles.home_container}>

        <View style={{
          borderBottomColor: "rgba(0,0,0,0.4)",
          borderBottomWidth: 2,
          paddingBottom: verticalScale(10)
        }}>
          <Text
            style={{
              fontFamily: "montserrat-semibold",
              textAlign: "center",
              marginBottom: verticalScale(30),
              fontSize: moderateScale(16)
            }}
          >Information</Text>
          <Text style={{ fontFamily: "montserrat-medium" }}>{response?.SalonText}</Text>
        </View>

        <View style={styles.queue_status_container}>
          <View style={[styles.queue_status_item, { borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 2, height: 200 }]}>
            <View style={styles.queue_status_item_icon}>
              <Fontisto name="scissors" size={moderateScale(24)} color="#fff" />
              <View style={[styles.statusonline, { backgroundColor: response?.SystemStatus ? "limegreen" : "red" }]}></View>
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: moderateScale(16), marginBottom: 5 }}>System Status</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: moderateScale(16) }}>{response?.SystemStatus ? "On" : "Off"}</Text>
            </View>
          </View>
          <View style={[styles.queue_status_item, { borderBottomColor: "rgba(0,0,0,0.4)", borderBottomWidth: 2, height: 200 }]}>
            <View style={styles.queue_status_item_icon}>
              <MaterialCommunityIcons name="human-queue" size={moderateScale(26)} color="#fff" />
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: moderateScale(16), marginBottom: 5 }}>Queuing</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: moderateScale(16) }}>{response?.Queuing}</Text>
            </View>
          </View>

          <View style={[styles.queue_status_item, { borderTopColor: "rgba(0,0,0,0.4)", borderTopWidth: 2, height: 200 }]}>
            <View style={styles.queue_status_item_icon}>
              <FontAwesome6 name="person-circle-exclamation" size={moderateScale(24)} color="#fff" />
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: moderateScale(16), marginBottom: 5 }}>Barbers On Duty</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: moderateScale(16) }}>{response?.BarbersOnDuty}</Text>
            </View>
          </View>
          <View style={[styles.queue_status_item, { borderLeftColor: "rgba(0,0,0,0.4)", borderLeftWidth: 2, height: 200 }]}>
            <View style={styles.queue_status_item_icon}>
              <Ionicons name="person-add-sharp" size={moderateScale(24)} color="#fff" />
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: moderateScale(16), marginBottom: 5 }}>Next In Queue</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: moderateScale(16) }}>{response?.NextPositionAvailable}</Text>
            </View>
          </View>

          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -25 }, { translateY: -25 }],
              backgroundColor: "#fff",
              borderRadius: 25,
              height: verticalScale(50),
              width: scale(50),
            }}
          ></View>
        </View>

        <View style={{
          marginTop: verticalScale(15),
          borderTopColor: "rgba(0,0,0,0.4)",
          borderTopWidth: 2
        }}></View>

        <View
          style={{
            height: verticalScale(200),
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: moderateScale(20)
            }}
          >
            <View style={styles.queue_status_item_icon}>
              <MaterialCommunityIcons name="progress-clock" size={moderateScale(35)} color="#fff" />
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: moderateScale(16), marginBottom: verticalScale(5) }}>Estimated Wait Time</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: moderateScale(16) }}>{response?.EstimatedWaitTime}</Text>
            </View>
          </View>
        </View>
      </ScrollView>


      {
        response?.QStatusList?.length == 0 ? (<View style={{
          position: "absolute",
          right: moderateScale(15),
          bottom: moderateScale(15),
          display: response?.SystemStatus === true ? "flex" : "none"
        }}>
          <Pressable
            style={{
              width: scale(45),
              height: verticalScale(45),
              backgroundColor: Colors.PRIMARY,
              borderRadius: moderateScale(50),
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setJoin((prev) => !prev)}
          >{
              join ? <Entypo name="cross" size={moderateScale(24)} color="#fff" /> : <MaterialIcons name="person-add-alt-1" size={moderateScale(24)} color="#fff" />
            }
          </Pressable>

          {
            join && <View
              style={{
                height: "auto",
                width: scale(220),
                position: "absolute",
                top: verticalScale(-160),
                right: scale(3),
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 10,
                flexDirection: "column",
                shadowColor: '#fff',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 5,
              }}
            >

              <FlatList
                data={menulistdata}
                renderItem={({ item }) => <View style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: moderateScale(10),
                  marginBottom: moderateScale(5),
                  animationdelay: 300
                }}>
                  <Pressable
                    onPress={() => {
                      router.push(item.url)
                      setJoin(false)
                    }}

                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: moderateScale(10)
                    }}
                  >
                    <Text style={{
                      lineHeight: 30,
                      backgroundColor: "#efefef",
                      paddingHorizontal: moderateScale(15),
                      borderRadius: 15,
                      fontFamily: "montserrat-semibold",
                      fontSize: moderateScale(14),
                      borderColor: Colors.PRIMARY,
                      borderWidth: 1,
                    }}>{item.name}</Text>
                    <View
                      style={{
                        width: scale(40),
                        height: verticalScale(40),
                        backgroundColor: "#efefef",
                        borderColor: Colors.PRIMARY,
                        borderWidth: 1,
                        borderRadius: moderateScale(50),
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >{item.icon}</View>
                  </Pressable>
                </View>
                }
                keyExtractor={item => item._id}
              />

            </View>
          }
        </View>) : response?.QStatusList?.length > 0 && (<View style={{
          borderTopWidth: 1,
          borderTopColor: "rgba(0,0,0,0.4)",
          backgroundColor: "#efefef"
        }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: moderateScale(20)
          }}>
            <Text style={{
              textAlign: "center",
              fontFamily: "montserrat-bold",
              marginVertical: moderateScale(20),
              fontSize: moderateScale(14),
            }}>Queue Status</Text>

            {
              response?.QStatusList?.length > 1 && <Pressable onPress={() => cancelAllqueue(currentUserInfo?.[0]?.UserName, currentUserInfo?.[0]?.SalonId, "iqueuedeletejoinedq.php", dispatch, currentUserInfo?.[0]?.UserName)}>
                <Text style={{ color: "red", fontWeight: 500, fontSize: moderateScale(12) }}> Cancel All queues</Text>
              </Pressable>
            }

          </View>
          <View style={{
            marginBottom: moderateScale(20),
            height: response?.QStatusList?.length > 1 ? verticalScale(130) : verticalScale(60)
          }}>
            <FlatList
              data={response?.QStatusList}
              renderItem={({ item }) => <View style={{
                width: "90%",
                height: verticalScale(60),
                backgroundColor: Colors.PRIMARY,
                marginHorizontal: "auto",
                zIndex: 2,
                borderRadius: moderateScale(5),
                padding: moderateScale(10),
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: moderateScale(10)
              }}>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: moderateScale(10)
                }}>
                  <Text style={{ color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold", fontSize: moderateScale(12) }}>{item?.SlNo}</Text>
                  <View>
                    <Text style={{ width: scale(105), color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold", fontSize: moderateScale(12) }} numberOfLines={1} ellipsizeMode="tail">Name: {item?.Name}</Text>
                    <Text style={{ width: scale(105), color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold", fontSize: moderateScale(12) }} numberOfLines={1} ellipsizeMode="tail">Barber: {item?.Barber}</Text>
                  </View>
                </View>
                <View style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: moderateScale(20)
                }}>
                  <View style={{
                    backgroundColor: "#000",
                    height: verticalScale(30),
                    width: scale(60),
                    borderColor: "#fff",
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}><Text style={{ textAlign: "center", color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold", fontSize: moderateScale(14) }}>{item?.SlNo == 1 ? "Next" : item?.TimeData}</Text></View>

                  <Pressable style={{
                    width: scale(30),
                    height: verticalScale(30),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderRadius: moderateScale(50),
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.4,
                    shadowRadius: 12,
                    elevation: 5,

                  }}
                    onPress={() => cancelQueue(item.UserName, currentUserInfo?.[0]?.SalonId, "iqueuedeletejoinedq.php", dispatch, currentUserInfo?.[0]?.UserName, item?.Name)}
                  ><MaterialCommunityIcons name="cancel" size={moderateScale(24)} color="red" /></Pressable>
                </View>
              </View>}
              keyExtractor={item => item.UserName}
            />
          </View>
        </View>)
      }

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  home_container: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  queue_status_container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    height: 405,
    position: "relative",
  },
  queue_status_item: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  queue_status_item_icon: {
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: Colors.PRIMARY,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
    position: "relative"
  },
  statusonline: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 17,
    width: 17,
    borderRadius: 9,
    borderColor: "#fff",
    borderWidth: 2
  }
})
