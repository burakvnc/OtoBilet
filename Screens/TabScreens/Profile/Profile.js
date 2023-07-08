import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SignInContext } from "../../../authContext";
import styles from "../../../Styles/styles";
export default function Profile() {
  const { dispatchSignedIn } = useContext(SignInContext);
  const handleLogout = () => {
    dispatchSignedIn({
      type: "UPDATE_SIGN_IN",
      payload: { userToken: "signed-out" },
    });

    // Store the user token in AsyncStorage
    AsyncStorage.setItem("userToken", "signed-out")
      .then(() => {
        console.log("Çıkış Başarılı.");
      })
      .catch((error) => {
        console.log("Token Kaydedilirken:", error, "Hatası");
      });
  };

  return (
    <View style={styles.container}>
      <Text>Burada isterseniz bilet geçmişini de listeletebilirim.</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}
