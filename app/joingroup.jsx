// import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View , ActivityIndicator} from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { AntDesign, FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { Colors } from '../constants/Colors'
// import { useRouter } from 'expo-router'
// import { useDispatch, useSelector } from 'react-redux'
// import { groupiqueuejoinedSelectAction } from '../redux/Actions/QueueAction';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-toast-message';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import api from '../redux/Api/Api';

// const Joingroup = () => {

// const [currentUserInfo, setCurrentUserInfo] = useState([])

// useEffect(() => {
//     const getloginsalonuserdata = async () => {
//         const userinfodata = await AsyncStorage.getItem('user-logininfo')
//         setCurrentUserInfo(JSON.parse(userinfodata))
//     }

//     getloginsalonuserdata()
// }, [])

//     const dispatch = useDispatch()

//     const [groupjointemplate, setGroupjoinTemplate] = useState(
//         {
//             firstlastname: "",
//             service: "",
//             barberName: "",
//             price: 0
//         }
//     )

//     const [joinqueuetemplate, setJoinqueuetemplate] = useState({
//         username: "",
//         firstlastname: "",
//         barbername: "",
//         BarberId: 0,
//         salonid: 0,
//         timejoinedq: "",
//         rdatejoinedq: "",
//         ServiceId: 0,
//         qgcode: ""
//     })

//     const [joinqueuesendata, setJoinqueuesenddata] = useState([])

//     const router = useRouter()

//     const groupjoinqueue = useSelector(state => state.groupjoinqueue)

//     const [joinqueuearray, setJoinquearray] = useState([])

//     const customerOnChange = (text) => {
//         setGroupjoinTemplate(
//             { ...groupjointemplate, firstlastname: text }
//         );
//         dispatch({
//             type: "CUSTOMER_NAME",
//             payload: text
//         })

//         dispatch({
//             type: "REST_DETAILS",
//             payload: {
//                 firstlastname: text
//             }
//         })
//     }

//     // console.log(groupjointemplate)

//     const groupjoin = useSelector(state => state.groupjoin)

//     console.log("GROUP JOIN ===========", groupjoin.ServiceStatusMessage)

//     useEffect(() => {
//         setJoinquearray({
//             firstlastname: groupjoin.firstlastname
//         })
//         setGroupjoinTemplate({ ...groupjointemplate, service: groupjoin.services.ServiceName, barberName: groupjoin.barberName, price: groupjoin.services.ServicePrice, firstlastname: groupjoin.firstlastname });
//         // console.log("Group join new groupjoinqueue ", groupjoinqueue)
//     }, [])

//     // console.log("Group join new template ", groupjointemplate)

//     const selectjoinclicked = (joinid) => {
//         router.push({ pathname: "/joingroupbarbers" })
//     }

//     const customerGroupJoin = useSelector(state => state.customerGroupJoin)

//     const { customerSelectedGroupJoin } = customerGroupJoin

//     const addJoinQueuePressed = () => {
//         if (groupjointemplate.firstlastname !== "" && groupjointemplate.barberName !== "" && groupjointemplate.service !== "" && groupjointemplate.price !== 0 && customerSelectedGroupJoin.length < 5) {
// const generateRandomCode = () => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let code = '';
//     for (let i = 0; i < 6; i++) {
//         const randomIndex = Math.floor(Math.random() * characters.length);
//         code += characters[randomIndex];
//     }
//     return code;
// };

// const randomCode = generateRandomCode();

//             dispatch({
//                 type: "CUSTOMER_SELECT_JOIN_GROUP",
//                 payload: {
//                     groupjointemplate,
//                     _id: randomCode
//                 }
//             })

//             setGroupjoinTemplate({
//                 _id: 1,
//                 firstlastname: "",
//                 service: "",
//                 barberName: "",
//                 price: 0
//             })
//             dispatch({
//                 type: "CUSTOMER_NAME",
//                 payload: ""
//             })

//             dispatch({
//                 type: "ADD_JOINDATA",
//                 payload: {
//                     groupjoinqueue,
//                     _id: randomCode
//                 }
//             })

//             dispatch({
//                 type: "RESET"
//             })
//         }
//     }

//     const groupjoinsend = useSelector(state => state.groupjoinsend)

//     const deletejoinPressed = (grp) => {
//         dispatch({
//             type: "CUSTOMER_DELETE_JOIN_GROUP",
//             payload: grp._id
//         })

//         console.log(grp._id)

//         dispatch({
//             type: "DELETE_JOINDATA",
//             payload: grp._id
//         })
//     }

//     // console.log("Customerselected", customerSelectedGroupJoin)

//     // const groupjoinpressed = async () => {
//     //     const generateRandomCode = () => {
//     //         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     //         let code = '';
//     //         for (let i = 0; i < 6; i++) {
//     //             const randomIndex = Math.floor(Math.random() * characters.length);
//     //             code += characters[randomIndex];
//     //         }
//     //         return code;
//     //     };

//     //     const randomCode = generateRandomCode();

//     //     const iqueuecheckdata = {
//     //         checkUsername: currentUserInfo?.[0]?.UserName,
//     //         salonid: currentUserInfo?.[0]?.SalonId
//     //     }

//     //     const updatedGroupJoinSend = groupjoinsend.map((s,index) => ({ ...s, qgcode: randomCode, username: index == 0 ? `${s.username}` : `${s.username}-${index+1}`, firstlastname: `${s.firstlastname} *` }));

//     //     console.log("The FINAL SEND JOIN DATA ", updatedGroupJoinSend)

// Alert.alert('Join Queue', 'Are you sure ?', [
//     {
//         text: 'Cancel',
//         onPress: () => console.log('Cancel Pressed'),
//         style: 'cancel',
//     },
//     { text: 'OK', onPress: () => dispatch(groupiqueuejoinedSelectAction(iqueuecheckdata, updatedGroupJoinSend, "iqueuejoinedqselect2.php", router)) },
// ]);

//     // };

//     const insertjoinq = async (joinqdata, endpoint, setJoinqueueloading) => {
//         try {
//             const url = `/${endpoint}`;

//             const headers = {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             };

//             const { data, status } = await api.post(url, joinqdata, { headers });

//         } catch (error) {
//             console.log(error)
//             setJoinqueueloading(false)
//         }
//     }

//     const checkpostion = async (salonid, joinqueuedata, endpoint, setJoinqueueloading) => {
//         try {
//             const body = {
//                 salonid
//             };

//             const url = `/${endpoint}`;

//             const { data, status } = await api.post(url, body, {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 }
//             });

//             if (data.StatusCode == 200) {
//                 await insertjoinq({ ...joinqueuedata, position: Number(data.Response) }, "iqueueinsertinjoinq_v2.php", setJoinqueueloading)
//             }
//         } catch (error) {
//             console.log(error)
//             setJoinqueueloading(false)
//         }
//     }

//     const groupjoinselect = async (iqueuecheckdata, updatedGroupJoinSend, endpoint, setJoinqueueloading) => {
//         try {
//             setJoinqueueloading(true)

//             const body = iqueuecheckdata;

//             const url = `/${endpoint}`;

//             const { data, status } = await api.post(url, body, {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 }
//             });

//             if (data.StatusCode == 201) {
//                 for (const queue of updatedGroupJoinSend) {
//                     await checkpostion(iqueuecheckdata.salonid, queue, "iqueuecheckposition_v2.php", setJoinqueueloading)
//                 }

//                 setJoinqueueloading(false)

//                 router.push("/home")

//                 dispatch({
//                     type: "RESET_SEND_GROUP"
//                 })

//                 dispatch({
//                     type: "RESET_CUSTOMER_GROUP",
//                 })
//             } else if (data.StatusCode == 200) {
//                 alert("User already in the queue")
//                 setJoinqueueloading(false)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const [joinqueueloading, setJoinqueueloading] = useState(false)

//     const groupjoinpressed = async () => {
// const generateRandomCode = () => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let code = '';
//     for (let i = 0; i < 6; i++) {
//         const randomIndex = Math.floor(Math.random() * characters.length);
//         code += characters[randomIndex];
//     }
//     return code;
// };

// const randomCode = generateRandomCode();

// const iqueuecheckdata = {
//     checkUsername: currentUserInfo?.[0]?.UserName,
//     salonid: currentUserInfo?.[0]?.SalonId
// }

//         const updatedGroupJoinSend = groupjoinsend.map((s, index) => ({ ...s, qgcode: randomCode, username: index == 0 ? `${s.username}` : `${s.username}-${index + 1}`, firstlastname: `${s.firstlastname} *` }));

//         console.log("The FINAL SEND JOIN DATA ", updatedGroupJoinSend)

//         Alert.alert('Join Queue', 'Are you sure ?', [
//             {
//                 text: 'Cancel',
//                 onPress: () => console.log('Cancel Pressed'),
//                 style: 'cancel',
//             },
//             { text: 'OK', onPress: async () => await groupjoinselect(iqueuecheckdata, updatedGroupJoinSend, "iqueuejoinedqselect2.php", setJoinqueueloading) },
//         ]);

//     };

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", position:"relative" }}>
// <View style={styles.header_container}>
//     <View style={{
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 30
//     }}>
//         <Pressable onPress={() => router.push("/home")}><AntDesign name="arrowleft" size={24} color="black" /></Pressable>
//         <Text style={{ fontFamily: "montserrat-medium", fontSize: 18 }}>Group Join</Text>
//     </View>

//     <Pressable
//         onPress={() => router.push("/help")}
//     >
//         <FontAwesome6 name="question-circle" size={24} color="black" />
//     </Pressable>

// </View>
// <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 10 }}>
//     <Toast />
//     <View style={{ marginVertical: 20, flexDirection: "row", gap: 10 }}>
//         <View><Ionicons name="information-circle-outline" size={35} color={Colors.PRIMARY} /></View>
//         <View style={{ flex: 1 }}>
//             <Text style={{ fontFamily: "montserrat-medium", fontSize: 12 }}>Hint:</Text>
//             <Text style={{ fontFamily: "montserrat-medium", fontSize: 12 }}>Enter full name, press select option and choose a barber and service then press
//                 '+' button to confirm the entry, once all guests have been added press the Join Queue button at the end
//             </Text>
//         </View>
//     </View>

//     <View style={{
//         height: 150,
//         backgroundColor: "#efefef",
//         borderRadius: 10,
//         borderColor: "rgba(0,0,0,0.4)",
//         borderWidth: 1,
//         marginBottom: 10,
//     }}>
//         <TextInput
//             editable
//             placeholder='Enter FullName'
//             style={styles.input}
//             onChangeText={(text) => customerOnChange(text)}
//             value={groupjointemplate.firstlastname}
//         />
//         <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
//             <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                 <Pressable style={{
//                     width: 130,
//                     height: 35,
//                     borderRadius: 5,
//                     backgroundColor: Colors.PRIMARY,
//                     justifyContent: "center",
//                     alignItems: "center",
//                     shadowColor: "#000",
//                     shadowOffset: { width: 0, height: 0 },
//                     shadowOpacity: 0.4,
//                     shadowRadius: 12,
//                     elevation: 5
//                 }}
//                     onPress={() => selectjoinclicked(3)}
//                 ><Text style={{ fontFamily: "montserrat-medium", fontSize: 14, color: Colors.PRIMARYTEXT }}>Select Options</Text></Pressable>

//                 <Pressable
//                     style={{
//                         width: 30,
//                         height: 30,
//                         backgroundColor: Colors.PRIMARY,
//                         borderRadius: 50,
//                         justifyContent: "center",
//                         alignItems: "center",
//                         shadowColor: '#000',
//                         shadowOffset: { width: 0, height: 6 },
//                         shadowOpacity: 0.4,
//                         shadowRadius: 12,
//                         elevation: 12,
//                     }}
//                     onPress={addJoinQueuePressed}
//                 ><AntDesign name="plus" size={18} color="#fff" /></Pressable>
//             </View>
//         </View>

//         <View style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//             flex: 1,
//             paddingHorizontal: 10
//         }}>
//             <View style={{ borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 2, flex: 1, height: "80%", justifyContent: "center" }}>
//                 <Text style={{
//                     fontFamily: "montserrat-semibold",
//                     fontSize: 14,
//                     marginBottom: 5
//                 }}>Barber Name: {groupjointemplate?.barberName}</Text>
//                 <Text style={{
//                     fontFamily: "montserrat-semibold",
//                     fontSize: 14,
//                     marginBottom: 5
//                 }}>Service: {groupjointemplate?.service} </Text>
//             </View>
//             <View style={{ width: 100, height: "80%", justifyContent: "center", alignItems: "center" }}>
//                 <Text style={{
//                     fontFamily: "montserrat-semibold",
//                     fontSize: 14,
//                     marginBottom: 5
//                 }}>Price</Text>
//                 <Text style={{
//                     fontFamily: "montserrat-semibold",
//                     fontSize: 14,
//                     marginBottom: 5,
//                     color: Colors.PRIMARY
//                 }}>{currentUserInfo?.[0]?.Currency == "Â£" ? "£" : currentUserInfo?.[0]?.Currency}{" "}{groupjointemplate?.price}</Text>
//             </View>
//         </View>

//     </View>


//                 <FlatList
//                     data={customerSelectedGroupJoin}
//                     renderItem={({ item, index }) => <View style={{
//                         height: 150,
//                         backgroundColor: "#efefef",
//                         borderRadius: 10,
//                         borderColor: "rgba(0,0,0,0.4)",
//                         borderWidth: 1,
//                         marginBottom: 10,
//                     }}>
//                         <View style={{
//                             height: 35,
//                             borderBottomColor: Colors.PRIMARY,
//                             borderBottomWidth: 2,
//                             paddingHorizontal: 10,
//                             fontFamily: "montserrat-medium",
//                             fontSize: 14,
//                             outlineStyle: "none",
//                             flexDirection: "row",
//                             alignItems: "center"
//                         }}><Text>{item.firstlastname}</Text></View>
//                         <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
//                             <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                                 <View />

//                                 <Pressable
//                                     style={{
//                                         width: 30,
//                                         height: 30,
//                                         backgroundColor: "red",
//                                         borderRadius: 50,
//                                         justifyContent: "center",
//                                         alignItems: "center",
//                                         shadowColor: '#000',
//                                         shadowOffset: { width: 0, height: 6 },
//                                         shadowOpacity: 0.4,
//                                         shadowRadius: 12,
//                                         elevation: 12,
//                                     }}
//                                     onPress={() => deletejoinPressed(item)}
//                                 ><MaterialIcons name="delete" size={20} color="#fff" /></Pressable>

//                             </View>
//                         </View>

//                         <View style={{
//                             flexDirection: "row",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                             flex: 1,
//                             paddingHorizontal: 10
//                         }}>
//                             <View style={{ borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 2, flex: 1, height: "80%", justifyContent: "center" }}>
//                                 <Text style={{
//                                     fontFamily: "montserrat-semibold",
//                                     fontSize: 14,
//                                     marginBottom: 5
//                                 }}>Barber Name: {item?.barberName}</Text>
//                                 <Text style={{
//                                     fontFamily: "montserrat-semibold",
//                                     fontSize: 14,
//                                     marginBottom: 5
//                                 }}>Service: {item?.service} </Text>
//                             </View>
//                             <View style={{ width: 100, height: "80%", justifyContent: "center", alignItems: "center" }}>
//                                 <Text style={{
//                                     fontFamily: "montserrat-semibold",
//                                     fontSize: 14,
//                                     marginBottom: 5
//                                 }}>Price</Text>
//                                 <Text style={{
//                                     fontFamily: "montserrat-semibold",
//                                     fontSize: 14,
//                                     marginBottom: 5,
//                                     color: Colors.PRIMARY
//                                 }}>${item?.price}</Text>
//                             </View>
//                         </View>

//                     </View>}
//                     keyExtractor={(item, index) => item._id}
//                     showsVerticalScrollIndicator={false}
//                 />

//             </View>

// {
//     groupjoin.ServiceStatusMessage == "Success" &&
//     <Pressable
//         style={{
//             height: 50,
//             backgroundColor: Colors.PRIMARY,
//             justifyContent: "center",
//             alignItems: "center"
//         }}
//         onPress={() => groupjoinpressed()}
//     >
//         <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARYTEXT }}>+JOIN QUEUE</Text>
//     </Pressable>
// }

// {
//     joinqueueloading && <View style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         flex: 1,
//         backgroundColor: "rgba(0,0,0,0.8)",
//         justifyContent: "center",
//         alignItems: "center"
//     }}><ActivityIndicator size={32} color={`${Colors.PRIMARYTEXT}`} /></View>
// }

//         </SafeAreaView>
//     )
// }

// export default Joingroup

// const styles = StyleSheet.create({
// input: {
//     height: 35,
//     borderBottomColor: Colors.PRIMARY,
//     borderBottomWidth: 2,
//     paddingHorizontal: 10,
//     fontFamily: "montserrat-medium",
//     fontSize: 14,
//     outlineStyle: "none",
// },
// header_container: {
//     height: 50,
//     backgroundColor: "#fff",
//     paddingHorizontal: 15,
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderBottomColor: "rgba(0,0,0,0.2)",
//     borderBottomWidth: 1
// },
// })


// JOIN GROUP NEW LOGIC

import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator, Modal, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Colors } from '../constants/Colors'
import { AntDesign, Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { getservicesbybarberIdsalonIdAction, iqueuebarberSelectAction } from '../redux/Actions/QueueAction'
import api from '../redux/Api/Api'

const Joingroup = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [currentUserInfo, setCurrentUserInfo] = useState([])
    const [currentSalonInfo, setCurrentSalonInfo] = useState([])

    useEffect(() => {
        const getloginsalonuserdata = async () => {
            const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
            const userinfodata = await AsyncStorage.getItem('user-logininfo')
            setCurrentUserInfo(JSON.parse(userinfodata))
            setCurrentSalonInfo(JSON.parse(saloninfodata))
        }

        getloginsalonuserdata()
    }, [])

    useEffect(() => {
        if (currentUserInfo.length > 0) {
            const updatedCustomers = customerobjarr.map((customer) =>
                customer.customer_obj === 0
                    ? { ...customer, firstlastname: `${currentUserInfo?.[0]?.FirstName}${currentUserInfo?.[0]?.LastName}` }
                    : customer
            );
            setCustomerobjarr(updatedCustomers);
        }

    }, [currentUserInfo])

    const [customerobjarr, setCustomerobjarr] = useState([
        {
            customer_obj: 0,
            firstlastname: "",
            username: "",
            barbername: "",
            BarberId: 0,
            salonid: 0,
            ServiceId: 0,
            ServicePrice: 0,
            ServiceName: ""
        },
        {
            customer_obj: 1,
            firstlastname: "",
            username: "",
            barbername: "",
            BarberId: 0,
            salonid: 0,
            ServiceId: 0,
            ServicePrice: 0,
            ServiceName: ""
        },
        {
            customer_obj: 2,
            firstlastname: "",
            username: "",
            barbername: "",
            BarberId: 0,
            salonid: 0,
            ServiceId: 0,
            ServicePrice: 0,
            ServiceName: ""
        },
        {
            customer_obj: 3,
            firstlastname: "",
            username: "",
            barbername: "",
            BarberId: 0,
            salonid: 0,
            ServiceId: 0,
            ServicePrice: 0,
            ServiceName: ""
        },
        {
            customer_obj: 4,
            firstlastname: "",
            username: "",
            barbername: "",
            BarberId: 0,
            salonid: 0,
            ServiceId: 0,
            ServicePrice: 0,
            ServiceName: ""
        },
    ])


    const handlefirstlastnameChange = (customer_obj, newfirstlastname) => {
        const updatedCustomers = customerobjarr.map((customer) =>
            customer.customer_obj === customer_obj
                ? { ...customer, firstlastname: newfirstlastname }
                : customer
        );
        setCustomerobjarr(updatedCustomers);
    };

    const [joingrouparr, setJoingrouparr] = useState([])


    const handleAddCustomer = (customer) => {
        // console.log("CUSTOMER ADDED ", customer)
        if (customer.firstlastname !== "" && customer.ServicePrice !== 0 && customer.barbername !== "" && customer.ServiceName !== 0) {
            setJoingrouparr((prevArray) => {
                return [...prevArray, { ...customer, firstlastname: `${customer.firstlastname} *` }];
            });
        }
    };

    const handleDeleteCustomer = (customer) => {
        setJoingrouparr((prevArray) => prevArray.filter((cust) => (
            cust.customer_obj !== customer.customer_obj
        )))

        const updatedCustomers = customerobjarr.map((cust) =>
            cust.customer_obj === customer.customer_obj
                ? {
                    ...cust,
                    firstlastname: "",
                    username: "",
                    barbername: "",
                    BarberId: 0,
                    salonid: 0,
                    ServiceId: 0,
                    ServicePrice: 0,
                    ServiceName: "",
                    salonid: 0
                }
                : cust
        );
        setCustomerobjarr(updatedCustomers);
    }


    // console.log("The join group array ", joingrouparr)

    const isItemInArray = (customer_obj) => {
        return joingrouparr.some(queue => queue.customer_obj === customer_obj);
    };


    const [openBarberModal, setOpenBarberModal] = useState(false)

    const [selectedcustomer_obj, setSelectedcustomer_obj] = useState("")


    const selectoption = (customer_obj) => {
        setSelectedcustomer_obj(customer_obj)
        setOpenBarberModal(true)
    }

    // barber modal logic starts here

    useEffect(() => {
        if (currentSalonInfo.length > 0) {
            dispatch(iqueuebarberSelectAction(currentSalonInfo?.[0]?.id, "iqueuebarberselect2.php"))
        }

    }, [dispatch, currentSalonInfo])


    const {
        loading,
        response: barberlistdata
    } = useSelector(state => state.iqueuebarberSelect)

    // console.log("The join queue barbers ", barberlistdata)

    const [openBarberServicesModal, setOpenBarberServicesModal] = useState(false)

    const [BarberName, setBarberName] = useState("")
    const [BarberId, setBarberId] = useState("")

    const barberPressed = (BarberName, BarberId) => {
        setBarberName(BarberName)
        setBarberId(BarberId)
        setOpenBarberServicesModal(true)
    }


    // barber Services modal logic starts here

    useEffect(() => {
        dispatch(getservicesbybarberIdsalonIdAction({ BarberId, SalonId: currentSalonInfo?.[0]?.id }, "GetServicesByBarberIdSalonId.php"))
    }, [dispatch, BarberId])


    const getservicesbybarberIdsalonId = useSelector(state => state.getservicesbybarberIdsalonId)

    const {
        loading: barberserviceloading,
        response: serviceslist,
        StatusMessage: ServiceStatusMessage,
    } = getservicesbybarberIdsalonId

    // console.log("BARBER SERVICES ", serviceslist)


    const addServiceClicked = (item) => {

        // console.log("Service Item ", item)

        const updatedCustomers = customerobjarr.map((customer) =>
            customer.customer_obj === selectedcustomer_obj
                ? {
                    ...customer,
                    barbername: item.BarberNName,
                    BarberId: item.BarberId,
                    ServiceId: item.serviceid,
                    ServiceName: item.ServiceName,
                    ServicePrice: item.ServicePrice,
                    salonid: currentSalonInfo?.[0]?.id,
                    username: customer.customer_obj == 0 ? `${currentUserInfo?.[0]?.UserName}` : `${currentUserInfo?.[0]?.UserName}-${customer.customer_obj + 1}`
                }
                : customer
        );
        setCustomerobjarr(updatedCustomers);

        setOpenBarberServicesModal(false)
        setOpenBarberModal(false)
    }

    const [timejoinedq, setTimejoinedq] = useState("")
    const [rdatejoinedq, setRdatejoinedq] = useState("")

    useEffect(() => {
        const options = { hour12: false };
        const time = new Date().toLocaleTimeString([], options);
        setTimejoinedq(time)

        const date = new Date();
        const dateoptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', dateoptions).replace(/\//g, '-');
        setRdatejoinedq(formattedDate)
    }, []);

    const [joinqueueloading, setJoinqueueloading] = useState(false)


    const insertjoinq = async (joinqdata, endpoint, setJoinqueueloading) => {
        try {
            const url = `/${endpoint}`;

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            const { data, status } = await api.post(url, joinqdata, { headers });

        } catch (error) {
            console.log(error)
            setJoinqueueloading(false)
        }
    }

    const checkpostion = async (salonid, joinqueuedata, endpoint, setJoinqueueloading) => {
        try {
            const body = {
                salonid
            };

            const url = `/${endpoint}`;

            const { data, status } = await api.post(url, body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (data.StatusCode == 200) {
                await insertjoinq({ ...joinqueuedata, position: Number(data.Response) }, "iqueueinsertinjoinq_v2.php", setJoinqueueloading)
            }
        } catch (error) {
            console.log(error)
            setJoinqueueloading(false)
        }
    }

    const groupjoinselect = async (iqueuecheckdata, updatedGroupJoinSend, endpoint, setJoinqueueloading) => {
        try {
            setJoinqueueloading(true)

            const body = iqueuecheckdata;

            const url = `/${endpoint}`;

            const { data, status } = await api.post(url, body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (data.StatusCode == 201) {
                for (const queue of updatedGroupJoinSend) {
                    await checkpostion(iqueuecheckdata.salonid, queue, "iqueuecheckposition_v2.php", setJoinqueueloading)
                }

                setJoinqueueloading(false)

                router.push("/home")

            } else if (data.StatusCode == 200) {
                alert("User already in the queue")
                setJoinqueueloading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const groupjoinpressed = () => {
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

        const updatedGroupJoinSend = joingrouparr.map((q) => ({ ...q, qgcode: randomCode, rdatejoinedq, timejoinedq }))

        console.log("Updated Group Joined Queue ", updatedGroupJoinSend)

        const iqueuecheckdata = {
            checkUsername: currentUserInfo?.[0]?.UserName,
            salonid: currentUserInfo?.[0]?.SalonId
        }

        const hasCustomerObjZero = updatedGroupJoinSend.some(item => item.customer_obj === 0);

        if (!hasCustomerObjZero) {
            alert("You cannot join group with selected options")
        } else if (updatedGroupJoinSend.length > 1) {
            Alert.alert('Join Queue', 'Are you sure ?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: async () => await groupjoinselect(iqueuecheckdata, updatedGroupJoinSend, "iqueuejoinedqselect2.php", setJoinqueueloading) },
            ]);
        } else {
            alert("You cannot join group with selected options")
        }
    }

    // const groupjoin = useSelector(state => state.groupjoin)
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", position: "relative" }}>
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

                <FlatList
                    data={customerobjarr}
                    renderItem={({ item }) => <View style={{
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
                            onChangeText={(text) => handlefirstlastnameChange(item.customer_obj, text)}
                            value={item.customer_obj == 0 ? `${currentUserInfo?.[0]?.FirstName}${currentUserInfo?.[0]?.LastName}` : item.firstlastname}
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
                                    onPress={() => selectoption(item.customer_obj)}
                                ><Text style={{ fontFamily: "montserrat-medium", fontSize: 14, color: Colors.PRIMARYTEXT }}>Select Options</Text></Pressable>

                                <Pressable
                                    style={{
                                        width: 30,
                                        height: 30,
                                        backgroundColor: isItemInArray(item.customer_obj) ? "limegreen" : Colors.PRIMARY,
                                        borderRadius: 50,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 6 },
                                        shadowOpacity: 0.4,
                                        shadowRadius: 12,
                                        elevation: 12,
                                    }}
                                    onPress={isItemInArray(item.customer_obj) ? () => handleDeleteCustomer(item) : () => handleAddCustomer(item)}
                                >
                                    <AntDesign name={isItemInArray(item.customer_obj) ? "check" : "plus"} size={18} color="#fff" />
                                </Pressable>

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
                                }}>Barber Name: {item.barbername}</Text>
                                <Text style={{
                                    fontFamily: "montserrat-semibold",
                                    fontSize: 14,
                                    marginBottom: 5
                                }}>Service: {item.ServiceName}</Text>
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
                                }}>{currentUserInfo?.[0]?.Currency == "Â£" ? "£" : currentUserInfo?.[0]?.Currency}{" "}{item.ServicePrice}</Text>
                            </View>
                        </View>

                    </View>}
                    keyExtractor={item => item.customer_obj.toString()}
                />


                {openBarberModal && <Modal>
                    <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Pressable
                            onPress={() => setOpenBarberModal(false)}
                            style={{
                                marginLeft: "auto",
                                marginVertical: 20
                            }}
                        >
                            <AntDesign name="closecircle" size={30} color="red" />
                        </Pressable>

                        <Pressable
                            onPress={() => barberPressed("Any Barber", 777777)}
                            style={{ height: 60, backgroundColor: "#efefef", borderRadius: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, marginBottom: 10, borderColor: "rgba(0,0,0,0.4)", borderWidth: 1 }}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 20,
                            }}>
                                <View style={{ width: 45, height: 45, borderColor: `rgba(0,0,0,0.4)`, borderWidth: 3, borderRadius: 50 }}></View>
                                <Text style={{
                                    fontFamily: "montserrat-semibold",
                                    fontSize: 14
                                }}>Any Barber</Text>
                            </View>

                            <View><Feather name="arrow-right-circle" size={26} color="black" /></View>
                        </Pressable>

                        {
                            loading ?
                                <View><ActivityIndicator size={20} color={"#000"} /></View> :
                                barberlistdata.length == 0 ?
                                    <View><Text>No Barbers Available</Text></View> :
                                    <FlatList
                                        data={barberlistdata}
                                        renderItem={({ item }) => <Pressable
                                            onPress={() => barberPressed(item.BarberName, item.BarberId)}
                                            style={{ height: 60, backgroundColor: "#efefef", borderRadius: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, marginBottom: 10, borderColor: "rgba(0,0,0,0.4)", borderWidth: 1 }}>
                                            <View style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 20,
                                            }}>
                                                <Image
                                                    source={{ uri: `https://server.iqueuebarbers.com/~iqueue/barberpics/barbers_profile_pics/${item?.BarberPic}` }}
                                                    style={{
                                                        width: 45,
                                                        height: 45,
                                                        borderRadius: 50,
                                                        borderColor: `${Colors.PRIMARY}`,
                                                        borderWidth: 1
                                                    }}
                                                />
                                                <Text style={{
                                                    fontFamily: "montserrat-semibold",
                                                    fontSize: 14
                                                }}>{item.BarberName}</Text>
                                            </View>

                                            <View><Feather name="arrow-right-circle" size={26} color="black" /></View>
                                        </Pressable>}
                                        keyExtractor={item => item.id}
                                    />
                        }

                    </View>
                </Modal>}


                {
                    openBarberServicesModal && <Modal>
                        <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>

                            <Pressable
                                onPress={() => setOpenBarberServicesModal(false)}
                                style={{
                                    marginLeft: "auto",
                                    marginVertical: 20
                                }}
                            >
                                <AntDesign name="closecircle" size={30} color="red" />
                            </Pressable>
                            {
                                barberserviceloading ?
                                    <View><ActivityIndicator size={20} color={"#000"} /></View> :
                                    serviceslist.length == 0 && ServiceStatusMessage !== "" ?
                                        <View style={{
                                            paddingVertical: 10
                                        }}><Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }} >{ServiceStatusMessage}</Text></View> :
                                        serviceslist.length > 0 && ServiceStatusMessage == "Success" && <FlatList
                                            data={serviceslist}
                                            renderItem={({ item }) => <View style={{
                                                height: 80,
                                                backgroundColor: "#efefef",
                                                marginTop: 5,
                                                paddingHorizontal: 10,
                                                justifyContent: "center",
                                                borderRadius: 5,
                                                borderColor: "rgba(0,0,0,0.4)",
                                                borderWidth: 1,
                                            }}>
                                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14 }}>{item.ServiceName}</Text>
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
                                                        onPress={() => addServiceClicked(item)}
                                                    ><AntDesign name="plus" size={18} color="#fff" /></Pressable>
                                                </View>

                                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 10 }}>
                                                    <Text style={{ fontFamily: "montserrat-medium", fontSize: 16, borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 1, paddingRight: 10 }}>{currentUserInfo?.[0]?.Currency == "Â£" ? "£" : currentUserInfo?.[0]?.Currency}{" "}{item.ServicePrice}</Text>
                                                    <Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }}>0 hrs: 0 mins</Text>
                                                </View>

                                            </View>}
                                            showsVerticalScrollIndicator={false}
                                            keyExtractor={item => item.serviceid}
                                        />
                            }

                        </View>
                    </Modal>
                }

            </View>

            {
                // groupjoin.ServiceStatusMessage == "Success" &&
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
            }

            {
                joinqueueloading && <View style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    justifyContent: "center",
                    alignItems: "center"
                }}><ActivityIndicator size={32} color={`${Colors.PRIMARYTEXT}`} /></View>
            }

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