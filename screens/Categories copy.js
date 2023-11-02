import React from "react"; 
import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import categorias from '../assets/data/categorias.json';

const categories = () => {
    const categories = [];
    for (let categoria in categorias) {
        if (categorias.hasOwnProperty(categoria)) {
          const itens = categorias[categoria];
            for(let iten of itens){
                categories.push(iten);
            }
        }
    }
    return categories;
}


export default function Categories({ navigation }) { 

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="close" size={40} color="black" />
                </TouchableOpacity>
                <Text style={{ marginLeft: 10 }}>Categorias</Text>
            </View>
            {buildComponente()}
        </SafeAreaView> ); 
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: "#e0e0e0", 
    }, 
    searchBar: { 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        margin: 10, 
    }, 
    input: { 
        width: "80%", 
        height: 30, 
        borderColor: "#ccc", 
        borderWidth: 1, 
        borderRadius: 15, 
        padding: 10, 
    }, 
    title: { 
        textAlign: "center", 
        fontSize: 20, 
        fontWeight: "bold", 
    }, 
    category: { 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        margin: 10, 
    }, 
    icon: { 
        width: 60, 
        height: 60, 
        borderRadius: 50, 
        backgroundColor: "white", 
    }, 
    text: { 
        fontSize: 16, 
    } 
});