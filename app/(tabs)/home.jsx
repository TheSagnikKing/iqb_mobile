import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../components/Header/Header'
import { Fontisto } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <Header />
      <ScrollView style={styles.home_container}>

        <View style={styles.queue_status_container}>
          <View style={[styles.queue_status_item, { borderRightColor: "rgba(0,0,0,0.4)", borderRightWidth: 2, height: 200 }]}>
            <View style={styles.queue_status_item_icon}>
              <Fontisto name="scissors" size={24} color="#fff" />
              <View style={styles.statusonline}></View>
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: 16, marginBottom: 5 }}>System Status</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: 16 }}>ON</Text>
            </View>
          </View>
          <View style={[styles.queue_status_item, { borderBottomColor: "rgba(0,0,0,0.4)", borderBottomWidth: 2, height: 200 }]}>
            <View style={styles.queue_status_item_icon}>
              <MaterialCommunityIcons name="human-queue" size={26} color="#fff" />
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: 16, marginBottom: 5 }}>Queuing</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: 16 }}>5</Text>
            </View>
          </View>

          <View style={[styles.queue_status_item, { borderTopColor: "rgba(0,0,0,0.4)", borderTopWidth: 2, height: 200 }]}>
            <View style={styles.queue_status_item_icon}>
              <FontAwesome6 name="person-circle-exclamation" size={24} color="#fff" />
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: 16, marginBottom: 5 }}>Barbers On Duty</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: 16 }}>N/A</Text>
            </View>
          </View>
          <View style={[styles.queue_status_item, { borderLeftColor: "rgba(0,0,0,0.4)", borderLeftWidth: 2, height: 200 }]}>
            <View style={styles.queue_status_item_icon}>
              <Ionicons name="person-add-sharp" size={24} color="#fff" />
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: 16, marginBottom: 5 }}>Next In Queue</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: 16 }}>1</Text>
            </View>
          </View>

          <View
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -25 }, { translateY: -25 }],
              backgroundColor: "#fff",
              borderRadius: 25,
              height: 50,
              width: 50,
            }}
          ></View>
        </View>

        <View style={{
          marginTop: 15,
          borderTopColor: "rgba(0,0,0,0.4)",
          borderTopWidth: 2
        }}></View>

        <View
          style={{
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 20
            }}
          >
            <View style={styles.queue_status_item_icon}>
              <MaterialCommunityIcons name="progress-clock" size={35} color="#fff" />
            </View>
            <View>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-bold", fontSize: 16, marginBottom: 5 }}>Estimated Wait Time</Text>
              <Text style={{ textAlign: "center", fontFamily: "montserrat-semibold", fontSize: 16 }}>N/A</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{
        position: "absolute",
        right: 15,
        bottom: 15
      }}>
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            backgroundColor: Colors.PRIMARY,
            borderRadius: "50%",
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ><MaterialIcons name="person-add-alt-1" size={24} color="#fff" /></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  home_container: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  queue_status_container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    height: 405,
    position: "relative",
  },
  queue_status_item: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  queue_status_item_icon: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: Colors.PRIMARY,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    position: "relative"
  },
  statusonline: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "limegreen",
    height: 17,
    width: 17,
    borderRadius: 8.5,
    borderColor: "#fff",
    borderWidth: 2
  }
})
