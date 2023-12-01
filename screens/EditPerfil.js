import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
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

const EditPerfil = ({ navigation }) => {
  const { authData } = useAuth();
  const isFocused = useIsFocused();
  const [userPhoto, setUserPhoto] = useState();
  const [userData, setUserData] = useState();
  const [image, setImage] = useState(null);
  const [uri, setUri] = useState();

  
  useEffect(() => {
    if (isFocused) {
      async function fetchPhoto() {
        const response = await get_user_photo({
          token: authData.token,
          userId: authData.userId
        });
        setUserPhoto(response.userPhoto);
      }

      async function fetchUserData() {
        const response = await get_user_data({
          token: authData.token,
          userId: authData.userId
        });
        setUserData(response);
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
      setImage(result.assets[0].uri);
      setUri(result.assets[0].uri);
    }
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
              paddingTop: 20
            }}
          >
           
           
            <Image
              source={{ uri: userPhoto }}
              style={{
                width: 90,
                height: 90,
                borderRadius: 999
              }}
            />
             <View style={{flexDirection: "row",position: 'absolute', top: 54,left: 160}}>
              <TouchableOpacity style={{marginRight: 5}} onPress={pickImage}>
                  <MaterialCommunityIcons name="pencil-outline" size={32} color="green" />
              </TouchableOpacity>
              
              <TouchableOpacity style={{marginLeft: 5}}>
                  <MaterialCommunityIcons name="trash-can-outline" size={32} color="red" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, marginHorizontal: 22, top: 20 }}>
            <View style={{ marginBottom: 10 }}>
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
                  borderColor: COLORS.greyDark,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22
                }}
              >
                <TextInput
                  label={"setNome"}
                  value={userData? userData.firstName: ""} 
                  placeholder="Insira seu Nome"
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
                  borderColor: COLORS.greyDark,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22
                }}
              >
                <TextInput
                  label={"setSobrenome"}
                  value={userData? userData.lastName: ""}
                  placeholder="Insira seu Sobrenome"
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
                  borderColor: COLORS.greyDark,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22
                }}
              >
                <TextInput
                  label={"setEmail"}
                  value={userData? userData.email: ""}
                  placeholder="Insira sua Senha"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="name-phone-pad"
                  style={{
                    width: "100%"
                  }}
                />
              </View>
            </View>
            
          </View>
          <View style={{flexDirection: "row",justifyContent: "center",alignItems: "center"}}>
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
                    >

                        <Text style={{ color: COLORS.white }}>Confirmar</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                    style={{
                        margin: 10,
                        paddingVertical: 16,
                        borderColor: COLORS.white,
                        backgroundColor: COLORS.white,
                        borderColor: COLORS.primary,
                        borderWidth: 2,
                        borderRadius: 12,
                        alignItems: "center",
                        width: 120,
                        justifyContent: "center",
                        marginTop: 16
                    }}>
                        <Text style={{ color: COLORS.primary }}>Cancelar</Text>
                    </TouchableOpacity>
                    </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditPerfil;
