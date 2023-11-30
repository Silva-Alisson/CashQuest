import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import * as Progress from "react-native-progress";
import getWallet from "../services/wallet-service/wallet-service";
import { getPet } from "../services/pet-service/get-pet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../context/auth";
import { useIsFocused } from "@react-navigation/native";
import getReportsHome from "../services/reports-service/get-monthly-report-home";
import { checkNivel } from "../services/pet-service/check-nivel-service";
import { useModal } from "../context/modalContext";
import moment from "moment-timezone";

const Home = ({ navigation }) => {
  function handleSelectionId(id, type) {
    navigation.navigate("Register", { registerId: id, registerType: type });
  }
  function DetailItem({ item }) {
    return (
      <View
        style={{
          flexDirection: "column",
          marginVertical: 5,
          marginHorizontal: 10
        }}
      >
        <TouchableOpacity
          onPress={() => handleSelectionId(item.id, item.type)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderTopWidth: 1,
            borderTopColor: COLORS.grey,
            paddingTop: 10,
            paddingHorizontal: 10
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
                name={item.iconName}
                size={30}
                color="#5DA660"
              />
            </View>

            <View style={{ flexDirection: "column", paddingLeft: 10 }}>
              <Text style={{ fontSize: 16, color: COLORS.greyDark }}>
                {item.category}
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.greyDark }}>
                {item.description}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: item.totalAmount.includes("-")
                ? COLORS.greyDark
                : "#5DA660",
              fontSize: 18
            }}
          >
            {item.totalAmount}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function DayItem({ item }) {
    return (
      <View
        style={{
          marginBottom: 10,
          justifyContent: "center",
          paddingVertical: 5,
          backgroundColor: "#fff",
          ...Platform.select({
            android: {
              elevation: 5,
              backgroundColor: "#fff" // Adiciona uma cor de fundo para corrigir o problema no Android
            },
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4
            }
          })
        }}
      >
        <View style={{ marginBottom: 10, justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                paddingHorizontal: 10,
                color: COLORS.darkBlue
              }}
            >
              {item.day}
            </Text>
            <Text
              style={{
                fontSize: 20,
                paddingHorizontal: 10,
                color: item.total < 0 ? COLORS.greyDark : COLORS.third
              }}
            >
              R${" "}
              {parseFloat(item.total).toLocaleString("pt-BR", {
                minimumFractionDigits: 2
              })}
            </Text>
          </View>
          <FlatList
            data={item.details}
            keyExtractor={(item) => item.id}
            renderItem={DetailItem}
          />
        </View>
      </View>
    );
  }

  const [dados, setDados] = useState([]);
  const { authData } = useAuth();
  const [dadosPet, setDadosPet] = useState([]);
  const [progress, setProgress] = useState(0.0);
  const [dadosReports, setDadosReports] = useState([]);

  const months = [
    { name: "Janeiro", id: 1 },
    { name: "Fevereiro", id: 2 },
    { name: "Março", id: 3 },
    { name: "Abril", id: 4 },
    { name: "Maio", id: 5 },
    { name: "Junho", id: 6 },
    { name: "Julho", id: 7 },
    { name: "Agosto", id: 8 },
    { name: "Setembro", id: 9 },
    { name: "Outubro", id: 10 },
    { name: "Novembro", id: 11 },
    { name: "Dezembro", id: 12 }
  ];

  const date = new Date();
  const mes = date.getMonth();
  const year = date.getFullYear();
  const currentDay = date.getDate();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(mes);
  const [currentYear, setCurrentYear] = useState(year);
  const { handleShowModal } = useModal();

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const navigateMonth = (direction) => {
    let newMonthIndex = currentMonthIndex;
    let newYear = currentYear;
    if (direction === "next") {
      newMonthIndex = currentMonthIndex < 11 ? currentMonthIndex + 1 : 0;
      newYear = currentMonthIndex === 11 ? currentYear + 1 : currentYear;
    } else if (direction === "prev") {
      newMonthIndex = currentMonthIndex > 0 ? currentMonthIndex - 1 : 11;
      newYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;
    }

    const lastDayOfMonth = getLastDayOfMonth(newYear, newMonthIndex);
    const newDay = newMonthIndex != mes ? lastDayOfMonth : currentDay;

    date.setMonth(newMonthIndex);
    date.setYear(newYear);
    date.setDate(newDay);

    setCurrentMonthIndex(newMonthIndex);
    setCurrentYear(newYear);
    fetchDataReports();
  };

  const currentMonth = months[currentMonthIndex];
  async function fetchDataReports() {
    const stringDate = moment(date)
      .tz("America/Sao_Paulo")
      .format("YYYY-MM-DD HH:mm:ss");
      console.log(stringDate);
    const response = await getReportsHome(
      authData.userId,
      stringDate,
      authData.token
    );
    console.log({response});
    setDadosReports(response);
  }

  const isFocused = useIsFocused();

  async function showModalNivel(response) {
    if (response) {
      handleShowModal({
        text1: "Parabéns!",
        text2: "Nivel " + dadosPet[3] + " alcançado."
      });
    }
  }

  useEffect(() => {
    if (isFocused) {
      async function fetchDataPet() {
        const response = await getPet(authData.token, authData.userId);
        const arrayResponse = Object.keys(response).map(
          (chave) => response[chave]
        );
        setDadosPet(arrayResponse);
        if (arrayResponse) {
          while (arrayResponse[1] > 500) {
            arrayResponse[1] -= 500;
          }
          const progress = arrayResponse[1] / 500;
          setProgress(progress);
          const nivelResponse = await checkNivel({ nivel: arrayResponse[3] });
          showModalNivel(nivelResponse);
        }
      }
      fetchDataPet();

      async function fetchDataWallet() {
        const response = await getWallet(authData.token, authData.userId);
        console.log(response);
        console.log(response.savings);
        setDados(response);
      }

      fetchDataWallet();

      fetchDataReports();
      setCurrentMonthIndex(mes);
      setCurrentYear(year);
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
                R${" "}
                {dados.totalDeposits
                  ? parseFloat(dados.totalDeposits).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2
                    })
                  : 0.0}
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
                R${" "}
                {dados.savings
                  ? parseFloat(dados.savings).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2
                    })
                  : 0.0}
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
            marginTop: 2
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              backgroundColor: COLORS.white,
              width: 380,

              ...Platform.select({
                android: {
                  elevation: 5,
                  backgroundColor: "#fff" // Adiciona uma cor de fundo para corrigir o problema no Android
                },
                ios: {
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 4
                }
              })
            }}
          >
            <TouchableOpacity onPress={() => navigateMonth("prev")}>
              <MaterialCommunityIcons
                name={"chevron-left"}
                size={42}
                color="#5D5D5F"
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "column",
                paddingHorizontal: "14%",
                alignItems: "center",
                justifyContent: "center",
                width: 300,
                padding: 5
              }}
            >
              <Text style={{ color: COLORS.darkBlue, fontSize: 22 }}>
                {currentMonth.name + " de " + currentYear}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 15,
                  color: COLORS.greyDark
                }}
              >
                Suas movimentações
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigateMonth("next")}>
              <MaterialCommunityIcons
                name={"chevron-right"}
                size={42}
                color="#5D5D5F"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingBottom: 40, paddingTop: 5, maxHeight: "50%" }}>
          {dadosReports[0] ? (
            <FlatList
              data={dadosReports}
              keyExtractor={(item, index) => item.id}
              renderItem={DayItem}
            />
          ) : (
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                padding: 100,
                color: COLORS.greyDark
              }}
            >
              Sem movimentações
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
