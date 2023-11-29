import baseUrl from "../../helpers/base-url-api";

export const get_user_photo = async (params) => {
    console.log(params);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);

    const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    const response = await fetch( baseUrl + "/users/get-user-photo/" + params.userId, requestOptions)
    if (response.ok) {
        const result = await response.json();
        return result;
    } else {
        console.log({response});
        console.log('Erro na solicitação');
        return false;
    }     
}