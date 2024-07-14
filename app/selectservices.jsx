import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

{/* <MaterialIcons name="delete" size={24} color="black" /> */ }

const selectservices = () => {

  const params = useLocalSearchParams();

  console.log(params)

  const servicesdata = [
    {
      _id: 1
    },
    {
      _id: 2,
    },
    {
      _id: 3,
    },
    {
      _id: 4
    },
    {
      _id: 5
    },
    {
      _id: 6,
    },
    {
      _id: 7,
    },
    {
      _id: 8
    }
  ]

  const [selectedServices, setSelectedServices] = useState([])

  const addServiceClicked = (service) => {
    setSelectedServices([...selectedServices, service])
  }

  const deleteServiceClicked = (service) => {
    setSelectedServices((prev) => prev.filter((ser) => ser._id !== service._id))
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{
        backgroundColor: "#fff",
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
                borderRadius: "50%",
                borderColor: "rgba(0,0,0,0.4)",
                borderWidth: 1
              }}
            /></View>
          <View>
            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, marginBottom: 5 }}>John</Text>
            <Text style={{ fontFamily: "montserrat-medium", fontSize: 14 }}>Estimated wait time: 0hrs: 0mins</Text>
          </View>
        </View>

        <View style={{
          height: 70,
          backgroundColor: Colors.PRIMARY,
          marginTop: 5,
          paddingHorizontal: 10,
          justifyContent: "center",
          borderRadius: 5
        }}>
          <Text style={{ fontFamily: "montserrat-semibold", fontSize: 18, color: Colors.PRIMARYTEXT }}>Select Service</Text>
          <Text style={{ fontFamily: "montserrat-medium", fontSize: 14, marginTop: 5, color: Colors.PRIMARYTEXT }}>2 Service(s) Available</Text>
        </View>

        <FlatList
          data={servicesdata}
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
              <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14 }}>Test Spa</Text>

              {
                selectedServices.find((ser) => ser._id == item._id) ?
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: "red",
                      borderRadius: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity: 0.4,
                      shadowRadius: 12,
                    }}
                    onPress={() => deleteServiceClicked(item)}
                  ><MaterialIcons name="delete" size={20} color="#fff" /></TouchableOpacity> :
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: Colors.PRIMARY,
                      borderRadius: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity: 0.4,
                      shadowRadius: 12,
                    }}
                    onPress={() => addServiceClicked(item)}
                  ><AntDesign name="plus" size={18} color="#fff" /></TouchableOpacity>
                
              }
            </View>

            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Text style={{ fontFamily: "montserrat-medium", fontSize: 16, borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 1, paddingRight: 10 }}>$14.00</Text>
              <Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }}>0 hrs: 0 mins</Text>
            </View>

          </View>}
          keyExtractor={item => item._id}
        />

      </ScrollView>
      <TouchableOpacity 
      style={{
        height: 50,
        backgroundColor: Colors.PRIMARY,
        justifyContent:"center",
        alignItems:"center"
      }}
      onPress={() => alert("Are you Sure ?")}
      >
        <Text style={{fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARYTEXT}}>+JOIN QUEUE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default selectservices

const styles = StyleSheet.create({})