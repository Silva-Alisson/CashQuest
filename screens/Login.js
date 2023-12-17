import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import styles from "../components/styles";
import { useAuth } from "../context/auth";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as Animatable from 'react-native-animatable';

const schema = yup.object().shape({
  email: yup.string().email("Insira um email válido").required("Insira um e-mail"),
  password: yup
    .string()
    .required("insira uma senha")
});

const Login = ({ navigation }) => {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: yupResolver(schema)
  });

  const [errorLogin, setErrorLogin] = useState(false);

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      const login = await signIn(data.email, data.password);
      if (login) {
        setIsLoading(false);
        reset();
      }
    } catch (error) {
      setIsLoading(false);
      setErrorLogin(true);
    }
  };

  const [isPasswordShown, setIsPasswordShown] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Animatable.View delay={50} animation="fadeInUp"
      style={{ marginHorinzontal: 22, alignItems: "center" }}>
        <Image
          source={require("../assets/Group28.png")}
          resizeMode="contain"
          style={{
            position: "absolute",
            top: 60,
            width: 150,
            height: 80
          }}
        />
      </Animatable.View>
      <View style={{ flex: 1, marginHorizontal: 22, top: 120 }}>
        <Animatable.View
          animation="fadeInUp"
          delay={100}
          style={{ marginVertical: 25 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.black
            }}
          >
            Olá, bem-vindo de volta ! 👋
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black
            }}
          >
            Olá novamente, você fez falta!
          </Text>
        </Animatable.View>

        <Animatable.View 
        animation="fadeInUp"
        delay={150}
        style={{ marginBottom: 12 }}
        >
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
              { borderColor: errors.email ? "#ff6961" : null }
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
        </Animatable.View>

        <Animatable.View 
          animation="fadeInUp"
          delay={200}
          style={{ marginBottom: 12 
        }}>
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
          <View
            style={[
              styles.input,
              { borderColor: errors.password ? "#ff6961" : null }
            ]}
          >
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
        </Animatable.View>

        {errors.password && (
          <Text style={{ color: "#ff6961", paddingTop: 8 }}>
            {errors.password?.message}
          </Text>
        )}
        {errorLogin && (
          <Text
            style={{ color: "#ff6961", paddingTop: 8, textAlign: "center" }}
          >
            Algo está errado. Por favor tente novamente!
          </Text>
        )}

        <Animatable.View
        animation="fadeInUp"
        delay={400}
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
            justifyContent: "center",
            marginTop: 16
          }}
          disabled={isLoading}
          onPress={handleSubmit(handleLogin)}
        >
          {isLoading ? (
            <ActivityIndicator color="#BAE6BC" />
          ) : (
            <Text style={{color: COLORS.white}}>Entrar</Text>
          )}
        </TouchableOpacity>
      
        </Animatable.View>

        <Animatable.View
        animation="fadeInUp"
        delay={500}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 22
        }}
      >
        <Text style={{ fontSize: 16, color: COLORS.black }}>
          Não tem uma conta ?{" "}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("SignupStack");
            reset();
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: "bold",
              marginLeft: 6
            }}
          >
            Registre-se
          </Text>
        </Pressable>
      </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
