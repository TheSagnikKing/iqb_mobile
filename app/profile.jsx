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
import * as ImagePicker from 'expo-image-picker';
import api from '../redux/Api/Api';

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

  // console.log("sdvsvksdkbkds ", customerdetailsdata)

  // useEffect(() => {
  //   if (customerdetailsdata) {
  //     setCustomerImage(customerdetailsdata?.CustomerImage)
  //   }
  // }, [customerdetailsdata])

  const router = useRouter()

  const uploadprofilepressed = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please enable camera roll permissions to upload an image.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.canceled) {
        uploadImage(result, 34736); // Pass the result object directly to the upload function
        // console.log("Upload Profile RESULT ", result)
      }
    } catch (error) {
      console.error('Error picking an image', error);
    }
  }

  const uploadImage = async (result, userId) => {
    try {
      let formData = new FormData();

      const base64Response = await fetch("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540sumeath%252Fiqb_mobile/ImagePicker/cd0f3d46-1e42-47fb-b96e-70ce7ebc4ef0.png");
      const blob = await base64Response.blob();

      const index = "1000023216.png".lastIndexOf('.');
      const ext = "1000023216.png".substring(index + 1);
      const fileName = `${userId}.${ext}`;

      console.log("the filename ", fileName)

      formData.append('file', "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540sumeath%252Fiqb_mobile/ImagePicker/cd0f3d46-1e42-47fb-b96e-70ce7ebc4ef0.png", fileName);

      const { data } = await api.post("/upload_profile_image.php", formData)

      console.log("The success ", data)

    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // const uploadImage = async (result,userId) => {
  //   try {

  //     let formData = new FormData();

  //     // Convert base64 string to blob
  //     const base64Response = await fetch(result.uri);
  //     const blob = await base64Response.blob();

  //     // Construct filename with UserId and original extension
  //     const index = result.fileName.lastIndexOf('.');
  //     const ext = result.fileName.substring(index + 1);
  //     const fileName = `${userId}.${ext}`;

  //     console.log("File name ", fileName)
  //   } catch (error) {
  //     console.error('Upload failed:', error);
  //   }
  // };

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
          marginBottom: 20
        }}>
          {
            customerdetailsdata && <Image
              source={{ uri: customerdetailsdata?.CustomerImage }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 50,
                borderColor: "rgba(0,0,0,0.4)",
                borderWidth: 2
              }}
            />
          }

          <Pressable style={{
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
            elevation: 12,
          }}
            onPress={() => uploadprofilepressed()}
          ><MaterialCommunityIcons name="camera-outline" size={22} color="#fff" /></Pressable>
        </View>

        <Text style={{
          fontFamily: "montserrat-semibold",
          textAlign: "center",
          marginBottom: 10
        }}>{`${customerdetailsdata?.CustomerFName} ${customerdetailsdata?.CustomerLName}`}</Text>

        <Text style={{
          fontFamily: "montserrat-semibold",
          textAlign: "center",
          marginBottom: 10
        }}>{customerdetailsdata?.CustomerEmail}</Text>

        <View style={{
          width: 60,
          height: 60,
          borderRadius: 50,
          marginHorizontal: "auto",
          marginVertical: 20,
          backgroundColor: Colors.PRIMARY,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 12,
          justifyContent: "center",
          alignItems: "center",
        }}><FontAwesome name="birthday-cake" size={22} color="#fff" /></View>

        <Text style={{
          fontFamily: "montserrat-semibold",
          textAlign: "center",
          marginBottom: 10
        }}>{customerdetailsdata?.CustomerDOB}</Text>

        <View style={{
          width: 60,
          height: 60,
          borderRadius: 50,
          marginHorizontal: "auto",
          marginVertical: 20,
          backgroundColor: Colors.PRIMARY,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 12,
          justifyContent: "center",
          alignItems: "center",
        }}><Feather name="phone-call" size={24} color="#fff" /></View>

        <Text style={{
          fontFamily: "montserrat-semibold",
          textAlign: "center",
          marginBottom: 10
        }}>{customerdetailsdata?.CustomerPhone}</Text>
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