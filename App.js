import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import {AuthProvider} from './context/auth';

export default function App() {
  return (
    <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
    </AuthProvider>
  );
}
