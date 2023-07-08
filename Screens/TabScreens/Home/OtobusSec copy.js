import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  getFirestore,
  where,
  deleteDoc,
  doc,
  query,
  getDocs,
  collection,
} from "firebase/firestore";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { FlashList } from "@shopify/flash-list";
import styles from "../../../Styles/styles";
import { db } from "../../../config";
export default function OtobusSec({ navigation, route }) {
  const [data, setData] = useState(null);
  const {
    selectedOption,
    selectedCity,
    selectedCity2,
    selectedDate,
    selectedDate2,
  } = route.params;
  console.log(
    selectedOption,
    selectedCity,
    selectedCity2,
    selectedDate,
    selectedDate2
  );
  useEffect(() => {
    const getSeferler = async () => {
      try {
        const q = query(
          collection(db, "seferler"),
          where("tarih", "==", selectedDate),
          where("kalkis", "==", selectedCity),
          where("inis", "==", selectedCity2)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDataArray = [];
          querySnapshot.forEach((docSnapshot) => {
            const userData = docSnapshot.data();
            userDataArray.push(userData);
          });
          setData(userDataArray);
          console.log(userDataArray);
        } else {
          console.log("Yok");
          setData(null);
        }
      } catch (error) {
        console.log("Error getting user document:", error);
      }
    };

    getSeferler();
  }, [selectedDate, selectedCity, selectedCity2]);

  const SeferItem = ({ item }) => {
    const animatedHeight = useState(new Animated.Value(0))[0];
    const borderRadius = useState(new Animated.Value(0))[0];
    const animatedMarginBottom = useState(new Animated.Value(0))[0];
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [seatsSelected, setSeatsSelected] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);

    const handleSeatSelection = (seatNumber) => {
      if (seatsSelected.length < 5) {
        const seatIndex = seatsSelected.findIndex(
          (seat) => seat.seatNumber === seatNumber
        );

        if (seatIndex > -1) {
          const updatedSeats = [...seatsSelected];
          updatedSeats.splice(seatIndex, 1);
          console.log(updatedSeats);
          setPopoverVisible(true);
          setSelectedSeat(null); // Clear selected seat when unselecting
          setSeatsSelected(updatedSeats);
        } else {
          console.log([...seatsSelected, { id: seatNumber, durum: null }]);
          setPopoverVisible(true); // Open popover before updating state
          setSelectedSeat(seatNumber); // Set selected seat
          setSeatsSelected([...seatsSelected, { id: seatNumber, durum: null }]);
        }
      } else {
        console.log("You can select up to 5 seats.");
      }
    };
    const handleGenderSelection = (gender, seatNumber) => {
      const seatIndex = seatsSelected.findIndex(
        (seat) => seat.seatNumber === seatNumber
      );

      if (seatIndex > -1) {
        const updatedSeats = [...seatsSelected];
        updatedSeats[seatIndex] = { ...updatedSeats[seatIndex], gender };
        console.log(updatedSeats);
        setSeatsSelected(updatedSeats);
      } else {
        console.log([...seatsSelected, { id: seatNumber, durum: gender }]);
        setPopoverVisible(true); // Open popover before updating state
        setSelectedSeat(seatNumber); // Set selected seat
        setSeatsSelected([...seatsSelected, { id: seatNumber, durum: gender }]);
      }

      setPopoverVisible(false);
      setSelectedSeat(null);
    };

    const toggleCollapsibleArea = () => {
      setIsOpen(!isOpen);
    };
    useEffect(() => {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: isOpen ? 400 : 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animatedMarginBottom, {
          toValue: isOpen ? 400 : 5,
          duration: 200,
          useNativeDriver: false,
        }),

        Animated.timing(borderRadius, {
          toValue: isOpen ? 0 : 5,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }, [isOpen, animatedHeight, animatedMarginBottom, borderRadius]);
    return (
      <Animated.View
        style={{
          backgroundColor: "#fff",
          marginTop: 5,
          marginBottom: animatedMarginBottom,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          borderBottomRightRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
          height: 130,
          alignContent: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 1,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <View style={{ flexDirection: "row", width: "100%", height: "80%" }}>
          <View
            style={{
              height: "100%",
              width: "25%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.resim }}
              style={{
                width: "90%",
                height: "60%",
                resizeMode: "cover",
              }}
            />
          </View>
          <View style={{ width: "75%" }}>
            <Text style={{ textAlign: "center", height: "15%" }}>
              {item.kalkis} {">"} {item.inis}
            </Text>
            <View style={{ flexDirection: "row", height: "85%" }}>
              <View
                style={{
                  width: "60%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  {item.saat}
                </Text>
                <Text
                  style={{ textAlign: "center", color: "gray", fontSize: 10 }}
                >
                  <Image
                    source={require("../../../assets/images/clock.png")}
                    style={{ width: 10, height: 10, tintColor: "gray" }}
                  />{" "}
                  {item.sure}
                </Text>
              </View>
              <View style={{ width: "40%", justifyContent: "center" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  {item.fiyat} TL
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: "100%",
            height: "20%",
            alignContent: "center",
            borderTopColor: "#00000064",
            borderTopWidth: 1,
            paddingLeft: 5,
            flexDirection: "row",
          }}
          onPress={toggleCollapsibleArea}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "60%",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 8 }}>
              {item.kalkisotogar} {">"} {item.inisotogar}
            </Text>
            <Text style={{ fontSize: 8 }}>
              {item.kalkis} {">"} {item.inis}
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              width: "40%",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 8, marginRight: "5%" }}>
              Koltuk Seç{" "}
              <Image
                source={require("../../../assets/images/down-arrow.png")}
                style={{ width: 10, height: 10 }}
              />
            </Text>
          </View>
        </TouchableOpacity>
        {isOpen && (
          <Animated.View
            style={[styles.collapsibleArea, { height: animatedHeight }]}
          >
            <View
              style={{ paddingTop: 10, width: "100%", alignItems: "center" }}
            >
              <Text>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: "#457b9d",
                    borderRadius: 4,
                  }}
                ></View>{" "}
                Dolu-Erkek{"    "}
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: "pink",
                    borderRadius: 4,
                  }}
                ></View>{" "}
                Dolu-Kadın{"    "}
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#000",
                    borderRadius: 4,
                  }}
                ></View>{" "}
                Boş Koltuk
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Animated.View
                style={{
                  backgroundColor: "#fff",
                  height: 210,
                  paddingTop: 10,
                  alignContent: "center",
                  justifyContent: "flex-start",
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              >
                <ImageBackground
                  source={require("../../../assets/images/otobus.png")}
                  style={{
                    resizeMode: "cover",
                    height: 200,
                    width: 660,
                  }}
                >
                  <View style={{ marginLeft: 120, marginRight: 30 }}>
                    <View style={styles.seatRow}>
                      {Array.from({ length: 13 }, (_, index) => {
                        const seatNumber = index * 4 + 1;
                        const matchingSeat = item.koltuklar.find(
                          (seat) => seat.id === seatNumber
                        );
                        const durum = matchingSeat ? matchingSeat.durum : "Boş";
                        let backgroundColor;
                        let disabled = false;
                        let borderColor;
                        let borderWidth;
                        switch (durum) {
                          case "Erkek":
                            backgroundColor = "#457b9d";
                            disabled = true;
                            borderColor = "#457b9d";
                            borderWidth = 1;
                            break;
                          case "Kadın":
                            backgroundColor = "pink";
                            disabled = true;
                            borderColor = "pink";
                            borderWidth = 1;
                            break;
                          default:
                            backgroundColor = "#fff";
                            borderColor = "#000";
                            borderWidth = 1;
                            break;
                        }

                        // Check if the seat is selected
                        const isSelected = seatsSelected.find(
                          (seat) => seat.id === seatNumber
                        );
                        if (isSelected) {
                          backgroundColor = "#2d6a4f";
                          borderColor = "#fff";
                        }

                        return (
                          <Popover
                            placement={"top"}
                            arrowSize={{ width: 12, height: 24 }}
                            from={
                              <TouchableOpacity
                                key={index}
                                style={[
                                  styles.seatButton,
                                  { backgroundColor, borderWidth, borderColor },
                                ]}
                                onPress={() => handleSeatSelection(seatNumber)}
                                disabled={disabled}
                              >
                                <Text style={styles.seatNumber}>
                                  {seatNumber}
                                </Text>
                              </TouchableOpacity>
                            }
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                width: 150,
                                justifyContent: "center",
                                padding: 10,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() =>
                                  handleGenderSelection("Erkek", seatNumber)
                                }
                              >
                                <Image
                                  source={require("../../../assets/images/man.png")}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    tintColor: "blue",
                                    marginRight: 20,
                                  }}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() =>
                                  handleGenderSelection("Kadın", seatNumber)
                                }
                              >
                                <Image
                                  source={require("../../../assets/images/woman.png")}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    tintColor: "pink",
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </Popover>
                        );
                      })}
                    </View>

                    <View style={styles.seatRow}>
                      {Array.from({ length: 13 }, (_, index) => {
                        const seatNumber = index * 4 + 2;
                        const matchingSeat = item.koltuklar.find(
                          (seat) => seat.id === seatNumber
                        );
                        const durum = matchingSeat ? matchingSeat.durum : "Boş";
                        let backgroundColor;
                        let disabled = false;
                        let borderColor;
                        let borderWidth;
                        switch (durum) {
                          case "Erkek":
                            backgroundColor = "#457b9d";
                            disabled = true;
                            borderColor = "#457b9d";
                            borderWidth = 1;
                            break;
                          case "Kadın":
                            backgroundColor = "pink";
                            disabled = true;
                            borderColor = "pink";
                            borderWidth = 1;
                            break;
                          default:
                            backgroundColor = "#fff";
                            borderColor = "#000";
                            borderWidth = 1;
                            break;
                        }
                        const isSelected = seatsSelected.find(
                          (seat) => seat.id === seatNumber
                        );
                        if (isSelected) {
                          backgroundColor = "#2d6a4f";
                          borderColor = "#fff";
                        }
                        return (
                          <Popover
                            placement={"top"}
                            arrowSize={{ width: 12, height: 24 }}
                            from={
                              <TouchableOpacity
                                key={index}
                                style={[
                                  styles.seatButton,
                                  { backgroundColor, borderWidth, borderColor },
                                ]}
                                onPress={() => handleSeatSelection(seatNumber)}
                                disabled={disabled}
                              >
                                <Text style={styles.seatNumber}>
                                  {seatNumber}
                                </Text>
                              </TouchableOpacity>
                            }
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                width: 150,
                                justifyContent: "center",
                                padding: 10,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() =>
                                  handleGenderSelection("Erkek", seatNumber)
                                }
                              >
                                <Image
                                  source={require("../../../assets/images/man.png")}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    tintColor: "blue",
                                    marginRight: 20,
                                  }}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() =>
                                  handleGenderSelection("Kadın", seatNumber)
                                }
                              >
                                <Image
                                  source={require("../../../assets/images/woman.png")}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    tintColor: "pink",
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </Popover>
                        );
                      })}
                    </View>

                    <View style={styles.emptyRow}></View>

                    <View style={styles.seatRow}>
                      {Array.from({ length: 13 }, (_, index) => {
                        const seatNumber = index * 4 + 3;
                        const matchingSeat = item.koltuklar.find(
                          (seat) => seat.id === seatNumber
                        );
                        const durum = matchingSeat ? matchingSeat.durum : "Boş";
                        let backgroundColor;
                        let disabled = false;
                        let borderColor;
                        let borderWidth;
                        switch (durum) {
                          case "Erkek":
                            backgroundColor = "#457b9d";
                            disabled = true;
                            borderColor = "#457b9d";
                            borderWidth = 1;
                            break;
                          case "Kadın":
                            backgroundColor = "pink";
                            disabled = true;
                            borderColor = "pink";
                            borderWidth = 1;
                            break;
                          default:
                            backgroundColor = "#fff";
                            borderColor = "#000";
                            borderWidth = 1;
                            break;
                        }
                        const isSelected = seatsSelected.find(
                          (seat) => seat.id === seatNumber
                        );
                        if (isSelected) {
                          backgroundColor = "#2d6a4f";
                          borderColor = "#fff";
                        }
                        return (
                          <Popover
                            placement={"top"}
                            arrowSize={{ width: 12, height: 24 }}
                            from={
                              <TouchableOpacity
                                key={index}
                                style={[
                                  styles.seatButton,
                                  { backgroundColor, borderWidth, borderColor },
                                ]}
                                onPress={() => handleSeatSelection(seatNumber)}
                                disabled={disabled}
                              >
                                <Text style={styles.seatNumber}>
                                  {seatNumber}
                                </Text>
                              </TouchableOpacity>
                            }
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                width: 150,
                                justifyContent: "center",
                                padding: 10,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() =>
                                  handleGenderSelection("Erkek", seatNumber)
                                }
                              >
                                <Image
                                  source={require("../../../assets/images/man.png")}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    tintColor: "blue",
                                    marginRight: 20,
                                  }}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() =>
                                  handleGenderSelection("Kadın", seatNumber)
                                }
                              >
                                <Image
                                  source={require("../../../assets/images/woman.png")}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    tintColor: "pink",
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </Popover>
                        );
                      })}
                    </View>

                    <View style={styles.seatRow}>
                      {Array.from({ length: 13 }, (_, index) => {
                        const seatNumber = index * 4 + 4;
                        const matchingSeat = item.koltuklar.find(
                          (seat) => seat.id === seatNumber
                        );
                        const durum = matchingSeat ? matchingSeat.durum : "Boş";
                        let backgroundColor;
                        let disabled = false;
                        let borderColor;
                        let borderWidth;
                        switch (durum) {
                          case "Erkek":
                            backgroundColor = "#457b9d";
                            disabled = true;
                            borderColor = "#457b9d";
                            borderWidth = 1;
                            break;
                          case "Kadın":
                            backgroundColor = "pink";
                            disabled = true;
                            borderColor = "pink";
                            borderWidth = 1;
                            break;
                          default:
                            backgroundColor = "#fff";
                            borderColor = "#000";
                            borderWidth = 1;
                            break;
                        }
                        const isSelected = seatsSelected.find(
                          (seat) => seat.id === seatNumber
                        );
                        if (isSelected) {
                          backgroundColor = "#2d6a4f";
                          borderColor = "#fff";
                        }
                        return (
                          <Popover
                            placement={"top"}
                            arrowSize={{ width: 12, height: 24 }}
                            from={
                              <TouchableOpacity
                                key={index}
                                style={[
                                  styles.seatButton,
                                  { backgroundColor, borderWidth, borderColor },
                                ]}
                                onPress={() => handleSeatSelection(seatNumber)}
                                disabled={disabled}
                              >
                                <Text style={styles.seatNumber}>
                                  {seatNumber}
                                </Text>
                              </TouchableOpacity>
                            }
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                width: 150,
                                justifyContent: "center",
                                padding: 10,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() =>
                                  handleGenderSelection("Erkek", seatNumber)
                                }
                              >
                                <Image
                                  source={require("../../../assets/images/man.png")}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    tintColor: "blue",
                                    marginRight: 20,
                                  }}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() =>
                                  handleGenderSelection("Kadın", seatNumber)
                                }
                              >
                                <Image
                                  source={require("../../../assets/images/woman.png")}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    tintColor: "pink",
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          </Popover>
                        );
                      })}
                    </View>
                  </View>
                </ImageBackground>
              </Animated.View>
            </ScrollView>
            <View
              style={{
                justifyContent: "flex-start",
                height: "35%",
                alignContent: "center",
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}>
                  {seatsSelected.length > 0
                    ? `Seçilen koltuklar:`
                    : "Lütfen yukarıdan koltuk seçin"}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  {seatsSelected.map((seat) => (
                    <View
                      key={seat.seatNumber}
                      style={{
                        backgroundColor: "#2d6a4f",
                        width: 16,
                        height: 16,
                        alignSelf: "center",
                        marginTop: 5,
                        marginRight: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          fontSize: 10,
                        }}
                      >
                        {seat.id}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              {seatsSelected.length > 0 && (
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    marginTop: 10,
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ textAlign: "center" }}>Toplam fiyat: </Text>
                  <View
                    style={{
                      backgroundColor: "#2d6a4f",
                      justifyContent: "center",
                      width: 60,
                    }}
                  >
                    <Text style={{ textAlign: "center", color: "#fff" }}>
                      {item.fiyat * seatsSelected.length} TL
                    </Text>
                  </View>
                </View>
              )}
              <TouchableOpacity
                style={[
                  styles.seatAcceptButton,
                  {
                    backgroundColor:
                      seatsSelected.length === 0 ? "gray" : "#264653",
                    opacity: seatsSelected.length === 0 ? 0.5 : 1,
                  },
                ]}
                onPress={() =>
                  navigation.navigate("OtobusSec", {
                    selectedOption,
                    selectedCity,
                    selectedCity2,
                    selectedDate,
                    selectedDate2,
                  })
                }
                disabled={seatsSelected.length === 0}
              >
                <View style={styles.searchbusView}>
                  <Image
                    source={require("../../../assets/images/valid.png")}
                    style={styles.searchIcon}
                  />
                  <Text style={styles.searchbusButton}>Ödemeye Geç</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "97%",
          marginBottom: 50,
          height: "100%",
        }}
      >
        <FlashList
          key={({ item }) => <SeferItem item={item} />}
          renderItem={({ item }) => <SeferItem item={item} />}
          data={data}
          estimatedItemSize={139}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
