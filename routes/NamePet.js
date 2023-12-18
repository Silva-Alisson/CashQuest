import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectNamePet from "../screens/SelectNamePet";

const Stack = createNativeStackNavigator();

export default function NamePetStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NamePet"
        component={SelectNamePet}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}