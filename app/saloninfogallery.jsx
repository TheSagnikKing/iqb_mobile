import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getsalonimagelistAction } from '../redux/Actions/SalonAction'

const Saloninfogallery = () => {

    
    const params = useLocalSearchParams()

    console.log("Salon id from connect salon gallery ", params)

    const dispatch = useDispatch()

    useEffect(() => {
        if(params){
            dispatch(getsalonimagelistAction(params.SalonId, "GetSalonImageList.php"))
        }
    },[dispatch])

    const getsalonimagelist = useSelector(state => state.getsalonimagelist)

    const {
        loading,
        response
    } = getsalonimagelist

    console.log("Salon list from CONECT SALON GALLERY ", response)

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, marginBottom: 10 }}>Salon Gallery</Text>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", rowGap: 10 }}>
                <Image
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                    style={{
                        height: 120,
                        width: "30%",
                        marginRight: "2%"
                    }}
                />

                <Image
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                    style={{
                        height: 120,
                        width: "30%",
                        marginRight: "2%"
                    }}
                />

                <Image
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                    style={{
                        height: 120,
                        width: "30%",
                        marginRight: "2%"
                    }}
                />

                <Image
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                    style={{
                        height: 120,
                        width: "30%",
                        marginRight: "2%"
                    }}
                />

            </View>
        </View>
    )
}

export default Saloninfogallery

const styles = StyleSheet.create({})