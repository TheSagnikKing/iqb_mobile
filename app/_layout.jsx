import React from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'

const _layout = () => {

  useFonts({
    'montserrat': require('./../assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-medium': require('./../assets/fonts/Montserrat-Medium.ttf'),
    'montserrat-semibold': require('./../assets/fonts/Montserrat-SemiBold.ttf'),
    'montserrat-bold': require('./../assets/fonts/Montserrat-Bold.ttf')
  })

  return (
    <Stack>
      <Stack.Screen name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="signin"
      />
      <Stack.Screen name="signup"
      />
      <Stack.Screen name="(tabs)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}

export default _layout
