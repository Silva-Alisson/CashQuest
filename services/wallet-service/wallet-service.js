import baseUrl from "../../helpers/base-url-api";
import { getData } from "../verify-token-service";

const getWallet = async () => {
  const myHeaders = new Headers();
  const userId = getData("userId");
  console.log(userId);
  const token = getData("token");
  console.log(token);
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let data = [];

  await fetch(baseUrl + "wallet/get-wallet/" + userId, requestOptions)
  .then(response => response.json())
  .then(result => data = result)
  .catch(error => console.log('error', error)); 

  return data;
}

export default getWallet;