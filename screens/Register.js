import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import Button from "../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../components/styles";
import Checkbox from "expo-checkbox";
import { format, startOfDay, addMinutes } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";
import { new_resgister } from "../services/register-service/new-register";
import {useAuth} from '../context/auth';

const Register = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState("Diversos");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (route.params && route.params.selectedCategory) {
      setSelectedCategory(route.params.selectedCategory);
    }
  }, [route.params]);

  const [selectedOption, setSelectedOption] = useState("despesa");

  const getButtonStyle = (option) => {
    return {
      borderWidth: 1,
      borderColor: option === selectedOption ? COLORS.white : COLORS.white,
      backgroundColor:
        option === selectedOption ? COLORS.primary : COLORS.secondary,
      borderRadius: 22,
      width: "25%",
      padding: 3,
      margin: 5,
      alignItems: "center",
      justifyContent: "center"
    };
  };

  const [value, setValues] = useState();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const formattedDate = format(date, "dd/MM/yy");

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const hideDatePicker = () => {
    setShowPicker(false); 
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const adjustedDate = startOfDay(addMinutes(selectedDate, selectedDate.getTimezoneOffset()));
      setDate(adjustedDate);
      hideDatePicker();
    } else {
      hideDatePicker();
    }
  };

  const [isCheckedFix, setIsCheckedFix] = useState(false);
  const [isCheckedTransfer, setIsCheckedTransfer] = useState(false);
  
 //forms
  const {authData} = useAuth();

  const [description, setValueDescription] = useState();
  const [comments, setValueComments] = useState();
  const [installments, setValuesInstallments] = useState();

  const onSubmitForms = async () => {
    console.log(date);
    const params = {
      type: selectedOption,
      token: authData.token,
      userId: authData.userId,
      category: selectedCategory,
      description: description ,
      value: value,
      isFixed: isCheckedFix,
      comments: comments || "",
      createAt: date,
      installments: installments || 0,
      isTransferred: isCheckedTransfer
    }
    setIsLoading(true);
    const result = await new_resgister(params);
    if (result) {
      setIsLoading(false);
      navigation.goBack({ force: true });
    } else {
      setIsLoading(false);
    }
  };

  //forms end
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
            backgroundColor: COLORS.white,
            width: "100%",
            borderBottomStartRadius: 42,
            borderBottomEndRadius: 42,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.35,
            shadowRadius: 3.84,
            elevation: 8
          }}
        >
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
                color="black"
              />
            </TouchableOpacity>
            <Text style={{ marginLeft: 10 }}>Nova Transação</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 12
            }}
          >
            <Text style={{ fontSize: 20 }}>R$ </Text>
            <TextInput
              style={{ fontSize: 40 }}
              value={value}
              onChangeText={(text) => setValues(text)}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 10
            }}
          >
            <TouchableOpacity
              style={getButtonStyle("despesa")}
              onPress={() => setSelectedOption("despesa")}
            >
              <Text>Despesa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getButtonStyle("entrada")}
              onPress={() => setSelectedOption("entrada")}
            >
              <Text>Entrada</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getButtonStyle("poupança")}
              onPress={() => setSelectedOption("poupança")}
            >
              <Text>Poupança</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginHorizontal: 22, marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "normal",
              marginVertical: 8
            }}
          >
            Categoria
          </Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => navigation.navigate("CategoriesStack")}
          >
            <TextInput
              placeholder={selectedCategory}
              style={{
                width: "100%"
              }}
              editable={false}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "normal",
              marginVertical: 8
            }}
          >
            Descrição
          </Text>

          <View style={styles.input}>
            <TextInput
              label={"descricao"}
              onChangeText={(text) => setValueDescription(text)}
              placeholder="descrição"
              placeholderTextColor={COLORS.grey}
              style={{
                width: "100%"
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "normal",
              marginVertical: 8
            }}
          >
            Data
          </Text>

          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Text
              placeholderTextColor={COLORS.grey}
              style={{
                width: "100%"
              }}
            >
              {formattedDate}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              is24Hour={true}
              minimumDate={new Date("1900-01-00")}
              maximumDate={new Date("2100-01-00")}
              onChange={handleDateChange}
            />
          )}

          <Text
            style={{
              fontSize: 16,
              fontWeight: "normal",
              marginVertical: 8
            }}
          >
            Comentário
          </Text>

          <View style={styles.input}>
            <TextInput
              label={"comentario"}
              onChangeText={(text) => setValueComments(text)}
              placeholder="comentário..."
              placeholderTextColor={COLORS.grey}
              style={{
                width: "100%"
              }}
            />
          </View>
          <View
            style={{
              marginTop: 16,
              flexDirection: "row",
              marginVertical: 6,
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "normal"
              }}
            >
              Transação fixa
            </Text>
            <Checkbox
              style={{ marginRight: 8, borderRadius: 18 }}
              value={isCheckedFix}
              onValueChange={setIsCheckedFix}
              color={isCheckedFix ? COLORS.primary : undefined}
            />
          </View>
          {isCheckedFix ? (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "normal",
                  marginVertical: 8
                }}
              >
                Quantidade
              </Text>

              <View style={styles.input}>
                <TextInput
                  label={"quantidade"}
                  onChangeText={(text) => setValuesInstallments(text)}
                  placeholder="0"
                  placeholderTextColor={COLORS.grey}
                  style={{
                    width: "100%"
                  }}
                />
              </View>
            </View>
          ) : null}
          {selectedOption === "poupança" ? (
            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
                marginVertical: 6,
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "normal"
                }}
              >
                É uma transferência:
              </Text>
              <Checkbox
                style={{ marginRight: 8, borderRadius: 18 }}
                value={isCheckedTransfer}
                onValueChange={setIsCheckedTransfer}
                color={isCheckedTransfer ? COLORS.primary : undefined}
              />
            </View>
          ) : null}
          {selectedOption === "despesa" ? (
            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
                marginVertical: 6,
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "normal"
                }}
              >
                Retirado da poupança:
              </Text>
              <Checkbox
                style={{ marginRight: 8, borderRadius: 18 }}
                value={isCheckedTransfer}
                onValueChange={setIsCheckedTransfer}
                color={isCheckedTransfer ? COLORS.primary : undefined}
              />
            </View>
          ) : null}
          <View
            style={{
              marginTop: 16,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {selectedOption === "despesa" ? (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "normal"
                }}
              >
                Você vai ganhar 60 de xp!
              </Text>
            ) : selectedOption === "entrada" ? (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "normal"
                }}
              >
                Você vai ganhar 30 de xp!
              </Text>
            ) : selectedOption === "poupança" ? (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "normal"
                }}
              >
                Você vai ganhar 45 de xp!
              </Text>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 16,
              marginVertical: 16
            }}
          >
            <TouchableOpacity
              style={{
                paddingBottom: 16,
                paddingVertical: 10,
                borderColor: COLORS.primary,
                backgroundColor: COLORS.primary,
                borderWidth: 2,
                borderRadius: 12,
                alignItems: "center",
                width: 120,
                justifyContent: "center",
                marginTop: 16
              }}
              disabled={isLoading}
              onPress={onSubmitForms}
            >
              {isLoading ? (
                <ActivityIndicator color="#BAE6BC" />
              ) : (
                <Text style={styles.buttonText}>Confirmar</Text>
              )}
            </TouchableOpacity>

            <Button
              title="Cancelar"
              filled
              style={{
                padding: 16,
                width: 120,
                height: 60,
                backgroundColor: "#fff",
                color: COLORS.primary
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
