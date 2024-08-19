// import { StyleSheet, Text, View, ScrollView, Pressable, FlatList, ActivityIndicator } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Header from '../../components/Header/Header';
// import { Foundation } from '@expo/vector-icons';
// import { Colors } from "../../constants/Colors"
// import { useDispatch, useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { queueListAction } from '../../redux/Actions/QueueAction';
// import { AntDesign } from '@expo/vector-icons';
// import api from '../../redux/Api/Api';

// const QList = () => {

//   const dispatch = useDispatch()

//   const [currentSalonInfo, setCurrentSalonInfo] = useState([])
//   const [lastRefreshTime, setLastRefreshTime] = useState(null);

//   useEffect(() => {
//     const getloginsalonuserdata = async () => {
//       const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
//       setCurrentSalonInfo(JSON.parse(saloninfodata))
//     }

//     getloginsalonuserdata()
//   }, [])

//   const [pageno, setPageno] = useState(1)

//   useEffect(() => {
//     if (currentSalonInfo.length > 0) {
//       dispatch(queueListAction({ salonid: currentSalonInfo?.[0]?.id, page_no: pageno }, "iqueuechecklist.php"))
//       setLastRefreshTime(new Date().toLocaleTimeString());
//     }

//   }, [dispatch, currentSalonInfo])

//   const queueList = useSelector(state => state.queueList)

//   const {
//     loading,
//     response: qlistdata
//   } = queueList


//   const refreshqlistPressed = () => {
//     dispatch(queueListAction({ salonid: currentSalonInfo?.[0]?.id, page_no: pageno }, "iqueuechecklist.php"))
//     setLastRefreshTime(new Date().toLocaleTimeString());
//   }

//   const nextqlist = () => {
//     const newPageno = pageno + 1;
//     setPageno(newPageno);
//     dispatch(queueListAction({ salonid: currentSalonInfo?.[0]?.id, page_no: newPageno }, "iqueuechecklist.php"));
//     setLastRefreshTime(new Date().toLocaleTimeString());
//   }

//   const prevqlist = () => {
//     if (pageno > 1) {
//       const newPageno = pageno - 1;
//       setPageno(newPageno);
//       dispatch(queueListAction({ salonid: currentSalonInfo?.[0]?.id, page_no: newPageno }, "iqueuechecklist.php"));
//       setLastRefreshTime(new Date().toLocaleTimeString());
//     }
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       <Header />
//       <View style={styles.qlist_container}>
//         <View style={styles.qlist_top}>
//           <View>
//             <Text style={{
//               color: Colors.PRIMARY,
//               fontFamily: "montserrat-semibold",
//               fontSize: 16,
//               marginBottom: 5
//             }}>List Update</Text>
//             <Text
//               style={{
//                 fontFamily: "montserrat-medium",
//                 fontSize: 14
//               }}
//             >Last refreshing time: <Text>{`${lastRefreshTime}`}</Text></Text>
//           </View>

//           <Pressable
//             style={{
//               width: 38,
//               height: 38,
//               backgroundColor: Colors.PRIMARY,
//               borderRadius: 50,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               shadowColor: '#000',
//               shadowOffset: { width: 0, height: 6 },
//               shadowOpacity: 0.4,
//               shadowRadius: 12,
//               elevation: 12,
//             }}
//             onPress={refreshqlistPressed}
//           ><Foundation name="refresh" size={22} color="#fff" /></Pressable>
//         </View>

//         <View style={styles.qlist_table}>
//           <View style={{
//             backgroundColor: Colors.PRIMARY,
//             height: 60,
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-around"
//           }}>
//             <Text style={{ flex: 0.6, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 12, color: Colors.PRIMARYTEXT }} numberOfLines={1} ellipsizeMode="tail">Q-Position</Text>
//             <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 12, color: Colors.PRIMARYTEXT }} numberOfLines={1} ellipsizeMode="tail">Name</Text>
//             <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 12, color: Colors.PRIMARYTEXT }} numberOfLines={1} ellipsizeMode="tail">Barber</Text>
//           </View>
//         </View>

//         {
//           loading ?
//             <View style={{
//               padding: 10,
//               justifyContent: "center",
//               alignItems: "center",
//               flex: 1
//             }}><ActivityIndicator size={20} color={"#000"} /></View> :
//             qlistdata.length == 0 ?
//               <View style={{
//                 padding: 10,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 flex: 1
//               }}><Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, textAlign: "center" }}>No Queue List available</Text></View> :
//               <FlatList
//                 style={{
//                   maxHeight: 475
//                 }}
//                 data={qlistdata}
//                 renderItem={({ item }) => (
//                   <View style={{
//                     backgroundColor: "#efefef",
//                     height: 60,
//                     display: "flex",
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "space-around",
//                     borderBottomColor: "rgba(0,0,0,0.2)",
//                     borderBottomWidth: 1
//                   }}>
//                     <Text style={{ flex: 0.6, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 12 }} numberOfLines={1} ellipsizeMode="tail">{item.QPosition}</Text>
//                     <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 12 }} numberOfLines={1} ellipsizeMode="tail">{item.FirstLastName}</Text>
//                     <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 12 }} numberOfLines={1} ellipsizeMode="tail">{item.BarberName}</Text>
//                   </View>
//                 )}
//                 keyExtractor={item => item.id}
//               />
//         }

//         {
//           loading == false &&
//           <View style={{
//             flexDirection: "row",
//             alignItems: "center",
//             height: 45,
//             gap: 20
//           }}>
//             <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16 }}>Page No. <Text>{pageno}</Text></Text>

//             <Pressable style={{
//               marginLeft: "auto",
//               height: 35,
//               width: 35,
//               borderRadius: 50,
//               backgroundColor: Colors.PRIMARY,
//               shadowColor: '#000',
//               shadowOffset: { width: 0, height: 6 },
//               shadowOpacity: 0.4,
//               shadowRadius: 12,
//               elevation: 12,
//               justifyContent: "center",
//               alignItems: "center"
//             }}
//               onPress={prevqlist}
//             ><AntDesign name="caretleft" size={15} color={Colors.PRIMARYTEXT} /></Pressable>
//             <Pressable
//               style={{
//                 height: 35,
//                 width: 35,
//                 borderRadius: 50,
//                 backgroundColor: Colors.PRIMARY,
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 6 },
//                 shadowOpacity: 0.4,
//                 shadowRadius: 12,
//                 elevation: 12,
//                 justifyContent: "center",
//                 alignItems: "center"
//               }}
//               onPress={nextqlist}
//             ><AntDesign name="caretright" size={15} color={Colors.PRIMARYTEXT} /></Pressable>
//           </View>
//         }


//       </View>
//     </SafeAreaView>
//   );
// };

// export default QList

// const styles = StyleSheet.create({
//   qlist_container: {
//     backgroundColor: "#fff",
//     width: "100%",
//     flex: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//   },
//   qlist_top: {
//     height: 55,
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   qlist_table: {
//     marginTop: 20,
//     backgroundColor: "#efefef"
//   }
// })


// New qlist logic



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
import api from '../../redux/Api/Api';

const QList = () => {

  const [currentSalonInfo, setCurrentSalonInfo] = useState([])
  const [lastRefreshTime, setLastRefreshTime] = useState(null);

  useEffect(() => {
    const getloginsalonuserdata = async () => {
      const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
      setCurrentSalonInfo(JSON.parse(saloninfodata))
    }

    getloginsalonuserdata()
  }, [])

  /// =======================

  const [queueloading, setQueueloading] = useState(false)

  const qrefreshlist = () => {
    const initialFetch = async () => {
      setQueueloading(true)
      const data = await fetchallqueue(1);
      const sortedData = data.sort((a, b) => a.QPosition - b.QPosition);
      
      setQueueloading(false)
      setAllqueuestate(sortedData);
    };

    if (currentSalonInfo) {
      initialFetch();
      setNewpgno(1)
    }
    setLastRefreshTime(new Date().toLocaleTimeString());
  }

  const [allqueuestate, setAllqueuestate] = useState([]);
  const [newpgno, setNewpgno] = useState(1);

  // Function to fetch queue data
  const fetchallqueue = async (page_no) => {
    const { data } = await api.post(`/iqueuechecklist.php`, {
      salonid: currentSalonInfo?.[0]?.id,
      page_no
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    setLastRefreshTime(new Date().toLocaleTimeString());

    return data;
  };

  // Initial fetch on component mount or when currentSalonInfo changes
  useEffect(() => {
    const initialFetch = async () => {
      setQueueloading(true)
      const data = await fetchallqueue(1);
      const sortedData = data.sort((a, b) => a.QPosition - b.QPosition);
      setQueueloading(false)
      setAllqueuestate(sortedData);
    
    };

    if (currentSalonInfo) {
      initialFetch();
    }
  }, [currentSalonInfo]);

  // Fetch and merge new page data when newpgno changes
  // useEffect(() => {
  //   if (newpgno > 1) {
  //     const fetchAndMerge = async () => {
  //       const data = await fetchallqueue(newpgno);
  //       const mergedData = [...allqueuestate, ...data];
  //       const sortedData = mergedData.sort((a, b) => a.QPosition - b.QPosition);
  //       setAllqueuestate(sortedData);
  //     };

  //     fetchAndMerge();
  //   }
  // }, [newpgno, currentSalonInfo]);


  // Fetch and merge new page data when newpgno changes

  useEffect(() => {
    if (newpgno > 1) {
      const fetchAndMerge = async () => {
        try {
          setQueueloading(true)
          const data = await fetchallqueue(newpgno);

          if (data.length === 0) {
            setNewpgno(100);
            setQueueloading(false)
            return; 
          }
  
          const existingIds = new Set(allqueuestate.map(item => item.id));

          const filteredData = data.filter(item => !existingIds.has(item.id));
  
          const mergedData = [...allqueuestate, ...filteredData];

          const sortedData = mergedData.sort((a, b) => a.QPosition - b.QPosition);

          
          setQueueloading(false)
          setAllqueuestate(sortedData);
        } catch (error) {
          console.error('Error fetching or merging data:', error);
          setQueueloading(false)
        }
      };
  
      fetchAndMerge();
    }
  }, [newpgno, currentSalonInfo]);

  // Function to fetch next page data
  const nextqdata = () => {
    setNewpgno(prevPgno => prevPgno + 1);
  };


  console.log("All Queue State are ", allqueuestate);


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
            onPress={qrefreshlist}
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
          queueloading ?
            <View style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              flex: 1
            }}><ActivityIndicator size={20} color={"#000"} /></View> :
            allqueuestate?.length == 0 ?
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
                data={allqueuestate}
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
          queueloading == false &&
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            height: 45,
            gap: 20
          }}>
            {
              newpgno == 100 ? 
              <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16 }}>All queue data</Text> :
              <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16 }}>Page No. <Text>{newpgno}</Text></Text>
            }
            

            {/* <Pressable style={{
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
              onPress={() => {}}
            ><AntDesign name="caretleft" size={15} color={Colors.PRIMARYTEXT} /></Pressable> */}

            {
              newpgno != 100 && <Pressable
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
                alignItems: "center",
                marginLeft: "auto"
              }}
              onPress={nextqdata}
            ><AntDesign name="caretright" size={15} color={Colors.PRIMARYTEXT} /></Pressable>
            }
            
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




