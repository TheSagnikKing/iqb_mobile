import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getsalonimagelistAction } from '../redux/Actions/SalonAction'

const Conectsalongallery = () => {

    const params = useLocalSearchParams()

    console.log("Salon id from connect salon gallery ", params)

    const dispatch = useDispatch()

    useEffect(() => {
        if (params) {
            dispatch(getsalonimagelistAction(params.SalonId, "GetSalonImageList.php"))
        }
    }, [dispatch])

    const getsalonimagelist = useSelector(state => state.getsalonimagelist)

    const {
        loading,
        response
    } = getsalonimagelist

    console.log("Salon list from CONECT SALON GALLERY ", response)

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16, marginBottom: 10 }}>Salon Gallery</Text>
            <View style={styles.container}>
                {
                    loading ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator size={28} color={"#000"} /></View> :
                        response.length === 0 ? (
                            <Text>No Images Available</Text>
                        ) : (
                            <FlatList
                                data={response}
                                renderItem={({ item }) => <Image
                                    key={item.ImageID}
                                    source={{ uri: item.ImagePath }}
                                    style={styles.image}
                                />}
                                keyExtractor={item => item.ImageID.toString()}
                                numColumns={3}
                                contentContainerStyle={styles.contentContainer}
                            />
                        )}
            </View>
        </View>
    )
}

export default Conectsalongallery

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 10,
    },
    contentContainer: {
        flexGrow: 1,
        gap: 10
    },
    image: {
        height: 120,
        flexBasis: '31.3%',
        marginRight: '2%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
    },
});