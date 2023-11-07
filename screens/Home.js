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
                <View style={{ alignItems: "center", backgroundColor: COLORS.primary, width:'100%', height:'40%', borderBottomEndRadius:40, borderBottomStartRadius:40}}>
                    <Image
                        source={require("../assets/turtle_auto_x2_CUT.png")}
                        resizeMode="contain"
                        style={{                        
                            height: '40%',
                            width: '30%',
                            borderWidth: 2,
                            margin: 25,
                    }} />
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: 20
                            }}>Arquielorinho</Text>

                    <View style={{ alignItems: "center" }}>
                            <Progress.Bar 
                            progress={0.3}
                            width={300}
                            height={20}
                            color={COLORS.third}
                            backgroundColor={COLORS.white}
                            borderRadius={15}
                            borderWidth={0}
                            style={{ margin: 10 }}
                            />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            borderRadius: 16,
                            width: '90%',
                            justifyContent: 'center',
                            
                            
                    }}>
                        <View style={{
                            flexDirection: "column",
                            alignItems: "center",
                            marginHorizontal:20
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
                            marginHorizontal:20
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
                    
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Home