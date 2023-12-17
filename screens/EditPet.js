import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { getPet } from "../services/pet-service/get-pet";
import { useAuth } from "../context/auth";
import * as Animatable from "react-native-animatable";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useIsFocused } from "@react-navigation/native";
import { updatePet } from "../services/pet-service/update-pet-service";

const schema = yup.object().shape({
  petname: yup.string().required("Por favor, insira um nome para seu novo pet!")
});

export default function EditPet({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      petname: ""
    },
    resolver: yupResolver(schema)
  });
  const [dadosPet, setDadosPet] = useState([]);
  const { authData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchData() {
      const response = await getPet(authData.token, authData.userId);
      setDadosPet(response);
      setValue("petname", response.name);
    }

    fetchData();
  }, [isFocused]);

  const back = () => {
    reset();
    setDadosPet();
    navigation.goBack();
  };

  const handleUpdateData = async (data) => {
    setIsLoading(true);
    console.log(authData.token);
    const dataPet = {
      token: authData.token,
      petId: dadosPet.id,
      pateName: data.petname
    };

    const result = await updatePet(dataPet);
    if (result) {
      setIsLoading(false);
      back();
    } else {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/fundo-figma.png")}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.transparent }}>
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
            <TouchableOpacity onPress={back}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={40}
                color="black"
              />
            </TouchableOpacity>
            <Text style={{ marginLeft: 10 }}>Editar nome do pet</Text>
          </View>
          <View
            style={{
              width: 287,
              height: 287,
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50%",
              marginHorizontal: 10,
              marginLeft: "15%"
            }}
          >
            <Image
              source={{ uri: dadosPet ? dadosPet.photo : null }}
              style={{
                width: 217,
                height: 287
              }}
            />
          </View>

          <Animatable.View
            delay={50}
            animation="fadeInUp"
            style={{ marginHorizontal: 10, marginTop: 30 }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.white
              }}
            >
              Nome
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.white,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22
              }}
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
                      height: "100%",
                      color: COLORS.white
                    }}
                  />
                )}
              />
            </View>
            {errors.petname && (
              <Text style={{ color: "#ff6961", paddingTop: 8 }}>
                {errors.petname?.message}
              </Text>
            )}
          </Animatable.View>
          <View
            style={{
              width: 370,
              marginHorizontal: 10
            }}
          >
            <Animatable.View delay={150} animation="fadeInLeft">
              <TouchableOpacity
                style={{
                  width: "100%",
                  paddingVertical: 10,
                  borderColor: COLORS.white,
                  backgroundColor: COLORS.white,
                  borderWidth: 2,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 30
                }}
                disabled={isLoading}
                onPress={handleSubmit(handleUpdateData)}
              >
                {isLoading ? (
                  <ActivityIndicator color="#BAE6BC" />
                ) : (
                  <Text style={[{ color: COLORS.primary }]}>Confirmar</Text>
                )}
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
