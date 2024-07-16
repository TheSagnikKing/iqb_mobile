import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const profile = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <View style={{
        width: 100,
        height: 100,
        marginHorizontal: "auto",
        position: "relative",
        borderRadius: 50,
        marginTop: 10,
      }}>
        <Image
          source={require("../assets/images/profile.webp")}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 50,
            borderColor: "rgba(0,0,0,0.4)",
            borderWidth: 2
          }}
        />
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
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})