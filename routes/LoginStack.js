import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      {/* Adicione outras rotas relacionadas à tela de login, se necessário */}
    </Stack.Navigator>
  );
}
