import baseUrl from "../../helpers/base-url-api";

const getReportsHome = async (userId, date, token) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
    console.log({date});
    const raw = JSON.stringify({
    "userId": userId,
    "date": date
    });
    console.log({raw})

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try{
        const response = await fetch(
            baseUrl + "/reports/get-monthly-report-home/",
            requestOptions
          );
          if (response.ok) {
            const result = await response.json();
            return result;
          } else {
            console.error("Erro na resposta da API. Status:", response.status);
            console.log(await response.text());
            return null;
          }
        } catch (error) {
            console.error("Erro na requisição:", error);
            return null;
          }

};
    
export default getReportsHome;

