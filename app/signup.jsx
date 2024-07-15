import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../constants/Colors'
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from 'expo-checkbox';

const Signup = () => {

    const [firstName, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSelected, setSelection] = useState(false);

    const signupClicked = () => {
        const signupdata = { firstName, lastname, email, password }

        console.log(signupdata)
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
    }


    return (
        <SafeAreaView style={styles.signup_container}>
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
                        value={firstName}
                    />
                    <TextInput
                        secureTextEntry={true}
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
                            value={isSelected}
                            onValueChange={(newValue) => setSelection(newValue)}
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
                        <Text
                            style={{
                                color: Colors.PRIMARYTEXT,
                                fontSize: 16,
                                fontFamily: "montserrat-medium"
                            }}
                        >Sign up</Text>
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