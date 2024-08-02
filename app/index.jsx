import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const index = () => {

  const [currentSalonInfo, setCurrentSalonInfo] = useState([])

  useEffect(() => {
    const getloginsalonuserdata = async () => {
      const saloninfodata = await AsyncStorage.getItem('user-saloninfo')
      setCurrentSalonInfo(JSON.parse(saloninfodata))
    }

    getloginsalonuserdata()
  }, [])

  return (
    currentSalonInfo.length > 0 ? <Redirect href={"/signin"} /> : <Redirect href="/changelocation" />
  )
}

export default index

const styles = StyleSheet.create({})