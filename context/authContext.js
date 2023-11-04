import createContext from "./createContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../helpers/base-url-api";

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const createUser = (dispatch) => {
  return async (params) => {
    const nome = params.nome;
    const sobrenome = params.sobrenome;
    const email = params.email;
    const senha = params.senha;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstName: nome,
      lastName: sobrenome,
      email: email,
      password: senha
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    fetch(baseUrl + "/create-user", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
};

const logoutUser = (dispatch) => {
  return async () => {
    try {
      await AsyncStorage.removeItem('@asyncStorage:Token');
      await AsyncStorage.removeItem('@asyncStorage:userId');    
      return true;
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
};

const loginUser = (dispatch) => {
  return async (params) => {
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

    fetch(baseUrl + "/auth/login", requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        const token = result["token"];
        const userId = result["user"].id;
        if (token) {
          await AsyncStorage.setItem("@asyncStorage:Token", token);
          await AsyncStorage.setItem("@asyncStorage:userId", userId);
          return true;
        } else {
          console.log(response);
          return false;
        }
      })
    .catch((error) => console.log("error", error));
  };
};

export const { Context, Provider } = createContext(
  reducer,
  { createUser, loginUser, logoutUser },
  initialState
);
