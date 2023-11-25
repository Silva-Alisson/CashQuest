import baseUrl from "../../helpers/base-url-api";

export const get_resgister = async (params) => {
try {
    console.log({params: params});

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    if(params.type == "despesa"){
        const response = await fetch(baseUrl + "/spendings/get-spending/" + params.registerId, requestOptions);
        if (response.ok) {
            const result = await response.json();
            console.log({result});
            return result;
        } else {
            console.log({response});
            console.log('Erro na solicitação');
            return false;
        }      
    } else if(params.type == "entrada"){
        const response = await fetch(baseUrl + "/deposit/get-deposit/" + params.registerId, requestOptions);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.log('Erro na solicitação');
            return false;
        }
    } else if(params.type == "poupanca"){
        const response = await fetch(baseUrl + "/savings/get-saving" + params.registerId, requestOptions);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.log(response);
            console.log('Erro na solicitação');
            return false;
        }
    }
} catch (error) {
    console.log('error', error);
    return false;
}
}
