import {View,Text,Image} from "react-native";
import React, { useEffect, useState, useForm } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS,  SIZES, icons, images } from '../constants';
import * as Progress from 'react-native-progress';
import getWallet from "../services/wallet-service/wallet-service";

const Home = ({ navigation }) => {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await getWallet(); 
            const arrayResponse = Object.keys(response).map(chave => response[chave]);
            setDados(arrayResponse);
        }

        fetchData();
    }, []);
    
    // const progressValue = dados.length > 0 ? dados[0] / MAX_VALUE : 0;

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}>

            <View style={{ flex: 1, alignItems: "center"}}>
                <View style={{ alignItems: "center", backgroundColor: COLORS.primary, width:'100%', height:'50%'}}>
                    <Image
                        source={require("../assets/pet_teste.png")}
                        resizeMode="contain"
                        style={{                        
                            height: '30%',
                            width: '30%',
                            borderRadius: 999,
                            borderColor: COLORS.white,
                            borderWidth: 2,
                            margin: 25,
                    }} />
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: 20
                            }}>Arquielorinho</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            backgroundColor: COLORS.primary,
                            borderRadius: 16,
                            width: '90%',
                            justifyContent: 'center',
                            
                    }}>
                        <View style={{
                            flexDirection: "column",
                            alignItems: "center",
                        }} >
                            <Text style={{
                                color: COLORS.white,
                            }}> R$ {dados[0]}</Text>
                            <Text style={{
                                color: COLORS.white,
                            }}>Carteira
                            </Text>
                        </View>

                        <View style={{
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                }}>R$ {dados[3]}</Text>
                                <Text
                                    style={{
                                        color: COLORS.white,
                                }}>Reservas</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                            <Progress.Bar 
                            progress={0.3}
                            width={350}
                            height={20}
                            color={COLORS.orange}
                            backgroundColor={COLORS.grey}
                            borderRadius={15}
                            borderWidth={0}
                            style={{ marginTop: 20 }}
                            />
                        </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Home