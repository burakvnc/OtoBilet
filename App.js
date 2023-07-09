import { StatusBar } from "expo-status-bar";
import RootNavigator from "./rootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CityProvider } from "./Screens/TabScreens/Home/CityContext";
import { SignInContextProvider } from "./authContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <SignInContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CityProvider>
          <StatusBar hidden />
          <RootNavigator />
        </CityProvider>
      </GestureHandlerRootView>
    </SignInContextProvider>
  );
}
