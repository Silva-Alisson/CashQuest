import baseUrl from "../../helpers/base-url-api";
import categorias from "../../assets/data/categorias.json";

const getReportsHome = async (userId, date, token) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);
  const raw = JSON.stringify({
    userId: userId,
    date: date
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch(
      baseUrl + "/reports/get-monthly-report-home/",
      requestOptions
    );
    if (response.ok) {
      const result = await response.json();
      const newResult = transformArray3(result);
      return newResult;
    } else {
      console.error("Erro na resposta da API. Status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    return null;
  }
};

function transformArray3(inputArray) {
  // Organize o array por data
  inputArray.combinedArray.sort(
    (a, b) => new Date(b.createAt) - new Date(a.createAt)
  );

  const outputArray = [];
  const dateMap = new Map();

  let id = 0;
  let total = 0;

  inputArray.combinedArray.forEach((item, index) => {
    const itemDate = new Date(item.createAt);
    const dayKey = itemDate.toISOString().split("T")[0];
    const dia = itemDate.getDate();
    const mes = itemDate.toLocaleString('pt-BR', { month: 'short' });
    const ano = itemDate.getFullYear();
    const dataFormatada = `${dia} de ${mes} de ${ano}`;

    if (!dateMap.has(dayKey)) {
      dateMap.set(dayKey, {
        id: id,
        day: dataFormatada,
        total: total,
        details: []
      });
      id++;
    }

    const dayItem = dateMap.get(dayKey);

    dayItem.total += item.value;

    const groupedCategories = Object.keys(categorias).map((categoria) => ({
      categoria,
      itens: categorias[categoria]
    }));
    for (const categoria of groupedCategories) {
      for (const i of categoria.itens) {
        if (i.name == item.category) {
          const icon = i.icon;
          dayItem.details.push({
            id: item.id,
            totalAmount:
              "R$ " +
              parseFloat(item.value).toLocaleString("pt-BR", {
                minimumFractionDigits: 2
              }),
            category: item.category,
            description: item.description,
            iconName: icon,
            type: item.type,
          });
        }
      }
    }
  });

  outputArray.push(...dateMap.values());

  return outputArray;
}

export default getReportsHome;
