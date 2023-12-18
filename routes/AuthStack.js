import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import LoginStack from "./LoginStack";
import SignupStack from "./SignupStack";
import UploadProfileImgStack from "./UploadProfimeImg";
import NamePetStack from './NamePet';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
          clearOnBlur: true,
        }}
      />
      <Stack.Screen
        name="LoginStack"
        component={LoginStack}
        options={{
          headerShown: false,
          clearOnBlur: true,
        }}
      />
      <Stack.Screen
        name="SignupStack"
        component={SignupStack}
        options={{
          headerShown: false,
          clearOnBlur: true,
        }}
      />
      <Stack.Screen
        name="UploadProfileImgStack"
        component={UploadProfileImgStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NamePetStack"
        component={NamePetStack}
        options={{
          headerShown: false,
        }}
      />
      {/* Adicione outras rotas relacionadas à autenticação, se necessário */}
    </Stack.Navigator>
  );
}
