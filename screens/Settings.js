import React from "react"; 
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/auth";

const settingsText = [ 
    { key: "Editar perfil",
    description: "Altere seu nome, foto, nome do pet e outras informações", navigate: ""}, 
    { key: "Alterar informações do pet",
    description: "Altere o nome do seu pet", navigate: "" }, 
    { key: "Excluir conta permanentemente",
    description: "Excluir sua conta permanentemente", navigate: "" }, 
    { key: "Sair da sua conta", description: "Sair da sua conta temporariamente", navigate: "signOut" }
];

export default function Settings({ navigation }) { 
    const {signOut} = useAuth();
    const handleSingOut = async () => {
        try {
            signOut();
          } catch (error) {
            console.error('Erro ao fazer login:', error);
          }
    }

    return ( 
        <SafeAreaView
            style={styles.container}
        >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
            </TouchableOpacity>
            <Text style={{ marginLeft: 10 }}>Configurações</Text>
        </View>
        
        <FlatList data={settingsText} 
            renderItem={({ item }) => (
                <TouchableOpacity  style={styles.list} onPress={handleSingOut}>
                    <View style={styles.item}>
                        <View>
                            <Text style={styles.text}>{item.key}</Text> 
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                        
                        <MaterialCommunityIcons name="chevron-right" size={40} color="black" /> 
                    </View> 
                </TouchableOpacity>
            )} 
        /> 
        </SafeAreaView> 
    );
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, backgroundColor: "white", 
        paddingTop: 50, 
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