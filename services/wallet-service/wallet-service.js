import baseUrl from "../../helpers/base-url-api";

const getWallet = async (token, userId) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch(
      baseUrl + "/wallet/get-wallet/" + userId,
      requestOptions
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Erro na resposta da API. Status:", response.status);
      // console.log(await response.text());
      return null;
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    return null;
  }
};

export default getWallet;
