import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/auth";
import { COLORS } from "../constants";
import * as Animatable from 'react-native-animatable';

const settingsText = [
  {
    key: "Editar perfil",
    description: "Altere seu nome, foto e outras informações",
    navigate: "EditPerfilStack"
  },
  {
    key: "Alterar informações do pet",
    description: "Altere o nome do seu pet",
    navigate: "EditPetStack"
  }
  // { key: "Excluir conta permanentemente",
  // description: "Excluir sua conta permanentemente", navigate: "" }
];

export default function Settings({ navigation }) {
  const { signOut } = useAuth();
  const handleSingOut = async () => {
    try {
      signOut();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={40}
            color={COLORS.greyDark}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, color: COLORS.greyDark }}>
          Configurações
        </Text>
      </View>
      <View>
        <FlatList
          data={settingsText}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.list}
              onPress={() => navigation.navigate(item.navigate)}
            >
              <Animatable.View delay={50} animation="fadeInRight" style={styles.item}>
                <View>
                  <Text style={styles.text}>{item.key}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>

                <MaterialCommunityIcons
                  name="chevron-right"
                  size={40}
                  color={COLORS.greyDark}
                />
              </Animatable.View>
            </TouchableOpacity>
          )}
        />
      </View>
      <Animatable.View delay={50} animation="fadeInRight"> 
        <TouchableOpacity style={styles.list} onPress={signOut}>
          <View style={styles.item}>
            <View>
              <Text style={styles.text}>Sair da sua conta</Text>
              <Text style={styles.description}>
                Excluir sua conta permanentemente
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={40}
              color={COLORS.greyDark}
            />
          </View>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold"
  },
  list: {
    marginHorizontal: 10
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10
  },
  text: {
    fontSize: 14,
    color: COLORS.darkBlue
  },
  description: {
    fontSize: 12,
    color: COLORS.greyDark
  }
});
