import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors'
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';

const Joingroupbarbers = () => {

  const router = useRouter()

  const barberlist = [
    {
      _id: 1,
      name: "Any Barber",
      borderColor: "rgba(0,0,0,0.4)"
    },
    {
      _id: 2,
      name: "Smith",
      borderColor: Colors.PRIMARY
    },
    {
      _id: 3,
      name: "Jones",
      borderColor: Colors.PRIMARY
    },
  ]

  const dispatch = useDispatch()

  const barberPressed = (barber) => {
      dispatch({
        type: "SELECT_BARBER",
        payload: barber.name
      })
    router.push("/joingroupservices")
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 10 }}>

      <FlatList
        data={barberlist}
        renderItem={({ item }) => <Pressable
          onPress={() => barberPressed(item)}
          style={{ height: 60, backgroundColor: "#efefef", borderRadius: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, marginBottom: 10, borderColor: "rgba(0,0,0,0.4)", borderWidth: 1 }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}>
            <View style={{ width: 45, height: 45, borderColor: `${item.borderColor}`, borderWidth: 3, borderRadius: 50 }}></View>
            <Text style={{
              fontFamily: "montserrat-semibold",
              fontSize: 14
            }}>{item.name}</Text>
          </View>

          <View><Feather name="arrow-right-circle" size={26} color="black" /></View>
        </Pressable>}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default Joingroupbarbers

const styles = StyleSheet.create({})