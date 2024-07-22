import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

const Appinfo = () => {

    const appinfodata = [
        {
            _id:1,
            title: "Register",
            content: "Register form allows you to create an account so you can remotely join the queue to place a position at your local barber shop, once registered you will be sent an activation code which you will need it to activate your account"
        },
        {
            _id:2,
            title: "Forgot Password",
            content: "When you have forgotten your password, just provide your email address and we will send your password, this information will then be sent back to the email address that you have provided"
        },
        {
            _id:3,
            title: "Join Queue",
            content: "This screen displays the total number of people queuing, estimated waiting time, total number of barbers on duty and also the next available position! If you join the queue on this screen using the 'Auto Join' option, you will then be automatically assigned to 'Any Barber' that means you don't have any barber preferences or you can select your favourite barber.This screen updates every second so you get instant updates on your position. Once there are any changes on your position you will get a notification with your new position. &#x0a;Note: Always arrive 15 mins before your turn to avoid losing your place in the queue!!!"
        },
        {
            _id:4,
            title: "Queuing List",
            content: "This screen allows you to view the full queuing list and you can also view where you are in the list when you have joined the queue. If you have either joined the queue by yourself or joined the queue within a group, your names will then be highlighted."
        },
        {
            _id:5,
            title: "Cancel Position",
            content: "If for any reason you know that you will not make for your appointment, you can cancel your turn, but if you do, you WILL NOT be able to re-join the queue on the same day!"
        },
        {
            _id:6,
            title: "Select Barber",
            content: "On this screen you can see how many people are queuing for each barber, and you can also choose the barber you prefer to have your appointment with. Once you join the queue through this screen you still get instant notifications on your position!"
        },
        {
            _id:7,
            title: "My Profile",
            content: "You can edit your account information as well as adding new fields to your account e.g. profile picture, mobile number and date of birth."
        },
        {
            _id:8,
            title: "Settings",
            content: "This screen allows you to view app information, delete your account, and reset App back to default."
        }
    ]

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <FlatList
        data={appinfodata}
        renderItem={({item}) => <View style={{
            backgroundColor: "#efefef",
            borderColor: "rgba(0,0,0,0.4)",
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
          }}>
            <Text style={{ fontFamily:"montserrat-semibold", fontSize:16, color: Colors.PRIMARY, marginBottom: 10}}>{item.title}</Text>
    
            <Text style={{ fontFamily: "montserrat-medium", fontSize:16,}}>{item.content}</Text>
          </View>}
        keyExtractor={item => item._id}
      />
      
    </View>
  )
}

export default Appinfo

const styles = StyleSheet.create({})