import baseUrl from "../../helpers/base-url-api";

export const delete_resgister = async (params) => {
  try {
    console.log({ params: params.value });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + params.token);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };

    console.log(params.type);
    if (params.type == "despesa") {
      const response = await fetch(
        baseUrl + "/spendings/delete/" + params.registerId,
        requestOptions
      );
      if (response.ok) {
        return true;
      } else {
        console.log("Erro na solicitação");
        return false;
      }
    } else if (params.type == "entrada") {
      const response = await fetch(
        baseUrl + "/deposit/delete/" + params.registerId,
        requestOptions
      );
      if (response.ok) {
        return true;
      } else {
        console.log("Erro na solicitação");
        return false;
      }
    } else if (params.type == "poupanca") {
      console.log({ raw });
      const response = await fetch(
        baseUrl + "/saving/delete/" + params.registerId,
        requestOptions
      );
      if (response.ok) {
        return true;
      } else {
        console.log(response);
        console.log("Erro na solicitação");
        return false;
      }
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
