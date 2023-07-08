import React, { useContext, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import iller from "../../../assets/json/iller.json";
import styles from "../../../Styles/styles";
import { CityContext } from "./CityContext";
export default function Nereeye({ navigation }) {
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
  const { selectedCity2, setSelectedCity2 } = useContext(CityContext);
  const illerlistesi = Object.entries(iller).map(([id, name]) => ({
    id,
    name,
  }));
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selectedCity2 === item.id && styles.selectedItem]}
      onPress={() => {
        setSelectedCity2(item.name);
        navigation.navigate("Home", { selectedCity2: item.name });
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
