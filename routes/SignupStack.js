import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../screens/Signup";

const Stack = createNativeStackNavigator();

export default function SignupStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      {/* Adicione outras rotas relacionadas à tela de cadastro, se necessário */}
    </Stack.Navigator>
  );
}
