import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import { COLORS} from '../constants';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#5DA660', // Cor dos ícones quando a guia está ativa (selecionada)
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" size={24} color={'#5DA660'} />
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-person" size={24} color={'#5DA660'} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-person" size={24} color={'#5DA660'} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}
