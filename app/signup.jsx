import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Switch, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../constants/Colors'
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from 'expo-checkbox';
import { useDispatch, useSelector } from "react-redux"
import { signupAction, signupCheckEmailAction } from '../redux/Actions/AuthAction';
import Toast from 'react-native-toast-message';

// signup click -> check email 
// if success -> go to agree page
// if agree success -> iqueueregister api means signup api.
// then a pop will open when press ok call MapUserSalon and IqueuesendEmail
// after then again a ok popup will come. when press take me to login page


//change location
// in the changelocation atlease two letter when type will call (places apis).
// then user choose a place and press search button. 
// it will retrievesalonlist.php. filter api is not present 
// when a salon is choosen then go to saloninfo.
// there immediately call the iqbsalons.php (this api entire data to be saved in the async storage)
// after that connect salon press save all the info into the async storage and then redirect to signin page


const Signup = () => {

    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [activationcode, setActivationcode] = useState(123456)
    const [activated, setActivated] = useState("N")
    const [loggedin, setLoggedin] = useState("N")
    const [registerdate, setRegisterdate] = useState("08-07-2024")
    const [salonid, setSalonid] = useState(0)
    const [maketingemails, setMarketingemails] = useState(false)
    // const [UserLevel, setUserLevel] = useState(0)
    const [IsBarber, setIsBarber] = useState(false)

    const router = useRouter()

    useEffect(() => {
        function formatDate(date) {

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            setRegisterdate(`${day}-${month}-${year}`)
        }

        const today = new Date();
        formatDate(today);


        generateRandomCode = () => {
            const min = 100000;
            const max = 999999;
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            const randomCode = randomNum;
            setActivationcode(randomCode)
        }

        generateRandomCode()
    }, [])

    const dispatch = useDispatch()

    const signupCheckEmail = useSelector(state => state.signupCheckEmail)

    const {
        loading
    } = signupCheckEmail

    const signupClicked = () => {

        const signupdata = {
            firstname,
            lastname,
            email,
            password,
            activationcode,
            activated,
            loggedin,
            registerdate,
            salonid: 127,
            maketingemails: maketingemails ? 1 : 0,
            UserLevel: IsBarber ? 1 : 0,
            IsBarber
        }

        dispatch(signupCheckEmailAction(signupdata, "iqueuecheckemail.php", router))

        // router.push({ pathname: "/agree", params: signupdata })

        // console.log(signupdata)

        // dispatch(signupAction(signupdata, "iqueueregister.php", router))
    }

    const toggleSwitch = () => setMarketingemails(previousState => !previousState);

    return (
        <SafeAreaView style={styles.signup_container}>
                  <Toast />
            <ScrollView style={styles.signup_content_container}>
                <View style={styles.signup_content_top}>
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
                            fontSize: 15,
                            textAlign: "center",
                            marginBottom: 10
                        }}
                    >Register Now</Text>
                </View>
                <View style={styles.signup_content_medium}>
                    <View
                        style={{
                            borderBottomColor: Colors.PRIMARY,
                            borderBottomWidth: 2,
                            marginBottom: 15
                        }}
                    >
                        <Text style={{
                            lineHeight: 35,
                            textAlign: "center",
                            fontFamily: "montserrat-semibold",
                            fontSize: 18
                        }}>General</Text>
                    </View>
                    <TextInput
                        editable
                        placeholder='First Name'
                        style={styles.input}
                        onChangeText={text => setFirstName(text)}
                        value={firstname}
                    />
                    <TextInput
                        editable
                        placeholder='Last Name'
                        style={styles.input}
                        onChangeText={text => setLastName(text)}
                        value={lastname}
                    />
                    <TextInput
                        editable
                        placeholder='Email'
                        style={styles.input}
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                    <TextInput
                        secureTextEntry={true}
                        editable
                        placeholder='Password'
                        style={styles.input}
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12,
                            alignItems: "center"
                        }}
                    >
                        <CheckBox
                            disabled={false}
                            value={IsBarber}
                            onValueChange={(newValue) => setIsBarber(newValue)}
                            style={{
                                width: 22,
                                height: 22,
                            }}
                        />
                        <Text
                            style={{
                                fontFamily: "montserrat-medium",
                                fontSize: 14
                            }}
                        >I am also a barber</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, gap: 15 }}>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={maketingemails ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={maketingemails}
                        />
                        <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14, color: Colors.PRIMARY }}>Receive salon updates/offer</Text>
                    </View>
                </View>
                <View style={styles.signup_content_bottom}>
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
                        onPress={signupClicked}
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
                                >Sign up</Text>
                        }

                    </Pressable>

                    <Text
                        style={{
                            marginTop: 60,
                            textAlign: "center",
                            fontFamily: 'montserrat-medium',
                            fontSize: 16
                        }}
                    >Already have an account ? <Link
                        href="/signin"
                        style={{ color: Colors.PRIMARY }}
                    >Sign in</Link></Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({
    signup_container: {
        backgroundColor: Colors.light.background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    signup_content_container: {
        width: "95%",
        height: "auto",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 40
    },
    signup_content_top: {
        // backgroundColor: "red"
    },
    signup_content_medium: {
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
    signup_content_bottom: {
        // backgroundColor: "gray"
    }
})