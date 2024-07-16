import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from "../constants/Colors"
import { AntDesign, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ConnectSalon = () => {

    const router = useRouter()

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
            <ScrollView style={{
                backgroundColor: "#fff",
                paddingHorizontal: 15,
                flex: 1
            }}>
                <View style={styles.salon_header_container}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 30
                    }}>
                        <Pressable onPress={() => router.push("/locationsalonlist")}><AntDesign name="arrowleft" size={24} color="black" /></Pressable>
                        <Text style={{ fontFamily: "montserrat-medium", fontSize: 18 }}>Salon Info</Text>
                    </View>

                    <Pressable
                        onPress={() => router.push("/help")}
                    >
                        <FontAwesome6 name="question-circle" size={24} color="black" />
                    </Pressable>

                </View>
                <View style={{ height: 330 }}>
                    <View
                        style={{
                            backgroundColor: Colors.PRIMARY,
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            marginHorizontal: "auto",
                            marginTop: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.4,
                            shadowRadius: 12,
                        }}><FontAwesome name="photo" size={55} color="#fff" /></View>
                    <Text
                        style={{
                            fontFamily: "montserrat-semibold",
                            fontSize: 16,
                            textAlign: "center",
                            marginVertical: 20
                        }}
                    >Test Salon By John</Text>

                    <View style={{
                        borderColor: "rgba(0,0,0,0.4)",
                        borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: "#efefef",
                        marginTop: 20
                    }}>
                        <View
                            style={{
                                width: "60%",
                                borderColor: "rgba(0,0,0,0.4)",
                                borderWidth: 1,
                                borderRadius: 5,
                                backgroundColor: "#efefef",
                                marginHorizontal: "auto",
                                marginTop: -25,
                                height: 50,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        ><Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }}>Please Rate Us</Text></View>
                        <View style={{ height: 60, flexDirection: "row", marginHorizontal: "auto", alignItems: "center", gap: 10 }}>
                            <FontAwesome name="star" size={24} color="orangered" />
                            <FontAwesome name="star" size={24} color="orangered" />
                            <FontAwesome name="star" size={24} color="orangered" />
                            <FontAwesome name="star" size={24} color="orangered" />
                            <FontAwesome name="star" size={24} color="orangered" />
                        </View>

                        <Pressable
                            style={{
                                width: "30%",
                                borderRadius: 5,
                                backgroundColor: Colors.PRIMARY,
                                marginHorizontal: "auto",
                                marginBottom: -20,
                                height: 40,
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 2, shadowColor: '#000',
                                shadowOffset: { width: 0, height: 6 },
                                shadowOpacity: 0.4,
                                shadowRadius: 12, boxShadow: '0px 6px 12px rgba(0,0,0,0.4)'
                            }}
                            onPress={() => alert("Are you sure ?")}
                        ><Text style={{ fontFamily: "montserrat-medium", fontSize: 14, color: Colors.PRIMARYTEXT }}>Submit</Text>
                        </Pressable>
                    </View>


                </View>

                <View style={{ marginTop: 45 }}>
                    <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16 }}> Barbers</Text>
                    <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", gap: 10, flexWrap: 'wrap' }}>
                        <View style={{
                            backgroundColor: Colors.PRIMARY,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            borderRadius: 5,
                            width: 100,
                            height: 45,
                            paddingLeft: 5,
                            boxShadow: '0px 6px 12px rgba(0,0,0,0.4)'
                        }}>
                            <Image
                                source={require("../assets/images/profile.webp")}
                                style={{
                                    width: 35,
                                    height: 35,
                                    borderRadius: 50
                                }}
                            />
                            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14, color: Colors.PRIMARYTEXT }}>Arg</Text>
                        </View>
                        <View style={{
                            backgroundColor: Colors.PRIMARY,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            borderRadius: 5,
                            width: 100,
                            height: 45,
                            paddingLeft: 5, shadowColor: '#000',
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.4,
                            shadowRadius: 12, boxShadow: '0px 6px 12px rgba(0,0,0,0.4)'
                        }}>
                            <Image
                                source={require("../assets/images/profile.webp")}
                                style={{
                                    width: 35,
                                    height: 35,
                                    borderRadius: 50
                                }}
                            />
                            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14, color: Colors.PRIMARYTEXT }}>Arg</Text>
                        </View>

                    </View>

                    <View style={{
                        marginTop: 30,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        position: "relative",
                    }}>
                        <View style={[styles.saloninfo_status_item, { borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 2, width: "50%" }]}>
                            <View style={{
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
                            }}><FontAwesome name="photo" size={24} color="#fff" /></View>
                            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14 }}>Image Gallery</Text>
                        </View>
                        <View style={[styles.saloninfo_status_item, { borderBottomColor: "rgba(0,0,0,0.4)", borderBottomWidth: 2, width: "50%" }]}>
                            <View style={{
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
                            }}><FontAwesome6 name="location-dot" size={24} color="#fff" /></View>
                            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14, textAlign: "center", width: "85%" }}>United Kingdom</Text>
                        </View>
                        <View style={[styles.saloninfo_status_item, { borderTopColor: "rgba(0,0,0,0.4)", borderTopWidth: 2, width: "50%" }]}>
                            <View style={{
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
                            }}><Feather name="phone-call" size={24} color="#fff" /></View>
                            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14 }}>1234567890</Text>
                        </View>
                        <View style={[styles.saloninfo_status_item, { borderLeftColor: "rgba(0,0,0,0.4)", borderLeftWidth: 2, width: "50%" }]}>
                            <View style={{
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
                            }}><MaterialIcons name="chrome-reader-mode" size={24} color="#fff" /></View>
                            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 14 }}></Text>
                        </View>

                        <View style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: [{ translateX: -25 }, { translateY: -25 }],
                            backgroundColor: "#fff",
                            borderRadius: 25,
                            height: 50,
                            width: 50,
                        }}></View>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5
                        }}>
                            <Pressable style={{ backgroundColor: "#1DA1F2", flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40, gap: 10 }}>
                                <View><FontAwesome name="twitter" size={16} color="#fff" /></View>
                                <Text style={{ fontFamily: "montserrat-medium", fontSize: 12, color: Colors.PRIMARYTEXT }}>Twitter</Text>
                            </Pressable>

                            <Pressable style={{ backgroundColor: "#1877F2", flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40, gap: 10 }}>
                                <View><FontAwesome name="facebook-f" size={16} color="#fff" /></View>
                                <Text style={{ fontFamily: "montserrat-medium", fontSize: 12, color: Colors.PRIMARYTEXT }}>Facebook</Text>
                            </Pressable>

                            <Pressable style={{ backgroundColor: "#E1306C", flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40, gap: 10 }}>
                                <View><FontAwesome name="instagram" size={16} color="#fff" /></View>
                                <Text style={{ fontFamily: "montserrat-medium", fontSize: 12, color: Colors.PRIMARYTEXT }}>Instagram</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Pressable
                style={{
                    height: 50,
                    backgroundColor: Colors.PRIMARY,
                    justifyContent: "center",
                    alignItems: "center",
                    borderTopColor: "rgba(0,0,0,0.4)",
                    borderTopWidth: 1
                }}
                onPress={() => router.push("/signin")}>
                <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, color: Colors.PRIMARYTEXT }}>Connect</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default ConnectSalon

const styles = StyleSheet.create({
    saloninfo_status_item: {
        justifyContent: "center",
        alignItems: "center",
        height: 130
    },
    salon_header_container: {
        height: 50,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "rgba(0,0,0,0.2)",
        borderBottomWidth: 1
    },
})