import { StyleSheet, Text, View, ScrollView, Pressable, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';
import { Foundation } from '@expo/vector-icons';
import { Colors } from "../../constants/Colors"
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { queueListAction } from '../../redux/Actions/QueueAction';
import { AntDesign } from '@expo/vector-icons';

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

  const [pageno, setPageno] = useState(1)

  useEffect(() => {
    if (currentSalonInfo.length > 0) {
      dispatch(queueListAction({ salonid: currentSalonInfo?.[0]?.id, page_no: pageno }, "iqueuechecklist.php"))
      setLastRefreshTime(new Date().toLocaleTimeString());
    }

  }, [dispatch, currentSalonInfo])

  const queueList = useSelector(state => state.queueList)

  const {
    loading,
    response: qlistdata
  } = queueList

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (currentSalonInfo.length > 0) {
  //       dispatch(queueListAction({ salonid: currentSalonInfo?.[0]?.id, page_no: 1 }, "iqueuechecklist.php"));
  //       setLastRefreshTime(new Date().toLocaleTimeString());
  //     }
  //   }, 10000);

  //   return () => clearInterval(interval); // Cleanup function to clear interval on unmount
  // }, [dispatch, currentSalonInfo]);

  const refreshqlistPressed = () => {
    dispatch(queueListAction({ salonid: currentSalonInfo?.[0]?.id, page_no: pageno }, "iqueuechecklist.php"))
    setLastRefreshTime(new Date().toLocaleTimeString());
  }

  const nextqlist = () => {
    const newPageno = pageno + 1;
      setPageno(newPageno);
      dispatch(queueListAction({ salonid: currentSalonInfo?.[0]?.id, page_no: newPageno }, "iqueuechecklist.php"));
      setLastRefreshTime(new Date().toLocaleTimeString());
  }

  const prevqlist = () => {
    if (pageno > 1) {
      const newPageno = pageno - 1;
      setPageno(newPageno);
      dispatch(queueListAction({ salonid: currentSalonInfo?.[0]?.id, page_no: newPageno }, "iqueuechecklist.php"));
      setLastRefreshTime(new Date().toLocaleTimeString());
    }
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
            <Text style={{ flex: 0.6, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 12, color: Colors.PRIMARYTEXT }} numberOfLines={1} ellipsizeMode="tail">Q-Position</Text>
            <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 12, color: Colors.PRIMARYTEXT }} numberOfLines={1} ellipsizeMode="tail">Name</Text>
            <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 12, color: Colors.PRIMARYTEXT }} numberOfLines={1} ellipsizeMode="tail">Barber</Text>
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
                style={{
                  maxHeight: 475
                }}
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
                    <Text style={{ flex: 0.6, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 12 }} numberOfLines={1} ellipsizeMode="tail">{item.QPosition}</Text>
                    <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 12 }} numberOfLines={1} ellipsizeMode="tail">{item.FirstLastName}</Text>
                    <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 12 }} numberOfLines={1} ellipsizeMode="tail">{item.BarberName}</Text>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
        }

        {
          loading == false &&
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            height: 45,
            gap: 20
          }}>
            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16}}>Page No. <Text>{pageno}</Text></Text>

            <Pressable style={{
              marginLeft: "auto",
              height: 35,
              width: 35,
              borderRadius: 50,
              backgroundColor: Colors.PRIMARY,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 12,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={prevqlist}
            ><AntDesign name="caretleft" size={15} color={Colors.PRIMARYTEXT} /></Pressable>
            <Pressable
              style={{
                height: 35,
                width: 35,
                borderRadius: 50,
                backgroundColor: Colors.PRIMARY,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 12,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={nextqlist}
            ><AntDesign name="caretright" size={15} color={Colors.PRIMARYTEXT} /></Pressable>
          </View>
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