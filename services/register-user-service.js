import baseUrl from "../helpers/base-url-api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register_user = async (params) => {
  const nome = params.nome;
  const sobrenome = params.sobrenome;
  const email = params.email;
  const senha = params.password;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "firstName": nome,
    "lastName": sobrenome,
    "email": email,
    "password": senha
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    const response = await fetch(baseUrl + "/users/create-user", requestOptions);
    if (response.ok) {
      const result = await response.json();
      const email = result.email
      const id = result.id
      const UserData = {
        id, email, senha
      }
      await AsyncStorage.setItem('@UserData', JSON.stringify(UserData));

      return true;
    } else {
      console.log('Erro na solicitação');
      return false;
    }
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
