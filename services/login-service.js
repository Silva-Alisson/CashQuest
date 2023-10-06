import axios from "axios";
import { getData, storeData } from "./verify-token-service"

export const login =  async (params) => {
    const email = params.email;
    const senha = params.senha;

    console.log(params)

    const data = JSON.stringify({
        "email": email,
        "password": senha
      });
      
    const config = {
        method: 'post',
        url: 'http://172.26.0.255:8000/api/auth/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    };
      
    try {
        let existToken =  await getData();
        console.log(existToken);
        if(!existToken) {
            const response = await axios(config);
            const data = response.data;
            storeData(data.token);
            return true;
        }
        
    } catch (error) {
        console.error(error);
    }
}

