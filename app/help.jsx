import { StyleSheet, Text, View, ScrollView, Linking, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from "../constants/Colors"
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const help = () => {

    const makeCall = (number) => {
        const url = `tel:${number}`;
        Linking.openURL(url).catch((err) => console.error('Error:', err));
    }

    return (
        <ScrollView style={{
            backgroundColor: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 15
        }}>
            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14 }}>If you are finding any difficulties using this app please contact support using the following contact details</Text>

            <View style={{ marginTop: 20, flexDirection: "row" }}>
                <View style={{
                    flex: 1,
                    borderRightColor: "rgba(0,0,0,0.4)",
                    borderRightWidth: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100
                }}>
                    <Pressable style={{
                        width: 50,
                        height: 50,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.4,
                        shadowRadius: 12,
                        elevation: 12
                    }}
                    onPress={() => makeCall("01473845472")}
                    ><Feather name="phone-call" size={24} color="#fff" /></Pressable>
                    <Text style={{ fontFamily: "montserrat-semibold", fontSize: 12 }}>01473845472</Text>
                </View>

                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                }}>
                    <View style={{
                        width: 50,
                        height: 50,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 10,
                        boxShadow: "0px 6px 12px rgba(0,0,0,0.4)",
                    }}><MaterialIcons name="quick-contacts-mail" size={24} color="#fff" /></View>
                    {/* <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14 }}>Get in Touch</Text> */}
                    <View style={{
                        width: 160
                    }}><Text style={{ fontFamily: "montserrat-semibold", fontSize: 12}}>support@iqueuebarbers.com</Text></View>
                    
                </View>
            </View>
        </ScrollView>
    )
}

export default help

const styles = StyleSheet.create({})