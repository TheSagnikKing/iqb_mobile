import { StyleSheet, Text, View, ScrollView, Pressable, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { Fontisto, MaterialIcons, Entypo, Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { adminRet2Action, iqueuedeleteJoinqAction } from '../../redux/Actions/HomeAction';

const Home = () => {

  const [currentUserInfo, setCurrentUserInfo] = useState([])
  const [currentSalonInfo, setCurrentSalonInfo] = useState([])

  useEffect(() => {
    const getloginsalonuserdata = async () => {
      const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
      const userinfodata = await AsyncStorage.getItem('user-logininfo')
      setCurrentSalonInfo(JSON.parse(saloninfodata))
      setCurrentUserInfo(JSON.parse(userinfodata))
    }

    getloginsalonuserdata()
  }, [])

  console.log("User Info ", currentUserInfo)
  // console.log("Salon Info ", currentSalonInfo)

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUserInfo.length > 0) {
      dispatch(adminRet2Action({ username: currentUserInfo?.[0]?.UserName, salonid: currentUserInfo?.[0]?.SalonId, type: currentUserInfo?.[0]?.serviceDeviceType }, "adminMergedRet2.php"))
    }
  }, [dispatch, currentUserInfo])

  const admiMergeRet2 = useSelector(state => state.adminRet2)

  const {
    loading,
    response
  } = admiMergeRet2

  console.log("Admin Merge Ret 2 Response ", response)

  const router = useRouter()
  const [join, setJoin] = useState(false)

  const menulistdata = [
    {
      _id: 1,
      name: "Select Barber",
      icon: <Fontisto name="person" size={18} color={"#000"} />,
      url: "/selectbarber",
      animationdelay: 300
    },
    {
      _id: 2,
      name: "Auto Join",
      icon: <Fontisto name="persons" size={18} color={"#000"} />,
      url: "/autojoin",
      animationdelay: 400
    },
    {
      _id: 3,
      name: "Join Group",
      icon: <FontAwesome6 name="person-walking-arrow-right" size={18} color={"#000"} />,
      url: "/joingroup",
      animationdelay: 500
    }
  ]

  const cancelQueue = (UserName, salonid, endpoint, dispatch) => {
    Alert.alert('Delete', `Are you sure you want to cancel booking of ${currentUserInfo?.[0]?.FirstName} ${currentUserInfo?.[0]?.LastName} ?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: async () => await iqueuedeleteJoinqAction(UserName, salonid, endpoint, dispatch) },
    ]);
  }
  return (
    <SafeAreaView style={{ flex: 1, position: "relative", backgroundColor: "#fff" }}>
      <Header />
      <ScrollView style={styles.home_container}>

        <View style={{
          borderBottomColor: "rgba(0,0,0,0.4)",
          borderBottomWidth: 2,
          paddingBottom: 10
        }}>
          <Text
            style={{
              fontFamily: "montserrat-semibold",
              textAlign: "center",
              marginBottom: 30,
              fontSize: 16
            }}
          >Information</Text>
          <Text style={{ fontFamily: "montserrat-medium" }}>{response?.SalonText}</Text>
        </View>

        <View style={styles.queue_status_container}>
          <View style={[styles.queue_status_item, { borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 2, height: 200 }]}>
            <View style={styles.queue_status_item_icon}>
              <Fontisto name="scissors" size={24} color="#fff" />
              <View style={[styles.statusonline, { backgroundColor: response?.SystemStatus ? "limegreen" : "red" }]}></View>
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: 16, marginBottom: 5 }}>System Status</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: 16 }}>{response?.SystemStatus ? "On" : "Off"}</Text>
            </View>
          </View>
          <View style={[styles.queue_status_item, { borderBottomColor: "rgba(0,0,0,0.4)", borderBottomWidth: 2, height: 200 }]}>
            <View style={styles.queue_status_item_icon}>
              <MaterialCommunityIcons name="human-queue" size={26} color="#fff" />
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: 16, marginBottom: 5 }}>Queuing</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: 16 }}>{response?.Queuing}</Text>
            </View>
          </View>

          <View style={[styles.queue_status_item, { borderTopColor: "rgba(0,0,0,0.4)", borderTopWidth: 2, height: 200 }]}>
            <View style={styles.queue_status_item_icon}>
              <FontAwesome6 name="person-circle-exclamation" size={24} color="#fff" />
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: 16, marginBottom: 5 }}>Barbers On Duty</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: 16 }}>{response?.BarbersOnDuty}</Text>
            </View>
          </View>
          <View style={[styles.queue_status_item, { borderLeftColor: "rgba(0,0,0,0.4)", borderLeftWidth: 2, height: 200 }]}>
            <View style={styles.queue_status_item_icon}>
              <Ionicons name="person-add-sharp" size={24} color="#fff" />
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: 16, marginBottom: 5 }}>Next In Queue</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: 16 }}>{response?.NextPositionAvailable}</Text>
            </View>
          </View>

          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -25 }, { translateY: -25 }],
              backgroundColor: "#fff",
              borderRadius: 25,
              height: 50,
              width: 50,
            }}
          ></View>
        </View>

        <View style={{
          marginTop: 15,
          borderTopColor: "rgba(0,0,0,0.4)",
          borderTopWidth: 2
        }}></View>

        <View
          style={{
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 20
            }}
          >
            <View style={styles.queue_status_item_icon}>
              <MaterialCommunityIcons name="progress-clock" size={35} color="#fff" />
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: 16, marginBottom: 5 }}>Estimated Wait Time</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: 16 }}>{response?.EstimatedWaitTime}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {
        response?.QStatusList == 0 ? (<View style={{
          position: "absolute",
          right: 15,
          bottom: 15
        }}>
          <Pressable
            style={{
              width: 45,
              height: 45,
              backgroundColor: Colors.PRIMARY,
              borderRadius: 50,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setJoin((prev) => !prev)}
          >{
              join ? <Entypo name="cross" size={24} color="#fff" /> : <MaterialIcons name="person-add-alt-1" size={24} color="#fff" />
            }
          </Pressable>

          {
            join && <View
              style={{
                height: "auto",
                width: 220,
                position: "absolute",
                top: -160,
                right: 3,
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 10,
                flexDirection: "column",
                shadowColor: '#fff',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 5,
              }}
            >

              <FlatList
                data={menulistdata}
                renderItem={({ item }) => <View style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginBottom: 5,
                  animationdelay: 300
                }}>
                  <Pressable
                    onPress={() => {
                      router.push(item.url)
                      setJoin(false)
                    }}

                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10
                    }}
                  >
                    <Text style={{
                      lineHeight: 30,
                      backgroundColor: "#efefef",
                      paddingHorizontal: 15,
                      borderRadius: 15,
                      fontFamily: "montserrat-semibold",
                      fontSize: 14,
                      borderColor: Colors.PRIMARY,
                      borderWidth: 1,
                    }}>{item.name}</Text>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#efefef",
                        borderColor: Colors.PRIMARY,
                        borderWidth: 1,
                        borderRadius: 50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >{item.icon}</View>
                  </Pressable>
                </View>
                }
                keyExtractor={item => item._id}
              />

            </View>
          }
        </View>) : response?.QStatusList?.length > 0 && (<View>
          <Text style={{
            textAlign: "center",
            fontFamily: "montserrat-bold",
            marginVertical: 20,
            fontSize: 16
          }}>Queue Status</Text>
          <View>
            <View style={{
              width: "90%",
              height: 60,
              backgroundColor: Colors.PRIMARY,
              marginHorizontal: "auto",
              zIndex: 2,
              borderRadius: 5,
              padding: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20
              }}>
                <Text style={{ color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold" }}>{response?.QStatusList?.[0]?.SlNo}</Text>
                <View>
                  <Text style={{ color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold" }}>Name: {response?.QStatusList?.[0]?.Name}</Text>
                  <Text style={{ color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold" }}>Barber: {response?.QStatusList?.[0]?.Barber}</Text>
                </View>
              </View>
              <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20
              }}>
                <View style={{
                  backgroundColor: "#000",
                  height: 30,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderColor: "#fff",
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}><Text style={{ textAlign: "center", color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold" }}>{response?.QStatusList?.[0]?.TimeData}</Text></View>

                <Pressable style={{
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderRadius: 50,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.4,
                  shadowRadius: 12,
                  elevation: 5,

                }}
                  onPress={() => cancelQueue(response?.QStatusList?.[0]?.UserName, currentUserInfo?.[0]?.SalonId, "iqueuedeletejoinedq.php", dispatch)}
                ><MaterialCommunityIcons name="cancel" size={24} color="red" /></Pressable>
              </View>
            </View>
            <View
              style={{
                width: "25%",
                height: 40,
                backgroundColor: Colors.PRIMARY,
                marginHorizontal: "auto",
                marginBottom: 10,
                zIndex: 2,
                padding: 10
              }}
            ><Text style={{ textAlign: "center", color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold" }}>Q Status</Text>
            </View>
          </View>
        </View>)
      }

      {/* This is the join icons view */}
      {/* <View style={{
        position: "absolute",
        right: 15,
        bottom: 15
      }}>
        <Pressable
          style={{
            width: 45,
            height: 45,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 50,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 12,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setJoin((prev) => !prev)}
        >{
            join ? <Entypo name="cross" size={24} color="#fff" /> : <MaterialIcons name="person-add-alt-1" size={24} color="#fff" />
          }
        </Pressable>

        {
          join && <View
            style={{
              height: "auto",
              width: 220,
              position: "absolute",
              top: -160,
              right: 3,
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 10,
              flexDirection: "column",
              shadowColor: '#fff',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 5,
            }}
          >

            <FlatList
              data={menulistdata}
              renderItem={({ item }) => <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 10,
                marginBottom: 5,
                animationdelay: 300
              }}>
                <Pressable
                  onPress={() => {
                    router.push(item.url)
                    setJoin(false)
                  }}

                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10
                  }}
                >
                  <Text style={{
                    lineHeight: 30,
                    backgroundColor: "#efefef",
                    paddingHorizontal: 15,
                    borderRadius: 15,
                    fontFamily: "montserrat-semibold",
                    fontSize: 14,
                    borderColor: Colors.PRIMARY,
                    borderWidth: 1,
                  }}>{item.name}</Text>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#efefef",
                      borderColor: Colors.PRIMARY,
                      borderWidth: 1,
                      borderRadius: 50,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >{item.icon}</View>
                </Pressable>
              </View>
              }
              keyExtractor={item => item._id}
            />

          </View>
        }
      </View> */}

      {/* This is the queue status code after successful joining */}
      {/* <View>
        <Text style={{
          textAlign: "center",
          fontFamily: "montserrat-bold",
          marginVertical: 20,
          fontSize: 16
        }}>Queue Status</Text>
        <View>
          <View style={{
            width: "90%",
            height: 60,
            backgroundColor: Colors.PRIMARY,
            marginHorizontal: "auto",
            zIndex: 2,
            borderRadius: 5,
            padding: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20
            }}>
              <Text style={{ color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold" }}>5</Text>
              <View>
                <Text style={{ color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold" }}>Name: Ady Jacinto</Text>
                <Text style={{ color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold" }}>Barber: Bilal</Text>
              </View>
            </View>
            <View style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 20
            }}>
              <View style={{
                backgroundColor: "#000",
                height: 30,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderColor: "#fff",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center"
              }}><Text style={{ textAlign: "center", color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold" }}>02:00</Text></View>

              <Pressable style={{
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 50,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 5,

              }}
                onPress={() => alert("Alert")}
              ><MaterialCommunityIcons name="cancel" size={24} color="red" /></Pressable>
            </View>
          </View>
          <View
            style={{
              width: "25%",
              height: 40,
              backgroundColor: Colors.PRIMARY,
              marginHorizontal: "auto",
              marginBottom: 10,
              zIndex: 2,
              padding: 10
            }}
          ><Text style={{ textAlign: "center", color: Colors.PRIMARYTEXT, fontFamily: "montserrat-semibold" }}>Q Status</Text>
          </View>
        </View>
      </View> */}
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  home_container: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  queue_status_container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    height: 405,
    position: "relative",
  },
  queue_status_item: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  queue_status_item_icon: {
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: Colors.PRIMARY,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
    position: "relative"
  },
  statusonline: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 17,
    width: 17,
    borderRadius: 9,
    borderColor: "#fff",
    borderWidth: 2
  }
})
