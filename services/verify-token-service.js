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