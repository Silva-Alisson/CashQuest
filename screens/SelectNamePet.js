import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createUserPet } from "../services/pet-service/create-pet";
import { useAuth } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as Animatable from 'react-native-animatable';

const schema = yup.object().shape({
  petname: yup.string().required("Por favor, insira um nome para seu novo pet!")
});

export default function SelectNamePet({ navigation }) {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      petname: ""
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const result = await createUserPet(data.petname);
    setIsLoading(true);
    if (result) {
      const user = await AsyncStorage.getItem("@UserData");
      const userData = JSON.parse(user);
      signIn(userData.email, userData.senha);
      await AsyncStorage.removeItem("@UserData");
      setIsLoading(false);
      reset();
    } else {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraHeight={Platform.OS === "android" ? 200 : 0}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10
          }}
        >
          <Text style={styles.title}>Qual o nome do seu novo pet?</Text>
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 22,
            alignItems: "center",
            justifyContent: "center",
            gap: 43
          }}
        >
          <View style={{}}>
            <View style={styles.photoView}>
              <Image
                source={require("../assets/egg.png")}
                style={styles.photo}
              />
            </View>
          </View>
          <Animatable.View delay={50} animation="fadeInUp" style={{ marginBottom: 10, width: "100%" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: errors.petname ? "#ff6961" : null
              }}
            >
              Nome
            </Text>

            <View
              style={[
                styles.input,
                { borderColor: errors.petname ? "#ff6961" : null }
              ]}
            >
              <Controller
                control={control}
                name="petname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={"petname"}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="Insira o novo nome"
                    placeholderTextColor={COLORS.grey}
                    style={{
                      width: "100%",
                      height: "100%"
                    }}
                  />
                )}
              />
            </View>
          </Animatable.View>
          {errors.petname && (
            <Text style={{ color: "#ff6961", paddingTop: 8 }}>
              {errors.petname?.message}
            </Text>
          )}
          <Animatable.View delay={150} animation="fadeInUp"
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 16,
              marginVertical: 16
            }}
          >
            <TouchableOpacity
              style={styles.button}
              disabled={isLoading}
              onPress={handleSubmit(onSubmit)}
            >
              {isLoading ? (
                <ActivityIndicator color="#BAE6BC" />
              ) : (
                <Text style={[styles.buttonText, { color: COLORS.white }]}>
                  Confirmar
                </Text>
              )}
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  containerTitulo: {
    margin: 10
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10
  },
  category: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 10
  },
  button: {
    width: "100%",
    paddingBottom: 16,
    paddingVertical: 10,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 150,
    backgroundColor: "white"
  },
  photoView: {
    width: 287,
    height: 287,
    borderRadius: 200,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center"
  },
  photo: {
    width: 217,
    height: 287,
    borderRadius: 200
  },
  text: {
    fontSize: 12
  }
});
