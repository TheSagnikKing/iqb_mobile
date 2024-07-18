import { Pressable, StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/Colors'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { signupAction } from '../redux/Actions/AuthAction'
import Toast from 'react-native-toast-message'

const agree = () => {

  const signupdata = useLocalSearchParams();

  const router = useRouter()

  const dispatch = useDispatch()

  const signup = useSelector(state => state.signup)

  const { loading } = signup

  const agreePressed = () => {
    dispatch(signupAction(signupdata, "iqueueregister.php", router))
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Toast />
      <View style={{ flex: 1, padding: 10, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }}>Agree Document</Text>
        <Pressable
          onPress={agreePressed}
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
            marginVertical: 20,
          }}
        >
          {
            loading ?
              <ActivityIndicator size={20} color={"#fff"} /> :
              <Text style={{ fontFamily: "montserrat-medium", fontSize: 15, color: Colors.PRIMARYTEXT }}>i agree</Text>
          }
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default agree

const styles = StyleSheet.create({})