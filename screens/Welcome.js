import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
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
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={{ flex: 1,
            }}>
                <View>
                    <Image
                        source={require("../assets/pri.png")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 10,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/pngegg.png")}
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
                        source={require("../assets/seg.png")}
                        style={{
                            width: 175,
                            height: 160,
                            borderRadius: 20,
                            position: "absolute",
                            top: 130,
                            left: -50,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/tri.png")}
                        style={{
                            height: 210,
                            width: 180,
                            borderRadius: 20,
                            position: "absolute",
                            top: 110,
                            left: 115,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
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
                        fontSize: 33,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>Seja Inteligente Com</Text>
                    <Text style={{
                        fontSize: 33,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>Suas Finanças</Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginVertical: 4
                        }}>Comece hoje a construir seu planejamento</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                        }}>financeiro para um futuro próspero e seguro.</Text>
                    </View>

                    <Button
                        title="Registre-se agora!"
                        onPress={() => navigation.navigate("Signup")}
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />

                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
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