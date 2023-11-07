
import { initializeApp } from "firebase/app";
import { API_KEY,AUTHHDOMAIN, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID1 } from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTHHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID1
};

const app = initializeApp(firebaseConfig);