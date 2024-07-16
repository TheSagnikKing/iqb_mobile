import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { Feather } from '@expo/vector-icons';

const ChangeLocation = () => {
    return (
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

            <Pressable style={styles.searchbtn} onPress={() => alert("Search")}>
                <Text style={{
                    fontFamily: "montserrat-semibold",
                    fontSize: 16,
                    color: Colors.PRIMARYTEXT
                }}>Search</Text>
            </Pressable>
        </View>
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
        borderBottomWidth: 2
    },
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