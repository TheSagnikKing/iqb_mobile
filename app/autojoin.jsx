import { StyleSheet, Text, View, ScrollView, Image, Pressable, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getservicesbybarberIdsalonIdAction, iqueuejoinedSelectAction } from '../redux/Actions/QueueAction';
import Toast from 'react-native-toast-message';

const Autojoin = () => {

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

  // console.log("Current Salon Info ", currentSalonInfo)

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentSalonInfo.length > 0) {
      dispatch(getservicesbybarberIdsalonIdAction({ BarberId: 777777, SalonId: currentSalonInfo?.[0]?.id }, "GetServicesByBarberIdSalonId.php"))
    }
  }, [dispatch, currentSalonInfo])

  const getservicesbybarberIdsalonId = useSelector(state => state.getservicesbybarberIdsalonId)

  const {
    loading,
    StatusMessage: ServiceStatusMessage,
    response: serviceslist
  } = getservicesbybarberIdsalonId

  console.log("Service Status Message ", ServiceStatusMessage)

  // console.log("Service list from auto join ", serviceslist)

  const params = useLocalSearchParams();

  console.log(params)

  const [selectedServices, setSelectedServices] = useState([])

  const addServiceClicked = (service) => {
    if (selectedServices.length < 1) {
      setSelectedServices([...selectedServices, service])
    }
  }

  const deleteServiceClicked = (service) => {
    setSelectedServices((prev) => prev.filter((ser) => ser._id !== service._id))
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

  const router = useRouter()

  const autojoinPressed = () => {
    const iqueuecheckdata = {
      checkUsername: currentUserInfo?.[0]?.UserName,
      salonid: currentUserInfo?.[0]?.SalonId
    }

    const joinqueuedata = {
      username: currentUserInfo?.[0]?.UserName,
      firstlastname: `${currentUserInfo?.[0]?.FirstName} ${currentUserInfo?.[0]?.LastName}`,
      barbername: selectedServices?.[0]?.BarberNName,
      BarberId: selectedServices?.[0]?.BarberId,
      salonid: currentUserInfo?.[0]?.SalonId,
      timejoinedq,
      rdatejoinedq,
      ServiceId: selectedServices?.[0]?.serviceid,
      is_single_join: "",
    }

    console.log("Auto join join queue ", joinqueuedata)

    Alert.alert('Join Queue', 'Are you sure ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => dispatch(iqueuejoinedSelectAction(iqueuecheckdata, joinqueuedata, "iqueuejoinedqselect2.php", router)) },
    ]);
  }

  return (
    <>
      <Toast />
      <View style={{ flex: 1, backgroundColor: "#fff" }}>

        <View style={{
          backgroundColor: "#fff",
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 15
        }}>

          <View style={{
            height: 80,
            flexDirection: "row",
            alignItems: "center",
            gap: 20
          }}>
            <View style={{
              alignItems: "center",
              justifyContent: "center"
            }}><Image
                source={require("../assets/images/profile.webp")}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  borderColor: "rgba(0,0,0,0.4)",
                  borderWidth: 1
                }}
              /></View>
            <View>
              <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, marginBottom: 5 }}>Any Barber</Text>
              <Text style={{ fontFamily: "montserrat-medium", fontSize: 14 }}>Estimated wait time: 0hrs: 0mins</Text>
            </View>
          </View>

          <View style={{
            height: 70,
            backgroundColor: Colors.PRIMARY,
            marginTop: 5,
            paddingHorizontal: 10,
            justifyContent: "center",
            borderRadius: 5,
          }}>
            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 18, color: Colors.PRIMARYTEXT }}>Select Service</Text>
            <Text style={{ fontFamily: "montserrat-medium", fontSize: 14, marginTop: 5, color: Colors.PRIMARYTEXT }}>2 Service(s) Available</Text>
          </View>

          {
            loading ?
              <View style={{
                paddingVertical: 10
              }}><ActivityIndicator size={20} color={"#000"} /></View> :
              serviceslist.length == 0 && ServiceStatusMessage == "No Barber Is Online" ?
                <View style={{
                  paddingVertical: 10
                }}><Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }} >{ServiceStatusMessage}</Text></View> :
                serviceslist.length > 0 && ServiceStatusMessage == "Success" &&
                < FlatList
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

                      {
                        selectedServices.find((ser) => ser.serviceid == item.serviceid) ?
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
                            onPress={() => deleteServiceClicked(item)}
                          ><MaterialIcons name="delete" size={20} color="#fff" /></Pressable> :
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

                      }
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 10 }}>
                      <Text style={{ fontFamily: "montserrat-medium", fontSize: 16, borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 1, paddingRight: 10 }}>${item.ServicePrice}</Text>
                      <Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }}>{item.Estimated_wait_time}{" "}mins</Text>
                    </View>

                  </View>}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.serviceid}
                />
          }

        </View>
        <Pressable
          style={{
            height: 50,
            backgroundColor: Colors.PRIMARY,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => autojoinPressed()}
        >
          <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARYTEXT }}>+JOIN QUEUE</Text>
        </Pressable>
      </View>
    </>
  )
}

export default Autojoin

const styles = StyleSheet.create({})