import baseUrl from "../helpers/base-url-api";

export const register_user = async (params) => {
  const nome = params.nome;
  const sobrenome = params.sobrenome;
  const email = params.email;
  const senha = params.senha;

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "firstName": nome,
    "lastName": sobrenome,
    "email": email,
    "password": senha
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(baseUrl+"/create-user", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};
