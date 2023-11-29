import {
    View,
    Text,
    Image,
    Pressable,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../context/auth';
import getWallet from '../services/wallet-service/wallet-service';
import { useIsFocused } from "@react-navigation/native";
import { get_user_photo } from '../services/user-service/get-user-photo';






const EditPerfil = ({ navigation }) => {
    const [dados, setDados] = useState([]);
    const {authData} = useAuth();
    const isFocused = useIsFocused();
    const [userPhoto, setUserPhoto] = useState();

    useEffect(() => {
        if (isFocused){
            async function fetchData() {
                const response = await getWallet(authData.token, authData.userId);
                const arrayResponse = Object.keys(response).map(
                    (chave) => response[chave]
                );
                setDados(arrayResponse);
            }
            fetchData();
            
            async function fetchPhoto() {
                const response = await get_user_photo({token: authData.token, userId:authData.userId});
                console.log(response);
                setUserPhoto(response.userPhoto);
            }

            fetchPhoto();
        }
    }, [isFocused]);


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
          extraHeight={Platform.OS === "android" ? 200 : 0}
        >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
            </TouchableOpacity>
            <Text style={{ marginLeft: 10 }}>Editar informações do Perfil</Text>
        </View>
        <View style={{flex: 1,flexDirection: "column"}}>
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 20
            }}>
                <Image
                    source={{uri: userPhoto}}
                    style={{
                        width: 90,
                        height: 90,
                        borderRadius: 999,
                    }}
                />
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
                        paddingLeft: 22,}}
                    >
                        <TextInput
                            label={"setNome"}
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
                        paddingLeft: 22,}}
                    >
                        <TextInput
                            label={"setSobrenome"}
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
                        paddingLeft: 22,}}
                    >
                        <TextInput
                            label={"setEmail"}
                            placeholder="Insira sua Senha"
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
                    Senha
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
                        paddingLeft: 22,}}
                    >
                        <TextInput
                            label={"setSenha"}
                            placeholder="Insira seu E-mail"
                            placeholderTextColor={COLORS.grey}
                            keyboardType="name-phone-pad"
                            style={{
                            width: "100%"
                            }}
                        />
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
            </View>

        </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
};
  
export default EditPerfil;