import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Modal, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getsalonimagelistAction } from '../redux/Actions/SalonAction'
import { Entypo } from '@expo/vector-icons'

const Conectsalongallery = () => {

    const params = useLocalSearchParams()

    // console.log("Salon id from connect salon gallery ", params)

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

    // console.log("Salon list from CONECT SALON GALLERY ", response)
    const [imageurl, setImageurl] = useState("")

    const [openImage, setOpenImage] = useState(false)

    const imagePressed = (url) => {
        setOpenImage(true)
        setImageurl(url)

    }

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
                                renderItem={({ item }) => <Pressable
                                    style={styles.image}
                                    onPress={() => imagePressed(item.ImagePath)}
                                >
                                    <Image
                                        source={{ uri: item.ImagePath }}
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: 5
                                        }}
                                    />
                                </Pressable>}
                                keyExtractor={item => item.ImageID.toString()}
                                numColumns={3}
                                contentContainerStyle={styles.contentContainer}
                            />
                        )}

                {
                    openImage && <Modal>
                        <View style={{
                            flex: 1,
                            padding: 20
                        }}>
                            <Pressable
                                style={{
                                    backgroundColor: "red",
                                    paddingHorizontal: 10,
                                    paddingVertical: 8,
                                    borderRadius: 10,
                                    width: 200,
                                    width: 45,
                                    height: 45,
                                    borderRadius: 50,
                                    marginLeft: "auto",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                                onPress={() => setOpenImage((prev) => !prev)}><Entypo name="cross" size={24} color="#fff" /></Pressable>
                            <View style={{
                                width: "100%",
                                height: 600,
                                borderWidth: 1,
                                borderColor: "#000",
                                marginTop: 20,
                                borderRadius: 10,
                            }}>
                                <Image
                                    source={{ uri: imageurl }}
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: 10
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                }
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