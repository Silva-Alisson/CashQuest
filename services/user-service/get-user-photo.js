import baseUrl from "../../helpers/base-url-api";

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Mjg0Mzc2ODQwOGZlOGQxYWE3MDdlYSIsImlhdCI6MTY5OTIyNzc3NH0.Tt29QtjZ9y7BvKd2q5DC54NZgisQkMV0P8pqHBaNGyM");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export const get_user_photo = async (params) => {
    console.log(params);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);

    var requestOptions = {
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