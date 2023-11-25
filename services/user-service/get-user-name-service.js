

fetch("http://localhost:8000/api//users", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

export const get_user_name = async (params) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.token);
    
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
}