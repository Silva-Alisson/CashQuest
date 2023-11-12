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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/auth";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const schema = yup.object().shape({
  value: yup
    .number()
    .required()
    .test((value) => value !== 0.0),
  description: yup.string().required("Insira uma descrição")
});

const Register = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }, reset
  } = useForm({
    defaultValues: {
    description: "",
    value: 0.0,
    Comments: "",
    Installments: ""
    },
    resolver: yupResolver(schema)
  });

  const initialSelectedCategory = "Diversos";
  const initialSelectedOption = "despesa";
  const initialDate = new Date();
  const initialIsCheckedFix = false;
  const initialIsCheckedTransfer = false;

  const [selectedCategory, setSelectedCategory] = useState(
    initialSelectedCategory
  );
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
  const [date, setDate] = useState(initialDate);
  const [isCheckedFix, setIsCheckedFix] = useState(initialIsCheckedFix);
  const [isCheckedTransfer, setIsCheckedTransfer] = useState(
    initialIsCheckedTransfer
  );

  useEffect(() => {
    if (route.params && route.params.selectedCategory) {
      setSelectedCategory(route.params.selectedCategory);
    }
  }, [route.params]);

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
      const adjustedDate = startOfDay(
        addMinutes(selectedDate, selectedDate.getTimezoneOffset())
      );
      setDate(adjustedDate);
      hideDatePicker();
    } else {
      hideDatePicker();
    }
  };

  //forms
  const { authData } = useAuth();

  const onSubmitForms = async (data) => {
    const params = {
      type: selectedOption,
      token: authData.token,
      userId: authData.userId,
      category: selectedCategory,
      description: data.description,
      value: parseFloat(data.value),
      isFixed: isCheckedFix,
      comments: data.comments || "",
      createAt: date,
      installments: parseInt(data.installments) || 0,
      isTransferred: isCheckedTransfer
    };
    setIsLoading(true);
    const result = await new_resgister(params);
    if (result) {
      setIsLoading(false);
      clear();
      navigation.goBack();
    } else {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setSelectedOption(initialSelectedOption);
    setSelectedCategory(initialSelectedCategory);
    setDate(initialDate);
    setSelectedOption(initialSelectedOption);
    setIsCheckedFix(initialIsCheckedFix);
    setIsCheckedTransfer(initialIsCheckedTransfer);
    reset();
  };

  const handleGoBack = () => {
    clear();
    navigation.goBack();
  };

  //forms end
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white
      }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraHeight={Platform.OS === "android" ? 200 : 0}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: errors.value ? "#ff6961" : COLORS.white,
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
              <TouchableOpacity onPress={handleGoBack}>
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
              <Controller
                control={control}
                name="value"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInputMask
                    style={{ fontSize: 40 }}
                    placeholder="R$ 0.00"
                    type={"money"}
                    value={value}
                    options={{
                      precision: 2,
                      separator: ",",
                      delimiter: ".",
                      unit: "R$ "
                    }}
                    maxLength={18}
                    onChangeText={onChange}
                  />
                )}
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
                style={getButtonStyle("poupanca")}
                onPress={() => setSelectedOption("poupanca")}
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
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={"descricao"}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="descrição"
                    placeholderTextColor={COLORS.grey}
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              />
            </View>
            {errors.description && (
              <Text style={{ color: "#ff6961", paddingTop: 8 }}>
                {errors.description?.message}
              </Text>
            )}
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
              <Controller
                control={control}
                name="comments"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={"comments"}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="comentário..."
                    placeholderTextColor={COLORS.grey}
                    style={{
                      width: "100%"
                    }}
                  />
                )}
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
                  <Controller
                    control={control}
                    name="installments"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        label={"installments"}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        placeholder="0"
                        placeholderTextColor={COLORS.grey}
                        style={{
                          width: "100%"
                        }}
                        keyboardType="numeric"
                      />
                    )}
                  />
                  <TextInput
                    label={"quantidade"}
                    value={installments}
                    onChangeText={(text) => setInstallments(text)}
                    placeholder="0"
                    placeholderTextColor={COLORS.grey}
                    style={{
                      width: "100%"
                    }}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            ) : null}
            {selectedOption === "poupanca" ? (
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
              ) : null}
              {selectedOption === "entrada" ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "normal"
                  }}
                >
                  Você vai ganhar 30 de xp!
                </Text>
              ) : null}
              {selectedOption === "poupanca" ? (
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
                onPress={handleSubmit(onSubmitForms)}
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
                onPress={handleGoBack}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;
