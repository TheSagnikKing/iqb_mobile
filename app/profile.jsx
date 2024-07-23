import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../constants/Colors'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerDetailsByCustomeridAction } from '../redux/Actions/ProfileAction';

const profile = () => {

  const [currentUserInfo, setCurrentUserInfo] = useState([])

  useEffect(() => {
    const getloginsalonuserdata = async () => {
      const userinfodata = await AsyncStorage.getItem('user-logininfo')
      setCurrentUserInfo(JSON.parse(userinfodata))
    }

    getloginsalonuserdata()
  }, [])

  const [CustomerImage, setCustomerImage] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUserInfo.length > 0) {
      dispatch(getCustomerDetailsByCustomeridAction(currentUserInfo?.[0]?.SalonId, currentUserInfo?.[0]?.UserName, "GetCustomerDetailsByCustomerId.php"))
    }
  }, [dispatch, currentUserInfo])

  const getCustomerDetailsByCustomerid = useSelector(state => state.getCustomerDetailsByCustomerid)

  const {
    loading,
    response: customerdetailsdata
  } = getCustomerDetailsByCustomerid

  console.log("sdvsvksdkbkds ", customerdetailsdata)

  useEffect(() => {
    if (customerdetailsdata) {
      setCustomerImage(customerdetailsdata?.CustomerImage)
    }
  }, [customerdetailsdata])

  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.profile_header_container}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 30
        }}>
          <Pressable onPress={() => router.push("/home")}><AntDesign name="arrowleft" size={24} color="black" /></Pressable>
          <Text style={{ fontFamily: "montserrat-medium", fontSize: 18 }}>Profile</Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20
          }}
        >
          <Pressable onPress={() => router.push("/editprofile")}>
            <Feather name="edit" size={22} color="black" />
          </Pressable>
          <Pressable
            onPress={() => router.push("/signin")}
          >
            <MaterialCommunityIcons name="power" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <View style={{
          width: 100,
          height: 100,
          marginHorizontal: "auto",
          position: "relative",
          borderRadius: 50,
          marginTop: 10,
        }}>
          {
            CustomerImage !== "" && <Image
            source={{ uri: CustomerImage }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 50,
              borderColor: "rgba(0,0,0,0.4)",
              borderWidth: 2
            }}
          />
          }
          
          <View style={{
            position: "absolute",
            bottom: -5,
            right: -10,
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: Colors.PRIMARY,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 12
          }}><MaterialCommunityIcons name="camera-outline" size={22} color="#fff" /></View>
        </View>

        <View style={{
          width: 60,
          height: 60,
          borderRadius: 50,
          marginHorizontal: "auto",
          marginVertical: 30,
          backgroundColor: Colors.PRIMARY,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 12,
          justifyContent: "center",
          alignItems: "center",
        }}><FontAwesome name="birthday-cake" size={22} color="#fff" /></View>

        <View style={{
          width: 60,
          height: 60,
          borderRadius: 50,
          marginHorizontal: "auto",
          backgroundColor: Colors.PRIMARY,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 12,
          justifyContent: "center",
          alignItems: "center",
        }}><Feather name="phone-call" size={24} color="#fff" /></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default profile

const styles = StyleSheet.create({
  profile_header_container: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1
  }
})