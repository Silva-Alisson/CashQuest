import React from "react";
import { View, Text } from 'react-native'

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import OtherRoutes from "./otherRoutes";
import {useAuth} from '../context/auth';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  const {authData} = useAuth();
  
  return (
    <Stack.Navigator>
      {authData && authData.userId ? (
        <Stack.Screen
          name="OtherRoutes"
          component={OtherRoutes}
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
