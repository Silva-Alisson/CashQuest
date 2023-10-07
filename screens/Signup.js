import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { register_user } from '../services/register-user-service';
const Signup = ({ navigation }) => {

    //forms start
    const { register, setValue, handleSubmit } = useForm();
    
    useEffect(() => {
        register('nome')
        register('sobrenome')
        register('email')
        register('senha')

      }, [register]);

      const onSubmit = async (data) => {
        console.log(data.nome, data.sobrenome, data.email, data.senha);
        register_user(data);
        if(register_user) {
            //redireicionar para a página certa
        }
      }
    //forms end

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{marginHorinzontal: 22, alignItems: "center" }}>
                <Image
                    source={require("../assets/cashquest.png")}
                    resizeMode='contain'
                    style={{
                        top: 15,
                        position: "absolute",
                        width: 150,
                        height: 80
                    }}
                />
            </View>
            <View style={{ flex: 1, marginHorizontal: 22, top: 80 }}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginBottom: 5,
                        color: COLORS.black
                    }}>
                    Crie Sua Conta
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Seu financeiro sempre ao alcance.</Text>
                </View>

                <View style={{ marginBottom: 10 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Nome</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            label={'nome'}
                            onChangeText={text => setValue('nome', text)}
                            placeholder='Insira seu nome'
                            placeholderTextColor={COLORS.grey}
                            keyboardType='name-phone-pad'
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 10 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Sobrenome</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            label={'sobrenome'}
                            onChangeText={text => setValue('sobrenome', text)}
                            placeholder='Insira seu sobrenome'
                            placeholderTextColor={COLORS.grey}
                            keyboardType='name-phone-pad'
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 10 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>E-mail</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            label={'Email'}
                            onChangeText={text => setValue('email', text)}
                            placeholder='Insira seu e-mail'
                            placeholderTextColor={COLORS.grey}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 10 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Senha</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            label={'senha'}
                            onChangeText={text => setValue('senha', text)}
                            placeholder='Insira sua senha'
                            placeholderTextColor={COLORS.grey}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>Eu concordo com os termos e condições</Text>
                </View>

                <Button
                    onPress={handleSubmit(onSubmit)}
                    title="Confirmar"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Você já tem conta conosco ?</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Signup