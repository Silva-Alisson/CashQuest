import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkNivel = async (params) => {
  const DataSerialized = await AsyncStorage.getItem("@PetNivel");
  const nivel = JSON.parse(DataSerialized);
  parseInt(nivel);

  if (!nivel) {
    await AsyncStorage.setItem("@PetNivel", JSON.stringify(params.nivel));
    checkNivel();
  }

  if (nivel != params.nivel) {
    await AsyncStorage.setItem("@PetNivel", JSON.stringify(params.nivel));
    return true;
  } else {
    return false;
  }
};
