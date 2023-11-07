import baseUrl from "../../helpers/base-url-api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UploadUserPhotoService = async (base64) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const user = await AsyncStorage.getItem('@UserData');
        const userData = JSON.parse(user);

        const raw = JSON.stringify({
            "_userId": userData.id,
            "userPhoto": base64
        });

        console.log(typeof base64);
        
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        const response = await fetch(baseUrl + "/users/upload-photo", requestOptions);
        if (response.ok) {
            return true;
        } else {
            console.log('Erro na solicitação', response.status, response.statusText);
            return false;
        }
    } catch (error) {
        console.log('Erro na solicitação', error.message);
        return false;
    }
};