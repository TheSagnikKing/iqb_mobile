import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
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
        <Pressable onPress={() => router.push("/profile")}>
          <Image
            source={require("../../assets/images/profile.webp")}
            style={{
              width: 35,
              height: 35,
              borderRadius: 50
            }}
          />
        </Pressable>
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
        <Pressable onPress={() => router.push("/help")}>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={() => router.push("/signin")}
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