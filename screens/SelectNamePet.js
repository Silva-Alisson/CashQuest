import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import Button from '../components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createUserPet } from "../services/pet-service/create-pet";
import {useAuth} from '../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SelectNamePet({ navigation }) {
  const {signIn} = useAuth();
  const [petname, setPetName] = useState("");
  console.log(petname);

  const onSubmit = async () => {
    const result = await createUserPet(petname);
    console.log(result);
    if(result) {
      try {
        const user = await AsyncStorage.getItem('@UserData');
        const userData = JSON.parse(user);
        signIn(userData.email, userData.senha);
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    } else {
        console.log("Falha ao cadastrar, tente novamente.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            extraHeight={Platform.OS === 'android' ? 200 : 0}
            >
        <View
            style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10
            }}
        >
        
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Qual o nome do seu novo pet?</Text>
        </View>
        <View style={{ flex: 1, marginHorizontal: 22, alignItems: 'center', justifyContent: 'center', gap: 43 }}>
            <View style={{ }}>
                <View style={styles.photoView}>
                    <Image
                    source={require("../assets/egg.png")}
                    style={styles.photo}
                    />
                </View>
            </View>
            <View style={{ marginBottom: 10, width: "100%" }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 8
                }}>Nome</Text>

                <View style={styles.input}>
                    <TextInput
                        label={'nome'}
                        onChangeText={setPetName}
                        placeholder='Insira o novo nome'
                        placeholderTextColor={COLORS.grey}
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                    />
                </View> 
            </View>
                      

            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginVertical: 16 }}>
                <Button
                onPress={onSubmit}
                title="Confirmar"
                filled
                style={{
                    padding: 16,
                    width: 120, // Corrigido: 'with' para 'width'
                    height: 60
                }}
                />

                <Button
                title="Cancelar"
                filled
                style={{
                    padding: 16,
                    width: 120, // Corrigido: 'with' para 'width'
                    height: 60,
                    backgroundColor: '#fff',
                    color: COLORS.primary
                }}
                />
            </View>
        </View>
        </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  containerTitulo: {
    margin: 10
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
},
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10
  },
  category: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 10
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 150,
    backgroundColor: "white"
  },
  photoView: {
    width: 287,
    height: 287,
    borderRadius: 200,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center"
  },
  photo: {
    width: 217,
    height: 287,
    borderRadius: 200,

  },
  text: {
    fontSize: 12
  }
});
