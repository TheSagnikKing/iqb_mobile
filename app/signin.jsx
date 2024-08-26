import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, ActivityIndicator, Linking, Alert, Switch, Image, Platform } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Colors } from '../constants/Colors'
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from "react-redux"
import { signinAction } from '../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


import { BackHandler, ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


const Signin = () => {

    const [timejoinedq, setTimejoinedq] = useState("")
    const [rdatejoinedq, setRdatejoinedq] = useState("")

    useEffect(() => {
        const options = { hour12: false };
        const time = new Date().toLocaleTimeString([], options);
        setTimejoinedq(time)

        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0]; // This will give you the date in 'YYYY-MM-DD' format
        setRdatejoinedq(formattedDate);
    }, []);

    const handleBackPress = useCallback(() => {
        BackHandler.exitApp(); // Exit the app on a single back press
        return true;
    }, []);

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

            return () => {
                backHandler.remove();
            };
        }, [handleBackPress])
    );


    const [currentSalonInfo, setCurrentSalonInfo] = useState([])
    const [currentUserInfo, setCurrentUserInfo] = useState([])

    useEffect(() => {
        const getloginsalonuserdata = async () => {
            const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
            setCurrentSalonInfo(JSON.parse(saloninfodata))
            const userinfodata = await AsyncStorage.getItem('user-logininfo')
            setCurrentUserInfo(JSON.parse(userinfodata))
        }

        getloginsalonuserdata()
    }, [])

    // console.log("Current USER INF0 ",currentUserInfo)

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [rememberdatatrue, setRememberdatatrue] = useState(false)

    useEffect(() => {
        const getRememberdataInfo = async () => {
            const rememberdatainfo = await AsyncStorage.getItem("rememberdata")

            if (rememberdatainfo) {
                const parsedata = JSON.parse(rememberdatainfo)

                // console.log("REMEMBER DATA ++++++++ ", parsedata)

                if (Object.keys(parsedata).length > 0) {
                    setRememberdatatrue(true)
                    setEmail(parsedata?.email)
                    setPassword(parsedata?.password)
                }
            }
        }

        getRememberdataInfo()
    }, [])

    const toggleSwitch = () => setRememberdatatrue(previousState => !previousState);

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
            dispatch(signinAction(email, password, currentSalonInfo?.[0]?.id, router, "iqueuelogin.php", rememberdatatrue))
        }
    }

    // console.log("Current Salon Info ", currentSalonInfo)

    return (
        <SafeAreaView style={styles.signin_container}>
            <Toast />
            <ScrollView style={styles.signin_content_container}>
                <View style={styles.signin_content_top}>
                    {/* <View
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
                        /></View> */}

                    <View
                        style={{
                            backgroundColor: Colors.PRIMARY,
                            width: scale(75),
                            height: verticalScale(75),
                            borderRadius: moderateScale(50),
                            marginHorizontal: "auto",
                            marginTop: moderateScale(20),
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.4,
                            shadowRadius: 12,
                            marginBottom: moderateScale(30)
                        }}>
                        {
                            currentSalonInfo?.[0]?.SalonAppIcon && <Image
                                source={{ uri: `https://server.iqueuebarbers.com/~iqueue/SalonAppIcons/${currentSalonInfo?.[0]?.SalonAppIcon}` }}
                                style={{
                                    width: scale(70),
                                    height: verticalScale(70),
                                    borderRadius: moderateScale(50)
                                }}
                            />
                        }

                    </View>
                    <Text
                        style={{
                            fontFamily: "montserrat-semibold",
                            fontSize: moderateScale(16),
                            textAlign: "center",
                            marginBottom: moderateScale(10)
                        }}
                    >Welcome To <Text>{currentSalonInfo?.[0]?.SalonName}</Text></Text>
                    <Text
                        style={{
                            fontFamily: "montserrat-semibold",
                            fontSize: moderateScale(15),
                            textAlign: "center",
                            marginBottom: moderateScale(10)
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
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: moderateScale(1)
                        }}>
                            {/* <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={rememberme ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={rememberme}
                            /> */}


                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={rememberdatatrue ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={rememberdatatrue}
                            />
                            <Text style={{
                                fontFamily: "montserrat-semibold",
                                fontSize: moderateScale(10)
                            }}>Remember me login</Text>
                        </View>
                        <Pressable
                            onPress={() => router.push("/forgot")}
                        ><Text style={{
                            fontFamily: "montserrat-semibold",
                            fontSize: moderateScale(10),
                            color: Colors.PRIMARY
                        }}>Forgot Password ?</Text></Pressable>
                    </View>
                </View>
                <View style={styles.signin_content_bottom}>
                    <Pressable
                        style={{
                            backgroundColor: Colors.PRIMARY,
                            paddingHorizontal: scale(25),
                            paddingVertical: verticalScale(10),
                            borderRadius: moderateScale(5),
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.4,
                            shadowRadius: 12,
                            elevation: 5,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: moderateScale(25)
                        }}
                        onPress={signinClicked}
                    >
                        {
                            loading ?
                                <ActivityIndicator size={moderateScale(20)} color={"#fff"} /> :
                                <Text
                                    style={{
                                        color: Colors.PRIMARYTEXT,
                                        fontSize: moderateScale(16),
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
                                fontSize: moderateScale(14),
                                color: Colors.PRIMARY,
                                borderRightWidth: moderateScale(2),
                                borderRightColor: Colors.PRIMARY,
                                paddingRight: moderateScale(8),
                                lineHeight: moderateScale(15)
                            }}
                        >Change Location</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => router.push("/help")}
                        ><Text
                            style={{
                                fontFamily: "montserrat-medium",
                                fontSize: moderateScale(14),
                                color: Colors.PRIMARY,
                                paddingLeft: moderateScale(8),
                                lineHeight: moderateScale(15)
                            }}
                        >Help</Text></Pressable>
                    </View>

                    <Text
                        style={{
                            marginTop: verticalScale(60),
                            textAlign: "center",
                            fontFamily: 'montserrat-medium',
                            fontSize: moderateScale(16)
                        }}
                    >Don't have an account ? <Link
                        href="/signup"
                        style={{ color: Colors.PRIMARY }}
                    >Sign up</Link></Text>
                </View>
            </ScrollView>

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
        borderRadius: moderateScale(10),
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10),
        marginTop: verticalScale(40)
    },
    signin_content_top: {
        // backgroundColor: "red"
    },
    signin_content_medium: {
        marginVertical: verticalScale(20)
    },
    input: {
        height: verticalScale(40),
        marginBottom: verticalScale(15),
        paddingHorizontal: scale(10),
        borderBottomColor: Colors.PRIMARY,
        borderBottomWidth: 2,
        outlineStyle: "none",
        fontFamily: "montserrat-medium",
    },
    signin_content_bottom: {
        // backgroundColor: "gray"
    }
})