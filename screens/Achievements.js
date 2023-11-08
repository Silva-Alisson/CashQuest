import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { COLORS } from "../constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Achievements = ({ navigation }) => (
  <SafeAreaView
    style={{
      flex: 1, 
      backgroundColor: "white", 
      paddingTop: 52,
      paddingLeft: 5,
    }}
  >
    <View style={{  flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
      </TouchableOpacity>
      <Text style={[StylesAchievements.TextStyleTitle, { marginLeft: 10 }]}>Conquistas</Text>
    </View>
    <View>
      <View style={{ marginHorizontal:10, marginVertical: 10, }}>
        <View>
          <View style={{ marginTop: 16,marginBottom: 16 }}>
            <Text style={StylesAchievements.TextStyleTitle}>
              Últimas Conquistas
            </Text>
          </View>
          <View style={{ height: 80.614, height: 156, alignItems: "center" }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.itemContainer}>
                <Image source={require("../assets/Conquista.png")} resizeMode="contain" />
                <Text style={[StylesAchievements.TextStyleSub, styles.text]}>Aficionado por Finanças I</Text>
              </View>
              <View style={styles.itemContainer}>
                <Image source={require("../assets/Conquista.png")} resizeMode="contain" />
                <Text style={[StylesAchievements.TextStyleSub, styles.text]}>Poupador Iniciante</Text>
              </View>
              <View style={styles.itemContainer}>
                <Image source={require("../assets/Conquista.png")} resizeMode="contain" />
                <Text style={[StylesAchievements.TextStyleSub, styles.text]}>Poupador</Text>
              </View>
              <View style={styles.itemContainer}>
                <Image source={require("../assets/Conquista.png")} resizeMode="contain" />
                <Text style={[StylesAchievements.TextStyleSub, styles.text]}>Poupador Nato</Text>
              </View>{/* Adicione mais itens conforme necessário */}
            </ScrollView>
          </View>
        </View>
      </View>{/* View das conquistas com o ScrollView na horizontal */}
      <View style={{ marginHorizontal:10, marginVertical: 10, }}>
        <View>
          <View style={{ marginTop: 16,marginBottom: 16 }}>
            <Text style={StylesAchievements.TextStyleTitle}>
              Últimas Conquistas
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Vstyles.itemContainer}>
              <Image source={require("../assets/Conquista.png")} resizeMode="contain" />
              <Text style={[StylesAchievements.TextStyleSub, Vstyles.text]}>Aficionado por Finanças I</Text>
            </View>
            <View style={Vstyles.itemContainer}>
              <Image source={require("../assets/Conquista.png")} resizeMode="contain" />
              <Text style={[StylesAchievements.TextStyleSub, Vstyles.text]}>Poupador Iniciante</Text>
            </View>
            <View style={Vstyles.itemContainer}>
              <Image source={require("../assets/Conquista.png")} resizeMode="contain" />
              <Text style={[StylesAchievements.TextStyleSub, Vstyles.text]}>Poupador</Text>
            </View>
            <View style={Vstyles.itemContainer}>
              <Image source={require("../assets/Conquista.png")} resizeMode="contain" />
              <Text style={[StylesAchievements.TextStyleSub, Vstyles.text]}>Poupador Nato</Text>
            </View>
            {/* Adicione mais itens conforme necessário */}
          </ScrollView>
        </View>
      </View>

    </View>
  </SafeAreaView>
);

const StylesAchievements = StyleSheet.create({
  TextStyleTitle: {
    color: COLORS.greyDark,
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: 400
  },
  TextStyleSub: {
    color: COLORS.greyDark,
    textAlign: "center",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 400
  }
});

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    marginRight: 32, // Espaçamento de 32px
  },
  text: {
    width: 80.61, // Largura máxima do texto
    flexWrap: 'wrap', // Quebra de linha
  },
});

const Vstyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row', // Itens na mesma linha
    alignItems: 'flex-start', // Alinhamento à esquerda
    marginBottom: 32, // Espaçamento de 32px
  },
  text: {
    width: 366, // Largura máxima do texto
    marginLeft: 15.77, // Espaçamento entre a imagem e o texto
  },
});

export default Achievements;
