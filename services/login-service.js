import baseUrl from "../helpers/base-url-api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (params) => {
  const email = params.email;
  const senha = params.senha;

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: email,
    password: senha
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    let existToken = await AsyncStorage.getItem('@asyncStorage:Token');
    console.log(existToken);
    if (existToken == null) {
      fetch(baseUrl + "/auth/login", requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          const token = result["token"];
          console.log(token);
          const userId = result["user"].id;
          if (token) {
            await AsyncStorage.setItem('@asyncStorage:Token', token);
            await AsyncStorage.setItem('@asyncStorage:userId', userId);
            return true;
          } else {
            console.log(response);
          }
        })
        .catch((error) => console.log("error", error));
    }
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};
