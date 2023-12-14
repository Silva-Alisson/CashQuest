import baseUrl from "../../helpers/base-url-api";

export const update_use_photo = async (params) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + params.token);

  const raw = JSON.stringify({
    id: params.photoId,
    userId: params.userId,
    userPhoto: params.url
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch(baseUrl + "/users/update-photo", requestOptions);
  if (response.ok) {
    return true;
  } else {
    console.log("Erro na solicitação", response.status, response.statusText);
    return false;
  }
};
