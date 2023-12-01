import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";
import { useAuth } from "../context/auth";
import getWallet from "../services/wallet-service/wallet-service";
import { useIsFocused } from "@react-navigation/native";
import { get_user_photo } from "../services/user-service/get-user-photo";
import { get_user_data } from "../services/user-service/get-user-name-service";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Profile = ({ navigation }) => {
  const [dados, setDados] = useState([]);
  const { authData } = useAuth();
  const isFocused = useIsFocused();
  const [userPhoto, setUserPhoto] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (isFocused) {
      async function fetchData() {
        const response = await getWallet(authData.token, authData.userId);
        setDados(response);
      }
      fetchData();

      async function fetchPhoto() {
        const response = await get_user_photo({
          token: authData.token,
          userId: authData.userId
        });
        setUserPhoto(response.userPhoto);
      }
      fetchPhoto();

      async function fetchUserData() {
        const response = await get_user_data({
          token: authData.token,
          userId: authData.userId
        });
        setUserData(response);
      }

      fetchUserData();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={Styles2.container2}>
      <View style={Styles2.viewAvatar}>
        <Image
          source={{ uri: userPhoto }}
          resizeMode="contain"
          style={Styles2.image}
        />
        <Text style={Styles2.textName}>
          {userData ? userData.firstName + " " + userData.lastName : ""}
        </Text>

        <View style={Styles2.walletContainer}>
          <ImageBackground
            source={require("../assets/profile-bg.jpg")}
            style={Styles2.bg}
            resizeMode="cover"
            borderRadius={16}
          >
            <View style={Styles2.wallet} borderRadius={16}>
              <View style={Styles2.viewWallet}>
                <Text style={Styles2.textWallet}>
                  R${" "}
                  {dados.totalDeposits
                    ? parseFloat(dados.totalDeposits).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2
                      })
                    : 0.0}
                </Text>
                <Text style={Styles2.textWallet}>Carteira</Text>
              </View>

              <View style={Styles2.viewWallet}>
                <Text style={Styles2.textWallet}>
                  R${" "}
                  {dados.savings
                    ? parseFloat(dados.savings).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2
                      })
                    : 0.0}
                </Text>
                <Text style={Styles2.textWallet}>Reservas</Text>
              </View>

              <View style={Styles2.viewWallet}>
                <Text style={Styles2.textWallet}>
                  R${" "}
                  {dados.monthlySpendings
                    ? parseFloat(dados.monthlySpendings).toLocaleString(
                        "pt-BR",
                        {
                          minimumFractionDigits: 2
                        }
                      )
                    : 0.0}
                </Text>
                <Text style={Styles2.textWallet}>Gastos no mês</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <Text style={Styles2.textTittle}>Conquistas e relatórios</Text>

        <View style={Styles2.viewMarginH}>
          <TouchableOpacity
            style={Styles2.buttonSair}
            onPress={() => navigation.navigate("AchievementsStack")}
          >
            <Text style={Styles2.textButton}>Conquistas</Text>
            <MaterialCommunityIcons
              name="shield-star-outline"
              size={20}
              style={Styles2.textButton}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles2.viewMarginH}>
          <TouchableOpacity
            style={Styles2.buttonSair}
            onPress={() => navigation.navigate("DashboardStack")}
          >
            <Text style={Styles2.textButton}>Relatórios</Text>
            <MaterialCommunityIcons
              name="chart-timeline-variant-shimmer"
              size={20}
              style={Styles2.textButton}
            />
          </TouchableOpacity>
        </View>

        <View style={Styles2.viewMarginH}>
          <TouchableOpacity
            style={Styles2.buttonSair}
            onPress={() => navigation.navigate("SettingsStack")}
          >
            <Text style={Styles2.textButton}>Configurações</Text>
            <MaterialCommunityIcons
              name="cogs"
              size={20}
              style={Styles2.textButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Styles2 = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  viewAvatar: {
    flex: 1,
    alignItems: "center"
  },
  image: {
    height: 140,
    width: 140,
    marginTop: 25
  },
  textName: {
    color: COLORS.primary,
    marginVertical: 8,
    fontSize: 29
  },
  bg: {
    margin: 1
  },
  wallet: {
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    opacity: 0.85,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 28,
    paddingBottom: 28,
    paddingLeft: 38,
    paddingRight: 38
  },
  walletContainer: {
    margin: 8,
    borderRadius: 16
  },
  viewWallet: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: SIZES.padding
  },
  textWallet: {
    color: COLORS.white
  },
  textTittle: {
    color: COLORS.primary,
    padding: 10,
    fontSize: 24
  },
  viewMarginH: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: 5
  },
  formaIcon: {
    width: "45%",
    height: "40%",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    marginHorizontal: SIZES.padding * 1,
    marginVertical: 5
  },
  textIcon: {
    color: COLORS.white,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  icon: {
    size: 50,
    color: COLORS.white
  },
  buttonSair: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    width: "95%",
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    marginHorizontal: SIZES.padding * 1
  },
  textButton: {
    color: COLORS.white
  }
});
export default Profile;
