import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import {AuthProvider} from './context/auth';
import {ModalProvider} from './context/modalContext';
import CustomModal from "./constants/modal";

export default function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <CustomModal />
      </ModalProvider>
    </AuthProvider>
  );
}
