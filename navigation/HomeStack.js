import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      {/* Adicione outras rotas relacionadas à tela "Home", se necessário */}
    </Stack.Navigator>
  );
}
