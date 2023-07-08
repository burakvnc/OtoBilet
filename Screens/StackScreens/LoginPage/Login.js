import { Text, TouchableOpacity, View, TextInput, Image } from "react-native";
import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SignInContext } from "../../../authContext";
import ModalSelector from "react-native-modal-selector";
import styles from "../../../Styles/styles";
import { ScrollView } from "react-native-gesture-handler";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../config";
export default function Login({ navigation }) {
  const { dispatchSignedIn } = useContext(SignInContext);
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setbirthDate] = useState("");
  const [password, setpassword] = useState("");
  const [passwordrepeat, setpasswordrepeat] = useState("");

  const [kimlikno, setkimlikno] = useState("");
  const [email, setemail] = useState("");
  const [genders, setGenders] = useState([
    { id: 1, name: "Erkek" },
    { id: 2, name: "Kadın" },
  ]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully logged in
        const user = userCredential.user;
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: "signed-in" },
        });

        // Store the user token in AsyncStorage
        AsyncStorage.setItem("userToken", "signed-in")
          .then(() => {
            console.log("Giriş Başarılı");
          })
          .catch((error) => {
            console.log("Token Kaydedilirken:", error, "Hatası");
          });
        console.log("Login successful:", user);
      })
      .catch((error) => {
        // An error occurred during login
        console.log("Login error:", error);
      });
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View style={styles.LoginPage}>
      <View
        style={{
          height: "50%",
          width: "90%",
          marginTop: "10%",
        }}
      >
        <View style={styles.fieldContainer}>
          <Text style={styles.TextStyle}>Mail Adresiniz</Text>
          <TextInput
            placeholder="Mail Adresiniz"
            value={email}
            placeholderTextColor="#00000064"
            editable={true}
            keyboardType="default"
            maxLength={20}
            style={[
              styles.input,
              {
                borderColor:
                  email.length === 0
                    ? "#00000064"
                    : validateEmail(email)
                    ? "#3a5a40"
                    : "red",
              },
            ]}
            onChangeText={(value) => setemail(value)}
          />
          {email.length > 0 && !validateEmail(email) && (
            <Image
              source={require("../../../assets/images/close.png")}
              style={{
                width: 16,
                height: 16,
                alignSelf: "flex-end",
                position: "absolute",
                top: 40,
                right: 10,
              }}
            />
          )}
          {email.length > 0 && validateEmail(email) && (
            <Image
              source={require("../../../assets/images/check-mark.png")}
              style={{
                width: 16,
                height: 16,
                alignSelf: "flex-end",
                position: "absolute",
                top: 40,
                right: 10,
              }}
            />
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.TextStyle}>Şifreniz</Text>
          <TextInput
            placeholder="Şifreniz"
            value={password}
            placeholderTextColor="#00000064"
            editable={true}
            secureTextEntry={true}
            maxLength={20}
            style={[
              styles.input,
              {
                borderColor:
                  password.length === 0
                    ? "#00000064"
                    : password.length < 6
                    ? "red"
                    : "#3a5a40",
              },
            ]}
            onChangeText={(value) => setpassword(value)}
          />
          {password.length >= 6 && (
            <Image
              source={require("../../../assets/images/check-mark.png")}
              style={{
                width: 16,
                height: 16,
                alignSelf: "flex-end",
                position: "absolute",
                top: 40,
                right: 10,
              }}
            />
          )}
          {password.length > 0 && password.length < 6 && (
            <Image
              source={require("../../../assets/images/close.png")}
              style={{
                width: 16,
                height: 16,
                alignSelf: "flex-end",
                position: "absolute",
                top: 40,
                right: 10,
              }}
            />
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.seatAcceptButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => navigation.navigate("Create")}
      >
        <Text style={styles.buttonText2}>Hesabınız Yok mu? Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}
