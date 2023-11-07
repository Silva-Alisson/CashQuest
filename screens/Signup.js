import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { register_user } from "../services/register-user-service";
import styles from "../components/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const Signup = ({ navigation }) => {
  //forms start
  const { register, setValue, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    register("nome");
    register("sobrenome");
    register("email");
    register("senha");
  }, [register]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await register_user(data);
    if (result) {
      setIsLoading(false);
      navigation.navigate("UploadProfileImgStack");
    } else {
      setIsLoading(false);
      console.log("Falha ao cadastrar, tente novamente.");
    }
  };
  //forms end

  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraHeight={Platform.OS === "android" ? 200 : 0}
      >
        <View style={{ marginHorinzontal: 22, alignItems: "center" }}>
          <Image
            source={require("../assets/cashquest.png")}
            resizeMode="contain"
            style={{
              top: 15,
              position: "absolute",
              width: 150,
              height: 80
            }}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: 22, top: 80 }}>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 5,
                color: COLORS.black
              }}
            >
              Crie Sua Conta
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black
              }}
            >
              Seu financeiro sempre ao alcance.
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8
              }}
            >
              Nome
            </Text>

            <View style={styles.input}>
              <TextInput
                label={"nome"}
                onChangeText={(text) => setValue("nome", text)}
                placeholder="Insira seu nome"
                placeholderTextColor={COLORS.grey}
                keyboardType="name-phone-pad"
                style={{
                  width: "100%"
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8
              }}
            >
              Sobrenome
            </Text>

            <View style={styles.input}>
              <TextInput
                label={"sobrenome"}
                onChangeText={(text) => setValue("sobrenome", text)}
                placeholder="Insira seu sobrenome"
                placeholderTextColor={COLORS.grey}
                keyboardType="name-phone-pad"
                style={{
                  width: "100%"
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8
              }}
            >
              E-mail
            </Text>

            <View style={styles.input}>
              <TextInput
                label={"Email"}
                onChangeText={(text) => setValue("email", text)}
                placeholder="Insira seu e-mail"
                placeholderTextColor={COLORS.grey}
                keyboardType="email-address"
                style={{
                  width: "100%"
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8
              }}
            >
              Senha
            </Text>

            <View style={styles.input}>
              <TextInput
                label={"senha"}
                onChangeText={(text) => setValue("senha", text)}
                placeholder="Insira sua senha"
                placeholderTextColor={COLORS.grey}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%"
                }}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12
                }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={{paddingBottom: 16,
              paddingVertical: 10,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.primary,
              borderWidth: 2,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center', marginTop:16}}
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <ActivityIndicator color="#BAE6BC"/>
            ) : (
              <Text style={styles.buttonText}>Confirmar</Text>
            )}
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Você já tem conta conosco ?
            </Text>
            <Pressable onPress={() => navigation.navigate("LoginStack")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: "bold",
                  marginLeft: 6
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signup;
