import {MaterialIcons} from '@expo/vector-icons';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../constants';
import {useAuth} from '../context/auth';
import getWallet from '../services/wallet-service/wallet-service';
import { useIsFocused } from "@react-navigation/native";

export const Profile = ({navigation}) => {
    const [dados, setDados] = useState([]);
    const {authData} = useAuth();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused){
            async function fetchData() {
                const response = await getWallet(authData.token, authData.userId);
                const arrayResponse = Object.keys(response).map(
                    (chave) => response[chave]
                );
                setDados(arrayResponse);
            }
            fetchData();          
        }
    }, [isFocused]);


    return (
        <SafeAreaView style={Styles2.container2}>
            <View style={Styles2.viewAvatar}>
                <Image
                    source={require('../assets/avatar.png')}
                    resizeMode='contain'
                    style={Styles2.image}
                />
                <Text style={Styles2.textName}>Presdove</Text>

                <View
                    style={{
                        flexDirection: 'row',
                        marginVertical: 6,
                        alignItems: 'center'
                    }}>
                </View>

                <View style={Styles2.walletContainer}>
                    <View style={Styles2.viewWallet}>
                    <Text style={Styles2.textWallet}>R$ {parseFloat(dados[0]).toLocaleString("pt-BR", {
                minimumFractionDigits: 2
              })}</Text>
                        <Text style={Styles2.textWallet}>Carteira</Text>
                    </View>

                    <View style={Styles2.viewWallet}>
                    <Text style={Styles2.textWallet}>R$ {parseFloat(dados[2]).toLocaleString("pt-BR", {
                minimumFractionDigits: 2
              })}</Text>
                        <Text style={Styles2.textWallet}>Reservas</Text>
                    </View>

                    <View style={Styles2.viewWallet}>
                    <Text style={Styles2.textWallet}>R$ {parseFloat(dados[1]).toLocaleString("pt-BR", {
                minimumFractionDigits: 2
              })}</Text>
                        <Text style={Styles2.textWallet}>Gastos no mês</Text>
                    </View>
                </View>

                <Text style={Styles2.textTittle}>Conquistas e relatórios</Text>

                <View style={Styles2.viewMarginH}>
                    <TouchableOpacity
                        style={Styles2.formaIcon}
                        onPress={() =>
                            navigation.navigate('AchievementsStack')
                        }>
                        <MaterialIcons name='star' size={50} color='white' />
                        <Text style={Styles2.textIcon}>Conquistas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={Styles2.formaIcon}
                        onPress={() => navigation.navigate('DashboardStack')}>
                        <MaterialIcons
                            name='graphic-eq'
                            size={50}
                            color='white'
                        />
                        <Text style={Styles2.textIcon}>Relatórios</Text>
                    </TouchableOpacity>
                </View>

                <View style={Styles2.viewMarginH}>
                    <TouchableOpacity
                        style={Styles2.buttonSair}
                        onPress={() => navigation.navigate('SettingsStack')}>
                        <Text style={Styles2.textButton}>Configurações</Text>
                        <MaterialIcons
                            name='chevron-right'
                            size={20}
                            style={Styles2.textButton}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const Styles2 = StyleSheet.create({
    container2: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    viewAvatar: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        height: '20%',
        width: '40%',
        borderRadius: 999,
        borderColor: COLORS.primary,
        borderWidth: 2,
        marginTop: 25
    },
    textName: {
        color: COLORS.primary,
        marginVertical: 8,
        fontSize: 29
    },
    walletContainer: {
        margin: 8,
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        width: '90%',
        padding: 28,
        justifyContent: 'center'
    },
    viewWallet: {
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: SIZES.padding
    },
    textWallet: {
        color: COLORS.white
    },
    textTittle: {
        color: COLORS.primary,
        paddingTop: 10,
        fontSize: 24
    },
    viewMarginH: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    formaIcon: {
        width: '45%',
        height: '40%',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        marginHorizontal: SIZES.padding * 1,
        marginVertical: 5
    },
    textIcon: {
        color: COLORS.white,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    icon: {
        size: 50,
        color: COLORS.white
    },
    buttonSair: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        width: '95%',
        height: 52,
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        marginHorizontal: SIZES.padding * 1
    },
    textButton: {
        color: COLORS.white
    }
});
export default Profile;
