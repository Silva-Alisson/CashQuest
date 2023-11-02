import React, {useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack"; // Importe o AuthStack
import TabNavigator from "./TabNavigator"; // Importe o TabNavigator
import OtherRoutes from "./otherRoutes";

const Stack = createNativeStackNavigator();

const getToken = async () => {
  const existToken = await AsyncStorage.getItem('@asyncStorage:Token');
  return existToken;
}

export default function AppNavigator() {

  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('@asyncStorage:isLoggedIn');
      if (token !== null) {
        setAuthenticated(true);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Stack.Navigator>
      {authenticated ? (
        <Stack.Screen
          name="OtherRoutes"
          component={OtherRoutes}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
}
