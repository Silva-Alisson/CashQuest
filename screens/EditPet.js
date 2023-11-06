import React from "react"; 
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";


export default function EditPet({ navigation }) { 
    return ( 
        <SafeAreaView
            style={styles.container}
        >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
            </TouchableOpacity>
            <Text style={{ marginLeft: 10 }}>Editar nome do pet</Text>
        </View>
        <View style={{  alignItems: 'center', marginHorizontal: 10 }}>
            <Image
                source={require("../assets/turtle_nivel_3.png")}
                style={{
                    width: '58%',
                    height:350,
                   
                }}
            />
        </View>
        <View style={{ marginHorizontal: 10, marginTop: 30 }}>
            <Text style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
            }}>Nome</Text>

                <View style={{width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22,}}>
                    <TextInput
                        label={'nome'}
                        onChangeText={text => setValue('nome', text)}
                        placeholder='Insira o novo nome'
                        placeholderTextColor={COLORS.grey}
                        keyboardType='name-phone-pad'
                        style={{
                            width: "100%"
                        }}
                    />
                </View>
        </View>
        
        
        </SafeAreaView> 
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