import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors } from '../constants/Colors'

const Index = () => {
  const [currentSalonInfo, setCurrentSalonInfo] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getLoginSalonUserData = async () => {
      try {
        const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
        if (saloninfodata) {
          setCurrentSalonInfo(JSON.parse(saloninfodata))
        } else {
          setCurrentSalonInfo([])
        }
      } catch (error) {
        console.log("Error retrieving salon info:", error)
      }
    }

    getLoginSalonUserData()
  }, [])

  useEffect(() => {
    if (currentSalonInfo !== null) {
      if (currentSalonInfo.length > 0) {
        router.push("/signin")
      } else {
        router.push("/changelocation")
      }
    }
  }, [currentSalonInfo, router])

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{
            fontFamily: "montserrat-semibold",
            fontSize: 20,
            textAlign: "center",
            marginBottom: 25
          }}>Welcome To Iqueue Barbers</Text>
          <Pressable
            style={{
              backgroundColor: Colors.PRIMARY,
              paddingHorizontal: 25,
              paddingVertical: 10,
              borderRadius: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 25
            }}
            onPress={() => router.push("/changelocation")}
            >
            <Text style={{
              color: Colors.PRIMARYTEXT,
              fontFamily: "montserrat-medium",
              fontSize: 16
            }}>Select Location</Text>
          </Pressable>
        </View>
      </View>
    </>
  )
}

export default Index

const styles = StyleSheet.create({})
