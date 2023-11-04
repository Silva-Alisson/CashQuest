import React from "react"; 
import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import categorias from '../assets/data/categorias.json';
import { COLORS } from "../constants";

export default function Categories({ navigation }) {

    function handleCategorySelection(category) {
        navigation.navigate('Register', { selectedCategory: category });
    }
    const groupedCategories = Object.keys(categorias).map((categoria) => ({
      categoria,
      itens: categorias[categoria],
    }));
  
    function renderItemIcons({ item }) {
      return (
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', margin: 4, gap: 8}}
        onPress={() => handleCategorySelection(item.name)}
        >
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name={item.icon} size={40} color='#5DA660' />
          </View>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      );
    }
  
    function renderItem({ item }) {
      return (
        <View>
          <Text style={{ fontSize: 20,  marginHorizontal: 10, marginBottom: 16, marginTop: 16, color: COLORS.primary}}>{item.categoria}</Text>
          <View >
            <FlatList
                data={item.itens}
                numColumns={4}
                keyExtractor={(item) => item.name}
                renderItem={renderItemIcons}
            />
          </View>
        </View>
      );
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="close" size={40} color="black" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10 }}>Categorias</Text>
        </View>
        <ScrollView styles={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
            <FlatList  
                data={groupedCategories}
                keyExtractor={(item) => item.categoria}
                renderItem={renderItem}
            />
        </ScrollView>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: "#e0e0e0",
    },
    containerTitulo: {
        margin: 10
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
        fontSize: 12, 
    } 
});