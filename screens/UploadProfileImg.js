import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import Button from '../components/Button';

export default function UploadProfileImg({ navigation }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

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
      <View style={{flex: 1, flexDirection:'column', alignContent: 'center', justifyContent:'space-between', gap:100, marginHorizontal: 10, marginBottom:16, marginTop:"70%"}}>
        <View style={{ alignItems:'center'}}>
            <TouchableOpacity onPress={pickImage}>
            <View style={styles.photoView}>
                {!image ? (
                <MaterialCommunityIcons name="account" size={160} color="#fff" />
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
        
        <Button
            onPress={() => navigation.navigate("NamePetStack")}
            title="Confirmar"
            filled
        />
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
  input: {
    width: "80%",
    height: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10
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
    width: 190,
    height: 190,
    borderRadius: 200,
    backgroundColor: COLORS.darkBlue,
    justifyContent: "center",
    alignItems: "center"
  },
  photo: {
    width: 180,
    height: 180,
    borderRadius: 200
  },
  text: {
    fontSize: 12
  }
});
