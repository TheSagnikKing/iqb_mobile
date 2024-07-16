import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../constants/Colors'
import { AntDesign, Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LocationSalonList = () => {

    const [salonName, setSalonName] = useState("")

    const [salonlist, setSalonlist] = useState([
        {
            _id: 1
        },
        {
            _id: 2
        },
        {
            _id: 3
        },
        {
            _id: 4
        },
        {
            _id: 5
        },
        {
            _id: 6
        },
        {
            _id: 7
        },
        {
            _id: 8
        },
        {
            _id: 9
        },
        {
            _id: 10
        },
    ])

    const router = useRouter()
    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 10, position: "relative" }}>
            <View style={styles.location_header}>
                <View><Feather name="search" size={22} color="black" /></View>
                <TextInput
                    secureTextEntry={true}
                    editable
                    placeholder='Filter by Salon Name'
                    style={{ outlineStyle: "none" }}
                    onChangeText={text => setSalonName(text)}
                    value={salonName}
                />
            </View>

            <FlatList
                data={salonlist}
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
                    <View>
                        <Text style={{ fontFamily: "montserrat-medium", fontSize: 14, marginBottom: 5 }}>IQB Dev</Text>
                        <Text style={{ fontFamily: "montserrat-medium", fontSize: 14 }}>67 Foxhall Street, NG318AN</Text>
                    </View>
                </View>}
                keyExtractor={item => item._id}
            />

            <Pressable
                style={{
                    position: "absolute",
                    bottom: 15,
                    right: 15,
                    height: 50,
                    width: 50,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.4,
                    shadowRadius: 12,
                    elevation: 12,
                }}
                onPress={() => router.push("/connectsalon")}
            ><FontAwesome6 name="add" size={24} color="#fff" /></Pressable>
        </View>
    )
}

export default LocationSalonList

const styles = StyleSheet.create({
    location_header: {
        height: 40,
        marginBottom: 25,
        paddingHorizontal: 10,
        borderBottomColor: Colors.PRIMARY,
        borderBottomWidth: 2,
        fontFamily: "montserrat-medium",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        fontSize: 14
    }
})