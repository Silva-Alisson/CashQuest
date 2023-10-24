import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      // saving error
    }
};

export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log({tokenInLocalStorage: value});
      if (value !== null) {
        return true;
      }
      return false;
    } catch (e) {
      // error reading value
    }
};

export const removeData = async (item) => {
  try {
    await AsyncStorage.removeItem(item);
    console.log(`Token '${item}' removido com sucesso.`);
  } catch (e) {
    console.error(`Erro ao remover token '${item}':`, e);
  }
};