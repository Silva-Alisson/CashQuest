import React, { createContext, useContext, useEffect, useState, useMemo  } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../helpers/base-url-api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({});
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const _authData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
      // Handle errors if needed
    } finally {
      setisLoading(true);
    }
  }

  async function signOut() {
    setAuthData({});
    console.log({authData:authData})
    await AsyncStorage.removeItem('@AuthData');
    const authDataSerialized = await AsyncStorage.getItem('@AuthData');
    console.log(authDataSerialized);
  }

  async function signIn(email, password) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
    email: email,
    password: password,
    });

    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    };

    fetch(baseUrl + '/auth/login', requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
        const token = result['token'];
        const userId = result['user'].id;
        if (token) {
        const newAuthData = { token, userId };
        setAuthData(newAuthData);
        await AsyncStorage.setItem('@AuthData', JSON.stringify(newAuthData));
        return true;
        } else {
        console.log(response);
        return false;
        }
    })
    .catch((error) => console.log('error', error));
  }

  const contextValue = useMemo(() => ({
    authData,
    signIn,
    signOut,
    isLoading
  }), [authData, signIn, signOut, isLoading]);

  return (
    <AuthContext.Provider value={ contextValue }>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  
  return context;
}