import { StyleSheet, Text, View, ScrollView, Pressable, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from "../constants/Colors"
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { iqueuebarberSelectAction } from '../redux/Actions/QueueAction'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const SelectBarber = () => {

  const dispatch = useDispatch()

  const [currentSalonInfo, setCurrentSalonInfo] = useState([])

  useEffect(() => {
    const getloginsalonuserdata = async () => {
      const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
      setCurrentSalonInfo(JSON.parse(saloninfodata))
    }

    getloginsalonuserdata()
  }, [])

  useEffect(() => {
    if (currentSalonInfo.length > 0) {
      dispatch(iqueuebarberSelectAction(currentSalonInfo?.[0]?.id, "iqueuebarberselect2.php"))
    }

  }, [dispatch, currentSalonInfo])


  const {
    error,
    loading,
    response: barberlist
  } = useSelector(state => state.iqueuebarberSelect)

  const router = useRouter()

  console.log("currentSalonInfo ", currentSalonInfo)

  console.log("error ", error)
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{
        flex: 1,
        paddingHorizontal: 15,
      }}>
        {
          barberlist.length ? <Text
            style={{
              lineHeight: 60,
              textAlign: 'center',
              color: Colors.PRIMARY,
              fontFamily: "montserrat-semibold",
              fontSize: 16
            }}
          >{barberlist.length} Barbers Available</Text> :
            <Text
              style={{
                lineHeight: 60,
                textAlign: 'center',
                color: Colors.PRIMARY,
                fontFamily: "montserrat-semibold",
                fontSize: 16
              }}
            >No Barbers Available</Text>
        }


        {
          loading ?
            <View><ActivityIndicator size={20} color={"#000"} /></View> :
            barberlist.length == 0 ?
              <View><Text>No Barbers Available</Text></View> :
              error ?
                <View><Text>No Barbers Available</Text></View> :
                <FlatList
                  data={barberlist}
                  renderItem={({ item }) => <View style={{
                    backgroundColor: "#efefef",
                    height: 130,
                    marginBottom: 20,
                    borderRadius: 10,
                    borderColor: "rgba(0,0,0,0.4)",
                    borderWidth: 1,
                  }}>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderBottomColor: "rgba(0,0,0,0.4)",
                        borderBottomWidth: 1
                      }}
                    >
                      <View style={{ flex: 2, paddingHorizontal: scale(10), flexDirection: "row", alignItems: "center", gap: scale(15), borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 1 }}>
                        <View style={{
                          justifyContent: "center",
                          alignItems: "center"
                        }}><Image
                            source={{ uri: `https://server.iqueuebarbers.com/~iqueue/barberpics/barbers_profile_pics/${item?.BarberPic}` }}
                            style={{
                              width: scale(45),
                              height: verticalScale(45),
                              borderRadius: 50,
                              borderColor: `${Colors.PRIMARY}`,
                              borderWidth: 1
                            }}
                          /></View>
                        <Text style={{
                          fontFamily: "montserrat-semibold",
                          fontSize: moderateScale(14),
                          width: scale(100)
                        }} numberOfLines={1} ellipsizeMode="tail">{item.BarberName}</Text>
                      </View>

                      <View style={{ flex: 1, paddingHorizontal: moderateScale(10), justifyContent: "center", alignItems: "center" }}>
                        <Text style={{
                          fontFamily: "montserrat-semibold",
                          fontSize: moderateScale(14)
                        }}>Queuing</Text>
                        <Text style={{
                          fontFamily: "montserrat-semibold",
                          fontSize: moderateScale(14),
                          color: Colors.PRIMARY
                        }}>{item.TotalQueue}</Text>
                      </View>
                    </View>


                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: moderateScale(10),
                      }}
                    >
                      <View>
                        <Text style={{ marginBottom: 5, fontFamily: "montserrat-medium", fontSize: moderateScale(14) }}>Estimated Time: <Text style={{ color: Colors.PRIMARY, fontFamily: "montserrat-semibold", fontSize: moderateScale(14) }}>{item.EWT}</Text></Text>
                        <Text style={{ fontFamily: "montserrat-medium", fontSize: moderateScale(14) }}>Next Available Position: <Text style={{ color: Colors.PRIMARY, fontFamily: "montserrat-semibold", fontSize: moderateScale(14) }}>{Number(item.TotalQueue) + 1}</Text></Text>
                      </View>

                      <Pressable
                        style={{
                          backgroundColor: Colors.PRIMARY,
                          width: scale(60),
                          height: verticalScale(40),
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 6 },
                          shadowOpacity: 0.4,
                          shadowRadius: 12,
                          elevation: 12,
                        }}
                        onPress={() => router.push({ pathname: "/selectservices", params: { BarberId: item.BarberId, SalonId: item.SalonId, BarberName: item.BarberName, EWT: item.EWT } })}
                      >
                        <Text style={{
                          fontFamily: "montserrat-medium", fontSize: moderateScale(14),
                          color: Colors.PRIMARYTEXT,
                        }}>Join</Text>
                      </Pressable>
                    </View>
                  </View>}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                />
        }


      </View>
    </View>
  )
}

export default SelectBarber

const styles = StyleSheet.create({})