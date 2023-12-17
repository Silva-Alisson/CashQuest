import baseUrl from "../../helpers/base-url-api";

export const getPet = async (token, userId) => {
    try {
        const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+ token);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            const response = await fetch(baseUrl + "/user-pet/get/" + userId, requestOptions);
            if (response.ok) {
                const result = await response.json();
                const dataPet = {
                    photo: result[0].pet.photo,
                    xp: result[0].xps,
                    name: result[0].name,
                    nivel: result[0].pet.nivel,
                    id: result[0].id
                }

                // console.log(result[0].pet.photo)
                return dataPet;
                
            } else {
                console.error("Erro na resposta da API. Status:", response.status);
                // console.log(await response.text());
                return null;
            }
    }catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
}

