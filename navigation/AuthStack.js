import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import LoginStack from "./LoginStack";
import SignupStack from "./SignupStack";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginStack"
        component={LoginStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignupStack"
        component={SignupStack}
        options={{
          headerShown: false,
        }}
      />
      {/* Adicione outras rotas relacionadas à autenticação, se necessário */}
    </Stack.Navigator>
  );
}
