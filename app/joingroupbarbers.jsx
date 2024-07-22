import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors'
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { iqueuebarberSelectAction } from '../redux/Actions/QueueAction';

const Joingroupbarbers = () => {

  const router = useRouter()

  const dispatch = useDispatch()

  const [currentSalonInfo, setCurrentSalonInfo] = useState([])
  const [currentUserInfo, setCurrentUserInfo] = useState([])

  useEffect(() => {
    const getloginsalonuserdata = async () => {
      const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
      const userinfodata = await AsyncStorage.getItem('user-logininfo')
      setCurrentSalonInfo(JSON.parse(saloninfodata))
      setCurrentUserInfo(JSON.parse(userinfodata))
    }

    getloginsalonuserdata()
  }, [])

  // console.log("The current Salon Info ", currentSalonInfo)

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

  const barberPressed = (BarberName, BarberId) => {
    dispatch({
      type: "SELECT_BARBER",
      payload: BarberName
    })

    dispatch({
      type: "BARBER_DETAILS",
      payload: {
        barbername: BarberName,
        BarberId: BarberId,
        salonid: currentSalonInfo?.[0]?.id
      }
    })

    dispatch({
      type: "USERNAME_DETAIL",
      payload: {
        username: currentUserInfo?.[0]?.UserName
      }
    })

    router.push({ pathname: "/joingroupservices", params: { BarberId, SalonId: currentSalonInfo?.[0]?.id } })
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 10 }}>

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
                  <View style={{ width: 45, height: 45, borderColor: `${Colors.PRIMARY}`, borderWidth: 3, borderRadius: 50 }}></View>
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
  )
}

export default Joingroupbarbers

const styles = StyleSheet.create({})