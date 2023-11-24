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

const buildRawEntrada = (params) => {
  if (params.value != null) {
    const raw = JSON.stringify({
      userId: params.userId,
      category: params.category,
      description: params.description,
      value: params.value,
      attachment: "",
      isFixed: params.isFixed,
      comments: params.comments,
      createAt: params.createAt,
      installments: params.installments,
      total: parseFloat(params.value),
      type: params.type
    });
    console.log(raw);
    return raw;
  }
};

const buildRaw = (params) => {
  if (params.value != null) {
    const raw = JSON.stringify({
      userId: params.userId,
      category: params.category,
      description: params.description,
      value: params.value,
      attachment: "",
      isFixed: params.isFixed,
      comments: params.comments,
      createAt: params.createAt,
      installments: params.installments,
      total: parseFloat(params.value),
      isTransferred: params.isTransferred,
      type: params.type
    });
    console.log(raw);
    return raw;
  }
};
