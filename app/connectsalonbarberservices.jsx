import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { getservicesbybarberidsalonidAction } from '../redux/Actions/SalonAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Connectsalonbarberservices = () => {

    const [currentUserInfo, setCurrentUserInfo] = useState([])

    useEffect(() => {
        const getloginsalonuserdata = async () => {
            const userinfodata = await AsyncStorage.getItem('user-logininfo')
            setCurrentUserInfo(JSON.parse(userinfodata))
        }

        getloginsalonuserdata()
    }, [])

    const params = useLocalSearchParams();

    console.log("Connect Salon Barber ", params)

    const dispatch = useDispatch()

    useEffect(() => {
        if (params) {
            dispatch(getservicesbybarberidsalonidAction(params, "GetServicesByBarberIdSalonId.php"))
        }
    }, [dispatch])

    const getservicesbybarberidsalonid = useSelector(state => state.getservicesbybarberidsalonid)

    const {
        loading,
        response: serviceslist,
        StatusMessage: ServiceStatusMessage,
    } = getservicesbybarberidsalonid

    console.log("Service Status Connect  Message ", ServiceStatusMessage)

    return (
        <View style={{ backgroundColor: "#fff", flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}>
            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, marginBottom: 20 }}>Barber Services</Text>

            <View>
                {loading ? (
                    <ActivityIndicator size={20} color={"#000"} />
                ) : serviceslist.length === 0 && ServiceStatusMessage !== "" ? (
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={{ fontFamily: "montserrat-medium", fontSize: 16, fontWeight: 500 }}>
                            {ServiceStatusMessage}
                        </Text>
                    </View>
                ) : serviceslist.length > 0 && ServiceStatusMessage === "Success" ? (
                    <FlatList
                        data={serviceslist}
                        renderItem={({ item }) => (
                            <View style={{
                                height: 80,
                                backgroundColor: "#efefef",
                                marginTop: 5,
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                borderRadius: 5,
                                borderColor: "rgba(0,0,0,0.4)",
                                borderWidth: 1,
                            }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14 }}>
                                        {item.ServiceName}
                                    </Text>
                                </View>

                                <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10
                                }}>
                                    <Text style={{
                                        fontFamily: "montserrat-medium",
                                        fontSize: 16,
                                        borderRightColor: "rgba(0,0,0,0.4)",
                                        borderRightWidth: 1,
                                        paddingRight: 10
                                    }}>
                                        {currentUserInfo?.[0]?.Currency}{" "}{item.ServicePrice}
                                    </Text>
                                    <Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }}>
                                        {item.Estimated_wait_time}mins
                                    </Text>
                                </View>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.serviceid}
                    />
                ) : null}
            </View>
        </View>
    )
}

export default Connectsalonbarberservices

const styles = StyleSheet.create({})