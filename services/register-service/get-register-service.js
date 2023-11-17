import baseUrl from "../../helpers/base-url-api";

export const get_resgister = async (params) => {
try {
    console.log({params: params});

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);
    let raw = [];

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    const result = {};

        const response = await fetch(baseUrl + "/spendings/get-spending/" + params.resigerId, requestOptions);
        if (response.ok) {
            console.log("spendings")
            result = await response.json();
        }      

        const response1 = await fetch(baseUrl + "/deposit/get-deposit/" + params.resigerId, requestOptions);
        if (response.ok) {
            console.log("deposit")
            result = await response1.json();
            
        } 

        const response2 = await fetch(baseUrl + "/savings/get-saving/" + params.resigerId, requestOptions);
        if (response.ok) {
            console.log("savings")
            result = await response2.json();
        }

        return result;

} catch (error) {
    console.log('error', error);
    return false;
}
}
