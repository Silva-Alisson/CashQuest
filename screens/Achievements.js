import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView
} from "react-native";
import React from "react";
import { COLORS, SIZES, icons, images } from "../constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Achievements = ({ navigation }) => (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
      </TouchableOpacity>
      <Text style={{ marginLeft: 10 }}>Conquistas</Text>
     </View>
    <View style={{ marginHorizontal:10, marginVertical: 10 }}>
      <View>
        <View>
          <Text style={StylesAchievements.TextStyleTitle}>
            Últimas Conquistas
          </Text>
        </View>
        <View style={{ height: 80.614, height: 156, justifyContent: "center", alignItens: "center" }}>
          <Image
            source={require("../assets/Conquista.png")}
            resizeMode="contain"
          />
          <Text style={StylesAchievements.TextStyleSub}>
            Aficionado por Finanças I
          </Text>
          <Image
            source={require("../assets/Conquista.png")}
            resizeMode="contain"
          />
          <Text style={StylesAchievements.TextStyleSub}>
            Aficionado por Finanças I
          </Text>
        </View>
      </View>
      <ScrollView
          scrollEventThrottle={5}
      >
      </ScrollView>
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
