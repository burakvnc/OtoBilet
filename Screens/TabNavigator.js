import { SafeAreaView, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./TabScreens/Home/Home";
import Profile from "./TabScreens/Profile/Profile";
import HomeStack from "./TabScreens/Home/HomeStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#181818" }}>
      <Tab.Navigator
        screenOptions={() => ({
          headerTitle: () => (
            <Image
              source={require("../assets/images/OtoBilet.png")}
              style={{ width: 150, height: 50 }}
              resizeMode="contain"
            />
          ),
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#181818",
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#5151C6", height: 75 },
          tabBarLabelStyle: { fontSize: 14 },
          tabBarActiveBackgroundColor: "#F5F6FE",
          tabBarStyle: {
            height: 45,
            paddingHorizontal: 0,
            paddingTop: 0,
            backgroundColor: "#F5F6FE",
            position: "absolute",
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: true,
            title: "Bilet Ara",
            tabBarIcon: () => (
              <Image
                source={require("../assets/images/ticket.png")}
                style={{ width: 26, height: 26 }}
              />
            ),
            tabBarLabel: "Bilet Ara",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
            title: "Bilet Geçmişi",
            tabBarIcon: () => (
              <Image
                source={require("../assets/images/history.png")}
                style={{ width: 26, height: 26 }}
              />
            ),
            tabBarLabel: "Bilet Geçmişi",
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
