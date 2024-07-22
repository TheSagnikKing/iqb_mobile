import { StyleSheet, Text, View, ScrollView, Pressable, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';
import { Foundation } from '@expo/vector-icons';
import { Colors } from "../../constants/Colors"
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { queueListAction } from '../../redux/Actions/QueueAction';

const qlistdata = [
  {
    _id: 1,
    qpos: 0,
    name: "John Doe",
    barber: "Arg"
  },
  {
    _id: 2,
    qpos: 0,
    name: "Sam",
    barber: "Arg"
  },
  {
    _id: 3,
    qpos: 0,
    name: "John Doe",
    barber: "Arg"
  },
  {
    _id: 4,
    qpos: 0,
    name: "John Doe",
    barber: "Arg"
  },
  {
    _id: 5,
    qpos: 0,
    name: "John Doe",
    barber: "Arg"
  },
  {
    _id: 6,
    qpos: 0,
    name: "John Doe",
    barber: "Arg"
  },
  {
    _id: 7,
    qpos: 0,
    name: "John Doe",
    barber: "Arg"
  },


  {
    _id: 8,
    qpos: 0,
    name: "John Doe",
    barber: "Arg"
  },
  {
    _id: 9,
    qpos: 0,
    name: "John Doe",
    barber: "Arg"
  },
  {
    _id: 10,
    qpos: 0,
    name: "John Doe",
    barber: "Arg"
  },
  {
    _id: 11,
    qpos: 0,
    name: "John Doe",
    barber: "Arg"
  },
  {
    _id: 12,
    qpos: 0,
    name: "John Doe",
    barber: "Sagnik"
  },
]

const QList = () => {

  const dispatch = useDispatch()

  const [currentSalonInfo, setCurrentSalonInfo] = useState([])
  const [lastRefreshTime, setLastRefreshTime] = useState(null);

  useEffect(() => {
    const getloginsalonuserdata = async () => {
      const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
      setCurrentSalonInfo(JSON.parse(saloninfodata))
    }

    getloginsalonuserdata()
  }, [])

  useEffect(() => {
    if (currentSalonInfo.length > 0) {
      dispatch(queueListAction({ salonid: currentSalonInfo?.[0]?.id, page_no: 1 }, "iqueuechecklist.php"))
      setLastRefreshTime(new Date().toLocaleTimeString());
    }

  }, [dispatch, currentSalonInfo])

  const queueList = useSelector(state => state.queueList)

  const {
    loading,
    response: qlistdata
  } = queueList

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSalonInfo.length > 0) {
        dispatch(queueListAction({ salonid: currentSalonInfo?.[0]?.id, page_no: 1 }, "iqueuechecklist.php"));
        setLastRefreshTime(new Date().toLocaleTimeString());
      }
    }, 10000);

    return () => clearInterval(interval); // Cleanup function to clear interval on unmount
  }, [dispatch, currentSalonInfo]);

  const refreshqlistPressed = () => {
    dispatch(queueListAction({ salonid: currentSalonInfo?.[0]?.id, page_no: 1 }, "iqueuechecklist.php"))
    setLastRefreshTime(new Date().toLocaleTimeString());
  }

  console.log("This salon QUEUE LIST ARE ", qlistdata)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <View style={styles.qlist_container}>
        <View style={styles.qlist_top}>
          <View>
            <Text style={{
              color: Colors.PRIMARY,
              fontFamily: "montserrat-semibold",
              fontSize: 16,
              marginBottom: 5
            }}>List Update</Text>
            <Text
              style={{
                fontFamily: "montserrat-medium",
                fontSize: 14
              }}
            >Last refreshing time: <Text>{`${lastRefreshTime}`}</Text></Text>
          </View>

          <Pressable
            style={{
              width: 38,
              height: 38,
              backgroundColor: Colors.PRIMARY,
              borderRadius: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 12,
            }}
            onPress={refreshqlistPressed}
          ><Foundation name="refresh" size={22} color="#fff" /></Pressable>
        </View>

        <View style={styles.qlist_table}>
          <View style={{
            backgroundColor: Colors.PRIMARY,
            height: 60,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around"
          }}>
            <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARYTEXT }} numberOfLines={1} ellipsizeMode="tail">Q-Position</Text>
            <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARYTEXT }} numberOfLines={1} ellipsizeMode="tail">Name</Text>
            <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARYTEXT }} numberOfLines={1} ellipsizeMode="tail">Barber</Text>
          </View>
        </View>

        {
          loading ?
            <View style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              flex: 1
            }}><ActivityIndicator size={20} color={"#000"} /></View> :
            qlistdata.length == 0 ?
              <View style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                flex: 1
              }}><Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, textAlign: "center" }}>No Queue List available</Text></View> :
              <FlatList
                data={qlistdata}
                renderItem={({ item }) => (
                  <View style={{
                    backgroundColor: "#efefef",
                    height: 60,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    borderBottomColor: "rgba(0,0,0,0.2)",
                    borderBottomWidth: 1
                  }}>
                    <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 16 }} numberOfLines={1} ellipsizeMode="tail">{item.Position}</Text>
                    <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 16 }} numberOfLines={1} ellipsizeMode="tail">{item.FirstLastName}</Text>
                    <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 16 }} numberOfLines={1} ellipsizeMode="tail">{item.BarberName}</Text>
                  </View>
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />
        }

      </View>
    </SafeAreaView>
  );
};

export default QList

const styles = StyleSheet.create({
  qlist_container: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  qlist_top: {
    height: 55,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  qlist_table: {
    marginTop: 20,
    backgroundColor: "#efefef"
  }
})