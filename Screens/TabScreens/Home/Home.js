import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import styles from "../../../Styles/styles";
import DatePicker from "react-native-modern-datepicker";
import { CityContext } from "./CityContext";

export default function Home({ navigation }) {
  const { selectedCity, setSelectedCity } = useContext(CityContext);
  const { selectedCity2, setSelectedCity2 } = useContext(CityContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [selectedDate3, setSelectedDate3] = useState(null);
  const [selectedDate4, setSelectedDate4] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleDateSelect = (date) => {
    if (date) {
      const parts = date.split("/");
      const formattedDate = new Date(
        parts[0],
        parts[1] - 1,
        parts[2]
      ).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      setSelectedDate(formattedDate);
      setSelectedDate3(date);
    }
    setModalVisible(false);
  };

  const handleDateSelect2 = (date) => {
    if (date) {
      const parts = date.split("/");
      const formattedDate = new Date(
        parts[0],
        parts[1] - 1,
        parts[2]
      ).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      setSelectedDate2(formattedDate);
      setSelectedDate4(date);
    }
    setModalVisible2(false);
  };

  const selectRoad = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
      setSelectedCity(null);
      setSelectedCity2(null);
    } else {
      setSelectedOption(option);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.roadView}>
        <Text style={styles.headerText}>Güzergah Seçin</Text>
        <View style={styles.roadSelection}>
          <TouchableOpacity
            style={[
              styles.roadButton,
              selectedOption === "Gidiş" && {
                backgroundColor: "#264653",
              },
            ]}
            onPress={() => selectRoad("Gidiş")}
          >
            <Text
              style={[
                styles.roadButtonText,
                selectedOption === "Gidiş" && { color: "white" },
              ]}
            >
              Gidiş
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roadButton,
              selectedOption === "Gidiş-Dönüş" && {
                backgroundColor: "#264653",
              },
            ]}
            onPress={() => selectRoad("Gidiş-Dönüş")}
          >
            <Text
              style={[
                styles.roadButtonText,
                selectedOption === "Gidiş-Dönüş" && { color: "white" },
              ]}
            >
              Gidiş-Dönüş
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {selectedOption !== null && (
        <View style={styles.locationView}>
          <Text style={styles.headerText}>Nereden Nereye</Text>
          <View style={styles.locationSelection}>
            <View style={styles.locationIcon}>
              <Image
                source={require("../../../assets/images/distance.png")}
                style={styles.distanceImage}
              />
            </View>
            <View style={styles.locationWays}>
              <TouchableOpacity
                style={styles.locationButton}
                onPress={() => navigation.navigate("Nereden")}
              >
                <Text style={styles.locationButtonHeaderText}>Nereden</Text>
                <View style={styles.locationCityView}>
                  <Text style={[styles.locationButtonText]}>
                    {selectedCity ? selectedCity : "Şehir Seç"}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.locationButton}
                onPress={() => navigation.navigate("Nereye")}
              >
                <Text style={styles.locationButtonHeaderText}>Nereye</Text>
                <View style={styles.locationCityView}>
                  <Text style={[styles.locationButtonText]}>
                    {selectedCity2 ? selectedCity2 : "Şehir Seç"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {selectedOption !== null &&
        selectedCity !== null &&
        selectedCity2 !== null && (
          <View style={styles.dateView}>
            <Text style={styles.headerText}>Tarih Seçin</Text>
            <View style={styles.dateSelection}>
              <View style={styles.dateIcon}>
                <Image
                  source={require("../../../assets/images/calendar.png")}
                  style={styles.distanceImage}
                />
              </View>
              {selectedOption === "Gidiş" ? (
                <View style={styles.dateWays2}>
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={styles.dateButtonHeaderText}>Gidiş</Text>
                    <View style={styles.dateCityView}>
                      <Text style={[styles.dateButtonText]}>
                        {selectedDate ? selectedDate : "Tarih Seç"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.dateWays}>
                  <>
                    <TouchableOpacity
                      style={styles.dateButton}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={styles.dateButtonHeaderText}>Gidiş</Text>
                      <View style={styles.dateCityView}>
                        <Text style={[styles.dateButtonText]}>
                          {selectedDate ? selectedDate : "Tarih Seç"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.dateButton}
                      onPress={() => setModalVisible2(true)}
                    >
                      <Text style={styles.dateButtonHeaderText}>Dönüş</Text>
                      <View style={styles.dateCityView}>
                        <Text style={[styles.dateButtonText]}>
                          {selectedDate2 ? selectedDate2 : "Tarih Seç"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                </View>
              )}
            </View>
          </View>
        )}
      <TouchableOpacity
        style={[
          styles.searchbus,
          {
            backgroundColor:
            selectedDate === null || selectedCity === null || selectedCity2 === null || selectedOption === null
                ? "gray"
                : "#264653",
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
        disabled={
          selectedDate === null || selectedCity === null || selectedCity2 === null || selectedOption === null
        }
      >
        <View style={styles.searchbusView}>
          <Image
            source={require("../../../assets/images/search.png")}
            style={styles.searchIcon}
          />
          <Text style={styles.searchbusButton}>Otobüs Bileti Ara</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
            <DatePicker
              mode="calendar"
              minimumDate={new Date(Date.now()).toISOString()}
              maximumDate={
                selectedDate4
                  ? selectedDate4
                  : new Date(
                      Date.now() + 15 * 24 * 60 * 60 * 1000
                    ).toISOString()
              }
              locale="tr"
              onDateChange={handleDateSelect}
              style={styles.datePicker}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={modalVisible2} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible2(false)}>
                <Text style={styles.closeButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
            <DatePicker
              mode="calendar"
              locale="tr"
              onDateChange={handleDateSelect2}
              minimumDate={
                selectedDate3
                  ? selectedDate3
                  : new Date(Date.now()).toISOString()
              }
              maximumDate={new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              ).toISOString()}
              style={styles.datePicker}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
