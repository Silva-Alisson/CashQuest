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
import { UploadUserPhotoService } from "../services/upload-user-photo-service/upload-user-photo-service";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../database/firebaseConfig";
import * as Animatable from 'react-native-animatable';

export default function UploadProfileImg({ navigation }) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [uri, setUri] = useState();
  const [progress, setProgress] = useState(0);
  const [errorUpload, setErrorUpload] = useState(false);
  async function uploadImage(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "userProfile/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    
    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress.toFixed());
      },
      (error) => {
        setErrorUpload(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const result = await UploadUserPhotoService(downloadURL);
          if (result) {
            setIsLoading(false);
            navigation.navigate("NamePetStack");
          } else {
            setIsLoading(false);
            setErrorUpload(true)
          }
        });
      }
    );
  }

  const handleLoadData = async () => {
    setIsLoading(true);
    if (uri) {
      await uploadImage(uri);
    } else {
      const result = await UploadUserPhotoService("https://firebasestorage.googleapis.com/v0/b/cashquest-a60d0.appspot.com/o/userProfile%2FGroup%202110.png?alt=media&token=ee3d13c9-2ba5-4962-9c5c-2578ee19892b");
      if (result) {
        setIsLoading(false);
        navigation.navigate("NamePetStack");
      } else {
        setIsLoading(false);
        setErrorUpload(true)
      }
    }
  };

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
      setUri(result.assets[0].uri);
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
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "space-between",
          gap: 100,
          marginHorizontal: 10,
          marginBottom: 16,
          marginTop: 150
        }}
      >
        <Animatable.View delay={50} animation="fadeInUp" style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.photoView}>
              {!image ? (
                <MaterialCommunityIcons
                  name="account"
                  size={160}
                  color="#fff"
                />
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
        </Animatable.View>

        {errorUpload && (
          <Text
            style={{ color: "#ff6961", paddingTop: 8, textAlign: "center" }}
          >
            Falha ao fazer upload da sua foto de perfil, por favor tente novamente.
          </Text>
        )}
        <Animatable.View delay={100} animation="fadeInUp">
          <TouchableOpacity
            style={styles.button}
            disabled={isLoading}
            onPress={handleLoadData}
          >
            {isLoading ? (
              <ActivityIndicator color="#BAE6BC"/>
            ) : (
              <Text style={[styles.buttonText, {color: COLORS.white}]}>Fazer Upoload</Text>
            )}
          </TouchableOpacity>
        </Animatable.View>
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
    alignItems: "center",
    justifyContent: "center"
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
    transform: [{ rotate: "45deg" }]
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
