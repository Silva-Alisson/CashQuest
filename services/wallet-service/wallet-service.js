import baseUrl from "../../helpers/base-url-api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getWallet = async () => {
  const myHeaders = new Headers();
  const userId = await AsyncStorage.getItem('@asyncStorage:userId');
  console.log({idusuario: userId});
  const token = await AsyncStorage.getItem('@asyncStorage:Token');
  console.log({tokenusurario: token});
  myHeaders.append("Authorization", "Bearer " + token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let data = [];

  await fetch(baseUrl + "wallet/get-wallet/" + userId, requestOptions)
  .then(response => response.json())
  .then(result => data = result)
  .catch(error => console.log('error', error)); 

  return data;
}

export default getWallet;