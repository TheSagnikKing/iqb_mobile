import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerDetailsByCustomeridAction } from '../../redux/Actions/ProfileAction';

const Header = () => {

  const [currentUserInfo, setCurrentUserInfo] = useState([])

  useEffect(() => {
    const getloginsalonuserdata = async () => {
      const userinfodata = await AsyncStorage.getItem('user-logininfo')
      setCurrentUserInfo(JSON.parse(userinfodata))
    }

    getloginsalonuserdata()
  }, [])

  // console.log("Current user info ", currentUserInfo)

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

  const router = useRouter()

  const logoutPressed = async () => {
    await AsyncStorage.removeItem('user-logininfo');
    router.push("/signin")
  }

  console.log("The customerdetailsdata from header ssss",customerdetailsdata)

  return (
    <View style={styles.header_container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10
        }}
      >
        <Pressable onPress={() => router.push("/profile")}>

          {
            customerdetailsdata ? <Image
              source={{ uri: `${customerdetailsdata?.CustomerImage}?${new Date().getTime()}`}}
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                borderColor: "rgba(0,0,0,0.4)",
                borderWidth: 2
              }}
            /> : <View style={{
              width: 35,
              height: 35,
              borderRadius: 50,
              borderColor: "rgba(0,0,0,0.4)",
              borderWidth: 2
            }}></View>
          }
        </Pressable>
        <Text
          style={{
            fontFamily: "montserrat-semibold",
            fontSize: 14
          }}
        >{`${currentUserInfo?.[0]?.FirstName}`}</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20
        }}
      >
        <Pressable onPress={() => router.push("/saloninfo")}>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={logoutPressed}
        >
          <MaterialCommunityIcons name="power" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header_container: {
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