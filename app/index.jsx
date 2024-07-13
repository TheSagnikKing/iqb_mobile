import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: Colors.light.background
      }}
    >
      <Text style={{
        fontSize: 22,
        fontFamily: "montserrat-medium",
        marginBottom: 15
      }}>Welcome to iqueue barbers</Text>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.PRIMARY,
          paddingHorizontal: 25,
          paddingVertical: 8,
          borderRadius: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
        }}
      >
        <Link href={"/signin"}
          style={{
            color: Colors.PRIMARYTEXT,
            fontFamily: "montserrat-medium",
          }}
        >Go to Signin</Link>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})