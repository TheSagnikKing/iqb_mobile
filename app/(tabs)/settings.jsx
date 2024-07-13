import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header/Header'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Feather } from '@expo/vector-icons';

const settingsMenu = [
  {
    _id: 1,
    title: "App info",
    icon: <MaterialIcons name="mobile-friendly" size={24} color="#fff" />
  },
  {
    _id: 2,
    title: "Delete Account",
    icon: <MaterialCommunityIcons name="delete-sweep" size={24} color="#fff" />
  },
  {
    _id: 3,
    title: "Change Location",
    icon: <MaterialIcons name="share-location" size={24} color="#fff" />
  },
  {
    _id: 4,
    title: "Salon Info",
    icon: <MaterialCommunityIcons name="hair-dryer" size={24} color="#fff" />
  }
]

const Settings = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView style={styles.settings_container}>    
        <FlatList
          data={settingsMenu}
          renderItem={({ item }) => <View style={styles.settings_item}>
          <View style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 20
          }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: "50%",
                backgroundColor: Colors.PRIMARY,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
              }}
            >{item.icon}</View>
            <Text style={{ fontFamily: "montserrat-semibold", fontSize: 16 }}>{item.title}</Text>
          </View>

          <TouchableOpacity><Feather name="arrow-right-circle" size={26} color="black" /></TouchableOpacity>
        </View>}
          keyExtractor={item => item._id}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
  settings_container: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
    paddingVertical: 20,
  },

  settings_item: {
    height: 88,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 2,
    paddingHorizontal: 15
  }
})