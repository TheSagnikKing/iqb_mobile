import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'
import { Text, View } from 'react-native';

const TabItem = ({icon, title}) => {
    return (
        <View style={{
            flex:1,
            display:"flex",
            flexDirection: "column",
            gap: 5,
            justifyContent:"center",
            alignItems:"center"
            }}>
            <View>{icon}</View>
            <Text style={{
                fontSize: 11,
                fontFamily: "montserrat-semibold"
            }}>{title}</Text>
        </View>
    )
}

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    height: 60,
                    paddingHorizontal: 10,
                    display:"flex",
                    flexDirection:"row",
                    borderTopColor: "rgba(0,0,0,0.2)",
                    borderTopWidth: 1
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <TabItem
                            icon={<FontAwesome5 name="home" size={24} color={color} />}
                            title={"Home"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color }) => (
                        <TabItem
                            icon={<SimpleLineIcons name="settings" size={24} color={color} />}
                            title={"Settings"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="qlist"
                options={{
                    tabBarLabel: "Q List",
                    tabBarIcon: ({ color }) => (
                        <TabItem
                            icon={<Ionicons name="people-sharp" size={24} color={color} />}
                            title={"QList"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="appointments"
                options={{
                    tabBarLabel: "Appointments",
                    tabBarIcon: ({ color }) => (
                        <TabItem
                            icon={<AntDesign name="calendar" size={24} color={color} />}
                            title={"Appointments"}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}

export default TabLayout