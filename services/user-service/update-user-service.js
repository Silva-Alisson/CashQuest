import baseUrl from "../../helpers/base-url-api";

export const update_user = async (params) => {
  console.log(params.data);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + params.token);

  const raw = JSON.stringify({
    firstName: params.data.nome,
    lastName: params.data.sobrenome,
    email: params.data.email
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch(
    baseUrl + "/users/update/" + params.userId,
    requestOptions
  );

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    //console.log({ response });
    //console.log(await response.text());
    //console.log("Erro na solicitação");
    return false;
  }
};
