// import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import { AntDesign, MaterialIcons } from '@expo/vector-icons'
// import { Colors } from '../constants/Colors'
// import { useRouter } from 'expo-router'
// import { useDispatch } from 'react-redux'

// const Joingroupservices = () => {

//     const servicesdata = [
//         {
//             _id: 1,
//             service: "Test Spa",
//             price: 560
//         },
//         {
//             _id: 2,
//             service: "Test Message",
//             price: 875
//         },
//         {
//             _id: 3,
//             service: "Test Hair",
//             price: 455
//         },
//         // {
//         //   _id: 4
//         // },
//         // {
//         //   _id: 5
//         // },
//         // {
//         //   _id: 6,
//         // },
//         // {
//         //   _id: 7,
//         // },
//         // {
//         //   _id: 8
//         // }
//     ]

//     const dispatch = useDispatch()

//     const [selectedServices, setSelectedServices] = useState([])

//     const addServiceClicked = (service) => {
//         dispatch({
//             type: "SELECT_SERVICES",
//             payload: service
//         })
//         setSelectedServices([...selectedServices, service])
//     }

//     const deleteServiceClicked = (service) => {
//         dispatch({
//             type: "DELETE_SERVICES",
//             payload: service
//         })
//         setSelectedServices((prev) => prev.filter((ser) => ser._id !== service._id))
//     }

//     const router = useRouter()

//     return (
//         <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
//             <Pressable style={{
//                 height: 40,
//                 width: 80,
//                 backgroundColor: Colors.PRIMARY,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: 5,
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 6 },
//                 shadowOpacity: 0.4,
//                 shadowRadius: 12,
//                 elevation: 12,
//                 marginBottom: 10,
//             }}
//             onPress={() => router.push("/joingroup")}
//             ><Text style={{fontFamily: "montserrat-medium", fontSize: 14, color:Colors.PRIMARYTEXT}}>Go Back</Text></Pressable>
//             <FlatList
//                 data={servicesdata}
//                 renderItem={({ item }) => <View style={{
//                     height: 80,
//                     backgroundColor: "#efefef",
//                     marginTop: 5,
//                     paddingHorizontal: 10,
//                     justifyContent: "center",
//                     borderRadius: 5,
//                     borderColor: "rgba(0,0,0,0.4)",
//                     borderWidth: 1,
//                 }}>
//                     <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                         <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14 }}>{item.service}</Text>

//                         {
//                             selectedServices.find((ser) => ser._id == item._id) ?
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
//                                     onPress={() => deleteServiceClicked(item)}
//                                 ><MaterialIcons name="delete" size={20} color="#fff" /></Pressable> :
//                                 <Pressable
//                                     style={{
//                                         width: 30,
//                                         height: 30,
//                                         backgroundColor: Colors.PRIMARY,
//                                         borderRadius: 50,
//                                         justifyContent: "center",
//                                         alignItems: "center",
//                                         shadowColor: '#000',
//                                         shadowOffset: { width: 0, height: 6 },
//                                         shadowOpacity: 0.4,
//                                         shadowRadius: 12,
//                                         elevation: 12,
//                                     }}
//                                     onPress={() => addServiceClicked(item)}
//                                 ><AntDesign name="plus" size={18} color="#fff" /></Pressable>

//                         }
//                     </View>

//                     <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 10 }}>
//                         <Text style={{ fontFamily: "montserrat-medium", fontSize: 16, borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 1, paddingRight: 10 }}>${item.price}</Text>
//                         <Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }}>0 hrs: 0 mins</Text>
//                     </View>

//                 </View>}
//                 showsVerticalScrollIndicator={false}
//                 keyExtractor={item => item._id}
//             />
//         </View>
//     )
// }

// export default Joingroupservices

// const styles = StyleSheet.create({})


// THIS UPPER CODE IS FOR CHOOSING MULTIPLE SERVICES


import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getservicesbybarberIdsalonIdAction } from '../redux/Actions/QueueAction'

const Joingroupservices = () => {

    const params = useLocalSearchParams()

    // console.log("The params of joingroupservice ", params)

    useEffect(() => {
        dispatch(getservicesbybarberIdsalonIdAction(params, "GetServicesByBarberIdSalonId.php"))
    }, [])

    const getservicesbybarberIdsalonId = useSelector(state => state.getservicesbybarberIdsalonId)

    const {
        loading,
        response: serviceslist
    } = getservicesbybarberIdsalonId

    // console.log("The join group services are ", serviceslist)

    const servicesdata = [
        {
            _id: 1,
            service: "Test Spa",
            price: 560
        },
        {
            _id: 2,
            service: "Test Message",
            price: 875
        },
        {
            _id: 3,
            service: "Test Hair",
            price: 455
        },
        // {
        //   _id: 4
        // },
        // {
        //   _id: 5
        // },
        // {
        //   _id: 6,
        // },
        // {
        //   _id: 7,
        // },
        // {
        //   _id: 8
        // }
    ]

    const dispatch = useDispatch()

    const addServiceClicked = (service) => {
        dispatch({
            type: "SELECT_SERVICE",
            payload: service
        })
        router.push("/joingroup")
    }

    const router = useRouter()

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
            {
                loading ?
                    <View><ActivityIndicator size={20} color={"#000"} /></View> :
                    serviceslist.length == 0 ?
                        <View><Text>No Barbers Available</Text></View> :
                        <FlatList
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
                                    <Text style={{ fontFamily: "montserrat-medium", fontSize: 16, borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 1, paddingRight: 10 }}>${item.ServicePrice}</Text>
                                    <Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }}>0 hrs: 0 mins</Text>
                                </View>

                            </View>}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.serviceid}
                        />
            }

        </View>
    )
}

export default Joingroupservices

const styles = StyleSheet.create({})