import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import * as Progress from "react-native-progress";
import getWallet from "../services/wallet-service/wallet-service";
import { getPet } from "../services/pet-service/get-pet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../context/auth";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [dados, setDados] = useState([]);
  const { authData } = useAuth();
  const [dadosPet, setDadosPet] = useState([]);
  const [progress, setProgress] = useState(0.0);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      async function fetchDataPet() {
        const response = await getPet(authData.token, authData.userId);
        const arrayResponse = Object.keys(response).map(
          (chave) => response[chave]
        );
        setDadosPet(arrayResponse);
        if(arrayResponse) {
            const calcProgress = arrayResponse[1] / 500;
            setProgress(calcProgress);
        }
      }

      fetchDataPet();      

      async function fetchDataWallet() {
        const response = await getWallet(authData.token, authData.userId);
        const arrayResponse = Object.keys(response).map(
          (chave) => response[chave]
        );
        setDados(arrayResponse);
      }

      fetchDataWallet();
    }
  }, [isFocused]);

  

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: COLORS.primary,
            width: "100%",
            height: "40%",
            borderBottomEndRadius: 40,
            borderBottomStartRadius: 40,
            marginBottom: 10
          }}
        >
          <Image
            source={{ uri: dadosPet[0] }}
            resizeMode="contain"
            style={{
              height: "40%",
              width: "30%",
              margin: 25
            }}
          />
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20
            }}
          >
            {dadosPet[2]}
          </Text>

          <View style={{ alignItems: "center" }}>
            <Progress.Bar
              progress={progress}
              width={300}
              height={20}
              color={COLORS.third}
              backgroundColor={COLORS.white}
              borderRadius={15}
              borderWidth={0}
              style={{ margin: 10 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              borderRadius: 16,
              width: "90%",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: 20
              }}
            >
              <Text
                style={{
                  color: COLORS.white
                }}
              >
                {" "}
                R$ {dados[0]}
              </Text>
              <Text
                style={{
                  color: COLORS.white
                }}
              >
                Carteira
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginHorizontal: 20
              }}
            >
              <Text
                style={{
                  color: COLORS.white
                }}
              >
                R$ {dados[2]}
              </Text>
              <Text
                style={{
                  color: COLORS.white
                }}
              >
                Reservas
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 5
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 16,
              borderColor: COLORS.grey,
              borderWidth: 1
            }}
          >
            <TouchableOpacity>
              <MaterialCommunityIcons
                name={"chevron-left"}
                size={42}
                color="#000"
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "column",
                paddingHorizontal: "14%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: COLORS.black, fontSize: 36 }}>Outubro</Text>
              <Text style={{ color: COLORS.black, fontSize: 15 }}>
                Suas movimentações
              </Text>
            </View>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name={"chevron-right"}
                size={42}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <ScrollView>
            <View style={{ flexDirection: "column", margin: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.black,
                  marginBottom: 10,
                  paddingBottom: 5
                }}
              >
                <Text style={{ color: COLORS.black, fontSize: 18 }}>Hoje</Text>
                <Text style={{ color: COLORS.primary, fontSize: 18 }}>
                  +R$ 36.00
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 999,
                      backgroundColor: "#BAE6BC",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <MaterialCommunityIcons
                      name={"close"}
                      size={30}
                      color="#5DA660"
                    />
                  </View>

                  <View style={{ flexDirection: "column", paddingLeft: 10 }}>
                    <Text style={{ fontSize: 16 }}>Investimentos</Text>
                    <Text style={{ fontSize: 12 }}>
                      Ganhei no jogo do bicho
                    </Text>
                  </View>
                </View>
                <Text style={{ color: COLORS.primary, fontSize: 18 }}>
                  +R$ 52.00
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
