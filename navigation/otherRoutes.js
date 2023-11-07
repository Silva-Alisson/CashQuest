import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Achievements from "../screens/Achievements";
import TabNavigator from "./TabNavigator"; // Importe o TabNavigator
import Settings from "../screens/Settings";
import Categories from "../screens/Categories";
import EditPet from "../screens/EditPet";

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
      <Stack.Screen
        name="SettingsStack"
        component={Settings}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="CategoriesStack"
        component={Categories}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EditPetStack"
        component={EditPet}
        options={{
          headerShown: false
        }}
      />
      {/* Adicione outras rotas relacionadas à tela "Profile", se necessário */}
    </Stack.Navigator>
  );
};

export default OtherRoutes;
