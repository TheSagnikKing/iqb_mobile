import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../constants/Colors'
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from "react-redux"

const Signin = () => {

    const demo = useSelector(state => state.demo)

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signinClicked = () => {
        const signindata = { email, password }

        console.log(signindata)
        setEmail("")
        setPassword("")

        router.push("/home")
    }

    return (
        <SafeAreaView style={styles.signin_container}>
            <ScrollView style={styles.signin_content_container}>
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
                            elevation:12,
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
                    >Welcome To Iqueue Barbers</Text>
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
                        <Text
                            style={{
                                fontFamily: "montserrat-medium",
                                fontSize: 14
                            }}
                        >Forgot Password ?</Text>
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
                        <Text
                            style={{
                                color: Colors.PRIMARYTEXT,
                                fontSize: 16,
                                fontFamily: "montserrat-medium"
                            }}
                        >Sign in</Text>
                    </Pressable>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
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
                        <Text
                            style={{
                                fontFamily: "montserrat-medium",
                                fontSize: 14,
                                color: Colors.PRIMARY,
                                paddingLeft: 8,
                                lineHeight: 15
                            }}
                        >Help</Text>
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