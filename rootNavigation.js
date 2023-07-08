import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { SignInContext } from "./authContext";
import StackNavigator from "./Screens/StackNavigator";
import TabNavigator from "./Screens/TabNavigator";

export default function RootNavigator() {
  const { signedIn, dispatchSignedIn } = useContext(SignInContext);
  useEffect(() => {
    const retrieveUserToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (userToken === "signed-in") {
          dispatchSignedIn({
            type: "UPDATE_SIGN_IN",
            payload: { userToken: "signed-in" },
          });
        } else {
          dispatchSignedIn({
            type: "UPDATE_SIGN_IN",
            payload: { userToken: "signed-out" },
          });
        }
      } catch (error) {
        console.log("Error retrieving user token:", error);
      }
    };

    retrieveUserToken();
  }, [dispatchSignedIn]);

  return (
    <NavigationContainer>
      {signedIn.userToken === "signed-out" ? <StackNavigator /> : <TabNavigator />}
    </NavigationContainer>
  );
}
