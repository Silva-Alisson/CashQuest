import baseUrl from "../../helpers/base-url-api";

export const updatePet = async (params) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer " + params.token
  );

  const raw = JSON.stringify({
    id: params.petId,
    name: params.petName
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch(
    baseUrl + "/user-pet/update-pet",
    requestOptions
  );
  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    console.log("Erro na solicitação", response.status, response.statusText);
    return false;
  }
};
