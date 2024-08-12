// import { StyleSheet, Text, View, Platform, PermissionsAndroid, TextInput, Pressable, ScrollView, ActivityIndicator, Linking, Alert } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Colors } from '../constants/Colors'
// import { Feather } from '@expo/vector-icons';
// import { Link, useRouter } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useDispatch, useSelector } from "react-redux"
// import { signinAction } from '../redux/Actions/AuthAction';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-toast-message';


// import { StatusBar } from 'expo-status-bar';
// import messaging from '@react-native-firebase/messaging';

// const Signin = () => {

//     // ====== Notification ===============

//     // const requestUserPermission = async () => {
//     //     const authStatus = await messaging().requestPermission();
//     //     const enabled =
//     //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     //     if (enabled) {
//     //         console.log('Authorization status:', authStatus);
//     //     }
//     // }

//     // useEffect(() => {
//     //     if (requestUserPermission()) {
//     //         messaging()
//     //             .getToken()
//     //             .then((token) => {
//     //                 console.log("Token ", token)
//     //             })
//     //     } else {
//     //         console.log("Permission not granted ", authStatus)
//     //     }

//     //     //Check whether an intial notification is available
//     //     messaging()
//     //         .getInitialNotification()
//     //         .then(async (remoteMessage) => {
//     //             if (remoteMessage) {
//     //                 "Notification caused app to open from quit state: ",
//     //                     remoteMessage.notification
//     //             }
//     //         })

//     //     // Assume a message-notification contains a "type" property in the data payload of the screen to open 

//     //     messaging.onNotificationOpenedApp((remoteMessage) => {
//     //         console.log("Notification caused app to open from background state: ", remoteMessage.notification)
//     //     })

//     //     // Register background handler 
//     //     messaging().setBackgroundMessageHandler(async remoteMessage => {
//     //         console.log('Message handled in the background!', remoteMessage);
//     //     });

//     //     const unsubscribe = messaging()
//     //         .onMessage(async (remoteMessage) => {
//     //             Alert.alert("A new FCM message arrived! ", JSON.stringify(remoteMessage))
//     //         })

//     //     return unsubscribe
//     // }, [])

//     // const requestUserPermission = async () => {
//     //     const authStatus = await messaging().requestPermission();
//     //     const enabled =
//     //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     //     if (enabled) {
//     //       console.log('Authorization status:', authStatus);
//     //     }

//     //     return enabled;
//     //   };

//     //   useEffect(() => {
//     //     const setupFCM = async () => {
//     //       const permissionEnabled = await requestUserPermission();
//     //       if (permissionEnabled) {
//     //         const token = await messaging().getToken();
//     //         console.log('FCM TOKEN ', token);
//     //         Alert.alert("FCM TOKEN", JSON.stringify(token))

//     //       }
//     //     };

//     //     setupFCM();
//     //   }, []);


//     // ====== Notification ===============

//     async function requestUserPermission() {
//         const authStatus = await messaging().requestPermission();
//         const enabled =
//           authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//           authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//         if (enabled) {
//           console.log('Authorization status:', authStatus);
//         }
//       }

//     const getToken = async() => {
//         const token = await messaging().getToken()
//         console.log("Token = ", token)
//     }

//     useEffect(() => {
//         requestUserPermission()
//         getToken()
//     },[])

//     const [currentSalonInfo, setCurrentSalonInfo] = useState([])

//     useEffect(() => {
//         const getloginsalonuserdata = async () => {
//             const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
//             setCurrentSalonInfo(JSON.parse(saloninfodata))
//         }

//         getloginsalonuserdata()
//     }, [])

//     const router = useRouter()

//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const dispatch = useDispatch()

//     const {
//         loading,
//         response
//     } = useSelector(state => state.signin)

//     const validateEmail = (email) => {
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     };

//     const signinClicked = async () => {

//         if (email == "" && password == "") {
//             Toast.show({
//                 type: 'error',
//                 text1: "Please fill all the fields",
//                 position: "bottom",
//                 bottomOffset: 0,
//             });
//         } else if (!validateEmail(email)) {
//             Toast.show({
//                 type: 'error',
//                 text1: "Invalid email format",
//                 position: "bottom",
//                 bottomOffset: 0,
//             });
//         } else if (password.length < 6) {
//             Toast.show({
//                 type: 'error',
//                 text1: "Password length must be 6 charecters",
//                 position: "bottom",
//                 bottomOffset: 0,
//             });
//         } else if (currentSalonInfo.length == 0) {
//             Toast.show({
//                 type: 'error',
//                 text1: "Please select a salon!",
//                 position: "bottom",
//                 bottomOffset: 0,
//             });
//         } else {
//             dispatch(signinAction(email, password, currentSalonInfo?.[0]?.id, router, "iqueuelogin.php"))
//         }
//     }

//     return (
//         <SafeAreaView style={styles.signin_container}>
//             <Toast />
//             {/* <ScrollView style={styles.signin_content_container}>
//                 <View style={styles.signin_content_top}>
//                     <View
//                         style={{
//                             width: 55,
//                             height: 55,
//                             backgroundColor: Colors.PRIMARY,
//                             borderRadius: 50,
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             shadowColor: '#000',
//                             shadowOffset: { width: 0, height: 6 },
//                             shadowOpacity: 0.4,
//                             shadowRadius: 12,
//                             elevation: 12,
//                             marginHorizontal: "auto",
//                             marginBottom: 20
//                         }}
//                     ><Feather
//                             name="scissors"
//                             size={30}
//                             color={Colors.PRIMARYTEXT}
//                         /></View>
//                     <Text
//                         style={{
//                             fontFamily: "montserrat-semibold",
//                             fontSize: 16,
//                             textAlign: "center",
//                             marginBottom: 10
//                         }}
//                     >Welcome To <Text>{currentSalonInfo?.[0]?.SalonName}</Text></Text>
//                     <Text
//                         style={{
//                             fontFamily: "montserrat-semibold",
//                             fontSize: 15,
//                             textAlign: "center",
//                             marginBottom: 10
//                         }}
//                     >Enter your user ID & password to login</Text>
//                 </View>
//                 <View style={styles.signin_content_medium}>
//                     <TextInput
//                         editable
//                         placeholder='Enter Your user ID or Email'
//                         style={styles.input}
//                         onChangeText={text => setEmail(text)}
//                         value={email}
//                     />
//                     <TextInput
//                         secureTextEntry={true}
//                         editable
//                         placeholder='Enter Your Password'
//                         style={styles.input}
//                         onChangeText={text => setPassword(text)}
//                         value={password}
//                     />
//                     <View
//                         style={{
//                             display: "flex",
//                             flexDirection: "row",
//                             justifyContent: "flex-end",
//                         }}
//                     >
//                         <Pressable
//                             onPress={() => router.push("/forgot")}
//                         ><Text style={{
//                             fontFamily: "montserrat-medium",
//                             fontSize: 14
//                         }}>Forgot Password ?</Text></Pressable>
//                     </View>
//                 </View>
//                 <View style={styles.signin_content_bottom}>
//                     <Pressable
//                         style={{
//                             backgroundColor: Colors.PRIMARY,
//                             paddingHorizontal: 25,
//                             paddingVertical: 10,
//                             borderRadius: 5,
//                             shadowColor: '#000',
//                             shadowOffset: { width: 0, height: 6 },
//                             shadowOpacity: 0.4,
//                             shadowRadius: 12,
//                             elevation: 5,
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             marginBottom: 25
//                         }}
//                         onPress={signinClicked}
//                     >
//                         {
//                             loading ?
//                                 <ActivityIndicator size={20} color={"#fff"} /> :
//                                 <Text
//                                     style={{
//                                         color: Colors.PRIMARYTEXT,
//                                         fontSize: 16,
//                                         fontFamily: "montserrat-medium"
//                                     }}
//                                 >Sign in</Text>
//                         }

//                     </Pressable>

//                     <View
//                         style={{
//                             display: "flex",
//                             flexDirection: "row",
//                             justifyContent: "center",
//                             alignItems: "center",
//                         }}
//                     >
//                         <Pressable onPress={() => router.push("/changelocation")}><Text
//                             style={{
//                                 fontFamily: "montserrat-medium",
//                                 fontSize: 14,
//                                 color: Colors.PRIMARY,
//                                 borderRightWidth: 2,
//                                 borderRightColor: Colors.PRIMARY,
//                                 paddingRight: 8,
//                                 lineHeight: 15
//                             }}
//                         >Change Location</Text>
//                         </Pressable>
//                         <Pressable
//                             onPress={() => router.push("/help")}
//                         ><Text
//                             style={{
//                                 fontFamily: "montserrat-medium",
//                                 fontSize: 14,
//                                 color: Colors.PRIMARY,
//                                 paddingLeft: 8,
//                                 lineHeight: 15
//                             }}
//                         >Help</Text></Pressable>
//                     </View>

//                     <Text
//                         style={{
//                             marginTop: 60,
//                             textAlign: "center",
//                             fontFamily: 'montserrat-medium',
//                             fontSize: 16
//                         }}
//                     >Don't have an account ? <Link
//                         href="/signup"
//                         style={{ color: Colors.PRIMARY }}
//                     >Sign up</Link></Text>
//                 </View>
//             </ScrollView> */}


//             <View style={{ flex: 1, backgroundColor: "#fff" }}>
//                 <Text> Hello  There !</Text>

//                 {/* <View>
//                     <Text>FCM CODE</Text>
//                     <StatusBar style='auto'/>
//                 </View> */}
//             </View>
//         </SafeAreaView>
//     )
// }

// export default Signin

// const styles = StyleSheet.create({
//     signin_container: {
//         backgroundColor: Colors.light.background,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flex: 1
//     },
//     signin_content_container: {
//         width: "95%",
//         height: "auto",
//         borderRadius: 10,
//         paddingHorizontal: 10,
//         paddingVertical: 10,
//         marginTop: 40
//     },
//     signin_content_top: {
//         // backgroundColor: "red"
//     },
//     signin_content_medium: {
//         marginVertical: 20
//     },
//     input: {
//         height: 40,
//         marginBottom: 15,
//         paddingHorizontal: 10,
//         borderBottomColor: Colors.PRIMARY,
//         borderBottomWidth: 2,
//         outlineStyle: "none",
//         fontFamily: "montserrat-medium",
//     },
//     signin_content_bottom: {
//         // backgroundColor: "gray"
//     }
// })


// {
//     "expo": {
//       "name": "iqb_mobile",
//       "slug": "iqb_mobile",
//       "version": "1.0.0",
//       "orientation": "portrait",
//       "icon": "./assets/images/icon.png",
//       "scheme": "myapp",
//       "userInterfaceStyle": "automatic",
//       "splash": {
//         "image": "./assets/images/splash.png",
//         "resizeMode": "contain",
//         "backgroundColor": "#ffffff"
//       },
//       "ios": {
//         "supportsTablet": true,
//         "bundleIdentifier": "com.sumeath.iqb_mobile"
//       },
//       "android": {
//         "googleServicesFile": "./google-services.json",
//         "adaptiveIcon": {
//           "foregroundImage": "./assets/images/adaptive-icon.png",
//           "backgroundColor": "#ffffff"
//         },
//         "package": "com.sumeath.iqb_mobile",
//         "permissions": [
//           "INTERNET"
//         ],
//         "intentFilters": [
//           {
//             "action": "VIEW",
//             "data": [
//               {
//                 "scheme": "https",
//                 "host": "www.google.com"
//               },
//               {
//                 "scheme": "https",
//                 "host": "www.google.com/maps"
//               }
//             ],
//             "category": [
//               "BROWSABLE",
//               "DEFAULT"
//             ]
//           }
//         ]
//       },
//       "web": {
//         "bundler": "metro",
//         "output": "static",
//         "favicon": "./assets/images/favicon.png"
//       },
//       "plugins": [
//         "@react-native-firebase/app",
//         "expo-router",
//         [
//           "expo-location",
//           {
//             "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
//           }
//         ]
//       ],
//       "experiments": {
//         "typedRoutes": true
//       },
//       "extra": {
//         "router": {
//           "origin": false
//         },
//         "eas": {
//           "projectId": "222bcc72-2837-4213-b56f-c2a31f95e7dc"
//         }
//       }
//     }
//   }

// Notification code 

// async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//     }
//   }

// const getToken = async() => {
//     const token = await messaging().getToken()
//     console.log("Token = ", token)
// }

// useEffect(() => {
//     requestUserPermission()
//     getToken()
// },[])



{/* <View style={{ flex: 1, backgroundColor: "#fff" }}>
<Text> Hello  There ! Sagnik</Text>

<View>
    <Text>FCM CODE</Text>
    <StatusBar style='auto'/>
</View> 
</View> */}

// Platform, PermissionsAndroid


/// Firebase secret key =============

// fir-fcm-98905-firebase-adminsdk-61k86-0123fcf3c8.json
// {
//     "type": "service_account",
//     "project_id": "fir-fcm-98905",
//     "private_key_id": "0123fcf3c8db7da87bfaac06e4d53011a96c6cbd",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCdTNhRyoZmYPv6\n2bBhPqPCfYWUnMXmMP/G/3J5brptPN8IpXVvJ+8XEM0zCAqgpuFTyQOBrfifi8fx\nHJjRwm6ZGZPLuwQSMuJt4cE0Tzm8dqRW1iKG6fV6HxuIN7aCHsNOcI7SKXKLreQ/\n7M9whJfLuq/4RYxJFa2Ja3+ghQPma/v85CoMxLemb4aSZAvzM9Ymwuq04G7AJ6yL\nJAL3p+ZhiY+xxP6VGEHkaQ0qhrv7e5zAVA63qHFR7m+k8Lm+yhTcM+sAmIDHoAzb\nvSc2ljfTKQnWVAeL+r196mpnK+M6Wl6mWLXBkW0fVKxU098DnU9ZbWodqBUYg9XJ\nRFj/nnmBAgMBAAECggEABGPRoa66Q38vaRfMMVqTLWldYgFiEIOLj90vL65ka4oI\nW3Bqr5h4trcUUvlFeqhNn437mBHn32QCR3tZ1HjNp14sXsIwYeWjphdn0fLoFJdn\nDLlbK1K6NBdMKGgNouIC51yCz+CyPq2ysgoE3AoHRntGT/J48M03E5+5ZxxvOG39\n2dYNhSaBBJ+3dKPaFiDJygKT21k5mgzHvKGNwV3jSHdSJDNjwuIj+brBswuBON9w\nOHaxqHmWxpXYtqWUBVlx1t8ha4mfMCFDN2rGmTJHBPNr3JeDjktT9EkMEvrB64t0\nbtrL3lcthXMMrhshUQjPQL2atQu+5l7EiCGUFkRrcQKBgQDTs+UriiEf1NHowXbi\nXPLA4PLCnNN8nSQVCVxXX7agvyFFxBVx2HV1d3XEOdVIKcqCgKUcVswtZQHPtuO3\nt0rISgPwdtchSphiTymOWjigWtQzJVLaogZunBZHrPYNyt4kSJHCifo+vpzJtPmg\ne7S8RSCGxqvO9n3aLf1aS8TclQKBgQC+NtBV0kbpQwa4f/t6NfludcVB/4t7r6Cq\nNHo23zxX66pogh3ZZpHh29eC6hYNK5knswc/wa7hgQ/+nl5gGO2RHFbZRbm2lS5j\nfZnkuhdMRpTUczn7QJw75pZcHDX83SrFK6MEafjlyXlNQfYJ4VRy8yXqG2+dUPV6\n/aipWBnCPQKBgQC8B/9XcaNEI4GhaxxNp+LRH7te0W4iM2xV5u+Gh3OtSLWjwqqN\naIXDJKyL8hYWt0+wI9UC27ET7K/0LuwJRBp+1Qa0sMkZP6kjQE6Xqli7TJFHMDJs\nEBcIbUh4tw4AaBxwO6iDEowa6LBXk49YVCfORNPEAXeeJl7Xx5tMdRnQFQKBgFpo\n11FTZx0MHK+pNTB7YxlbpOyft/6MFcOQud5G8PmhLBgMcH+avxApXB//f4e3B07V\nS0bEmojYvW96esUWVCS64ZTYDVN5SNlFI9aRlO1ORwNL2W1Q4nGeQi15wzdzMBcT\njKJWdFVUE/Hivj0n+unAJG9Hpx+REXzqADath2DJAoGAUtkXG38cyTSgvlD9JUcv\nd3u9lj9QyzBx2Po/qrITkQWsTU3sxcgpmKw2Up8ZDKmXeoyUw4rxrFqzNVPoff/A\nTynBAdiHTPhprXp8X2LkRmNWey3b7xcFdbH4uCcT4daKEwnvTyJmKoxcuI1cTcL+\nrwoPtIMRQfo5q8RfZc9+w+Y=\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-61k86@fir-fcm-98905.iam.gserviceaccount.com",
//     "client_id": "113302170450037874885",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-61k86%40fir-fcm-98905.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
//   }

// =============


import { StyleSheet, Text, View, Platform, PermissionsAndroid, TextInput, Pressable, ScrollView, ActivityIndicator, Linking, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../constants/Colors'
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from "react-redux"
import { signinAction } from '../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


import messaging from '@react-native-firebase/messaging';


const Signin = () => {

    // ====== Notification ===============

    // const requestUserPermission = async () => {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //         console.log('Authorization status:', authStatus);
    //     }
    // }

    // useEffect(() => {
    //     if (requestUserPermission()) {
    //         messaging()
    //             .getToken()
    //             .then((token) => {
    //                 console.log("Token ", token)
    //             })
    //     } else {
    //         console.log("Permission not granted ", authStatus)
    //     }

    //     //Check whether an intial notification is available
    //     messaging()
    //         .getInitialNotification()
    //         .then(async (remoteMessage) => {
    //             if (remoteMessage) {
    //                 "Notification caused app to open from quit state: ",
    //                     remoteMessage.notification
    //             }
    //         })

    //     // Assume a message-notification contains a "type" property in the data payload of the screen to open 

    //     messaging.onNotificationOpenedApp((remoteMessage) => {
    //         console.log("Notification caused app to open from background state: ", remoteMessage.notification)
    //     })

    //     // Register background handler 
    //     messaging().setBackgroundMessageHandler(async remoteMessage => {
    //         console.log('Message handled in the background!', remoteMessage);
    //     });

    //     const unsubscribe = messaging()
    //         .onMessage(async (remoteMessage) => {
    //             Alert.alert("A new FCM message arrived! ", JSON.stringify(remoteMessage))
    //         })

    //     return unsubscribe
    // }, [])

    // const requestUserPermission = async () => {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //       console.log('Authorization status:', authStatus);
    //     }

    //     return enabled;
    //   };

    //   useEffect(() => {
    //     const setupFCM = async () => {
    //       const permissionEnabled = await requestUserPermission();
    //       if (permissionEnabled) {
    //         const token = await messaging().getToken();
    //         console.log('FCM TOKEN ', token);
    //         Alert.alert("FCM TOKEN", JSON.stringify(token))

    //       }
    //     };

    //     setupFCM();
    //   }, []);


    // ====== Notification ===============


    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    const getToken = async () => {
        const token = await messaging().getToken()
        console.log("Token = ", token)
    }

    useEffect(() => {
        requestUserPermission()
        getToken()
    }, [])


    const [currentSalonInfo, setCurrentSalonInfo] = useState([])

    useEffect(() => {
        const getloginsalonuserdata = async () => {
            const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
            setCurrentSalonInfo(JSON.parse(saloninfodata))
        }

        getloginsalonuserdata()
    }, [])

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const {
        loading,
        response
    } = useSelector(state => state.signin)

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const signinClicked = async () => {

        if (email == "" && password == "") {
            Toast.show({
                type: 'error',
                text1: "Please fill all the fields",
                position: "bottom",
                bottomOffset: 0,
            });
        } else if (!validateEmail(email)) {
            Toast.show({
                type: 'error',
                text1: "Invalid email format",
                position: "bottom",
                bottomOffset: 0,
            });
        } else if (password.length < 6) {
            Toast.show({
                type: 'error',
                text1: "Password length must be 6 charecters",
                position: "bottom",
                bottomOffset: 0,
            });
        } else if (currentSalonInfo.length == 0) {
            Toast.show({
                type: 'error',
                text1: "Please select a salon!",
                position: "bottom",
                bottomOffset: 0,
            });
        } else {
            dispatch(signinAction(email, password, currentSalonInfo?.[0]?.id, router, "iqueuelogin.php"))
        }
    }

    return (
        <SafeAreaView style={styles.signin_container}>
            <Toast />
            {/* <ScrollView style={styles.signin_content_container}>
                <View style={styles.signin_content_top}>
                    <View
                        style={{
                            width: 55,
                            height: 55,
                            backgroundColor: Colors.PRIMARY,
                            borderRadius: 50,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.4,
                            shadowRadius: 12,
                            elevation: 12,
                            marginHorizontal: "auto",
                            marginBottom: 20
                        }}
                    ><Feather
                            name="scissors"
                            size={30}
                            color={Colors.PRIMARYTEXT}
                        /></View>
                    <Text
                        style={{
                            fontFamily: "montserrat-semibold",
                            fontSize: 16,
                            textAlign: "center",
                            marginBottom: 10
                        }}
                    >Welcome To <Text>{currentSalonInfo?.[0]?.SalonName}</Text></Text>
                    <Text
                        style={{
                            fontFamily: "montserrat-semibold",
                            fontSize: 15,
                            textAlign: "center",
                            marginBottom: 10
                        }}
                    >Enter your user ID & password to login</Text>
                </View>
                <View style={styles.signin_content_medium}>
                    <TextInput
                        editable
                        placeholder='Enter Your user ID or Email'
                        style={styles.input}
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                    <TextInput
                        secureTextEntry={true}
                        editable
                        placeholder='Enter Your Password'
                        style={styles.input}
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Pressable
                            onPress={() => router.push("/forgot")}
                        ><Text style={{
                            fontFamily: "montserrat-medium",
                            fontSize: 14
                        }}>Forgot Password ?</Text></Pressable>
                    </View>
                </View>
                <View style={styles.signin_content_bottom}>
                    <Pressable
                        style={{
                            backgroundColor: Colors.PRIMARY,
                            paddingHorizontal: 25,
                            paddingVertical: 10,
                            borderRadius: 5,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.4,
                            shadowRadius: 12,
                            elevation: 5,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 25
                        }}
                        onPress={signinClicked}
                    >
                        {
                            loading ?
                                <ActivityIndicator size={20} color={"#fff"} /> :
                                <Text
                                    style={{
                                        color: Colors.PRIMARYTEXT,
                                        fontSize: 16,
                                        fontFamily: "montserrat-medium"
                                    }}
                                >Sign in</Text>
                        }

                    </Pressable>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Pressable onPress={() => router.push("/changelocation")}><Text
                            style={{
                                fontFamily: "montserrat-medium",
                                fontSize: 14,
                                color: Colors.PRIMARY,
                                borderRightWidth: 2,
                                borderRightColor: Colors.PRIMARY,
                                paddingRight: 8,
                                lineHeight: 15
                            }}
                        >Change Location</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => router.push("/help")}
                        ><Text
                            style={{
                                fontFamily: "montserrat-medium",
                                fontSize: 14,
                                color: Colors.PRIMARY,
                                paddingLeft: 8,
                                lineHeight: 15
                            }}
                        >Help</Text></Pressable>
                    </View>

                    <Text
                        style={{
                            marginTop: 60,
                            textAlign: "center",
                            fontFamily: 'montserrat-medium',
                            fontSize: 16
                        }}
                    >Don't have an account ? <Link
                        href="/signup"
                        style={{ color: Colors.PRIMARY }}
                    >Sign up</Link></Text>
                </View>
            </ScrollView>  */}

            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <Text> Hello  There ! Sagnik</Text>

                <View>
                    <Text>FCM CODE</Text>
                    <StatusBar style='auto' />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Signin

const styles = StyleSheet.create({
    signin_container: {
        backgroundColor: Colors.light.background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    signin_content_container: {
        width: "95%",
        height: "auto",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 40
    },
    signin_content_top: {
        // backgroundColor: "red"
    },
    signin_content_medium: {
        marginVertical: 20
    },
    input: {
        height: 40,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderBottomColor: Colors.PRIMARY,
        borderBottomWidth: 2,
        outlineStyle: "none",
        fontFamily: "montserrat-medium",
    },
    signin_content_bottom: {
        // backgroundColor: "gray"
    }
})