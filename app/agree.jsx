import { Pressable, StyleSheet, Switch, Text, View, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/Colors'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { signupAction } from '../redux/Actions/AuthAction'
import Toast from 'react-native-toast-message'
import { FontAwesome } from '@expo/vector-icons'

const agree = () => {

  const signupdata = useLocalSearchParams();

  const router = useRouter()

  const dispatch = useDispatch()

  const signup = useSelector(state => state.signup)

  const [agree, setAgree] = useState(false)

  const { loading } = signup

  const agreePressed = () => {
    dispatch(signupAction(signupdata, "iqueueregister.php", router))
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Toast />
      <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10 }}>

        <View style={{
          height: 60,
          width: 60,
          backgroundColor: Colors.PRIMARY,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 12,
          marginHorizontal: "auto",
          borderRadius: 50,
          marginBottom: 10
        }}><FontAwesome name="edit" size={30} color={Colors.PRIMARYTEXT} /></View>
        <Text style={{ fontFamily: "montserrat-semibold", fontSize: 18, marginBottom: 25, textAlign: "center" }}>Terms and Conditions</Text>

        <View>
          <Text style={{ fontFamily: "montserrat-medium", fontSize: 14, }}>I want to use the iQueueBarbers's app/website, which enables me to obtain access to my designated IQB, iQueueBarbers Limited company number 09336143 establishes direct contact between partners and customers and allow consumers to book barbering appointments thus I agree to have my data published on the iQueueBarbers's app/website to only be shared with my designated IQB. I agree to the terms and conditions of service provision through the iQueueBarbers's app/website as set out in the Terms and Conditions.&#x0a;&#x0a;I know that I may at any time withdraw my consent to the processing of my personal data, which does not affect the lawfulness of the processing that took place prior to that withdrawal.
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingHorizontal: 10, gap: 15, paddingVertical: 20 }}>
          {/* <Pressable
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
            <Text style={{ fontFamily: "montserrat-medium", fontSize: 15, color: Colors.PRIMARYTEXT }}>i agree</Text>
          </Pressable> */}

          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={agree ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setAgree(prev => !prev)}
            value={agree}
          />

          <Text style={{ fontFamily: "montserrat-semibold", fontSize: 15, color: Colors.PRIMARY }}>i agree</Text>
        </View>

      </View>

      {
        agree && <Pressable
          style={{
            height: 50,
            backgroundColor: Colors.PRIMARY,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={agreePressed}>
          <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARYTEXT }}>Ok</Text>
        </Pressable>
      }

    </SafeAreaView>
  )
}

export default agree

const styles = StyleSheet.create({})