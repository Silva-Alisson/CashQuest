import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "../../helpers/base-url-api";

export const createUserPet = async (name) => {
  try {
    const date = new Date();
    const user = await AsyncStorage.getItem('@UserData');
    const userData = JSON.parse(user);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": name,
      "_userId": userData.id,
      "createdAt": date
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const response = await fetch(baseUrl + "/user-pet/create", requestOptions); // Use o baseUrl apropriado
    if (response.ok) {
      return true;
    } else {
        console.log({response});
      console.log('Erro na solicitação');
      return false;
    }
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
