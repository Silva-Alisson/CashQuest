import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Welcome = ({ navigation }) => {

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.white, COLORS.white]}
        >
            <View style={{ flex: 1 }}>
                <View style={{
                    flex: 1,
                    marginHorinzontal: 22,
                    alignItems: "center" 
                }}>
                        <Image
                            source={require("../assets/cashquest.png")}
                            resizeMode='contain'
                            style={{
                                
                                position: "absolute",
                                top: 200,
                                width: 300,
                                height: 80
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
                        color: COLORS.primary
                    }}>Seja inteligente com</Text>
                    <Text style={{
                        fontSize: 33,
                        fontWeight: 800,
                        color: COLORS.primary
                    }}>Suas Finanças</Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            marginVertical: 4
                        }}>Comece hoje a construir seu planejamento</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                        }}>financeiro para um futuro próspero e seguro.</Text>
                    </View>

                    <Button
                        title="Registre-se agora!"
                        onPress={() => navigation.navigate("Signup")}
                        style={{
                            fontWeight: "bold",
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
                            color: COLORS.primary
                        }}>Você já tem conta conosco ?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.primary,
                                fontWeight: "bold",
                                marginLeft: 4
                            }}>Login</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Welcome