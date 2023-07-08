import { Text, TouchableOpacity, View, TextInput, Image } from "react-native";
import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SignInContext } from "../../../authContext";
import ModalSelector from "react-native-modal-selector";
import styles from "../../../Styles/styles";
import { ScrollView } from "react-native-gesture-handler";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../config";
export default function Create({navigation}) {
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
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const colRef = collection(db, "users");
  const handleCreate = () => {
    if (
      name !== "" &&
      surname !== "" &&
      gender !== "" &&
      birthDate !== "" &&
      password !== "" &&
      passwordrepeat !== "" &&
      email !== "" &&
      kimlikno !== ""
    ) {
      if (password !== passwordrepeat) {
        // Passwords don't match
        console.log("Passwords don't match");
        return;
      }

      if (password.length < 6) {
        // Password is too short
        console.log("Password is too short");
        return;
      }

      if (!validateEmail(email)) {
        // Invalid email format
        console.log("Invalid email format");
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            mail: auth.currentUser.email,
            userId: auth.currentUser.uid,
            name: name,
            gender: gender,
            surname: surname,
            birthDate: birthDate,
            password: password,
            kimlikno: kimlikno,
            createdDate: Date.now(),
          };

          setDoc(doc(colRef, auth.currentUser.uid), userData)
            .then(() => {
              console.log("User data saved successfully");
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
            })
            .catch((error) => {
              console.log("Error saving user data: ", error);
            });
        })
        .catch((error) => {
          console.log("Error creating user: ", error);
        });
    } else {
      console.log("Please fill in all the fields");
    }
  };

  return (
    <View style={styles.LoginPage}>
      <View style={{ height: "70%",width:"90%",marginTop:"10%" }}>
        <ScrollView style={styles.LoginScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.fieldContainer}>
            <Text style={styles.TextStyle}>Adınız</Text>
            <TextInput
              placeholder="Adınız"
              value={name}
              placeholderTextColor="#00000064"
              editable={true}
              keyboardType="default"
              maxLength={20}
              style={[
                styles.input,
                {
                  borderColor:
                    name.length === 0
                      ? "#00000064"
                      : name.length < 2
                      ? "red"
                      : "#3a5a40",
                },
              ]}
              onChangeText={(value) => setname(value)}
            />
            {name.length >= 2 && (
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
            {name.length > 0 && name.length < 2 && (
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

          <View style={styles.fieldContainer}>
            <Text style={styles.TextStyle}>Soyadınız</Text>
            <TextInput
              placeholder="Soyadınız"
              value={surname}
              placeholderTextColor="#00000064"
              editable={true}
              keyboardType="default"
              maxLength={20}
              style={[
                styles.input,
                {
                  borderColor:
                    surname.length === 0
                      ? "#00000064"
                      : surname.length < 2
                      ? "red"
                      : "#3a5a40",
                },
              ]}
              onChangeText={(value) => setsurname(value)}
            />
            {surname.length >= 2 && (
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
            {surname.length > 0 && surname.length < 2 && (
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

          <View style={styles.fieldContainer}>
            <Text style={styles.TextStyle}>Kimlik No</Text>
            <TextInput
              placeholder="Kimlik No"
              value={kimlikno}
              placeholderTextColor="#00000064"
              editable={true}
              keyboardType="numeric"
              maxLength={11}
              style={[
                styles.input,
                {
                  borderColor:
                    kimlikno.length === 0
                      ? "#00000064"
                      : kimlikno.length < 11
                      ? "red"
                      : "#3a5a40",
                },
              ]}
              onChangeText={(value) => setkimlikno(value)}
            />
            {kimlikno.length >= 11 && (
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
            {kimlikno.length > 0 && kimlikno.length < 11 && (
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

          <View style={styles.fieldContainer}>
            <Text style={styles.TextStyle}>Doğum Tarihiniz</Text>
            <TextInput
              placeholder="GG.AA.YYYY"
              value={birthDate}
              placeholderTextColor="#00000064"
              editable={true}
              keyboardType="numeric"
              maxLength={10}
              style={[
                styles.input,
                {
                  borderColor:
                    birthDate.length === 0
                      ? "#00000064"
                      : birthDate.length < 10
                      ? "red"
                      : "#3a5a40",
                },
              ]}
              onChangeText={(value) => {
                // Remove non-digit characters from the input
                const digitsOnly = value.replace(/\D/g, "");

                // Apply the regex pattern to format the input as DD.MM.YYYY
                const formattedDate = digitsOnly.replace(
                  /^(\d{2})(\d{0,2})(\d{0,4}).*/,
                  (match, p1, p2, p3) => {
                    let result = p1;
                    if (p2) {
                      result += "." + p2;
                    }
                    if (p3) {
                      result += "." + p3;
                    }
                    return result;
                  }
                );

                setbirthDate(formattedDate);
              }}
            />
            {birthDate.length >= 10 && (
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
            {birthDate.length > 0 && birthDate.length < 9 && (
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

          <View style={styles.fieldContainer}>
            <Text style={styles.TextStyle}>Cinsiyetiniz</Text>
            <ModalSelector
              data={genders}
              keyExtractor={(item) => item.id}
              labelExtractor={(item) => item.name}
              onChange={(e) => setGender(e.name)}
              cancelText="Kapat"
              style={styles.input2}
              initValue="Cinsiyetinizi Seçin"
              optionTextStyle={{ color: "black" }}
              initValueTextStyle={{ textAlign: "left", color: "#00000064" }}
              selectStyle={{
                borderWidth: 2,
                borderRadius: 15,
                borderColor: gender === "" ? "#00000064" : "#3a5a40",
              }}
              selectedItemTextStyle={{ color: "#3a5a40" }}
              selectTextStyle={{
                color: "#00000064",
                textAlign: "left",
                paddingHorizontal: 5,
              }}
            />
            {gender !== "" && (
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

          <View style={styles.fieldContainer}>
            <Text style={styles.TextStyle}>Şifre Tekrarı</Text>
            <TextInput
              placeholder="Şifre Tekrarı"
              value={passwordrepeat}
              placeholderTextColor="#00000064"
              editable={true}
              secureTextEntry={true}
              maxLength={20}
              style={[
                styles.input,
                {
                  borderColor:
                    passwordrepeat.length === 0
                      ? "#00000064"
                      : password !== passwordrepeat || passwordrepeat.length < 6
                      ? "red"
                      : "#3a5a40",
                },
              ]}
              onChangeText={(value) => setpasswordrepeat(value)}
            />
            {passwordrepeat.length >= 6 && (
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
            {passwordrepeat.length > 0 &&
              (password !== passwordrepeat || passwordrepeat.length < 6) && (
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
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.buttonLogin} onPress={handleCreate}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop:10}} onPress={()=> navigation.navigate("Login")}>
        <Text style={styles.buttonText2}>Zaten Hesabın var mı? Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}
