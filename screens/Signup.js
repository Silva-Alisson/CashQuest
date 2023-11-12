import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { register_user } from "../services/register-user-service";
import styles from "../components/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  nome: yup.string().required(),
  sobrenome: yup.string().required(),
  email: yup.string().email("Insira um email válido").required("Insira um e-mail"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
    )
    .required("insira uma senha")
});
const Signup = ({ navigation }) => {
  //forms start
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      password: ""
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await register_user(data);
    if (result) {
      setIsLoading(false);
      reset();
      navigation.navigate("UploadProfileImgStack");
    } else {
      setIsLoading(false);
      console.log("Falha ao cadastrar, tente novamente.");
    }
  };
  //forms end

  const [isPasswordShown, setIsPasswordShown] = useState(true);
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
                marginVertical: 8,
                color: errors.password ? "#ff6961" : null
              }}
            >
              Nome
            </Text>

            <View
              style={[
                styles.input,
                { borderColor: errors.nome ? "#ff6961" : null }
              ]}
            >
              <Controller
                control={control}
                name="nome"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={"nome"}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Insira seu nome"
                    placeholderTextColor={COLORS.grey}
                    keyboardType="name-phone-pad"
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              />
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: errors.password ? "#ff6961" : null
              }}
            >
              Sobrenome
            </Text>

            <View
              style={[
                styles.input,
                { borderColor: errors.sobrenome ? "#ff6961" : null }
              ]}
            >
              <Controller
                control={control}
                name="sobrenome"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={"sobrenome"}
                    onBlur={onBlur}
                    valur={value}
                    onChangeText={onChange}
                    placeholder="Insira seu sobrenome"
                    placeholderTextColor={COLORS.grey}
                    keyboardType="name-phone-pad"
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              />
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: errors.password ? "#ff6961" : null
              }}
            >
              E-mail
            </Text>

            <View
              style={[
                styles.input,
                { borderColor: errors.sobrenome ? "#ff6961" : null }
              ]}
            >
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={"Email"}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Insira seu e-mail"
                    placeholderTextColor={COLORS.grey}
                    keyboardType="email-address"
                    style={{
                      width: "100%"
                    }}
                  />
                )}
              />
            </View>
            {errors.email && (
              <Text style={{ color: "#ff6961", paddingTop: 8 }}>
                {errors.email?.message}
              </Text>
            )}
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: errors.password ? "#ff6961" : null
              }}
            >
              Senha
            </Text>

            <View style={[
              styles.input,
              { borderColor: errors.password ? "#ff6961" : null }
            ]}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={"senha"}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Insira sua senha"
                    placeholderTextColor={COLORS.grey}
                    secureTextEntry={isPasswordShown}
                    style={{
                      width: "100%"
                    }}
                  />
                )}
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
            {errors.password && (
              <Text style={{ color: "#ff6961", paddingTop: 8 }}>
                {errors.password?.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={{
              paddingBottom: 16,
              paddingVertical: 10,
              borderColor: COLORS.primary,
              backgroundColor: COLORS.primary,
              borderWidth: 2,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 16
            }}
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <ActivityIndicator color="#BAE6BC" />
            ) : (
              <Text style={{color: COLORS.white}}>Confirmar</Text>
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
            <Pressable onPress={() => {navigation.navigate("LoginStack");
          reset()}}>
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
