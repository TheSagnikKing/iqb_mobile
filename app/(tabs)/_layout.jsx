import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'
import { Text, View } from 'react-native';

const TabItem = ({icon, title, focused}) => {
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
                fontFamily: focused ? "montserrat-bold" : "montserrat-semibold",
                color: focused && Colors.PRIMARY
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
                    tabBarIcon: ({ color, focused }) => (
                        <TabItem
                            icon={<FontAwesome5 name="home" size={24} color={focused ? color : "#000"} />}
                            title={"Home"}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, focused }) => (
                        <TabItem
                            icon={<SimpleLineIcons name="settings" size={24} color={focused ? color : "#000"} />}
                            title={"Settings"}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="qlist"
                options={{
                    tabBarLabel: "Q List",
                    tabBarIcon: ({ color, focused }) => (
                        <TabItem
                            icon={<Ionicons name="people-sharp" size={24} color={focused ? color : "#000"} />}
                            title={"QList"}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="appointments"
                options={{
                    tabBarLabel: "Appointments",
                    tabBarIcon: ({ color, focused }) => (
                        <TabItem
                            icon={<AntDesign name="calendar" size={24} color={focused ? color : "#000"} />}
                            title={"Appointments"}
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}

export default TabLayout