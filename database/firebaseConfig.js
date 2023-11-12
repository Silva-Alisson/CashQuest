import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { API_KEY, AUTHHDOMAIN, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID } from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTHHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);