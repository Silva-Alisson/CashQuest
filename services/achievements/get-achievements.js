import baseUrl from "../../helpers/base-url-api";

export const get_achievement = async (params) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + params.token);
  let type = "";

  if (params.type == "despesa") {
    type = "despesas";
  } else if (params.type == "poupanca") {
    type = "poupanca";
  } else {
    return;
  }

  const raw = JSON.stringify({
    id: params.userId,
    type: type
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch(
    baseUrl + "/achievements/get-achievement",
    requestOptions
  );

  if (response.ok) {
    const responseText = await response.text();
    if (responseText) {
      const result = JSON.parse(responseText);
      console.log({ result });
      return result;
    } else {
      return false;
    }
  } else {
    const errorText = await response.text();
    console.log({ errorText });
    console.log("Erro na solicitação");
    return false;
  }
};
