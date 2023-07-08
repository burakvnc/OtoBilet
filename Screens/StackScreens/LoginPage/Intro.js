import React from "react";
import { View, Text, TouchableOpacity,Image } from "react-native";
import styles from "../../../Styles/styles";
export default function Intro({ navigation }) {
  return (
    <View style={styles.IntroPage}>
      <Image
        source={require("../../../assets/images/OtoBilet.png")}
        style={{ width: "60%", height: 200, resizeMode: "contain" }}
      />
      <TouchableOpacity
        style={styles.IntroButton}
        onPress={() => navigation.navigate("Create")}
      >
        <Text style={styles.buttonText2}>Kayıt Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.IntroButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText2}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}
