import firebase from 'firebase/app';
import 'firebase/storage';

export const uploadFile = async (fileUri, fileName) => {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(fileName);

  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();

    await fileRef.put(blob);

    const downloadURL = await fileRef.getDownloadURL();

    console.log('Arquivo enviado com sucesso! URL: ', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Erro no upload do arquivo: ', error);
  }
};
