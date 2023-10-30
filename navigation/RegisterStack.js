import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";

const Stack = createNativeStackNavigator();

export default function RegisterStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      {/* Adicione outras rotas relacionadas à tela de cadastro, se necessário */}
    </Stack.Navigator>
  );
}