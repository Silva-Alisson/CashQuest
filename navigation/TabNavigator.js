import React from "react";
import { Image, View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import { COLORS } from '../constants';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
     <Tab.Navigator
       screenOptions={{
        tabBarShowLabel:false,
        headerShown:false,
        tabBarStyle:{
          position: "absolute",
          bottom: 2,
          right: 2,
          left: 2,
          height: 60,
          background: "#fff",
          borderTopWidth: 1,
          borderRadius: 22
         }
       }}
     >
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Entypo name="home" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
            </View>
              )
            }
          }}
          />
          <Tab.Screen
          name="Register"
          component={Register}
          options={{
            tabBarStyle: {display: 'none'},
            tabBarIcon: ({ focused })=>{
              return (
                <View
                 style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.primary,
                  width: Platform.OS == "ios" ? 50 : 60,
                  height: Platform.OS == "ios" ? 50 : 60,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                  shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: -3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
                 }}
                >
                  <FontAwesome name="exchange" size={24} color="#fff" />
                </View>
              )
            }
          }}
        />
          <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused })=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <FontAwesome name="user" size={24} color={focused ? COLORS.primary : COLORS.secondary} />
            </View>
              )
            }
          }}
        />
     </Tab.Navigator>
  )
}

export default BottomTabNavigation
