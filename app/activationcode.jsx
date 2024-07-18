import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors'
import { useLocalSearchParams, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { activatedAccountAction, activatedResendEmailAction } from '../redux/Actions/AuthAction';

const Activationcode = () => {

  const params = useLocalSearchParams();

  const router = useRouter()

  console.log("Activation Page ", params)

  const dispatch = useDispatch()

  const [activationcode, setActivationCode] = useState("")

  const activationcodePressed = () => {
    if (params.ActivationCode == activationcode) {
      dispatch(activatedAccountAction(params,"iqueuedirectquery2.php", router))
    } else {
      Toast.show({
        type: 'error',
        text1: "activation code donot match",
        position: "bottom",
        bottomOffset: 0,
      });
    }
  }

  const activatedAccount = useSelector(state => state.activatedAccount)

  const { loading } = activatedAccount

  const resendEmail = () => {

    const resenddata = {
      firstname: params.FirstName,
      lastname: params.LastName,
      password: params.Password,
      email: params.Email,
      activationcode: params.ActivationCode,
      salonid: params.SalonId,
      username: params.UserName,
    }

    dispatch(activatedResendEmailAction(resenddata, "iqueuesendemail.php"))

  }

  const activatedResendEmail = useSelector(state => state.activatedResendEmail)

  const { loading: activatedResendEmailLoading } = activatedResendEmail

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", padding: 15 }}>
      <Toast />
      <View>
        <Text style={{
          fontFamily: "montserrat-semibold",
          textAlign: "center",
          fontSize: 16,
          marginBottom: 10
        }}>Account Activation</Text>
        <Text style={{
          fontFamily: "montserrat-medium",
          textAlign: "start",
          fontSize: 14,
          marginBottom: 20
        }}> Your account is not activated yet. Please insert the activation code sent to your email.</Text>
        <TextInput
          editable
          placeholder='Activation Code'
          style={styles.input}
          onChangeText={text => setActivationCode(text)}
          value={activationcode}
        />
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
          onPress={() => activationcodePressed()}
        >
          {
            loading ?
              <ActivityIndicator size={20} color={"#fff"} /> :
              <Text style={{
                color: Colors.PRIMARYTEXT,
                fontSize: 16,
                fontFamily: "montserrat-medium"
              }}>Activate Account</Text>
          }

        </Pressable>

        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}>
          <Pressable onPress={() => router.push("/signin")}><Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARY }}>Cancel</Text></Pressable>
          <Pressable onPress={resendEmail}>
            {
              activatedResendEmailLoading ?
                <ActivityIndicator size={18} color={"#000"} /> :
                <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARY }}>Resend</Text>
            }

          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Activationcode

const styles = StyleSheet.create({

  input: {
    height: 40,
    marginBottom: 20,
    borderBottomColor: Colors.PRIMARY,
    borderBottomWidth: 2,
    outlineStyle: "none",
    fontFamily: "montserrat-medium",
  },
})