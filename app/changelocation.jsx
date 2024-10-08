import { Pressable, StyleSheet, Text, View, ScrollView, FlatList, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useRef, useCallback } from 'react'
import { Colors } from '../constants/Colors'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { placesApiAction } from '../redux/Actions/LocationAction';
import Toast from 'react-native-toast-message';


import { BackHandler, ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const ChangeLocation = () => {

    const handleBackPress = useCallback(() => {
        BackHandler.exitApp(); // Exit the app on a single back press
        return true;
      }, []);
      
      useFocusEffect(
        useCallback(() => {
          const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      
          return () => {
            backHandler.remove();
          };
        }, [handleBackPress])
      );
      
    
    const router = useRouter()

    // const [search, setSearch] = useState("")

    // const dispatch = useDispatch()

    // const searchPlaceApiPressed = () => {
    //     if (search.length < 2) {
    //         alert("Atleast 2 charecters needed for search")
    //     } else {
    //         dispatch(placesApiAction(search))
    //     }
    // }

    const [search, setSearch] = useState("")
    const [countryTimeout, setCountryTimeout] = useState(null);


    const dispatch = useDispatch()

    const debounceSearch = (value) => {
        if (countryTimeout) {
            clearTimeout(countryTimeout);
        }
        setSearch(value)

        setCountryTimeout(setTimeout(() => {
            dispatch(placesApiAction(value,setSelectedSearch))
        }, 500));
    };

    const searchCountryHandler = (text) => {
        const searchTerm = text;
        debounceSearch(searchTerm);
    }

    const placesApi = useSelector(state => state.placesApi)

    const [selectedsearch, setSelectedSearch] = useState("")

    const {
        error,
        loading,
        response: locationsdata
    } = placesApi

    const citySetdata = (search) => {
        setSearch(search.split(",")[0])
        setSelectedSearch(search)
    }

    const searchSalonPressed = () => {
        if (search.length < 2) {
            alert("Atleast 2 charecters needed for search")
        } else {
            router.push({ pathname: "/locationsalonlist", params: { city: search } })
            setSelectedSearch("")
            dispatch({
                type: "RESET_PLACE"
            })
        }
    }

    console.log("Error ", error)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Toast />
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

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <TextInput
                            editable
                            placeholder='Search'
                            style={styles.input}
                            onChangeText={text => searchCountryHandler(text)}
                            value={search}
                        />
                        <Pressable
                            style={{
                                backgroundColor: Colors.PRIMARY,
                                height: 35,
                                width: 35,
                                marginBottom: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 6 },
                                shadowOpacity: 0.4,
                                shadowRadius: 12,
                                elevation: 5,
                            }}
                        >
                            <Feather name="search" size={18} color="#fff" />
                        </Pressable>
                    </View>

                    {
                        loading ?
                            <View style={{ paddingTop: 20 }}><ActivityIndicator size={24} color={"#000"} /></View> :
                            error ? <View style={{ paddingTop: 20 }}><Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, textAlign: "center" }}>Oops no location found !</Text></View> :
                                locationsdata.length == 0 ?
                                    <View style={{ paddingTop: 20 }}><Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, textAlign: "center" }}>Please search by location !</Text></View> :
                                    <FlatList
                                        data={locationsdata}
                                        renderItem={({ item }) => <Pressable style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 20,
                                            paddingVertical: 10,
                                            paddingHorizontal: 20,
                                            marginBottom: 10,
                                            backgroundColor: item.description == selectedsearch ? Colors.PRIMARY : "#efefef",
                                            borderColor: "rgba(0,0,0,0.4)",
                                            borderWidth: 2,
                                            borderRadius: 5
                                        }}
                                            onPress={() => citySetdata(item.description)}
                                        >
                                            <View><AntDesign name="rightcircleo" size={22} color={item.description == selectedsearch ? "#fff" : "#000"} /></View>
                                            <Text style={{ fontFamily: "montserrat-medium", fontSize: 14, color: item.description == selectedsearch ? "#fff" : "#000" }}>{item.description}</Text>
                                        </Pressable>}
                                        keyExtractor={item => item.place_id}
                                        showsVerticalScrollIndicator={false}
                                    />
                    }

                </View>
                <Pressable style={styles.searchbtn} onPress={searchSalonPressed}>
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
        gap: 35,
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
    },
    input: {
        flex: 1,
        height: 40,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderBottomColor: Colors.PRIMARY,
        borderBottomWidth: 2,
        outlineStyle: "none",
        fontFamily: "montserrat-medium",
    },
})