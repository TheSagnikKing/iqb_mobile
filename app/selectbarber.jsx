import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from "../constants/Colors"
import { useRouter } from 'expo-router'

const SelectBarber = () => {

  const router = useRouter()

  const qlistdata = [
    {
      _id: 1,
    },
    {
      _id: 2,
    },
    {
      _id: 3
    },
    {
      _id: 4,
    },
    {
      _id: 5
    }
  ]
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{
        backgroundColor: "#fff",
        paddingHorizontal: 15
      }}>
        <Text
          style={{
            lineHeight: 60,
            textAlign: 'center',
            color: Colors.PRIMARY,
            fontFamily: "montserrat-semibold",
            fontSize: 16
          }}
        >2 Barbers Available</Text>

        <FlatList
          data={qlistdata}
          renderItem={({ item }) => <View style={{
            backgroundColor: "#efefef",
            height: 130,
            marginBottom: 20,
            borderRadius: 10,
            borderColor: "rgba(0,0,0,0.4)",
            borderWidth: 1,
          }}>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomColor: "rgba(0,0,0,0.4)",
                borderBottomWidth: 1
              }}
            >
              <View style={{ flex: 2, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", gap: 15, borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 1 }}>
                <View style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}><Image
                    source={require("../assets/images/profile.webp")}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      borderColor: "rgba(0,0,0,0.4)",
                      borderWidth: 1
                    }}
                  /></View>
                <Text style={{
                  fontFamily: "montserrat-semibold",
                  fontSize: 16
                }}>John</Text>
              </View>

              <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: "center", alignItems: "center" }}>
                <Text style={{
                  fontFamily: "montserrat-semibold",
                  fontSize: 16
                }}>Queuing</Text>
                <Text style={{
                  fontFamily: "montserrat-semibold",
                  fontSize: 16,
                  color: Colors.PRIMARY
                }}>5</Text>
              </View>
            </View>


            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <View>
                <Text style={{ marginBottom: 5, fontFamily: "montserrat-medium", fontSize: 16 }}>Estimated Time: <Text style={{ color: Colors.PRIMARY, fontFamily: "montserrat-semibold", fontSize: 16 }}> 00:00 </Text></Text>
                <Text style={{ fontFamily: "montserrat-medium", fontSize: 16 }}>Next Available Position: <Text style={{ color: Colors.PRIMARY, fontFamily: "montserrat-semibold", fontSize: 16 }}> 6 </Text></Text>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: Colors.PRIMARY,
                  width: 60,
                  height: 40,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                }}
                onPress={() => router.push({ pathname: "/selectservices", params: { _id: item._id } })}
              >
                <Text style={{
                  fontFamily: "montserrat-medium", fontSize: 14,
                  color: Colors.PRIMARYTEXT,
                }}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>}
          keyExtractor={item => item._id}
        />

      </ScrollView>
    </SafeAreaView>
  )
}

export default SelectBarber

const styles = StyleSheet.create({})