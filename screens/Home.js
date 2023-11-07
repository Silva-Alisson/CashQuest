import {View,Text,Image, ScrollView, TouchableOpacity} from "react-native";
import React, { useEffect, useState, useForm } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS,  SIZES, icons, images} from '../constants';
import * as Progress from 'react-native-progress';
import getWallet from "../services/wallet-service/wallet-service";
import { MaterialCommunityIcons } from '@expo/vector-icons';



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


            <View style={{ flex: 1}}>
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
                
                <View style={{flexDirection: "row",alignItems: 'center', justifyContent:"center" , alignItems: 'center', marginVertical: 5}}>
                    <View style={{flexDirection: "row",alignItems: 'center', justifyContent:"center" , alignItems: 'center',borderRadius: 10,borderColor: COLORS.black, borderWidth: 1, padding: 5}}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name={"chevron-left"} size={42} color='#000' />
                        </TouchableOpacity>
                        <View style={{flexDirection: "column", paddingHorizontal:20, paddingVertical:5, alignItems: 'center', justifyContent:"center"}}>
                            <Text style={{color: COLORS.black,fontSize: 30}}>Outubro</Text>
                            <Text style={{color: COLORS.black,fontSize: 16}}>Suas movimentações</Text>
                        </View>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name={"chevron-right"} size={42} color='#000' />
                        </TouchableOpacity>

                    </View>
                </View>
                
                <View>
                    <ScrollView>

                        <View style={{flexDirection: "column", margin: 10}}>
                            <View style={{flexDirection: "row",alignItems: 'center',justifyContent:"space-between", borderBottomWidth: 1, borderBottomColor: COLORS.black, marginBottom: 10, paddingBottom: 5}}>
                                <Text style={{color: COLORS.black,fontSize: 18}}>Hoje</Text>
                                <Text style={{color: COLORS.primary,fontSize: 18}}>+R$ 36.00</Text>
                            </View>
                            
                            <View style={{flexDirection: "row",alignItems: 'center', justifyContent:"space-between" , alignItems: 'center' }}>
                      
                                <View style={{flexDirection: "row",alignItems: 'center'}}>
                                    <View style={{ width: 40, height: 40, borderRadius: 999, backgroundColor: '#BAE6BC', justifyContent: 'center', alignItems: 'center' }}>
                                        <MaterialCommunityIcons name={"close"} size={30} color='#5DA660' />
                                    </View>

                                    <View style={{flexDirection: "column", paddingLeft: 10}}>
                                        <Text style={{fontSize: 16}}>
                                            Investimentos
                                        </Text>
                                        <Text style={{fontSize: 12}}>
                                            Ganhei no jogo do bicho
                                        </Text>
                                    </View>
                                </View>
                                <Text style={{color: COLORS.primary,fontSize: 18}}>
                                    +R$ 52.00
                                </Text>
                            </View>
                        </View>

                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}


export default Home