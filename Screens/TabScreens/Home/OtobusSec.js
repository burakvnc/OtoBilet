import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Animated,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  getFirestore,
  where,
  updateDoc,
  doc,
  query,
  getDocs,
  collection,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { FlashList } from "@shopify/flash-list";
import styles from "../../../Styles/styles";
import { db } from "../../../config";
export default function OtobusSec({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
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

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
        });

        return unsubscribe; // Return the unsubscribe function
      } catch (error) {
        console.log("Error getting user document:", error);
      }
    };

    const unsubscribe = getSeferler();

    // Cleanup function to unsubscribe when the component unmounts or dependencies change
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [selectedDate, selectedCity, selectedCity2]);

  const SeferItem = ({ item }) => {
    const animatedHeight = useState(new Animated.Value(0))[0];
    const borderRadius = useState(new Animated.Value(0))[0];
    const animatedMarginBottom = useState(new Animated.Value(0))[0];
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [islemBasarili, setIslemBasarili] = useState(false);
    const [seatsSelected, setSeatsSelected] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const selectedSeats = seatsSelected.map((seat) => seat.id);
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
          setSelectedSeat(null);
          setSeatsSelected(updatedSeats);
        } else {
          console.log([...seatsSelected, { id: seatNumber, durum: null }]);
          setPopoverVisible(true);
          setSelectedSeat(seatNumber);
          setSeatsSelected([...seatsSelected, { id: seatNumber, durum: null }]);
        }
      } else {
        console.log("You can select up to 5 seats.");
      }
    };
    const handleGenderSelection = (gender, seatNumber) => {
      const seatIndex = seatsSelected.findIndex(
        (seat) => seat.id === seatNumber
      );

      if (seatIndex > -1) {
        const updatedSeats = [...seatsSelected];
        updatedSeats[seatIndex] = { id: seatNumber, durum: gender };
        console.log(updatedSeats);
        setSeatsSelected(updatedSeats);
      } else {
        if (seatsSelected.length >= 5) {
          return;
        }

        console.log([...seatsSelected, { id: seatNumber, durum: gender }]);
        setPopoverVisible(true);
        setSelectedSeat(seatNumber);
        setSeatsSelected([...seatsSelected, { id: seatNumber, durum: gender }]);
      }

      setPopoverVisible(false);
      setSelectedSeat(null);
    };

    const toggleCollapsibleArea = () => {
      setIsOpen(!isOpen);
    };
    const updateKoltuklar = async (seferId) => {
      try {
        const seferRef = doc(db, "seferler", seferId);
        const seferDoc = await getDoc(seferRef);

        if (seferDoc.exists() && seferDoc.data().koltuklar) {
          const koltuklar = seferDoc.data().koltuklar;

          const updatedSeatIds = seatsSelected.map((seat) => seat.id - 1);

          const updatedKoltuklar = koltuklar.map((koltuk) => {
            const matchingSeat = seatsSelected.find(
              (seat) => seat.id === koltuk.id
            );
            if (matchingSeat) {
              return { id: koltuk.id, durum: matchingSeat.durum };
            }
            return koltuk;
          });

          await updateDoc(seferRef, { koltuklar: updatedKoltuklar });
          console.log("Koltuklar arrayi başarıyla güncellendi.");
          setIslemBasarili(true);
          setTimeout(() => {
            navigation.navigate("Home");
          }, 2000);
        } else {
          console.log(
            "Sefer belgesi bulunamadı veya koltuklar alanı tanımlı değil."
          );
        }
      } catch (error) {
        console.error("Koltuklar arrayini güncelleme hatası:", error);
      }
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
    const generateSeatRows = (startSeatNumber) => {
      return (
        <View style={styles.seatRow}>
          {Array.from({ length: 13 }, (_, index) => {
            const seatNumber = startSeatNumber + index * 4;
            const matchingSeat = item.koltuklar.find(
              (seat) => seat.id === seatNumber
            );
            const durum = matchingSeat ? matchingSeat.durum : "Boş";
            let backgroundColor;
            let disabled = false;
            let borderColor;
            let borderWidth;
            if (durum === "Erkek") {
              backgroundColor = "#457b9d";
              disabled = true;
              borderColor = "#457b9d";
              borderWidth = 1;
            } else if (durum === "Kadın") {
              backgroundColor = "pink";
              disabled = true;
              borderColor = "pink";
              borderWidth = 1;
            } else {
              backgroundColor = "#fff";
              borderColor = "#000";
              borderWidth = 1;
            }
            const isSelected = seatsSelected.find(
              (seat) => seat.id === seatNumber
            );
            if (isSelected) {
              backgroundColor = "#2d6a4f";
              borderColor = "#fff";
              disabled = true;
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
                    <Text style={styles.seatNumber}>{seatNumber}</Text>
                  </TouchableOpacity>
                }
              >
                <View style={styles.SeferPopoverView}>
                  <TouchableOpacity
                    onPress={() => handleGenderSelection("Erkek", seatNumber)}
                    disabled={
                      disabled ||
                      (index < 12 &&
                        item.koltuklar.some(
                          (seat) =>
                            (startSeatNumber % 2 === 0
                              ? seat.id === seatNumber - 1
                              : seat.id === seatNumber + 1) &&
                            seat.durum === "Kadın"
                        ))
                    }
                  >
                    <Image
                      source={require("../../../assets/images/man.png")}
                      style={[
                        styles.SeferPopoverMan,
                        {
                          tintColor:
                            disabled ||
                            (index < 12 &&
                              item.koltuklar.some(
                                (seat) =>
                                  (startSeatNumber % 2 === 0
                                    ? seat.id === seatNumber - 1
                                    : seat.id === seatNumber + 1) &&
                                  seat.durum === "Kadın"
                              ))
                              ? "gray"
                              : "blue",
                        },
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleGenderSelection("Kadın", seatNumber)}
                    disabled={
                      disabled ||
                      (index < 12 &&
                        item.koltuklar.some(
                          (seat) =>
                            (startSeatNumber % 2 === 0
                              ? seat.id === seatNumber - 1
                              : seat.id === seatNumber + 1) &&
                            seat.durum === "Erkek"
                        ))
                    }
                  >
                    <Image
                      source={require("../../../assets/images/woman.png")}
                      style={[
                        styles.SeferPopoverWoman,
                        {
                          tintColor:
                            disabled ||
                            (index < 12 &&
                              item.koltuklar.some(
                                (seat) =>
                                  (startSeatNumber % 2 === 0
                                    ? seat.id === seatNumber - 1
                                    : seat.id === seatNumber + 1) &&
                                  seat.durum === "Erkek"
                              ))
                              ? "gray"
                              : "pink",
                        },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              </Popover>
            );
          })}
        </View>
      );
    };
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
        <View style={styles.SeferContainerView}>
          <View style={styles.SeferFirmaView}>
            <Image
              source={{ uri: item.resim }}
              style={styles.SeferFirmaResim}
            />
          </View>
          <View style={{ width: "75%" }}>
            <Text style={{ textAlign: "center", height: "15%" }}>
              {item.kalkis} {">"} {item.inis}
            </Text>
            <View style={{ flexDirection: "row", height: "85%" }}>
              <View style={styles.SeferTimeView}>
                <Text style={styles.SeferTimeText}>{item.saat}</Text>
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
                <Text style={styles.SeferPriceText}>{item.fiyat} TL</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.SeferDropdown}
          onPress={toggleCollapsibleArea}
        >
          <View style={styles.SeferDropdownView}>
            <Text style={{ fontSize: 8 }}>
              {item.kalkisotogar} {">"} {item.inisotogar}
            </Text>
            <Text style={{ fontSize: 8 }}>
              {item.kalkis} {">"} {item.inis}
            </Text>
          </View>
          <View style={styles.SeferKoltukSecView}>
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
            <View style={styles.SeferDropdownInfo}>
              <Text>
                <View style={styles.SeferDropdownInfoErkek}></View> Dolu-Erkek{" "}
                {"    "}
                <View
                  style={styles.SeferDropdownInfoKadin}
                ></View> Dolu-Kadın {"    "}
                <View style={styles.SeferDropdownInfoBos}></View> Boş Koltuk
              </Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Animated.View style={styles.SeferOtobus}>
                <ImageBackground
                  source={require("../../../assets/images/otobus.png")}
                  style={styles.SeferOtobusBG}
                >
                  <View style={{ marginLeft: 120, marginRight: 30 }}>
                    {generateSeatRows(1)}
                    {generateSeatRows(2)}
                    <View style={styles.emptyRow}></View>
                    {generateSeatRows(3)}
                    {generateSeatRows(4)}
                  </View>
                </ImageBackground>
              </Animated.View>
            </ScrollView>

            <View style={styles.SeferOdeme}>
              <View style={styles.SeferOdemeView}>
                <Text style={{ textAlign: "center" }}>
                  {seatsSelected.length > 0
                    ? `Ödemek için tıklayın`
                    : "Lütfen yukarıdan koltuk seçin"}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.seatAcceptButton,
                  {
                    backgroundColor:
                      seatsSelected.length === 0 ? "gray" : "#264653",
                    opacity: seatsSelected.length === 0 ? 0.5 : 1,
                  },
                ]}
                onPress={() => setModalVisible(true)}
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
        <Modal visible={modalVisible} transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Kapat</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBody}>
                {islemBasarili ? (
                  <Text style={{ textAlign: "center" }}>
                    {" "}
                    <Image
                      source={require("../../../assets/images/check-circle.gif")}
                      style={{ width: 20, height: 20 }}
                    />
                    İşlem Başarılı. Anasayfaya Yönlendiriliyorsunuz.
                  </Text>
                ) : (
                  <>
                    <Text style={styles.modalText}>
                      Rota : {item.kalkisotogar} {">"} {item.inisotogar}
                    </Text>
                    <Text style={styles.modalText}>
                      Kalkış Saati: {item.saat}
                    </Text>
                    <Text style={styles.modalText}>
                      Alınacak Koltuklar:{" "}
                      {selectedSeats.map((seat, index) => (
                        <Text key={seat} style={styles.modalText}>
                          {seat}
                          {index !== selectedSeats.length - 1 && " "}
                        </Text>
                      ))}
                    </Text>

                    <Text style={styles.modalText}>
                      Toplam Fiyat: {item.fiyat * seatsSelected.length} TL
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.seatAcceptButton,
                        {
                          backgroundColor:
                            seatsSelected.length === 0 ? "gray" : "#264653",
                          opacity: seatsSelected.length === 0 ? 0.5 : 1,
                        },
                      ]}
                      onPress={() => updateKoltuklar(item.seferId)}
                      disabled={seatsSelected.length === 0}
                    >
                      <View style={styles.searchbusView}>
                        <Image
                          source={require("../../../assets/images/google-pay.png")}
                          style={styles.searchIcon}
                        />
                        <Text style={styles.searchbusButton}>
                          {" "}
                          Onayla ve Bitir
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <Image
            source={require("../../../assets/images/searching.png")}
            style={{ width: "10%", height: "10%", resizeMode: "contain" }}
          />
          <Text style={styles.loadingText}>Aranıyor...</Text>
        </>
      ) : data === null ? (
        <>
          <Image
            source={require("../../../assets/images/no-results.png")}
            style={{ width: "10%", height: "10%", resizeMode: "contain" }}
          />
          <Text style={styles.notFoundText}>Bugün için bulunamadı</Text>
        </>
      ) : (
        <View style={styles.OtobusSecContainer}>
          <FlashList
            renderItem={({ item }) => <SeferItem key={item.id} item={item} />}
            data={data}
            estimatedItemSize={139}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}
