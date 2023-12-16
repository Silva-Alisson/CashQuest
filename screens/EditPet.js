import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { getPet } from "../services/pet-service/get-pet";
import {useAuth} from '../context/auth';
import * as Animatable from 'react-native-animatable';

export default function EditPet({ navigation }) { 

    const [dadosPet, setDadosPet] = useState([]);
    const {authData} = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await getPet(authData.token, authData.userId); 
            const arrayResponse = Object.keys(response).map(chave => response[chave]);
            setDadosPet(arrayResponse);
        }

        fetchData();
    }, []);

    return ( 
      <ImageBackground
      source={require("../assets/fundo-figma.png")} // Substitua pelo caminho correto da sua imagem
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      }}
      resizeMode="cover"
      >
        <SafeAreaView style={{flex: 1,backgroundColor: COLORS.transparent}}>

        <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraHeight={Platform.OS === "android" ? 200 : 0}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
            </TouchableOpacity>
            <Text style={{ marginLeft: 10 }}>Editar nome do pet</Text>
          </View>
          <View style={{  alignItems: 'center', marginHorizontal: 10 }}>
              <Image
                  source={{uri: dadosPet[0]}}
                  style={{
                      width: '58%',
                      height:355,
                      borderRadius:999
                      
                  }}
              />
          </View>

          <Animatable.View delay={50} animation="fadeInUp" style={{ marginHorizontal: 10, marginTop: 30 }}>
              <Text style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
              }}>Nome</Text>

              <View 
              style={{width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,}}
              >
                <TextInput
                  label={'nome'}
                  onChangeText={text => setValue('nome', text)}
                  placeholder='Insira o novo nome'
                  value={dadosPet[2]}
                  placeholderTextColor={COLORS.grey}
                  keyboardType='name-phone-pad'
                  style={{
                      width: "100%"
                  }}
                />
              </View>
          </Animatable.View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Animatable.View delay={150} animation="fadeInLeft">
              <TouchableOpacity
                style={{
                  margin: 10,
                  paddingVertical: 16,
                  borderColor: COLORS.primary,
                  backgroundColor: COLORS.primary,
                  borderWidth: 2,
                  borderRadius: 12,
                  alignItems: "center",
                  width: 120,
                  justifyContent: "center",
                  marginTop: 16
                }}
                disabled={isLoading}
                // onPress={handleSubmit(handleLoadData)}
              >
                {isLoading ? (
                  <ActivityIndicator color="#BAE6BC" />
                ) : (
                  <Text style={[{ color: COLORS.white }]}>Confirmar</Text>
                )}
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View delay={150} animation="fadeInRight">
              <TouchableOpacity
                style={{
                  margin: 10,
                  paddingVertical: 16,
                  borderColor: COLORS.primary,
                  backgroundColor: COLORS.white,
                  borderWidth: 2,
                  borderRadius: 12,
                  alignItems: "center",
                  width: 120,
                  justifyContent: "center",
                  marginTop: 16
                }}
                // onPress={cancelar}
              >
                <Text style={{ color: COLORS.primary }}>Cancelar</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView> 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, backgroundColor: "white", 
        paddingTop: 10, 
    }, 
    title: { 
        textAlign: "center", 
        fontSize: 24, 
        fontWeight: "bold" 
    },
    list: {
        marginHorizontal: 10
    },
    item: {
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1, 
        borderBottomColor: "#ccc", 
        padding: 10, 
        
    }, 
    text: { 
        fontSize: 14, 
    },
    description: {
        fontSize: 12
    }
});