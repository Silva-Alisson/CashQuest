import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { COLORS,  SIZES, icons, images } from '../constants'
import Button from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secondary, flexDirection: "column",
        justifyContent:"center",
        alignItems: "stretch"}}>
        <LinearGradient
            style={{
                flex: 1,

            }}
            colors={[COLORS.secondary, COLORS.primary, COLORS.third]}
        >
            <View style={{ flex: 1, 
            }}>
                <View>
                    <Image
                        source={require("../assets/turtle_nivel_1.png")}
                        style={{
                            height: 100,
                            width: 80,
                            position: "absolute",
                            top: 10,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/egg.png")}
                        style={{
                            height: 80,
                            width: 65,
                            position: "absolute",
                            top: -30,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-5deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/turtle_nivel_2.png")}
                        style={{
                            width: 140,
                            height: 160,
                            borderRadius: 20,
                            position: "absolute",
                            top: 130,
                            left: -50,
                            transform: [
                                { translateX: 60 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/turtle_nivel_3.png")}
                        style={{
                            height: 250,
                            width: 140,
                            borderRadius: 20,
                            position: "absolute",
                            top: 110,
                            left: 115,
                            transform: [
                                { translateX: 65 },
                                { translateY: 45 },
                                { rotate: "-8deg" }
                            ]
                        }}
                    />
                </View>

                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 400,
                    width: "100%"
                }}>
                    <Text style={{
                        marginTop: '7%',
                        fontSize: 33,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>Seja Inteligente Com Suas Finanças</Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginTop: '1%'
                        }}>Comece hoje a construir seu planejamento</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            
                        }}>financeiro para um futuro próspero e seguro.</Text>
                    </View>

                    <Button
                        title="Registre-se agora!"
                        onPress={() => navigation.navigate("Singup")}
                        style={{
                            marginTop: '7%',
                            width: "100%"
                        }}
                    />

                    <View style={{
                        flexDirection: "row",
                        marginTop: '6%',
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white
                        }}>Você já tem conta conosco ?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.white,
                                fontWeight: "bold",
                                marginLeft: 4
                            }}>Login</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </LinearGradient>
        </SafeAreaView>
    )
}

export default Welcome