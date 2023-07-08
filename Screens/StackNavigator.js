import LoginPage from "./StackScreens/LoginPage/Create";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, TouchableOpacity } from "react-native";
import Intro from "./StackScreens/LoginPage/Intro";
import Create from "./StackScreens/LoginPage/Create";
import Login from "./StackScreens/LoginPage/Login";
const Stack = createNativeStackNavigator();

export default function StackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerMode: "screen",
        headerTitleAlign: "center",
        headerTintColor: "#000",
        headerStyle: {
          backgroundColor: "#5151C6",
        },
        headerTitle: () => (
          <Image
            source={require("../assets/images/OtoBilet.png")}
            style={{ width: 150, height: 50 }}
            resizeMode="contain"
          />
        ),

        headerShadowVisible: false,
      })}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animationTypeForReplace: "push",
          headerStyle: { backgroundColor: "#5151C6" },
          animation: "slide_from_right",
        }}
        name="Intro"
        component={Intro}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          presentation: "fullScreenModal",
          animationTypeForReplace: "push",
          headerStyle: { backgroundColor: "#5151C6" },
          animation: "slide_from_right",
        }}
        name="Create"
        component={Create}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          presentation: "fullScreenModal",
          animationTypeForReplace: "push",
          headerStyle: { backgroundColor: "#5151C6" },
          animation: "slide_from_right",
        }}
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  );
}
