import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  View,
  Image
} from "react-native";
import React from "react";
import { COLORS, SIZES, icons, images } from "../constants";

export const Achievements = ({ navigation }) => (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}
  >
    <View>
      <Text style={StylesAchievements.TextStyleTitle}>Conquistas</Text>
    </View>
    <View>
      <View>
        <Text style={StylesAchievements.TextStyleTitle}>
          Últimas Conquistas
        </Text>
      </View>
      <View>
        <Image
          source={require("../assets/Conquista.png")}
          resizeMode="contain"
        />
        <Text style={StylesAchievements.TextStyleSub}>
          Aficionado por Finanças I
        </Text>
      </View>
    </View>
  </SafeAreaView>
);

const StylesAchievements = StyleSheet.create({
  TextStyleTitle: {
    color: COLORS.grey,
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: 400
  },
  TextStyleSub: {
    color: COLORS.grey,
    textAlign: "center",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 400
  }
});

export default Achievements;
