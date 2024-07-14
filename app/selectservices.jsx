import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const selectservices = () => {

  const params = useLocalSearchParams();

  console.log(params)

  return (
    <View>
      <Text>selectservices</Text>
    </View>
  )
}

export default selectservices

const styles = StyleSheet.create({})