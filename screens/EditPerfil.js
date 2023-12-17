import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useIsFocused } from "@react-navigation/native";
import { get_user_photo } from "../services/user-service/get-user-photo";
import { get_user_data } from "../services/user-service/get-user-name-service";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { update_user } from "../services/user-service/update-user-service";
import { update_use_photo } from "../services/upload-user-photo-service/update-photo-service";
import * as Animatable from "react-native-animatable";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../database/firebaseConfig";

const schema = yup.object().shape({
  nome: yup.string().required(),
  sobrenome: yup.string().required(),
  email: yup
    .string()
    .email("Insira um email válido")
    .required("Insira um e-mail")
});

const EditPerfil = ({ navigation }) => {
  const { authData } = useAuth();
  const isFocused = useIsFocused();
  const [uri, setUri] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [photoId, setPhotoId] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: ""
    },
    resolver: yupResolver(schema)
  });
  useEffect(() => {
    if (isFocused) {
      async function fetchPhoto() {
        const response = await get_user_photo({
          token: authData.token,
          userId: authData.userId
        });
        setUri(response.userPhoto);
        setPhotoId(response.id);
      }

      async function fetchUserData() {
        const response = await get_user_data({
          token: authData.token,
          userId: authData.userId
        });
        setValue("nome", response.firstName);
        setValue("sobrenome", response.lastName);
        setValue("email", response.email);
      }

      fetchUserData();

      fetchPhoto();
    }
  }, [isFocused]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      setUri(result.assets[0].uri);
    }
  };

  const [progress, setProgress] = useState(0);
  const [errorUpload, setErrorUpload] = useState(false);
  async function uploadImage(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "userProfile/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress.toFixed());
      },
      (error) => {
        setErrorUpload(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const result = await update_use_photo({
            url: downloadURL,
            token: authData.token,
            userId: authData.userId,
            photoId: photoId
          });
          if (result) {
            setIsLoading(false);
            cancelar();
          } else {
            setIsLoading(false);
            setErrorUpload(true);
          }
        });
      }
    );
  }

  const handleLoadData = async (data) => {
    setIsLoading(true);
    await update_user({
      token: authData.token,
      userId: authData.userId,
      data: data});
    if (uri) {
      await uploadImage(uri);
    } else {
      const result = await UploadUserPhotoService(
        "https://firebasestorage.googleapis.com/v0/b/cashquest-a60d0.appspot.com/o/userProfile%2FGroup%202110.png?alt=media&token=ee3d13c9-2ba5-4962-9c5c-2578ee19892b"
      );
      if (result) {
        setIsLoading(false);
        cancelar();
      } else {
        setIsLoading(false);
        setErrorUpload(true);
      }
    }
  };

  const cancelar = () => {
    setUri();
    reset();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10 }}>Editar informações do Perfil</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              paddingTop: 20
            }}
          >
            <Image
              source={{ uri: uri }}
              style={{
                width: 140,
                height: 140,
                borderRadius: 999,
                alignItems: "center",
                justifyContent: "center"
              }}
            />
            <View style={{ flexDirection: "row", position: "absolute" }}>
              <TouchableOpacity style={{ marginRight: 5 }} onPress={pickImage}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={42}
                  color="green"
                />
              </TouchableOpacity>

              <TouchableOpacity style={{ marginLeft: 5 }}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={42}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, marginHorizontal: 22, top: 20 }}>
            <Animatable.View
              delay={50}
              animation="fadeInUp"
              style={{ marginBottom: 10 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                  color: COLORS.greyDark
                }}
              >
                Nome
              </Text>

              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                  borderColor: errors.nome ? "#ff6961" : COLORS.greyDark
                }}
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
            </Animatable.View>

            <Animatable.View
              delay={100}
              animation="fadeInUp"
              style={{ marginBottom: 10 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                  color: COLORS.greyDark
                }}
              >
                Sobrenome
              </Text>

              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                  borderColor: errors.sobrenome ? "#ff6961" : COLORS.greyDark
                }}
              >
                <Controller
                  control={control}
                  name="sobrenome"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={"sobrenome"}
                      onBlur={onBlur}
                      value={value}
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
            </Animatable.View>

            <Animatable.View
              delay={150}
              animation="fadeInUp"
              style={{ marginBottom: 10 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                  color: COLORS.greyDark
                }}
              >
                E-mail
              </Text>

              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                  borderColor: errors.sobrenome ? "#ff6961" : COLORS.greyDark
                }}
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
            </Animatable.View>

            {errorUpload && (
              <Text
                style={{ color: "#ff6961", paddingTop: 8, textAlign: "center" }}
              >
                Falha ao alterar informações, por favor tente novamente.
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Animatable.View delay={150} animation="fadeInLeft">
              <TouchableOpacity
                style={{
                  margin: 10,
                  paddingVertical: 16,
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
                onPress={handleSubmit(handleLoadData)}
              >
                {isLoading ? (
                  <ActivityIndicator color="#BAE6BC" />
                ) : (
                  <Text style={[{ color: COLORS.white }]}>Confirmar</Text>
                )}
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View delay={150} animation="fadeInRight">
              <TouchableOpacity
                style={{
                  margin: 10,
                  paddingVertical: 16,
                  borderColor: COLORS.primary,
                  backgroundColor: COLORS.white,
                  borderWidth: 2,
                  borderRadius: 12,
                  alignItems: "center",
                  width: 120,
                  justifyContent: "center",
                  marginTop: 16
                }}
                onPress={cancelar}
              >
                <Text style={{ color: COLORS.primary }}>Cancelar</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditPerfil;
