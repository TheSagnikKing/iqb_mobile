import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Header = () => {
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
        <Image
          source={require("../../assets/images/profile.webp")}
          style={{
            width: 35,
            height: 35,
            borderRadius: "50%"
          }}
        />
        <Text
          style={{
            fontFamily: "montserrat-semibold",
            fontSize: 14
          }}
        >John Doe</Text>
      </View>
      <View
      style={{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap: 10
      }}
      >
        <View>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </View>
        <View>
          <MaterialCommunityIcons name="power" size={24} color="black" />
        </View>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header_container: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1
  }
})