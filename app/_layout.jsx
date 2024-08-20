// import React, { useEffect, useState } from 'react'
// import { Stack } from 'expo-router'
// import { useFonts } from 'expo-font'
// import * as SplashScreen from 'expo-splash-screen';
// import { Provider } from 'react-redux'
// import store from '../redux/store'


// import { BackHandler, ToastAndroid } from 'react-native';

// SplashScreen.preventAutoHideAsync();

// const _layout = () => {

//   const [loaded, error] = useFonts({
//     'montserrat': require('./../assets/fonts/Montserrat-Regular.ttf'),
//     'montserrat-medium': require('./../assets/fonts/Montserrat-Medium.ttf'),
//     'montserrat-semibold': require('./../assets/fonts/Montserrat-SemiBold.ttf'),
//     'montserrat-bold': require('./../assets/fonts/Montserrat-Bold.ttf')
//   });

//   useEffect(() => {
//     if (loaded || error) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded, error]);

//   if (!loaded && !error) {
//     return null;
//   }


//   const [backPressCount, setBackPressCount] = useState(0);

//   const handleBackPress = () => {
//     if (backPressCount === 0) {
//       setBackPressCount(prevCount => prevCount + 1);
//       ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
//       setTimeout(() => setBackPressCount(0), 2000); // Reset count after 2 seconds
//     } else if (backPressCount === 1) {
//       BackHandler.exitApp();
//     }
//     return true;
//   };

//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
//     return () => backHandler.remove();

//   }, []);


//   return (
//     <Provider store={store}>
//       <Stack>
//         <Stack.Screen name="index"
//           options={{
//             headerShown: false
//           }}
//         />
//         <Stack.Screen name="signin"
//           options={{
//             headerShown: false,
//           }}
//         />
//         <Stack.Screen name="signup"
//           options={{
//             headerShown: false
//           }}
//         />

//         <Stack.Screen name="forgot" />

//         <Stack.Screen name="agree"
//           options={{
//             headerShown: false
//           }}
//         />

//         <Stack.Screen name="activationcode"
//           options={{
//             headerShown: false
//           }}
//         />
//         <Stack.Screen name="(tabs)"
//           options={{
//             headerShown: false
//           }}
//         />

//         <Stack.Screen name="selectbarber"
//           options={{
//             headerTitle: "Barber List"
//           }}
//         />

//         <Stack.Screen name="selectservices"
//           options={{
//             headerTitle: "Select Service"
//           }}
//         />

//         <Stack.Screen name="autojoin"
//           options={{
//             headerTitle: "Auto Join"
//           }}
//         />

//         <Stack.Screen name="joingroup"
//           options={{
//             headerShown: false
//           }}
//         />

//         <Stack.Screen name="joingroupbarbers"
//           options={{
//             headerTitle: "Select Baber"
//           }}
//         />

//         <Stack.Screen name="joingroupservices"
//           options={{
//             headerTitle: "Select Services"
//           }}
//         />

//         <Stack.Screen name="saloninfo"
//           options={{
//             headerShown: false
//           }}
//         />

//         <Stack.Screen name="salonbarberservices"
//           options={{
//             headerTitle: ""
//           }}
//         />

//         <Stack.Screen name="saloninfogallery"
//           options={{
//             headerTitle: "Salon Gallery"
//           }}
//         />

//         <Stack.Screen name="changelocation"
//           options={{
//             headerShown: false
//           }}
//         />
//         <Stack.Screen name="locationsalonlist"
//           options={{
//             headerTitle: "Select Salon"
//           }}
//         />
//         <Stack.Screen name="connectsalon"
//           options={{
//             headerShown: false
//           }}
//         />

//         <Stack.Screen name="connectsalonbarberservices"
//           options={{
//             headerTitle: ""
//           }}
//         />

//         <Stack.Screen name="conectsalongallery"
//           options={{
//             headerTitle: "Salon Gallery"
//           }}
//         />

//         <Stack.Screen name="help"
//           options={{
//             headerTitle: "Help"
//           }}
//         />
//         <Stack.Screen name="profile"
//           options={{
//             headerShown: false
//           }}
//         />

//         <Stack.Screen name="editprofile"
//           options={{
//             headerShown: false
//           }}
//         />

//       </Stack>
//     </Provider>
//   )
// }

// export default _layout


import React, { useEffect, useState, useCallback } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import store from '../redux/store';

import { BackHandler, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const _layout = () => {
  const [loaded] = useFonts({
    'montserrat': require('./../assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-medium': require('./../assets/fonts/Montserrat-Medium.ttf'),
    'montserrat-semibold': require('./../assets/fonts/Montserrat-SemiBold.ttf'),
    'montserrat-bold': require('./../assets/fonts/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  // const navigation = useNavigation();
  // const [backPressCount, setBackPressCount] = useState(0);
  // const [timerId, setTimerId] = useState(null);

  // const handleBackPress = useCallback(() => {
  //   if (backPressCount === 0) {
  //     if (navigation.canGoBack()) {
  //       setBackPressCount(1);
  //       navigation.goBack();
  //       const timer = setTimeout(() => setBackPressCount(0), 1000);
  //       setTimerId(timer);
  //     } else {
  //       ToastAndroid.show('No screen to go back to', ToastAndroid.SHORT);
  //     }
  //     const timer = setTimeout(() => setBackPressCount(0), 2000);
  //     setTimerId(timer);
  //     return true;
  //   } else if (backPressCount === 1) {
  //     ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
  //     setBackPressCount(2);
  //     const timer = setTimeout(() => setBackPressCount(0), 2000);
  //     setTimerId(timer);
  //     return true;
  //   } else if (backPressCount === 2) {
  //     BackHandler.exitApp();
  //   }
  //   return true;
  // }, [backPressCount, navigation]);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  //   return () => {
  //     backHandler.remove();
  //     if (timerId) clearTimeout(timerId); // Clear the timer on component unmount
  //   };
  // }, [handleBackPress, timerId]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signin"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="forgot" />
        <Stack.Screen
          name="agree"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="activationcode"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="selectbarber"
          options={{
            headerTitle: 'Barber List',
          }}
        />
        <Stack.Screen
          name="selectservices"
          options={{
            headerTitle: 'Select Service',
          }}
        />
        <Stack.Screen
          name="autojoin"
          options={{
            headerTitle: 'Auto Join',
          }}
        />
        <Stack.Screen
          name="joingroup"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="joingroupbarbers"
          options={{
            headerTitle: 'Select Barber',
          }}
        />
        <Stack.Screen
          name="joingroupservices"
          options={{
            headerTitle: 'Select Services',
          }}
        />
        <Stack.Screen
          name="saloninfo"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="salonbarberservices"
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="saloninfogallery"
          options={{
            headerTitle: 'Salon Gallery',
          }}
        />
        <Stack.Screen
          name="changelocation"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="locationsalonlist"
          options={{
            headerTitle: 'Select Salon',
          }}
        />
        <Stack.Screen
          name="connectsalon"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="connectsalonbarberservices"
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="conectsalongallery"
          options={{
            headerTitle: 'Salon Gallery',
          }}
        />
        <Stack.Screen
          name="help"
          options={{
            headerTitle: 'Help',
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="editprofile"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
};

export default _layout;

