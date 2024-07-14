import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';
import { Foundation } from '@expo/vector-icons';
import { Colors } from "../../constants/Colors"

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
  // {
  //   _id: 8,
  //   qpos: 0,
  //   name: "John Doe",
  //   barber: "Arg"
  // },
  // {
  //   _id: 9,
  //   qpos: 0,
  //   name: "John Doe",
  //   barber: "Arg"
  // },
  // {
  //   _id: 10,
  //   qpos: 0,
  //   name: "John Doe",
  //   barber: "Arg"
  // },
]

const QList = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView style={styles.qlist_container}>
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
            >Last refreshing time: 17:24</Text>
          </View>

          <TouchableOpacity
            style={{
              width: 38,
              height: 38,
              backgroundColor: Colors.PRIMARY,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
            }}
          ><Foundation name="refresh" size={22} color="#fff" /></TouchableOpacity>
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

          <FlatList
            data={qlistdata}
            renderItem={({ item }) => <View style={{
              backgroundColor: "#efefef",
              height: 60,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              borderBottomColor: "rgba(0,0,0,0.2)",
              borderBottomWidth: 1
            }}>
              <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 16 }} numberOfLines={1} ellipsizeMode="tail">{item.qpos}</Text>
              <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 16 }} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={{ flex: 1, textAlign: "center", paddingHorizontal: 10, fontFamily: "montserrat-semibold", fontSize: 16 }} numberOfLines={1} ellipsizeMode="tail">{item.barber}</Text>
            </View>}
            keyExtractor={item => item._id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default QList

const styles = StyleSheet.create({
  qlist_container: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
    paddingVertical: 20,
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