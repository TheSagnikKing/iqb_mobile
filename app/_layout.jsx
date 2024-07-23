import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux'
import store from '../redux/store'

SplashScreen.preventAutoHideAsync();

const _layout = () => {

  const [loaded, error] = useFonts({
    'montserrat': require('./../assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-medium': require('./../assets/fonts/Montserrat-Medium.ttf'),
    'montserrat-semibold': require('./../assets/fonts/Montserrat-SemiBold.ttf'),
    'montserrat-bold': require('./../assets/fonts/Montserrat-Bold.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="signin"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="signup"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen name="forgot" />

        <Stack.Screen name="agree"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen name="activationcode"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="(tabs)"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen name="selectbarber"
          options={{
            headerTitle: "Barber List"
          }}
        />

        <Stack.Screen name="selectservices"
          options={{
            headerTitle: "Select Service"
          }}
        />

        <Stack.Screen name="autojoin"
          options={{
            headerTitle: "Auto Join"
          }}
        />

        <Stack.Screen name="joingroup"
          options={{
            headerTitle: "Group Join"
          }}
        />

        <Stack.Screen name="joingroupbarbers"
          options={{
            headerTitle: "Select Baber"
          }}
        />

        <Stack.Screen name="joingroupservices"
          options={{
            headerTitle: "Select Services"
          }}
        />

        <Stack.Screen name="saloninfo"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen name="salonbarberservices"
        />

        <Stack.Screen name="saloninfogallery"
          options={{
            headerTitle: "Salon Gallery"
          }}
        />

        <Stack.Screen name="changelocation"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="locationsalonlist"
          options={{
            headerTitle: "Select Salon"
          }}
        />
        <Stack.Screen name="connectsalon"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen name="connectsalonbarberservices"
        />

        <Stack.Screen name="conectsalongallery"
          options={{
            headerTitle: "Salon Gallery"
          }}
        />

        <Stack.Screen name="help"
          options={{
            headerTitle: "Help"
          }}
        />
        <Stack.Screen name="profile"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen name="editprofile"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </Provider>
  )
}

export default _layout
