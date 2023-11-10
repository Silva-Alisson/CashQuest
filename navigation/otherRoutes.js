import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Achievements from '../screens/Achievements';
import Categories from '../screens/Categories';
import DashboardScreen from '../screens/Dashboard';
import EditPet from '../screens/EditPet';
import Settings from '../screens/Settings';
import TabNavigator from './TabNavigator'; // Importe o TabNavigator

const Stack = createNativeStackNavigator();

const OtherRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='TabNavigator'
                component={TabNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='AchievementsStack'
                component={Achievements}
                options={{
                    headerShown: false,
                    clearOnBlur: true,
                }}
            />
            <Stack.Screen
                name='DashboardStack'
                component={DashboardScreen}
                options={{
                    headerShown: false,
                    clearOnBlur: true,
                }}
            />
            <Stack.Screen
                name='SettingsStack'
                component={Settings}
                options={{
                    headerShown: false,
                    clearOnBlur: true,
                }}
            />
            <Stack.Screen
                name='CategoriesStack'
                component={Categories}
                options={{
                    headerShown: false,
                    clearOnBlur: true,
                }}
            />
            <Stack.Screen
                name='EditPetStack'
                component={EditPet}
                options={{
                    headerShown: false,
                    clearOnBlur: true,
                }}
            />
            {/* Adicione outras rotas relacionadas à tela "Profile", se necessário */}
        </Stack.Navigator>
    );
};

export default OtherRoutes;
