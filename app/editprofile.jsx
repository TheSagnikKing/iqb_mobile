import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors'

const editprofile = () => {

    const router = useRouter()

    const [fullName, setFullName] = useState("")
    const [dateofbirth, setDateofbirth] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.editprofile_header_container}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30
                    }}>
                        <Pressable onPress={() => router.push("/profile")}><AntDesign name="arrowleft" size={24} color="black" /></Pressable>
                        <Text style={{ fontFamily: "montserrat-medium", fontSize: 18 }}>Edit Profile</Text>
                    </View>

                    <Pressable
                        onPress={() => router.push("/home")}
                    >
                        <Entypo name="cross" size={24} color="black" />
                    </Pressable>

                </View>
                <View style={{ padding: 10 }}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ textAlign: "left", fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARY }}>Full Name</Text>
                        <TextInput
                            editable
                            placeholder='Full Name'
                            style={styles.input}
                            onChangeText={text => setFullName(text)}
                            value={fullName}
                        />
                    </View>

                    <View>
                        <Text style={{ textAlign: "left", fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARY }}>Date of Birth</Text>
                        <TextInput
                            editable
                            placeholder='Date of Birth'
                            style={styles.input}
                            onChangeText={text => setDateofbirth(text)}
                            value={dateofbirth}
                        />
                    </View>

                    <View>
                        <Text style={{ textAlign: "left", fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARY }}>Phone Number</Text>
                        <TextInput
                            editable
                            placeholder='Phone Number'
                            style={styles.input}
                            onChangeText={text => setPhoneNumber(text)}
                            value={phoneNumber}
                        />
                    </View>

                    <View>
                        <Text style={{ textAlign: "left", fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARY }}>Mail Address</Text>
                        <TextInput
                            editable
                            placeholder='Mail Address'
                            style={styles.input}
                            onChangeText={text => setEmail(text)}
                            value={email}
                        />
                    </View>

                    <View>
                        <Text style={{ textAlign: "left", fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARY }}>Password</Text>
                        <TextInput
                            editable
                            placeholder='Password'
                            style={styles.input}
                            onChangeText={text => setPassword(text)}
                            value={password}
                        />
                    </View>

                    <View style={{ flexDirection: "row", alignItems:"center", justifyContent:"space-between" }}>
                        <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARY}}>Receive salon updates/offer</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
            </ScrollView>
            <Pressable
                style={{
                    height: 50,
                    backgroundColor: Colors.PRIMARY,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={() => alert("Are you Sure ?")}>
                <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARYTEXT }}>Update</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default editprofile

const styles = StyleSheet.create({
    editprofile_header_container: {
        height: 50,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "rgba(0,0,0,0.2)",
        borderBottomWidth: 1
    },
    input: {
        height: 40,
        marginBottom: 15,
        // paddingHorizontal: 4,
        borderBottomColor: Colors.PRIMARY,
        borderBottomWidth: 2,
        outlineStyle: "none",
        fontFamily: "montserrat-medium",
        fontSize: 16
    },
})