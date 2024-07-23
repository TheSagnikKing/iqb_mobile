import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux';
import { getservicesbybarberidsalonidAction } from '../redux/Actions/SalonAction';

const Salonbarberservices = () => {

    const params = useLocalSearchParams();

    console.log("Connect Salon Barber SALON INFO ++++++++", params)

    const servicesdata = [
        {
            _id: 1
        },
        {
            _id: 2
        }
    ]

    const dispatch = useDispatch()

    useEffect(() => {
        if (params) {
            dispatch(getservicesbybarberidsalonidAction(params, "GetServicesByBarberIdSalonId.php"))
        }
    }, [dispatch])

    const getservicesbybarberidsalonid = useSelector(state => state.getservicesbybarberidsalonid)

    const {
        loading,
        response
    } = getservicesbybarberidsalonid

    console.log("The current barber services are SALONINFO++++++", response)

    return (
        <View style={{ backgroundColor: "#fff", flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}>
            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, marginBottom: 20 }}>Barber Services</Text>
            {
                loading ?
                    <ActivityIndicator size={20} color={"#000"} /> :
                    response.length == 0 ?
                        <Text>No Services available</Text> :
                        <FlatList
                            data={response}
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

                                </View>

                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 10 }}>
                                    <Text style={{ fontFamily: "montserrat-medium", fontSize: 16, borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 1, paddingRight: 10 }}>${item.ServicePrice}</Text>
                                    <Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }}>{item.Estimated_wait_time}mins</Text>
                                </View>

                            </View>}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.serviceid}
                        />
            }

        </View>
    )
}

export default Salonbarberservices

const styles = StyleSheet.create({})