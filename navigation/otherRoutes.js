import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Achievements from "../screens/Achievements";
import TabNavigator from "./TabNavigator"; // Importe o TabNavigator

const Stack = createNativeStackNavigator();

const OtherRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AchievementsStack"
        component={Achievements}
        options={{
          headerShown: false
        }}
      />
      {/* Adicione outras rotas relacionadas à tela "Profile", se necessário */}
    </Stack.Navigator>
  );
};

export default OtherRoutes;
