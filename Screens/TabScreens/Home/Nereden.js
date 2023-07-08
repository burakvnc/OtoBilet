import React, { useContext, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import iller from "../../../assets/json/iller.json";
import styles from "../../../Styles/styles";
import { CityContext } from "./CityContext";
export default function Nereden({ navigation }) {
  useEffect(() => {
    const parentNavigation = navigation.getParent();
    parentNavigation.setOptions({
      headerShown: false,
    });

    return () => {
      parentNavigation.setOptions({
        headerShown: true,
      });
    };
  }, [navigation]);
  const { selectedCity, setSelectedCity } = useContext(CityContext);
  const illerlistesi = Object.entries(iller).map(([id, name]) => ({
    id,
    name,
  }));
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selectedCity === item.id && styles.selectedItem]}
      onPress={() => {
        setSelectedCity(item.name);
        navigation.navigate("Home", { selectedCity: item.name });
      }}
    >
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>
          <Image
            source={require("../../../assets/images/navigation.png")}
            style={styles.itemImage}
          />
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <FlatList
        data={illerlistesi}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
