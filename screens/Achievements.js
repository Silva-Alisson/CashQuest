import {
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Image
} from "react-native";
import { COLORS } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { get_all_achievements } from "../services/achievements/get-all-achievements";
import { useAuth } from "../context/auth";

export const Achievements = ({ navigation }) => {
  const { authData } = useAuth();
  const isFocused = useIsFocused();
  const [dataAchievements, setDataAchievements] = useState();

  const numberOfItemsToShow = 4;

  const slicedData = dataAchievements?.slice(-numberOfItemsToShow);

  async function getAchievementsData() {
    const result = await get_all_achievements({
      token: authData.token,
      registerId: authData.userId
    });
    console.log(result);
    setDataAchievements(result);
  }

  function renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.img }} resizeMode="contain" style={StylesAchievements.image} />
        <Text style={[StylesAchievements.TextStyleSub, styles.text]}>
          {item.name}
        </Text>
      </View>
    );
  }

  function renderItemHoreinzontal({ item }) {
    return (
      <View style={Vstyles.itemContainer}>
        <Image source={{ uri: item.img }} resizeMode="contain" style={Vstyles.image} />
        <View
          style={{
            alignItens: "flex-start",
            justifyContent: "flex-start"
          }}
        >
          <Text style={[StylesAchievements.TextStyleTitle, Vstyles.text]}>
            {item.name}
          </Text>
        </View>
      </View>
    );
  }
  useEffect(() => {
    if (isFocused) {
      getAchievementsData();
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: 52,
        paddingLeft: 5
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
        </TouchableOpacity>
        <Text style={[StylesAchievements.TextStyleTitle, { marginLeft: 10 }]}>
          Conquistas
        </Text>
      </View>
      <View>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <View>
            <View style={{ marginTop: 16, marginBottom: 16 }}>
              <Text style={StylesAchievements.TextStyleTitle}>
                Últimas Conquistas
              </Text>
            </View>
            <View style={{ height: 156, alignItems: "center" }}>
              {dataAchievements && dataAchievements.length > 0 ? (
                <FlatList
                  data={slicedData}
                  keyExtractor={(item) => item.name}
                  renderItem={renderItem}
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    color: COLORS.greyDark
                  }}
                >
                  Nenhuma Conquista Obtida!
                </Text>
              )}
              {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.itemContainer}>
                <Image source={require("../assets/Conquista.png")} resizeMode="contain" />
                <Text style={[StylesAchievements.TextStyleSub, styles.text]}>Aficionado por Finanças I</Text>
              </View>
            </ScrollView> */}
            </View>
          </View>
        </View>
        {/* View das conquistas com o ScrollView na horizontal */}

        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <View>
            <View style={{ marginTop: 16, marginBottom: 16 }}>
              <Text style={StylesAchievements.TextStyleTitle}>
                Todas as conquistas obtidas
              </Text>
            </View>
            <View style={{ height: 450 }}>
              {dataAchievements && dataAchievements.length > 0 ? (
                <FlatList
                  data={dataAchievements}
                  keyExtractor={(item) => item.name}
                  renderItem={renderItemHoreinzontal}
                />
              ) : (
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    color: COLORS.greyDark
                  }}
                >
                  Nenhuma Conquista Obtida!
                </Text>
              )}
              {/* <ScrollView showsVerticalScrollIndicator={false}>
                <View style={Vstyles.itemContainer}>
                  <Image
                    source={require("../assets/Conquista.png")}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      alignItens: "flex-start",
                      justifyContent: "flex-start"
                    }}
                  >
                    <Text
                      style={[StylesAchievements.TextStyleTitle, Vstyles.text]}
                    >
                      Poupador Nato
                    </Text>
                    <Text
                      style={[StylesAchievements.TextStyleSub, Vstyles.text]}
                    >
                      Concluir 10 objetivos
                    </Text>
                  </View>
                </View>
              </ScrollView> */}
            </View>
          </View>
        </View>
        {/* View das conquistas com o ScrollView na vertical */}
      </View>
    </SafeAreaView>
  );
};

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
  },
  image: {
    height: 100,
    width: 140,
    marginBottom: 15,
  },
});

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginRight: 32 // Espaçamento de 32px
  },
  text: {
    width: 80.61, // Largura máxima do texto
    flexWrap: "wrap" // Quebra de linha
  }
});

const Vstyles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row", // Itens na mesma linha
    alignItems: "center", // Alinhamento à esquerda
    marginBottom: 16 // Espaçamento de 32px
  },
  text: {
    marginLeft: 8
  },
  image: {
    height: 120,
    width: 100,
  },
});

export default Achievements;
