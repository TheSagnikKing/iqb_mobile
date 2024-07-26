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

    // console.log("The join group services are ", serviceslist)

    const dispatch = useDispatch()

    const addServiceClicked = (service) => {
        dispatch({
            type: "SELECT_SERVICE",
            payload: service
        })

        dispatch({
            type: "SERVICES_DETAILS",
            payload: {
                ServiceId: service.serviceid,
                timejoinedq,
                rdatejoinedq
            }
        })

        dispatch({
            type: "BARBER_DETAILS",
            payload: {
              barbername: service.BarberNName,
              BarberId: service.BarberId,
              salonid: params.SalonId
            }
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