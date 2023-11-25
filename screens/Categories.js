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
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', margin: 4, gap: 8, maxWidth: 90, marginBottom: 16}}
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
        <View style={{marginHorizontal: 10}}>
          <Text style={{ fontSize: 20, marginBottom: 5, marginTop: 16, color: COLORS.primary, paddingHorizontal: 5}}>{item.categoria}</Text>
          <View style={{borderTopWidth: 1, 
        borderTopColor: COLORS.primary, }}>
            <FlatList
                data={item.itens}
                numColumns={4}
                keyExtractor={(item) => item.name}
                renderItem={renderItemIcons}
                style={{paddingBottom: 15, marginTop: 10, flex: 1, alignContent: "flex-start"}}
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
        <View styles={{ flexDirection: 'row', alignItems: 'center'}}>
            <FlatList  
                data={groupedCategories}
                keyExtractor={(item) => item.categoria}
                renderItem={renderItem}
            />
        </View>
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