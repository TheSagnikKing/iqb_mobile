import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerDetailsByCustomeridAction, iqueueupdatecustomerdetailsAction } from '../redux/Actions/ProfileAction';
import Toast from 'react-native-toast-message';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const editprofile = () => {

    const [currentUserInfo, setCurrentUserInfo] = useState([])

    useEffect(() => {
        const getloginsalonuserdata = async () => {
            const userinfodata = await AsyncStorage.getItem('user-logininfo')
            setCurrentUserInfo(JSON.parse(userinfodata))
        }

        getloginsalonuserdata()
    }, [])

    const router = useRouter()

    const [fullName, setFullName] = useState("")
    const [dateofbirth, setDateofbirth] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [maketingemails, setMarketingemails] = useState(false)
    const toggleSwitch = () => setMarketingemails(previousState => !previousState);

    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUserInfo.length > 0) {
            dispatch(getCustomerDetailsByCustomeridAction(currentUserInfo?.[0]?.SalonId, currentUserInfo?.[0]?.UserName, "GetCustomerDetailsByCustomerId.php"))
            setPassword(currentUserInfo?.[0]?.Password)
            setMarketingemails(currentUserInfo?.[0]?.MaketingEmails == 1 ? true : false)
        }
    }, [dispatch, currentUserInfo])

    const getCustomerDetailsByCustomerid = useSelector(state => state.getCustomerDetailsByCustomerid)

    const {
        loading,
        response: customerdetailsdata
    } = getCustomerDetailsByCustomerid

    useEffect(() => {
        if (customerdetailsdata) {
            setFullName(`${customerdetailsdata?.CustomerFName} ${customerdetailsdata?.CustomerLName}`)
            setEmail(customerdetailsdata?.CustomerEmail)
            setPhoneNumber(customerdetailsdata?.CustomerPhone)
            setDateofbirth(customerdetailsdata?.CustomerDOB)
        }
    }, [customerdetailsdata])


    // console.log("Get Customer details ", customerdetailsdata)


    const editProfilePressed = () => {
        const editprofiledata = {
            firstname: fullName.split(" ")[0],
            lastname: fullName.split(" ")[1],
            email,
            dob: dateofbirth,
            password,
            mobile: phoneNumber,
            maketingemails: maketingemails ? 1 : 0,
            salonid: currentUserInfo?.[0]?.SalonId
        }

        // console.log("Edit Profile ", editprofiledata)

        Alert.alert('Update Profile', 'Are you sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => dispatch(iqueueupdatecustomerdetailsAction(editprofiledata, "iqueueupdatecustomerdetails.php", router, currentUserInfo)) },
        ]);
    }


    const [showModal, setShowModal] = useState(false)

    // const [selected, setSelected] = useState('');

    // console.log("Selected Date of birth ", dateofbirth)

    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const [selectedDate, setSelectedDate] = useState(getCurrentDate());

    const goToNextYear = () => {
        const currentYear = new Date(selectedDate).getFullYear();
        const newYear = currentYear + 1;
        const newDate = new Date(selectedDate);
        newDate.setFullYear(newYear);
        // console.log("sdvsdv", newDate.toISOString().split('T')[0])
        setSelectedDate(newDate.toISOString().split('T')[0]);
    };



    const goToPreviousYear = () => {
        const currentYear = new Date(selectedDate).getFullYear();
        const newYear = currentYear - 1;
        const newDate = new Date(selectedDate);
        newDate.setFullYear(newYear);
        // console.log("Previous Year:", newDate.toISOString().split('T')[0]);
        setSelectedDate(newDate.toISOString().split('T')[0]);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Toast />
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
                        {/* <TextInput
                            editable
                            placeholder='DD-MM-YYYY'
                            style={styles.input}
                            onChangeText={text => setDateofbirth(text)}
                            value={dateofbirth}
                        /> */}
                        <Pressable
                            onPress={() => setShowModal(true)}
                            style={{
                                height: 40,
                                marginBottom: 15,
                                borderBottomColor: Colors.PRIMARY,
                                borderBottomWidth: 2,
                                outlineStyle: "none",
                                fontFamily: "montserrat-medium",
                                fontSize: 16,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <Text style={{ textAlign: "left", fontFamily: "montserrat-medium", fontSize: 16 }} >{dateofbirth}</Text>
                            <View><AntDesign name="calendar" size={22} color="black" /></View>
                        </Pressable>
                    </View>

                    {
                        showModal && <Modal style={{
                            padding: 10,
                        }}>
                            <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: 20, marginTop: 20 }}>Select Your Birth Date</Text>
                            <View style={{
                                flex: 1,
                                padding: 20
                            }}>
                                <Pressable
                                    onPress={() => setShowModal(false)}
                                    style={{
                                        backgroundColor: "red",
                                        paddingHorizontal: 10,
                                        paddingVertical: 8,
                                        borderRadius: 10,
                                        width: 200,
                                        width: 45,
                                        height: 45,
                                        borderRadius: 50,
                                        marginBottom: 20,
                                        marginLeft: "auto",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                ><Entypo name="cross" size={24} color="#fff" /></Pressable>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    // marginBottom: 20,
                                    width: "95%",
                                    marginHorizontal: "auto"
                                }}>
                                    <Pressable onPress={goToPreviousYear}
                                        style={{
                                            paddingHorizontal: 10,
                                            paddingVertical: 8,
                                            backgroundColor: Colors.PRIMARY,
                                            borderRadius: 5,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 6 },
                                            shadowOpacity: 0.4,
                                            shadowRadius: 12,
                                            elevation: 5,
                                        }}
                                    >
                                        <Text style={{
                                            color: Colors.PRIMARYTEXT,
                                            fontSize: 13,
                                            fontFamily: "montserrat-medium"
                                        }}>Prev Year</Text>
                                    </Pressable>

                                    <Pressable onPress={goToNextYear}
                                        style={{
                                            paddingHorizontal: 10,
                                            paddingVertical: 8,
                                            backgroundColor: Colors.PRIMARY,
                                            borderRadius: 5,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 6 },
                                            shadowOpacity: 0.4,
                                            shadowRadius: 12,
                                            elevation: 5,
                                        }}
                                    >
                                        <Text style={{
                                            color: Colors.PRIMARYTEXT,
                                            fontSize: 13,
                                            fontFamily: "montserrat-medium"
                                        }}>Next Year</Text>
                                    </Pressable>
                                </View>

                                <Calendar
                                    initialDate={selectedDate}
                                    onDayPress={day => {
                                        setDateofbirth(() => {
                                            const dayarray = day.dateString.split("-")
                                            // console.log(dayarray)
                                            setShowModal(false)
                                            return dayarray.reverse().join("-")
                                        });
                                    }}

                                    onMonthChange={month => {
                                        console.log('month changed', month);
                                    }}
                                    style={{
                                        marginTop: 10,
                                        width: "95%",
                                        marginHorizontal: "auto",
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "#000",
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 6 },
                                        shadowOpacity: 0.4,
                                        shadowRadius: 12,
                                        elevation: 5,
                                    }}
                                />
                            </View>
                        </Modal>
                    }

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

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARY }}>Receive salon updates/offer</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={maketingemails ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={maketingemails}
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
                onPress={() => editProfilePressed()}>
                <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARYTEXT }}>Update</Text>
            </Pressable>
        </SafeAreaView >
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