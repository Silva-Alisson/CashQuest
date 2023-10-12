import axios from "axios";
import { getData, storeData } from "./verify-token-service";
import baseUrl from "../helpers/base-url-api";

export const login = async (params) => {
  const email = params.email;
  const senha = params.senha;

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "email": email,
    "password": senha
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    let existToken = await getData();
    console.log(existToken);
    if (!existToken) {
      fetch(
        baseUrl+"/auth/login", requestOptions)
      .then(response => response.text())
      .then(async result => { 
        const token = result.token
        if(token) {
          await storeData(token);
          return true;
        }
      })
      .catch(error => console.log('error', error));
    }
    console.warn("já está logado");
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};
