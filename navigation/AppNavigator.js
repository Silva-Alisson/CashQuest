import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack"; // Importe o AuthStack
import TabNavigator from "./TabNavigator"; // Importe o TabNavigator

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const userIsAuthenticated = true; // Verifique se o usuário está autenticado

  return (
    <Stack.Navigator>
      {userIsAuthenticated ? (
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
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
