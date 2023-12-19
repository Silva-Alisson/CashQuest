import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { PieChart, BarChart } from "react-native-svg-charts";
import * as Animatable from "react-native-animatable";
import moment from "moment-timezone";
import { useAuth } from "../context/auth";
import { getReport } from "../services/reports-service/get-grp1";
import { getSavingReport } from "../services/reports-service/poupança-report-service";

const getDatesForSearchType = (searchType) => {
  const currentDate = moment().tz("America/Sao_Paulo");
  let startDate, endDate;

  if (searchType === "week") {
    startDate = currentDate.clone().subtract(7, "days").startOf("day");
    endDate = currentDate.clone();
  } else if (searchType === "month") {
    startDate = currentDate.clone().startOf("month");
    endDate = currentDate.clone();
  } else if (searchType === "trimester") {
    startDate = currentDate.clone().subtract(3, "months").startOf("day");
    endDate = currentDate.clone();
  }

  return {
    startDate: startDate.format("YYYY-MM-DD HH:mm:ss"),
    endDate: endDate.format("YYYY-MM-DD HH:mm:ss")
  };
};

/**
 * Renders a dashboard screen in a React Native app.
 * @returns {JSX.Element} Dashboard screen component.
 */

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState("month");
  const { authData } = useAuth();
  const [dataLoaded, setDataLoaded] = useState(false);

  const [economia, setEconomia] = useState();
  const [gastos, setGastos] = useState();

  const total = economia + gastos;

  const percentualEconomia = parseFloat(((economia / total) * 100).toFixed(1));
  const percentualGastos = parseFloat(((gastos / total) * 100).toFixed(1));

  const data = [
    {
      key: 1,
      value: percentualEconomia,
      svg: { fill: "#37A11C" },
      description: "Economia"
    },
    {
      key: 2,
      value: percentualGastos,
      svg: { fill: "#F3722C" },
      description: "Gastos"
    }
  ];

  const Legend = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 100
        }}
      >
        {data.map((item, index) => (
          <View
            key={`legend-${item.key}`}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 10,
              marginLeft: 10
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: item.svg.fill,
                marginRight: 5
              }}
            />
            <Text>
              {parseFloat(item.value) ? parseFloat(item.value) + "%" : "0.0%"}{" "}
            </Text>
            <Text>{item.description}</Text>
          </View>
        ))}
      </View>
    );
  };
  const Legend2 = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 65,
          flexWrap: "wrap"
        }}
      >
        {data2.map((item, index) => (
          <View
            key={`legend-${item.key}`}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 10,
              marginLeft: 10
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: item.svg.fill,
                marginRight: 5
              }}
            />
            <Text>
              {parseFloat(item.value) ? parseFloat(item.value) + "%" : "0.0%"}{" "}
            </Text>
            <Text>{item.description}</Text>
          </View>
        ))}
      </View>
    );
  };

  const [resultData, setResultData] = useState();

  async function fetchData(startDate, endDate) {
    const data = {
      token: authData.token,
      userId: authData.userId,
      dataInicial: startDate,
      dataFinal: endDate
    };
    const response = await getReport(data);
    setResultData(response);
    if (response) {
      getTotal(response);
    }
  }

  const [resultSaving, setResultSaving] = useState();

  async function fetchDataSaving(startDate, endDate) {
    const data = {
      token: authData.token,
      userId: authData.userId,
      dataInicial: startDate,
      dataFinal: endDate
    };
    const response = await getSavingReport(data);
    setResultSaving(response);
    if (response) {
      getTotalSaving(response);
    }
  }

  const [totalDiversos, setTotalDiversos] = useState();
  const [totalEmergencia, setTotalEmergencia] = useState();
  const [totalPoupanca, setTotalPoupanca] = useState();
  const [totalFerias, setTotalFerias] = useState();
  const [totalOutros, setTotalOutros] = useState();

  const totalSaldoPoupanca =
    totalDiversos + totalEmergencia + totalPoupanca + totalFerias + totalOutros;

  const data2 = [
    {
      key: 1,
      value: Number(((totalEmergencia / totalSaldoPoupanca) * 100).toFixed(1)),
      svg: { fill: "#96E283" },
      description: "Economias de Emergência"
    },
    {
      key: 2,
      value: Number(((totalFerias / totalSaldoPoupanca) * 100).toFixed(1)),
      svg: { fill: "#1C5926" },
      description: "Poupança para Férias"
    },
    {
      key: 3,
      value: Number(((totalDiversos / totalSaldoPoupanca) * 100).toFixed(1)),
      svg: { fill: "#37A11C" },
      description: "Diversos"
    },
    {
      key: 4,
      value: Number(((totalPoupanca / totalSaldoPoupanca) * 100).toFixed(1)),
      svg: { fill: "#72C990" },
      description: "poupanças"
    },
    {
      key: 5,
      value: Number(((totalOutros / totalSaldoPoupanca) * 100).toFixed(1)),
      svg: { fill: "#8CBF94" },
      description: "Outros"
    }
  ];

  const getTotalSaving = (data) => {
    let totalEmergencia = 0;
    let totalPoupanca = 0;
    let totalFerias = 0;
    let totalDiversos = 0;
    let totalOutros = 0;

    data.forEach((item) => {
      if (item.category === "Economias de Emergência") {
        totalEmergencia += item.value;
      } else if (item.category === "Poupança") {
        totalPoupanca += item.value;
      } else if (item.category === "Poupança para Férias") {
        totalFerias += item.value;
      } else if (item.category === "Diversos") {
        totalDiversos += item.value;
      } else {
        totalOutros += item.value;
      }
    });

    setTotalDiversos(totalDiversos);
    setTotalEmergencia(totalEmergencia);
    setTotalPoupanca(totalPoupanca);
    setTotalFerias(totalFerias);
    setTotalOutros(totalOutros);
    setDataLoaded(true);
  };

  const getTotal = (data) => {
    let totalEntradas = 0;
    let totalDespesas = 0;

    data.depoists.forEach((entrada) => {
      totalEntradas += entrada.value;
    });

    data.spandings.forEach((despesa) => {
      totalDespesas += despesa.value;
    });

    setEconomia(totalEntradas);
    setGastos(totalDespesas);
    setDataLoaded(true);
  };

  useEffect(() => {
    if (!dataLoaded) {
      const { startDate, endDate } = getDatesForSearchType(activeButton);
      fetchData(startDate, endDate);
      fetchDataSaving(startDate, endDate);
    }
  }, [dataLoaded, activeButton]);

  /**
   * Updates the active button state.
   * @param {string} button - The button value.
   */

  const handleButtonPress = (buttonType) => {
    setActiveButton(buttonType);
    setDataLoaded(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.navigation}>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <AntDesign
              name="arrowleft"
              size={32}
              color={COLORS.grey}
              style={styles.navigationIcon}
            />
            <Text style={styles.navigationText}>Relatórios</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              activeButton === "week" && styles.activeButton
            ]}
            onPress={() => handleButtonPress("week")}
          >
            <Text
              style={[
                styles.buttonText,
                activeButton === "week" && styles.activeButtonText
              ]}
            >
              Semana
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              activeButton === "month" && styles.activeButton
            ]}
            onPress={() => handleButtonPress("month")}
          >
            <Text
              style={[
                styles.buttonText,
                activeButton === "month" && styles.activeButtonText
              ]}
            >
              Mês
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              activeButton === "trimester" && styles.activeButton
            ]}
            onPress={() => handleButtonPress("trimester")}
          >
            <Text
              style={[
                styles.buttonText,
                activeButton === "trimester" && styles.activeButtonText
              ]}
            >
              Trimestre
            </Text>
          </TouchableOpacity>
        </View>
        <Animatable.View delay={50} animation="fadeInUp" style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={styles.cardTitle}>Seu mês:</Text>
          </View>
          <Text style={styles.cardSubtitle}>
            quanto você economizou esse mês:
          </Text>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: COLORS.grey,
              marginBottom: 32,
              marginTop: 16,
              marginLeft: "-5%",
              marginRight: "-5%"
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {resultData && resultData.length > 0 ? (
              <View>
                <Text>Nenhum dado disponível!</Text>
              </View>
            ) : (
              <>
                <View style={{ flex: 1 }}>
                  <PieChart
                    style={{ height: 200, width: 200 }}
                    data={data}
                  ></PieChart>
                </View>
                <View style={{ flex: 1 }}>
                  <Legend />
                </View>
              </>
            )}
          </View>
        </Animatable.View>

        <Animatable.View delay={100} animation="fadeInUp" style={styles.card}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.cardTitle}>Como você poupou:</Text>
          </View>
          <Text style={styles.cardSubtitle}>
            Como você dividiu o dinheiro guardado:
          </Text>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: COLORS.grey,
              marginBottom: 16,
              marginTop: 16,
              marginHorizontal: "-5%"
            }}
          />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {resultSaving && resultSaving.length > 0 ? (
              <>
                <View style={{ flex: 1, width: "100%" }}>
                  <PieChart
                    style={{ height: 200, width: "100%" }}
                    data={data2}
                  />
                </View>
                <View style={{ flex: 1, marginTop: 10, width: "100%" }}>
                  <Legend2 />
                </View>
              </>
            ) : (
              <Text>Nenhum dado disponível!</Text>
            )}
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1
  },
  scrollView: {
    flexGrow: 1
  },
  navigation: {
    padding: 10
  },
  navigationButton: {
    flexDirection: "row",
    alignItems: "center"
  },
  navigationIcon: {
    marginRight: 10
  },
  navigationText: {
    fontSize: 18,
    color: "#676767"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 20,

    borderColor: "#676767"
  },
  activeButton: {
    backgroundColor: COLORS.primary
  },
  buttonText: {
    fontSize: 16,
    color: "#676767"
  },
  activeButtonText: {
    color: "#fff"
  },
  card: {
    margin: 20,
    width: 355,
    height: 436,
    flexShrink: 0,
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    marginTop: 16,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#676767",
    marginBottom: 20
  }
};

export default DashboardScreen;
