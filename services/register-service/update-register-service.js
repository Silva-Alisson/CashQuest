import baseUrl from "../../helpers/base-url-api";

export const new_resgister = async (params) => {
try {
    console.log({params: params.value});

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params.token);
    let raw = [];

    raw = buildRaw(params);

    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    console.log(params.type);
    if(params.type == "despesa"){
        const response = await fetch(baseUrl + "/spendings/create/" + resigerId, requestOptions);
        if (response.ok) {
            return true;
        } else {
            console.log('Erro na solicitação');
            return false;
        }      
    } else if(params.type == "entrada"){
        const response = await fetch(baseUrl + "/deposit/create/" + resigerId, requestOptions);
        if (response.ok) {
            return true;
        } else {
            console.log('Erro na solicitação');
            return false;
        }
    } else if(params.type == "poupanca"){
        console.log({raw});
        const response = await fetch(baseUrl + "/savings/create/" + resigerId, requestOptions);
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

const buildRaw = (params) => {
    if(params.value != null){
        var raw = JSON.stringify({
            "category": params.category,
            "description": params.description,
            "value": params.value,
            "attachment": "",
            "isFixed": params.isFixed,
            "comments":  params.comments,
            "userId": params.userId,
            "installments": params.installments
          });
        console.log(raw);
        return raw;
    }
}  
