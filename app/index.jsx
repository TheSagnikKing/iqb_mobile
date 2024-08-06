import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
      <Text>Index Page</Text>
    </>
  )
}

export default Index

const styles = StyleSheet.create({})
