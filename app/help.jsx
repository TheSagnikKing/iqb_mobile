import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from "../constants/Colors"
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const help = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                        <View style={{
                            width: 50,
                            height: 50,
                            backgroundColor: Colors.PRIMARY,
                            borderRadius: "50%",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 10,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.4,
                            shadowRadius: 12
                        }}><Feather name="phone-call" size={24} color="#fff" /></View>
                        <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14 }}>01473845472</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 100
                    }}>
                        <View style={{
                            width: 50,
                            height: 50,
                            backgroundColor: Colors.PRIMARY,
                            borderRadius: "50%",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 10,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.4,
                            shadowRadius: 12
                        }}><MaterialIcons name="quick-contacts-mail" size={24} color="#fff" /></View>
                        <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14 }}>Get in Touch</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default help

const styles = StyleSheet.create({})