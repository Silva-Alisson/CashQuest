import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import DunutChart from "./DunutChart";
import PieChartComponent from "./PieChart";
import * as Animatable from "react-native-animatable";

import moment from "moment-timezone";
import { useAuth } from "../../context/auth";
import { getReport } from "../../services/reports-service/get-grp1";

const getDatesForSearchType = (searchType) => {
  const currentDate = moment().tz("America/Sao_Paulo");
  let startDate, endDate;

  if (searchType === "week") {
    startDate = currentDate.subtract(7, "days").startOf("day");
    endDate = currentDate;
  } else if (searchType === "month") {
    startDate = currentDate.startOf("month");
    endDate = currentDate;
  } else if (searchType === "trimester") {
    startDate = currentDate.subtract(3, "months").startOf("day");
    endDate = currentDate;
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

  const isFocused = useIsFocused();

  async function fetchData(startDate, endDate) {
    const data = {
      token: authData.token,
      userId: authData.userId,
      dataInicial: startDate,
      dataFinal: endDate
    };
    const response = await getReport(data);
    if (response) {
      getTotal(response);
    }
  }

  const [income, setIncome] = useState();
  const [outcome, setOutcome] = useState();

  const getTotal = (data) => {
    let totalEntradas = 0;
    let totalDespesas = 0;

    data.depoists.forEach((entrada) => {
      totalEntradas += entrada.value;
    });

    data.spandings.forEach((despesa) => {
      totalDespesas += despesa.value;
    });

    setIncome(totalEntradas);
    setOutcome(totalDespesas);
    setDataLoaded(true);
  };

  useEffect(() => {
    if (!dataLoaded) {
      const { startDate, endDate } = getDatesForSearchType(activeButton);
      fetchData(startDate, endDate);
    }
  }, [dataLoaded, activeButton]);

  const chartData = [
    { label: "Economias de emergência", value: 50, color: "#96E283" },
    { label: "Poupança", value: 30, color: "#72C990" },
    { label: "Poupança para férias", value: 20, color: "#1C5926" }
  ];
  /**
   * Updates the active button state.
   * @param {string} button - The button value.
   */
  const handleButtonPress = (buttonType) => {
    setActiveButton(buttonType);
    setDataLoaded(false);
  };

  const dunutData = [50, 10, 40];

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
        <Animatable.View delay={100} animation="fadeInUp" style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={styles.cardTitle}>Seu mês:</Text>
            <MaterialIcons
              name="info"
              size={38}
              color={COLORS.grey}
              style={{ position: "absolute", top: 0, right: 0 }}
            />
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
          <PieChartComponent data={{ income: income, outcome: outcome }} />
        </Animatable.View>

        <Animatable.View delay={200} animation="fadeInUp" style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={styles.cardTitle}>Como você gastou:</Text>
            <MaterialIcons
              name="info"
              size={38}
              color={COLORS.grey}
              style={{ position: "absolute", top: 0, right: 0 }}
            />
          </View>
          <Text style={styles.cardSubtitle}>
            Saiba para onde está indo o seu dinheiro
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
          {/* Add the gauge chart component here */}
          <DunutChart />
        </Animatable.View>

        <Animatable.View delay={300} animation="fadeInUp" style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={styles.cardTitle}>Como você poupou:</Text>
            <MaterialIcons
              name="info"
              size={38}
              color={COLORS.grey}
              style={{ position: "absolute", top: 0, right: 0 }}
            />
          </View>
          <Text style={styles.cardSubtitle}>
            Como você dividiu o dinheiro guardado
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
          <DunutChart data={chartData} />
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
