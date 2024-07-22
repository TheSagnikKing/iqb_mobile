import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../constants/Colors'
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { forgotcheckemailAction } from '../redux/Actions/ProfileAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Forgot = () => {
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

    const dispatch = useDispatch()

    // console.log(currentSalonInfo)

    const { loading } = useSelector(state => state.forgotcheckemail)

    const forgotPressed = () => {
        const sendpassworddata = {
            vSalonname: currentSalonInfo?.[0]?.SalonName,
            vSalonTel: currentSalonInfo?.[0]?.ContactTel,
            vSalonWeb: currentSalonInfo?.[0]?.SalonWebsite
        }

        dispatch(forgotcheckemailAction(email, currentSalonInfo?.[0]?.id, "iqueuecheckemail.php", sendpassworddata))
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", paddingVertical: 20, paddingHorizontal: 10 }}>
            <Toast/>
            <View style={{
                height: 60,
                width: 60,
                backgroundColor: Colors.PRIMARY,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 12,
                marginHorizontal: "auto",
                borderRadius: 50,
                marginBottom: 10
            }}><FontAwesome name="edit" size={30} color={Colors.PRIMARYTEXT} /></View>
            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 18, marginBottom: 15, textAlign: "center" }}>Retrive Your Password</Text>

            <Text style={{ fontFamily: "montserrat-medium", fontSize: 14, textAlign: "center" }}>We know that somethings people do forget their passwords. so enter your email and click on 'RETRIEVE MY PASSWORD' button. We will contact you shortly!</Text>

            <TextInput
                editable
                placeholder='Email Id'
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
            />

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
                onPress={() => forgotPressed()}
            >
                {
                    loading ? <ActivityIndicator size={20} color={"#fff"} /> :
                        <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14, color: Colors.PRIMARYTEXT }}>RETRIEVE MY PASSWORD</Text>
                }

            </Pressable>

            <Pressable onPress={() => router.push("/signin")}>
                <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARY, textAlign: "center" }}>CANCEL</Text>
            </Pressable>
        </View>
    )
}

export default Forgot

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderBottomColor: Colors.PRIMARY,
        borderBottomWidth: 2,
        outlineStyle: "none",
        fontFamily: "montserrat-medium",
    },
})