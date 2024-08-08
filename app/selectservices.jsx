import { StyleSheet, Text, View, ScrollView, Image, Pressable, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getservicesbybarberIdsalonIdAction, iqueuejoinedSelectAction } from '../redux/Actions/QueueAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const selectservices = () => {

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

  // console.log("The currentSalonInfo ", currentSalonInfo)

  // console.log("The Current User Info ", currentUserInfo)

  const params = useLocalSearchParams();

  console.log("Params services ", params)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getservicesbybarberIdsalonIdAction(params, "GetServicesByBarberIdSalonId.php"))
  }, [])

  const getservicesbybarberIdsalonId = useSelector(state => state.getservicesbybarberIdsalonId)

  const {
    loading,
    response: serviceslist,
    StatusMessage: ServiceStatusMessage,
  } = getservicesbybarberIdsalonId

  // console.log("The Selected Services are ", serviceslist)

  const [selectedServices, setSelectedServices] = useState([])

  const addServiceClicked = (service) => {
    if (selectedServices.length < 1) {
      setSelectedServices([...selectedServices, service])
    }
  }

  const deleteServiceClicked = (service) => {
    setSelectedServices((prev) => prev.filter((ser) => ser.serviceid !== service.serviceid))
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

  const joinqueuepressed = () => {
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
      is_single_join: "yes",
    }

    console.log("Single joinqueuedata ", joinqueuedata)

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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Toast />
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
            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, marginBottom: 5 }}>{params.BarberName}</Text>
            <Text style={{ fontFamily: "montserrat-medium", fontSize: 14 }}>Estimated wait time: {params.EWT} mins</Text>
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
          <Text style={{ fontFamily: "montserrat-medium", fontSize: 14, marginTop: 5, color: Colors.PRIMARYTEXT }}>{serviceslist.length} Service(s) Available</Text>
        </View>

        {
          loading ?
            <View style={{
              paddingVertical: 10
            }}><ActivityIndicator size={20} color={"#000"} /></View> :
            serviceslist.length == 0 && ServiceStatusMessage == "Barber Is Not Online" ?
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
                    <Text style={{ fontFamily: "montserrat-medium", fontSize: 16, borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 1, paddingRight: 10 }}>{currentUserInfo?.[0]?.Currency}{" "}{item.ServicePrice}</Text>
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
        onPress={joinqueuepressed}
      >
        <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARYTEXT }}>+JOIN QUEUE</Text>
      </Pressable>
    </View>
  )
}

export default selectservices

const styles = StyleSheet.create({})