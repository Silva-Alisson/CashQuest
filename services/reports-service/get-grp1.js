import baseUrl from "../../helpers/base-url-api";

export const getReport = async (params) => {
  console.log({ params });
  console.log("veio aqui!");
  console.log({ params });
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + params.token);

  const raw = JSON.stringify({
    userId: params.userId,
    startDate: params.dataInicial,
    endDate: params.dataFinal
  });
  console.log(raw);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch(
    baseUrl + "/reports/get-depoist-spending-report",
    requestOptions
  );
  if (response.ok) {
    const result = await response.json();
    console.log(result);
    return result;
  } else {
    console.log("Erro na solicitação", response.status, response.statusText);
    console.log(await response.text());
    return false;
  }
};
