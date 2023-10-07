import axios from "axios";
import { getData, storeData } from "./verify-token-service";

export const register_user =async (params) => {
    const nome = params.nome;
    const sobrenome = params.sobrenome;
    const email = params.email;
    const senha = params.senha;

    console.log(params)

    let data = JSON.stringify({
        "firstName": nome,
        "lastName": sobrenome,
        "email": email,
        "password": senha
        });

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://172.26.0.255:8000/api/create-user',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };

    axios.request(config)
    .then((response) => {
    console.log(JSON.stringify(response.data));
    return true;
    })
    .catch((error) => {
    console.log(error);
    });
}
