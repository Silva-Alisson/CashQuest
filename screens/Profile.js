import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import React, { useEffect, useState, useForm } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS,  SIZES, icons, images } from '../constants'
import { MaterialIcons } from "@expo/vector-icons";
import getWallet from "../services/wallet-service/wallet-service";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Profile = ({ navigation }) => {

    

    const handleSair = async () => {
        await AsyncStorage.removeItem('@asyncStorage:Token');
        await AsyncStorage.removeItem("@asyncStorage:userId");
        navigation.navigate("Welcome");
    };

    const [dados, setDados] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await getWallet(); 
            const arrayResponse = Object.keys(response).map(chave => response[chave]);
            setDados(arrayResponse);
        }

        fetchData();
    }, []);
    
    return (
        <SafeAreaView
            style={Styles2.container2}
        >

            <View style={Styles2.viewAvatar}>
                <Image
                    source={require("../assets/avatar.png")}
                    resizeMode="contain"
                    style={Styles2.image} />

                <Text
                    style={Styles2.textName}
                >
                    Presdove
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        marginVertical: 6,
                        alignItems: "center",
                        
                    }}
                >
                    {/* <MaterialIcons name="person" size={24} color="black" /> */}
                    {/* <Text
                        style={{
                            marginLeft: 4,
                        }}
                    >
                        Treinador iniciante
                    </Text> */}
                </View>

                <View
                    style={Styles2.walletContainer}
                >
                    <View
                        style={Styles2.viewWallet}
                    >
                        <Text
                            style={Styles2.textWallet}
                        >
                          R$ {dados[0]}
                        </Text>
                        <Text
                            style={Styles2.textWallet}
                        >
                            Carteira
                        </Text>
                    </View>

                    <View
                        style={Styles2.viewWallet}
                    >
                        <Text
                            style={Styles2.textWallet}
                        >
                           R$ {dados[3]}
                        </Text>
                        <Text
                            style={Styles2.textWallet}
                        >
                            Reservas
                        </Text>
                    </View>

                    <View
                        style={Styles2.viewWallet}
                    >
                        <Text
                            style={Styles2.textWallet}
                        >
                           R$ {dados[2]}
                        </Text>
                        <Text
                            style={Styles2.textWallet}
                        >
                            Gastos no mês
                        </Text>
                    </View>
                </View>

                <Text
                    style={Styles2.textTittle}
                >
                    Conquistas e relatórios
                </Text>

                <View style={Styles2.viewMarginH}>

                    <TouchableOpacity
                        style={Styles2.formaIcon}
                        onPress={() => navigation.navigate("AchievementsStack")}
                    >

                        <MaterialIcons name="star" size={50} color="white" />
                        <Text
                            style={Styles2.textIcon}
                        >
                            Conquistas
                        </Text>


                    </TouchableOpacity>

                    <TouchableOpacity
                        style={Styles2.formaIcon}
                    >
                        <MaterialIcons name="graphic-eq" size={50} color="white" />
                        <Text
                            style={Styles2.textIcon}
                        >
                            Relatórios
                        </Text>

                    </TouchableOpacity>

                </View>

                <View style={Styles2.viewMarginH}>
                    <TouchableOpacity
                        style={Styles2.buttonSair}
                        onPress={()=> navigation.navigate("SettingsStack")}
                    >
                            <Text
                                style={Styles2.textButton}

                            >
                                Sair
                            </Text>
                            <MaterialIcons name="chevron-right" size={20} style={Styles2.textButton} />
                        
                        
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

const Styles2 = StyleSheet.create({
    container2: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
    viewAvatar: {
        flex: 1,
        alignItems: "center",
    },
    image: {
        height: '20%',
        width: '40%',
        borderRadius: 999,
        borderColor: COLORS.primary,
        borderWidth: 2,
        marginTop: 25,
    },
    textName: {
        color: COLORS.primary,
        marginVertical: 8,
        fontSize: 29
    },
    walletContainer: {
        margin: 8,
        flexDirection: "row",
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        width: '90%',
        padding: 28,
        justifyContent: 'center',
    },
    viewWallet: {
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: SIZES.padding,
    },
    textWallet: {
        color: COLORS.white,
    },
    textTittle: {
        color: COLORS.primary,
        paddingTop: 30,
        fontSize: 24,
    },
    viewMarginH:{
        flexDirection: "row", 
        marginHorizontal: 10,

    },
    formaIcon:{
        width: '45%',
        height: '60%',
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        marginHorizontal: SIZES.padding * 1,
        marginVertical:5
    },
    textIcon: {
        color: COLORS.white,
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    icon: {
        size: 50,
        color: COLORS.white
    },
    buttonSair: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        width: '95%',
        height: 52,
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        marginHorizontal: SIZES.padding * 1,
    },
    textButton: {
        color: COLORS.white,
    }



});
export default Profile