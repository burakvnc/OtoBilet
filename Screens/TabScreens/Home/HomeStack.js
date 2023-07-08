import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, TouchableOpacity } from "react-native";
import Home from "./Home";
import Nereden from "./Nereden";
import Nereye from "./Nereye";
import OtobusSec from "./OtobusSec";

const Stack = createNativeStackNavigator();

export default function HomeStack({ navigation }) {
  const CustomGoBackIcon = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("../../../assets/images/close.png")}
        style={{ width: 16, height: 16, marginRight: 10, tintColor: "#fff" }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerMode: "screen",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#5151C6",
        },
        headerShadowVisible: false,
      })}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animationTypeForReplace: "push",
          headerStyle: { backgroundColor: "#F5F6FE" },
          animation: "slide_from_bottom",
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animationTypeForReplace: "push",
          headerStyle: { backgroundColor: "#F5F6FE" },
          animation: "slide_from_right",
        }}
        name="OtobusSec"
        component={OtobusSec}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Bileti Alacağınız Şehri Seçin",
          presentation: "fullScreenModal",
          animationTypeForReplace: "push",
          headerStyle: { backgroundColor: "#5151C6" },
          animation: "slide_from_bottom",
          headerLeft: () => <CustomGoBackIcon navigation={navigation} />,
        }}
        name="Nereden"
        component={Nereden}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Gitmek İstediğiniz Şehri Seçin",
          presentation: "fullScreenModal",
          animationTypeForReplace: "push",
          headerStyle: { backgroundColor: "#5151C6" },
          animation: "slide_from_bottom",
          headerLeft: () => <CustomGoBackIcon navigation={navigation} />,
        }}
        name="Nereye"
        component={Nereye}
      />
    </Stack.Navigator>
  );
}
