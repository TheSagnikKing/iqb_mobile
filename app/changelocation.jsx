import { Pressable, StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../constants/Colors'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChangeLocation = () => {

    const [countries] = useState([
        {
            _id: 1,
            name: "Kolkata West Bengal"
        },
        {
            _id: 2,
            name: "London Uk"
        },
        {
            _id: 3,
            name: "Kolin, Germany"
        },
        {
            _id: 4,
            name: "kolobergzeg, Poland"
        },
        {
            _id: 5,
            name: "Kolkata West Bengal"
        },
        {
            _id: 6,
            name: "London Uk"
        },
        {
            _id: 7,
            name: "Kolin, Germany"
        },
        {
            _id: 8,
            name: "kolobergzeg, Poland"
        },
        {
            _id: 9,
            name: "London Uk"
        },
        {
            _id: 10,
            name: "Kolin, Germany"
        },
        {
            _id: 11,
            name: "kolobergzeg, Poland"
        }
    ])

    const router = useRouter()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff"}}>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 10 }}>
                <Text
                    style={{
                        fontFamily: "montserrat-semibold",
                        fontSize: 16,
                        marginTop: 30,
                        textAlign: "center"
                    }}>Welcome</Text>
                <Text
                    style={{
                        fontFamily: "montserrat-medium",
                        fontSize: 16,
                        marginVertical: 15,
                        textAlign: "center"
                    }}
                >
                    Please search by location
                </Text>
                <Text
                    style={{
                        fontFamily: "montserrat-medium",
                        fontSize: 12,
                        textAlign: "center"
                    }}
                >
                    Type either the city or town
                </Text>

                <View style={styles.searchbox}>
                    <View><Feather name="search" size={24} color="black" /></View>
                    <Text
                        style={{
                            fontFamily: "montserrat-medium",
                            fontSize: 16,
                        }}
                    >Search</Text>
                </View>

                <FlatList
                    data={countries}
                    renderItem={({ item }) => <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                        padding: 10,
                        marginBottom: 10,
                        backgroundColor: "#efefef",
                        borderColor: "rgba(0,0,0,0.4)",
                        borderWidth: 2,
                        borderRadius: 5
                    }}>
                        <View><AntDesign name="rightcircleo" size={22} color="black" /></View>
                        <Text style={{ fontFamily: "montserrat-medium", fontSize: 14 }}>{item.name}</Text>
                    </View>}
                    keyExtractor={item => item._id}
                />
            </View>
            <Pressable style={styles.searchbtn} onPress={() => router.push("/locationsalonlist")}>
                <Text style={{
                    fontFamily: "montserrat-semibold",
                    fontSize: 16,
                    color: Colors.PRIMARYTEXT
                }}>Search</Text>
            </Pressable>
        </View>
        </SafeAreaView>
    )
}

export default ChangeLocation

const styles = StyleSheet.create({
    searchbox: {
        marginTop: 20,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        borderBottomColor: Colors.PRIMARY,
        borderBottomWidth: 2,
        // position: "relative"
        marginBottom: 20
    },
    // searchdropdown: {
    //     position: "absolute",
    //     top: 45,
    //     left: 0,
    //     right: 0,
    //     height: "auto",
    //     paddingBottom: 30
    // },
    searchbtn: {
        marginTop: 40,
        height: 50,
        backgroundColor: Colors.PRIMARY,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center"
    }
})