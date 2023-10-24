import {
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import React, { useEffect, useState, useForm } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS,  SIZES, icons, images } from '../constants'
import { MaterialIcons } from "@expo/vector-icons";
import getWallet from "../services/wallet-service/wallet-service";
import { removeData } from "../services/verify-token-service";

export const Profile = ({ navigation }) => {

    const handleSair = () => {
        if(removeData('token'))
         {
            if(removeData('userId')) {
                navigation.navigate('Welcome');
            }
        }
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
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >

            <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                    source={require("../assets/avatar.png")}
                    resizeMode="contain"
                    style={{
                        height: '20%',
                        width: '40%',
                        borderRadius: 999,
                        borderColor: COLORS.primary,
                        borderWidth: 2,
                        marginTop: 25,
                    }} />

                <Text
                    style={{
                        color: COLORS.primary,
                        marginVertical: 8,
                        fontSize: 29
                    }}
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
                    style={{
                            margin: 8,
                        flexDirection: "row",
                        backgroundColor: COLORS.primary,
                        borderRadius: 16,
                        width: '90%',
                        padding: 28,
                        justifyContent: 'center',
                        
                    }}
                >
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            marginHorizontal: SIZES.padding,
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                            }}
                        >
                          R$ {dados[0]}
                        </Text>
                        <Text
                            style={{
                                color: COLORS.white,
                            }}
                        >
                            Carteira
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            marginHorizontal: SIZES.padding,
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                            }}
                        >
                           R$ {dados[3]}
                        </Text>
                        <Text
                            style={{
                                color: COLORS.white,
                            }}
                        >
                            Reservas
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                            marginHorizontal: SIZES.padding,
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                            }}
                        >
                           R$ {dados[2]}
                        </Text>
                        <Text
                            style={{
                                color: COLORS.white,
                            }}
                        >
                            Gastos no mês
                        </Text>
                    </View>
                </View>

                <Text
                    style={{
                        color: COLORS.primary,
                        paddingTop: 30,
                        fontSize: 24,
                        
                    }}
                >
                    Conquistas e relatórios
                </Text>

                <View style={{ flexDirection: "row", marginHorizontal: 10 }}>

                    <TouchableOpacity
                        style={{
                            width: '45%',
                            height: '60%',
                            justifyContent: "center",
                            textAlign: "center",
                            backgroundColor: COLORS.primary,
                            borderRadius: 16,
                            marginHorizontal: SIZES.padding * 1,
                            marginVertical: 15,
                        }}
                        onPress={handleSair}
                    >

                        <MaterialIcons name="star" size={50} color="white" />
                        <Text
                            style={{
                                color: COLORS.white,
                                alignContent: "center",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >
                            Conquistas
                        </Text>


                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: '45%',
                            height: '60%',
                            justifyContent: "center",
                            textAlign: "center",
                            backgroundColor: COLORS.primary,
                            borderRadius: 16,
                            marginHorizontal: SIZES.padding * 1,
                            marginVertical: 15,
                        }}
                    >
                        <MaterialIcons name="graphic-eq" size={50} color="white" />
                        <Text
                            style={{
                                color: COLORS.white,
                                alignContent: "center",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >
                            Relatórios
                        </Text>

                    </TouchableOpacity>

                </View>

                <View style={{flexDirection: "row", marginHorizontal: 10}}>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 16,
                            width: '95%',
                            height: 52,
                            backgroundColor: COLORS.primary,
                            borderRadius: 16,
                            marginHorizontal: SIZES.padding * 1,
                            marginVertical: 5,
                        }}
                    >
                            <Text
                                style={{
                                    color: COLORS.white,
                                }}

                            >
                                Sair
                            </Text>
                            <MaterialIcons name="chevron-right" size={20} color="white" />
                        
                        
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default Profile