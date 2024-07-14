import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Header = () => {

  const router = useRouter()

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
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Image
            source={require("../../assets/images/profile.webp")}
            style={{
              width: 35,
              height: 35,
              borderRadius: "50%"
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "montserrat-semibold",
            fontSize: 14
          }}
        >John Doe</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20
        }}
      >
        <TouchableOpacity onPress={() => router.push("/help")}>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/signin")}
        >
          <MaterialCommunityIcons name="power" size={24} color="black" />
        </TouchableOpacity>
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