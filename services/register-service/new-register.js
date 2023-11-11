import baseUrl from "../../helpers/base-url-api";

export const new_resgister = async (params) => {
try {
    console.log({params: params.value});

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params.token);
    let raw = [];

    if(params.type == "entrada"){
        raw = buildRawEntrada(params);
    }
    else{
        raw = buildRaw(params);
    }

    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    if(params.type == "despesa"){
        const response = await fetch(baseUrl + "/spendings/create", requestOptions);
        if (response.ok) {
            return true;
        } else {
            console.log('Erro na solicitação');
            return false;
        }      
    } else if(params.type == "entrada"){
        const response = await fetch(baseUrl + "/deposit/create", requestOptions);
        if (response.ok) {
            return true;
        } else {
            console.log('Erro na solicitação');
            return false;
        }
    } else if(params.type == "poupanca"){
        console.log({raw});
        const response = await fetch(baseUrl + "/savings/create", requestOptions);
        if (response.ok) {
            return true;
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

const buildRawEntrada = (params) => {
    const raw = JSON.stringify({
        "_userId": params.userId,
        "category": params.category,
        "description": params.description,
        "value": params.value,
        "attachment": "",
        "isFixed": params.isFixed,
        "comments": params.comments,
        "createAt": params.createAt,
        "installments": params.installments,
        "total": parseFloat(params.value),
    });
    console.log(raw);
    return raw;
}

const buildRaw = (params) => {
    const raw = JSON.stringify({
    "_userId": params.userId,
    "category": params.category,
    "description": params.description,
    "value":  params.value,
    "attachment": "",
    "isFixed": params.isFixed,
    "comments": params.comments,
    "createAt": params.createAt,
    "installments": params.installments,
    "total": parseFloat(params.value),
    "isTransferred": params.isTransferred
    });
    console.log(raw);
    return raw;
}
