import baseUrl from "../../helpers/base-url-api";

export const get_all_achievements = async (params) => {
  console.log({ params });
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + params.token);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  const response = await fetch(
    baseUrl + "/achievements/get-all-achievements/" + params.registerId,
    requestOptions
  );

  if (response.ok) {
    const result = await response.json();
    console.log({ result });
    return result;
  } else {
    console.log({ response });
    console.log("Erro na solicitação");
    return false;
  }
};
