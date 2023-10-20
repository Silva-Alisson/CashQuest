import {
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";

export const Profile = () => {
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
                        height: 155,
                        width: 155,
                        borderRadius: 999,
                        borderColor: COLORS.primary,
                        borderWidth: 2,
                        marginTop: 25,
                    }} />

                <Text
                    style={{
                        color: COLORS.primary,
                        marginVertical: 8,
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
                    <MaterialIcons name="person" size={24} color="black" />
                    <Text
                        style={{
                            marginLeft: 4,
                        }}
                    >
                        Treinador iniciante
                    </Text>
                </View>

                <View
                    style={{
                        paddingVertical: 8,
                        flexDirection: "row",
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
                                color: COLORS.primary,
                            }}
                        >
                            R$ 500,35
                        </Text>
                        <Text
                            style={{
                                color: COLORS.primary,
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
                                color: COLORS.primary,
                            }}
                        >
                            R$ 1.200,35
                        </Text>
                        <Text
                            style={{
                                color: COLORS.primary,
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
                                color: COLORS.primary,
                            }}
                        >
                            R$ 900,35
                        </Text>
                        <Text
                            style={{
                                color: COLORS.primary,
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

                <View style={{ flexDirection: "row" }}>

                    <TouchableOpacity
                        style={{
                            width: 200,
                            height: 200,
                            justifyContent: "center",
                            textAlign: "center",
                            backgroundColor: COLORS.primary,
                            borderRadius: 10,
                            marginHorizontal: SIZES.padding * 1,
                            marginVertical: 30,
                        }}
                    >

                        <MaterialIcons name="star" size={24} color="white" />
                        <Text
                            style={{
                                color: COLORS.white,
                                alignContent: "top",
                                justifyContent: "top",
                                textAlign: "center",
                            }}
                        >
                            Conquistas
                        </Text>


                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: 200,
                            height: 200,
                            justifyContent: "center",
                            textAlign: "center",
                            backgroundColor: COLORS.primary,
                            borderRadius: 10,
                            marginHorizontal: SIZES.padding * 1,
                            marginVertical: 30,
                        }}
                    >
                        <MaterialIcons name="graphic-eq" size={24} color="white" />
                        <Text
                            style={{
                                color: COLORS.white,
                                alignContent: "top",
                                justifyContent: "top",
                                textAlign: "center",
                            }}
                        >
                            Relatórios
                        </Text>

                    </TouchableOpacity>

                </View>

                <TouchableOpacity
                    style={{
                        width: 370,
                        height: 45,
                        justifyContent: "center",
                        textAlign: "center",
                        backgroundColor: COLORS.primary,
                        borderRadius: 10,
                        marginHorizontal: SIZES.padding * 1,
                        marginVertical: 30,
                    }}
                >

                    <Text
                        style={{
                            color: COLORS.white,
                        }}
                    >
                        Sair <MaterialIcons name="chevron-right" size={14} color="white" />
                    </Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
};

export default Profile