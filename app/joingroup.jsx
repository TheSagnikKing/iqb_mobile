import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { groupiqueuejoinedSelectAction } from '../redux/Actions/QueueAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

const Joingroup = () => {

    const [currentUserInfo, setCurrentUserInfo] = useState([])

    useEffect(() => {
        const getloginsalonuserdata = async () => {
            const userinfodata = await AsyncStorage.getItem('user-logininfo')
            setCurrentUserInfo(JSON.parse(userinfodata))
        }

        getloginsalonuserdata()
    }, [])

    const dispatch = useDispatch()

    const [groupjointemplate, setGroupjoinTemplate] = useState(
        {
            customerName: "",
            service: "",
            barberName: "",
            price: 0
        }
    )

    const [joinqueuetemplate, setJoinqueuetemplate] = useState({
        username: "",
        firstlastname: "",
        barbername: "",
        BarberId: 0,
        salonid: 0,
        timejoinedq: "",
        rdatejoinedq: "",
        ServiceId: 0,
        qgcode: ""
    })

    const [joinqueuesendata, setJoinqueuesenddata] = useState([])

    const router = useRouter()

    // const [randomCode, setRandomCode] = useState('');

    // useEffect(() => {
    // const generateRandomCode = () => {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let code = '';
    //     for (let i = 0; i < 6; i++) {
    //         const randomIndex = Math.floor(Math.random() * characters.length);
    //         code += characters[randomIndex];
    //     }

    //     dispatch({
    //         type: "QGCODE_DETAIL",
    //         payload: {
    //             qgcode: code
    //         }
    //     })

    //     return code;
    // };

    //     setRandomCode(generateRandomCode());
    // }, []);

    const groupjoinqueue = useSelector(state => state.groupjoinqueue)

    // console.log("THE JOIN GROUP QUEUE DATA FROM JOINGROUP>JSX", groupjoinqueue)

    const [joinqueuearray, setJoinquearray] = useState([])

    const customerOnChange = (text) => {
        setGroupjoinTemplate(
            { ...groupjointemplate, customerName: text }
        );
        dispatch({
            type: "CUSTOMER_NAME",
            payload: text
        })

        dispatch({
            type: "REST_DETAILS",
            payload: {
                firstlastname: text
            }
        })
    }

    // console.log(groupjointemplate)

    const groupjoin = useSelector(state => state.groupjoin)

    // console.log("JoinId", groupjoin.joinid)

    useEffect(() => {
        setJoinquearray({
            firstlastname: groupjoin.customerName
        })
        setGroupjoinTemplate({ ...groupjointemplate, service: groupjoin.services.ServiceName, barberName: groupjoin.barberName, price: groupjoin.services.ServicePrice, customerName: groupjoin.customerName });
        // console.log("Group join new groupjoinqueue ", groupjoinqueue)
    }, [])

    // console.log("Group join new template ", groupjointemplate)

    const selectjoinclicked = (joinid) => {
        router.push({ pathname: "/joingroupbarbers" })
    }

    const customerGroupJoin = useSelector(state => state.customerGroupJoin)

    const { customerSelectedGroupJoin } = customerGroupJoin

    const addJoinQueuePressed = () => {
        if (groupjointemplate.customerName !== "" && groupjointemplate.barberName !== "" && groupjointemplate.service !== "" && groupjointemplate.price !== 0 && customerSelectedGroupJoin.length < 5) {
            const generateRandomCode = () => {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let code = '';
                for (let i = 0; i < 6; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    code += characters[randomIndex];
                }
                return code;
            };

            const randomCode = generateRandomCode();

            dispatch({
                type: "CUSTOMER_SELECT_JOIN_GROUP",
                payload: {
                    groupjointemplate,
                    _id: randomCode
                }
            })

            setGroupjoinTemplate({
                _id: 1,
                customerName: "",
                service: "",
                barberName: "",
                price: 0
            })
            dispatch({
                type: "CUSTOMER_NAME",
                payload: ""
            })

            dispatch({
                type: "ADD_JOINDATA",
                payload: {
                    groupjoinqueue,
                    _id: randomCode
                }
            })

            dispatch({
                type: "RESET"
            })
        }
    }

    const groupjoinsend = useSelector(state => state.groupjoinsend)

    const deletejoinPressed = (grp) => {
        dispatch({
            type: "CUSTOMER_DELETE_JOIN_GROUP",
            payload: grp._id
        })

        console.log(grp._id)

        dispatch({
            type: "DELETE_JOINDATA",
            payload: grp._id
        })
    }

    // console.log("Customerselected", customerSelectedGroupJoin)

    const groupjoinpressed = async () => {
        const generateRandomCode = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let code = '';
            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                code += characters[randomIndex];
            }
            return code;
        };

        const randomCode = generateRandomCode();

        const iqueuecheckdata = {
            checkUsername: currentUserInfo?.[0]?.UserName,
            salonid: currentUserInfo?.[0]?.SalonId
        }

        const updatedGroupJoinSend = groupjoinsend.map((s) => ({ ...s, qgcode: randomCode }));

        console.log("The FINAL SEND JOIN DATA ", updatedGroupJoinSend)

        Alert.alert('Join Queue', 'Are you sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => dispatch(groupiqueuejoinedSelectAction(iqueuecheckdata, updatedGroupJoinSend, "iqueuejoinedqselect2.php", router)) },
        ]);

    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.header_container}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 30
                }}>
                    <Pressable onPress={() => router.push("/home")}><AntDesign name="arrowleft" size={24} color="black" /></Pressable>
                    <Text style={{ fontFamily: "montserrat-medium", fontSize: 18 }}>Group Join</Text>
                </View>

                <Pressable
                    onPress={() => router.push("/help")}
                >
                    <FontAwesome6 name="question-circle" size={24} color="black" />
                </Pressable>

            </View>
            <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 10 }}>
                <Toast />
                <View style={{ marginVertical: 20, flexDirection: "row", gap: 10 }}>
                    <View><Ionicons name="information-circle-outline" size={35} color={Colors.PRIMARY} /></View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: "montserrat-medium", fontSize: 12 }}>Hint:</Text>
                        <Text style={{ fontFamily: "montserrat-medium", fontSize: 12 }}>Enter full name, press select option and choose a barber and service then press
                            '+' button to confirm the entry, once all guests have been added press the Join Queue button at the end
                        </Text>
                    </View>
                </View>

                <View style={{
                    height: 150,
                    backgroundColor: "#efefef",
                    borderRadius: 10,
                    borderColor: "rgba(0,0,0,0.4)",
                    borderWidth: 1,
                    marginBottom: 10,
                }}>
                    <TextInput
                        editable
                        placeholder='Enter FullName'
                        style={styles.input}
                        onChangeText={(text) => customerOnChange(text)}
                        value={groupjointemplate.customerName}
                    />
                    <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Pressable style={{
                                width: 130,
                                height: 35,
                                borderRadius: 5,
                                backgroundColor: Colors.PRIMARY,
                                justifyContent: "center",
                                alignItems: "center",
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.4,
                                shadowRadius: 12,
                                elevation: 5
                            }}
                                onPress={() => selectjoinclicked(3)}
                            ><Text style={{ fontFamily: "montserrat-medium", fontSize: 14, color: Colors.PRIMARYTEXT }}>Select Options</Text></Pressable>

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
                                onPress={addJoinQueuePressed}
                            ><AntDesign name="plus" size={18} color="#fff" /></Pressable>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flex: 1,
                        paddingHorizontal: 10
                    }}>
                        <View style={{ borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 2, flex: 1, height: "80%", justifyContent: "center" }}>
                            <Text style={{
                                fontFamily: "montserrat-semibold",
                                fontSize: 14,
                                marginBottom: 5
                            }}>Barber Name: {groupjointemplate?.barberName}</Text>
                            <Text style={{
                                fontFamily: "montserrat-semibold",
                                fontSize: 14,
                                marginBottom: 5
                            }}>Service: {groupjointemplate?.service} </Text>
                        </View>
                        <View style={{ width: 100, height: "80%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{
                                fontFamily: "montserrat-semibold",
                                fontSize: 14,
                                marginBottom: 5
                            }}>Price</Text>
                            <Text style={{
                                fontFamily: "montserrat-semibold",
                                fontSize: 14,
                                marginBottom: 5,
                                color: Colors.PRIMARY
                            }}>${groupjointemplate?.price}</Text>
                        </View>
                    </View>

                </View>


                <FlatList
                    data={customerSelectedGroupJoin}
                    renderItem={({ item, index }) => <View style={{
                        height: 150,
                        backgroundColor: "#efefef",
                        borderRadius: 10,
                        borderColor: "rgba(0,0,0,0.4)",
                        borderWidth: 1,
                        marginBottom: 10,
                    }}>
                        <View style={{
                            height: 35,
                            borderBottomColor: Colors.PRIMARY,
                            borderBottomWidth: 2,
                            paddingHorizontal: 10,
                            fontFamily: "montserrat-medium",
                            fontSize: 14,
                            outlineStyle: "none",
                            flexDirection: "row",
                            alignItems: "center"
                        }}><Text>{item.customerName}</Text></View>
                        <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <View />

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
                                    onPress={() => deletejoinPressed(item)}
                                ><MaterialIcons name="delete" size={20} color="#fff" /></Pressable>

                            </View>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flex: 1,
                            paddingHorizontal: 10
                        }}>
                            <View style={{ borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 2, flex: 1, height: "80%", justifyContent: "center" }}>
                                <Text style={{
                                    fontFamily: "montserrat-semibold",
                                    fontSize: 14,
                                    marginBottom: 5
                                }}>Barber Name: {item?.barberName}</Text>
                                <Text style={{
                                    fontFamily: "montserrat-semibold",
                                    fontSize: 14,
                                    marginBottom: 5
                                }}>Service: {item?.service} </Text>
                            </View>
                            <View style={{ width: 100, height: "80%", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{
                                    fontFamily: "montserrat-semibold",
                                    fontSize: 14,
                                    marginBottom: 5
                                }}>Price</Text>
                                <Text style={{
                                    fontFamily: "montserrat-semibold",
                                    fontSize: 14,
                                    marginBottom: 5,
                                    color: Colors.PRIMARY
                                }}>${item?.price}</Text>
                            </View>
                        </View>

                    </View>}
                    keyExtractor={(item, index) => item._id}
                    showsVerticalScrollIndicator={false}
                />

            </View>
            <Pressable
                style={{
                    height: 50,
                    backgroundColor: Colors.PRIMARY,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={() => groupjoinpressed()}
            >
                <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARYTEXT }}>+JOIN QUEUE</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default Joingroup

const styles = StyleSheet.create({
    input: {
        height: 35,
        borderBottomColor: Colors.PRIMARY,
        borderBottomWidth: 2,
        paddingHorizontal: 10,
        fontFamily: "montserrat-medium",
        fontSize: 14,
        outlineStyle: "none",
    },
    header_container: {
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
})