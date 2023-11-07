import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { uploadFile } from "../services/firebase-service/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UploadUserPhotoService } from "../services/upload-user-photo-service/upload-user-photo-service";

export default function UploadProfileImg({ navigation }) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 
  const handleLoadData = async () => {
    setIsLoading(true);
    if (image) {
      const user = await AsyncStorage.getItem('@UserData');
      const userData = JSON.parse(user);
      const url = uploadFile(image, userData.id)
      if(url && url != null) {
        const result = await UploadUserPhotoService(url);
        if(result) {
            setIsLoading(false);
            navigation.navigate("NamePetStack");
        } else {
          setIsLoading(false);
          console.log("Falha ao adicionar foto, tente novamente.");
        }
      }
    }else {
      setIsLoading(false);
      console.log("Selecione uma imagem")
    };
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10
        }}
      >
        <Text style={styles.title}>Adicionar foto de perfil</Text>
      </View>
      <View style={{flex: 1, flexDirection:'column', alignContent: 'center', justifyContent:'space-between', gap:100, marginHorizontal: 10, marginBottom:16, marginTop:150}}>
        <View style={{ margin:45}}>
            <TouchableOpacity onPress={pickImage}>
            <View style={styles.photoView}>
                {!image ? (
                <MaterialCommunityIcons name="account" size={200} color="#fff" />
                ) : (
                image && (
                    <Image
                    source={{ uri: image }}
                    resizeMode={"cover"}
                    style={styles.photo}
                    />
                )
                )}
            </View>
            </TouchableOpacity>
        </View>
        
        {/* <Button
          style={[isLoading && styles.loadingButton]}
            onPress={handleLoadData}
            title="Confirmar"
            filled
            
        /> */}
        <TouchableOpacity
            style={styles.button}
            disabled={isLoading}
            onPress={handleLoadData}
        >
            {isLoading ? (
                <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>Confirmar</Text>
            )}
        </TouchableOpacity>
      </View>
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
  button: {
    paddingBottom: 16,
    paddingVertical: 10,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: "80%",
    height: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10
  },
  loadingButton: {
    transform: [{ rotate: '45deg' }],
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4
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
    backgroundColor: COLORS.darkBlue,
    justifyContent: "center",
    alignItems: "center"
  },
  photo: {
    width: 287,
    height: 287,
    borderRadius: 200
  },
  text: {
    fontSize: 12
  }
});
