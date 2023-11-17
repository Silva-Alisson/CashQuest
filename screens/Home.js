import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";
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


// function DetailItem({ item }) {
//   return (
//     <View style={{ flexDirection: "column", marginVertical: 5, marginHorizontal: 10  }}>
//       <TouchableOpacity onPress={handleSelectionId(item.id)}
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           borderTopWidth: 1,
//           borderTopColor: COLORS.grey,
//           paddingTop: 10,
//           paddingHorizontal: 10
//         }}
//       >
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <View
//             style={{
//               width: 40,
//               height: 40,
//               borderRadius: 999,
//               backgroundColor: "#BAE6BC",
//               justifyContent: "center",
//               alignItems: "center"
//             }}
//           >
//             <MaterialCommunityIcons
//               name={item.iconName}
//               size={30}
//               color="#5DA660"
//             />
//           </View>

//           <View style={{ flexDirection: "column", paddingLeft: 10 }}>
//             <Text style={{ fontSize: 16 }}>{item.category}</Text>
//             <Text style={{ fontSize: 12 }}>{item.description}</Text>
//           </View>
//         </View>
//         <Text style={{ color: "#5DA660", fontSize: 18 }}>
//           {item.totalAmount}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// function DayItem({ item }) {
//   return (
//     <View
//       style={{
//         marginBottom: 10,
//         justifyContent: "center",
//         paddingVertical: 5,
//         backgroundColor: "#fff",
//         ...Platform.select({
//           android: {
//             elevation: 5,
//             backgroundColor: "#fff" // Adiciona uma cor de fundo para corrigir o problema no Android
//           },
//           ios: {
//             shadowColor: "#000",
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.3,
//             shadowRadius: 4
//           }
//         })
//       }}
//     >
//       <View style={{ marginBottom: 10, justifyContent: "center" }}>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginHorizontal: 10
//           }}
//         >
//           <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>
//             {item.day}
//           </Text>
//           <Text
//             style={{ fontSize: 20, paddingHorizontal: 10, color: COLORS.third }}
//           >
//             R$ {parseFloat(item.total).toLocaleString("pt-BR", {
//                 minimumFractionDigits: 2
//               })}
//           </Text>
//         </View>
//         <FlatList
//           data={item.details}
//           keyExtractor={(item) => item.id}
//           renderItem={DetailItem}
//         />
//       </View>
//     </View>
//   );
// }

const Home = ({ navigation }) => {

  function handleSelectionId(id) {
    navigation.navigate('Register', { registerId: id });
  }
  function DetailItem({ item }) {
    return (
      <View style={{ flexDirection: "column", marginVertical: 5, marginHorizontal: 10  }}>
        <TouchableOpacity onPress={() => handleSelectionId(item.id)}
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
              <Text style={{ fontSize: 16 }}>{item.category}</Text>
              <Text style={{ fontSize: 12 }}>{item.description}</Text>
            </View>
          </View>
          <Text style={{ color: "#5DA660", fontSize: 18 }}>
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
            <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>
              {item.day}
            </Text>
            <Text
              style={{ fontSize: 20, paddingHorizontal: 10, color: COLORS.third }}
            >
              R$ {parseFloat(item.total).toLocaleString("pt-BR", {
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
  const [currentMonthIndex, setCurrentMonthIndex] = useState(mes);

  const navigateMonth = (direction) => {
    if (direction === "next" && currentMonthIndex < months.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
      date.setMonth(currentMonthIndex + 1);
      fetchDataReports();

    } else if (direction === "prev" && currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
      date.setMonth(currentMonthIndex - 1);
      fetchDataReports();
    } 
  };

  const currentMonth = months[currentMonthIndex];

  async function fetchDataReports() {
    const response = await getReportsHome(
      authData.userId,
      date,
      authData.token
    );
    setDadosReports(response);
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      async function fetchDataPet() {
        const response = await getPet(authData.token, authData.userId);
        const arrayResponse = Object.keys(response).map(
          (chave) => response[chave]
        );
        setDadosPet(arrayResponse);
        if (arrayResponse) {
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

      fetchDataReports();
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
                R$ {parseFloat(dados[0]).toLocaleString("pt-BR", {
                minimumFractionDigits: 2
              })}
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
                R$ {parseFloat(dados[2]).toLocaleString("pt-BR", {
                minimumFractionDigits: 2
              })}
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
              <Text style={{ color: COLORS.black, fontSize: 36 }}>
                {currentMonth.name}
              </Text>
              <Text style={{ color: COLORS.black, fontSize: 15 }}>
                Suas movimentações
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigateMonth("next")}>
              <MaterialCommunityIcons
                name={"chevron-right"}
                size={42}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingBottom: 40, paddingTop: 5, maxHeight: "50%"}}>
          <FlatList
            data={dadosReports}
            keyExtractor={(item, index) => item.id}
            renderItem={DayItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;